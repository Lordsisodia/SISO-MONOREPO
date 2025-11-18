# Page Template: Workspace Calendar

**Use this template for detailed analysis and planning of individual pages**

## Page Metadata
- **Page Name**: Workspace Calendar
- **Route**: `/partners/workspace/calendar`
- **File**: `src/app/partners/workspace/calendar/page.tsx`
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
- **Component Analysis**: `CalendarWorkspaceScreen` renders inside `PartnersPageShell`; event data is mocked.
- **Content Audit**: Event types, filters, office hours/webinar links not defined; copy uses placeholder metadata.
- **Performance Review**: Minimal logic; performance depends on future data source.
- **Accessibility Check**: Need to confirm keyboard navigation and ARIA for calendar grid/list.
- **User Feedback (Nov 17, 2025)**:
  - “Schedule filters” panel doesn’t make sense; wants simpler filtering or removal.
  - “Signals” and “Priority track” cards not clear; likely remove.
  - Calendar view card doesn’t match desired call-out card style (icon, fonts) used elsewhere.
  - Upcoming list should use the preferred call-out card style.
  - Overall layout feels messy; wants a clean calendar plus supporting cards.
  - Questions value of Office Hours/Webinars sections; may remove unless justified.

### Decisions (from stakeholder, Nov 17, 2025)
- Views: Keep Month + Week + Day toggle.
- Event types to start: client meetings, tasks, deadlines (others TBD).
- External sync: include Google/Outlook + “coming soon” label.
- Upcoming list: show all events for the selected day (no hard cap).
- Office Hours/Webinars: remove from page for now.
- Primary hero CTA: “Open today’s events.”

### Technical Requirements
- **Data Needs**: Events (type, title, start/end, owner, client/deal, location/link), office-hours slots, webinar entries, RSVP/join URLs.
- **Component Specifications**: Calendar view (week/month), filters (type, owner, client), event detail sheet, booking/RSVP buttons.
- **Integration Points**: Calendar source (internal API/Google/Microsoft), booking system for office hours, webinar provider.
- **State Management**: Server fetch + client filtering; optimistic RSVP; time-zone handling.

## Page Overview
- **Page Goal**: Give partners a unified schedule with book/join actions for office hours, webinars, and deal deadlines.
- **Persona & Story**: Partner checking today/this week, wanting to join or book sessions and avoid clashes.
- **Success Metrics**: RSVP/joins, bookings filled, filter engagement, reduced missed events.

## Component Structure

### Component Map
*AI fills current state from code analysis, you provide target state*

| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|-------------------|-------------------|------------|
| Calendar view | Mock events | | Join / View details / Add to calendar | |
| Filters | Basic/undefined | | Filter by type/owner/client/time | |
| Event detail sheet | TBD | | RSVP / Book / Join | |
| Office-hours block | Route stub | | Book slot | |
| Webinars block | Route stub | | Register | |

### Component Details

#### Calendar view
- **Purpose**: Visual schedule (week/month) of partner events.
- **Current Implementation**: Mock data inside `CalendarWorkspaceScreen`.
- **Required Data**: Event list with type, times, links, ownership.
- **User Interactions**: Click to open detail, join, copy link, add to external calendar.
- **Error States**: Empty state for no events; offline fallback.
- **Accessibility Requirements**: Keyboard navigation, ARIA labels for days/events.
- **Performance Considerations**: Pagination/virtualization for busy calendars.

#### Filters
- **Purpose**: Let users focus on relevant events.
- **Current Implementation**: None defined.
- **Required Data**: Event types, owner list, client list, time ranges.
- **User Interactions**: Multi-select chips, quick “Today/This week”.
- **Error States**: Safe default (all types).
- **Accessibility Requirements**: Focusable controls, clear labels.

#### Event detail sheet
- **Purpose**: Show event metadata + actions.
- **Current Implementation**: TBD.
- **Required Data**: Description, participants, links, attachments.
- **User Interactions**: RSVP/book/join, copy link, add note.
- **Error States**: Graceful when link missing/expired.

#### Office-hours block / Webinars block
- **Purpose**: Dedicated views for those event types (routes exist).
- **Current Implementation**: Missing pages.
- **Required Data**: Slot schedule, hosts, capacity; webinar schedule/registration links.
- **User Interactions**: Book/register, cancel, add to calendar.
- **Error States**: Fully booked/ended; waitlist messaging.

## Data & Content Planning
- **Static Content**: Headers, helper text, empty-state copy.
- **Dynamic Content**: Live events, RSVPs/joins, booking states.
- **Media Assets**: Icons by event type.

## Implementation Checklist
- [ ] Define event types + filters
- [ ] Choose default view (week/month)
- [ ] Confirm data source + auth
- [ ] Specify office-hours/webinars behavior
- [ ] Error/empty states + accessibility
