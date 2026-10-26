# status — one screen, writes nothing

Safe any time. Resolves the home (SKILL.md check 1 — it may ask which home, and records nothing), then
reads. **It writes nothing, dispatches no agent, and never reconciles.**

## S1 — Read

- `python3 <skill>/scripts/bf.py counts <home>` — questions by status, markers (linked, waiting to be
  asked), requirements, changes, keeps, defaults (and how many unverified), slots, baseline facts
  (and unverified).
- `python3 <skill>/scripts/bf.py lint <home>` — structural problems.
- `python3 <skill>/scripts/bf.py anchors <home>` — commits now vs the baseline's, stale facts.
- `python3 <skill>/scripts/bf.py lock <home>` — a run in progress or abandoned.
- The last entries of `record/log.md` — the last grill (scale, date), the last `ready`.
- `questions.md` — rows `Answered` by the owner but not applied; rows `Flagged`; delegated answers not yet
  applied (the owner can still overrule them).

## S2 — The readiness checklist

| Check | Ready when |
|---|---|
| Open questions | 0 `Open` |
| Answers not yet written in | 0 `Answered` |
| Flagged rows | 0 `Flagged` |
| Markers | 0 in `FEATURE.md` |
| Unverified items | 0 (defaults, facts, rows written without their second check) |
| Baseline | No stale fact; verified at the repos' current commits, or the changes since touch no anchored file |
| Structure | `bf.py lint` clean |
| Touched surfaces | every baseline surface has a `CH` or `KEEP` (lint's coverage check) |
| Last full grill | after the last write to `FEATURE.md` |
| `ready` stamp | present and no write since |

## S3 — Print one screen, worst first

```
«Pin a challenge» — Draft · wiki-rep/tasks/018-pin-challenges/blueprint-feature/
Ready for planning: no — 3 open questions, 1 answer not yet written in, 2 stale product facts

Waiting on you      q-03 Can a person pin a closed challenge? (Recommended: 1)
                    q-05 …
Not written in yet  q-02 (delegated answer — you can still overrule it)
Flagged             q-07 — your two notes disagree on …
Stale               B-4, B-9 — rep-app moved from a7ca2ba to c41d0e2 and their lines changed
Unverified          D2 (no second agent was available when it was adopted)
Structure           ok

Next: answer the questions above (or say `answer`), then `resolve`, then `ready`.
```

Every line ends in what to do next. Counts come fresh from S1, never from an earlier report.
