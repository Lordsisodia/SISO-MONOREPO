# Baseline – Phase 3 (Nov 20 2025, academy streaming shell)

Context: captured immediately after converting `/partners/academy` to render its hero/cards on the server while hydrating the mobile nav shell lazily. Use these traces to compare against the earlier `2025-11-20-phase1` capture.

Artifacts:
- `trace-academy.json` – Chrome performance trace for `/partners/academy`
- `trace-pipeline-ops.json`, `trace-recruitment.json` – reference routes to ensure we didn’t regress pipeline/recruitment while touching the layout
- `trace-metrics.json` – summarized DOMContentLoaded / FCP timings for all routes (dev build, Turbopack)
- Analyzer HTML unavailable in this run (build artifacts not generated); rerun `ANALYZE=true npm run build` before the next capture if bundles need comparison.

## Metrics snapshot

| Route | DOMContentLoaded (ms) | Load Event End (ms) | FCP (ms) | Notes |
| --- | --- | --- | --- | --- |
| /partners/academy | 4 687 | 4 726 | 4 884 | Dev server still spends ~4.8 s before the first paint because MobileShell hydrator waits for the 58 KB nav bundle; next steps are to peel the hero tabs fully server-side + profile with production build. |
| /partners/pipeline-ops | 593 | 593 | 664 | Streaming unchanged; hydrating wizard still <700 ms in dev. |
| /partners/recruitment | 375 | 383 | 472 | No regression; shell remains server-rendered. |

## Next capture
- After splitting the academy hero tabs into a pure server module and ensuring remaining academy `dynamic()` imports sit under `<Suspense>`, rerun `BASELINE_DIR=2025-11-20-phase4 npm run perf:baseline` to compare traces and include analyzer output.
