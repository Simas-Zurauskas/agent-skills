---
name: ui-craft
description: Design judgement for any visual work an agent does, so the result is specific to the product and well crafted instead of generic AI output. Use whenever a task changes what a person sees - building or changing pages, screens, components, layouts, styling, landing pages, dashboards, forms, emails, mockups or HTML artifacts; choosing a visual direction; a redesign; or reviewing how something looks - even for a small styling change and even when nobody says "design". Also for "make it look better", "less generic", "more polished", "why does this look AI-made", "review this UI". Commands - direct (set a new visual direction), review (critique existing UI), check (run the rendered checks). Logos, splash screens and multi-variant exploration rounds have their own skills (logo-studio, splash-studio, mood-board-creator); they follow this skill's judgement inside their own process.
---

# UI Craft

Left alone, a model designs the average of everything it has seen: the same layout, palette and type for every
product, competent and interchangeable. Telling it what to avoid only moves it to the next most common look. What
works is different. Decide the design before writing code. Take the decisions from this product's own subject,
people and material. Then render the result and look at it with fresh eyes. And hold it to two bars at once: it
must belong to this product, and it must look finished and inviting. A page that is specific but bare loses to a
generic page that is polished, because people judge finish first. This skill is that method, sized to the task in
front of you.

`ui-craft` picks the path below by itself. `ui-craft direct`, `ui-craft review [target]` and
`ui-craft check <url>` force one.

## Whose decision wins

1. **The person's own words.** The brief, pinned choices (brand, fonts, colours, references) and corrections. Follow
   them exactly, including when they ask for a look that [tells.md](references/tells.md) lists. Redirecting a clear
   brief toward your own taste is a failure.
2. **The project's existing design.** `DESIGN.md`, tokens, the component library, shipped screens. Inside an
   existing system the job is to fit it and raise its craft, not to restyle it.
3. **This skill**, for every decision the first two leave open.

## Size the work first

| The task | What to do |
| --- | --- |
| A small change inside an existing design (restyle a control, add a field, fix spacing) | Use the system's tokens and components. Meet the [floor](references/floor.md) for what you touch. Render it and look. Nothing more. |
| A new screen, component or flow inside an existing design | Run the loop below with the system's vocabulary. Read [floor.md](references/floor.md), and [craft.md](references/craft.md) for the parts you are unsure of. |
| A new visual direction: a product or page with no design yet, a redesign, "make it distinctive", "less generic" | Read [direction.md](references/direction.md) and follow it before any code: its full path for an identity or an expressive page, its light path for one working screen. This is `direct`. |
| A review: "how does this look", an audit, a critique | Read [review.md](references/review.md). Report findings; change nothing unless asked. This is `review`. |

To find out whether a design exists, look: `DESIGN.md`, theme or token files, the Tailwind or CSS config, global
styles, the component folder, and two shipped screens. If what exists is an untouched library default (stock
shadcn, default Tailwind palette) and the surface is one people will judge by its look, say so and offer a
direction. Do not restyle silently, and do not treat the default as a decision someone made.

A direction chosen in a moodboard round is an existing design. Its record is the round's `extraction.md` (tokens,
components, signature rules, the owner's constraints); build from it and carry it into `DESIGN.md`. Do not run
`direct` again.

**Inside another design skill's round** (a mood-board-creator, logo-studio or splash-studio builder or critic):
the round's brief and your direction card are the person's words. Keep the assigned direction; do not deal or
propose new ones. That skill sets the scope, the checks and where files go, and wins wherever it differs from this
one. Use this skill for judgement only: [craft.md](references/craft.md), and rendering and looking before you
report.

## Two kinds of surface

Decide which one each screen is, by the screen and not by the product. A developer tool's landing page is
expressive; a wedding site's admin is working.

- **Expressive** (landing and marketing pages, invitations, portfolios, onboarding moments, campaign emails). The
  look is part of the message. **Structure from the job, character from the source**: lay the page out the way the
  best products in its category do for this task (a literal headline, the main action in the first phone screen,
  the facts a visitor needs), then make it unmistakably this product through colour, type, drawing, words and one
  signature. One memorable thing, everything around it quiet.
- **Working** (apps, admin, dashboards, forms, tools, docs). The look serves the task. Open on the working surface
  itself, never on a hero. Familiar controls, calm density, exact alignment. Character comes from type, colour
  roles, spacing, small details and wording, not from decoration.

## The loop

1. **Know the job.** Write one sentence each: who is here, in what moment, to do or decide what. Name the single
   primary action. List the real content and every state the screen can be in (empty, loading, error, one item,
   hundreds, very long text). Ask once for material that is missing and matters. Never invent facts: no made-up
   metrics, testimonials, customer logos, prices or names. Label demo data as demo. What you were not given (an
   address, how payment works, descriptive copy), leave out and list as open; a form with nothing behind it must
   not promise a reply or a delivery nobody has set up.
2. **Plan in writing before code.** A few lines: what the eye should hit first, second and third; a layout sketch
   (ASCII is fine); which tokens and components carry it. For a new direction this is the contract in
   [direction.md](references/direction.md).
3. **Check the plan against your default.** Ask what you would have produced for any similar request. Wherever the
   plan equals that, and the brief and system left the choice open, replace it with a choice that comes from this
   subject, and note what changed. Then scan [tells.md](references/tells.md).
4. **Build** from tokens, never one-off values. Real content. Every state from step 1. The whole
   [floor](references/floor.md).
5. **Render and look.** Run the check script at phone and desktop width, open the screenshots before reading its
   findings (your first impression is evidence, and the findings will anchor it), then operate the
   page with `act.mjs`: click, type, tab, scroll, trigger each state. Fix everything one look shows before looking
   again. Never say it looks right from reading code.
6. **Edit and finish.** Remove what is not earning its place: a border, a label, a pill, a section, an effect.
   Then add what a finished page has and a bare one lacks: a visual anchor that is not text, depth (a ground, a
   surface, something in front), detail at close range, and states that feel made. Then the **default test**:
   picture the version you would have made without this skill. If it would look more finished or more inviting
   than yours, yours is not done; you removed the default instead of replacing it. At most three render-and-fix
   rounds, and keep the best round, which is not always the last.
7. **Get a second pair of eyes** on a new direction or any large piece: a fresh reviewer who did not build it,
   briefed as in [review.md](references/review.md). You are a lenient judge of your own work. With no reviewer
   available, do the solo second look in that file; in trials it found real layout bugs every time.
8. **Record.** Keep the project's `DESIGN.md` true to what was built (template in
   [templates/DESIGN.md](templates/DESIGN.md)). When the person corrects a visual choice, write it there as a rule
   with its reason, at the level of the class of thing, so the same correction is never needed twice.

## Always true

- **A tell is a reason to look closer, not a ban.** [tells.md](references/tells.md) lists what generated design
  converges on right now. Each is fine when the brief, the system or the subject earns it and you can say why in
  one sentence. Escaping the list by producing a bare, timid page is the same failure in other clothes.
- **The floor is not a style choice.** Contrast, focus, target size, states, no overflow, labelled inputs. A
  beautiful page that fails these is broken.
- **Specific beats tasteful.** The test for any choice: could an unrelated product use this unchanged? If yes, it
  is a default, not a decision.
- **The client's feeling words are the test.** "Calm", "unhurried", "late at night": turn each into temperature,
  weight and density before choosing colour and type ("late at night" is warm and dim, not cool navy; "trust on
  sight" is quiet, not a heavy display face). Then read the first screen and ask whether it feels like that. A
  clever device that does not produce that feeling goes, however original.
- **Specific is not plain.** The cure for a default is a different source, never less finish. Replace a stock
  illustration with a better one drawn from the subject, not with nothing; replace a reflex gradient with real
  depth, not with a flat field. Flat colour, a heavy sans and hairline rules on every page is a house style too.
- **A reference, not adjectives.** "Modern, clean, premium" describes the average. "The departures board at a
  small regional airport" describes one thing. Direct yourself, and brief other agents, with the second kind.
- **Spend boldness in one place.** One signature per surface. More than one and they cancel out.
- **Words are design material.** Plain, specific, written from the user's side of the screen. In the language the
  product speaks, with that language's typography (quotes, diacritics, long words), checked in the real font.

## The scripts

```bash
node <this skill>/scripts/check.mjs <url-or-file> [more urls] [--widths 390,1440] [--out DIR] [--json]
node <this skill>/scripts/act.mjs <url-or-file> [--width 390] click=#add type=#name::Rūta key=Enter shot=DIR/added.png
node <this skill>/scripts/deal.mjs [--kind expressive|working]
```

**check.mjs** renders each page in a headless browser at each width, saves a first-viewport and a full-page
screenshot, and prints three things: **floor failures** (contrast, small text, crowded targets, overflow,
unlabelled inputs, missing focus styles, broken images and more; exit code 1), **tells** (look closer; never fail
the run), and an **inventory** of the fonts, sizes, colours, radii and shadows actually in use, which shows at a
glance whether the page follows a system. It only knows what can be measured. Hierarchy, fit to the subject and
whether the page is any good still need your eyes on the screenshots; it will not notice a word broken
mid-line, an awkward wrap or an element in an arbitrary place.

**act.mjs** operates a page: click, type, press keys, hover, read text, report what has focus, take a screenshot
after any step. Use it for every state that needs interaction (an open dialog, a validation error, a filtered
list), and `zoom=SELECTOR::file.png` to see an element at 3x when a glyph or a detail is too small to judge in a
full screenshot. States reachable by URL (`page.html?empty`) can go straight to check.mjs. Its steps are listed at
the top of the file.

**deal.mjs** deals the starting constraints when a person will choose between several directions (direction.md
step 5), so that their spread comes from outside your own habits. Working alone on one build, skip it.

Give each round its own `--out` folder (`shots/1`, `shots/2`) so rounds can be compared and the best one kept.
The first two need Node 22+ and `chrome-headless-shell` (they say how to install it if missing; `CHROME_PATH`
overrides), and close the browser they start.

## What to report

Two or three lines on what was decided and why. The evidence: screenshot paths and the check result. Any tell you
kept, with its reason. What is still wrong or unverified, stated plainly. Draft or unrendered work is never
reported as finished.

## Reference files

Read what the task needs, not everything. `direction.md` is read whole when it applies; `craft.md` and `tells.md`
are organised by topic, so read the sections you are deciding on.

| File | Read it when |
| --- | --- |
| [references/direction.md](references/direction.md) | Setting a new visual direction, or the existing one is a library default |
| [references/tells.md](references/tells.md) | Checking a plan or a render for generated-design defaults (dated; review it with each model generation) |
| [references/floor.md](references/floor.md) | Building anything; the numbers every surface must meet |
| [references/craft.md](references/craft.md) | Making type, colour, spacing, depth, motion and copy decisions well |
| [references/review.md](references/review.md) | Critiquing UI, briefing an independent reviewer, choosing between versions |
| [references/lessons.md](references/lessons.md) | Before a new direction; add to it when a project teaches something |
| [references/research/](references/research/) | A rule needs its evidence, or the skill is being revised |
