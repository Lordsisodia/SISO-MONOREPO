# Page Template: Help Center (Community)

## Page Metadata
- **Page Name**: Community Help Center
- **Route**: `/partners/community/help`
- **File**: `src/app/partners/community/help/page.tsx`
- **Section**: Community
- **Status**: content needed (collections/articles)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Provide Community-specific guides and troubleshooting.
2. **Who uses it?** All partners; SISO support.
3. **Working now?** Screen renders with generic collections (wallet, onboarding, etc.); data from help-center.ts fixture.
4. **Broken/missing?** Collections not community-focused; articles irrelevant; metrics/tags generic.
5. **Data needed?** New collections for Community: Getting Started, Wins Playbook, Announcements & Alerts, Messaging & Threads, Profile & Directory, Troubleshooting + starter articles.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Answer common Community questions without leaving the section.
- **Persona**: Partner unsure how to post/acknowledge/react or troubleshoot.
- **Success Metrics**: Article opens; reduced duplicate questions in General; search success.

## Component Map
| Component | Current State | Target State | CTA | Owner |
|---|---|---|---|---|
| Collections grid | Generic collections | Replace with Community collections | “Open collection” | Content |
| Collection cards | Generic summaries | New summaries per collection | — | Content |
| Search | Present | Ensure indexes over new articles | — | Frontend |
| Contact cards | Present via HelpCenterScreen | Keep; confirm destinations | “Contact support” | Frontend |

## Data & Content Planning
- **Static**: Collection titles/descriptions; starter articles.
- **Dynamic**: Last updated dates; tags.
- **Starter article ideas**:
  - Getting Started: “Post your first message”, “Set notifications for Community”
  - Wins Playbook: “What counts as a win?”, “Win post template”
  - Announcements & Alerts: “How reactions/acks work”, “Understanding severity badges”
  - Messaging & Threads: “DM vs channel post”, “Pinning and archiving threads”
  - Profile & Directory: “Improve your partner card”, “How mentoring flags work”
  - Troubleshooting: “Can’t post in a channel”, “Reactions not saving”

### Technical Plan
- Update `help-center.ts` collections to new set; ensure slugs + static params.
- Optional Supabase-backed articles later; for now static JSON.

## Implementation Checklist
- [ ] Rewrite help-center collections/articles to Community topics.
- [ ] Update generateStaticParams if slugs change.
- [ ] Verify search indexes and tags.

## Success Criteria
- All Help content matches Community use cases.
- Collections and articles render with accurate summaries and dates.
