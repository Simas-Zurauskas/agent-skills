# Handle findings without a second workflow

## 1. Reconcile and deduplicate

Gather reviewer findings, markers, unresolved source contradictions, affected lines citing wrong facts,
owner edits and vetoes. Compare all question statuses and prior material findings; merge identical
decisions without losing evidence. Re-evaluate an old dismissal when its inputs changed. Sources that
already settle a gap are applied, not sent back to the owner for confirmation.

## 2. Close ordinary gaps

| Finding | Action |
|---|---|
| Current behavior established by code | Write/correct a B-n fact and dependent Today/CH/KEEP context. |
| Author prose contradicts evidence | Correct it with provenance (Fn if a substantive tracked fix). |
| Ordinary undecided behavior inside scope | Adopt a labelled eligible default (Dn), choosing the simplest adequate outcome. |
| Material content/asset actually owed later | A bounded slot (Sn), honoring any existing owner delegation. |
| Consequential unresolved owner decision | Question plus linked marker. |
| Already settled, duplicate, excluded, unreachable or engineering-only | Record a short grounded dismissal; a relevant engineering caution can go in Rabbit holes. |

Check sources and code before asserting absence. Verify key quotes/anchors; a string match alone does
not settle intent. For an engineering-only/irrelevant dismissal, identify the nearest requested outcome
and explain why its observable behavior is unchanged; no multi-quote survey for every harmless item.
Never dismiss a genuine source contradiction, a vetoed choice or Always ask topic on convenience.
An optional improvement that adds scope is not automatically a question or a requirement: leave it out
unless an actual requested guarantee cannot be defined without that decision (rules §4).

## 3. What earns a question

All hold: two plausible answers change an observable promise; it is a serious unknown under rules §4;
and a named requirement/keep/edge/compatibility decision stays unwritable. Source contradictions show
both quotes and need not meet the two-answer form. Split independent decisions and trim settled parts.
Never substitute code for a missing future-intent decision.

## 4. Substantive review covers the handling

No mandatory router dispatch. The required reviewer(s) check facts, default eligibility, scope,
unjustified dismissals, question relevance and answer application as part of their substantive work.
An unresolved serious finding needs an owner question or exact already-supplied owner evidence, not an
author preference. Resolve reviewer disagreement from evidence; unresolved material disagreement blocks
ready. Applying the scope test to a proposed optional safeguard is not ignoring a defect in a requested
guarantee. A correction is rechecked by affected outcome under grill §4.

## 5. Question rows

Keep the existing format:

```
### q-04 · Who may see a draft's existence?
- **Status:** Open
- **Depth:** 1
- **Touches:** FR-3, KEEP-1
- **Why asked:** <evidence, serious choice and blocked outcome>
- **Directions:** 1 — <choice and trade-off>; 2 — <alternative and trade-off>
- **Recommended:** <optional, with why; a proposal, not a decision>

**Answer & why:**
```

Add Depends on when another unanswered row really blocks it. Keep numbers stable and in order. No
recommendation for a choice the evidence cannot support. A clear owner answer is recorded first and
does not need another approval round. A question that is already settled by sources is not written.

## 6. Clarity and recommendations

The author checks neutrality, feasible alternatives and one decision per row; substantive reviewers
check the same when relevant. No separate cold-reader pass or requirement that two models prefer the
same recommendation. Uncertain recommendations remain optional proposals with their trade-offs.
If external facts must be obtained, name the missing evidence and who can provide it; never present an
unavailable answer as fact or ask the owner an unanswerable technical trivia question.

## 7. Write and preserve the gap

Allocate IDs with `bf.py ids`, write one coherent update, regenerate Open questions, and set Draft after
material changes. Remove a marker only when its gap is actually answered, defaulted, scoped out with
authority, bounded by an appropriate slot, or replaced by verified present-behavior evidence. Log that
resolution. Do not strand a marker through a dismissal. Withdrawn IDs remain tombstones. A veto is
recorded via `bf.py ids --veto`; it restores the unresolved choice, never another silent default.

Keep one concise ledger entry per Dn/Fn/Sn: decision/change, source/ground, relevant reversibility/scope
reason; keep per-run review status in the report/log. No per-item agent or certificate. Reports name material findings
and residuals; a count is not a quota of questions to manufacture or suppress.
