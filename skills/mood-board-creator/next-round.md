# Round 2 and later: converging from feedback

Round 1 goes wide. Later rounds narrow: fewer variants, deeper execution, and new questions that only the survivors
raise. The [shared execution contract](references/execution-contract.md) governs every target and mode. The machinery is the same (the same workflows, the file contract, and the prefix `rR-vNN` with R the new round
number); what changes is the brief.

## 1. Turn the feedback into decisions

Read the user's feedback against the cover's format. Write `P/round-R/feedback.md` as a table, one row per previous
variant:

| Variant | Verdict | What they said | Steal from it | Decision for this round |
| --- | --- | --- | --- | --- |

- **Kill**: drop it. Keep any named "steal" (a colour, a progress form, how a tie is set) and assign it to a
  surviving variant.
- **Push**: the idea stays and the execution changes. Write what was wrong with the execution in their words, then
  the brief change.
- **Keep**: preserve the selected direction within the existing scope. More screens, edge states, another mode or motion need an explicit owner request; keep alone does not authorize them.
- **Best of each screen** across the round: that screen becomes the reference for its type in every survivor. Write
  each reference into the guidelines as a binding row (screen · the file to open · what to take: the structure and
  the level, never the palette or medium), and have builders open it. Dream Catcher R7: Today = R6 V04's art hero +
  R1 V02's visible buttons; Capture = R6 V04's playbar; Journal = R1 V02's data rows. Every survivor met them.
- **Round-wide "never" rules from feedback** ("the moon shouldn't be the main focus of backgrounds") become a named,
  measurable rule in the guidelines (the moon only as a glyph or ≤ 6 % of an image's width) and a line in the brief's
  visual never-list. Replace parent images that break it.
- **Unmentioned variants** remain undecided; record that status and do not silently kill or promote them.

If feedback is thin, ask two or three pointed questions, e.g. "V04 or V06 for the black-and-white family?". Don't send
a questionnaire. **If the owner rejects a round without saying why** ("not very good"), ask two multiple-choice
questions before writing anything (AskUserQuestion, multi-select): *what felt most wrong* (options naming the likely
causes you can see: gimmicky / childish · not rich enough · trend skins · layouts all the same) and *which apps have
the feel they want* (3–4 families). Dream Catcher R2 → R3: the answers ("gimmicky, not rich, trend skins"; all four
families) rewrote the guidelines, and R3 produced the owner's favourites. Then rebuild the quality bar
([run.md](run.md), scouting) from the picked apps.

## 2. Shape the round

- **Use the selected survivor count.** Survivors, plus hybrids the feedback suggested ("V02's box with V10's calm"). Don't pad with new
  originals unless the user asked for fresh blood.
- **The screen set stays within requested scope.** If the owner asks to expand it, keep one previous screen as a comparison control.
- **The diversity matrix gets tighter.** The survivors may now share axes on purpose. Pick the axes still in question
  (e.g. dark vs light, which peak mode fits) and vary those deliberately.
- **Guidelines**: revise only where the feedback proved a rule wrong or missing. Log the change in the guidelines'
  change log.
- **Open questions** from the previous round's boards (each board ended with "the feedback we want") get answered or
  carried.
- **More than 6 variants is fine when the owner asks** (Dream Catcher R7: 6 survivors + 4 hybrids). Hybrids name
  their **Mix** (what each parent gives) on the board; survivors state **Keeps / Changes**.
- **Family rounds** (the owner loved one or two directions and wants them explored): one round per parent with a
  **distance ladder** (2 near: the parent perfected or in another light; 3 mid: a neighbouring idea in the same world;
  1 far), a **fence** per family (e.g. photography only vs painted media only) so families don't drift into each
  other, and an optional **blends** round. Point every builder at the parent's screens; the lab assembler has no
  control strip, so the cover links the parent's section.
- **Add a screen only when the owner requests scope expansion** (Dream Catcher R4–R7 added Evening, the ritual's
  dusk): spec it in the UX layer first (`screens.md` + strings), then size boards to N screens.
- **Survivors may copy their parent's files** into new `rR-vNN` files: rename selectors and keyframes only, never
  image paths (`check-round.py` fails a missing image).
- **Images for hybrids are made by the lead before the build**, in the parent's exact hand: copy the style prefix
  from the parent's notes, check every result (moon size, borders, stray marks, faces, text), crop or regenerate,
  compress to ≤ 250 KB, and list them in the brief's image library. Builders don't generate images.

## 3. Run it

- Foundations: skip the research lanes unless a source changed. Run `foundations.js` with `round: R`, and put the
  feedback file path in `sources` plus "carry forward V…" guidance per group. Alternatively, write the brief inline
  from `references/brief-template.md` for 3–4 variants, which is faster. Normal/thorough retain preparation review.
- Build: as before (`build.js` with `round: R`). Preserve the requested mode; suggest thorough when a fresh per-variant critique would resolve a demonstrated concern, without silently switching modes. Pass `bar.good` = the quality-bar sheet (or a
  sheet of the screens the owner named as references) and `bar.rejected` = the strip of the screen they disliked.
- **Several rounds at once** (R4–R6): one task folder, one `design-guidelines.md`, a brief and `round.json` per round,
  and one build workflow per round launched in parallel. Across all rounds keep at most three builders active, bounded by native capacity, with one publisher and the existing server untouched; if a round's critic dies (an account switch killed one with "Not logged in"), relaunch that round with
  `done: {build: [...all], critique: [...all]}` and a note that only the round critique's items remain.
- Assemble with the new `round.json`. The standalone assembler rebuilds the round tabs from the `round-*` folders; in
  a lab, add the tab and point `index.html` at the new round.

## 4. The last round: hand-off to a system

When one direction wins, write `P/round-R/extraction.md`, the seed of a design system:
- tokens (colour roles with contrast pairs, the type scale, spacing, radii, motion);
- the components the screens already imply;
- the "signature" rules;
- the owner-approved constraints and product-specific distinctions that must survive.

`references/method.md` covers what to extract and why. In a Design Lab this is where `theme.css` gets its values.
Keep `extraction.md` and every round's `feedback.md` durably in the repo (commit only when requested) that holds the design system: they are the
only record of why this direction won.
