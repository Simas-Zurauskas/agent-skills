# Generic tells: the anti-generic reference

Load this when you write a round's guidelines or brief, build a variant, or critique one. A **tell** is a visual
choice that shows up whatever the subject is. Any of them can be right for some brief. When one appears by default, it
shows that nobody made a decision ([A2]). This file lists the tells, gives a better move for each and a way to spot it
in a screenshot, explains when a tell is really a brand trait, and covers the techniques that produce a distinct
identity. Check tags follow the guidelines convention: **[S]** screenshot, **[D]** DOM audit, **[C]** your own code.
The same rules in fill-in form, as they go into a product's guidelines, are [guidelines-template.md](guidelines-template.md)
template §4; the caps that stop a move spreading across a round are in [method.md](method.md) §6–§7.

## Contents

1. Why generated UI goes generic
2. The calibration list: default clusters and their tells, and the category's own default kit (§2.5)
3. Mobile-mockup tells
4. Second-order tells: what critics caught after the obvious ones were banned
5. Borrowed traits: the license and cap mechanism
6. Grounding techniques that produce distinct identities
7. Screenshot checklist
8. Sources

---

## 1. Why generated UI goes generic

| Mechanism | What it means for you | Source |
| --- | --- | --- |
| Distributional convergence | Models sample the high-probability center of their training data. Any axis you leave open drifts to the median: Inter/Roboto, "purple gradients on white backgrounds", predictable layouts | [A1] |
| Typicality is rewarded | "The model is not failing to be original. It is succeeding at being typical." RLHF annotators favor typical output, and averaged visuals feel fluent | [S1] |
| Different models converge too | *Artificial Hivemind* (NeurIPS 2025 best paper, 26K queries): different models give "strikingly similar outputs". Expect ten builder agents from one model to share one set of defaults | [R2] |
| One default spreads everywhere | Wathan apologized for "making every button in Tailwind UI `bg-indigo-500`… leading to every AI generated UI on earth also being indigo" | [W1] |
| Good advice turned into templates | Refactoring UI's tips (borders on top of cards, icons in a tinted shape, box-shadow instead of borders) became today's accent-stripe, icon-tile and soft-card tells | [RU] |
| Bans move the model to its next default | Tell a model to avoid "AI slop" colors and it goes "from its first choice (dark pages with bright green accents) to its next choice (beige backgrounds with bright accents)" | [P1] |
| The anti-slop look is now slop | Beige and cream grounds, rusty orange accents, big italic serifs, letter-spaced subheads, ticker bars | [C1] |
| Nobody made a decision | Design and code happen in one prompt, so the model "defaults its way through the visual layer" | [V1] |

**Evidence that it costs you.** NN/g tested eight AI prototyping tools (Oct 2025) and found output that looked "flat
and interchangeable", with weak hierarchy [N1]. In a blind test with 92 participants, AI prototypes scored positive on
usability and neutral or negative on originality: "usable but conventional" [R1]. Krebs audited 1,590 Show HN pages:
22% heavy slop (4+ patterns), 32% mild, 46% clean. The top tells were a permanent dark theme (34%), gradient
backgrounds (27%) and icon-card grids (22%) [K1]. Chayka: "The second the informed viewer realizes that you fell for
the AI generic, they're turned off" [C1]. Homogenization predates AI: website layout similarity rose 44% from 2010 to
2019 [S1].

**What this means for a round:**
- **Close every axis on purpose.** A brief that leaves palette structure, display width or hero position open gets
  the median on each.
- **Every ban needs a "do instead"**, taken from the subject's world, and a cap on how many variants may make that
  move. A ban on its own just hands the model its next default.
- **Your own worked examples become defaults.** Agents copy examples from the guidelines. Label them "illustrations,
  not assignments", and give any device you name exactly one owner in the brief. Example (Repperoni R1): both worked
  examples in the draft guidelines used per-digit cells, so the review capped cells at one variant and swapped both
  examples.
- **Rules that only restrain produce tasteful, clinical work.** Pair the bans with one positive gate: a test the
  screens must pass, such as "would the target user share this?" (§6.11).

---

## 2. The calibration list: default clusters and their tells

Use these clusters to calibrate: no variant should *be* one of them unless the brief argues for it and adds a
specific twist (§5).

| Cluster | Signature | Why models land here |
| --- | --- | --- |
| **Gen-1 SaaS kit** (2023–25) | Indigo/violet, purple→blue gradients, Inter, dark + neon glow, glassmorphism, centered hero + two buttons + three icon cards | Tailwind UI and Refactoring UI saturated the training data [W1][RU][K1]. Figma's CEO names "purple and blue gradients" as the homogenized default [DF] |
| **Warm cream + terracotta + serif** (Gen-2) | Ground near `#F4F1EA`, accent near `#D97757`, italic high-contrast serif display | The fallback once Gen-1 is banned [P1]. `#D97757` is Anthropic's own UI accent, so in a user's product it reads as a tell [A2][C1] |
| **Near-black + one acid accent** | Near-black ground, one lime/cyan/volt accent, glow, gray body text that barely passes contrast | "Vibe-coded" first choice [P1]. Permanent dark was the top single tell at 34% [K1] |
| **Broadsheet** | Hairline rules, zero radius, dense newspaper columns, applied whatever the subject | The "editorial" escape from the card kit [A2] |
| **SaaS card kit** | Identical rounded cards, one radius, the same soft gray shadow, gradient washes, icon tiles, stat rows | Refactoring UI tips shipped as a component kit [RU][I1] |
| **Template chrome** | Tracked ALL-CAPS eyebrows, `A · B · C` meta strings, `WORD — fragment` labels, `→` on every CTA, mono micro-labels, 01/02/03 markers | Looks "designed" whatever the content is [A2][C1][I1] |

### 2.1 Color and surface

| Tell | Do instead | Check |
| --- | --- | --- |
| Indigo/violet, purple→blue gradients, gradient text or buttons (10.7% of audited sites had purple CTAs) [K1] | Hues from the subject's own inks. Flat fills. A gradient only as a photo scrim or as the vernacular's own blend | [S] Eyedrop the primary and CTA. A blue-violet with no named source fails. Text whose color changes along its length fails |
| Cream + terracotta + serif | Outside a brand that owns warm paper, never. Inside it, see §5 | [S] Eyedrop the ground and the accent against `#F4F1EA` / `#D97757`. If both are close and there is a serif display, you have the cluster |
| Near-black + acid, with glow | A dark ground that carries a named material's hue (chalkboard green, pavilion navy). No yellow-green accent on black. No glow. Show elevation with a lighter surface | [S] Is the dark a neutral gray-black? Is there exactly one saturated accent? Is there a blurred colored halo anywhere? |
| The same soft shadow under every card; colored glows; thin border + wide shadow | One shadow language with a light source you could name, or none | [S] Do all shadows fall one way? Can you say where the light is? |
| Glass or blur as decoration. NN/g: it only works where it builds hierarchy, with 25–100px+ blur and 30–90% fill opacity [N3] | Only in the controls layer over scrolling content, and never as the signature | [S] Is anything blurred with nothing scrolling beneath it? |
| Stock near-black (`#0B0B0B`, `#111`, `#121212`), pure `#000`/`#fff` by accident, gray text on colored fills [I1][A2] | Neutrals tinted from your palette's hue. Pure black or white only on purpose, stated on the board | [C] Grep the CSS for the stock values |
| A timid, evenly spread palette. "Dominant colors with sharp accents outperform timid, evenly-distributed palettes" [A1] | One dominant color, sharp accents, one meaning per color | [S] In the thumbnail, does one color dominate? Can you name each color's single job? |

### 2.2 Type

| Tell | Do instead | Check |
| --- | --- | --- |
| Inter/Roboto/Open Sans/system as the voice. Inter is "a UI typeface… combin[e] it with something interesting" [PM] | A display face whose source the board names (a signwriter's letter, a kit-number cut, a transit sign), plus a text face. Inter only as small UI text | [C] What is the computed `font-family` of the largest text? |
| The LLM font set: Space Grotesk, Instrument Serif, Geist [K1][A2]. Example (Repperoni R1): the guidelines also banned Manrope, Plus Jakarta Sans, DM Sans, Outfit, Sora, Syne, Unbounded, Fraunces, Playfair Display, Archivo Black, Bebas Neue, Anton and Oswald as current generator defaults | Replace "a face with character" (it constrains nothing) with "the board names where the face comes from" | [C] Diff the font links against the ban list |
| One headline word accented (italic serif, color, bold) [A2][I1] | Never. Emphasis goes to the data | [S] Does any headline use two styles? |
| Tracked ALL-CAPS eyebrows. Impeccable finds them on "55–95% of generations" [I1] | A numeric limit: one tracked-caps style per screen, on at most two roles. Section headers in sentence case at heading size | [S] Count the uppercase tracked roles on each screen |
| Mono as a costume on small gray labels [A2] | Mono only where the values are data and the vernacular's numerals really are monospaced. Never in muted ink below 15px | [S] Any mono words? Any slashed zeros ([craft-floors.md](craft-floors.md) §4)? |
| A flat scale: 400 vs 600, 1.5× steps | Extremes (100/200 vs 800/900, 3×+ size jumps) [A1], within Apple's floors: 11pt minimum, 17pt default, thin weights only at large sizes [HIG-T] | [S] Squint: are there only two or three clearly different weights of type? |
| Proportional figures in columns | Tabular lining figures (`tabular-nums lining-nums`) [TN]. Many display faces have no `tnum`, so the CSS silently does nothing | [S] "1,111" and "8,888" are the same width; the column's right edges line up |

### 2.3 Layout and structure

| Tell | Do instead | Check |
| --- | --- | --- |
| Centered hero + two buttons + three icon cards [9S][K1] | Left-aligned, asymmetric composition "feels more designed" [I1] | [S] Is the key block centered with a symmetric row under it? |
| Hero-metric kit: big number, small gray label, supporting stats, gradient accent [A2][I1] | The number is typography. Make the label secondary, or drop it: "make it secondary to the value" [RU] | [S] Is there a giant number + tiny label + 3-up row? |
| KPI or stat banner rows ("everything equal") [K1][I1] | One headline number and one progress line | [S] Are there several equal-weight numbers in one row? |
| Cards everywhere, cards in cards [I1] | Separate with space, tone and type first. A container has to mean something | [S] **If space alone could replace this container, remove it** |
| Identical grids and one gap everywhere [I1] | Vary rhythm on purpose. Space around a group > space inside it | [S] Blur the screen: are the gaps all equal? |
| 01 / 02 / 03 markers on non-sequences [A2] | Number only real sequences (ranks, steps) | [S] Is every numbered thing a real order? |
| Side-stripe accents: "almost as reliable a sign of AI-generated design as em-dashes" [K1]. Icons in tinted squares [I1] | Carry state with words and with the row's own shape | [S] Any colored left border? Any icon in a tinted square or circle? |
| Template chrome: `A · B · C` meta strings, `WORD — fragment` labels, `→` on CTAs, ticker bars [A2][C1] | Render joined data as structure (a gap, a column, a weight change). Add no new dot-joined strings. No trailing arrow, glyph *or icon*, on buttons or tags | [D] Count rendered U+00B7 and U+2192 |
| One radius everywhere, nested radii that don't line up [A2][CR] | Radius roles (§6.6) | [S] Do inner corners sit concentric inside outer ones? |
| Every button primary; modals as the default container [I1] | One primary per screen | [S] How many filled buttons does each screen have? |

### 2.4 Icons, imagery, motion, copy

| Tell | Do instead | Check |
| --- | --- | --- |
| Emoji as UI icons [K1][V1] | Emoji only as content | [S] Any emoji in navigation or headers? |
| "Thin, interchangeable line icons that could illustrate any product" [9S], one beside every label | Fewer icons (Linear cut them in its 2026 refresh [L1]). Stroke weight matched to the type weight | [S] Count the icons. Would the screen lose anything without half of them? |
| Stock 3D or Corporate Memphis figures [CM] | Typographic and graphic devices from the vernacular, or a bespoke system (Airbnb's in-house 3D icons [AB]) | [S] Could this art sit in any app? |
| Decorative sparklines; a pulsing "live" dot on static data [I1] | Charts only where they carry data | [S] Does the chart say anything? |
| Fade-and-slide-up on every section, bounce or elastic easing [A2][I1] | One orchestrated moment, on the screen that earns it. No fade-up as a secondary beat either | [C] Any opacity + translate entrance keyframes? |
| Weightless copy: "Build faster. Ship smarter." [9S] | Real strings. Buttons say what happens | [D] Diff the strings against the content spec |
| Grain, paper or riso texture as "anti-AI" seasoning. It is the 2026 human-made counter-trend, so it is becoming a default too [LM] | Texture only when it is the material of the idea (§6.8) | [S] Take the texture away. Does the idea survive? |

### 2.5 The category's own default kit

Every category has a default look its apps share, and a model reaches for it as soon as it knows the category. It is
a cluster of its own: a savings app can pass §2.1–§2.4 and still be a progress ring on mint with a piggy bank.

| Category | Its default kit (a starting list, not a survey; the domain research replaces it) |
| --- | --- |
| Finance, saving, budgeting | A progress ring or donut round the balance; mint or teal "money green", green up and red down; piggy banks, jars, coins, house or key illustrations; a goal card with a stock house photo; confetti at the goal; "You're on track!"; a pastel card per goal; a big balance over a sparkline |
| Fitness, habits, social challenges | Streak flames and day counters; activity rings; confetti, badges and trophies at milestones; gold, silver and bronze leaderboards; neon on black; motivational slogans |
| Food and delivery | Warm-lit hero food photos; an appetite orange or red; rounded cards with a star rating and a delivery time; emoji category chips; a promo carousel; a friendly mascot |
| Productivity and tasks | Checkbox rows struck through when done; a blue or indigo accent; a completion ring or percentage bar; kanban cards; an "all done" illustration of a person at a laptop |

- **Research it (the domain lane).** Look at the top 8–10 apps in the category (store charts, award lists, design
  galleries) and list the **10–15 moves every app in the category makes**, each with its layer (color, form, imagery,
  copy, motion) and the screen it lands on; a move counts when about half the apps make it. Also describe the
  category's **default home, core and peak screens** in a few lines each (layout, hero, progress form, how the peak is
  marked). When the product has no wireframes, these stand in for them in every "differs from its wireframe" check.
- **Turn it into rules (the guidelines writer).** A move with no job in the content (a piggy bank, coins, confetti at
  the goal, "You're on track!") becomes a row in [guidelines-template.md](guidelines-template.md) template §4.4: the
  move, and a do-instead from the product's own world; copy moves also join the banned words (template §5.9). A move
  the content needs in some form (a progress form, the category's color, a goal card) is capped, not banned: a template
  §6.4 row, 1 for a signature form and about N/3 for a common one ([method.md](method.md) §7). The category's default
  peak (confetti, a trophy, a "Goal reached!" banner) is the trap for every peak mode, the quiet one included.
- **Check it** [S]. Describe the screen in plain words to someone who knows the category, without the variant's
  vocabulary. If the first words are the category's kit ("a savings app with a ring"), it is the default.

---

## 3. Mobile-mockup tells

The sources above mostly describe web pages. This list applies them, with Apple HIG, to phone screens.

| Tell (why it gives the mockup away) | Do instead | Check |
| --- | --- | --- |
| **Fake status bar at 9:41** (Apple's keynote time since 2007 [941]), with icon-font glyphs at the wrong size, a 100% battery, a color that fights the header | Draw it per variant in the variant's colors, with the iOS layout (time leading, signal/wifi/battery trailing, clear of the island [HIG-L]), at a time that fits the story. It can be in-world: grug won an ADA with a hand-drawn status bar [ADA26] | [S] Does the clock contradict the content ("Evening" at 9:41)? Are the glyphs stock in an otherwise hand-built world? |
| **The greeting blown up as the H1** | The greeting is never the largest or heaviest type. The eye lands on the actionable row first | [S] Squint: where does the eye land? |
| **Identical list rows** (avatar + two lines + chevron whatever the state). Real data breaks them [D1] | Let state and mechanic shape the row. Design for the longest name first | [S] Cover the text: can you still tell rows of different kinds apart? |
| **Overlapping avatar facepiles** | Counts stay text | [S] Any stacked avatars? |
| **One radius, pills inside pills**, inner radius = outer | A radius hierarchy, nested concentrically (§6.6) | [S] Zoom on a nested corner |
| **Tab bar padded with icons, or a "+" in the middle.** HIG: "Use a tab bar to support navigation, not to provide actions"; single-word labels; filled symbols [HIG-TB] | Only the tabs the spec has, labeled. Put actions in the header. Show selection with more than color | [S] Count the tabs. Is any tab an action? Is selection visible in grayscale? |
| **A stock segmented control** for in-screen tabs | The variant's own tab form | [S] Is it the platform's gray pill? |
| **Gradient CTA, a glow, or every button primary** | One primary per screen, marked by fill and shape. M3 Expressive's winner was a larger key action in a secondary color near the thumb [G1] | [S] Count the primaries |
| **Full-width accent CTA with a soft drop shadow** | Prominence from fill and shape, never from a blurred shadow | [S] Is the CTA lifted by blur? |
| **Stock 3D, Memphis people, emoji in a square** [CM][V1] | Typographic and graphic devices from the vernacular, or the product's own photos | [S] Could this art sit in any app? |
| **Emoji as chrome** [K1] | Emoji only where they are the product's content (reactions, say), at legible size, treated as data | [S] Any emoji outside the content? |
| **Chip soup**: five states as five colored pills [I1] | One state device per list, at most two hues carrying meaning, some states as plain words | [S] Count the hues that carry state |
| **Hero-metric kit, gradient number** | The number is typography, with tabular lining figures and a real unit. Apple Sports gets its drama from bold, compact-width numerals [LK] | [S] Is the number gradient-filled or boxed? |
| **Default progress pill at 99.8% with "99.8%" beside it** | Say what is true (R1: "20 to go"), drawn in the variant's own form, with an unfinished end you can see. At 99.8% a proportional gap is under 1px on a phone track, so draw a non-proportional end of 8px or more and say so on the board | [S] Is it a rounded bar + percentage? Can you see that it isn't finished? |
| **Confetti + trophy + "Congratulations!"** | Mark the peak in-world, in the variant's assigned peak mode (quiet is valid: [method.md](method.md), the peak rule), with the number as the object and at most one orchestrated moment [A2] | [S] Would the peak fit any app? |
| **Glow dark mode, glass over nothing** [I1][N3] | Dark only if it is the idea, glass only over scrolling content | [S] See §2.1 |
| **9–10px mono micro-labels** | Text at 13px or more, 11 only for tab labels ([craft-floors.md](craft-floors.md) §3; iOS's own minimum is 11pt [HIG-T]). Mono only on data | [D] Smallest computed font-size |
| **Initials on gradient circles** [K1] | Initials on flat fills from a fixed tonal set, with the same shape and ring as photo avatars | [S] Is the most "default app" object on screen an avatar? |
| **Content hidden under the pinned CTA, tab bar or home indicator** | Pad the scroll by the pinned bar's height; respect the safe area [HIG-L] | [S] Shoot scrolled to the end: does the last row clear the button? |
| **Icon confetti**: a Lucide icon beside every label at stroke 2 [9S] | Few icons, stroke matched to the type, icon-only controls labeled | [S] Count the icons |

---

## 4. Second-order tells: what critics caught after the obvious ones were banned

In Repperoni R1 the guidelines banned everything in §2–§3, and all ten variants avoided the Gen-1 and Gen-2 clusters.
The critics still found tells. These patterns are where generic output hides once the first-order list is enforced,
so look for them on purpose.

| Pattern | What it looks like (Example, Repperoni R1) | How to check |
| --- | --- | --- |
| **A renamed default.** The brief's vocabulary disguises a stock component | "Floats" rendered as filled status pills. A "bank of floodlight lamps" rendered as ten equal full-round pills, which read as a stories bar or stepper. "Hand-ruled" lines with under 1px of drift, which read as a bordered table. A wireframe's icon-in-circle with the corners squared | [S] Describe the screenshot in stock-component words, without the variant's vocabulary. If the description is "status pill", "segmented progress", "bordered table", it is the default |
| **A tell swapped for its neighbor** | Middle dots removed, then a bold-word + gray-words pattern on every meta line (8 times on one screen). A banned `→` glyph redrawn as an arrow icon on a tag: letter of the rule met, point missed. Fade-up removed as the entrance, then kept as the second beat of the celebration | [S] Is any small pattern repeated on every row? A ban covers the *look*, whatever draws it |
| **A device on every row becomes chrome** | Eleven leader rules on one Home, four of them ending in words, not figures. Fifteen dotted "rope" dividers where space already separates the rows. A 2pt rule stacked on top of a heavy title | [S] Count each ornament per screen. Keep it where it means something and remove it where space does the job |
| **A UI-glyph collision** | A full bar with a small outlined end box, right under a status bar that draws a battery, reads as a battery. A 3 × 28px nub under the current tab is Material's default indicator | [S] Does any custom mark look like a system glyph nearby? |
| **A device keeps its native meaning** | A monospace face's slashed zero on a last-place "0" reads as a struck-through or empty-set zero. Pixelated faces read as TV censorship. A red-pen ring reads as a teacher marking work. A handwritten chores rota reads as a parent's fridge chart, a named anti-persona | [S] Ask what the device means in its own world, and whether that meaning breaks a product rule |
| **A slide into the adjacent generic register** | Teletext inks on black edging towards synthwave at thumbnail size. Kraft plus stencil caps reading as a shipping label. Ruled rows everywhere reading as a spreadsheet. Pixel numerals at hero size reading as an arcade HIGH SCORE (gamification). A smooth pink→orange→yellow ramp reading as the sunset social-app gradient. A uniform dot overlay passed off as halftone. A level, centered, posed-from-behind photo reading as lifestyle stock | [S] At 120px, which genre does it read as, the vernacular or its nearest cliché? |
| **A licensed kit carrying the screen** | A family's allowed card kit, slate grays and Inter, with only three numerals of the variant's own: "Home is the wireframe in black" | [S] Desaturate the screen and compare it with the wireframe (with none, the category's default screen, §2.5). If the composition matches row for row, the variant only recolored it |
| **Leftover defaults at the edges** | Stock signal/wifi/battery glyphs in a hand-built world. Gray-disc initials next to fluorescent bands. A standard app bar in the brand color. The wordmark in the text face. One white r12 card on a colored band. Rank numbers in dark rounded squares (cousins of icon tiles) | [S] Scan the status bar, the header, the avatars and the tab bar last. These are the most-copied parts |
| **Over-marking the wrong thing** | A "yours" reaction chip marked three ways (fill, ring and weight) became the loudest object on a row, on the one reaction that must not look like a verdict | [S] Squint: does the emphasis land on what the product wants emphasized? |
| **Convergence across the round** | Each variant chose alone, and still most of the round drew progress as the same thin bar, gave the peak screen one shared skeleton and set the hero flush left (the counts are in [method.md](method.md) §5.1). Each is fine alone. Together they became a house default | [S] Look at the by-screen strip (ten of each screen side by side). Any device in more than a third of the variants gets a cap in the brief, and the matrix gets one column per screen type |

---

## 5. Borrowed traits: the license and cap mechanism

Some tells are the product's real brand. Example (Repperoni R1): the shipped marketing site really is warm paper, mono
labels and dot-joined meta. Treat a trait as a brand choice only when it passes all of these tests. Otherwise it fails
like any other tell.

1. **Ownership.** The trait exists in the product's own shipped assets (a site, a brand doc, a token file), or in
   the *system* of the vernacular the variant names. Cite the file or the object. "It looks premium" is not ownership.
2. **Scope.** The license names who may use it (one family or one variant) and which roles it may play. Everyone else
   is refused.
3. **Numeric limits.** A wordy license gets stretched to cover everything, so write it in numbers. Example
   (Repperoni R1), three licenses the review had to tighten:
   - "Uppercase on labels of three words or fewer" covered every label in the spec, so the eyebrows survived. It became
     one tracked-caps style per screen on at most two roles, with section headers in sentence case.
   - "Mono where the vernacular is typed or cell-based" covered most vernaculars. It became digits, ranks and
     initials only, 13px or larger, never muted below 15px, and at most one original variant.
   - A family invariant that licensed rounded gray containers turned into the card kit with nothing inside. It became
     at most one gray-fill container type per screen, never one card per feed row, plus the "could space replace it?"
     test.
4. **A twist that moves it off the cluster.** Pair the trait with a second material or a specific detail, so it reads
   as the subject and not as the default. Example (Repperoni R1): warm paper stays *kraft* (browner, fibrous, darker
   than cream), the red stays a saturated tomato and never drifts towards clay `#D97757`, the display face is condensed
   and never a serif, and tally marks do actual counting instead of acting as a border ornament.
5. **A round cap.** Count how many variants use the trait or device, and cap it in the brief before any build. Any
   device you mention as *permitted* ends up in every variant unless it is capped. How to set caps, and R1's full
   list for 10 variants, are in [method.md](method.md) §6 (axis caps) and §7 (capped devices). Exempt a family's own
   invariant from the cap it would otherwise use up.

6. **Stated on the board.** The variant's board lists the borrowed traits it uses, and the 2–4 defaults it was
   tempted by and refused. Zero radius, pure black/white and non-proportional progress each get a line saying why.
7. **Still run the thumbnail check.** A license does not make you immune: a licensed dark multi-ink vernacular can
   still read as synthwave at 120px. When it does, tighten the execution instead of hiding behind the license.

---

## 6. Grounding techniques that produce distinct identities

A list of bans pushes the model to the next default [P1], and "more prompting sophistication, temperature increases,
or asking the model to 'invent' brand identity" doesn't work [S1]. What works is making decisions, taken from the
subject.

**6.1 Subject vernacular: borrow the system, not the surface.** "The subject's industry, subject matter, materials,
and vernacular are where distinctive visual choices come from" [A2]. Flighty (ADA 2023) modeled itself on airport
boards: "they've had 50 years of figuring out what's important" [F1]. At ADA 2026, Tide Guide won Visuals with a
sky-matching palette, Katha Room built its UI on the Gond art form, and grug won Delight & Fun with a hand-drawn UI
[ADA26]. Sleeper's trash talk is the product, with chat on almost every screen [SL]. Take the object's grid, type
genre, color logic and how it sets numbers. Leave out its props (wood grain, chalk dust, CRT glow, tape): NN/g
separates skeuomorphism "that supports a metaphor" from decorative realism that clutters [NNG]. Before you commit, check
what each device means in its own world (§4): hazard stripes mean caution, and a headliner bill shrinks whoever is
last. Borrow a vernacular's system, never its owner's identity (trade names, marks, trade dress).

**6.2 One bold idea, the rest disciplined.** "Spend your boldness in one place… keep everything around it quiet"
[A2]. Linear 2026: "not every element of the interface should carry equal visual weight… Structure should be felt not
seen" [L1]. Not Boring: "If it can't be better *because* of design, it doesn't ship" [UX1]. State the idea in one
sentence on the board and land it where the product's key data is. If you can't point to it on every screen, the
variant has no idea.

**6.3 Type as the design.** "Use the type treatment itself as an active part of the design, not a neutral delivery
vehicle": one or two families, clearly distinct if two [A2]. Use big steps in size and weight [A1] within the platform's
floors [HIG-T]. Apple Sports gets its drama from bold compact-width numerals on the variable width axis, in a dense
grid [LK]. Set columns in tabular lining figures [TN], and measure hero numbers in the browser rather than copying a px
figure, because the width moves with `wght`, `wdth` and `opsz`. Example (Repperoni R1): two briefs promised a "stacked" hero and "slender" fitted
titles. Measured with the served fonts, the number fit on one line and the titles came out at similar widths, which
would have erased both signatures had the review not caught it.

**6.4 Real content, real stress.** "Lorem ipsum as a placeholder practice is as dead as Latin" [N2]; Dribbble shots
break once "company names and job titles that vary in length" appear [D1]. Give every variant the same stress strings: the
longest name, a tie, a zero, a removed member, an almost-finished bar, a tiny log (R1's set; a finance app adds a
negative balance and a long amount, see [craft-floors.md](craft-floors.md) §12). How a variant handles them is often
its most designed moment. Never swap them for tidier data.

**6.5 Structure is information.** Outlines, numbering, eyebrows, dividers and labels should "encode useful
information about the content rather than decorate it" [A2]. Ranks are a sequence, so number them proudly. Section
headers are not, so they get no 01/02.

**6.6 A radius hierarchy.** Use two to four radius values, each with a role (sheet → container → control → chip),
nested concentrically: inner = outer − padding [CR]. iOS 26 formalizes concentric corners that match the hardware
[LG]. Radius is personality: large reads as playful, none as serious, and mixing without a rule looks incoherent
[RU]. Zero radius is a valid choice when the vernacular is made of cells, with the reason on the board.

**6.7 Color with a point of view.** A dominant color plus sharp accents, in CSS variables [A1]. Neutrals tinted
from the palette's own hue [I1]. Take hues from the subject (Tide Guide's sky [ADA26]); assign palette *structure*
per variant (mono, dominant + accent, two-ink, multi-ink, tonal) so the round doesn't share one skeleton. Rotating a
hue across variants produces generated-looking palettes. Vernacular inks are often fills, not text colors, so check
contrast before setting type in them.

**6.8 Texture with a purpose.** Use texture only when it is the material of the idea, behind content, never on text
or numbers, and one object texture per screen at most. Apple Sports' tiled cloth texture works because cloth is the
kit [LK]; grain as "anti-AI" seasoning is the next default [LM].

**6.9 Restraint.** "Remove one accessory" (Chanel, via [A2]). Linear's refresh dimmed the sidebar and cut icons: "If
most people don't immediately notice what changed, that's probably a good sign" [L1]. Restraint is a direction too,
but the *copied* Linear look (dark, gradients, glass) is a default [LR]. Every Repperoni R1 critique ended with one
"remove one" item, and each was an ornament that did no work (a blurred smudge, a tab nub, dividers where space
sufficed, an icon doubling the words).

**6.10 Expressive where it serves the key action.** Google's M3 Expressive research (46 studies, 18,000+
participants) found key elements spotted up to 4× faster and preference up to 87% among 18–24s. It also found the
failure case: a playlist concept that scattered album art instead of a list "suffered" on usability [G1]. Spend the
expression on the primary action, the user's own row and the peak (in its assigned mode). Keep lists as lists, tabs as
tabs and Back as Back.

**6.11 Process habits that beat the median.**
- **Artifacts over adjectives.** Hand-set the tokens, palette and first screen: "Models mirror the project they are
  dropped into far more faithfully than they follow abstract instructions" [S1]. Turn adjectives into elements ("the
  red only on the one action and the user's number", not "energetic").
- **Generate many, reject the conventional.** Ask for several directions, name the most conventional and drop it:
  Becker reports 1.6–2.1× more diversity [S1]. Flighty works to 20 concepts per phase [F1].
- **Write the plan, then test it against the defaults.** Write 4–6 named hex values, the faces and their roles, and a
  layout concept. "If any part of it reads like the generic default… revise that part" [A2].
- **One hand-made element per screen:** a drawn glyph, a custom counter or progress, an in-world status bar [S1].
- **One positive gate.** Example (Repperoni R1): the brand's anti-personas as pass/fail questions (would a manager
  post it in the office Slack? would a trainer post it as motivation? would a guy send it to four mates?), plus the
  board naming where the wit lives in the visual system.

---

## 7. Screenshot checklist

**Shoot so the tells show.** Screens at true phone size (390 × 844) at DPR 2, top and scrolled to the end. The
peak screen also with `prefers-reduced-motion: reduce` forced, since that frame is the one people judge. Then derive
four views: a blurred squint copy, a grayscale copy, a 120px thumbnail (in color and grayscale), and the wireframe
(with none, the category's default screen, §2.5) beside the grayscale. At round level, add the by-screen strip (every variant's version of one screen side by side).

Every answer should be **yes**. A "no" is fixed, or explained on the board if it is a deliberate, licensed bend (§5).

**Clusters and color**
- [ ] [S] No variant *is* a cluster from §2 (Gen-1 kit, cream + terracotta + serif, near-black + acid, broadsheet, card kit, template chrome, the category's default kit), except a trait licensed under §5.
- [ ] [S] No indigo/violet without a source, no gradient text or buttons, no glow, no blur over nothing.
- [ ] [C] No stock near-blacks. Neutrals are tinted from the palette. Pure black/white only on purpose.
- [ ] [S] One color dominates the thumbnail, and each color has one stated job.

**Type and numbers**
- [ ] [C] The voice is a named display face, not Inter/Roboto/system or the LLM set.
- [ ] [S] No accented headline word. One tracked-caps style per screen, on ≤ 2 roles. Section headers in sentence case.
- [ ] [S] Mono only on data, no slashed zero on a sensitive number. Nothing below the size floor.
- [ ] [S] Number columns are tabular (1,111 = 8,888) and right edges align.

**Structure**
- [ ] [S] Squint: the eye lands first on what the product wants (the actionable row, the key number).
- [ ] [S] Every container survives "could space replace it?". Radii nest by role. Shadows share one light, or there are none.
- [ ] [S] Numbering only on real sequences. No side stripes, icon tiles, facepiles or chip soup (≤ 2 state hues).
- [ ] [D] No new U+00B7 strings, no `→` or trailing arrow icon on buttons or tags.
- [ ] [S] Rows of different kinds read differently with the text covered.
- [ ] [S] One primary per screen, marked by fill and shape, not a blurred shadow.

**Mobile chrome**
- [ ] [S] The status bar is drawn by the variant, at a time the story allows, with glyphs that match its world.
- [ ] [S] Only the spec's tabs, labeled, with no action in the bar. Selection is visible in grayscale.
- [ ] [S] The last row clears the pinned action and the home indicator.
- [ ] [S] No emoji as chrome, no stock 3D or Memphis figures, no gradient initials, no confetti + trophy.

**Second-order (§4)**
- [ ] [S] Described in stock-component words, nothing is a renamed default.
- [ ] [S] No small pattern repeats on every row. Each ornament is counted, and justified where it stays.
- [ ] [S] No custom mark looks like a nearby system glyph. No device's native meaning breaks a product rule.
- [ ] [S] At 120px it reads as its vernacular, not the nearest cliché.
- [ ] [S] Desaturated, each screen differs from its wireframe (with none, the category's default screen, §2.5) in composition, not only in color.
- [ ] [S] "Remove one accessory": with the least necessary ornament gone, the screen is as good or better, so leave it off.

**Authorship and round**
- [ ] [S] The board names the vernacular source, the one idea (visible on every screen) and the defaults it refused.
- [ ] [S] At least one hand-made element per screen. The stress strings are handled on purpose.
- [ ] [S] The positive gate passes: the target user would share it (or the product's own gate, from its guidelines).
- [ ] [S] In the by-screen strip, each variant is recognizable from its thumbnail; no device appears in more than its cap. Any pair that reviewers rate 5 or more on a 1–7 similarity scale is revised or cut.

---

## 8. Sources

- [A1] Anthropic Applied AI, "Improving frontend design through Skills", Nov 2025. https://claude.com/blog/improving-frontend-design-through-skills
- [A2] Anthropic, `frontend-design` skill, 2026. https://github.com/anthropics/skills
- [C1] Kyle Chayka, "The generic style of AI web design", Jun 2026. https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design
- [S1] Sascha Becker, "Same Same but Different: The Anatomy of AI Design Sameness", Jun 2026. https://saschb2b.com/blog/same-same-but-different
- [K1] Adrian Krebs, "Scoring Show HN submissions for AI design patterns", Apr 2026. https://www.adriankrebs.ch/blog/design-slop/
- [I1] Paul Bakaus, Impeccable anti-patterns catalogue. https://impeccable.style/anti-patterns/
- [N1] NN/g, "AI Prototyping in Real Design Contexts", Oct 2025. https://www.nngroup.com/articles/ai-prototyping/
- [N2] NN/g, "Promptframes" (summary level). https://www.nngroup.com/articles/promptframes/
- [N3] NN/g, "Glassmorphism: Definition and Best Practices", Jun 2024. https://www.nngroup.com/articles/glassmorphism/
- [NNG] NN/g, "Skeuomorphism". https://www.nngroup.com/articles/skeuomorphism/
- [R1] Romero et al., "Usable but Conventional", arXiv 2605.15124, May 2026. https://arxiv.org/abs/2605.15124
- [R2] Jiang et al., "Artificial Hivemind", NeurIPS 2025. https://arxiv.org/abs/2510.22954
- [G1] Google Design, "Expressive Design: Google's UX Research", 2025. https://design.google/library/expressive-material-design-google-research
- [HIG-TB] / [HIG-L] / [HIG-T] Apple HIG, Tab bars / Layout / Typography. https://developer.apple.com/design/human-interface-guidelines/
- [LG] Apple WWDC25, "Meet Liquid Glass" (summary level). https://developer.apple.com/videos/play/wwdc2025/219/
- [F1] Apple, "Behind the Design: Flighty", Jun 2023. https://developer.apple.com/news/?id=970ncww4
- [ADA26] Apple Design Awards 2026. https://developer.apple.com/design/awards/
- [LK] Lickability, "Our Apple Sports design critique", Mar 2024. https://lickability.com/blog/apple-sports/
- [L1] Linear, "A calmer interface for a product in motion", Mar 2026. https://linear.app/now/behind-the-latest-design-refresh
- [LR] LogRocket, "Linear design", Jun 2025. https://blog.logrocket.com/ux-design/linear-design/
- [UX1] Tommy Geoco, "You Can't Prompt This", UX Tools. https://www.uxtools.co/blog/you-can-t-prompt-this
- [AB] It's Nice That, Airbnb app redesign, May 2025. https://www.itsnicethat.com/articles/airbnb-app-redesign-140525
- [SL] Expa, "Founder Spotlight: Sleeper" (summary level). https://www.expa.com/news/founder-spotlight-sleeper
- [PM] Oliver Schöndorfer, "Inter", Pimp my Type. https://pimpmytype.com/font/inter/
- [9S] 925Studios, "AI Slop Fonts and Gradients", 2026. https://www.925studios.co/blog/ai-slop-design-tells
- [P1] Plus AI, "How to make AI-generated slides that don't look like AI slop", Jul 2026. https://plusai.com/blog/how-to-make-ai-slides-that-dont-look-like-ai-slop/
- [W1] Adam Wathan on X, Aug 2025. https://x.com/adamwathan/status/1953510802159219096
- [RU] Wathan & Schoger, *Refactoring UI* (2018), via chapter notes. https://www.joelsleppy.com/blog/notes-on-refactoring-ui/
- [CR] CSS-Tricks, "Careful with your nested border-radii" (summary level).
- [DF] Dylan Field on Latent Space, "Taste is your moat", Oct 2025. https://www.latent.space/p/figma
- [LM] Lindsay Marsh, "Design Trends 2026", Oct 2025. https://lindsaymarsh.substack.com/p/design-trends-2026-imperfection-rebellion
- [D1] Dribbble critique roundup (summary level). [V1] Vibe-coding sameness roundup (summary level). [CM] Corporate Memphis, Wikipedia / Creative Bloq (summary level). [TN] Type Network, "OpenType at Work: Figure Styles" (summary level). [941] The 9:41 convention, per Ken Kocienda's *Creative Selection* (summary level).
