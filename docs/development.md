# Development

## Requirements

Node **22.12 or newer** — Astro's minimum. The version is pinned in `.nvmrc`:

```bash
nvm use
npm install
```

If `npm run dev` fails with "Node.js v20 is not supported", the shell is on the
wrong Node. `nvm use` fixes it for that shell.

First run of the end-to-end tests needs browsers:

```bash
npx playwright install chromium webkit
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at `http://localhost:4321/prero/` |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm test` | Build, then run every suite |
| `npm run test:unit` | Data checks — fast, no build |
| `npm run test:build` | Build, then assertions on `dist/` |
| `npm run test:e2e` | Playwright on Chromium + WebKit (builds first) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run deploy:verify` | Check the Bluehost FTP connection, upload nothing |
| `npm run deploy:check` | Build, test, dry-run the Bluehost upload |
| `npm run deploy:live` | Build, test, upload to Bluehost |

The dev server runs at `/prero/` because the default base path matches GitHub
Pages. To develop against a root path: `BASE_PATH=/ npm run dev`.

Astro 7 backgrounds its dev and preview servers when stdout is not a TTY.
`astro dev stop` / `astro preview stop` shut them down.

## Tests

Three suites. `npm test` runs all of them; each has its own script.

### `tests/unit` — the data

Runs against `src/data/*` through Astro's Vite config, so image imports
resolve. Checks: every project has a title, client, discipline and an image
with real dimensions; no duplicate titles or heroes; testimonials are
attributed; outbound links are absolute; the origin story has exactly one
accent and it is `better`; the skills list ends on the gag; the guide's tips
have unique titles and non-empty blocks; copy uses typographic quotes, has no
double spaces, and no paragraph ends mid-sentence.

### `tests/build` — the HTML

Parses every `index.html` in `dist/` with linkedom. Checks: every route exists
and there is one project page per project; titles and descriptions are unique
and non-empty; `lang` and favicon are set; no `undefined`/`NaN` leaked into
markup; one `h1` per page; no skipped heading levels; alt text on every image;
a skip link to `#main`; every `nav` is labelled; exactly one `aria-current`;
external links carry `rel="noopener"`; internal links resolve to built routes;
in-page anchors exist; every internal link and asset carries the deploy base;
images are WebP with `width`, `height` and `srcset`; below-the-fold images are
lazy; project cards are links; every project page has a lead, narrative,
plates and prev/next; the 404 page and `.htaccess` ship.

The suite reads `BASE_PATH` so it can verify either deploy target:

```bash
BASE_PATH=/ npm run test:build
```

### `tests/e2e` — the browser

Playwright against the built site, served by `scripts/serve-dist.mjs` (a
foreground static server — `astro preview` daemonises itself without a TTY and
Playwright would think it died). Two projects: desktop Chromium and mobile
WebKit (iPhone 13).

Checks: every page renders with one `h1` and no console errors; the current
page is marked in the nav; clicking a project image opens its page, and so
does the index row, and so does Enter on a focused card; project pages show
lead, narrative and numbered plates; next/previous walk the set and "All work"
returns; every project page loads clean; cards are grayscale and go to colour
on hover (desktop); the mobile menu opens, closes, and navigates; the skip
link is first in tab order (Chromium) and works (both); guide anchors scroll
to the tip; reveals fire on scroll; nothing is hidden under reduced motion.

Run one project or one test:

```bash
npx playwright test --project=desktop
npx playwright test -g "mobile menu"
```

A failed run leaves a report in `playwright-report/` and, in CI, uploads it as
an artifact.

## Adding a test

- A rule about **content** → `tests/unit/content.test.ts`.
- A rule about **markup or structure** → `tests/build/html.test.ts`.
- A rule about **behaviour** → `tests/e2e/site.spec.ts`.

Derive counts from the data (`projects.length`, `tips.length`), never
literals. Name the test for the rule it enforces, in plain language.
