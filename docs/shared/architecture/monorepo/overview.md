# Monorepo Architecture Track

This track answers questions about the repo-wide rules that both `apps/client` and `apps/partners` need to follow.

## Files in this track

- `structure-and-packages.md` – the detailed blueprint that currently mirrors the real tree under `apps/` and `packages/`.
- `diagrams.md` – the Mermaid views for repo layout, domain wiring, and deployment.
- `adr/` – append-only Architecture Decision Records (drop a new markdown file per decision).

## Snapshot of the real repo (Nov 2025)

```
SISO-MONOREPO/
├── apps/
│   ├── client/        # storefront + client experience (React + Vite)
│   └── partners/      # partner portal feature-sliced React app
├── docs/
│   └── architecture/  # this folder
├── packages/          # reserved for shared UI/services (empty today)
├── scripts/, components.json, turbo config, etc.
```

Tooling is wired up via `pnpm`, `turbo`, and shared configs in the repo root. Even though `packages/` is still empty, the lint config and import paths already assume future workspaces, so any new shared code should land there instead of under `apps/`.

## Guardrails to keep in mind

- **Single repo** – ship both apps from one codebase; use lint rules + workspace boundaries to prevent accidental cross-imports (`apps/partners` must not reach into `apps/client`).
- **Shared packages only via `packages/*`** – when we actually add `ui`, `services`, or `domain-model` packages, treat them as the sole integration surface between apps.
- **Docs stay co-located** – whenever you evolve `structure-and-packages.md`, update the diagrams and drop an ADR so future contributors (or AI agents) know why a change was made.
