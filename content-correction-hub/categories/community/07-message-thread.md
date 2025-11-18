# Page Template: Message Thread

## Page Metadata
- **Page Name**: Message Thread
- **Route**: `/partners/community/messages/[threadId]`
- **File**: `src/app/partners/community/messages/[threadId]/page.tsx`
- **Section**: Community
- **Status**: content needed (context pane + data wiring)
- **Priority**: release-critical

## Simple Questions
1. **Goal?** Show a single conversation with replies, context, and quick actions.
2. **Who uses it?** All partners.
3. **Working now?** Reuses MobileShell messages view; no extra context.
4. **Broken/missing?** No thread-level context panel, pinned info, attachments, or quick replies; data mocked.
5. **Data needed?** Thread messages, participants, tags, pinned context (deal/course), attachments, reactions, unread state.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Let partners read, respond, and understand thread context fast.
- **Persona**: Partner opening a notification or pinned message.
- **Success Metrics**: Reply time, resolution marker usage, reduced back-and-forth.

## Component Map
| Component | Current State | Target State | CTA | Owner |
|---|---|---|---|---|
| Timeline | Mobile feed | Supabase messages for threadId; reactions; read receipts | “Reply” | Frontend |
| Context pane | None | Side drawer/panel: participants, tags, pinned context (deal/course link), attachments, quick replies | “Open context” | Frontend |
| Composer | Present via shell | Keep; add attachments/emoji, templates | “Send” | Frontend |
| Header | Minimal | Add thread title (first message), status (open/archived), unread count | — | Frontend |

## Data & Content Planning
- **Dynamic**: messages, reactions, participants, tags, attachments, pinned context.
- **Static**: quick-reply templates (configurable), status labels.

### Technical Plan
- Query `messages` by threadId; join participants; fetch thread metadata table (`conversations`).
- Actions: reply, react, mark read, pin message, attach link/file, quick reply.
- Optional: resolution status field on conversation.

## Implementation Checklist
- [ ] Build context pane component.
- [ ] Wire data for thread meta + messages.
- [ ] Add quick replies + attachments if available.
- [ ] Handle empty/error/loading states.

## Success Criteria
- Thread shows live messages + reactions.
- Context pane available with participants and pinned info.
- Reply, react, mark-read persist. 
