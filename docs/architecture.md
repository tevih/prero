# Architecture

## Stack

- **Astro 7** — static output, no server. Every page is HTML at build time.
- **Tailwind CSS 4** via `@tailwindcss/vite`. Design tokens are `@theme`
  variables in `src/styles/global.css`.
- **Fontsource** — Inter Variable and IBM Plex Mono, self-hosted. No external
  font requests.
- **Sharp** (bundled with Astro) — resizes and converts images at build time.
- **Vitest + linkedom** — unit tests on the data, structural tests on `dist/`.
- **Playwright** — end-to-end on desktop Chromium and mobile WebKit.
- **Node 22.12+** — pinned in `.nvmrc`.

## Directory layout

```
src/
  assets/
    headshot.png              portrait
    work/<slug>.jpg           one hero image per project
    projects/<slug>/NN.jpg    gallery plates, zero-padded — order is filename order
  components/
    SectionHead.astro         rule + red index + label
    ProjectCard.astro         linked grayscale card
  data/
    site.ts                   identity, nav, home copy, bio, contact — all text
    work.ts                   the projects array, hero imports, gallery lookup
    descriptions.ts           long-form project copy as blocks, live-site links
    guide.ts                  the Supporting MDD guide, and the Block type
  layouts/
    Base.astro                head, header, nav, footer, reveal script
  lib/
    url.ts                    base-path-aware href helper
  pages/
    index.astro               home
    work/index.astro          project index
    work/[slug].astro         one page per project
    bio/index.astro
    contact/index.astro
    supporting-mdd/index.astro
    404.astro
  styles/
    global.css                tokens, .field, .display, .label, motion
public/
  favicon.svg
  .htaccess                   Apache config; Bluehost only, Pages ignores it
scripts/
  serve-dist.mjs              foreground static server for Playwright
  deploy-bluehost.sh          local deploy, dry run by default
  check-ftp.mjs               connection checker, uploads nothing
tests/
  unit/                       data integrity
  build/                      assertions on dist/
  e2e/                        Playwright
docs/                         you are here
.github/workflows/
  deploy.yml                  test, then deploy to Pages and Bluehost
  verify-ftp.yml              manual connection check from a runner
```

## The data layer

**Pages contain no copy.** Every string a visitor reads lives in `src/data/`
and pages import it. This is what makes content edits safe: change a string,
run the tests, done — no markup involved.

### `site.ts`

| Export | Shape | Feeds |
| --- | --- | --- |
| `site` | name, tagline, email, phone, location, credit | header, footer, contact |
| `copyrightYear` | `new Date().getFullYear()` at build | footer credit |
| `nav` | `{ label, href }[]` | header, mobile menu, footer, 404 |
| `origin` | `{ text, accent? }[]` | the alarm-clock story on the home page |
| `facts` | `{ figure, label }[]` | the four numerals on the home page |
| `bio`, `bioCoda`, `bioJoke` | strings | bio page, home intro |
| `services` | `string[]` | capabilities lists |
| `experience` | `{ role, org }[]` | bio |
| `credentials`, `skills`, `skillsPunchline` | strings | bio |
| `press`, `links` | `{ label, href }[]` | bio, contact |
| `testimonials` | `{ quote, name, title }[]` | bio |
| `contactIntro`, `contactHours` | strings | contact |

`facts` derives the project count from `work.ts`, so it never goes stale.

### `work.ts`

```ts
interface Project {
	slug: string;        // URL segment and gallery folder name
	title: string;
	client: string;
	image: ImageMetadata; // hero, imported at the top of the file
	discipline: string;
}
export const projects: Project[]
export const galleryFor(slug): ImageMetadata[]
export const projectBySlug(slug): Project | undefined
```

The order of `projects` is the display order and the numbering everywhere.
Galleries are resolved with `import.meta.glob` over
`src/assets/projects/**`, grouped by folder and sorted by filename — hence
the zero-padded names.

### `descriptions.ts`

`descriptions: Record<slug, Block[]>` — project narrative. `projectSites:
Record<slug, url>` — an optional live product site, rendered as a link under
the narrative.

### `guide.ts`

The Supporting MDD guide, and the `Block` type shared with `descriptions.ts`:

```ts
interface Block {
	type: 'p' | 'quote' | 'list' | 'sub';
	text?: string;    // p, quote, sub
	items?: string[]; // list
}
```

Exports: `guide` (title, subtitle, version, author), `intro`, `note`,
`disqualifier`, `tips: { title, blocks }[]`, `outro`.

## Routing

Astro file-based routing with `trailingSlash: 'always'`. Every route is a
directory with an `index.html`.

`work/[slug].astro` is the one dynamic route. `getStaticPaths()` returns one
path per entry in `projects`, passing the project and its index as props, so
the page knows its number and its neighbours for prev/next (which wrap).

`404.astro` builds to `dist/404.html`. Apache serves it via `ErrorDocument`
in `.htaccess`; GitHub Pages picks it up by convention.

## The base layout

`Base.astro` owns everything outside `<main>`:

- `<head>`: charset, viewport, favicon, title (`{title} — Gabriel Prero`, or
  the tagline on the home page), description, Open Graph.
- Skip link to `#main`.
- Sticky header: wordmark + red square, desktop nav with `aria-current` and a
  red underline on the active item, a `Menu`/`Close` toggle below `md`.
- Optional **section strip**: pass `section="…"` for a mono line under the
  header.
- `<main id="main">` with the page's slot.
- Footer: call to action, contact column, pages column, credit.
- One inline script: the mobile menu toggle, and an `IntersectionObserver`
  that adds `.is-in` to `[data-reveal]` and `[data-draw]` elements. Under
  reduced motion it adds the class to everything immediately.

Active-nav detection strips the deploy base from `Astro.url.pathname` before
comparing to `nav[].href`, so it works at `/` and at `/prero/`.

## Base path

The site deploys to two places with different roots (see
[deployment.md](deployment.md)). `astro.config.mjs` reads `BASE_PATH`
(default `/prero`) and `SITE`.

**Every internal href goes through `url()`:**

```astro
import { url } from '../lib/url';
<a href={url('/work/')}>
```

`url()` prefixes `import.meta.env.BASE_URL`. Writing `href="/work/"` directly
breaks on Pages; the build tests catch it.

Astro's `<Image>` handles the base for image `src` and `srcset` on its own.

## Image pipeline

Source images are imported (hero, portrait) or globbed (plates) from
`src/assets/`, which makes them `ImageMetadata` objects with real dimensions.
`<Image>` from `astro:assets` emits `<img>` with `width`, `height`, a WebP
`src`, a `srcset` for the requested `widths`, and `sizes`. Output lands in
`dist/_astro/` with content hashes, which is why `.htaccess` caches that path
for a year.

Nothing in `public/` is processed. Only the favicon and `.htaccess` live there.

## Build output

`npm run build` → `dist/`. One `index.html` per route, `404.html`,
`_astro/` for hashed CSS and images, plus `favicon.svg` and `.htaccess` copied
from `public/`. 2–3 MB total. The tests in `tests/build/` parse this directory.
