# Partners App Architecture (`apps/partners`)

Feature-sliced React + Vite app that already implements the blueprint described in the archived docs. This file captures the **actual structure in `apps/partners/src`** so future work (or AI agents) can rely on concrete paths.

## Directory layout

| Path | Purpose | Notes |
| --- | --- | --- |
| `src/app/providers/` | Runtime scaffolding: `QueryProvider.tsx` (TanStack Query defaults), `RealtimeProvider.tsx` (Supabase channel manager), `ErrorMonitoring.tsx` (Sentry init), `ClerkSupabaseProvider.tsx`. |
| `src/features/*/{ui,model,api}` | Vertical slices for dashboard, leads, chat, training, resources, team-management, tier-progression, commissions, auth. Each slice exports UI + hooks via its index. |
| `src/entities/*/{ui,model,api}` | Shared business entities (`partner`, `lead`, `message`, `commission`, `achievement`) consumed by multiple features. |
| `src/shared/ui` | Reusable UI primitives (buttons, sheets, navigation), wrapping Radix/shadcn components. |
| `src/shared/lib` | Platform utilities: `supabase/client.ts`, `pwa/offlineQueue.ts`, `pwa/platform.ts`, `security/sanitize.ts`, `security/rateLimiter.ts`, `api/queryClient.ts`, etc. |
| `src/shared/hooks` | Hooks like `use-toast`, `useReducedMotion`, etc. |
| `src/app/router` | Route declarations once the feature routes are ready (see `START-HERE.md`). |

## Providers & runtime services

- **Query caching:** `src/app/providers/QueryProvider.tsx` configures TanStack Query (5‑minute stale time, retry strategy) and includes Devtools.
- **Realtime:** `src/app/providers/RealtimeProvider.tsx` wraps Supabase Realtime, exposes `subscribe/unsubscribe`, tracks connection quality, and listens to the browser’s `navigator.connection` API.
- **Error monitoring:** `src/app/providers/ErrorMonitoring.tsx` initializes Sentry with router instrumentation, replay, and PII scrubbing. Uses helper functions to hash partner IDs before sending.
- **Auth + Supabase:** `src/app/providers/ClerkSupabaseProvider.tsx` syncs Clerk sessions with Supabase, so every feature can assume the client is authenticated.

## State, data, and offline flow

| Concern | Implementation | Source |
| --- | --- | --- |
| Server state | TanStack Query + `shared/lib/api/queryClient.ts`. Queries live per feature (e.g., `features/leads/api/useLeads.ts`). |
| Client state | Zustand stores sitting inside each feature’s `model/` folder (for UI view modes, filters, etc.). |
| Supabase client | `shared/lib/supabase/client.ts` exports the typed client used app-wide. Types live in `shared/lib/supabase/types.ts`. |
| Offline queue | `shared/lib/pwa/offlineQueue.ts` (Dexie-backed action + file queues). Exposed as a singleton and auto-processed on `online` events. |
| Platform detection | `shared/lib/pwa/platform.ts` handles iOS/Android/PWA checks, storage quotas, and safe-area detection. |
| Rate limiting | `shared/lib/security/rateLimiter.ts` implements the token-bucket guard plus the `useRateLimit` hook. |

## Security + data layer

- Supabase schema and RLS policies live in `apps/partners/setup-database.sql` and `setup-rls-security.sql`. Tables: `partners`, `partner_referrals`, `partner_commissions`, `partner_training`, `partner_resources` (plus sample data).
- Input sanitization sits in `shared/lib/security/sanitize.ts` and is consumed anywhere we render Markdown (`features/chat`, `features/resources`, etc.).
- Rate limiting, CSP, and monitoring are documented in `docs/architecture/platform/security.md` with direct references to these source files.

## Feature highlights

- **Leads:** `features/leads/` renders Kanban/swipe lanes, uses offline queue for stage moves, and syncs with Supabase `partner_referrals`.
- **Chat:** `features/chat/` composes Discord-style channels, uses `RealtimeProvider` for subscriptions, `rateLimiter` for send frequency, and Markdown sanitization.
- **Dashboard/Tier progression:** `features/dashboard/` and `features/tier-progression/` query Supabase stats and use Zustand stores to drive progress rings.
- **Training/Resources:** `features/training/` and `features/resources/` pull modules + assets, track completion via `partner_training` and `partner_resources` tables.

## Gaps tracked elsewhere

The service worker, reconnection fallbacks, and mobile-safe components are partially implemented (offline queue and platform detection exist, but the Workbox SW has not been generated yet). Delivery sequencing + open risks now live in `docs/partners/notes/progressive-unlock-plan.md`.
