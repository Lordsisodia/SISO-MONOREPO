# Page Template: Workspace Notes (My Notes)

**Use this template for detailed analysis and planning of individual pages**

## Page Metadata
- **Page Name**: Workspace Notes (My Notes)
- **Route**: `/partners/workspace/notes/my-notes`
- **File**: `src/app/partners/workspace/notes/my-notes/page.tsx`
- **Section**: Workspace
- **Status**: planning
- **Priority**: next milestone

## Simple Questions (AI asks you these)
*Provide quick, intuitive answers - AI handles all the complexity*

1. **What should this page do?** (One sentence goal)
2. **Who uses it?** (Just describe the user)
3. **What's working now?** (What parts are actually done)
4. **What's broken/missing?** (Quick list of problems)
5. **What data should show here?** (Just describe in plain English)
6. **Who needs to approve this?** (Legal, subject experts, etc.)

## AI Analysis (AI fills this automatically)

### Current State Assessment
- **Component Analysis**: Simple placeholder text inside `PartnersPageShell`; no notes UI.
- **Content Audit**: No empty-state, tags, or note metadata; no actions.
- **Performance Review**: N/A (no data yet).
- **Accessibility Check**: TBD once editor/list exists.

### Technical Requirements
- **Data Needs**: Note ID, title, body, tags, created/updated, owner, sharing scope, attachments, pinned/archived flags.
- **Component Specifications**: Notes list, search/filter, editor, empty state, sharing controls.
- **Integration Points**: Notes storage, optional AI clean-up/summarize, notifications for shared notes.
- **State Management**: Sync notes list, optimistic save/edit, conflict handling.

## Page Overview
- **Page Goal**: Let partners capture, find, and reuse notes quickly, with clear privacy/sharing rules.
- **Persona & Story**: Partner saves client call notes and action items; returns to find them and share snippets.
- **Success Metrics**: Note creations, retrieval speed/search success, low loss due to sync/conflict.

## Component Structure

### Component Map
*AI fills current state from code analysis, you provide target state*

| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|-------------------|-------------------|------------|
| Notes list | Placeholder | | Open / Edit / Share | |
| Editor | Missing | | Save / Add tags / Share | |
| Filters/search | Missing | | Search / Filter by tag/date | |
| Empty state | Missing | | Create first note | |

## Data & Content Planning
- **Static Content**: Empty-state copy, sharing/privacy explainer, keyboard hints.
- **Dynamic Content**: Notes, tags, pinned items.
- **Media Assets**: Icons for tags/pin/share.

## Implementation Checklist
- [ ] Define note schema + sharing rules
- [ ] Decide editor UX (rich text vs plain, upload support)
- [ ] Search/filter design
- [ ] Empty/error states + accessibility

