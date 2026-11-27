---
name: blueprint-feature
description: 'Define one feature or change for an existing app: learn current behavior, write failable requirements, preserve affected behavior, decide ordinary details and surface serious owner decisions. Use to spec a feature, grill it, apply answers or check readiness for planning. Commands: init, add, questions, answer, resolve, status, ready, auto. Not a whole-product PRD, implementation plan or code build.'
---

# blueprint-feature

Define one feature against the product that exists today. Produce `FEATURE.md`: what it adds, changes,
and must not break. The goal is a coherent definition with no known material product decisions left to
guess, ready for implementation planning. Engineering design and implementation assurance come later.

Read [reference/rules.md](reference/rules.md) and the requested command. Read the other references only
when needed. Follow genuine project guides; code proves implemented behavior, never future intent or
what is deployed. A project may still designate a PRD or another document as its product authority.

## Commands

| Command | Procedure | Outcome |
|---|---|---|
| `init <feature> [material]` | [init](commands/init.md) | Map relevant product, draft complete ordinary behavior, surface serious questions, review when the definition is settled. `soft`: stop after draft. |
| `add <material>` | [add](commands/add.md) | Capture and apply new material, then review materially changed outcomes. `soft`: ask before superseding contradictory text. |
| `questions [full]` | [questions](commands/questions.md) | Independently examine gaps, close ordinary ones, ask only consequential owner decisions. `full`: re-examine the whole feature. |
| `answer [soft]` | [answer](commands/answer.md) | Record delegated, defensible answers for veto. `soft`: only answers already entailed by evidence. |
| `resolve` | [resolve](commands/resolve.md) | Apply Answered rows faithfully and review affected behavior. |
| `status` | [status](commands/status.md) | Read-only status, freshness and next action; no dispatch or reconciliation. |
| `ready` | [ready](commands/ready.md) | Check freshness and substantive coverage; reuse valid reviews, run missing ones, stamp only when no material blocker remains. |
| `auto [rounds]` | [auto](commands/auto.md) | Apply supplied/settled answers, decide ordinary gaps and proceed to ready. One correction/recheck by default; rounds is a ceiling. |

Answers and vetoes in any write invocation are recorded first. A plain request naming no home starts
`init`; resume a paused matching feature. With several plausible homes, ask which one. Do not require
the owner to type intermediate commands when the invocation already authorizes the sequence.

## Before a write

1. Resolve `<task folder>/blueprint-feature/` by [record §1](reference/record.md). Scaffold if new:
   `python3 <skill>/scripts/bf.py scaffold <home> --name "<name>"`.
2. Probe a real write inside the home; `bf.py lock <home>` checks recorded writers; it does not acquire an atomic lock. Record one run
   entry for a chained invocation; embedded commands share it. See [record §4](reference/record.md).
3. Save the invocation and immutable source material; record answers, vetoes and owner edits. Read
   the workspace/repo guides, relevant wiki/contracts, and current commit/branch/dirty state.
4. Run `bf.py lint <home>`, `changed` and `anchors` as applicable. Preserve edits made by others; report
   human-introduced inconsistencies rather than silently rewriting them.

`<skill>` is the directory containing this file, including when reached through a symlink.
`status` skips all writes/probes and uses its own procedure.

## Author once, review proportionately

The author can inspect the baseline and draft complete behavior, including labelled ordinary defaults,
before review. No mandatory mapping/verifier pair, per-finding router, cold reader, answer drafter or
answer-application checker. Their useful questions belong in substantive review.

| Feature | Default independent coverage |
|---|---|
| Local, reversible, known narrow effects; no material access/data/financial/compatibility hazard | One fresh combined reviewer: intent, current-product facts, buildability and preservation. |
| Multiple interacting surfaces or a material permission, data, financial, lifecycle or release hazard | Two fresh reviewers: builder/current-product and adversary/intent/risk. |
| Broad or complex change | Split mapping where it saves real work; retain the two complementary reviews and add specialist coverage only for a distinct hazard they cannot adequately cover. |

Choose by consequence, blast radius and reversibility, never requirement count. The exact timing,
coverage, scope filter, correction bound and reuse rules live in [grill](reference/grill.md).
An existing reviewer derives expectations from raw evidence before opening the candidate definition.
Before multiple dispatches, say how many and what distinct work they cover. Use real separate contexts
on [Claude Code or Codex](reference/dispatch.md). Missing review stays explicit and blocks ready.

Apply supplied decisions before paying for final review. If serious decisions block a settled draft,
write them and stop without exhaustive review of behavior that will change. An explicit request to
grill still gets useful independent scrutiny. `init` followed by `ready` in one invocation uses one
review boundary; `ready` does not repeat a clean current review.

Every new promise must protect a requested outcome against a concrete reachable failure. Choose the
simplest adequate behavior. Do not turn optional hardening, scalability mechanisms or conflict policies
into feature requirements because a reviewer can imagine them. See [rules §4](reference/rules.md).

## Files and quality floor

Keep existing homes and IDs compatible; no migration is needed.

```
blueprint-feature/
  FEATURE.md        failable FR, changes CH, preservation KEEP, relevant edge/compatibility decisions
  questions.md      serious decisions, answers and status
  baseline.md       relevant current-product facts with code evidence
  sources/          immutable owner material and INDEX.md
  record/           log, defaults, run reports, IDs and snapshots
  work/             frozen briefs, raw returns and scratch
```

[Feature shape](reference/feature-shape.md), [baseline](reference/baseline.md),
[finding handling](reference/dispositions.md) and [records](reference/record.md) define the formats.
Use the existing checker for IDs, quotes, anchors, lint, counts, locks and snapshots. Its structural
success does not prove substantive review or deployment.

Write only in the feature home. No code, tickets, estimates, implementation plans, wiki edits outside
the home, commits, pushes, deployments or external messages. Local evidence is the default; access an
external project authority only through an available authorized connection. Never invent unavailable
evidence or edit an external authority from this skill. Implementation tests and runtime certification
are outside this definition workflow. Only `ready` stamps planning readiness.
