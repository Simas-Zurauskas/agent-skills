---
name: blueprint-feature
description: 'Defines one new feature or change for a product that already exists, after the PRD era — when the original PRD is frozen and the built app is the reference. Learns the current product from the project''s wiki and codebase (never from a frozen PRD or Notion), cites what exists today, then drafts a feature spec with numbered failable requirements, explicit changes to existing behaviour, what must stay the same, edge cases, compatibility and exclusions. Grills every draft with parallel adversarial agents, routes each finding blind, cold-reads every question, lets the owner answer or delegate the safe ones, writes answers back with an independent checker, and finishes with a readiness gate (builder dry-run + red team) before implementation planning. Everything lives in a local folder, normally <task folder>/blueprint-feature/. Eight commands: init, add, questions, answer, resolve, status, ready, auto. Use for "spec this feature", "define this change properly", "grill this feature idea", "blueprint the favourites feature", "what are we missing in this feature", "answer what you safely can", "apply the answers", "is this feature ready to plan". Not for a whole new product (use blueprint) and not for implementation planning or building.'
---

# blueprint-feature

One feature, defined completely **before** anyone plans or builds it, for a product that already
exists. The original PRD is history — frozen once the app reached it. From then on **the built product
is the reference**, so this skill learns what exists from the project's wiki and code, cites it, and
specifies the feature against it: what it adds, what it changes, and what it must not break.

The output is a folder holding `FEATURE.md` — the feature's own PRD — plus its open questions, the
product facts it rests on, and the record of every run. When `ready` passes, the feature is defined well
enough to move on to implementation planning, which is **beyond this skill**.

**It never guesses.** Every sentence in `FEATURE.md` is exactly one of:

1. **sourced** — the owner's words, a source they gave, or an answer they gave or delegated;
2. **a product fact** — what the app does today, cited to code (`baseline.md`, verified);
3. **a labelled default** — `Default D3 (existing pattern — … — adopted <date>): …`, visible and
   vetoable with *"drop D3"*;
4. **an admitted gap** — `[NEEDS CLARIFICATION: … → q-04]` with a written question.

An unlabelled guess is worse than an admitted gap: a gap gets asked about, a guess gets built.

## Commands

| Command | Reads | What it does |
|---|---|---|
| `init <the feature in words> [files]` | [commands/init.md](commands/init.md) | Captures the request, maps the existing product the feature touches (parallel cartographers + a blind verifier), drafts `FEATURE.md`, grills it, writes questions. Runs end to end; **`init soft`** stops after the draft for the owner's look |
| `add <material>` | [commands/add.md](commands/add.md) | New material or decisions into the feature. New owner material supersedes text it contradicts (quoted); `add soft` turns each contradiction into a question instead |
| `questions [full]` | [commands/questions.md](commands/questions.md) | The grill, sized to what changed (`full` attacks everything). Every finding disposed: product fact, default, fix, content slot, question or a named discard. Every question read cold before it is written |
| `answer [soft]` | [commands/answer.md](commands/answer.md) | The owner delegates: answers every open question it can defend, labelled as delegated, challenged by a second agent, left at `Answered` for the owner's veto. `soft`: only what the document, sources or code already settle |
| `resolve` | [commands/resolve.md](commands/resolve.md) | Writes `Answered` questions into `FEATURE.md` — one writer, one independent checker per answer — then grills what changed |
| `status` | [commands/status.md](commands/status.md) | One screen: open questions, markers, unverified items, baseline drift against the current code, readiness, next step. **Writes nothing** |
| `ready` | [commands/ready.md](commands/ready.md) | The gate before planning: re-verifies the baseline, full grill, a builder dry-run that tries to plan from `FEATURE.md` alone, a red team and a faithfulness check. Stamps `Ready for planning` only when nothing is left open |
| `auto [rounds]` | [commands/auto.md](commands/auto.md) | The owner delegates the loop: `answer` → `resolve` → `questions` until nothing new comes up (at most 3 rounds by default), then `ready`. Stops early only for questions it may not answer |

**To run a command:** read [reference/rules.md](reference/rules.md) and the command file, and follow
the command's phases end to end. Read the other `reference/` files when a phase cites them. Do not
summarise a command file and improvise from the summary. Every agent prompt comes from a template in
[briefs/](briefs/); fill the template, never rewrite it.

Answers can arrive in any command's invocation — *"q-3: option 2; q-5: no, keep it per person"* —
and are recorded first ([reference/record.md](reference/record.md) § Answers given in chat).

When the request is ambiguous: if no feature folder exists, run `init`; if one exists, ask once —
*grill it for more questions, apply the answers already given, or check whether it is ready?*

## The folder

The **feature home** is `<task folder>/blueprint-feature/` — [reference/record.md](reference/record.md)
§1 resolves it (a path the owner names, the workspace's task-folder convention, or
`blueprint-features/<slug>/` at the workspace root). One feature per home.

```
blueprint-feature/
  FEATURE.md        the feature PRD — the deliverable
  questions.md      every question, q-01 … in order, with status and answer
  baseline.md       what the product does today that this feature touches, each fact cited and verified
  sources/          the owner's words and material, verbatim, hashed (INDEX.md lists them)
  record/           log.md (append-only run log), runs/<run-id>.md (each run's full report), ids.json
  work/             frozen agent briefs and their returns — scratch, safe to delete
```

## Before any command — five checks

1. **Which feature home?** Resolve it ([reference/record.md](reference/record.md) §1). Never work on
   two features in one run.
2. **Can it write?** `test -w` on the home (or the folder it will be created in). Failure halts before
   any work, naming the command a person would run; a run never changes permissions itself. `status`
   skips this.
3. **Is another run writing?** Run `python3 <skill>/scripts/bf.py lock <home>`. An open entry younger
   than 30 minutes halts this run, unless the owner says that session stopped; an older one is closed
   as abandoned with one `note` line ([reference/record.md](reference/record.md) §4). `status` skips this.
4. **Which product, at which commit?** Find the product's repos and docs: the workspace's agent guides
   (`AGENTS.md`, `CLAUDE.md` at the root and in each repo), its wiki or docs folder, and each code repo
   with `git rev-parse --short HEAD` and its branch. These are the product sources
   ([reference/baseline.md](reference/baseline.md) §1). **A sealed or frozen PRD is not a product
   source**, and this skill never reads Notion.
5. **Is the folder sound?** `python3 <skill>/scripts/bf.py lint <home>` on an existing home. Errors a
   human introduced are reported and worked around, never "fixed" by overwriting their text.

`<skill>` is this skill's directory — resolve it from where this file was loaded (symlinks included).

## Agents

Every check that this skill calls independent is **a separate agent dispatch, never the same context
narrating a second opinion** — [reference/dispatch.md](reference/dispatch.md) is the single home of how
to dispatch on Claude Code and on Codex, the probe ladder, models, and what to write when no second
agent is available (`unverified`, counted and reported — never passed off as checked).

The orchestrator (you) reads and writes the feature home; **agents only read** — the frozen brief and
the product's repos and docs — and return text. Agents that do not depend on each other are dispatched
together in one turn and awaited together.

## Cost

Sized to the change, said before it is spent. Before any phase that dispatches more than one agent,
print one plain line: what is being checked, how many agents, why.

| Run | Agents (typical) |
|---|---|
| `init` | 2–4 cartographers + 1 baseline verifier · 4 grill passes + 1 faithfulness check · 1 router per 15 findings · 1 cold reader per 10 questions |
| `add`, `resolve`, bare `questions` | the delta grill: 2 passes · routers and cold readers as above · resolve: 1 writer + 1 checker per 5 answers |
| `questions full`, `ready` | 4 grill passes · `ready` adds 1 dry-run builder, 1 red team, 1 faithfulness check, 1 verifier if the code moved |
| `answer` | 1 drafter per 10 questions + 1 challenger per 10 drafted answers |

Never shrink a check to save cost; shrink the attack surface and say what was queued.

## What this skill does not do

- **No code, no repo writes, no wiki writes.** It reads code to know the product; it writes only inside
  the feature home. Wiki drift it notices is reported as the exact edit for whoever maintains the wiki.
- **No implementation plan, tickets, estimates or tests.** `FEATURE.md` says *what*, never *how*; a
  mechanism appears only as a `Rabbit holes` line.
- **No frozen PRD as evidence, no Notion, no external services.** A frozen PRD may explain history; it
  never states what the product does now.
- **No commits, pushes, messages or deploys.** The folder is the owner's to keep or promote.
- **No interrogation.** Runs write what they found and stop. The one stop is `init`'s interview when the
  owner gave almost nothing, and `init soft`'s draft review.
- **Nothing declares the feature finished except `ready`**, and any later write clears its stamp.
