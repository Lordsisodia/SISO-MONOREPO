# Page Template: Leaderboard

## Page Metadata
- **Page Name**: Leaderboard
- **Route**: `/partners/earnings/leaderboard`
- **File**: `src/app/partners/earnings/leaderboard/page.tsx`
- **Section**: Earnings
- **Status**: content needed
- **Priority**: next milestone

## Simple Questions (draft answers)
1. **What should this page do?** Rank partners by earnings metrics and show movement.  
2. **Who uses it?** Competitive partners and program managers.  
3. **What's working now?** UI tabs (overall/region/industry/newcomers) and rows rendered with mock data.  
4. **What's broken/missing?** Metrics, ranks, and refresh cadence placeholder; scopes undefined; privacy not specified.  
5. **What data should show here?** Ranking metric (payouts this season? points?), trend deltas, filters (region/industry/tenure), refresh cadence (daily), cohort visibility rules.  
6. **Who needs to approve this?** Program owner + legal (privacy).

## AI Analysis (current state)
- **Component Analysis**: HighlightCard + SettingsGroupCallout with Tabs; data from `earningsAchievements.ts`.  
- **Content Audit**: Leaderboard entries fictional.  
- **Accessibility**: Tabs need aria-controls; ensure table semantics if added later.

## Technical Requirements (initial draft)
- **Data Needs**: leaderboard dataset with rank, metric value, trend; segment filters; user’s own row; privacy flags.  
- **Integration Points**: Supabase leaderboard view/materialized table; filters via query; cache.  
- **State Management**: server render with ISR daily; client tab switch uses filtered data set.

## Page Overview
- **Page Goal**: Provide transparent standings and motivate improvement.  
- **Persona & Story**: Active/elite partners benchmarking themselves.  
- **Success Metrics**: Increased challenge enrollments; reduced “where am I ranked?” questions.

## Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|--------------------|--------------------|-----------|
| Leaderboard hero | Empty metrics | Show season, refresh cadence | View rules | FE |
| Tabs | Static labels | Real scopes (global/region/industry/new) | Switch scope | FE |
| Rows | Mock | Live ranks with “you” highlighted | View profile | FE |

## Data & Content Planning
- **Static Content**: Scope labels, helper copy, privacy note.  
- **Dynamic Content**: Ranks, metrics, trends, season info.  
- **Media Assets**: Medal icons.

## Technical Data Plan (stubs)
- **Tables**: leaderboard_seasonal, leaderboard_segments.  
- **Endpoints**: `/api/earnings/leaderboard?scope=overall|region|industry|newcomers`.  
- **Caching**: Rebuild daily (or hourly if decided); client cache per tab.

## Implementation Checklist
- [ ] Decide primary metric and season window  
- [ ] Define scopes and filtering rules  
- [ ] Add privacy rules (hide opt-outs, anonymize beyond top N?)  
- [ ] Align refresh copy (daily per user note)  
- [ ] Add empty/loading/error states

## Validation & Decision Gates
- ✅ Ready when metric, cadence, and privacy rules are approved and ranks load from backend.

## Success Criteria
- **Fairness**: Clear rules for ranking and tie-breaks.  
- **Transparency**: Users see how to improve rank.  
- **Compliance**: Privacy handled per policy.

## Supporting Context
- Nav: leaderboard requires **Active** tier; confirm gating in UI copy.

---
