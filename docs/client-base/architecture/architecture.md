# Client App Architecture (`apps/client`)

React + Vite app that powers the public storefront, dashboards, and admin tooling. The code already lives in `apps/client/src` and follows a pragmatic module layout instead of the partner app’s feature-sliced structure.

## Directory layout (real as of Nov 2025)

| Path | Purpose | Notes |
| --- | --- | --- |
| `src/app/globals.css` | Global styles applied through Vite entry. | Imported from `src/main.tsx`. |
| `src/components/` | Primary UI surface area (landing sections, dashboards, chat blocks, admin panels). Subfolders map to product areas such as `dashboard/`, `plan/`, `client-app/`, `landing/`, `auth/`, `leaderboard/`, etc. | Components are mostly self-contained React function components with Tailwind classes; shared primitives live under `components/shared/` and `components/common/`. |
| `src/pages/` | Route-level containers for every surface (`Home`, `DashboardDemo`, `Admin/*`, `ClientDashboard`, `OnboardingChat`, etc.). | Each page composes components + services directly; routing handled in `src/App.tsx`. |
| `src/services/` | Business logic modules (`appPlanService.ts`, `appPlanAgent.ts`, `multiStagePromptSystem.ts`, `automation/AutomationEngine.ts`, `progressiveUnlock/ProgressiveUnlockEngine.ts`, etc.). | Most services orchestrate Supabase + AI workflows and are reused across admin and client pages. |
| `src/api/` | REST/Supabase helper functions (`partnership.ts`, `taskApi.ts`). | These talk to Supabase tables such as `partners`, `partner_applications`, `client_leads`, etc. |
| `src/integrations/supabase/` | Typed Supabase client (`client.ts`, `types.ts`). | Generated types already cover tables like `agency_metrics`, `partner_applications`, `partners`, etc. |
| `src/hooks/` | Custom hooks for UI state and data fetching (`useAiArticleSummary`, `useAddPortfolioProjects`, `hooks/client/*`). |
| `src/domain/portfolio/` | Domain-specific helpers for the portfolio feature (content generation, section config). |
| `src/models/` | TypeScript models (e.g., `models/plan`). |
| `src/utils/` | Helpers for formatting, AI prompts, and financial calculations (`utils/financial/*`). |

## Data & integrations

- **Supabase:** `src/integrations/supabase/client.ts` initializes the shared project used for both partnership tables and internal dashboards. Typed models live in `src/types/` and `src/types/partnership.ts` mirrors the schema defined in Supabase.
- **Services:** `src/services/appPlanService.ts`, `multiStagePromptSystem.ts`, `workflowService.ts`, etc., call Supabase plus internal prompts to build plans and store them in tables such as `app_plans_partnership`.
- **Automation:** `src/services/automation/*` implements token tracking, rate limiting, and integration hooks for external agents (Claude, progressive unlock engine, etc.).

## Routing & composition

- `src/main.tsx` bootstraps the app and renders `App.tsx`.
- `src/App.tsx` maintains a large switch-style router referencing the files under `src/pages/`. Each page composes the appropriate components, services, and hooks.
- Admin groupings (`src/pages/admin/*`) expose dashboards for partnership oversight and reuse data from `src/api/partnership.ts`.

## Current gaps vs. target architecture

- Components are still grouped by feature folders but not full “feature slices”. Converting to the same pattern as `apps/partners` would require incrementally moving `components/**`, `pages/**`, and `services/**` into domain folders under a future `src/features/` tree.
- Shared packages don’t exist yet, so cross-app reuse still happens via copy/paste. When we introduce `packages/ui` or `packages/services`, this app should migrate its primitives there.
- No service worker/PWA scaffolding lives here today (unlike the partners app). Platform docs track the desired behavior.

Use this file as the authoritative snapshot of how the client app is structured right now; update it whenever the tree changes.
