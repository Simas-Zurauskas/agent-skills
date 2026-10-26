# blueprint-feature

Define **one feature** for an app that already exists — completely, before anyone plans or builds it.

`blueprint` writes a whole product's PRD before development. Once the app reaches that PRD, the PRD is
frozen and the **built app becomes the reference**. From then on, new features and changes are defined
with this skill: it learns what the app does today from the wiki and the code, and specifies the feature
against it — what it adds, what it changes, what it must not break — until nothing is left to guess.

## What you get

A folder, normally `<task folder>/blueprint-feature/`:

- **`FEATURE.md`** — the feature's PRD: summary, why, who, scope and not-doing, what exists today,
  numbered requirements that can each fail, **changes to existing behaviour** (today → after), **what
  must stay the same**, edge cases, data and compatibility (existing data, older app versions, offline,
  other members), copy, rabbit holes.
- **`questions.md`** — what only you can decide, each with suggested directions and a recommendation.
- **`baseline.md`** — what the app does today that the feature touches, every fact cited to the code and
  checked by a second agent.
- `sources/`, `record/`, `work/` — your material verbatim, what each run did, and agent scratch.

## How a feature goes

```
/blueprint-feature init Pin challenges: let people pin a few challenges to the top of their list …
    → maps the app, drafts FEATURE.md, grills it, writes the questions only you can answer
answer in chat ("q-2: 1, q-4: no — keep it per person") or in questions.md
    — or /blueprint-feature answer   (answers what it safely can; you can overrule each)
/blueprint-feature resolve           → writes the answers in, checks each, grills what changed
/blueprint-feature ready             → dry-run builder + red team + full grill; stamps Ready for planning
```

Or hand it the loop: `/blueprint-feature auto` — answer, resolve and grill until nothing new comes up,
then `ready`; it stops only for questions it may not answer for you (prices, legal, minors' data, and
anything where your own sources disagree).

More material later — `/blueprint-feature add <notes>`. Where are we — `/blueprint-feature status`.

In Codex: `$blueprint-feature init …`, or ask in plain words.

## How it avoids holes

- **Several agents attack the draft in parallel**, each with one lens: the builder who must not guess,
  the hostile tester, collisions with the existing app, lifecycle and compatibility, who it's for.
- **Most findings never reach you**: anything the code answers becomes a cited product fact; anything the
  app's own patterns or a safe convention settles becomes a labelled default you can veto (*"drop D3"*);
  wrong text is fixed. A **second agent re-decides every finding blind**, and **every question is read
  cold** by a fresh agent before you see it.
- **Changes to what users have today are always yours to decide** — never defaulted.
- **`ready` has a fresh engineer agent try to plan the feature from `FEATURE.md` alone** and list every
  guess it had to make, while a red team on a different model hunts contradictions, silent changes and
  untouched neighbours.

It never claims a spec is complete — `ready` means *no known holes after these checks*.

## What it will not do

Write code or tickets, plan the implementation, edit the wiki or the repos, read a frozen PRD as truth,
use Notion, commit, or interrogate you mid-run.

## Install

```
ln -s ~/dev/ai/SKILLS/blueprint-feature ~/.claude/skills/blueprint-feature   # Claude Code
ln -s ~/dev/ai/SKILLS/blueprint-feature ~/.agents/skills/blueprint-feature   # Codex
```
Needs `python3` (stdlib only) and `git`. Check: `python3 scripts/bf.py selftest`.
