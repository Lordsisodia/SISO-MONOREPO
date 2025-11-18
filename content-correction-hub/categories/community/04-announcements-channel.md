# Page Template: Announcements Channel

## Page Metadata
- **Page Name**: Announcements
- **Route**: `/partners/community/announcements` and `/partners/community/channels/announcements`
- **File**: `src/app/partners/community/announcements/page.tsx`
- **Section**: Community
- **Status**: content needed (data wiring)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Deliver official updates with reactions (no replies) and clear CTAs.
2. **Who uses it?** All partners (read/react), SISO team posts.
3. **Working now?** Channel template, hero, highlights, pinned, locked composer.
4. **Broken/missing?** Data mocked; categories/severity not shown; no Supabase feed.
5. **Data needed?** Announcements from Supabase with categories, severity, pinnedUntil, CTA; highlights (last update, upcoming maint, unread).
6. **Approver?** SISO.

## Page Overview
- **Goal**: Single source of truth for program updates.
- **Persona**: Partner checking what changed and where to click next.
- **Success Metrics**: Reaction/ack rate; CTA clicks; zero stale “unread” confusion.

## Component Map
| Component | Current State | Target State | Suggested CTA | Owner |
|---|---|---|---|---|
| Hero | Static pill “Team only” | Keep; surface severity on latest | — | Frontend |
| Highlights | Mock | Live: last update time, unread count, next scheduled maint | — | Data |
| Guidelines | Static | Update to “Reactions only; follow-up in General” | — | Content |
| Quick links | Static | Point to release notes/roadmap/help | “Open” | Frontend |
| Pinned | Mock | Show pinnedUntil + severity badge | “View announcement” | Frontend |
| Timeline | Mock messages | Supabase announcements feed ordered desc | “Open CTA” | Frontend |
| Composer | Locked | Keep locked copy | — | Frontend |

## Data & Content Planning
- **Dynamic**: Announcements list with category, severity, pinnedUntil, CTA; highlights; unread state per user.
- **Static**: Hero text, guidelines.

### Technical Plan
- Table `announcements` with agreed fields.
- Aggregations: unread per user, last update time, upcoming maintenance entry.
- Reactions: write to Supabase; optionally points.

## Implementation Checklist
- [ ] Supabase schema + seed for announcements.
- [ ] Render badges for category/severity; show “Pinned until …”.
- [ ] Compute unread + last updated for highlights.
- [ ] Reactions working; replies disabled.

## Success Criteria
- Feed is live, ordered, categorized; reactions persist.
- Highlights accurate; pinned rules respected.
