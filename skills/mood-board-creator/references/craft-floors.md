# Craft checks for the actual product

Select relevant checks from the agreed platform, screens and owner scope. [Design diagnostics](design-diagnostics.md)
governs aesthetic judgment; [execution-contract.md](execution-contract.md) governs evidence and repairs. No universal
phone canvas, type pairing, hero, surface count, peak choreography or target-size formula applies to every product.

| Area | What to verify | Evidence |
| --- | --- | --- |
| Canvas and chrome | Same agreed dimensions across variants; actual product navigation. Mobile templates default to 390×844 for compatibility; desktop uses its declared viewport and desktop chrome. | True-size screenshots and target config |
| Content and flow | Identical required strings/data/blocks, useful controls and agreed links. No dropped content to improve a composition. | Content check plus visual review |
| Fit and scrolling | No unintended overflow/truncation; meaningful scroll content reachable; pinned actions do not cover the final row. | Top/scrolled captures and DOM bounds |
| Controls | Usable pointer/touch targets for this platform, no overlapping hit areas, clear labels and state. Do not force mobile 44px targets onto every desktop control. | Viewport-aware DOM audit and inspection |
| Typography | Approved faces actually load, real glyphs fit, hierarchy remains readable. One system face may be correct; external font links are optional. | Font checks, longest strings and actual renders |
| Numerals | Align figures where comparison needs it; test actual font support rather than assuming tabular-nums works. Preserve signs, decimals and currency. | Measured widths and real data |
| Color | Readable relationships and relevant contrast; no forced saturation or neutral quotas. Color alone should not obscure required state meaning. | Computed diagnostics and rendered inspection |
| Icons/images | Real assets load at adequate quality, icons exist, image implications match product rules; no invented verification or competition metaphor. | Asset checks and rendered evidence |
| Board | Thesis, palette/type and signature claims match screens; useful trade-offs, readable layout. | Board and screen comparison |
| Motion | Only where requested/applicable; inspect intended settled frame and preserve existing requirements. No compulsory motion, reduced-motion expansion or peak formula. | Relevant state captures only |
| Figma | Required text/controls/layout are native editable nodes; no flattened full-screen raster substitute. | Actual frame screenshots and node inspection |

DOM/capture tools have defaults. For desktop, use the declared viewport through page-shot and shared exported
verification/content/audit checks or an available host adapter; never infer desktop correctness from a 390px capture.
Tool success is evidence for the checks it ran, not visual approval or complete accessibility conformance.

Relevant historical measurements, mobile platform examples, font numeral tables and reference app notes remain in
[craft-floors-v7.md](history/craft-floors-v7.md). Read only a section that resolves a concrete question. Those historical
platform values and product-specific restrictions are not current blanket instructions; verify changing platform
facts when the task requires them.
