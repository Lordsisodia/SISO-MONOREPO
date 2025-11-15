# Partnership Program Journey Map

**Scope:** End-to-end flow for partners across web PWA and mobile-first experience.  
**Last Updated:** November 5, 2025  
**Status:** Draft alignment pending visual wireframes.

---

## Global Navigation Principles
- Mobile is the primary target. Side drawers collapse into bottom tab bar patterns inspired by Real World (Andrew Tate) flows.
- Desktop keeps a three-column layout: navigation rail, primary content, context widgets (lists, activity, tasks).
- Every page listed below calls out the lists (data sources) required and the next-hop destinations to make the flow feel guided.
- Discord remains the outer container. Users arrive through Discord onboarding before unlocking in-app pages.

---

## Stage 1: Attract

**Primary Goal:** Convert cold traffic into qualified applicants.

### Surfaces
- `Public Landing / Partner Story` page (marketing site)
  - Hero explaining value proposition, CTA buttons to apply and to view portfolio work.
  - Case study carousel referencing `Case Studies / Highlights` list.
  - CTA surfaces dashboard preview and Discord community invite.
- `Case Studies / Highlights` list
  - Fields: title, metric headline, partner tier, link to long-form story.
  - Showcase quick wins to increase conversion.
- `Partnership Landing` page (post-Discord build)
  - Reuses client landing layout and colour scheme; highlights portfolio, dashboard preview, server resources.
  - Gate release until Discord server structure is finalised.

### Entry Paths
- Ads, organic, referrals -> Public Landing.
- LinkedIn/YouTube content -> Case Studies detail -> Apply.

### Next Destinations
- Apply CTA -> `Application` page.
- Discord invite -> `Discord Onboarding` (external) -> `Application` page once authenticated.
- Portfolio link -> opens SISO portfolio, returns to Application CTA.

---

## Stage 2: Activate

**Primary Goal:** Collect complete applications and onboard into portal.

### Surfaces
- `Application` page
  - Multi-step form (identity, experience, goals, compliance). Optional video intro upload.
  - Fields: name, location, languages, sales experience, preferred industry, current occupation, revenue target (6 months), compliance docs.
  - Includes progress tracker and status badges from `Application Checklist` list.
- `Application Checklist` list
  - Items: personal info, compliance docs, video intro, NDA, payment method (if needed).
  - Status columns: submitted, pending, approved.
- `Discord Onboarding` flow (external)
  - Drop applicants into Discord; lock portal surfaces until onboarding completes.
- `First-Login Setup` page
  - Profile basics, notification preferences, quick tour video.
  - Introduces `Start Here` guidance linking to Training Hub and Referrals Pipeline.

### Next Destinations
- Checklist completion -> triggers access unlock -> redirect to `Partner Dashboard (Home)`.
- Incomplete checklist -> `Support & Ticketing` or `Knowledge Base` for help.
- Notification preferences -> optional `Communication Hub` deep link.

---

## Stage 3: Enable

**Primary Goal:** Teach partners how to sell effectively and keep track of progress.

### Surfaces
- `Training Hub` page
  - Central catalog sorted by track (onboarding, sales, operations).
  - Houses quick filters, featured live sessions, and progress summary.
- `Course Catalog` list
  - Fields: module name, difficulty, duration, prerequisites, format, release status.
  - Connects to `Training Hub` cards; also referenced by `Training Nudges` on dashboard.
- `My Progress` list
  - Tracks completion percentage, last activity date, renewal requirement.
- `Certifications` list
  - Displays achieved badges, unlock criteria, expiry reminders.
- `Upcoming Live Sessions` list
  - Schedule, presenters, RSVP status, replay links.
- `Knowledge Base` page + `KB Articles` list
  - Search, topic tags, last updated timestamp, owner.

### Next Destinations
- Completed module -> unlock `Referrals Pipeline` stage tips.
- Certification earned -> triggers update in `Goals & Tier Progression`.
- Live session RSVP -> `Communication Hub` event thread.

---

## Stage 4: Pipeline

**Primary Goal:** Drive deals through structured referral process.

### Surfaces
- `Referrals Pipeline` page
  - Kanban view backed by `Referrals Board` list.
  - Quick actions: add referral, assign next task, view notes.
- `Referrals Board` list
  - Columns: referral id, partner id, client name, stage (New, Qualified, Negotiation, Closed Won, Closed Lost), expected close date.
- `Referral Detail` page
  - Shows history timeline, next action, linked tasks, documents.
- `Tasks / Next Actions` list
  - Shared across dashboard; includes due date, owner, priority.

### Next Destinations
- Referral moved to Negotiation -> surfaces `Knowledge Base` playbooks.
- Closed Won -> sends data to `Commissions & Earnings` and increments tier progress.
- Closed Lost -> prompts `Support` resources (feedback capture).

---

## Stage 5: Revenue

**Primary Goal:** Provide transparent earnings and payout management.

### Surfaces
- `Commissions & Earnings` page
  - Overview cards using `Earnings Overview` list/report.
  - Real-time calculator for potential commission based on active pipeline.
- `Earnings Overview` list/report
  - Metrics: month-to-date, year-to-date, trailing 90 days, trending delta.
- `Payouts` list
  - Status: scheduled, sent, failed; includes payout reference and method.
- `Commission Line Items` list
  - Per-deal breakdown with deal id, rate, amount, paid date.
- `Disputes` list
  - Tracks disputes, status, evidence link, resolution owner.
- `Rates & Overrides` list
  - Shows tier-based rates and special overrides; ties into `Goals & Tier Progression`.

### Next Destinations
- Failed payout -> open `Support & Ticketing` form pre-filled with payout info.
- Commission tier change -> update `Goals & Tier Progression` and `Leaderboard`.
- Dispute resolved -> notify via `Communication Hub` announcements.

---

## Stage 6: Grow

**Primary Goal:** Incentivise advancement through tiered goals and recognition.

### Surfaces
- `Goals & Tier Progression` page
  - Displays tier ladder, progress bars, upgrade requirements.
- `Tier Requirements` list
  - Criteria for Bronze, Silver, Gold, Platinum (placeholder numbers; pending decision on 20% -> 25% -> 30% -> leadership path).
- `My Goals` list
  - Individual targets, due dates, alignment to tier requirements.
- `Perks / Benefits` list
  - Unlockable perks per tier (eg. co-marketing, higher commission, team leadership eligibility).
- `Leaderboard & Achievements` page
  - Global and cohort leaderboards, badges gallery.
- `Leaderboards` list
  - Metrics: revenue, referrals, training points; filters for global, region, cohort.
- `Badges` list
  - Badge name, requirement, reward, expiry.
- `Analytics Dashboard` page
  - KPI cards, experiments, diagnostics to support growth decisions.
- `KPI Cards` list
  - Metrics for revenue generated, referral velocity, conversion, training progress, tier forecast.
- `Experiments` list
  - Tracks active A/B tests or growth experiments.

### Next Destinations
- Tier upgrade -> trigger announcement in `Communication Hub` and highlight on `Partner Dashboard`.
- Missed goal -> surface `Training Hub` remedial modules.
- Experiment results -> push insights to `Marketing Hub` playbooks.

---

## Stage 7: Engage

**Primary Goal:** Keep partners connected and informed.

### Surfaces
- `Communication Hub` page
  - Centralised announcements, broadcasts, segmented messaging.
- `Announcements` list
  - Fields: title, body, target segment, publish date, expiry.
- `Inbox / Threads` list
  - Direct messages, conversation threads, pinned resources.
- `Segments` list
  - Saved audiences: New Bronze, Top 10 Percent, Dormant, etc.
- `Community Rooms` page
  - Mirrors Discord topics; in-portal chat with pinned resources.
- `Rooms` list
  - Topic name, Discord channel link, pinned resources, moderators.

### Next Destinations
- Announcement CTA -> deep link to relevant page (eg. new course, live session).
- Segment creation -> sync with Discord roles via automation.
- Community Room message -> escalate to `Support` ticket if flagged.

---

## Stage 8: Support

**Primary Goal:** Resolve partner issues quickly.

### Surfaces
- `Support & Ticketing` page
  - AI concierge chat, ticket submission, status tracker.
- `Tickets` list
  - Columns: ticket id, type, priority, SLA timer, status (open, waiting on you, resolved).
- `SLA / Response` list
  - Policy definitions, SLA countdowns, breach alerts.
- `FAQ` page
  - Quick answers for frequently asked questions with links to full Knowledge Base articles.

### Next Destinations
- Ticket submitted -> track on dashboard `Recent Activity` and `Tasks` list.
- SLA breach -> escalate to internal ops dashboard (not in scope here).
- FAQ helpful -> mark to improve `Knowledge Base` ranking.

---

## Stage 9: Partner Dashboard (Home)

**Primary Goal:** Provide mission control snapshot.

### Surfaces
- `Dashboard` page
  - Overview of KPIs, training nudges, referrals summary, announcements, tasks.
- `KPIs` list
  - Total earnings, monthly pace, referral funnel conversion, tier progress.
- `Training Nudges` list
  - Suggested modules based on `Course Catalog` and `My Progress`.
- `Recent Activity` list
  - Latest referrals, payouts, announcements, certifications.
- `Tasks / Next Best Actions` list
  - Prioritised to-dos aggregated from Pipeline, Support, and Growth goals.

### Next Destinations
- Task click -> deep link to originating page (Pipeline, Support, Training).
- KPI anomaly -> open `Analytics Dashboard` diagnostics.
- Announcement snippet -> open full `Communication Hub` post.

---

## Stage 10: Marketing Resources

**Primary Goal:** Arm partners with shareable assets.

### Surfaces
- `Marketing Hub` page
  - Filters by funnel stage, industry, format.
- `Asset Library` list
  - File name, format, usage notes, download link, version.
- `Campaign Playbooks` list
  - Step-by-step guides with expected outcomes, assets, scripts.
- `Co-Brandable Templates` list
  - Editable materials (logos, CTAs, landing pages) with request workflow if custom branding is needed.

### Next Destinations
- Downloaded asset -> prompt to log referral in `Referrals Pipeline`.
- Playbook completion -> log success metrics into `Analytics Dashboard` experiments.
- Template request -> open `Support` ticket for brand approval.

---

## Stage 11: Settings / Profile

**Primary Goal:** Manage identity, preferences, teams, and security.

### Surfaces
- `Settings Hub` hub
  - Entry surface reached from bottom nav gear icon; opens sheet with quick links to sub-pages (`Settings`, `Profile`, `Checklist`, `Wallet`).
- `Profile` page
  - Editable name, avatar, contact info, payout details.
- `Notification Preferences` page
  - Toggle email, push, in-app, Discord DM alerts.
- `Checklist` page
  - Mirrors Activate stage tasks; allows daily cadence management and automation grouping.
- `Wallet` page
  - Personal payout history, balance, transfer methods (read-only until Revenue integration complete).
- `Team Members` page (future)
  - Manage invites, roles, permissions (visible when partner qualifies for team leader tier).
- `Members` list
  - Member name, role, join date, permissions.
- `Security` page
  - Password resets, two-factor auth, device sessions.

### Next Destinations
- Profile update -> refresh `Partner Dashboard` KPIs and `Communication Hub` segments.
- Checklist completion -> update `Tasks / Next Best Actions` list and feed achievements to `Goals & Tier Progression`.
- Wallet issue -> escalate to `Support & Ticketing` with payout context attached.
- Team invite -> creates onboarding tasks in `Tasks / Next Actions` list.
- Security alert -> send announcement in `Communication Hub` and log support ticket automatically.

---

## Link Graph Snapshot

| Stage | Primary Page | Key Lists | Direct Links Out |
| --- | --- | --- | --- |
| Attract | Public Landing | Case Studies, CTA events | Application, Discord |
| Activate | Application | Checklist, First-Login tasks | Dashboard, Support |
| Enable | Training Hub | Course Catalog, My Progress | Pipeline, Goals |
| Pipeline | Referrals Pipeline | Referrals Board, Tasks | Revenue, Support |
| Revenue | Commissions & Earnings | Earnings Overview, Payouts | Support, Grow |
| Grow | Goals & Tier Progression | Tier Requirements, Leaderboards | Engage, Analytics |
| Engage | Communication Hub | Announcements, Segments | Training, Support |
| Support | Support & Ticketing | Tickets, SLA | Dashboard, Knowledge Base |
| Dashboard | Home Dashboard | KPIs, Tasks | Pipeline, Training, Revenue |
| Marketing | Marketing Hub | Asset Library, Playbooks | Pipeline, Analytics |
| Settings | Profile | Members, Notification Prefs | Dashboard, Support |

---

## Data and Automation Considerations
- Every list should map to a Supabase table or view; record unique IDs to allow cross-page linking.
- Automations tie Discord role changes to portal unlocks (Activate -> Enable).
- Revenue, Grow, and Dashboard tiles must read from the same metrics service to prevent discrepancies.
- Capture analytics events for each CTA to monitor funnel conversion (eg. Landing -> Application start -> Application submit -> Dashboard access).

---

## Open Questions
1. Final commission tier thresholds (currently Bronze 20 percent, Silver 25 percent, Gold 30 percent, Leadership unlock after 10 closed deals - pending confirmation).
2. Requirements for allowing partners to recruit sub-teams (minimum deals? performance window?).
3. Whether Support automation should auto-close tickets when related tasks complete.
4. How experiments (Stage 6) integrate with marketing attribution in Stage 10.

Update this document as soon as design sprint artefacts or product changes land so all downstream teams stay aligned.
