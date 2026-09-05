/**
 * Minimal foreground static server for dist/, mounted at the deploy base.
 *
 * `astro preview` daemonises itself when stdout is not a TTY, which makes
 * Playwright think the web server died. This stays in the foreground.
 */
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const PORT = Number(process.env.PORT ?? 4321);
const BASE = (process.env.BASE_PATH ?? '/prero').replace(/\/$/, '');
const ROOT = resolve('dist');

const TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.woff2': 'font/woff2',
	'.json': 'application/json',
};

createServer((req, res) => {
	const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

	if (BASE && !path.startsWith(`${BASE}/`) && path !== BASE) {
		res.writeHead(404).end('Not found');
		return;
	}

	const rel = normalize(path.slice(BASE.length)).replace(/^(\.\.[/\\])+/, '');
	let file = join(ROOT, rel);

	if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
	if (!existsSync(file)) {
		res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' }).end('Not found');
		return;
	}

	res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
	createReadStream(file).pipe(res);
}).listen(PORT, () => {
	console.log(`serving dist/ at http://localhost:${PORT}${BASE}/`);
});
