# answer — the owner delegates the questions it can safely answer

`answer` answers every `Open` question it can defend, labels each as delegated, has a second agent try to
send each one back, and stops at `Answered` so the owner can overrule it before `resolve` writes it in.
`answer soft` answers only what the document, the sources or the code already settle (ground 1). Only a
live invocation by the owner starts it (rules.md §1). Read [../reference/rules.md](../reference/rules.md).

## W1 — Load

SKILL.md's five checks; open the entry; record chat answers first (they win over anything drafted). Queue
every `Open` row. Freeze one brief folder: `FEATURE.md`, `baseline.md`, `questions.md`, the defaults
ledger, `sources/INDEX.md`.

## W2 — Triage, mechanical

Leave a row now, with its reason, when:
- **a hard limit** applies (§4);
- it depends on another open row (answer that one first — order the queue);
- **the sources disagree** on it;
- for each remaining row, search `sources/` for its key terms (`grep -rni`, the edge words as well as
  the topic word): a span that settles it or asks for the less obvious option is attached to the row as
  evidence for the drafter.

## W3 — Draft (1 drafter per 10 rows, concurrent)

Brief: [../briefs/answer-drafter.md](../briefs/answer-drafter.md). The drafter answers by default —
every row gets the simplest defensible answer — and returns per row either `ANSWER` (decision, ground,
evidence, the IDs it changes, one line each for the size, safety and consistency tests) or `LEAVE`
(reason). The orchestrator string-matches every quote and checks every anchor; an answer whose evidence
does not match is left (*evidence not found*).

## W4 — Challenge (1 challenger per 10 drafted answers, concurrent, a different model where available)

Brief: [../briefs/answer-challenger.md](../briefs/answer-challenger.md). Each challenger sees the drafted
answers (decision, ground, evidence) and **every other answer drafted in this run**, never the drafter's
reasoning. Per answer: `keep` · `narrow` (a shorter rewording, still one decision) · `leave` with a
grounded reason (a hard limit, a quoted contradiction, a dependency, missing evidence, a failed test). A
`leave` without a grounded reason is not a leave: the answer is written and the doubt is reported beside
it. No second round, no third agent.

**No second agent available:** only ground-1 answers whose every quote matched are written, each
`unverified`; everything else is left (*no second reviewer was available*), said on the reply's first line.

## W5 — Write, one row at a time

1. Re-read the row. Changed since W1 (status, wording, answer field)? Leave it, report *changed while I
   worked*.
2. `Answer & why`: `Delegated answer (<date>, AI at the owner's request): <the decision>. Why: <the ground
   in plain words> — <the evidence in one clause>.` The opening up to the colon is fixed; `resolve` and
   `status` read it.
3. `Status: Answered`. Read both back. One `answered` line: row · ground · class from the owner's list ·
   the challenger's doubt if any · sha256-12 of the answer as written (so a later edit by the owner is
   theirs).
4. Nothing else is written — no `FEATURE.md` change, no marker removed. `resolve` applies.

Left rows: untouched; one `left` line each with the reason.

## W6 — Report and close

Reply: how many answered and on which grounds; **the ones on the owner's list first** (§3), each one
line — `q-04 — <decision> (your own note says…)`; the rows left and why; *"say "q-4: …" to overrule any
of these, or `resolve` to write them in."* Report, `closed`.

---

## 3. What may be answered — exactly one ground, with its evidence

| Ground | Holds when | Evidence |
|---|---|---|
| **1. Settled** | The document, a source, an answered row or **the code** already decides it — the opposite answer would make a quoted sentence false or contradict a verified product fact | Verbatim quotes / anchors, checked |
| **2. Existing pattern** | The product already handles the same kind of thing one way, and the question's option that follows it is not worse for users than the others | The pattern's anchor (`B-n` or code) and why it is the same kind of thing |
| **3. Convention** | One dominant practice any competent team picks the same way — rules.md §4 (a)–(d) attested. A value (number, duration) counts only where teams pick the same value | The convention in one sentence + the four attestations |
| **4. Safer and smaller** | One option is no worse on each of: personal data exposed, access given, anything a user made destroyed, promises already made, how much there is to build — and better on one — and nothing asks for the other | What the other option would add |
| **5. Simplest for the owner** | No ground above settles it, and one option commits the owner to the least: least to build, fewest new promises, least ongoing work, **least change to what users have today** — and no source asks for another | What each other option would add |

**When an option keeps today's behaviour and another changes it, the answer keeps it** unless the
owner's own words ask for the change (ground 1). A delegated answer never widens scope.

**Grounds 2–5 are judgement; `soft` refuses them.** A source asking for the larger option settles the
row the other way (ground 1), and if that grows the build past what the feature already is, the row is
the owner's.

**The owner's list — answered where a ground holds, but named first in the reply:** money · scope (in
or out) · any change to existing behaviour · final wording · what is shown to other people · what is
kept and for how long.

## 4. Hard limits — always left for the owner

- a figure (price, percentage, count, duration) no source, answer or product fact gives;
- which law or regulation applies, or what one requires;
- anything about minors' data; any topic on the project's always-ask list;
- a contradiction between sources;
- an answer that would replace text the owner wrote or decided;
- a row that depends on another row still open.
