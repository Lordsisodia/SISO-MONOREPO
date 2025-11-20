# Client Pipeline Section Analysis

## Purpose
Align all pipeline pages (dashboard, submit client, prospects, active deals, app plan generator) to a unified stage flow and shared data contracts so live metrics replace mocks.

## Current shape in repo
- UI exists for all pages with placeholder data; recruitment link still present on dashboard (to be removed).
- Stage names differ across pages (prospect table vs active deals board).
- Mock metrics (e.g., "6 deals in motion") and static comments/notes.

## Target shape
- Single stage taxonomy: Identified → Interested → Demo build → Project completed → Client paid.
- Live data for metrics, tables, and boards; Airtable-style view for submissions.
- Consistent health states (on_track / risk / stalled) and commission display (20% base, up to 30% for high-impact deals).
- Clear ownership + next step on every record from Interested onward.

## Shared requirements
- Data source: CRM/internal service mirrored to Airtable view for ops.
- SLA for submissions: instant review (triage immediately on receipt).
- Commission estimates: display once deal is at Interested or higher.
- Integrations: Workspace tasks for next steps; Notifications for stalls and review assignments; Earnings for commission.

## Open coordination items
- Health triggers confirmed: risk after 7 days inactivity; stalled after 14 days.
- Approval for compliance/PII language on uploads and notes.
- Final decision on commission uplift criteria (>20% → 30%).
