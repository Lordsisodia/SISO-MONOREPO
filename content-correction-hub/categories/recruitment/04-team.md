# Page Template: Recruitment Team (Active Sales Team)

## Page Metadata
- **Page Name**: Recruitment Team
- **Route**: `/partners/recruitment/team`
- **File**: `src/app/partners/recruitment/team/page.tsx` (+ `TeamContent.tsx`)
- **Section**: Recruitment
- **Status**: planning
- **Priority**: release-critical

## Simple Questions (current answers)
1. **What should this page do?**  
   Show the active sales/recruiting team, their readiness (training/compliance), territory/coverage, and allow quick ownership/assignment and coaching actions.
2. **Who uses it?**  
   Recruitment lead, partner managers, and sometimes compliance/finance for readiness checks.
3. **What's working now?**  
   Layout shell + highlight card + blocks for roster, training alerts, coverage gaps.
4. **What's broken/missing?**  
   - Top orange callout should only carry title/subtext; the “18 live partners / invite partner” CTA should move into its own secondary callout.  
   - “Roster” naming off—prefer “Sales team” (or “Active sales team”).  
   - All data is mocked; no real assignments, training/compliance, or coverage feeds.  
   - Component styling may not match preferred fonts/iconography; needs iconified headers.  
   - No ownership/assignment actions; no filters by role/region/segment.  
   - No visibility into readiness (certs, payouts setup) or dormancy signals.
5. **What data should show here?**  
   Team members with role, tier, territory/segment, assignments, activity, readiness (training/compliance), payout readiness, coverage, and dormancy/at-risk flags.
6. **Who needs to approve this?**  
   Recruitment lead (fields/actions), design (layout), compliance (readiness criteria), finance (payout readiness).

## Page Overview
- **Page Goal**: Ensure every recruit has an accountable owner and that owners are trained, compliant, and covering required segments/regions.
- **Persona & Story**: Lead checks if the team is staffed, ready, and balanced; reassigns gaps and triggers coaching where needed.
- **Success Metrics**: Assignment coverage, compliance completion %, training completion %, time-to-respond to recruits, reduction in at-risk/dormant owners.

## Component Structure (target)
| Component | Target State | Notes |
|-----------|--------------|-------|
| Title callout (orange) | Title + subtext only | No KPIs; consistent with global style. |
| KPI/CTA callout | Card for “Live partners” + CTA “Invite partner” + secondary metric (e.g., assignments coverage) | Moves the current metric out of the title card. |
| Team list (“Sales team”) | Table/cards with avatar, role, tier, territory/segment, active recruits count, at-risk/dormant flag, last activity | Rename from “Roster”; add filters (role, segment, region, status). |
| Readiness panel | Training/compliance status (cert expiring, wallet/payout setup, academy checkpoints) with progress bars and actions | Current “Training & compliance” aligns; ensure real data. |
| Coverage map/gaps | Segments/regions with owner and need; ability to create/assign request | Keep concept; ensure writable action “Assign owner”. |
| Actions toolbar | Bulk reassign, send nudge, schedule coaching, export roster | |
| Optional: Mentorship links | Show mentor/mentee pairings or open mentoring slots | TBD. |

## Data & Content Requirements
- **Static**: Role/tier labels, coverage taxonomy (region/segment), readiness criteria definitions, tooltips.
- **Dynamic**: Owners table, assignments counts, training/compliance status, payout readiness, last activity, SLA breaches per owner.
- **User-generated**: Reassignments, coaching tasks, notes.

## Technical Data Plan (draft)
- Tables: `recruit_assignments` (counts per owner), `recruit_touchpoints` (last activity), `recruit_goals` (targets), compliance/training source (Academy + compliance provider) to feed readiness.  
- Computed: active_recruits_count, pending_invites_count, at_risk flag (SLA breaches on owned recruits), readiness_score (training+compliance).  
- Filters: role, region, segment, tier, status (green/action needed/training).  
- Actions: reassign owner, send reminder, mark coaching session; integrate with notifications.

## UI/UX Adjustments (from feedback)
- Title card: trim to title/subtext; move KPIs/CTA to a dedicated callout below.  
- Rename “Roster” → “Sales team”.  
- Ensure headers use icon + title with preferred font scale.  
- Add filters and horizontal-friendly layout if many columns.  
- Show readiness badges (compliance, payout setup, training) inline per member.  
- Make coverage gaps actionable (Assign owner button).

## Glossary (page-relevant)
- **Owner**: recruiter/manager responsible for a recruit set.  
- **Coverage**: region/segment responsibility mapping.  
- **Readiness**: training + compliance + payout setup complete.  
- **At-risk owner**: owner with SLA breaches or low activity across owned recruits.

## Open Questions
- Exact fields for owner card/table (which of: territory, language, certifications, quota, attainment, availability).  
- Readiness thresholds (what counts as compliant/trained/ready).  
- How to source coverage taxonomy (existing list vs new table).  
- Do we support pod-based ownership or single owner only?  
- Should coaching tasks live here or in a separate “automation/ops” area?

## Implementation Checklist
- [ ] Approve component layout (title vs KPI callout, team table, readiness, coverage).  
- [ ] Define owner data contract and readiness formula.  
- [ ] Add filters (role/region/segment/status) and actions (reassign, nudge, coaching).  
- [ ] Wire real data (assignments, training/compliance, coverage).  
- [ ] Accessibility + responsive (horizontal scroll if needed).  
