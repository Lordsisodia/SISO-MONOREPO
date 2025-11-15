# Partnership Program Flow Docs

**Last Updated:** November 5, 2025  
**Owner:** Partnerships Product Team  
**Status:** Draft (structure ready for content drops)

---

## What Lives Here
- `journey-map.md` - master information architecture of every partner-facing page, list, and dashboard widget with cross-link rules.
- `mobile-desktop-alignment.md` - responsive UX guardrails, inspired by Real World (Andrew Tate) reference flows. Includes slots for forthcoming screenshots.
- `integration-notes/` (optional) - add API contracts, data models, or Supabase schema deltas as they are defined.
- `changelog.md` (optional) - log evolution of the partner journey once iteration begins.

> Keep everything in this folder source-of-truth for how partners move between pages and what data appears where. UI mockups, analytics dashboards, and Supabase schemas should cross-link back here.

## How To Use
1. Start with `journey-map.md` to understand the end-to-end Attract -> Engage experience.
2. Use the "Link Graph" tables inside the journey map to check where a user can navigate next.
3. Capture mobile screenshots (Discord-style PWA) inside `mobile-desktop-alignment.md` once provided.
4. As new requirements surface, add a subsection and reference the relevant stage so the flow stays coherent.

## Next Inputs Needed
- Real World mobile flow screenshots (drop into `assets/reference/` once created).
- Decisions on tier progression thresholds (currently placeholders in the Grow stage).
- Confirmation on Discord gating + automation rules for onboarding unlocks.
