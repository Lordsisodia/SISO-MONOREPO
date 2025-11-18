# Recruitment Section Research Phase

**Date**: November 17, 2025  
**Analyst**: AI Assistant (Codex)

## Purpose
Create the discovery packet for the Recruitment section so we can later draft page-specific plans. This focuses on understanding goals, data, personas, and UI needs for recruitment dashboards, prospects, team roster, and referral performance. No final UI decisions yet—just what we need to learn and validate.

## What We Need to Learn (Guiding Questions)
- Business outcome: What single success metric should recruitment move (e.g., qualified partner recruits per week, activation rate, referral-to-active conversion)?
- Personas & roles: Who uses this area daily (partner managers, recruiters, sales leads)? What secondary viewers (finance, execs)?
- Process map: How does a recruit enter, get qualified, onboarded, activated, and measured? What are the key handoffs?
- Definitions: What makes a “prospect,” “active recruit,” “dormant,” “referred,” “qualified,” “activated,” “productive”?
- KPIs & time windows: Which metrics matter (MTD/QTD/rolling 30, cohort views)? What denominators/source-of-truth calculations?
- Actions/CTAs: Core actions per page (invite, assign owner, change stage, log touchpoint, export, trigger payout review).
- Compliance/approvals: Who signs off on referral payout language and eligibility rules?
- Cross-links: Where should recruitment connect to Community (wins posts), Earnings (payouts), Academy (recruiter training), Notifications (alerts on stage changes)?

## Personas (Initial Draft to Validate)
- **Partner Recruitment Lead**: owns pipeline health, needs conversion and time-to-activate views.  
- **Field Recruiter / Partner Manager**: works daily pipeline; needs quick actions, SLAs, reminders.  
- **Finance / Compliance**: validates payout and eligibility rules; needs clear definitions.  
- **Exec/VP Partnerships**: high-level throughput and bottlenecks; compares cohorts over time.

## Data & System Notes (Supabase assumed)
- Source of truth: Supabase tables (to be confirmed). Likely tables: `recruits`, `recruit_status_history`, `referrals`, `payouts`, `owners`, `touchpoints`, `goals`, `segments/tiers`.
- Realtime: consider Supabase realtime for pipeline updates and unread alerts; fallback to polling.
- Identity: recruits may overlap with partner accounts—need canonical ID/join strategy.
- Data hygiene risks: duplicate recruits, missing source, unclear owner, stale stages.

## Page Coverage (what each page must answer later)
1) **Dashboard (`/partners/recruitment/dashboard`)**  
   - What KPIs belong in the hero row? (e.g., new recruits this week, activation rate, time-to-activate, pipeline value)  
   - Which trend charts and time buckets matter?  
   - Alerts: stalled recruits, missing owner, compliance docs pending.

2) **Prospects (`/partners/recruitment/prospects`)**  
   - Canonical columns: name, source, stage, owner, age-in-stage, next action, last touch, likelihood score.  
   - Stage taxonomy and allowed transitions.  
   - Filters/sorts: source, region, segment, stage, owner, SLA breach.  
   - Bulk actions: assign owner, change stage, send invite, export.

3) **Active Sales Team (`/partners/recruitment/team`)**  
   - Roster fields: name, role, territory, tenure, certifications, quotas, attainment %, recent activity.  
   - Health signals: ramp progress, dormancy, coaching flags.  
   - Actions: reassign accounts, schedule coaching, share playbook links.

4) **Referral Performance (`/partners/recruitment/performance`)**  
   - Metrics: referrals submitted, qualified %, activated %, payout eligible %, average days to activation, payout totals.  
   - Slice by source, owner, campaign, cohort date.  
   - Explain math: definitions for “qualified,” “activated,” and payout rules.

## Open Unknowns (to resolve during stakeholder interviews)
- Exact stage names and lifecycle order.  
- SLA expectations (max age per stage, response times).  
- Scoring model (how to rank prospects—static vs behavior-based).  
- Ownership rules (single owner vs pod, auto-assignment).  
- Payout policy (thresholds, clawbacks, cooling-off periods).  
- Compliance requirements (PII handling, consent, audit logs).  
- Localization or regional variations (currencies, tax docs).

## Early UI Considerations (research direction, not final)
- Dashboard: hero KPI tiles, time-range toggle, trend chart, “attention needed” list.  
- Prospects: table with sticky header, stage chips, inline actions, bulk toolbar, side panel for recruit detail.  
- Team: grid/table with filters by role/region, small cards for ramp status, alerts for dormant reps.  
- Performance: dual-view (table + bar chart), definition tooltips, drill-down by source/owner.  
- Cross-page patterns: consistent stage badges, owner avatar + role, SLA color states, inline definitions tooltips.

## Risks & Mitigations
- Ambiguous definitions → standardize glossary before UI wireframes.  
- Data sparsity → design empty/loading states and sampling paths.  
- Mock vs real data → plan fixtures for design/dev until Supabase tables confirmed.  
- Metric disputes → capture formulas with examples and denominators.

## Next Steps
- Validate questions and personas with stakeholders.  
- Inventory existing Supabase tables/fields; draft proposed schemas if gaps.  
- For each page, fill Page Template with goals, data requirements, and component targets once research answers land.  
- Produce glossary of terms and stage taxonomy before UI planning.

---

## Proposed Lifecycle (draft to validate)
**Stage taxonomy (linear, allows backstep on rejection):**  
1) `invited` → 2) `engaged` (orientation booked) → 3) `applied` (form submitted) → 4) `compliance` (docs/KYC) → 5) `approved` → 6) `activated` (first logged client) → 7) `productive` (threshold of deals/earnings) → 8) `dormant` (SLA breach / 0 activity window).  
Allowed quick exits: `rejected`, `duplicate`, `spam`.  
Key timestamps to store: stage entered, stage exited, owner at entry, source/campaign, first activity, last activity, first revenue date.

## SLA Rules (draft)
- Response SLA: outreach within 24h of `invited` or `applied`.  
- Compliance SLA: docs reviewed within 72h of `compliance`.  
- Activation SLA: reach `activated` within 30 days of `approved`.  
- Dormancy rule: 14 days with no activity → flag `dormant`.  
- Escalation: if SLA breached, auto-task + notification to owner and recruitment lead.

## KPI Set (section-level)
- Funnel: invite→approval %, approval→activation %, activation→productive %.  
- Velocity: median days invite→approval, approval→activation.  
- Volume: new invites, approvals, activations (MTD/QTD/rolling 30).  
- Quality: productive rate (productive / approved), average revenue per recruit.  
- Ownership: % recruits with assigned owner; SLA breach count.  
- Payouts: override paid (MTD/QTD), pending payouts, clawbacks.

## Page-Specific KPI & Component Targets (draft)
- **Dashboard**: hero tiles (invites sent, approvals, activations, override paid), velocity chart, attention list (SLA breaches, unassigned), mini funnel chart.  
- **Prospects**: table with stage chips, owner, age-in-stage, next action, score; bulk assign/stage change; side panel detail; saved views by source/segment.  
- **Team**: roster with role/tier, activity summary, training/compliance alerts, coverage gaps by region/segment; actions to reassign or trigger coaching.  
- **Performance**: funnel chart with drop-off %; leaderboard by approvals/activations/payouts; recommended actions; export.

## Scoring Model (draft)
- Inputs: source quality weight, engagement signals (opens/replies/meetings), experience fit, region/language match, historical conversion of source, recency.  
- Output: 0–100 score; bands: 80+ “Hot”, 60–79 “Warm”, <60 “Nurture”.  
- Storage: `score`, `score_updated_at`, `score_reason` (text) for transparency.

## Supabase Data Model (proposed)
- `recruits` (id PK, name, email, source, campaign_id, region, segment, owner_id, current_stage, score, score_reason, created_at, updated_at).  
- `recruit_stage_events` (id, recruit_id FK, stage, entered_at, exited_at, owner_id_at_entry, notes).  
- `recruit_touchpoints` (id, recruit_id FK, type, channel, actor_id, happened_at, notes).  
- `recruit_assignments` (id, recruit_id FK, owner_id, assigned_at, unassigned_at).  
- `recruit_payouts` (id, recruit_id FK, amount_cents, currency, status, eligible_at, paid_at, clawback_reason).  
- `recruit_goals` (id, owner_id, period_start, period_end, target_invites, target_approvals, target_activations, target_payouts).  
- `recruit_segments` lookup (region, industry, tier, language).  
Pending confirmation: whether recruits overlap with partners table (needs join on partner_id).

## UI Audit Notes (current code, placeholders)
- Dashboard view (`RecruitmentWorkspace.tsx`): hard-coded team structure, resources, earnings; stats derived only from mock invites.  
- Prospects (`ProspectsContent.tsx`): static rows and filters; no real data.  
- Team (`TeamContent.tsx`): static roster/training/coverage data.  
- Performance (`PerformanceContent.tsx`): static funnel, leaderboard, actions.  
→ Research outputs must define real data + component behaviors to replace these mocks.

## Glossary (starter)
- **Invite**: outbound or referral link sent, record in `recruits` + stage `invited`.  
- **Approval**: passes compliance; stage `approved`.  
- **Activation**: first revenue-producing client logged; stage `activated`.  
- **Productive**: meets minimum deals or revenue threshold within a window.  
- **Dormant**: no touchpoints or revenue for SLA window.  
- **Owner**: recruiter/partner manager accountable for a recruit.  
- **Override payout**: % of revenue shared with recruiter for activated recruits.

## Assumptions to Validate
- Single owner per recruit at a time; reassignments tracked.  
- Payouts triggered by revenue recognition, not approval.  
- Timezone: display in user’s local; store in UTC.  
- Compliance handled via external service; status pushed into Supabase.
