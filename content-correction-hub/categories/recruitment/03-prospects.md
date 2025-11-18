# Page Template: Recruitment Prospects (Pipeline)

## Page Metadata
- **Page Name**: Recruitment Prospects
- **Route**: `/partners/recruitment/prospects`
- **File**: `src/app/partners/recruitment/prospects/page.tsx` (+ `ProspectsContent.tsx`)
- **Section**: Recruitment
- **Status**: planning
- **Priority**: release-critical

## Simple Questions (with current answers)
1. **What should this page do?**  
   Show and manage the full recruitment pipeline: stage movement, ownership, next actions, and SLA alerts.
2. **Who uses it?**  
   Partner recruiters/partner managers daily; recruitment lead for oversight; finance/compliance occasionally for status checks.
3. **What's working now?**  
   Layout skeleton using `PartnersPageShell`, hero card, table scaffolding.
4. **What's broken/missing?**  
   - Filters as pills → should be dropdown (use Settings page dropdown pattern).  
   - Hero/title styling off: too large, missing icon/callout block and preferred fonts.  
   - “Invites this week” block disliked; needs redesign or replacement KPI.  
   - Table is mock data, no horizontal scroll; wants Airtable-style component (21st.dev) for better UX.  
   - Stage/owner/contact/next action chips not styled or iconized; needs callout header.  
   - Automation queue purpose unclear; likely remove/replace.  
   - Quick resources OK conceptually but actual links TBD.  
   - No real data wiring, SLA indicators, or stage taxonomy.
5. **What data should show here?**  
   Recruits with stage, owner, contact, source, score, age-in-stage, last touch, next action, SLA flags, and segmentation (region/segment/source). Bulk actions: assign owner, change stage, send invite, export.
6. **Who needs to approve this?**  
   Recruitment lead (pipeline flow), finance/legal (invite/compliance copy), design (component choices), ops (SLA definitions).

## Page Overview
- **Page Goal**: Let recruiters quickly see priorities, move recruits through stages, and keep SLA compliance high.
- **Persona & Story**: A recruiter lands here to decide who to work next, update stages, and ensure no invite/compliance tasks are overdue.
- **Success Metrics**: Stage movement rate, SLA breach reduction, assignment coverage, time-to-activation improvements.

## Component Structure (target)
| Component | Target State | Notes |
|-----------|--------------|-------|
| Hero / Context card | Compact callout with icon + title + description + key KPI (e.g., “Active prospects”, “Invite→approval %”) | Replace current oversized title; align fonts with Settings-style hero blocks. |
| Filters bar | Dropdown(s) for Saved Views + Filters (stage, owner, source, SLA) using Settings dropdown component | Replace pills; include “Save view” flow. |
| Table (Airtable-style) | 21st.dev-inspired virtualized grid with horizontal scroll, sticky header, resizable columns | Columns: Prospect, Stage (chip), Owner (avatar), Score, Source, Age in stage, Next action, Last touch, SLA flag; row click opens side panel. |
| Side panel | Details + timeline of touchpoints + stage change + notes | Needed for in-row “Update” action replacement. |
| Actions toolbar | Bulk assign, bulk stage change, bulk send invite, export CSV | Contextual to selected rows. |
| KPI strip (optional) | Small widgets: New invites (7d), Approval rate, Activation rate, SLA breaches | Could replace disliked “Invites this week” block. |
| Quick resources | Curated links: Invite template, Compliance checklist, Objection handling, Compensation FAQ | Actual URLs/TBD docs needed. |
| (Remove/Replace) Automation queue | If kept: show SLA-driven tasks (e.g., “Review compliance docs”) derived from data; otherwise drop. |

## Data & Content Requirements
- **Static**: Stage labels/colors/icons, glossary definitions, tooltips for KPIs, resource links.
- **Dynamic**: Recruits list, scores, owners, stage timestamps, SLA flags, touchpoints, saved views.
- **User-generated**: Notes/touchpoints, stage changes, assignments.
- **Media**: None required beyond icons.

## Technical Data Plan (draft)
- Use proposed Supabase tables: `recruits`, `recruit_stage_events`, `recruit_touchpoints`, `recruit_assignments`, `recruit_segments`.
- Queries: paginated recruits with filters (stage, owner, source, SLA), include latest stage event, latest touchpoint, score.
- Computed fields: age_in_stage, sla_status, invite_to_approval %, approval_to_activation %.  
- Realtime: subscribe to stage/touchpoint changes to update rows/live SLA flags.
- Saved views: persist user-owned filter configs (table TBD).

## UI/UX Adjustments (from feedback)
- Replace pills with dropdown component from Settings page for Views/Filters.  
- Redesign hero block: add icon, proper callout styling, smaller title, correct fonts.  
- Table: swap to Airtable-like component with horizontal scroll + sticky header.  
- Stage/Owner/Contact/Next Action: ensure clear iconography and sizing; consistent label/callout.  
- Remove or repurpose “Invites this week” block into KPI strip with multiple metrics.  
- Clarify/justify Automation queue or replace with SLA-driven “Attention needed”.  
- Evaluate Quick resources content; populate with actual recruiting assets.

## Glossary (page-relevant)
- **Stage**: `invited` → `engaged` → `applied` → `compliance` → `approved` → `activated` → `productive` → `dormant`; exits: `rejected/duplicate/spam`.
- **Age in stage**: time since stage entered.  
- **SLA breach**: exceeds response/review/activation thresholds.  
- **Score**: 0–100 weighted by source quality, engagement, fit.

## Open Questions (to resolve)
- Final stage names and colors; allowed transitions.  
- Exact SLA thresholds (response, compliance review, activation).  
- Scoring weights and who owns them.  
- What KPIs replace “Invites this week” (top 3–4)?  
- Which resource links are real and where they live.  
- Saved views ownership (per-user vs team) and sharing.  
- Do we need bulk messaging/invite from this page or elsewhere?

## Implementation Checklist (draft)
- [ ] Finalize stage taxonomy, SLA rules, KPI list.  
- [ ] Approve component swaps (dropdowns, Airtable-like grid, new hero).  
- [ ] Define data contracts for recruits query + side panel.  
- [ ] Design empty/loading/error and no-permission states.  
- [ ] Wire Supabase queries + realtime; add bulk actions.  
- [ ] Replace mock content/resources; remove/replace automation block.  
- [ ] Accessibility: keyboard + screen reader for grid, dropdowns, side panel.  
- [ ] Performance: virtualized rows, pagination, column resize persistence.  
