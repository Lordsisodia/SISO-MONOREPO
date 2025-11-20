# Architecture Library

Structure-first documentation for the unified SISO monorepo.

## 📁 Tracks

| Track | Path | Purpose |
| --- | --- | --- |
| Monorepo Core | `docs/shared/architecture/monorepo/` | Repo-wide principles, shared packages, diagrams, ADRs. |
| Client-Base App | `docs/client/architecture/` | Architecture for the customer/client-facing surfaces. |
| Partners App | `docs/partners/architecture/` | Architecture for the revenue/partner portal. |
| Platform Concerns | `docs/shared/architecture/platform/` | Security, PWA, realtime, testing/observability standards. |
| Legacy References | `docs/shared/architecture/legacy/` | Historical docs, onboarding plans, and superseded scaffolding guides. |

> Product visions/roadmaps now live under `docs/product/` so this folder stays architecture-only.

## 🧭 How to contribute

1. Update the relevant track (`monorepo`, `client-base`, `partners`, or `platform`).
2. Add/refresh diagrams in the same folder as the narrative doc.
3. Record big decisions as ADRs (`monorepo/adr/`).
4. Move superseded documents into `legacy/` instead of deleting them outright.
