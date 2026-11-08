# Shared execution contract

This is the common lifecycle for native Codex/Claude dispatch and the optional legacy Workflow scripts. Product and
owner constraints outrank the brief, which outranks critic preference. Applicable target contracts govern mechanics.
[Design diagnostics](design-diagnostics.md) governs aesthetic judgments, including older reference examples.

## Scope and defaults

Use the actual product workspace, not whichever directory launched the skill. Read relevant source material and
record the sources, assumptions, locale and image policy in `PLAN.md`. With no sources, draft a short product brief;
ask about consequential ambiguity and continue independent work. Default to six boards and three screens selected
from the product's meaningful flow. Use `--count N` when supplied; it changes direction count, not the screen count.
The same content and required blocks appear in every variant. Preserve unknown, empty or error states only where the
chosen screens or owner scope call for them; do not silently expand a visual exploration into an app build.

Process files live outside shipped output: a lab's `process/`, a standalone sibling `<output>-process/`, or a local
product process folder for Figma. Keep `PLAN.md`, `PROGRESS.md`, round brief, content strings, evidence, feedback and
final extraction locally. Write only inside authorized output/process/scratch paths and scoped lab installation.
Do not edit global skills, product implementation or unrelated user files. No commits unless requested.

## Modes and evidence

| Stage | normal / speed | thorough |
| --- | --- | --- |
| Research | Product/source/domain research, scoped to decisions | Same as normal |
| Guidelines | Product guidelines, independent prep review, revision | Same as normal |
| Proposals | Oversupply by group/lens | Same as normal |
| Direction review | Independent preparation review | Same as normal |
| Builds | Configured effort and quality bar | Same |
| Rendered self-check | Required | Required |
| Fresh round critic | Required | Required |
| Per-variant critic | None | Required |
| Repairs | Substantive findings only, verify touched output | Same |

Preserve configured model and reasoning. Selection respects explicit group quotas. Never fabricate an unavailable source or screenshot.

## Agent ownership and progress

Use native agent spawn/send/wait/close primitives when available; no new orchestration service is required. The lead
keeps at most three builders active, and fewer if the harness has fewer free slots. Queue the rest. Builders own only
their variant files or Figma specification; **one publisher owns all shared pages, assets, manifest/state and canvas
writes**. The lead may also be that publisher. Research agents must request any local preview service from the lead.

Create the destination page/frame before building, with declared slots and truthful pending labels. Publish each
ready draft while the next builders continue. For HTML pass the currently ready IDs to `--draft --ready`; files from active builders stay pending. Preserve stable slot order; mark reviewed only after real evidence.
Shared publication is serialized, including final assembly. A critic reads rendered output and writes critique
notes; it does not become a second publisher. Give every fresh reviewer only the product brief, owner constraints,
selected directions, exact content, target links/screenshots and verification results. Dispatch with fresh context
(e.g. `fork_turns="none"`), record actual model/route, and never claim different-model assurance unless true.

Do not stop, replace or restart the user's server. Check what a port serves before using it. Only the lead may start
and clean up a scratch server it owns, on an available port and fresh cache; builders report preview failures.
Preserve live servers, shared installation and unrelated changes. Use the target's capture/check tools and batch
screenshots where possible; a mechanical pass does not replace looking at the actual rendered work.

## Repair and completion

Builders inspect every screen and board after first render, repair actual defects, and capture changed screens.
Reuse unchanged screenshots and mechanical check results when the lead can tie them to current source, assets and viewport and they cover the view being judged. Fresh reviewers inspect that evidence independently; builder conclusions are not their verdict. Capture/check missing, changed or uncertain views, including screens affected by shared asset/style changes. Do not require two identical captures after a clean pass. The fresh round critic compares full-size screens, boards
and matching screens across the round; check same content, fit, coherence, useful differentiation and product fit.
Wire visible navigation to known in-scope screens; unknown destinations remain clearly noninteractive placeholders, not invented pages. Check the visible outcome of implemented prototype controls, including filtering, rather than relying only on changed attributes. Preserve explicitly excluded backend behavior.
A finding must name the evidence, affected variant/screen, consequence, severity and minimal repair. Preference-only
suggestions are optional, never completion gates. Explicit constraints can justify shared axes or quiet palettes.

Run one targeted repair pass for substantive findings and verify those changes. Recheck untouched shared output only
when an edit can affect it. If substantive problems remain, mark them unresolved or blocked and describe the next
bounded action; do not loop indefinitely, lower the bar, or claim completion. Missing builder, screenshot or reviewer
results are incomplete evidence, never an implicit pass. Re-dispatch a failed required reviewer with a fresh packet
or report the gap.

On resume inspect artifacts, fingerprints, previous agent status and evidence; reconcile before trusting a `done`
flag. A built file is not proof of screenshot inspection or independent review. Save durable paths and node IDs in
run state, not credentials. The minimal helper is optional bookkeeping, not a daemon or substitute for evidence.

Builder/refiner `known_issues` means unresolved material defects or missing evidence required from that role. Keep
authorized prototype limitations and pending later-stage notices visible in summary/notes instead. If historical
returns mix these, the lead may reconcile each exact note against current requirements and completed checks, retaining
the original return and the disposition/evidence. Never automatically clear a warning, edit the raw result to green,
or treat a missing requirement as a harmless limitation. Strict final verification still applies.
