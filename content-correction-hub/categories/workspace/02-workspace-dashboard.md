# Page Template: Workspace Dashboard

**Use this template for detailed analysis and planning of individual pages**

## Page Metadata
- **Page Name**: Workspace Dashboard
- **Route**: `/partners/workspace`
- **File**: `src/app/partners/workspace/page.tsx`
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
- **Component Analysis**: HighlightCard shows “2 urgent tasks”; SettingsGroupCallout lists quick tools; WorkspaceDemoClient renders demo data.
- **Content Audit**: Metrics, CTA targets, demo client content are mock/static.
- **Performance Review**: Lightweight page; no data loading yet.
- **Accessibility Check**: Uses shared shell; need to confirm ARIA for cards/links.

### Technical Requirements
- **Data Needs**: Urgent-task count, today/next event summary, live links for shortcuts, demo client feed source.
- **Component Specifications**: KPI/hero cards, quick links, activity/demo widget.
- **Integration Points**: Tasks service, calendar service, client/pipeline data for demo widget.
- **State Management**: Server data fetch + client actions for CTAs; fallback states.

## Page Overview
- **Page Goal**: Establish a start-of-day command center with actionable KPIs and direct jumps to tasks, calendar, files, and notes.
- **Persona & Story**: Partner logs in to see what needs attention today and where to go first; wants one-click access to work.
- **Success Metrics**: CTA click-through, urgent-task clear rate, daily opens, time-to-first-action.

## Component Structure

### Component Map
*AI fills current state from code analysis, you provide target state*

| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|-------------------|-------------------|------------|
| Hero/Highlight card | Static “2 urgent tasks” + CTA to calendar | | Open calendar / Open urgent task list | |
| Quick tools list | Static links (Tasks, My Notes, Files) | | CTA per tool (Tasks, Files, Notes) | |
| Demo client widget | Demo data via `WorkspaceDemoClient` | | Open client record / pipeline | |

### Component Details

#### Hero/Highlight card
- **Purpose**: Show top KPI and primary CTA.
- **Current Implementation**: Uses `HighlightCard` with hardcoded metric/CTA.
- **Required Data**: Urgent count + label, CTA destination, secondary metric (today’s events?).
- **User Interactions**: Primary button click; possible secondary link.
- **Error States**: Fallback to 0 urgent/“No issues”.
- **Accessibility Requirements**: ARIA label for the card and button.
- **Performance Considerations**: Server-fetch KPI to avoid flicker.

#### Quick tools list
- **Purpose**: Fast navigation to core tools.
- **Current Implementation**: Static links.
- **Required Data**: Confirm destinations; optionally badges (counts).
- **User Interactions**: Link clicks.
- **Error States**: None; static.
- **Accessibility Requirements**: Link semantics; focus order.

#### Demo client widget
- **Purpose**: Show client snapshot; drive into pipeline.
- **Current Implementation**: Demo data via `WorkspaceDemoClient` + `demoChannelCategories`.
- **Required Data**: Real client summary or remove/replace.
- **User Interactions**: Card actions to open client/pipeline.
- **Error States**: Placeholder if no client assigned.
- **Accessibility Requirements**: Card labeling.
- **Performance Considerations**: Lazy load if heavy.

## Data & Content Planning

### Content Requirements
- **Static Content**: Headings, helper text, empty-state messages.
- **Dynamic Content**: KPI values, client snapshot, quick-link badges.
- **User-Generated Content**: None here.
- **Media Assets**: Icons for KPIs/tools.

### Technical Data Plan
*AI generates this based on your requirements (to be filled once inputs arrive).*

## Implementation Checklist
- [ ] Requirements clear (urgent definition, KPIs, CTA targets)
- [ ] Design finalized (card layout, badges)
- [ ] Data sources confirmed (tasks, calendar, client/pipeline)
- [ ] Placeholder removal (metrics, demo data)
- [ ] Accessibility + empty/error states

