# Content Correction Hub

This directory captures the next phase of the partners experience: we already have the UI scaffolding, now we need to systematically replace placeholder data and copy with the *correct* content for each page. Think of it as the single source of truth for “what this page should say/do” combined with the questions we will answer together.

## Structure

Each category now has a folder under `categories/` whose `README.md` holds the overview table (routes, files, summary). When you start working on a specific page, add a dedicated `.md` next to that README (e.g., `academy/academy-dashboard.md`) and paste the prompts so everyone can follow the story, copy needs, and blockers for that page.

The `templates/page-template.md` file contains the full question set in copy/paste form for easy reuse.

## Categories we are tracking
| Category | Key files | Notes |
| --- | --- | --- |
| Partnership hub | `categories/partnership-hub/README.md` | High-level hub thinking; the actual pipeline dashboard lives under client pipeline for now. |
| Academy | `categories/academy/README.md` | Learning hub overview that can link to per-page docs such as `academy-dashboard.md`. |
| Client pipeline | `categories/client-pipeline/README.md` | Prospect/deal flows; create a `.md` per route as content details emerge. |
| Recruitment | `categories/recruitment/README.md` | Recruitment dashboards/referrals. |
| Earnings | `categories/earnings/README.md` | Payouts, tiers, achievements, and gamified challenges. |
| Community | `categories/community/README.md` | Chat rooms, announcements, help center, and partner directory. |
| Workspace | `categories/workspace/README.md` | Calendar, tasks, files, notes, plus the workspace demo. |
| Notifications | `categories/notifications/README.md` | Concept doc describing notification taxonomy (route TBD). |
| Settings | `categories/settings/README.md` | Mobile settings cluster and legal docs; add new files as new screens land. |
| Profile | `categories/profile/README.md` | Mobile profile experience; expand to per-section docs when ready. |

## Question prompts (copy into each page)
1. **Page goal:** What is the primary outcome or behaviour this page should drive?
2. **Persona & story:** Who is the page for and what context do we need to assume?
3. **Component map:** What sections/components currently render placeholder text or mock data?
4. **Content/data needs:** What exact copy, metrics, or API responses should replace the placeholders?
5. **Dependencies/blockers:** What teams, approvals, assets, or APIs do we still need to unblock this content?
6. **Priority:** How critical is this page for the next milestone (e.g., release, demo, light testing)?

## Next steps
1. Walk through each category file and fill in the “next action” column with the components that need attention.
2. When you have more clarity about a page, paste the prompts above into its section, answer them, and move the row status to `ready for content` / `needs copy` / `blocked`.
3. Use this hub as the reference when you are pairing on a page so everyone knows which components/images/copy pieces should be swapped on each screen.

If anything in the repo changes (new routes, new dashboards, etc.), add it to the appropriate category file so the hub stays up to date.
