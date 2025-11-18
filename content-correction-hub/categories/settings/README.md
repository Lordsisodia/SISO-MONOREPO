# Settings

The settings cluster currently lives inside the mobile shell (`/partners/(mobile)/settings/*`). We need to decide which screens stay mobile-only, which ones we need to port to desktop, and what copy/data belongs on each tab (general, security, privacy, integrations, legal, etc.). The missing “wallets”, “checklists”, “device”, and “my account” pages referenced in the plan either need to be created or mapped to existing screens.

Copy the template from `../templates/page-template.md` whenever you dive into a page.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Settings hub | `/partners/(mobile)/settings` | `src/app/partners/(mobile)/settings/page.tsx` | Acts as the shell for each panel—document which overview copy and navigation links should appear. |
| General settings | `/partners/(mobile)/settings/general` | `.../settings/general/page.tsx` | Need to know which general preferences (notifications, timezone, etc.) should be editable and what the descriptions should say. |
| Appearance | `/partners/(mobile)/settings/appearance` | `.../settings/appearance/page.tsx` | Currently shows theme toggles; determine the copy and what themes/gradients exist. |
| Privacy | `/partners/(mobile)/settings/privacy` | `.../settings/privacy/page.tsx` | Clarify which data practices are explained, what toggles are present, and what policies (cookie/tracking) the page should link to. |
| Security | `/partners/(mobile)/settings/security` | `.../settings/security/page.tsx` | Outline the security options (2FA, recovery codes) and the text that reassures partners. |
| Integrations | `/partners/(mobile)/settings/integrations` | `.../settings/integrations/page.tsx` | Need to list the available integrations, connection instructions, and any cautionary notes. |
| Language | `/partners/(mobile)/settings/language` | `.../settings/language/page.tsx` | Determine the supported locales and what copy describes how language selection affects the experience. |
| Legal hub | `/partners/(mobile)/settings/legal` | `.../settings/legal/page.tsx` | Should link to partner agreement, SLA, commission terms, etc.; confirm the legal documents we want to feature. |
| Legal documents | `/partners/(mobile)/settings/legal/*` | Subpages like `partner-agreement`, `service-level-agreement`, `commission-terms`, etc. | Each legal page needs the correct heading, body copy, and signature prompts (where applicable). |

## Missing/adjacent pages
- Wallets (`/partners/(mobile)/wallet`) currently sits outside of settings; decide whether wallet management should remain separate or merge into this category.
- Checklists and device settings are not yet in `src/app/partners/(mobile)/settings/`; if those are required, plan how they will be scaffolded and what content they contain.
- “My account”, “profile”, and “security” are referenced in the plan—confirm if they map directly to existing screens or if new routes are required.

## Planning notes
- Work through the template prompts to describe the copy, toggles, and API dependencies for the screens that currently exist.
- If we need to create new pages (wallets, devices, checklists), capture the expected sections and data before building the UI so we don’t repeat placeholder copy.
