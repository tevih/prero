# Documentation

How this site is built and how to change it without breaking the design. These
docs are the source of truth for both people and AI assistants.

## The protocol

Every change follows the same loop:

1. **Before** — read the doc for the task (table below). Do not guess at
   conventions; they are all written down.
2. **During** — follow the design system. New things reuse existing tokens,
   classes, components and patterns. If something genuinely needs a new
   pattern, add it to the design system in the same change.
3. **After** — run `npm test`. Then ask: did this change anything these docs
   describe? If yes, update the doc in the same commit. A new visual element
   also needs a specimen on the design guide page and a row in
   [vocabulary.md](vocabulary.md) — the tests enforce that they match.

## Which doc

| Task | Read |
| --- | --- |
| The client named an element (“HP Billboard”, “eyebrow”) | [vocabulary.md](vocabulary.md) — then the design guide at `/design-guide/` |
| Add, edit, reorder or remove a project | [content-guide.md](content-guide.md) § Projects |
| Change copy on any page | [content-guide.md](content-guide.md) |
| Add a page or section, change layout | [design-system.md](design-system.md), then [architecture.md](architecture.md) |
| Change colours, type, spacing, motion | [design-system.md](design-system.md) — and expect to justify it |
| Understand where a file lives or why | [architecture.md](architecture.md) |
| Run, build, test locally | [development.md](development.md) |
| Deploy, or debug a deploy | [deployment.md](deployment.md) |

## The docs

- **[vocabulary.md](vocabulary.md)** — the name of every element on the site
  and where to change it. Mirrored live at `/design-guide/`.
- **[design-system.md](design-system.md)** — palette, the red budget, typography,
  the 16-column field, spacing, imagery rules, motion, components, page anatomy.
- **[architecture.md](architecture.md)** — stack, directory layout, the data
  layer, routing, the base layout, base-path handling, the image pipeline.
- **[content-guide.md](content-guide.md)** — step-by-step recipes for every
  kind of content change, and what the tests will catch.
- **[development.md](development.md)** — Node version, commands, the test suites.
- **[deployment.md](deployment.md)** — GitHub Pages and Bluehost, secrets,
  verification, the current state of production.

## Ground rules that apply everywhere

- Content lives in `src/data/`. Pages render it. Never hard-code copy in a page.
- Internal links go through `url()` from `src/lib/url.ts`. Never write `href="/…"`.
- Copy uses typographic quotes (’ “ ”) and never straight ones. Tests enforce this.
- Red, black, white, grayscale. No other colour, anywhere, for any reason.
- Two fonts: Inter and IBM Plex Mono. No third.
- If a test fails after a change, the change is wrong until proven otherwise.
