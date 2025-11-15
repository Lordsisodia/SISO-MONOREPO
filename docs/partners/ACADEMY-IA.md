# Academy IA — URLs, Flows, Interlinking

Source of truth: `docs/partners/partnership-navigation-config.json` (Academy section). This doc defines canonical URLs under `/partners/academy/...`, page purposes, and how pages link to each other and to the rest of the partner app.

Why this doc: Academy spans learning, assets, and industry resources. Clear URLs + explicit cross‑links let us ship quickly and keep navigation intuitive.

---

## Canonical URL Schema

Top‑level namespace
- `/partners/academy` — Academy landing (curated quick starts and deep links)

Primary pages
- `/partners/academy/getting-started`
- `/partners/academy/courses`
- `/partners/academy/portfolio`
- `/partners/academy/pitch-kit`
- `/partners/academy/saved`
- `/partners/academy/training-spotlight`
- `/partners/academy/industry/:slug` (e.g., `saas`, `ecommerce`, `healthcare`, `finance`)

Nested pages (detail views)
- `/partners/academy/courses/:courseId`
- `/partners/academy/courses/:courseId/:lessonId`
- `/partners/academy/portfolio/:assetId` (optional; can be drawer or modal on list)
- `/partners/academy/pitch-kit/:assetType` (assetType in `brand-kit|decks|demo-videos|case-studies|objection-handling`)

Querystring conventions
- Portfolio filters: `?industry=saas&capability=pos&tag=mobile`
- Courses list: `?topic=sales&level=beginner&sort=progress`
- Saved Docs: `?type=asset|course|lesson`

Aliases for existing paths (no breaking links)
- Map the config’s `/partner/...` routes to the canonical `/partners/academy/...` (Next.js rewrite/redirect). Examples:
  - `/partner/academy/getting-started` → `/partners/academy/getting-started`
  - `/partner/training-spotlight` → `/partners/academy/training-spotlight`
  - `/partners/learning/*` → `/partners/academy/*` (legacy alias)

MobileShell tab mapping
- Treat `/partners/academy/*` as the “learning” tab so the Academy is highlighted in the side‑nav while browsing any academy page.

---

## Page Objectives (Academy)

Landing — `/partners/academy` (powered by `TrainingHubScreen`)
- Primary objective: Offer a curated, low‑friction entry into learning and assets.
- Modules: Continue learning (resume), Getting Started card, Spotlight, Shortcuts (Portfolio, Pitch Kit, Saved), Industry strip.
- First‑visit behavior: Show a dismissible prompt banner to start Getting Started (no hard redirect). Banner persists until onboarding is complete.

Getting Started — `/partners/academy/getting-started`
- Primary objective: Onboard new partners and unlock core skills.
- Completion (marks Academy onboarding complete): First checklist steps + first lesson completed + explicit “Mark complete”.
- Interlinks: Checklist quick action; first course in Courses; Office Hours booking; Saved Docs for reference materials.
- Skip logic: “Skip for now” allowed; resume banner persists on Landing.

Courses — `/partners/academy/courses`
- Primary objective: Structured curriculum with progress tracking.
- Interlinks: Course → Lesson; Lesson → related Portfolio assets; Lesson → Pitch Kit assets; Save to Saved Docs.

Course detail — `/partners/academy/courses/:courseId`
- Primary objective: Orient and start learning; show syllabus & progress.
- Interlinks: Start/resume lesson; link back to list; related assets.

Lesson — `/partners/academy/courses/:courseId/:lessonId`
- Primary objective: Deliver the lesson with minimal friction.
- Interlinks: Next/Prev lesson; Open related Portfolio/Pitch Kit; Save to Saved Docs; “Need help?” → Messages/Support.

Portfolio — `/partners/academy/portfolio`
- Primary objective: Provide proof assets to send prospects.
- Interlinks: Open asset; Copy link; Save; Jump to Industry page pre‑filtered; Related courses.

Pitch Kit — `/partners/academy/pitch-kit`
- Primary objective: Ready‑to‑send sales materials.
- Structure: Sub‑routes for shareable deep links (e.g., `/pitch-kit/decks`).
- Interlinks: Open asset type; Download/Copy link; Save; link to Portfolio items used as proof.
- Sharing: Pitch decks can be public (configurable per asset). If public, expose a public link base; otherwise partner‑only.

Saved Docs — `/partners/academy/saved`
- Primary objective: Personal library for quick reuse.
- Interlinks: Open source page; Remove; Share to prospect; Move to folder (future).

Industry Resources — `/partners/academy/industry/:slug`
- Primary objective: Curate assets and angles per industry.
- Slugs: Start with a set list (evolves over time). Future source can be config or CMS.
- Interlinks: Deep‑link into Portfolio and Pitch Kit with filters via querystring.

Training Spotlight — `/partners/academy/training-spotlight`
- Primary objective: Nudge one most‑impactful lesson/asset.
- Interlinks: Start lesson; save; see why this was recommended.

---

## Interlinking Rules (Contracts)

Cross‑page linking primitives
- AssetCard: `{ open(), copyLink(), saveToSaved(), share() }`
- CourseCard: `{ openCourse(), resume(), saveToSaved() }`
- LessonPlayer: `{ next(), prev(), saveToSaved(), openRelatedAsset(id) }`

Standard cross‑links
- Course → Lesson: Always provide Resume button and Next Lesson CTA.
- Lesson → Portfolio/Pitch Kit: Each lesson may declare `relatedAssetIds` for quick open.
- Industry → Portfolio/Pitch Kit: Clicking curated items opens those pages with filters via querystring.
- Getting Started → Courses/Checklist: Buttons link to first course and to Quick Action “checklist”.
- Everywhere → Saved: One‑tap Save to Saved Docs.
- Help path: “Need help?” links to Messages (partners/messages) or Support (partner/support alias), with returnTo set.

Breadcrumbs (desktop) and mini‑crumbs (mobile)
- Academy > Section > Item > Lesson
- Examples
  - Academy › Courses › “Enterprise Sales 101” › “Discovery Basics”
  - Academy › Portfolio › “Restaurant Ordering App”

Back/Next behavior
- Lessons: persistent Next/Prev; completion updates progress and unlocks next.
- Returning from asset detail brings user back to filter context.

Tier gating (from config)
- Industry pages require at least `active` tier; show locked state with modal: perks + “How to unlock”.

---

## Navigation Integration

Side‑nav active state
- Any `/partners/academy/*` URL selects the Academy icon in the side‑nav.

Quick actions surfaced in Academy
- From the side‑nav long‑press on Academy, open quick actions: `training-spotlight`, `saved` (optional addition).

URL rewrites/aliases (implementation outline)
- Next config: rewrite `/partner/academy/*` → `/partners/academy/*` and `/partner/training-spotlight` → `/partners/academy/training-spotlight`.
- MobileShell: treat `/partners/academy` like `/partners/learning` for tab state.
 - Public routes: `/public/pitch/:slug` and `/public/portfolio/:slug` serve public‑enabled assets.

---

## Data & Telemetry

State
- Progress: course/lesson completion, resume pointer.
- Saved: per‑user saved entities (asset, course, lesson).
  - Flat list now = one simple list per user (no folders). Future: optional `labels[]` to simulate folders/tags.

Events (examples)
- view_academy_landing, start_course, resume_lesson, complete_lesson, open_portfolio_asset, copy_asset_link, save_item, open_industry_page.

---

## Open Questions
- Do we want `/partners/academy` to show a curated grid or redirect to Getting Started for first‑time users?
- Should Pitch Kit sub‑assets be anchors within one page or child routes (e.g., `/pitch-kit/decks`)?
- Are industry slugs fixed (`saas`, `ecommerce`, `healthcare`, `finance`) or dynamic from CMS?
- Do we want a universal “returnTo” param on support links to bounce back to the lesson?

---

## Next Steps (proposed)
1) Add rewrites from `/partner/*` to `/partners/academy/*` (no breaking links).
2) Update MobileShell tab detection to treat `/partners/academy/*` as the learning tab.
3) Scaffold routes under `src/app/partners/academy/*` with minimal pages that render into the existing MobileShell.
4) Add shared components for Save/Copy/Related (AssetCard, CourseCard, LessonPlayer contract above).
5) Implement locked state wrapper that reads tier from auth context.
