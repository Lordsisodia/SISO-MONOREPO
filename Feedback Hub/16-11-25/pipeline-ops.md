# Pipeline Ops Feedback — 16 Nov 2025

## Navigation / Shell
- [ ] Rename the top sidebar/nav label from **“Pipeline Ops”** to **“Client Pipeline”** for clarity.

## Submit Client
- [ ] Fix runtime error: `ReferenceError: PenLine is not defined` thrown in `SubmitClientExperience` (page.tsx ~line 318) when opening **Submit Client**. Ensure the icon is imported/defined and retest.

## General
- [ ] After the rename, verify drawer callouts, breadcrumbs, and campus sidebar reflect **Client Pipeline**.

## My Prospects
- [ ] Remove dropdown-only behavior; clicking **My Prospects** should navigate into the My Prospects page (no forced expansion-only state).

## Active Deals
- [ ] Update hero/top nav to use the standard orange callout cards (consistent with other sections) and include the burger icon in the top-right for navigation.
- [ ] Convert active-deal callout cards to the double-callout pattern with icons + title treatment.
- [ ] Blocker: cannot properly review deeper content until the correct UI shell and callouts are applied.
- [ ] Ensure Active Deals screen uses the standard branded shell (orange hero card + hamburger) and replace current callouts with the brand double-callout components for consistency across the app.

## App Plan Generator
- [ ] Route currently leads to a dead/blank page; build the page and apply standard UI shell (orange hero + hamburger) with branded components.

## Recruitment
- [ ] Active Sales Team: remove the second orange card (Ramp/Compliance) so only one hero card remains; replace all emoji icons on this page with the standard SVG icon set used elsewhere.
- [ ] Referral Performance: remove the extra orange card so only a single hero card shows; replace emoji icons with the shared SVG icons for consistency.
