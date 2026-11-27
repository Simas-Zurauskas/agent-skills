# Lessons

What real projects taught, newest first. Read before setting a new direction. Add an entry when a project teaches
something that would change how the next one is done: what happened, then what to do instead. Keep entries
general; project details go in that project's `DESIGN.md`.

## First trials of this skill (2026-11-25)

Seven builds by fresh agents (Sonnet, working alone): a bakery landing page without this skill (Anthropic's
frontend-design was in context), the same page with it five times across three revisions, and a wedding
guest-list screen with it. Every build with the skill passed the floor at every width; the variety between
builds is what the revisions were about.

| What happened | Do instead |
| --- | --- |
| With job-first structure (version 3), the same blind comparison went two wins, one tie and two losses against the plain builds, up from one win in five. Unprompted, the reviewer named the plain builds a template applied to every brief (dot-pill label, split layout with a card, floating info card, stats strip) and the skill builds "more particular to each brief". Both losses were fit to the feeling words: a cool navy for "late at night" read as an information page, and a heavy display headline with a yellow button read as marketing to a maintainer who asked for no fluff. Four of five skill builds shared a skeleton (headline and button on top, a drawn band below) | Translate each feeling word into temperature, weight and density before choosing colours and type ("late at night" is warm and dim, "trust on sight" is quiet and light). Watch the new skeleton; vary it when the subject suggests another |
| After the finish revision, the five heroes were rebuilt. They gained drawings, depth and atmosphere, but a blind order-swapped comparison still chose the build without the skill four times in five. The reviewer's reason: each skill build was organised around one concept (a counter cutaway, printer paper, an age ruler, a booking form) that pushed the main action below the phone fold or left awkward gaps, while the plain builds were job-first. The festival, where the concept itself produced the client's feeling, won | Structure from the job, character from the source. Working alone on one build, do not deal compositions. The main action in the first phone screen (now a check). The client's feeling words are the test |
| Five hero sections for five different products, each built with and without this skill. The owner judged the builds with the skill "arguably worse visually". They were correct and specific but flat: four of five became one flat colour field, a heavy grotesque, hairline rules and boxes, with no image and no depth. The builds without it were generic (cream and serif, accent words, eyebrows) but looked finished, carried by careful SVG drawings and depth | Specific and finished are both required. Replace a default, never just remove it. A careful drawing of the real subject is an anchor, not a tell. Working alone, build the strongest dealt direction, not hand 1. A concept is a trace, not a costume. The default test: if the generic version would look better, it is not done |
| Both bakery builds, made separately, chose a royal-blue page, a condensed sans and an amber button. Each agent had named cream-and-serif as the default and believed it had escaped | Working alone, never build your favourite direction. Name the predictable opposites as well as the default and strike both (direction.md step 4). This alone was not enough; see the next row |
| After that rule was added, two more builds avoided blue and amber and both produced a dark green page with the headline left and a white order card right. Colour changed; the skeleton did not | Prose cannot move structure. `scripts/deal.mjs` deals lens, composition, containment, colour strategy and density from outside the model, and alone the deal order decides which direction is built |
| With the dealer, one build honoured its hand ("poster, boxed, restrained") and came out as a single ruled order sheet, unlike all the others. The other was dealt "unequal tiles" and built the split hero again | A hand only works if it is checked. The hand check in direction.md step 8 compares a one-line description of the first screen with the hand, on the plan and again on the first render |
| The build with this skill put the order form in the first viewport with real computed pick-up dates; the other led with a drawn loaf and was never rendered by its builder | Know the job first, and let the product's working part be the visual when there are no photos |
| Both builders with the skill found real layout bugs only when they re-read their screenshots cold | The solo second look in review.md is a required step, not an optional one |
| Builders could render but not click, so dialogs and error states went unchecked until one wrote its own driver | `scripts/act.mjs` |
| A builder wrote the full direction ceremony for one app screen and called it too heavy | The light path in direction.md |
| On the guest-list screen the summary counts became the filter, after "say each thing once" | Keep the craft lines short and concrete; that is the kind that gets used |

## Carried over from earlier design rounds (2026-09 to 2026-11)

| What happened | Do instead |
| --- | --- |
| A round of contemporary UI styles applied to a product (bento, clay, sticker pop, a mascot) was well built and rejected by the owner as "gimmicky, thin trend skins" | Start every direction from a truth about the product and its people. A trend is not a direction |
| Twenty directions came out as typographic posters: big serif, walls of text, no rows, no icons, no imagery. The owner called them "really low quality" | The interface stays an interface. A direction states its rows, controls and navigation, and shows its world through material, colour, type and one signature |
| Builders had no inventory of what each screen holds, so they treated the content as strings to typeset | Know the job and the content of every screen before styling: blocks in priority order, states, actions |
| Builders had a realism bar but no quality bar; results looked plausible and flat | Put real screenshots of the best products the owner admires next to the work and judge against them first |
| The owner said "not very good" with no reason | Ask two short questions before changing anything: what felt wrong, and which products feel right |
| Feedback named a "never" ("the moon shouldn't be the main focus") | Turn it into a measurable rule with its reason and write it into `DESIGN.md` |
| Headless still screenshots hid a storefront's scroll-bar and motion glitches | Review with scroll bars visible and watch motion live or recorded |
| A font listed the needed glyphs and still drew Lithuanian diacritics badly | Look at real words in the product's language at display size before committing to a face |
| A list of banned fonts and colours produced the next most common fonts and colours | Use the tell list for checking, never as the brief. Change where the choice comes from |
| A critic that had seen the mechanical findings stopped looking for anything else | The reviewer forms a first view from screenshots before reading check output |
