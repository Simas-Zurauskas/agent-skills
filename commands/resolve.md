# resolve — write the answers into FEATURE.md

Takes every `Answered` row, drafts the exact change that writes it in, has a second, independent agent check
each change, commits them one at a time, then grills what changed. Runs to the end. Read
[../reference/rules.md](../reference/rules.md) (§1 overrules, §3 supersession).

## R1 — Load the queue

SKILL.md's checks; open the entry; save the invocation; record chat answers first
([../reference/record.md](../reference/record.md) §5) — they join the queue. Reconcile the owner's edits
(`bf.py changed`). Queue every `Answered` row. Per row, mechanically:

- **Empty answer** → not queued; report it.
- **Doesn't say which way** (names no direction and states no behaviour) → `Flagged`,
  `Why flagged: the answer does not say which way — <what is missing>`.
- **Blocked** — depends on a row still `Open` → stays `Answered`; say which.
- **An overrule** of an already-applied answer → the queue item covers every line whose provenance names
  that row, and every row whose `Why asked` cites one of those lines.

Order the queue so a row others depend on goes first. `bf.py anchors <home>`: a stale fact that a `Today`
half in the queue's lines cites goes to one verifier before drafting.

## R2 — Draft the deltas (the orchestrator)

For each row, draft the exact change, following [../reference/feature-shape.md](../reference/feature-shape.md):

- **Only what follows from the answer** (plus the document and baseline it rests on). A part the answer
  leaves open becomes a narrower marker `→ asked next run`.
- New behaviour → a new `FR`; a change to what users have today → a `CH` citing the fact; something that
  must stay → a `KEEP`. Numbers from `bf.py ids --next <P> --count N`, taken once for the whole run.
- An owner's answer that contradicts a line **supersedes** it: rewrite the line, the provenance quoting the
  old text.
- **A delegated answer adds lines and settles its own markers and defaults only.** A delegated delta that
  would change or remove an existing `FR`, `CH`, `KEEP`, edge case, `Not doing` line or default is not
  drafted: the row is `Flagged` (*my answer for you would change "<line>" — yours to decide*). This check
  is the orchestrator's, mechanical: compare the delta's edits with the current file.
- An answer already fully carried by the current text → no change; the row goes straight to `Applied`
  quoting the line that carries it.
- Provenance per feature-shape.md §8 (*delegated* rows say so). Remove every marker pointing at the row that
  the answer settles; name defaults it replaces.

Freeze each delta as `{q, answer, current lines verbatim, proposed edits and adds, markers removed, defaults
removed}` in `work/<run-id>/deltas-<n>.json`.

## R3 — Check each delta, blind (1 checker per ≤8 rows, concurrent, a different model where available)

Brief: [../briefs/resolve-checker.md](../briefs/resolve-checker.md). The checker gets the question, the answer,
the current lines and the proposed change — never the drafting reasoning — and looks for what is wrong:

| Verdict | Meaning | Outcome |
|---|---|---|
| `clean` | Faithful to the answer, nothing extra, nothing dropped | Applied |
| `patch` | A clause **inside the delta's own lines** goes beyond the answer or drops part of it — the exact replacement for those lines | The patch applied once, then Applied |
| `flag` | Cannot be written honestly — the answer is ambiguous, would need a decision nobody made, or **a line outside the delta now contradicts it** | `Flagged`, the reason in `Why flagged`; a contradiction elsewhere also becomes a candidate for R5's grill |

A patch never touches a line outside the delta. Under-promising is not a defect: a delta that writes less
than a looser reading of the answer, but all the answer certainly says, is `clean`. No checker available →
written with `- **Unverified:** yes` on the row and `(unverified)` on the provenance line, counted and reported.

## R4 — Commit, one row at a time

In queue order: re-read `FEATURE.md`; if a line the delta touches changed since R1 **by anyone but this run**,
flag the row (*changed while I worked*); else write the delta, read back, remove the markers it settles
(route 1), set `Status: Applied` and add `- **Applied:** <date>` under the answer, and log
`applied q-NN · <IDs> · depth n` (n = the row's `Depth` + 1). `Flagged` rows: status, `- **Why flagged:** …`
under the answer, `flagged` line. Then `bf.py ids --sync`, regenerate `Open questions`, status line to `Draft`.

## R5 — Grill what changed, then close

The delta grill (2 passes) over the lines this run wrote — the derivative round (grill.md §4 bounds its depth).
Then [questions.md](questions.md) G3–G6. Reply: what was applied, one line per question naming the lines it
changed (superseded lines old → new); what was flagged and why; new questions; next step (*`ready` when nothing
is open*). Report, snapshot, `closed`.
