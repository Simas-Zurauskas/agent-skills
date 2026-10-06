# Method: running, presenting and judging divergent rounds

How to steer a round with principles, choose the artifact, design the groups, oversupply and select directions, force
divergence (matrix, caps, nearest pairs), write each variant's case, present and judge the round, converge over later
rounds, and turn the winner into tokens. Craft floors are in [craft-floors.md](craft-floors.md), anti-generic tells in
[generic-tells.md](generic-tells.md), the fill-in documents in [guidelines-template.md](guidelines-template.md) and
[brief-template.md](brief-template.md), and the build pipeline in the skill's `workflows/`. Distilled from Repperoni
Round 1 (a private scoreboard for friend crews' challenges, 10 variants, 2026-09-25) and its method research; every
"Example (Repperoni R1)" is an illustration, and the rule above it is general. Codes such as [S13] point to §14.

**Screen roles used in every reference:** the *home* (list) screen, the *core* screen (the product's main object and its
data) and the *peak* screen: **the moment the product's key number changes state** (it completes, crosses a mark or is
settled: a goal reached, a payment confirmed, an order placed). R1's peak was the "Finish line", called the
celebration or finale in its examples; a peak need not celebrate. The brief assigns each variant a **peak mode** (§6:
typographic slam, graphic burst, or quiet and ceremonial), and a calm brand may give most variants the quiet one.

**The peak rule** (this is its one home; the other references point here): the peak screen **resolves the key
number's form** (the core screen's progress closes, the mark is crossed, the figure settles), readable in the
reduced-motion frame within three seconds. **Escalation is judged against the variant's assigned mode:** a slam or burst
goes past the variant's other screens on scale or color in the still frame; a quiet peak stands apart through
resolution, space and stillness and may be the calmest screen in the variant. A quiet peak is valid; a peak that
doesn't resolve the number, or reads like the core screen, is not. Whatever marks the moment (a color, a scale, the
stillness) is not spent on the other screens.

**Contents:** 1 Why · 2 Guidelines that steer · 3 The artifact · 4 Designing the round · 5 Oversupply, then select ·
6 Diversity matrix · 7 Capped devices · 8 Nearest pairs · 9 Thesis, rationale, trade-offs · 10 Presenting the round ·
11 Judging and feedback · 12 Later rounds · 13 Winner to design system · 14 Sources

---

## 1. Why the method looks like this

- **Parallel beats serial.** Designers who built several prototypes and got feedback on them together produced better,
  more varied work and took critique less personally: nearly half the serial group reacted badly to critique, none of
  the parallel group did [S13]. Build every variant at once; show them together.
- **Agents converge by default.** LLM users produced less semantically distinct ideas than users of another tool
  [S23]; stories built on an AI idea were 10.7% more similar to each other [S24]. N variants from one model drift to one
  "tasteful default" unless each is pinned to written positions (§6–§8). Strong guidance narrows range too (Dow's
  experienced participants made better but less diverse work [S13]), so principles fix brand truths only.
- **Width is for divergence, not choice.** Studios show a decider about three routes [S26][S9]. A first round of about
  ten explores the space, as Linear narrowed "hundreds of screens" to "a few major directions" [S12]; critique narrows
  it to 2–3 survivors.

## 2. Guidelines that steer

### 2.1 Split the document into layers

Principles need judgment and may be bent on purpose; rules are audited yes/no. Mixed together, agents treat
principles as checkboxes ("treating principles like laws makes them brittle" [S1]) or treat rules as optional.

| Layer | Nature | Can it bend? | Checked by |
| --- | --- | --- | --- |
| Principles (3–5) | Judgment; each one costs something | Yes, on purpose, reason written on the board | Critique: "which principle does this serve?" |
| Guardrails | Brand rules | Never | Yes/no per screen |
| Anti-generic rules, craft floors | Rules with numbers | Only where a row says "allowed when…" | Yes/no per screen, self-critique checklist |
| Presentation contract, round allocation | Templates and caps | No | The brief, the assembler, the checks |

Something that can never be bent is a rule, not a principle [S1]. Example (Repperoni R1): "never imply anyone is being
watched or checked" began as a principle draft and moved to the guardrails, where it can be audited.

### 2.2 Tests a principle has to pass

| Test | What it asks | Source |
| --- | --- | --- |
| Flip test | Is the opposite a plausible choice for another product? "Make it delightfully simple" fails: nobody picks "convoluted" | Intercom [S5], Zhuo [S4] |
| Says no | Would it make you rethink about two thirds of the existing designs? If nothing changes, it isn't a principle | Spool [S6] |
| Aimed at someone | Name the competitor or default it rejects | Spool [S6] |
| From research, scoped to now | Trace it to a product, audience or brand source; write when you would reverse it | Spool [S6], Friedman [S3] |
| Shown deciding | A do/don't pair built from the real content spec | Zhuo [S4], Friedman [S3] |
| States the trade-off | "If everything is equally important, nothing actually guides the decision"; 3–5 only, quoted by name in critique | Brignell [S2] |
| Rationale form | "We want X because Y": the reason lets an agent extend it to a screen the doc never mentions | Friedman [S3] |

Name principles "X over Y" (the tension is in the name) or as an imperative with a reason. Single adjectives ("Useful,
Fast, Simple") are good-but-not-great, because nobody can argue against them [S6].

### 2.3 Template

```markdown
### P<n> · <X over Y, or an imperative, 2–5 words>
**Because** <product truth or research finding, with its source>.
- **This means:** <what it decides on a real screen, phrased as a test you can apply to a screenshot>
- **This doesn't mean:** <the lazy reading an agent will default to, and the generic kit it licenses by accident>
- **Do:** <on the real content spec> **Don't:** <on the real content spec>
- **We'd reverse it** when <scope condition: a future feature, audience or screen type>.
```

The same six parts, as fill-in slots for a product's guidelines, are in
[guidelines-template.md](guidelines-template.md) (template §2, Principles).

Example (Repperoni R1), which passes the flip test because a competitive leaderboard app picks the opposite:

> **P2 · The crew over the champion.** Because the brand's energy is loyalty and ribbing, never punching down, and on a
> shared goal the crew wins, not one person. *This means:* every standings row has the same height, type size and
> grid, from the leader's 2,510 to last place's 0; a tie is one rank shown twice (=3, =3); the user is marked by the
> word "You", not a spotlight. *This doesn't mean:* hiding rank; a quiet mark on ranks 1–3 is fine if made of weight,
> a rule or spacing, never gold, silver or bronze. *Do:* "7 Aisha Bello 0", the 0 in the same weight and color as
> 2,510. *Don't:* fade or redden the last row, crown the leader, shrink rows by rank. *We'd reverse it* for a future
> head-to-head format where one person really does win.

### 2.4 Tension map, examples, change log

- **Tension map:** `| When these collide | Winner | How it plays out |`. Example (Repperoni R1): "Numbers over
  atmosphere" vs "Celebrate loud" on the Finish line: the number *is* the celebration, so art sits around or behind
  10,000, never above it. Any principle vs a guardrail: the guardrail.
- **Examples are illustrations, not assignments.** Say so at the top: a device named in the guide may be a signature
  only where the brief assigns it, because agents copy worked examples. Example (Repperoni R1): the draft used
  per-digit cells in both worked examples, so both were swapped and the device capped at one owner.
- **Change log.** Revise principles at every round boundary (Intercom is on its third major version [S5]).

## 3. The artifact: style tile plus live screens

| Artifact | Fixes | Leaves open | Risk | Source |
| --- | --- | --- | --- | --- |
| Moodboard | Emotional territory, references | Everything about the interface | "Often too vague" to move from talk to product | Warren [S9][S10] |
| Style tile | Fonts, colors, interface elements, texture | Layout | Hides how the language behaves at real density | Warren [S9][S10] |
| Comp | A complete screen | Nothing visual | Too literal too early; mix-and-match gives a "Frankencomp" | Warren [S9] |
| Stress-tested prototype | The direction across the main views | Polish | Costly; only for survivors | Linear [S12] |

**This skill uses a style tile with a thesis, above live hi-fi screens with identical content.** Warren's case against
comps is about responsive sites, where one comp per breakpoint is wasteful [S10]. On one fixed phone frame that cost
is small, and hierarchy, density and how the hero datum reads can only be judged at real density. Identical content
follows Material's research: designs compared as matched pairs on the same use cases, so only the design varies [S18].

**Mix at tile level, never at comp level.** The Washington Examiner's final design took tile 1, the red stars from tile
2 and the typeface from tile 3 [S9]; mixing whole screens gives a Frankencomp [S9]. So the steal list (§11) carries
elements (a numeral treatment, a chip shape, a progress form), never whole screens.

## 4. Designing the round: groups, families, routes

| Group type | What it is | Why it needs its own rules |
| --- | --- | --- |
| Borrowed family | Takes inside an existing world: the product's marketing site or brand, or an inspiration board the user names | Takes with shared fonts and palette converge on layout alone |
| Originals | Each borrows one named real object's **system**: grid, type genre, color logic, how it sets the hero datum | Without a named object, generic UI fills every axis the brief leaves open |

Example (Repperoni R1): A · 3 from the marketing site (kraft, tomato, chalkboard, tally marks); B · 3 from a
monochrome inspiration board; C · 4 originals (a teletext page, a letterpress show card, a shared flat's hallway
whiteboard, a council leisure-centre pool).

- **Family invariants.** Write `| Keeps | Never takes | Starting split |` per family; breaking two invariants leaves
  the family. Each family variant then **names the one invariant it bends and the axis it owns**, assigned in the brief
  and stated on the board. That is what keeps three takes apart.
- **Owned traits.** A trait a family owns (warm paper, pure #000/#fff, a mono data face) is a brand choice inside that
  family and a generic tell anywhere else. No display face crosses families; within one, vary cut, width and role.
- **No brand world yet?** A product with no marketing site, brand doc or user-named board has no borrowed family: run
  originals only, or treat a reference board the user names as the one borrowed family.
- **Stand-in worlds.** When a family depends on assets the product lacks, each variant names what stands in. Example
  (Repperoni R1): B's board was photo-led but only two of the crew had photos, so its takes named a match-day program,
  a floodlit pitch and one flash snapshot.
- **Originals take the system, not the props** (no wood grain or scanlines over an app kit). List each object with its
  limit, the native meaning that would break a guardrail (Example (Repperoni R1): fight-night cards for typography and
  color only, never "VS"). Require at least one contemporary source, so "original" doesn't mean "vintage".
- **Routes.** Label each variant **safe, adventurous or scary**, from the client's point of view [S26], so the decider
  knows what kind of risk each one is. Spread routes inside each group.
- **One calm direction, framed in brand terms.** Material 3 Expressive found broad appeal for vibrant design, but "a
  strong minority of users preferred calmer, less intense versions" [S17]. Check that calm doesn't slide into a
  register the brand forbids. Example (Repperoni R1): the calm pool drifted to wellness pastels; the review hardened
  the water to pool blue-teal and reframed it from "calm" to "fair and deadpan".
- **Fixed across all variants:** the content spec (one verbatim string list), the guardrails and the floors, so the
  comparison is about the look, not the data.

## 5. Oversupply, then select

Draft about **1.7–2× the target per group**, then select for divergence on a filled matrix. Selection on paper is
cheap; fixing convergence after N builds is not. Example (Repperoni R1): A 5 → 3, B 5 → 3, C 8 → 4 (18 → 10).

**Each candidate is a full spec** so collisions show before anything is built: group, name, one-liner, thesis, lineage,
mode, palette (name, hex, one role each), type (family, role, font URL), layout concept, an ASCII sketch per screen,
signature element, shape language, texture and imagery, motion moment, "not a default because", risks.

**Selection:** (1) place every candidate on the matrix (§6); (2) count against the caps (§7) and, where two collide,
keep the one that does it more natively; (3) check nearest pairs (§8) and hue neighbors, since adjacent hues in the
same role read as one; (4) balance routes per group, the calm one, the luminance mix, a contemporary original; (5) cut
the weakest brand archetype or highest brand-failure risk; (6) log **what was cut and why** (the collision, plus
anything worth stealing later) and **what was sharpened** (change and reason); (7) review the brief (§5.1).

Example (Repperoni R1): cut for "collides with V04 on split luminance, bands and a full-screen finish, and V04 does it
more natively", "a fourth dark-first variant", "its teal sits on V10's aqua". Sharpened: heroes shrunk to avoid a
fourth full-measure hero; "Page 302" renamed (a real broadcaster's page; never borrow owners' identities or names).

### 5.1 Review the brief before building

One reviewer, two adversarial lenses: **divergence and generic tells** and **brand and buildability** (R1, with a
reviewer per lens: 25 findings, 7 high).
If there's no time to revise the brief, make the findings binding on builders, the content spec winning conflicts.

- **Shared skeletons the axis labels hide.** In Repperoni R1, 7 of 10 rooms drew progress as the same thin bar with an
  outlined stub, 8 of 10 Finish lines shared one skeleton (number left, headline, two hairline fact rows, full-width
  button), and 7 of 10 set the room's hero flush left. Compare specs component by component (progress form,
  peak-screen skeleton, hero alignment, state tags, chip shape, fact rows) and cap what recurs.
- **Separations that are labels.** One pair claimed "packed vs roomy" with identical type scales and row heights.
- **Claims nobody measured.** A "full-measure" hero measured 195 of 358 px; a stacked number fitted on one line. Measure
  any claim a cap counts ("full measure", "fits", "stacks") in a browser with the served font.
- **The same joke twice** ("the board gets rewritten" in two variants). A shared joke is a shared signature.
- **Effort nobody judges:** ten motion choreographies in a round judged from stills. Reduce motion to one "Motion idea"
  line on the board until a round judges motion.

## 6. The diversity matrix

The brief fixes **every variant's position on every axis before any build**, in one table (`| # | Object | Surface |
Luminance | … |`), and a variant uses only its positions. Where a screen type decides the position (hero composition),
give each screen type its own column: a single column quietly described only the peak screen.

| Axis | Value vocabulary | Typical cap (N = 10) |
| --- | --- | --- |
| Object (source) | The named real object or family world | ≥ 1 contemporary among originals |
| Surface | tactile (paper, print, drawn, grain) · flat digital · photographic | — |
| Luminance | light-first · split (both in one screen) · dark-first | dark-first ≤ 3 |
| Palette structure | mono (± one accent) · dominant + one accent · two-ink · multi-ink (3+ inks, one role each) · tonal | dominant + accent ≤ 3 (exempt a family whose mono is invariant) |
| Hue family | Named from the object's inks (board green + coral; broadcast RGB on black) | No adjacent hues in the same role |
| Colour intensity | neutral (greys, ink) · tinted (a pale cast, C < 0.06) · saturated field (a solid colour covering ≥ 30 % of one screen, OKLCH C ≥ 0.12) · saturated ground (the page itself) | saturated field or ground ≥ N/2; neutral ≤ N/4 (unless the user asked for a quiet round). Kas pirmas R1 had 13 of 15 neutral or tonal and read as one app |
| Display face (genre) | Named by lineage: signwriter's inline, flexo stencil, scorecard mono, pixel, wood type, handwriting, municipal rounded | Never shared across families |
| Display width | condensed · normal · wide · mono or pixel · mixed widths | ≥ half the originals not condensed |
| Hero datum treatment | giant numerals · inline ledger · graphic counts (tally, bars, dots, cells) | — |
| Hero composition (per screen type) | full measure · stacked on two lines · inside the object · offset to one edge with open space · rotated (peak screen only) · modest in a loud field | full measure ≤ 3; same-edge offset ≤ 3 per screen type |
| Progress or meter form | The object's own form (tally gates, lane rope, lamp bank, cell row) | plain bar with outlined end ≤ 3 |
| Shape | 0 radius · mixed · pills and large radius | — |
| Containment | open (rules, lists) · cards · bands and slabs | — |
| Density | roomy · packed (backed by row heights) | — |
| Imagery | none or typographic · illustration or mascot · photo | mascot 1; photo as peak art 1 |
| Texture | none · one named material (12% grain; one grease ring, peak only) | Behind content only |
| Peak-moment mode (judged by the peak rule, top of this file) | typographic slam · graphic burst · quiet, ceremonial | full-screen ground change ≤ 4 |
| Energy | 2–4 mood words (warm, confident · quiet, exact · buzzy, dense · fair, municipal) | — |

The poles come from Refactoring UI's personality levers (font, color, radius, language) [S27], Material 3 Expressive's
"color, shape, size, motion, and containment" [S17], Warren's elements of design [S10] and the families. Read "hero
datum" as whatever the product's hero is (a count, a price, a map). Draw the matrix once, on the round cover.

## 7. Capped devices

A cap limits how many variants may use a device. The brief assigns each capped device **by name**, with a count
(`| Device | Cap | Assigned to | Count |`); a variant uses only what it was given, and anything unassigned is off.
Parallel agents can't see each other, so "first come" doesn't work; assignment does.

**Setting caps**
1. **Ban, then cap the next default.** For every default the guidelines ban, ask what a model reaches for once it is
   gone ("a model's next defaults once the first ones are banned") and cap that.
2. **Signature devices: 1.** A clever device gets one owner, or every variant that read the example uses it.
3. **Legitimate but common choices: about N/3** (dark-first, full-measure hero, dominant + one accent). **Mild tells:
   about N/2** (a tracked-caps label above the title).
4. **Count after drafting.** Tally recurring component forms across the candidate specs (§5.1); cap anything in more
   than about a third of them.
5. **Exempt a family invariant** from a cap it would otherwise use up. **Set floors too:** at least one contemporary
   source; exactly one calm direction.

Typical caps for N = 10 (Repperoni R1 and its review). This is the one complete cap list: the axis caps (dark-first,
dominant + accent, display width, full-measure hero) are in §6's cap column, and the other references point here. The
devices are a scoreboard's; for another product, keep the mechanism and redo the list from its own candidate specs
(rule 4) and its category's default kit ([generic-tells.md](generic-tells.md) §2.5).

| Device | Cap |
| --- | --- |
| Per-digit cells (plates, flaps, split cells) · finish-tape progress · tally-gate progress · a drawn underline or ring as a mark · a mono display face among originals | 1 each |
| Neo-brutalist poster kit (tilt + hard offset shadow + stickers) | 1, inside the family that owns it |
| Mascot · photo as the peak-screen art | 1 each, peak screen only |
| iOS 26 floating capsule tab bar | ≤ 2 |
| Count-up on the hero number · plain thin bar with an outlined end · full-measure hero · hero offset to the same edge (per screen type) | ≤ 3 each |
| Rounded pill reaction chips · full-screen ground change as the peak | ≤ 4 each |
| A tracked-caps label line above the screen title | ≤ 5 |
| A kicker label on the peak screen | Off by default; its reason goes on the board |

**Another N:** cap_N = max(1, floor(cap_10 × N / 10)). Counts written for 10 scale the same way, floors such as "at
least 3 variants" included; proportions ("≤ half", "≥ half the originals") and the one-variant floors (one calm
direction, ≥ 1 contemporary source) don't change.

| cap_10 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| N = 4 | 1 | 1 | 1 | 1 | 2 |
| N = 6 | 1 | 1 | 1 | 2 | 3 |
| N = 8 | 1 | 1 | 2 | 3 | 4 |

## 8. Nearest pairs

**The rule:** any two variants differ by **at least two steps on at least three axes**, never share a signature element
(including the joke), and never share a display face across families. On scale-like axes a step is one position; on
categorical axes, count genuinely different values. It is a working rule from the method research, not an external
finding: a difference on one axis reads as a recolor, while three read as different objects.

**Before build**, write `| Pair | What they share | What separates them (≥ 3 axes) |` in the brief, for pairs sharing
a family, luminance, ground, hue neighborhood or kind of wit. Each separation is a spec with numbers. Example
(Repperoni R1):

| Pair | Shares | Separates |
| --- | --- | --- |
| V02 Box lid · V03 Tally card | The family's kraft, espresso, tomato | Display (stencil vs mono) · containment (die-cut panels vs one card) · shape (0 vs r14) · number (giant vs tally gates) · celebration (burst vs quiet) · imagery (mascot vs none) |
| V05 Floodlights · V07 Forty columns | A pure #000 ground | Palette (mono vs six inks) · type (compressed + light sans vs pixel) · shape (r16 vs 0) · density (roomy vs packed) |

**After build**, check the result: 2–3 reviewers rate every pair from 1 (not similar) to 7 (very similar), Dow's
divergence measure [S13]; revise or cut any pair averaging 5 or more. Each variant must be picked out from a 120 px
thumbnail, and each screen, desaturated, must differ from its wireframe in composition, not only color. With no
wireframes, compare it with the category's default screen described in the domain research note
([generic-tells.md](generic-tells.md) §2.5).

## 9. Writing the thesis, rationale and trade-offs

**Thesis:** `<Product> as <a real object>, because <a reason tied to a principle or product truth>.` At most 25 words,
plus **"It tests: <one question>"**. The object names the system to borrow, the reason says why it serves the product,
the question tells reviewers what to judge.

- Good (Repperoni R1): "Repperoni as the council leisure-centre pool, because lanes are the fairest picture of a crew:
  same width for everyone, all heading for one wall." "Repperoni as the scorecard pinned beside the dartboard, because
  a tally is the oldest honest count: four strokes, then the gate, and nobody checks it."
- Test question (Repperoni R1): "Can dark mode be a mood rather than an inversion, with the light/dark pair becoming
  the celebration itself?"
- Bad: "A bold, modern, playful take on the scoreboard": adjectives with no element behind them.

**Name:** 2–3 evocative words (Specials board, Floodlights, Deep end). **Rationale: adjectives become elements**
[S10]: "tomato only on the one action and the user's own number", not "energetic".

**Trade-offs:** 3–5 costs, each with **where it bites**: legibility, dark mode, native build cost, cliché,
inclusivity, the boring screens (settings, errors, delete account, the longest list). "The pixel face stops reading
below 16 px, so settings would need a second face", not "may be hard to read". Honest costs make a board trustworthy
[S16]. **Rejected defaults:** 2–4 generic moves it refused, and what it did instead. Example (Repperoni R1): "Wellness
pastel. The aqua was hardened to real pool water and a black-teal ink."

## 10. Presenting the round

- **A plain scrolling page per round** is enough. The decision is about visual language, and side-by-side comparison
  serves it best ("comparison helps people focus on key relations" [S13]); a pan/zoom canvas only shows a part.
- **Scope feedback up front** [S14]: judge color, type, numerals, material and mood, not flow. Screens are real HTML
  with only the contract's links, and nobody polishes interactions.
- **Page order:** a cover (goal, groups, the matrix for all N, how to read a variant, the feedback wanted); one section
  per variant (board, then its screens side by side at true device size); then **compare strips**, N of each screen
  type in a row, as thumbnails linking to the frames. The strips are the "art museum" view a heat map needs [S25], and
  they expose similar pairs.
- **The board**, in reading order (thesis first, evidence next, costs last): a header (name as display type; number,
  family and route as separate elements, not a dot-joined string), then six mandatory blocks: thesis and test
  question; the signature, large on real content, with where the wit lives; palette swatches that read the variant's
  own tokens, with roles, one meaning per color and the contrast pairs that matter; type and numeral specimens on real
  strings (the longest name, the hero figures, a tabular check such as 1,111 over 8,888); rejected defaults;
  trade-offs. Optional: sources, an element collage, material and photo grade, a steal list, 2–3 "feedback we want"
  questions.
- **Short, and in the variant's own system.** Fix the width at 1,286 px for the default three screens (three 402 px
  devices, each a 390 px screen plus a 6 px bezel a side, and two 40 px gaps, so the board sits exactly over its
  phones); three is what the round page is tuned for. With 2 or 4 screens the board is N × 402 + (N − 1) × 40 px wide
  (844 or 1,728). Cap the height at 1,800 px: R1's final boards measured 1,126–1,629 px, so aim for about 1,100–1,400
  ([critique-patterns.md](critique-patterns.md) §4). Use no shared band grid (N boards on one grid is template
  chrome). Axis positions and adjectives stay in the brief. The full block spec, as it goes into a product's
  guidelines, is [guidelines-template.md](guidelines-template.md) template §6.2.

## 11. Judging and feedback

**Gates (pass/fail)**, whatever the score: guardrails, floors, fidelity to the string list, inclusivity, and a
**personality gate**. Guidelines made only of restraint are likely to yield N tasteful, clinical variants, so write at
least one positive gate, built from the audience's anti-personas. Example (Repperoni R1), asked of the three
screenshots: would a manager post it in the office Slack (must be no: too corporate)? Would a personal trainer post it
as motivation (no: too earnest)? Would a guy send it to four mates with "we're doing this" (yes)? And the board says
where the wit lives in the visual system, visible on at least one screen, never aimed at a person.

**Rubric (1–5), to steer the conversation, not to sum:**

| Criterion | Question | Source |
| --- | --- | --- |
| Hierarchy | Does the eye land on the hero datum and the primary action first? (M3 Expressive users found key elements up to 4× faster) | [S18][S17] |
| Perceived utility | Is it obvious how to use it? | [S18] |
| Style fit | High on the target adjectives, low on the anti-adjectives | [S18] |
| Distinctiveness (×2) | Would a competitor choose differently? Is it unlike the other N−1? | [S6] |
| One memorable idea | Can a reviewer name the signature after one look? | — |
| Stretch | Would it survive the boring screens? | [S12] |
| Buildability | Dark mode, font licensing, native build cost, texture and photo performance | [S12] |

**The round critic** (one agent, after every build) judges the variants side by side, from the compare strips and each
board: distinct, look-alike, grey or weak signature, then each variant's worst faults, as 2–6 concrete changes. In speed
mode it is the only critique. **The per-variant critic** (thorough mode: an agent judging one variant's screenshots
against the guidelines and brief) returns scores 1–10 for
fidelity, craft, originality, content and board; ranked must-fixes; **push further** (change a shape or placement, add
no accessories); and **remove one** (the ornament doing least work, e.g. "the white nub on the current tab… does no
work: selection is already shown by weight, stroke and white").

**Human feedback format**, printed on the cover; short and blunt is best. Per variant: **keep, push or kill** ("push" =
the direction yes, this execution no), **one thing to steal** even from a kill, and the **share test** (for Repperoni,
the group-chat test above). Across the round: **the best of each screen type** (they may come from different
variants), and any variant that feels off-brand or breaks a guardrail.

**In a live session:** a silent heat map (about 20 minutes, no pitch), a time-boxed speed critique, a straw poll, then
a supervote by the decider [S25]. Seniors speak last; feedback names problems, not solutions; "I like" names the
principle it serves; the decider synthesizes, and the room doesn't vote on details [S14].

**Close the loop** in `round-N/review.md`: `| Feedback | Decision | Reason | Next |`, including what you didn't act on
and why ("being transparent about what didn't change … builds more credibility" [S16]), plus the steal list, one line
per element with its source variant.

## 12. Later rounds converge

The Double Diamond's second half: many answers, then "rejecting those that will not work and improving the ones that
will" [S28]. Dow's parallel condition went three designs, then two, then one [S13].

| Round | Width | Artifact | Question |
| --- | --- | --- | --- |
| 1 | ~10 | Board + 3 key screens, identical content | Which visual languages are worth pursuing? → 2–3 survivors and a steal list |
| 2 | 2–3 | Each survivor on the hard screens: dense lists, longest names, empty and error states, notifications, settings, dark mode; now clickable | Does the language survive reality? (Linear's stress tests [S12]) |
| 3 | 1 + details | One direction; A/B of specific elements (numeral face, accent strength, radius) | Refinement at tile level [S10] |
| → | — | Tokens and components | §13 |

- Build each round from the last review: keep = carry forward; push = same thesis, new execution, feedback named in
  the new brief; kill = gone, except its steal-list items, added to survivors at element level. Rerun the gates and
  diversity checks on the smaller set (two survivors can still collapse into one); revise the principles.
- Log open questions on the boards rather than changing a round mid-run. Example (Repperoni R1): the marketing site
  made the crew total its hero mid-build; the variants kept theirs and a board logged it as a Round 2 question.

## 13. From the winner to a design system

- **From Round 1, one semantic vocabulary in every variant** (cheap then, saves a rewrite later), each scoped to its
  own class (`.r1-v03 { --surface: …; }`): `--surface`, `--surface-raised`, `--ink`, `--ink-muted`, `--accent`,
  `--on-accent`, `--celebrate`, `--line`, `--font-display`, `--font-text`, `--font-numeral`, `--radius-card`,
  `--radius-control`, `--radius-chip`, plus private primitives (`--kraft-500`). Board swatches and specimens read the same variables, so
  board and screens can't drift, and promoting the winner is a mapping job into the product theme, not a rewrite.
- **Three tiers** (Frost): raw values, semantic usage, per-component; the semantic tier keeps the brand's look "in its
  own layer away from the core component library" [S21]. Hi-fi components use only the semantic tier.
- **Generate, don't hand-list.** Linear replaced 98 hand-set variables per theme with three inputs (base, accent,
  contrast), generated in perceptually uniform LCH; the contrast input also yields high-contrast themes [S12]. Describe
  the winner's palette as a few decisions (surface, ink, one accent, the peak's color, contrast level).
- **Naming** (Curtis) [S20]: avoid homonyms (`type`, `text`; hence `font`); promote a token to global only when about
  three or more components need it; theme is not mode (light/dark is orthogonal to the brand theme).
- **Exchange format:** DTCG 2025.10, the first stable spec (28 October 2025), implemented by Style Dictionary, Tokens
  Studio and Terrazzo [S22]. **Order:** map the winner's semantic tokens into the theme; fold in the steal list; fill
  the gaps Round 2's stress screens exposed (error, empty, dense, dark); write the component tier last.

## 14. Sources

| # | Source |
| --- | --- |
| S1 | Brignell, "What design principles actually are (and aren't)", 2026 — https://principles.design/samples/design-principles-in-practice/ |
| S2 | Brignell, "Why Most Design Principles Fail", 2026 — https://principles.design/articles/why-most-design-principles-fail |
| S3 | Friedman, "A Practical Guide To Design Principles", Smashing, 2026 — https://www.smashingmagazine.com/2026/04/practical-guide-design-principles/ |
| S4 | Zhuo, "A Matter of Principle", 2015 — https://medium.com/the-year-of-the-looking-glass/a-matter-of-principle-4f5e6ad076bb |
| S5 | Connolly, "Introducing Intercom's product principles", 2022 — https://www.intercom.com/blog/product-principles/ |
| S6 | Spool, "Creating Great Design Principles: 6 Counter-intuitive Tests", 2011 — https://articles.centercentre.com/creating-design-principles |
| S9 | Warren, "Style Tiles and How They Work", A List Apart, 2012 — https://alistapart.com/article/style-tiles-and-how-they-work |
| S10 | Warren, Style Tiles — https://styletil.es |
| S12 | Linear, "How we redesigned the Linear UI (part II)", 2024 — https://linear.app/now/how-we-redesigned-the-linear-ui |
| S13 | Dow et al., "Parallel Prototyping Leads to Better Design Results…", TOCHI 2010 — https://hci.stanford.edu/publications/2010/parallel-prototyping/ParallelPrototyping2010-submitted.pdf |
| S14 | Nielsen, "How to Run a UX Design Critique", 2026 — https://jakobnielsenphd.substack.com/p/design-crit |
| S16 | Krause, "Closing the Loop: What to Do After a Design Critique Ends", NN/g, 2026 — https://www.nngroup.com/articles/after-design-critique |
| S17 | Google Design, the research behind Material 3 Expressive, 2025 — https://design.google/library/expressive-material-design-google-research |
| S18 | Material Design, "What does your UI say to your users?", 2024 — https://m3.material.io/blog/testing-material-3 |
| S20 | Curtis, "Naming Tokens in Design Systems", 2020 — https://medium.com/eightshapes-llc/naming-tokens-in-design-systems-9e86c7444676 |
| S21 | Frost, "The Many Faces of Themeable Design Systems" — https://bradfrost.com/blog/post/the-many-faces-of-themeable-design-systems |
| S22 | DTCG, "Design Tokens specification reaches first stable version", 2025 — https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version |
| S23 | Anderson, Shah, Kreminski, "Homogenization Effects of LLMs on Human Creative Ideation", 2024 — https://arxiv.org/abs/2402.01536 |
| S24 | Doshi & Hauser, Science Advances 2024, via University of Exeter — https://news.exeter.ac.uk/faculty-of-environment-science-and-economy/university-of-exeter-business-school/ai-found-to-boost-individual-creativity-but-results-in-less-varied-content |
| S25 | thoughtbot Design Sprint: heat map, speed critique, straw poll, supervote — https://thoughtbot.com/playbook/strategy/design-sprints/05-converge-exercises/heat-map |
| S26 | Airey, "How many logo options do you present?" (quotes Michael Johnson, johnson banks), 2015 — https://www.logodesignlove.com/how-many-options |
| S27 | Wathan & Schoger, *Refactoring UI*, "Choose a personality" (via a summary) — https://www.sglavoie.com/posts/book-summary-refactoring-ui |
| S28 | Design Council, "The Double Diamond" — https://www.designcouncil.org.uk/our-resources/the-double-diamond/ |
