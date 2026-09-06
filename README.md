# prero.com

Gabriel Prero’s portfolio site. This page is for making changes to it. The
technical documentation is in [`docs/`](docs/README.md).

## Making a change

You do not need to know how the site is built. Open this project in an AI
coding assistant and ask for what you want in plain language.

Any of these work — they all read the same instructions file, `AGENTS.md`,
which tells them how the site is put together and what the rules are:

- **Claude Code** — the desktop app or the `claude` command
- **OpenAI Codex** — the desktop app or the `codex` command
- **Cursor**, **GitHub Copilot**, or any editor that honours `AGENTS.md`

Open the folder, then say what you want. Examples:

> Add a new project called “Trail Stove” for Catch Co. The photos are in my
> Downloads folder. Put it third in the list.

> Change my phone number to 773.555.0100.

> Add a testimonial from Jane Doe, VP of Product at Acme: “…”

> Update my job title in the experience list — I’m now VP of Design at Artica.

> Add a tip to the depression guide, after tip 8, titled “Keep Showing Up”.

The assistant will read the documentation, make the edit in the right place,
run the tests, and tell you what it did. If something in the request would
break the design rules — a new colour, a new font — it will say so and offer
the closest thing that fits.

## The design guide

**https://tevih.github.io/prero/design-guide/**

Every element on the site, shown with its name — “HP Billboard”, “Footer CTA”,
“Project Card”, “Eyebrow”. Use those names when asking for a change and the
assistant will know exactly what you mean. The page is hidden from search
engines and is not linked from the site itself. (Once prero.com is live it
will also be at `prero.com/design-guide/`.)

## Publishing

Changes go live when they are pushed to the `main` branch on GitHub. Ask the
assistant to *commit and push* when you are happy with a change.

Every push runs the full test suite automatically. If the tests pass, the site
publishes to the staging address within about two minutes:

**https://tevih.github.io/prero/**

The same push also publishes to **prero.com**, about a minute later.

## If something goes wrong

Tell the assistant:

> Roll back the site to the last good version.

About four minutes later the previous version is back. Nothing is lost —
every version that was ever published is kept, and the change that went wrong
can still be fixed later. You can also do it yourself on GitHub: *Actions →
Rollback → Run workflow*.

Every published version is listed under **Releases** on GitHub with a short
summary of what changed in it.

## Reviewing before publishing

Ask the assistant to *run the site locally* and it will give you a link
(usually `http://localhost:4321/prero/`) to look at the change in your browser
before anything is pushed.

## Where things are, if you are curious

| | |
| --- | --- |
| All the words on the site | `src/data/` — one file per area |
| Project photos | `src/assets/work/` (main image) and `src/assets/projects/` (galleries) |
| The design rules | `docs/design-system.md` |
| How to publish, and the state of prero.com | `docs/deployment.md` |

## Getting help

Tevi Hirschhorn built the site and set up the tooling. The `docs/` folder is
written so that any developer — or any assistant — can pick it up cold.
