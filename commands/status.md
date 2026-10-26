# status — one screen, writes nothing

Safe any time. Resolves the home (it may ask which, and records nothing), then reads. **It writes nothing,
dispatches no agent, and never reconciles.**

## S1 — Read

- `bf.py counts <home>` — questions by status, delegated answers not yet applied, markers, requirements,
  changes, keeps, defaults, slots, facts (unverified, unreleased, struck), unverified total, last grill,
  last ready.
- `bf.py lint <home>` — structural problems and coverage gaps.
- `bf.py anchors <home>` — commits now vs the baseline's; stale and recheck facts; unreleased ones.
- `bf.py lock <home>` — a run in progress or abandoned (exit 3 / 1).
- `bf.py changed <home>` — edits since the last run.
- `questions.md` — `Answered` not yet applied (delegated ones can still be overruled), `Flagged` rows.

## S2 — The readiness checklist

| Check | Ready when |
|---|---|
| Open questions | 0 `Open` |
| Answers not yet written in | 0 `Answered` |
| Flagged rows | 0 `Flagged` |
| Markers | 0 |
| Unverified items | 0 |
| Product facts | none stale; recheck facts verified since the code moved |
| Structure | `bf.py lint`: no errors, no coverage gaps |
| Ready stamp | present, and `bf.py changed` shows no edit since the run that stamped it |
| Pending review | the stamp has no *pending your review* clause, or the owner is fine with it |

## S3 — Print one screen, worst first

```
«Favourite challenges» — Draft · wiki-rep/tasks/018-favourite-challenges/blueprint-feature/
Ready for planning: no — 3 open questions, 1 answer not yet written in, 2 product facts to recheck

Waiting on you      q-03 Can a person pin a closed challenge? (recommended: 1)
                    q-05 …
Not written in yet  q-02 (my answer for you — you can still overrule it)
Flagged             q-07 — your two notes disagree on …
Recheck             B-4, B-9 — rep-app moved from a7ca2ba to c41d0e2 and their files changed
Unverified          D2 (no second agent was available when it was adopted)
Edited since        FEATURE.md — you changed FR-4; the next grill will look at it
Structure           ok

Next: answer the questions above (or say `answer`), then `resolve`, then `ready`.
```

Every line ends in what to do next. Counts come fresh from S1.
