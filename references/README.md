# References: what to read, and when

The skill's knowledge base, distilled from Repperoni Round 1 (2026-09-25). Rules are general; lines marked
"Example (Repperoni R1)" or "R1" are illustrations from that run, so don't copy them into another product. Screen roles
everywhere: *home* (the list screen), *core* (the main object and its data), *peak* (the moment the key number changes
state: it completes, crosses a mark or is settled; R1's Finish line). Each variant gets a peak mode, and one rule
judges it, a quiet peak included: the peak rule, method.md (screen roles). Check tags: **[S]** screenshot, **[D]** DOM
check (`dom-audit.mjs`, `check-strings.mjs` or a console probe), **[C]** code.

| File | What it is | Read it when |
| --- | --- | --- |
| [lessons.md](lessons.md) | What went wrong in past runs and the fix; timings and costs | **Lead, before starting a round** |
| [method.md](method.md) | Why the process looks as it does: screen roles and **the peak rule**, principles, groups and routes, oversupply, the diversity matrix and **the one cap list** (§6–§7), nearest pairs, the board (§10), judging, later rounds, tokens | **Lead** planning a round; **proposers and the selector** (§4–§9); presenting and next rounds (§10–§13) |
| [guidelines-template.md](guidelines-template.md) | The fill-in `design-guidelines.md`: KEEP rules, WRITE slots, the review lessons, the technical contract for both targets (template §8) | **Guidelines writer** (Foundations: Guidelines); guidelines critics check the draft against its §2 |
| [generic-tells.md](generic-tells.md) | The AI-default calibration list, the category's own default kit (§2.5), mobile-mockup and second-order tells, borrowed-trait licenses, grounding techniques, a screenshot checklist | **Guidelines writer and critics**; **domain researcher** (§2.5); **proposers** before returning candidates; **critics** (§4, §7) |
| [craft-floors.md](craft-floors.md) | Measured floors for 390 × 844 screens: targets, type, numerals and money (§4), color, contrast, icons, motion, copy, edge cases (§12), the DOM audit script (§13), reference apps (§15) | **Guidelines writer**; **builders and critics** when a number is in doubt; **domain researcher** (§15) |
| [vernaculars.md](vernaculars.md) | How to find and translate real-world visual worlds, device collisions with guardrails, a catalogue of 16, and all 18 R1 direction candidates | **Domain researcher** (Foundations: Research); **proposers** of original directions |
| [brief-template.md](brief-template.md) | The fill-in `round-N/brief.md`: content spec, per-variant fields, asset library, "must not" traps, the selector checklist (§7), mid-run supplements (§8) | **Selector** writing the brief; **the brief reviewer**; the **lead** when a source changes mid-run |
| [images.md](images.md) | Whether to use photos, the shared library, models and costs, prompts, the three image checks (§5), compression, CSS grades, mascot specs (§8) | **Whoever makes the photo library**, before the brief's §6 is final and again before generating |
| [critique-patterns.md](critique-patterns.md) | The 20 problems critics found most, the fixes that worked, per-screen and board patterns, score calibration, refining, a hand-in checklist | **Builders** before hand-in (§7); **critics** (§1, §2, §5); **refiners** (§6) |

**By phase**

| Phase and role | Read |
| --- | --- |
| Research: product, source-family lanes | lessons.md; the product's own sources (no reference file needed) |
| Research: domain lane | vernaculars.md §2–§4, generic-tells.md §2.5 (the category kit), craft-floors.md §15 |
| Guidelines: writer | guidelines-template.md (all), generic-tells.md, craft-floors.md |
| Guidelines: the critic (lenses: slop · brand · craft) | generic-tells.md · method.md §2 · craft-floors.md |
| Directions: proposers | method.md §4–§5 and §9, vernaculars.md, generic-tells.md §2 |
| Directions: selector and brief reviewer | method.md (the peak rule) and §5–§9, brief-template.md (§7 before hand-off) |
| Photo library | images.md |
| Build: builders | the product's guidelines and brief first, then critique-patterns.md §7; method.md §10 for the board |
| Build: the round critic, per-variant critics (thorough) and refiners | critique-patterns.md, generic-tells.md §7, craft-floors.md §13–§14, method.md's peak rule |
| Presenting, feedback, next round, promoting a winner | method.md §10–§13, brief-template.md §8 |

**One home per topic.** The peak rule: method.md (screen roles). Caps, and scaling them to N: method.md §6–§7. The
category's default kit: generic-tells.md §2.5. Convergence counts: method.md §5.1. Board spec: method.md §10 (the
fill-in version is guidelines-template.md template §6.2). Numeral facts per font: craft-floors.md §4.1. Image checks and
mascot specs: images.md §5 and §8. Other files summarize these and link back; when two disagree, the home wins.
