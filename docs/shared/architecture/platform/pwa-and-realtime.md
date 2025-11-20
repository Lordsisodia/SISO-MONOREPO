# PWA & Realtime Architecture

## Current implementation

| Concern | Source | Status |
| --- | --- | --- |
| Offline queue | `apps/partners/src/shared/lib/pwa/offlineQueue.ts` | Dexie-backed queue for actions + file uploads. Wired into leads/chat mutations but still needs UI affordances for retry states. |
| Platform detection | `apps/partners/src/shared/lib/pwa/platform.ts` | Handles iOS/Android/PWA flags, capability checks, safe-area detection. Used by notification manager + layout components. |
| Realtime provider | `apps/partners/src/app/providers/RealtimeProvider.tsx` | Wraps Supabase Realtime, handles reconnection, connection quality, BroadcastChannel fan-out (planned). |
| Service worker | **Not yet generated** – Workbox strategy described in archive docs but no `public/sw.js` exists. |

## Target behavior

1. **Service worker + cache strategy**
   - Generate Workbox SW for both apps (start with partners) that:
     - Precaches app shell (`index.html`, `assets/*`).
     - Uses network-first with 3s timeout for `/api/**` routes.
     - Registers a BackgroundSync queue for POST/PUT/DELETE that piggybacks on `offlineQueue`.
   - Store SW source alongside the app (e.g., `apps/partners/public/sw.js`).

2. **Update flow**
   - Add an update manager (see archive `COMPLETE-IMPLEMENTATION-GUIDE.md`) that listens for `waiting` service worker and prompts users to refresh.

3. **Realtime + conflict resolution**
   - Extend `RealtimeProvider` to: fetch missed messages after reconnect, manage Supabase connection pooling (monitor `/realtime/v1` connection counts), and expose conflict-resolution helpers to features (`features/leads/model/conflictResolver.ts`, etc.).

4. **Cross-tab sync**
   - Broadcast cache updates via `BroadcastChannel` so multiple tabs stay in sync (planned utility can live under `shared/lib/pwa/crossTabSync.ts`).

Keep this file updated as soon as the service worker lands or additional realtime utilities are created.
