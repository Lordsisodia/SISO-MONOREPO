# Page Template: Workspace Tasks

**Use this template for detailed analysis and planning of individual pages**

## Page Metadata
- **Page Name**: Workspace Tasks
- **Route**: `/partners/workspace/tasks`
- **File**: `src/app/partners/workspace/tasks/page.tsx`
- **Section**: Workspace
- **Status**: planning
- **Priority**: release-critical

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
- **Component Analysis**: `TasksWorkspaceScreen` is rendered but currently placeholder; task schema not defined.
- **Content Audit**: Status/priority labels, owners, and CTA copy (“mark as done”) are undefined.
- **Performance Review**: No heavy data yet; depends on task list size.
- **Accessibility Check**: Need ARIA for lists/controls once built.
- **User Feedback (Nov 17, 2025)**:
  - Remove “quick actions” block; not needed.
  - Remove filters (keep page lean).
  - Keep “Task pulse” metrics card.
  - Keep “Due today” section.
  - Replace current list/board UI with the `TaskUI` component imported from SISO-internal (use that as primary task renderer).

### Technical Requirements
- **Data Needs**: Task ID, title, description, status, priority, due date, owner, client/deal link, tags, blockers.
- **Component Specifications**: Use `TaskUI` component (from SISO-internal) as main list/board; “Task pulse” metric card; “Due today” list; no extra filters or quick actions.
- **Integration Points**: Task service (create/update/complete), notifications for due/overdue, links to Client Pipeline.
- **State Management**: Server data + client updates; optimistic mutations for complete/defer.

## Page Overview
- **Page Goal**: Give partners a fast, actionable task view with clear priorities and completion flow.
- **Persona & Story**: Partner triages work for the day, marks done, reassigns or reschedules.
- **Success Metrics**: Tasks completed per day, overdue reduction, completion latency, filter usage.

## Component Structure

### Component Map
*AI fills current state from code analysis, you provide target state*

| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|-------------------|-------------------|------------|
| Task list/board | Placeholder | Use `TaskUI` component from SISO-internal | Mark done / Open task / Reassign | |
| Filters bar | Placeholder | Remove (not needed) | — | |
| Bulk actions | Placeholder | TBD inside `TaskUI` if provided | Complete / Defer / Assign | |
| Task detail drawer | Placeholder | Use `TaskUI` detail pattern if available | Update / Comment / Link file | |

### Component Details (examples)

#### Task list/board
- **Purpose**: Show actionable tasks.
- **Current Implementation**: Placeholder.
- **Required Data**: Status, priority, due, owner, client, tags.
- **User Interactions**: Complete, reopen, edit, reassign, add note/file.
- **Error States**: Empty list; API failure fallback.
- **Accessibility Requirements**: Keyboard, roles for list/controls.
- **Performance Considerations**: Pagination/virtualization for long lists.

#### Filters bar
- **Purpose**: Narrow to relevant tasks.
- **Current Implementation**: TBD.
- **Required Data**: Status/priority enums, owner list, client list.
- **User Interactions**: Multi-select chips, quick “Today/Overdue”.
- **Error States**: Safe defaults; clear filters.

## Data & Content Planning
- **Static Content**: Headings, helper text, empty-state copy.
- **Dynamic Content**: Task data, counts by status, SLA badges.
- **Media Assets**: Status/priority icons, client logos (optional).

## Implementation Checklist
- [ ] Define task schema (status/priority enums, ownership)
- [ ] Decide layout (list vs board) and CTA copy
- [ ] Confirm API endpoints and mutations
- [ ] Empty/error states + accessibility
