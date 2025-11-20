# Page Analysis · Active Deals (/partners/pipeline-ops/active-deals)

## Goal
Manage in-motion deals from Interested through Client paid, with clear ownership, next steps, and commission visibility.

## Primary user
Partners and ops running mid/late-stage deals.

## Current state (repo)
- Kanban board with stages (qualified, discovery, proposal, negotiation, closing, won/lost), mock deals, 12% commission calc, static comments.

## Target state & success
- Stage columns: Interested → Demo build → Project completed → Client paid; drag/drop gated by next step + owner.
- Commission estimate shown using 20% base (up to 30% for high-impact deals—rule TBD).
- Live activity/comments feed per deal; health badges (on_track/risk/stalled) driven by triggers.
- Success = each deal has owner, next step, due date; stalled deals surface in dashboard/notifications.

## Content requirements
- Column labels and stage definitions; health badge tooltips; next-step templates per stage.
- Commission estimate label and disclaimer.

## Data requirements
- API for deals: id, company, stage, owner, amount, probability, health, lastActivityAt, nextStep, nextStepDue, comments/activity.
- Actions: update stage (with validation), edit next step, assign owner, add comment, mark risk/stalled.

## UX states to cover
- Empty board; loading; error; optimistic drag/drop with rollback.
- Stalled/risk highlighting using confirmed triggers (risk after 7 days inactivity, stalled after 14 days); filter/search states.

## Copy/microcopy to draft
- Stage definitions; health triggers; commission disclaimer; empty and error states.

## Open questions
- Exact rules for 20%→30% uplift.
- Should “Project completed” require client acceptance flag before moving to “Client paid”?

## Risks / dependencies
- Needs confirmed stage/health triggers and commission policy; backend support for activity feed and optimistic moves.
