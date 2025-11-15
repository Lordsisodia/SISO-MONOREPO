# Progressive Unlock System — Day‑0 Plan (Partner Portal)

Purpose
- Unlock the whole app in Day‑0 for motivated partners (no deal requirements).
- Always show a clear next step; keep locks transparent with one‑tap CTAs.
- Use soft‑unlock timers (20/40/60 min) so exploration is never blocked.

Principles
- No hard dependency on closed deals.
- Safe actions remain action‑gated (e.g., payouts transfer) but pages are visible.
- Locks explain why + how to unlock (link to exact place).

Unlockable Units
- Nav icons (coarse): all visible; Earnings/Deals/Community post actions can be gated.
- Subpages (fine): Deals edit, Recruitment/Team Building, Wallet actions, Leaderboard join, Challenges join, #wins post, Academy advanced.
- Actions (micro): Submit Client, New DM, Invite Partner, Connect Payouts.

Day‑0 Timeline (suggested)
- T0–10 min — Account Basics
  - Accept Terms, verify email; Profile ≥60%; Language/Timezone.
  - Unlocked: Hub, Academy (Basics), Settings, Messages, Calendar, Tasks, Notes.
- T10–20 min — Orientation
  - Complete Academy > Getting Started (short module or checklist).
  - Unlocks: Deals (board edit), Leaderboard (view), Community posting in #general.
- T20–40 min — Earnings Basics
  - Connect payouts (Stripe) OR “Skip for later”.
  - Wallet page is always visible; payout actions gated until connect.
- T40–60+ min — Social & Recognition
  - Post hello in #general or draft first lead; earn a starter badge.
  - Unlocks: #wins post, Achievements (starter), Challenges (view or join if live).
- Soft‑unlock fallback: Any unopened area flips to explore mode at 20/40/60 minutes with an “Action required” banner for sensitive actions.

Entitlements Model (mock now, server later)
- feature_id → status: 'unlocked' | 'explore' | 'action_locked'
  - unlocked: full access
  - explore: page visible; sensitive actions disabled
  - action_locked: action needs a prerequisite (e.g., payouts connect)
- reasons: array of actionable reasons (e.g., 'profile_incomplete', 'training_incomplete', 'payout_unconnected').

Initial Entitlements (defaults)
- deals.edit: 'locked' → 'unlocked' after training_completed OR T+20.
- earnings.wallet.page: 'unlocked'; earnings.wallet.actions: 'action_locked' until stripe_connected.
- community.wins.post: 'locked' → 'unlocked' after training_completed OR lead_drafted OR T+40.
- earnings.leaderboard.view: 'locked' → 'unlocked' after training_completed OR T+20.
- earnings.challenges.view: 'locked' → 'unlocked' after training_completed OR T+40.
- academy.advanced: 'locked' → 'unlocked' after training_completed OR T+20.

Events (mock now)
- profile_updated, terms_accepted, training_completed, stripe_connected, lead_drafted, first_posted.

Client Implementation (Phase 1)
- useEntitlements(): in‑memory map + soft‑unlock timers (localStorage start timestamp).
- PermissionGate: wraps gated UI; reads entitlements; shows lock pill + info sheet with CTA.
- Wire gates on:
  - Deals edit, Recruitment/Team Building, Wallet actions, #wins post, Leaderboard join, Challenges.

Hub “Next Step” Card
- Step order: Getting Started → Connect Payouts (or Skip) → Draft a lead → Say hello in #general.
- Skipping advances the step and starts the soft‑unlock timer.

Copy / UI Surfaces
- Side‑nav lock pill + ℹ sheet (“How to unlock” → deep link).
- Page banners for Wallet/#wins/Tier Progress with contextual CTAs.
- Labels (short, single‑line):
  - Earnings: Overview, Wallet & Payouts, Tier Progress, Leaderboard, Achievements, Challenges.
  - Community: Messages, #general, #wins, #announcements, All Channels, All Partners, Help Center.
  - Settings: General, Notifications, Appearance, Profile, Security, Privacy, Legal.

QA Checklist (mock)
- New partner can navigate to all pages at T0; sees explore banners where actions are gated.
- Completing a step immediately updates entitlements; Hub card advances.
- At 20/40/60 min, soft‑unlocks flip remaining pages to 'explore'.
- Payout actions remain blocked until connect (safety exception).

Server Shape (later)
- GET /partners/me/entitlements → map + reasons + next_step.
- POST /partners/me/events → record step completion; reevaluate rules.
- Tables: partner_profile, partner_metrics, partner_events, entitlements.

Open Items / Nice‑to‑Have
- Projections in Overview; Statements export (CSV/PDF).
- Tier perks panel; shareable badges.
- Haptics on unlock; confetti micro‑feedback.

Ownership / Next
- Implement Phase 1 mock (client only), wire to Hub CTA and nav gates.
- Replace mock with server entitlements later without touching UI contract.
