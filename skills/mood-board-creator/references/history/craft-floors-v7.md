> Historical v7 reference, retained for evidence and measured examples. Not active universal rules. Use [current craft checks](../craft-floors.md) and [design diagnostics](../design-diagnostics.md).

# Craft floors: measurable quality for 390 × 844 hi-fi screens

Read this before building or critiquing any variant. A floor is a number or a yes/no check that holds in every
direction, however loud or strange. Floors make a still frame look finished rather than mocked up, and they can be
checked mechanically, which leaves critique time for judgment. **[S]** = checked on screenshots (DPR 2), **[D]** = a
DOM check (§13: `dom-audit.mjs` or a console probe), **[C]** = reading the code. Bend a floor only where the
guidelines say "allowed when…", with the reason on the board. Distilled from Repperoni Round 1 (2026-09-25); "Example
(Repperoni R1)" lines show a real failure or fix, and the rule above each is general. *Measured* = measured in that
run with fontTools or headless Chrome.

**Contents:** 1 Frame and safe areas · 2 Touch targets · 3 Type · 4 Numerals · 5 Spacing, radius, optics · 6 Color and
dark mode · 7 Contrast · 8 Icons · 9 Photos and avatars · 10 Motion · 11 Copy · 12 Edge cases · 13 How to measure ·
14 Critique checklist · 15 Best-in-class references · Sources

---

## 1. Frame and safe areas

| Item | Floor | Why |
| --- | --- | --- |
| Frame | 390 × 844 pt, a notch-class iPhone (12/13/14). The screenshot tools, the 402 px device frame and the 1,286 px board all assume it, so don't switch to a Dynamic Island size (393 × 852, 59 pt top inset) [UYL] | Every variant must be judged on the same canvas |
| Status bar | 47 pt, drawn by the variant in its own colors: time leading; signal, wi-fi and battery trailing. Nothing tappable in it | A stock gray bar is a mockup tell. It is also small text: when a celebration floods the ground, re-check it at 4.5:1. Example (Repperoni R1): espresso status text on a tomato flood was 3.24, so it was knocked out in the light liner color (5.30) |
| Home indicator | Bottom 34 pt hold nothing tappable; the tab bar and any pinned action sit above it [UYL] | The system gesture owns that strip |
| Gutter | 16 pt, leaving 358 pt of content width (356 if a 1 px frame border is drawn) | Every width calculation in §4 starts from this |
| Pinned action | A list that scrolls under a pinned bar gets bottom padding so its last row clears the bar. Check: last row's bottom < bar's top when scrolled to the end | Otherwise the last row is unreachable |
| Prominent buttons | One primary per screen (HIG allows 1–2), marked by fill and shape, not size; a verb-first label; every custom button has an `:active` press state [HIG-Buttons] | Two loud buttons cancel each other out |
| Tab bar | Single-word labels ≥ 11 pt; the selected tab shown by more than color (weight, an indicator shape); navigation only, never actions; never hide or disable a tab, explain the empty state inside it [HIG-Tabs] | Color-only selection fails color-blind users and grayscale squint tests |
| iOS 26 capsule | If used: inset about 21 pt L/R/B, monochrome over colorful content, and not the variant's signature. Liquid Glass only on the controls layer, never on cards or rows; over bright media add about 35 % black dimming; must survive Reduce Transparency [LUI-26] [HIG-Materials] | It is the most current pattern and the most stock one |
| Android (if drawn) | Targets 48 × 48 dp; nav bar 80 dp (64 in M3 Expressive), 3–5 destinations, 24 dp icons, 56 × 32 dp active pill [M3-Struct] [M3-NavBar] | |
| Sheets | Medium/large detents, a grabber when resizable, one sheet at a time, Cancel leading / Done trailing [HIG-Sheets] | |
| Vertical budget | A screen meant to fit without scrolling (often the peak) adds up to ≤ 844: 47 + content + 34. Check `scrollHeight` | Example (Repperoni R1): a two-line 250 px hero plus headline, body, facts and a 50 px button overshot 844 on paper |

## 2. Touch targets

- **44 × 44 pt hit area for everything tappable**; the visible glyph may be smaller [HIG-Buttons] [HIG-A11y]. WCAG 2.2 AA
  only asks for 24 × 24 CSS px [WCAG-258] (44 is AAA), so it is not the bar. About 12 pt between bezeled controls and
  24 pt around unbezeled ones [HIG-A11y].
- **Icon-only controls** carry an `aria-label` and an explicit size (`h-11 w-11` = 44 px). [D]
- **Inline text links don't reach 44 with padding.** An inline element's box is the font's content area (ascent +
  descent, not the line height) plus padding. Use `inline-flex` or `inline-block` with `min-height: 44px`.
  Example (Repperoni R1): `padding-block: 11px` on a 17/22 link measured 41–42 px, although the builder claimed 44.
- **Hit areas never overlap.** Negative-margin hit expansion (`-my-3` plus padding) makes stacked links steal each
  other's taps. [D] pairwise rect check. Example (Repperoni R1): one Home had 15 overlapping pairs, up to 136 × 11 px;
  another pulled rows together with −14 px margins, leaving effective targets of about 30 px.
- **A row pitch under 44 can't hold a link per row.** Make the whole row the link, or use a two-row pitch.
  Example (Repperoni R1): a 26 px teletext grid moved tappable rows to a 52 px pitch.

## 3. Type

| Floor | Value | Source |
| --- | --- | --- |
| Families | Two at most; a third only as a numeral face that sets digits alone | [HIG-Type] |
| Sizes | Body 17, secondary 15, tertiary 13 (skip a size between the last two); 11 only for tab labels; nothing else under 13 px [D] | [LUI-iOS] |
| iOS reference scale (pt/leading) | Large Title 34/41 · Title 1 28/34 · Title 2 22/28 · Title 3 20/25 · Headline 17/22 semibold · Body 17/22 · Callout 16/21 · Subhead 15/20 · Footnote 13/18 · Caption 12/16, 11/13 | [HIG-Type] |
| Material reference | Body Large 16/24, Display Large 57/64; Title/Label in Medium | [M3-Compose] |
| Emphasis | Titles get bolder, not only bigger. De-emphasize with color and size, never a thinner weight. Hierarchy = size + weight + color together | [LUI-iOS] [RUI] |
| Weights | ≥ 400 for text. Light/Thin only at display sizes (≥ 28 px). Example (Repperoni R1): a 20/300 caption was flagged and moved to 20/400 | [HIG-Type] |
| Line height | Body 1.3–1.5 (iOS 22/17 = 1.29; M3 24/16 = 1.5); headings tighter as they grow; giant numerals 0.85–1.0 with `text-box: trim-both cap alphabetic`. Snap to 4 as a tie-breaker only. Paragraph gap > line gap | [RUI] [Arant] [DS-Space] |
| Tracking | Body 0 · display > 40 px −0.01 to −0.02 em · uppercase labels ~12 px +0.04 to +0.06 em · bold ≥ 18 px slightly tighter · very small text looser. Custom fonts lack SF's size-specific tracking, so add it | [Arant] [RUI] [LUI-iOS] |
| Optical size | `font-optical-sizing: auto` on `opsz` faces (Bricolage, Inter, Big Shoulders have it) | [Arant] |
| Caps | One tracked-caps label style per screen, on two roles at most; section headers in sentence case | Guideline |

**Test every display glyph at its smallest size.** Stencil, inline and handwritten faces break in ways a specimen
hides; set a minimum size per face. Example (Repperoni R1): Big Shoulders Stencil's detached 4 reads as a decimal
("40" → "4·0") below about 48 px; its "d" splits into "c" + "l" at 49 px; Big Shoulders Inline closes up under 48 px.

## 4. Numerals

1. **Lining figures in UI** (`lnum`); oldstyle is for prose [TypeType].
2. **Tabular in every column and on every number that changes** (counters, timers, running totals):
   `font-variant-numeric: tabular-nums lining-nums`. Otherwise digits jitter sideways as they change [MDN-FVN]
   [Fontology]. A single static hero may use the face's natural figures, checked by eye.
3. **Verify the face has `tnum`.** Without it the CSS silently does nothing. [D] "1,111" and "8,888" measure the same
   width with the property on (§13). Giving each digit its own cell makes any face tabular by construction.
4. **Put `tnum` on digit spans, not whole text spans.** It also makes punctuation tabular. Example (Repperoni R1):
   Inter with `tabular-nums` on a whole meta line set "pull - ups" and "check - in 13".
5. **The leading-1 hole.** A tabular 1 is as wide as an 8, so a hero starting with 1 shows a gap. For a static hero go
   proportional or pick a face whose 1 has a flag or foot (DIN's), and pull the side bearing back to the gutter with a
   negative margin. [S] the first digit's ink sits on the gutter.
6. **Right-align numbers in columns, on one shared grid.** Stacked tables sized independently put numbers under the
   wrong headers (Dr Drang on Apple Sports) [Drang]. The rank column is right-aligned too and wide enough for a tie
   ("=3", two characters). Example (Repperoni R1): a left-aligned rank column put 1, 2, 5 under the "=" of "=3".
7. **Hero and unit.** The unit ("reps", "km") is 35–50 % of the number's size, lower contrast, on its baseline, never
   vertically centered [LUI-7]. The number stays the focus: WHOOP lists "switch focus from score to title" as a don't
   [WHOOP-PDF]. Example (Repperoni R1): a 40 px unit beside a 120 px number (33 %) failed.
8. **Hierarchy between numbers is defined by cap height.** If one number must be the largest in the app (a finish
   total), cap the others at a ratio (R1 used ≤ 0.8×) and measure it.
9. **Commas at display size.** A condensed comma is 0.15–0.24 em *measured*; a mono comma fills a 0.6 em cell, so "1,690"
   reads "1 , 690". Tighten it at display sizes only: wrap it in a span with `margin-inline: -0.18em`.
10. **No slashed zero for scores.** Check the face's default zero. DM Mono's zero is slashed, and `zero`, `ss01`–`ss03`
    and `salt` all still render it slashed *measured*; Atkinson Hyperlegible Next is slashed too. A lone "Ø" reads as
    "none", and at hero size it signals a code editor. Fix: set figures in a face with a plain zero.
11. **Format.** Locale grouping (1,690 · 10,000), the unit after the amount ("40 reps").
12. **Money and signed values** (finance, prices, balances). The currency symbol follows the locale (en-GB "£1,690.50",
    de-DE "1.690,50 €"). In a column, fix the decimal places so the decimal points line up under tabular, right-aligned
    figures. A negative sign is the true minus (U+2212 "−"), or the locale's accounting form, never a hyphen, which
    is narrower and misaligns. Gain and loss never rely on red and green alone [HIG-Color]: add the sign, a word or
    a shape, and check the pair in grayscale. Whether a loss is red at all is a brand call, made in the guardrails. Small or superscript cents on a hero are
    a legitimate device; measure the hero fit with them.

**Hero fit.** Max font-size ≈ container inner width ÷ the string's width in em. Measure inside the real container (a
card's padding shrinks it), subtract optical side bearings, leave 8–12 px of air. Widths move with `wght`, `wdth` and
`opsz`, so measure in the browser. "10,000" *measured*: Big Shoulders 800 2.46 em (≈ 145 px max on 356) · Barlow
Condensed Bold 2.31 em (2.70 tabular) · Archivo wdth 62/800 2.28 em · Bricolage wdth 75/800 2.09 em · Inter Bold
3.24 em (≈ 110 px) · DM Mono 500 ≈ 3.6 em (99 px). Example (Repperoni R1): brief estimates missed by up to 35 %
(League Gothic at 150 px: 198 px wide, not 262; Jersey 10 at 104 px: 195, not 358), and Anybody 900 at 32 px set
"PULL-UP LADDER" at 139 / 285 / 431 px for `wdth` 50 / 100 / 150, so short titles never reached the measure.
**Forcing a break inside a number:** `<wbr>` only breaks on overflow. Constrain `max-inline-size`, or give the parent
`aria-label="10,000"` and draw two `aria-hidden` block spans.

### 4.1 Numeral facts for Google Fonts (*measured* with fontTools on the served files, 2026-09-25)

Re-check any face with the §13 probe: fonts change. Use current family names ("Big Shoulders", "Saira Stencil"); the
old aliases "Big Shoulders Display" and "Saira Stencil One" are still served but no longer in the catalog.

| Figures | Faces | Use |
| --- | --- | --- |
| **No `tnum`**, proportional | Anton (digits equal except 1), Oswald, Antonio, League Gothic, Big Shoulders (incl. Inline, Stencil), Six Caps, Teko, Pathway Gothic, Saira Condensed (static), Chakra Petch, Alfa Slab One, Bowlby One, Bungee, Fraunces, Instrument Serif, DM Sans, Libre Franklin (1,111 = 207 px vs 8,888 = 289 px at 100 px), Special Elite, Stardos Stencil, Squada One, Press Start 2P, Silkscreen, Caveat Brush, Permanent Marker, Nanum Pen Script, Yellowtail | Static heroes and display words only, or one digit per cell |
| `tnum`, proportional by default (set the property) | Inter, Geist, Instrument Sans (wdth 75–100), Mona Sans, Hubot Sans (wdth 75–125), Space Grotesk, Figtree, Manrope, Schibsted Grotesk, Rubik, Unbounded, Epilogue, Public Sans, Bricolage Grotesque (wdth 75–100), Barlow Condensed / Semi Condensed, Sofia Sans (Extra) Condensed, Science Gothic (wdth 50–200), Anybody (wdth 50–150), Saira and Saira Stencil (wdth 50–125), Special Gothic family, Zalando Sans, Tektur, Zilla Slab, Bevan, Dela Gothic One, Rubik Dirt, Jersey 10 / 15, Micro 5, Shantell Sans, Atkinson Hyperlegible Next | Columns and changing numbers |
| `tnum` and equal digits by default | Archivo (default instance only; at wdth 62 / 800 the 1 narrows, so turn `tnum` on), Familjen Grotesk, Asap Condensed, Chivo Mono, Reddit Mono, Bebas Neue, Roboto Condensed | Columns; as a hero the leading-1 hole always shows |
| Equal digits, no `tnum` | DM Mono, VT323 (0.40 em advance: 22.4 px sets exactly 40 columns in 358), Courier Prime, Tiny5, Doto, Handjet, Rubik Mono One, Graduate, Hanken Grotesk, M PLUS Rounded 1c (900: every digit 660 units) | Columns without the property |

## 5. Spacing, radius and optical adjustments

- **8-pt system with 4-pt half-steps;** no base of 5 (it splits pixels when centered) [DS-Space]. Steps ≥ 25 % apart;
  16 is a good starting unit [RUI]. **Declare the scale on the board and use only its steps.** [C] grep the markup for
  off-scale utilities. Example (Repperoni R1): a board declaring 4/8/12/20/28/40 shipped 6, 10, 14, 16, 24, 32 and 64.
- **More space around a group than inside it** [RUI]. Equal gaps everywhere is the amateur tell; vary rhythm on purpose.
- **Separate with space, tone and type before a line** [RUI]. Watch rule pile-ups. Example (Repperoni R1): four
  horizontal rules in 70 px under one progress block.
- **Radius:** two to four values with roles (screen/sheet → container → control → chip), nested concentrically:
  inner = outer − padding (a 16 px card with 8 px padding holds 8 px children). Zero only when the direction's
  source is cell-based, stated on the board.
- **Dead space must do work.** [S] find each static screen's largest empty area; `margin: auto` often makes it.
  Example (Repperoni R1): 330 px of bare gradient between a headline and its facts.
- **Budget single-control lines.** A line holding one 44 pt control (an add-reaction button) costs 44 px per row.
  Example (Repperoni R1): feed rows of 124–140 px meant Home's first frame showed no feed at all.
- **Optical fixes** [Arant]: nudge asymmetric glyphs (play, send, arrow) 3–6 % toward their point; center labels on
  cap height and baseline (`text-box-trim`, else 1–2 px less bottom padding); draw a circle 4–8 % larger than a square
  neighbor; take 2–4 px off padding beside a trailing icon; center a tab's icon + label pair as one; hang quotes with a
  negative `text-indent`.

## 6. Color systems and dark mode

- **Build and check palettes in OKLCH.** L is perceptual: hold L and C, change H, and contrast holds (HSL fails). Tints
  and shades change L only [EM-OKLCH]. Chroma limits depend on hue (yellow runs out before blue; above about C 0.37 is
  out of sRGB and browsers clip, shifting hue); boost under `@media (color-gamut: p3)`. See also [Harmonizer].
- **Hues come from the direction's source** (its inks, its material); OKLCH sets and checks the lightness steps. Palette
  structure (mono, dominant + one accent, two-ink, multi-ink, tonal) is a divergence lever: assign one per variant.
- **One color, one meaning,** stated on the board; if a color means "tappable", no decorative text in it. Color never
  carries meaning alone: pair it with a word, shape or weight [HIG-Color]. WHOOP locks each color to one data meaning,
  with fixed bands for its recovery colors [WHOOP-PDF].
- **Neutrals are tinted from the palette;** pure #000 / #fff only on purpose.
- **Dark mode goes lighter, not inverted** [M3-Color] [AOSP-Tokens] [Atlassian] [HIG-Dark]:
  - Base on dark gray, not black: #121212 (white on it 18.7:1). Pure #000 only as a deliberate identity (BeReal's
    OLED canvas).
  - Elevation = a lighter surface, not a shadow (M3 dark containers N4 · N6 · N10 · N12 · N17 · N22 · N24; Atlassian's
    sunken / default / raised / overlay). An element changes surface *or* elevation on interaction, not both.
  - Accents move lighter and calmer (M3 primary T40 in light → T80 in dark; on-primary T100 → T20), about 10–20 % less
    saturated. Text as white at 87 / 60 / 38 % for high / medium / disabled (secondary source) [Netguru]. No glow.
  - Darken photos that have white backgrounds.
- **In the lab:** each screen shows one fixed mode; never `prefers-color-scheme` (the lab's Light/Dark switch must not
  change a design). For a flip inside a screen (a celebration turning white), redefine the semantic tokens under a
  class. Token names and the board root's styles are in [guidelines-template.md](../guidelines-template.md) template
  §8 (Technical contract).

## 7. Contrast

| What | Floor (WCAG 2.2 AA) |
| --- | --- |
| Text below 24 px regular / 18.66 px bold | 4.5:1 [SM-TOI] |
| Large text | 3:1 |
| UI parts against their neighbors: progress fill vs track, the unfinished part vs its surface, selected states, icon-only buttons, focus rings, a control's only border, chart lines | 3:1 [WCAG-1411] (disabled is exempt) |
| Initials on an avatar fill | 4.5:1 (they are text) |
| Small custom-colored text on dark | Aim for 7:1 [HIG-Dark]; check 13 px secondary text by eye |
| APCA (a better predictor on dark) | Lc 90 preferred body · 75 min body at 18/400 · 60 other text at 24/400 or 16/700 · 45 headlines at 36/400 or 24/700 · 30 absolute min · 15 discernible non-text [APCA] |

On near-black a WCAG 4.5:1 pass "can be functionally unreadable" [APCA], so dark variants also get an eye check.

**How to compute.** Convert each sRGB channel c/255 to linear (≤ 0.04045 → c/12.92, else ((c + 0.055)/1.055)^2.4);
L = 0.2126 R + 0.7152 G + 0.0722 B; ratio = (L_light + 0.05)/(L_dark + 0.05). Composite any alpha over the real
background first. For text on a photo or gradient, measure against the *lightest* pixels under it. Recompute every pair
yourself (§13): notes drift. Example (Repperoni R1): a builder's "2.5" leader line measured 2.43.

**Pairs that usually fail** (all *measured*):

| Trap | Numbers | Rule |
| --- | --- | --- |
| Muted gray that passes on white only | Tailwind slate-500 #64748b: 4.76 on #fff, 4.34 on #f1f5f9, 3.86 on #e2e8f0 | Check muted text on every surface it sits on; darken it on tinted fills (#455162: 7.35 / 6.54) |
| Light gray as text | slate-400 #94a3b8 on white 2.56 | Only on dark (8.19 on #000) |
| Accent on a second, darker paper | #c42e19 on #f6ecda 4.78, on #efe0c6 4.30 | Small accent text on the lightest ground only |
| Saturated mid-tone accents | White on #ff0000 4.00 (black 5.25); white on Strava orange #fc5200 3.31 (black 6.35); espresso #1d1410 on tomato #c42e19 3.24 (white 5.60) | Test both white and your darkest ink; usually only one clears 4.5 |
| Yellow / fluorescent as text | #ffc94a on cream 1.45; fluoro pink on white 3.0; broadcast blue on black 2.4 | Fills only, with dark ink on them (ink on yellow 11.8) |
| Hairlines and tint fills | #dccbb0 on #f6ecda 1.36; #e2e8f0 on #fff 1.23 | Decoration only; never a track, input border, chip's only edge or card's only boundary |
| Initials discs near the ground | Fills 1.2–1.5:1 against the page, beside photo avatars | Not a WCAG fail, but they vanish; add a ring or a tonal step |
| Winning by hue alone | A yellow "your turn" at 1.37:1 against its tile won only in color | [S] desaturate: the thing that must land first still does |

## 8. Icons

- **One family, one stroke weight per surface.** Lucide (the lab's set): 24 grid, 1 px padding, 2 px centered stroke,
  round joins and caps [Lucide]. Rendered stroke should scale with size (Strava: 16 → 1.25, 24 → 2, 32 → 2.5, 48 → 3
  [Griff-Strava]); Lucide's scales with the icon, so set `stroke-width` ≈ 1.9 / 2 / 1.9 / 1.5 to match. 1.5 beside
  light text, 2.5 on a selected tab. [C] Example (Repperoni R1): strokes of 2, 2.25 and 2.5 on one Home were flagged.
- **Sizes:** 24 nav and tabs, 20 header actions, 16–18 inline, aligned to cap height. Check small icons at DPR 2: some
  turn to mush (Example (Repperoni R1): Lucide `spray-can` at 16; 18 holds). Never scale an icon up as illustration [RUI].
- **Selected tab:** HIG prefers filled tab icons and Lucide has none, so show selection with color + a 2.5 stroke + an
  indicator shape. An indicator on an edge touching a same-colored surface reads as a hole. Example (Repperoni R1): a
  white top border on a black tab bar under a white page looked like a notch cut out of the bar.
- **No icon beside every label, no icon tiles, no icon-in-a-circle leading rows** (wireframe tells).
- **Check every icon's connotation against the brand's guardrails.** Example (Repperoni R1), where nobody may feel
  watched or judged: no eye, clock, hourglass, shield, crown, trophy or warning triangle; `moon` for an inactive state.
- **Emoji are content, not icons.** They render as Apple or Noto by platform and are about 1.2 em wide, which is not a
  whole number of grid cells; never lay out around their exact shape.

## 9. Photos and avatars

Generation, prompts, the realism and brand checks, and CSS grade recipes are in [images.md](../images.md). The floors:

- **One grade and one crop per variant** (light, white balance, grain, depth of field; head-and-shoulders with eyes at
  one height) [LUI-7]. The grade comes from the direction's source and is stated on the board; no two variants share one.
- **Verify the grade by measurement.** Sample a face's average RGB from the DPR 2 shot. Example (Repperoni R1): a
  "cool floodlight" grade using `hue-rotate(-8deg)` pushed warm skin redder (78/59/47, tungsten); the fix read 73/71/73.
- **Text on a photo** sits on, in order of subtlety: a full overlay (about 35 % black), a text box, blur, a floor fade
  (transparent → about 20 % black), a scrim (elliptical 40 % black → transparent), or calm copy space [LUI-7] [SM-TOI].
  Solid backing beats transparency for numbers: CBS's 2025 scorebug moved to a bigger score and a solid background
  [KTS]. [S] no object lands on a numeral (a tangency) and no control loses its shape over a bright area.
- **One avatar system:** photos and initials share size, shape and ring (1 px inner ring at about 8–10 % ink, so light
  photos don't bleed into light surfaces). Initials fills come from a fixed tonal set keyed to the name, letters at
  4.5:1, no gradients. Initials are a designed normal state, not a broken fallback. A treatment (mosaic, halftone) must
  still read as a face at avatar size.
- **Assets** at 2× their display size (a 390 × 560 art slot → 780 × 1120); no text baked into images [HIG-Images].
- **Generated photos pass realism and the brand** before use. Example (Repperoni R1): three scenes showed friends
  filming someone mid-rep, which reads as the "proof" the brand rejects; they were regenerated.

## 10. Motion

- **One orchestrated moment per product** (usually the win or completion screen). Everything else: press states of
  120–300 ms, ease-out, and nothing on frequent actions [HIG-Motion] [Emil] [Rauno]. No entrance animation on lists,
  rows or cards; fade-and-slide-up is the stock tell, including as a second beat inside the big moment.
- **The sequence:** at most 1.8 s, once, no loop, skippable; `transform` and `opacity` only (`clip-path` is neither,
  use `scaleX`), ease-out, no bounce or elastic; native to the direction (a stamp landing, a band sweeping in).
  Escalate with the size of the win: Duolingo re-cut streak milestones with "multiple passes of rough animation"
  because "timing is everything" [Duo-Blog]. The scorebug model: the persistent score element grows into a takeover
  state and returns, rather than a generic modal [SVG-Scorebug].
- **Reduced motion by default.** Wrap every keyframe in `@media (prefers-reduced-motion: no-preference)`, so the
  un-animated screen *is* the final state. Reduced motion means different motion, not no feedback: fades instead of
  x/y/z travel, no animated blur, zoom or parallax [HIG-A11y] [web.dev-RM].
- **Compose the peak frame first.** Critique shots force reduced motion, so the settled frame must read as the peak
  in three seconds and meet the peak rule ([method.md](../method.md), screen roles: it resolves the key number's form and
  escalates in the variant's assigned mode; a quiet peak is valid).
  In a static round, write "Motion idea: …" on the board and skip building keyframes.
- **Check the first frames too.** [S] capture at 0 ms and mid-sequence: nothing torn or offset before it moves.
  Example (Repperoni R1): a status strip floated detached from a swinging lid for 650 ms; two halves of a number sat
  48 px apart during a fade.
- **Flashing:** at most one flash per second by design, never under reduced motion; WCAG 2.3.1's hard limit is three
  per second [WCAG-231].
- **Counting numbers** change in tabular figures (natively SwiftUI's `.numericText()` transition [SwiftUI-Numeric]). The
  CSS-only count-up recipe and the at-rule prefixes are in [guidelines-template.md](../guidelines-template.md)
  template §8.

## 11. Copy

- **The strings are fixed** by the brief's verbatim list; nothing else appears on a screen. New voice goes on the board
  only, after the brief's voice checks. Example (Repperoni R1): cut any line that implies being watched, targets whoever
  is behind, uses a banned word, outruns a chat message, jokes about errors or deletion, or names a missing feature.
- **Buttons say what happens,** verb first ("Log reps"). No trailing arrow, glyph or icon on buttons or tags: a pill
  with an arrow is the tell whatever draws it, and it makes a status look like a button.
- **Case:** stored as written. `text-transform: uppercase` on display lines, labels and tags only, never on sentences
  or meta lines. Keep long names in mixed case.
- **Middle-dot chains** ("Chores · Take turns · 24 in it") render as structure: a gap, a column, a line break, a weight
  change. Never join two separate strings with a new dot.
- **Real spaces between inline pieces,** not CSS margins, or `innerText` and screen readers read "40reps" and
  "Sam OkaforYou". [D]
- **Accessible names** for icon-only controls come from one fixed list; progress gets a spoken name ("9,980 of
  10,000 reps together"); photos get the person's name as `alt`.
- **A banned-word list per product** covers screens, boards and captions. Example (Repperoni R1): watching, verify,
  proof, pending, streak, journey, users, failed, missed, winner, grind.

## 12. Edge cases every variant must survive

Put these stress cases into the brief's content on purpose; a direction that only works with tidy data isn't done.
The rows come from a social scoreboard (R1): keep the ones your content has (a product with no ranks has no ties),
and add your domain's own. The last three rows are for other kinds of product.

| Case | Floor |
| --- | --- |
| Nearly complete (99.8 %) | The proportional gap is 0.7 px on a 358 track, so don't rely on it: draw an unfinished end ≥ 8 px (non-proportional is fine, say so), at 3:1 against its surface; fill vs track 3:1; say the remainder as a first-class number ("20 to go"); no red near the end. Example (Repperoni R1): a 7.95 px hollow cell failed; an outlined end cap read as a battery icon |
| Over 100 % | Never draw the bar past 100 %; show the numbers as written |
| Ties (only if the product ranks or compares people) | Both rows share the rank ("=3") in a right-aligned two-character column, same row style, deterministic order, next rank skips (5) |
| Longest name (30 characters, ~250 px at 15 px) | Design for it first. Feeds wrap to two lines; tables truncate the *name* with an ellipsis, never the rank or number; never shrink type to fit. Also check narrow columns: "Waiting on you" (110 px) wrapped in a 108 px column |
| Zero | "0" in the same weight and color as every other total; a plain zero |
| Former / removed person (only if the product ranks or compares people) | Same avatar shape with initials, not a link, no actions; name may be muted (still AA); their numbers get everyone's treatment. Never a ghost, skull or "Deleted user" |
| The viewer ("You") | Readable without color, visibly separate from the name (a gap, weight or line), and your own name isn't a link |
| Status states | Words plus a shape or weight difference, never hue alone; gentle states (inactive, "gone quiet") stay calm: no red, no warning icon [HIG-Color] |
| "Yours" selection (a reaction, a choice) | Marked by more than tint: a fill or outline change plus weight; 44 pt target; tabular counts |
| Soft failures (R1: a "That's all I've got" log) | Neutral styling; a record, not an error |
| Mostly initials, two photos | One avatar system (§9), so it looks designed rather than broken |
| Larger text | Rows grow; side-by-side views stack; headers wrap rather than truncate [HIG-Layout] |
| Empty and loading | Say the state, never flash "No records" before data arrives; teach in context with a direct action [NNg-Empty] |
| Negative, signed or currency values (finance) | §4 rule 12: true minus, fixed decimals on one right edge, gain and loss readable in grayscale; the longest realistic amount fits the hero with air |
| An unavailable item (a sold-out dish, a closed venue, a declined card) | Words plus a shape or weight change, still readable (AA); no alarm red unless the guardrails allow it; the item keeps its place in the list |
| Two people or a cooperative group (a couple's shared goal, a household) | Never rank or race the people: no order by amount, no leader mark, no "ahead" or "behind", no head-to-head bars or side-by-side tracks. The shared number is the hero; each person's part sits in a fixed order (the viewer first, or alphabetical) at the same size, weight and color |

## 13. How to measure

Run these through `scripts/cdp.mjs` (`await b.eval(js)`) at 390 × 844, DPR 2, mobile, as `screen-shot.mjs` sets up;
audit at scroll 0 and again scrolled to the end. **DOM audit** [D]: small targets, overlapping hit areas, text under
13 px, text contrast. It skips the lab's bar, emoji-only text, and pinned bars over rows in another scroll layer; text
over a background image or gradient goes to `checkOnImage` for an eye check.

```js
(() => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { cv.clearRect(0, 0, 1, 1); cv.fillStyle = c; cv.fillRect(0, 0, 1, 1); return [...cv.getImageData(0, 0, 1, 1).data]; };
  const over = ([r, g, b, a], [R, G, B]) => { a /= 255; return [r * a + R * (1 - a), g * a + G * (1 - a), b * a + B * (1 - a)]; };
  const bgOf = (el) => { const layers = []; let img = false;
    for (let e = el; e; e = e.parentElement) { const s = getComputedStyle(e); img ||= s.backgroundImage !== 'none';
      const c = rgba(s.backgroundColor); if (c[3]) { layers.push(c); if (c[3] === 255) break; } }
    return [layers.reverse().reduce((acc, c) => over(c, acc), [255, 255, 255]), img]; };
  const lin = (v) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const layer = (e) => { for (; e; e = e.parentElement) { const s = getComputedStyle(e);
    if (/fixed|sticky/.test(s.position) || /auto|scroll/.test(s.overflowY)) return e; } return null; };
  const name = (e) => (e.getAttribute('aria-label') || e.textContent).trim().replace(/\s+/g, ' ').slice(0, 28);
  const mine = (e) => !e.closest('[data-lab-bar]');   // skip the lab's own chrome
  const out = { smallTargets: [], overlaps: [], smallText: [], lowContrast: [], checkOnImage: [] };
  const hits = [...document.querySelectorAll('a[href], button, [role=button], [role=radio], input, select')].filter(mine)
    .map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.width && r.height);
  for (const [e, r] of hits) if (r.width < 44 || r.height < 44) out.smallTargets.push(`${name(e)} ${r.width.toFixed(0)}×${r.height.toFixed(0)}`);
  hits.forEach(([a, p], i) => hits.slice(i + 1).forEach(([b, q]) => {
    if (a.contains(b) || b.contains(a) || layer(a) !== layer(b)) return;   // a pinned bar over scrolling rows is expected
    const w = Math.min(p.right, q.right) - Math.max(p.left, q.left), h = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
    if (w > 1 && h > 1) out.overlaps.push(`${name(a)} ∩ ${name(b)} ${w.toFixed(0)}×${h.toFixed(0)}`); }));
  for (const el of [...document.querySelectorAll('body *')].filter(mine)) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('')
      .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, '').trim();   // color emoji carry no text color
    const s = getComputedStyle(el); if (!text || s.visibility === 'hidden' || !el.getClientRects().length) continue;
    const px = parseFloat(s.fontSize), large = px >= 24 || (px >= 18.66 && +s.fontWeight >= 700);
    if (px < 13) out.smallText.push(`${text.slice(0, 28)} ${px}px`);
    const [bg, img] = bgOf(el), cr = ratio(over(rgba(s.color), bg), bg);
    if (img) out.checkOnImage.push(text.slice(0, 28));
    else if (cr < (large ? 3 : 4.5)) out.lowContrast.push(`${text.slice(0, 28)} ${cr.toFixed(2)} (${px}px/${s.fontWeight})`);
  }
  return JSON.stringify(out);
})()
```

Tested on R1 screens (it reproduced a critique's overlapping links). Tab labels show under `smallText`; the floor is 11.

**`tnum` probe** [D]: clone a numeral element, set "1,111" and "8,888", and compare widths. Equal means tabular.

```js
const w = (el, t) => { const c = el.cloneNode(false); c.textContent = t;
  c.style.cssText += ';position:absolute;visibility:hidden;white-space:nowrap;width:auto;min-width:0;max-width:none';
  el.parentElement.append(c); const x = c.getBoundingClientRect().width; c.remove(); return x; };
// w(el, '1,111') === w(el, '8,888')  → R1: Inter 42.92 = 42.92; League Gothic 92.19 ≠ 131.75
```

**Hero fit** [D]: `const r = document.createRange(); r.selectNodeContents(el); r.getBoundingClientRect().width` must be
≤ the container's inner width; then confirm the ink edges on the DPR 2 shot (side bearings differ from advance width).

**Eye checks** [S]: grayscale squint (the intended first thing lands first); the settled peak frame at reduced
motion; photos' average RGB against the stated grade; the smallest display glyphs.

## 14. Critique checklist

Every answer is yes, or the "no" is fixed, or explained on the board as a deliberate bend.

1. [D] Targets ≥ 44 × 44, none overlapping; icon-only controls labeled and sized. [S] Own 47 pt status bar; nothing
   tappable in either inset; the last row clears any pinned bar; one primary with a press state; tabs not color-only.
2. [C] ≤ 2 families (+ a digits-only face); text ≥ 13 px (tabs ≥ 11); weights ≥ 400 below 28 px; display glyphs tested.
3. [D] Columns and changing numbers tabular in a `tnum` face (1,111 = 8,888), on digit spans; right-aligned on one grid;
   rank fits a tie. [S] Units 35–50 %, lighter, on the baseline; heroes fit with air; leading 1 on the gutter; commas
   tightened; plain zero.
4. [D] Text 4.5:1 (large 3:1), UI parts and initials as §7. [S] Grayscale squint: the intended first thing wins.
5. [C] Spacing on the declared scale; radii nested by role; one icon family and stroke per surface; no forbidden icons.
6. [S] One grade and crop; one avatar system; text on photos backed; the settled peak frame reads in three seconds
   and meets the peak rule ([method.md](../method.md)), with motion only there, inside `no-preference`.
7. [D] Only the brief's strings, real spaces between inline pieces, no trailing arrows. [S] Every §12 case passes.

## 15. Best-in-class references, by what they teach

These were collected for a social scoreboard (R1), so they lean to scores, activity, habits and social apps. For
another category, the foundations research's domain lane finds 6–10 references of its own; the platform-craft rows
apply to any product.

| Product kind | Reference | Transferable technique |
| --- | --- | --- |
| Scores and live data | Apple Sports [Lickability] [Drang] | The score look comes from one family's weight + width axes, no second face; a bespoke quiet control replaces a default that shouts; favorites first; headers wrap at large text; one shared column grid (its stacked tables misaligned) |
| Scores and live data | Broadcast scorebugs [SVG-Scorebug] [DF-Fox] [KTS] | Hierarchy first ("what's the most important thing they need to read?"); initials + color beat logos at small sizes; solid backing beats transparency; a persistent score element that reconfigures for a story beat and returns; legibility tested at a distance |
| Metric-led health | WHOOP [WHOOP-PDF] [925-WHOOP] | Separate numeral face (DINPro) and word face (Proxima Nova); every color one data meaning; the overview is three numbers, no graphs, at about 72 pt, with depth one tap away; a dark gradient ground (#283339 → #101518), not flat black |
| Activity logging | Strava [Strava-Press] [Griff-Strava] | The hero metric depends on the activity; data and its context on one screen; a signature angle from the logo in icon details; stat trios with a small label over a big tabular value |
| Activity logging | Hevy [SD-Hevy] | A tiny, fast confirmation per log, with the big show saved for milestones; last time's value as ghost text; head-to-head with a friend; a branded loading state |
| Progress and habits | Duolingo [Duo-Blog] | Celebration scales with the win; a share card; a pressable button with a 4 px bottom edge that collapses [Duo-Guide]; reward colors with fixed jobs |
| Progress and habits | (Not Boring) Habits, Gentler Streak [ND-Habits] [GS-BTD] | One press becomes a 6–7 layer event, so make one button physically big and keep the rest calm; progress against your own history, rest days that don't reset: no-guilt framing inside the data |
| Progress and habits | Opal [SD-Opal] | Milestones as a collectible dimensional object, not a badge grid; one composite score; teach in place, not up front |
| Social and group | Partiful [Kaki] | Each event gets a theme and an effect, so rooms feel distinct; a sticker layer; one rotation per screen for collage energy; group-chat microcopy |
| Social and group | BeReal [Spectr-BeReal] | Raw, unfiltered photos as a brand stance; reactions as the social currency, no vanity metrics; pure black as a deliberate identity |
| Tactile utility | Arc [Arc-Inverse] | "Physicality is like a shortcut to joy": grain as a surface (never over numbers), raised pressable primaries, haptic ticks through a wait |
| Consumer marketplace | Airbnb 2025 [INT-Airbnb] | Dimensional 3D art only at the top level (nav, celebration); core rows stay plain; time-aware surfaces ("Today", greetings) |
| Platform craft | Apple Design Awards [ADA-24] [ADA-26-News] | Tide Guide: a palette that follows the sky (a time-of-day tint). Guitar Wiz: Dynamic Type, Increased Contrast and Differentiate Without Color as design. NBA: a scoreboard can be the product |
| Platform craft | M3 Expressive research [GD-Expressive] | 46 studies, 18,000+ participants: key elements spotted up to 4× faster via color, shape, size, motion and containment. But breaking familiar list patterns and removing text labels hurt usability, and a minority preferred calmer versions: license for one big primary and a shape change at the peak, not for scattering the list |

## Sources

- **Apple HIG** [HIG-Layout, -Type, -Tabs, -Sheets, -A11y, -Dark, -Motion, -Buttons, -Materials, -Color, -Images]: https://developer.apple.com/design/human-interface-guidelines/ + `layout`, `typography`, `tab-bars`, `sheets`, `accessibility`, `dark-mode`, `motion`, `buttons`, `materials`, `color`, `images` · [SwiftUI-Numeric] https://developer.apple.com/documentation/swiftui/contenttransition/numerictext(countsdown:)
- **iOS metrics:** [UYL] https://useyourloaf.com/blog/iphone-14-screen-sizes/ (search summary) · [LUI-26] https://www.learnui.design/blog/ios-design-guidelines-templates.html · [LUI-iOS] https://www.learnui.design/blog/ios-font-size-guidelines.html · [LUI-7] https://www.learnui.design/blog/7-rules-for-creating-gorgeous-ui-part-2.html
- **Material:** [M3-Struct] https://m3.material.io/foundations/designing/structure · [M3-NavBar] https://github.com/material-components/material-components-android/blob/master/docs/components/BottomNavigation.md · [M3-Compose] https://developer.android.com/develop/ui/compose/designsystems/material3 · [M3-Color] https://github.com/material-components/material-components-android/blob/master/docs/theming/Color.md · [AOSP-Tokens] https://android.googlesource.com/platform/frameworks/support/+/refs/heads/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ · [GD-Expressive] https://design.google/library/expressive-material-design-google-research
- **Accessibility:** [WCAG-258] https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html · [WCAG-1411] https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html · [WCAG-231] https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html · [APCA] https://git.apcacontrast.com/documentation/APCAeasyIntro.html · [SM-TOI] https://www.smashingmagazine.com/2023/08/designing-accessible-text-over-images-part1/ · [web.dev-RM] https://web.dev/articles/prefers-reduced-motion · [NNg-Empty] https://www.nngroup.com/articles/empty-state-interface-design/
- **Color:** [EM-OKLCH] https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl · [Harmonizer] https://evilmartians.com/opensource/harmonizer · [Atlassian] https://atlassian.design/foundations/elevation · [Netguru] https://www.netguru.com/blog/tips-dark-mode-ui (secondary)
- **Type, space, optics:** [MDN-FVN] https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric · [Fontology] https://www.myfonts.com/pages/fontscom-learning-fontology-level-3-numbers-proportional-vs-tabular-figures · [TypeType] https://typetype.org/blog/numbers-and-numerals-in-typography-basic-types/ · [DS-Space] https://www.designsystems.com/space-grids-and-layouts/ · [RUI] Refactoring UI reader notes https://gist.github.com/selcukcihan/b9418596a98abfcd4bbc622550820cc5 · [Arant] https://adamarant.com/en/blog/optical-alignment-in-ui-7-spacing-fixes-math-gets-wrong
- **Motion and icons:** [Emil] https://emilkowal.ski/ui/great-animations · [Rauno] https://rauno.me/craft/interaction-design · [Lucide] https://lucide.dev/contribute/icon-design-guide · [Griff-Strava] https://griffdesigns.com/strava
- **Scores:** [Lickability] https://lickability.com/blog/apple-sports/ · [Drang] https://leancrew.com/all-this/2024/04/a-tardy-assessment-of-the-apple-sports-app/ · [SVG-Scorebug] https://www.sportsvideo.org/2026/06/09/designing-the-modern-scorebug-how-broadcast-graphics-teams-are-rethinking-the-most-important-element-on-screen/ · [DF-Fox] https://daringfireball.net/2025/02/fox_new_scorebug_graphic_design · [KTS] https://keepthescore.com/blog/posts/score-bugs-in-live-sports-broadcasts/
- **Apps:** [WHOOP-PDF] https://developer.whoop.com/docs/developing/design-guidelines/ · [925-WHOOP] https://www.925studios.co/blog/whoop-design-breakdown · [Strava-Press] https://press.strava.com/articles/strava-launches-redesigned-record-experience · [SD-Hevy] https://screensdesign.com/showcase/hevy-workout-tracker-gym-log · [Duo-Blog] https://blog.duolingo.com/streak-milestone-design-animation · [Duo-Guide] https://blakecrosley.com/guides/design/duolingo (secondary) · [SD-Opal] https://screensdesign.com/showcase/opal-screen-time-control · [Kaki] https://studiokaki.co/partiful · [Spectr-BeReal] https://www.spectr.to/gallery/bereal · [Arc-Inverse] https://www.inverse.com/gear/arc-web-browser-mobile-app-skeuomorphism-design · [INT-Airbnb] https://www.itsnicethat.com/articles/airbnb-app-redesign-140525
- **Awards:** [ADA-24] https://www.apple.com/newsroom/2024/06/apple-announces-winners-of-the-2024-apple-design-awards/ · [ADA-26-News] https://www.apple.com/newsroom/2026/06/apple-reveals-winners-of-the-2026-apple-design-awards/ · [GS-BTD] https://developer.apple.com/news/?id=3m0ht22s · [ND-Habits] https://developer.apple.com/news/?id=9ab1g4r3
- *Measured:* fontTools on `github.com/google/fonts` main (GSUB `tnum`, digit advances at the stated axes) and headless Chrome with the served fonts, 2026-09-25; WCAG 2 ratios recomputed for this file.
