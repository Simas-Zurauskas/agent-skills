# Tells: what generated design converges on

**Dated 2026-11.** Review this file with every new model generation. The tells move: the 2025 cure ("avoid Inter
and purple, use a characterful serif on warm paper") is the 2026 default.

## How to use this list

- It is for **checking**, after planning and after rendering. It is not a design brief. A page made by avoiding
  everything here is not designed; it is the next default, usually a bare, timid one.
- A hit means **look closer**. Keep it when the brief, the existing system or the subject earns it and you can say
  why in one sentence. A numbered list of steps is a real sequence. A print-shop product can earn paper and a
  serif. An owner's pinned brand colour is never a tell.
- Every tell has a positive move. Take the move; do not swap in the nearest substitute.
- The common root: each of these is a choice made **by habit, regardless of subject**. The fix is always the same
  question: what would this particular product, for these people, put here?

`scripts/check.mjs` flags many of these mechanically. The rest need your eyes on a screenshot.

## Colour and surface

| Tell | Why it reads as generated | Do instead |
| --- | --- | --- |
| Purple, indigo or violet-to-blue gradients; the framework's stock accent (Tailwind indigo/violet) used as the brand | The first and best-known default; says "nobody chose this" | A palette with roles taken from the subject; set the accent on purpose |
| Cream or ivory page (around `#F4F1EA`), high-contrast serif display, terracotta or clay accent (around `#D97757`); tokens named `--paper`, `--cream`, `--parchment` | The current "tasteful" default, strongest for warm, family, bookish, food and craft subjects | Start from the subject's real materials and their saturated colours; reach cream only with a stated reason |
| Near-black page with one acid-green, neon or vermilion accent, often with glowing edges | The "technical" default | Decide light or dark from the scene (direction.md step 2); give the accent a job |
| Saturated royal-blue page, condensed or heavy grotesque headline, amber or ochre button | The escape from cream for warm, food and craft subjects; two separate builds of one bakery brief both chose it (2026-11) | The script cannot see this one. If you arrived here by avoiding cream, you have not chosen yet; go back to the subject's world |
| Grey-white page, near-black heavy grotesque, one signal-red button | What "restrained" turns into by habit; two trial builds dealt a restrained palette both chose it | Restrained still needs a source: which neutral, which single colour, and why that one for this subject |
| Tinted near-black (`#0B0B0B`, `#111`) and off-white everywhere by reflex | A habit, not a palette | Neutrals with one deliberate temperature, tied to the accent's hue |
| Gradient text; decorative gradient washes behind sections | Colour standing in for hierarchy | Hierarchy from size, weight and space; flat grounds |
| Glows, aurora or mesh blobs, blurred orbs, spotlight halos, coloured shadows with no offset | Decoration with no source in the product | A real visual anchor: a photo, the product itself, a drawn element with a reason |
| Glass and backdrop blur as a look | Borrowed platform effect; hurts legibility | Blur only to solve a real layering problem, never under text |
| Grey text on a coloured surface | Looks washed out and fails contrast | Tint secondary text from the surface or foreground hue |
| One hue family for the whole interface (all slate-blue, all beige-brown) | Reads as a preset theme | A neutral, an accent, and semantic colours kept for meaning |
| One flat colour field, a heavy grotesque headline, hairline rules and boxes, no image and no depth | What builds with this skill converged on when they removed the defaults instead of replacing them (four of five in a 2026-11 trial) | Keep the specific source and add the finish back: an anchor that is not text, depth, detail |

## Typography

| Tell | Why | Do instead |
| --- | --- | --- |
| The same family every time. 2024 list: Inter, Roboto, system UI as display. 2025–26 list: Space Grotesk, Playfair Display, Fraunces, Cormorant, Instrument Serif, Geist, Satoshi, Outfit, DM Sans/Serif, IBM Plex, Plus Jakarta | Each was once the recommended escape; all are now reflexes | Name your first three instincts and set them aside; pick from the subject's world; any face is fine with a reason |
| One word in a headline set in italic, another colour or another face | The single most recognisable 2026 habit | Let the whole headline carry the voice; emphasis by wording |
| Italic serif display as the page's whole personality | The "editorial" reflex | A type voice the subject suggests; a plain face set with real care is often stronger |
| Small tracked ALL-CAPS eyebrow or kicker above every heading; a badge or pill above the H1 | Template chrome that adds no information | Cut it. If the label carries real information, set it as normal text |
| All-caps for ordinary labels and buttons | Same habit, smaller | Sentence case; caps only for a deliberate system such as a wordmark |
| Monospace for small labels and metadata "to feel technical" | Costume | Mono only for code, data that needs alignment, or measurements |
| Display type tracked very tight (about -0.05em and below); oversized hero type that crowds the viewport | A model-specific overcorrection | Tracking between about -0.03em and 0 for display; size the headline to the container |
| Many font sizes with small steps; weight 400 against 500 | No scale, no contrast | A scale with clear steps; contrast you can see at arm's length |

## Layout and structure

| Tell | Why | Do instead |
| --- | --- | --- |
| Centred hero, then three identical cards, then a call to action, then a footer | The skeleton of every generated page | Build the page from the visitor's job and the material's own shape |
| Split hero: headline and blurb on the left, a form, card or picture on the right, on any colour | The skeleton models fall back to once the centred hero is ruled out; four of five trial builds of one brief used it | A composition taken from the source and the dealt hand: a sheet, a list, bands, one column, a poster |
| Identical cards in a grid, each an icon, a heading and two lines | Content chopped to fit a container | Group by meaning; vary size and form with importance; use plain rows, bands or tables |
| Cards inside cards; a card around every section, metric or chart | Borders repairing a weak hierarchy | Space, alignment and type first; a card only when the container itself is the interactive or separable thing |
| One radius on everything; the same soft grey shadow (`rgba(0,0,0,.1)`) under every box; a hairline border plus a wide soft shadow on the same box | The component kit's defaults showing | A radius and shadow scale that follows hierarchy; child radius no larger than its parent's |
| A coloured stripe down one side of a card | Decoration pretending to be status | A stripe only when its colour encodes a state, with a label |
| An icon in a rounded tinted tile above each heading | Filler imagery | No icon, or one that helps recognition, at its natural size |
| Hero metric: a huge number, a tiny label, a strip of supporting stats | Fills space; the number is usually invented | Put each real number in the sentence that proves it |
| 01 / 02 / 03 markers on things that are not a sequence | Structure as ornament | Number only real sequences |
| Everything centred; every section the same height and silhouette; the same gap everywhere | No rhythm, no grouping | Alignment chosen per content; spacing that shows what belongs together |
| The whole first screen built as one object (printer paper, a ruler, a ticket stub, a cutaway, a form), pushing the main action below the phone fold | What builds with this skill did when told to take ideas from the subject's world; they lost four of five blind comparisons to plain job-first pages (2026-11) | Job-first structure; the concept as one trace (direction.md step 5) |
| A landing-page composition for a working tool (big hero, marketing cards inside the app) | Wrong genre for the surface | Open on the working surface |
| A big container holding one trivial value; the same information twice on one screen; a secondary thing made the most prominent | The "Frankenstein layout" | Prominence follows the task's priorities; say each thing once |

## Chrome and small habits

- Meta strings joined with middle dots: `Design · 4 min · 2026`.
- `WORD — fragment` labels with a spaced em dash.
- An arrow glued to link and button text: `Learn more →`.
- A pulsing status dot, a blinking cursor, a marquee, simulated typing.
- Sparkle icons and "AI-powered" badges.
- Emoji or Unicode glyphs used as icons.
- A visible theme toggle on a page nobody will theme.

Do instead: plain separators and real sentences; one icon family at one stroke weight; indicators only for a state
that is true right now.

## Motion

| Tell | Why | Do instead |
| --- | --- | --- |
| Fade-and-slide-up on every section as it scrolls in | The default entrance | One authored moment per page, or none |
| A hover lift or scale on every card; images that zoom on hover | Reflex polish | Motion that answers an action and shows what changed |
| Bounce or elastic easing; long, slow transitions | Reads as a toy; slows repeated use | Ease-out, short (see craft.md) |
| Loops that never stop | Draws the eye away from the task | Stillness by default |

## Copy

- Stock verbs and adjectives: elevate, seamless, unlock, supercharge, effortless, world-class, cutting-edge,
  reimagine, delve, tapestry, journey, ecosystem.
- Contrast fragments: "Not a tool. A platform." Two-fragment headings: "Fast. Simple."
- Question-then-answer reveals: "The result? …"
- The em-dash habit.
- Invented specifics that sound real: "Batch No. 047", "6:12 a.m.", "99.98% uptime", round numbers, "John Doe",
  "Acme".
- One warm, wry, slightly literary voice for every client.
- Text on the page that explains the page: its features, its layout, how it was designed. "Scroll to explore."
- The same conclusion repeated in three sections.
- Lorem ipsum or obviously generic placeholder text left in.

Do instead: say what the thing is and does in the product's own words; verbs that name the outcome; real facts or
none; a voice chosen for this client. Other languages have their own versions of these habits; check the copy in
the language it ships in.

## Imagery

- CSS or SVG fakes of photographs, crude or generic illustration (blobs, clip-art objects, an icon blown up to
  hero size), abstract shapes as filler, fake screenshots, fake browser windows. A careful drawing of the real
  subject is not a tell; see craft.md, "When there are no photos".
- Stock photos chosen by keyword.
- Images hidden under heavy overlays.

Do instead: real or provided material; the product itself; a clearly art-directed placeholder that names what must
replace it; or no image.

## Habits by model family

These shift with every release; treat them as a place to look first, and keep each family's notes separate,
because a rule that corrects one model can make another worse.

- **Claude**: italic serif display, eyebrow kickers, pulsing green dots, the cream-serif-terracotta set for warm
  subjects, a cool sans and dense cards for technical ones.
- **GPT**: display type tracked very tight, cards for everything, gradient or orb heroes.
- **Gemini**: images that scale on hover, heavy motion on every component.

## When the list misleads

- **Over-correction.** No cards, no labels, no gradients, no motion, no image, lots of empty space is its own
  template, and it looks worse than the default it avoided. Restraint means precise hierarchy, good type and one
  clear focal point, not absence. Replace each removed default with something better from the subject.
- **Substitution.** Swapping a flagged font for the next font on the list changes nothing. Change where the
  choice comes from.
- **Bans against the brief.** The person's pinned choices and the existing system outrank this file.
