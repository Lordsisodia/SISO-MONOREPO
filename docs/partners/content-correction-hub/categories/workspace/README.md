# Workspace

Workspace is the productivity corner (calendar, tasks, files, notes). The dashboard currently shows a highlight card with “urgent tasks” and the demo client component, but the underlying feeds use mock items. Capture the real schedules, tasks, and notes we expect before replacing the placeholder data.

Refer to `../templates/page-template.md` any time you tackle a specific page.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Workspace dashboard | `/partners/workspace` | `src/app/partners/workspace/page.tsx` | Highlight card text, quick tool links, and the demo client are static; decide what metrics (e.g., “urgent tasks”) and CTAs belong here. |
| Calendar | `/partners/workspace/calendar` | `.../calendar/page.tsx` | Needs real events, available office hours, and any filters; define the data shape so cards render actual meetings. |
| Tasks | `/partners/workspace/tasks` | `.../tasks/page.tsx` | Task list currently uses placeholder tasks/be contexts; catalog the actual statuses, owners, and CTA copy for “Mark as done.” |
| Files | `/partners/workspace/files` | `.../files/page.tsx` | Should show investment decks, templates, or contract docs; specify the file metadata and the permissions copy for downloads. |
| My notes | `/partners/workspace/notes/my-notes` | `.../notes/my-notes/page.tsx` | Determine what types of notes members save (ideas, follow-ups) and what the UX should say when the list is empty. |

## Planning notes
- The “quick tools” section on the dashboard should link to the actual workflows we care about; confirm which workflow each link should hit and what counts as an “urgent task.”
- Track the API or data source that will feed the calendar and task lists so we can coordinate with the backend team when swapping out the placeholder arrays.
- Notifications currently do not have a dedicated page in this folder—see `notifications.md` for the expected experience and content audit for that screen.
