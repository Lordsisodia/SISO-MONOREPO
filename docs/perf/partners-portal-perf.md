# Partner Portal Page Load Diagnosis (Nov 19, 2025)

## Context
- Local dev experience for the `partners` surfaces (Academy, Recruitment, Pipeline Ops) takes ~10 s before the UI becomes interactive.
- Next.js 15.5.6 app (`/src/app/partners/*`) runs entirely on the partner monorepo; most routes wrap their content in `PartnersPageShell`, the immersive shell defined in `src/domains/partnerships/community/ui/CommunityPageShell.tsx:1`.
- We captured bundle data by running `ANALYZE=true npm run build` (see `.next/analyze/client.html`). The build aborts later because `/partners/academy/courses` is missing an `ArrowLeft` import, but the analyzer still recorded client bundle sizes.

## Key Findings

### 1. Shared nav shell ships a 58 KB payload before any page UI renders
- `PartnersPageShell` is a client component and immediately pulls in `CampusSidebarContent` (`src/domains/partnerships/shared/ui/mobile/campus-sidebar/CampusSidebar.tsx`), `MobileNavigationProvider`, and the animated `Waves` background (`components/ui/wave-background.tsx`).
- The analyzer shows that the `campus-sidebar` bundle alone weighs **≈57.8 KB parsed / 15.3 KB gzip** and `sidebarContent.tsx` (the hard-coded menu data) contributes **≈25.3 KB parsed**.
- Because the shell is marked `"use client"` and rendered at the top of every partner route, Next cannot stream server HTML. Even lightweight pages such as `src/app/partners/recruitment/page.tsx` (~6.4 KB parsed for its own UI) must ship the entire nav + animation bundle before they can paint.
- `components/ui/wave-background.tsx` allocates ~24 k points and 160+ SVG paths inside `useEffect`, so every page pays several hundred milliseconds of synchronous work even after the JS downloads.

**Resolution options**
1. Convert `src/app/partners/layout.tsx` into a server layout that renders page sections immediately and lazy-loads the immersive nav via `dynamic(() => import(...), { ssr: false })` only after hydration.
2. Move the static sidebar schema (`sidebarContent.tsx`, `partner-nav-config.json`, settings registry) into JSON files that are fetched on demand, or load them through `React.lazy` so simple routes do not pay for unused menu content.
3. Only mount `Waves` on landing pages; use a CSS gradient or a compressed video background elsewhere and gate the animation behind `prefers-reduced-motion`.
4. Add route-level `loading.tsx` files so users see skeletons while the client chunk hydrates.

### 2. Academy portfolio bundles the entire sample client catalog
- `src/app/partners/academy/portfolio/page.tsx` imports `allClients` from `src/domains/partnerships/portfolio/data/clients/index.ts`, which in turn statically pulls 18 richly described client objects (`test-client.ts`, `creative-hub-agency.ts`, etc.).
- Analyzer data: the `portfolio/data/clients` module accounts for **≈31.9 KB parsed / 8.6 KB gzip**, and individual client files range from 0.9 KB to 5.0 KB parsed each. The full `app/partners/academy/portfolio` chunk lands at **≈50 KB parsed**, contributing substantially to the ~437 KB total parsed JS we measured for the Academy routes.

**Resolution options**
1. Keep only a summary list (e.g., names + hero stats) in the initial bundle and lazy-load full case-study details when a user opens a card (`await import('./clients/${slug}.ts')`).
2. Alternatively, move the data into a Supabase table / JSON endpoint and fetch it via `async function generateStaticParams()` or `React.cache()` so the browser downloads data, not code.
3. Trim demo content so local development is lighter (e.g., seed 4 clients instead of 18) and gate the rest behind feature flags.

### 3. Pipeline Ops flows stay client-only and embed wizard configuration inline
- `src/app/partners/pipeline-ops/page.tsx`, `.../submit-client/page.tsx`, and the other pipeline surfaces start with `"use client"` and host large inline arrays such as `wizardPrompts`, `savedDraftThreads`, and `outgoingRequests`. The analyzer shows `submit-client/page.tsx` itself is **≈19 KB parsed / 6.4 KB gzip**, before counting the shared shell.
- Every navigation to a pipeline screen re-executes the wizard config, initializes `DirectoryOverlay`, `ComposerBar`, and `ChatViewport`, and sets up the same `MobileNavigationProvider`. Combined with the nav baseline, first-load JS for `/partners/pipeline-ops/*` exceeds **≈226 KB parsed**.

**Resolution options**
1. Extract the wizard and chat datasets into JSON (or even `structuredClone`-safe constants) that are fetched via `use`/`cache` so React can stream server HTML while the config loads lazily.
2. Break the wizard UI into smaller client components that are imported with `next/dynamic` and only hydrate when needed (e.g., render the `ComposerBar` once the user focuses the editor).
3. Evaluate which pipeline routes can be converted back to server components; any static hero sections (the `HighlightCard` rows, callouts, etc.) can render on the server and pass minimal props to client subcomponents.

### 4. Ancillary issues caught during the build
- The analyzer run surfaced a runtime error (`ReferenceError: ArrowLeft is not defined`) in `src/app/partners/academy/courses/page.tsx`. That is blocking successful `next build` and should be patched alongside the performance work so production builds can complete.

## Next Steps
1. **Shell split** – Prototype a server-driven `partners` layout that renders essential hero content immediately and dynamically loads the immersive nav only on devices ≥ lg breakpoint.
2. **Data streaming** – Move portfolio clients and pipeline wizard config into lightweight JSON sources and fetch them through `cache(fetch)` + `Suspense`, reducing the client bundle by ~40 KB per feature.
3. **Animation guard** – Replace the full `Waves` animation with a CSS gradient by default; keep the animation as an opt-in hero effect.
4. **Bundle budgets** – Add `next.config.js` `experimental.optimizePackageImports` and include `@next/bundle-analyzer` in CI to fail builds when a partner route exceeds an agreed first-load JS budget (e.g., 120 KB parsed).
5. **Fix build blockers** – Import the missing `ArrowLeft` icon on `/partners/academy/courses` so `npm run build` completes and future analyzer runs can include RSC stats.

## Sub-0.5 s Loading Plan

**Target envelope**
- Cold load (no cache) for `/partners/academy`, `/partners/recruitment`, `/partners/pipeline-ops` ≤ **500 ms TTI** on M2 MBP dev env; stretch goal 250 ms when assets cached.
- First payload ≤ **120 KB parsed JS** per route (excludes shared Next runtime).

**Phase 0 – Instrument (0.5 day)**
1. Add `app/partners/metrics.ts` instrumentation to log `performance.now()` deltas for `DOMContentLoaded`, hydration finish, and the first click.
2. Script `npm run dev --turbo` with `chromium --trace-startup` to capture a baseline waterfall before changes; store CSV in `docs/perf/baselines/2025-11-19.csv`.

**Phase 1 – Shell refactor (1.5 days)**
1. Convert `src/app/partners/layout.tsx` into a server component that renders route children directly.
2. Wrap `CommunityPageShell` in `next/dynamic({ ssr: false, loading: () => <SkeletonNav /> })` so the immersive nav hydrates after the route content is interactive.
3. Gate `Waves` with `prefers-reduced-motion` and only mount it on `/partners` root + `/partners/academy` hero; fallback to a CSS gradient elsewhere.

**Phase 2 – Data streaming (1 day)**
1. Move `portfolio/data/clients/*.ts` into JSON under `public/data/portfolio-clients/*.json`; fetch them in `generateStaticParams` and lazy-load per-card details via `dynamic import`.
2. Extract `wizardPrompts`, `savedDraftThreads`, etc. into `pipeline-ops-config.json`; load via `const config = cache(fetch(...)).then(res => res.json())` so JS bundles only ship the UI.

**Phase 3 – Client boundary trimming (1 day)**
1. Audit `/partners/*` routes with `next dev --profiling` to identify `"use client"` files; convert static sections (hero cards, stats grids) to server components passing serialized props.
2. Introduce `dynamic()` boundaries for heavy widgets (`ComposerBar`, `ChatViewport`, `HubWidgets`) so they hydrate on visibility or user interaction.

**Phase 4 – Regression guard + polish (0.5 day)**
1. Enable `@next/bundle-analyzer` automatically in CI and fail builds if any partner route exceeds 120 KB parsed.
2. Add `loading.tsx` skeletons for the 3 focus routes so even cache misses provide immediate feedback.
3. Re-run the build + Chrome trace; store new bundle stats (`docs/perf/baselines/2025-11-XX.csv`) to prove the <0.5 s target is hit.

**Dependencies / sequencing**
- Fix the `ArrowLeft` import before Phase 1 so `next build` passes after each stage.
- The nav refactor unlocks the biggest win (>50 KB), so prioritize Phase 1 even if later phases slip.

**Risks & mitigations**
- *Risk*: Dynamic nav may flash layout on load. *Mitigation*: keep sidebar width reserved with CSS + skeleton placeholders.
- *Risk*: Moving data to JSON could complicate authoring. *Mitigation*: provide a script to generate JSON from the existing TS definitions so marketing can keep editing TS files locally.

## Industry Research & Standards

- **Lean shared shells via Server Components.** Next.js App Router defaults to React Server Components so layouts and shared UI can render on the server and stream HTML while shipping minimal client bundles; keeping wrappers like `PartnersPageShell` server-driven is the recommended way to stop cascading client hydration costs. citeturn0search1
- **Stream + partially prerender everything interactive.** Vercel’s performance playbook and Next.js streaming docs both stress that response streaming + Partial Prerendering (PPR) lets route shells render immediately while Suspense “holes” hydrate later—exactly the pattern we need for Academy/Recruitment dashboards. citeturn0search0turn0search3turn2search4
- **Adopt “streaming data + RSC” composition.** Production write-ups show RSC + streaming delivers critical UI in ~40 ms while the rest hydrates progressively, as long as expensive widgets sit behind Suspense/dynamic imports. citeturn0search3turn2search7
- **Cache everything close to the edge.** Vercel recommends combining App Router `fetch` caching, route segment revalidation, and middleware hints so stable data never blocks rendering—mirrors our plan to move wizard/portfolio data into cacheable JSON endpoints. citeturn0search2turn2search4
- **Hydration should be modular and adaptive.** Research on Modular Rendering & Adaptive Hydration (MRAH) advocates breaking UIs into independent “islands,” prioritizing hydration by device capability, visibility, and UX importance—reinforcing our goal to only hydrate nav overlays, chat widgets, and composer flows when the user needs them. citeturn2academia12
- **Set measurable 2025 Core Web Vital targets.** Industry guidance now expects ≤ 2.5 s LCP, ≤ 200 ms INP, ≤ 0.1 CLS (with warnings that LCP may tighten toward 2.0 s over the next year), so our sub‑500 ms local target must map to those thresholds. citeturn1search2turn1search0turn3search0
- **Resource priority is part of layout architecture.** Modern performance guides recommend pairing image/CDN optimisation with Priority Hints (`fetchpriority="high"` for the single LCP hero, `low` for non-critical assets) to consistently keep LCP under the 2.5 s target. citeturn0search6turn3search4turn3search5
- **Enterprise case studies validate RSC adoption.** Meta, Airbnb, and GeekyAnts publicly quantified 15–60 % improvements in TTI, bundle size, and Lighthouse scores after migrating to Next.js App Router with RSC—evidence that our sub‑0.5 s goal is realistic. citeturn2search9turn2search1turn2search5
- **Third-party governance is mandatory.** React CWV playbooks for 2025 name third-party script budgets as the highest-leverage INP win; no partner route should load analytics/marketing JS without a budget. citeturn3search1

**Mapping to our roadmap**
1. *Phase 1 shell refactor* ⇢ Aligns with the Server Component guidance: turn `PartnersPageShell` into a streamed server layout and hydrate the nav lazily to match the RSC-first model above.
2. *Phase 2 data streaming* ⇢ Follows the streaming-data recommendations by breaking wizard/portfolio payloads into cached fetches guarded by Suspense.
3. *Phase 3 client-boundary trimming* ⇢ Mirrors industry advice to keep heavy widgets behind Suspense/dynamic imports so the first chunk stays under 120 KB parsed.
4. *Phase 4 regression guard* ⇢ Implements the bundle-budget discipline Next/Vercel advocate so we continuously enforce the sub‑0.5 s target.

### Additional research-driven action items

| Theme | Industry Signal | What we should do |
| --- | --- | --- |
| Partial Prerendering (PPR) | Static shell + streamed “holes” now default path for App Router to mix static nav with streamed dashboards. citeturn0search0turn0search3turn2search6 | Pilot PPR on `/partners/academy` once the nav shell becomes server-rendered; wrap slow widgets in Suspense to keep the shell <100 ms. |
| Adaptive hydration | Modular rendering + conditional hydration (MRAH) reduces TTI and INP by deferring non-critical JS. citeturn2academia12 | Gate composer/chat/notifications hydration behind IntersectionObserver + `requestIdleCallback`, leaving hero metrics pure HTML. |
| Priority Hints & hero media | Proper `fetchpriority` usage cuts hero LCP by 0.5–0.7 s in Chrome lab studies; overuse hurts. citeturn0search6turn3search4turn3search5 | Annotate only the single LCP hero image/video in each route with `fetchpriority="high"` + `decoding="async"` and preconnect the CDN origin. |
| Core Web Vitals instrumentation | RUM & Search Console evaluations require INP ≤ 200 ms, LCP ≤ 2.5 s, CLS ≤ 0.1 at p75, with talk of 2.0 s LCP in 2026. citeturn1search6turn1search0turn3search0 | Extend the planned `app/partners/metrics.ts` logger to stream LCP/INP/CLS via `web-vitals` into our analytics to spot regressions after each phase. |
| RSC ROI proof | Enterprise case studies show 30–60 % bundle reductions and 60 % faster TTI after adopting RSC. citeturn2search5turn2search9 | Record bundle + Lighthouse deltas per phase to mirror those public playbooks and keep stakeholders bought in. |

### What this research enables immediately

1. **Server shell + Suspense enforcement.** Streaming guidance makes it clear that every dynamic slice must sit under an explicit `<Suspense>` for PPR to help; we can add Suspense wrappers around the nav drawer, Hub widgets, and wizard panes today so Phase 1 doesn’t stall. citeturn0search0turn0search3
2. **Adaptive hydration backlog.** The MRAH pattern tells us how to prioritize hydration by importance and device capability—actionable now by deferring `CampusDrawer`, `ComposerBar`, and notifications until the user focuses or the component intersects. citeturn2academia12
3. **Performance budgets tied to CWV.** Google’s 2025 thresholds confirm we must track LCP/INP/CLS continuously; we can check in Lighthouse CI + `web-vitals` logging immediately and fail PRs that exceed budgets. citeturn1search6turn1search0turn3search0
4. **Resource priority hygiene.** Priority Hint research quantifies the win, so we can audit hero media on Academy/Pipeline dashboards this week and add `fetchpriority="high"` only to the single LCP asset while downgrading everything else. citeturn0search6
5. **Third-party script audit.** Modern CWV playbooks call out unbounded analytics/marketing tags as the #1 INP killer; we can start cataloging scripts per route and introduce a “third-party budget” lint rule now. citeturn3search1

## Adaptive Hydration Heuristics (Phase 3 reference)

We now treat hydration as an explicit opt-in. Shells, hero sections, and any deterministic content must stay server-rendered; interaction-only widgets hydrate via dedicated client modules. The table below is the living checklist authors must follow before adding a client component to `/partners/**`.

| Rule | Why | Enforcement |
| --- | --- | --- |
| **Only files ending in `.client.tsx` (or `PartnerPerfMetrics.tsx`) may contain `"use client"`.** | Keeps the entry shells server-only and makes hydrators discoverable. | `scripts/perf/check-hydration-heuristics.mjs` scans for stray directives; CI fails if a non-whitelisted path uses `"use client"`. |
| **Every hydrator must render a fallback shell that mirrors its footprint.** | Prevents layout shift during Deferred hydration. | Document fallback UI in the component header comment + ensure wrappers live inside `<Suspense>` when imported. |
| **Hydration must be gated by intent.** Use `useHydrateOnView` (IntersectionObserver) for passive widgets, and focus/interaction listeners for composers/chat. | Aligns with Modular Rendering + Adaptive Hydration research so INP stays <200 ms. | Add `data-hydration="lazy"` to placeholders; heuristics doc lists approved hooks (`useHydrateOnView`, `useHydrateOnFocus`). |
| **Expensive effects must respect `prefers-reduced-motion` and abort on the server.** | Guarantees crawler-friendly HTML and avoids unnecessary work for motion-sensitive users. | `wave-background` already checks media query; future canvases must do the same before running animation loops. |
| **Every dynamic import must live beneath a `<Suspense>` boundary.** | Required for Partial Prerendering + consistent shell streaming. | During the Suspense audit we wrap any `dynamic()` or `React.lazy` consumer lacking an ancestor `<Suspense>`. |

**Authoring checklist**
1. Start with a server component; if you truly need state/effects, split the interactive portion into `ComponentNameHydrator.client.tsx`.
2. Provide a visually accurate placeholder (skeleton, CTA stub, etc.) and wrap the hydrator with `<Suspense fallback={...}>`.
3. Choose the gating strategy:
   - Intersection-based (`useHydrateOnView`) for read-only widgets (wallet charts, hub cards, analytics panels).
   - Focus/interaction-based for composers/chat (`useHydrateOnFocus` helper or local focus handler).
   - Explicit button-based for overlays/drawers (hydrate only after the FAB/toggle is activated).
4. Annotate the hydrator with `data-hydration="lazy"` (or `data-hydration="focus"`) so DevTools snapshots can confirm the strategy used.
5. Update this doc + the checklist whenever a new pattern or exception is introduced.

This heuristics section, combined with the lint in Step 2, satisfies the Phase 3 “Adaptive Hydration” bullet once merged.

## Suspense enforcement audit (Nov 20 2025)

We wrapped every dynamic bundle that previously rendered without a visible `<Suspense>` ancestor so Partial Prerendering can safely stream shells:

- **Nav + mobile shells.** `src/domains/partnerships/mobile/ui/MobileShell.tsx` now Suspense-wraps `CampusDrawerHydrator`, `LearningHubResponsive`, and `LazyNotificationsScreen` with lightweight fallbacks; `src/domains/partnerships/community/ui/CommunityPageShell.tsx` does the same for the drawer when the desktop shell collapses. `src/app/partners/academy/layout.tsx` also wraps `AcademyShell.client` in `<Suspense>` with a hero/tab skeleton so the academy route can emit server HTML immediately while the mobile shell chunk loads. This guarantees both the desktop and mobile nav chrome can stream immediately while the immersive drawer hydrates in the background.
- **Hydrator clients.** All `useHydrateOnView` adapters (ActiveDealsHydrator, ClientNotesHydrator, ProspectDetailHydrator, WorkspaceDemoHydrator, CalendarWorkspaceHydrator, AccountNotificationsHydrator, CampusDrawerHydrator) now render their lazy modules beneath `<Suspense>` while reusing the same skeleton fallback they previously displayed during the visibility gate. Wallet analytics/alerts and DirectoryOverlay were already Suspense-compliant.
- **Notification tab.** The dedicated Notifications tab in the mobile shell wraps `LazyNotificationsScreen` beneath `<Suspense>` even after the intersection hook fires, so the inbox never flashes empty content while the chunk loads.

**PPR prep next steps**
1. With `PartnersAcademyLayout` now rendering the hero/cards server-side while the nav hydrates separately, capture a fresh streaming trace to confirm the initial HTML lands <100 ms and adjust the fallback if needed.
2. Confirm every remaining `dynamic()` usage under `/partners/academy` (portfolio, training spotlight) is either already in Suspense or uses the new hydrator pattern; add TODOs where further splits are needed.
3. Once the above is true, flip on `export const experimental_ppr = true` for `/partners/academy` (already enabled at the page) and record a new trace/Lighthouse sample for the baseline docs.

## Third-Party Script Inventory (Nov 19 2025)

We scanned the partner App Router (`src/app/partners/**`) and shared domains for any `<script>` tags, `next/script` usage, or external embeds. Repo-wide `rg '<script' src/app/partners -g'*.tsx'` and `rg 'next/script'` both returned no matches, confirming there are **no third-party scripts loading on the new partner surfaces** today. The only script tags that exist in the codebase are inline JSON-LD payloads for the legacy marketing app (`apps/partners`). Findings:

| Script / Hook | Location | Loads on partner app? | Essential? | Action |
| --- | --- | --- | --- | --- |
| External analytics / marketing tags | *(none)* – no `<script>` or `next/script` usage in `src/app/partners/**` | No | — | Keep budget at 0 KB; add CI lint to block future third-party tags unless they fit the 120 KB parsed cap. |
| Structured data JSON-LD | `apps/partners/src/components/seo/IndustryPageSEO.tsx` & `PageSEO.tsx` | Only on the legacy marketing site | Yes – required for SEO snippets | Leave inline so it stays server-rendered; no impact on partner routes. |
| DiceBear avatar preconnect | `src/app/layout.tsx:15` (`<link rel="preconnect" href="https://api.dicebear.com" />`) | Yes (HEAD only) | Yes – needed for avatar CDN latency | Already a passive preconnect, not a script; no JS payload to defer. |
| Dev-only `web-vitals` logger | `src/components/analytics/WebVitals.tsx` (gated behind `NODE_ENV === "development"`) | No (dev builds only) | Optional instrumentation | Acceptable in dev; keep disabled in production. |

**Next steps**
1. Codify a “third-party budget” by linting for `next/script` imports under `/src/app/partners/**` and requiring explicit approval + `strategy="lazyOnload"` for any future additions.
2. When we eventually add essential analytics (e.g., console telemetry), load them through a server component that streams a `<Suspense>`-wrapped dynamic import so they hydrate after TTI.
3. Document this inventory in `docs/perf/partners-portal-checklist.md` (Industry Research → Third-party script audit) so regressions trigger follow-up work.

## Baseline automation (`npm run perf:baseline`)

To avoid the manual “dev server + Puppeteer + copy files” loop, `npm run perf:baseline` now:

- boots `next dev` on port 3003 (configurable via `BASELINE_PORT`) and waits for the “Local” ready line;
- runs `scripts/perf/capture-partner-traces.mjs` against `/partners/academy`, `/pipeline-ops`, and `/recruitment`, writing `trace-*.json` + `trace-metrics.json` under `docs/perf/baselines/<date>/` (override with `BASELINE_DIR` if you need multiple captures per day);
- kills the dev server and, if `.next/analyze/*.html` exist from a prior `ANALYZE=true npm run build`, copies them into the same baseline folder (`analyzer/`).

Example:

```bash
# Capture to docs/perf/baselines/2025-11-20-phase1
BASELINE_DIR=2025-11-20-phase1 npm run perf:baseline
```

The script uses plain Node child processes, so it works anywhere `npm run dev` does. If the analyzer assets are missing you’ll get a warning—run `ANALYZE=true npm run build` before the baseline to include them.

### Phase 1 bundle + trace drop (Nov 20 2025)
- Analyzer HTML + stats copied under `docs/perf/baselines/2025-11-20-phase1/analyzer/` after the LazyMobileShell + JSON streaming changes. Use these alongside the traces in the same folder for “post Phase 1” comparisons.
- `node scripts/perf/check-bundle-budgets.mjs` now parses either `.next/static/analyze/client.json` or the HTML `window.chartData` payload so the bundle-budget gate can run in CI even if the JSON artifact is missing.
- `npm run perf:budgets` wraps the same script so CI can fail fast whenever any `/partners/**` chunk exceeds 120 KB parsed; run it right after `ANALYZE=true npm run build`.
- GitHub Actions workflow `.github/workflows/partner-portal-perf.yml` runs the analyzer build, `npm run perf:budgets`, and Lighthouse smoke tests for /partners/academy, /partners/pipeline-ops, and /partners/recruitment on every push/PR so regressions are caught automatically.
- Lighthouse desktop + mobile reports for `/partners/academy`, `/partners/pipeline-ops`, and `/partners/recruitment` now live under `docs/perf/baselines/2025-11-20-phase1/lighthouse/`; use them as the reference point for future regressions.
- `npm run perf:lighthouse-budgets -- <dir>` parses each Lighthouse JSON report (desktop variants for now) and enforces LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. The CI workflow runs `npm run perf:lighthouse-budgets -- lighthouse` immediately after the smoke tests, so a PR fails automatically if the latest bundle slips past CWV budgets. Mobile reports are still captured and published, but we’ll tighten the guard once those surfaces meet the thresholds.
- `docs/perf/baselines/2025-11-20-phase3/` contains the newest dev traces (post-streaming academy hero). No analyzer HTML in that run—rerun the analyzer build before the next capture if bundle comparisons are needed.

### RSC ROI tracker
To quantify the RSC/server-shell gains, log DCL/FCP + Lighthouse scores for each route after every baseline capture.

  | Phase (Date) | Route | DOMContentLoaded (s) | First Contentful Paint (s) | Lighthouse Perf (Desktop/Mobile) | Notes |
  | --- | --- | --- | --- | --- | --- |
  | Phase 1 (Nov 20 2025) | /partners/academy | 3.66 | 3.83 | 0.92 / 0.91 | Server shell + lazy nav ship, but academy hero still client-heavy. |
  | Phase 1 (Nov 20 2025) | /partners/pipeline-ops | 0.65 | 0.73 | 1.00 / 0.96 | Submit-client wizard now streams; budgets enforce <120 KB parsed. |
  | Phase 1 (Nov 20 2025) | /partners/recruitment | 0.48 | 0.56 | 1.00 / 0.95 | Recruitment shell fully server-driven; track as regression guard. |
  | Phase 3 (Nov 20 2025) | /partners/academy | 4.69 | 4.88 | — | Dev baseline after streaming hero/cards; nav still hydrates client-side so LCP remains ~4.9 s. Need production-profile once hero tabs split. |

### Resource priority hygiene (Nov 20 2025)
- `/partners/academy/portfolio` now boosts the very first portfolio card image (`fetchPriority="high"`, `loading="eager"`, `decoding="async"`) so the LCP asset downloads immediately, while every other card/gallery image falls back to `fetchPriority="low"` + `loading="lazy"`.
- Industry landing heroes (public and partner variants) now mark their header art as the single high-priority resource; category cards, screenshot galleries, and integration logos all default to `fetchPriority="low"` with async decoding to protect bandwidth.
- These changes align the partner + public portfolio surfaces with Google’s resource priority guidance and make the Industry Research checklist item enforceable in CI reviews.
