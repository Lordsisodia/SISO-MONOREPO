# Earnings Section Research Phase

**Date**: November 17, 2025  
**Analyst**: AI Assistant (Codex)

## Phase 1: Strategic Requirements (Partner Feedback & Current Understanding)

### 🎯 Primary Business Priority
- Give partners real-time visibility of commissions and payouts so they trust the program and can anticipate cash flow.
- Encourage behaviors that grow revenue (close deals faster, keep delivery quality high) by tying UI cues to earnings outcomes.

### 🛤️ User Journey (today’s hypothesis)
1) Land on earnings dashboard → sanity-check next payout & recent activity.  
2) Dive into wallet to confirm balances, status of withdrawals, and compliance blockers.  
3) Review overview to see cycle projection and pipeline-to-cash stages.  
4) Track tier progression, achievements, and challenges to understand what to do next for higher rates/bonuses.  
5) Check leaderboard daily for standing vs peers and bragging rights.

### 📝 Content Authority & Approvals
- SISO team approves all copy, figures, and rules (finance + ops + legal as needed).

### 📊 Data Requirements (as stated)
- **Source of truth**: Supabase for balances, payout history, ledger, compliance items (UI wiring pending).  
- **Payout timing**: “As soon as we get paid from clients” (event-driven), not fixed cadence.  
- **Currency**: Default USD; multi-currency view required (conversion + display rules to spec).  
- **Static/Config**: Tiers, achievements, challenges still undefined; need product decisions.  
- **Refresh**: Leaderboards target daily refresh; rest should feel near-real-time once wired.

### 🔗 Cross-Section Integration Ideas
- Community: auto-post wins/shoutouts; challenge completions → #wins channel.  
- Academy: completions can unlock boosters/tier points; earnings insights feed recommended courses.  
- Settings/Profile: payments + tax/KYC info; currency preferences.

### ✅ Success Criteria (draft)
- Partners can always answer: “How much will I get, when, and why?”  
- No placeholder numbers live in production builds.  
- Clear next-action prompts for unlocking more earnings (tiers/challenges).  
- Transparency on holds/deductions and compliance to prevent payout surprises.

## Phase 2: Observations From Current UI (code scan)

- **Global shells**: `EarningsPageShell` wraps all subpages; dashboard still using `CommunityPageShell` and static HighlightCard (`$4,200 next payout`).  
- **Data mocks**: All pages pull from local data files (e.g., `earningsOverview.ts`, `walletData.ts`, `tierProgression.ts`, `earningsAchievements.ts`, `earningsChallenges.ts`). No live data wiring yet.  
- **Placeholders to replace**:
  - Dashboard “What’s trending” stats (commission rate, payout streak, top deals).  
  - Overview hero stats, payout history rows, pipeline stages, quick actions.  
  - Wallet balances, payout schedule, compliance checklist, ledger items, payment methods.  
  - Tier targets/benefits/missions/history values.  
  - Achievements badges/leaderboard/shoutouts; Challenges definitions and progress.  
- **Refresh assumptions**: Leaderboard subtitle says “refreshed hourly” in UI code; user prefers daily—needs decision.

### 📂 Additional Findings From Repo Docs
- **Nav config gating** (`docs/partners/partnership-navigation-config.json`): Earnings pages exist for dashboard, overview, wallet, tier progress, achievements, leaderboard, challenges. Leaderboard & challenges require at least **Active** tier; others allow **Starter**.  
- **Tier naming conflicts**: Nav config uses `starter/active/performer/elite`; UI code uses `Starter/Active/Prime/Collective`; older audits mention Bronze/Silver/Gold. Need alignment.  
- **Legacy payout assumption**: Partnership audit doc lists **20% base commission, monthly payouts** (now superseded by event-based payouts you stated—flagged to update).  
- **Commission center needs** (partner-portal audit): detailed breakdowns, tax docs, multi-currency, withdrawals—reinforces wallet/overview scopes.  
- **Navigation description**: Wallet path notes “Stripe Connect” as payout method (pending confirmation if still true).

## Phase 3: Open Questions To Resolve

1) **Event-based payouts**: Define rules for “paid when we’re paid” (e.g., per-invoice status events, min thresholds, FX handling).  
2) **Multi-currency display**: Which currencies supported? Spot rate source? Do we store ledger in USD and convert, or store per-currency?  
3) **Wallet actions/CTAs**: Exact verbs (Withdraw, Request transfer, Export statement, Add bank, Add tax doc). Which require KYB/KYC gating?  
4) **Compliance states**: What statuses/holds can occur (tax pending, KYC fail, clawbacks) and how to message them?  
5) **Tier model**: Final tier names, unlock metrics (revenue, deals, NPS, streaks), and benefits per tier. Are boosters percent-based or flat bonuses?  
6) **Achievements**: What real badges exist now vs planned? Which events award them? Any expirations or seasonal resets?  
7) **Challenges cadence**: Weekly vs seasonal; points vs payout multipliers; team vs solo rules; how to enroll/exit.  
8) **Leaderboard scopes**: Global vs cohort/region/industry; privacy rules; tie-break order; daily vs hourly refresh.  
9) **Audit trail**: Do partners need exportable statements (CSV/PDF)? How long to retain history?  
10) **Notifications**: When to push alerts (payout released, hold added/removed, tier progress, challenge milestones).

## Phase 4: Initial Data+Content Plan (what we can pre-spec now)

- **Balances & payouts**: Show “available”, “in transfer”, “on hold”; next payout derived from latest client payment event.  
- **Ledger**: Types = earnings, bonus, deduction; status = released, processing, hold. Include note + link to proof.  
- **Compliance checklist**: Tax (W-9/W-8), KYC, bank verification; each with % progress and CTA.  
- **Multi-currency view**: Toggle or secondary line showing converted amount; store base in USD until broader rollout.  
- **Historical table**: Last N payouts with source (deal/bonus/referral), amount, status; export button.  
- **Pipeline-to-cash**: Mirror deals pipeline counts with SLA per stage; needs mapping to deals service.  
- **Leaderboard**: Daily refresh; metric likely “payouts this season” + secondary “bonus points”; tabs for region/industry/newcomers can stay if data supports filters.  
- **Challenges/Achievements**: Keep current UI structure, but mark all items “placeholder”; will replace once rules are confirmed.  
- **Tier progression**: Keep four-tier layout but flag names/rates as provisional; benefits table ready for real values.

## Next Steps (for stakeholder review)
- Confirm answers to the open questions above (especially payout events, currency rules, tier metrics).  
- Once answers are in, clone `page-template.md` per earnings page to capture page-specific data/CTAs and map each UI component to its live data source and copy.
