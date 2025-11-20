# Testing & Observability Standards

## Current baseline

| Layer | Status | Notes |
| --- | --- | --- |
| Unit tests | ⚠️ Minimal | Neither app ships Vitest suites yet. Add `vitest.config.ts` per app and cover services (e.g., `apps/client/src/services/*`, `apps/partners/src/features/*/model`). |
| Integration/UI tests | ⚠️ Planned | No Playwright suites live in the repo. Add them under `apps/*/tests/e2e` once routes stabilize. |
| Lint/type checks | ✅ Active | Both apps have `tsconfig*.json` + ESLint configs wired via `pnpm lint`/`pnpm typecheck`. |

## Observability hooks in code

- **Sentry:** configured for the partners app in `src/app/providers/ErrorMonitoring.tsx`. Hook the client app into the same provider once environment variables are available.
- **Supabase logging:** leverage `supabase-js` client logs for realtime diagnostics (enable debug mode during development).
- **Toast/error surfaces:** `apps/partners/src/shared/hooks/use-toast.ts` and similar hooks in the client app show immediate failures to end users but are not persisted anywhere yet.

## Expectations going forward

1. Add Vitest + testing-library suites for reusable logic:
   - AI/plan services (`apps/client/src/services`).
   - Offline queue + rate limiter (`apps/partners/src/shared/lib`).
   - Feature-specific selectors/stores (`features/leads/model`, etc.).
2. Add Playwright smoke tests per app (auth, dashboard, lead CRUD, chat).
3. Pipe Web Vitals + custom metrics into Sentry or a dedicated APM by reusing the hooks inside `apps/partners/src/app/providers/ErrorMonitoring.tsx`.
4. Document runbooks/dashboards in this file once monitoring is live (e.g., links to Sentry project, Supabase logs, Vercel analytics).
