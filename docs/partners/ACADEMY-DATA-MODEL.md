# Academy Data Model (Planning)

Status: UI‑first build; this document plans the future backend schema and API contracts.

## Core Entities

- Course
  - id, slug, title, summary, level, topics[], industryTags[], createdAt, updatedAt, isActive
  - relationships: lessons[] (ordered), relatedAssetIds[]
- Lesson
  - id, courseId, slug, title, durationSec, contentRef (CMS), relatedAssetIds[], createdAt, updatedAt
  - gating: requiresTier? (starter|active|performer|elite)
- Asset (Portfolio & Pitch Kit)
  - id, type (portfolio|pitch_deck|brand_kit|video|case_study|doc), title, description, industryTags[], capabilityTags[], fileRef/url, isPublic, publicSlug?, createdAt, updatedAt
  - sharing: if isPublic, resolve public url via `/{publicBase}/{publicSlug}`
- Industry
  - id, slug, label, isActive
  - source of truth can be config or CMS; clients may add custom industries later
- SavedItem
  - id, userId, entityType (asset|course|lesson), entityId, createdAt
  - future: labelIds[] for folders/tags
- Enrollment/Progress
  - id, userId, courseId, progressPct, lastLessonId, completedLessonIds[], updatedAt
- OnboardingStatus
  - userId, academyOnboardingCompleted (bool), completedAt?, checklistStepIds[], firstLessonCompleted (bool)
- PublicLink (optional)
  - id, entityType, entityId, slug, createdAt, expiresAt?, isRevoked
- AccessControl
  - userTier, allowedIndustries? (enterprise rules if needed)

## API Sketch

- GET /academy/courses (filters: topic, level, industry)
- GET /academy/courses/:id
- GET /academy/courses/:id/lessons
- GET /academy/lessons/:id
- GET /academy/assets (filters: industry, capability, type)
- GET /academy/assets/:id
- GET /academy/industry/:slug (returns curated lists or filter presets)
- POST /saved { entityType, entityId } / DELETE /saved/:id / GET /saved
- POST /progress { courseId, lessonId, action: start|complete|resume }
- POST /onboarding/complete { checklistIds, firstLessonCompleted }
- GET /public/:slug (serves public Pitch Kit/Portfolio assets when allowed)

## Indexing & Search

- Text indexes on course.title, lesson.title, asset.title, tags
- Compound index on assets (industryTags[], capabilityTags[], type)
- Progress lookups by userId+courseId

## Telemetry (to data warehouse)

- view_academy_landing(userId)
- start_course(userId, courseId)
- resume_lesson(userId, courseId, lessonId)
- complete_lesson(userId, courseId, lessonId)
- open_portfolio_asset(userId, assetId)
- copy_asset_link(userId, assetId, isPublic)
- save_item(userId, entityType, entityId)
- open_industry_page(userId, slug)

## Tier Gating Logic

- When a route is gated: respond 403 with payload `{ requiredTier, message, nextSteps }` for UI unlock modal.
- Soft gate option: return list but blur detailed content; include `gated: true` per item.

## Open Questions

- Public base path for decks (e.g., `/public/pitch`)?
- Who can create new industries in production (admin role, client org admins)?
- Do we version assets (e.g., deck v2) and keep links stable via `publicSlug`?

