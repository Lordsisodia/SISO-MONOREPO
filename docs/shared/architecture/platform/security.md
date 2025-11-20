# Security Architecture

## Supabase policies

- DDL + seed data live in `apps/partners/setup-database.sql`.
- RLS lives in `apps/partners/setup-rls-security.sql` (tables: `partners`, `partner_referrals`, `partner_commissions`, `partner_training`, `partner_resources`).
- Any schema change requires regenerating types in both apps (`apps/partners/src/shared/lib/supabase/types.ts` and `apps/client/src/integrations/supabase/types.ts`).

## Client-side controls

| Control | Location | Notes |
| --- | --- | --- |
| XSS sanitization | `apps/partners/src/shared/lib/security/sanitize.ts` | Wraps DOMPurify + marked; used by chat, resources, etc. Duplicate helper exists for the client app under `apps/client/src/utils/typeHelpers.ts`. |
| Rate limiting | `apps/partners/src/shared/lib/security/rateLimiter.ts` | Token-bucket limiter + `useRateLimit` hook; apply before sending chat messages, lead mutations, uploads. |
| Auth providers | `apps/partners/src/app/providers/ClerkSupabaseProvider.tsx`, `apps/client/src/components/auth/*` | Ensure tokens flow through Clerk → Supabase, and add future provider notes here. |
| Sentry | `apps/partners/src/app/providers/ErrorMonitoring.tsx` | Applies router instrumentation, replay, and PII scrubbing. Client app uses a lighter-weight console logger today; migrate to the same provider later. |

## Browser policies

- CSP is defined in each app’s `index.html` (see `apps/partners/index.html` and `apps/client/index.html`). Update both if domains change.
- Sensitive storage (tokens, partner profile) should live in secure cookies or encrypted storage; currently partner IDs/tier info is stored in `localStorage` (see TODO in `ErrorMonitoring.tsx`).

## Action items

1. Mirror the sanitization + rate-limiter utilities into `packages/security/*` once workspaces exist.
2. Add automated checks that `setup-rls-security.sql` has been applied to Supabase environments before deploys.
3. Replace localStorage usage for partner context with Clerk session claims once available.
