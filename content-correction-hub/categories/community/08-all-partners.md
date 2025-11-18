# Page Template: All Partners Directory

## Page Metadata
- **Page Name**: All Partners
- **Route**: `/partners/community/all-partners`
- **File**: `src/app/partners/community/all-partners/page.tsx`
- **Section**: Community
- **Status**: content needed (real data)
- **Priority**: next milestone

## Simple Questions
1. **Goal?** Let partners find and contact other partners/mentors.
2. **Who uses it?** All partners; SISO team.
3. **Working now?** Screen renders from mock partnerDirectory; search/filter UI in component.
4. **Broken/missing?** Data mocked; filters unclear (tier/industry/status); actions not wired.
5. **Data needed?** Partner profiles from Supabase; filters for tier, industry, status, location, availability, tags; contact CTA.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Discovery + outreach to the right partner quickly.
- **Persona**: Partner looking for mentor or specialist.
- **Success Metrics**: Searches, filter usage, profile opens, message starts.

## Component Map
| Component | Current State | Target State | CTA | Owner |
|---|---|---|---|---|
| Directory list/cards | Mock profiles | Supabase-backed data; pagination | “View profile / Message” | Frontend |
| Filters | Basic | Tier, industry, availability, tags, location | “Apply filters” | Frontend |
| Actions | None | Message, bookmark, invite to thread | — | Frontend |
| Highlights | None | Optional: counts by tier/availability | — | Data |

## Data & Content Planning
- **Dynamic**: profiles, filters, counts.
- **Static**: helper copy, empty states.

### Technical Plan
- Table `partners` with tier, timezone, focus, headline, wins, clients, availability, tags.
- Query with filters; add search index on name/focus/tags.

## Implementation Checklist
- [ ] Wire directory to Supabase.
- [ ] Build filters and apply queries.
- [ ] Add action buttons (message/bookmark).
- [ ] Empty/loading states.

## Success Criteria
- Real partner data visible.
- Filters work and are fast.
- Message CTA opens conversation composer. 
