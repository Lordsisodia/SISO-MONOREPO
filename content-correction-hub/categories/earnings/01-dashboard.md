# Page Template: Earnings Dashboard

## Page Metadata
- **Page Name**: Earnings Dashboard
- **Route**: `/partners/earnings`
- **File**: `src/app/partners/earnings/page.tsx`
- **Section**: Earnings
- **Status**: content needed
- **Priority**: release-critical

## Simple Questions (draft answers)
1. **What should this page do?** Show next payout, quick links, and trending earnings signals at a glance.  
2. **Who uses it?** Partners checking cashflow and where to click next.  
3. **What's working now?** Layout and components render; HighlightCard, quick links, trending block.  
4. **What's broken/missing?** All numbers are placeholder; payout logic not wired; trending signals not defined; shell uses CommunityPageShell instead of EarningsPageShell.  
5. **What data should show here?** Next payout amount/date, available balance summary, commission rate, streaks, top deals; real links to wallet/overview/tier.  
6. **Who needs to approve this?** SISO finance/ops; content lead.

## AI Analysis (to fill after data decisions)

### Current State Assessment
- **Component Analysis**: HighlightCard + SettingsGroupCallout blocks with static text/values.
- **Content Audit**: `$4,200 next payout`, “What’s trending” hard-coded.
- **Performance Review**: N/A (static).
- **Accessibility Check**: Needs ARIA review once data wired.

### Technical Requirements (initial draft)
- **Data Needs**: next payout amount/date, commission rate, payout streak, top deals (by value), quick link targets.  
- **Integration Points**: Supabase (payouts/ledger); deals service for top deals; commission rules service for rate.  
- **State Management**: server data fetch or client SWR; loading/empty/error states for each metric.

## Page Overview
- **Page Goal**: Instantly answer “When/what is my next payout?” and route users to details.
- **Persona & Story**: Active partners checking earnings before starting their day.
- **Success Metrics**: Reduced support asks about payouts; click-through to wallet/overview; time-on-page <10s to find payout info.

## Component Structure

### Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|--------------------|--------------------|-----------|
| HighlightCard | Static payout copy | Live next payout + currency toggle | Open wallet | FE |
| Quick links list | Static links | Same, gated by tier | Open | FE |
| Trending block | Static text | Live commission rate, streak, top deals | View overview | FE |

## Data & Content Planning
- **Static Content**: Headings, CTA labels (“Open wallet”, “What’s trending”).  
- **Dynamic Content**: Next payout amount/date; commission rate; payout streak; top deals list.  
- **Media Assets**: None expected.

## Technical Data Plan (stubs)
- **Tables Needed**: payouts, ledger, deals (for top deals).  
- **Endpoints**: `/api/earnings/next-payout`, `/api/earnings/top-deals`, `/api/earnings/rate`.  
- **Caching Strategy**: Revalidate on focus; server caching 60s for top deals.

## Implementation Checklist
- [ ] Replace CommunityPageShell with EarningsPageShell (confirm)  
- [ ] Wire next payout to Supabase table  
- [ ] Define “trending” metrics and sources  
- [ ] Add loading/empty/error states  
- [ ] Currency display rules (USD default, toggle)

## Validation & Decision Gates
- ✅ Ready when no placeholder numbers remain and payout path is one-click to wallet.

## Success Criteria
- **Performance**: First paint <2s with data.  
- **Accuracy**: Payout values match ledger.  
- **UX**: User can find payout info in <5s.

## Supporting Context
- **Nav config**: Dashboard hidden, tierRequired starter (nav JSON).

---
