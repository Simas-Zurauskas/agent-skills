# Maintaining blueprint-feature — read before editing

`SKILL.md` is what a consuming agent loads; this file is for whoever edits the skill. There is no
`CLAUDE.md` here on purpose (it would load into consumer sessions).

## The gate — every edit

1. `python3 scripts/bf.py selftest` prints `selftest: ok`.
2. Every file a command cites exists, and every `§n` it cites exists in that file:
   `grep -rnoE '\(\.\./[a-z/-]+\.md\)|\([a-z-]+\.md\)' SKILL.md commands reference briefs | …` — or read
   them; a dangling citation is a rule with no home.
3. A rule lives in **one** file. Commands point at `reference/`; briefs restate only what an agent with
   no other context must know (they cannot follow links back into the skill). When you change a rule
   that a brief restates (the never-list, the grounds, the verdicts), change the brief in the same edit.
4. Bump `VERSION` when behaviour changes, and add the why to `HISTORY.md`, not inline.
5. The skill must stay runnable on **Claude Code and Codex**: no tool name is required that only one
   harness has, without the other's equivalent in `reference/dispatch.md`.

## Where things live

| Topic | Single home |
|---|---|
| Rules that outrank everything | `reference/rules.md` |
| `FEATURE.md` blocks, IDs, markers, defaults, slots | `reference/feature-shape.md` |
| Learning the product, fact format, drift | `reference/baseline.md` |
| Lenses, sweeps, scales, bounds | `reference/grill.md` |
| Filters, gate, router, question format, cold read | `reference/dispositions.md` |
| Folder, log, lock, chat answers, report, reply | `reference/record.md` |
| Agents on Claude Code and Codex, probe ladder, models | `reference/dispatch.md` |
| Agent prompts | `briefs/*.md` (templates — `{{SLOTS}}` filled by the orchestrator) |
| Mechanical checks | `scripts/bf.py` |

## Lineage

Derived from the `blueprint` skill (v62, `~/dev/ai/SKILLS/blueprint`), which defines a whole product
before development. This skill keeps its safety model (sourced / labelled default / admitted gap; the
owner's sign-off per answer; independent dispatches; quote checks; never-defaultable list; blind
re-routing; cold reads; delegated answers) and drops what a single post-PRD feature does not need
(Notion, client packets, charter, sittings machinery, the shape-change register). Read `HISTORY.md`.
