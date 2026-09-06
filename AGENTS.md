# Instructions for AI assistants

This is the portfolio site for Gabriel Prero — a static Astro site in a strict
Swiss typographic style. These instructions are read by Claude Code (via
`CLAUDE.md`), OpenAI Codex, Cursor, Copilot and any tool that honours
`AGENTS.md`. They apply to every task, however small.

## Before you change anything

1. Read `docs/README.md`. It tells you which doc covers the task.
2. Read that doc. The conventions are all written down; do not infer them from
   nearby code and do not improvise.
3. For any change to layout, type, colour, spacing or motion, read
   `docs/design-system.md` in full first.

## Hard rules

- **Copy lives in `src/data/`.** Pages render data. Never put visitor-facing
  text in a `.astro` file (the one exception, the home-page metadata, is noted
  in `docs/content-guide.md`).
- **Palette is red, black, white, grayscale.** No other colour. No tints. Use
  the tokens (`text-ink`, `bg-paper`, `text-red`, `border-gray-200`), never hex.
- **Two typefaces:** Inter and IBM Plex Mono. No third. No icon fonts.
- **Red is rationed** to about two resting appearances per screen. Adding one
  means naming the one it replaces.
- **Only `md:` and `xl:` breakpoints.** They match the 4 / 8 / 16 column field.
- **The spacing unit is 8px.** Tailwind numbers are doubled: `p-4` is 32px.
- **Internal links use `url()`** from `src/lib/url.ts`. Never `href="/…"`.
- **Typographic quotes only:** ’ “ ”. Never `'` or `"` in copy.
- **Reuse before you create.** Use the classes and column patterns in the
  design system. A new component needs the same markup on three pages.
- **No new dependencies** without a stated reason in the commit.

## Workflow

1. Make the change.
2. Run `npm test`. It builds, then runs unit, build and end-to-end suites.
   A failing test means the change is wrong, not the test — unless the doc
   that describes the rule is also wrong, in which case fix the doc, the test
   and the change together.
3. **Check the docs.** Did this change anything `docs/` describes — a file,
   a pattern, a rule, a command, a count? Update the doc in the same commit.
   Adding a page, a data export, a script, a test suite or a design pattern
   always requires a doc update.
4. Commit with a message that says what changed and why. Do not push to
   `main` unless asked; pushes deploy.

## Commands

```bash
nvm use                 # Node 22 — required
npm install
npm run dev             # http://localhost:4321/prero/
npm test                # everything
npm run test:unit       # fast, no build
```

Full list in `docs/development.md`.

## Never

- Never set the `DEPLOY_BLUEHOST` repository variable, edit secrets, or run
  `deploy:live` without an explicit instruction from the owner. Production
  state is documented in `docs/deployment.md`; read it before touching deploy.
- Never commit `.env.deploy` or any credential.
- Never hard-code the copyright year, a project count, or a tip count.
- Never add motion outside `data-reveal` / `data-draw`.
- Never centre text, add shadows, rounded corners, gradients or emoji.
- Never remove or reword the crisis-resource box on the Supporting MDD page.

## Astro note

Astro 7 backgrounds `astro dev` and `astro preview` when stdout is not a TTY.
Stop them with `astro dev stop` / `astro preview stop`. The Playwright suite
uses `scripts/serve-dist.mjs` instead for that reason.
