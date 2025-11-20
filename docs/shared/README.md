# Shared Knowledge Base

Use this area for artifacts that apply to both portals. Everything is organized by what kind of context it offers:

| Folder | Purpose | Highlights |
| --- | --- | --- |
| `architecture/` | Monorepo + platform-level design. | `monorepo/` (current blueprint), `platform/` (security, testing, realtime), `legacy/` (historical scaffolding + quick-start guides). |
| `operations/` | How we run the shared platform day to day. | `infrastructure/` (reserved for onboarding/deploy docs), `migration/` (guides + decision log for the app→domain move), `integrations/` (index that points to portal-specific setup guides). |
| `process/` | Shared delivery playbooks. | `bmad/` (core principles + IDE flow), `pdr/` with `cookbook/` (00–07 sections) and `workbench/` (templates, tasks, planning docs). |
| `research/` | Insights and reusable patterns that benefit every team. | `patterns/` currently holds the cross-portal UX references; add `insights/` or `assets/` as we publish more shared studies. |

When you add a new document, pick the folder that answers **what kind of context** it provides (platform design, operations, methodology, or research). Portal-specific materials should stay in `docs/client/` or `docs/partners/` and simply link back here if they rely on shared guidance.
