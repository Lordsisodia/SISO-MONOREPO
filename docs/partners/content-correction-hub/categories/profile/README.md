# Profile

The user profile screen currently exists inside the mobile shell. We should capture the fields, avatars, contact info, and trust signals the profile page needs so it doesn’t stay filled with lorem ipsum or random placeholders.

Copy the question prompts from `../templates/page-template.md` when you drill into this page.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Profile | `/partners/(mobile)/profile` | `src/app/partners/(mobile)/profile/page.tsx` | Determine the persona details to show (name, tier, background story, key contact data) and decide what CTAs (edit, share, switch tier) the page should expose. |

## Planning notes
- Confirm whether the profile page should highlight the user’s current tier, achievements, and contact links.
- If there will be a desktop version later, note which sections are mobile-only so we can reuse the copy.
