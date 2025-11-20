# Portfolio Client Detail Page — Product & Implementation Spec

Last updated: 2025-10-25
Owner: Portfolio
Status: Draft → Ready for Implementation

## Goals
- Clicking a portfolio app opens a complete, self-contained case study page.
- Communicate tech stack, features, structure (pages + connections), value delivered, and process.
- Make it easy to skim (Overview) and deep dive (Guided Walkthrough, Timeline, Pricing Breakdown).

## IA (Tabs and Sections)
- Overview
  - Tech Stack Summary (Frontend, Backend, Database, Auth, Hosting, Tools)
  - Features Snapshot
    - Main Features (short curated list)
    - All Features (collapsible; union of all available features)
  - Pages Summary
    - Count (e.g., “Pages: 12”)
    - Mini Sitemap (page nodes + key connections)
  - Pricing Summary (1–2 lines; link to Pricing Breakdown tab)
  - Optional: Quick Links (View Live, GitHub, Case Study)
- Guided Walkthrough (rename from “Screenshots”)
  - Step-by-step slides through the app’s primary pages and flows with captions
  - Device toggle: Desktop/Mobile (reuses existing desktop/mobile screenshots)
  - Optional short MP4/WebM demos
- Timeline
  - Always present; demo data fallback when missing
  - Phases: Market Research → Competitor Analysis → Build Plan → Client Review → Prototype → Feedback → Iterations → Launch → Maintenance
- Pricing Breakdown (rename from “Pricing”)
  - SISO price vs Market value (or min/max range if available)
  - Savings callout and short rationale
- Results & Testimonial
  - Delivery speed, performance highlights (if present), business impact
  - Client testimonial

## Content Sources (Existing Types)
- Tech stack: `PortfolioClient.techStack` (frontend, backend, database, hosting, tools)
- Features: `PortfolioClient.features`
  - Main Features: use `features.key`
  - All Features: union of `features.key` + `features.integrations` + `features.technical` (deduped)
- Pages & Connectivity (Mini Sitemap)
  - Add optional fields to `PortfolioClient`:
    - `pages?: { id: string; title: string; route?: string; type?: 'page' | 'modal' | 'flow' }[]`
    - `pageLinks?: { from: string; to: string; label?: string }[]`
  - If absent, render a small list of top pages from captions in Guided Walkthrough
- Guided Walkthrough
  - Reuse `ProjectMedia.screenshots.desktop` and `.mobile` with per-slide captions
  - Optional: `ProjectMedia.videos` for short clips
- Timeline
  - Type: `ProjectTimeline` with `phases`
  - Fallback generator provides standard phases with ISO dates based on launch date
- Pricing Breakdown
  - Use domain type `ProjectPricing` when present (marketValue, sisoPrice, currency, savings)
  - Otherwise map min/max/currency range (already supported by component fallback)
- Results & Testimonial
  - `PortfolioClient.results` (deliverySpeed, performanceMetrics, businessImpact)
  - `PortfolioClient.testimonial`

## Component Plan
- `src/domain/portfolio/pages/ClientDetail.tsx`
  - Tabs: Overview | Guided Walkthrough | Timeline | Pricing Breakdown | Results & Testimonial
    - Rename “Screenshots” → “Guided Walkthrough”
    - Rename “Pricing” → “Pricing Breakdown”
    - Move Features into Overview (as Snapshot: Main + All)
  - Overview sections to insert under current Overview tab
- `src/domain/portfolio/components/client/PortfolioSitemapGraph.tsx` (new)
  - Props: `{ pages?: Page[]; pageLinks?: PageLink[] }`
  - Implementation: lightweight ReactFlow graph, dark theme, responsive
  - Mobile: vertical stack, simplified edges; Desktop: small grid
  - Fallback: list when no data
- `src/domain/portfolio/components/client/GuidedWalkthrough.tsx` (new wrapper)
  - Wrap existing `ScreenshotGallery` with captions, device toggle, and “Next step” CTA
  - Data: compose from `media.screenshots.desktop/mobile` + optional page captions
- `src/domain/portfolio/components/client/OverviewTechStack.tsx` (new)
  - Renders grouped badges with product icons (Clerk, Supabase, Vercel, Next/React/Tailwind, etc.)
- `src/domain/portfolio/components/client/FeaturesSnapshot.tsx` (new)
  - Shows Main Features (top N) + All Features (collapsible)

## Copy & Labels
- Hero title: “Our Portfolio” (already updated on hub)
- Overview subtitle: concise, no wrapping on mobile
- Tabs: “Guided Walkthrough”, “Pricing Breakdown”
- Buttons: “Start Your Project”, “Book a Call”, “View Live”

## Mobile / Desktop Behavior
- Overview
  - Collapse long lists; show ~5 main features and fold the rest
  - Mini sitemap: simplified vertical on mobile
- Guided Walkthrough
  - Large tap targets for next/prev; captions below image
- Timeline / Pricing Breakdown
  - Single column on mobile; two columns on desktop

## Accessibility
- Tabs are keyboard accessible (Radix Tabs OK)
- Images have meaningful alt text (use page caption)
- Graph: ensure focus order and fallbacks for screen readers

## Analytics (Optional)
- Track tab views and next/prev in Guided Walkthrough

## Acceptance Criteria
- Clicking any portfolio card opens a detailed app page with:
  - Overview: tech stack, features snapshot (main + all), pages count + mini sitemap, pricing summary
  - Guided Walkthrough: step-by-step slides with captions, device toggle
  - Timeline: present with demo data if missing
  - Pricing Breakdown: clear comparison and savings callout
  - Results & Testimonial: present when data exists, otherwise omitted
- Mobile view does not clip or overflow; headings and captions fit

## Implementation Steps
1. Tabs
   - Rename “Screenshots” → “Guided Walkthrough”
   - Rename “Pricing” → “Pricing Breakdown”
   - Move features UI into Overview (as FeaturesSnapshot)
2. Overview Sections
   - Add OverviewTechStack (icons + badges)
   - Add FeaturesSnapshot (main + all)
   - Add Pages Summary with count and mini sitemap placeholder
   - Add Pricing Summary line linking to Pricing Breakdown tab
3. Guided Walkthrough
   - Create wrapper to add captions and device toggle over `ScreenshotGallery`
4. Mini Sitemap
   - Add optional `pages` and `pageLinks` to `PortfolioClient`
   - Implement `PortfolioSitemapGraph` with ReactFlow; list fallback if absent
5. Timeline
   - Add default timeline generator when missing
6. Pricing Breakdown
   - Keep full component in tab; ensure Overview summary computes savings line from available data
7. QA
   - Mobile/desktop layouts, keyboard nav, error handling

## Open Questions
- Do we want per-app custom copy in Overview (business goals, success metrics)?
- Should Guided Walkthrough include short videos if available?
- Any SEO requirements for the detail pages beyond current Helmet usage?

---

## Change Log
- 2025-10-25: Initial spec (tabs, sections, components, data model additions, steps)

