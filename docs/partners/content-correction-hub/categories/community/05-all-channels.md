# Page Template: All Channels Directory

## Page Metadata
- **Page Name**: All Channels
- **Route**: `/partners/community/all-channels`
- **File**: `src/app/partners/community/all-channels/page.tsx`
- **Section**: Community
- **Status**: content needed (data wiring)
- **Priority**: next milestone

## Simple Questions
1. **Goal?** Directory of core and requested channels; launchpad for discovery.
2. **Who uses it?** All partners exploring where to post; SISO to spotlight beta rooms.
3. **Working now?** Layout + cards; mock lists for core channels, requested ideas, playbooks.
4. **Broken/missing?** Data mocked; votes/trends fake; links may not reflect real channel set.
5. **Data needed?** Real channel list from Supabase (id, label, description, highlights), requested-channel backlog with votes, playbook links to Help.
6. **Approver?** SISO.

## Page Overview
- **Goal**: Make it obvious which channels exist and how active they are.
- **Persona**: Partner deciding where to post a question or join a beta.
- **Success Metrics**: Click-through to channels; decrease in misposted threads.

## Component Map
| Component | Current State | Target State | CTA | Owner |
|---|---|---|---|---|
| Hero HighlightCard | Static copy | Keep copy; show total live channels and betas from data | "Browse channels" | Frontend |
| Core spaces list | Static 3 items | Drive from channel registry; show live highlights | “Visit channel” | Frontend |
| Requested channels | Mock ideas/votes | Supabase list w/ vote counts/trend | “Vote” | Frontend |
| Playbook cards | Static text | Link to Help articles once authored | “Open playbook” | Content |
| Suggest channel panel | Static | Hook to request form/table | “Submit request” | Frontend |

## Data & Content Planning
- **Dynamic**: Channel registry, highlights, requested-channel votes, playbook links once real.
- **Static**: Hero/labels; suggest form text.

### Technical Plan
- Tables: `community_channels` (id, label, description, icon, access); `channel_requests` (label, description, votes, trend).
- Derived: highlights per channel (active today, threads, response time).

## Implementation Checklist
- [ ] Replace hard-coded channel arrays with Supabase queries.
- [ ] Hook “requested” section to real votes.
- [ ] Wire playbook links to Help center once available.
- [ ] Add empty states when no requests.

## Success Criteria
- Core list reflects live channels.
- Requested list is real and votable.
- Playbook links resolve to authored Help content. 
