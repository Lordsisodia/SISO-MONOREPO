# Phase 0 Baseline – November 19, 2025

Captured Chrome performance traces for the three primary partner routes while running `npm run dev --turbo` (dev server bound to http://localhost:3003). Traces recorded via `node scripts/perf/capture-partner-traces.mjs` using Puppeteer 24.15.0.

## Environment
- Commit: `c85e46aaeab1a5c303dfc9e6382be630e094d59c`
- Node: `v22.18.0`
- Browser: Puppeteer-controlled Chromium (headless)
- Capture timestamp: 2025-11-19T18:03:36.422Z

## Trace Artifacts
| Route | Trace File | Size | DOMContentLoaded (ms) | Load Event End (ms) | FCP (ms) |
| --- | --- | --- | --- | --- | --- |
| /partners/academy | `trace-academy.json` | 14.9 MB | 207 | 498 | 648 |
| /partners/pipeline-ops | `trace-pipeline-ops.json` | 15.3 MB | 63 | 274 | 380 |
| /partners/recruitment | `trace-recruitment.json` | 2.3 MB | 52 | 262 | 376 |

Raw metrics source: `trace-metrics.json`. Load a trace via Chrome DevTools → Performance panel → “Load profile…”. Repeat this process after performance work and drop new artifacts under `docs/perf/baselines/<date>/` for regression comparisons.

## Analyzer Reports
`ANALYZE=true npm run build` (Nov 20 2025 02:07 UTC) emitted the Webpack Bundle Analyzer outputs below. Open any HTML file in a browser to inspect bundle breakdowns.

| Target Runtime | Report | Size | Modified (local) |
| --- | --- | --- | --- |
| Node.js (SSR) | `.next/analyze/nodejs.html` | 1.3 MB | Nov 20 02:07:03 2025 |
| Edge | `.next/analyze/edge.html` | 268 KB | Nov 20 02:07:04 2025 |
| Client | `.next/analyze/client.html` | 1.0 MB | Nov 20 02:07:11 2025 |

These files pair with the trace artifacts above to serve as the canonical Phase 0 baseline for bundle size and route-level timing comparisons.
