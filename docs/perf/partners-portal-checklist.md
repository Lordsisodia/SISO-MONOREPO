# Partner Portal Performance Checklist

Use this as the living tracker for driving partner surfaces to <0.5 s TTI. Each item is a concrete, checkable task that maps back to the plan in `partners-portal-perf.md`.

## Phase 0 – Instrumentation & Baseline
- [x] Add `src/app/partners/PartnerPerfMetrics.tsx` that logs `performance.now()` for `DOMContentLoaded`, hydration end, and first-interaction.
- [x] Integrate `web-vitals` to capture LCP / INP / CLS; send results to console for now (pipe to analytics later).
- [x] Script baseline capture via `npm run perf:baseline` (spins up dev, runs `scripts/perf/capture-partner-traces.mjs`, copies artifacts) — Nov 19 2025.
- [x] Save baseline bundle + trace artifacts under `docs/perf/baselines/2025-11-19/` (trace-*.json + README).

## Phase 1 – Server Shell & Streaming Nav
- [x] Convert `src/app/partners/layout.tsx` to a server component that renders route children and streams the lazy nav shell.
- [x] Wrap `CommunityPageShell` (nav drawer, floating FAB, etc.) with `next/dynamic({ ssr: false, loading: SkeletonNav })` (Lazy shell component created & partner routes migrated).
- [x] Ensure every dynamic slice (nav drawer, hub widgets, pipeline wizard) sits inside a `<Suspense>` boundary with usable fallbacks (CampusDrawer + Lazy HubWidgets + Submit Client wizard).
- [x] Gate `components/ui/wave-background` behind `prefers-reduced-motion`; default to CSS gradient elsewhere.
- [x] Verify `npm run build` succeeds (includes fixing the missing `ArrowLeft` import) and capture new analyzer stats (`ANALYZE=true npm run build`, Nov 19 2025 — re-ran after pipeline hydrators + portfolio static params, build clean).

## Phase 2 – Data Streaming & JSON Feeds
- [x] Move `src/domains/partnerships/portfolio/data/clients/*.ts` into JSON under `public/data/portfolio-clients/` (summaries + per-client detail JSON, Nov 19 2025).
- [x] Update `/partners/academy/portfolio` to fetch client summaries via `cache(fetch)` on the server and lazy-load detail modules per card (server page passes JSON summaries to client UI).
- [x] Extract `wizardPrompts`, `savedDraftThreads`, etc. into `pipeline-ops-config.json`, fetched via cached `fetch` (submit-client route streams `public/data/pipeline-ops-config.json`).
- [x] Guard heavy data consumers with `Suspense` so shells stream immediately (portfolio index + submit-client wizard streamed under fallback skeletons).

## Phase 3 – Client Boundary Trimming
- [x] Audit `/partners/**` for unnecessary `"use client"` directives; convert static sections back to server components (Nov 19 2025: Academy layout + My Progress + Certificates + Tiers & Perks + Pitch Kit detail + Workspace Files hub + Pipeline Prospects grid/cards now server-driven; Nov 20 2025: mobile loading skeletons for checklist/inbox/learning/messages/settings/wallet plus community messages loading converted to server components; Tasks workspace screen, Active Deals wrapper, Client Notes shell, Prospect Detail shell, Workspace calendar shell, Earnings wallet shell, Earnings overview shell, and Earnings tier progression shell now server-rendered).
- [x] Split interactive widgets (`ComposerBar`, `ChatViewport`, Hub widgets) into `dynamic()` imports hydrated on visibility or interaction (Nov 19 2025: Tiers & Perks carousel extracted to `TierCarousel.client.tsx`; pitch kit copy CTA isolated to `CopyShareButton.client.tsx`; General Chat + mobile Messages composers + Prospect detail / Active Deals / Client Notes workspaces now lazy/dynamic via `useHydrateOnView`; Nov 20 2025: Workspace demo block hydrates via `WorkspaceDemoHydrator.client.tsx`; Directory overlay in community Messages now loads via `DirectoryOverlayHydrator.client.tsx`; Workspace calendar screen now hydrates via `CalendarWorkspaceHydrator.client.tsx`; Account notifications panel now hydrates via `AccountNotificationsHydrator.client.tsx`).
- [x] Implement Adaptive Hydration heuristics: hydrate `CampusDrawer` only when the FAB is tapped, hydrate chat/composer on focus, hydrate notifications when intersecting (documented guidelines + CI lint, Nov 20 2025).  
  - [x] Gate `CampusDrawer` and mobile nav shell via `CampusDrawerHydrator` (MobileShell + Community screens).
  - [x] Gate chat composers (`ComposerBar`, `ChatViewport`) on user focus/scroll inside Submit Client wizard + general chat (Submit Client composer now hydrates via `useHydrateOnView` + CTA placeholder; General Chat already gated).
  - [x] Gate account notifications and wallets with `useHydrateOnView` hydrators.
  - [x] Gate analytics overlays / partner alerts so they hydrate only when intersecting (wallet analytics + security cards now hydrate via FinancialAnalyticsHydrator + PartnerAlertsHydrator).

## Phase 4 – Regression Guard & polish
 - [x] Wire `@next/bundle-analyzer` + custom script into CI; fail builds when any `/partners` route exceeds the 120 KB parsed budget (GitHub Actions workflow `.github/workflows/partner-portal-perf.yml`).
- [x] Add `loading.tsx` skeletons for `/partners/academy`, `/partners/recruitment`, `/partners/pipeline-ops` (Nov 19 2025).
 - [x] Run Lighthouse CI (desktop + mobile) and record scores + filmstrips (Nov 20 2025 baseline in `docs/perf/baselines/2025-11-20-phase1/lighthouse/`).
- [x] Compare new Chrome trace / analyzer outputs against the Phase 0 baseline and store under `docs/perf/baselines/<date>/` (see comparison table in `docs/perf/baselines/2025-11-20-phase1/README.md`).

## Industry Research Actionables (Ongoing)
- [x] **Suspense enforcement:** audit nav shells + hydrators to ensure every `dynamic()` consumer sits beneath `<Suspense>` (Nov 20 2025; see Suspense audit section in partners-portal-perf.md).
- [x] **Adaptive hydration backlog:** document lazy-hydration rules + guardrails (see “Adaptive Hydration Heuristics” in partners-portal-perf.md) and enforce via `npm run perf:hydration` CI step.
- [x] **CWV budgets:** add Lighthouse CI + `web-vitals` telemetry thresholds (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1) and fail PRs that regress (CI now runs `npm run perf:lighthouse-budgets -- lighthouse` on every push).
- [x] **Resource priority hygiene:** audit every hero image/video; apply `fetchpriority="high"` + `decoding="async"` to the single LCP media, downgrade others to `low` (portfolio heroes + industry pages updated Nov 20 2025).
- [x] **Third-party script audit:** inventory analytics/marketing scripts on partner routes, remove or defer anything outside the budget, and add lint checks to guard against regressions (audited Nov 19 2025; see `docs/perf/partners-portal-perf.md`).
- [ ] **PPR pilot:** once the above items land, enable Partial Prerendering on `/partners/academy` and confirm shell render time <100 ms in traces.
- [x] **RSC ROI tracking:** after each phase, log bundle sizes, Lighthouse scores, and TTI deltas so we mirror public RSC case-study reporting (Phase 1 metrics captured in docs/perf/partners-portal-perf.md).
