---
name: mood-board-creator
description: 'Explore distinct visual directions for a product as moodboards and realistic screens. Use for moodboards, visual directions, style tiles, art direction, design variants, or a next round from keep/push/kill feedback. Supports normal and thorough modes and lab, standalone or native editable Figma targets. Not production implementation or a design-system build.'
---

# mood-board-creator

Create a round the owner can compare: **six directions, three product-selected screens each**, identical content,
realistic UI, a board explaining each direction, and a shared comparison view. Default mode is **normal**.
Read [the shared contract](references/execution-contract.md) and [run.md](run.md), then only the references your role
needs. Apply product and owner constraints before design preferences. The skill authorizes bounded multi-agent work.

## Route the request

`mood-board-creator [normal|thorough|speed] [--target design-lab|standalone|figma] [--count N]`

- **normal**: research and guidelines, preparation reviews, proposals and selection, serious builds, rendered
  self-checks, one independent round critic, targeted repairs and verification.
- **thorough**: normal plus a fresh per-variant critique. `speed` remains an alias for normal.
- **next**: read [next-round.md](next-round.md); unspecified feedback stays undecided. **resume**: reconcile files,
  evidence and run state before dispatch; preserve completed work. Existing Workflow args remain supported.

Explicit target wins (`lab` remains an alias for `design-lab`). Otherwise use an unambiguous existing Design Lab in the product workspace; use a standalone
folder at `<product-workspace>/moodboards/` for other requests. Figma is an explicit, first-class native editable
canvas target; it does not require HTML or a raster UI export. Read exactly the chosen target guide:
[lab](targets/design-lab.md), [standalone](targets/standalone.md), [figma](targets/figma.md).

The three screens come from the product's most useful comparison flow, not a required home/list/hero/peak formula.
Keep requested counts, screens, modes and destinations. Ask only for missing information that materially changes the
result; infer routine details and state assumptions. Do not invent owner approval or turn silence into feedback.

`lite` was evaluated but is not released in v8: the operational comparison failed a required-input behavior check. Explain this limit if requested; do not silently switch modes or run the held experiment.

## Execution and handoff

Prefer the current harness's native agents, progress and lifecycle (Codex or Claude). At most three builders run at
once, further bounded by available slots; one lead publishes shared output. Create the destination early and publish
each ready variant as a draft. Reviewers receive an explicit evidence packet with fresh context, not a history fork.
The legacy Workflow scripts are an optional compatible route: [workflows/README.md](workflows/README.md).

No global style bans or compulsory aesthetic scores: [design diagnostics](references/design-diagnostics.md) governs
all style references. Preserve content, useful product structure, ordinary usability and meaningful visual variety.
Report the destination link, variant bets, verification evidence, remaining issues and the actual review coverage.
Draft, blocked or incomplete work must never be presented as a completed round. Keep local `feedback.md` and
`extraction.md` for later Ameriks use. No commit, publication to a public host or production implementation is implied.
