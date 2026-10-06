# Round brief template (`round-N/brief.md`)

The round brief is the single source of truth for a round's **content** and for **each variant's direction**. The
selector agent writes it from the candidate pool. Every builder, critic and refiner reads it; the assemblers read only
`round.json`, which the lead fills from it (variant names, screens, flow). This file gives the skeleton, the patterns
that worked in a real 10-variant round, and a checklist distilled from 25 adversarial findings on that round's first
draft. Many of that round's defects traced back to the brief (sizes nobody had measured, a density with no numbers
behind it, an image prompt that broke a brand rule), so spend your time on §7 before you hand the brief to anyone.
Examples marked *R1* come from Repperoni Round 1 (a private scoreboard for friend crews' challenges: Home, a challenge
"room", a finale screen). Generalize them; don't copy them.

**Contents**
1. Where the brief sits: owners, inputs, precedence
2. The section skeleton
3. The content spec pattern
4. Per-variant spec fields (with a filled example)
5. The photo and asset library
6. Writing "The builder must not…"
7. Selector checklist
8. Supplements: when a source changes mid-run
9. Copy-paste skeleton

---

## 1. Where the brief sits

| Doc | Owns | Never owns |
| --- | --- | --- |
| `design-guidelines.md` | Principles, guardrails, anti-generic rules, craft floors, how a variant is presented, the axes and default caps | Content, or any single variant |
| `round-N/brief.md` | The content spec (strings, data, links), the N directions, axis positions, capped-device assignments, each variant's palette, type, layout and traps, and the asset library | Floors (it cites them) and file mechanics |
| The technical contract (the guidelines' template §8, from the target's doc: `targets/standalone.md` or `targets/design-lab.md` plus the lab's CLAUDE.md) | Files, markup, CSS scoping, font loading, build rules | Look or content |
| `round-N/review-findings.md`, `round-N/brief-<group>-update.md` | Amendments to the locations they name | Anything they don't name |

- **Content has exactly one home.** Once the brief exists, replace any earlier copy of the content spec (in the plan or
  in research notes) with a pointer to brief §4. A builder who reads the stale copy first will build the wrong numbers.
  *Example (Repperoni R1):* PLAN.md still held the uncorrected standings (Jordan 1,385, Aisha 150) after the brief had
  fixed them (1,535, and 0). Builders were told to read PLAN.md first, and the missing zero was the very edge case the fix
  existed to test.
- **State the precedence in the brief's header:** content spec (§4) > the newest supplement for the variants it names >
  review findings > the per-variant spec (§5). A variant may bend a *principle*, and says so on its board. It never bends a
  guardrail or a floor.
- **Inputs the selector needs:** the guidelines; the product and content research, with requirement IDs; the candidate
  pool (per candidate: group, name, one-liner, thesis, lineage, mode, palette with roles, type with roles, layout,
  signature, risks); the user's scope decisions; and font facts measured from the served files (see §7).

---

## 2. The section skeleton

| § | Section | Purpose |
| --- | --- | --- |
| Header | Round, date, author role, what the brief owns, the precedence, which research fixes it folds in | Tells every reader which doc wins when two disagree |
| 1 | **The round in one page:** the goal, the groups, how the round is shown, how to read a variant, what feedback we want | The part the user reads. The goal is the one decision this round serves (e.g. "pick a visual language, or narrow to 2–3") |
| 2 | **The N, and why these N:** a table (#, name, group · route, mode, one-liner), then *What was cut, and why* and *What was sharpened* (change, why) | Makes the selection auditable. The cut list, with the variant each cut collided with, is the idea bank for the next round |
| 3 | **Diversity matrix:** 3.1 axis positions, 3.2 capped devices assigned, 3.3 nearest pairs and what separates them | Decides divergence before anyone builds. A variant uses only the positions and devices it was given |
| 4 | **Content spec:** 4.0 all screens, one subsection per screen, the fixed string list, the visual never-list, links and the file contract | The same for every variant, so only the look changes |
| 5 | **The variants:** one section each, fields in a fixed order (§4 of this file) | The bulk of the brief |
| 6 | **Photo and asset library:** every shared image and asset, and the per-variant photo grades | Generated once, before the build, and shared |
| Sources | What was checked, how and when: font URLs return 200, digit widths read from the served files, contrast pairs recomputed | Lets a later agent trust the numbers or re-check them |

**§1, how to read a variant.** Five steps the user can follow cold. From R1: (1) read the board's first line, "<Product>
as ___, because ___": the bet, and the question it tests; (2) find the signature, the one idea that lands on a key
number (if you can't point to it on the screens, the variant failed); (3) squint at each screen for its **named squint
targets, in order** (room: "You 1,690", then "9,980 / 10,000", then the totals). Critics test these on a blurred
120 px thumbnail, so write them down; (4) compare like with like in the by-screen strips; (5) read the costs, including
where the variant breaks on the boring screens.

**§1, what feedback we want.** Keep, push or kill per variant ("push" means the direction is right and the execution isn't).
One thing to steal, even from a kill: mixing works at the level of the style tile and fails at the level of the whole comp.
Warren's client took one tile, the red stars from a second and the typeface from a third
(https://alistapart.com/article/style-tiles-and-how-they-work). Add an audience test in the product's own terms (R1: would
you send the finale to four mates? Would a manager post it in the office Slack?), plus the best version of each screen
across the round.

**§1–2, routes and the calm one.** Label each variant safe, adventurous or scary. That is the studio convention for
presenting routes (johnson banks, via https://www.logodesignlove.com/how-many-options), and it tells the decider what
kind of risk each one is. Include one calm direction on purpose: Material 3 Expressive's research found "a strong
minority of users preferred calmer, less intense versions" (https://design.google/library/expressive-material-design-google-research).
Calm still has to pass the brand's tone tests (§7, the pastel check).

**§3, why a matrix.** Ideas generated with an LLM grow more alike across people (https://arxiv.org/abs/2402.01536). In
Doshi & Hauser's study, stories built on one AI idea were 10.7 % more similar to each other
(https://news.exeter.ac.uk/faculty-of-environment-science-and-economy/university-of-exeter-business-school/ai-found-to-boost-individual-creativity-but-results-in-less-varied-content).
N agents from one model will converge on the same tasteful default unless each one is pinned to written positions.
- **Axes** (the vocabulary and typical caps: [method.md](method.md) §6): surface, luminance, palette structure, hue family, display face (genre), width, number treatment, hero
  composition, shape, containment, density, imagery, texture, peak mode, energy, plus the source object. Add a column
  for every form the product repeats on every screen (R1 needed a *progress form* column), and split any axis that
  behaves differently per screen (R1 needed *room hero* and *finale hero* as separate columns).
- **Rule** ([method.md](method.md) §8): any two variants differ by at least two steps on at least three axes, never share a signature element or
  its joke, and never share a display face across families. After the build, reviewers rate every pair from 1 to 7 for
  similarity, as in Dow et al.'s divergence measure
  (https://hci.stanford.edu/publications/2010/parallel-prototyping/ParallelPrototyping2010-submitted.pdf). Any pair
  averaging 5 or more gets revised or cut.
- **Capped devices** are the moves a model reaches for once its first defaults are banned. Table columns: device, cap,
  assigned to, count. Recount them after §5 is drafted (§7, divergence).
- **Nearest pairs:** list every pair that shares a family, a luminance or a hue, with what they share and the three or
  more axes that separate them. Each separating axis must point to a spec in §5 (a row height, a size, a form), not to a
  label.

---

## 3. The content spec pattern

**Why the content is identical in every variant.** It is the only way the comparison measures the look. Material's
research compares designs as matched pairs on the same use case (https://m3.material.io/blog/testing-material-3), and
the by-screen strips only work when all N Homes carry the same rows. Fixed content also shuts off a common source of
generic output: once an agent may invent content, it adds stat cards, "almost there" banners, eyebrows and column
heads. And every edge case gets tested in every variant, rather than only in the variants that happened to
include it.

**Brief §4.0, applies to all screens.** A table of `Item | Value`. Always fill in:
- **Viewer:** a name, plus a role chosen to keep extra UI out (*R1:* Sam is a member, **not the admin**).
- **Time and day:** status-bar times that agree with the greeting and the timestamps (*R1:* 18:41 and "Evening, Sam.";
  the wireframes' 9:41 default contradicted both).
- **Number format** (grouping, unit placement, tabular figures in columns) and **avatars** (who has a photo; everyone
  else shows initials as a designed normal state, in the same size, shape and ring).
- **Fixed sets**, such as the reaction set, **always in that order**: which chips show, and how "yours" differs (by more
  than tint).
- **Links vs plain text** (the viewer's own name, removed users), **labels that must never be styled as entities**
  (teams, groups, crests), and **required icons** with fixed names and sizes. Leave only their styling to the variant.

**Brief §4.1 … §4.S, one subsection per screen.**
Heading: `<Screen> — screen S, title "R{R} V{NN} · <Screen>"`, e.g. "R1 V01 · Home" (the file is `vNN/screen-S.html` standalone, `screen-rR-vNN-S.html` in the Design Lab). Then:

| # | Element | Content (verbatim) | Required? |
| --- | --- | --- | --- |
| H4 | Section header | **Needs you** with a plain trailing **4**. Not a badge, not red | Required |
| H7 | Log rows | Challenge name (link), avatar, name, amount with suffix, time, non-zero chips, and **Add a reaction** (44 × 44) on **every** log row | Required |

(Two rows from R1.) Give every element an ID (H1…, C1…, F1…), so critics and findings can cite it. After the element
table come the **data tables** with every row written out (the feed, the standings), then:
- **Optional:** only items §5 assigns to named variants.
- **Not allowed:** the habitual additions the product rules out. *R1 Home:* summary or stat cards, a featured card,
  carousels, streaks, charts, search, a bell, chat, online dots, a red badge, a third tab.

**Build the full content, even below the fold.** The screens are judged as static renders, so every required element has
to be visible without interaction. Pressed and open states are extras, and only where assigned.

**Required vs optional.** Anything that is *content* is required and fixed. Only styling is left open. An optional
content element breaks the comparison, because some variants show it and some don't. *R1:* the brief made the category
icon optional; the review made it required (`spray-can` on one row, `dumbbell` on the rest), because the product
requirement needs it and the Homes stopped comparing like for like without it.

**The fixed string list.** List every visible string per screen, and state that nothing else goes on a screen. Then
add: the optional strings and the variant that owns each; the **accessible names** (not visible); the **case rules**
(`text-transform: uppercase` only on display lines, labels and tags, one tracked-caps style per screen on at most two
roles, never on sentences); and **named examples of invented strings**, because builders reach for them (R1: "no column
heads such as RK / NAME, no YOUR COUNT eyebrows"). Say how separators render: a rendered middle dot "·" is a template
tell, so each variant turns the spec's dots into gaps, columns, line breaks or weight changes, and never joins two
separate strings with a new dot.

**`round-N/strings.json`.** The selector also writes the required strings per screen, keyed by screen number and
copied verbatim from §4, e.g. `{"1": ["Evening, Sam.", "Needs you"], "2": [...]}`. `scripts/check-strings.mjs` checks
that each one appears on every variant's screen. It doesn't catch extra strings: the never-lists and the critics do.

**The visual never-list.** Translate every brand guardrail into things you can see, and make each one a fail. *R1*
(guardrails: nobody is watched or checked; celebrate louder than you scold): no eye icons, no ticks or verification
seals, no presence dots, no pending or faded logs, no clocks or countdowns, no LIVE or REC dots, no cameras, no
referee imagery, no logs styled as receipts, and no red, fading or strike-through on any behind-state.

**Links and the flow.**

| From | Element | Target |
| --- | --- | --- |
| screen 1 | The rows that belong to the hero object | screen 2 |
| screen 2 | Back · the primary action | screen 1 · screen 3 |
| screen 3 | Close | screen 1 |
| Everywhere else | every other link-like element, listed | `href="#"` |
| Never links | current tabs, the viewer's own name, removed users | plain text |

The lead copies the screen-to-screen links into `round.json` as `flow`, and the target's checker requires each one;
without a `flow` it expects one cycle, 1 → 2 → … → 1. Point to the technical contract for
files and markup, and restate only the short version in the brief.

**The data story.** The numbers across the screens tell one consistent story, and they carry the edge cases on purpose.
- **Totals reconcile.** R1: the seven standings totals add up to 9,980, which is the crew total shown in the room.
- **One moment connects the screens.** R1: Sam's 40 reps (screen 2's primary action) take the crew from 9,980 to 10,020 /
  10,000 at 18:42, one minute after screens 1 and 2 (18:41). The finale's body line names that log.
- **Seed every edge case into real rows** ([craft-floors.md](craft-floors.md) §12 lists them; keep the ones your product has and add its own, such as a negative balance or a sold-out item). R1's set: a zero (shown in the same weight as every other total), a tie (=3 twice, then
  5), the longest realistic name (design for it first: wrap or truncate the *name*, never the figures or the type size),
  a removed user, a near-complete progress bar (99.8 % needs a drawn unfinished end of at least 8 px, because a
  proportional gap is 0.7 px), an over-target total (no bar past 100 %), and rows that must look different from normal
  rows.
- **Trace each element to a product requirement ID.** The R1 content research gave every row a Source column (HOME FR-2,
  STAND FR-9…). Checking the plan's content against those sources turned up seven fixes, among them a zero that had been
  changed to 150 and reactions listed out of their fixed order.

---

## 4. Per-variant spec fields

Use one fixed field order for every variant. Critics diff variants field by field, and a missing field shows up at once.

| Field | What goes in it | Why |
| --- | --- | --- |
| Identity line | Group · route · mode (light / dark / split, and any per-screen exception) | Places it in the matrix at a glance |
| One-liner | One sentence: the object and how the key number looks in it | Used in §2's table and on the cover |
| Thesis | "<Product> as ___, because ___." At most 25 words, naming a real object and a reason tied to a product truth, then **It tests:** one question | Adjectives with no element behind them are the generic tell |
| Essence · level | The essence truth it starts from (guidelines §1) and the quality-bar app family it is pitched at ("Level: Day One") | A direction that starts from a UI trend instead of a product truth reads as a skin (Dream Catcher R2) |
| Lineage | The source object's *system* (grid, type, color logic, how it sets numbers): what it takes, adds and refuses. For family variants, the one **invariant bent** and the one **axis owned** | Borrow the vernacular's system, never its owner's identity |
| Axis positions and capped devices | Copied from §3, including each device's "(1 of 3)" count | The builder never has to cross-reference |
| Palette | `Token · hex · role`, one meaning per color, with the computed contrast of every pair that is used. Mark fill-only colors "never text" and give the minimum size for large-text-only pairs | Contrast failures are the cheapest thing to catch at brief time |
| Type | `Family weight / size · role`, the heroes' sizes as **measured** widths, `tnum` facts, the smallest size each face may run at, then the exact font `<link>` URL | Unmeasured sizes were the biggest class of buildability findings |
| Layout concept | The ground, the containers, and what separates rows, per screen. The spacing steps. **Density in numbers:** row heights and what the first viewport shows | "Packed" as a word produced roomy builds |
| The key data form | E.g. the progress form: dimensions, fill, the unfinished end, contrast, its accessible name, and whether it is proportional | The form that converged most in R1 (7 of 10 rooms drew the same bar) |
| Sketches | One annotated ASCII sketch per screen: structure, not spacing, with font, size and color noted on the right | The cheapest way to pin hierarchy before code |
| Signature | The one memorable element, and **where the wit lives** on a named screen | Critics check that it is visible on a screen, not only on the board |
| Shape language | Radius roles, nested (screen → container → control → chip), and the reason for 0 or pill | |
| Texture and imagery | Texture (or "none"), illustration spec, the photo grade, mood images | |
| Motion idea | One line, unless motion is judged this round | Nobody judges keyframes on a static page |
| Separators | How the spec's dots render | |
| Per-screen notes | The squint winner per screen; the peak mode, and how the peak resolves the key number and escalates in that mode ([method.md](method.md), the peak rule) | |
| Why it isn't a default | Which generic move it resembles, and the specifics that make it different | Forces the selector to face the resemblance |
| Risks | The cliché risk, contrast, build cost on the target platform, where it breaks on boring screens | These go on the board as trade-offs |
| The builder must not | 3–5 numbered traps (§6) | |

**Filled example (Repperoni R1 · V02 Box lid, condensed):**

> **Group** A (marketing family) · **route** scary · **mode** light (the finale is a tomato lid flood)
> **One-liner.** The app printed on the takeaway box: one-ink stencil counts in tomato on kraft, laid out along the box's
> die-lines, and the lid swings open at the finish.
> **Thesis.** Repperoni as the pizza box the crew shares after the session, because a box print is two inks, big stencil
> numbers and die-lines. **It tests:** can the pizza half of the name carry the product without going kitsch?
> **Lineage.** Takes the site's kraft, liner, espresso, tomato and dashed tear line (here a die-line). Adds Big Shoulders
> **Stencil** as the flexo face, die-line panels instead of cards, and zero radius. Invariant bent: the solid display cut
> never appears. Axis owned: containment and shape.
> **Palette.** `--surface` kraft `#efe0c6` (espresso 13.92; tomato **4.30**, so tomato on kraft only at 24 px or more) ·
> `--surface-raised` liner `#fff8ea`, one meaning, "the list you read" (tomato 5.3, so small tomato text goes here only) ·
> `--accent` tomato `#c42e19`, one meaning, "your move, your count" (Log reps, 1,690, YOUR TURN, the progress fill),
> never on a behind-state · `--celebrate` cheese, finale only, never text on kraft (1.66).
> **Type.** Big Shoulders Stencil 700/900: 1,690 at about 108 px, 10,000 at full measure (about 136 px, measured). No
> `tnum`, so the heroes are static. **Nothing under 20 px**, because the stencil bridges break the word. Bricolage
> Grotesque for text; DM Mono 500 for the standings totals.
> **Layout.** Die-lines **at most five per screen, only between panels, never between rows**. Lists sit on a liner sheet.
> Log reps is a 0-radius tomato slab, 56 pt, pressed 2 px down. Spacing 4 / 8 / 12 / 20 / 28 / 40.
> **Progress: the tear strip.** A 14 px tomato fill ending in a 10 px unfilled perforation (non-proportional, on the board).
> **Signature.** Every hero count in flat tomato stencil, framed by die-lines. **Where the wit lives:** on the finale the
> lid opens with 10,000 printed inside it.
> **Risks.** Pizza kitsch; stencil bridges fragment small words; zero radius plus dashes can tip into a shipping label;
> the perforated strip sits near the banned ticket look; a 3D lid costs more in React Native.
> **The builder must not:** (1) put dashed lines between log rows, or perforate anything but the progress strip (logs
> must never read as tickets); (2) set small tomato text on kraft (4.30 fails), or any stencil below 20 px; (3) let the
> mascot or sticker appear on Home or in the room; (4) add pizza props (slices as bullets, cheese drips, a pepperoni
> texture).

The room sketch that went with it (trimmed):

```text
|- - - - - - - - - - - - - - - - - - - - - - -|  die-line 1
| GYM LADS   EXERCISE                         |  tracked caps label, 13/600
| THE PUSH-UP WAR                             |  Stencil 900/39 caps
|- - - - - - - - - - - - - - - - - - - - - - -|  die-line 2
| 1,690 reps                                  |  Stencil 900 ~108px TOMATO; reps ~42px espresso
| [#################################|:|:|:]   |  tear strip: tomato fill, 10px perforation
|#############################################|  liner starts
| =3  (Sam) Sam Okafor   You          1,690   |  DM Mono totals, all espresso
|################  Log reps  ##################|  tomato slab, 0 radius, pinned
```

*What the build then showed:* the Stencil **4** reads as "4·0" below about 48 px (its crossbar stub is detached), which hit
Sam's own "40 reps". Home came out roomy instead of packed, because no row height was given. Both are §7 checks now.

---

## 5. The photo and asset library

Generate the library once, before the build, into the target's shared `img/` folder (`<OUT>/img/` standalone,
`src/explorations/img/` in the Design Lab). Every variant uses these files and nothing else. How to generate,
check, compress and grade them is [images.md](images.md); this section is what the brief records.

| File | Status | Subject and style (prompt-ready) | Size | Used by |
| --- | --- | --- | --- | --- |
| `avatar-<name>.jpg` | Exists, keep | Who, framing, clothes, setting, light, "phone snapshot" | 480 × 480 | V01–V05, V07–V10 (graded in CSS) |
| `finish-<scene>.jpg` | New | People (count, genders, builds, ethnicities), place, light, framing flaws, what must stay dark for text, **what must not appear** | 2× the slot, e.g. 780 × 1120 | V06 (finale art) |
| `mood-<scene>.jpg` | New | For board mood only: no readable text, signage or logos | 1200 × 900 | V10 (board) |

Then a **per-variant grade table** (`# · grade name · CSS starting point`), with one grade per variant and no two alike.
The grade comes from the vernacular and is stated on the board. *R1:* V01 pub tungsten `sepia(.3) saturate(1.1)
contrast(1.08) brightness(.95)`; V04 B/W program print `grayscale(1) contrast(1.35)`; V09 "as sent" (no grade).

- **Grades are CSS unless the table says a file is baked.** A baked grade needs its own files, made by image-to-image from
  the base avatar so the face stays the same.
- **Run the three image checks** (realism; genre and cast; brand guardrails, on the prompt and on the result) before any
  variant uses an image: [images.md](images.md) §5. *R1:* three prompts had friends aiming phones at someone mid-rep,
  which is the "proof" the brand rejects; they were rewritten.
- **Rank assets by what depends on them.** When an image *is* the signature, write acceptance criteria into the brief
  (what makes it "an on-camera flash snapshot") and a fallback. *R1:* V06's finale photo came back as a level, centered
  lifestyle shot of four slim athletes. Its signature and its audience test failed together. Avatars matter far less
  (the user said avatar quality doesn't matter, so the baked flash avatars were dropped), but the variant still claimed
  a flash grade, and the CSS stand-in didn't read. When you cut an asset, cut or rewrite the claim that depended on it.
- **Spec every mascot or illustration to a buildable level, or cut it.** A builder given "a pizza slice with a
  sweatband" draws it freehand at 72 px, and the mascot is what tips a variant into a kids' game. The brief carries
  the spec table (canvas, body, details, inks, never, markup, kill rule): the format and R1's filled example are in
  [images.md](images.md) §8.

---

## 6. Writing "The builder must not…"

End every variant with 3–5 numbered traps. Each one names a specific temptation of *this* vernacular, followed by the
reason in a clause. The reason is what lets a builder recognize the next trap that isn't on the list. The good ones fall
into these kinds:

| Kind | R1 example |
| --- | --- |
| The vernacular's prop cliché | "Add pizza props (slices as bullets, cheese drips, a pepperoni texture)" · "waves, ripples, bubbles, ducks" |
| A contrast pair that fails at small sizes | "Set small tomato text on kraft (4.30 fails)" · "use float yellow or aqua as text" |
| An assigned device leaking past its scope | "Let the mascot or sticker appear on Home or the room" |
| The container kit creeping back | "Put each log row on its own white strip" (one card per row is the SaaS kit) |
| A near-miss with a guardrail | "Perforate anything except the progress strip" (logs must never read as tickets) · "shade, fade or color any lane" |
| Another variant's signature | "Draw a hand-drawn underline" (owned by V09 after the review) |
| A readable-number failure | "Set any stencil below 20 px" |

Don't spend a trap on something a floor or the checker already enforces. Traps are for what only this direction
tempts you to do.

---

## 7. Selector checklist

Run every check before the brief goes to review, and again on the final draft. The two R1 reviews (divergence and generic
tells; brand and buildability) raised 25 findings, 7 of them high. Each row below is one of them, or a defect the
critics found later that the brief could have prevented.

| Area | Check | Why (R1 evidence) |
| --- | --- | --- |
| **Measure** | Render every hero and every fitted line in a real browser, with the served font at the specified weight, width and `opsz`. Record the measured width in the type table | Jersey 10 at 104 px set 10,000 at 195 px, not the 358 claimed. Big Shoulders Inline at 118 px measured 303 px (85 % of the measure), which quietly made a fourth full-measure hero. League Gothic at 150 px was 198 px wide, not "about 262" |
| | Size things for the **container's inner width**, not the screen measure | V03's 10,000 at 99 px measured 356 px, inside a card with about 326 px of room |
| | Compute width-based effects string by string | V08's "wood type fitted by width": at 32 px no title could go slender (PULL-UP LADDER was 285 px at wdth 100). The contrast only appeared at 52–56 px |
| | Force line breaks explicitly | `<wbr>` breaks only on overflow, so V05's stacked "10," / "000" rendered as one line. Use `max-inline-size`, or an `aria-label` parent over two `aria-hidden` block spans |
| | Add up the vertical budget of the tallest screen against the frame height | V05's two 250 px lines, plus the headline, body, facts, CTA and home indicator, reached 844 |
| | Render the actual strings' glyphs at their sizes: 0, 4, 1, the comma, and "1,111" vs "8,888" with `tnum` on | DM Mono's slashed zero turned a last-place **0** into "Ø" (it reads as struck through), and no feature setting removes the slash. Stencil 4s read as decimals below about 48 px. Mono commas take a full cell |
| | Write density as numbers: row heights, gaps, what the first viewport shows, including rows' required controls | Three of the five "packed" variants came out roomy. V02's log rows ran 130–140 px because each spent a whole 44 pt line on the add control |
| **Contrast** | Compute WCAG 2.x for every text/surface pair and every non-text boundary at 3:1 (progress fill vs track, the unfinished end vs its surface, a control's only border) | Aqua and yellow floats were 1.7:1 and 1.4:1 on white, and needed teal outlines. White on #FF0000 is 4.0:1 |
| | Mark fill-only colors "never text", and give the minimum size for any large-text-only pair | Tomato on kraft at 4.30 is allowed only at 24 px or more |
| | A color change inside a progress fill reads as a state boundary; check it in a grayscale squint | V10's last nine floats were yellow, so the rope read as 80 % done, not 99.8 % |
| | Don't echo a system glyph next to it | V01's outlined progress end sat under the status-bar battery and read as a second battery |
| **Consistency** | The type table, the sketch annotations and the must-nots agree | V05 set "You" at 20/300 while its own rule said "300 only at 28 px and above" |
| | The matrix, the caps and §5 agree both ways: a variant counted under a cap really does the thing, and an assigned device appears in its text | V07 was counted as full measure but wasn't. V04's sketch drew a pill where §3.2 gave it a tracked line |
| | The board promises only what the phone shows at real size | V01's board showed a price-line finale the phone couldn't fit at its sizes. V10's "depth marking" joke never appeared on a screen |
| **Divergence** | Count every repeated form across all N, not only the capped ones, and cap anything in more than about a third of them (4 of 10; [method.md](method.md) §7) | The progress bar, the finale skeleton, the whole-ground change and the flush-left hero each recurred in 7–8 of 10 ([method.md](method.md) §5.1). The review added caps: ≤ 3 plain bars, ≤ 4 ground changes, ≤ 3 left-set heroes per screen type |
| | Compare the type ladders of the nearest pairs, not their labels | V04 and V06 had identical Home sizes (24/400, 16/700, 17/600, 15/400, 13/600 caps) and the same tag, and "packed vs roomy" had no spec behind it |
| | No two variants share a signature element or its joke | V01 and V09 both "rewrote the board" and both had an underline that draws itself. V01's fix: "draw any underline, swoosh or ring: V09 owns drawn marks" |
| | No token borrowed across families; count the caps roles per screen, tabs included | V08's press black `#1B1512` was nearly group A's espresso `#1d1410`. Its caps tab labels added a third caps role |
| **Generic tells** | No trailing arrow on a tag or a button, whatever draws it | Swapping the → glyph for an icon arrow kept the tell, and made a status tag look like a button |
| | No opacity-plus-translate fade-up, even as a second beat | It came back as the second beat of several finale sequences |
| | Say per variant how the separators render | Six variants kept "·"-joined meta verbatim, and some invented new joined strings |
| | Pastel + rounded face + primary accents is the kiddie or wellness tell. Harden it, or show on the board how it passes | V10's pastel aqua and heavy rounded face ran into the brand's "no wellness pastels" rule |
| | Check variable-font axes and domestic metaphors for childishness | V09's bouncy handwriting axis and a ringed chore rota read as a family fridge chart, a named anti-persona |
| **Brand and product** | Check every image prompt and metaphor against the guardrails | Friends filming a rep = the "proof" the brand rejects (§5) |
| | Never style a label as an entity | V04 drew "GYM LADS" as an outlined pill badge, which reads as a team crest |
| | Keep trade names and real owners out of token names and board copy | DayGlo's trade names for the inks. A real broadcaster's page number as a variant name |
| | Required product elements stay required; every mascot or illustration is specced or cut | The category icon (§3). The mascot (§5) |
| **Build and scope** | 44 × 44 targets fit the layout's pitch without overlapping; otherwise double the pitch or make the whole row the link, and say how emoji and icons snap to any cell grid | V07's 26 px row pitch couldn't hold a 44 pt target per name link |
| | Name each technique precisely enough to rule out its digital shortcut | V08's "split fountain" came out as a smooth pink→orange→yellow sweep, the social-app gradient it meant to refuse. Its "halftone" was a uniform dot lattice whose dots never tracked tone |
| | Don't spec what nobody judges this round | Ten keyframe choreographies were specified for a round judged as still frames. Make it one "Motion idea" line and compose the reduced-motion frame first |

---

## 8. Supplements: when a source changes mid-run

When a source the brief was built on changes during the run (the marketing site ships, the user makes a call, a review
lands after the revision was cut), write a **supplement**. Don't edit `brief.md` in place: builders are already working
from it, and a supplement keeps the change auditable. Hold only the builders of the variants it touches. *R1:* 11 commits
landed on the marketing site after the research capture. Groups B and C started building at once, while group A waited
for `brief-A-update.md`.

Structure (from `brief-A-update.md`):
1. **Header:** what it amends (the variants and the brief sections), what triggered it (a commit hash or the user's
   words), and the date. Say plainly that `brief.md` itself is not edited.
2. **How to use this file:** every item is marked **Supersedes** with the location it replaces, and anything it doesn't
   mention stays as the brief says. State the precedence, e.g. brief §4 > this file > review findings > brief §5.
   Fold in the review findings that name these variants (marked *RF* with the finding's line), so builders don't have to
   reconcile two documents. Where you override a finding, say why.
3. **What moved at the source:** the concrete changes, with hex values, anatomy and copy.
4. **The lead's decisions:** a table with one row per decision and one column per affected variant.
5. **Family-wide changes,** then **per-variant changes.** Each variant section opens with an **Unchanged:** line, then
   the superseded fields.
6. **Updates to §1–§3:** the new one-liners and axis rows, the cap changes, and the recomputed nearest pairs. A re-ink
   creates new neighbors. *R1:* re-inking V03 in cobalt and lime moved it next to V09 (a blue at the same OKLCH hue),
   V10 and V08. Each pair was separated with OKLCH figures (lightness, chroma, hue angle), not just "different blues".
7. **For the brief owner (not builder instructions):** decisions that the guidelines or the caps now need, kept apart
   so builders don't act on them.

**Keep the content spec fixed even when the source's copy changes.** *R1:* the site now said "trash" and "squad", but the
screens kept "Bins & dishes" and "crew". The source's new voice went onto the boards (sign-offs and captions) instead,
and "Don't copy from the site" listed the site eyebrows that builders must not import.

**When the final revision is cut for time,** the review findings file becomes the supplement. Give it a two-line header:
"builders apply these directly; every finding that names your variant (or 'all') is binding unless it contradicts brief
§4, and then §4 wins".

---

## 9. Copy-paste skeleton

```markdown
# Round N brief: <N> directions for <Product>

Round N · written <date> by <role>. Source of truth for **content** and **each variant's direction**. design-guidelines.md
owns principles, guardrails and floors; <technical contract> owns files and markup. Precedence: §4 > supplements >
review findings > §5. Folds in <research fixes>.

## 1. Round N in one page
### The goal            <!-- the one decision this round serves -->
### The groups          <!-- | Group | What it is | Variants | -->
### How the round is shown
### How to read a variant   <!-- 5 steps, with per-screen squint targets -->
### What feedback we want   <!-- keep/push/kill · one steal · audience test · best of each screen -->

## 2. The N, and why these N
| # | Name | Group · route | Mode | One-liner |
### What was cut, and why   <!-- candidate · the variant it collided with · what to revisit -->
### What was sharpened      <!-- | # | Change | Why | -->

## 3. Diversity matrix
### 3.1 Axis positions      <!-- one row per variant; split per-screen axes -->
### 3.2 Capped devices, assigned   <!-- | Device | Cap | Assigned to | Count | -->
### 3.3 Nearest pairs, and what separates them   <!-- ≥ 3 axes, each a real spec -->

## 4. The content spec (every builder, every variant)
### 4.0 Applies to all screens
### 4.1 <Screen 1> — screen 1, title `R{R} V{NN} · <Screen 1>`
<!-- element table with IDs · data tables · Optional · Not allowed -->
### 4.S …
### 4.x The fixed string list (nothing else goes on a screen)   <!-- the required ones also go in round-N/strings.json -->
### 4.y Visual "never" list (each is a fail)
### 4.z Links and the file contract

## 5. The N variants
### V01 · <Name>
<!-- identity · one-liner · thesis + It tests · lineage · axis positions + capped devices · palette · type + font link ·
     layout (density in numbers) · key data form · sketches · signature + where the wit lives · shape · texture and
     imagery · motion idea · separators · per-screen notes · why it isn't a default · risks · the builder must not -->

## 6. The photo and asset library
| File | Status | Subject and style | Size | Used by |
<!-- per-variant grade table · asset specs (mascots, illustrations) with kill rules -->

## Sources
<!-- what was checked, how, and when: font URLs, digit widths, contrast pairs -->
```
