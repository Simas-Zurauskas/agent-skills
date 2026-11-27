# Native execution and legacy Workflow compatibility

Prefer native Codex/Claude lifecycle and the shared [execution contract](../references/execution-contract.md).
Read [run.md](../run.md) for the mode-specific stage graph. Do not invent a Workflow tool when the harness lacks it;
native dispatch can use the same role prompts, shared references and ownership rules directly.

Where an actual Workflow host is available, these scripts use its existing `agent`, `parallel`, `phase` and `log`
capabilities. They retain existing args, supplements and resume hints. Pass args as an object. Figma is supported by
the **native** [target guide](../targets/figma.md); these HTML scripts reject Figma explicitly rather than switching
outputs. No orchestration server, synthetic tool API or model switch is required.

Both accept `mode: "normal" | "thorough" | "speed"`; default normal, speed aliases normal. Existing
`thorough: true` selects thorough when mode is absent. `count` defaults to six or explicit group totals. Product-selected
screens remain explicit (default user-facing scope: three). Foundation groups may be omitted: one neutral product-appropriate pool holds the requested count,
with complementary proposers selecting suitable approaches. No physical-source family gets a compulsory allocation.
Explicit caller-supplied groups and quotas remain binding and must match count.

Lite is not released after its failed operational quality gate; both helpers reject it before dispatch. Normal/thorough retain preparation reviews. No stage missing a required agent result is counted as passing.
The host must dispatch fresh reviewers without history forks and record its actual model/route.

The build script bounds builders/repairs by `maxBuilders` (default three; clamped to 1..3 and the host must further
respect available slots). `onVariantReady` is an optional **programmatic host callback**, not a JSON string or new
tool: `async ({ id, name, stage, result, readyIds }) => { /* lead publishes existing assembler */ }`. Calls are serialized and
awaited before round critique. Pass the supplied `readyIds` to the draft assembler as `--ready 01,03`; do not publish files from active builders merely because they exist. The snapshot also excludes queued/active repairs (and pending thorough verdicts) until each variant is verified; do not reuse an earlier ready list. Stages are draft, resume-verified or repaired. A host may use this callback to run the
existing assembler directly and record evidence. When omitted, the legacy script dispatches one serialized publisher
agent per ready variant to run the existing assembler with `--draft --keep-previews`; the critic never assembles.
Create the initial pending destination in lead setup before invoking build.

Round critique returns `{ complete, screenshots, verdicts: [{ id, verdict, must_fix: string[], notes? }] }`. A complete
review covers every declared variant with actual inspected screenshots. Only nonempty substantive findings trigger
repair; preference-only notes do not. Thorough adds per-variant critics. Missing screenshots/results throw an
incomplete-stage error. Returned `ok` means no reported unresolved issues after review/repair; the lead still performs
strict final assembly and target verification. No callback or `done` flag is evidence by itself.

## foundations.js: research → guidelines → directions

| Arg | Req | What |
| --- | --- | --- |
| `product` | ✓ | One paragraph: what the product is, for whom, its voice, and its key number or moment |
| `task` | ✓ | The process folder (absolute). Holds `PLAN.md`, and receives `research/`, `design-guidelines.md`, `round-N/` |
| `skill` | ✓ | This skill's folder (absolute) |
| `scratch` | ✓ | A scratch folder for copies of sources, servers, screenshots |
| `sources` | ✓ | Free text: where the PRD, brand voice, strategy and wireframes are |
| `screens` | ✓ | `[{ n: "1", name: "Home", wireframe: "/abs/…/screen-14.html" }, …]` (wireframe optional) |
| `groups` |  | `[{ key, label, want, propose?, kind: "borrowed" \| "original", source?, guidance?, lenses? }]`. `propose` defaults to ⌈1.7 × want⌉. More than 4 candidates are split across proposers (≤ 4 each), each with a lens from `lenses` or the defaults, so no single agent invents a whole group |
| `target` |  | `{ kind: "standalone", out }` or `{ kind: "lab", lab }`: only used to tell agents what's feasible |
| `round` |  | Default 1 |
| `refreshResearch` |  | `true` adds task-local research notes describing relevant changes to the generic references; it does not edit the installed skill |
| `finalize` |  | `true` revises the brief with the direction review. Default (normal / speed alias): the reviewer writes `round-N/review-findings.md`, binding on builders |

It returns `{ mode, guidelines, brief, findings, notes, selection: { selected: [{vid, name, group, mode, first_line,
last_line}], photo_needs } }`.

## build.js: build → round critique → refine

| Arg | Req | What |
| --- | --- | --- |
| `product` | ✓ | One line (it goes into every prompt) |
| `task` | ✓ | The process folder (it holds `design-guidelines.md` and `round-N/brief.md`) |
| `skill` | ✓ | This skill's folder |
| `shots` | ✓ | Where builders and critics save screenshots (a scratch folder) |
| `target` | ✓ | `{ kind: "standalone", out: "/abs/OUT", roundJson: "/abs/…/round.json" }` or `{ kind: "lab", lab: "/abs/lab", roundJson: "/abs/…/round.json", devUrl?: "http://localhost:1234" }`. `roundJson` enables the lead/publisher to assemble the round page; a lab without it gets a critic per variant instead |
| `variants` | ✓ | `[{ id: "01", name: "Specials board", group: "A", lines: "350-558" }, …]`. `lines` = the variant's section in the brief |
| `screens` | ✓ | `[{ n: "1", name: "Home", wireframe? }, …]`. The names become `<title>R1 V01 · Home</title>` |
| `flow` | ✓ | The links, in words: "Home's X rows → screen 2; 2 Back → 1, primary → 3; 3 Close → 1" |
| `round` |  | Default 1 |
| `images` |  | The files in the shared library, listed for the builders |
| `findings` |  | Default `task/round-N/review-findings.md` |
| `supplements` |  | `{ A: "/abs/…/brief-A-update.md" }`. Supersedes that group's brief sections |
| `preBuild` |  | `[{ group: "A", prompt: "…" }]`. An agent that must finish before that group builds (e.g. writing the supplement). The other groups start at once |
| `bar` |  | `{ good: "/abs/real-app.png", rejected?: "/abs/rejected.png" }`: a screenshot of the realism and density wanted (any product; builders take the level, not the style) and optionally one of an attempt the owner rejected. Builders compare their shots against it at every pass, and critics judge "below the bar" first. Best: the **quality-bar sheet** — real App Store screenshots of the reference apps the owner picked (`run.md` scouting); in later rounds, a sheet of the screens the owner named as references |
| `thorough` |  | `true` adds a fresh-eyes critique per variant between the round critique and the refine |
| `assemble` |  | Override: the shell command that writes a viewable round page from the files built so far. Default: the target's assembler on `target.roundJson` with `--keep-previews` |
| `roundUrl` |  | Override: the round page URL the round critic shoots. Default: `file://OUT/round-RR/index.html`, or `devUrl/explorations/round-RR.html` in a lab |
| `strips` |  | The compare-strip anchor ids, one per screen, in screen order. Default: the critic reads them from `round.json` |
| `roundCritique` |  | `false` preserves legacy normal/thorough per-variant-only fallback |
| `done` |  | After an outage, what's already on file: `{ build: ["01", …], roundCritique: true, critique: ["03"], refine: ["02"] }`. Resume hints only: builders inspect existing files and screenshots and continue rather than restarting; required review evidence is rechecked, never assumed from flags |

It returns one `{ id, name, ok, status, summary, issues, shots, repaired }` per variant. `ok: false` means reported unresolved issues; required missing stages throw instead of silently passing. Resume only affected work after evidence reconciliation.

## Example: a standalone round for a new product

```js
Workflow({ scriptPath: "/Users/me/dev/ai/SKILLS/agent-skills/skills/mood-board-creator/workflows/foundations.js", args: {
  product: "Potluck — a shared grocery and meal-plan app for flatmates; warm, practical, a bit cheeky; the key number is who owes what this week",
  task: "/Users/me/dev/potluck/moodboards-process",
  skill: "/Users/me/dev/ai/SKILLS/agent-skills/skills/mood-board-creator",
  scratch: "/tmp/potluck-scratch",
  sources: "PRD /Users/me/dev/potluck/docs/prd.md; brand voice /Users/me/dev/potluck/docs/voice.md; wireframes /Users/me/dev/potluck/wireframes/*.png",
  screens: [{ n: "1", name: "This week" }, { n: "2", name: "The list" }, { n: "3", name: "Settle up" }],
  groups: [
    { key: "A", label: "From the landing page", want: 2, kind: "borrowed", source: "https://potluck.example" },
    { key: "B", label: "Originals", want: 4, kind: "original" },
  ],
  target: { kind: "standalone", out: "/Users/me/dev/potluck/moodboards" },
} })
```

## Example: the run this skill was distilled from (Design Lab target)

Repperoni Round 1 used `groups`:
- A "From the marketing site" (3 of 5): borrowed, `source: rep-marketing`;
- B "From the inspiration board (Finest)" (3 of 5): borrowed, `source: ui-inspire/*.png`;
- C "Originals" (4 of 8).

It ran with `screens` Home / The push-up war / Finish line and `target: { kind: "lab", lab: ".../rep-ui-lab" }`. The
marketing site changed mid-run, so A ran with `supplements: { A: ".../brief-A-update.md" }` and a `preBuild` agent
that wrote the supplement.

`target.kind: "design-lab"` is canonical at the request layer and aliases `lab` in scripts. Both workflows accept
`viewport: {width, height}` and `platform` for product-selected canvas dimensions; default 390×844 is compatible.
Desktop builds use desktop navigation and page-shot at the declared dimensions, not phone template chrome. Configure
the assembler with the same viewport, and run viewport-aware checks via shared exports/host adapter.

Desktop screen capture/checks use the same batch helper with `--width W --height H --desktop --dpr 1 --verify --audit --strings FILE`; per-job `width`/`height` can override batch dimensions. Defaults remain 390×844 mobile. Match the round config `viewport` and inspect actual top/scrolled renders.

Builder/refiner `known_issues` means unresolved material defects or missing evidence required from that role. Keep
authorized prototype limitations and pending later-stage notices visible in summary/notes instead. If historical
returns mix these, the lead may reconcile each exact note against current requirements and completed checks, retaining
the original return and the disposition/evidence. Never automatically clear a warning, edit the raw result to green,
or treat a missing requirement as a harmless limitation. Strict final verification still applies.
