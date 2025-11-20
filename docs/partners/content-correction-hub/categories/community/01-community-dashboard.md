# Page Template: Community Dashboard

## Page Metadata
- **Page Name**: Community Dashboard
- **Route**: `/partners/community`
- **File**: `src/app/partners/community/page.tsx`
- **Section**: Community
- **Status**: content needed
- **Priority**: release-critical (3-day content pass)

## Simple Questions (AI asks you these)
1. **What should this page do?** Quick pulse of community activity and jump-off widgets to each channel/page.
2. **Who uses it?** All partners (new, active, prime) and SISO team.
3. **What's working now?** Layout, HighlightCard, widget list, highlights callout; navigation links work.
4. **What's broken/missing?** Metrics are hard-coded; widgets limited to Messages/Training Spotlight/Help; highlights use static counts.
5. **What data should show here?** KPIs: new announcements (7d), new wins (7d), unread messages, active threads today, new partners joined (7d), reactions earned (7d); top 3 items per widget where applicable.
6. **Who needs to approve this?** SISO (business/tech/content lead).

## Page Overview
- **Page Goal**: Provide at-a-glance community health and one-click entry to channels.
- **Persona & Story**: Partner lands here to see “what’s new” before choosing a channel.
- **Success Metrics**: Widget click-throughs; reduction in time-to-engage; unread backlog cleared.

## Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|---|---|---|---|---|
| HighlightCard hero | Static “3 active threads” | Live KPIs (active threads today + reactions earned) | “Open General Chat” | Frontend |
| Quick links list | Static widgets | Data-driven widgets per core page (General, Wins, Announcements, Messages, Help) | “Open” | Frontend |
| Highlights callout | Static wins/announcements counts | Replace with decided KPIs list w/ badges, timestamps | “View announcements” | Frontend |

## Data & Content Planning
- **Static Content**: Titles/labels, CTA text.
- **Dynamic Content**: KPI values + short recency strings; per-widget snippets (e.g., latest announcement title, latest win summary).
- **Media Assets**: None.

### Technical Data Plan
- **API Requirements**: Supabase queries for announcements (count 7d, latest title), wins (count 7d, latest summary), messages (unread count), threads (active today), partners joined (7d), reactions earned (7d).
- **Caching Strategy**: Stale-while-revalidate; 5–10 min acceptable.
- **Error Handling**: Fallback to “--” with muted state.

## Implementation Checklist
- [ ] Replace hard-coded metrics with live KPI hooks.
- [ ] Expand widgets array to include General, Wins, Announcements, Messages, Help (data-aware subtitles).
- [ ] Add latest-item preview per widget (one line, optional).
- [ ] Empty/error states for KPIs.

## Success Criteria
- Hero + highlights show live numbers for all six KPIs.
- Widgets cover all Community pages with accurate counts/previews.
- All CTAs deep-link correctly.
