# Client pipeline

This category holds the deal and referral pipeline workflows. The UI exists for each stage, but most copy is placeholder and the dashboards are populated with mock metrics. Capture the real data and CTA expectations for each page so we can swap in live content consistently.

Consult `../templates/page-template.md` for the prompts to answer when you tackle a specific page.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Client pipeline dashboard | `/partners/pipeline-ops` | `src/app/partners/pipeline-ops/page.tsx` | Highlight card, the quick links grid, and “What’s next” stats display canned numbers—define the real metrics, copy for the CTA button, and an updated helper list for what counts as “deals in motion”. |
| Submit client | `/partners/pipeline-ops/submit-client` | `.../submit-client/page.tsx` | Need to surface the required fields, validation copy, and follow-up expectations for partners who submit a lead. |
| My prospects | `/partners/pipeline-ops/prospects` | `.../prospects/page.tsx` | Table currently renders placeholder prospects; identify the columns/filters needed and what success means on this screen. |
| Active deals | `/partners/pipeline-ops/active-deals` | `.../active-deals/page.tsx` | Lists deals in negotiation—clarify deal stages, ownership labels, and CTA copy for advancing each deal. |
| App plan generator | `/partners/tools/app-plan-generator` | `src/app/partners/tools/app-plan-generator/page.tsx` | Converts a prospect into an app plan—outline the needed inputs, success confirmation copy, and any follow-up options shown on the screen. |

## Planning focus
- Confirm whether pipeline dashboards need to call API data or can rely on seeded JSON; document the contract if data hasn’t been wired yet.
- Capture the decision for the “Submit client” flow (fields, microcopy, risk advice) before editing form copy.
- For “App plan generator”, list the templated plan output copy and what fields drive the content so we can keep it consistent with marketing claims.
