# Setting a visual direction

Use this when there is no design yet, when the person asks for a redesign or for something distinctive, or when
what exists is an untouched library default. The aim is a direction that belongs to this product and no other,
decided in writing before any code.

Why it is built this way: asked the same brief twice, a model produces the same theme. Variety and specificity have
to be put in before the code, from outside the model's habits. Banning the common looks does not do it; the model
slides to the next most common one. Grounding in the subject, proposing several directions that differ in
structure, and letting a person or a rule choose is what does.

Work through the steps in order. Keep each output short. Steps 1 to 6 fit on one page.

## Scale it

- **Full path**: a product's identity, an expressive page, a redesign. Every step as written.
- **Light path**: one working screen, or a small tool with no design yet. Steps 1, 2 and 4 in a line or two each.
  Step 3 with four or five sources instead of seven. Step 5 as three compact cards from a deal (name, source,
  thesis, palette, type, signature, cost; five lines each, no sketch). Then choose, write a contract of about a hundred
  words, run the checks, and sketch only the chosen screen.

Working alone, compact cards are enough on either path; the full card is for showing a person.

## 1. Brief

Write down, in a few lines:

- **Subject**: what the product or page is, concretely.
- **People**: who uses it and what they already know.
- **Job**: what they come to do or decide, and the single primary action.
- **Moment**: where and when they use it, on what device, with how much time and attention.
- **Material**: real copy, photos, data, numbers. What exists, what is missing.
- **Pins**: brand, fonts, colours, references, anything the person has fixed. These win over everything below.
- **Anti-references**: looks the person has rejected or the category is tired of.
- **Surface kind**: expressive or working (SKILL.md).

Ask the person once for what is missing and matters. If nobody can answer, state your assumptions and carry on.
Words like "profile", "dashboard" or "home" hide very different screens; pin down which one is meant.

## 2. Scene

One sentence of physical scene: who is looking at this, where, in what light and mood. "A couple on the sofa at
ten in the evening, choosing between three invitations on a phone." The scene decides light or dark, density and
tempo. The category does not: "finance means dark blue" is the reflex this step exists to break.

## 3. The subject's world

List at least seven concrete things from the world this product lives in, spread over at least three of these
lenses. Include one contemporary source, so that "original" does not quietly become "vintage".

| Lens | Ask |
| --- | --- |
| Places | Where does the activity happen, and where is it talked about afterwards? |
| Materials | What surfaces and stuff is it made of, written on, printed on? |
| Rituals | Which repeated moments carry the feeling we want? |
| Records and instruments | How does that world keep track, measure, label, score? |
| Media | How is it shown to others: signage, print, broadcast, packaging? |
| Systems | What current civic or commercial system organises similar information well? |

Also ask: what did this look like before the web?

This list comes first and stays wide. In step 5 each dealt hand names one lens; that direction grows from a
source under that lens, from this list or a new one found through it.

From each candidate take the **system, not the props**: its grid, its type genre, its colour habits, how it sets
numbers, how it makes emphasis, how it shows "in progress". An airport board gives ranked rows, fixed-width
figures and one status colour. It does not give a flip-clock animation glued onto a list.

Two guard rails, both learned the hard way:

- **The interface stays an interface.** The world shows in material, colour, type and one signature. It never
  replaces rows, buttons, tabs and inputs with a poster or an object drawn in type.
- **A current UI trend is not a world.** Bento, glass, clay, neo-brutalism and the like are skins. A direction
  that is a trend applied to the product fails even when well built.

## 4. Name the default

Write two lines:

- **The default build**: what any model would ship for this category. Layout skeleton, palette, type, component
  kit.
- **Its predictable opposites**: the two or three looks you would land on by merely avoiding the default. For a
  SaaS tool the default is purple gradients and cards; the predictable opposite is cream paper with an editorial
  serif. For a bakery or anything warm the default is cream, serif and terracotta; the predictable opposite is a
  saturated blue page, a condensed sans and an amber button. (Two separate builds of the same bakery brief both
  landed exactly there.) [tells.md](tells.md) lists the current ones.

All of these are off the table unless the brief asks for them. If a direction can be guessed from the category
alone, or from the category plus "not the usual", it is still a reflex.

## 5. Directions

**Working alone on one build, do not deal.** Take the composition from the job: the arrangement the best products
in this category use for this task, with the primary action in the first phone screen. Propose two or three
directions that differ in character (source, colour, type, imagery, signature), not in structure, and go to
step 6. In trials, dealt compositions made separate builds differ from each other but lost to plain job-first
pages in blind comparison: the device took space from the job.

**When a person will choose between directions**, deal the starting constraints, so the options they see are
really different:

```bash
node <this skill>/scripts/deal.mjs --kind expressive    # or --kind working
```

It prints three hands. Each hand fixes a lens to find the source through, a composition, a containment, a colour
strategy and a density. Propose **three** directions, one per hand (up to five with `--hands 5` when the person
wants a wider spread). Design each one inside its hand: a direction dealt "index, ruled, restrained, dense" is a
page you scan like a menu, not a split hero with a card. The hands widen what you consider; they do not oblige you
to build a weak page. If a hand cannot make a good page for this content, say so and use the next.

Why deal: asked for three different directions, a model proposes the same three every time, and builds the same
one. In this skill's own trials three separate builds of one brief all produced a headline on the left and an
order card on the right on a drenched page, each convinced it had avoided the default. Structure is what
converges, and only a constraint from outside the model moves it.

The directions must differ in structure, on named axes: composition, density, type voice, colour strategy,
imagery, containment, motion stance. Two that differ only in palette or copy are one direction; the hands
prevent that if they are honoured. Light or dark, the typefaces and the signature are not dealt; they come from
the scene and the source. Put the seed in the notes so the deal can be repeated.

For each, a compact card:

- **Name** that describes it ("Ledger", "Quiet gallery"), never A, B, C.
- **Source**: which thing from step 3 it grows from, and what was taken from it.
- **Thesis**: one sentence, including the default arrangement it refuses.
- **Colour**: the strategy first (restrained / one colour committed over a third of the surface / full palette /
  drenched), then 4 to 6 named hex values with roles.
- **Type**: the faces and their roles. Before choosing, name the first three faces that come to mind and set them
  aside; they are your defaults. Pick from the subject's world and check the face has every glyph the product's
  language needs. One family is often enough. Two must be clearly different.
- **Shape and depth**: radius, borders or shadows, how surfaces separate.
- **First screen**: an ASCII sketch of the first viewport or the main working screen, with alignment.
- **Signature**: the one thing a person would remember, built from the product's own strongest real thing.
- **Cost**: what this direction is worse at.

Then check each card against its hand. If a direction has drifted back to the composition you would have made
anyway, the hand was not honoured; redo it.

**A concept is a trace, not a costume.** An idea from the subject's world (a ledger, a ticket, a height chart)
should show in one or two places: the signature, a detail, a way of setting numbers. A whole page dressed as the
object reads as a gimmick and usually costs hierarchy and beauty. If the concept makes the page harder to read or
less attractive, keep less of it. It never pushes the headline, the main action or the key facts down. Even a
dealt composition keeps the main action in the first phone screen.

## 6. Choose

- **A person is available**: show the cards (quick rendered tiles of the first screen if cheap) and let them pick.
  Offer "plain category standard, done well" as a legitimate quiet option. Do not pick for them.
- **Working alone**: strike any direction that is the default or a predictable opposite (step 4), or that
  cannot do the job (the primary action buried, the audience unable to read it, material that does not exist).
  From the rest, build the one that will make the **best page**: the one that most feels like the client's own
  words, does the job most plainly, and gives the most finished and inviting result you can build well. That is a judgement about quality, not taste: say in
  one line what makes it the strongest. Record the choice and the runners-up with the seed, so the person can
  ask for another. If all are struck, deal again and say so.

When two versions must be compared by a model, read [review.md](review.md) on how judges mislead.

## 7. The contract

Before code, write the chosen direction into the project's `DESIGN.md` (template in
[../templates/DESIGN.md](../templates/DESIGN.md)), about 150 to 250 words of prose plus tokens:

- Thesis, and what it refuses.
- Colour roles, type roles, shape and depth, spacing and density, motion stance.
- The signature and where it lives. Where it must not spread.
- The first screen.
- A short Do / Don't list. Each line specific to this direction and with its reason ("Wine red only on the
  primary action and the monogram; its rarity is what makes it read as ours"). A long list means the direction is
  still vague.

Prose first, tokens second. The description of intent steers a model more than exact values do, and a specific
reference steers more than a list of adjectives.

## 8. Checks before building

0. **Hand check** (only when you dealt). Describe the planned first screen's composition in one plain line, without looking at the
   hand, and compare it with the hand's composition line. "Headline and blurb on the left, form or card on the
   right" is the skeleton models fall back to. If you drifted to it without a reason, change the layout. If you
   departed from the hand because it made a weaker page, keep the departure and say why in one line.
1. **Default check.** Put the contract next to the default build from step 4. Anything identical, where the brief
   left the choice open, gets replaced. Say what changed.
2. **Neighbour check.** Would a neighbouring product in the same category get this exact combination? If yes,
   change one decision and say which.
3. **History check.** If this project, sibling projects or your memory record earlier directions, compare. A new
   direction should differ from the recent ones on at least three axes (composition, palette family, type voice,
   containment, imagery, signature). Nothing recorded yet: skip this check.

Then scan [tells.md](tells.md) once.

## 9. Build order

1. Tokens: colour roles, type scale, spacing scale, radius and shadow scale, motion values. A bounded vocabulary
   the rest of the build picks from.
2. The first screen alone. Render it. Look at it cold, or hand it to a fresh reviewer, before anything else
   exists. Most directions are won or lost here, and it is cheap to change now.
3. The remaining screens and states, from the tokens. A new element enters through the system first, never as an
   inline one-off.
4. The loop in SKILL.md from step 5: render, operate, edit, second pair of eyes.

## 10. Afterwards

The contract from step 7 is the first version of `DESIGN.md`, not a separate document. Now correct it wherever
the build ended up different from the plan, so it describes what exists; a rulebook left as planned ends up
defended against reality. Add a dated line to its history: direction name, palette family, faces, composition,
signature. That line is what the next history check reads.

## Working inside an existing direction

Read the system before touching anything: `DESIGN.md`, tokens, components, two or three shipped screens. Treat
shipped code as evidence of the system, not as proof every part of it is right. Build with its vocabulary. If the
task needs something the system lacks, extend the system (a new token, a new variant) and then use it. If you
believe the direction itself is weak, say so with evidence and offer a `direct` pass; do not drift it one screen at
a time.
