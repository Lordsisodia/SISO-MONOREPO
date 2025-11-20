# Baseline – Phase 4 prep (Nov 20 2025, analyzer + academy streaming)

Captured immediately after cleaning up academy widgets + running `ANALYZE=true npm run build`. Includes analyzer HTML plus dev traces for academy/pipeline-ops/recruitment.

Artifacts:
- `trace-*.json` – Chrome traces for each route
- `trace-metrics.json` – summary of DOMContentLoaded / FCP from the Puppeteer run
- `analyzer/client.html`, `analyzer/nodejs.html`, `analyzer/edge.html` – bundle analyzer outputs from the latest production build

## Metrics snapshot

| Route | DOMContentLoaded (ms) | FCP (ms) | Notes |
| --- | --- | --- | --- |
| /partners/academy | 4 134 | 4 356 | Dev baseline improved slightly vs Phase3 (4.69s → 4.13s DCL) thanks to server-rendered cards, but nav hydrator still keeps FCP ~4.3 s. |
| /partners/pipeline-ops | 544 | 600 | No regression; wizard still streams quickly. |
| /partners/recruitment | 379 | 436 | Stable. |

Analyzer: open `docs/perf/baselines/2025-11-20-phase4/analyzer/client.html` etc. to inspect per-route budgets.

Next up: finish splitting the remaining academy hero tabs + interactive widgets so we can bring the dev FCP under 1 s and then capture a production trace with `NODE_ENV=production`.
