# answer — the owner delegates the questions it can safely answer

`answer` answers every `Open` question it can defend, labels each as delegated, has a second agent try to send
each one back, and stops at `Answered` — the owner can overrule any before `resolve` writes it in, and after.
`answer soft` answers only on ground 1 (the document, the sources, or the code for current behaviour). Only a
live invocation by the owner starts it ([../reference/rules.md](../reference/rules.md) §1).

## W1 — Load

SKILL.md's checks; open the entry; save the invocation; record chat answers first — the owner's words win
over anything drafted. Queue every `Open` row, **except**: a row whose `Answer & why` the owner already filled in (name it in the
reply — it is theirs, never overwritten); and a row this command left before whose `bf.py rowhash <home> q-NN`
matches the hash on its `left` line (nothing it rests on has changed) — unless the owner asks to try again.

## W2 — Triage, mechanical, no agent

Leave a row now, with its reason, when:
- a **hard limit** applies (§4);
- **it depends on another row still `Open`** (its `Depends on` field) — unless that row was answered by the
  owner in this same invocation, in which case it is drafted in a second wave after the first is recorded;
- **it arose from a delegated answer** — its `Why asked` cites a line whose provenance says *delegated*
  (*built on an answer I gave for you — yours to decide*);
- **the owner answered the same decision before** and a later row reopened it;
- **the sources disagree** on it.

For every remaining row, search `sources/` for its key terms — the edge words (*only*, *never*, *except*,
*unless*) as well as the topic words (`grep -rni`): a span that settles it, or asks for the less obvious
option, travels with the row to the drafter.

## W3 — Draft (1 drafter per 10 rows, concurrent)

Brief: [../briefs/answer-drafter.md](../briefs/answer-drafter.md), with `{{SOFT_LINE}}` set to
*"Answer only on ground 1; leave every other row."* under `soft`, otherwise empty. The drafter answers by
default — every row gets the simplest defensible answer — and returns `ANSWER` (decision, ground, evidence,
IDs it changes, the tests) or `LEAVE` (reason). The orchestrator string-matches every quote and checks every
anchor; an answer whose evidence does not match is left (*evidence not found*).

## W4 — Challenge (1 challenger per 10 drafted answers, concurrent, a different model where available)

Brief: [../briefs/answer-challenger.md](../briefs/answer-challenger.md). Each challenger sees the drafted
answers (decision, ground, evidence) and every other answer drafted in this run — never the drafter's
reasoning. Per answer: `keep` → written as drafted · `narrow` → the shorter wording is written if it is still
one decision and passes the tests, else left · `leave` with a grounded reason → left. A `leave` without a
grounded reason is not a leave: the answer is written and the doubt is reported beside it. No second round.

**No second agent available:** only ground-1 answers whose every quote matched are written, each
`- **Unverified:** yes`; the rest are left (*no second reviewer was available*), said on the reply's first line.

## W5 — Write, one row at a time

1. Re-read the row; changed since W1 → leave it (*changed while I worked*).
2. `Answer & why`: `Delegated answer (<date>, AI at the owner's request): <the decision>. Why: <the ground in
   plain words> — <the evidence in one clause>.` The opening up to the colon is fixed; `resolve`, `status` and
   `bf.py counts` read it.
3. `Status: Answered`; read back. One `answered` line: row · ground · the owner's-list class · the challenger's
   doubt if any · `bf.py hash --text` of the answer as written (a later edit by the owner is theirs).
4. Nothing else — no `FEATURE.md` change, no marker removed; `resolve` applies.

Left rows are not touched; one `left` line each with the reason and `bf.py rowhash`.

## W6 — Report and close

Reply: how many answered and on which grounds; **the owner's-list ones first** (§3), one line each —
`q-04 — <decision> (your note says …)`; the rows left and why; *"say "q-4: …" to overrule any of these, or
`resolve` to write them in."* **Standalone only:** report, snapshot, `closed` (inside `auto`, the outer run
does these).

---

## 3. What may be answered — exactly one ground, with its evidence

| Ground | Holds when | Evidence |
|---|---|---|
| **1. Settled** | The document, a source or an answered row already decides it — **entailed, not chosen**: the opposite answer would make a quoted sentence false (if it would only make it odd, this ground fails). **The code counts only for a question about current behaviour** (rules.md §4) | Verbatim quotes / anchors, checked |
| **2. Existing pattern** | The product already handles the same kind of thing one way, and following it is no worse for users than the other options | The pattern's anchor and why it is the same kind of thing |
| **3. Convention** | One dominant practice any competent team picks the same way — rules.md §4 (a)–(d) attested. A value (number, duration) counts only where teams pick the same value | The convention in one sentence and the four attestations |
| **4. Safer and smaller** | One option is no worse on each safety test and on build size, and better on one — and nothing asks for the other | What the other option would add |
| **5. Simplest for the owner** | Nothing above settles it, and one option commits the owner to the least: least to build, fewest new promises, least ongoing work, **least change to what users have today** — and no source asks for another | What each other option would add |

**When one option keeps today's behaviour and another changes it, the answer keeps it** unless the owner's
own words ask for the change (ground 1). A delegated answer never widens scope. **Grounds 2–5 are judgement;
`soft` refuses them.** A source asking for the larger option settles the row the other way (ground 1); if
that grows the build past what the feature already is, the row is the owner's.

**The owner's list — answered where a ground holds, but named first in the reply:** money · scope (in or
out) · a change to existing behaviour · final wording · what is shown to other people · what is kept and
for how long.

**Tests every answer passes** (one line each in the drafter's return; the challenger re-checks them):
- **one decision** — a single, failable choice;
- **size** — no new screen, notification, role, background job, kind of personal data or sync channel that
  the feature does not already have;
- **safety** — gives no one more access, exposes no personal data, removes no record of who did what, makes
  no irreversible act easier, destroys nothing a user made that another option keeps; a trade-off between
  these is the owner's;
- **no invention** — names no channel, vendor, count or duration that no source or product fact gives;
- **literal** — reads the document's definitions as written, not as they were "probably meant";
- **consistency** — contradicts no line, product fact, or other answer given in this run.

## 4. Hard limits — always left for the owner

- a figure (price, percentage, count, duration) no source, answer or product fact gives;
- which law or regulation applies, or what one requires;
- anything about minors' data; anything on the *Always ask* list;
- sources that disagree;
- an answer that would change or remove an existing line in `FEATURE.md` (`resolve` would flag it anyway);
- a row that depends on an open row, or arose from a delegated answer (W2).
