# Page Template: Achievements

## Page Metadata
- **Page Name**: Achievements
- **Route**: `/partners/earnings/achievements`
- **File**: `src/app/partners/earnings/achievements/page.tsx`
- **Section**: Earnings
- **Status**: content needed
- **Priority**: next milestone

## Simple Questions (draft answers)
1. **What should this page do?** Display badges earned, progress to next badges, and recognition/shoutouts.  
2. **Who uses it?** Partners tracking recognition and boosters.  
3. **What's working now?** UI renders trophy case stats, featured badges, leaderboard snippet, shoutouts, category progress—all using mocks.  
4. **What's broken/missing?** Badge catalog undefined; criteria/rewards fake; leaderboard data placeholder; shoutouts static; refresh cadence unclear (hourly vs daily).  
5. **What data should show here?** Badge list with criteria, rewards, rarity; user progress; shoutouts feed; small leaderboard slice; category breakdowns.  
6. **Who needs to approve this?** Program owner + ops/marketing for rewards.

## AI Analysis (current state)
- **Component Analysis**: HighlightCard, stat tiles, featured badges grid, leaderboard list, shoutouts list, category cards. Data from `earningsAchievements.ts`.  
- **Content Audit**: All placeholder names/metrics.  
- **Accessibility**: Lists ok; check progress bar labels.

## Technical Requirements (initial draft)
- **Data Needs**: badge catalog; user badge progress; rewards; rarity; shoutouts feed; leaderboard slice; category progress.  
- **Integration Points**: Supabase badges + progress; feed to community #wins; leaderboard service (shared with leaderboard page).  
- **State Management**: server fetch + periodic revalidate; client safe for shoutouts stream.

## Page Overview
- **Page Goal**: Motivate partners with clear badge goals and recent recognition.  
- **Persona & Story**: Partners looking for status and boosters.  
- **Success Metrics**: Badge completions; shoutout impressions; click-through to challenges.

## Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|--------------------|--------------------|-----------|
| Trophy case stats | Mock counts | Live earned/total, next badge | View all badges | FE |
| Featured badges | Mock set | Real featured badges | View criteria | FE/Ops |
| Leaderboard slice | Mock | Shared with leaderboard page | View full board | FE |
| Shoutouts | Static list | Live feed (#wins) | Share a win | FE |
| Categories | Mock progress | Real category tracks | See track | FE |

## Data & Content Planning
- **Static Content**: Headings, helper copy.  
- **Dynamic Content**: Badge data, progress values, shoutouts, leaderboard rows.  
- **Media Assets**: Icons/badge art (TBD).

## Technical Data Plan (stubs)
- **Tables**: badges, badge_progress, shoutouts, leaderboard_cache, badge_categories.  
- **Endpoints**: `/api/earnings/achievements`, `/api/earnings/shoutouts`.  
- **Caching**: Revalidate 1h for leaderboard; near-real-time for shoutouts.

## Implementation Checklist
- [ ] Define badge catalog (names, criteria, rewards, rarity)  
- [ ] Decide refresh cadence (hourly vs daily) and align copy  
- [ ] Wire shoutouts to community feed  
- [ ] Add loading/empty states

## Validation & Decision Gates
- ✅ Ready when badge catalog and shoutouts feed are real and leaderboard matches main board.

## Success Criteria
- **Motivation**: Badges clearly tied to earnings outcomes.  
- **Freshness**: Shoutouts feel live.  
- **Consistency**: Leaderboard slice matches main leaderboard.

## Supporting Context
- Nav: Achievements accessible to Starter tier+.

---
