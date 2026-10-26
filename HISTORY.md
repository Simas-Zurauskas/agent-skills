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
