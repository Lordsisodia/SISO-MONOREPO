# Page Template: Wins Channel

## Page Metadata
- **Page Name**: Wins
- **Route**: `/partners/community/channels/wins` (redirect from `/partners/community/wins`)
- **File**: `src/app/partners/community/channels/wins/page.tsx`
- **Section**: Community
- **Status**: content needed (data wiring)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Celebrate wins (deals, courses, challenges, new partners, earning milestones) with auto-posts.
2. **Who uses it?** All partners (view/react), SISO automation posts.
3. **Working now?** Layout via shared channel template; composer locked; mock highlights/pins/messages.
4. **Broken/missing?** No real data; schema not applied; reactions mocked; auto-post pipeline absent.
5. **Data needed?** Supabase wins feed with agreed schema; highlight aggregates; pinned guidance; reaction totals.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Social proof and learn-from-others in one scroll.
- **Persona**: Partner scanning wins for replicable hooks.
- **Success Metrics**: Win reactions, click-through to linked assets, new posts auto-created.

## Component Map
| Component | Current State | Target State | Suggested CTA | Owner |
|---|---|---|---|---|
| Hero | Static “Read-only” pill | Keep pill; pull desc from config; add dynamic counts | — | Frontend |
| Highlights | Mock (Deals celebrated, Avg deal size) | Live aggregates by week | — | Data |
| Guidelines | Static | Align with win schema fields; keep concise | — | Content |
| Quick links | Static | Point to help articles + leaderboard | “Open” | Frontend |
| Pinned | Single mock card | Pull pinned tips from Supabase/config | “View template” | Content |
| Timeline | Mock messages | Auto posts from Supabase `wins` table; reactions | “View details” | Frontend |
| Composer | Locked | Keep locked; show unlock rule copy | — | Frontend |

## Data & Content Planning
- **Dynamic**: Wins feed, reactions, highlights, pinned, quick links.
- **Static**: Unlock copy, pill text, guideline titles (configurable).

### Technical Plan
- Table `wins` with agreed fields (base + per-type).
- Aggregations: wins per week, avg deal size, top reaction count.
- Auto-ingest from upstream events (deals, course completions, challenges, new partner joins, earnings milestones).

## Implementation Checklist
- [ ] Create Supabase `wins` schema + seed.
- [ ] Wire channel feed + highlights to Supabase.
- [ ] Render per-type badges/icons; link CTA to source (deal/course/challenge).
- [ ] Reactions write to Supabase; respect points rules.

## Success Criteria
- Every win in feed is real-time from Supabase; no mocks.
- Highlights reflect live aggregates.
- Reactions persist; composer remains locked/read-only. 
