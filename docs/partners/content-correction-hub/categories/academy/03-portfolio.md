# Portfolio Page Analysis

*Section: Academy*  
*Page: Portfolio*  
*Date: November 17, 2025*  
*Status: Content Review*

## Quick Validation Questions

**1. What should this page do?**
*One sentence goal:* Let partners grab proof points (case studies, screenshots, pricing signals) fast so they can send prospects the right examples.

**2. Who uses it?**
*Describe the user:* Partners in active deals who need credible examples; new partners looking for “what we build”; occasional internal AE/PS who need a quick link.

**3. What's working now?**
*What parts are actually done:* Route resolves; Hero HighlightCard with “Portfolio” and CTA to “Open portfolio hub”; basic page chrome via `PartnersPageShell`.

**4. What's broken/missing?**
*Quick list of problems:* No portfolio grid/cards; no industry filters; CTA points to `/partners/academy/portfolio/hub` (hub not wired); no project data/detail pages; no downloads/share links; no analytics or empty/loading states.

**5. What data should show here?**
*Plain English description:* 12+ curated projects with screenshots, industry tags, pricing band, timeline, tech stack, outcomes, client logos; filters (industry, size, tech); quick copy URL/share; PDF download; “new this week” spotlight; conversion CTAs to pitch kit/contact.

**6. Who needs to approve this?**
*Legal, subject experts, etc.:* Partnerships (business), Content/Design for brand accuracy, Legal for use of logos/claims.

---

## Current Page Structure

**File Location:** `src/app/partners/academy/portfolio/page.tsx`

### Components Found:
- `PartnersPageShell` (community shell)
- `HighlightCard` (hero “Portfolio” with Live status, CTA → `/partners/academy/portfolio/hub`)
- `SettingsGroupCallout` (“Coming soon” message)

### Content Analysis:
- Hero copy is generic; status = “Live” but feature is not actually available.
- Callout explains hub wiring “next sprint”; no real portfolio surface yet.

---

## AI Analysis

### Component Map

| Component | Current State (Code) | Target State | Priority |
|-----------|---------------------|--------------|----------|
| Hero HighlightCard | Static title/description, “Live” badge, CTA to hub | Hero with stats (projects, industries, avg timeline), reassurance copy | High |
| Portfolio Grid | Missing | Masonry/grid of projects with filters, sort, pagination | High |
| Filters/Chips | Missing | Industry, complexity, tech stack, recency | High |
| Project Card | Missing | Image, title, industry, price band, timeline, outcomes; quick copy link | High |
| Spotlight/New | Missing | “New this week” carousel | Medium |
| PDF/Share | Missing | Download PDF, share link | Medium |
| Empty/Loading | Missing | Skeletons + empty states | Medium |
| Analytics Hooks | Missing | Event pings for filter use, card clicks, downloads | Medium |

### Data & Content Requirements (from Academy research)
- 9 industry categories; 12 items/page grid; curated (team-managed) content; weekly updates.
- Fields: screenshots, case study, our pricing, competitor pricing, revenue impact, client logo, industry tags, tech stack, year built.

### Integration Points
- Reuse client-base portfolio domain components/data if feasible.
- CTA alignment with navigation config (`/partners/academy/portfolio` exists; hub route TBD).

---

## Validation Gates

**Ready for backend:** ❌ Pending content review
**Needs iteration:** ❌ Pending content review  
**Direction change:** ❌ Pending content review

**Decision:** ⏳ Awaiting content analysis

---

## Implementation Notes

- Treat `Open portfolio hub` CTA as broken until `/partners/academy/portfolio/hub` exists; consider hiding or routing to interim grid.
- Candidate data source: `domains/client-base/portfolio` (components, hooks, data adapters already built for public portfolio).
- Required UX: filters, cards, detail modal/page, download/share, empty/loading, analytics events.
- Content: ensure logo/claim approvals; align with pricing guidance before publish.
