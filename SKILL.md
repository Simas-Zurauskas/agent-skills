---
name: blueprint-feature
description: 'Specs one new feature or change for an app that already exists, after its PRD is frozen. Use for "spec this feature", "define this change properly", "grill this feature idea", "what are we missing in this feature", "answer what you safely can", "apply the answers", "is this feature ready to plan". Learns today''s product from the wiki and the code (never a frozen PRD or Notion), writes FEATURE.md with numbered failable requirements, changes to existing behaviour, what must stay the same, edge cases, compatibility and exclusions, then grills it with independent agents, cold-reads every question, writes answers back with a blind checker, and gates on a dry-run builder and a red team. Kept in the task folder under blueprint-feature. Commands: init, add, questions, answer, resolve, status, ready, auto. Not for a whole new product (use blueprint) or for implementation planning.'
---

# blueprint-feature

One feature, defined completely **before** anyone plans or builds it, for a product that already exists.
The original PRD is history — frozen once the app reached it. From then on **the built product is the
reference**, so this skill learns what exists from the project's wiki and code, cites it, and specifies the
feature against it: what it adds, what it changes, and what it must not break.

The output is a folder holding `FEATURE.md` — the feature's own PRD — plus its questions, the product facts
it rests on, and the record of every run. When `ready` passes, the feature is defined well enough to move
on to implementation planning, which is **beyond this skill**.

**It never guesses.** Every sentence in `FEATURE.md` is exactly one of:

1. **sourced** — the owner's words, a source they gave, or an answer they gave or delegated;
2. **a product fact** — what the app does **today**, cited to code (`baseline.md`, verified). Code is
   evidence of today, never of what the feature should do;
3. **a labelled default** — `Default D3 (existing pattern — … — adopted <date>): …`, vetoable with
   *"drop D3"*;
4. **an admitted gap** — `[NEEDS CLARIFICATION: … → q-04]` with a written question.

## Commands

| Command | Reads | What it does |
|---|---|---|
| `init <the feature in words> [files]` | [commands/init.md](commands/init.md) | Captures the request, maps the parts of the product the feature touches (cartographer agents + a blind verifier), drafts `FEATURE.md`, grills it, writes the questions. Runs end to end; **`init soft`** stops after the draft for the owner's look |
| `add <material>` | [commands/add.md](commands/add.md) | New material or decisions. New owner material supersedes text it contradicts (quoted); `add soft` asks instead |
| `questions [full]` | [commands/questions.md](commands/questions.md) | The grill, sized to what changed (`full`: everything). Every finding disposed — product fact, default, fix, slot, question or a named discard — re-routed blind, and every question read cold before it is written |
| `answer [soft]` | [commands/answer.md](commands/answer.md) | The owner delegates: answers the open questions it can defend, labelled, challenged by a second agent, left at `Answered` for the owner's veto. `soft`: only what the document, sources or code already settle |
| `resolve` | [commands/resolve.md](commands/resolve.md) | Writes `Answered` questions into `FEATURE.md`, each change checked by a blind agent, then grills what changed |
| `status` | [commands/status.md](commands/status.md) | One screen: open questions, markers, unverified items, drift against the current code, readiness, next step. **Writes nothing** |
| `ready` | [commands/ready.md](commands/ready.md) | The gate before planning: re-verifies the product facts, full grill, a dry-run builder that tries to plan from `FEATURE.md` alone, a red team, a faithfulness check. Stamps `Ready for planning` only when nothing is left open |
| `auto [rounds]` | [commands/auto.md](commands/auto.md) | The owner delegates the loop: `answer` → `resolve` until nothing new comes up (default at most 3 rounds), then `ready`. Leaves for the owner every question it may not answer |

**To run a command:** read [reference/rules.md](reference/rules.md) and the command file, and follow its
phases end to end; read the other `reference/` files when a phase cites them. Do not summarise a command
file and improvise from the summary. Every agent prompt comes from a template in [briefs/](briefs/) — fill
it, never rewrite it.

Answers, rejections and vetoes can arrive in any command's invocation — *"q-3: 2; q-5: no, keep it per
person; drop D3"* — and are recorded first ([reference/record.md](reference/record.md) §5).

**When the request is ambiguous:** no feature home → `init`; a paused `init` → resume it; otherwise ask once —
*grill it for more questions, write in the answers already given, or check whether it is ready?*

## The folder

The **feature home** is `<task folder>/blueprint-feature/` — [reference/record.md](reference/record.md) §1
resolves it (a path the owner names, the workspace's task-folder convention, or
`blueprint-features/<slug>/blueprint-feature/`). One feature per home.

```
blueprint-feature/
  FEATURE.md        the feature PRD — the deliverable
  questions.md      every question, q-01 … in order, with status and answer
  baseline.md       what the product does today that this feature touches — cited, verified
  sources/          the owner's words and material, verbatim, hashed (INDEX.md)
  record/           log.md · defaults.md (everything adopted on the owner's behalf) · runs/ · snapshots/ · ids.json
  work/             the owner's message per run, frozen agent briefs, agent returns — scratch
```

## Before any command — five checks

`<skill>` is this skill's directory (resolve it from where this file was loaded; symlinks are fine).

1. **Which feature home?** Resolve it ([reference/record.md](reference/record.md) §1); `init` scaffolds it
   (`bf.py scaffold`) before checks 3 and 5. Never two features in one run.
2. **Can it write?** A real write probe in the home (record.md §1). Failure halts before any work. `status`
   skips this.
3. **Is another run writing?** `python3 <skill>/scripts/bf.py lock <home>` — exit 3 halts this run (unless the
   owner says that session stopped), exit 1 means an abandoned entry to close ([record.md](reference/record.md)
   §4). `status` skips this.
4. **Which product, at which commit, under which rules?** The workspace's agent guides (`AGENTS.md`,
   `CLAUDE.md` at the root and in each repo), its wiki or docs, each code repo (`git rev-parse --short HEAD`,
   branch, the released ref), and the owner's standing rules your harness has loaded
   ([reference/rules.md](reference/rules.md) §8). **A frozen PRD is not a product source, and this skill
   never reads Notion.**
5. **Is the folder sound?** `python3 <skill>/scripts/bf.py lint <home>`. Problems a human introduced are
   reported and worked around, never "fixed" over their text.

## Agents

Every check this skill calls independent is **a separate agent dispatch, never the same context narrating a
second opinion** — [reference/dispatch.md](reference/dispatch.md) is the single home of how to dispatch on
Claude Code and on Codex, the probe ladder, models, waves, and what to write when no second agent is
available (`unverified`, counted, said first — never passed off as checked). The orchestrator (you) reads and
writes the feature home; **agents only read** and return text; independent agents go out together.

## Cost — sized to the change, said before it is spent

Before any phase that dispatches more than one agent, print one plain line: what is being checked, how many
agents, why.

| Run | Agents (typical) |
|---|---|
| `init`, small change (one part, ≤ ~5 requirements) | 1 cartographer + 1 verifier · 2 grill passes + 1 faithfulness · routers (1 per 15 findings) · cold readers (1 per 10 questions) |
| `init`, larger feature | 2–4 cartographers + 1 verifier · 4 grill passes + 1 faithfulness · routers · cold readers |
| `add`, `resolve`, bare `questions` | 2 grill passes · routers · cold readers · `resolve` adds 1 checker per 8 answers |
| `answer` | 1 drafter per 10 questions + 1 challenger per 10 drafted answers |
| `questions full`, `ready` | 4 grill passes (2 for a small change) · `ready` adds a dry-run builder, a red team, a faithfulness check, a verifier |

Never shrink a check to save cost; shrink the attack surface and say what was left for next time.

## What this skill does not do

- **No code, no repo writes, no wiki writes.** It reads code to know the product and writes only inside the
  feature home. Wiki drift it notices is reported as the exact correction for whoever maintains the wiki.
- **No implementation plan, tickets, estimates or tests.** `FEATURE.md` says *what*, never *how*.
- **No frozen PRD as evidence, no Notion, no network.**
- **No commits, pushes, messages or deploys.** The folder is the owner's to keep or promote.
- **No interrogation.** Runs write what they found and stop; the only stops are `init`'s interview when the
  owner gave almost nothing, and `init soft`'s draft review.
- **Nothing declares the feature finished except `ready`**, and any later write clears its stamp.
