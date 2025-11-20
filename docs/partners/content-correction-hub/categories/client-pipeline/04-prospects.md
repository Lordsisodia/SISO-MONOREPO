# Page Analysis · My Prospects (/partners/pipeline-ops/prospects)

## Goal
Track early-stage leads, capture next steps, and quickly advance interested prospects into the active pipeline.

## Primary user
Partners and ops managing top-of-funnel opportunities.

## Current state (repo)
- Table/grid with placeholder prospects and filters; local data only.

## Target state & success
- Live list for stages Identified/Interested with owner, source, industry, last activity, demo scheduled flag, WhatsApp provided flag.
- Primary CTA: move to Interested or create/schedule demo task with due date.
- Success = clear next step + owner on every Interested prospect.

## Content requirements
- Column labels, filter copy, empty-state guidance, action tooltips.
- Definition tooltip for stages and “demo scheduled”.

## Data requirements
- API for prospects with fields: id, stage (Identified/Interested), owner, source, industry, WhatsAppProvided, demoScheduled, value(optional), lastActivity, nextStep, nextStepDue.
- Actions: update stage, assign owner, create next step, schedule demo.

## UX states to cover
- Empty (no prospects) with CTA to Submit client.
- Loading/pagination; inline updating success/error.

## Copy/microcopy to draft
- Empty-state CTA; stage descriptions; inline success/error toasts.

## Open questions
- Do we require value estimate at prospect stage? (optional in plan)
- Should demo scheduling push to Calendar/Workspace automatically?

## Risks / dependencies
- Requires shared stage taxonomy with active deals; integration with scheduling if demos auto-create events.
