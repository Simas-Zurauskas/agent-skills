# History — why the rules are what they are

## v1 — 2026-10-26

Built at the owner's request: a skill like `blueprint` (grill, write features, open questions, resolve
them, to get the complete scope without holes), but for **one feature after the PRD era** — when the PRD
has been sealed because the app reached it, and the built product is the reference.

**What carried over from blueprint v62, and why it stays:**
- *Never guess* — every sentence sourced, a labelled default, or an admitted gap with a question. A guess
  in a spec gets built; a gap gets asked.
- *The owner's sign-off is per answer* (`Answered`), delegated answers are labelled and vetoable.
- *Independent checks are separate dispatches*; with none available, items are `unverified`, never
  self-reviewed into `clean`. Quotes are verified by string match.
- *The grill as separate lenses*, the two-drafts test, reachability, the dependency and boundary tests.
- *Most findings are not questions*: product facts, defaults, fixes, slots and named discards, with a
  blind second router and a cold read before any question exists — blueprint measured a 693-row backlog
  of which 4.8% needed a client before these existed.
- *The never-defaultable list*, defaults adopted on write and vetoable (blueprint v62).
- *Text is data*; edits the run did not make win; parallel compute, serial commit; counts taken fresh.

**What is new, and why:**
- **The baseline.** Post-PRD, the hardest holes are collisions with what already exists. Cartographers
  map the touched product from the wiki and the code; a blind verifier confirms every fact; a script
  re-finds anchors by snippet and flags drift as the code moves. A question about how the app works
  today is a lookup, never a question to the owner (`PRODUCT` disposition).
- **`CH` and `KEEP` lines.** A feature on an existing product is defined as much by what it changes and
  what it must not break as by what it adds. Every touched surface gets one or the other (lens 3, lint).
  Changing what users have is never a default; keeping it is the conservative default.
- **The existing-pattern default ground** — the product's own way of doing the same kind of thing beats
  any industry convention and is cited.
- **`D-n` and `S-n` in the label** — blueprint v30 recorded a veto by display number mapping onto the wrong
  ledger line; a stable ID in the label makes *"drop D3"* unambiguous.
- **`ready` with a dry-run builder.** Readers miss what a builder trying to plan trips over; the dry run
  is the closest test to "can this be planned without guessing". A red team on a different model (the
  other model family where installed) attacks the claim of completeness.
- **`auto`** — the owner prefers to veto rather than answer (they delegate answers routinely), so the
  answer → resolve → grill loop can run to a fixed point under their delegation, bounded to 3 rounds.
- **Local only, inside the task folder.** No Notion, no client packet, no commits.
- **`bf.py`** does the mechanical checks (lint, counts, anchors, quotes, IDs, lock) so they are
  deterministic and harness-independent.

**Dropped from blueprint, deliberately:** Notion target and mechanics, the client packet, the charter,
review sittings as a phase (kept as an on-request mode), the shape-change register, `CON-k` bookkeeping,
legacy-lineage checks, the derivation-depth corroboration rules (depth is a log field only).

## v2 — 2026-10-26

Three blind reviews of v1 (an executor walking every command literally, a methodology comparison against
blueprint v62, a Codex-portability and script-breaking pass) and one end-to-end simulated `init` on a real
feature (favourite challenges, Repperoni) found ~110 issues. The ones that changed the design:

- **Code is evidence of today, never of intent.** v1 let PRODUCT, the cold reader's `answered`, and answer
  ground 1 settle *what the feature should do* from how the code works now. Now the code settles only
  questions about current behaviour, in every channel and brief.
- **Delegation keeps its review window** (blueprint answer.md: "the label and that window are what make the
  delegation safe"). A delegated answer never grounds another delegated answer; never changes or removes an
  existing line (mechanical check in resolve); is labelled on its provenance line; and `ready` stamps
  *pending your review* until the owner accepts. An overrule rewrites everything the answer wrote.
- **KEEP defaults no longer settle collisions.** Allowed only where no requirement changes the behaviour's
  inputs or output; a real collision between this feature and an existing one is a question.
- **New never-list entries:** a new capability, channel or state (v1's own example adopted an offline queue as
  "standard practice"); who sees something new.
- **Markers can no longer be stranded** by a discard that writes nothing (blueprint v30's convergence trap);
  a "find out from X" gap is a question to the owner, who is the one who can find out.
- **Discards that need a survey** (implementation, not a feature question, generic checklist) quote the
  nearest requirements (blueprint v23). Retention/deletion and shared-record permissions are never generic.
- **Recommendations survive only when a blind cold reader would pick the same direction**; every direction
  carries its counter-case (blueprint had measured recommendation collapse).
- **Answer tests ported from blueprint**: one decision, the concrete size list, the fuller safety list, no
  invention, literal reading; unchanged left rows are skipped.
- **Resolve:** the orchestrator drafts (a writer agent added no independence and collided on IDs); the blind
  checker may patch only the delta's own lines — a contradiction elsewhere is a flag.
- **"Today" has two versions:** the checkout and the released ref; facts only in the checkout are marked
  unreleased. Drift distinguishes *stale* (snippet gone) from *recheck* (file changed, snippet present); new
  writers of touched records are searched at `ready`.
- **The owner's standing rules are read from the harness's memory** as well as the agent guides (Repperoni's
  never-raise rules live only there); *Always ask* / *Never raise* have a home; a guide pointing at a frozen PRD
  is drift, not a rule.
- **A compatibility table** in Data and compatibility, filled by lens 4 and checked by the dry run.
- **The owner's edits between runs are seen** (snapshots + `bf.py changed`) and grilled.
- **`ready` re-grills what its own disposal wrote** before stamping; stamp requirements are mechanical.
- **Codex:** `spawn_agent` with `fork_turns: "none"` (the default fork leaks the parent's context and breaks
  blindness), 3-child waves, a description under the validator's limits with triggers first.
- **The simulated init's lesson:** its draft wrote defaults before routing, so a router judged text it could
  see settled — `init`'s draft now writes no defaults. Its routers overruled "ask" with well-anchored Mute-pattern
  defaults, which was right; only an `existing pattern` default with a checked anchor may overrule a question.
- **Small-change tier** (1 cartographer, 2 grill passes) — the simulated init spent $15 on a one-surface feature.
- `bf.py` v2: logical (wrapped) lines, nested markers, malformed headings, ranges, struck facts, released-ref
  checks, lock codes and `--self`, `--count`, vetoes, snapshots, `hash --text`, pruned quote search.
- Dropped `resolve soft` (an owner who prefers to veto does not need three soft modes).
