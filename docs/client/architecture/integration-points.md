# Client App Integration Points

## Supabase tables used today

| Table | Source file(s) | Purpose |
| --- | --- | --- |
| `partner_applications`, `partners`, `client_leads`, `commissions`, `app_plans_partnership` | `src/api/partnership.ts`, `src/types/partnership.ts` | Partnership program CRUD, status checks, commission dashboards visible inside the client app. |
| `agency_metrics`, `agency_pain_points`, etc. | `src/integrations/supabase/types.ts` + various services under `src/services/` | Fuel landing dashboards, AI plan generation, and resources. |

## Shared services & packages

- Supabase client is defined locally (`src/integrations/supabase/client.ts`). When we introduce a shared `@siso/services/supabase-client`, this file should re-export from that package.
- AI + automation logic currently lives only in the client app (`src/services/*`). Pieces like `AutomationEngine` or `ProgressiveUnlockEngine` are candidates for promotion to a shared package once partners needs them too.
- UI primitives live under `src/components/common/` and `src/components/shared/`. A future `packages/ui` should absorb reusable primitives so the partners app can import them legitimately.

## Contracts with the partners app

| Contract | Producer | Consumer | Notes |
| --- | --- | --- | --- |
| Partnership stats APIs | Client app (`src/api/partnership.ts`) | Partners app dashboards (future) | Once the partners app consumes realtime stats, expose these APIs through a shared package or HTTP endpoint instead of direct Supabase calls. |
| Lead events | Client app (pages under `src/pages/projects` and services under `src/services/appPlanService.ts`) | Partners analytics | Leads are currently written straight to Supabase tables; partners reads from the same tables. Document any schema changes in `apps/partners/setup-database.sql`. |
| Shared Supabase schema | Defined in Supabase, referenced by both apps | Both | Schema migrations live under `apps/partners/setup-database.sql`; when the client app needs changes, update the SQL and regenerate types in both apps. |

## Next steps

1. Introduce a lightweight adapter (REST or RPC) so the partners app does not depend on the client app’s internal services when reading partnership data.
2. Move reusable automation/plan-generation pieces into `packages/services/*` once the workspace exists.
3. Keep this document updated whenever new shared tables or APIs are introduced.
