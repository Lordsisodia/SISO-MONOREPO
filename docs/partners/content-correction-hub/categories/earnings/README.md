# Earnings

Earnings surfaces commissions, payouts, wallet activity, tier momentum, and gamified milestones. The existing UI uses static numbers—this doc exists to tie every section to its intended data source and messaging so we can swap real values directly.

As always, mirror `../templates/page-template.md` for each page you work through.

## Page inventory
| Page | Route | File | Notes / next action |
| --- | --- | --- | --- |
| Earnings dashboard | `/partners/earnings` | `src/app/partners/earnings/page.tsx` | HighlightCard and quick links use placeholder totals (e.g., `$4,200 next payout`). Capture the actual payout cadence, the CTA text (“Open wallet”), and what “trending” values should be shown here. |
| Earnings overview | `/partners/earnings/overview` | `.../overview/page.tsx` | Shows cashflow trends and payout summaries—identify which tables/charts need live data and what copy explains the calculation. |
| Wallet payouts | `/partners/earnings/wallet` | `.../wallet/page.tsx` | Document the exact statuses (pending, settled), the CTA for requesting transfers, and what currency formatting is required. |
| Tier progression | `/partners/earnings/tier-progression` | `.../tier-progression/page.tsx` | Should list tier requirements. Define the metrics that unlock each tier, requirement text, and the milestone copy. |
| Achievements | `/partners/earnings/achievements` | `.../achievements/page.tsx` | Populate the achievement tiles with real badges/goals and decide on the supporting copy for how to earn them. |
| Leaderboard | `/partners/earnings/leaderboard` | `.../leaderboard/page.tsx` | Determine whether this shows global vs. cohort leaders, how often it refreshes, and any privacy notes. |
| Challenges | `/partners/earnings/challenges` | `.../challenges/page.tsx` | Describe each challenge, its rewards, deadlines, and the CTA that kicks off the challenge. |

## Planning notes
- Verify whether we need to support multiple currencies or localizations when we replace the wallet copy.
- Document exactly which milestones belong to “tier progression” (Starter, Active, Performer, Elite) so each row has the right copy.
- For leaderboard/challenges, record the cadence (weekly, quarterly) and how the data will be sourced (e.g., is it a feed from the commissions service or manual entry?).
