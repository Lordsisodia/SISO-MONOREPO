# Page Template: Help Article Page

## Page Metadata
- **Page Name**: Help Article
- **Route**: `/partners/community/help/[collection]/[article]`
- **File**: `src/app/partners/community/help/[collection]/[article]/page.tsx` (rendered via data helpers)
- **Section**: Community
- **Status**: content needed (articles)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Show a single Community help article with sections and navigation.
2. **Who uses it?** All partners.
3. **Working now?** Renders generic articles (wallet, onboarding).
4. **Broken/missing?** Article content not Community-focused; tags/dates generic.
5. **Data needed?** Community articles per new collections; updated summaries, sections, lastUpdated; breadcrumbs.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Provide definitive answer for a Community topic.
- **Persona**: Partner following from search or collection list.
- **Success Metrics**: Article completion, reduced repeat questions, time-on-page.

## Component Map
| Component | Current State | Target State | CTA | Owner |
|---|---|---|---|---|
| Article header | Generic | Community-specific title, summary, lastUpdated | — | Content |
| Body sections | Generic | Authored sections per topic | — | Content |
| Tags | Generic | Community tags | — | Content |
| Related links | Minimal | Link to sibling articles or channel | “Back to collection” | Frontend |

## Data & Content Planning
- **Static**: article bodies, headings, tags, lastUpdated.
- **Dynamic**: none for v1.

### Technical Plan
- Update articles in `help-center.ts`; ensure getHelpArticle returns new entries.
- Maintain ISO date strings for static params.

## Implementation Checklist
- [ ] Author Community articles and update data file.
- [ ] Verify routing with new slugs.
- [ ] Add related links per collection.

## Success Criteria
- Articles show correct content, metadata, and navigation back to collection. 
