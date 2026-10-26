# Dispositions — what happens to every finding

Every candidate the grill returns ends in **exactly one** disposition, decided before anything is written.
**A question is the rarest of them**: each costs the owner real attention, and a question the code, the
document or a convention already answers is review work made out of nothing.

| Disposition | When | What is written |
|---|---|---|
| **PRODUCT** | The gap is about **current behaviour** and the code answers it ([rules.md](rules.md) §4) | A `B-n` fact in `baseline.md` (anchor-checked by `bf.py anchors`, confirmed by the router), and a `Today`/`KEEP` line citing it where the feature needs it; a marker it settles is removed (route 6) |
| **FIX** | Existing text is wrong, stale or inconsistent, with a winner checkable by quote: a source, a baseline fact, an applied answer, or the document's own other text | The replacement, with `*(Corrected Fn, <date> — was: "…")*`; a ledger line; vetoable (*"undo F2"*) |
| **DEFAULT** | rules.md §4's four conditions hold and nothing on the never-list is touched | A `Default Dn (…)` line where it bites ([feature-shape.md](feature-shape.md) §5) and its ledger line |
| **SLOT** | The answer is content someone will supply — wording, a design, a list | A `Copy`/`Content`/`Design slot Sn` line and its ledger line |
| **QUESTION** | Passes the gate (§3) | A `q-NN` row in `questions.md`, with a marker where it bites |
| **DISCARD** | A named filter (§2), with its evidence | A `discard` entry in the run report: filter, evidence, one-line counter-case |

The **ledger** is `record/defaults.md`: one line per `Dn`, `Fn`, `Sn` — the sentence or change, its
grounding, the four attestations (for defaults), what owner-owned thing it does not decide, and the second
check's verdict. Briefs that need the standing defaults read it.

## 1. Deduplicate first

- Merge this run's candidates that ask the same decision into one, keeping every grounding and lens; two
  different decisions on one entity stay two.
- Compare against **every** question row in any status: a match must quote the row.
- Compare against earlier runs' discards (the reports in `record/runs/`): a match is discarded **on the
  original filter, re-tested now with fresh evidence** — never on the bare fact that it was discarded
  before.
- **Reverse sweep, once per run:** read every standing `Open` row against the current `FEATURE.md`. A row
  the current text now fully settles is listed in the reply under *"Already settled — say "close q-NN" to
  close"*, quoting the settling text. The run closes nothing itself.

## 2. Filters — a discard needs a name and its evidence

| Filter | Discard when — and the evidence it must carry | Instead |
|---|---|---|
| **Already answered** | A line in `FEATURE.md`, a default, a slot or an answered row settles it — **quote it verbatim** (string-matched). A **source span** that settles it means the document is missing the fact: a FIX, not a discard | Point at the quote |
| **Current behaviour, answered by the code** | The gap is about what the app does today, and the code settles it — anchor + snippet. **Never** for a gap about behaviour after the feature | PRODUCT |
| **Duplicate** | A question row already asks it — quote the row | Link the marker to that row |
| **Consequence of an open question** | An `Open` or unapplied `Answered` row blocks it — quote the blocking sentence | Link the marker to the blocking row |
| **Implementation, not intent** | The answer changes how it is built, not what anyone sees or is promised — **with a survey** (below) | A `Rabbit holes` line |
| **Already decided against** | The owner excluded it — quote them | A `Not doing` line |
| **Excluded by a project rule** | On the *Never raise* list, or a project rule puts it out of scope — quote it | Report line |
| **Not a feature question** | Strategy, marketing, the owner's own process — **with a survey** | Report line |
| **Generic checklist** | A sweep topic nothing makes bite — **with a survey**. Never for retention/deletion of what users create, or permissions on shared records | Report line |
| **Derived past the bound** | Depth ≥ 3 and not exempt ([grill.md](grill.md) §4) | Rabbit hole, or report line |
| **Unreachable** | The constructed state cannot happen in the product as built — the code that prevents it | Report line |

**The survey** — required for *Implementation*, *Not a feature question* and *Generic checklist*: name the
two or three requirements nearest the candidate, **quote each one's sentence**, and state that no answer
would change any of their pass/fail conditions. A survey whose quotes do not match the document is not
evidence, and the candidate proceeds.

**A discard on none of these is a discard on taste, and is not allowed.** A quote or anchor that does not
check out voids the discard. **A marker is never stranded by a discard**: a filter whose *Instead* writes
nothing keeps the gap's marker linked to a question, or the candidate proceeds to the gate.

**Never discarded on any filter:** a contradiction between sources · anything on the *Always ask* list ·
the gap of a vetoed default.

## 3. The gate — what earns a question

A candidate becomes a QUESTION only if **all three** hold, and its `Why asked` names each:

1. **Delta.** Two plausible answers produce two different lines in `FEATURE.md` (`two_answers`). Same line
   with a different adjective → no question.
2. **Only the owner can settle it** — a product choice, scope, money, legal posture, wording, a promise to
   users, what is kept or shown to others, a change to what users have today, or a fact only the owner has
   (or can find out — *"what does the store require for …?"*). Not the code, not a convention.
3. **Something stays unwritable until it is answered** — name the requirement, `CH`, `KEEP`, edge case,
   table cell or block that stays blank or marked.

Exempt from 1 and 3: **a contradiction between sources** (quote both).

**Split before deciding** — a candidate carrying two decisions (two independent pairs of competing answers
can be written) is two candidates. A candidate half-settled by an existing line is trimmed to the unsettled
half, quoting the settled one. A broad candidate is narrowed to its owner-owned core; the rest goes to the
other dispositions.

## 4. The blind router — a second agent re-derives every disposition

**Before dispatch, the never-list scan (mechanical, on each candidate's `gap` and `two_answers`):** money
words (price, fee, pay, refund, charge, subscription), legal or standards names, minors or ages, a date,
deadline, window or duration, wording, a change to what users see or do today, a new notification,
permission, state or channel, who sees something new, and every *Always ask* topic. Hits travel with the
candidate.

Brief: [../briefs/router.md](../briefs/router.md). **At most 15 candidates per router**, routers concurrent.
Each candidate goes with its grounding, `two_answers` and never-list hits — **never with the first routing**.
The router reads the code to check PRODUCT claims and returns its own outcome and evidence.

**Combining the two verdicts:**

- **Both agree** → that disposition (a DEFAULT with a never-list hit only if the router named why the list
  does not reach it).
- **Either says QUESTION** → QUESTION, *unless* the other side's evidence is **mechanically verified** —
  a quote that matches (*already answered*, FIX), an anchor that checks out for a gap about current
  behaviour (PRODUCT), or an **`existing pattern` DEFAULT** whose pattern anchor checks out, with all four
  attestations and no never-list hit. A `standard practice` default never overrules a QUESTION: fail open to
  asking.
- **Both non-question but different** → PRODUCT if either has a verified anchor on a current-behaviour gap;
  else DEFAULT if one side proposed default text that passes the never-list; else QUESTION.
- **A vetoed default's gap** → QUESTION, whatever the verdicts.
- **No router available** → the first routing stands, marked `unverified` ([rules.md](rules.md) §5) — except
  that a never-list hit or a vetoed gap is a QUESTION.

## 5. Drafting a question row

```
### q-04 · Can a person pin a closed challenge?
- **Status:** Open
- **Depth:** 1
- **Touches:** FR-3, KEEP-1
- **Why asked:** Your note says pinned challenges "stay at the top"; today closed challenges always sit
  below open ones (B-5). Whether a pin overrides that decides FR-3 and KEEP-1.
- **Directions:** 1. Only open challenges can be pinned; closing one unpins it — closest to today, but a
  finished favourite drops out of view. · 2. A closed challenge stays pinned at the top of the closed
  group — still findable, but one more state to show. · 3. Pins override everything — the literal reading,
  but finished and live challenges mix.
- **Recommended:** 1 — closest to how closed challenges are set apart today.
- **Created:** 2026-10-26

**Answer & why:** _(unanswered)_
```

- **Question** — one decision, one question mark, ~25 words, the owner's terms, answerable in a line.
- **Depth** — [feature-shape.md](feature-shape.md) §8.
- **Why asked** — what prompted it (quote the source, cite the baseline) and what stays blank. A
  contradiction carries both quotes with both sources.
- **Directions** — 2–4 options, **each with its counter-case** (*"— but …"*), grounded in the document and
  the product. The option closest to today's behaviour is always one of them.
- **Recommended** — one direction and its reason in one line, by the grounds in
  [../commands/answer.md](../commands/answer.md) §3. **Kept only if the cold reader, judging blind, picks
  the same direction**; otherwise the line is removed. Never on a contradiction.
- **Touches** — the IDs it decides, or `feature`.

**Two mechanical gates on the draft:**
- **Read-back:** if `Why asked` says the owner cannot decide it (*"depends on the store's rules"*), reword it
  as a find-out question naming who knows (*"What does the App Store require for …?"*) — the owner is the
  one who can find out.
- **Bundle:** two question marks, a second ask after *and*, or two objects of decision → split (§3).

## 6. The cold read — fresh readers, before any question is written

Brief: [../briefs/cold-reader.md](../briefs/cold-reader.md). **Up to 10 drafted rows per reader**, readers
concurrent. The reader gets the drafted rows **without the Recommended line**, plus `FEATURE.md`,
`baseline.md`, every standing row with its answer, `record/defaults.md`, `sources/`, and the code — **and
nothing about how the rows were made.** It reads as the owner who must answer, judges each row on its own,
and returns:

| Verdict | Evidence it must carry, or it counts as `stands` | What happens |
|---|---|---|
| `stands` | — | Written as drafted |
| `answered` | The settling text verbatim with where it sits (document, row, default, source), or — **for a gap about current behaviour only** — a code anchor; checked mechanically | Discarded on *Already answered* / *Current behaviour* / *Duplicate*, tagged `cold read` |
| `irrelevant` | A §2 filter by name with that filter's evidence (a survey where the filter needs one) | Discarded on that filter, tagged `cold read` |
| `simplify` | One-sentence rewording, one decision, not longer than the draft | Adopted in `Question` only. A bundle is split and each half re-disposed |
| `extend` | A wider wording that is still one decision, and the drafted siblings it absorbs | Adopted; absorbed siblings discarded as duplicates. A standing row is never rewritten — a merge goes to the reply |

Per row it also returns **`directions`** (`ok`, or the missing option / wrong counter-case — adopted when
evidenced) and **`would_pick`** (which direction it would choose and why) — the Recommended line stays only
when this matches.

Contradictions and *Always ask* topics take only `stands`, `simplify` or `extend`. With no reader available,
rows are written with `- **Unverified:** yes` and no Recommended line.

## 7. Writing

- **Order questions by how much the answer changes `FEATURE.md`**: contradictions first, then by how many
  lines an answer decides, with money, privacy and changes to existing behaviour breaking ties. `q-NN`
  numbers are assigned in that order, at write time only (`bf.py ids --next q --count N`).
- Writing a row and pointing its marker at it are one act.
- Defaults, fixes and slots are **adopted on write** — labelled, ledgered, listed in the reply, each
  vetoable at any later run (*"drop D3"*, *"undo F2"*, *"drop S1"*). A veto restores the gap as a marker
  ending `(vetoed D3)` and records the veto in `ids.json` (`bf.py ids --veto D3`).
- **Sanity range, not a quota.** A first `init` usually writes 4–15 questions. Above `max(15, 2 × parts)`,
  re-gate the batch once (some channel leaked); never discard for count, and say so if it stays high.
- **Funnel** in the log and report: candidates → product → fix → default → slot → questions → discarded.
