# Notifications

The notifications surface is still being scoped; it should aggregate the alerts and reminders that live across the partnership hub (earnings, workflow, community). There isn’t a production route yet, so this doc captures the ideas we need to agree on before a page exists.

Use `../templates/page-template.md` to guide the UX questions once the route is scaffolded.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Notifications overview | `/partners/notifications` *(TBD)* | *(not yet created)* | Decide which notification types we show (deals, earnings, community posts, workspace alerts), how they are grouped, and what actions (snooze, mark read) are available. Outline the copy for each notification “type badge” and the metadata (time, related link, severity). |

## Planning notes
- Determine the event taxonomy (e.g., deal milestone, payout alert, reminder to submit notes) so we can match copy to each severity.
- Decide whether links open in the context of the relevant module (e.g., clicking a deal notification should route to `/partners/pipeline-ops/active-deals`).
- Note any dependencies (notification preferences, backend webhooks) that need to be built before finalizing the content.
