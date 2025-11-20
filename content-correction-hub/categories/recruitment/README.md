# Recruitment

Recruitment tracks building the partner sales team and referral performance. Each page below currently surfaces placeholder metrics and sample cards. We need to capture the real personas (new partners, recruiting liaisons) and the data they care about before replacing the placeholder grids.

Use `../templates/page-template.md` for the question prompts.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Recruitment dashboard | `/partners/recruitment` | `src/app/partners/recruitment/page.tsx` | Primary metrics (referred clients, active seats, etc.) are mocked; define the real KPIs, hallmarks for “active” vs “dormant” partners, and CTA copy for inviting team members. |
| Prospects | `/partners/recruitment/prospects` | `.../prospects/page.tsx` | Showcase the pipeline of recruits—inventory the fields (source, status, next action) and update the placeholder table with the actual statuses we will show. |
| Active sales team | `/partners/recruitment/team` | `.../team/page.tsx` | Should surface team roster, roles, and any quota/production numbers; decide what data to show and whether to include contextual help copy. |
| Referral performance | `/partners/recruitment/performance` | `.../performance/page.tsx` | Focused on referral payouts, conversion rates, and triggers; identify the metrics and microcopy that explain how the numbers are calculated. |

## Planning notes
- Determine whether prospects listed here overlap with the client pipeline prospects and how to keep the data consistent.
- For the dashboard, catalog the cards/components that require real totals (e.g., “referrals this month”) so we can swap sample numbers with live values in one pass.
- Compare the “team” page and the “active sales team” copy that the user expects: do we need to rename the file or create additional sections?
