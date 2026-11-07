# Substantive review — coverage, timing and bounds

## 1. Size and time the review

Inspect blast radius before choosing a tier; requirement count is not a risk measure.

| Tier | Required independent coverage |
|---|---|
| Small | One combined reviewer covers intent, scope, baseline facts, buildability and preservation. Local reversible behavior, known narrow effects, no material access/data/financial/compatibility hazard. |
| Ordinary / elevated | Two fresh reviewers: builder/current-product plus adversary/intent/risk. Use for interacting surfaces, lifecycle, permissions, durable data, money or release-contract hazards. A supplied owner decision does not eliminate its implementation risk. |
| Broad | Retain those complementary checks. Split read-only mapping where discovery genuinely benefits, and add a focused specialist only for an identified hazard not adequately covered. No fixed maximum based on FR count. |

Choose the tier once and revisit if scope/risk changes. Before multiple dispatches, state count and
distinct purpose. Use [review brief](../briefs/review.md) for substantive checks, optionally
[cartographer](../briefs/cartographer.md) for non-overlapping mapping. Roles are coverage, not extra
command stages. All roles check scope/default eligibility and factual evidence in their assigned area.

Apply all supplied owner material first. If serious unresolved decisions prevent a settled definition,
write their rows/markers and defer exhaustive review until answered. Still inspect enough product to
ask sound questions. On an explicit `questions` request, review useful remaining gaps now; do not spend
agents re-proving an already known blocker. `init soft` stops before independent review.

For a chained invocation, consolidate material/answers and review once at the final useful boundary.
Do not review once for add, again for resolve and again for ready against unchanged behavior. A settled
standalone init gets the appropriate substantive coverage; a later unchanged ready can reuse it.

Full = the entire feature and relevant neighbours. Delta = changed outcomes plus dependent requirements,
shared records/actors/contracts and relevant neighbouring consumers, not merely edited sentences.
`questions full` explicitly requests fresh full scrutiny. For narrow deltas give the complete current
FEATURE/baseline and exact relevant source spans; include definitions, exclusions and unsettled decisions
needed to judge them. Sources remain accessible; do not hide contrary evidence or load every old report.

## 2. Coverage lenses

Each role works the relevant lenses without needing one agent per lens.

**Start from evidence, then compare the draft.** In a fresh review, first read the raw owner material,
applicable project constraints and relevant current-product evidence for the assigned scope. Before
opening the candidate FEATURE, question/default text or author explanations, state a compact set of
source-supported actors, actions, affected records, authority and observable outcomes in the review
messages. Include consequential behavior that must be preserved. These expectations can reveal a
requested operation missing from the draft entirely; do not derive them only from its FR list.
Then open the candidate and compare it with those expectations and the evidence. Keep the expectations
in the existing return's coverage; no new project document or reviewer is required. Delta reviews and
rechecks use their affected scope, not a new whole-product inventory. Unchanged adequate coverage still
uses §4's reuse rules. Missing raw evidence is uncovered scope, never invented intent.

**Try a harmful implementation that still satisfies the words.** For consequential outcomes, describe
a reachable sequence and its observable result, then identify the exact requirement or global rule
that forbids the harm. If none does, handle the concrete gap through the existing dispositions. Check
both reads and actions on the affected records and distinguish confirmed, failed and unconfirmed
outcomes of operations already in scope. A global rule can settle several features without copies.
This is reasoning about behavior, not code generation, implementation planning or an exhaustive fault
matrix; no new operation or compulsory owner question follows from the exercise.

For example, an existing save operation reporting success after failure needs truthful outcome feedback;
it does not automatically need offline autosave or cross-session unsaved drafts. A shared rule already
covering all views defeats duplicate visibility findings, while a read restriction alone does not settle
mutation authority. An unresolved access expansion follows the serious-decision rules; ordinary
feedback uses an eligible default when justified, without treating either as an owner fact.

Apply the existing lenses:

1. **Builder:** can each FR/CH/KEEP be placed in this product and checked? List missing observable product
   decisions. Ordinary file layout, libraries, mechanisms and test tooling are engineering choices.
2. **Intent and scope:** every promise is sourced or an eligible labelled default; no limits dropped,
   serious policy invented or optional improvement promoted to a requirement. Apply rules §4's scope test.
3. **Existing-product collisions:** trace other readers AND writers of touched records/surfaces beyond
   the initial baseline. Shared queries/serializers, combined writes, automation and import paths can
   change unrelated data or expose private state. Every affected surface gets a CH/KEEP. Check actual
   configured patterns, not only a happy-path fixture or a function's name.
4. **Lifecycle and compatibility:** existing data, roles, supported client/server combinations, deletion,
   reversal and release constraints where reachable. Preserve explicit omission/default promises across
   the product's actual entry points and clients; no invented universal support matrix.
5. **Coherence:** walk each actor's requested task end to end, including discovery, empty/error states,
   change of mind and removal where relevant. Every consumed value/state has a source and a reachable
   path. Two plausible observable readings reveal a decision; do not manufacture a larger feature to
   close an engineering choice.

## 3. Relevant sweeps and findings

Check permissions/visibility, actual notifications, data lifecycle, platforms, supplied content,
abuse, mistakes/undo, time boundaries, release reversal and multiplied costs only where the feature has
the thing concerned. Honor Never raise. Real retention/deletion or shared-record permissions are not
generic checklist noise. Evidence of a missing requested guarantee cannot be discarded for cost.

A useful finding names an observable defect/decision, evidence, reachable consequence and requested
promise affected. The author verifies evidence and handles it through [dispositions](dispositions.md).
A missing engineering parser/test is not a reason to turn this skill into implementation certification.
Record a relevant implementation caution without prescribing every invalid payload in FEATURE.md.

## 4. Corrections, reuse and readiness

Default: one consolidated correction batch, then a fresh targeted recheck of changed outcomes and
dependencies by the appropriate role(s). Give the final artifacts and raw evidence, not earlier verdicts
or a suggested answer. Recheck the actual outcome and adjacent effects, not just whether text was edited.
No additional full grill merely because a fix/default was written. If material defects remain after the
bound, leave Draft with exact residuals. Explicit extra rounds authorize more work, not invented cycles.
Material scope/baseline changes or a new hazard require adequate broader coverage.

Keep one compact Checks table in the run report: role/scope, actual route/reported model, verdict,
brief/return paths and input evidence. Reuse only coverage that remains adequate and whose inputs are
confirmed unchanged. Record content hashes for governing feature/baseline/questions/defaults/source
artifacts, applicable guides/skill policy and reviewed source; capture each repo's HEAD and the content
of staged/unstaged diffs and nonignored untracked files (including names). Hash ignored files only if
used as evidence. Use existing hash/git tools; no receipt database or per-finding certificates.

Only the FEATURE status line may be ignored when comparing review inputs; readiness stamping must not
invalidate itself. Log/report/snapshot additions are not product changes. HEAD or status filenames
alone do not prove freshness: dirty bytes can change in place. New readers/writers matter even when an
anchor's snippet survives. An unchanged frozen input set within the current invocation can be reused
directly. Across runs, inspect the compact report and snapshots; absent adequate input evidence, review
the affected area instead of assuming validity. An unrelated change needs a documented applicability
check, not automatic full re-review or silently updating the old hash.

Clearing an unverified tag after actual matching clean coverage or updating a legacy review-status
annotation is metadata-only: record the exact applicability/diff and new input evidence, not another
substantive review. This never clears an owner decision or changes a promise under a metadata label.

A clean result must cover the FINAL governing inputs. If a recheck causes another material correction,
that correction still needs coverage; a budget never makes it clean. No missing reviews, open serious
decisions, unsupported claims or relevant stale facts at ready. A missing/unknown release ref alone does
not establish a defect. Mechanical lint success is necessary, not sufficient.

## 5. Returns

The [brief](../briefs/review.md) returns coverage and evidence-backed findings. Empty findings can be a
valid success, not proof of universal completeness. Missing required coverage or incomplete/malformed
returns remain unverified. Named specialist focus supplements the whole-feature roles; never replace
integration/coherence review with isolated sections that nobody reconciles.
