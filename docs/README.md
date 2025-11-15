# SISO Monorepo Documentation

This directory collects the reference material we need while migrating SISO-CLIENT-BASE and SISO-PARTNERSHIPS into a single workspace. Content is grouped by what a team member is trying to do so information stays easy to discover.

## Directory Map

- `architecture/` – solution/technical architecture packages, including the evolving monorepo design and partner blueprints.
- `client/` – working notes that track open questions and decisions for the client portal.
- `features/` – product specs, PRDs, epics, UX and story bundles grouped by product area.
- `integrations/` – setup guides for auth, media, AI tools, Supabase instances, and MCP workflows.
- `operations/` – runbooks for deploys, releases, and day-to-day platform operations.
- `partners/` – working notes for the partnerships portal migration.
- `process/` – repeatable playbooks (PDR cookbook, BMad method) and supporting guides.
- `shared/` – repo-wide planning docs that apply to every team.
- `migration/` – one-off migration runbooks and status trackers.

## How To Use This Folder

1. Start with `shared/monorepo-architecture-plan.md` for the latest target structure.
2. Drop product requirements or UX work into the relevant `features/<team>/<area>/` folder.
3. Capture reusable playbooks or knowledge bases inside `process/` to keep the operating manuals together.
4. When adding new integration guides, follow the existing auth/media/mcp/database grouping or introduce a peer directory if needed.
5. Keep lightweight progress notes inside `client/` and `partners/` so we can see what’s “in flight” without hunting through specs.

If a document feels cross-cutting, link to it from the app-specific README instead of duplicating content.
