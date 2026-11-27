# 04 - Evidence and evaluation: why AI UI converges, what measurably helps, how to judge it

Researcher 4 of 5. Written 2026-11-25. Claims carry a source tag [S#]. "Read" = I opened and read the full page or PDF; "abstract" = abstract or search snippet only (stated per source). Numbers are copied from the source; where a number is my own arithmetic, it says so. Labels: PR = peer-reviewed venue, PP = preprint, VND = vendor/company-run, BLOG = blog or press.

---

## 1. Sources table

### A. Why outputs homogenise (mode collapse, typicality bias)

| # | Title | URL | Authors / publisher | Date | Type | Credibility note |
|---|---|---|---|---|---|---|
| S1 | Artificial Hivemind: The Open-Ended Homogeneity of Language Models (and Beyond) | https://arxiv.org/abs/2510.22954 (NeurIPS: https://proceedings.neurips.cc/paper_files/paper/2025/file/754d5a526a5ee5a47220664a0eb92751-Paper-Datasets_and_Benchmarks_Track.pdf) | Jiang, Chai, Li, Liu, Fok, Dziri et al. | arXiv 2025-10-27; v2 2026-10-06 | PR (NeurIPS 2025 D&B, oral) | Read abstract + results snippet. Magnitude of effect is contested by S2. |
| S2 | How Strong Is the Evidence for the Artificial Hivemind? | https://arxiv.org/abs/2609.33936 | Rylan Schaeffer (Stanford) | 2026-09-27 | PP | Read abstract. Direct rebuttal of S1's strongest claims. |
| S3 | Verbalized Sampling: How to Mitigate Mode Collapse and Unlock LLM Diversity | https://arxiv.org/abs/2510.01171 ; https://proceedings.mlr.press/v306/zhang26hy.html | Zhang, Yu, Chong, Sicilia, Tomz, Manning, Shi | arXiv 2025-10; ICML 2026 (PMLR 306) | PR | Read full PDF text (83 pp). Strong venue and Stanford/Northeastern authors; tests text tasks, not UI. |
| S4 | Understanding the Effects of RLHF on LLM Generalisation and Diversity | https://arxiv.org/abs/2310.06452 | Kirk et al. (UCL/Meta/Oxford) | ICLR 2024 | PR | Snippet only. RLHF lowers per-input output diversity vs SFT; small drop across-input. |
| S5 | Does Writing with Language Models Reduce Content Diversity? | https://arxiv.org/abs/2309.05196 | Padmakumar, He | ICLR 2024 | PR | Abstract. Human study: InstructGPT (not base GPT-3) co-writing reduces diversity. |
| S6 | Base Models Beat Aligned Models at Randomness and Creativity | https://arxiv.org/abs/2505.00047 | West, Potts | COLM 2025 | PR | Snippet. Originality slightly negatively correlated with human preference (rho -0.08). |
| S7 | Is Convergence Inevitable? Tracing Output Homogeneity Back to Base Models | https://arxiv.org/html/2608.11426v3 | Fortier | 2026-11 (v3) | PP | Abstract. Argues homogeneity is learned in pretraining, revealed by SFT. |
| S8 | We're Different, We're the Same: Creative Homogeneity Across LLMs | https://arxiv.org/abs/2501.19361 | Wenger, Kenett | 2025-01 | PP | Snippet only: LLM answers far more similar to each other than human answers on creativity tests. |

### B. Folk history of UI tells

| # | Title | URL | Publisher | Date | Type | Credibility note |
|---|---|---|---|---|---|---|
| S9 | Adam Wathan tweet "formally apologize ... bg-indigo-500" | https://x.com/adamwathan/status/1953510802159219096 | Adam Wathan (Tailwind CSS) on X | 2025-08-07 17:37 UTC | primary social post | Read via jina. Self-deprecating joke, not a study. |
| S10 | Improving frontend design through Skills + Prompting for frontend aesthetics (Cookbook) | https://claude.com/resources/articles/improving-frontend-design-through-skills ; https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics | Anthropic | 2025-11-12 / 2025-10-21 | VND | Read blog. Coins "distributional convergence"; before/after screenshots only, no metric. |
| S11 | anthropics/skills frontend-design SKILL.md (current main) | https://raw.githubusercontent.com/anthropics/skills/main/skills/frontend-design/SKILL.md | Anthropic | main branch, read 2026-11-25 | VND, primary | Read. Names 5 "AI design clusters", two-pass plan-then-critique. No measured effect published. |
| S12a | Third-party history of S11 versions (Dec 2025 font ban, Jun 2026 rewrite, Sep 2026 five traits) | https://skillselion.com/skills/anthropics/skills/frontend-design | Skillselion | 2026-10 | BLOG | Snippet only; version history unverified by me. |

### C. Benchmarks, arenas, judges

| # | Title | URL | Publisher | Date | Type | Credibility note |
|---|---|---|---|---|---|---|
| S13 | Design Arena: methodology + analysis posts (when-does-taste-become-slop; how-a-busy-screen-wins-over-ai-judges; gpt-6-astra-opinionated; how-openais-sol-finally-learned-design-taste; how-thinking-can-hurt...; ai-models-more-complaints-over-time) | https://notes.designarena.ai/methodology ; https://www.designarena.ai/blog | Design Arena / Arcada "Intelligence" | 2025-12 to 2026-11 | VND (crowdsourced, company-run) | Read all listed posts. Analyses are detailed but unreviewed; sample sizes stated. |
| S14 | Design Arena leaderboards (Code, UI Components) | https://www.designarena.ai/leaderboard ; https://www.designarena.ai/leaderboard/ui-components | Design Arena | UI Components updated 2026-11-22 | VND | Page text partial (JS); only rank order, win rates and UI-Components Elo captured. |
| S15 | arena.ai (LMArena) Code Arena / WebDev leaderboard | https://arena.ai/leaderboard/code/webdev | LMArena | snapshot 2026-11-23 | VND | Page blocked by Cloudflare for me; numbers are from a search snippet only. |
| S16 | DesignBench catalogue of AI design benchmarks (84 entries) | https://designbench.com/ | designbench.com ("Draft") | 2026 | BLOG / catalogue | Read index + 6 entry pages. Third-party summary, some entries "written from abstract". Useful map, not primary. |
| S17 | DesignBench: A Comprehensive Benchmark for MLLM-based Front-end Code Generation | https://arxiv.org/abs/2506.06251 | Xiao et al. (CUHK) | 2025-06; v3 2026-03 | PP | Read abstract + PDF text. Generation/edit/repair, 900 pages. The "27.14% UI-issue identification" figure is only in a secondary summary (https://text-to-app.com/research/design-bench/); I could not find it in v3. |
| S18 | WebGen-Bench | https://arxiv.org/abs/2505.03733 | Lu et al. | NeurIPS 2025 D&B | PR | Read abstract. Functional tests via UI agent, 647 test cases. |
| S19 | ArtifactsBench | https://arxiv.org/abs/2507.04952 ; https://aclanthology.org/2026.emnlp-main.2229/ | Tencent Hunyuan | 2025-07; EMNLP 2026 | PR | Read abstract. 1,825 tasks, MLLM judge with per-task checklist. |
| S20 | Design2Code | https://aclanthology.org/2025.naacl-long.199/ | Si et al. (Stanford) | NAACL 2025 | PR | Snippet only; screenshot-to-code fidelity, not originality. |
| S21 | Design Creativity Bench: Measuring creativity in LLM-Generated UI | https://arxiv.org/abs/2610.11539 | Rusia et al. (Kombai Inc.) | 2026-10-08 | PP, VND-authored | Read full text. The only UI-specific model-vs-human originality measurement I found. Company has a product stake. |
| S22 | WebDevJudge: Evaluating (M)LLMs as Critiques for Web Development Quality | https://arxiv.org/abs/2510.18560 | Li et al. | 2025-10; v3 2026-03 | PP (catalogue S16 says ICLR) | Read PDF text. |
| S23 | Interaction-as-a-Judge | https://arxiv.org/abs/2610.17895 | Chi et al. | 2026-10-13 | PP | Read abstract. |
| S24 | UICrit (UIST 2024) and UIClip (UIST 2024) | https://arxiv.org/abs/2407.08850 ; https://arxiv.org/abs/2404.12500 | Duan et al. (Google/Berkeley); Wu et al. (Apple) | 2024 | PR | Abstracts only. Outside 2025-26 but the base for critique-dataset work. |
| S25 | Improving User Interface Generation Models from Designer Feedback | https://arxiv.org/abs/2509.16779 | Wu, Swearngin, ... Barik (Apple) | 2025-09; CHI 2026 | PR | Read PDF text. |
| S26 | Rams Index method page | https://www.rams.ai/index/method | Rams | 2026-10 | VND | Read. Unusually transparent judge-validation numbers; validation by outside designers "not started" per page. |
| S27 | The Human Creativity Benchmark | https://arxiv.org/abs/2606.30561 | Hopkins et al. (Contra Labs) | 2026-06-29 | PP, VND | Read abstract + method. 15,000 professional judgments. |

### D. Techniques that improve generated UI

| # | Title | URL | Authors | Date | Type | Credibility note |
|---|---|---|---|---|---|---|
| S28 | Enabling Creative Exploration for Vibe Design Agents | https://arxiv.org/abs/2609.15078 | Zhang, Bui, Evangelopoulos, Benard | 2026-09-14 | PP (industry A/B on millions of tasks) | Read full text. The only paper I found applying Verbalized Sampling to UI generation. |
| S29 | Vision-Guided Iterative Refinement for Frontend Code Generation | https://arxiv.org/abs/2604.05839 | Sansford et al. (Bristol/Amazon AGI) | 2026-04-07 | PP (ICLR 2026 workshop) | Read. Critic-in-the-loop on WebDev Arena prompts. |
| S30 | WebGen-Agent | https://arxiv.org/abs/2509.22644 | Lu et al. | 2025-09-26 | PP | Read abstract. Screenshot + GUI-agent feedback loop. |
| S31 | Code Aesthetics with Agentic Reward Feedback (AesCoder) | https://arxiv.org/abs/2510.23272 | Xiao et al. (Microsoft Research Asia) | 2025-10-27 | PP | Abstract. |
| S32 | Zero-Shot Prompting Approaches for LLM-based GUI Generation (RAGG, Self-Critique) | https://arxiv.org/abs/2412.11328 | Kolthoff et al. | 2024-12 | PP | Snippet; 100+ crowd-workers, 3,000+ annotations. Slightly before window. |
| S33 | AXIS-Bench: pilot benchmark for interactivity and accessibility in front-end code generation | https://doi.org/10.51483/ijaiml.3015 | Nooka et al. | 2026-01 | PR (small journal), pilot | Abstract. 12 components only. |
| S34 | Learning to Detect UI Principle Violations via RL | https://arxiv.org/abs/2607.20690 | Mehta et al. | 2026-07/08 | PP | Read abstract + results. Violations are synthetically injected. |

### E. Measured homogenisation of AI UI and its UX failures

| # | Title | URL | Authors / publisher | Date | Type | Credibility note |
|---|---|---|---|---|---|---|
| S35 | One Tool, One Taste? How Vibe Coding Trades Collective Diversity for Individual Creativity | https://arxiv.org/abs/2609.38183 | Boussioux, Zhao, Cho | 2026-08/09 | PP | Read (129k chars). 73 Lovable sites; small, one assignment, one tool. |
| S36 | Design Theater: gap between design reasoning and implementation in generative UI tools | https://doi.org/10.1609/aies.v9i2.43227 | Imteyaz et al. | AIES 2026 (2026-10-11) | PR | Read abstract page. |
| S37 | Good Accessibility, Handcuffed Creativity | https://doi.org/10.1145/3715336.3735691 | Guriță, Vatavu | ACM DIS 2025 | PR | Abstract. 90 interfaces, 2 tools, 8 designers interviewed. |
| S38 | Interrogating Design Homogenization in Web Vibe Coding | https://arxiv.org/abs/2603.13036 | Shin et al. (UW) | 2026-03-13 | PP, conceptual | Abstract only. Risk analysis plus "productive friction" framework; no measurement. |
| S39 | NN/g: Good from Afar, But Far from Good: AI Prototyping in Real Design Contexts | https://www.nngroup.com/articles/ai-prototyping | Nielsen Norman Group | 2025-10-24 | institutional research | Read in full. Heuristic evaluations, ~1 project, several tools. |
| S40 | NN/g: AI Design Tools Are Marginally Better (status update) | https://www.nngroup.com/articles/ai-design-tools-update-2 | NN/g | 2025-05-09 | institutional | Snippet only. |
| S41 | NN/g: GenUI vs. Vibe Coding: Who's Designing? | https://www.nngroup.com/articles/genui-vs-vibe | NN/g | 2026-03-27 | institutional, essay | Read first half. |
| S42 | NN/g: Can AI Generate Good Designs from Raw User Data? | https://www.nngroup.com/articles/raw-data-vs-synthesized-data | NN/g | 2026-11-20 | institutional, controlled | Read. 8 designs per cell, blind human + LLM scoring, p < 0.001. |
| S43 | Figma State of the Designer 2026 and 2026 AI report | https://www.figma.com/blog/state-of-the-designer-2026 ; https://www.figma.com/blog/2026-ai-report | Figma (survey by NewtonX, n=906) | 2026-02-12 / 2026-06-24 | VND survey | Read. Self-reported; says nothing measurable about slop. |
| S44 | Smashing Magazine: The UX Designer's Nightmare: When "Production-Ready" Becomes a Design Deliverable | https://www.smashingmagazine.com/2026/04/production-ready-becomes-design-deliverable-ux | Carrie Webster | 2026-04-22 | editorial | Read. Its numbers (92% vulnerable, 4x duplication, 23.5% incidents) link to vendor blogs; treat as unverified. |
| S45 | Baymard: NN/g podcast page on UX-Ray accuracy; Baymard AI engagement research | https://www.nngroup.com/articles/baymard-ai-tool-accuracy ; https://baymard.com/research-articles/ai-engagement-quantitative-ux-insights-2026 | NN/g, Baymard | 2026-01 / 2026-10 | institutional | Snippets only. Baymard has no study of AI-generated UI itself that I could find. |
| S46 | WebAIM Million 2026 | https://webaim.org/projects/million/ | WebAIM (Utah State) | 2026-02 | institutional, primary | Read. Not specific to AI; the AI link is the authors' speculation. |
| S47 | Measuring the Semantic Accessibility Gap in LLM-Generated Web UIs | https://tommasocalo.github.io/papers/semacces (CHI EA 2026) | Calò, Guriță, De Russis | 2026-04 | PR (extended abstract) | Snippet only (ACM page blocked). |
| S48 | design-agent.dev: AI Slop and UI Homogenization: Measuring Design Convergence | https://design-agent.dev/blog/2026-10-15-ai-slop-measuring-design-homogenization/ | design-agent.dev | 2026-10-15 | BLOG | Read first half. Mostly restates S21, S3; proposes Vendi score as agent self-metric (unvalidated). |

---

## 2. Per-source findings

### A. Why outputs homogenise

**S3 Verbalized Sampling (ICML 2026).** Claim: mode collapse comes largely from typicality bias in preference data, not only from the RLHF algorithm. Method: formal model plus checks on 4 preference datasets; reward = true utility + alpha * log pi_ref(y|x). Numbers: on HelpSteer (human-only labels) annotators preferred the higher base-model log-probability response 51.6-60.8% of the time (chance = 50%). Prompting fix: ask for k responses each with a probability ("Generate 5 responses ... sample from the tails, probability < 0.10"). Results: creative-writing diversity 1.6-2.1x over direct prompting; human-rated diversity +25.7%; recovers 66.8% of the base model's diversity (Tulu-70B: base 45.4%; direct prompting retains 23.8%; VS +182.6% over direct after DPO); larger models (GPT-4.1, Gemini-2.5-Pro) gain 1.5-2x more than small ones; higher k gives more diversity. Quality was not harmed on most tasks but not always: poem task, GPT-4.1-Mini quality 61.1 (direct) vs 56.5 (VS-Standard) while diversity 8.4 -> 14.8; VS-Multi kept 61.3. Limits: text tasks (poems, jokes, stories, dialogue); verbalized probabilities are a prompting device, only loosely calibrated (KL 0.12 to a pretraining proxy).

**S1 Artificial Hivemind (NeurIPS 2025).** 26K open-ended queries (Infinity-Chat), 31,250 human annotations. With top-p 0.9, T=1.0, 50 samples per query, in 79% of cases within-model average pairwise similarity exceeded 0.8; cross-model similarity averaged 71-82% (DeepSeek-V3 vs qwen-max 0.82; DeepSeek-V3 vs gpt-4o 0.81). LMs, reward models and LLM judges are worse calibrated on items where human raters disagree idiosyncratically. Limit: S2.

**S2 Schaeffer (PP).** The flagship "time metaphor collapses into two clusters" example is contradicted (one dominant vehicle plus a heavy tail). Under a harder null (same-prompt, genuinely different ideas), 20-32% of pairs already exceed S1's 0.8 threshold, so part of "homogeneity" is shared prompt geometry; a residual effect survives (S1 same-prompt pairs exceed 0.8 two to three times as often). Also: S1's claim that inference-time fixes are inadequate is unsupported; prompting reliably raises measured diversity. Take-away: homogenisation is real but the headline magnitudes are inflated; do not quote 0.8 similarity figures as UI facts.

**S4-S8.** RLHF-tuned models lose per-input diversity vs SFT (S4); InstructGPT co-writing, not base GPT-3, narrowed what many authors wrote (S5); base models beat aligned ones on random-number and poetry originality, while human raters preferred aligned output (S6: originality vs preference rho = -0.08); S7 argues the convergence exists before alignment and "instruct-like collapse can be induced through prompting alone", so post-hoc fixes are hard; S8 (snippet) LLM-to-LLM similarity far exceeds human-to-human on creativity tests. Together: the typical-answer pull is multi-causal (data, pretraining, alignment) and persists in 2026 models [S21].

### B. Folk history of UI tells

**S9 (primary).** Text: "I'd like to formally apologize for making every button in Tailwind UI `bg-indigo-500` five years ago, leading to every AI generated UI on earth also being indigo." Posted 2025-08-07 17:37 UTC. Press reports gave 684k views early and "1M+" later (BLOG, counts unverified). In the same thread a reply posts a GPT-5 purple app ("GPT-5 hasn't solved the purple problem"), another speculates a feedback loop (AI sites become training data), another asks "is there a reason why u chose bg-indigo-500?". Status: a joke with a plausible mechanism; no study ties purple frequency in LLM output to Tailwind UI. Counter-evidence: S36 found "greater variation in color choices" than in layout across 5 tools, and S13 shows the default look moved from purple to beige-serif within a year while sameness persisted. So the colour tell is the most memorable but not the main axis of convergence.

**S10/S11 (Anthropic).** Mechanism claimed: "distributional convergence ... safe design choices dominate web training data; without direction Claude samples from this high-probability center." Evidence offered: before/after screenshots for typography and an RPG theme; no numeric eval. Observation (S10): a font mandate "seems to encourage the model to improve other aspects of the design as well." Current main-branch SKILL.md (S11) has moved from naming fonts to describing five clusters (cream+serif+terracotta; near-black+one acid accent; broadsheet hairlines; identical rounded SaaS cards with same shadow; template chrome: tracked ALL-CAPS eyebrow, middle-dot meta strings, "WORD - fragment" labels, arrows on links), says the brief's own words always win, mandates a plan (4-6 named hex colours, type roles, layout concept with ASCII wireframes), then a review of the plan against the brief ("work through a similar prompt to see if you arrive somewhere similar"), then build. Note it names Anthropic's own accent (#D97757) as a tell. None of this has published measured effect sizes.

### C. Benchmarks, arenas, judges

**S13/S14/S15 arenas.** Design Arena: blind pairwise votes, Bradley-Terry Elo, equal weight per vote, models below 15 comparisons dropped, 95% Wilson intervals, tournaments pick pairs by expected information gain, optional prompt "enhancer" (Gemini 2.5 Flash Lite) that adds colours, a11y and responsiveness to prompts (S13 methodology). Snapshot 2026-11-22/23: Design Arena UI Components Elo: Claude Fable 5.2 1393, GPT-6 Astra (xhigh) 1387, Gemini 4 Carbon 1381 (a 12-point spread; differences inside typical intervals). Design Arena main board ranks Fable 5.2 #1, Opus 5.5 #2, Gemini 4 Carbon #3, with win rates 68.1% / 61.9% / 64.4% (column meaning partially unreadable). LMArena WebDev, 2026-11-23, 1,047,754 votes: Fable 5.2 xHigh 1,822; Opus 5.5 Max 1,820; Sonnet 5.5 xHigh 1,773; Gemini 4 Carbon High 1,769; GPT-6 Astra Max 1,764 (snippet only, S15). Reading: Anthropic models lead both arenas at the moment, but the top two on WebDev differ by 2 points; leadership flips within months (S13: GPT-5.6 Sol rose to #1 in July 2026; Opus 4.8 fell to #23 on single-turn web while ranking 2nd on the agentic full-stack board; Kimi K3 led single-shot Frontend Arena at 1392 in July).
What the arenas actually measure (S13 posts):
- Voters moved: Jan to Oct 2026 (1,000 tournaments per month, CLIP + UMAP, per-month Bradley-Terry): near-black page + one saturated accent gained (+0.78 over 62 pages); gold-and-serif luxury lost (-0.49, 184 pages); earthy beige "tasteful" serif lost (-0.46, 196 pages) "even as models kept generating them in October".
- Anti-pattern suppression is learnable: GPT-5.6 Sol's CLIP design manifold shows gaps where GPT-5.5 produced purple gradients, bento layouts, oversized hero text; it reached #1 on Web Design (non-agentic). (Vendor analysis, n=1,000 sites.)
- But house style grows: across GPT releases, mirroring of user reference images fell from 0.37 (GPT-5.5) to 0.22 (GPT-6 Astra max) while "each model's websites grew more alike whatever the input"; voters prefer the low-mirroring model (n=25,000 sites, 35 models). Reading: de-slopping by training can trade one sameness for another; being original per brief is distinct from being unlike other models.
- More reasoning is not better design: Muse Spark 1.3 Max vs Xhigh, ~800 prompts, 21% vs 15% pages throwing console errors; Max's parse failures 18% vs 12%.
- Complaints rise with time for the same model: 70 of 80 models drew more complaints in Jun-Jul than Apr-May (median 3.2% to 4.9% of replies); about 30% more after controlling for task, length, user tenure.

**S16 catalogue.** Of 84 entries (54 benchmarks) it counts 26 that score design quality; only 10 cited in a model launch. Most design benchmarks grade fidelity to a reference (Design2Code S20, DesignBench S17), function (WebGen-Bench S18: best agent combination 27.8% accuracy on 647 tests in the original paper; WebGen-Agent S30 lifted Claude-3.5-Sonnet 26.4% to 51.9%), or checklist-judged artifacts (ArtifactsBench S19). Originality is rarely scored; S21 is the exception.

**S19 ArtifactsBench.** 1,825 tasks, 30+ LLMs, MLLM judge sees temporal screenshots plus code against a per-task checklist: 94.4% ranking consistency with WebDev Arena, >90% pairwise agreement with human experts. This is agreement at model-ranking level; per-page agreement is lower (see judge table).

**S17 DesignBench.** 900 real pages, React/Vue/Angular/vanilla; models do markedly worse on framework code than vanilla HTML/CSS; weak localisation of what to edit; poor at identifying UI issues (occlusion, crowding, alignment): 27.14% average accuracy per secondary summary (not verified in v3).

**Judge reliability, collected (all numbers from the cited source):**

| Judge setup | Result | Source |
|---|---|---|
| Best (M)LLM judge on paired web implementations, vs human experts | 70.34% agreement (GPT-4.1 pairwise); plateau ~70% as models scale; human inter-annotator agreement > 80%; pairwise beats single-score grading by > 8 points; gap ~15 points | S22 |
| Non-interactive vs interactive (computer-use agent) judge | preference prediction 65.6% -> 69.1%; requirement verification 77.0% -> 81.6% (6,858 pairs, 222 apps) | S23 |
| Same, as repair signal | repairs 75.5% of broken requirements in 5 attempts vs 55.4% with code-only self-feedback; as RL reward +6.7 pp win rate vs base | S23 |
| Five frontier LLM judges vs the requester's own vote (1,759 pairs, 688 requests) | judges match the requester 57-60%; any two judges agree 79%; judges pick the page with >= 2.5x more first-screen text 83% of the time vs 63% for requesters; with letters replaced by "x" still 64%; with text hidden 56% (humans 54%); stated reasons call the busy page "informative", rarely "cluttered" (~1%); rewording the judge prompt only moves 68% -> 63% | S13 (busy-screen post) |
| Rams: grade-sum rubric (7 criteria, 1-5) vs one designer, 131 non-tied pairs | 35% agreement | S26 |
| Rams: side-by-side, order-swapped, 3 labs' judges, vote counts only if same pick in both orders | 63% agreement with the same designer (59% on unseen rounds); Claude judge gave Anthropic pages ~10 points more wins (95% CI 7 to 13); now each judge sits out its own lab's pairs | S26 (n=1 rater; outside-designer validation "not started") |
| Repeatability of rubric judge | ICC 0.97 real home pages, 0.94 App Store screenshots, 0.76 on 15 model-built pages | S26 |
| UICrit few-shot + visual prompting | +55% performance on LLM-generated UI feedback; 3,059 critiques, 983 UIs, 7 designers | S24 (abstract) |
| Professional raters (HCB, 15,000 judgments) | agreement concentrates on technical correctness and visual hierarchy; disagreement on aesthetic direction and conceptual risk; "no model excels uniformly across phases" | S27 |

Reading: LLM judges are adequate for ranking models (94%) and for catching verifiable defects, mediocre per-pair (57-70%), biased toward busier screens and own-lab output, and the biases are shared across labs (79% mutual agreement), so a multi-judge panel does not average them out. Pairwise, order-swapped comparison and rendered/interactive evidence are the measurably better designs. Aesthetic direction is legitimately personal (S27), so "taste" must be fixed by the owner/brief, not by a judge.

### D. Techniques that improve generated UI

**S28 Verbalized Sampling applied to UI themes (PP, industry).** Pre-pass proposes structured design specs with typicality scores; an external selector samples one; generator implements under fixed settings. Baseline: the model chose the same theme 100% of the time (coverage = 1.00 option; screenshot similarity 0.6765). With sampling at candidate temperature tau 1.0-5.0: 2.59-2.94 distinct options, one-option share 3.6% to 0%, similarity 0.6085 to 0.5437 (lower = more varied). LLM-judge win/loss for themes across tau 0.5-5.0: 0.81, 0.93, 0.85, 1.10, 0.90 (about 25% ties), so more variety without a measurable preference gain or loss. Visual-asset prompt sampling: best W/L 1.32 (tau 1.0) with almost unchanged screen similarity (0.6616). Online randomised study (3.39M tasks, 87,416 labelled conversations): negative-feedback estimate lower, intervals include zero; no detectable gain in exports or task completion; serving cost: tasks done within 100 s 71.71% -> 70.80%, server exceptions 0.762% -> 0.799%. Conclusion: diversify by choosing a design specification first (not by raising code temperature, which "varies aesthetic decisions and syntax-sensitive code at the same time"); expect variety, not guaranteed higher quality.

**S29 Critic-in-the-loop (workshop PP).** VLM critic gives structured feedback on rendered pages from WebDev Arena prompts; up to +17.8% quality over three cycles (Distill-Qwen-14B generator) and +10.8% self-improvement with Claude 4.5 Sonnet; best solution arrived after one or more cycles for 86% of tasks in the self-improvement setting; LoRA distillation captured 25% of the gain. Judged by a VLM on four dimensions (so the same bias caveats apply).

**S30 WebGen-Agent.** Screenshot + GUI-agent feedback with backtrack-and-select-best: Claude-3.5-Sonnet accuracy 26.4% -> 51.9%, appearance score 3.0 -> 3.9; Step-GRPO on Qwen2.5-Coder-7B 38.9% -> 45.4%, appearance 3.4 -> 3.7.

**S23 Interaction-as-a-Judge** (see table): operating the app before judging beats code-only review.

**S25 Apple (CHI 2026).** 21 designers, ~1,500 annotations (1,460 screens). Preference pairs derived from designer comments, sketches and direct edits had lower disagreement than ranking feedback, and fine-tuned open models beat ranking-trained models and all baselines including GPT-5 (arena-style human judging, LMSYS-style rating, bootstrap CIs). Trivial synthetic pairs (strong model vs weak model) are less informative. Implication: concrete edits ("move this, change that") carry more signal than scores; critique steps should name changes, not grades. Also states "most LLMs are unable to reliably generate well-designed UIs".

**S31 AesCoder.** Agentic reward (executability, static and interactive aesthetics) + GRPO; 4B model on OpenDesign beats GPT-4o and GPT-4.1 and approaches 480-685B open models. Also Design Arena had AesCoder-4B beating several flagships on its website board at the time (S13 blog index). Aesthetic quality is trainable; for prompt-level skills it means the base ceiling is rising.

**S32 Kolthoff et al.** Three zero-shot strategies, 3,000+ annotations from 100+ UX-experienced crowd workers: Self-Critique (SCGG) beat Prompt Decomposition and retrieval-augmented generation; RAGG improved satisfaction when 7 retrieved examples were used (k=1 vs 7 significant on all items; k=3 vs 7 mostly) and the added examples "mainly act as design inspirations". 2024, snippet only.

**S33 AXIS-Bench (pilot, 12 components).** Naive non-semantic 0/12, zero-shot LLM 6/12, same model with the relevant WAI-ARIA Authoring Practices pattern text in the prompt 12/12 (McNemar p = 0.031 for each step; axe-core static rules did not separate the LLM conditions, a Playwright accessibility-tree harness did). Small but a clean demonstration that pasting the pattern spec works for behaviour.

**S34 principle-violation critic.** 19 principles (WCAG 2.2, dark patterns, perception/cognition). A 4B VLM goes from micro-F1 36% to 84% after RL on ~10,000 pages with synthetically injected violations; spacing violations 4% -> 94%, content-container fit 0% -> 92%, non-text contrast 0% -> 64%. Zero-shot small models essentially miss visual-only violations (spacing, container fit). Limit: injected, not natural, violations.

**S36 Design Theater.** 24 tasks, 120 interfaces, 5 generative UI tools: ~25% of the tools' stated design rationales are not implemented in the output (34% for functional requirements); tools recognise 0.54 of the UX principles named in the prompt; four of five implement <= 6% of functional principles; appearance and layout organisation converge across tools, colour varies more. Implication: do not accept a model's description of its design; verify rendered output.

### E. Measured homogenisation and UX failures

**S21 Design Creativity Bench (PP, Kombai).** 15 models, 160 designs each (2,400), 80 briefs; single prompt, no diversity-seeking prompting, default decoding. Originality (distinctiveness between models on same brief): 0.592 [0.582, 0.602] model-model vs 0.764 [0.751, 0.778] human-model. Creative range (same model, same UI goal, different product domain): 0.581 [0.567, 0.597] vs human 0.902 [0.884, 0.919]. Best originality GPT-6 Astra 0.646, worst Kimi K3 0.547; even the best is 0.12 below humans. Appropriateness (share of acceptance criteria met) > 90% for all models, best 99.2% vs 98.0% human. The similarity scorer separated "distinct vs not distinct" human labels with AUC 0.85 out of sample (scorer chosen from several embedding options, UIClip-based variants beat whole-image Gemini embeddings in its comparison). Reading: models are competent and interchangeable; changing the product domain barely changes the design (creative range 0.58 vs 0.90). Limits: vendor authors, one prompt template, hosted-API defaults, "no diversity-seeking prompting was attempted".

**S35 One Tool, One Taste (PP).** 73 promotional sites built in Lovable by graduate students under a graded assignment that rewarded original design, for 73 different real businesses. DINOv3 embeddings: mean pairwise similarity 22.8% (hero-only 11.2%); order-2 Vendi score 12.0 effective distinct designs (jackknife 95% CI 9.1-15.0; hero-only 24.2); UMAP-HDBSCAN puts 88% of sites in 6 clusters (3-12 across settings). Process (9 recordings, preliminary): spoken verdicts were generic ("good", "cool"); originality was invoked in 3.4% of 440 verdicts; intentions voiced aloud often never reached the typed prompt; prompts got more generic over a session. Satisfaction and perceived quality showed no detectable association with atypicality ("authored ignorance"). Also cites work that typical designs are liked more at first contact and atypical ones win only after repeated exposure (Landwehr 2011/2013), so atypicality is not automatically better. Limits: one tool, one cohort, no human-designer baseline.

**S37 and S36.** S37: 90 interfaces from 2 tools, 3 domains: basic WCAG compliance was consistently achieved but outputs relied on "homogenized design patterns" and showed "minimal structural variation despite the explicit requests for accessibility". S36 above.

**S38.** Concept paper: frictionless generation worsens homogenisation; proposes "productive friction" (make users and agents challenge defaults at micro, meso, macro levels). No data.

**S39 NN/g AI prototyping (Oct 2025).** Real project (profile page), AI-assisted design tools, vibe-coding tools, general chatbots; three prompt levels (broad; detailed with components, design language and states; text plus design artifacts); heuristic evaluation vs NN/g designers. Findings: (1) detailed prompts "consistently yield better results" and code-based tools then resembled the human design; broad prompts varied widely across tools; (2) attaching a design artifact (sketch, mockup, Figma link) gave the most accurate result, "the irony is that by providing these references, you've already completed much of the design work yourself"; (3) even good outputs missed nuance: weak visual hierarchy/grouping, overused colours causing tension, poor colour contrast, inconsistent margins, a large gap separating items that belong together; (4) without visual specification, tools produced "a similar, generic look using sans-serif typeface and minimalistic styling", defaulting to shadcn/Tailwind, "flat and interchangeable"; (5) wrong pattern chosen when the prompt is vague (a "profile page" built like a social profile). Verdict: "good from afar, but far from good". Limits: one scenario, qualitative.

**S40 (NN/g, May 2025, snippet).** A tool's multiple variants from the same prompt gave "only minor variations"; quality did not improve with prompt length or added context. Consistent with S28 (within-model collapse).

**S41 NN/g GenUI vs vibe coding.** "If you leave design decisions up to an AI system, you tend to get generic-looking outputs"; genUI should be evaluated with user research and task completion, not "did it render correctly".

**S42 NN/g raw vs synthesised context (Nov 2026).** Controlled: 2 tasks (flight rebooking, checkout), 8 designs per cell, blind human grader with LLM judge as check (96% agreement after calibration); designs from synthesised findings + recommendations met 77.9% of scorecard criteria vs 69.5% from raw comments (+8.4 pp, p < 0.001; flight task +11.4, checkout +5.5). Examples: raw comments about lost loyalty miles never produced a miles notice; checkout items stayed visible on every step in nearly all synthesised designs vs fewer than half of raw. Implication: give the generator decisions and constraints, not raw inspiration dumps.

**S43 Figma (survey n=906; AI report).** 91% of designers say AI tools improve their designs; 89% faster; 80% collaborate better; "craft" defined as visual polish 58%, problem solving 47%, clear intuitive UX 36%, emotion and delight 35%, consistency 15%; 90% say design is at least as important as before AI (nearly 6 in 10 say more). Self-reported, vendor-run; no output-quality measurement.

**S44 Smashing.** Argues AI-generated UI code lacks semantic integrity (a "beautiful toggle" built as a non-semantic element without keyboard focus or screen-reader support = "accessibility debt"). The quoted statistics come from vendor blogs; use only the qualitative point.

**S45 Baymard.** Not a source on AI UI quality. NN/g reports Baymard's own audit tool claims 95% accuracy (vendor claim, unverified); Baymard's 2026 survey found 60% of shoppers say knowing a product image is AI-generated would lower purchase confidence. Baymard's older finding that usability issues generalise across sites (e.g. 97% of general e-commerce issues apply to mass-merchant sites) supports checking against well-known patterns, but it is not evidence about AI.

**S46/S47 accessibility.** WebAIM Million 2026 (1,000,000 home pages, WAVE): 56.1 errors/page (+10.1% from 51), 95.9% of pages with detected WCAG 2 failures (94.8% in 2025; reverses six years of small yearly improvements), low-contrast text on 83.9% (79.1% before), missing alt 53.1%, missing form labels 51%, empty links 46.3%, empty buttons 30.6%; 96% of errors fall in six categories. The report says these trends "likely reflect" frameworks and "AI-assisted coding practices ('vibe coding')": speculation, not measurement. S47 (CHI EA, snippet): LLM judge finds semantic accessibility violations (e.g. non-semantic controls) with 80-92% recall under fault injection. Contrast and labels are the dominant, cheaply checkable failure classes.

---

## 3. For our anti-slop skill

### 3.1 What the evidence says about the problem (use as the skill's rationale, one paragraph)

- Default LLM output is competent and interchangeable. UI-specific: cross-model originality 0.59 vs 0.76 with a human in the pair, and changing the product domain moves the design only 0.58 vs 0.90 for humans [S21]; 73 independent briefs became ~12 effective designs [S35]; tools converge on appearance and layout more than colour [S36]; NN/g sees a generic sans/minimal/shadcn look [S39].
- A fixed default is deterministic, not random: asked the same brief, a model picked the same theme 100% of the time [S28]. So "run it again" does not diversify; the diversity must be injected before code.
- Colour tells (indigo/purple) are the visible tip. The measured convergence is structural (layout archetype, section order, component kit, typography treatment) [S36, S35, S11 traits 4-5].
- Tells have a half-life. The beige-serif "tasteful" default and gold-serif luxury fell in voter preference within ten months while models kept making them [S13]. A static ban-list goes stale; Anthropic's own skill moved from naming fonts to describing clusters [S11, S12a].

### 3.2 What works, ranked by strength of evidence

| Practice | Evidence strength | Effect (source) | How to use in the skill |
|---|---|---|---|
| 1. Make design decisions explicit before code: a written spec of palette (named values), type roles, layout concept, principles | Moderate. Consistent across independent sources, but effect sizes for originality unmeasured | Specific prompts "consistently yield better results" and tailored output [S39]; explicit spec stage is the mechanism that moved theme choice from 1 to ~2.9 options [S28]; synthesised, decision-bearing context beat raw context by +8.4 pp [S42]; plan then review vs brief [S11] | Step 1 of the skill: produce a spec the code must follow; no code until the spec exists. Include real subject matter (real copy, domain objects) |
| 2. Diverge then select: generate N (e.g. 5) distinct directions with estimated typicality, choose from the low-probability side with a selector that is not the model's argmax | Strong for text creativity [S3]; weak-moderate for UI (diversity up, preference neutral) [S28] | S3: 1.6-2.1x diversity, larger models gain more, more candidates (k) gives more diversity; S28: options 1 -> 2.1-2.9, judge W/L 0.81-1.10 | Ask for k=5 labelled directions each with a typicality estimate and a one-line rationale; pick one by an explicit rule (e.g. randomly among those under 0.10, or the one furthest from the default), not "the best". Expect variety, verify quality separately |
| 3. Screenshot-and-interaction critique rounds, 2-3 cycles | Moderate-strong for quality/function; none for originality | +10.8% to +17.8% over 3 cycles [S29]; appearance 3.0 -> 3.9 [S30]; interactive judging beats code-only (repair 75.5% vs 55.4%) [S23] | Render at 2 widths (e.g. 1440 and 390 as in S26), operate the page (click, keyboard, scroll), critique, revise. Stop at 3 cycles unless defects remain. The critic must be told what to look for (below) because VLM critics default to the busy page [S13] |
| 4. Critique written as concrete edits against named principles | Moderate | Designer edits/sketches as feedback beat ratings [S25]; named-principle critics fix spacing, container fit, contrast from ~0% [S34]; UICrit few-shot +55% [S24] | Rubric lines of the form "element X, problem, change to Y". Principle list: hierarchy, grouping/proximity, spacing rhythm, contrast, tap targets, container fit, consistency |
| 5. Deterministic checks outside the judge | Strong (they are not opinion) | WebAIM top six failure classes = 96% of errors, contrast 83.9% [S46]; Rams keeps rendered checks (contrast, text < 12 px, tap targets, overflow, overlap) outside the score [S26]; NN/g found contrast/margin/grouping misses even in good outputs [S39] | Run contrast, label, empty link/button, overflow at 390 px, focus-visible, heading order checks every round; fail the round on any critical |
| 6. Paste the relevant pattern/spec text for interactive components | Moderate (small pilot, but clean) | WAI-ARIA APG text in prompt: 12/12 vs 6/12 zero-shot [S33] | For modals, tabs, menus, forms, tables: include the pattern and states list (hover, focus, disabled, loading, empty, error) |
| 7. Reference images/links for principles, not for copying | Moderate | Design artifacts gave the most faithful output [S39]; but voters prefer the model that mirrors references least (25,000 sites, 35 models) [S13] | Use references to extract rules (grid, rhythm, type contrast), name what is borrowed and what is changed; never reproduce palette+layout wholesale |
| 8. Retrieval of similar examples | Weak (2024, one study) | 7 retrieved examples improved overall satisfaction; they act as inspiration [S32] | Optional; risks pulling toward the mean unless examples are chosen for contrast |
| 9. Self-critique prompt | Weak-moderate | Self-Critique beat decomposition and RAG in a zero-shot GUI study [S32] | Fold into critique rounds |
| 10. Distinctness measurement (embedding distance of the screenshot to the default build and to sibling candidates) | Measurement validated, optimiser use unvalidated | S21 scorer AUC 0.85 vs human distinct/not-distinct labels; S35 Vendi/DINOv3; S13 CLIP-UMAP | Generate a "baseline default" for the same brief and require visible distance from it (see 3.4). Do not claim it proves quality; S35 says typical designs win on first contact |

### 3.3 Concrete process (derived; steps tagged by evidence)

1. Intake: subject, audience, primary job, real content, constraints (brand, a11y, devices). Ask for what is missing; do not let the model infer "profile page" etc. [S39, S11].
2. Name the defaults first: write down what a no-guidance build for this brief would be (the "default build": layout archetype, type, palette, component kit). This is the thing to differ from [S11 "work through a similar prompt", S28 baseline coverage 1.00, S21].
3. Diverge: 5 distinct design directions as structured specs (palette with named hex, type roles, layout concept in one sentence plus ASCII wireframe, motion stance, what it deliberately refuses), each with a typicality estimate; include at least one that inverts a default axis [S3, S28, S11].
4. Select: choose by rule, then record why. If the owner has taste constraints, they decide here; taste diverges among professionals while verifiable quality converges [S27].
5. Build the spec as design tokens and a small component set before pages.
6. Render, then critique in rounds (<= 3): deterministic checks, then principle-based critique with edit-form findings, at 1440 and 390 px, with interaction [S23, S26, S29, S34, S25].
7. Pairwise gate: put the result next to the default build and (if available) the best rival candidate; judge side by side, swap order, judge twice, require the same pick both times, and use a judge from a different model family than the generator [S26]. Add "does this look like the default build?" to the questions.
8. Final: a human looks at the rendered screens (not the code, not the model's own explanation [S36]) before acceptance.

### 3.4 How to evaluate output (and what not to trust)

Layers, cheapest first:
- Rendered/deterministic: contrast (WCAG AA), missing labels/alt, empty links/buttons, text under 12 px, tap targets, horizontal overflow at 390 px, overlap/clipping, keyboard focus order, heading levels [S46, S26]. Not a judge call.
- Behavioural: operate it (every interactive element, empty/error/loading states). Interaction-based judging beat static judging by 3.5 to 4.6 points [S23]; static review misses broken flows. Model rationales are not evidence: ~25% not implemented [S36].
- Distinctness (originality proxy): embed screenshots (DINOv3/CLIP-style) and compare to (a) the default build and (b) sibling candidates; report similarity, not a quality score. Treat hero-only crops separately (S35 hero similarity 11.2% vs 22.8% full page; Vendi 24.2 vs 12.0, so the measure depends on crop).
- Pairwise preference: model-judged, order-swapped, cross-family, with a length/density guard; accept it for coarse choices only (per-pair agreement with humans 57-70% [S13, S22, S23, S26]).
- Human: one designer-level pass on screenshots. Absolute rubric grades by an LLM are the weakest form (35% agreement vs one designer in S26).
Judge pitfalls to bake in: busier screen wins (83% vs 63% for people at >= 2.5x text) and it survives prompt rewording [S13]; own-lab favouritism (+10 points) [S26]; shared bias across labs, so an ensemble does not fix it [S13]; arena votes are single-glance and typical designs are liked more at first contact [S35 citing Landwehr], so arena rank is not an originality measure and top arena models are still convergent [S21: even the most original model is 0.12 below humans].

### 3.5 What UX (not only looks) fails, with sources

- Hierarchy and grouping: weak hierarchy, unrelated spacing, elements that belong together separated, inconsistent margins [S39]. 
- Wrong pattern from vague nouns ("profile") [S39].
- Contrast, labels, semantics: low-contrast text on 83.9% of pages web-wide [S46]; semantic gaps (non-semantic controls without keyboard/screen-reader support) [S44, S47]; accessible-looking but structurally same outputs even when accessibility was requested [S37].
- States and behaviour: functional principles rarely implemented (<= 6% for four of five tools) and 34% of functional rationales unimplemented [S36]; interactive requirements verified only by interaction [S23, S18].
- Flows and decisions: synthesised research beat raw comments by 8.4 pp; raw-comment designs omitted things users complained about (loyalty miles, cart items disappearing) [S42].
- Homogeneity of patterns itself harms specialised needs [S37, S38].
- Trust: 60% of shoppers say an AI-generated product image would lower confidence (survey) [S45].

### 3.6 Folk wisdom with no (or contradicting) evidence

| Claim | Status |
|---|---|
| "Tailwind's indigo-500 caused purple AI UI" | Plausible, source is a joke tweet [S9]; no measurement of cause. Colour is the least-converged axis in S36. Banning purple targets the symptom. |
| "Ban Inter / ban list of fonts and colours" | Anthropic's own skill moved from bans to describing clusters and "the brief always wins" [S11]; third-party blogs say banned fonts get replaced (Space Grotesk "edgy default") but I found no measurement (BLOG only). Use as a critique checklist item, not a hard ban. |
| "Add 'be creative/unique' to the prompt" | No UI measurement. S21 states no diversity prompting was attempted; its related-work summary says such prompt/temperature tweaks "often have limited effects" in text and code. S28 says raising temperature mixes aesthetic and syntax noise. Prefer explicit spec + selection. |
| "Act as a senior designer" persona | Used in S11; no measured effect found. |
| "More reasoning effort gives better design" | Contradicted for one-shot pages: 21% vs 15% error pages for max vs xhigh [S13]. |
| "LLM judge can score originality or taste" | Not validated anywhere; judges share a busy-screen bias [S13], own-lab bias [S26], and agree with humans 57-70% per pair [S13, S22, S23]. |
| "More detail in the prompt always improves it" | True for fidelity [S39], but NN/g's earlier tool test saw no improvement with more context for ideation variety [S40]; detail transfers decisions, so the detail must contain original decisions. |
| "AI improves designers' output (91%)" | Self-report in a vendor survey [S43]. |
| "AI-built sites cause worse accessibility" (WebAIM) | Correlation and a hedge ("likely reflect") [S46]. |
| Smashing's security/duplication/incident percentages | Unverified secondhand [S44]. |
| "Artificial Hivemind 0.8 similarity" as a UI number | Disputed magnitude [S2]; use S21 for UI. |
| "Diversity metric (Vendi/entropy) as an optimisation target makes agents escape slop" | Proposed in a blog [S48]; no validation; a diverse set can still be poor. |

### 3.7 Gaps in the evidence (say so in the skill's notes)

- No peer-reviewed measurement that any prompt/skill (including Anthropic's) reduces UI homogenisation or raises human-judged originality. Closest: S28 (coverage and variation up, preference neutral) and S13 (a model trained/steered to avoid tells ranks #1).
- Refinement loops are measured on fidelity/judge score, not on distinctiveness; a critic that rewards busier pages can push output toward the mean (S13 bias).
- Evidence for Verbalized Sampling is text-first; its UI use was only a mixed-result industry study [S28].
- Most UI-diversity numbers are from preprints and vendors [S21, S35, S13, S26]; the independent academic UI-originality literature is thin.
- Arena and judge numbers are time-bound (voter taste drifted within ten months [S13]; leaderboard leaders change monthly), so re-check before quoting.

---

## 4. Files and provenance

- Everything above comes from pages opened on 2026-11-25 via jina/tavily/exa. Not opened (blocked or snippet only): arena.ai WebDev leaderboard (Cloudflare), ACM pages for S47, Wenger & Kenett full text, Kolthoff full text, UICrit/UIClip full text, S38 full text, Landwehr papers (cited via S35).
- Working copies of fetched pages were kept in the session scratchpad only; nothing else was written to the project.
