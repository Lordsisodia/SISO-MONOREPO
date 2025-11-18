# Page Template: Help Collection Page

## Page Metadata
- **Page Name**: Help Collection Detail
- **Route**: `/partners/community/help/[collection]`
- **File**: `src/app/partners/community/help/[collection]/page.tsx`
- **Section**: Community
- **Status**: content needed (collections/articles)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Show all articles within a Community collection with navigation.
2. **Who uses it?** All partners.
3. **Working now?** Renders with generic collections; not community-specific.
4. **Broken/missing?** Collection slugs/titles wrong for Community; article lists irrelevant; navigation tags generic.
5. **Data needed?** Community collections/articles per help-center plan; correct slugs for static params.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Let partners browse a focused set of Community help topics without search.
- **Persona**: Partner drilling into Wins or Messaging guidance.
- **Success Metrics**: Article opens and completion; reduced repeated questions.

## Component Map
| Component | Current State | Target State | CTA | Owner |
|---|---|---|---|---|
| Collection header | Generic title/desc | Community collection title/desc | — | Content |
| Article list | Generic | Community articles with lastUpdated | “Open article” | Content |
| Tags | Generic | Community-relevant tags | — | Content |

## Data & Content Planning
- **Static**: collection descriptors; article titles/summaries; lastUpdated dates; tags.
- **Dynamic**: none (static data acceptable v1).

### Technical Plan
- Update `help-center.ts` to new collections; ensure `generateStaticParams` emits new slugs.
- Article body content authored in same data file for now.

## Implementation Checklist
- [ ] Replace collection data in `help-center.ts`.
- [ ] Update slugs/static params.
- [ ] Verify page renders each collection with correct articles.

## Success Criteria
- Collection detail shows Community-specific articles with correct slugs and summaries.
