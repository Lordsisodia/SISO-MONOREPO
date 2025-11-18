# Client Pipeline Section Research Phase

**Date**: November 17, 2025  
**Analyst**: AI Assistant (Codex)

## Phase 1: Strategic Requirements (User Feedback)

### 🎯 Primary Business Priority
- Turn the pipeline area into the single source of truth for partner-sourced deals: prospect intake, active deal motion, and note-taking that is ready for live data (no mocks).
- Remove recruitment from this section (now its own category) and tighten cross-links to Workspace, Notifications, and Earnings for follow-up and rewards.

### 🛤️ User Journey Understanding
- **Dashboard (/pipeline-ops)**: snapshot of deals in motion, quick entry points to prospects, active deals, submit client, and client notes.
- **Submit client**: guided intake that gathers qualification data, expected value, risk, and supporting docs; signals SLA and reviewers.
- **My prospects**: early-stage leads pipeline with filters, ownership, and next-step nudges.
- **Active deals**: kanban/board of qualified deals with health, owner, value, and next steps.
- **Client notes**: centralized notes per client/deal with pinning/priority for handoff.
- **App plan generator**: converts an intake into a proposed plan/outline and hands off to delivery.

### 📝 Content Authority & Creation Process
- Need confirmed business lead + sales ops lead + technical lead (pipeline data contracts) + content owner for microcopy/CTAs.
- Approval required for: SLA promises, commission language, risk/compliance disclaimers on intake forms, and any automated plan outputs.

### 📊 Data Requirements
- **Dynamic**: deal/prospect lists with stage, owner, amount, probability, next step; notes tied to deals/clients; intake submissions and status; plan generator output; metrics for dashboard cards.
- **Static/configurable**: stage taxonomy, health statuses, CTA labels, empty states, reviewer roles, SLA text, note categories/pin rules.
- **Integrations**: pipeline data source (CRM/internal API), document upload store, notifications service for follow-ups, earnings service for commissions, Workspace tasks for next steps.

### 🔗 Cross-Section Integration Strategy
- Pipeline → Workspace: create tasks from next steps; show deal-linked tasks.
- Pipeline → Notifications: alerts for stalled deals, review assignments, SLA breaches, note mentions.
- Pipeline → Earnings: surface commission estimates per deal and milestone payouts.
- Pipeline → Community (optional): share wins or request help on tricky deals.

### ✅ Business Success Criteria (draft)
- Partners submit complete client intakes with <10% rework; SLA compliance visible.
- All “deals in motion” metrics come from live data (no statics/mocks).
- Clear ownership on every active deal with next step defined.
- Notes are searchable and pinned at client/deal level; handoffs reduce misses.
- App plan generator outputs align with marketing claims and delivery constraints.

## Enhanced Requirements & Open Questions

### Pipeline Taxonomy & Definitions
- Working stage flow (user-confirmed): Identified → Interested → Demo build → Project completed → Client paid. (Identified ≈ prospect; Interested ≈ qualified; Demo build ≈ proposal/POC; Project completed ≈ delivery done; Client paid ≈ closed/won.)
- Health statuses: on_track / risk / stalled. Triggers: risk after 7 days with no activity, stalled after 14 days with no activity (or unpaid invoice past 14 days in Project completed).
- Definition of “deal in motion”: any item from Interested through Project completed that is not yet paid; surface count + value on dashboard.

### Intake (Submit Client)
- Required: WhatsApp phone, primary contact name, business description (what they do), services needed, and at least one social link (any platform). Optional: budget (capture if provided), timeline, documents.
- Storage preference: submissions visible in Airtable-style view for ops; keep API/DB in sync with that view.
- Validation copy: highlight missing WhatsApp/contact/business fields; allow budget “Unknown.”
- SLA promise: instant review (triage immediately on receipt); update UI badge and confirmation copy accordingly.
- Reviewer assignment rules (TBD); maintain upload compliance note (PII/doc handling).

### Prospects List
- Columns/filters: stage (Identified/Interested), owner, source, industry, value (optional), last activity, WhatsApp provided (yes/no), demo scheduled (yes/no).
- Primary CTA: move to “Interested” or create demo task; capture next step + due date.

### Active Deals Board
- Columns: Interested → Demo build → Project completed → Client paid; allow drag/drop with required next step + owner on move.
- Next-step templates per stage; capture due date; show commission estimate.

### Client Notes
- Note types (meeting notes, risk notes, action items), pinning/priority rules, privacy (team vs personal), attachment rules.
- Search/tagging requirements and how notes link back to deals/clients.

### App Plan Generator
- Inputs: business description, goals, services needed, budget (optional), timeline, risk notes.
- Guardrails: no ROI promises; no regulated-industry guarantees without approval; respect HIPAA/PII constraints.
- Outputs: on-screen plan + option to send to Workspace tasks and Notifications; export/share allowed as PDF/link.

### Data & Performance
- Source of truth for deals/prospects/notes: CRM/internal service; mirror key fields into Airtable view for ops.
- Refresh cadence and offline/loading states; need for optimistic updates.
- Audit trail for submissions, stage changes, and note edits.

## Page-by-Page Analysis (Current vs Needs)

| Route | File | Current State (repo) | Content/Data Needs | Priority |
| --- | --- | --- | --- | --- |
| `/partners/pipeline-ops` | `src/app/partners/pipeline-ops/page.tsx` | Highlight card + quick links (prospects, active deals, recruitment) with canned metrics (6 deals, etc.) and static “What’s next” stats. | Replace mocks with live metrics; remove recruitment link (confirmed); define “deals in motion” = Interested→Project completed not paid; show top metrics: deals in motion count/value, demos in progress, clients paid (last 30d); display instant review SLA badge if desired. | High |
| `/partners/pipeline-ops/submit-client` | `.../submit-client/page.tsx` | Multi-step intake with extensive fields, progress meter, auto-approval chance calc, reviewer list, SLA text (8h). Data is all local state; submitClient service placeholder unknown. | Required fields: WhatsApp phone, contact name, business description, services needed, one social link; budget optional; store in Airtable-style view + API; SLA is instant review; add compliance note for uploads/PII. | High |
| `/partners/pipeline-ops/prospects` | `.../prospects/page.tsx` + `ProspectsWorkspace.tsx` (table with mocked prospects, filters) | Placeholder prospects table with filters; uses in-memory data. | Define schema (columns/filters), stage/health definitions, row actions (promote to deal, assign owner), empty-state copy, data source + pagination. | High |
| `/partners/pipeline-ops/active-deals` | `.../active-deals/page.tsx` + `ActiveDealsWorkspace.tsx` | Kanban-style board with stages, health badges, next-step suggestions, comments; seeded demo deals; commission calc assumes 12%. | Stages: Interested → Demo build → Project completed → Client paid; enforce next step + owner on stage move; commission estimate uses base 20% (up to 30% for high-impact deals—rule TBD); health triggers: risk at 7d inactivity, stalled at 14d; real data wiring + activity source needed. | High |
| `/partners/tools/app-plan-generator` | `src/app/partners/tools/app-plan-generator/page.tsx` | Intake-to-plan generator UI (mocked); likely uses static templates; outputs plan cards. | Lock input fields, template library, quality guardrails, export/share options, follow-up tasks/notifications; align claims with delivery capabilities. | Medium |
| `/partners/pipeline-ops/recruitment` | `.../recruitment/page.tsx` | Present in UI but slated to move to recruitment category. | Remove from pipeline dashboard/quick links; ensure proper redirect/hand-off once migration is finalized. | Cleanup |
| (Client notes moved) | Workspace Notes category | Client notes now live under Workspace/Notes. | Handle note requirements in Workspace; remove from pipeline scope. | Cleanup |

## Implementation Roadmap (draft)
- Confirm ownership: name business, sales ops, technical, and content approvers; set review cadence.
- Lock pipeline taxonomy: stages, health statuses, “deal in motion,” and commission logic.
- Define data contracts: prospects, deals, notes, submissions, plan outputs; map to APIs/CRM.
- Content pass: CTA/empty-state/microcopy for each page; SLA and compliance wording.
- Instrumentation: set metrics for dashboard cards and next-step nudges; define notification triggers.
- Migration: drop recruitment from pipeline UI once new category is live, add proper link to new location.

## Next Questions for Stakeholders
- Who are the definitive approvers for pipeline copy, SLA promises, and commission language?
- What is the exact stage/health taxonomy and the criteria to advance a deal?
- Which backend/service is the source of truth for prospects/deals/notes, and what is the API contract?
- How do we surface the instant SLA for lead validation in UI states (badge, banner, confirmation)?
- Should notes be private-by-default or team-shared? What retention/compliance rules apply to attachments?
- What inputs and guardrails are required for the app plan generator to keep outputs accurate?
