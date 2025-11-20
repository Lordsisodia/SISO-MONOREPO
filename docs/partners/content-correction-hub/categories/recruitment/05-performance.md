# Page Template: Recruitment Referral Performance

## Page Metadata
- **Page Name**: Referral Performance
- **Route**: `/partners/recruitment/performance`
- **File**: `src/app/partners/recruitment/performance/page.tsx` (+ `PerformanceContent.tsx`)
- **Section**: Recruitment
- **Status**: planning
- **Priority**: release-critical

## Simple Questions (current answers)
1. **What should this page do?**  
   Provide referral funnel health, payout accuracy/velocity, and prioritized actions to improve approvals and activations.
2. **Who uses it?**  
   Recruitment lead, finance/ops (payouts), partner managers tracking performance.
3. **What's working now?**  
   Skeleton for funnel, leaderboard, recommended actions.
4. **What's broken/missing?**  
   All metrics are mock; lacks payout data, filters/time ranges, cohort views, drop-off explanations, and export/reporting. Needs clearer KPI set and definitions.
5. **What data should show here?**  
   Funnel counts/percentages by stage, velocity (invite→approval, approval→activation), payouts (paid/pending/clawbacks), leaderboards (approvals, activations, payouts), and action list driven by SLA/drop-offs.
6. **Who needs to approve this?**  
   Finance (payout rules), recruitment lead (KPIs/actions), legal (disclosures), analytics (formula accuracy).

## Page Overview
- **Page Goal**: Make it obvious where referrals leak, how fast they move, and whether payouts are correct, while surfacing the top fixes.
- **Persona & Story**: Lead checks weekly to spot drop-offs and trigger interventions; finance validates payout pipeline; managers compare recruiter performance.
- **Success Metrics**: Improved conversion at weakest funnel step, shorter time-to-activation, payout accuracy, action completion rate.

## Component Structure (target)
| Component | Target State | Notes |
|-----------|--------------|-------|
| Funnel health | Bar/step chart with counts + % + trend vs prior period; clickable to open filtered view in Prospects | Keep; add trend and click-through. |
| Velocity tiles | Median days invite→approval, approval→activation; trend arrows | Add. |
| Payout panel | Paid MTD/QTD, pending, clawbacks; link to Earnings details | New. |
| Leaderboards | By approvals, activations, payouts; toggle time range; include tie-breaker (velocity) | Keep and expand. |
| Drop-off reasons | List of top reasons (missing compliance, no response, duplicate) with counts | New; ties to actions. |
| Recommended actions | Data-driven tasks (follow-up dormant invites, compliance backlog, incentive test) | Keep but source from data; allow “assign owner”. |
| Filters/time range | Dropdowns for period (7d/30d/QTD), source, owner, segment | Add. |
| Export/report | Button to export CSV or schedule email report | New. |

## Data & Content Requirements
- **Static**: Stage definitions, payout rules summary, reason taxonomy (drop-offs), help text/tooltips.
- **Dynamic**: Stage volumes, conversion %, median durations, payouts by status, leaderboard stats, drop-off counts, actions queue.
- **Computed**: Conversion rates per step; delta vs prior period; velocity medians; payout accuracy; drop-off ranking.
- **User-generated**: Mark action as done, assign owner, add note.

## Technical Data Plan (draft)
- Queries over `recruits`, `recruit_stage_events`, `recruit_payouts`; join with owners and segments.  
- Analytics: aggregate per period and per source/owner; compute medians for durations; compute drop-off reasons from latest stage + last touch reason codes.  
- Actions: generate from rules (e.g., >X dormant invites, compliance backlog >Y, funnel step conversion below threshold).  
- Export: generate CSV from aggregates; option to schedule email (future).

## UI/UX Adjustments
- Add time-range and source/owner filters at top.  
- Make funnel and leaderboard clickable to drill into Prospects with filters applied.  
- Add payout panel and drop-off reasons beside funnel for faster diagnosis.  
- Ensure definitions via tooltips; align fonts/icons with section standards.

## Glossary (page-relevant)
- **Invite→Approval %**: approvals / invites in period.  
- **Approval→Activation %**: activations / approvals in period.  
- **Time-to-activation**: median days from invite to activated.  
- **Payout accuracy**: (paid - clawback adjustments) / expected.  
- **Drop-off reason**: reason tag captured on stage exit or last touch.

## Open Questions
- Exact payout rules (eligibility, clawback window).  
- Time windows to default (7d/30d/QTD?) and need for cohorts.  
- Required slices (source, owner, segment, campaign).  
- Definition of “activation” and “productive” thresholds.  
- Do we show revenue amounts or only counts for privacy?

## Implementation Checklist
- [ ] Confirm KPI formulas, payout rules, and reason taxonomy.  
- [ ] Approve component set (funnel, velocity, payout panel, leaderboard, drop-offs, actions, filters).  
- [ ] Design drill-through to Prospects with applied filters.  
- [ ] Wire aggregates + actions; add export.  
- [ ] Add tooltips/definitions; accessibility pass.  
