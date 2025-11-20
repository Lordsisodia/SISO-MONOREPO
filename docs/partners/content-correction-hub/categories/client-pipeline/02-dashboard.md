# Page Analysis · Client Pipeline Dashboard (/partners/pipeline-ops)

## Goal
Give partners a live snapshot of deals in motion, highlight next steps, and route them quickly to prospects, active deals, submit client, and client notes.

## Primary user
Partners and ops teammates monitoring pipeline health at a glance.

## Current state (repo)
- Highlight card with static metricValue="6" deals; quick links include Recruitment; “What’s next” stats hard-coded.

## Target state & success
- Live metrics: deals in motion (Interested → Project completed, not paid), demos in progress, clients paid (last 30d), total pipeline value optional.
- SLA badge: show "Instant review" if helpful to set expectation.
- Quick links trimmed to core pages (prospects, active deals, submit client, client notes); remove recruitment.
- Success: partners trust numbers and click through to resolve next steps; zero mock data.

## Content requirements
- Headline/description reflecting live data.
- CTA labels that match actions: e.g., “View prospects”, “Review active deals”, “Add client”.
- Helper text defining “deal in motion”.

## Data requirements
- Metrics feed for: count/value of deals in motion, count demos in progress (Demo build stage), count clients paid (last 30d).
- Health summary (risk/stalled counts) if available.

## UX states to cover
- Loading/skeleton for metrics.
- Empty state (no deals yet) with CTA to Submit client.
- Error state if metrics API fails.

## Copy/microcopy to draft
- Definition tooltip for “Deals in motion”.
- Empty-state encouragement + CTA.
- Error retry message.

## Open questions
- SLA badge here? (e.g., “Lead review SLA: 8h”).
- Do we show commission estimate rollup on the dashboard?

## Risks / dependencies
- Metrics rely on CRM/internal service; need contract documented.
- Commission display depends on confirmed % and eligibility.
