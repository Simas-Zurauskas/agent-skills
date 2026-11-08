# Vernacular and direction library

> Current interpretation: [design diagnostics](design-diagnostics.md) and [execution contract](execution-contract.md) govern. Historical product-specific bans, caps, screen formulas and timings below are examples, not universal requirements. Use only the sections relevant to this product and target.

Read this when you research and propose directions: after the design guidelines exist, before any builder is briefed. It holds (a) the method for finding real-world visual worlds ("vernaculars") that ground original directions, (b) a catalogue of 16 researched vernaculars you can reuse or re-score, and (c) all 18 direction candidates from the first real run as reusable patterns, with what the critic praised and flagged in the ten that were built.

Source run: Repperoni (a private scoreboard for friend crews' group challenges), Round 1, 2026-09-25. Repperoni specifics appear only as labelled examples. In examples, "the personal number" was Sam's total (1,690), "the goal number" was the crew's 10,000, and the three screens were Home, the challenge room and the Finish line (the celebration).

## Contents

1. Why ground a direction in a vernacular
2. Finding vernaculars for a new product (method and ranking)
3. Translating a vernacular into screens
4. Guardrail collisions: devices whose native meaning bites
5. Numerals and font checks
6. The catalogue (16 vernaculars, 3 rejected)
7. Device donors: single devices any direction can borrow
8. Round 1 direction patterns (all 18)
9. What converged across ten directions, and the caps that fixed it
10. Sources

---

## 1. Why ground a direction in a vernacular

- **Generic UI fills every axis a brief leaves open.** A list of things to avoid only moves the model to the next default. The counter is to decide from the subject: "The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from" [A2]. Flighty built on the airport board: "they've had 50 years of figuring out what's important" [F1]. Tide Guide took its palette from the sky, and grug drew its own status bar by hand [ADA26].
- **A vernacular is a reusable system, not a look.** It gives you a grid, a type genre, color habits, a way of setting numbers, a way of making emphasis, and often a native "still in progress" signal. Take the system and leave the props.
- **One device is the signature; the rest stays quiet.** Pick the one device that changes how the key numbers are set or read, and let everything else serve it. If a reviewer can't point to the signature on the screens, the direction failed.
- **Where vernaculars sit in a round.** Example (Repperoni R1): the ten directions came in three families. **A** = the product's own brand world (the marketing site), three takes. **B** = a reference board the client liked, three takes, each naming a "stand-in world" for the photos the product doesn't have. **C** = originals, four, each borrowed from one named real object. Vernaculars drive C and give A and B their one borrowed move.

## 2. Finding vernaculars for a new product

### 2.1 Where to look

Walk the subject's world through these lenses and list 15 to 20 candidates before judging any.

| Lens | Ask | Example (Repperoni R1) |
| --- | --- | --- |
| Places | Where does the activity happen, and where is it talked about afterwards? | Pub, cricket pavilion, five-a-side cage, council pool, a shared flat's hallway |
| Materials | What surfaces are counts written, painted or printed on? | Chalk, painted tin plates, kraft board, felt letters, melamine whiteboard, Tyvek bibs |
| Rituals | Which repeated social moments carry the feeling you want? | Saturday results on TV, the darts caller, the chore rota, swapping stickers |
| Record-keeping and scoring objects | How does that world keep score or keep records? | Tally marks, scorecards, hand-operated scoreboards, league tables with "=3", sticker albums |
| Media and broadcast | How is the score shown to a crowd? | Teletext, the vidiprinter, the TV scorebug, the match-day program |
| Contemporary systems | What current, civic or commercial system organizes similar information? | Transit wayfinding, a bold type specimen, a broadcast graphics package |

For other domains the same lenses give, for example: a finance app's ledgers, passbooks, bank-branch signage, ticker
boards and cheque books; a food app's order tickets, menu boards, market stall chalk prices, recipe cards and delivery
labels. Check each against that product's guardrails (§4): a receipt is fine for finance and was banned for R1.

Include at least one contemporary source per round, so "original" doesn't quietly mean "vintage", and at least one source outside the core audience's stereotype. Example (Repperoni R1): the two C directions added at selection were contemporary (a shared-flat whiteboard, a council pool), and the guidelines listed a netball scoresheet and a bouldering grade board to avoid an all-lads set.

### 2.2 The survey, step by step

1. **Go wide, then write up.** R1 surveyed 19, wrote up 16 and rejected 3 with reasons (§6.17).
2. **Read real sources for each.** Fetch the pages. Mark facts you only have from search-result summaries as *(summary)*, so nobody builds a signature on an unverified detail.
3. **Write each entry in the catalogue format (§6):** the look, 2 to 3 fonts, a 5-color palette with roles and contrast, how it would show the hero number and the peak, fit, and the cliché trap.
4. **Verify every font.** Check the exact family name against the Google Fonts metadata API. Open the font file the CSS API serves with fontTools and check for a `tnum` feature and whether the digits are equal width by default (§5).
5. **Compute WCAG contrast** for every text/ground pair in every palette. Many vernacular colors only work as fills (§3, rule 6).
6. **Run the guardrail-collision check (§4)** and write the safe version of every device you keep.
7. **List the category's default kit** (the 10–15 moves every app in the category makes, and its default home, core and peak screens: [generic-tells.md](generic-tells.md) §2.5). The guidelines turn it into bans and caps, and with no wireframes the default screens are what each screen must differ from.
8. **Map the territory the other families already hold** (their colors, fonts and devices), so an original doesn't become a variant of A or B. Example (Repperoni R1): the pizzeria belonged to A's tokens, so a C pizza-box direction would have been an A variant.
9. **Rank (§2.3) and recommend a set** spread across the round's diversity axes, plus a named swap-in.

### 2.3 Ranking

| Criterion | Scale | What it means |
| --- | --- | --- |
| **Fit** | 1–5 | The product's primary content (for a scoreboard, the numbers) can be the hero. It matches the brand archetype and locale, the age register (not kid-coded unless intended), and not the category's earnest default. It survives the guardrails once the safe versions are applied |
| **Distinctiveness** | 1–5 | Unlike the other families in the round, unlike generic apps in the category, and not worn out recently (risograph 2018–24; split-flap after Vestaboard and Flighty) |
| **Cliché risk** | one line | The main trap, named: what the lazy version of this vernacular looks like |

Verdicts: **Direction** (build a whole direction on it) · **Swap-in** (the replacement if a direction fails critique) · **Device donor** (don't build on it, but its best device can serve any direction, §7) · **Calm reference only** · **Leave to another family** · **Avoid**.

The research ranking is an input, not the pick. Example (Repperoni R1): of the four recommended C directions, two were built (teletext, show card). The tin board was cut as a fourth dark-first variant, and the sticker album for kid risk and a clashing sky blue. The round's diversity caps decided, and two contemporary candidates took their places.

## 3. Translating a vernacular into screens

1. **Borrow the system, not the surface.** NN/g separates skeuomorphism "that supports a metaphor" from decorative realism that clutters [NNG]. Take the grid, type genre, color logic and numerals. Leave out wood grain, chalk dust, CRT glow, tape and staples. Do: a device that changes how the counts are set or read. Don't: props over an app kit, such as a chalk texture behind a default rounded progress pill.
2. **The product's hierarchy beats the vernacular's.** Many vernaculars crown the wrong thing: darts makes "remaining" the hero, show posters bill acts by rank so the bottom rows shrink, league tables color the relegation zone. Keep the spec's order and equal-sized ranked rows. When a vernacular's hierarchy matches (a race bib: your number *is* the hero), that is a gift.
3. **If on-screen strings are fixed, the vernacular speaks through form.** Most vernaculars live partly in their words ("game shot", page numbers, "LIVE! IN PERSON!"). Carry the look through grid, type, color, numerals and material, and put the voice on the board, where it must still pass the brand's voice checks. `text-transform: uppercase` is fine because the string doesn't change. Keep long names in mixed case.
4. **Numbers are tabular or cellular** (§5). A column that jitters, or a count-up that wobbles, breaks a scoreboard.
5. **Motion is budgeted.** Apple: "In apps, generally avoid adding motion to UI interactions that occur frequently … Let people cancel motion" [HIG]. Split-flap cascades, plate flips and ink sweeps belong on the peak screen only, once. Honor Reduce Motion, and make the static frame read completely without the motion.
6. **Vernacular colors are often fills, not text.** Fluorescent pink on white is 3.0:1, weightlifting-plate blue on rubber black 2.6:1, teletext blue on black 2.4:1. Use them as grounds with black or white type, and state the ratios on the board.
7. **Fluorescents are outside sRGB.** A `color(display-p3 …)` value with a hex fallback gets closer on iPhone. That was the researcher's craft suggestion, not a sourced claim. They look duller on Android.
8. **A dark ground carries its material's own hue:** pavilion navy, chalkboard green, felt burgundy, espresso. Use pure #000 only when the vernacular is multi-ink on black (teletext) or the reference system requires it, and say so on the board. Stock near-black (#111, #121212) and "near-black plus one acid accent, with glow" are generic tells.
9. **Zero radius only where the vernacular is made of cells or rectangles** (teletext cells, letterpress forms, die-cut board), with the reason on the board. Otherwise it drifts into the broadsheet cliché.
10. **Texture only if it is the vernacular's material**, behind content, never on text or numbers.
11. **The photo grade comes from the vernacular and is named on the board.** Every direction gets its own. R1 grades: on-camera flash, overcast five-a-side, cold LED floodlight, leisure-center fluorescent, club-room tungsten, platform daylight, letterpress halftone, album studio.
12. **Borrow the system, never the owner.** Use no names, marks or trade dress of the real organization (a broadcaster's service name or page numbers, a sticker publisher, a transit operator's roundel or typeface, a print shop's name), and give proprietary ink names generic labels on the board ("fluorescent pink", not a manufacturer's trade name).
13. **Loud-by-nature vernaculars may run the everyday screens louder**, but the peak must still stand apart from them under the peak rule ([method.md](method.md), screen roles): a slam or burst goes past them, and a quiet peak stands apart through resolution and stillness.

## 4. Guardrail collisions: devices whose native meaning bites

Classic devices often break a social product's rules without looking like it. Check every device you keep against the product's guardrails. This starter list comes from a friendly, no-shaming, no-surveillance group product; other products collide elsewhere (finance: red as judgment, casino and betting cues, ticker urgency; food: diet or calorie shaming, "guilty pleasure" framing), so write the rows your guardrails need.

| Device | Native meaning | Typical collision | Safe version |
| --- | --- | --- | --- |
| Yellow/black hazard stripes | ISO 3864: caution (orange = warning, red/white = danger) *(summary)* | A normal state ("Your turn") reads as danger | Flat fills; never stripes on a state |
| "Good lift" lights; plate colors so "a judge can glance at a bar and confirm the load is legal" [KK]; checklist ticks | Judging, verification | Implies someone verifies users' entries | Color only; no lights, seals or ticks next to a person |
| Race gantry clock, arcade timer, header clock | Time pressure | Invents deadlines the product doesn't have | No clocks beyond the status bar |
| "LIVE" bug, REC dot, jumbotron cameras | A watching audience | Surveillance | Broadcast grammar without the camera |
| Relegation zone, drop lines, red arrows | Shaming the bottom | Spotlights whoever is behind | The last row at the same weight and color as every other |
| Struck-through running totals (darts chalker) | Arithmetic | Crossing someone out | Show the current number only |
| Tale of the tape, head-to-head bars | Fighter comparison | "vs you" comparison | Poster type only; ties shown as the same rank twice |
| Headliner billing (size by rank) | Star billing | The bottom rows shrink | Equal row sizes; scale only on the hero and the peak |
| Rosettes, medals, crowns, "NEW HIGH SCORE" | An individual winner | Breaks a collective win | The group's own line |
| Tickets, dockets, betting slips, bib tear-offs | Proof of purchase | Entries styled as receipts | Never style entries as slips |
| Club crest, varsity letter, pennant | A team badge | A casual group label becomes a team | The label as plain text |
| Cricket "duck", bowling "–", "DNF" | A zero as a joke or a failure | Roasting the person behind | "0" |
| Flames | Heat, hype | Reads as streaks | Hot color instead of flame art |
| Referee or umpire iconography | Authority | A coach with a clipboard | The caller's *voice* on the board, no official imagery |
| "In play" color on individual entries | Provisional | Entries look unconfirmed | Only on a shared running total (§7) |

## 5. Numerals and font checks

Columns must align and numbers must not change width as they change, so check every face you propose before it goes
into a candidate. The measured `tnum` and digit-width facts for about 80 Google Fonts, the glyph traps (DM Mono's
slashed zero, mono commas, the stencil 4, inline cuts closing up, `tnum` spacing hyphens), the hero-fit measurements
and the current family names are in [craft-floors.md](craft-floors.md) §3–§4 (and the probe to run in §13). Re-check
any face not listed there. What only this survey found:

- **Digit cells fix proportional figures by construction.** Split-flap boards, tin plates, LED grids and teletext cells
  give each digit its own slot, which is one reason those vernaculars suit a scoreboard.
- **More faces checked:** Bitcount Single Ink has equal-width digits. Stencil bridges also break *words* below about
  20 px, not only figures.
- **Shantell Sans's bounce axis** reads as kiddie at hero sizes. Hold BNCE at 0–10 and vary repeats through INFM.
- **Reject Datatype** wherever charts are banned: it turns text into charts through ligatures.
- **Measure fitted and full-measure claims in a browser, with the served font, before briefing** (the evidence is in
  [brief-template.md](brief-template.md) §7, Measure).

## 6. The catalogue

**Legend.** Fit / Distinct are the R1 scores for Repperoni (a British-leaning, jokey group-challenge scoreboard); re-score for your product. **Suits** is a judgement about which domains the vernacular could serve, not a sourced claim. **Hero** = how it would set the main personal number; **Win** = the peak frame (R1's celebration). Contrast is WCAG 2.x. More vernaculars appear only as direction candidates in §8: the chalk specials board, the takeaway box, the hand-kept scorecard, the results ribbon, the two-color flyer, the match-day program, the floodlit pitch, the flash snapshot, the lido, the magazine masthead, transit wayfinding, the felt letterboard, the shared-flat whiteboard and the council pool.

### 6.1 Teletext and the vidiprinter · Fit 5 · Distinct 5 · Suits: sport/social, results or price feeds, news
- **Look:** a 40 × 24 character grid in 8 colors [TT]; 2 × 3 mosaic "sixels" in a cell, double-height rows, a 1 Hz flash; a color change uses up a cell, so every colored word has a gap before it [TTA]; four colored Fastext links on a 25th row *(summary)*. The vidiprinter typed results letter by letter [VP], and a score of seven or more was also spelled out [ANM]. Devices: fixed-width columns, colored header bands, everything on the cells.
- **Fonts:** VT323 (equal digits; at 22.4 px it sets exactly 40 columns across a 358 px content width), Jersey 10 (`tnum`, double- and quad-height numerals), Micro 5 (`tnum`, tiny labels).
- **Palette:** screen #000000 · text #FFFFFF (21:1) · numbers #FFFF00 (19.6:1) · structure #00FFFF (16.8:1) · brand band #FF0000 (white on it 4.0:1, so bold 19 px+ or black text) · blue #0000FF as a band only (2.4:1 as text).
- **Hero / win:** the personal number takes two rows, the goal four; the win is an instant page change; an optional 1 Hz flash sits under WCAG's three-per-second limit and is off under Reduce Motion.
- **Trap:** CRT curvature, scanlines, bloom; body text under about 16 px; big fields of full-strength RGB (they vibrate); page-number in-jokes; the broadcaster's service name.

### 6.2 Televised darts · Fit 5 · Distinct 4 · Suits: sport/social, games, hospitality
- **Look:** in the pub a chalker subtracts each visit on a board split down the middle *(summary)*; on TV the caller is the vernacular, delivering scores "correctly — with personality — at great speed!" [SL]. Devices: two columns, the remaining number biggest, three dart slots per visit. Take the broadcast look (black stage, white numerals, one hot color), not the board's red/green/cream.
- **Fonts:** Barlow Condensed (`tnum`; very common, so set 800–900 and tight) or Sofia Sans Extra Condensed (`tnum`); Chivo Mono (`tnum`) for the scoring grid; Caveat Brush for chalk marks only (no `tnum`).
- **Palette:** stage #0E0E10 · numbers #F7F7F2 (17.9:1) · treble red #E4262C (4.2:1, large only) · oche amber #FFB21A (10.7:1) · wire silver #9A9A93 (6.8:1).
- **Hero / win:** the chalker's two columns, personal number biggest; the goal number full width on black, and the caller's "game shot" as voice on the board.
- **Trap:** chalk texture, a dartboard aimed at people, "180!" meme lettering, the referee's bow tie, strike-through history, pint glasses.

### 6.3 The hand-operated tin scoreboard · Fit 4 · Distinct 4 · Suits: sport, clubs and community, rotas, any calm counter
- **Look:** Fenway's wall of slots holds 16 × 16 in and 12 × 16 in plates that an operator pulls and flips; runs in an inning still in play are a **yellow** digit, "replaced with a white number at the end of the inning" [SABR]. Wrigley's 1937 board is "forest green and off-white" and flips "small, painted eyelets (think of them as physical, manual pixels)" [WBEZ]. Village cricket boards hang tins under painted labels *(summary)*. Devices: fixed slots, one plate per digit, stenciled labels.
- **Fonts:** Science Gothic (Bank Gothic basis, `wdth` 50–200, `tnum`, proportional by default) [SG]; Saira Stencil (`tnum`) for slot labels; Sofia Sans Condensed (`tnum`) for text.
- **Palette:** pavilion navy #1B2A41 · plates #F2F1EC (12.8:1) · live lemon #FFD23F (9.3:1) · labels #8A96A8 (4.8:1) · red #C23B22 (4.7:1 on a white plate).
- **Hero / win:** the personal number as big plates, the shared total in lemon while it is still moving; at the win the plates flip and the whole board settles from lemon to white.
- **Trap:** heritage twee (wood grain, bats, bunting, "Keep Calm"), umpire imagery, "duck" for a zero, yellow on individual entries (reads as provisional).

### 6.4 Fight-night letterpress show cards · Fit 4 · Distinct 5 · Suits: events, music, sport, launches, anything allowed to be loud
- **Look:** Globe Poster (Baltimore, 1929–2010) put boxing-poster type on Day-Glo backgrounds from the late 1950s [BTS]: letterpress printed "on top of day-glo screenprint backgrounds", wood type "from incredibly slender to almost comically wide", readable "in three seconds" [GM], and a hierarchy of "the what who when where and how much" [BTS]. Devices: each line set to fill the width, stacked color bands, huge numerals.
- **Fonts:** Anybody (`wdth` 50–150, `tnum`; one family covers the whole wood-type drawer); Special Gothic Condensed One / Expanded One (`tnum`); Bevan (a slab with `tnum`); Libre Franklin for text (the jobbing gothic set beside wood type). Avoid Anton and Bebas Neue (overused; Anton has no `tnum`).
- **Palette:** card #FFFFFF · process black #231F20 (a named printing black, not a stock near-black) · fluorescent yellow #FFF200 (black on it 16.1:1) · fluorescent pink #FF4FA3 (black on it 6.2:1; pink text on white fails at 3.0:1) · fluorescent orange #FF6A13 (black on it 6.6:1).
- **Hero / win:** the number set across the full measure at a narrow width; the win on a split-fountain ground of hard ink bands (a smooth blend reads as a social-app sunset gradient), the number in the expanded cut.
- **Trap:** gloves, blood, flames, "VS" and tale-of-the-tape bars, billing by rank, fake wood grain and grunge, the generic gig poster, the ink maker's trade names on the board.

### 6.5 Sticker album and trading cards · Fit 4 · Distinct 4 · Suits: social and teams, hobby communities, "meet the crew" moments
- **Look:** football albums kept "rows and rows of players in head and shoulders poses" for decades *(summary)*; Mexico 86 had "the cramped grid of the spreads", a restricted palette and "highly-prized foil versions" [CR]; stats moved onto the stickers from 2011–12 [NSS]. Topps 1952 put the first full season stats on the card back, and 1957 set "simple white borders" and the 2½ × 3½ in size [SI]. Devices: name bars, a stat-back ledger, one foil.
- **Fonts:** Saira (`wdth` 50–125, `tnum`) or Mona Sans at `wdth` 75, set upright; Chivo Mono (`tnum`) for card-back stats.
- **Palette:** album sky #8FD0F5 · sticker #FFFFFF · navy ink #14213D (9.5:1 on sky; white on sky fails at 1.7:1) · foil (gold #D4AF37 reads as a trophy; the R1 candidate used flat chrome #C9CED6) · red #E63946 (large only).
- **Hero / win:** the personal number as a big card-back stat; one foil sticker lands on the collective number.
- **Trap:** player-rating cards (rating your friends), holographic rainbows, crests, the leader as the shiny one, numbered empty "need" slots, "album complete", the kids'-game register.

### 6.6 Football fanzine and terrace photocopy · Fit 4 · Distinct 4 · Suits: communities, media, fan clubs
- **Look:** made with "typewriters, glue, scissors, and photocopiers"; one began on "a child's typewriter" with 300 photocopies; the tone is gallows humor and satire [FH]. Devices: typewritten columns, cut-out headline strips, hand-drawn rings and arrows, toner gain, halftone photos, one spot color.
- **Fonts:** Courier Prime (equal digits) for typed text; Rubik Dirt (`tnum`) for headlines; Permanent Marker for annotations only (no `tnum`).
- **Palette:** copier white #F7F7F5 · toner #111111 (17.6:1) · biro blue #1F3FBF (7.8:1) · marker red #D7263D (4.6:1) · highlighter #F4FF3A (ground only).
- **Hero / win:** a typed league table with a hand-drawn ring around the personal number (the type stays largest); the win as a zine cover with a giant cut-paper headline.
- **Trap:** ransom-note letters (they read as a threat), tape and staple PNGs, hooligan imagery, crests, unreadable collage.

### 6.7 Split-flap departure board · Fit 4 · Distinct 3 · Suits: travel, finance and status boards, hospitality
- **Look:** Solari's board *(summary)*; the mechanism "must cycle through intermediate characters", with "a distinct metallic flapping sound" [WSF]; bold grotesk type, white or yellow on black; now common in bars and cafés [OF] and familiar from Vestaboard and Flighty. Devices: fixed-width fields, a hairline split through every character.
- **Fonts:** Archivo (`tnum`, equal digits, `wdth` 62–125, about 80 for flaps); Chivo Mono or Reddit Mono for fields.
- **Palette:** housing #0B0B0C · flap #1A1A1A · characters #F2EFE6 (15.1:1) · amber #FFB000 (9.5:1) · signal red #EB4A2F (4.6:1; light text on it 3.3:1).
- **Hero / win:** the number in big tiles; the win is the only cascade.
- **Trap:** travel words ("Departures", "Delayed" as shame, a "Time" column as a clock), flipping on every change, the quote-board aesthetic, names cut at the field width (wrap them).

### 6.8 Bumper plates and the garage gym · Fit 4 · Distinct 3 · Suits: fitness, strength training
- **Look:** the IWF code is red 25 kg, blue 20, yellow 15, green 10, white 5; the plates share one diameter, so color turns loading "from arithmetic into pattern recognition" [KK]. Rubber floor, steel, stenciled plate numbers.
- **Fonts:** Barlow Semi Condensed (`tnum`), Tektur (`tnum`, `wdth`), Stardos Stencil for labels only (no `tnum`).
- **Palette:** rubber #161616 · red #D22630 (white on it 5.2:1) · blue #0057B8 (fill only; white on it 6.9:1) · yellow #FFC20E (11.2:1) · white #F2F2F2 (16.2:1).
- **Hero / win:** progress drawn as a loaded bar; the win is the bar locked out, with no three white judging lights.
- **Trap:** hazard stripes on states, army stencils, skulls, sweat-and-grit photos, "beast mode".

### 6.9 Broadcast scorebug and lower thirds · Fit 4 · Distinct 2 · Suits: sport, live finance, elections and live data
- **Look:** hierarchy first: "What's the most important thing they need to read? What's the second most?"; a "sports bar test" at 20 yards [SVG]. Team initials in colored boxes are identified more effectively than logos at small sizes, but outlined initials look fuzzy [DF].
- **Fonts:** Hubot Sans (`wdth` 75–125, `tnum`), Reddit Mono (`tnum`), Zalando Sans (`wdth`, `tnum`).
- **Palette:** ink navy #0A1330 · text #FFFFFF (18.3:1) · graphic yellow #FFD60A (13.0:1) · tomato #F0432A (4.8:1) · per-person initials boxes.
- **Hero / win:** a top bug carrying the personal and shared numbers; initials boxes as avatars.
- **Trap:** parallelogram slants, lens glare, "LIVE" dots, a crawling ticker on a busy screen, esports HUDs, fake sponsor bars.

### 6.10 Stadium LED and dot-matrix · Fit 3 · Distinct 3 · Suits: transport, stadiums, games (carefully)
- **Look:** grids of lit and unlit dots in amber, red or green on black; **the unlit dots stay visible**, which shows capacity without a chart. Wrigley's eyelets are the mechanical ancestor [WBEZ].
- **Fonts (display numerals only):** Doto (`ROND` axis), Handjet (`ELSH`, `ELGR` axes), Bitcount Single Ink. None works as body text.
- **Palette:** off #050505 · unlit #1E1E1E · amber #FFB000 (11.1:1) · red #FF3B1F (5.7:1) · green #39FF6A (15.2:1).
- **Hero / win:** dot numerals. A 50-dot track rounds 99.8 % to full, so keep the words "20 to go" (any near-complete progress needs a visible unfinished end).
- **Trap:** cyberpunk bloom, gamer HUDs, kiss-cams (surveillance).

### 6.11 Race bib and finish gantry · Fit 3 · Distinct 3 · Suits: running, events, fundraising
- **Look:** numbers at "minimum 2 inches" tall, readable "from 20 feet away", "sans-serif fonts", "avoid distressed/novelty fonts"; "saturated red backgrounds … swallow black numbers" [BB]. Tear-off tabs, a timing chip.
- **Fonts:** Sofia Sans Extra Condensed (`tnum`), Asap Condensed (`tnum`, equal digits).
- **Palette:** Tyvek #FBFBF8 · numbers #111111 (18.2:1) · wave orange #FF5A1F (black on it 6.1:1) · corral purple #6B3FA0 (white on it 7.4:1) · pin silver #B8BCC2.
- **Hero / win:** the personal number *is* the bib number, a rare case where the vernacular's hierarchy matches the spec.
- **Trap:** the gantry clock, medals, pace and splits, heroic running photography, tear-offs that read as tickets.

### 6.12 Printed scorecard (bowling sheet, tabletop pad) · Fit 3 · Distinct 3 · Suits: games, education, productivity
- **Look:** a printed grid, one player per row, running totals, pencil entries; bowling marks "X", "/", "-" *(summary)*.
- **Fonts:** Public Sans (`tnum`), Zilla Slab (`tnum`), Nanum Pen Script for pencil marks in fixed cells (no `tnum`).
- **Palette:** card #FFFFFF · blue rules #3B6FB6 (5.1:1) · graphite #3A3A3A (11.4:1) · header red #C8102E (5.9:1) · highlighter #FFF59D.
- **Risk / trap:** a per-entry grid becomes a history heatmap (a chart); it can look like the shared spreadsheet users left; "-" on a zero is a mark against a person.

### 6.13 Munich '72 and international sports systems · Fit 2 · Distinct 4 · Suits: civic, wellness, events, calm systems
- **Look:** Aicher's palette was light blue (for peace) with silver, greens and orange, and **no red, gold or black** (Berlin 1936's colors); Univers was chosen as "agile, fresh, light and without pathos", with "no big titles, no bold distinctions" [IDZ]; colors were assigned to roles down to staff uniforms [IDZ]; Aicher was "the inventor of the colourful grey" [INT].
- **Fonts:** Instrument Sans (`tnum`, `wdth`), Schibsted Grotesk (`tnum`); Univers itself is not on Google Fonts.
- **Palette:** #FFFFFF · light blue #6CB4E4 (navy #0F2340 on it 7.0:1; white fails at 2.3:1) · green #4DAA57 (black on it 6.5:1) · orange #F39200 (black on it 8.0:1) · dark blue #1D4E89 (8.4:1).
- **Device:** one color per category or mode. It is weak wherever the brand needs loud numbers and a red.
- **Trap:** sterile Swiss corporate; copying the pictograms (IP).

### 6.14 Risograph and sticker culture · Fit 3 · Distinct 2 · Suits: creative, indie food and retail, events
- **Look:** translucent spot inks that overprint: Fluorescent Pink #FF48B0, Federal Blue #3D5588, Yellow #FFE800, Green #00A95C, Bright Red #F15060, Teal #00838A [STW]; misregistration and grain.
- **Fonts:** Dela Gothic One (`tnum`), Epilogue (`tnum`), Rubik Mono One (equal digits).
- **Palette:** #FFFFFF · pink #FF48B0 (black on it 6.1:1) · federal blue #3D5588 (7.4:1) · yellow #FFE800 · pink × blue overprint about #3D185E (a multiply estimate).
- **Trap:** the default indie look of 2018–24; riso-plus-grain is the "anti-AI seasoning" tell; misregistration on live UI looks like a rendering bug.

### 6.15 Takeaway window and lightbox menu · Fit 3 · Distinct 2 · Suits: food, delivery, hospitality
- **Look:** cardboard "accepts a reduced rainbow of inks: primarily red, green, and black"; the mustachioed-chef cliché; the "design bureau" box loses "a certain folksy *je ne sais quoi*" [SC1][SC2]. Real pizzeria identities pair a workhorse grotesk with one odd display face [FIU].
- **Fonts:** Fraunces (display words only; no `tnum`) [FR], evaluate its product fit and rendered glyphs like any other face; there is no font-name ban list; Familjen Grotesk (`tnum`, equal digits), Yellowtail as a script garnish.
- **Palette:** lightbox black #111111 · menu yellow #FFD100 (12.9:1) · sauce red #E10600 (white on it 5.0:1) · white #FFFFFF · grill orange #FF7A00 (black on it 7.2:1).
- **Trap:** a caricatured chef, flag stripes, Lobster or Pacifico, grease stains.

### 6.16 Arcade high-score table · Fit 2 · Distinct 2 · Suits: games, only where gamification is the point
- **Look:** top-10 and top-20 tables; three-letter initials "as a way to limit obscenities in our game attract mode" [AB].
- **Fonts:** Jersey 15 (`tnum`), Tiny5 (equal digits). Not Press Start 2P: a 1 em-wide cliché that needs 9 px type to fit 40 columns.
- **Palette:** #000000 · #FFFFFF · cyan #00E5FF (13.7:1) · magenta #FF2E88 (6.0:1) · yellow #FFE600.
- **Trap:** synthwave, CRT, "INSERT COIN", "GAME OVER", one winner celebrated over the group.

### 6.17 Considered and rejected (for Repperoni; they may suit another product)
- **Varsity and collegiate:** "heavy, even stroke weight", "chunky slab serifs", the layered "felt patch" outline [MGD]. Rejected as American, crest-like and worn out by fashion. Fonts if it returns: Graduate (equal digits), Squada One, Alfa Slab One (no `tnum`).
- **Betting slips and pools coupons:** gambling associations, and a slip is a receipt.
- **Sports day and the playground:** kid-coded, and full of rosettes and medals.

## 7. Device donors: single devices any direction can borrow

| Device | Source | Use it for | Where it stops |
| --- | --- | --- | --- |
| Yellow while in play, white when settled | Fenway [SABR] | A shared running total in the "in play" color; everything settles at the finish | Never on an individual entry (it reads as provisional) |
| Spell out big numbers | Vidiprinter [ANM] | Voice on the board ("1,000 (ONE THOUSAND)"), applied to everyone | Not on fixed-string screens; never only on the entry you doubt |
| Initials in colored boxes | TV scorebug [DF] | Avatars for people without photos | No outlined initials |
| Every line fitted to the width | Wood type [GM] | Hero and peak numerals across the measure with a `wdth` axis | Not on ranked lists, which keep equal sizes |
| "Read it in three seconds" | Show printing [GM] | The critique test for the peak frame | — |
| One digit per cell | Split-flap, tin plates, LED, teletext | Makes proportional-figure faces behave; a mechanical feel | Animate only at the finish [HIG] |
| One color per role | Munich '72 [IDZ] | One color per category or mode | Never red for a state |
| The one foil | Sticker albums [CR] | The single special surface, for the collective win | Never on a person or the leader |
| Unlit positions visible | LED, Wrigley's eyelets [WBEZ] | Capacity without a chart | 99.8 % still looks full: keep the words "N to go" |
| Colored prompts on the bottom row | Fastext *(summary)* | A two-tab bar with colored keys | Don't fill four slots for two tabs |
| A leader always ends in a number | Specials board (§8, A1) | Price-column alignment for every value | Never lead to a word |
| Your line in color, the others gray | Transit diagrams (§8, C6) | Only the current item carries color, so there's no chip soup | — |

## 8. Round 1 direction patterns (all 18)

**How the candidates were written.** Each candidate filled one schema, and it is worth reusing: group · name · one-liner · thesis ("<Product> as ___, because ___. The question it tests: ___") · lineage (what it takes from the source, what it adds, and the one invariant it bends) · mode · palette (name, hex, role, contrast) · type (family, role, CSS2 family string) · layout concept with its axis positions · ASCII sketches of each screen · one signature element that lands on a number, plus where the wit lives · shape language · texture and imagery, with a named photo grade · one motion moment on the peak screen only, where the reduced-motion frame is the final frame · "not a default because" · risks, including the boring screens (settings, delete account) and the native build cost. Eighteen candidates (5 A, 5 B, 8 C) went to selection, and ten were built under the diversity caps (§9). Critic scores are fidelity / craft / originality / content / board, each out of 10. Names are generalized, with the Repperoni name in brackets.

### A: the product's own brand world

Example (Repperoni R1): kraft, espresso, tomato, cheese and chalkboard green, set in Big Shoulders, Bricolage Grotesque and DM Mono, with tally marks. The three takes had to differ on idea, not arrangement. The site changed mid-run, so the family adopted its new finish, **flood to the celebration color, then set all type in ink**, and V03 was re-inked in the new home palette.

**A1 · Signwriter's specials board** [Repperoni: "Pub Board", built as V01 "Specials board"] · dark
- **Device:** hero numbers lettered in a signwriter's inline (double-stroke) cut; every value hangs in a right-hand price column on a leader rule, and **a leader always ends in a number**. Win: the board floods cheese and every mark goes board green; the finish leader is the room's progress line, now closed, running into the goal number.
- **Type / palette:** Big Shoulders Inline (heroes only, 48 px and up), Big Shoulders, Bricolage Grotesque (tabular figures); board #143f34 · raised #1d5243 · cream ink #f6ecda · sage #a9c2b3 · coral "you" #ff8266 · cheese win #ffc94a.
- **Critic (8/7/7/9/7):** the inline numeral is unmistakable in a thumbnail and the flood is a clear win frame. Flagged: a ragged price column (inline units broke the right edge); DM Mono's slashed zero on the last-place 0; a progress end that looked like a battery icon; leaders that led to words. Renamed from "Pub" because it leaned pub quiz.

**A2 · Two-ink box print** [Repperoni: "Box Lid", built as V02] · light
- **Device:** **one ink + die-lines.** Flat one-color stencil numerals, and dashed die-lines (1 px, 6 on / 4 off) as containment instead of cards: at most five per screen, only between faces, never between entries (they would read as dockets). Zero radius because the board is die-cut, and a second material (the liner) with one job, "the list you read". Win: the lid is the flood, with the goal number knocked out in the liner color.
- **Type / palette:** Big Shoulders Stencil (figures 48 px and up only), Bricolage Grotesque, DM Mono; kraft #efe0c6 · liner #fff8ea · espresso #1d1410 · carton #6b5a4e · tomato #c42e19 · cheese #f2ad1f.
- **Critic (7/6/7/9/8):** the finish is one of the round's strongest frames (tomato lid, the goal number at 143 px filling the measure) and passes the group-chat test. Flagged: the stencil 4 read as a decimal; Home read as an army crate until "Your turn" was printed at title size; the tear strip read as the round's default bar until it became a die-line; a grease-ring prop (cut).

**A3 · Hand-kept scorecard with tally gates** [Repperoni: "Tally Card", built as V03] · light
- **Device:** progress as ten tally gates (five strokes each, 1,000 per gate, stated as non-proportional). The tenth gate is open, with its slash as a dashed outline, and your contribution is the stroke that closes it. One container per screen, meaning "counts are written here", with a boxed total column.
- **Type / palette:** DM Mono (figures only), Big Shoulders, Bricolage Grotesque; as built after the re-ink: paper #f4f2e9 · card #faf9f3 · olive ink #24291f · muted #626657 · cobalt "a stroke that counts" #2947c7 · lime highlighter and win #e5f586.
- **Critic (7/6/7/8/6):** the gates read as a count in about two seconds, with "20 to go" under the open gate. Flagged: the joke was invisible on the finish (all ten gates drawn the same); the mono slashed zero and full-cell comma made the heroes read like a terminal ("1 , 69Ø"). Push: give the tenth gate its own ruled cell, and scale the gates to the full width.

**A4 · Full-bleed results bands** [Repperoni: "Results Band", cut] · mixed
- **Device:** importance means a band that bleeds off both edges; the collective progress band stops 12 pt short of the right edge until the finish, when it bleeds too. One meaning per color: cheese is the crew, tomato and coral are you.
- **Type / palette:** Big Shoulders, Bricolage Grotesque (`wdth` 85 for long names), DM Mono; kraft #f6ecda · espresso band #1d1410 · carton #6b5a4e · tomato #c42e19 (coral #ff8266 on bands) · cheese #ffc94a.
- **Cut:** split luminance, bands and a whole-screen surface at the finish collided with B1, which does it more natively. Risk: a dark band on light paper can read as a "breaking news" warning.

**A5 · Loose two-plate flyer** [Repperoni: "Misprint", cut] · light
- **Device:** an off-register ghost of each hero number and the title in the accent ink, 0.035 em down and right, behind the key plate; a highlighter swipe marks "yours". Win: the plates slide almost into register, and stay a hair off.
- **Type / palette:** Big Shoulders, Bricolage Grotesque, DM Mono; paper #f6ecda · card #fff8ea · espresso #1d1410 · pencil #6b5a4e · tomato #c42e19 · cheese #f2ad1f.
- **Cut:** a third kraft-and-tomato screen, and its rotated hero collided with C3. Kept as "a strong idea to revisit". Risk: the ghost reads as a rendering bug at DPR 1 unless it stays at 0.035 em or less, always behind the key.

### B: a reference system the client supplied

Example (Repperoni R1): a monochrome board (pure #000 and #fff with a slate ladder, League Gothic as the compressed wordmark face, Inter, flat, black pills). Each take kept the invariants, bent one, made its one vernacular move on the numbers, and named the world that stands in for the photos the product lacks. The board never names the reference brand.

**B1 · Program slab with a bite** [Repperoni: "Team sheet", built as V04] · split
- **Device:** a black slab holds the personal number like a program's cover fixture, and the slab's own bottom edge is the progress track: a bite is missing at the right end, directly over "20 to go". On the finish the edge stays at the same y, the bite fills, and the goal number straddles the edge, white on black above and black on white below.
- **Type / palette:** League Gothic `wdth` 80 (wordmark and static heroes), Inter (tabular figures); #000000 · #ffffff · band fill #1d222a · line #e2e8f0 · ink 2 #455162 · band text #94a3b8 (8.19:1 on black; fails on white).
- **Critic (7/7/6/9/6):** the split goal number is memorable and the variant's own. Flagged: Home and the room were the reference kit plus a black header; the room's "tooth" ran backwards from the finish's logic (flipped to a bite); a notch-like tab marker. Review: a group label drawn as an outlined pill reads as a team badge.

**B2 · Dark app, white win** [Repperoni: "Floodlights", built as V05] · dark
- **Device:** **pure black with no accent until the finish**, where the screen flips to white: dark is the app, light is the win. Whisper/shout pairs set a large light Inter (weight 300, only at 28 px and up) beside compressed numerals. Progress is a bank of ten portrait lamp panels: nine lit, the tenth a switched-off screen.
- **Type / palette:** League Gothic `wdth` 75 (numbers only), Inter; night #000000 · raised #141414 · higher #1d222a · floodlight #ffffff · whisper #e2e8f0 · muted #94a3b8 (on the white finish, labels switch to #455162).
- **Critic (8/7/6/9/7):** the flip lands. A white finish beside two black screens is the most legible single idea in the family. Flagged: Home stayed the reference dark kit; the lamps read as a segmented pill bar until redrawn at 22 × 44 px; a tab nub broke "white means lit". Risk: a full-white screen after a dark app can dazzle at night (fade over 400 ms or more, never under reduced motion).

**B3 · One photograph, spent once** [Repperoni: "Flash", built as V06] · light, dark finish
- **Device:** the only photo in the app is the celebration: a full-bleed on-camera flash snapshot falling to a black floor that carries the goal number. It has a named grade (hard frontal flash, blown highlights, fast falloff, phone noise, crooked framing), and photos and initials share one square tile, so initials read as a designed set.
- **Type / palette:** League Gothic `wdth` 100, Inter; page #ffffff · ink #000000 · raised #f1f5f9 · line #e2e8f0 · ink 2 #455162 · muted #64748b (on white only).
- **Critic (5/6.5/5/8.5/6.5), the round's lowest:** the structure was right, but the generated photo didn't read as a flash snapshot, and the photo *is* the signature. Stopgap: a tight crop, a −2.5° tilt, and one radial falloff so the floor is the flash's own falloff, with the number in the hot spot. Lessons: generated action photos are the likeliest thing to look fake, so keep a typographic fallback. Never show a phone aimed at the person exercising (it reads as filming for proof), and check the body diversity of generated groups.

**B4 · One color, one job: what's left** [Repperoni: "Last length", cut] · light
- **Device:** a mono system plus exactly one color whose only meaning is "what's left to the finish". It is absent from Home, appears as a 14 pt unfinished end on the room's progress, and floods the whole screen at the finish: the sliver becomes the field. On Home, a column of counts leads each row where the reference system puts a thumbnail.
- **Type / palette:** League Gothic, Inter; #ffffff · #000000 · #f1f5f9 · #e2e8f0 · #455162 · lido teal #009aa5 (never text: 3.41:1 on white; black on it 6.17:1).
- **Cut:** the teal sat on C5's water, and the takeover repeated B1. The count column was marked worth stealing. The first hue, cerulean #0a93d8, was dropped as iOS system blue.

**B5 · The escalating masthead slot** [Repperoni: "Masthead", cut] · light
- **Device:** one centered slot between two 1 pt rules holds the wordmark on Home, the personal number in the room (the title moves to the nav bar) and the goal number at the finish. The brand gets bumped off its own cover.
- **Type / palette:** League Gothic (the slot only), Inter; #ffffff · #000000 · #f1f5f9 · #e2e8f0 · #455162 · finish sheet #141414.
- **Cut:** too close to B1 (light, same faces, black primary), and the calmest take with the weakest humor. Risk: grouped gray containers slide back into the wireframe's gray cards unless there is one container per list.

### C: originals, each from one real object's system

**C1 · Teletext cell grid** [Repperoni: "Page 302", built as V07 "Forty columns"; renamed because 302 was a real broadcaster's page number] · dark
- **Device:** every glyph sits on one 40-column grid (VT323 at 22.4 px, 8.96 px cells). Emphasis comes only from color (after its blank cell) or from **taking rows**: the personal number takes two, the goal four. Progress is a 40-cell row with 39 lit and one hollow.
- **Type / palette:** VT323, Jersey 10; #000000 · words #FFFFFF · counts only #FFFF00 · structure #00FFFF · "you" #FF00FF (6.7:1) · brand, primary and win #FF0000 (black text on it, 5.25:1) · avatar ground #0000FF (never text).
- **Critic (8/7/8/9/7):** the most systematic variant, it stands apart at 120 px, and the cell row is "the best progress form in the round for the 99.8 % problem". Flagged: the still finish escalated on scale only (fixed with an 8-row red field, the one screen allowed to spend rows on color); pixelated photos read as face-censoring (crop to the face, posterize to the palette, 4 × 2 cells); double-height section heads diluted "rows mean importance". Risks: pixel type fails under about 20 px, so settings need a plain face; 44 pt targets force a two-row pitch.

**C2 · Scoreboard plates, in play then settled** [Repperoni: "The tin board", cut] · dark
- **Device:** one painted plate per digit (radius 3) hung on rails; the running shared total is lemon while in play, and every plate settles to white at the finish.
- **Type / palette:** Science Gothic (`wdth` 120–150, `tnum` on), Sofia Sans; pavilion navy #1B2A41 · slot navy #26395A · plate white #F2F1EC · lemon #FFD23F · stencil gray #A9B4C4 · pavilion red #C23B22 (never text on navy).
- **Cut:** a fourth dark-first variant, and the nearest pair to C1 (dark, British, scoring). Rated the most likely to survive the boring screens.

**C3 · Wood-type fitted lines** [Repperoni: "Show card", built as V08] · light
- **Device:** every display line is fitted to the measure by variable width at one cap height, so a long title goes slender and a short one comically wide. Ranked lists drop to calm equal rows. The win is printed on hard press bands of fluorescent ink, with the goal number rotated 90° up the card.
- **Type / palette:** Anybody (`wdth` 50–150, 800–900), Libre Franklin; white #FFFFFF · process black #231F20 · gray ink #5C534E · fluorescent yellow #FFF200 ("yours", ground only) · pink #FF4FA3 (ground only, P3 value) · orange #FF7A3D (finish only).
- **Critic (8/7/8/9/7):** the loudest direction, and it earns it; every fitted line measured exactly 358 px. Flagged: a smooth fountain gradient read as a sunset social-app gradient (fixed as hard bands); a hole of about 330 px; the rotated comma split "10" from "000"; a uniform dot lattice read as a screen door, not halftone (use an AM screen whose dots follow tone). It has the highest native build cost (variable `wdth`).

**C4 · Two pens and one handwriting axis** [Repperoni: "Hallway board", built as V09] · light
- **Device:** one variable face whose informality axis does the hierarchy: data in tidy print (INFM 0), counts in marker (INFM 70–100, varied per role so repeated glyphs don't match), with tabular figures even in handwriting. It has exactly three marks: one underline (your turn), one ring (your number), and three red passes under the goal number. The tab bar is the pen tray.
- **Type / palette:** Shantell Sans only; melamine #FBFCFB · blue-black marker #1E2330 · red marker #C8202E (brand moments only) · faded ink #5A606B · ruled gray #7A838C · tray aluminum #E6E9EC.
- **Critic (7/6/7/9/7):** the red number inside a black marker ring is the best single frame. Flagged: Home's squint landed on grid lines before "Your turn"; one mark meant two things (the underline meant both "act now" and "current tab"); a polite finish (1.4× the room, same red). Review risks: bounce reads as kiddie, and a ring plus red pen reads as a teacher marking.

**C5 · Equal lanes and a lane rope** [Repperoni: "Deep end", built as V10] · light
- **Device:** the ranked list is seven equal swim lanes, with the rank at the start wall and the total at the far wall. Progress is a lane rope of floats ending in the lane's T: every filled float is one color, with one hollow float before the T. The goal number sits as a depth marking on the waterline, right-aligned on the same far-wall axis as every total.
- **Type / palette (as built):** M PLUS Rounded 1c (numerals only), Atkinson Hyperlegible Next (words); tile white #F4FAF9 · water #2BB3C0 (never text) · lane black #073540 · deep water #2F6A72 · float yellow #FFD21F (fills only, with an ink edge).
- **Critic (6/7/6/8/7):** the rope is a real, ownable progress form. Flagged: yellow floats read as a second state (yellow now appears only at the finish); the lanes read as a list with dotted rules until the standings went into the water; the depth-marking joke never showed. Before the build, review hardened the candidate's pastel aqua #BDEBE8 plus rounded display face (wellness, kids' swim school) into saturated water and dark ink, and reframed the direction as "fair", not "calm".

**C6 · Your line in color, every other line gray** [Repperoni: "Interchange", cut] · mixed
- **Device:** contemporary wayfinding. Slate sign panels serve as section heads, and progress is a route strip with stop ticks and a terminus ring. Only the current item's line has color, and every other challenge is a gray line. The finish is a full line-color field.
- **Type / palette:** Signika (one family, as sign systems use); sign white #F7F8F6 · sign slate #1E2B33 · line magenta #B5145F · muted slate #4E5A61 · route gray #7F8A91.
- **Cut:** the magenta sat next to C3's pink, and it was the likeliest to fail the "too corporate" test. It is strongest on boring screens. Never use an operator's roundel, typeface, departure boards or clocks.

**C7 · Two letter sizes in grooves** [Repperoni: "Felt board", cut] · dark
- **Device:** a visible 28 pt groove grid that every baseline snaps to. Everyday screens have only two letter sizes (one groove, two grooves), and a four-groove big set comes out once, for the goal number, so the size ratio is structural (0.5).
- **Type / palette:** Asap (`wdth` 75 caps for the molded letters, `wdth` 100 for text); felt burgundy #4E1222 · groove #6A2536 (decoration only) · letter white #F6F2EE · worn white #D9B8BF · amber letters #FFC15E.
- **Cut:** a fourth dark-first variant, with the 2016 "Live Laugh Love" letterboard cliché; burgundy can read as a wine bar.

**C8 · Everyone as a sticker, one foil** [Repperoni: "Swaps", cut] · light
- **Device:** every person is a die-cut sticker of one size, with a photo or bold two-letter initials, so a missing photo is a design, not a gap. One flat chrome foil (never gold) is reserved for the collective number. Stickers appear only where a sticker means something: the feed sits on one panel, not a card per row.
- **Type / palette:** Mona Sans (`wdth` 75, upright); album sky #8FD0F5 · white #FFFFFF · album navy #14213D · print navy #3D4A66 · sticker red #D62839 (never on sky) · chrome foil #C9CED6.
- **Cut:** the highest kids'-game risk, it needed new sticker portraits, and its sky sat next to C5. Never: numbered or empty slots, "complete", player ratings, holographic rainbows, the publisher's trade dress.

## 9. What converged across ten directions, and the caps that fixed it

Vernaculars pull toward the same few app defaults unless the round caps them. The counts (progress bars, the
celebration skeleton, flush-left heroes) and the review that found them are in [method.md](method.md) §5.1, and the
caps are in method.md §7. What matters when you propose from a vernacular:

- **Ask each vernacular for its own progress form** instead of a bar: R1's were a lamp bank, a slab's bitten edge, a
  knocked-out slab end, letterpress rule blocks, tally gates, cells, rope floats and a route strip. Keep a bar only
  where its material is the idea.
- **Vary the peak screen's facts** (a sentence, a column of figures, cells), not only its ground.
- **Shared jokes.** Two vernaculars (chalkboard and whiteboard) converged on "the board gets rewritten", each with a
  self-drawing underline. Give every signature one owner, and list the pair among the nearest pairs.
- **Same-family twins.** Two reference-family Homes had identical type scales and state tags. Give each its own rhythm
  and state device, with at least 3 separating axes that are real specs, not labels.
- **Small tells that crept back:** middle-dot meta lines (render them as gaps, columns or weight); a trailing arrow on a
  tag, whether glyph or icon; fade-and-rise as a second motion beat; a vernacular near-black equal to another family's
  token; a third caps role; ink trade names on the board.
- **Unmeasured claims** (fitted type, full-measure numbers, forced line breaks) failed in the browser. Measure before
  briefing (§5).

## 10. Sources

Read in full (through a summarizer) for the vernacular research, 2026-09-25:
- [A2] Anthropic, frontend-design skill: https://github.com/anthropics/skills
- [F1] Apple Developer, "Behind the Design: Flighty" (2023): https://developer.apple.com/news/?id=970ncww4
- [ADA26] Apple Design Awards 2026: https://www.apple.com/newsroom/2026/06/apple-reveals-winners-of-the-2026-apple-design-awards/
- [NNG] Nielsen Norman Group, "Skeuomorphism": https://www.nngroup.com/articles/skeuomorphism/
- [HIG] Apple HIG, "Motion": https://developer.apple.com/design/human-interface-guidelines/motion
- [TT] Wikipedia, "Teletext": https://en.wikipedia.org/wiki/Teletext
- [TTA] Teletext Art, glossary: https://teletextart.co.uk/teletext-glossary-of-terms
- [VP] Wikipedia, "Vidiprinter": https://en.wikipedia.org/wiki/Vidiprinter
- [ANM] Adam's Nostalgic Memories, "Final Score" (2024): https://adamnostalgia.wordpress.com/2024/02/21/more-tv-memories-final-score/
- [SL] Sporting Life, "Counting on the refs": https://www.sportinglife.com/darts/news/counting-on-the-refs/182898
- [SABR] SABR, "Fenway Park's Hand-Operated Scoreboard": https://sabr.org/journal/article/fenway-parks-hand-operated-scoreboard/
- [WBEZ] WBEZ, "The Design of the Wrigley Scoreboard": https://www.wbez.org/curious-city/2015/09/11/the-design-of-the-wrigley-scoreboard-revolutionary-retro-or-both
- [SG] Science Gothic README: https://github.com/googlefonts/science-gothic/blob/main/README.md
- [BTS] Beyond the Streets, "Day-Glo & Go-Go: Globe Poster Corp.": https://beyondthestreets.com/blogs/articles/globe-poster
- [GM] Globe at MICA, "History of Globe": https://globeatmica.com/history-of-globe/
- [CR] Creative Review, Panini's Mexico 86 album: https://www.creativereview.co.uk/panini-world-cup-sticker-album/
- [NSS] nss sports, Panini sticker aesthetics: https://www.nss-sports.com/en/lifestyle/28956/panini-figurine-aesthetic
- [SI] Sports Illustrated Collectibles, 1950s card designs: https://www.si.com/collectibles/the-5-most-beautiful-baseball-card-designs-of-1950s
- [FH] Football Heritage, "Ink, Passion and Protest": https://www.footballheritage.co.uk/ink-passion-and-protest
- [WSF] Wikipedia, "Split-flap display": https://en.wikipedia.org/wiki/Split-flap_display
- [OF] Oat Foundry, Solari board history: https://www.oatfoundry.com/blog/solari-board-rich-history/
- [KK] Knurl Knock, color-coded bumper plates: https://knurlknock.com/guides/color-coded-bumper-plates-explained
- [SVG] Sports Video Group, "Designing the Modern Scorebug" (2026): https://www.sportsvideo.org/2026/06/09/designing-the-modern-scorebug-how-broadcast-graphics-teams-are-rethinking-the-most-important-element-on-screen/
- [DF] Daring Fireball, "Fox's New Scorebug Graphic Design" (2025): https://daringfireball.net/2025/02/fox_new_scorebug_graphic_design
- [BB] Boulder Bibs, "How to Design a Race Bib": https://www.boulderbibs.com/blogs/news/how-to-design-a-race-bib-even-if-you-re-not-a-designer
- [IDZ] otl aicher 100, "The Rainbow Games": https://www.otlaicher.de/en/articles/the-rainbow-games/
- [INT] It's Nice That, Otl Aicher: https://www.itsnicethat.com/features/otl-aicher-design-type-thinking-graphic-design-270622
- [STW] stencil.wiki, "Riso inks": https://stencil.wiki/wiki/Category:Riso_inks
- [SC1] [SC2] Slay Cheese, "The Rich Semiotic History of the Pizza Box": https://slaycheese.substack.com/p/the-rich-semiotic-history-of-the and https://slaycheese.substack.com/p/the-rich-semiotic-history-of-the-605
- [FIU] Fonts In Use, "pizza" tag: https://fontsinuse.com/tags/505/pizza
- [FR] Fraunces README: https://github.com/undercasetype/Fraunces
- [AB] The Arcade Blogger, high-score tables: https://arcadeblogger.com/2021/01/31/anatomy-of-arcade-high-score-tables/
- [MGD] Made Good Designs, "Varsity Fonts": https://madegooddesigns.com/varsity-fonts/

Own checks: the Google Fonts metadata API (https://fonts.google.com/metadata/fonts, 1,946 families on 2026-09-25); the served font files opened with fontTools; WCAG contrast computed for each pair. Facts marked *(summary)* come from search-result summaries only. The Round 1 patterns and critic findings come from the run's direction candidates, round brief, review findings and per-variant build and critique notes.
