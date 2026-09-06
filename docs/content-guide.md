# Content guide

Recipes for every kind of content change. All copy lives in `src/data/`; you
should almost never touch a `.astro` file to change words.

After any change: `npm test`. The last section explains what it catches.

Copy rules that apply to every string: typographic quotes (’ “ ”) only, no
double spaces, no leading or trailing whitespace, sentences end in
punctuation. Tests enforce all four.

## Projects

### Add a project

1. **Hero image** → `src/assets/work/<slug>.jpg` (or `.png`). ≤ 1800px wide,
   quality ~82. This is what appears on the cards and at the top of the project
   page.

2. **Plates** → `src/assets/projects/<slug>/01.jpg`, `02.jpg`, … Zero-padded
   two-digit names; that is the display order. Same size rules.

3. **Register it** in `src/data/work.ts`. Import the hero at the top, then add
   an entry to `projects` *in the position you want it to appear* — the array
   order is the numbering:

   ```ts
   import newThing from '../assets/work/new-thing.jpg';
   // …
   { slug: 'new-thing', title: 'New Thing', client: 'Client', image: newThing, discipline: 'Furniture' },
   ```

   The slug is the URL (`/work/new-thing/`) and must match the plates folder.
   Lowercase, hyphens, no spaces.

4. **Write the narrative** in `src/data/descriptions.ts`:

   ```ts
   'new-thing': [
   	{ type: 'p', text: 'First paragraph is set larger as the lede.' },
   	{ type: 'p', text: 'Following paragraphs are body copy.' },
   	{ type: 'list', items: ['A point.', 'Another point.'] },
   ],
   ```

   The first `p` renders as the lede. Lists render with a tinted red left rule.

5. **Optional** — a live product site, in the same file:

   ```ts
   export const projectSites = { 'new-thing': 'https://example.com/', … }
   ```

6. `npm test`. The home page's facts strip and the work index count update
   themselves.

### Edit a project

Title, client, discipline: `work.ts`. Narrative: `descriptions.ts`. Swap a
hero image by replacing the file. Add or remove plates by adding or removing
numbered files — keep the numbering contiguous.

### Reorder projects

Move the entry in `projects`. Numbers, prev/next and the index all follow.

### Remove a project

Delete its entry in `projects`, its block in `descriptions`, its hero file and
its plates folder. Remove the import at the top of `work.ts`. If it had a
`projectSites` entry, remove that too.

## Home page

| What | Where |
| --- | --- |
| The alarm-clock story | `origin` in `site.ts`. One line may carry `accent: 'word'` to set that word in red. Only one. |
| Four facts | `facts` in `site.ts`. The project count is computed; the others are strings. |
| Intro paragraph | `bio[0]` — shared with the bio page |
| Metadata under the name (Discipline, Practice, Based, Since) | `src/pages/index.astro` — the one place copy sits in a page, because it is layout-bound |
| Capabilities list | `services` in `site.ts` |

## Bio page

| What | Where in `site.ts` |
| --- | --- |
| Statement paragraphs | `bio` |
| Industries paragraph | `bioCoda` |
| The Dad-jokes line | `bioJoke` |
| Services (numbered list) | `services` |
| Experience | `experience` — `{ role, org }`, most recent first |
| Education, patents, awards | `credentials` |
| Featured-in links | `press` |
| Skills chips | `skills` — the last entry is struck through as the gag; `skillsPunchline` follows |
| Testimonials | `testimonials` — `{ quote, name, title }` |
| Elsewhere links | `links` |

## Contact page

`site.email`, `site.phone` (display) and `site.phoneHref` (dialable, `+1…`),
`site.location`, `contactIntro`, `contactHours`. The Elsewhere chips reuse
`links`.

## Supporting MDD guide

All in `src/data/guide.ts`.

| What | Export |
| --- | --- |
| Title, subtitle, version, author | `guide` |
| Preface paragraphs | `intro` — the second is set large; the third is a quiet aside |
| The disclaimer box | `note` |
| The “not a disqualifier” passage | `disqualifier` — the `quote` block is the pull quote |
| The tips | `tips` — `{ title, blocks }`. Numbering and anchors (`#tip-4`) follow array order |
| Closing | `outro` |

Blocks: `p` paragraph, `list` with `items`, `quote` for a pull quote. Add a tip
by appending to `tips`; the contents list updates.

The crisis-resource box at the end is in `src/pages/supporting-mdd/index.astro`
and should stay.

## Navigation

`nav` in `site.ts`: `{ label, href }`. Hrefs are root-relative with a trailing
slash (`/work/`). The header, mobile menu, footer and 404 all read it. Adding a
page means adding a route under `src/pages/` **and** an entry here.

## Identity and footer

`site.name`, `site.tagline`, `site.credit`. The year in the credit is stamped
at build time from `copyrightYear`; do not hard-code it.

## Adding a page

1. Read [design-system.md](design-system.md) § Page anatomy.
2. Create `src/pages/<name>/index.astro` using `Base` with `title`,
   `description` and optionally `section`.
3. Put its copy in `site.ts` (or a new file in `src/data/` if it is large).
4. Follow the masthead → rule → content order. One `h1`.
5. Add it to `nav` if it belongs in the menu.
6. Add its route to `PAGE_ROUTES` in `tests/build/html.test.ts` and to `PAGES`
   in `tests/e2e/site.spec.ts`.
7. `npm test`.

## Adding a component or visual pattern

1. Build it with existing tokens and classes ([design-system.md](design-system.md)).
2. Name it. Add a `<Spec name="…">` (or a `<Tag>` inside an existing spec) on
   `src/pages/design-guide/index.astro` showing it, and a row in
   [vocabulary.md](vocabulary.md) saying where it lives.
3. `npm test` — the build suite checks the page and the vocabulary agree.

## What the tests catch

Run `npm test` after every change. Failures are almost always one of these:

| Failure | Cause |
| --- | --- |
| straight quotes in … | A `'` or `"` in copy. Use ’ “ ”. |
| ends mid-sentence | A paragraph that does not end in `.`, `!`, `?`, `”` or `)` — usually a dropped link or a truncated paste. |
| width / height 0 | A hero import that does not resolve — wrong path or filename. |
| duplicate titles / reused images | Two projects sharing a title or hero. |
| links to missing route | An `href` to a page that does not exist, or a slug mismatch between `work.ts` and the plates folder. |
| unprefixed | An `href="/…"` written without `url()`. |
| alt too short | An image without meaningful alt text. |
| h1 count | A page with zero or two `h1`s. |
| jumps h2 → h4 | A skipped heading level. |
| dangling anchor | A `#tip-n` link with no matching section. |

If a test fails and you believe the test is wrong, the doc that describes the
rule is wrong too — fix both, in the same commit.
