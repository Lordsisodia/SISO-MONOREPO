# Page Template: Messages (Inbox)

## Page Metadata
- **Page Name**: Messages
- **Route**: `/partners/community/messages`
- **File**: `src/app/partners/community/messages/page.tsx`
- **Section**: Community
- **Status**: content needed (table/columns)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Let partners triage and respond to DMs/threads quickly.
2. **Who uses it?** All partners; SISO team.
3. **Working now?** MobileShell wrapper; navigation works.
4. **Broken/missing?** No inbox table; no columns/filters; data mocked; thread detail reused shell.
5. **Data needed?** Conversations list with decided columns; unread counts; pinned flag; filters; actions.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Fast inbox triage.
- **Persona**: Partner checking unread and pinned threads.
- **Success Metrics**: Unread reduction; reply SLAs; pin usage.

## Component Map
| Component | Current State | Target State | CTA | Owner |
|---|---|---|---|---|
| Inbox list | Not implemented (mobile shell only) | Data-driven list with columns: participants, snippet, lastActivityAt, unreadCount, pinned, type, priority, tags | “Open thread” | Frontend |
| Filters | Not present | Filters: unread, pinned, @mentions, type, tag | “Apply filter” | Frontend |
| Row actions | Not present | Open/reply, mark unread, pin/unpin, archive, snooze(optional) | — | Frontend |
| New message | Floating action in shell | Keep; ensure route to composer | “New message” | Frontend |

## Data & Content Planning
- **Dynamic**: conversations list, unread counts, pinned, tags, priority.
- **Static**: column labels, helper copy.

### Technical Plan
- Table `conversations` and `messages`; indexes for lastActivityAt, unread per user.
- API: list conversations with aggregates; mark read; pin; archive; snooze.
- Thread detail pane (if enabled) pulls context by conversation_id.

## Implementation Checklist
- [ ] Build conversations list UI (responsive).
- [ ] Add filters + row actions.
- [ ] Wire Supabase queries/mutations (mark read, pin, archive, snooze).
- [ ] Empty/zero-state + loading skeletons.

## Success Criteria
- Inbox shows live conversations with chosen columns.
- Read/pin/archive actions persist.
- Filters work; new message flow works. 
