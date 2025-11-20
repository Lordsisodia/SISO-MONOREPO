# Workspace Section Research Phase

**Date**: November 17, 2025  
**Analyst**: AI Assistant (Codex)

## Phase 1: Strategic Requirements (User Feedback)

### 🎯 Primary Business Priority
- Make Workspace the daily command center: calendar, tasks, files, and notes in one place, replacing all placeholder/mock data with accurate partner workflows.
- Keep the “urgent tasks” and demo client concept, but ground them in real metrics and live data (what counts as “urgent” still needs definition).

### 🛤️ User Journey Understanding
- **Workspace dashboard**: quick snapshot of urgent tasks, schedule, and shortcuts to core tools.
- **Calendar**: partner meetings, office hours, deadlines.
- **Tasks**: owned work with statuses and “mark as done” CTA.
- **Files**: decks/templates/contracts with permissions and metadata.
- **My notes**: personal or shared notes; needs clear empty-state copy.

### 📝 Content Authority & Creation Process
- Business/content owners: TBD (need names for business lead, technical lead, content lead, approval flow).
- Approval needed for: file permissions language, compliance on client data, any earnings/commitment claims tied to tasks.

### 📊 Data Requirements
- **Real-time / dynamic**: calendar events, task lists (owner, status, priority), file metadata (permissions, last updated), notes content.
- **Static**: quick tool links, empty-state messaging, default filters/categories.
- **Sync cadence**: TBD (do we poll APIs, rely on webhooks, or load server-side once per session?).

### 🔗 Cross-Section Integration Strategy
- Workspace ↔ Notifications: task due alerts, meeting reminders, file-share confirmations.
- Workspace ↔ Earnings: surface tasks or files that drive commission milestones.
- Workspace ↔ Community: optionally share wins/notes or request help on tasks.
- Workspace ↔ Client Pipeline: tie tasks/files/events to specific deals or clients.

### ✅ Business Success Criteria (needs confirmation)
- Partners adopt Workspace as start-of-day view; urgent items are cleared daily.
- Live calendar/task data (no mocks) with reliable freshness.
- Clear permissions and compliance copy for files/notes.
- Reduced time to find decks/templates and to close out tasks.

## Enhanced Requirements & Open Questions

### Data Ownership & Permissions
- Do tasks/events/files belong to individuals, teams, or client accounts?  
- What are the permission tiers (owner/edit/view/download) and default settings?  
- Are notes always private, or do we allow sharing to team/client?  

### “Urgent” Definition & KPI Cards
- Criteria for urgent tasks (due date? priority? client impact?).  
- Which metrics headline the dashboard (e.g., tasks due today, meetings next 24h, files awaiting approval)?  
- Do we need SLA-style flags (overdue, blocked)?  

### Files & Compliance
- Allowed file types and size caps?  
- Required metadata: owner, client, category, last updated, access level, expiration?  
- Download/share wording that satisfies privacy/compliance?  

### Calendar Experience
- Default view (week vs month), filters (client, owner, type), and event categories (client calls, office hours, deadlines).  
- Do we support availability/booking links from here?  

### Tasks Experience
- Status taxonomy (e.g., todo / in progress / blocked / done) and priority levels.  
- Single owner vs multi-owner; are tasks linked to deals/clients?  
- Exact CTA copy for completion and for reassigning/deferring.  

### Notes Experience
- Note types (ideas, follow-ups, meeting minutes) and tagging.  
- Empty-state tone (motivational vs informative).  
- Any template snippets or AI-assist for note cleanup?  

### Integration & Data Sources
- Which systems feed calendar, tasks, and files (internal API, Google/Microsoft, Notion, etc.)?  
- Do we need offline or cached states?  

## Page-by-Page Analysis (Current vs Needs)

| Route | File | Current State (per repo) | Content/Data Needs | Priority |
| --- | --- | --- | --- | --- |
| `/partners/workspace` | `src/app/partners/workspace/page.tsx` | Highlight card + quick tools + demo client; static/mocked data | Define urgent-task rules, metrics to show, real client/task sources, CTA targets | High |
| `/partners/workspace/calendar` | `.../calendar/page.tsx` | CalendarWorkspaceScreen renders placeholder events | Event types, data source, filters, booking/RSVP behavior | High |
| `/partners/workspace/calendar/webinars` | `.../calendar/webinars` | Route stub only (no page.tsx) | Decide if webinars need their own view; data + filters | Medium |
| `/partners/workspace/calendar/office-hours` | `.../calendar/office-hours` | Route stub only (no page.tsx) | Clarify office-hours scheduling UX and data source | Medium |
| `/partners/workspace/tasks` | `.../tasks/page.tsx` | TasksWorkspaceScreen placeholder | Status/priority schema, owner field, completion CTA text, linkage to clients/deals | High |
| `/partners/workspace/files` | `.../files/page.tsx` + `FilesContent.tsx` | Static cards for My/Client/Shared; mock stats/activity | File categories, metadata fields, permission copy, download/share rules, real activity feed | High |
| `/partners/workspace/files/my-files` | (route stub) | No page yet | Define private file UX, quotas, permissions | Medium |
| `/partners/workspace/files/clients` | (route stub) | No page yet | Client folder structure, approvals, version history | Medium |
| `/partners/workspace/files/shared` | (route stub) | No page yet | Shared asset library, expiry logic, governance copy | Medium |
| `/partners/workspace/notes/my-notes` | `.../notes/my-notes/page.tsx` | Placeholder copy only | Note types, sharing rules, empty-state copy, search/tagging requirements | Medium |

## Implementation Roadmap (draft)
- **Confirm inputs**: lock business priority, owners, data sources, and permission rules.  
- **Define schemas**: task, event, file, note shapes + “urgent” logic.  
- **Map dashboard KPIs**: choose top cards and CTAs.  
- **Content pass**: empty states, permission/legal copy, tooltips/microcopy.  
- **Handoff**: feed finalized requirements into page-level docs using `page-template.md`.  

## Next Questions for Stakeholders
- What is the exact definition of “urgent” and which KPIs headline the dashboard?  
- Who are the business, technical, and content approvers?  
- Which systems feed calendar, tasks, files, and notes (and how fresh must they be)?  
- What permission model and compliance language do we need for files/notes?  
- Should tasks/events attach to clients/deals and show cross-links to Client Pipeline?  
