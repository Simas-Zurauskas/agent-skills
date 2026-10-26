# auto — the owner delegates the whole loop

`auto [rounds]` runs `answer` → `resolve` → (delta grill, inside resolve) round after round, then `ready`.
It exists for an owner who would rather veto than answer. Only a live invocation by the owner starts it
(rules.md §1), and every answer it writes is labelled as delegated.

## The loop

1. Record chat answers in the invocation first.
2. **Round** (at most `rounds`, default 3):
   1. [answer.md](answer.md) over every `Open` row.
   2. [resolve.md](resolve.md) — applies the owner's and the delegated answers, then grills what changed.
   3. Stop the loop when this round wrote **no new question** that `answer` could take, or when every
      `Open` row is one `answer` left on a hard limit.
3. If no `Open`, `Answered` or `Flagged` row remains, run [ready.md](ready.md). Its new questions, if any,
   get one more `answer` → `resolve` pass, then `ready` once more. Never more than one such extra pass.
4. Each command opens and closes its own log entry; `auto` adds a `note` line to each naming the round.

## The reply

One report for the whole loop, not one per command:

1. **Verdict** — *Ready for planning* or *Not ready — n questions need you*.
2. **Questions only you can answer** — the left rows, each with its reason and recommended direction.
3. **What I decided on your behalf** — every delegated answer (owner's list first) and every default,
   one line each, numbered for veto: *"say "q-4: …" or "drop D3" to change any of these."*
4. **What changed in the feature** — counts, and the parts most affected.
5. Agents dispatched and anything unverified.

**Stopping rules.** A round that writes nothing stops the loop. A flagged row stops nothing but is listed
first. If the owner interrupts, the current command finishes its in-flight write, logs `paused`, and the
next invocation continues from the files.
