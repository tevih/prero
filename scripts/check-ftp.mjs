/**
 * Verifies the Bluehost FTP connection end to end without deploying anything.
 *
 *   npm run deploy:verify          read-only checks
 *   npm run deploy:verify -- --write   also proves the account can write
 *
 * Reads .env.deploy. Uses basic-ftp, the same library the deploy engine uses.
 */
import { Client } from 'basic-ftp';
import { existsSync, readFileSync } from 'node:fs';
import { Readable } from 'node:stream';
import { lookup } from 'node:dns/promises';

const WRITE = process.argv.includes('--write');
const ENV_FILE = '.env.deploy';

let step = 0;
const pass = (m, extra) => console.log(`  ✓ ${String(++step).padStart(2, '0')}  ${m}${extra ? `\n        ${extra}` : ''}`);
const fail = (m, err) => {
	console.log(`  ✗ ${String(++step).padStart(2, '0')}  ${m}`);
	console.log(`\n  ${err?.message ?? err}\n`);
	process.exit(1);
};

// Environment wins, so CI can pass secrets without writing them to disk.
const fromFile = existsSync(ENV_FILE)
	? Object.fromEntries(
			readFileSync(ENV_FILE, 'utf8')
				.split('\n')
				.map((l) => l.trim())
				.filter((l) => l && !l.startsWith('#'))
				.map((l) => {
					const i = l.indexOf('=');
					return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
				}),
		)
	: {};

const KEYS = [
	'FTP_SERVER',
	'FTP_USERNAME',
	'FTP_PASSWORD',
	'FTP_REMOTE_DIR',
	'FTP_PORT',
	'FTP_PROTOCOL',
	'SITE_URL',
];
const env = Object.fromEntries(
	KEYS.map((k) => [k, process.env[k] || fromFile[k]]).filter(([, v]) => v),
);

if (!env.FTP_SERVER && !existsSync(ENV_FILE)) {
	console.error(`error: no credentials. Set them in the environment, or cp .env.deploy.example ${ENV_FILE}`);
	process.exit(1);
}

const { FTP_SERVER, FTP_USERNAME, FTP_PASSWORD } = env;
const REMOTE = env.FTP_REMOTE_DIR || '/';
const PORT = Number(env.FTP_PORT || 21);
const SECURE = (env.FTP_PROTOCOL ?? 'ftps') !== 'ftp';

const missing = ['FTP_SERVER', 'FTP_USERNAME', 'FTP_PASSWORD'].filter((k) => !env[k]);
if (missing.length) fail(`config incomplete: ${missing.join(', ')} not set`, `provide them in the environment or ${ENV_FILE}`);

console.log(`\nChecking ${FTP_USERNAME} @ ${FTP_SERVER}:${PORT}${SECURE ? ' (FTPS)' : ' (plain FTP)'}\n`);
pass('config loaded', `remote dir: ${REMOTE}`);

const client = new Client(20_000);
client.ftp.verbose = process.env.FTP_LOG_LEVEL === 'verbose';

try {
	try {
		const { address } = await lookup(FTP_SERVER);
		pass('hostname resolves', address);
	} catch (err) {
		fail(`cannot resolve ${FTP_SERVER}`, 'check the server name in cPanel → FTP Accounts → Configure FTP Client');
	}

	try {
		await client.access({
			host: FTP_SERVER,
			port: PORT,
			user: FTP_USERNAME,
			password: FTP_PASSWORD,
			secure: SECURE,
			secureOptions: { rejectUnauthorized: false },
		});
		pass(`connected on port ${PORT}${SECURE ? ' and negotiated TLS' : ''}`);
		pass('credentials accepted');
	} catch (err) {
		const m = err?.message ?? '';
		let hint = '';
		if (/530|login|password/i.test(m)) hint = 'username is usually the full deploy@yourdomain.com form';
		else if (/ECONNREFUSED|ETIMEDOUT|EHOSTUNREACH/i.test(m)) hint = 'port blocked or wrong host — try FTP_PROTOCOL=ftp to rule out TLS';
		fail('could not connect or log in', `${m}${hint ? `\n\n  hint: ${hint}` : ''}`);
	}

	const home = await client.pwd();
	pass('logged in', `home directory: ${home}`);

	try {
		await client.cd(REMOTE);
	} catch (err) {
		fail(`FTP_REMOTE_DIR "${REMOTE}" does not exist`,
			`you are logged in at ${home}. If the FTP account is already rooted in\n        public_html, FTP_REMOTE_DIR should just be "/".`);
	}
	const target = await client.pwd();
	pass(`changed into ${REMOTE}`, `resolves to: ${target}`);

	// Where did we actually land? If the site is not served, this is usually why.
	if (target !== '/' || REMOTE !== '/') {
		pass('resolved target', target);
	}
	try {
		const atHome = await client.list(home);
		const dirs = atHome.filter((f) => f.isDirectory).map((f) => f.name);
		if (dirs.includes('public_html')) {
			console.log(`\n  ⚠  "public_html" exists at ${home} but you are deploying to ${target}.`);
			console.log('     Apache serves public_html, so files outside it are never reachable.');
			console.log(`     Set FTP_REMOTE_DIR to "/public_html/" (or point the FTP account at it).`);
		}
	} catch {
		/* listing the home dir is a nicety, not a requirement */
	}

	const list = await client.list();
	if (list.length === 0) {
		pass('target directory is empty', 'nothing here to overwrite');
	} else {
		const names = list.map((f) => f.name);
		const shown = process.argv.includes('--list') ? names.length : 12;
		const label = list
			.slice(0, shown)
			.map((f) => (f.isDirectory ? `${f.name}/` : f.name))
			.join('  ');
		pass(
			`target directory holds ${list.length} item(s)`,
			label + (names.length > shown ? `  … (+${names.length - shown}, pass --list for all)` : ''),
		);

		const collisions = names.filter((n) =>
			['.htaccess', 'index.php', 'wp-config.php', 'wp-content', 'index.html'].includes(n));
		if (collisions.length) {
			console.log(`\n  ⚠  a deploy would overwrite: ${collisions.join(', ')}`);
			if (collisions.some((c) => c.startsWith('wp-') || c === 'index.php')) {
				console.log('     this looks like a live WordPress install — deploy to a');
				console.log('     subdirectory instead until you have decided what happens to it.');
			}
		}
	}

	if (WRITE) {
		const name = `.deploy-check-${Date.now()}`;
		try {
			await client.uploadFrom(Readable.from(['ok']), name);
			pass('write access confirmed', `uploaded ${name}`);
			await client.remove(name);
			pass('cleanup succeeded', `removed ${name}`);
		} catch (err) {
			fail('the account cannot write here', `${err?.message ?? err}\n\n  check the FTP account's permissions and quota in cPanel`);
		}
	} else {
		console.log('\n  (read-only checks. re-run with --write to prove the account can upload)');
	}

	console.log('\n  All checks passed. Nothing was deployed.\n');
} finally {
	client.close();
}
