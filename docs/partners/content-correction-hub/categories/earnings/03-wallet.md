# Page Template: Wallet & Payouts

## Page Metadata
- **Page Name**: Wallet & Payouts
- **Route**: `/partners/earnings/wallet`
- **File**: `src/app/partners/earnings/wallet/page.tsx`
- **Section**: Earnings
- **Status**: content needed
- **Priority**: release-critical

## Simple Questions (draft answers)
1. **What should this page do?** Show balances, payout schedule/status, ledger, payment methods, and compliance blockers.  
2. **Who uses it?** Partners ready to withdraw or audit payout status.  
3. **What's working now?** Full UI with ledger list, payout scheduling block, payment method cards, compliance checklist—all fed by mock data.  
4. **What's broken/missing?** All values placeholder; payout logic should be event-based (not bi-weekly); actions not wired; multi-currency missing; compliance items should be minimal for now; ledger filter pills should become a dropdown (per Settings pattern).  
5. **What data should show here?** Available/in-transfer/on-hold balances; next payout triggered by client payment (no minimum threshold); per-currency view (USD default + conversions); ledger entries with source links + dropdown filter; payout info note (event-based rules); payment methods (Stripe/bank/crypto) with real input forms; light compliance (KYC/ID only for now).  
6. **Who needs to approve this?** SISO finance/ops.

## AI Analysis (current state)
- **Component Analysis**: HighlightCard, ledger filter, payout scheduling block, payment methods grid, compliance checklist.  
- **Content Audit**: `$18,420 balance`, “Bi-weekly” cadence, generic ledger rows.  
- **Accessibility**: Buttons and badges OK; need table semantics for ledger? (list-based now).

## Technical Requirements (initial draft)
- **Data Needs**: balances per currency; payout events with status; ledger entries with type/status; payment methods auth/sync states; minimal compliance (KYC/ID).  
- **Integration Points**: Supabase payouts/ledger/compliance tables; Stripe Connect or banking rails; FX rates service for multi-currency view.  
- **State Management**: server fetch + client filters; optimistic updates for sync actions.

## Page Overview
- **Page Goal**: Answer “How much can I withdraw now and what’s blocking payouts?”  
- **Persona & Story**: Partner reconciling money movement and clearing holds.  
- **Success Metrics**: Fewer payout-ticket escalations; higher payment-method connection rate; compliance completion rate.

## Component Map
| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|--------------------|--------------------|-----------|
| Hero balance block | Mock balance/date | Live available/in-transfer/on-hold + FX line; optional circular chart for composition | Withdraw | FE |
| Ledger list + filters | Mock entries; pill filters | Live ledger w/ dropdown filter (all/earnings/bonus/deduction), pagination, source links | View proof | FE |
| Payout info block | Bi-weekly mock | Event-based payout explainer (no threshold; release when client pays) + last/next event chips | View details | FE |
| Payment methods | Stripe/bank/crypto mock | Real connection status + add/edit forms (saveable), set default, sync | Sync / Add | FE |
| Compliance checklist | Mock progress | Light KYC/ID tasks only (skip tax for now) | Complete task | FE |

## Data & Content Planning
- **Static Content**: Headings, labels, CTA text.  
- **Dynamic Content**: Amounts, dates, statuses, FX lines, method status, task progress.  
- **Media Assets**: Icons only.

## Technical Data Plan (stubs)
- **Tables**: payouts, ledger, payment_methods, (optional) compliance_tasks for KYC.  
- **Endpoints**: `/api/earnings/wallet` aggregate; `/api/earnings/ledger`; `/api/earnings/compliance`.  
- **Caching**: Minimal; prefer real-time/polling for balances.

## Implementation Checklist
- [ ] Replace cadence copy with event-based payout explainer (no minimum threshold; release when client pays)  
- [ ] Add multi-currency toggle/secondary display  
- [ ] Swap ledger pills for dropdown filter; add pagination  
- [ ] Connect payment method add/edit forms + sync + set default  
- [ ] Compliance actions (light KYC/ID only; allow hide if not needed)  
- [ ] Add circular chart for balance composition (available / in transfer / on hold)  
- [ ] States: loading/empty/hold/error

## Validation & Decision Gates
- ✅ Ready when balances/ledger reflect Supabase, payment method status mirrors provider, and compliance blockers match backend.

## Success Criteria
- **Accuracy**: Ledger matches payouts table.  
- **Clarity**: Holds/blocks clearly explain what to do.  
- **UX**: Multi-currency display consistent; actions succeed/rollback cleanly.

## Supporting Context
- Nav description notes “Stripe Connect” as payout rail; confirm still true.

---
