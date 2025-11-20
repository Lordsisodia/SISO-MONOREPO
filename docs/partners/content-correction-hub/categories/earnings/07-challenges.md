# Page Template: Challenges

## Page Metadata
- **Page Name**: Challenges
- **Route**: `/partners/earnings/challenges`
- **File**: `src/app/partners/earnings/challenges/page.tsx`
- **Section**: Earnings
- **Status**: content needed
- **Priority**: next milestone

## Simple Questions (draft answers)
1. **What should this page do?** List active/upcoming/completed challenges with rewards, points, and actions.  
2. **Who uses it?** Partners chasing bonuses; ops running seasonal pushes.  
3. **What's working now?** UI scaffolding with control stats, active/upcoming/completed lists, progress bars—data is mock.  
4. **What's broken/missing?** Real challenge definitions, rewards, deadlines, enrollment rules, team vs solo logic, progress calc.  
5. **What data should show here?** Season info, reward types (boosters/points), challenge list with tasks/actions, progress %, deadlines, team membership, enrollment status.  
6. **Who needs to approve this?** Program owner + ops/legal for rewards language.

## AI Analysis (current state)
- **Component Analysis**: HighlightCard, season control stats, challenge cards by status from `earningsChallenges.ts`.  
- **Content Audit**: Placeholder challenge names, rewards, deadlines.  
- **Accessibility**: Progress bars need aria; ensure status text.

## Technical Requirements (initial draft)
- **Data Needs**: challenge catalog (id, type, reward, points, deadline, rules), enrollment state, progress per user/team, team roster.  
- **Integration Points**: Supabase challenges tables; tasks/progress updates; community feed for recaps.  
- **State Management**: server fetch + client mutation for progress updates.

## Page Overview
- **Page Goal**: Drive participation in time-bound earning boosters.  
- **Persona & Story**: Competitive partners and squads.  
- **Success Metrics**: Enrollments, completion rate, boost payouts uplift.

## Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|--------------------|--------------------|-----------|
| Season header/control stats | Mock season/reward | Real season name, deadline, reward | View rules | Ops/FE |
| Active challenges | Mock list | Real active challenges | Update progress | FE |
| Upcoming | Mock list | Real upcoming with enroll CTA | Enroll | FE |
| Completed | Mock list | Real completed with outcomes | View recap | FE |

## Data & Content Planning
- **Static Content**: Section labels, CTA verbs, rules link.  
- **Dynamic Content**: Challenge data, progress %, team info, deadlines.  
- **Media Assets**: Icons only.

## Technical Data Plan (stubs)
- **Tables**: challenges, challenge_tasks, challenge_participants, challenge_progress.  
- **Endpoints**: `/api/earnings/challenges` with status filters.  
- **Caching**: Short (5–15 min); progress mutations realtime.

## Implementation Checklist
- [ ] Define challenge catalog & rewards (percent booster vs points)  
- [ ] Decide cadence (weekly/seasonal) and copy  
- [ ] Implement enrollment + progress update flows  
- [ ] Handle team vs solo rules; show team names when relevant  
- [ ] Add empty/loading/error states

## Validation & Decision Gates
- ✅ Ready when real challenges load and progress updates persist to backend.

## Success Criteria
- **Engagement**: Higher enrollments and completions.  
- **Clarity**: Rules and rewards unambiguous.  
- **Fairness**: Progress logic consistent across team/solo.

## Supporting Context
- Nav: challenges require **Active** tier.

---
