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
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the build locally |

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
