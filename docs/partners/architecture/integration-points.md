# Partners Integration Points

## Shared packages / libs in use today

| Module | Location | Consumers |
| --- | --- | --- |
| Supabase client | `apps/partners/src/shared/lib/supabase/client.ts` | All features via barrel import `@shared/lib/supabase/client`. |
| Security helpers | `shared/lib/security/{sanitize,rateLimiter}.ts` | Chat rendering, form components, realtime mutations. |
| Offline queue | `shared/lib/pwa/offlineQueue.ts` | Leads, chat, and file uploads enqueue mutations when offline. |
| Platform detection | `shared/lib/pwa/platform.ts` | Notification manager + layout components for safe-area padding. |

When the repo grows shared workspaces, these files should migrate into `packages/services/*` or `packages/ui/*`; until then they behave like internal packages via alias paths (`@shared/...`).

## Supabase schema contract

Tables defined in `apps/partners/setup-database.sql`:

- `partners` – canonical profile/tier table.
- `partner_referrals` – lead pipeline.
- `partner_commissions` – payouts and overrides.
- `partner_training` – learning progress.
- `partner_resources` – asset usage tracking.

Every table is protected by RLS policies in `apps/partners/setup-rls-security.sql`. The client app talks to the same schema through `apps/client/src/api/partnership.ts`, so any schema change needs:

1. SQL update (run via Supabase or migration script).
2. Regenerated types in both apps (`supabase gen types … > src/integrations/supabase/types.ts`).
3. Documentation updates here.

## Cross-app touchpoints

| Interaction | Producer | Consumer | Transport |
| --- | --- | --- | --- |
| Lead + commission data | Client app writes to Supabase tables (`partner_referrals`, `partner_commissions`). | Partners dashboards read via Supabase queries inside `features/leads/api` and `features/commissions/api`. | Shared database. |
| Partner applications | Client app’s `submitPartnerApplication` inserts rows; partners app reviews them once admin tooling lands. | Shared database. |
| Tier progression logic | `features/tier-progression/model` reads aggregated stats; eventual goal is to back this with shared Supabase functions so client dashboards can show the same data. | Shared business rules (future package). |
| Notifications | Not yet centralized; plan is to expose a shared notification service under `packages/services/notifications` so both apps can publish events. |

## External integrations

- **Clerk:** used for auth inside partners (see `src/app/providers/ClerkSupabaseProvider.tsx`). Client app currently handles auth separately.
- **Stripe (planned):** placeholder hooks live in `features/commissions`; once wired, document API keys + webhooks here.
- **AI services:** `src/services/appPlanService.ts`, `multiStagePromptSystem.ts`, etc., mirror the client app’s services. Consolidate duplicates into shared packages when stable.

Keep this doc aligned with the code whenever a new table, provider, or integration shows up.
