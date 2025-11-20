# Courses Page Analysis

*Section: Academy*  
*Page: Courses*  
*Date: November 17, 2025*  
*Status: Content Review*

## Quick Validation Questions

**1. What should this page do?**
*One sentence goal:* Let partners find, filter, and resume the right course fast, with clear progress and supporting assets.

**2. Who uses it?**
*Describe the user:* Partners mid-deal hunting for enablement, new partners browsing starter tracks, experienced reps resuming in-progress courses.

**3. What's working now?**
*What parts are actually done:* Full client-side catalog screen with search, level/industry filters, sort, per-course cards showing progress bar, tags, related assets, and Start/Resume CTA; metadata set; routes to course detail dynamic pages.

**4. What's broken/missing?**
*Quick list of problems:* Only 3 hardcoded courses; industries limited (SaaS/Marketing/Startup); no server data wiring; no saved state/bookmarks persistence; “Save” and “Copy link” buttons not implemented; no empty/loading/skeleton states; no recommendations/personalization; related assets mostly placeholder links; no analytics or A/B targeting.

**5. What data should show here?**
*Plain English description:* Full catalog with course count, filters by level/industry/topic, progress per user, lesson counts/durations, tags, related assets (pitch kit, portfolio, calculators), recommended next course, bookmark state, completion badges.

**6. Who needs to approve this?**
*Legal, subject experts, etc.:* Partnerships/Academy lead, Content/Design, Legal for claims/examples, RevOps for link-to-earnings messaging.

---

## Current Page Structure

**File Location:** `src/app/partners/academy/courses/page.tsx`

### Components Found:
- `CourseCatalogScreen` (main UI)
- `HighlightCard` hero (courses count, CTA → Training Spotlight)
- `SettingsGroupCallout` for search/filters/sort
- Course cards with progress bar, tags, related assets, Start/Resume CTA, Save/Copy buttons (non-functional)

### Content Analysis:
- Three sample courses with partial lessons and related assets; progress values hardcoded.
- Filters: level (all/beginner/intermediate/advanced); industry (all/SaaS/Marketing/Startup); sort (progress/duration/level).
- No loading/empty states; no personalization or recommendations surfaced.

---

## AI Analysis

### Component Map

| Component | Current State (Code) | Target State | Priority |
|-----------|---------------------|--------------|----------|
| Hero HighlightCard | Shows total courses, CTA to Training Spotlight | Add stats (time saved, courses in progress), personalized CTA | High |
| Search & Filters | Search input; level/industry chips; sort dropdown; link to spotlight | Add topic/skill filters, course length toggle, badges filter; persist selections | High |
| Course Card | Title, level badge, overview, tags, progress bar, Start/Resume; Save/Copy buttons not wired | Wire Save/Copy; add bookmark state, “recommended” badge, prerequisites, estimated completion | High |
| Related Assets strip | Links from data file; static | Enrich with pitch-kits/portfolio links, downloadable decks, lock icons for gated items | Medium |
| Recommendations | Missing | “Recommended for you” row based on profile/skills | Medium |
| Empty/Loading | Missing | Skeletons and empty guidance when filters return 0 | Medium |
| Analytics | Missing | Events for search/filter, card open, save, start/resume | Medium |
| Pagination/Load more | Missing | Pagination or incremental load at scale | Low |

### Data Requirements
- Courses: id, title, overview, level, industry, tags, duration, lessons (id/title/duration/summary/assets), progress %, status (not started/in-progress/completed), prerequisites, recommended next course(s).
- User data: last viewed lesson, bookmark state, completion dates.
- Assets: pitch kits, portfolio case studies, calculators, demo videos; access control flags.

### Integration Points
- Uses static `courses` array; needs API for user progress and course catalog.
- CTA ties to `/partners/academy/training-spotlight`; ensure recommendation service aligns.

---

## Validation Gates

**Ready for backend:** ❌ Pending content review
**Needs iteration:** ❌ Pending content review  
**Direction change:** ❌ Pending content review

**Decision:** ⏳ Awaiting content analysis

---

## Implementation Notes

- Replace hardcoded `courses` with API-backed data and user progress.
- Implement Save/Copy actions with persistence and toast feedback.
- Add empty/loading states and debounce search.
- Expand industries/topics to match catalog; add recommendation rail.

## Proposed Layout & Components (based on latest feedback)

- Hero: primary CTA “Resume spotlight” (last in-progress), secondary “Browse all”; show course count + time-saved stat.
- Filters: keep Search input; convert filters to dropdowns (reuse Settings-style dropdown component) for Level, Industry, Status (Not started/In progress/Completed), Sort (Progress/Duration/Level/Alphabetical); add “Need help picking?” and “Clear filters”.
- Recommended rail: horizontal “Recommended for you” cards; link to “Show all suggestions”.
- Catalog: 1-col mobile, 2-col desktop; cards per spec below; load more or infinite scroll.
- Empty/loading: skeleton hero + 3 cards; empty state “No exact match — here are closest options” + auto-widened results and “Reset filters”.
- Course card: Level + Industry pills (+ Recommended badge), title + one-line overview, progress bar with “xx% • x/y lessons”, metadata chips (duration, top tags/topics), actions: Start/Resume (primary), Save/Bookmark (stateful; auto-saved when started), Copy link; optional collapsed asset chips (pitch kit, portfolio, calculator), status hint (Not started/In progress/Completed).
- Behavior: filters default open on mobile; collapse into bar on desktop; soft-match empty state; bookmarks implicit for in-progress plus explicit “save for later”; recommendations driven by status + skill/industry cues, fallback to most-started.
