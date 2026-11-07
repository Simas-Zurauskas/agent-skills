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

## v3 — 2026-10-26

A second cold executor review, of v2 (42 findings, 6 blockers). The ones that changed behaviour:

- **The questions for a run's own markers were only gathered by a standalone `questions` run**, so `init`,
  `add`, `resolve`, `ready` and `auto` left their own markers (and contradictions) with no question row —
  `auto` could end with markers and nothing for the owner to answer. The gathering now opens G3, which every
  command runs.
- **Provenance lines quote old text**, which often held the marker or default being replaced; `bf.py` read
  them as live, so a feature could never reach Ready. It now ignores everything inside a provenance line.
- **The lock**: headers with a mode (`init soft`, `auto 3`) were unparsed; "closed as abandoned" now lives in
  the closing run's own entry (the log is append-only) and names the run id; commands inside `auto` take no
  lock and close nothing — v2's text would have released `auto`'s lock mid-loop.
- **The released ref is the remote-tracking ref** — in this workspace local `main` was 209 commits behind
  `origin/main`, which would have marked every fact unreleased. `bf.py` warns when a local ref lags.
- **Ready refuses `Not covered yet.` blocks and a missing compatibility table.**
- **`unverified` can be cleared**: the next run with an agent re-runs the missing check.
- **Blindness is enforced by the scope line**: agents never open a home's `work/` or `record/` unless the
  brief names the file; quotes are checked against the file the filter names, never `work/` or snapshots.
- **The router could not produce `keeps today's behaviour` and did not know its limit** — added to router
  and grill briefs.
- Owner fields: the status moves commands define are named as the one exception; an `Open` row the owner
  filled in is never overwritten by `answer`; a standing delegation in memory never starts one.
- `Depends on` field; `add` closes the rows its material settles; *ask it better* rows are not duplicates;
  a vetoed KEEP default becomes a tombstone; `Added Fn` provenance; recheck clears via verified hashes;
  `rowhash`; concrete model rule; an early-stopping `ready` closes its entry; `auto` snapshots per round.

## v4 — 2026-10-26

The second simulation (v2: `init` then `auto` on favourite challenges) ran clean — 11 questions at init, 8
answered for the owner and checked, every change checked — but `auto` stopped after two rounds with 9 questions
for the owner, six of them follow-ups of its own delegated answers. v2's rule (a delegated answer never grounds
another delegated answer) stopped evidence-settled follow-ups along with judgement ones. Now a follow-up may be
delegated on evidence only (grounds 1–3), never on judgement (4–5) and never on the owner's list. The chain is
still bounded by the depth cap. (The sim's q-17, a screen-reader question, came from the sandbox not loading the
owner's memory — in real use the *Never raise* list filters it.)

## v5 — 2026-10-26

The owner's direction after reading the simulations: *"take a bit more ownership — no need to prompt so many
questions or leave so much for a human to decide; it is not as important as the PRD; what we care about is
that the whole feature adds up and nothing is missing; serious questions still go to the human."* The v2
simulation's init had written 11 questions for a one-surface feature, most of them ordinary product calls.

- **The run decides the feature's ordinary calls itself.** New default ground **simplest fit** (least to
  build, fewest new promises, least change to what users have, nothing unasked — naming the option passed
  over), after existing pattern, keeps today, chosen design and convention.
- **The never-list became the serious list** — money · legal, privacy, safety, minors · what is kept and for
  how long · who can see what · scope added or dropped · taking away what users have · the owner's words
  disagreeing or a fact only they have · *Always ask*. Only these become questions. Dates, notifications,
  ordering, timing, a `CH` the request necessarily implies, and collisions with existing features are now
  the run's calls (a change that takes something away from users stays serious).
- Routing: a QUESTION verdict that names no serious item that applies is decided as a default; the cold reader
  gained a `decide` verdict. Expected questions at init: about 0–6.
- **Completeness is the job**: lens 5 walks every actor end to end (discover, first use, everyday use, change
  their mind, the thing going away, coming back); the red team checks that the feature adds up.
- `ready` re-grills what it decided while closing dry-run and red-team findings, up to two more rounds.
- The reply leads with *Decided for you* (vetoable with "drop D3" or "D3: <your call>").
- Deliberately unchanged from blueprint: the sourced / default / gap model, labels and ledger, blind routing,
  cold reads, delegated answers with their review window, the independent checks.

## v6 — 2026-10-27

The third simulation (v5) reached `ready` for the first time. `init`: 1 question (the owner's own words
conflicting), 25 decided calls. After the owner's answer, `ready`'s dry-run builder and red team found a
default that could not be built (corrected), a default that quietly contradicted the owner's own sentence
(became the one question), and a wrong menu placement (corrected) — the gate doing what it is for. The run
skipped further re-grill rounds once a question had been written; that is now the rule. Costs measured:
`init` ≈ $28 / 37 min, `resolve` + `ready` ≈ $27 / 37 min on a one-surface feature (Opus).


## v7 — 2026-11-05

The owner authorized a practical revision after six isolated OSS spec/build attempts and independent
behavior/browser evaluations. Under a 20-minute spec cap, v6 stayed Draft in all three cases; the trial
reached ready for search (12.3 min) and private drafts (17.8 min), with pins still Draft. Trial search
used 155k uncached input tokens versus at least 314k in v6 before the censored follow-up. These are one
trial per condition, some incomplete turns and runner repairs, not dollar billing or eventual-quality
proof. The frozen trial also added an unrequested concurrency contract; it was not installed wholesale.

- Risk/blast-radius/reversibility determine coverage: one combined review for small local work, builder
  plus adversary for interacting/consequential work, focused extra help only for distinct breadth/risk.
- Author maps/drafts ordinary behavior directly. Substantive reviews absorb baseline verification,
  fidelity, routing, question clarity, answer challenge/application; retired duplicate role briefs.
- Apply known owner decisions first; surface serious gaps early. Chained commands share one useful final
  review boundary. Ready reuses input-current coverage; real corrections receive targeted rechecks.
- One correction/recheck batch by default; explicit rounds is a ceiling. Incomplete work stays Draft.
- Every new promise must protect a requested outcome from a concrete reachable failure, using the
  simplest adequate behavior. Optional hardening/mechanisms do not silently expand the product spec.
- Keep implementation validation separate: independent pin runtime checks still found boundary/data
  defects even when feature tests passed. Planning readiness is not runtime/release certification.
- Compact existing reports/logs; no new receipt engine or schema migration. Keep FR/CH/KEEP/B/q IDs,
  source capture, provenance, defaults/vetoes, snapshots, counts/anchor/lint/lock mechanics compatible.
- Honor genuine project intent authority; distinguish inspected checkout from evidenced deployment.
  Unknown release state is explicit. Model routes use supported identifiers/configured defaults with
  actual reporting; fresh context is mandatory, a different model no longer multiplies every check.

Mechanical validation and focused independent forward-testing are recorded in the maintainer's update
workspace. Claude/Codex instruction paths and symlinks are preserved; no claim of a live Claude replay.

## v8 — 2026-11-07

Conservative maintenance of v7's review policy. The lock CLI previously called a run abandoned solely
from log age and told the caller to close it, contradicting the governing ownership rule. It now reports
unconfirmed ownership and requires evidence that the writer stopped. Exit codes, schemas and log
formats are unchanged; log inspection is explicitly not an atomic lock. The self-test exercises recent,
old and older hidden open runs through the CLI and verifies read-only behavior.

Claude routing explicitly requires a non-fork fresh context; background execution does not itself
compromise isolation, and a conversation fork is not an independent reviewer. Native collection and
existing bounded fallback remain; no global configuration changes. Handoff links existing definition
and evidence without adding planning artifacts. Small/elevated/broad coverage, serious-decision
authority, correction bounds and freshness/reuse rules remain unchanged. Validation evidence and
limits are recorded in the companion v63/v8 lab assessment; no runtime or release certification.

Independent comparison also reproduced three inherited helper defects, repaired locally in this release:
the earlier documented bullet-form answer was parsed as empty; rowhash omitted middle members of valid
Touches ranges (and wrapped continuations); changed ignored additions/deletions against a snapshot.
Both answer spellings remain readable, the canonical example matches the existing template, range
expansion is shared with lint, and file existence differences are reported as changes. Regression
controls cover unchanged/unrelated text and restored files. No stored schema, IDs or flags change.
The question template no longer implies that an optional recommendation always requires two reviewers.

Fresh paired feature trials retained one combined review for the narrow sort change and reuse at ready.
Both versions surfaced the serious sharing/access/data decisions early without exhaustive review of an
unsettled draft. Dirty-source maintenance with unchanged HEAD invalidated readiness when new independent
review was unavailable. Existing v7 homes retained identical output in 16 read-only helper comparisons.
These bounded checks do not establish a general speedup or runtime correctness. The actual restricted
Claude subagent check establishes routing only, not an equivalent substantive reviewer benchmark.
