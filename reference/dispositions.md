# Dispositions — what happens to every finding

Every candidate the grill returns ends in **exactly one** disposition, decided before anything is
written. **A question is the rarest of them**: each costs the owner real attention, and a question the
code, the document or a convention already answers is review work made out of nothing.

| Disposition | When | What is written |
|---|---|---|
| **PRODUCT** | The code (or a verified wiki fact) answers it | A `B-n` fact in `baseline.md` (verified like any fact); where the feature needs it stated, a `KEEP` or a clarified line citing it; a marker it settles is removed (route 6) |
| **FIX** | Existing text is wrong, stale or inconsistent, with a winner checkable by quote: a source, a baseline fact, an applied answer, or the document's own other text | The exact replacement, applied; listed in the report beside the text it replaced; vetoable |
| **DEFAULT** | rules.md §4's four conditions hold, nothing on its never-list is touched | A `Default D-n (…)` line where it bites (feature-shape.md §5), with its ledger line |
| **SLOT** | The answer is content someone will supply — wording, artwork, a list | A `Copy slot S-n` / `Content slot S-n` line (feature-shape.md §6) |
| **QUESTION** | Passes the gate (§3) | A `q-NN` row in `questions.md`, with a marker where it bites |
| **DISCARD** | A named filter (§2) | A `discard` line in the run report with the filter, its evidence and a one-line counter-case |

## 1. Deduplicate first

Merge this run's candidates that ask the same decision (same entity, same grounding or the same decision
in other words) into one, keeping every grounding and lens. Two different decisions on one entity stay
two. Then compare against **every** existing question row in any status, and against earlier runs'
discards: a match must quote the row or discard line it matches, or it is not a match.

## 2. Filters — a discard needs a name and its evidence

| Filter | Discard when — and the evidence it must carry | Instead |
|---|---|---|
| **Already answered** | A line in `FEATURE.md`, a default, a slot, an answered row, or a source span settles it — **quote it verbatim** (string-matched). A source span that settles it means the document is missing the fact: that is a FIX, not a discard | Point at the quote |
| **Answered by the product** | The code settles it — anchor + snippet, checked by `bf.py anchors` | PRODUCT |
| **Duplicate** | A question row already asks it — quote the row | Link the marker to that row |
| **Consequence of an open question** | An `Open` or unapplied `Answered` row blocks it — quote the blocking sentence | Link the marker to the blocking row; it regenerates once that is answered |
| **Implementation, not intent** | The answer changes how it is built, not what anyone sees or is promised — unless it alters an observable promise, or the project named it as a known failure | A `Rabbit holes` line, or nothing |
| **Already decided against** | The owner excluded it | A `Not doing` line |
| **Excluded by a project rule** | A standing project rule puts the topic out of scope — quote the rule | Report line |
| **Not a feature question** | No answer would change any line of `FEATURE.md` — strategy, marketing, the owner's own process | Report line |
| **Generic checklist** | A sweep topic nothing in the sources, requirements or product makes bite | Report line |
| **Derived past the bound** | Depth 3 (grill.md §4) and would be a question | Rabbit hole, default if eligible, or report line |
| **Unreachable** | The constructed state cannot happen in the product as built — cite the code that prevents it | Report line |

**A discard on none of these is a discard on taste, and is not allowed.** A quote that does not match
invalidates the discard and the candidate proceeds.

**Never discarded on any filter:** a contradiction between sources, and anything on the project's
always-ask list. They go straight to the gate.

## 3. The gate — what earns a question

A candidate becomes a QUESTION only if **all three** hold, and its `Why asked` names each:

1. **The delta test.** Two plausible answers produce two different lines in `FEATURE.md`. Write both
   (`two_answers`). Same sentence with a different adjective → no question.
2. **Only the owner can answer it** — a product choice, scope, money, legal posture, wording, a promise
   to users, what is kept or shown to others, or a fact only the owner has. Not the code, not a convention.
3. **Something stays unwritable until it is answered** — name the requirement, `CH`, `KEEP`, edge case
   or block that stays blank or marked.

Exempt from 1 and 3: **a contradiction between sources** (the conflict is the defect — quote both).

**Split before deciding.** A candidate carrying two decisions — two independent pairs of competing
answers can be written — is two candidates. A candidate half-settled by an existing line is trimmed to
the unsettled half, quoting the settled one.

**A broad candidate is narrowed to its owner-owned core**; the rest goes to the other dispositions.

## 4. The blind router — a second agent re-derives every disposition

Brief: [../briefs/router.md](../briefs/router.md). **At most 15 candidates per router agent**, routers
concurrent. Each candidate goes with its grounding and `two_answers`, **never with the first routing**.
The router has read access to the code and checks PRODUCT claims there.

Combining the two verdicts:

- **Both agree** → that disposition.
- **Either says QUESTION** → QUESTION, *unless* the other side carries full evidence for its routing — a
  verbatim matching quote (already answered / fix), a verified anchor (product), or a pattern anchor or
  four attestations (default) — **and** the router, shown that evidence on its own, did not reject it.
  Fails open to asking, never to silence.
- **Both non-question but different** → PRODUCT if either has a verified anchor; otherwise DEFAULT (the
  most conservative: labelled, ledgered, vetoable), with the disagreement on the ledger line.
- **No router available** → the first routing stands, marked `unverified` (rules.md §5).

**Before any default is written — the never-list check (mechanical).** Read the draft default and its
ledger clauses for: money words (price, fee, pay, refund, charge), legal or standards names, a minor or
age, a date, deadline, window or duration not already in the product, final wording, and **any change
to what users experience today**. A hit makes it a QUESTION unless the router, shown the hit, returned
DEFAULT naming why the never-list does not reach it.

## 5. Drafting a question row

```
### q-04 · Can a person pin a closed challenge?
- **Status:** Open
- **Touches:** FR-3, KEEP-1
- **Why asked:** Your note says pinned challenges "stay on top"; today closed challenges always sit below
  open ones (B-5). Whether a pin overrides that decides FR-3 and KEEP-1.
- **Directions:**
  1. Only open challenges can be pinned; closing one unpins it. — Simplest; matches how closed
     challenges are set apart today (B-5).
  2. Closed challenges can stay pinned, shown on top of the closed group. — Keeps a finished favourite
     findable; one more state to show.
  3. Pins override everything, closed or not. — Most literal reading of "stay on top"; mixes finished
     and live challenges.
- **Recommended:** 1 — closest to today's behaviour, smallest change.
- **Created:** 2026-10-26

**Answer & why:** _(unanswered)_
```

- **Question** — one decision, one question mark, ~25 words, the owner's terms, answerable in a line
  (pick a direction, or a value with its unit). None of this skill's words (rules.md §9).
- **Why asked** — what prompted it, quoting the source and citing the baseline; and what stays blank.
  A contradiction carries both quotes with both sources, verbatim.
- **Directions** — 2–4 options with their trade-offs, grounded in the document and the product; the
  option closest to today's behaviour is always one of them. **Recommended** names one with a reason
  in one line, using the grounds in [../commands/answer.md](../commands/answer.md) §3. Both are labelled
  as suggestions: the owner may answer in their own words or with a number.
- **Touches** — the IDs it decides, or `feature` for a feature-wide question.

**Two mechanical gates on the draft, no agent:**
- **Read-back:** if `Why asked` says, in any words, that the owner cannot answer it (*"depends on the
  store's rules"*, *"the lawyer would know"*), it is not written: it becomes a report line naming who can.
- **Bundle:** two question marks, or a second ask after *and*, or two objects of decision → split (§3).

## 6. The cold read — fresh readers, before any question is written

Brief: [../briefs/cold-reader.md](../briefs/cold-reader.md). **Up to 10 drafted rows per reader,**
readers concurrent. The reader gets the drafted rows, `FEATURE.md`, `baseline.md`, every standing row
with its answer, the defaults ledger, and read access to the code — **and nothing about how the rows were
made.** It reads as the owner who must answer, and judges each row on its own:

| Verdict | Evidence it must carry, or it counts as `stands` | What happens |
|---|---|---|
| `stands` | — | Written as drafted |
| `answered` | The settling text verbatim with where it sits (document, row, default, source) or a code anchor — string-matched / anchor-checked | Discarded on *Already answered* / *Answered by the product* / *Duplicate*, tagged `cold read` |
| `irrelevant` | A §2 filter by name with that filter's evidence | Discarded on that filter, tagged `cold read` |
| `simplify` | One-sentence rewording, one decision, not longer than the draft | Rewording adopted in `Question` only. A bundle is split and each half re-disposed |
| `extend` | A wider wording that is still one decision, and the drafted siblings it absorbs | Adopted; absorbed siblings discarded as duplicates of it. A standing row is never rewritten — a merge goes to the report |

Contradictions and always-ask topics take only `stands`, `simplify` or `extend`. With no reader
available, rows are written `unverified` and counted.

## 7. Writing

- **Order questions by how much the answer changes `FEATURE.md`**: contradictions first, then by how
  many requirements an answer decides, money, privacy and changes to existing behaviour breaking ties.
  `q-NN` numbers are assigned in this order, at write time only.
- Writing a row and pointing its marker at it are one act.
- Defaults, fixes and slots are **adopted on write** — labelled *adopted*, listed in the report, each
  vetoable at any later run with *"drop D3"* / *"undo fix 2"* / *"drop S1"*. A vetoed default's gap
  returns as a marker and becomes a question that is never defaulted again.
- **Sanity range, not a quota.** A first `init` on a typical feature writes about 4–15 questions; above
  ~2 open questions per `Behaviour` part, re-run the gate over the batch once (some channel leaked) —
  never discard for count, and say so in the reply if the count stays high.
- **Funnel line** in the log and report: candidates → product → fix → default → slot → questions →
  discarded. A run that floods questions shows it on its face.
