# Page Template: General Chat

## Page Metadata
- **Page Name**: General Chat
- **Route**: `/partners/community/channels/general-chat` (redirect from `/partners/community/general`)
- **File**: `src/app/partners/community/channels/general-chat/page.tsx`
- **Section**: Community
- **Status**: content needed (data wiring)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Open, high-traffic chat for questions, updates, and daily stand-ups.
2. **Who uses it?** All partners + SISO team.
3. **Working now?** Channel screen, hero, highlights/guidelines/pinned, mock messages, composer enabled.
4. **Broken/missing?** Data is mock; guidelines/pins static; reactions/timestamps fake; no Supabase feed.
5. **Data needed?** Live message timeline, counts for highlights, pinned messages, guidelines copy, quick links, composer posting to Supabase.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Fast answers and daily pulse.
- **Persona**: Partner drops a question, expects reply within SLA.
- **Success Metrics**: Replies within target (e.g., <10m), posts per day, reactions.

## Component Map
| Component | Current State | Target State | Suggested CTA | Owner |
|---|---|---|---|---|
| Hero card | Static text | Pull description/pill from preset; keep | — | Frontend |
| Highlights | Mock stats | Live: active today, threads started, avg response | — | Frontend |
| Guidelines | Static | Confirm tone/etiquette; update copy | — | Content |
| Quick links | Static | Validate destinations; align with Help | “Open” | Frontend |
| Pinned | Mock | Live pinned messages from Supabase | “View thread” | Frontend |
| Timeline | Mock messages | Supabase channel feed; reactions, replies | “Reply” | Frontend |
| Composer | Enabled | Post to Supabase; show helper text; attachments? | “Send” | Frontend |

## Data & Content Planning
- **Dynamic**: Messages, reactions, replies count, highlights, pinned, quick links (if from config), SLA metric.
- **Static**: Hero text, guideline copy (can be Supabase-configurable but seed as static).

### Technical Plan
- Table/collection: `community_messages` with channel_id, author, content, reactions, timestamps, pinned flag, tags.
- Queries: latest 50 messages; highlights aggregated per channel; pinned list.
- Reactions: increment with cap if applied globally.

## Implementation Checklist
- [ ] Wire channel presets to Supabase data.
- [ ] Replace mock highlights with aggregated metrics.
- [ ] Enable posting via composer to Supabase.
- [ ] Add loading/empty/error states.

## Success Criteria
- Real-time or near-real-time feed from Supabase.
- Highlights and pinned reflect live data.
- Posting works; reactions recorded; guidelines visible. 
