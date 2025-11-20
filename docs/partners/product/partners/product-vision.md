# Client + Partner Product Vision (2025)

Mobile-first progressive web experience that unifies the **client-base storefront** and the **partners revenue portal** in the same monorepo. This doc replaces the 40-page PRD with the essentials you need to scope, design, or validate features.

## 🎯 Business Goals

| Goal | Target | Notes |
| --- | --- | --- |
| Revenue Share | 60% of company revenue sourced via partners | Partners act as the primary sales engine. |
| Onboarding | First partner deal closed within 30 days | Accelerate enablement through training + templates. |
| Retention | 90% 3‑month retention, 75% 6‑month retention | Keep partners active with gamified tiers and support. |
| Mobile Usage | 90% of interactions on mobile PWA | All UX decisions are mobile-first. |

## 🧱 Experience Pillars

1. **Discord-style collaboration** – real-time channels, reactions, file drops, and presence so partners operate like a team.
2. **Tiered progression** – four tiers (Starter → Active → Performer → Elite) that unlock commissions, tooling, and support.
3. **Pipeline + training in one place** – manage leads, log activity, download resources, complete certifications without leaving the app.
4. **Offline-first PWA** – works on flaky networks, sends push/in-app notifications, installable on iOS/Android.

## 🏅 Tier Snapshot

| Tier | Commission | Unlocks |
| --- | --- | --- |
| Starter (0‑2 deals) | 20% base | Core dashboard, basic resources, commission tracker. |
| Active (3‑9) | 22% + 5% referral | Lead CRM, analytics, advanced marketing kits, priority support. |
| Performer (10‑24) | 25% + 10% team override | Team management, white-label assets, account manager, beta access. |
| Elite (25+) | 30% + custom | Co-marketing, strategic deals, VIP support, leadership council. |

Progress combines deals closed, training completion, support engagement, and satisfaction scores. Each tier section in the old PRD has been condensed into this table; see `archive/MASTER-PRD-PARTNERSHIPS-PWA.md` for full copy if needed.

## 📱 Core Modules

1. **Partner Dashboard** – tier status, quick stats, activity feed, notification drawer.
2. **Lead Management** – Kanban/swipe pipeline, activity log, reminders, referral link generator.
3. **Training Hub** – channel-based knowledge base, video modules, quizzes, certifications.
4. **Team Collaboration** – channel + DM chat, announcements, voice clips, file sharing.
5. **Commissions & Earnings** – live payout tracker, breakdowns, payment methods, statements.
6. **Resources** – asset library with downloads, customization, analytics.
7. **Tier Progress & Leaderboard** – gamified progress bars, challenges, achievements.

## 👣 User Journeys (Condensed)

| Journey | Steps | KPI |
| --- | --- | --- |
| New Partner Onboarding | apply → install PWA → finish profile → training → first referral → first commission | Time to first deal |
| Daily Workflow | check dashboard → update leads → collaborate → use resources → log sale → review earnings | Daily active rate |
| Team Leader Loop | view team metrics → assign training → celebrate wins → recruit → review overrides | Growth of Performer+ cohort |

## 📊 Success Metrics

- **Lead-to-close**: 15%+
- **Avg deal size**: $1.5K
- **Monthly partner revenue**: $50K+
- **PWA performance**: <3s load on 3G, offline support, push delivery >95%
- **Partner satisfaction**: 4.5+/5 (NPS > 40)

Use this document as the single product reference. Implementation, architecture, and status live in the sibling files.
