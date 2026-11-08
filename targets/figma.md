# Figma target: native editable exploration

`--target figma` creates editable native Design nodes directly in Figma. It is a first-class destination, not an HTML
export/import step. Do not require HTML, CSS, browser screenshots, rasterized UI frames or a code-to-Figma import.
Raster photos/illustrations may be image fills where the brief calls for them; typography, controls, layout, swatches
and board content remain native editable objects. Follow the shared execution contract and mode depth.

## Prerequisites and ownership

Discover the connected Figma tools and read applicable Figma skills before calling their tools (especially `figma-use`,
`figma-generate-design` and `figma-create-new-file` when creating a file). Use the requested file if supplied; otherwise
create a Design file through the supported skill/tool route. Verify authorization, node read/write, screenshot and
font availability. If any necessary capability is absent, mark the Figma target **blocked**, preserve local planning
and state, and explain the missing dependency. Never silently change to HTML, standalone or flattened images.

One lead/writer owns all Figma mutations. Parallel designers return concise node/layout specifications and asset paths,
not competing canvas edits. Establish one round page, six stable named variant sections by default, a cover and
matching-screen comparisons. Write stable file/page/frame/node IDs into local `P/round-R/run-state.json` or associated
manifest immediately. On resume inspect those IDs before creating nodes; update owned nodes instead of duplicating
whole rounds. Do not overwrite unrelated user content.

## Direct canvas workflow

1. Create the destination page and pending variant frames early; share its link. Use the agreed screen dimensions
   (three product-selected screens by default), native layout frames and editable text.
2. Apply each ready direction specification via the single writer. Load required fonts before editing text; handle
   missing fonts explicitly without inventing availability. Use native vector shapes/icons and image fills only for
   real image assets. Keep direction-local styling coherent and independent; reusable components are useful when
   they help, but a full design-system build is outside scope.
3. Build the board on the same canvas: thesis, signature example, palette roles, typography on real strings, limits
   and trade-offs. Put screens alongside it and organize comparisons at a legible zoom. Publish ready draft labels
   incrementally as actual nodes exist.
4. Capture **actual Figma frame screenshots** after each variant is ready and inspect every board/screen at useful
   scale. Check clipping, font substitution, native image fills, layer ordering and identical content. Correct real
   defects, then capture affected frames again. Generated preview imagery is not evidence of the canvas state.
5. Dispatch the fresh round reviewer with screenshots, frame links/IDs, owner constraints and brief. Thorough adds
   per-variant review. Writer applies accepted substantive repairs once and verifies touched frames.
6. Inspect representative and required UI nodes via Figma read tools: text remains text and is editable, controls
   consist of frames/vectors/text, layout survives inspection, and no full-screen raster replaces the interface.
   Record node types and sample IDs plus screenshots. Account for every declared board/screen before marking final.

The canvas is the review destination, with stable frame links; screenshots are evidence, not the deliverable. Local
process files retain exact content, selection rationale, critique/repair results, `feedback.md` and `extraction.md`
for Ameriks. Handoff names any unavailable fonts, unverified frames or blocked tools. Native target support is not a
claim that the legacy HTML Workflow scripts can execute Figma; those scripts must reject it explicitly.
