# Page Analysis · App Plan Generator (/partners/tools/app-plan-generator)

## Goal
Turn an intake into a clear app plan that can be shared with the client and pushed into delivery/tasks.

## Primary user
Partners and ops generating a scoped plan after intake.

## Current state (repo)
- UI generates plan cards from mocked data/templates; no confirmed inputs/guardrails.

## Target state & success
- Inputs collected: business description, goals, services needed, budget (optional), timeline, risk notes.
- Outputs: on-screen plan with sections (problem, solution outline, scope, timeline, risk/assumptions), export to PDF/link, push to Workspace tasks + Notifications.
- Guardrails: no ROI promises; no regulated-industry guarantees without approval; respect HIPAA/PII constraints.
- Success = plan sent to client or handed to delivery with tasks created.

## Content requirements
- Section headings, CTA labels (Export, Send to tasks), disclaimer language on scope/claims.

## Data requirements
- Template library for plan sections; variables mapped from intake fields.
- Actions: generate, regenerate/iterate, export, send to tasks/notifications.

## UX states to cover
- Loading/generation; empty (no intake yet); validation errors; export success/failure.

## Copy/microcopy to draft
- Disclaimer about estimates/claims; AI-assist note if applicable; export/send confirmations.

## Open questions
- Do we require approval before sending plans to clients? Who approves?
- Which tasks should auto-create in Workspace when a plan is generated?

## Risks / dependencies
- Needs alignment with Submit Client field names; compliance on claims; integration to Workspace/Notifications.
