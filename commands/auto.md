# auto — the owner delegates the loop

`auto [rounds]` runs `answer` → `resolve` (with its delta grill) round after round, then `ready`. It is for an
owner who would rather veto than answer. Only a live invocation by the owner starts it, and every answer it
gives is labelled as delegated ([../reference/rules.md](../reference/rules.md) §1).

**What keeps it safe:** a delegated answer never grounds another delegated answer — questions that arise from
text a delegated answer wrote are left for the owner ([answer.md](answer.md) W2); a delegated answer never
changes or removes an existing line ([resolve.md](resolve.md) R2); and `ready`'s stamp says *pending your
review* until the owner accepts what was decided for them.

## The loop

`auto` takes the lock and opens one log entry; the commands it runs work inside that entry — they take no
lock and open or close nothing ([../reference/record.md](../reference/record.md) §4) — and share one report. It
records chat answers in the invocation first.

1. **Round** (at most `rounds`, default 3):
   1. [answer.md](answer.md) over the `Open` rows (rows left before and unchanged are skipped).
   2. [resolve.md](resolve.md) — applies the owner's and the delegated answers, then grills what changed.
   3. **Stop the loop** when this round answered nothing new — every `Open` row left is one only the owner
     can take — or wrote no new question.
2. **`Flagged` rows stop the loop before `ready`**: they are the owner's, listed first in the reply.
3. If no `Open`, `Answered` or `Flagged` row remains, run [ready.md](ready.md). If `ready` writes new
   questions, one more `answer` → `resolve` pass, then `ready` once more — never more than one such pass.
4. After each round, `bf.py snapshot <home> --run <id>-r<n>` — so the next round's `bf.py changed` shows only
   edits the owner made, never this loop's own writes. Heartbeat `note round n` lines; one report, one final
   snapshot and one `closed` line at the end.

## The reply — one report for the whole loop

1. **Verdict** — *Ready for planning (pending your review)* or *Not ready — n questions need you*.
2. **Questions only you can take** — each with why it was left and its recommended direction, if any.
3. **What I decided for you** — every delegated answer (owner's-list ones first) and every default, one line
   each, numbered for veto: *"say "accept", or "q-4: …" / "drop D3" to change any."*
4. **What changed in the feature** — counts, and the parts most affected.
5. Agents dispatched, anything unverified, anything flagged.

If the owner interrupts, the command in progress finishes its current write, logs `paused`, and the next
invocation continues from the files.
