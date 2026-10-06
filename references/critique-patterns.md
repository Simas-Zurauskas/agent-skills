# Critique patterns: what critics caught, and what fixed it

Distilled from one full round (Repperoni Round 1, 2026-09-25). There were ten divergent directions. Each was built,
then reviewed by a fresh-eyes critic working only from screenshots, a DOM audit and the code, then refined by its
builder. Every problem below turned up in at least three variants, and nearly every fix was applied and re-measured.
Use this file in two ways. Builders run §7 before handing in (after the guidelines' own self-critique checklist), so the critic can spend the pass on the idea instead of on
defects. Critics use §2 as the places to look first, and §5 to calibrate their scores.

**Terms used in the examples.** Repperoni is a private scoreboard for friends' challenges.

| Generic term (the guidelines' screen role) | In Repperoni R1 |
| --- | --- |
| List screen (*home*) | "Home": four "Needs you" rows (one is **Your turn**, the act-now item), then a Recent feed of logs with emoji reaction chips |
| Core data screen (*core*) | The challenge "room": the viewer's count **1,690** (the hero), crew progress 9,980 / 10,000 with "20 to go", and standings for 7 people |
| Peak screen (*peak*: the key number changes state) | The "Finish line": **10,000** reached, "The crew did it.", two facts, one button |
| Sensitive item | Christopher's disputed 1,000-rep log, which carries a skeptical 💀 reaction that the viewer (Sam) left |

## Contents

1. How the critics looked · 2. Recurring problems, ranked by frequency (20, each with the fix that worked) ·
3. Per-screen patterns · 4. Board (style tile) patterns · 5. Score calibration · 6. Refining from a critique ·
7. Before you hand in: the checklist

## 1. How the critics looked

These patterns only show up with the right evidence, so collect all of it before judging. Each row below caught a real
defect in R1 that the other rows missed.

| Evidence | Settings | What only it caught |
| --- | --- | --- |
| Phone shots, top and scrolled | 390 × 844 at DPR 2, lab chrome hidden; long screens also at 1–2 mid-scroll points | Density, what is in the first frame, stock rows below the fold |
| Peak screen with reduced motion forced | `prefers-reduced-motion: reduce` | Wit that exists only in motion; dead space that animation had hidden |
| Motion frames | 0 / 200 / 450 / 650 / 1,000 ms, or 0.1× playback | Seams, "curtain" wipes, elements sitting offset mid-animation |
| Grayscale squint | Blurred and desaturated | Winners that win on hue alone |
| 120 px thumbnails of all variants side by side | Color and grayscale | Whether a variant can be picked out, and which frame people will remember |
| Zoomed crops of heroes and number columns | At true size | Slashed zeros, a stencil "4" that reads as "4·0", loose commas, ragged figure edges |
| DOM checks | `dom-audit.mjs`: rects of every link and control, overlaps, computed font sizes, contrast pairs. `check-strings.mjs`: required strings present. By hand in the console: `innerText`, a search for U+00B7 | Overlapping hit areas, 41 px inline links, run-together strings, extra accessible names |
| Pixel measurements from the @2x shot | Ink edges; average RGB of photos | A hero 11 px short of the measure; a "cool" grade that measured warm |
| The round page at 1,600 px wide | Every variant's phones in context | A still capture catching an animation before its final state |
| The target's checker, `verify-screens.mjs` | Files, scope, titles, flow links; page load, icons, images, overflow, fonts, console errors | Contract breaks. A link checker reads accessible names, so it passes strings that render wrongly |

**The critique format that worked** (all ten used it): scores 1–10 on fidelity, craft, originality, content and board →
a verdict naming the 3–4 things holding the variant back → fidelity, craft, generic tells, content, board, technical →
**must-fix, ranked, each naming the selector and the exact change** → **push further** (two ways to make the signature
harder without adding accessories) → **remove one**. Naming selector and value is what made refines fast: builders
applied 8–10 must-fixes per variant in one pass.

## 2. Recurring problems, ranked by frequency

"Hit" counts the variants (out of 10) whose first critique flagged the problem.

| # | Problem | Hit | Fix that worked |
| --- | --- | --- | --- |
| 1 | Progress reads as a stock glyph (battery, stepper, stories bar, checkbox), or misstates how full it is | 8 | Draw the unfinished end inside the same object; nothing else in the bar differs |
| 2 | The density the brief asked for isn't delivered; the list screen's first frame has no feed | 8 | Merge lines, put lone controls on existing lines, set a first-frame target |
| 3 | The signature is diluted: its mark or meaning color is reused by chrome, or spent where it means nothing | 8 | One job per mark; show the selected tab by weight; remove the repeat |
| 4 | Board trade-offs are thin, or miss the direction's own biggest cost | 8 | 4–5 costs, each saying where it bites, including the signature's build cost |
| 5 | The squint target loses, or wins on hue alone | 7 | Win on size and weight in grayscale; quiet the competitors |
| 6 | The peak's still frame doesn't resolve the number or escalate in its assigned mode; dead zones | 7 | Compose the reduced-motion frame first; hold the still to the peak rule ([method.md](method.md)) |
| 7 | Numeral glyph and alignment defects | 7 | Test the real glyphs at real sizes; `tnum` on digits only; tighten display commas |
| 8 | The viewer's highlight makes a sensitive item the loudest mark | 7 | A quieter "yours": outline or neutral fill plus weight, never a dark or accent fill |
| 9 | The board claims things the screens don't show | 7 | Check every board sentence against a final screenshot |
| 10 | The list screen is the wireframe or a UI kit in a new palette | 7 | The signature reaches the list through its structure |
| 11 | Board blocks are out of order, or there's an extra "principles" block | 6 | Keep the fixed order; fold principles into the signature caption |
| 12 | Rendered strings drift from the spec | 6 | Real spaces between spans; check both `innerText` and the pixels |
| 13 | Muted or decorative color fails on a second ground, or is misreported | 6 | Redefine tokens per ground; recompute every pair |
| 14 | Motion defects | 5 | Rest state outside the media query; transform and opacity only; cut motion nobody judges |
| 15 | The status bar and chrome clash with the design | 5 | Draw chrome in the direction's own system |
| 16 | The photo grade isn't the stated grade; a generated photo misses the brief | 5 | Measure RGB; run the realism and diversity check; state failures as costs |
| 17 | Hit areas overlap or are under 44 pt | 4 | Full-height link lines; no negative margins |
| 18 | Icon strokes and sizes are inconsistent; small icons break up | 4 | One stroke per surface; a size ladder |
| 19 | The notes claim measurements that aren't true | 4 | Measure first, then write |
| 20 | Spacing is off the declared scale, or no scale is declared | 3 | Declare the scale and snap to it |

### 2.1 Progress reads as a stock glyph (V01, V02, V04, V05, V06, V08, V09, V10)

A near-complete bar is solved in every UI kit, and even the floor rule "an unfinished end of at least 8 px" hardens
into a template: before review, 7 of the 10 briefs drew a thin bar ending in a 10–12 px outlined stub. A separate small
box at the end reads as a battery; ten equal pills read as a stories bar; a color change before the end reads as a state.
- Draw the unfinished end **inside the same outline**, as the last stretch left open, never as a separate cap. Example
  (Repperoni R1): V09 drew one continuous outline and stopped the hatch 12 px short; V01 removed a 3 px gap and drew the
  last 16 px of the same line open. Both lost the battery read. Don't set the bar under the status bar's battery icon.
- **Only the unfinished end differs.** V10's rope turned yellow for its last 9 of 44 floats: in grayscale it read 80 %
  full, and "20 to go" under the yellow run read as "yellow = what's left". Removing the run fixed it.
- **The fill means the count on every screen.** V04's room showed white rising into black while its celebration showed
  black growing; flipping the room made one story. **The units echo the signature:** V05's pills became tiny portrait
  "screens" (22 × 44, r5), the tenth switched off, and the celebration switches it on at full size.
- Keep the end visible at arm's length: V08 kept its bar 10 px tall rather than 4.6, because at 5–6 px the open slot
  vanished. The forms critics praised make "unfinished" a missing unit: V07's 40-cell row (250 reps a cell; the viewer's
  own 40 lights the last one) and V03's tally gates, though V03's missing slash was first drawn too small to read.

### 2.2 Density not delivered (V02, V03, V04, V05, V06, V07, V09, V10)

"Packed" came out roomy because 44 pt targets stack: a feed row with title, name and reaction lines runs 130–140 px,
and a row with no reactions spends a whole 44 px line on one add icon.
- Set a first-frame target and check it: "the first feed item shows in the list screen's first frame". V02 cut Home
  from 1,973 to 1,776 px of scroll and its first log moved above the fold.
- Put lone controls on existing lines: Add a reaction at the end of the name row (V02), the time onto the reaction line
  (V05, V10; V05's rows went from ~140 to 132 px). Render optional lines only when they have content. Put a row's
  state on its title line instead of stacking title, state, meta and status (V03's rows were 118–138 px).
- Cut padding and margins; never overlap hit areas to win height (§2.11–2.20). V09: padding 10/12 → 6/8, section margin
  44 → 28, rows 64 → 54, targets still 44. If targets make the density impossible, say so on the board (V07).

### 2.3 The signature is diluted (V01, V03, V04, V05, V07, V08, V09, V10)

The more often a mark appears, the less it means. The critic's "remove one" pick was usually a repeat of the signature
in a place where it meant nothing.
- **Selected-tab indicators were the most common leak:** a white top border read as a notch cut from the bar, echoing
  the progress notch (V04); a Material-style nub became a second lit fill under a "one lit fill" rule (V05); a
  hand-drawn underline repeated the act-now mark (V09); a yellow pill repeated the act-now pill (V10). Fix every time:
  weight and a heavier icon stroke, plus a plain underline if needed; never the signature mark or a meaning color.
- **Spending the peak's mark early** (a grand-total double rule under a non-total, V03), or **repeating the
  device where nothing needs it:** leader rules ending in words, not numbers (V01's new rule: "a leader
  always ends in a number"); double-height section heads on a grid where height means importance (V07); rope dividers
  on dry deck (V10); rules between rows that space already separated (V08); a blurred grease ring in a flat two-ink
  print (V02); a moon icon beside words that already said the state (V04); icon tiles leading rows (V06); a gray footer
  band under the celebration's button, which turned it into a form (V09).
- Test: list every place the signature device and each meaning color appear. Each should mean one thing.

### 2.4 Board trade-offs are thin (V01, V03, V04, V05, V07, V08, V09, V10)

Three lines of costs read as modesty, not analysis. Critics wanted 4–5, each saying where it bites, and above all:
- **The signature's own build cost.** V04: `mix-blend-mode: difference` needs React Native's New Architecture or two
  clipped copies of the number, and breaks under any new stacking context. V07: a custom grid-snapped text layout.
- **The worst-case data:** a bigger group, the longest name, the error and delete-account screens in this palette.
- **The biggest craft debt** as a cost, not a neutral fact (V03 had put its slashed zero in the type specimen).
- **Non-proportional devices** as costs, not only "on purpose": V05's lamps count in thousands, so 9,000 and 9,999 look
  the same and a 900-rep evening can light nothing. Also density lost to targets, and a color doing two jobs.

### 2.5 The squint target loses (V01, V02, V03, V06, V07, V09, V10)

In color the accent reads first, so the builder sees it win; in grayscale, size and weight decide. Mass beats size: a
39 px title at weight 900 outweighed a 70 px hero in weight-500 mono (V03), and hollow display strokes cost weight (V01).
- **Squint in grayscale.** V10's yellow Your turn pill was 1.37:1 against its ground and the teal Waiting pills 2.39:1,
  so in grayscale the non-urgent states won. Fix: the others became outlines, the winner taller (36 px, 2 px edge).
- **Win in the system's own currency:** V07 made the act-now band double height (height means importance on its grid);
  V02 set YOUR TURN at the room title's display size (39 px); V08 fitted YOUR TURN across its slab.
- **Quiet the competitors:** V09 cut headers and wordmark to 22 px, thinned grid rules 1.75 → 1.5, dropped tab underlines.
- **The second tier matters** (V07's crew total, one row like the lines under it, went double height). In a ranked
  list the count leads each row: V10's solid rank tiles outweighed the totals until they became outlines.

### 2.6 The peak's still frame doesn't escalate (V03, V04, V05, V07, V08, V09, V10)

Critique shots force reduced motion, so the still frame *is* the design. The rule is [method.md](method.md)'s peak rule:
the peak resolves the key number's form and escalates in the variant's assigned mode, and a quiet peak is valid. R1's
peaks were mostly slams and bursts, so the fixes below are loud; a quiet peak fails the same way when it reads like the
core screen.
- **Wit that exists only in motion.** V03's closing tally stroke was identical to the other nine at rest. The refine
  drew it at stroke 5 against 3, on a path overshooting the gate, in its own ruled cell, outside the media query.
- **A burst whose color move was already spent** (R1). V07's Home had red and magenta bands, and V10's Home had
  more water than its celebration. V07's fix: 10,000 on an 8-row full-bleed red field, the variant's only such field.
- **Dead zones:** 64 px above the number (V03), 7 blank rows from a literal spacer (V07), a ~330 px hole (V08), 193 px
  of white and a gray footer (V09), 174 px of empty ground (V10). Fill with the signature, not new content (V08 set the
  headline as three fitted lines: hole 330 → 204 px), center the stack (V09), or move the action into the field (V10).
  Kill widows ("line." alone, V07, V09) with `white-space: nowrap` on the last phrase or `text-wrap: pretty`.
- **The shared skeleton.** Before review, 8 of 10 briefs had left-set number → headline → body → label/value fact table
  → full-width button. Breakers critics praised: the number right-aligned so its last digit lands where the room's
  unfinished end was (V04); the headline beside the number's second line, on its baseline (V05); the baseline on a
  waterline (V10); the number rotated (V08). A number 1.4× the room's hero in the same color reads as a note (V09).
- **The share test** (R1's gate): would someone post it to their group chat? V05's frame alone was close to a keynote
  slide; V02's full-bleed lid, 10,000 knocked out at 143 px across 355 of the 358 px measure, passed on sight.

### 2.7 Numeral defects (V01, V02, V03, V04, V06, V07, V08)

Display faces fail at a scoreboard's one job. Test glyphs, not font names. The floors and the measured face facts are
[craft-floors.md](craft-floors.md) §3–§4; this table is what the critics caught and the fix that worked. Tabular figures belong in columns and in
numbers that change (https://www.myfonts.com/pages/fontscom-learning-fontology-level-3-numbers-proportional-vs-tabular-figures,
https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric).

| Defect | Where it showed | Fix that worked |
| --- | --- | --- |
| A slashed zero reads as Ø ("none") on a zero score | DM Mono (V01, V02, V03). `zero`, `ss01`–`ss03`, `salt` and `cv01` all kept the slash | Columns in a text face with `tabular-nums lining-nums` (Bricolage: 1,111 = 8,888 = 65.6 px at 20 px); mono only where a 0 never appears |
| A stencil 4's detached bar reads as "4·0" under ~48 px | Big Shoulders Stencil (V02) | Stencil figures at 48 px or more; the text face below that |
| Loose display comma ("1 ,690") | Mono's full-cell comma (V03), condensed faces (V01), a rotated hero (V08) | The comma in a span with negative inline margin, tuned by eye per face: −0.18 em (mono), −0.1 em (V08), −0.03 / −0.05 em (V01's tight face) |
| Tabular hyphens ("pull - ups") | A `tnum` class on whole text spans (V04, V06) | The class on digit spans only |
| Ragged figure column; left-aligned ranks | Units inline with amounts (V01: right edges 313–347 px); ranks (V02) | The unit as a fixed-width inline-block after a real space, so every amount ends at one x; ranks `text-align: right`, so the "=" of "=3" hangs left |
| "Full measure" by advance, not ink | V07: ink 11 px short of the gutter | Measure ink in the @2x shot; 2.0 px letter-spacing; last glyph boxed to its ink |
| The face has no `tnum` | Libre Franklin as served (V08); Big Shoulders, League Gothic | Check 1,111 and 8,888 match with the property on; figures from a face that has `tnum` |
| The unit is too small | "reps" at 33 % of the hero (V04) | 35–50 % of the number, on its baseline |

### 2.8 The viewer's highlight lands on a sensitive item (V01, V02, V05, V06, V07, V09, V10)

The spec said "yours" must be marked by more than tint, and the demo data gave the viewer a skeptical reaction on
someone else's disputed log. Every solid treatment (accent fill, dark fill with offset shadow, reversed white block,
triple outline, hand-drawn box) made that reaction the loudest mark in the row, which reads as a verdict. What passed:
a neutral raised fill plus weight (V09), an inset outline plus weight (V10), a ring lowered to 3.36–3.88:1 (V05).
**Render every per-viewer highlight on the worst-case content before choosing its strength**, and if it is borderline,
put the question to the reviewer on the board (V02, V06).

### 2.9 The board claims things the screens don't show (V01, V04, V05, V06, V08, V09, V10)

One false sentence and reviewers trust the whole board less. Seen: a signature tile composing the celebration in a way
the phone can't (V01); "the feed runs packed" beside a roomy feed, and a specimen in a face no screen uses (V04); "the
one container: a day" when the screen showed two (V05); "black means yours" when black was also the crew's progress
(V06); "yellow means yours" on a board with two decorative yellow blocks (V08); "one meaning per mark" while the
underline meant two things (V09); the wit only in a caption (V10). **After the refine, re-read every board sentence
against the final screenshots; change the screen or the sentence.** Specimens are crops or true-layout copies.

### 2.10 The list screen is the wireframe in a new palette (strongly: V03, V04, V05, V06, V10; partly: V08, V09)

Desaturate the list screen and set it beside the wireframe (with none, the category's default list screen from the
domain research note); if it matches row for row, the direction never reached it.
Kit tells found: filled status pills, a filled accent pill on the selected tab, icons in tinted squares, one card per
group, a dotted rule as every divider, a number in a dark rounded square, the stock social feed row (avatar, name over
time, amount right, chips under), a standard app bar in the brand color, and a "hand-ruled" grid with perfectly
straight lines that read as a bordered table (V09's fix: rule ends overshoot by −5 to +5 px). The strongest list
screens carried the signature through structure: V08's fitted titles (each exactly 358 px wide at a different
width-axis value), V01's price column, V07's grid.

### 2.11–2.20 The rest

- **Board order and the extra block (6).** Order: thesis → signature → palette → type and numerals → rejected defaults
  → trade-offs. Three builders added a "principles" block (V01, V03, V09) that repeated signature captions, broke the
  order and cost ~200 px; fold principles into the signature caption (V06, V10). Thesis ≤ 25 words (V09's had 46).
- **Rendered strings drift (6: V01, V03, V07, V08, V09, V10).** Content scored 8–9 because source strings were exact;
  the drift was in rendering. `display: inline-flex` on a link collapsed spaces: "First to1,000km" on screen while the
  accessible name was right and the link check passed (V10); wrap the contents in one inline span. Spans separated only
  by CSS margin run together in `innerText` and screen readers ("Maya LindqvistAdmin", "40reps", V01): put a real space
  before each span and trim the margin by a space width. A grid on amount + unit gives `innerText` "40\nreps". Watch
  meaning-changing wraps ("24 in it" joining the phrase before it) and extra `aria-label`s outside the string list.
- **Muted color on the wrong ground (6: V01, V02, V04, V05, V07, V10).** A muted token tuned for the main ground fails
  on a band or a flipped celebration: 2.6:1 on V05's white finish, 2.43:1 on V10's water. The fix that scaled: redefine
  semantic tokens under a ground class (V10's `.v-on-water` maps `--ink-muted` to the dark ink) and swatch both grounds.
  Also caught: a 1 px dotted end at 1.23:1, fragile at DPR 1 (V02 → 2 px dashes); a 1.23:1 outline as a chip's only
  edge (V04); small colored text on black at 6.70:1, passing AA but under the 7:1 aim for dark (V07); a rule claimed
  2.5:1 that measured 2.43 (V01). The 7:1 aim exists because a WCAG 4.5:1 pass can be functionally unreadable on
  near-black (https://git.apcacontrast.com/documentation/APCAeasyIntro.html); controls and progress ends need 3:1
  (https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- **Motion (5: V01, V02, V03, V05, V10).** A delay with `animation-fill-mode: both` hid the final state, so the round
  page's still capture showed the celebration unfinished (V03): no delay, rest state outside the media query. A
  `clip-path` sweep clipped the status bar like a curtain (V01) and a swinging lid left the status strip floating (V02):
  transform and opacity only, and check mid frames for seams. Halves sat offset mid-fade (V05): start slides at 0 ms.
  Motion the brief marked unjudged was built anyway (V01, V02); deleting it removed the defects.
- **Status bar and chrome (5: V01, V02, V06, V07, V09).** Draw the status bar in the direction's system (V07 rebuilt
  signal, wi-fi and battery as grid blocks, time on the grid). Keep controls over photos legible with a scrim measured
  on the brightest pixels: V06's light Close disc vanished into a bright ceiling until a top scrim (.7 → 0 over 140 px)
  went in (https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/).
- **Photo grades (5: V01, V05, V06, V07, V08).** Measure, don't eyeball: V05's "cool floodlight" used
  `hue-rotate(-8deg)`, which pushed skin orange (average RGB 78/59/47) and matched another variant's tungsten;
  `grayscale(.55) contrast(1.25)` plus a blue `mix-blend-mode: color` layer gave 67/64/65. Pixelating without quantizing
  read as TV face-censoring (V07): posterize to the palette (`feComponentTransfer`, discrete) and crop to the face, since
  an uncropped face gets ~3 blocks at 36 px. A uniform dot lattice read as a screen door (V08); a thresholded AM
  halftone read as print (`contrast(20)` wrapper, rotated radial dot screen with `color-dodge`, `brightness(.6)` first,
  exposure per photo, 2.5 px pitch on 40 px avatars at DPR 2, 6 px on the board). Initials discs at 1.2–1.5:1 vanished
  beside vivid photos until lifted to 1.6–1.9 (V01). V06's generated hero came out level, centered and posed, four slim
  athletes: lifestyle stock that failed the mixed-build check. Run the realism and diversity check before building on a
  generated image, and check the image prompt against the guardrails (V06's brief asked for people filming with
  phones, which the guidelines forbid).
- **Hit areas (4: V02, V05, V06, V09).** Negative-margin padding faked 44 pt without adding height: 15 overlapping pairs
  each in V02 and V09 (V09's effective targets ~30 px). Vertical padding on an inline link doesn't grow the line box
  (V06 measured 41–42). Fix: each line holding a link is a 44 px flex line the link fills, or `display: inline-block;
  padding-block: 12px; margin-block: -12px`. Audit overlaps, not only sizes. WCAG's floor is 24 px
  (https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html); the design floor is 44.
- **Icons (4: V03, V04, V08, V09).** One stroke per surface, heavier only on the selected tab (V09 mixed 2 / 2.25 /
  2.5). 20 px header actions and 24 px navigation (V08's ran 24 / 28). Detailed icons break up at 16 px (V04 → 18).
- **Untrue measurements (4: V01, V04, V06, V07).** 2.5:1 claimed and 2.43 measured; "directly over the label" when
  offset; "44 pt" at 41; "exactly forty columns" by advance, not ink. Critics measure: write numbers only after you do.
- **Spacing scale (3: V02, V03, V08).** V02 declared 4 / 8 / 12 / 20 / 28 / 40 and also used 6, 10, 14, 16, 24, 32 and
  64. Snap, and list what is off-scale on purpose: OS insets, hit-area expansions, optical nudges, alignment offsets.

## 3. Per-screen patterns

### 3.1 List screen (Home)

- The act-now item wins the grayscale squint (§2.5), the greeting is never the largest type, and the signature
  arrives through the list's structure (§2.10). The first feed item shows in the first frame (§2.2).
- One state device, at most two hues carrying state: the act-now state is the only filled one, the others are words,
  the quietest is the plainest (V04 dropped its moon). The rows read as different mechanics, not one skeleton (V07 gave
  "everyone checks in" its own count line). States sit in one right-hand column on the title line, sized from the
  widest state measured in the served font (V09: 132 px, since Your turn measured 121.9).
- System rows (someone joined, someone gave up for the day) differ from logs by surface but are never the brightest
  container: V10's white card spotlighted a behind-state message until it became a pale tint of the ground.
- The feed is where the stock social row creeps back in (V05, V08): give it at least one trait of the system.

### 3.2 Core data screen (the room)

- Grayscale order: hero → crew total → progress → list totals (§2.5). Strong heroes sat inside the direction's object:
  their own box face between fold lines (V02), a marker ring (V09, that variant's best frame), one baseline shared with
  a whisper-weight label (V05), a band (V04). A plain big number set left was the default (7 of 10 briefs).
- Progress per §2.1, with the remaining label directly under the unfinished end. Measure it: V04's end missed its
  label until the bite was set at x 318–390, over the label at 313–374.
- Standings: ranks right-aligned in a two-character column, totals on one right edge, the rank lighter than the count,
  tags ("You", "Admin") spaced and muted so they don't read as a surname (V09: 10 px margin, 600, muted). Design for the
  longest name first; set a zero like every other total. Count rules at joins (V03 had four in 70 px above its tabs).

### 3.3 Peak screen (R1: the Finish line)

- Compose the reduced-motion frame first and hold it to the peak rule ([method.md](method.md): it resolves the key
  number's form and escalates in the assigned mode; quiet is valid) (§2.6).
- **Tie the number to an object carried across screens,** the round's strongest push-further. V01: the room's open
  progress line, now closed, runs into the foot of 10,000. V04: the band edge sits at the room's exact y, and the last
  digit lands where the room's bite was. V05: the lamp that was off in the room becomes the whole screen. V10: the
  baseline sits on the waterline, the right edge on a "far wall" axis shared with the totals.
- Where the guidelines set a ratio between heroes, measure it (R1: the room's hero at most 0.8 × the celebration's; the
  strong frames ran 0.52–0.76). Facts as results lines
  (`grid-template-columns: 1fr auto`, figures right-aligned) or columns, never a hairline label/value table.
- At 120 px the thumbnail lands on the number, not a mascot or prop (V02 passed). One flash is under WCAG 2.3.1's
  three-per-second limit (V06).

## 4. Board (style tile) patterns

| Read well | Example (Repperoni R1) |
| --- | --- |
| The board laid out as the direction's object | V02's box net (lid, hinge, faces, liner flap): the top board score, 8 |
| A board joke in the direction's own language | V01's hex codes set as prices in its price column |
| The signature shown as a rule, on real content | V07's "Height is the only volume" ladder: four heights on one bottom line |
| Before and after crops at true layout, lined up | V04 after refine: room band and celebration edge side by side at 0.7, edges at the same y |
| The whole mark vocabulary in one strip | V09 after refine: underline, ring, three red passes |
| An element row with states; the grade shown, not named | 99.8 % bar, primary at rest and pressed, tab bar (V09); mosaic photos beside initials (V07) |
| A palette for every ground; costs in the direction's material | V05's "At night" and "Lights on" halves on the same tokens; V09's pen tray as the costs band |

| Read poorly | Fix |
| --- | --- |
| Signature specimen small, or half the idea (V04) | Span two columns; show both screens' halves |
| A specimen redrawn in a way the phone can't (V01), or in a face no screen uses (V04) | Crop from the phone, or set it exactly as the screens do |
| A "principles" block (V01, V03, V09); a 46-word thesis (V09) | Fold into the signature caption; 25 words or fewer |
| The meaning color used as decoration on the board (V08's yellow blocks, V05's white id chip) | The board obeys one color, one meaning |
| Palette hides the signature screen's inks, or swatches read primitives (V05) | Swatch semantic tokens for every ground |
| An unreadable mood image (V08); a light/dark pair in a heavy wrapper that reads as a focus ring (V06) | Fix or drop the image; put the dark half on a dark area |

**Height calibration.** At 1,286 px wide, with the six mandatory blocks and 13–15 px text, final boards measured
1,126–1,629 px (median ~1,340). None met the build prompt's 560–760 px aim; all stayed under the 1,800 px cap. Aim for
about 1,100–1,400, or cut blocks.

## 5. Score calibration: the R1 table

First-critique scores, before the refine. Use them to anchor your own.

| V | Name | Fid. | Craft | Orig. | Content | Board | Signature |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 01 | Specials board | 8 | 7 | 7 | 9 | 7 | A signwriter's inline numeral and a price list: every figure hangs in a right-hand column via chalk leaders |
| 02 | Box lid | 7 | 6 | 7 | 9 | 8 | The takeaway-box print: tomato stencil heroes in box faces between fold lines; the celebration is the lid thrown open |
| 03 | Tally card | 7 | 6 | 7 | 8 | 6 | Ten cobalt tally gates on a ruled scorecard; the tenth waits for its slash |
| 04 | Team sheet | 7 | 7 | 6 | 9 | 6 | A black band whose bottom edge is the progress; 10,000 straddles the edge in a difference blend |
| 05 | Floodlights | 8 | 7 | 6 | 9 | 7 | All black, where white means lit; a bank of lamps; the celebration is the only white screen |
| 06 | Flash | 5 | 6.5 | 5 | 8.5 | 6.5 | An on-camera flash snapshot falling to a black floor under 10,000 |
| 07 | Forty columns | 8 | 7 | 8 | 9 | 7 | A teletext 40-column grid where row height is the only volume; a 40-cell progress row |
| 08 | Show card | 8 | 7 | 8 | 9 | 7 | Fitted wood type (every line fills the measure through the width axis), fluoro inks, a rotated 10,000 |
| 09 | Hallway board | 7 | 6 | 7 | 9 | 7 | One variable handwriting face from print to marker; a ring round the hero, three red underlines at the finish |
| 10 | Deep end | 6 | 7 | 6 | 8 | 7 | A pool lane rope as progress; 10,000 as the deep end's depth marking |
| | **Mean** | 7.1 | 6.65 | 6.7 | 8.75 | 6.85 | |

What separated the scores:
- **No axis went above 8** on a first pass. A 7 meant "good, with 3–4 must-fixes"; a 5, the signature failed on the
  screen built to carry it.
- **Fidelity 8:** the signature worked on all three screens and was recognizable in a 120 px thumbnail.
- **Originality 8** went only to directions whose idea is a rule system that reaches the list screen (V07's grid, V08's
  fitted type); 6 to those whose list screen fell back to a kit (V04, V05, V10); 5 to V06, whose signature was one
  asset that failed, with nothing systemic on the list screen.
- **Craft stayed at 7 or below:** every variant had measurable defects (§2.7 and §2.11–2.20).
- **Content** is the easy axis when strings are fixed: 9 when exact, 8–8.5 for one rendering bug, wrap or spec slip.
- **Board 8:** laid out as the object, every block present (V02). **6:** order broken, a misleading specimen, or thin costs.

## 6. Refining from a critique

- **Apply the whole critique in one pass:** every must-fix, both push-furthers, the remove-one. Then add a "Changes
  after critique" section to the notes; it overrides the plan above it wherever they disagree.
- **Treat the critic's values as starting points,** checked on a screenshot, with any change recorded and measured.
  V05's lamps went to 22 px wide, not 30, because at 30 nine lit panels made one band as heavy as the hero. V09's column
  went to 132, not 128, because the text measured 121.9. V07's letter-spacing went to 2.0 px, not 2.2, which overshot
  the gutter by 0.6 px. V01 tuned its comma by eye; V08 kept its bar at 10 px so the open end stayed visible.
- **Critic CSS doesn't always work in your stack.** A suggested grid turned inline text into blocks (V01). Tailwind 4
  generated nothing for `items-[last_baseline]`; `items-baseline-last` worked (V06). A negative right margin didn't
  reduce `scrollWidth`, so the last glyph was boxed to its ink (V07).
- **Precedence.** A fix that conflicts with the content spec loses (V06 kept icons out of tinted tiles, as the spec
  says, against a review finding). A guardrail beats a family trait; flag it for the lead and say so on the board (V01 moved its figures off the slashed-zero mono).
- **A push-further that fails in testing is dropped, with the evidence kept.** V09's one-stroke triple underline read
  as a paperclip, a folded ribbon or a crossing-out, which the brief forbids; V10's taller rope read as a barcode.
- **When a fix needs something the pass doesn't allow** (image generation), apply the stopgap and state the failure as
  a board cost with the next-round plan (V06).
- **Re-run every check after the refine,** because fixes create defects: V05's rebuilt board first measured 1,804 px,
  over the cap; V07's new row pitch made two links overlap; V08's `:where()` selectors with commas tripped the scope check.

## 7. Before you hand in: the checklist

Tags: **[S]** screenshots (390 × 844 at DPR 2, top and scrolled; the peak screen also with reduced motion forced),
**[D]** the DOM audit, **[C]** your code and notes. Fix every "no", or name it on the board as a cost.

| # | How | Check |
| --- | --- | --- |
| 1 | [S] | **Hierarchy.** Grayscale squint, each screen: does the intended first item win on size and weight, not hue? |
| 2 | [S] | Does the core hero outweigh its title in ink, with the second tier (R1: the crew total) clearly second? |
| 3 | [S] | Reduced-motion peak: does it resolve the key number's form and escalate in its assigned mode ([method.md](method.md), the peak rule; quiet is valid)? Wit visible without motion? No accidental dead zone over ~150 px (a quiet peak's space is composed, not left over), no widow, no chrome band under the button? |
| 4 | [S] | Is the peak's color or mark already spent on the list or core screen? |
| 5 | [S] | **Progress** (if the product has it). Unfinished end inside the same object, nothing else in the bar different? Reads nearly full in grayscale, not 80 %? Not a battery, stepper or stories bar? Remaining label right under the end? |
| 6 | [S] | **Numbers.** Zoomed crops of every hero and column: no slashed zero, no misreading glyph, display commas tightened, plain hyphens in words? |
| 7 | [D] | 1,111 = 8,888 in every column face; ranks right-aligned; totals on one right edge; heroes measured by ink; unit 35–50 % on the baseline; the guidelines' hero ratio met (R1: core ≤ 0.8 × celebration)? |
| 8 | [S] | **Direction.** Desaturated, does the list screen differ from the wireframe (with no wireframes, the category's default list screen from the domain research note) in composition, not only in color? |
| 9 | [S] | Every use of the signature device and each meaning color: one meaning each? Selected tab free of both? |
| 10 | [S] | Remove one: with the least necessary ornament gone from each screen, is it as good or better? Then leave it off |
| 11 | [S] | Is the per-viewer highlight quieter than the content on the worst-case item? |
| 12 | [S] | Does the list screen's first frame meet the brief's density target (R1: the first feed item shows)? Every line of a row carries content? |
| 13 | [S] | Status bar drawn in your system, with no progress bar right under the battery icon? |
| 14 | [D] | **Floors.** Every target 44 × 44 or more, no overlapping rects, nothing under 13 px except tab labels? |
| 15 | [D] | Contrast recomputed for every text/ground pair, flipped screens and colored bands included; UI parts 3:1; small colored text on dark near 7:1; decorative ratios reported as measured? |
| 16 | [D] [S] | `innerText` matches the string list: real spaces between spans, no collapsed flex text, no extra accessible names, no wrap that changes the meaning? |
| 17 | [S] | Photos: average RGB matches the stated grade; faces read at avatar size; generated images pass the realism, diversity and guardrail checks? |
| 18 | [C] | Motion: rest state outside the media query, no delay hiding the final frame, transform and opacity only, no seams in mid frames? Cut it if nobody judges it |
| 19 | [C] | One icon stroke per surface, sizes on the ladder, spacing on the declared scale? |
| 20 | [S] | **Board.** Fixed block order, thesis ≤ 25 words, no "principles" block, height ~1,100–1,400 px or explained? |
| 21 | [S] | Every board sentence true of the final screenshots; specimens cropped from or true to the phone? |
| 22 | [S] | Palette swatches the semantic tokens for every ground, the peak's included? |
| 23 | [S] | 4–5 costs, each with where it bites: the signature's build cost, the worst-case data, the biggest craft debt, any non-proportional device? |
| 24 | [C] | **Notes.** Is every number in your notes measured on the final build? |
