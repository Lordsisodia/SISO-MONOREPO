# Pipeline Ops Feedback — 16 Nov 2025

## Navigation / Shell
- [x] Rename the top sidebar/nav label from **“Pipeline Ops”** to **“Client Pipeline”** for clarity.

## Submit Client
- [x] Fix runtime error: `ReferenceError: PenLine is not defined` thrown in `SubmitClientExperience` (page.tsx ~line 318) when opening **Submit Client**. Ensure the icon is imported/defined and retest.

## General
- [x] After the rename, verify drawer callouts, breadcrumbs, and campus sidebar reflect **Client Pipeline**.

## My Prospects
- [x] Remove dropdown-only behavior; clicking **My Prospects** should navigate into the My Prospects page (no forced expansion-only state).

## Active Deals
- [x] Update hero/top nav to use the standard orange callout cards (consistent with other sections) and include the burger icon in the top-right for navigation.
- [ ] Convert active-deal callout cards to the double-callout pattern with icons + title treatment.

Notes: Shell/hero restored; remaining work is converting the in-page callouts/tiles to the brand double-callout components.


## App Plan Generator
- [x] Route currently leads to a dead/blank page; build the page and apply standard UI shell (orange hero + hamburger) with branded components (placeholder published at /partners/tools/app-plan-generator).
