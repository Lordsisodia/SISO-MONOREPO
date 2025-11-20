# PDR Cookbook Overview & Project Plan

The PDR Cookbook is our autonomous framework for turning raw client input into a full Product Development Report (PDR) in hours, not weeks. This single primer replaces the legacy README + project plan so newcomers only have to read one document.

---

## 🧱 System Architecture

| Layer | Purpose |
| --- | --- |
| Standardized Steps | Canonical 10-step summaries + deep-dive instructions the agents follow end-to-end. |
| Templates & Schemas | Markdown/JSON/JS assets that keep every deliverable predictable for automation. |
| Documentation | Analysis packs, research, and delivery guides that explain *how* and *why* we execute each step. |
| Integrations | MCP tools (web search, Playwright, Supabase, etc.) orchestrated through Claude Code. |

Key characteristics:
- Clear inputs/outputs with success criteria per step  
- Parallel agent execution (research, planning, technical)  
- Version-based planning so we always know what “Day 1 vs Week 2” means  
- Automation hooks for validation, screenshots, PDFs, and testing

---

## 🗂️ Directory Map (Top Level)

```
docs/PDR-cookbook/
├── 00-overview/               # You are here
├── 01-methodology/            # MEGA processes, agent orchestration philosophy
├── 02-toolkit/                # Steps, templates, configs, automation starters
├── 03-insights/               # Time-boxed analyses + raw evidence
├── 04-delivery/               # Task packs, planning artifacts, execution guides
├── 05-partnership-program/    # Partner portal canon
├── 06-research-intelligence/  # Market + competitor research
├── 07-assets/                 # Final deliverables (PDR exports, visualization system)
└── 99-archive/                # Deprecated material for reference
```

---

## 🚀 How to Use the Cookbook

1. **Initialize the project skeleton**
   ```
   project-name/
   ├── client-input/
   ├── research/{market, competitors}
   ├── planning/{features, ui-ux, technical}
   ├── pdr/
   ├── implementation/
   └── testing/
   ```
2. **Follow the steps** in `02-toolkit/steps/` (10-step quick refs or 40-step deep dives).
3. **Leverage templates** from `02-toolkit/templates/` for every artifact (client briefs, feature compendiums, testing plans, etc.).
4. **Assemble the PDR** using the master template, pulling outputs from each step.

---

## 🧭 Core Steps for PDR Generation

| # | Step | Outcome |
| - | --- | --- |
| 1 | Client Information Collection | Structured brief of goals, audience, requirements |
| 2 | Market Research | Industry trends, TAM/SAM/SOM, seasonality |
| 3 | Competitor Identification | Direct / indirect / aspirational map |
| 4 | Competitor Analysis | Feature/UI inventory, messaging, screenshots |
| 5 | Feature Planning | Version roadmap (v1 → mature), MVP definition |
| 6 | UI/UX Planning | Page inventories, components, wires, color systems |
| 7 | Technical Architecture | Database schemas, APIs, stack choices, security |
| 8 | PDR Assembly | Compiled report with findings + recommendations |
| 9 | Testing Framework | Functional + UI test plans, QA automation hooks |
| 10 | Implementation Planning | Build plan, sequencing, review checkpoints |

These map 1:1 to the canonical 10-step files and expand in the MEGA compendium for 40+/55+/70+ task orchestration when needed.

---

## 🕘 Phase-Based Project Plan

### Phase 1 – Initial Client Analysis
- Gather business context, goals, KPIs, audiences
- Structure data for AI consumption (JSON/YAML schemas)
- Launch market research to capture current stats and trends

### Phase 2 – Competitive Intelligence
- Identify and categorize competitors
- Use headless browsers (Playwright/MCP) for screenshots + DOM inspection
- Document differentiators, pricing, messaging, UX notes

### Phase 3 – Planning & Architecture
- Feature planning (MVP + future releases)
- UI/UX planning (pages, components, design language)
- Technical architecture (database, APIs, auth, integrations)

### Phase 4 – Documentation & Testing
- Assemble the standardized PDR
- Define testing frameworks (unit, integration, E2E, visual)
- Produce implementation plans and human review checkpoints

Each phase has explicit success criteria: required files, validation scripts, and reviewers (human or AI).

---

## 🤖 Agent Coordination

- **Research Agents** — market sizing, competitor mining, sentiment analysis  
- **UI/UX Agents** — page outlines, component inventories, color systems  
- **Technical Agents** — schema design, API planning, security reviews  
- **Documentation Agents** — compile reports, generate summaries, cross-link evidence  
- **Testing Agents** — craft test suites, track coverage, enforce quality gates

Parallelization rules:
1. Research agents work concurrently once client input is validated.  
2. Planning agents consume research outputs and run in parallel (features, IA, content).  
3. Technical agents execute after planning gates pass, feeding implementation teams.  
4. Documentation/testing agents run continuously, updating the PDR as inputs land.

---

## 🔁 Data Flow & Implementation Notes

1. **Client Input** → structured store (`client-input/` + JSON schemas).  
2. **Research Outputs** → normalized tables (market stats, competitor matrices).  
3. **Planning Modules** → features, IA, UI, color/token libraries.  
4. **Technical Specs** → DB schemas, API contracts, infrastructure notes.  
5. **PDR Assembly** → single source of truth for stakeholders.  
6. **Testing Framework** → test plans + automation harness.  
7. **Feedback Loop** → human review checkpoints before each phase close.

Implementation guidelines:
- Every step declares input/output paths and validation scripts.  
- Templates are referenced via relative paths so AI agents can `read_file` and fill them.  
- Human review is required after competitor analysis, feature planning, and before final delivery.  
- PDFs/exports live in `07-assets/` for downstream sharing.

---

## 📝 Contributing

1. Follow existing formatting + naming conventions.  
2. When adding or adjusting steps, update both the quick-reference (`02-toolkit/steps/canonical-10-step/`) and deep-dive documentation.  
3. Place any new template or config into `02-toolkit/templates/` and document it in the folder README.  
4. Keep this overview updated if the directory map or process changes.  
5. Use `99-archive/` for deprecated material so history isn’t lost.
