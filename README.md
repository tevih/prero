# Prero

Portfolio site for **Gabriel Prero** — Design + Product_Development.

Content (copy and imagery) is sourced from the existing site at `newprero.tevih.com`.

## Design

Minimalist Swiss / International Typographic style, restricted to red, black, white
and grayscale.

- **Grid** — a 16-column field on an 8px base unit (4 columns at small, 8 at medium).
- **Type** — Inter for display and body, IBM Plex Mono for labels and numerals.
  Pages open in tight uppercase display type and resolve into lowercase body copy.
- **Red** — rationed to roughly two appearances per screen, reserved for accents,
  active states and a single emphasised word.
- **Imagery** — project photography renders in grayscale and returns to full colour
  on hover or keyboard focus, so the palette stays disciplined without hiding the work.
- **Motion** — 16px of travel, revealed on scroll in 40ms stagger steps. Fully
  disabled under `prefers-reduced-motion`.

## Stack

Astro 7, Tailwind CSS 4 (via `@tailwindcss/vite`), self-hosted Fontsource fonts.
Static output — no server required.

## Requirements

Node **22.12+** (Astro's minimum). The repo pins a version in `.nvmrc`:

```bash
nvm use
```

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321/prero/` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the build locally |
| `npm test` | Build, then run every test |
| `npm run test:unit` | Content and data checks (fast, no build) |
| `npm run test:build` | Assertions against the built HTML |
| `npm run test:e2e` | Playwright, Chromium + WebKit |
| `npm run deploy:check` | Build, verify, then dry-run the Bluehost upload |
| `npm run deploy:live` | Build, verify, then upload to Bluehost |

First e2e run needs browsers: `npx playwright install chromium webkit`.

## Tests

- **`tests/unit`** — content integrity: every project resolves an image through
  the asset pipeline, testimonials are attributed, copy uses typographic quotes,
  and no paragraph ends mid-sentence where an inline link was dropped.
- **`tests/build`** — parses `dist/`: unique titles, one `h1` per page, no
  skipped heading levels, alt text everywhere, internal links resolve, anchors
  exist, images are base-prefixed WebP with dimensions and `srcset`.
- **`tests/e2e`** — Playwright on desktop Chromium and mobile WebKit: project
  images open their detail page by click and by keyboard, prev/next walks the
  set, grayscale gives way to colour on hover, the mobile menu opens and
  navigates, the skip link works, and `prefers-reduced-motion` leaves nothing
  hidden.

`astro preview` daemonises itself without a TTY, so e2e serves `dist/` through
`scripts/serve-dist.mjs` instead.

## Deployment

`.github/workflows/deploy.yml` runs the full suite on every push to `main` and,
if it passes, publishes to two targets:

| Target | URL | Base path |
| --- | --- | --- |
| GitHub Pages (staging) | `https://tevih.github.io/prero/` | `/prero` |
| Bluehost (production) | the live domain | `/` |

Pages serves from a subpath, so `astro.config.mjs` defaults to `base: '/prero'`
and every internal link goes through `src/lib/url.ts`. The Bluehost job rebuilds
with `BASE_PATH=/` and re-runs the build tests against that output before
uploading, so a base-path regression cannot reach production.

### Bluehost setup

The Bluehost job is skipped until the repository variable `DEPLOY_BLUEHOST` is
`true`.

**1. Create an FTP account** in cPanel → *Files* → *FTP Accounts*. Point its
directory at the document root you are deploying to.

**2. Add these to the repo** (Settings → Secrets and variables → Actions):

| Name | Kind | Example |
| --- | --- | --- |
| `FTP_SERVER` | secret | `ftp.example.com` |
| `FTP_USERNAME` | secret | `deploy@example.com` |
| `FTP_PASSWORD` | secret | the FTP account password |
| `FTP_REMOTE_DIR` | variable | `/public_html/` — trailing slash required |
| `SITE_URL` | variable | `https://example.com` |
| `DEPLOY_BLUEHOST` | variable | `true` |

Or from the CLI:

```bash
gh secret set FTP_SERVER
gh variable set FTP_REMOTE_DIR --body "/public_html/"
gh variable set SITE_URL --body "https://example.com"
gh variable set DEPLOY_BLUEHOST --body "true"
```

**3. Push to `main`.** The first upload sends every file; later runs send only
what changed, tracked by a `.ftp-deploy-sync-state.json` the action keeps in the
remote directory.

The deploy only uploads — it never deletes files it did not put there, so an
existing site in `public_html` is left alone. Point `FTP_REMOTE_DIR` at a
subdirectory (`/public_html/staging/`) to try it out first.

`public/.htaccess` ships with the build and configures Apache: directory
indexes, the 404 document, immutable caching for fingerprinted assets,
revalidation for HTML, and compression. The HTTPS redirect in it is commented
out — uncomment it once cPanel has issued the certificate.

### Testing the deploy without CI

`scripts/deploy-bluehost.sh` runs the same steps as the Bluehost job, using the
same sync engine the GitHub Action wraps (`@samkirkland/ftp-deploy`), so a local
run and a CI run behave identically and share one remote state file.

```bash
cp .env.deploy.example .env.deploy   # gitignored; fill in your FTP details
npm run deploy:check                 # build, test, then dry run
npm run deploy:live                  # same, but actually uploads
```

`deploy:check` connects and authenticates for real, then prints exactly which
files it *would* add, change or delete — without writing anything. It is the
fastest way to confirm the server name, credentials and `FTP_REMOTE_DIR` are
right before letting CI near the domain.

Set `FTP_LOG_LEVEL=verbose` in `.env.deploy` to see every FTP command.

## Structure

```
src/
  assets/          Source images (optimised by Astro at build time)
  components/      SectionHead, ProjectCard
  data/            site.ts, work.ts, guide.ts — all page content
  layouts/Base.astro
  lib/url.ts       Base-path-aware internal links
  pages/           index, work (+ 17 projects), bio, contact, supporting-mdd, 404
  styles/global.css  Design tokens, grid, motion
public/.htaccess   Apache config, used by Bluehost only
scripts/           Foreground static server for e2e
```
