# ui-craft

Design judgement for any visual work an agent does: building or changing UI, setting a visual direction, reviewing
how something looks. The aim is output that is specific to the product and well crafted, not the generic average
models produce by default.

The agent entrypoint is [SKILL.md](SKILL.md). It sizes the task and reads only the references it needs.

| Request | What happens |
| --- | --- |
| any UI task (automatic) | Sized to the task: a small change gets the system's tokens, the floor and a rendered look; a new screen gets the full loop |
| `ui-craft direct` | New visual direction: brief, the subject's world, three structurally different directions, a choice, a written contract in `DESIGN.md`, then the build |
| `ui-craft review [target]` | Critique of rendered UI: findings with evidence and the smallest fix; no changes unless asked |
| `ui-craft check <url-or-file>` | Runs `scripts/check.mjs`: screenshots at phone and desktop width, floor failures, tells, style inventory |

`scripts/deal.mjs` deals the starting constraints for new directions, so separate builds do not converge on one
look. `scripts/act.mjs` operates a page (click, type, keys, hover, screenshots) so dialogs, errors and other states that
need interaction can be seen and checked.

## Why it is built this way

The research behind it is in [references/research/](references/research/) (report and five source notes,
2026-11). In short: models repeat one default per brief; ban-lists only move them to the next default; what works
is deciding the design in writing before code, from the product's own subject; quality comes from rendering,
operating and independent critique; and a small set of measurable checks catches most real defects.

## Making sure it triggers

Skills are not always picked up from their description alone. Add one line to the always-loaded instructions
(`~/.claude/CLAUDE.md`, a project's `AGENTS.md` or `CLAUDE.md`):

```
Before building, changing or reviewing anything a person will see (UI, pages, components, styling, emails), load the ui-craft skill and follow it.
```

## Requirements

Node 22+ and `chrome-headless-shell` for the two scripts:
`npx @puppeteer/browsers install chrome-headless-shell@stable --path ~/.cache/puppeteer`. `CHROME_PATH` overrides
discovery. The scripts never launch the user's own Chrome when the headless shell is installed, and always
close the browser they started.

## Maintaining it

- `references/tells.md` is dated. Review it with each new model generation; tells move.
- `references/lessons.md` collects what projects teach. Add to it.
- `node tests/run.mjs` checks the script against a deliberately bad page and a clean one.
- `VERSION` holds one integer; add a `CHANGELOG.md` entry per change with the reason.
