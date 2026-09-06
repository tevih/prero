# Something broke — rolling back

The site is wrong and you want the last good version back. Three moves, in
order of how often you will want them.

## 1. Roll back — the button

Puts the site back to an earlier release. Nothing is lost: it adds one new
commit to `main` that restores the site's files, then deploys through the
normal test gate. Every commit that came after is still in the history.

**Ask an assistant:**

> Roll back the site to the last good version.

It runs:

```bash
gh workflow run Rollback
```

**Or do it in GitHub:** *Actions → Rollback → Run workflow → Run workflow*.
Leave the target blank.

Blank means “the most recent release that is not what is live right now” —
the last good one, if the newest release is the broken one. To go further
back, give a tag: `gh workflow run Rollback -f target=v2026-09-06-1432`.
Every version that was ever live is listed under
**Releases** on GitHub, newest first, each with a summary of what changed.

About four minutes later the old version is live on staging (and on
prero.com when production deploys are on). The rollback itself becomes a
new release, so it can be rolled back too.

### What rolls back

`src/`, `public/` and `tests/` — the site and the tests that guard it, as a
unit. Workflows, docs, scripts and config stay at their current versions,
so the rollback machinery can never roll itself away and the docs keep
describing the newest tooling.

## 2. Revert one commit

When one specific change is wrong and everything after it is fine.

```bash
git revert <sha>
git push
```

`git log --oneline` shows the shas. The revert is a new commit; nothing is
rewritten. An assistant can do this if you name the change: “undo the
commit that added the Trail Stove project.”

## 3. Fix forward

When you know what is wrong, fixing it is usually faster than rolling back.
Make the change, `npm test`, push. The deploy gate still applies.

## What is protected

- **Every deploy is a release.** The `Test and deploy` workflow tags the
  commit it shipped and writes notes listing the commits since the previous
  release, with a compare link.
- **A failing test never deploys.** The build and deploy jobs only run after
  all three suites pass.
- **History cannot be rewritten.** `main` refuses force-pushes and deletion,
  for admins too. `git push --force` is rejected; old commits are always
  recoverable.
- **Credentials are never in the repo**, so a rollback never exposes one.

## What is not protected

- **Wrong but valid content.** A typo, a project in the wrong slot, a
  testimonial attributed to the wrong person — the tests cannot know. Look
  at staging after a change; rolling back is cheap.
- **The Bluehost server outside `dist/`.** The deploy touches only what it
  uploads. Anything else in that directory is Bluehost's to back up.
