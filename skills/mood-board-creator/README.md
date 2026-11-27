# mood-board-creator

Creates six distinct visual directions by default, each with a style-tile board and three representative app screens. The agent chooses suitable approaches and screen roles from the product; owner references, brand constraints and requested counts take precedence.

The agent entrypoint is [SKILL.md](SKILL.md).

| Request | Workflow |
| --- | --- |
| `$mood-board-creator` | Normal preparation and review |
| `$mood-board-creator thorough` | Normal plus independent per-direction critique |
| `--target design-lab`, `standalone`, `figma` | Explicit destination; ordinary-language requests work too |
| `--count N` | Override the default six directions |

`speed` remains an alias for normal. `lab` remains a destination alias. Without an explicit destination, use an unambiguous existing Design Lab, otherwise standalone. Next rounds use selected survivors without automatically padding back to six or treating unmentioned directions as rejected.

A destination appears early with pending positions. Each viewable draft is added while other directions are still being built; draft and reviewed output are distinguished. Standalone output supports opening files with manual refresh. Design Lab uses the existing project preview; user-owned servers are preserved.

Figma is a native editable canvas destination: frames, text, shapes and useful direction-local components. It requires connected write/screenshot capabilities, suitable edit access and a selected file or team. HTML is not a required parallel deliverable. The [Figma target guide](targets/figma.md) describes access checks, incremental writing, visual verification and preservation on resume. Availability is checked at runtime; source support alone is not evidence of a successful canvas trial.

Lite is held out of v8: it reduced recorded token use in both trials, but missed required-note validation in the operational case. Its preserved experiment is not a supported command. All modes require actual rendered inspection and an independent comparison. Substantive findings receive one targeted correction pass; unresolved material problems remain incomplete. Product-appropriate quiet screens, familiar fonts and existing brand rules are valid. See [design diagnostics](references/design-diagnostics.md).

Native Codex/Claude lifecycle tools are preferred. At most three builders own disjoint artifacts; one lead publishes shared output. The optional [legacy Workflow scripts](workflows/README.md) retain their supported arguments. No model switch, public deployment or production implementation is implied.

HTML helpers need Python 3, Node 22+ (global WebSocket/fetch) and an available Chrome-compatible executable. `CHROME_PATH` overrides discovery; cached headless-shell is preferred to avoid activating the user's macOS Chrome. Browser processes use owned temporary profiles and ports. Optional image work has its own dependencies; no image API is required when existing assets suffice.

The concise [run guide](run.md), target-specific guides and [reference index](references/README.md) hold the procedures. Local feedback, evidence and extraction records remain available for later design work and Ameriks.
