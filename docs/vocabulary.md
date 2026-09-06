# Vocabulary

The name of every element on the site, what it is, and where to change it.
The same names appear on the design guide page at `/design-guide/`, rendered
live so the client can point at things. The build tests fail if this file and
that page disagree.

When the client names an element — “the HP Billboard eyebrow”, “the Footer
CTA” — find it here first.

## Foundations

| Name | What it is | Where |
| --- | --- | --- |
| **Palette** | The colour tokens: ink, paper, red, and the gray ramp | `src/styles/global.css` `@theme` |
| **Type Styles** | The set of text treatments below | `src/styles/global.css` |
| **Display** | Huge, bold, uppercase, tight — page titles and big numerals | `.display` |
| **Eyebrow** | The small mono uppercase line above a title. Also just “label” when it is not above a title | `.label` |
| **Lede** | The opening paragraph, one size up from body | `text-lg md:text-xl text-gray-700` |
| **Body** | Reading copy | `text-base md:text-lg text-gray-700` |
| **Meta** | Secondary detail — client, caption, date | `text-sm text-gray-500` |
| **Mono Numeral** | Zero-padded numbers in Plex Mono: 01, 02 | `.label` |
| **Rules** | The three horizontal lines below | `src/styles/global.css` |
| **Ink Rule** | 1px black. Opens a section, sits under a masthead | `.rule-ink` |
| **Gray Rule** | 1px gray-200. Softer division inside a section | `.rule` |
| **Hairline** | 1px gray-100 between list rows | `border-b border-gray-100` |
| **The Field** | The 4 / 8 / 16 column grid every page sits on | `.field` |
| **Spacing** | The 8px unit and its multiples | `--spacing` in `global.css` |
| **Reveal Motion** | Fade-and-rise on scroll; rules draw in from the left | `data-reveal`, `data-draw` |

## Site frame — on every page

| Name | What it is | Where |
| --- | --- | --- |
| **Header Bar** | The sticky bar at the top | `src/layouts/Base.astro` |
| **Wordmark** | “Prero”, top left, links home | `Base.astro` |
| **Brand Mark** | The small red square beside the wordmark | `Base.astro` |
| **Main Navigation** | The page links, top right | `nav` in `src/data/site.ts` |
| **Active Indicator** | The red line under the current page’s link | `Base.astro` |
| **Mobile Menu** | The navigation panel below tablet width | `Base.astro` |
| **Menu Toggle** | The “Menu” / “Close” button | `Base.astro` |
| **Menu Row** | One page link in the mobile panel | `Base.astro` |
| **Section Strip** | The one-line mono strip under the header (“Portfolio — 17 projects”) | `section` prop on `Base` in each page |
| **Skip Link** | Keyboard-only link that jumps past the header | `Base.astro` |
| **Footer** | The black band at the bottom | `Base.astro` |
| **Footer Billboard** | “Let’s make stuff better.” | `Base.astro` |
| **Footer CTA** | “Start a conversation →” | `Base.astro` |
| **Direct Column** | Email, phone, location in the footer | `site` in `site.ts` |
| **Pages Column** | Page links in the footer | `nav` in `site.ts` |
| **Credit Line** | “Designed by … © Copyright …” | `site.credit`, `copyrightYear` in `site.ts` |

## Shared patterns — used on several pages

| Name | What it is | Where |
| --- | --- | --- |
| **Masthead** | The top of a page: eyebrow, title, rule | each page under `src/pages/` |
| **Masthead Eyebrow** | The mono line above a page title | each page |
| **Masthead Title** | The page title in Display | each page |
| **Section Head** | Rule, red numeral, gray label that opens a section | `src/components/SectionHead.astro` |
| **Index Numeral** | The red 01 / 02 in a Section Head | `SectionHead.astro` |
| **Section Label** | The gray title in a Section Head | `SectionHead.astro` |
| **Text Link** | Mono, ink underline, arrow — “Read the full bio →” | inline in pages |
| **Arrow Row** | Full-width link row with an arrow at the right | inline in pages |
| **Numbered Row** | Numeral plus text, hairline-divided | inline in pages |
| **Chip** | Small bordered item | bio, contact |
| **Struck Chip** | The last skill, struck through in red | `skills` in `site.ts` |
| **Side Label** | Mono label in the left column beside long copy | guide, project, home |
| **Note Box** | Gray panel for a disclaimer | guide |
| **Pull Quote** | One line set large between two ink rules | guide |
| **Quoted List** | List with a faint red rule on the left | guide, project |
| **Aside** | Smaller gray paragraph behind a gray rule | guide |

## Home page

| Name | What it is | Where |
| --- | --- | --- |
| **HP Billboard** | The first screen | `src/pages/index.astro` |
| **Billboard Eyebrow** | Red square + “Design + Product_Development” | `site.tagline` in `site.ts` |
| **Billboard Name** | GABRIEL PRERO | `index.astro` |
| **Billboard Rule** | The ink rule under the name | `index.astro` |
| **Metadata Cluster** | Discipline / Practice / Based / Since | `index.astro` — the one place copy sits in a page |
| **Metadata Item** | One label-and-value pair in the cluster | `index.astro` |
| **Origin Band** | The black section with the alarm-clock story | `origin` in `site.ts` |
| **Origin Side Label** | “Why design” | `index.astro` |
| **Origin Line** | One sentence of the story | `origin` in `site.ts` |
| **Accent Word** | The single red word — “better” | `accent` on one `origin` line |
| **Facts Strip** | The four numerals | `facts` in `site.ts` |
| **Fact Tile** | One numeral with its label | `facts` |
| **Fact Numeral** | The big number | `facts[].figure` |
| **Fact Label** | The mono caption under it | `facts[].label` |
| **Intro Block** | Portrait beside the first bio paragraph | `index.astro` |
| **Portrait** | The photo of Gabriel, grayscale | `src/assets/headshot.png` |
| **Intro Paragraph** | The first paragraph of the bio | `bio[0]` in `site.ts` |
| **Selected Work** | The six cards on the home page | `index.astro`, first six of `projects` |
| **Project Card** | Image, numeral, title, client, arrow — one link | `src/components/ProjectCard.astro` |
| **Card Image** | The project’s hero, grayscale until hovered | `image` in `work.ts` |
| **Card Numeral** | The project’s number | position in `projects` |
| **Card Title** | Project title | `title` in `work.ts` |
| **Card Client** | Client name under the title | `client` in `work.ts` |
| **Card Arrow** | The arrow at the right of the card | `ProjectCard.astro` |
| **Index Link** | “All 17 projects →” | `index.astro` |
| **Capabilities** | The numbered services list | `services` in `site.ts` |

## Work index

| Name | What it is | Where |
| --- | --- | --- |
| **Project Index** | The typographic table of every project | `src/pages/work/index.astro` |
| **Index Header** | No. / Project / Client / Discipline | `work/index.astro` |
| **Index Row** | One project as a linked row | `projects` in `work.ts` |
| **Plates Grid** | Every project as a card, under “Plates” | `work/index.astro` |
| **Footnote** | The small note about hovering | `work/index.astro` |

## Project page

| Name | What it is | Where |
| --- | --- | --- |
| **Back Link** | “← All work” | `src/pages/work/[slug].astro` |
| **Project Rule** | Ink rule with number and client | `[slug].astro` |
| **Project Numeral** | The red project number | position in `projects` |
| **Client Label** | The client, in gray | `client` in `work.ts` |
| **Project Title** | Title in Display | `title` in `work.ts` |
| **Lead Image** | Full-width colour hero | `image` in `work.ts` |
| **Project Facts** | Client / Discipline / Plates column | `[slug].astro` |
| **Fact Row** | One label-and-value in Project Facts | `[slug].astro` |
| **Narrative** | The project story | `descriptions` in `descriptions.ts` |
| **Narrative Lede** | Its first paragraph, set larger | first `p` block |
| **Narrative Body** | The following paragraphs | later `p` blocks |
| **Bullet List** | A red-ruled list inside the story | `list` block |
| **Product Site Link** | “Visit the product site ↗” | `projectSites` in `descriptions.ts` |
| **Plate** | One gallery image | `src/assets/projects/<slug>/NN.jpg` |
| **Plate Caption** | “03 / 11” under a plate | `[slug].astro` |
| **Project Pager** | Previous / Next at the foot | `[slug].astro` |

## Bio page

| Name | What it is | Where |
| --- | --- | --- |
| **Statement** | The opening paragraphs | `bio` in `site.ts` |
| **Industries Paragraph** | The list of industries | `bioCoda` in `site.ts` |
| **Punchline** | “I also like Dad jokes…” | `bioJoke` in `site.ts` |
| **Experience Row** | Role and company | `experience` in `site.ts` |
| **Credential Row** | One education / patent / award line | `credentials` in `site.ts` |
| **Featured-in Link** | popsci, gizmodo, yankodesign | `press` in `site.ts` |
| **Skills** | The chips | `skills` in `site.ts` |
| **Skill Chip** | One skill | `skills` |
| **Skills Punchline** | “Ok, no Night Vision.” | `skillsPunchline` in `site.ts` |
| **Testimonial Card** | Quote with attribution | `testimonials` in `site.ts` |
| **Quote** | The testimonial text | `testimonials[].quote` |
| **Attribution Name** | Who said it | `testimonials[].name` |
| **Attribution Title** | Their role and company | `testimonials[].title` |
| **Elsewhere Row** | Social, résumé, stores as arrow rows | `links` in `site.ts` |

## Contact page

| Name | What it is | Where |
| --- | --- | --- |
| **Contact Intro** | The opening paragraph | `contactIntro` in `site.ts` |
| **Detail Row** | Email / Phone / Address | `site.email`, `site.phone`, `site.location` |
| **Detail Label** | The mono label on the left | `contact/index.astro` |
| **Detail Value** | The large value on the right | `site` in `site.ts` |
| **Business Hours** | The hours paragraph | `contactHours` in `site.ts` |
| **Elsewhere Chips** | The same links as mono chips | `links` in `site.ts` |

## Supporting MDD guide

| Name | What it is | Where |
| --- | --- | --- |
| **Guide Masthead** | Eyebrow, title, subtitle | `guide` in `guide.ts` |
| **Guide Eyebrow** | “A guide”, in red | `supporting-mdd/index.astro` |
| **Guide Title** | The full title, sentence case | `guide.title` |
| **Guide Subtitle** | The line under it | `guide.subtitle` |
| **Emphasised Line** | The large line in the preface | second item of `intro` |
| **Contents List** | The numbered list of tips | `tips` in `guide.ts` |
| **Tip** | One tip section | `tips[]` |
| **Tip Label** | “Tip 04”, in red | position in `tips` |
| **Tip Title** | The tip’s heading | `tips[].title` |
| **Tip Body** | Its paragraphs and lists | `tips[].blocks` |
| **Crisis Box** | The 988 panel at the end | `supporting-mdd/index.astro` |

## 404 page

| Name | What it is | Where |
| --- | --- | --- |
| **Not Found** | The whole page | `src/pages/404.astro` |
| **404 Eyebrow** | “404” in red | `404.astro` |
| **404 Title** | “Nothing here.” | `404.astro` |
| **404 Links** | The page list | `nav` in `site.ts` |

## Adding a name

A new element gets a `<Spec>` or `<Tag>` on the design guide page **and** a
row here, in the same commit. The build tests check both directions.
