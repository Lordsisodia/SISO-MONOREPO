# Community Section Research Phase

**Date**: November 17, 2025  
**Analyst**: AI Assistant (Codex)

## Phase 1: Strategic Requirements (User Feedback)

### 🎯 Primary Business Priority
- Make Community the always-on conversation space for all partners (new, top sellers, recruiters) to talk, celebrate wins, and see key updates without leaving the portal.

### 🛤️ User Journey Understanding
- Land on Community dashboard → skim widgets for each channel (General, Wins, Announcements, Messages, Help) → click through to the relevant page → engage (chat, react, read) → return to dashboard for a quick pulse.

### 🗂️ Channel Purposes & Permissions
- **General**: Open chat for all partners; free-form conversation; partners can post/reply. No banned topics or special moderation notes.
- **Wins**: Auto-generated posts for milestones such as deals closed, course completions, challenges, new partner joins, earning milestones. All partners can view; posting is automated (not manual). Partners can react.
- **Announcements**: Auto-created announcements (releases, program updates, critical notices). All partners can view; reactions allowed; comments/replies not allowed.
- **Messages (DMs/threads)**: Partner-to-partner messaging; users can reply, start new messages, and pin conversations. (Columns/statuses still to define.)
- **Help**: TBD; goal is to add collections/articles after we define common questions per page.

### 🧭 Posting & Visibility Rules
- Visibility: All partners can see all Community content.
- Posting rights: General is open; Wins and Announcements are automated; Announcements are non-replyable but support reactions.

### ⏱️ Timeline
- Target for “real content” pass: **3 days** from today (November 20, 2025).

## Enhanced Requirements & Notes

### 📊 Dashboard Widgets (Community home)
- Plan: Card/widget per page (General, Wins, Announcements, Messages, Help) showing a small slice of data, with click-through to the full page.
- **KPIs decided**: new announcements (7d), new wins (7d), unread messages, active threads today, new partners joined (7d), reactions earned (7d). Widgets-per-page approach stays.

### 💬 Messages / Inbox
- Current intent: users can reply, start new conversations, and pin messages. Feature is “already made quite well.”
- Columns/actions (agreed options): columns `participants`, `snippet/last message`, `lastActivityAt`, `unreadCount`, `pinned`, `type` (DM/group/system), `priority` (normal/high), `tags` (deal/course/support); actions `open/reply`, `mark unread`, `pin/unpin`, `archive`, `snooze(optional)`; filters `unread`, `pinned`, `@mentions`, `type`, `tag`.
- Thread detail: **include** detail pane with participants, pinned context (deal/course link), tags, reactions, attachments, quick-reply templates.

### 🏆 Wins Content
- Triggers: deals closed, course completions, challenges finished, new partner joins, earning milestones (“different for different wins”).
- **Schema (agreed)**: base fields `winId`, `type`, `partnerId`, `partnerName`, `timestamp`, `title/summary`, `reactionsCount`, `pointsAwarded`, `ctaLink`; deal-specific `dealValue`, `commission`, `industry`, `product`, `dealStageClosed`, `clientName?`; course completion `courseId`, `courseName`, `level`, `timeToComplete`, `badgeAwarded`; challenge `challengeId`, `challengeName`, `difficulty`, `streakDays?`; new partner `referrerId?`, `cohort`, `onboardingStep`; earning milestone `milestoneType`, `amount`, `period`.
- Data source: Supabase (all Community data will come from Supabase).

### 📣 Announcements
- Auto-generated; reactions allowed; no replies.
- **Categories/fields (agreed)**: categories `release`, `program-update`, `maintenance/outage`, `promotion/incentive`, `compliance/legal`, `event/webinar`; fields `announcementId`, `category`, `title`, `summary`, `body`, `ctaLabel/ctaLink`, `severity` (info/warn/critical), `pinnedUntil`, `publishedAt`, `publishedBy`, `attachments[]`, `allowReactions` (yes), `allowReplies` (no).

### 📚 Help Center
- Starter collections: Getting Started with Community; Wins Playbook; Announcements & Alerts; Messaging & Threads; Profile & Directory; Troubleshooting. Starter article list drafted in `09-help-center.md`.

### 🌐 Data & Integrations
- Backend source: Supabase for messages, wins, announcements, and related stats.
- UI-first focus now; real data wiring later.

## Current-State Scan (code)
- **Dashboard `/partners/community`**: Highlight card hard-codes `3 active threads`, `Wins posted this week: 4`, `Announcements: 2 unread`; quick links are static. No live data wiring.
- **Channels**: General, Wins, Announcements, All Channels routes exist; General/Wins redirects to channel screens. Content pulled from local presets (no Supabase).
- **Channel presets** (`src/domains/partnerships/community/data/channelPresets.ts`): Mock highlights, guidelines, pinned cards, and messages; metrics like “Active Today 82 partners,” “Deals Celebrated 12 this week.” Composer locked for Wins/Announcements.
- **Messages**: `/community/messages` and `/messages/[threadId]` reuse `MobileShell`; columns/filters not defined; thread page is the same shell (no extra context).
- **Partner Directory**: `/community/all-partners` uses `partnerDirectory.ts` mock profiles.
- **Help Center**: `help-center.ts` includes generic collections (Wallet, Onboarding, Growth, Trust & Safety, Connections, Product updates); not tailored to Community yet.

## Remaining Decisions / Notes
- Reaction points: award points; **no cap** specified (documented as such).
- Rate limits/guardrails: none specified; document “no limits set, open posting”.

## Success Criteria (Draft)
- Partners can see and navigate to all channels from the dashboard widgets.
- Wins and Announcements populate automatically from Supabase with reactions enabled.
- General chat allows open partner conversation with minimal friction.
- Messages support replying, starting new threads, and pinning; table shows the right columns for quick triage (to be defined).
- Help center has at least starter collections/articles or clear placeholders.
- Content/KPIs finalized by November 20, 2025 for real-data pass.

## Next Steps
- Collect answers to the open questions above.
- Lock v1 scope for the 3-day content pass (which pages/components must be populated).
- Draft the planned KPIs and widget snippets for the dashboard.
- Define minimal schemas for Wins and Announcements so placeholder text can be replaced with real field labels.
