# Section Template: Recruitment

## Section Overview
- **Section Name**: Recruitment
- **Business Owner**: TBD (Partnerships Lead)
- **Technical Lead**: TBD (Supabase + Next.js owner)
- **Content Lead**: TBD (Recruitment/RevOps)
- **Timeline Target**: TBD (set after requirements sign-off)

## Strategic Questions (Working Answers)
1. **Business Priority**: Grow partner salesforce efficiently—higher invite→approval→activation→productive conversion with clear accountability and payouts.
2. **User Journey**: Recruit enters via invite/referral → engages/orientation → applies → compliance → approved → activates with first client → becomes productive or goes dormant → may churn/return.
3. **Content Authority**: Recruitment ops + finance (payout rules), compliance/legal (disclosures), marketing (copy), partnerships leadership (KPIs/targets).
4. **Data Dependencies**: Supabase tables for recruits, stage events, touchpoints, payouts, assignments, goals; real-time updates or polling for stage changes; external compliance provider status.
5. **Cross-Section Links**: Earnings (override payouts), Community (wins/recognition), Academy (recruiter training + certifications), Notifications (SLA breaches), Client Pipeline (overlap/hand-off).

## Current vs Planned Structure

### Current State Analysis (UI exists but mock data; backend incomplete)

| Route | File Location | Component Status | Content Status | Issues | Priority |
|-------|---------------|------------------|----------------|--------|----------|
| `/partners/recruitment/dashboard` | `src/app/partners/recruitment/dashboard/page.tsx` + `.../RecruitmentWorkspace.tsx` | 🔧 Built | 🔄 Mock data | Hard-coded stats/resources/team; no real data wiring | High |
| `/partners/recruitment/prospects` | `src/app/partners/recruitment/prospects/page.tsx` + `ProspectsContent.tsx` | 🔧 Built | 🔄 Mock data | Static table/filters; no Supabase integration or stage taxonomy | High |
| `/partners/recruitment/team` | `src/app/partners/recruitment/team/page.tsx` + `TeamContent.tsx` | 🔧 Built | 🔄 Mock data | Static roster/training; no assignments or alerts from data | Medium |
| `/partners/recruitment/performance` | `src/app/partners/recruitment/performance/page.tsx` + `PerformanceContent.tsx` | 🔧 Built | 🔄 Mock data | Static funnel/leaderboard/actions; no real KPIs | High |
| `/partners/recruitment` | redirect to dashboard | ✅ Built | n/a | OK | Low |

### Planned State (draft targets)

| Route | Target Components | Required Data | Success Metrics | Dependencies | Timeline |
|-------|-------------------|---------------|-----------------|--------------|----------|
| `/partners/recruitment/dashboard` | Hero KPI tiles, mini funnel, velocity chart, SLA/attention list, invite widget | stage counts, stage durations, invites, payouts, SLA breaches | +Conversion %, ↓time-to-activation, SLA breaches ↓ | Supabase tables + stage events, payouts | Week 1 draft |
| `/partners/recruitment/prospects` | Table w/ stage chips, owner, age-in-stage, next action, score; bulk actions; detail side panel; saved views | recruits, stage events, owners, touchpoints, scores | Stage movement %, assignment coverage, response time | Recruits + assignments + touchpoints | Week 1–2 |
| `/partners/recruitment/team` | Roster cards/table, training/compliance alerts, coverage gaps, coaching actions | assignments, certifications, coverage map, alerts from SLAs | % compliant, % ramped, coverage completeness | Links to Academy + compliance provider | Week 2 |
| `/partners/recruitment/performance` | Funnel chart w/ drop-offs, velocity metrics, leaderboard, recommended actions, export | funnel counts/durations, payouts, owner stats | Funnel health, payout accuracy, action completion rate | Aggregations over recruits/payouts | Week 2–3 |

### Gap Analysis (draft)
#### Build
- [ ] Supabase schemas for recruits, stage events, touchpoints, assignments, payouts, goals.
- [ ] API/adapters to fetch aggregated KPIs for dashboard/performance.
- [ ] Realtime/polling hooks for stage changes + SLA alerts.

#### Update
- [ ] Replace mock data in all four pages with live queries.
- [ ] Stage taxonomy + scoring model adoption across UI.
- [ ] Payout displays aligned with finance rules.

#### Reuse
- [ ] `PartnersPageShell`, `HighlightCard`, `SettingsGroupCallout`, badge/tooltip patterns from other sections.

## Implementation Plan (high-level)
- **Phase 1: Foundation**: Finalize stage taxonomy, SLAs, KPIs; lock Supabase schema; stub API/adapters; fixture data for UI.
- **Phase 2: Content Integration**: Wire real data into dashboard/prospects/team/performance; add empty/loading/error states; align copy with definitions.
- **Phase 3: Polish & Testing**: Accessibility, performance, data validation, export/reporting, notifications for SLAs.

## Progress Tracking (initial owners TBD)

| Page | Status | Owner | Due Date | Notes |
|------|--------|-------|----------|-------|
| Dashboard | ⏳ Not Started | TBD | TBD | Needs KPI definitions + data adapters |
| Prospects | ⏳ Not Started | TBD | TBD | Requires stage taxonomy + scoring |
| Team | ⏳ Not Started | TBD | TBD | Depends on assignments + training data |
| Performance | ⏳ Not Started | TBD | TBD | Needs aggregation + payout rules |

## Dependencies & Blockers
- Supabase schema decisions; compliance provider integration; payout policy approval; scoring model weights; ownership rules (single vs pod).

## Technical Risks
- Data sparsity/quality, SLA breach logic correctness, payout miscalculation, realtime sync reliability.

## Validation & Decision Gates
- Stage/definition glossary signed off.
- KPI formulas agreed (with numerators/denominators/time windows).
- Payout eligibility/clawback rules approved by finance/legal.
- Supabase schema freeze before UI wiring.

## Success Criteria (draft)
- **Technical**: APIs return KPIs <300ms cached; error rate <1%; accessibility AA.
- **UX**: Users can assign owner, change stage, and see SLA alerts within 2 clicks.
- **Business**: +X% invite→approval, +Y% approval→activation, +Z% productive rate; SLA breaches trend down.
