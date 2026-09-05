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

Pushes to `main` run the full suite and, if it passes, publish to GitHub Pages
via `.github/workflows/deploy.yml`.

Pages serves the site from a subpath, so `astro.config.mjs` sets
`base: '/prero'` and every internal link goes through `src/lib/url.ts`. For a
custom domain, build with `SITE=https://example.com BASE_PATH=/`.

## Structure

```
src/
  assets/          Source images (optimised by Astro at build time)
  components/      SectionHead, ProjectCard
  data/            site.ts, work.ts, guide.ts — all page content
  layouts/Base.astro
  pages/           index, work, bio, contact, supporting-mdd
  styles/global.css  Design tokens, grid, motion
```
