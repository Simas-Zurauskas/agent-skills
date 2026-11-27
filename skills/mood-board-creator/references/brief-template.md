# Shared brief and direction cards

Use one content specification for every direction. See [execution-contract.md](execution-contract.md) for modes and
[design-diagnostics.md](design-diagnostics.md) for style judgments.

```markdown
# Round N: <count> directions for <Product>

## Comparison and scope
Mode, target, output link/path, count and product-selected screens. The decision this round supports. Owner/product
constraints and assumptions, source paths, actual reference screenshots. Exact content outranks design preferences.

## Shared content and flow
Per-screen required blocks, exact strings/data, required controls and flow. Required vs optional content. Above-fold
requirements only where the product needs them. Required strings also in strings.json (screen number -> strings).
Do not invent features, remove blocks or vary copy to make one direction look better.

## Selection
Candidates selected/cut and a short reason. Meaningful visual axes per direction; closest pairs and their actual
separation. Respect requested group quotas and shared constraints. No automatic saturation, font or device caps.

## Direction cards
### V01 · <Name>
Thesis and product truth; source/logic; signature and where it appears; palette roles; type/actual fonts; screen
composition and meaningful axes; asset needs; trade-offs and risks. Enough detail to build without turning a short
card into a full implementation spec. Sketch where it resolves a real ambiguity. Repeat for each declared variant.

## Assets, mechanics and evidence
Shared image files/provenance, selected target guide, named ownership, screenshot/check paths. One lead publishes
shared output and owns run-state. Builders inspect actual renders. Record unresolved source/tool gaps.
```

Include enough detail to build the selected direction. Check nearest pairs, actual longest content,
font availability and relevant contrast/layout constraints before dispatch. Palette-sheet output is a diagnostic,
never a forced saturation gate. A board states the bet, shows the signature on real content, palette roles, type,
trade-offs and useful feedback questions; it must describe what the screens really show.

If a source or owner decision changes while builders run, write a named supplement listing affected variants,
superseded fields and rationale. Preserve the original brief. Pause only affected work. Keep exact comparison content
unless the owner explicitly changes it for the entire round. Critique cannot silently replace source constraints.
