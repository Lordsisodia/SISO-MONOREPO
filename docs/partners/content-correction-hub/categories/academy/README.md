# Academy

The Academy cluster hosts the learning experience (dashboard, course catalog, and spotlight modules). Each page needs to show real course counts, progress, certifications, and related CTAs instead of the placeholder UI that currently renders with generic labels.

Copy the prompts from `../templates/page-template.md` into each section below as you gather answers.

## Page inventory
| Page | Route(s) | File(s) | Notes / next action |
| --- | --- | --- | --- |
| Academy dashboard | `/partners/academy` | `src/app/partners/academy/page.tsx` | Defines the hero metrics and quick links for the learning hub. Confirm what KPIs should surface and what copy supports the “starting point” story. |
| Getting started | `/partners/academy/getting-started` | `.../getting-started/page.tsx` | Should explain the onboarding steps, readiness checklist, and encourage the first course—need structure and messaging. |
| Courses catalog | `/partners/academy/courses` | `.../courses/page.tsx` + `courses/[courseId]/page.tsx` + `courses/[courseId]/[lessonId]/page.tsx` | Requires accurate module data, progress counts, lesson summaries, and consistent microcopy for CTA buttons. |
| Training spotlight | `/partners/academy/training-spotlight` | `.../training-spotlight/page.tsx` | Highlights a rotating feature course; decide which course(s) should be promoted and what copy sets expectations. |
| Portfolio | `/partners/academy/portfolio` | `.../portfolio/page.tsx` | This page is meant to showcase member wins or resources—need to map to actual asset list and description text. |
| Pitch kit | `/partners/academy/pitch-kit` | `.../pitch-kit/page.tsx` | Contains materials partners should share; capture the needed decks, scripts, and CTA flows. |
| Saved items | `/partners/academy/saved` | `.../saved/page.tsx` | Should list bookmarked guides/videos—define what types of items belong here and how to describe them. |
| Industry insights | `/partners/academy/industry/[slug]` | `.../industry/[slug]/page.tsx` | Dynamic page for industry-specific stories—document what slugs exist, what intro copy is required, and how to populate each variant. |

## Planning notes
- Confirm whether the academy dashboard should include leaderboard metrics or certification progress.
- For the courses section, decide on the taxonomy (category, difficulty, completion) so that card copy can be replaced.
- Training spotlight, pitch kit, and portfolio may share assets; identify the source documents and taglines before rewriting the cards.
