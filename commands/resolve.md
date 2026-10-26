# resolve — write the answers into FEATURE.md

Takes every `Answered` row and writes it into the lines it decides, with one agent drafting each change
and a second, independent agent checking it. Runs to the end. By default **an answer supersedes text it
contradicts** (quoted on a provenance line); `resolve soft` ends such a row `Flagged` with both texts
and writes nothing for it. Then grills what changed. Read [../reference/rules.md](../reference/rules.md).

## R1 — Load the queue

SKILL.md's five checks; open the entry; record chat answers first ([../reference/record.md](../reference/record.md)
§5) — they join the queue. Queue every `Answered` row. Per row, mechanically:

- **Empty answer** → not queued; report it.
- **Doesn't answer the question asked** (names none of the directions, states no behaviour) → `Flagged`,
  `Why flagged: the answer does not say which way — <what is missing>`.
- **Blocked** — its answer depends on a row still `Open` → stays queued for later; say which.
- **Text it touches changed since the row was answered** by someone other than a run (rules.md §3) → the
  writer gets the current text; nothing is overwritten blind.

Order the queue so a row whose answer others depend on goes first.

## R2 — Write the deltas (1 writer per ≤5 rows, concurrent)

Brief: [../briefs/resolve-writer.md](../briefs/resolve-writer.md). Per row the writer returns the exact
change: which IDs it edits (new text, whole line), which it adds (next free numbers — the orchestrator
gives the writer the next free `FR`/`CH`/`KEEP` numbers), which markers it removes, which defaults it
replaces, and the provenance line. Rules it must follow:

- Everything written follows from the answer, the document and the baseline — **nothing the answer
  does not state**. A part the answer leaves open becomes a narrower marker `→ asked next run`.
- An answer that states a new behaviour may add a new `FR`; an answer that changes what users have today
  writes a `CH` citing the baseline fact.
- An answer contradicting a line supersedes it: the line is rewritten and the old text quoted on the
  provenance line. An answer contradicting the owner's own sourced words (not a run's draft) is
  **flagged** instead — two of the owner's statements disagree, and only they can say which holds.
- A delegated answer that contradicts a `FEATURE.md` line is flagged, never applied over it.

## R3 — Check each delta, blind (1 checker per ≤5 rows, concurrent, a different model where available)

Brief: [../briefs/resolve-checker.md](../briefs/resolve-checker.md). The checker gets the question, the
answer, the current lines and the proposed change — not the writer's reasoning — and returns per row:

| Verdict | Meaning | Outcome |
|---|---|---|
| `clean` | Faithful to the answer, nothing extra, no contradiction elsewhere | Applied |
| `patch` | A named clause goes beyond the answer, or a line elsewhere now contradicts it — with the exact fix | The fix applied once, then Applied |
| `flag` | Cannot be written honestly: the answer is ambiguous, contradicts the owner's own words, or would need an invented decision | `Flagged`, with the checker's reason in `Why flagged` |

A `patch` the orchestrator cannot apply cleanly → `flag`. One retry of the whole pair for a row the writer
got structurally wrong; then flag. With no checker available: written `unverified`, counted, reported.

## R4 — Commit, one row at a time

For each row in queue order: re-read `FEATURE.md`; if a line the delta touches changed since R1, flag the
row (*changed while I worked*); else write the delta, read back, remove the markers it settles (route 1),
set the row to `Applied` with today's date in the row, and log `applied q-NN · <IDs> · depth n` (depth =
the question's depth + 1). `Flagged` rows: set status and `Why flagged`, log `flagged`.

Then `bf.py ids <home> --sync`; regenerate the `Open questions` block; clear any `Ready for planning`
stamp.

## R5 — Grill what changed, then close

The delta grill over the lines this run wrote (2 passes) — the derivative round. Its candidates are
depth 2 or more; depth-3 candidates never become questions (grill.md §4). Then
[questions.md](questions.md) G3–G6. Reply: what was applied (by question, one line each, naming the
lines it changed), what was flagged and why, new questions if any, next step (*`ready` when nothing is
open*).
