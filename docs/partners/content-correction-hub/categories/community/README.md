# Community

Community gathers chat, announcements, help, and partner lists. The current screens show cards with hard-coded counts, so we need to define the desired data sources (real unread counts, pinned wins, help articles) and the copy for each CTA before removing the placeholder content.

Refer to `../templates/page-template.md` before filling in any page details.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Community dashboard | `/partners/community` | `src/app/partners/community/page.tsx` | Highlight card and quick links currently show fixed numbers (3 active threads, 4 wins, etc.); clarify which metrics this card should surface and what makes a thread “active.” |
| General chat | `/partners/community/general` | `.../general/page.tsx` | Should show the main chat stream—decide what filters appear and what pinned copy (e.g., moderation notes) we need. |
| Wins channel | `/partners/community/wins` | `.../wins/page.tsx` | Showcase successes with supporting copy; capture what cards are needed (company, win summary, reward). |
| Announcements channel | `/partners/community/announcements` | `.../announcements/page.tsx` | Determine announcement types, expected CTAs, and whether admins add links/media. |
| All channels | `/partners/community/all-channels` | `.../all-channels/page.tsx` | This list should summarize every channel (general, wins, announcements); record the data points and order we want here. |
| Messages | `/partners/community/messages` | `.../messages/page.tsx` | Message inbox needs real recipients, threading logic, and statuses; define the columns/labels we should display. |
| Message thread | `/partners/community/messages/[threadId]` | `.../messages/[threadId]/page.tsx` | Document whether this page should show context (pinned info, templates) and the CTA for replying. |
| All partners | `/partners/community/all-partners` | `.../all-partners/page.tsx` | List of partners—clarify which filters (tier, industry, status) the table should show. |
| Help center | `/partners/community/help` + article routes | `.../help/page.tsx`, `/help/[collection]`, `/help/[collection]/[article]` | This is the knowledge base: confirm the collection names, the article structure, and how to show navigation between topics. |
| Channels subgroup | `/partners/community/channels/*` | `.../channels/[...]/page.tsx` | The `general-chat`, `wins`, and `announcements` channel subpages currently mirror other routes—we should sync their copy so they match the main channel descriptions. |

## Planning notes
- Decide if the “messages” list should show unread counts, pinned threads, or segmentation by type.
- Collect the latest help articles (collection titles, article titles) we want to publish so the help center can show real content.
- For wins/announcements, gather the tone guidelines and CTA expectations (link to case study? share on socials?).
