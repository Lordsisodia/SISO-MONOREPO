# Baseline – Phase 5 (Nov 20 2025, academy fully server-rendered)

Artifacts:
- `trace-*.json` – Chrome traces for academy/pipeline/recruitment.
- `trace-metrics.json` – summarized DOMContentLoaded/FCP measurements.
- `analyzer/*.html` – bundle analyzer outputs from the latest production build (`ANALYZE=true npm run build`).
- `lighthouse/*.json|html` – desktop + mobile Lighthouse reports for /partners/academy, /partners/pipeline-ops, /partners/recruitment (captured with the production build running on port 4010).

## Metrics snapshot (dev, Turbopack)

| Route | DOMContentLoaded (ms) | FCP (ms) | Notes |
| --- | --- | --- | --- |
| /partners/academy | 3 923 | 4 144 | Fully server-rendered shell drops DCL by ~17% vs phase4 prep (4.13→3.92 s); FCP still ~4.1 s because nav hydrator remains. |
| /partners/pipeline-ops | 601 | 712 | Steady. |
| /partners/recruitment | 445 | 560 | Steady. |

Next: capture production Lighthouse after enabling PPR on `/partners/academy`.
