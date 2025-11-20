# BMAD – Partners Track

This folder anchors all partner-facing documentation for the BMAD Method so engineers don’t have to dig through `.bmad/` internals.

## Where the source of truth lives
- Core install + workflows: `.bmad/` (shared across the repo).
- Workflow tracker: `docs/partners/bmm-workflow-status.yaml` (currently seeded for Level 4 brownfield BMad Method).
- Sprint outputs: `docs/partners/sprint-artifacts/` (BMAD agents write sprint plans + status files here).

## Partner portal defaults
| Artifact | Path | Notes |
| --- | --- | --- |
| Workflow status | `docs/partners/bmm-workflow-status.yaml` | Run `*workflow-init` via the Analyst to regenerate when scope changes. |
| Sprint status | `docs/partners/sprint-artifacts/sprint-status.yaml` | Created by the Scrum Master workflow during Phase 4. |
| Baselines | `docs/partners/perf/baselines/` | Performance reports referenced by perf workflows. |

## How to run partner workflows
1. Open `./.bmad/bmm/agents/analyst.md` (or PM/Architect/etc.).
2. Follow the activation steps, then trigger a workflow (e.g., `*workflow-status`).
3. Save deliverables under `docs/partners/...` while BMAD updates the tracker + sprint artifacts automatically.

Add new playbooks or workflow notes in this folder so everything partner-specific stays together.
