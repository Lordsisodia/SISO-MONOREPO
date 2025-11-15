# SISO Partnership Program — Page Objectives & Content Plan

Source of truth: `SISO-MONOREPO/docs/partners/partnership-navigation-config.json` (last updated 2025-11-10).
Scope: All pages accessible via the Partnership mobile side‑nav and linked shortcuts.

How to use this doc
- Keep the first bullet as the Primary Objective. It drives UX decisions.
- Each page lists Content Modules, Key CTAs, Data/Integration notes, States, and Telemetry.
- Treat this as a living spec. Update alongside any nav changes.

Legend
- Audience/Tier: Starter | Active | Performer | Elite
- State keywords: empty, loading, error, gated (tier‑locked), offline
- Telemetry verbs: view, interact, submit, success, error

---

## Partnership Hub

### /partner/dashboard — Overview
- Primary objective: Give partners a fast, confidence‑building snapshot of earnings, deals, and tier progress.
- Content modules: Earnings summary, active deals widget, tier progress bar, quick links, recent activity.
- Key CTAs: Submit client, view wallet, today’s tasks, book office hours.
- Data/integrations: Commissions service, deals CRM, tier engine.
- States: empty (new user), loading skeletons, error fallback.
- Telemetry: view_dashboard, click_quick_link, open_deal, view_tier_details.

### /partner/announcements — Updates
- Primary objective: Communicate official program/product news and ensure critical updates are seen.
- Content modules: Announcements feed, pinned items, filters (all/critical), unread markers.
- Key CTAs: Mark all read, view details, share link, give feedback.
- States: empty (no updates), loading, error.
- Telemetry: view_updates, mark_read, open_announcement.

### /partner/activity — Recent Activity
- Primary objective: Provide a chronological audit of partner‑specific events (deals, payouts, badges).
- Content modules: Timeline feed, filters (deals/payouts/tier), deep links.
- Key CTAs: Filter by type/date, jump to item (deal, payout).
- Telemetry: view_activity, filter_activity, open_activity_item.

### /partner/wins-feed — Wins Feed
- Primary objective: Inspire and educate by showcasing partner wins.
- Content modules: Wins cards, tags (industry), search, reactions.
- Key CTAs: React, view case study, share template.
- Telemetry: view_wins, react_win, open_case_study.

### /partner/quick-actions — Quick Actions
- Primary objective: Centralize the top partner actions for speed.
- Content modules: Action grid (Submit client, Portfolio, Message SISO, Wallet, Checklist, Settings).
- Key CTAs: Execute action, reorder (future), customize shortcuts.
- States: personalized suggestions when repeated usage detected.
- Telemetry: view_quick_actions, launch_quick_action.

### /partner/submit-client — Quick Action
- Primary objective: Capture a potential client with the fewest possible fields.
- Content modules: Minimal form (name, company, contact, need), lead source, notes.
- Key CTAs: Submit, save draft, attach files, share intake link.
- Data: write to deals CRM; trigger notifications.
- States: validation errors, duplicate detection, success confirmation.
- Telemetry: submit_client_start, submit_client_success, submit_client_error.

### /partner/academy/portfolio — View Portfolio
- Primary objective: Provide proof assets partners can send to prospects.
- Content modules: Project cards, filters (industry, capability), spotlight, copy share link.
- Key CTAs: Copy link, open case study, save to Saved Docs.
- Telemetry: view_portfolio, filter_assets, copy_share_link.

### /partner/support — Message SISO
- Primary objective: Open a conversation with Partner Success fast.
- Content modules: Contact form or DM thread, suggested help articles.
- Key CTAs: Start chat, schedule call, attach files.
- Telemetry: start_support_chat, open_help_article.

### /partner/prospects — Today’s Work
- Primary objective: Focus partners on the highest‑leverage next actions.
- Content modules: Prospects board, due‑today tasks, nudges.
- Key CTAs: Advance stage, message client, schedule demo.
- Telemetry: view_focus, advance_stage, complete_task.

### /partner/active-deals — Active Deals
- Primary objective: Manage deals in motion with clarity and speed.
- Content modules: Pipeline kanban, deal detail drawer, activity log.
- Key CTAs: Update stage, add note, request asset.
- Telemetry: view_pipeline, open_deal, update_stage.

### /partners/workspace/tasks?filter=today — Today’s Tasks
- Primary objective: Drive daily execution and completion.
- Content modules: Checklist, quick adds, reminders.
- Key CTAs: Complete, snooze, assign.
- Telemetry: view_tasks_today, complete_task, snooze_task.

### /partner/tier-progress — Progress & Recognition
- Primary objective: Make the path to the next tier obvious and motivating.
- Content modules: Progress bar, required deals, unlocked perks table, estimate to next tier.
- Key CTAs: View requirements, see perks, share progress.
- Telemetry: view_tier_progress, view_perk, click_next_steps.

### /partner/leaderboard — Leaderboard
- Primary objective: Showcase top performers and create healthy competition.
- Content modules: Rankings, time ranges, filters (region/tier).
- Key CTAs: View profile, challenge CTA, congratulate.
- Telemetry: view_leaderboard, filter_leaderboard, open_partner_profile.

### /partners/workspace/calendar/office-hours — Office Hours
- Primary objective: Let partners self‑serve time with the team.
- Content modules: Schedule slots, booking form, confirmation.
- Key CTAs: Book, reschedule, add to calendar.
- Telemetry: view_office_hours, book_slot, cancel_slot.

---

## Academy

### /partners/academy — Training Hub
- Primary objective: Academy dashboard surface with widgets linking into every Academy area.
- Content modules: Hero + quick links for Getting Started, Courses, Saved Docs, Pitch Kit, Training Spotlight, and office hours status widgets.
- Key CTAs: Open each Academy widget, book office hours, continue training.
- Telemetry: view_academy_hub, open_academy_widget.

### /partners/pipeline-ops — Pipeline Ops dashboard
- Primary objective: Give a high-level view of deals, recruitment, and actions.
- Content modules: Highlight hero, quick widgets for prospects/active deals/recruitment, trending metrics, and CTA strip.
- Key CTAs: View prospects, review active deals, open recruitment tools.
- Telemetry: view_pipeline_dashboard, open_pipeline_widget.

### /partners/earnings — Earnings dashboard
- Primary objective: Surface commission stats, payouts, and tier momentum.
- Content modules: Highlight hero card, widget list linking to Overview/Wallet/Tier pages, and trending metrics.
- Key CTAs: Open wallet, view tier progress, jump into earnings overview.
- Telemetry: view_earnings_dashboard, open_earnings_widget.

### /partners/community — Community dashboard
- Primary objective: Center hub for chats, spotlight, wins, and help.
- Content modules: Highlight hero, quick links for messages/training/help, highlight summary of pinned/wins.
- Key CTAs: Open general chat, visit training spotlight, open help center.
- Telemetry: view_community_dashboard, open_community_widget.

### /partners/workspace — Workspace dashboard
- Primary objective: Overview of calendar, tasks, notes, and files.
- Content modules: Highlight hero, fast links to calendar/tasks/notes/files, plus the workspace demo client widget.
- Key CTAs: Open calendar, view tasks, access notes.
- Telemetry: view_workspace_dashboard, open_workspace_widget.

### /partners/academy/getting-started — Getting Started
- Primary objective: Guide partners through the onboarding checklist, first lesson, and support links.
- Content modules: Orange hero HighlightCard with start/mark-complete actions, resume banner with skip for later, checklist callout, and supporting callouts for first lesson, Saved Docs, and office hours.
- Key CTAs: Start first lesson, toggle checklist items, mark complete, open Saved Docs, book office hours.
- Telemetry: view_getting_started, complete_checklist_step, mark_onboarding_complete, skip_onboarding.

### /partners/academy/courses — Courses
- Primary objective: Searchable catalog of lessons plus related assets.
- Content modules: HighlightCard hero, filters/search callout, course cards (progress, save/copy), related asset links, and a quick CTA to Training Spotlight.
- Key CTAs: Start/resume, save to Saved Docs, copy link, open related asset, view detail.
- Telemetry: view_courses, start_course, save_course, open_related_asset.

### /partners/academy/courses/:courseId — Course detail
- Primary objective: Show syllabus, related proof, and CTA actions for a course.
- Content modules: Course callout, syllabus list linking to lessons, related assets callout.
- Key CTAs: Start lesson, save course, copy link, open related asset.
- Telemetry: view_course_detail, open_lesson, save_course.

### /partners/academy/courses/:courseId/:lessonId — Lesson
- Primary objective: Deliver the lesson with preview, supplemental assets, and support links.
- Content modules: Lesson callout (start/mark complete/save/share), related asset callout, next/prev navigation, “need help?” CTAs.
- Key CTAs: Mark complete, save to Saved Docs, share link, request help.
- Telemetry: view_lesson, start_lesson, copy_lesson_link, save_lesson.

### /partners/academy/training-spotlight — Training Spotlight
- Primary objective: Highlight one high-impact lesson, explain why it matters now, and surface quick actions plus proof links.
- Content modules: Orange HighlightCard hero, dual SettingsGroupCallouts (why now + preview), paired callouts (impact metrics + prep list), and a step list with support CTA.
- Key CTAs: Start lesson, save to Saved Docs, copy/share link, play preview, open lesson plan.
- Telemetry: view_spotlight, start_spotlight, copy_spotlight_link, save_spotlight_to_saved.

### /partner/academy/portfolio — Portfolio
- Primary objective: Central gallery of proof assets (duplicate link from Hub for discoverability).
- Content modules: Filters, case study cards, asset detail.
- CTAs/Telemetry: see Portfolio above.

### /partners/academy/pitch-kit — Pitch Kit
- Primary objective: Surface ready-to-send sales materials with filters, guidance, and CTA actions.
- Content modules: Orange hero callout + asset-type pills, twin SettingsGroupCallouts (filters/search + how-to), asset grid inside callout (open/download, copy link, save/share), and supporting sections (recommended bundles, support CTA).
- Key CTAs: Open/download asset, copy link, save/share, bundle combo, request custom asset.
- Telemetry: view_pitch_kit, open_pitch_asset, copy_pitch_link, save_pitch_asset, request_custom_asset.

### /partners/academy/saved — Saved Docs
- Primary objective: Personal library of bookmarked assets.
- Content modules: Orange hero callout with stats, paired filter/shortcut callouts, and a deep list callout where every card can open, copy, or share.
- Key CTAs: Open source, copy link, share, remove.
- Telemetry: view_saved_docs, open_saved_item, remove_saved_item, copy_saved_item.

### /partner/academy/industry/{saas|ecommerce|healthcare|finance} — Industry Resources
- Primary objective: Curate assets and angles per industry.
- Content modules: Pain points, pitch angles, case studies, scripts.
- Key CTAs: Copy script, open case study, share.
- Telemetry: view_industry_resources, copy_script, open_case_study.

---

## Pipeline Ops

### /partner/prospects — My Prospects
- Primary objective: Track and qualify early‑stage leads.
- Content modules: Prospects board/list, lead score, next action suggestions.
- Key CTAs: Qualify, schedule intro, convert to deal.
- Telemetry: view_prospects, qualify_lead, convert_to_deal.

### /partner/active-deals — Active Deals
- Primary objective: Execute on in‑flight opportunities.
- Content modules: Kanban, deal details, task links.
- Key CTAs: Advance, log activity, request help.
- Telemetry: view_deals, advance_stage, log_activity.

### /partner/submit-client — Submit Client
- Primary objective: Fast intake funnel for new opportunities. See also Quick Action.

### /partner/recruitment — Recruitment (if present)
- Primary objective: Recruit new partners and track overrides.
- Content modules: Invite links, recruit list, status.
- Key CTAs: Invite, resend, view earnings.
- Telemetry: view_recruitment, send_invite.

---

## Earnings (Growth)

### /partners/earnings/overview — Overview
- Primary objective: Give a clear understanding of commissions earned and pending.
- Content modules: Earnings summary, pipeline-to-payout timeline, recent payouts, quick actions.
- Key CTAs: View payout calendar, export statements, submit proof.
- Telemetry: view_earnings_overview, quick_action_selected, export_statements.

### /partners/earnings/wallet — Wallet & Payouts
- Primary objective: Manage payout rails and see balances.
- Content modules: Balance, payout schedule, connected accounts (Stripe Connect), history.
- Key CTAs: Connect account, withdraw, update details.
- Telemetry: view_wallet, connect_payout, withdraw_request.

### /partners/earnings/tier-progression — Tier Progress
- See Hub → Progress & Recognition.

### /partners/earnings/achievements — Achievements
- Primary objective: Display badges earned and motivate collection.
- Content modules: Badge grid, requirements, progress.
- Key CTAs: View how to unlock, share badge.
- Telemetry: view_achievements, view_badge_detail.

### /partner/leaderboard — Leaderboard
- See Hub section.

### /partners/earnings/challenges — Challenges
- Primary objective: Encourage participation in time‑boxed competitions.
- Content modules: Current/Upcoming challenges, rules, prizes, standings.
- Key CTAs: Join, submit proof, view results.
- Telemetry: view_challenges, join_challenge, submit_challenge_proof.

### /partners/earnings/achievements — Achievements
- Primary objective: Showcase badges earned, next unlocks, and recognition stats.
- Content modules: Trophy case, featured badges, category filters, leaderboard, shoutouts.
- Key CTAs: Share win, view badge criteria, request review.
- Telemetry: view_achievements, filter_category, share_win.

### /partners/earnings/tier-progression — Tier Progression
- Primary objective: Help partners understand requirements, benefits, and history of their tier climb.
- Content modules: Hero progress card, breakdown gauges, benefits matrix, missions, history timeline, manual review CTA.
- Key CTAs: View benefits, start missions, ask for review.
- Telemetry: view_tier_progress, start_mission, request_review.

---

## Community

### /partner/community/messages — Messages
- Primary objective: Facilitate DMs and small group chats.
- Content modules: Conversation list, unread, composer, file share.
- Key CTAs: New message, invite to group, mute.
- Telemetry: view_messages, send_message, open_thread.

### /partners/community/channels/general-chat — #general-chat
- Primary objective: Program‑wide discussion room.
- Content modules: Channel feed, pinned messages, guidelines.
- Key CTAs: Post, react, report.
- States: read‑only for Starter if policy requires; post at Active+.
- Telemetry: view_channel, post_message, react.

### /partners/community/channels/wins — #wins
- Primary objective: Celebrate successes and share learnings.
- Content modules: Posts with template (before/after, outcome), reactions.
- Key CTAs: Post win, react, copy template.
- Telemetry: view_wins_channel, post_win.

### /partners/community/announcements — #announcements
- Primary objective: One‑way official updates feed.
- Content modules: Pinned updates, release notes, tags.
- Key CTAs: Acknowledge, open details, give feedback.
- Telemetry: view_announcements_channel, acknowledge_update.

### /partners/community/all-channels — All Channels
- Primary objective: Discover and join channels.
- Content modules: Channel directory, search, join/leave.
- Key CTAs: Join channel, mute.
- Telemetry: view_channel_directory, join_channel.

### /partner/community/messages?tab=partners — All Partners
- Primary objective: Browse partner directory and start a DM.
- Content modules: Directory, filters, profile quick view.
- Key CTAs: Message, view profile.
- Telemetry: view_partner_directory, start_dm.

### /partners/community/help — Help Center
- Primary objective: Self‑serve answers and reduce support load.
- Content modules: Search, categories, top articles, contact path.
- Key CTAs: Open article, contact support, book office hours.
- Telemetry: view_help, search_help, open_article.

---

## Workspace

### /partners/workspace/calendar — Calendar
- Primary objective: Give a unified view of scheduled events.
- Content modules: Month/week/day views, filters (type), RSVP.
- Key CTAs: Add to calendar, RSVP, join session.
- Telemetry: view_calendar, rsvp_event.

### /partners/workspace/calendar/office-hours — Office Hours
- See Hub.

### /partners/workspace/calendar/webinars — Webinars
- Primary objective: Promote and manage training sessions.
- Content modules: Upcoming list, recordings, registration.
- Key CTAs: Register, add to calendar, watch recording.
- Telemetry: view_webinars, register_webinar, watch_recording.

### /partners/workspace/tasks — Tasks
- Primary objective: Centralized task management.
- Content modules: Lists (onboarding/personal/assigned), due dates, comments.
- Key CTAs: Complete, assign, add.
- Telemetry: view_tasks, complete_task, add_task.

### /partners/workspace/notes/my-notes — My Notes
- Primary objective: Personal note space tied to partner journey.
- Content modules: Notes list, editor, tags, search.
- Key CTAs: New note, pin, share to support.
- Telemetry: view_notes, create_note, search_notes.

### /partners/workspace/files/my-files — My Files
- Primary objective: Private document storage.
- Content modules: File list, upload, preview.
- Key CTAs: Upload, move, share link.
- Telemetry: view_files, upload_file, open_file.

### /partners/workspace/files/clients — Client Files
- Primary objective: Deal‑specific materials by client.
- Content modules: Client picker, files, versions.
- Key CTAs: Upload to client, link to deal.
- Telemetry: view_client_files, upload_client_file.

### /partners/workspace/files/shared — Shared Files
- Primary objective: Team‑accessible assets.
- Content modules: Shared directories, permissions.
- Key CTAs: Share, request access.
- Telemetry: view_shared_files, request_access.

---

## Settings

### /partner/settings/general — General
- Primary objective: Quick controls for theme, notifications, language, and summaries.
- Content modules: Appearance, notifications, language/region, integrations quicklinks.
- Key CTAs: Save, reset, manage integrations.
- Telemetry: view_settings_general, save_settings.

### /partner/settings/notifications — Notifications
- Primary objective: Configure email, push, and in‑app preferences.
- Content modules: Channels (updates/deals/chats/tasks), quiet hours, device overrides.
- Key CTAs: Save, test notification, mute categories.
- Telemetry: view_settings_notifications, save_notifications.

### /partner/settings/profile — Profile
- Primary objective: Manage public profile and partner identity.
- Content modules: Name, bio, photo, links, contact.
- Key CTAs: Save, preview profile.
- Telemetry: view_settings_profile, save_profile.

### /partner/settings/devices — Connected Devices
- Primary objective: Manage devices and sessions.
- Content modules: Device list, revoke, add new device.
- Key CTAs: Revoke, log out all.
- Telemetry: view_settings_devices, revoke_device.

### /partner/settings/appearance — Appearance & Accessibility
- Primary objective: Personalize visual/accessibility preferences.
- Content modules: Theme, contrast, font size, motion, haptics.
- Key CTAs: Save, reset defaults.
- Telemetry: view_settings_appearance, save_appearance.

### /partner/settings/language — Language & Region
- Primary objective: Set locale preferences.
- Content modules: Language, timezone, number/currency formats.
- Key CTAs: Save.
- Telemetry: view_settings_language, save_language.

### /partner/settings/integrations — App Integrations
- Primary objective: Link external tools partners use.
- Content modules: Notion, Google Drive/Docs, Calendar connectors.
- Key CTAs: Connect, disconnect, sync now.
- Telemetry: view_settings_integrations, connect_integration.

### /partner/settings/security — Security
- Primary objective: Strengthen account security.
- Content modules: Password, 2FA, active sessions, recovery.
- Key CTAs: Enable 2FA, revoke session.
- Telemetry: view_settings_security, enable_2fa.

### /partner/settings/privacy — Privacy
- Primary objective: Manage data control and consent.
- Content modules: Data export, delete account, marketing consent.
- Key CTAs: Export, request deletion, update consent.
- Telemetry: view_settings_privacy, export_data, request_delete.

### /partner/settings/legal — Legal
- Primary objective: Surface agreements and version info.
- Content modules: Terms, Privacy Policy, Partner Agreement, build version.
- Key CTAs: Open documents, acknowledge changes.
- Telemetry: view_settings_legal, open_legal_doc.

---

## Implementation Notes (shared)
- Access control: Lock items by tier; show unlock modal with benefits and required deals.
- Navigation: All items reachable from mobile side‑nav; preserve route parity for desktop.
- Empty states: Provide helpful copy, “what to do next”, and a CTA per page.
- Performance: Use skeletons; lazy‑load heavy lists (messages, files, portfolio).
- Observability: Emit view/interaction events per page; add error/success events to forms.
- SEO: Internal portal pages are private; public case studies or docs should include canonical titles and descriptions separately.
- Localization: All visible strings in pages above should be wrapped for i18n.

---

## Open Questions
- Should “Today’s Work” merge tasks + deals into one prioritized list on mobile?
- Which external CRMs or calendars are in scope for v1 integrations?
- What are the SLAs for support response via /partner/support?
- Do we enable saved views for Pipeline and Earnings out of the gate?
