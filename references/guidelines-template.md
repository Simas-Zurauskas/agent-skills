# Design guidelines template

The template for a product's `design-guidelines.md`: the one file every builder, critic and refiner in a round works to. Distilled from the reviewed Repperoni Round 1 guidelines (2026-09-25, revision 2), the adversarial review that produced revision 2, and the direction review that followed it.

**Sections marked KEEP need only light adaptation; sections marked WRITE are product research.**

## Contents

1. [How to use this template](#1-how-to-use-this-template)
2. [Writer guidance: what the Round 1 reviews changed](#2-writer-guidance-what-the-round-1-reviews-changed)
3. [Sources behind the KEEP rules](#3-sources-behind-the-keep-rules)
4. [The template](#4-the-template-copy-from-here-to-the-end-of-the-file): §0 header [KEEP] · §1 product and audience [WRITE] · §2 principles [WRITE] · §3 guardrails [WRITE] · §4 anti-generic rules [KEEP; 4.3–4.4 WRITE] · §5 craft floors [KEEP; 5.10 WRITE] · §6 presentation and round allocation [KEEP; caps WRITE] · §7 self-critique checklist [KEEP] · §8 technical contract [KEEP] · change log

## 1. How to use this template

- **When:** after the research notes, before any direction is proposed. Directions and the round brief are written against the guidelines, so a gap here becomes ten variants' shared default.
- **Copy** everything from "The template" down into `<task>/design-guidelines.md`. Fill every `[[PRODUCT: …]]` slot from the research note it names; short placeholders such as `[[R]]` and `[[date]]` are plain fill-ins. If research can't fill a slot, write "research gap" there; don't invent it.
- **KEEP sections:** change the nouns (screen names, the primary action, tab labels, the hero content, locale) and the platform if it differs. Keep the numbers. Each one is there because a model's default broke it in Round 1. Loosen a number only with a reason in the change log.
- **Strip before review:** delete every `> Writer:` note, every `> Example …` line and the [KEEP]/[WRITE] tags; resolve every row marked *only if …* (keep it without the mark, or delete it). An example left in the file becomes some variant's signature (lesson L1).
- **Review, then revise.** One critic reads v1 cold through three lenses: *slop* (generic tells, divergence), *brand* (voice, guardrails, audience) and *craft* (numbers, contrast, buildability). They return findings with severity H/M/L. Write `research/guidelines-review.md` as a table (finding · decision · why, and where it landed), rejected parts one line each, then follow-ups outside the file. Publish revision 2 with a change-log row. In Round 1 there were 36 findings: 26 accepted, 10 accepted in part, none rejected outright. Expect v1 to need the review. **Measure what a critic disputes:** use fontTools on the served font files for `tnum` and advance widths, WCAG 2.x relative luminance for contrast, and the browser for rendered widths. Record the measurement, not the quote.
- **Precedence** goes in the file's header: the brief wins on content and on per-variant positions, the plan and the technical contract (template §8, from the target's doc) win on files and markup, and this file wins on everything else.
- **Section numbers.** Other references cite this file's template sections as "template §N" (template §8 is the technical contract), because the template's own §1–§8 sit inside this file's §4.

## 2. Writer guidance: what the Round 1 reviews changed

Revision 1 was careful and still failed review on every lens. These are the failure patterns, generalized. Check your draft against each one before sending it to review.

| # | What v1 did | Why it failed | Do this in yours |
| --- | --- | --- | --- |
| L1 | Both worked examples used per-digit cells, and one variant's assigned signature (a tin scoreboard) was the example in three places | Ten agents from one model copy worked examples | Put "examples are illustrations, not assignments" at the top. Pick examples no variant is assigned. Every device the file names is capped and assigned by the brief (§6.4) |
| L2 | Principle "Do" lines and a size formula described one hero layout (a full-width number, a unit and a line under it) | It collapsed two axes into a rule, and the calm direction couldn't comply | Write a principle as a hierarchy or ratio test ("squint: A first, B second"; "A's font-size ≤ 0.8 × B's"). A size is a ceiling. Composition is an axis the brief assigns |
| L3 | It banned Gen-1 and Gen-2, then made 6 of 10 variants condensed by family invariant, allowed "a named black + one accent", and said to "rotate the hue" | One register came out (retro sports ephemera in condensed caps), and near-black + acid was rebuilt under a new name | Make the next default an **assigned axis with a cap** (palette structure, display width, luminance), not a free choice. Drop hue rotation |
| L4 | Uppercase was allowed on "labels of 3 words or fewer"; mono was allowed "for times" | The license covered every label in the spec, so eyebrows survived, and muted mono landed on every feed row | Give every license a numeric limit: one tracked-caps style per screen on at most 2 roles; mono for digits only, never muted below 15 px |
| L5 | "A display face with character"; a "warm light" photo grade | Platitudes constrain nothing, and "warm light" produces golden-hour stock | Swap each adjective for a sourced element: the board names where the face comes from, and each variant states a grade taken from its vernacular, with no two the same |
| L6 | Every principle was restraint and every checklist item a prohibition | The likely result is ten tasteful, clinical apps with none of the brand's personality | Add a positive **brand-personality gate** (anti-persona questions, plus where the personality lives, visible on a screen). Pair "remove one accessory" with "is there one thing worth screenshotting?" |
| L7 | Nothing stopped a playful device turning into what the brand forbids (a joke "cap" reaction drawn as a verdict: a tint, a "?", a bigger chip) | Verification in disguise | For every playful device, write the guardrail row that stops it becoming the forbidden thing |
| L8 | §1 named two brand failures (kiddie; Nike/Strava heroics) and gave no tells for them | Unnamed failures aren't checked | Give each anti-adjective in §1 a tells row in §4.4 |
| L9 | Contradictions: "winner" was banned but "A winner, and a party." was approved; a word ban hit the lab's chrome ("Round 1") and harmless phrases ("the group chat"); "accent for Sam's number" let his standings total go red while his tie partner's stayed ink; a principle's size advice made one number beat the one the checklist called largest; status bar "47–54", a size floor of 11 in one place and 13 in another, two tracking ranges; "F1–F7" meant two lists | Agents follow whichever line they read last | Grep every banned word against the approved lines. Scope each color license to one place. Give each floor one number. Give each list a unique name |
| L10 | A font listed as tabular had no `tnum`. A px size table was wrong because widths move with `opsz` and `wdth` (the largest font-size at which "10,000" fits the measure was 145 px at opsz 72 and 138 px at opsz 10). Two common brand color pairs failed AA. "A visible gap" at 99.8 % was 0.72 px | Numbers quoted from memory are wrong | Give the measurement to run, not a figure. List the failing pairs. Set a minimum drawn size for near-complete states |
| L11 | Checklist items needed the DOM or all ten variants; the screenshot tool ran at DPR 1 with no reduced-motion option | Items that can't be checked from the evidence get skipped | Tag each item [S] screenshot, [D] DOM audit or [C] code. Shoot at DPR 2, and the peak screen with reduced motion forced. Move whole-round checks (thumbnails, pairwise similarity) to the round critique |
| L12 | The board inherited the lab's text color, font and dark `color-scheme`; the round page didn't link the variant CSS | Boards render in the wrong fonts, and change with the lab's theme switch | The board root sets four properties; the assembler links every variant's head part (§8) |
| L13 | A fixed 14-block board, repeated ten times, with a dot-joined header | Template chrome, and too long | Six mandatory blocks in order, at most 1,800 px, the header as structure, every other block optional and laid out in the variant's own system |
| L14 | What the critics got wrong (rejected parts) | Over-correction cuts good work | Don't set a cap so tight that it cuts the research's best-fit vernacular (dark-first ≤ 2 would have cut teletext): cap at 3 and ban the actual tell (acid on black). Don't count a family's own invariant against a cap (B's monochrome): exempt the family. Keep a real floor that a critic calls "formula" (concentric radii) and add the missing question next to it. Don't give all boards one fixed skeleton: comparability comes from fixed width, the height cap, block order, identical content and the compare strips |

**Caught later by the direction review, so write them in from the start:**
- **Uncapped defaults come back one level down.** Most rooms drew progress as the same thin bar with an outlined end, most celebrations shared one skeleton, and most rooms set the hero number flush left (the counts: [method.md](method.md) §5.1). The caps for these are in §6.4, and hero composition is assigned per screen type.
- **A banned tell returns through a loophole.** With the `→` glyph banned, builders put a Lucide `arrow-right` on a status tag instead. Ban the look, not the glyph. Likewise, fade-and-slide-up, banned as an entrance, came back as the second beat of celebration sequences.
- **Calm is not soft.** The calm direction slid into wellness pastels and a rounded heavy face, which the brand had ruled out. A bouncy handwriting axis read as kiddie, and a handwritten rota with a marker ring read as a family fridge chore chart, a named anti-persona. Write §4.4 so that it covers the calm route too.
- **The no-imitation rule reaches board copy.** A maker's trade names for its colors ended up as token names.
- **"Optional" content breaks the comparison.** An optional category icon meant some Homes had it and some didn't. Every content element is either required or absent.
- **Photos can pass the realism check and fail the brand.** Generated friends filming someone's rep read as video proof, which the brand rejects. Check every image against the guardrails too.
- **Sketch sizes were wrong until measured with the served fonts,** in at least four variants. And motion specs cost build time in a round judged from still frames (§5.8).

## 3. Sources behind the KEEP rules

- Why generated UI goes generic, and why bans alone fail: Anthropic, "Improving frontend design through Skills" https://claude.com/blog/improving-frontend-design-through-skills · Plus AI, negative prompts move the model to its next default https://plusai.com/blog/how-to-make-ai-slides-that-dont-look-like-ai-slop/ · Chayka, the Gen-2 cream/terracotta/serif look https://kylechayka.substack.com/p/the-generic-style-of-ai-web-design · Krebs, 1,590 Show HN pages audited https://www.adriankrebs.ch/blog/design-slop/ · Becker, "artifacts over adjectives" https://saschb2b.com/blog/same-same-but-different · Impeccable anti-patterns https://impeccable.style/anti-patterns/
- The vernacular and one bold idea: Flighty and the airport board https://developer.apple.com/news/?id=970ncww4 · Apple Design Awards 2026 (grug's hand-drawn status bar, Tide Guide's sky palette) https://developer.apple.com/design/awards/ · Linear, unequal visual weight https://linear.app/now/behind-the-latest-design-refresh · Expressive design helps only where it serves the key action: Google M3 Expressive research (46 studies, 18,000+ people) https://design.google/library/expressive-material-design-google-research · Material, matched-pair testing https://m3.material.io/blog/testing-material-3
- Principles: Intercom's flip test https://www.intercom.com/blog/product-principles/ · Spool's six tests https://articles.centercentre.com/creating-design-principles · Brignell https://principles.design/articles/why-most-design-principles-fail · Friedman ("we want X because Y") https://www.smashingmagazine.com/2026/04/practical-guide-design-principles/
- Boards, routes and critique: Warren, style tiles https://alistapart.com/article/style-tiles-and-how-they-work · Mall, element collages https://v3.danmall.com/articles/rif-element-collages · safe / adventurous / scary https://www.logodesignlove.com/how-many-options · Nielsen on critique https://jakobnielsenphd.substack.com/p/design-crit · the heat map https://thoughtbot.com/playbook/strategy/design-sprints/05-converge-exercises/heat-map
- Divergence: Dow et al., parallel prototyping and pairwise similarity https://hci.stanford.edu/publications/2010/parallel-prototyping/ParallelPrototyping2010-submitted.pdf · LLM homogenization https://arxiv.org/abs/2402.01536 · Doshi & Hauser, less collective novelty with AI https://news.exeter.ac.uk/faculty-of-environment-science-and-economy/university-of-exeter-business-school/ai-found-to-boost-individual-creativity-but-results-in-less-varied-content
- Craft floors: Apple HIG Branding https://developer.apple.com/design/human-interface-guidelines/branding · Layout https://developer.apple.com/design/human-interface-guidelines/layout · Typography https://developer.apple.com/design/human-interface-guidelines/typography · Tab bars https://developer.apple.com/design/human-interface-guidelines/tab-bars · WCAG 2.5.8 https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html · WCAG 1.4.11 https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html · APCA https://git.apcacontrast.com/documentation/APCAeasyIntro.html · reduced motion https://web.dev/articles/prefers-reduced-motion · Lucide https://lucide.dev/contribute/icon-design-guide · Tokens the winner can be promoted into: Frost https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems · Curtis https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676

---

## 4. The template: copy from here to the end of the file

# [[PRODUCT: name]] design guidelines: UI explorations

Round [[R]] · [[date]] · revision [[n]]. Revised at every round boundary (change log at the end). Every agent that builds a variant works to this file. The [round brief][brief] holds each variant's direction, its axis positions and assigned devices (§6.4), and the verbatim string list, and it wins on content; until the brief exists, [[PRODUCT: the product-content research note]] wins over any older content spec in the plan. [PLAN.md][plan] and the technical contract (§8) win on files and markup.

**Four layers, used differently** ([r-method]): [KEEP]

| Layer | Nature | Can it be bent? | Checked by |
| --- | --- | --- | --- |
| §2 Principles | Judgment; each one costs us something | Yes, on purpose, with the reason written on the board | Critique: "which principle does this serve?" |
| §3 Guardrails | Rules | Never | Yes/no, per screen |
| §4 Anti-generic rules · §5 Craft floors | Rules with numbers | Only where a row says "allowed when…" | Yes/no, per screen; the §7 checklist |
| §6 Presentation and round allocation · §8 Technical contract | Templates and caps | No | The brief, the assembler, the DOM audit, the round checker |

**Examples are illustrations, not assignments.** A device named anywhere in this file may be a variant's signature only where the brief assigns it (§6.4). Agents from one model copy worked examples ([r-method]).

## 1. What we're making and for whom [WRITE]

- **What:** [[PRODUCT: the product truth in one or two sentences from the PRD and strategy docs: what it is, what it refuses to be, and which content is the hero]]
- **For whom:** [[PRODUCT: the audience in one line from the audience doc, including who it must also work for]]
- **Voice:** [[PRODUCT: the brand archetype(s) and the one it is not, from the brand-voice doc]]
- **Round [[R]]:** [[PRODUCT: N visual languages × the screens, identical content. Name the three screen roles used throughout this file: the *home* screen, the *core* screen (the product's main object and its data) and the *peak* screen (the moment the key number changes state: it completes, crosses a mark or is settled; each variant's peak mode is in the brief, and [r-method]'s peak rule judges it). Give 3–5 target adjectives and 3 anti-adjectives. Each anti-adjective gets tells in §4.4]]

> Example (Repperoni R1): What: a private scoreboard for a crew's challenges: tap to log, see who's ahead, hype or call cap. No proof, no strangers. Numbers are the hero. For whom: 2–8 real-life mates who already share a group chat, at mixed fitness levels. Voice: the mate in the group chat who keeps score; Jester, then Everyman; not the Hero (Nike, Strava). Round 1: 10 languages × Home, the challenge room and the Finish line; loud, communal, sporty, funny; never earnest, clinical, kiddie or corporate.

- **The essence:** [[PRODUCT: 5–7 truths of this product, one sentence each, from the PRD (its promise, its ritual or loop, its differentiators, its principles). Every direction's thesis starts from one of them and names it]]
- **The quality bar:** [[PRODUCT: the reference apps the owner picked (`run.md` step 0.3) and the path of the screenshot sheet; "take their level of craft and restraint, never their layouts or brand"]]

> Example (Dream Catcher R3): essence — a journal that remembers you; one ritual, evening to morning; capture is sacred; two honest readings, never blended; patterns over time; real folklore depth; calm, private, never manipulative. Bar — Calm / Headspace / Endel, Day One / Stoic / Reflect, Oura / Rise / Apple Health, Co–Star / The Pattern (App Store screenshots in one sheet). After R2's trend skins were rejected, this pair produced the owner's favourites.

## 2. Principles [WRITE]

[[PRODUCT: 3–5 principles, each passing the flip test: the opposite is a real choice some other product makes. They fix brand truths and leave the aesthetic axes open, so the variants can still diverge. None of them prescribes a layout. Derive each from a product, audience or brand-voice research finding and cite it.]]

> Writer: every principle has the same six parts: a name ("X over Y", or an imperative); **Because** (one line: we want X because Y, with the source); **This means** (what it looks like on these screens, written as a hierarchy or ratio test, never as a composition, L2); **This doesn't mean** (the generic kit it could be mistaken for); **Do / Don't** on the real content; and **We'd reverse it** (when). Test each one ([r-method]): the flip test; a rational person could disagree; it would change about two thirds of the existing wireframes; it's aimed against a named competitor or default; it comes from research; it's scoped to now. Anything that can never be bent is a guardrail (§3), not a principle.

> Example (Repperoni R1), P1 · Numbers over atmosphere. **Because** Repperoni is a scoreboard: "numbers are the hero… always big" (brand voice). **This means:** the count is the loudest thing in every box. The room's order is fixed: You 1,690 → 9,980 / 10,000 together → the standings totals. 10,000 on the Finish line has the largest cap height in the variant, and 1,690's font-size is at most 0.8 × 10,000's. A hierarchy test; composition is the brief's call. **Doesn't mean:** the hero-metric kit (giant gradient number, tiny gray label, 3-up stat row). **Do:** squint and see 1,690 first. **Don't:** a banner, photo or mascot above the count. **We'd reverse it** on a future person view, where faces are the content.

**Tension map.** [[PRODUCT: every pair of principles that can collide on these screens, which one wins, and how it plays out. The last row is always "any principle vs a guardrail → the guardrail".]]

| When these collide | Winner | How it plays out |
| --- | --- | --- |
| [[P? and P?]] | [[P?, or "neither: …"]] | [[the concrete resolution on a named screen]] |
| Any principle and a guardrail | The guardrail | Use the safe version the research gives |

> Example (Repperoni R1): P1 (numbers) vs P3 (celebrate loud) on the Finish line → neither: the number *is* the celebration. Color fields, art and motion sit around or behind 10,000, and art is never above it or larger than it.

## 3. Guardrails: never bent [WRITE, last row KEEP]

These are rules, not principles. Nothing on the screens, the board or a caption breaks them. [[PRODUCT: one row per brand "never" from the brand-voice and product docs. In "Never", list the concrete visual carriers by name: icons (with their Lucide names), colors, states, styles and imagery. In "Instead", give the safe form. For every playful device the brand allows, add the clause that stops it becoming the forbidden thing (L7).]]

| # | Guardrail | Never, on any screen or board | Instead |
| --- | --- | --- | --- |
| G1 | [[PRODUCT: …]] | [[…]] | [[…]] |
| G[[n]] | No imitation of a real organization | Names, marks or trade dress of [[PRODUCT: every real brand, broadcaster, publisher or app the research's vernaculars and references come from]], including their trade names used as token names or in board copy | Borrow a vernacular's system, never its owner's identity |

> Example (Repperoni R1), G1 · Never imply anyone is watched or checked. Never: eye icons, ticks, seals or shields (`badge-check`, `shield-check`), presence dots, a pending or faded look on a log, clocks, timers, REC or LIVE dots, a camera near logging, logs styled as receipts. **A reaction turned into a verdict:** a log carrying 🧢 or 💀 gets no tint, strike-through, "?" or enlarged chip. Instead: words, if privacy must be said at all; Christopher's 1,000 with 💀 1 · 🧢 4 looks exactly like every other log.

## 4. The anti-generic rules [KEEP]

Generated UI goes generic because models fall back on the most typical choice ([r-tells]). Gen-1 is indigo, Inter, dark + neon and glass. Gen-2, once a model is told to avoid Gen-1, is cream + terracotta + serif, near-black + acid, broadsheet and template chrome. A ban alone only moves the model to its next default. So every row gives the move to make instead, and §6.4 caps how many variants may make the same move.

### 4.1 General tells

| Tell | Do instead |
| --- | --- |
| Indigo or violet, purple→blue gradients, gradient text or buttons | Color from the vernacular's own inks. Flat fills. A gradient only as a photo scrim, or as the vernacular's own blend (a split-fountain ground) on the peak screen |
| Warm cream (~#F4F1EA) + terracotta (~#D97757) + serif display | Never, unless a family owns warm paper (§4.3), and then only within its limits |
| Near-black + one acid accent, with glow | A dark ground carries its material's own hue (chalkboard green, pavilion navy, espresso). Pure #000 only as a family invariant or in a vernacular that is multi-ink on black (teletext's eight). Never a lime, volt or yellow-green accent on black or near-black, whatever the material is called. No glow. Dark-first is capped (§6.4) |
| Broadsheet: hairline rules, zero radius, dense newspaper columns | Zero radius only where the vernacular is made of cells, with the reason on the board. Model density on the subject's own dense artifact (a results page, a timetable), not on a newspaper |
| SaaS card kit: identical rounded cards, one radius, the same soft gray shadow, gradient washes | Separate with space, tone and type first. Use a container only when it means something. If space alone could replace it, remove it. One shadow language with a light source you could name, or no shadows |
| Glass or blur as decoration | Never on cards or rows. At most in the controls layer over scrolling content, and never as the signature |
| Inter, Roboto or system as the voice. Space Grotesk, Instrument Serif, Geist. The current generator defaults: Manrope, Plus Jakarta Sans, DM Sans, Outfit, Sora, Syne, Unbounded, Fraunces, Playfair Display, Archivo Black, Bebas Neue, Anton, Oswald | A display face whose source the board names (a stencil, a signwriter's letter, a kit-number cut, a broadcast graphic, a transit sign), plus a text face. Inter only as a family's licensed text face, or as small UI text beside such a display |
| One word of a headline accented (italic, color, bold) | Never. A headline is one color; the emphasis goes to the hero content |
| Tracked ALL-CAPS eyebrow over every heading; labels over content | A numeric limit: §4.3 "Uppercase" |
| Mono as a costume on small gray data labels | Mono only where §4.3 licenses it, never in muted ink below 15 px |
| `A · B · C` middle-dot meta on every row | Where the spec's dots join data, render the parts as structure: weight, position, a column, a line break or a gap. Never add a new dot-joined string, and never join two separate spec strings with a dot, on the screens or the board |
| Numbered markers (01 / 02 / 03) on things that aren't a sequence | Number only real sequences (ranks, steps), exactly as the content gives them. No zero padding, no numbered sections |
| Side-stripe accent borders, icons in tinted squares, an icon beside every label | State carried by words and by the row's own shape. Few icons, drawn plain |
| Hero-metric or KPI banner rows | One headline number and one progress line where the screen needs them, never a 3-up stat row [[PRODUCT: plus any PRD ban on summary tiles]] |
| Fade-and-slide-up on everything, bounce or elastic easing | No entrance motion, and no fade-up as a secondary beat either. One sequence, on the peak screen (§5.8) |
| Weightless copy ("Let's crush it!"); a trailing arrow on CTAs | Only the fixed strings. Buttons are verbs. No trailing arrow, whether glyph or icon, on buttons or tags. If a row needs an affordance, use its pressed state |
| Stock near-black (#0B0B0B, #111, #121212) standing in for black | Pure #000 on purpose, or a dark tinted from your own hue |
| Grain, paper or riso texture as "anti-AI" seasoning | Texture only when it's the material of the idea, behind content, never on text or numbers, and at most one object texture per screen |

### 4.2 Mobile mockup tells

| Tell | Do instead |
| --- | --- |
| A fake status bar at 9:41 | Draw it per variant, in its colors, at the story's time ([[PRODUCT: the times the content implies, per screen]]), with the iOS layout and a believable battery |
| A greeting blown up as the home screen's H1 | The greeting is never the largest or heaviest type on the home screen. Squinting, the eye lands first on [[PRODUCT: the row that needs the user]] |
| Identical list rows | Let state shape the row: rows that are different mechanics should read differently. Design for the longest real name first |
| Overlapping avatar facepiles | No facepiles. A head count stays text |
| A tab bar padded with icons, or a "+" in the middle | Exactly [[PRODUCT: the product's tabs]], labeled. Create lives in the header |
| A gray segmented pill for sub-tabs | The variant's own tab form. The gray pill only where a family owns it |
| Stock 3D, Memphis people, emoji-in-a-square icons | Typographic and graphic devices from the vernacular. A mascot on the peak screen only, if at all, and smaller than the hero |
| Emoji as chrome | Only the product's content emoji (for example, reactions), treated as content |
| Chip soup: every state as its own colored pill | One state device per list, at most two hues carrying meaning, and some states set as plain words |
| A default progress pill | The variant's own progress form, with a visible unfinished end (§5.10). A plain filled bar with an outlined end is capped (§6.4) |
| A full-width accent CTA with a soft drop shadow | Prominence from fill and shape, never from a blurred shadow. Any shadow follows the variant's one named light source |
| Confetti + trophy + "Congratulations!" | The peak moment, in-world. The hero content is the object |
| 9–10 px mono micro-labels; initials on gradient circles | 13 px minimum (11 only for tab labels). Initials on flat fills from a fixed tonal set (§5.7) |
| Content hidden under the pinned CTA or tab bar | Pad the scroll so the last row clears it |

### 4.3 Borrowed traits: brand choice or default? [WRITE, uppercase and mono rows KEEP]

Some tells belong to a family the round draws on (the product's own marketing site may really be warm paper with mono labels). A trait is a brand choice only in the family that owns it, within these limits. Anywhere else it fails. [[PRODUCT: from each family's research note, list every §4.1 or §4.2 tell the family genuinely owns, with where it's allowed and numeric limits. Round 1 needed rows for: warm paper + a red accent, mono, uppercase, middle-dot meta, grain, condensed heavy display, pure #000/#fff, dark-first, hairlines and zero radius, and tilt + hard offset shadow + stickers. Measure the owned colors' contrast (§5.5) before writing a limit.]]

| Trait | Allowed in | Limits |
| --- | --- | --- |
| Uppercase with tracking | Any family, on display-face lines (title, headline) and on labels or tags of 3 words or fewer | A CSS transform only, tracked per §5.2. **One tracked-caps label style per screen, on at most two roles.** Section headers are set in the display or text face at heading size, in sentence case. A tracked label line above a title is capped (§6.4). Never on body sentences or meta lines |
| Mono | [[PRODUCT: the family that owns it, and for which columns]]; among originals, one variant at most, and only where the vernacular's own numerals are monospaced (teletext, a typewriter), as its stated signature | Digits, ranks and initials only; 13 px or more; never in muted ink below 15 px; never eyebrows or words. Feed times and chip counts go in the text face with `tnum` |
| [[trait]] | [[family]] | [[limits with numbers]] |

> Example (Repperoni R1): Warm paper + a red accent, allowed in A only (the marketing site's tokens): kraft `#f6ecda` / `#efe0c6` and a saturated tomato `#c42e19`, never drifting toward clay `#D97757`; a condensed display face, never a serif; the paper paired with a second material (a chalkboard inset, tally marks used as counting) so it reads as kraft, chalk and tally rather than AI beige.

**Family invariants** (break two and you've left the family). With shared fonts and palette, three takes in one family converge on layout alone. So **each variant in a borrowed family names on its board the one invariant it bends and the axis it owns**, as the brief assigns them.

| Family | Keeps | Never takes | Starting split for the brief |
| --- | --- | --- | --- |
| [[PRODUCT: one row per family, from its research note]] | [[fonts, palette, surface, shape grammar]] | [[the other families' signature traits]] | [[the research's suggested takes]] |

> Example (Repperoni R1): C · original keeps one named vernacular with its own fonts that have `tnum`, and never takes A's fonts, cream paper with tomato, chalkboard green, cobalt with lime, or B's display face and slate monochrome.

### 4.4 Brand tells [WRITE]

[[PRODUCT: one row per anti-adjective or anti-archetype in §1, listing the visual carriers of that failure and the do-instead. Make sure the calm direction is covered too: calm must not slide into a softness the brand rules out. Then one row per group of moves in the category's default kit (the domain research note's 10–15 moves every app in the category makes, [r-tells] §2.5): a move with no job in the content is a tell here; a move the content needs in some form is capped in §6.4 instead.]]

| Tell | Do instead |
| --- | --- |
| **[[failure]]:** [[its visual carriers]] | [[the move from the product's own world]] |

> Example (Repperoni R1): **Kiddie:** inflated or bubble display faces, bouncy handwriting axes, primaries used as decoration with no role per color, cartoon outlines on UI, sticker bursts on Home, a mascot near a number → wit carried by the system; stickers and mascot on the Finish line only. **Hero (Nike, Strava):** forward-slanted "speed" italics, motion streaks, Strava orange, black + volt, low-angle sweat photography, PR framing → upright type, candid phone snapshots, the crew's total as the story.

> Example (a savings app, not from a run): **Category default:** a progress ring round the balance, mint or teal "money green", piggy banks, coins, a goal card with a house photo, pastel goal cards, confetti at the goal, "You're on track!" → the goal's form from the variant's own object, the peak in its assigned mode, only the brief's strings; the progress form and any green capped in §6.4.

### 4.5 The production bar: depth, character, professionalism [KEEP]

The owner judges every variant at App Store level, next to the quality-bar apps (§1). A variant that passes every
floor and still reads flat, gimmicky or like a trend applied on top has failed. Critics judge this first.

| Quality | What it means on the screens | Fails when |
| --- | --- | --- |
| **Depth** | A hero moment on the home screen (imagery, a large greeting over atmosphere, or a data hero), not a stack of equal cards. At least three surface levels (ground, section, raised), light and shadow with intent. Imagery made in one consistent hand where the direction calls for it. A visual of the key number, not just the number | Every block is the same card; the first viewport is a list; images differ in style; the key number is plain text |
| **Character** | One idea you can say in a sentence, grown from one essence truth; one signature you can point at on the peak screen; everything else quiet | The idea is a UI trend (bento, glass, clay, stickers, neo-brutal, a mascot, stat-card "Wrapped"); two ideas compete; the signature is decoration |
| **Professionalism** | A real type pairing and scale (body 16–17, meta ≥ 13), a disciplined palette (ground, surface, ink, one or two accents, the colour key), consistent radii and icon weights, buttons that look pressable (filled primary, contained secondaries — never bare text links for real actions), list data that reads at a glance (date, state, tags in fixed columns), real quotes ’ “ ”, tabular figures | Text links for actions; tiny meta; mixed radii; a decorative mark nobody can decode (Dream Catcher R6: unexplained brush strokes in a Journal) |
| **Restraint** | Calm grown-up tone; the subject of imagery is the product's world (landscape, place, object), never a cliché focal object made huge | Emoji, confetti, bubbly display faces, shouting numbers, a giant moon behind everything (Dream Catcher R4–R6) |

## 5. Craft floors [KEEP]

### 5.1 Frame and platform

| Item | Floor |
| --- | --- |
| Frame | 390 × 844 pt, drawn as a notch-class iPhone. The screenshot tools, the 402 px device and the 1,286 px board assume this frame, so keep it even for an Android-first product (draw Android chrome inside it) |
| Status bar | 47 pt tall, drawn by the variant in its own colors: time leading, signal, wi-fi and battery trailing. Nothing tappable inside it |
| Home indicator | The bottom 34 pt hold nothing tappable. Pinned actions and the tab bar sit above it |
| Gutter | 16 pt, which leaves a 358 pt content width |
| Hit targets | 44 × 44 pt or more (48 dp for Android). The visible glyph may be smaller. About 12 pt between bezeled controls and 24 pt around unbezeled ones |
| Prominent buttons | One primary per screen, marked by its fill and shape rather than its size: [[PRODUCT: the primary on each screen; a screen may have none]]. Every custom button has an `:active` press state |
| Tab bar | [[PRODUCT: the tabs]], single-word labels at 11 pt or more. The selected tab is shown by more than color (weight, an indicator shape). The iOS 26 floating capsule is capped (§6.4); where used, inset it about 21 pt, keep it monochrome over colorful content, and don't make the glass the signature |
| Pinned action | Content scrolls under it; the list is padded so the last row clears it |

### 5.2 Type

- **Two families at most;** a third only as a numeral face that sets digits alone.
- **Sizes:** body 17, secondary 15, tertiary 13; 11 only for tab labels. Titles get bolder, not only bigger. Weights 400 or more for text; no Thin or Light below display sizes.
- **Line height:** body 1.3–1.5, headings tighter, giant numerals 0.85–1.0 with `text-box: trim-both cap alphabetic`.
- **Tracking:** body 0; display above 40 px −0.01 to −0.02 em; uppercase labels +0.04 to +0.06 em [[PRODUCT: plus any single family exception]]. `font-optical-sizing: auto` on faces with an `opsz` axis.

### 5.3 Numerals

**The rule:** tabular lining figures (`font-variant-numeric: tabular-nums lining-nums`) in every column and on every number that changes; a static hero may use the face's natural figures, checked by eye. Many condensed display faces have no `tnum`, so a brand rule of "always tabular" can't be met in them; amend it here if the brand doc says so.

**`tnum` facts** measured from the files Google Fonts serves (2026-09-25). This is not a shortlist; the §4.1 bans still apply. Measure any face not listed.

| Faces | Figures | Use |
| --- | --- | --- |
| Big Shoulders, League Gothic, Antonio, Teko, Six Caps, Bungee, Alfa Slab One | **No `tnum`**: the CSS silently does nothing | Static heroes only, or one digit per cell |
| Bricolage Grotesque (`wdth` 75–100), Inter, Barlow Condensed, Sofia Sans (Extra) Condensed, Archivo, Science Gothic, Anybody, Special Gothic, Saira / Saira Stencil, Hubot Sans, Jersey 10/15, Bevan, Zilla Slab | Have `tnum` | Columns and changing numbers, with the property set |
| DM Mono, VT323, Chivo Mono, Reddit Mono | Tabular by default | Columns. As a hero, the gap before a leading 1 always shows |

1. **Check it:** "1,111" and "8,888" are the same width in your face with the property on.
2. **Columns:** one right-aligned numeric column shared by every row; only if the product ranks people, removed members sit on it too and the rank column is wide enough for a tie ("=3").
3. **Hero size is a ceiling, not a target.** Measured in the browser, the hero's `scrollWidth` is 358 or less at your weight and optical size (roughly font-size ≤ 356 ÷ the string's width in em; that width moves with `wght`, `wdth` and `opsz`, so measure rather than copy a figure). How close it gets to the ceiling is the brief's hero-composition position. "Largest" means cap height. [[PRODUCT: the ratio rules between hero numbers from §2]]
4. **Leading 1:** a static hero may go proportional; pull its side bearing back to the gutter with a negative margin. Tighten display commas (0.15–0.24 em) optically.
5. **Units:** set at 35–50 % of the number, in lower contrast, on its baseline (never vertically centered).
6. **Format:** [[PRODUCT: locale grouping and unit order, e.g. en-GB "1,690", "40 reps"]]; no oldstyle, no slashed zero. One digit per cell also counts as tabular (that device has one owner, §6.4).

### 5.4 Spacing and radius

- **Spacing:** 4-pt base, 8-pt system. Declare your scale on the board and use only its steps (at least 25 % apart). Space around a group is larger than space inside it; vary the rhythm on purpose rather than one gap everywhere.
- **Borders and containers:** separate with space, tone and type first. A container has to earn its place (§4.1). A border that is a control's only boundary needs 3:1.
- **Radius:** two to four values with roles (screen or sheet → container → control → chip), nested concentrically (inner = outer − padding). Zero only for a cell-based vernacular, with the reason on the board. Draw a round avatar 4–8 % larger than a square neighbor.

### 5.5 Color, contrast, dark mode

| What | Floor (WCAG 2.2 AA) |
| --- | --- |
| Text below 24 px regular or 18.66 px bold | 4.5:1 |
| Large text | 3:1 |
| UI parts: progress fill against its track, the unfinished end against its surface, selected states, icon-only buttons, a control's only border | 3:1 against their neighbors |
| Initials on an avatar fill | 4.5:1 |
| Small custom-colored text on dark | Aim for 7:1, and check 13 px secondary text by eye (APCA: a 4.5:1 pass can still be unreadable on near-black) |

**Known pairs.** [[PRODUCT: measure every text/ground pair in each family's tokens and list the ones that pass narrowly and the ones that fail, with the rule each implies ("small accent text on the first paper only").]]

> Example (Repperoni R1): tomato `#c42e19` on kraft `#f6ecda` is 4.78 (passes) but on the second kraft `#efe0c6` 4.30 (fails), so small tomato text sits on `#f6ecda` only. Slate `#64748b` passes on `#fff` (4.76) and fails on the gray fills (4.34, 3.86), so small muted text on a fill uses `#455162`.

- **One color, one meaning,** stated on the board. Color never carries meaning alone: "you" and "yours" also need a word or a shape.
- **Palette structure is assigned** (§6.4): mono, dominant + one accent, two-ink, multi-ink or tonal. Hues come from the vernacular's own inks, never from a rotation; use OKLCH to check lightness steps. Neutrals are tinted from the palette; pure #000/#fff only on purpose.
- **Dark mode:** each screen shows one fixed mode; never `prefers-color-scheme` (the round page's light/dark mode, or the lab's switch, never changes a design). Dark only as the idea, a named material with its own hue (§4.1). Elevation is a lighter surface, not a shadow; accents go lighter and calmer; no glow. [[PRODUCT: a family that ships both modes shows a light/dark pair of one component on its board]].

### 5.6 Icons

- **Lucide only** (`<i data-lucide="…">`, markup per §8); no brand icons, no emoji as icons.
- **One stroke weight per surface,** matched to the type (default 2 on a 24 grid). `stroke-width` on the `<i>` passes through to the `<svg>`: 1.5 beside light text, 2.5 on the selected tab.
- **Sizes:** 24 for nav and tabs, 20 for header actions, 16–18 inline on the cap height. Never blow an icon up as illustration. No icon beside every label, no icon tiles, no leading icon-in-circle on rows (a wireframe tell).
- **Content icons are fixed across variants.** If the content uses an icon (a category), every variant shows the same one; only its styling varies (never a tinted square or circle).

[[PRODUCT: a job table (Job · Use, verified names · Never). For each icon-bearing job on these screens, name Lucide icons that exist in the installed set (a wrong name fails the build), and in "Never" the icons whose meaning breaks a guardrail.]]

> Example (Repperoni R1): Challenges tab → `layers` or `list`, never `trophy` (it reads as "winner", G3), `target` or `flag`. Waiting on you → `arrow-right`, `hand` or the words alone, never `hourglass`, `clock` or `timer` (G1).

### 5.7 Avatars, photos, imagery

- **Photos:** [[PRODUCT: who has a photo, from the shared library]]. Everyone else shows initials: a designed normal state, not a broken fallback.
- **One avatar system:** photos and initials share one size, shape and ring (1 px inner ring at about 8–10 % ink). Initials fills come from a fixed tonal set keyed to the name, with the letters at 4.5:1 and no gradients.
- **Where photos may go:** [[PRODUCT: avatars, board mood images, and where the product allows content photos]]. **The grade comes from the vernacular and is stated on the board** (an on-camera flash snapshot, overcast five-a-side, fluorescent gym, pub tungsten), and no two variants share one. One grade and crop per variant. Text on a photo sits on a scrim, floor fade or solid backing, with contrast measured on the lightest pixels.
- **Before any generated photo is used, check realism:** hands and fingers right; no warped text, signage or logos; skin with texture and uneven light (no plastic sheen); eyes and teeth consistent; one light direction; no melting background; a phone snapshot (a little noise, imperfect framing), not a campaign; no golden hour, lens flare or silhouette against the sky; a mixed group. **Then check the guardrails:** nothing in the scene may enact what §3 forbids. Any fail: drop the image.

> Example (Repperoni R1): generated friends filming someone's rep read as video proof, which the brand rejects, so the scenes were regenerated with no phone aimed at anyone.

### 5.8 Motion

- **At most one orchestrated sequence per screen,** spent on the peak screen only. Other screens get press states only (120–300 ms), and no entrance animation (fade-and-slide-up) on lists, rows or cards.
- **CSS only, reduced motion by default.** Every keyframe sits inside `@media (prefers-reduced-motion: no-preference)`, so the unanimated screen *is* the final state. Critique shots of the peak screen force reduced motion, so **compose that frame first**: it must read as the peak moment in three seconds.
- **The sequence:** 1.8 s at most, once, no loop; transform and opacity, ease-out, no bounce or elastic; native to the vernacular (a stamp landing, a band sweeping in) or none. No opacity-plus-translate fade-up as a secondary beat. A count-up is capped (§6.4) and follows the §8 recipe. Flashing at 1 Hz at most, and never under reduced motion.
- **In a round judged from still frames** (usually Round 1), keyframes are optional: one "Motion idea" line on the board is enough, and the settled peak frame must meet the peak rule on its own ([r-method]).

### 5.9 Copy

- **The strings are fixed:** the brief's verbatim list, plus [[PRODUCT: any optional strings the brief allows, each with where it may appear]]. Buttons say what happens, with no arrow.
- **Case:** strings are stored as written. `text-transform: uppercase` goes on display lines, labels and tags only (§4.3), never on body sentences or meta lines.
- **Banned words,** on the boards and in captions too: [[PRODUCT: from the brand voice's never-say list]]. Before publishing, grep each banned word against every approved line in this file and the brief (L9). Scope a ban to product strings where the round page's chrome ("Round 1", "R1") or a harmless phrase would trip it.
- **Voice goes on the board,** never the screens: [[PRODUCT: the brand's approved voice lines that pass the guardrails]], or the vernacular's own devices.

### 5.10 The edge cases every variant must solve [WRITE]

[[PRODUCT: one row per value in the content spec that breaks templates. Keep the generic floors below that apply, rewritten on the real content, and add the product's own. Choose the content so that it contains these cases. Rows marked *only if …* come from a scoreboard: delete them when the condition doesn't hold.]]

| Case | Floor |
| --- | --- |
| Nearly complete progress (e.g. 99.8 %) | A proportional gap is under 1 px on a 358 track, so don't rely on it. Draw an unfinished end at least 8 px long, which may be non-proportional (say so on the board), and let the remaining-amount string carry the message. The unfinished end shows at 3:1 against its surface; fill against track 3:1. No alarm color near the end. The accessible name spells out both numbers |
| Over-complete (e.g. 10,020 / 10,000) | No bar past 100 %. The numbers read as written, with no new string |
| A tie *(only if the product ranks or compares people)* | One rank shown twice ("=3", "=3") in the same row style; the next rank skips |
| The longest real name | Design for it first. Wrap it in feeds. In a table, truncate the *name* with an ellipsis, never the number. Never shrink the type to fit |
| A removed or former member *(only if the product ranks or compares people)* | Same avatar shape, not a link, no actions. The name may be muted (still AA); their number gets everyone's treatment. Never a ghost or "Deleted user" |
| A zero | "0" in the same weight and color as every other value |
| "You" and role markers | Readable without color. Your own name is not a link. A role is quieter than the data |
| Counts drawn as marks *(only if the product ranks or compares people)* | Anonymous if a per-person mark would name who is behind |
| Fixed or system rows | Look different from user rows and carry no social controls |
| Social chips (reactions, likes) *(only if the product has them)* | The product's fixed order, non-zero chips only, 16–20 pt, tabular counts. "Yours" is marked by more than tint (a fill or outline change plus weight). The chip form comes from the variant's system (a count column, stamps, a type-only run); rounded pill chips are capped (§6.4). The add control sits on every eligible row, with no empty-state text |
| Two people, or a cooperative group (e.g. a couple's shared goal) | Never rank or race the people: no order by amount, no leader mark, no "ahead" or "behind", no head-to-head bars or side-by-side race tracks. The shared number is the hero; each person's part sits in a fixed order (the viewer first, or alphabetical) at the same size, weight and color |

## 6. How a variant is presented [KEEP]

### 6.1 The round page

- **A plain scrolling static page per round, not a pan/zoom canvas.** Round 1 picks a visual language, and still frames side by side serve that better than interactivity ([r-method]).
- **Judge color, type, numerals and mood, not flow.** Screens stay real HTML (real fonts and numerals, a passing link check) but carry only the contract's links (§8). Don't polish interactions, and don't draw open pickers or menus unless the brief assigns one.
- **A variant is one section of the round page:** its board, then its screens at true size.
- **The assembler** (once all variants are in) includes every variant's fonts and CSS in the round page's `<head>`; without it, the boards' tokens and classes resolve to nothing. It shows one round cover holding the §6.4 matrix for every variant, so no board repeats it, and adds one compare strip per screen (every Home side by side, and so on).

### 6.2 The board (a static style tile with a thesis)

One board root (§8), 1,286 px wide for the default three screens (three 402 px devices plus two 40 px gaps, so it sits exactly over its phones; with 2 or 4 screens, N × 402 + (N − 1) × 40 = 844 or 1,728) and **at most 1,800 px tall** (aim for about 1,100–1,400), built in the variant's own type, color and layout system. Its root sets `background`, `color`, `font-family` and `color-scheme` (§8). The reading order is fixed: thesis first, then evidence, then costs. The layout is not: don't reproduce a shared band grid. Block headings are in the variant's own type, in sentence case, unnumbered, with no eyebrow over every block.

**Header:** the variant's name (2–3 words) as display type, then its number (V03), family and route (safe, adventurous or scary) as separate elements, not a dot-joined string.

**Mandatory, in this order:**

| Block | Content |
| --- | --- |
| Thesis | "[[Product]] as ___, because ___." (§6.3), plus the one question this direction tests |
| Signature | The one memorable element, large, on real content, and one line on where the brand's personality lives (§6.4 gate) |
| Palette | Swatches that read the variant's own tokens, with roles, the one meaning each color carries, and the contrast pairs that matter |
| Type and numerals | Specimens on real strings: [[PRODUCT: the greeting, the longest name, the progress string, a tie]] and the "1,111 / 8,888" check. Where the display face comes from |
| Rejected defaults | The 2–4 generic moves it was tempted by and refused (§4); any borrowed trait it uses under §4.3; for a borrowed family, the one invariant it bends and the axis it owns |
| Trade-offs | 3–5 costs (legibility, dark mode, native build cost, cliché, inclusivity), and where it breaks on the boring screens: settings, errors, delete account, the densest list |

**Optional, merged or laid out freely:** the source and 2–4 references, with the system taken from each; an element collage (a list row, the primary at rest and pressed, chips, progress at its awkward value, the tab bar, a photo avatar beside an initials avatar); material (texture, photo grade, mascot, motion, or "none"); a steal list of 1–3 elements; 1–3 voice lines (§5.9).

**Stated where they apply**, a line each: any bent principle and why; zero radius or pure #000/#fff and why; a mono signature; the photo grade; the reason for any optional string; a non-proportional progress end. **Kept in the brief, not on the board:** axis positions, adjectives and the per-principle lines. Board specimens are non-interactive `span`s and `div`s; a pressed state is a static `.is-pressed` class that mirrors `:active`.

### 6.3 Writing the thesis, rationale and trade-offs

- **Thesis:** 25 words or fewer, naming a real object and a reason tied to a principle or product truth. Bad: "A bold, modern, playful take on the dashboard" (adjectives with no element behind them).
- **Rationale:** adjectives become elements: "the accent only on the one action and your own number", not "energetic".
- **Trade-offs:** a cost *and* where it bites: "the pixel face stops reading below 16 px, so settings would need a second face", not "may be hard to read". Honest costs are what make a board trustworthy.

> Example (Repperoni R1), a good thesis: "Repperoni as the felt-tip whiteboard in a shared flat's hallway, because a count in big marker is loud, honest and anyone's to add to."

### 6.4 Round allocation, diversity and judging

A shared guide narrows range, and LLM-built ideas drift together ([r-method]), so the brief spreads the round on purpose. **Before any build, the brief sets every variant's position on each axis and assigns every capped device.** A variant uses only the capped devices it was assigned. The caps below are for a 10-variant round. For another N, write each as cap_N = max(1, floor(cap_10 × N / 10)): ≤ 3 becomes 1 at N = 4 or 6 and 2 at N = 8; ≤ 4 becomes 1, 2 and 3 (the table: [r-method] §7).

| Axis | Positions | Round cap |
| --- | --- | --- |
| Surface | tactile · flat digital · photographic | — |
| Luminance | light-first · split · dark-first | Dark-first ≤ 3 |
| Palette structure | mono (± one accent) · dominant + one accent · two-ink · multi-ink (3+ inks, a role each) · tonal | Dominant + one accent ≤ 3, not counting a family whose invariant is mono |
| Colour intensity | neutral · tinted · saturated field (≥ 30 % of one screen, OKLCH C ≥ 0.12) · saturated ground | Saturated field or ground ≥ N/2; neutral ≤ N/4, unless the user asked for a quiet round |
| Display width | condensed · normal · wide · mono or pixel · mixed widths | [[PRODUCT: e.g. at least 2 originals not condensed]] |
| Number treatment | giant numerals · inline ledger · graphic counts | — |
| Hero composition, set **per screen type** | full-measure · stacked across two lines · inside the vernacular's object · offset to one edge with open space · rotated or vertical (peak screen only) · a modest number in a loud field | Full-measure ≤ 3; offset to one edge ≤ 3 per screen type. Every digit stays legible; never cropped by the frame |
| Progress form | the variant's own object | A plain filled bar with an outlined end ≤ 3 |
| Shape | 0 radius · mixed · pills and large radius | — |
| Containment | open · cards · bands and slabs | — |
| Density | roomy · packed | — |
| Imagery | none · illustration or mascot · photo | — |
| Peak-moment mode, judged by [r-method]'s peak rule (a quiet peak is valid) | typographic slam · graphic burst · quiet, ceremonial | A full-screen ground change ≤ 4. At least 3 variants set the peak facts as something other than a label/value hairline table |
| Cultural reference | the object each variant names | ≥ 1 original source contemporary, not nostalgic |

**Capped devices** (a model's next defaults once the first ones are banned). These rows came from a scoreboard round (R1): keep a row only if a candidate uses the device (per-digit cells, finish-tape and tally-gate progress are scoreboard forms; reaction chips only if the product has reactions), and add your category's own from its default kit ([r-tells] §2.5) and the direction candidates (count what recurs; [r-method] §7):

| Device | Cap |
| --- | --- |
| Per-digit cells as the number treatment (plates, flaps, split cells). A cell-grid vernacular that sets all its text in cells doesn't count | 1 variant |
| Finish-tape progress · tally-gate progress | 1 each |
| Tilt + hard offset shadow + sticker kit (the neo-brutalist default) | 1 |
| A mascot · a photo as the peak screen's art | 1 each, peak screen only |
| Rounded pill reaction or tag chips | ≤ 4 |
| iOS 26 floating capsule tab bar | ≤ 2 |
| Count-up on the hero number | ≤ 3 |
| A mono face among the originals | ≤ 1 |
| A tracked-caps label line above a screen title | ≤ half |
| [[PRODUCT: the category-kit moves the content needs in some form (e.g. a progress ring, the category's color), the devices the research names as this category's next defaults, and any device this file names as an example]] | [[1 for a signature form, about N/3 for a common one]] |

**Divergence:** any two variants differ by at least two steps on at least three axes, never share a signature element, and never share a display face across families. Include one calm direction on purpose; calm still passes §4.4. In the round critique, where every variant exists, reviewers rate each pair from 1 to 7 for similarity (any pair averaging 5 or more is revised or cut) and check that each variant can be picked out from a 120 px thumbnail.

**Gates (pass/fail):**
- The guardrails (§3), the floors (§5), fidelity to the brief's string list, and inclusivity ([[PRODUCT: the range of users it must work for]]).
- **Brand personality.** [[PRODUCT: 2–3 anti-persona questions asked of the screenshots, each with the answer it must get, and one yes-question for the target user. The board says where the personality lives in the visual system, visible on at least one screen, and never aimed at a person.]]

> Example (Repperoni R1), the Jester gate: would a manager screenshot it for the office Slack? (must be no: too corporate). Would a personal trainer post it as motivation? (no: too earnest). Would a guy send it to four mates with "we're doing this"? (yes).

**Rubric (1–5):** hierarchy (does the eye land on [[PRODUCT: the must-see elements]]?), perceived utility, style fit, distinctiveness (counted twice), one memorable idea, stretch (does it survive the boring screens?) and buildability. Use the scores to steer the discussion and the gates to cut.

### 6.5 The expression audit: run it before publishing [KEEP]

Every guardrail, floor and cap above is a subtraction. Together they can delete an axis nobody meant to delete, and
then N directions come out as one (Kas pirmas R1: "no UI chroma above 0.10 beside the scene" + "low-chroma cool hues
only" + "no full-screen ground change" + "calm is the default register" → 13 of 15 variants neutral or tonal, all
light, one skeleton). Before publishing:

1. **Narrowest translation.** For each product guardrail, write the narrowest rule that protects it. "Don't compete
   with the product's pictures" → frame them with a keyline and keep saturated fields off the image's own edge, not a
   chroma cap on the whole screen. "No signal colours as decoration" → ban those hue ranges in decorative roles, not
   all saturation. A mood the product wants ("calm") is a voice rule and a peak-mode option, never a default register
   for every variant.
2. **Count the legal positions** on the axes that carry most of a round's visible difference — luminance, hue family
   (list the families still allowed), colour intensity, display genre, peak mode — and write the count into this
   section. **Fewer than 3 legal positions on any of them = over-constrained:** loosen the rule that removed them, or
   stop and ask the user which of their rules to relax (show what each costs). Don't publish around it.
3. **An energy floor with colour in it.** ≥ N/2 variants carry a saturated field or ground (the colour-intensity cap
   above); the peak may change the whole ground unless a guardrail names why not.

[[PRODUCT: the audit — each guardrail's narrow translation, then a table: axis · legal positions left · count.]]

## 7. Self-critique checklist [KEEP]

Tags say how to check: **[S]** screenshots (at DPR 2; the peak screen also with reduced motion forced), **[D]** a DOM check (the scripts in §8, or a query in the console), **[C]** your own code. Every answer must be **yes**. A "no" is fixed, or explained on the board if it's a deliberate bend of a principle. It's never waived for a guardrail. [[PRODUCT: rewrite the bracketed items on the real content, and add one item per guardrail.]]

**Guardrails and content**
1. [D] [S] Does every required string appear (`check-strings.mjs`)? By eye: is every other visible string in the brief's list or one of its optional strings, and does no rendered `·` appear outside strings the spec gives with one?
2. [S] Is every icon, state and style §3 forbids absent? [[one item per guardrail]]
3. [S] Does every playful device (a joke reaction, a sticker) stay a joke, set like its neighbors and never a verdict?
4. [S] Does a zero match every other value? Only if the product ranks or compares people: is every behind-state free of red, fading, strike-through, zoning and badges? If it is two-person or cooperative, are the people never ranked or raced (§5.10)?
5. [S] Are the content's required elements all present, identically across variants, with nothing the brief bans added?

**Hierarchy and numbers**
6. [S] Squinting, does each screen pass §2's hierarchy tests ([[PRODUCT: first, second, third on the core screen]])? Is the largest cap height where §2 puts it?
7. [D] Are columns tabular in a `tnum` face (or in cells), right-aligned on one grid? Does 1,111 = 8,888?
8. [S] Does the nearly complete progress look unfinished, with an end of 8 px or more at 3:1 and the remaining-amount string?
9. [S] Does the longest name fit without shrunk type or a cut number? Only if the product ranks people: is a tie one shared rank?
10. [S] Is every unit smaller and lighter than its number, and on the same baseline?
11. [S] Does the peak screen resolve the key number's form, and escalate in the peak mode the brief assigned (a quiet peak is valid; [r-method], the peak rule)?

**Anti-generic and brand**
12. [S] Are all five calibration clusters absent (cream + terracotta + serif; near-black + acid; broadsheet; SaaS card kit; template chrome), except a trait §4.3 licenses for your family? Are the brand tells (§4.4) absent?
13. [S] Are there no accented headline words, no numbering outside real sequences, no trailing arrow (glyph or icon) on buttons or tags, and no entrance motion?
14. [S] Is there one tracked-caps label style per screen, on two roles at most, with section headers in sentence case?
15. [C] Is mono only where §4.3 licenses it, and never in muted ink below 15 px?
16. [S] Do rows that are different mechanics read differently, with at most two hues carrying state?
17. [S] Could any container be replaced by space alone? If so, is it gone? Do radii nest by role, and do shadows share one light source?
18. [S] **Remove one accessory:** with the least necessary ornament (a texture, a second accent, a tilt, a rule, an icon) taken off each screen, is the screen as good or better? If so, did you leave it off?
19. [S] Is there one thing on these screens a target user would screenshot and share, and does it pass the brand-personality gate (§6.4)?
20. [S] Desaturated, does each screen differ from its wireframe (with no wireframes, the category's default screen in the domain research note) in composition, not only in color?
21. [C] Does the variant use only the axis positions and capped devices the brief assigned it (§6.4)?

**Craft floors**
22. [D] Is every tap target 44 × 44 pt or more, with an `aria-label` and a size on every icon-only control?
23. [D] Is text at 4.5:1 (large text 3:1) and UI parts at 3:1? Is there no yellow text on light, and nothing under 13 px except tab labels (11 or more)?
24. [S] Is the status bar yours, 47 pt, at the story's time, with nothing tappable in either inset? Does the last row clear the pinned action?
25. [S] Is there one primary per screen, marked by fill and shape, and a labeled tab bar whose selected state isn't color alone?
26. [C] Are all icons Lucide, at one stroke weight per surface, with no emoji beyond the content's own?
27. [S] Only if the product has social chips: are they in order and non-zero, with "yours" marked beyond tint, and do fixed rows carry none and look unlike user rows?
28. [S] Do initials avatars match photo avatars? Do photos share the stated grade, pass both photo checks (§5.7), and have a backing under any text?
29. [C] Is motion on the peak screen only, CSS only and reduced-motion-safe, with at-rule names prefixed? Does the settled frame read as the peak moment in three seconds?

**Authorship and contract**
30. [S] Does the board carry the header and the six mandatory blocks in order, within 1,800 px? Is the idea on every screen?
31. [C] Do the board's swatches read the variant's tokens, and does its root set background, color, font and `color-scheme`?
32. [S] Is there at least one hand-made element (a drawn glyph, a custom counter or progress, an in-world status bar)?
33. [C] Did you change only your own files, with no script beyond what the target allows (§8), every selector and at-rule name under `rR-vNN`, and the target's checks passing?

## 8. Technical contract [KEEP]

R is the round, NN is 01…N, S is the screen number. [[PRODUCT: keep the column for this round's target and delete the other; the full contracts are the skill's `targets/standalone.md` and `targets/design-lab.md`.]] [PLAN.md][plan] (and, for the Design Lab, the [lab's CLAUDE.md][lab]) win on anything below.

| What | Standalone target (default): `<OUT>/round-RR/vNN/` | Design Lab target: `<LAB>/src/explorations/` |
| --- | --- | --- |
| Screens, one per screen | `screen-S.html` | `screen-rR-vNN-S.html` |
| Title (the checker and the round page's captions read it) | `<title>R{R} V{NN} · [[Screen name]]</title>` | the same |
| Variant CSS: every selector under `.rR-vNN`, no `@import`, no `@font-face`, no `:root` / `html` / bare `body` | `style.css` | `rR-vNN.css` |
| Head part | `head.html`: the Google Fonts `<link>` only (the round page adds `style.css`) | `parts/rR-vNN-head.html`: the Google Fonts `<link>` + the variant CSS `<link>` |
| Board (§6.2 width: 1,286 px for three screens) | `board.html`: one `<div class="mb-board rR-vNN board" style="width:1286px">` | `parts/rR-vNN-board.html`: one `<div class="lab-board rR-vNN w-[1286px] …">` |
| Screen template | `targets/standalone/templates/screen.html` | `targets/design-lab/templates/screen.html` |
| Scripts in a screen | Exactly the template's three (Lucide, `lucide.createIcons()`, `../../assets/phone.js`), plus the optional Tailwind browser build; nothing else | None; the chrome include is the last line |
| Images (the shared library; add to it only if the brief assigns an image) | `<OUT>/img/`, as `src="../../img/<file>"` | `src/explorations/img/`, as `src="img/<file>"` |
| Icons | Lucide, `<i data-lucide="name"></i>` sized in CSS; a wrong name doesn't render, and `verify-screens.mjs` reports it | Lucide, `<i data-lucide="name" class="h-5 w-5"></i>`; a wrong name fails the build for everyone, so check `<LAB>/node_modules/lucide/dist/esm/icons/<name>.mjs` first |
| Preview | Generated: `scripts/assemble-standalone.py round.json --preview NN` | `round-preview-rR-vNN.html` from `targets/design-lab/templates/preview.html` |
| Checks (what each covers: Working rules, below) | `scripts/check-standalone.py round.json`, then `verify-screens.mjs`, `dom-audit.mjs` and `check-strings.mjs` | `scripts/design-lab/check-round.py round.json` (it also runs the lab's `yarn links`), then the same three `.mjs` scripts |
| Screenshots | `scripts/screen-shot.mjs file://… OUT_PREFIX` | `scripts/screen-shot.mjs` against the user's dev server |

**Links.** Every element is exactly one of three things: it goes to a screen, it changes the UI in place (`<button aria-pressed="false">`), or it does nothing yet (`href="#"`). The flow is the brief's link table, which the lead copies into `round.json` as `flow` (without one, the checker expects one cycle, screen 1 → 2 → … → 1), and the checker requires each link: [[PRODUCT: which element carries each flow link]]. Everything else that looks tappable is `href="#"`. Current tabs and your own name are plain text. A group of social chips is static, inside one `<a href="#" aria-label="[[e.g. Who reacted]]">` 44 pt tall, with "yours" as a class, not `aria-pressed`. An assigned picker is `role="radiogroup"` with `role="radio"` and `aria-checked` options.

**Labels and sizes.** Every icon-only control gets an `aria-label` and a 44 px size. [[PRODUCT: the fixed accessible names]]. A content icon is `role="img"` with an `aria-label`. A progress track's accessible name spells out both numbers. Photos get the person's name as `alt`. Use the icon names in §5.6, each checked to exist.

**CSS and fonts.**
- **Scope and tokens:** the body class and the board root both carry `rR-vNN`. Declare one shared semantic vocabulary on `.rR-vNN`, so the winner maps into the product theme without a rewrite: `--surface`, `--surface-raised`, `--ink`, `--ink-muted`, `--accent`, `--on-accent`, `--celebrate` (the peak's color, in any mode), `--line`, `--font-display`, `--font-text`, `--font-numeral`, `--radius-card`, `--radius-control`, `--radius-chip`, plus private primitives (`--kraft-500`). The board's swatches read these variables, so the board and the screens can't drift apart.
- **The board's root** sets `background`, `color`, `font-family` and `color-scheme` explicitly. Otherwise it inherits the round page's text color, font and `color-scheme`, and changes with the page's light/dark mode.
- **At-rule names are global,** and the round page loads every variant's CSS, so prefix every `@keyframes`, `@property` and `@counter-style` name with `rR-vNN-`.
- **Design Lab only: no `@apply` or `theme()`** in variant CSS: the file runs through `@tailwindcss/postcss` without a `@reference`.
- **Count-up recipe** (only where assigned): `@property --rR-vNN-n { syntax: "<integer>"; inherits: false; initial-value: <final> }`, so the unanimated frame is final, animated `from` a value just below it, so only the last stretch counts in (which also avoids a zero-padded lead). An `aria-hidden` overlay sets `counter-reset: k round(down, var(--rR-vNN-n) / 1000, 1) u mod(var(--rR-vNN-n), 1000)` and `content: counter(k) "," counter(u, rR-vNN-pad3)`, with `@counter-style rR-vNN-pad3 { system: extends decimal; pad: 3 "0" }` (a bare `counter()` drops the comma). The real number stays as DOM text; the overlay exists only inside the no-preference query.
- **Fonts:** a Google Fonts `<link>` in the head part (and, standalone, in each screen's `<head>`), never `@import`. Use current family names ("Big Shoulders", not old aliases).
- **Other:** Tailwind utilities are fine where the target has them (arbitrary values too); bespoke rules go in the variant CSS. No `prefers-color-scheme`, and no viewport breakpoints in a board. Don't put a Tailwind `before:` utility on an element whose `::before` uses `content: attr(…)`: it resets `content`.

**Working rules.**
- **Write only your variant's files.** Never edit the round page, the cover, the target's shared assets (`<OUT>/assets/`; in the lab `parts/rounds.html`, `src/_lab/`, the theme, components, wireframes) or anything the plan marks protected.
- **Design Lab: never run a production build into the `dist/` the dev server owns,** and never stop the server.
- **Screenshots:** 390 × 844, DPR 2, top and scrolled. Shoot the peak screen with reduced motion forced (`screen-shot.mjs … --reduced-motion`).
- **What the checks cover.** `dom-audit.mjs` (the snippet in the skill's `references/craft-floors.md` §13): tap targets under 44 × 44, overlapping hit areas, text under 13 px (tab labels show too; their floor is 11), text contrast under 4.5:1 (3:1 for large text), and text over images, listed for an eye check. `verify-screens.mjs`: the page loaded, icons rendered, no broken images, no horizontal overflow, no failed fonts, no console errors. `check-strings.mjs round-[[R]]/strings.json`: every required string appears on each screen. The target's checker: the file set, CSS scoping (selectors and `@keyframes` names under `rR-vNN`; no `@import` or `@font-face`), titles, the flow links from `round.json`, and local refs (the Design Lab's also refuses `<script>` and unknown Lucide names). **No script catches** an invented string, a rendered `·` or, standalone, a script beyond the template's: those are §7's [S] and [C] items.

## Change log

| Date | Change |
| --- | --- |
| [[date]] | First version for Round [[R]]: [[counts of principles, guardrails, checklist items]]; [[any brand rule this file amends, and why]] |
| [[date]] | Revision 2, after the adversarial review ([r-review]): [[what changed, by section]] |

[r-tells]: [[SKILL]]/references/generic-tells.md
[r-method]: [[SKILL]]/references/method.md
[r-review]: research/guidelines-review.md
[brief]: round-[[R]]/brief.md
[plan]: PLAN.md
[lab]: [[path to the lab's CLAUDE.md (Design Lab target only; delete for standalone)]]
