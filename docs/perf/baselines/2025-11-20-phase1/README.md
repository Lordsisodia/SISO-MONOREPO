# Phase 1 Baseline – November 20, 2025

Captured after the Phase 1 server-shell + streaming work landed. Artifacts below pair with the earlier Phase 0 traces so we can compare bundle sizes and shell timings before pushing into adaptive hydration (Phase 3+) and regression guards (Phase 4).

## Environment
- Commit: `c85e46aaeab1a5c303dfc9e6382be630e094d59c`
- Node: `v22.18.0`
- Capture timestamp: 2025-11-20T08:35:11Z
- Commands:
  1. `BASELINE_DIR=2025-11-20-phase1 npm run perf:baseline` (re-uses the trace helper to mirror Phase 0 routes).
  2. `ANALYZE=true npm run build` (after LazyMobileShell + portfolio JSON data-source landed).
  3. `node scripts/perf/check-bundle-budgets.mjs` (confirms every `/partners/**` chunk < 120 KB parsed).

## Analyzer Reports (copied from `.next/analyze/`)
| Target Runtime | Report | Size | Notes |
| --- | --- | --- | --- |
| Node.js (SSR) | `analyzer/nodejs.html` | 1.40 MB | Reflects server build with LazyPartnersPageShell + LazyMobileShell |
| Edge | `analyzer/edge.html` | 0.26 MB | Generated but currently unused (no edge routes yet) |
| Client | `analyzer/client.html` | 1.04 MB | Includes new Suspense gating + reduced-motion Waves |

## Trace Files
These JSON traces were captured the same evening for /partners/academy, /partners/pipeline-ops, and /partners/recruitment. Load them in Chrome DevTools Performance panel for timing comparisons.

| Route | Trace File | Size |
| --- | --- | --- |
| /partners/academy | `trace-academy.json` | 15.0 MB |
| /partners/pipeline-ops | `trace-pipeline-ops.json` | 15.4 MB |
| /partners/recruitment | `trace-recruitment.json` | 2.4 MB |

Raw LCP/INP/CLS samples remain in `trace-metrics.json`. Use this folder as the canonical “post-Phase 1” baseline for all future regressions.

## Lighthouse snapshots (Nov 20 2025, localhost:4010)
Runs executed via `npx lighthouse <url> --chrome-flags='--headless=new'` after `npm start` (port 4010). Reports live under `lighthouse/` in both HTML + JSON formats.

| Route | Desktop Perf | Mobile Perf |
| --- | --- | --- |
| /partners/academy | 0.92 | 0.91 |
| /partners/pipeline-ops | 1.00 | 0.96 |
| /partners/recruitment | 1.00 | 0.95 |

## Comparison vs Phase 0 (Nov 19 2025)
| Artifact | Phase 0 (Nov 19) | Phase 1 (Nov 20) | Delta / Notes |
| --- | --- | --- | --- |
| Analyzer – client | 1.00 MB HTML (`docs/perf/baselines/2025-11-19/analyzer/client.html`) | 1.04 MB HTML | +0.04 MB from LazyMobileShell + hydrator stubs; still comfortably under the 120 KB parsed budget per route. |
| Analyzer – node | 1.3 MB | 1.40 MB | Slight increase from streaming layout instrumentation; bundle-budget CI now guards against future growth. |
| Analyzer – edge | 0.268 MB | 0.26 MB | Effectively unchanged; edge runtime unused today. |
| Trace metrics | `chrome-error://chromewebdata/` (dev server dropped mid-run) | Real URLs with DCL/FCP recorded (see trace-metrics + table above) | Phase 1 capture fixes the broken Phase 0 baseline, giving us usable timing numbers. |

Takeaways:
- Treat this drop as the first reliable timing reference; the Phase 0 traces terminated early, so there’s no meaningful DCL comparison for that run.
- Analyzer artifacts now accompany every perf guard run (`ANALYZE=true npm run build` + `npm run perf:budgets`), so future baselines can highlight deltas automatically.
