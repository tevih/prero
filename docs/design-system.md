# Design system

Minimalist Swiss / International Typographic style. Red, black, white and
grayscale only. Every element described here is rendered live, with its name,
at `/design-guide/`; the names are mapped to files in [vocabulary.md](vocabulary.md). Everything here is implemented in `src/styles/global.css` and
used by the pages in `src/pages/`; this document explains the intent so changes
respect it.

## Principles

1. **The grid is the design.** Content sits on a 16-column field. Alignment
   does the work that decoration would otherwise do.
2. **Type carries the page.** Huge, tight, uppercase display type at the top;
   quiet lowercase body copy below. Pages *descend* from shout to speech.
3. **Red is rationed.** Roughly two appearances per screen. It marks, it never
   fills.
4. **Voids are deliberate.** Dense clusters of information sit against generous
   empty space. Do not fill the gaps.
5. **Asymmetry over centring.** Content starts off-centre and leaves a trailing
   column empty. Nothing is centred except by accident of the grid.

## Palette

Defined as Tailwind theme tokens in `global.css`. Use the token names
(`bg-ink`, `text-red`, `border-gray-200`), never raw hex in a page.

| Token | Hex | Use |
| --- | --- | --- |
| `ink` | `#0a0a0a` | Text, rules that matter, the footer and origin band |
| `paper` | `#fafafa` | Page background, text on ink |
| `red` | `#e10600` | Accents only — see the budget below |
| `red-deep` | `#b00400` | Red for small text on paper, where contrast needs it |
| `gray-050` | `#f2f2f2` | Image placeholders, quiet panels |
| `gray-100` | `#e6e6e6` | Hairline dividers between list rows |
| `gray-200` | `#d1d1d1` | Structural rules (`.rule`), borders, chips |
| `gray-300` | `#b4b4b4` | Inactive numerals, arrows, placeholders |
| `gray-400` | `#8f8f8f` | Labels, inactive nav |
| `gray-500` | `#6b6b6b` | Secondary text, captions |
| `gray-600` | `#4d4d4d` | Quiet body copy |
| `gray-700` | `#333333` | Body copy |
| `gray-800` | `#1f1f1f` | Rules on ink |
| `gray-900` | `#141414` | Reserved |

### The red budget

Red appears **about twice per screen, at rest**. Hover and focus states are
transient and do not count.

Where red is used, and this is the complete list:

- The 2×2 square beside the wordmark in the header (desktop only)
- The hairline under the active nav item
- The index numeral in `SectionHead` (`01`, `02`)
- Mono labels that open a page: `A guide`, `Tip 04`, `404`
- The single accented word in the origin story — `better`
- The strikethrough on the *Night Vision* gag
- Tinted left rules on quoted lists (`border-red/30`)
- The left border of the crisis-resource box in the guide
- Transient: hover colour on numerals, links and arrows; the focus ring;
  text selection

Where red is never used:

- Body text of any length
- Fills larger than the header square
- Backgrounds
- Anywhere in the emotional content of the Supporting MDD guide beyond the
  tip numerals and the crisis box

Adding a red element means asking which existing one on that screen it
replaces.

## Typography

Two faces, self-hosted from Fontsource. No third face, ever.

| Role | Face | Token |
| --- | --- | --- |
| Display and body | Inter Variable (fallback Helvetica Neue) | `font-sans` |
| Labels, numerals, captions | IBM Plex Mono 400 / 500 | `font-mono` |

### Utility classes

**`.display`** — page titles and big numerals. Bold, uppercase, letter-spacing
−0.035em, line-height 0.86, `text-wrap: balance`. Size is set per use with a
clamp; see the scale below.

**`.label`** — every small caps-style marker. Plex Mono, 11px, weight 500,
letter-spacing 0.18em, uppercase. Section names, table headers, nav, captions,
figure numbers.

**`.prose-swiss`** — wraps long-form copy. Paragraphs inside are capped at
68ch with line-height 1.62.

### Scale

Sizes are fluid `clamp()` values. Reuse these; do not invent sizes.

| Use | Classes |
| --- | --- |
| Home page name | `display text-[clamp(3.25rem,15vw,15rem)]` |
| Index page title (Work, Bio) | `display text-[clamp(3.25rem,14vw,13rem)]` |
| Contact title | `display text-[clamp(3.25rem,13vw,12rem)]` |
| 404 title | `display text-[clamp(2.75rem,11vw,10rem)]` |
| Project title | `display text-[clamp(2.5rem,8vw,7rem)]` |
| Facts numerals | `display text-[clamp(2.75rem,7vw,4.5rem)]` |
| Guide title (sentence case, not `.display`) | `text-[clamp(2rem,5.4vw,4.25rem)] leading-[1.06] font-bold tracking-[-0.03em]` |
| Guide section heading | `text-[clamp(1.5rem,3.4vw,2.35rem)] leading-[1.12] font-bold tracking-[-0.03em]` |
| Origin story lines | `text-[clamp(1.35rem,3.4vw,2.6rem)] leading-[1.24] font-medium tracking-tight` |
| Pull quote | `text-[clamp(1.6rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em]` |
| Project lede | `text-[clamp(1.15rem,2.4vw,1.6rem)] leading-snug font-medium tracking-tight` |
| Lede paragraph | `text-lg md:text-xl leading-relaxed text-gray-700` |
| Body | `text-base md:text-lg leading-relaxed text-gray-700 text-pretty` |
| Card / row title | `text-base md:text-lg font-medium tracking-tight leading-snug` |
| Meta | `text-sm text-gray-500` |

### The crossover rule

A page opens in uppercase display type and resolves into lowercase body copy.
Nothing after the masthead is uppercase except `.label`. Do not put a
`.display` heading in the lower half of a page.

### Copy rules

- Typographic quotes and apostrophes: ’ “ ” — never `'` or `"`. Tests fail
  on straight quotes.
- Sentence case for headings other than `.display`.
- `text-balance` on short headings, `text-pretty` on paragraphs.
- Numerals in `.label` are zero-padded: `01`, not `1`.

## The field

`.field` is the only layout container. It is a CSS grid with a gutter, a
max-width of 96rem and centred margins.

| Viewport | Columns | Gutter | Side padding |
| --- | --- | --- | --- |
| below 48rem | 4 | 1rem | 1.5rem |
| 48rem and up (`md:`) | 8 | 1.5rem | 2.5rem |
| 80rem and up (`xl:`) | 16 | 1.5rem | 4rem |

Only `md:` and `xl:` breakpoints are used, ever, so they line up with the
column counts. Do not introduce `sm:`, `lg:` or `2xl:`.

Every direct child of `.field` declares its span at all three sizes:

```html
<div class="col-span-4 md:col-span-8 xl:col-span-16">   full width
<div class="col-span-4 md:col-span-8 xl:col-span-10 xl:col-start-5">   text column
```

### Recurring column patterns

| Pattern | Classes | Used for |
| --- | --- | --- |
| Full | `col-span-4 md:col-span-8 xl:col-span-16` | Rules, mastheads, lists |
| Side label + column | label `xl:col-span-3`, content `xl:col-span-10 xl:col-start-5` | Guide, project narrative, origin story |
| Offset statement | `xl:col-span-10 xl:col-start-4` | Bio statement, contact intro |
| Offset intro | `xl:col-span-9 xl:col-start-7` | Home intro |
| Three-up cards | `col-span-4 md:col-span-4 xl:col-span-5` | Project cards, testimonials — leaves one column empty |
| Four-up | `col-span-2 md:col-span-2 xl:col-span-4` | Facts |
| Two-up plates | `xl:col-span-8`, every third `xl:col-span-16` | Project galleries |

The trailing empty column in the three-up pattern is intentional. Do not
stretch cards to fill it.

## Spacing and rules

The spacing unit is **8px**. `--spacing: 0.5rem` in the theme means every
Tailwind spacing number is doubled relative to the default:

| Class | Size |
| --- | --- |
| `p-1` `gap-1` `mt-1` | 8px |
| `p-2` | 16px |
| `p-4` | 32px |
| `p-8` | 64px |
| `p-16` | 128px |

Section rhythm: `py-16 md:py-24` for a normal section, `pb-24 md:pb-32`
between major blocks, `py-24 md:py-40` for the black origin band. The footer
sits under `mt-32 md:mt-40`.

Rules are structure, not decoration:

- **`.rule-ink`** — 1px ink. Opens a section, sits under a masthead, tops a
  table. Pair it with `data-draw` so it draws in from the left.
- **`.rule`** — 1px `gray-200`. Softer division inside a section.
- **`border-b border-gray-100`** — hairline between list rows.

## Imagery

Photography is the only colour on the site, and it is rationed the same way
red is.

| Where | Treatment |
| --- | --- |
| Project cards on the home and work index | **Grayscale.** Full colour on hover and keyboard focus. |
| Project detail: lead image and plates | **Full colour.** The detail page is where the work is judged. |
| Portrait | Grayscale, always |

Implementation on cards: `grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0`
with `transition-[filter,transform] duration-700` and a `1.03` scale on hover.

Source files live in `src/assets/` and go through Astro's `<Image>`:

- JPEG or PNG, **1800px wide maximum**, JPEG quality ~82. Larger sources are
  wasted bytes in git — Astro emits WebP at the widths the page asks for.
- Always pass `widths` and `sizes`. Cards use `[400, 800, 1200]`; leads and
  plates use `[600, 1200, 1800]`.
- Above the fold: `loading="eager"`. Everything else: `loading="lazy"`.
- Alt text is required, meaningful, and longer than three characters. Tests
  enforce it. Pattern: `"{title} — {client}"` for cards, `"{title} — plate 03"`
  for plates.

## Motion

Two attributes, one script in `Base.astro`, and nothing else.

**`data-reveal`** — the element fades in and rises 16px when it enters the
viewport. Stagger siblings with `style="--reveal-delay:{n}ms"` in **40ms steps**.
Wrap long lists: `(i % 3) * 40` or `(i % 4) * 40`, never `i * 40`, so the tail
of a list does not wait seconds.

**`data-draw`** — for rules. Scales in from the left over 0.72s. Put it on the
`.rule-ink` element itself.

Easing is `cubic-bezier(0.16, 1, 0.3, 1)` everywhere. Hover transitions are
300–700ms with the same curve.

Under `prefers-reduced-motion: reduce` neither attribute does anything and
everything is visible immediately. Tests verify this. Do not add motion that
bypasses the attributes.

## Components

**`SectionHead`** (`src/components/SectionHead.astro`) — an ink rule that draws
in, then a red index numeral and a gray label. Props: `index` (`"01"`),
`title`, optional `class` for margins. Every titled section below a masthead
uses it.

**`ProjectCard`** (`src/components/ProjectCard.astro`) — a grayscale 4:3 image,
numeral, title, client and an arrow, all inside one link to the project page.
Props: `project`, `index` (zero-based; rendered zero-padded), `delay`.

Add a component when the same markup appears on a third page. Not before.

## Page anatomy

Every page follows the same top-to-bottom order:

1. **Header** (from `Base`): wordmark, red square, mono nav with the active
   item underlined. Sticky, translucent paper.
2. **Section strip** (optional `section` prop on `Base`): one mono line under
   the header, e.g. `Portfolio — 17 projects`.
3. **Masthead**: `pt-16 md:pt-24`, a `.display` `h1`, sometimes a mono label
   above it. One `h1` per page — tests enforce it.
4. **Rule**: `.rule-ink` with `data-draw`, full width.
5. **Content**: sections separated by `SectionHead`, or by side-label rows in
   long-form pages.
6. **Footer** (from `Base`): ink band, “Let’s make stuff better.” with a red-
   underlined call to action, contact column, pages column, credit line.

Long-form pages (the guide, project narratives) use the side-label pattern: a
mono label in `xl:col-span-3`, copy in `xl:col-span-10 xl:col-start-5`.

## Do / don’t

**Do**
- Reuse a class from the scale table. Ask which pattern the new thing is
  closest to.
- Leave the trailing column empty in three-up grids.
- Let rules and whitespace separate things.
- Zero-pad numerals.
- Stagger reveals with `% 3` or `% 4`.

**Don’t**
- Add a colour. Not a tint of red, not an off-white, not a blue link.
- Add a font, an icon library, or an emoji.
- Centre text.
- Use `sm:`, `lg:` or `2xl:` breakpoints.
- Use shadows, rounded corners, gradients or borders thicker than 2px.
- Put uppercase below the masthead except in `.label`.
- Set colour on a project image outside a hover or focus state on the index
  pages.
- Animate anything without `data-reveal` / `data-draw`.
