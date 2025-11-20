# Page Template: Tier Progression

## Page Metadata
- **Page Name**: Tier Progression
- **Route**: `/partners/earnings/tier-progression`
- **File**: `src/app/partners/earnings/tier-progression/page.tsx`
- **Section**: Earnings
- **Status**: content needed
- **Priority**: next milestone

## Simple Questions (draft answers)
1. **What should this page do?** Show current tier, requirements to the next tier, benefits by tier, and missions to accelerate progress—with a clear visual ladder.  
2. **Who uses it?** Partners motivated by unlocks/commission boosts.  
3. **What's working now?** UI skeleton with hero, progress gauges, benefits table, missions list, tier history—fed by mock data.  
4. **What's broken/missing?** Tier names/thresholds not defined; metrics fake; benefits table fictional; missions not real; tier history static; hero lacks visual ladder; metrics need info-tooltips.  
5. **What data should show here?** Current tier, next tier, points/metrics toward unlock, benefits per tier, missions with rewards, history of upgrades.  
6. **Who needs to approve this?** SISO program owner + finance/legal for rates/claims.

## AI Analysis (current state)
- **Component Analysis**: hero progress, metrics grid, benefits matrix, missions list, history list; data from `tierProgression.ts`.  
- **Content Audit**: Uses tiers Starter/Active/Prime/Collective conflicting with nav tiers (starter/active/performer/elite).  
- **Accessibility**: Tables OK; ensure row/col headers announced.

## Technical Requirements (initial draft)
- **Data Needs**: tier catalog (ids, names, thresholds, benefits); partner tier state (current tier, points, next tier ETA); missions tasks; history events.  
- **Integration Points**: Supabase tier_state, tier_history, missions definitions; possibly badge service.  
- **State Management**: server fetch + occasional revalidate; mission actions maybe mutate.

## Page Overview
- **Page Goal**: Make advancement path obvious and actionable.  
- **Persona & Story**: Active/Performer partners chasing better rates.  
- **Success Metrics**: Increased mission completions; tier upgrades; reduced support “how to level up” questions.

## Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|--------------------|--------------------|-----------|
| Hero progress | Mock tier/percent | Dual callout with horizontal ladder markers (Starter→Active→Performer→Elite), current badge, % to next, ETA, “Ask for review” | Ask for review | FE |
| Metrics grid | Mock values | Real thresholds (revenue, deals, NPS) each with “i” tooltip explaining calc/source + daily refresh chip | View rules | FE |
| Tier carousel | None | Card-per-tier with dots/next/prev; shows commission rate, 3 headline perks, unlock summary | Browse tiers | FE |
| Requirements panel | None | Shows current vs target for next tier (value, target, delta) for the 3 unlock metrics | See how to hit this | FE |
| Benefits table | Fictional perks | Real benefits per tier (compact/collapsible) | Download perks | Ops |
| Missions list | Fictional missions | Real accelerators with rewards (can be hidden/“coming soon” until ready) | Start mission | Ops/FE |
| Tier history | Static two rows | Real upgrades over time (collapsed by default) | Export history | FE |

## Data & Content Planning
- **Static Content**: Headings, helper copy, CTA labels.  
- **Dynamic Content**: Tiers, thresholds, benefits, missions, history events, tooltips text per metric, ladder progress (% and ETA).
- **Media Assets**: Icons only.

## Technical Data Plan (stubs)
- **Tables**: tiers, tier_benefits, partner_tier_state, tier_history, tier_missions.  
- **Endpoints**: `/api/earnings/tier` (state + catalog).  
- **Caching**: ISR 5–15 min; missions actions uncached; tooltips copy static.

## Implementation Checklist
- [ ] Finalize tier names + thresholds + commission rates (Starter/Active/Performer/Elite)  
- [ ] Align nav gating with UI tiers  
- [ ] Add hero ladder/graph (horizontal markers) with dual callout styling  
- [ ] Convert metrics to include info-tooltips (i icon) explaining calculation/source  
- [ ] Add tier carousel (card-per-tier with dots/next/prev)  
- [ ] Add requirements panel with current/target/delta for next tier  
- [ ] Define missions and rewards (pts/boosters) or hide behind “coming soon”  
- [ ] Compact/collapsible benefits table; optional perks PDF link  
- [ ] Tier history collapsed by default  
- [ ] Add loading/empty/error for each block  
- [ ] Add “request review” flow (manual override)

## Validation & Decision Gates
- ✅ Ready when tier names/thresholds/benefits are confirmed and data flows are live.

## Success Criteria
- **Accuracy**: Requirements match policy.  
- **Clarity**: Users see exactly what to do next.  
- **Motivation**: Missions/rewards drive action.

## Supporting Context
- Nav tiers: starter/active/performer/elite; reconcile with UI tiers.

---
