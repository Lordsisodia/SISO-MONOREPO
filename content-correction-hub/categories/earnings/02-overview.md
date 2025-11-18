# Page Template: Earnings Overview

## Page Metadata
- **Page Name**: Earnings Overview
- **Route**: `/partners/earnings/overview`
- **File**: `src/app/partners/earnings/overview/page.tsx`
- **Section**: Earnings
- **Status**: content needed
- **Priority**: release-critical

## Simple Questions (draft answers)
1. **What should this page do?** Summarize payout pipeline, projections, and quick actions.  
2. **Who uses it?** Partners monitoring cycle health and pending reviews.  
3. **What's working now?** Layout with HighlightCard, snapshot stats, pipeline stages, opportunities, payout history table, quick actions buttons.  
4. **What's broken/missing?** All figures mocked; pipeline stages not tied to real deals; opportunities are fictional; payout history static.  
5. **What data should show here?** MTD payouts, next payout date, projected cycle amount, pending reviews count, stage counts with SLAs, upcoming opportunities/promos, last N payouts with status, quick actions tied to real flows.  
6. **Who needs to approve this?** SISO finance/ops + marketing for promos.

## AI Analysis (current state)
- **Component Analysis**: uses data from `earningsOverview.ts` (mock).  
- **Content Audit**: Summaries, stage counts, payout history all static.  
- **Accessibility**: Tables need header associations; check badge contrast.

## Technical Requirements (initial draft)
- **Data Needs**: payout summary (from payouts/ledger), projected cycle calc, pending reviews (compliance), stage counts (deal pipeline), opportunities feed (ops/marketing), payout history (payouts table).  
- **Integration Points**: Supabase payouts & ledger; deals/pipeline service; promotions config; compliance service for reviews.  
- **State Management**: server fetch with ISR; client polling optional for stage counts.

## Page Overview
- **Page Goal**: Give a trustworthy “pulse” of earnings and actions to improve it.  
- **Persona & Story**: Active/Performing partners checking cycle trajectory.  
- **Success Metrics**: Reduced “when do I get paid?” tickets; clicks on opportunities; decrease in pending reviews backlog.

## Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|--------------------|--------------------|-----------|
| Hero HighlightCard | Mock stats | Live MTD/next payout/projection | View payout calendar | FE |
| Snapshot stats | Mock | Live pipeline-derived numbers | Open pipeline view | FE |
| Pipeline to payout | Static 4 stages | Real stage counts & SLAs | View details | FE |
| Opportunities | Fictional promos | Real promos/boosters | Activate | Ops/FE |
| Payout history table | Static 4 rows | Live last N payouts | Export | FE |
| Quick actions | Static buttons | Contextual actions (submit proof, connect wallet) | Action per button | FE |

## Data & Content Planning
- **Static Content**: Section headings; column labels; CTA labels.  
- **Dynamic Content**: All metrics, promos, history rows.  
- **Media Assets**: None expected.

## Technical Data Plan (stubs)
- **Tables**: payouts, deals_pipeline, promotions, compliance_reviews.  
- **Endpoints**: `/api/earnings/overview` aggregating the above.  
- **Caching**: 60s ISR; actions uncached.

## Implementation Checklist
- [ ] Define projection formula (e.g., weighted pipeline)  
- [ ] Map pipeline stages to deal statuses + SLA labels  
- [ ] Replace opportunities with real promos feed  
- [ ] Add export statements (CSV/PDF)  
- [ ] Add loading/empty/error UI for table and cards

## Validation & Decision Gates
- ✅ Ready when all metrics pull live data and export works.

## Success Criteria
- **Accuracy**: Stage counts match pipeline backend.  
- **Clarity**: Helper text explains projections/SLAs.  
- **Engagement**: Promo activation clicks tracked.

## Supporting Context
- **Nav**: Available to Starter tier and up.

---
