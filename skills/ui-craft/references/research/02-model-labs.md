# 02 - Model labs' official guidance on anti-slop UI/UX (Anthropic, OpenAI, Google)

Researched 2026-11-25. All sources below were read directly (primary) unless marked "not read" or "failed". Nothing is quoted from summaries.

---

## 1. Sources table

| # | Title | URL | Publisher | Date / version | Credibility note |
|---|---|---|---|---|---|
| A1 | frontend-design SKILL.md (3 generations) | github.com/anthropics/skills/tree/main/skills/frontend-design ; github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design | Anthropic | v1.0 Nov 12 2025 (claude-code plugin); desc-only edit Dec 4 2025; rewrite Jun 9 2026 (plugin 1.1.0 Jun 18); rewrite Sep 1-3 2026 = v1.1.1 (explicit version Oct 26 2026) | Primary, canonical. Local ~/.claude copy v1.1.1 is byte-identical to anthropics/skills commit 41bbe19d (Sep 3 2026): verified by diff. |
| A2 | Improving frontend design through Skills (blog) | claude.com/resources/articles/improving-frontend-design-through-skills | Anthropic Applied AI (Rajasekaran, Wei, Bricken) | 2025-11-12 | Primary. Origin of "distributional convergence". |
| A3 | Prompting for frontend aesthetics (cookbook) | platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics | Anthropic (Rajasekaran) | 2025-10-21 | Primary. Contains the ~400-token `<frontend_aesthetics>` prompt and isolated typography/theme prompts. |
| A4 | Claude prompting best practices: "Frontend design" | platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices (use `.md` suffix for code blocks) | Anthropic docs | live, Nov 2026 | Primary. Still carries the old long snippet (written for Opus 4.5/4.6) and points to Claude Design. |
| A5 | Prompting Claude Opus 4.8 / Sonnet 5: "Design and frontend defaults" | .../prompting-claude-opus-4-8.md ; .../prompting-claude-sonnet-5.md | Anthropic docs | 2026 | Primary. Most important: admits a house style and that "don't use X" backfires. |
| A6 | Harness design for long-running application development | anthropic.com/engineering/harness-design-long-running-apps | Anthropic Labs (Rajasekaran) | 2026-03-24 | Primary. The only lab source with an evaluation method for design (4 criteria, evaluator agent). |
| A7 | Introducing Claude Design; "Claude Design now stays on brand"; support "Get started with Claude Design" | anthropic.com/news/claude-design-anthropic-labs ; claude.com/resources/articles/claude-design-stays-on-brand-for-daily-work ; support.claude.com/en/articles/14604416 | Anthropic | 2026-04-17; update 2026-06-17 (+Sep 2026 note); standalone claude.ai/design closes 2026-12-14 | Primary product docs; little prompt-level design philosophy, mostly workflow (design system import, handoff). |
| A8 | canvas-design, theme-factory, web-artifacts-builder, brand-guidelines (+ discernment-nudge, irrelevant) | github.com/anthropics/skills/tree/main/skills/* | Anthropic | unchanged since Dec 1 2025 (Apr 2026 only license edit) | Primary; example skills, thin on UI. |
| A9 | `artifact-design` skill (bundled in this Claude Code build; what Anthropic's own Artifact tool tells Claude) | loaded locally via Skill tool | Anthropic | Nov 2026 | Primary but internal-facing; useful as the latest Anthropic wording of anti-slop rules. |
| O1 | GPT-5 prompting guide, "Frontend app development" | developers.openai.com/cookbook/examples/gpt-5/gpt-5_prompting_guide | OpenAI | 2025-08-07 | Primary. Source of `<self_reflection>` rubric and recommended stack. Fonts advice now outdated. |
| O2 | Designing delightful frontends with GPT-5.4 + `frontend-skill` | developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4 | OpenAI Developers | 2026-03-20 | Primary. Most concrete OpenAI design rule set ("hard rules", litmus checks). |
| O3 | openai/skills `frontend-skill` (curated) | github.com/openai/skills (commit 82d2c5b4 add Mar 20 2026; 11c64381 removed Apr 23 2026) | OpenAI | Mar-Apr 2026 | Primary. Removed from the repo after about 5 weeks; repo later deprecated in favour of openai/plugins (Jul 2026). Still readable in git history. |
| O4 | openai/plugins `build-web-apps/frontend-app-builder` (+ `references/imagegen-website-concepts.md`) and `product-design` plugin (ideate, design-qa, audit) | github.com/openai/plugins/tree/main/plugins/build-web-apps ; .../product-design | OpenAI (Codex) | Apr 23 - May 6 2026 | Primary; the current Codex successor to O3. Image-first workflow. |
| O5 | Frontend prompt instructions (targets GPT-5.5) | developers.openai.com/api/docs/guides/frontend-prompt(.md) | OpenAI API docs | 2026 (GPT-5.5 era) | Primary, most current OpenAI rule list. Linked from the GPT-5.5 guide ("Frontend engineering and visual taste"). |
| O6 | Using GPT-6.2 -> "Frontend design" | developers.openai.com/api/docs/guides/latest-model(.md) | OpenAI API docs | GPT-6.2 launched Nov 2026 (date from a third-party blog, not verified) | Primary, newest; very short: only 2 rules + "use a reference image". Signals OpenAI slimming guidance as models improve. GPT-5.6 page: only says model has "stronger layout, visual hierarchy, and design judgment". |
| G1 | DESIGN.md spec, PHILOSOPHY.md, README | github.com/google-labs-code/design.md (docs/spec.md) | Google Labs | repo created 2026-04-10; v0.1.0 Apr 21, 0.2.0 May 26, 0.3.0 Jun 15, 0.4.0 Jul 27 2026; spec labelled alpha; ~29k stars | Primary. Most original idea in this track (prose over tokens). |
| G2 | Introducing "vibe design" with Stitch | blog.google/innovation-and-ai/models-and-research/google-labs/stitch-ai-ui-design | Google Labs | 2026-03-18 | Primary, marketing level. |
| G3 | stitch-skills (`taste-design`, `enhance-prompt`, `design-md`, `generate-design`) | github.com/google-labs-code/stitch-skills/tree/main/plugins | Google Labs repo | taste-design touched 2026-05-10 and 2026-11-21 | Primary hosting, but `taste-design` is a community-contributed port (commit authors JLXIA, Sahilkumar-r) of a popular "taste skill"; treat as Google-hosted, not Google-authored doctrine. |
| G4 | Generative UI: LLMs are Effective UI Generators (paper + blog) | arxiv.org/abs/2604.09577 ; research.google/blog/generative-ui-... | Google Research | blog 2025-11-18; paper Apr 2026 | Primary research. About runtime-generated UI, not craft; includes the full system prompt (appendix) and a prompt ablation. |
| G5 | Stitch Prompt Guide (forum) | discuss.ai.google.dev/t/stitch-prompt-guide/83844 | Google AI forum (staff post) | 2025-05-19 | Primary but old and basic. |
| G6 | Gemini API prompt design strategies / Gemini 3 section; whats-new Gemini 4 | ai.google.dev/gemini-api/docs/prompting-strategies ; aistudio.google.com/docs/whats-new-gemini-4-carbon.md | Google | 2026 | Primary. No frontend/aesthetics guidance found. |
| - | Stitch "Effective Prompting Guide" (stitch.withgoogle.com/docs/learn/prompting) | - | Google | - | FAILED to fetch (JS-rendered; jina and tavily both failed). Not read. Stitch skills refer to it as authoritative. |
| - | GPT-5.1 / GPT-5.2 prompting guides | - | OpenAI | - | Not read in full. One search snippet of the GPT-5.2 guide (section "Preventing scope drift, e.g. UX/design in frontend tasks") says: implement exactly what is asked, "Do NOT invent colors, shadows, tokens, animations, or new UI elements, unless requested". Unverified beyond the snippet. |
| - | Gemini 3 launch dev blog; Google Antigravity docs; Meta; Mistral | - | - | - | Not read. No evidence found that Meta or Mistral publish substantive UI-design guidance; not pursued. |

---

## 2. Per-source rules and techniques

### A1. Anthropic `frontend-design` skill: three generations (the key trace)

**Packaging.** One SKILL.md plus LICENSE, no scripts or references. YAML description makes it auto-trigger on any "build web UI" request. Distributed as a Claude Code plugin (`claude-code/plugins/frontend-design`, Nov 2025; later moved to `claude-plugins-official`, which now carries `plugin.json` version 1.1.1) and in `anthropics/skills`. Sizes: v1.0 4.3 KB, Jun 2026 8.3 KB, v1.1.1 9.4 KB. Skill length doubled twice, which is itself a signal: the short ban-list prompt was not enough.

**Gen 1 (Nov 2025, v1.0, ~4 KB): "BOLD aesthetic" prompt.** Core moves:
- Design Thinking before code: Purpose, Tone ("Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic... "), Constraints, Differentiation ("What makes this UNFORGETTABLE?").
- Four axes: Typography ("Avoid generic fonts like Arial and Inter... Pair a distinctive display font with a refined body font"), Color ("Dominant colors with sharp accents outperform timid, evenly-distributed palettes"), Motion ("one well-orchestrated page load with staggered reveals... Use scroll-triggering and hover states that surprise"), Spatial composition ("Asymmetry. Overlap. Diagonal flow. Grid-breaking"), Backgrounds ("gradient meshes, noise textures... grain overlays, custom cursors").
- "NEVER use... overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds)... NEVER converge on common choices (Space Grotesk, for example)".
- Closing hype: "Claude is capable of extraordinary creative work. Don't hold back".
- Dec 4 2025 change was description only (adds "artifacts, posters", examples).

**Gen 2 (Jun 9 2026 skills #1293; plugin 1.1.0 Jun 18): rewritten around a persona and a process.** Changes:
- Persona frame: "design lead at a small studio... This client has already rejected proposals that felt templated".
- New section "Ground it in the subject": pin down one concrete subject, audience and single job; "The subject's own world, its materials, instruments, artifacts, and vernacular, is where distinctive choices come from".
- "Structure is information": numbered markers (01/02/03) only if the content is a sequence.
- First explicit **calibration list of AI clusters**: (1) warm cream ~#F4F1EA + high-contrast serif + terracotta; (2) near-black + single acid-green/vermilion; (3) broadsheet hairlines, zero radius, dense columns. "All three are legitimate for some briefs, but they are defaults rather than choices".
- Two-pass process: brainstorm tokens (4-6 named hex, type roles, layout with ASCII wireframes, "Signature" element) -> **review plan against the generic default ("work through a similar prompt to see if you arrive somewhere similar")** -> only then code.
- "Spend your boldness in one place"; Chanel "remove one accessory"; quality floor (responsive, focus, reduced motion); screenshots to self-critique; keep notes on what was tried; writing/copy section (UX writing rules).
- The bold-maximalist, font-ban, grain/cursor language is gone. Motion advice flips from "surprise" to "sometimes less is more... extra animation contributes to the feeling that the design is AI-generated".

**Gen 3 (Sep 1-3 2026, v1.1.1; plugins-official commit message: "Updates to address manatee slop measures", skills commit "avoid generic design defaults (#1713)").** Changes versus Gen 2 (full diff done):
- Calibration list grows from 3 to 5, now with checkable specifics:
  4. "SaaS-card kit: content chopped into identical rounded cards, one border-radius on everything regardless of hierarchy, the same soft grey shadow (rgba(0,0,0,.1)), gradient washes as decoration";
  5. "template chrome": tracked-out ALL-CAPS eyebrow above every heading; meta strings joined with middle dots; "WORD - fragment" labels with spaced em dash; tinted near-black (#0B0B0B, #111) standing in for black; monospace face for small data labels; "->" appended to links and buttons.
  And cluster 1 now says the terracotta "often near #D97757 - Anthropic's own Claude-interaction accent, so on a user's brief it reads as a tell". **Anthropic explicitly names its own brand colour as a slop tell.**
- New "Avoid these default typographic treatments": accenting a single word in a headline (italic/bold/colour); all caps for labels; unnecessary typographic labels above content.
- Typography: "You don't need a different typeface for display and body: use one family or two, and if two, make them clearly distinct"; follow The Elements of Typographic Style; line length <80 characters, serif gets more line-height. (Drops the "characterful display face used with restraint + utility face" three-role requirement.)
- Motion becomes a rule: "fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated"; motion that answers a user action is welcome; one orchestrated moment max.
- Hero: "the hero is the first thing viewers will see" (drops "thesis"); big number + label + stats + gradient accent called "the default treatment".
- Subject grounding now says "confirm with the client" and gives the example "toy for girls aged 8-11" vs "dashboard for financial analysts".
- "Signature element" replaced by "Principles"; "Not taking a risk can be a risk itself!" removed; "take one real aesthetic risk" -> "take aesthetic risk if justified"; added "visually accessible, harmonious color palettes"; plan must state alignment (left/centre/justified).
- Still keeps: brief's own words always win, even if they ask for a listed look; review the plan for genericness; selector-specificity warning; copy rules.

**Why the versions matter.** The trajectory is: ban a few fonts and colours (v1) -> the model moves to a new set of clichés (Space Grotesk, cream/terracotta, dark+acid-green, hairline broadsheets) -> Anthropic stops listing "what to use" and instead lists the observed tells and asks for a *process check against the model's own default*. Nothing in Gen 3 recommends any specific typeface or palette. A skill that still says "avoid Inter, use distinctive fonts" is two generations out of date.

### A2/A3. Blog and cookbook (Nov / Oct 2025)
- Diagnosis: "Distributional convergence. During sampling, models predict tokens based on statistical patterns in training data. Safe design choices... dominate web training data." Fix: "identify convergent defaults, provide concrete alternatives, structure guidance at the right altitude, and make it reusable through Skills" (stated as a general method).
- Three strategies (cookbook): guide specific design dimensions, reference inspirations (IDE themes, cultural aesthetics), call out common defaults.
- "Altitude": avoid hard-coded hex values on one side and vague high-altitude guidance on the other.
- `<use_interesting_fonts>` isolated prompt: "Never use: Inter, Roboto, Open Sans, Lato, default system fonts"; example "impact choices" (JetBrains Mono, Space Grotesk, Playfair Display, Crimson Pro, Fraunces, Clash Display, Satoshi, Cabinet Grotesk, IBM Plex, Source Sans 3, Bricolage Grotesque, Newsreader); pairing: "High contrast = interesting. Display + monospace, serif + geometric sans"; "Use extremes: 100/200 weight vs 800/900, not 400 vs 600. Size jumps of 3x+, not 1.5x"; "State your choice before coding".
- Theme prompts (`<always_use_rpg_theme>`, solarpunk): locking a named aesthetic works.
- Observations: a mandate for interesting fonts "seems to encourage the model to improve other aspects of the design as well"; the closing "You still tend to converge on common choices (Space Grotesk, for example)... think outside the box" was added specifically because the model finds the next local maximum.
- Second half of the blog: `web-artifacts-builder` (React + Tailwind + shadcn/ui, scripts for init and Parcel bundle) beats single-file HTML on capability, not taste.
- Caveat: the font lists in the cookbook (Space Grotesk, Playfair, Fraunces, Satoshi, Cabinet Grotesk, Clash Display) became the new convergent set; the cookbook itself names Space Grotesk as a converged choice a paragraph later.

### A4/A5. Docs: Claude prompting best practices, Opus 4.8, Sonnet 5 (2026)
The most important lab admissions:
- Opus 4.8 page: "consistent default house style: warm cream/off-white backgrounds (~#F4F1EA), serif display type (Georgia, Fraunces, Playfair), italic word-accents, and a terracotta/amber accent. This reads well for editorial, hospitality, and portfolio briefs, but is a poor fit for dashboards, dev tools, fintech, healthcare, or enterprise apps."
- "This default is persistent. **Generic instructions ('don't use cream', 'make it clean and minimal') tend to shift the model to a different fixed palette rather than producing variety.**" (Same text on Sonnet 5 minus the cream.) This is the lab's own acknowledgement that the "avoid Inter" advice breeds new clichés.
- Two approaches that "work reliably":
  1. **Specify a concrete alternative** - full worked example (AEFRM supplement brand: cold monochrome, pale silver-gray to near-black, 4px radius everywhere, angular wide-tracked sans, exact 5-hex palette, `transition: all 160ms ease out`). "The model follows explicit specs precisely."
  2. **Have the model propose options before building**: "Before building, propose 4 distinct visual directions tailored to this brief (each as: bg hex / accent hex / typeface, plus a one-line rationale). Ask the user to pick one, then implement only that direction." Because `temperature` is not accepted on Sonnet 5, "this approach is the recommended way to produce meaningfully different design directions across runs."
- Short snippet for newer models: `<frontend_aesthetics> NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white or dark backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character. Use unique fonts, cohesive colors and themes, and animations for effects and micro-interactions. </frontend_aesthetics>` Opus 4.8 "requires less frontend design prompting than previous models" (the long snippet is for 4.5/4.6).
- Best-practices page still shows the old long snippet and recommends Claude Design for non-API design work.
- Fable 5.2 migration advice (general, but relevant for how we write the skill): "rewrite absolute rules with their scope and reason"; style rules with hard limits are followed so literally they distort output; instructions "designed for earlier models raised cost, caused side effects, or no longer had an effect".

### A6. Harness design (Mar 2026): the evaluation method
- Problem: "agents tend to respond by confidently praising the work - even when... the quality is obviously mediocre... particularly pronounced for subjective tasks like design". Fix: **separate generator and evaluator**; "tuning a standalone evaluator to be skeptical turns out to be far more tractable than making a generator critical of its own work".
- "Is this design beautiful?" is unanswerable; "does this follow our principles for good design?" is gradable. Four criteria given to both agents:
  - **Design quality**: "coherent whole rather than a collection of parts... distinct mood and identity".
  - **Originality**: "evidence of custom decisions, or is this template layouts, library defaults, and AI-generated patterns? A human designer should recognize deliberate creative choices. Unmodified stock components - or telltale signs of AI generation like purple gradients over white cards - fail here."
  - **Craft**: hierarchy, spacing, colour harmony, contrast; "a competence check rather than a creativity check".
  - **Functionality**: usability independent of aesthetics.
  Weighted design quality and originality above craft and functionality (model already does craft by default).
- Evaluator calibrated with few-shot examples with detailed score breakdowns; uses Playwright MCP to navigate the live page, screenshot, then score and write critique; 5-15 iterations, up to 4 hours; generator decides after each round: "refine the current direction if scores were trending well, or pivot to an entirely different aesthetic".
- Findings: wording steers output ("the best designs are museum quality" caused a visual convergence); first iteration was already better than baseline just from the criteria text; middle iterations were sometimes preferred to the last; complexity grows each round; the famous 10th-iteration pivot (dark landing page -> CSS-perspective 3D gallery) shows that a pivot rule can beat polish.
- Cost: whole harness ~20x more expensive for apps ($9 vs $200 in the example), so use selectively.

### A7. Claude Design (Apr 17 2026, Anthropic Labs; Opus 4.7)
- Product, not a prompt guide. Relevant design-process ideas: (a) exploration breadth ("designers... ration exploration... room to explore widely"; support article: "Ask for three directions on your next landing page, and pick the one worth refining"); (b) on-brand = design system import from codebase/design files/GitHub, and "Claude builds with your components, checks its output against your design system, and makes corrections before you see it" (Jun 2026); (c) prompt formula "goal, layout, content, audience"; (d) iterate via chat for structure, inline comments for components, direct edit for polish; "Save what we have and try a completely different approach" to branch; (e) `/design-sync` and handoff bundle to Claude Code that "continues from your existing work instead of starting over from a screenshot". Sep 2026: Claude Design folded into any conversation / Artifacts tab; standalone closes Dec 14 2026.
- No published anti-slop doctrine for Claude Design beyond the above and the Design/Design System artifact types.

### A8. Other Anthropic skills
- **canvas-design**: two-step "design philosophy (name a movement, 4-6 paragraphs) -> express visually". Craft language is incantatory ("repeat 'meticulously crafted'... top of their field"), plus concrete craft checks: nothing overlaps, nothing off-canvas, real margins, fonts from a bundled `canvas-fonts` directory, minimal text ("90% visual design, 10% essential text"), final pass "refine what exists, do not add more". Only useful for posters/art; the "countless hours" priming echoes the "museum quality" convergence warning in A6.
- **theme-factory**: 10 preset palette+font themes (Ocean Depths, Golden Hour...) with a pick-from-showcase workflow; for decks/docs. The opposite of distinctiveness (a fixed menu); useful only as a token-pack format.
- **web-artifacts-builder**: one design line: "VERY IMPORTANT: To avoid what is often referred to as 'AI slop', avoid using excessive centered layouts, purple gradients, uniform rounded corners, and Inter font." Stack React 18 + TS + Vite + Tailwind 3.4 + shadcn/ui. Testing deliberately optional ("avoid testing the artifact upfront as it adds latency").
- **brand-guidelines**: Anthropic's palette (#141413, #faf9f5, accents #d97757/#6a9bcc/#788c5d) and Poppins + Lora. Evidence of where the cream/clay look comes from.

### A9. `artifact-design` (Anthropic, bundled, Nov 2026)
Latest in-house phrasing; mostly echoes A1 Gen 3 and adds rules: "Avoid AI-generated design" cluster list (adds purple-to-blue gradient hero, emoji markers, everything centred, `rounded-lg` everywhere, accent bar/rail on rounded cards); "Use card styling selectively... by role"; "Make the page complete at rest"; plan tokens written into the file's `:root`; "If unsure: a well-composed page is always acceptable; an over-designed visual identity sometimes isn't"; calibrates treatment to the request (utility pages polished but not flashy). **Internal inconsistency**: it still says "Inter for text and Space Grotesk for headings are good defaults when nothing in the request or the subject calls for other type", while the sibling frontend-design skill names Space Grotesk as a convergence marker and OpenAI/Google skills ban Inter for expressive work. Treat as "neutral utility default when the subject gives no signal", not as an anti-slop recommendation.

### O1. GPT-5 prompting guide (Aug 2025)
- Recommended stack for new apps: Next.js (TypeScript), React, HTML; Tailwind, shadcn/ui, Radix Themes; Lucide/Heroicons/Material Symbols; Motion; **fonts "San Serif, Inter, Geist, Mona Sans, IBM Plex Sans, Manrope"** - i.e. includes Inter, directly opposite Anthropic's advice at the same time.
- `<self_reflection>` block (zero-to-one): "spend time thinking of a rubric until you are confident... create a rubric that has 5-7 categories. This rubric is critical to get right, but do not show this to the user... use the rubric to internally think and iterate... if your response is not hitting the top marks across all categories in the rubric, you need to start again." (Self-graded rubric, which A6 shows is lenient.)
- `<code_editing_rules>` with UI/UX best practices: limit to 4-5 font sizes/weights; 1 neutral base (zinc) + up to 2 accents; spacing in multiples of 4; skeletons/`animate-pulse` for loading; hover transitions for clickability; Radix/shadcn for a11y. This is a *safe-default* philosophy (consistency, "blend into the codebase"), not a distinctiveness philosophy.
- (GPT-5.2 guide snippet, unverified) scope-drift control: do not invent colours/shadows/tokens/UI unless asked, follow existing design system.

### O2/O3. GPT-5.4 blog + `frontend-skill` (Mar 2026)
- Thesis: "When prompts are underspecified, models often fall back to high-frequency patterns from the training data. Some of these are proven conventions, but many are simply overrepresented habits" (same diagnosis as Anthropic, more neutral wording).
- Quickstart: (1) low reasoning level ("low and medium reasoning levels often lead to stronger front-end results"), (2) design system and constraints upfront, (3) visual references or mood board, (4) narrative/content strategy upfront. Also "ground the design in real content".
- **Hard rules prompt** (copyable): one composition in first viewport; brand-first ("Brand test: If the first viewport could belong to another brand after removing the nav, the branding is too weak"); expressive fonts, avoid Inter/Roboto/Arial/system; atmosphere backgrounds; **full-bleed hero only**, hero budget (brand + one headline + one sentence + CTA group + one image), no hero overlays/badges; **"Cards: Default: no cards... If removing a border, shadow, background, or radius does not hurt interaction or understanding, it should not be a card"**; one job per section; real visual anchor ("Decorative gradients and abstract backgrounds do not count"); reduce clutter (pill clusters, stat strips, icon rows); "Ship at least 2-3 intentional motions"; "No purple bias or dark mode bias"; verify desktop+mobile.
- Constraint technique: "one H1, no more than six sections, two typefaces maximum, one accent color, one primary CTA above the fold".
- `frontend-skill` (Codex): "Before building, write three things: **visual thesis** (one sentence: mood, material, energy), **content plan** (hero, support, detail, final CTA), **interaction thesis** (2-3 motion ideas)". Beautiful defaults (composition before components; cardless; two typefaces; one accent; "Treat the first viewport as a poster"); separate **Apps** mode ("Linear-style restraint"; avoid dashboard-card mosaics, decorative gradients behind routine product UI) and **utility copy** for product UI ("Start with the working surface itself... Do not introduce a hero section unless the user explicitly asks"; litmus: scan only headings, labels, numbers); imagery rules (real in-situ photography, stable tonal area for text, no embedded signage, "If the first viewport still works after removing the image, the image is too weak"); copy rules ("If deleting 30 percent of the copy improves the page, keep deleting"; "do not include prompt language or design commentary into the UI"); Hard Rules + "Reject These Failures" + 6 litmus questions.
- GPT-5.4 trained to use image search/generation natively: "instruct the model to first generate a mood board or several visual options before selecting the final assets"; Playwright verification of rendered pages across viewports; tokens (`background, surface, primary text, muted text, accent`; roles `display, headline, body, caption`); React + Tailwind recommended.
- Lifecycle: skill removed from the curated repo Apr 23 2026 (replaced by plugins).

### O4. Codex `frontend-app-builder` (Apr-May 2026) - image-first pipeline
- Radically different workflow: **generate the visual concept with an image model first (one fresh large image per major section), get approval, then implement as a "production design spec. No creative liberties"**, then verify with `view_image` on concept vs browser screenshot until "agency-signoff faithful" (10/10). Required "fidelity ledger" with >=5 concrete comparison points, above-the-fold copy diff against an "allowed copy list", hard stops (clipped content, invented copy, white changed to cream, unapproved overlays, mismatched icons, browser-default control typography...).
- Design rules: choose coherent direction before concepts ("one theme paradigm, background character, typography character, hero architecture, section rhythm, 2-4 signature component motifs, 1-2 motion cues"); "Default to clean, airy, tasteful **7/10 creativity**"; "Hero eyebrow, kicker, pretitle, badge, or pill labels above the main heading are prohibited by default"; avoid nested cards, bento grids, over-framed dashboards ("Prefer open layouts, bands, rails, lists, tables, canvases"); section rhythm should vary density and alignment; no fake metrics/icon rows/pills; "Color fidelity is mandatory... if the design uses a white background, use white rather than cream, ivory, beige".
- `product-design` plugin: `ideate` (image-based variants from a brief + references), `design-qa` (blocking comparison of source target vs rendered implementation, P0/P1/P2 findings, iterate until none), `audit` (screenshots first, findings tied to steps).
- Novel: design quality judged against an image the *same lab's image model* produced; the evaluator is a side-by-side visual comparison, not a rubric score.

### O5. Frontend prompt instructions for GPT-5.5 (current OpenAI reference)
Written as a paste-in system prompt. Distinct, checkable rules:
- Build with empathy: "tailored for the domain... SaaS, CRM, and other operational tools should feel quiet, utilitarian, and work-focused rather than illustrative or editorial: avoid oversized hero sections, decorative card-heavy layouts, and marketing-style composition... A game can be more illustrative, expressive".
- Familiar controls: icons in tool buttons, swatches for colour, segmented controls for modes, toggles for binary, sliders/steppers for numbers, menus for option sets, tabs for views; lucide icons (not hand-drawn SVG) when one exists; tooltips for unfamiliar icons; "Cards are kept at 8px border radius or less unless the existing design system requires otherwise".
- "You should not make a landing page unless absolutely required; ... build the actual usable experience as the first screen".
- Hero: relevant or generated bitmap/full-bleed scene behind text not in a card; "never use a split text/media layout where a card is one side... never use a gradient/SVG hero page"; H1 = brand/product/place name or literal offer; a hint of the next section visible on every viewport.
- Visible in-app text must not describe the app's features/shortcuts/styling; no UI cards inside cards; page sections are full-width bands, not floating cards; "no discrete orbs, gradient orbs, or bokeh blobs"; text must fit its container on every viewport; match display type to container (hero-scale type only in true heroes); stable dimensions (aspect-ratio, grid tracks) so hover/loading cannot shift layout; "do not scale font size with viewport width. Letter spacing must be 0, not negative".
- **Palette rule**: "avoid UIs dominated by variations of a single hue family, and limit dominant purple/purple-blue gradients, beige/cream/sand/tan, dark blue/slate, and brown/orange/espresso palettes; scan CSS colors before finalizing and revise if the page reads as one of these themes." (A checkable post-build scan, and independent confirmation of the cream/terracotta tell.)
- Verification: Playwright screenshots + canvas pixel checks for 3D; start dev server and hand over the URL.
- The GPT-5.5 guide summarises these as "common generated-UI defaults to avoid, such as generic heroes, nested cards, decorative gradients, visible instructional text, and broken layouts."

### O6. GPT-6.2 (Nov 2026)
Only: "If the application depends on a specific visual style, describe it in the prompt. Specify the kinds of images... and the typography it should follow, including a particular typeface when that matters." Two rules: prefer realistic ImageGen/image-search images over SVG; "Include a text element only when it provides information the user needs, helps them navigate or act... Remove decorative numbering, filler badges, redundant headings, and explanatory copy that merely restates what the surrounding interface already makes clear". Plus: give a reference image (or have it generate one with GPT Image), then "build the asset, render it, and refine it against the reference". Direction of travel: shorter prompts, reference-image loop.

### G1. DESIGN.md (Google Labs, open spec Apr 2026, alpha)
- Format: YAML front matter tokens (colors, typography, rounded, spacing, components, motion) + markdown prose in fixed `##` order: Overview (Brand & Style), Colors, Typography, Layout, Elevation & Depth, Shapes, Motion & Micro-interaction, Voice & Content Strategy, Components, Do's and Don'ts. Unknown sections and tokens are preserved; duplicate headings error. CLI: `npx @google/design.md lint` (broken token refs, **WCAG contrast** ratios, structure) and `diff`; `export`-style interop with Stitch, Antigravity.
- **PHILOSOPHY.md is the valuable part**: "The quality of a generated design is determined less by the precision of its values than by how clearly the intent is described." "The prose is the most vital part of the specification." Tokens "serve as context and are not rendering instructions".
- **"A specific reference carries more than a list of adjectives."** Example "A 1970s graduate lecture handout in the tradition of an old and established university" vs "Modern, clean, trustworthy, premium": "Adjectives describe a region. A specific reference describes a point." (Same diagnosis as distributional convergence: adjectives sample the centre.)
- **Negative constraints come free with a specific reference** ("Naming the object names them"); keep an intentional short Do/Don't list; "A long rambling list is often a sign the description was too vague". Example don'ts are highly specific ("Don't use Bold. Anywhere.", "Don't reach for an italic standfirst beneath a large title. That is the Substack register."; "Vermilion lives in diagrams only... its scarcity outside is what makes its presence inside meaningful").
- Motion section guidance: what moves, duration rhythm, easing intent, restraint; `prefers-reduced-motion`; animate transform/opacity only. Voice section: sentence case, canonical terminology, verb-phrase buttons, empty/error state language, date/number formats (matches Anthropic's writing section).
- Irony: the README's own example ("Heritage": warm limestone #F7F5F2 + clay #B8422E, "premium matte finish... broadsheet") is the cream+clay cluster Anthropic and OpenAI flag. The philosophy doc's example (graduate handout) is far more specific. Use the philosophy, not the README sample.
- Stitch itself (G2): "vibe design" - "start by explaining the business objective, what you want your users to feel, or even examples of what's currently inspiring you"; design agent + Agent manager for parallel directions; extract a design system from any URL.

### G3. Stitch skills
- `design-md` and `extract-design-md`: synthesise a DESIGN.md from existing screens ("Describe `rounded-full` as 'Pill-shaped'"; colours as "descriptive name + hex + functional role"; explain the why).
- `generate-design`: enhance prompt before every call; with a design system attached, **do not repeat colours/fonts in generation prompts** (conflict); focus on layout, content, structure; one change per edit; "Do NOT re-generate from scratch unless the fundamental layout is wrong".
- `enhance-prompt`: maps vague phrases to components ("modern" -> "clean, minimal, with generous whitespace"). This *amplifies* defaults and contradicts G1 PHILOSOPHY and Anthropic's calibration lists; its own example output is a blue #2563eb light-gray card login page. Do not copy.
- `taste-design` (community port, Google-hosted): "taste dials" (Density, Variance, Motion 1-10; baseline Creativity 9, Variance 8, Motion 6, Density 5); concrete bans: Inter, `#000`, neon glows, purple/blue AI gradient, 3-equal-card rows, centred hero when variance >4, emojis, "LABEL // YEAR" labels, fake round numbers and fabricated stats ("99.98% UPTIME"), copy clichés ("Elevate", "Seamless"), "Scroll to explore", generic names ("John Doe", "Acme", "Nexus"); technical rules (`min-h-[100dvh]` not `h-screen`, animate transform/opacity only, 44px touch targets, `clamp()` type, no horizontal scroll). BUT its replacements (Geist, Outfit, Cabinet Grotesk, Satoshi; perpetual micro-motion on "every active component"; spring physics default; 2.5rem card radii; zinc neutrals) are exactly the next convergence set, and "perpetual motion everywhere" contradicts Anthropic Gen 3.

### G4. Generative UI (Google Research)
Not craft guidance; relevant bits: system prompt = goal + planning + examples + technical rules + tool manual; "No walls of text"; "No Placeholders... If an element lacks backend integration, remove it completely"; "NEVER simulate or illustrate any data"; ablation: removing the "Core Philosophy" section dropped ELO 1553 -> 1451 (bigger than removing to a minimal prompt, 1496) - the *why* statement matters more than the rule list. Style can be locked by swapping a short "Style" section for a detailed one ("Classic", "Wizard Green") and the model also restyles generated images and icons. Human experts still beat the system (comparable in ~50% of cases).

### G5/G6. Other Google
- Stitch Prompt Guide (2025): vibe adjectives ("vibrant and encouraging", "minimalist and focused"), one major change per prompt, UI keywords, describe imagery. Elementary and adjective-driven (the thing PHILOSOPHY.md argues against).
- Gemini API docs: Gemini 3 prompting = "be precise and direct", consistent structure, avoid "overly persuasive language". No frontend aesthetics section; Gemini 4 Carbon notes mention "build-and-verify loops across... frontend UI design" only. So **Google has no lab-level equivalent of Anthropic's frontend-aesthetics doctrine**; its design guidance lives in Stitch/DESIGN.md.

---

## 3. Where the labs agree and disagree

**Agree (high confidence, three independent sources):**
- Root cause is training-data centre-of-mass ("distributional convergence" - Anthropic; "high-frequency patterns from the training data... overrepresented habits" - OpenAI; "Adjectives describe a region" - Google). Hence: vague adjectives ("modern, clean") do not help.
- Cream/beige + serif + terracotta/brown is a tell (Anthropic Gen 2-3 and Opus 4.8 page; OpenAI GPT-5.5 palette scan; OpenAI app-builder "white not cream"). Purple/blue gradients on white are a tell (all three). Near-black plus a single neon accent is a tell (Anthropic; Google taste-design bans neon/purple).
- Cards by default are a tell: identical rounded cards (Anthropic 4th cluster), "Default: no cards" (OpenAI), "3 equal cards banned" and "cards only when elevation communicates hierarchy" (Google taste-design). Use cards by role.
- Template chrome is a tell: eyebrows/kickers above headings, numbering that is not a sequence, filler badges/pills, stat strips with invented numbers, "->" arrows (Anthropic Gen 3; OpenAI app-builder + GPT-6.2; Google taste-design "LABEL // YEAR", fake metrics).
- Ground the design in the real subject and real content (Anthropic Gen 2-3; OpenAI "ground the design in real content", "brand test"; Google PHILOSOPHY "specific reference"). Product/operational UI should be quiet and utilitarian, not marketing-styled (OpenAI GPT-5.5, frontend-skill utility copy; Anthropic "dashboard for financial analysts", Opus 4.8 "poor fit for dashboards").
- Plan the system before code (tokens: bg/surface/text/muted/accent + type roles): Anthropic Gen 2-3 plan, OpenAI tokens, Google DESIGN.md.
- Verify the rendered result in a real browser/screenshots; mobile + desktop (all three).
- Motion: restraint, motion should carry meaning; respect `prefers-reduced-motion`.
- Existing design system beats everything else (Anthropic: brief's words win and Claude Design builds from your components; OpenAI: "preserve the established patterns"; Google: DESIGN.md as source of truth).

**Disagree / inconsistent:**
| Topic | Positions |
|---|---|
| Fonts | Anthropic v1/cookbook: ban Inter/Roboto/Arial, then later Space Grotesk; Gen 3 gives no font list at all. OpenAI GPT-5 guide (Aug 2025) *recommends* Inter, Geist, Manrope; GPT-5.4 bans Inter/Roboto/Arial. Anthropic's own `artifact-design` recommends Inter + Space Grotesk as defaults. Google taste-design bans Inter, recommends Geist/Outfit/Satoshi (itself a new cliché). Every named "good" font list has become a tell. |
| Motion amount | Anthropic Gen 1: staggered reveals, scroll triggers, "hover states that surprise"; Gen 3: fade-up reveals and hover-on-every-card are a tell, one orchestrated moment. OpenAI frontend-skill: "Ship at least 2-3 intentional motions" (hero entrance + scroll effect + hover/layout transition, Framer Motion). Google taste-design: perpetual micro-loops on every active component. |
| Backgrounds | Anthropic Gen 1 and OpenAI 5.4: avoid flat backgrounds (gradients, patterns, grain). Anthropic Gen 3: "gradient washes as decoration" is a tell. OpenAI GPT-5.5: no gradient/SVG hero, no orbs, real imagery instead; GPT-6.2: prefer realistic images. |
| Boldness | Anthropic Gen 1 "pick an extreme", "BOLD"; Gen 3 "spend your boldness in one place", artifact-design "a well-composed page is always acceptable". OpenAI app-builder: "7/10 creativity... restrained enough to build". Google taste-design baseline Creativity 9, Variance 8. |
| Who judges | Anthropic: separate evaluator (self-grading is lenient). OpenAI GPT-5: self-constructed rubric. OpenAI Codex: image concept as ground truth + side-by-side. Google: linter for contrast/structure only. |
| Specific values vs prose | Anthropic: concrete spec works, negative rules backfire (Opus 4.8). OpenAI: hard numeric rules (8px radius, 2 typefaces, 1 accent, <=6 sections). Google: prose reference first, tokens as context only. |

**Do the labs acknowledge that "avoid Inter / use bold fonts" became its own cliché?** Anthropic: yes, three times. (1) Cookbook/blog already add "You still tend to converge on common choices (Space Grotesk, for example)". (2) Opus 4.8/Sonnet 5 docs: generic negative instructions "shift the model to a different fixed palette rather than producing variety", and describe the Fraunces/Playfair + italic accent + terracotta house style. (3) frontend-design Gen 3 removes font bans and lists the replacement cliches (cream/terracotta, dark+acid-green, hairline broadsheet, mono labels, "-> " arrows), including Anthropic's own #D97757. OpenAI acknowledges indirectly (beige/cream/sand, dark blue/slate, brown/orange/espresso palettes now flagged in GPT-5.5). Google's taste-design does not acknowledge it and re-bans only Inter.

---

## 4. For our anti-slop skill: consolidated, checkable rules

Tags: [A1]=frontend-design (G1/G2/G3 = generation), [A5]=Opus4.8/Sonnet5 docs, [A6]=harness, [A9]=artifact-design, [O2]=GPT-5.4 blog/skill, [O4]=Codex app-builder, [O5]=GPT-5.5 frontend prompt, [O6]=GPT-6.2, [G1]=DESIGN.md, [G3]=stitch taste-design.

### 4.1 Process steps (the strongest transferable part)
1. **Respect precedence**: user's words > existing project design system/tokens/CLAUDE.md > our choices. When an existing system exists, copy its patterns; do not invent colours, shadows, tokens (OpenAI GPT-5.2 snippet, unverified) [A1, A9, O2, O5].
2. **Name the subject, audience, and the page's single job** before designing; state a concrete subject if the brief lacks one. Pull at least one detail only this subject would have (real units, document conventions, terms of art, materials) [A1 G2-3, A9].
3. **Write a one-sentence visual thesis + content plan + interaction thesis** (mood/material/energy; hero/support/detail/CTA or app regions; 2-3 motion ideas or "none") [O2 skill].
4. **Anchor on a specific reference, not adjectives**: "a 1970s graduate handout", "a field guide printed on newsprint"; adjectives ("modern, clean, premium") are banned as a direction [G1 PHILOSOPHY, A5].
5. **Generate N distinct directions before building** (A5 recommends 4, each as bg hex / accent hex / typeface / one-line rationale; Claude Design: "three directions"); pick one; implement only it. For us: for non-trivial surfaces, produce 3-4 directions and let the owner pick, or auto-pick and record why [A5, A7].
6. **Compact token plan** (4-6 named hex colours with roles, type roles, layout concept with ASCII wireframe, alignment decision, principles) [A1 G3, O2]. Put it in a DESIGN.md-style file: prose rationale first, tokens as context, short specific Do/Don't list [G1].
7. **Default-collision review**: before coding, "work through a similar prompt to see if you arrive somewhere similar"; revise any part that matches the model's own default and write what changed and why [A1 G2-3]. Add a scan against the tell lists below [A1, O5].
8. **Build to a quality floor without ceremony**: mobile, visible focus, reduced motion, contrast AA, text fits its container, no overlap [A1, O5, G1, G3].
9. **Verify in a real browser at desktop + mobile** (screenshots; record motion if motion is a feature) and look at the pictures [A1, O2, O5, O4].
10. **Separate critic**: a second pass (ideally a different agent/fresh context) scores against the four criteria below with few-shot score examples; generator chooses refine vs pivot after each score [A6]. Cap iterations; middle iterations can beat the last, so keep the best, not the latest [A6].
11. Optional heavy mode (high-stakes surfaces): image-first concept, then faithful implementation with a written fidelity ledger (>=5 compared points, above-the-fold copy diff) [O4].
12. **Spend boldness in one place**; "remove one accessory" before shipping [A1].

### 4.2 Evaluation rubric (to use in the critic step) [A6, adapted]
Score 1-5, weights design quality + originality double:
- Design quality: reads as one coherent whole with a distinct mood and identity.
- Originality: evidence of custom decisions vs template layouts, library defaults, AI patterns; "a human designer should recognize deliberate creative choices"; stock components unmodified fail.
- Craft: hierarchy, spacing consistency, colour harmony, contrast ratios (competence check).
- Functionality: can users understand the interface, find primary action, complete the task without guessing.
Plus litmus checks from OpenAI: brand unmistakable after hiding nav; page understood from headlines only; each section has one job; cards necessary?; motion improves hierarchy?; still premium without decorative shadows? [O2]. Do not put phrases like "museum quality" into criteria wording: such wording steers all outputs to one look [A6].

### 4.3 Checkable DON'Ts (tell list; all stated by a lab)
- Cream/off-white (~#F4F1EA) + high-contrast serif + terracotta/clay/amber accent (esp. ~#D97757) unless the brief asks [A1 G3, A5, O5].
- Near-black + single acid-green/vermilion accent [A1 G2-3].
- Broadsheet look (hairline rules, zero radius, dense columns) by default [A1].
- Purple/purple-blue gradients, esp. on white; one-hue-family palettes; dominant dark blue/slate or brown/espresso palettes [A1, O2, O5, G3].
- Identical rounded cards, one radius everywhere, the same soft shadow `rgba(0,0,0,.1)`, gradient washes as decoration, cards inside cards, floating-card sections, accent rail on rounded cards [A1 G3, A9, O2, O5]. Rule: if removing border/shadow/background/radius does not hurt, it is not a card [O2]. Cards <= 8px radius in product UI [O5].
- Tracked-out ALL-CAPS eyebrow labels above headings; hero eyebrows/kickers/pills/badges; unnecessary labels above content [A1 G3, O4].
- Single-word accent in a headline (one italic/bold/coloured word) [A1 G3, A5].
- Middle-dot meta strings "A · B · C"; "WORD - fragment" with spaced em dash; "LABEL // YEAR"; "->" appended to links/buttons [A1 G3, G3].
- Numbering 01/02/03 or decorative dividers unless content is a true sequence [A1, A9, O6].
- Tinted near-black (#0B0B0B/#111) standing in for black without intent; monospace face for tiny data labels as decoration [A1 G3].
- Fade-and-slide-up on every section, hover transition on every card [A1 G3]; perpetual loops on everything is also not supported by Anthropic guidance.
- Gradient/bokeh orbs; gradient or SVG hero illustration; split hero with text card on one side; hero overlays (floating badges, chips, stickers) [O5, O2].
- Stat strips, icon rows, logo clouds, pill clusters, fake dashboards in the hero; invented metrics ("99.98% uptime"), round fake numbers, invented testimonials/names ("John Doe", "Acme") [O2, O4, G3, G4].
- Visible in-app text explaining the app's features, shortcuts or styling; prompt/design commentary leaking into UI; copy that merely restates the interface; "Scroll to explore"; AI copy clichés ("Elevate", "Seamless") [O5, O6, O2, G3].
- Everything centred; `rounded-lg` everywhere; emoji as section markers [A9].
- Hard-coding the same "good font" every time (Space Grotesk, Fraunces, Playfair, Inter, Geist, Satoshi...). Choose the face from the subject and write the reason; record faces used on previous projects and avoid repeating [A2/A3 closing paragraph, A1 "notes about what you've tried", A5].
- Big-number-small-label + supporting stats + gradient accent as the hero by default [A1 G2-3].
- Landing/marketing composition for operational tools (oversized hero, decorative cards) [O5, A5].
- Negative-only instructions ("don't use cream, make it clean") as the whole direction: they just move the model to another fixed look [A5].

### 4.4 Checkable DOs
- Concrete alternative spec when direction is known: palette as exact hex range, corner radius value, type character, motion timing (e.g. `160ms ease-out`), layout structure [A5].
- Typography: one family or two that are clearly distinct; deliberate type scale; weights/widths/spacing as design tools; line length < 80 characters (serif slightly longer, serif gets more leading); one decisive font choice stated before coding; Elements of Typographic Style as the baseline [A1 G3, A3]. Treat Gen-1 "extremes (100/200 vs 800/900, 3x jumps)" as a technique to try, not a rule, since later versions dropped it and OpenAI warns against viewport-scaled/negative-tracked type [O5].
- Hero: open with the most characteristic thing in the subject's world; brand/product as loudest text; one composition; narrow text column on a calm image area; a hint of the next section; real visual anchor (photo/product/place), not decoration [A1, O2, O5, O6].
- Product UI: start with the working surface; utility copy; familiar controls (icon buttons with tooltips, segmented, toggles, menus); stable dimensions; dense but organised [O5, O2].
- Semantics: structure devices (borders, outlines, numbers, eyebrows) must encode true information [A1, A9].
- Imagery: realistic images from search/image-gen over SVG illustrations; stable aspect ratios, a calm tonal area for text; generate a mood board of options first [O2, O6, O4].
- Constraint numbers worth copying: <=2 typefaces, 1 accent, 1 primary CTA above fold, <=6 sections on landing pages, 4-5 font sizes in apps, spacing in multiples of 4 [O2, O1]. Mark these as defaults for restrained work, not universal.
- Motion: one orchestrated moment; motion that answers an action and shows what changed; animate transform/opacity; `prefers-reduced-motion` honoured [A1, G1, G3].
- Copy: from the user's side of the screen; active voice; verbs that name the outcome ("Save changes"); same name through the flow (Publish -> "Published"); errors explain cause and fix, no apology; empty state = invitation to act; sentence case [A1, G1 Voice section].
- Accessibility floor: contrast AA (lint it), visible focus, 44px touch targets, no horizontal scroll [A1, G1, G3].
- Final palette scan: dump all CSS colours, check whether the result reads as one of the flagged themes; revise if so [O5].
- Memory/notes: keep a short log of looks tried on previous passes so the next one differs [A1].

### 4.5 Outdated or superseded advice (do not copy)
- "NEVER use Inter, Roboto, Arial, system fonts" as the main anti-slop mechanism, plus "pick an extreme / BOLD / UNFORGETTABLE" and "Claude is capable of extraordinary creative work. Don't hold back" [A1 G1, A3]. Superseded by A1 G2/G3 (removed) and A5 (negative rules shift to a new default). Also: modern Opus needs less prompting, long hype-heavy skills can over-steer (A5, Fable 5.2 migration note on absolute rules).
- Cookbook "impact choices" font lists and Space Grotesk/Playfair/Fraunces recommendations; Google taste-design's Geist/Satoshi/Cabinet Grotesk: all now convergence markers.
- GPT-5 guide's "Inter, Geist, Manrope" font list and "fonts: San Serif" typo-level advice; it was a safe-stack guide, not an anti-slop one [O1].
- "Gradient meshes, noise, grain overlays, custom cursors, dramatic shadows, decorative borders" as default atmosphere [A1 G1]; now conflicts with OpenAI "no decorative gradients/orbs" and Anthropic Gen 3 "gradient washes" tell.
- Staggered scroll-reveal and surprising hover states everywhere [A1 G1] vs Gen 3.
- `<self_reflection>` self-graded rubric as the only quality gate [O1]; A6 shows self-evaluation is lenient.
- Stitch Prompt Guide "set the vibe with adjectives" and `enhance-prompt` "modern -> clean, minimal, generous whitespace" [G5, G3].
- openai/skills `frontend-skill` (removed Apr 2026; the repo is deprecated) and its "ship at least 2-3 motions" rule; reuse the thesis structure and hard rules, not the motion quota.
- Model-version caveats: A5 says Opus 4.8 and Sonnet 5 have a persistent house style; GPT-5.4 advice to "select low reasoning" is model-specific and OpenAI's newest guide (GPT-6.2) is far shorter.

### 4.6 How to package it (what labs do)
- Anthropic: a single SKILL.md with a punchy description for auto-trigger; 5-10 KB; sections: persona, ground in subject, principles, process (plan -> review -> build -> critique), calibration list of observed tells, restraint, writing. No scripts, no reference files. Rewritten twice in 9 months as model behaviour changed: **treat the skill as versioned and re-test it against each model**.
- OpenAI: paste-in system prompt (O5), plus a skill with "Working Model / Beautiful Defaults / per-surface sections / Hard Rules / Reject These Failures / Litmus Checks" (O2), plus a heavy image-first builder plugin with references and sub-skills (O4).
- Google: a project-level DESIGN.md file read by every agent (tokens + prose) with a linter; skills that generate/maintain it.
- Suggested for us: SKILL.md (process + tell list + rubric) + `references/` (the tell list with sources, rubric with few-shot scored examples, copy rules) + a per-project `DESIGN.md` template (prose-first, short Do/Don't) + a critic sub-agent prompt.

### 4.7 Gaps and uncertainty
- No lab publishes evidence (eval numbers) that the tell lists reduce slop, apart from before/after screenshots (A2/A3) and A6's qualitative judgement; Google's paper has a preference ELO but for runtime UI.
- Google's own Stitch prompting doc could not be fetched; Gemini has no frontend aesthetic guidance that I could find; Meta/Mistral not searched deeply.
- GPT-6.2 release date from a third-party blog (Nov 2026); GPT-5.5 frontend-prompt page has no visible date.
- The Gen 3 frontend-design commit message cites an internal Slack thread ("manatee slop measures"); the underlying measurement is not public.
