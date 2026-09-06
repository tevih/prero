# Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: install, build,
all three test suites, then — only if everything passed — deploy to two
targets in parallel.

| Target | URL | Base path | Job |
| --- | --- | --- | --- |
| GitHub Pages (staging) | `https://tevih.github.io/prero/` | `/prero` | `deploy` |
| Bluehost (production) | `https://prero.com` | `/` | `bluehost` |

Pull requests run the tests but do not deploy.

## Releases

After every successful deploy the `release` job tags the deployed commit
(`v2026-09-06-1432`) and publishes a GitHub Release whose notes list where it
went and every commit since the previous release, with a compare link. The
Releases page is therefore the list of every version that has ever been live.

Rolling back to any of them is one action — see [rollback.md](rollback.md).

`main` refuses force-pushes and deletion, enforced for admins as well, so
history behind those tags cannot be lost.

## Base path

Pages serves from a subpath, so `astro.config.mjs` defaults to
`base: '/prero'` and every internal link goes through `src/lib/url.ts`.

The Bluehost job rebuilds with `BASE_PATH=/` and `SITE=$SITE_URL`, then
**re-runs the build tests against that output** before uploading. A base-path
regression cannot reach production.

For any other host: `SITE=https://example.com BASE_PATH=/ npm run build`.

## GitHub Pages

Enabled with *GitHub Actions* as the source. Nothing to configure. Every push
to `main` republishes.

## Bluehost

Bluehost is shared Apache hosting. It cannot pull from a repository; the
workflow builds and uploads `dist/` over FTPS using `SamKirkland/FTP-Deploy-Action`.

### Repository configuration

Settings → Secrets and variables → Actions.

| Name | Kind | Value |
| --- | --- | --- |
| `FTP_SERVER` | secret | from cPanel → FTP Accounts → *Configure FTP Client* |
| `FTP_USERNAME` | secret | usually the full `user@domain` form |
| `FTP_PASSWORD` | secret | |
| `FTP_REMOTE_DIR` | variable | relative to the FTP account's home; `/` if the account is already rooted in the web root. Trailing slash required. |
| `SITE_URL` | variable | `https://prero.com` |
| `ORIGIN_IP` | variable | the server's IP, for the verify workflow |
| `DEPLOY_BLUEHOST` | variable | `true` to enable the job; anything else skips it |

Secrets are write-only. `gh secret set NAME` prompts for the value and keeps
it out of shell history; `gh variable set NAME --body "…"` for the rest.

### How the upload behaves

The action keeps a `.ftp-deploy-sync-state.json` in the remote directory. The
first run uploads everything; later runs upload only what changed and delete
only what the action itself previously uploaded.

**It does not know about files it did not put there.** It will not delete
them — but it will overwrite any that share a name with something in `dist/`.
`.htaccess` and `index.html` are the ones that collide with an existing site.

### `.htaccess`

`public/.htaccess` ships with the build. It sets `DirectoryIndex index.html`,
the 404 document, a one-year immutable cache on `/_astro/`, must-revalidate on
HTML, `nosniff`, a referrer policy, and gzip. The HTTPS redirect is commented
out — uncomment once cPanel has issued the certificate.

## Verifying without deploying

### From CI — recommended

Actions → **Verify Bluehost connection** → *Run workflow*. Uses the secrets
already on the repo, so nobody handles credentials. It:

1. resolves the host, connects, negotiates TLS, logs in;
2. changes into `FTP_REMOTE_DIR` and lists it, warning if a deploy would
   overwrite an `.htaccess` or a WordPress install;
3. requests `SITE_URL` over current DNS;
4. requests the origin at `ORIGIN_IP` with a `Host` header — which tests
   Apache *regardless of DNS* — and probes every route, the 404, and the cache
   headers.

Inputs: `write_test` uploads and removes a scratch file to prove write
access; `full_list` prints every item in the target directory.

Or from a terminal with `gh workflow run "Verify Bluehost connection"`.

### From a machine

```bash
cp .env.deploy.example .env.deploy   # gitignored; fill it in
npm run deploy:verify                # connection only
npm run deploy:verify -- --write     # + write test
npm run deploy:check                 # build, test, dry-run the upload
npm run deploy:live                  # actually upload
```

Same engine as CI, same remote state file. **Bluehost blocks some networks
entirely** — if `deploy:verify` cannot even resolve or connect while the CI
workflow succeeds, that is why. Use the CI workflow.

## Current state of production — read before enabling

As of 2026‑09‑06:

- **`DEPLOY_BLUEHOST` is `false`.** Pushes to `main` deploy to Pages only.
- The site **has been uploaded** to the Bluehost server at `ORIGIN_IP`
  (50.87.218.83) and serves correctly there — every route 200, the 404 works,
  cache headers apply. Verified via the origin check.
- **`prero.com` DNS points elsewhere** (66.147.242.89), where nothing answers.
  The A record for `prero.com` and `www` needs to move to 50.87.218.83.
- The FTP root on that server **also holds a WordPress install** — the
  previous site. The first deploy overwrote its `.htaccess`; the WordPress
  PHP files are untouched. Bluehost's own backups of the original `.htaccess`
  (`.htaccess.ea4bak`, `.htaccess.nfd-backup`, `.htaccess.phpupgrader.*`) are
  still in that directory.
- Decision pending from the client: archive the WordPress install and take
  the root, or restore its `.htaccess` and deploy the static site elsewhere.

Do not set `DEPLOY_BLUEHOST` back to `true` until that decision is made.
