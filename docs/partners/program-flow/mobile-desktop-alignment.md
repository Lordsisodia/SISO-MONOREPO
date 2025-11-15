# Mobile and Desktop Alignment Guide

**Reference:** Real World (Andrew Tate) mobile flow, adapted for Partnerships PWA.  
**Last Updated:** November 5, 2025  
**Status:** Awaiting screenshot drops.

---

## Folder Structure for Assets
- Add reference imagery to `docs/partners/program-flow/assets/reference/` (create if needed).
- Use naming format `stage-page-variant.png` (example: `stage02-application-mobile.png`).
- Document any annotated callouts in this file under the correct stage.

---

## Navigation Patterns
- **Mobile:** Bottom nav with five primary tabs (`Home`, `Pipeline`, `Training`, `Grow`, `More`). Floating action button opens quick actions (Add Referral, Log Activity, Contact Support).
- **Context Drawer:** Tapping the active tab triggers a sheet (Real World-style) exposing sub-nav like `Settings`, `Profile`, `Checklist`, `Wallet` without overcrowding the bar.
- **Desktop:** Left vertical rail mirrors tab order; right sidebar shows context lists (Tasks, Nudges, Announcements).
- **Discord Integration:** Deep links open Discord in-app browser on mobile; desktop launches web client in new tab.

### Bottom Nav Visibility Rules (Reference)
- Hide the bottom bar on deep detail screens (Saved Messages, Wallet detail) to maximise focus, and restore it automatically when stepping back.
- Keep it visible on hub or feed screens (Learning Center, Messages & Friends) to streamline tab switching.
- Ensure modal sheets and drawers include explicit close/back control so users are never trapped without navigation.

---

## Real World Mobile Reference Flow

1. **Initial State**
   - Five-button bottom bar visible on load.
   - Right-most three-dot button opens a bottom sheet listing `Settings`, `Profile`, `Checklist`, `Wallet`.
   - Choosing `Checklist` or `Wallet` keeps the bar visible so partners can bounce back quickly.
2. **Profile and Settings**
   - `Settings` reveals the long scroll of options (notifications, devices, affiliate dashboard, feedback, etc.).
   - `Profile` opens a modal with streaks, hero strip, and campus badges; modal hides the bar until dismissed.
3. **Campus Hub (left-most icon)**
   - Launches the platform feed with access to chats, resources, and profile doorway.
   - Sliding the left-edge burger opens the Discord-style drawer showing all sections; this view hides the bottom bar until you exit.
4. **Learning Center (second-from-left icon)**
   - Learning tabs (`Courses`, `In Progress`, `Favorites`) keep the bar visible; header carries search, filter, calendar.
5. **Notifications Hub (centre icon)**
   - Shows tabbed filters (`All`, `Chats`, `Learning`, `Unread`) while retaining the bottom bar for quick pivots.
6. **Messages and Friends (second-from-right icon)**
   - Entering the inbox hides the bar for focus; top-left burger icon reveals friends, saved messages, categories.
   - Closing the drawer or backing out restores the bottom bar.

Replicate these patterns in the partnership portal to lean on familiar muscle memory while wiring our bespoke content.

---

## Partnership Mobile Navigation Blueprint

| Bottom Icon | Working Name | Primary Destination | Bottom Bar Visible? | Notes |
| --- | --- | --- | --- | --- |
| 1 | Campus Hub | Drawer-driven platform overview (Discord-style channels, partner community) | Hidden once a channel is opened | Use to expose Community Rooms, announcements, and cross-stage quick links. |
| 2 | Learning | Training Hub entry (Stage 3) | Visible | Can later swap to another stage if Learning is reassigned; keeps segmented course tabs. |
| 3 | Notifications | Communication Hub inbox (Stage 7) | Visible | Pill filters (All, Chats, Learning, Tasks) mirror Real World for familiarity. |
| 4 | Messages | Direct messages, Saved threads | Hidden while inside a message thread | Burger icon restores drawer and, on exit, the bottom bar. |
| 5 | Quick Actions (three dots) | Bottom sheet with `Settings`, `Profile`, `Checklist`, `Wallet` | Visible in sheet; hidden when Profile modal is open | Add future entries like `Team Members` as tiers unlock. |

### Quick Actions Sheet Mapping
- **Settings Hub:** Links to notification preferences, connected devices, partner resources, logout.
- **Profile Modal:** Shows tier progress, streaks, and achievements; initiates edits to Stage 11 data.
- **Checklist:** Mirrors onboarding and daily cadence tasks (Stages 2 and 11), keeps bar visible for fast switching.
- **Wallet:** Surfaces payouts and balances (Stage 5 personal view) while retaining nav.

### Drawer Structure (Campus Hub)
- Group channels by journey stage: Attract (marketing assets), Enable (training discussions), Pipeline (deal rooms), Revenue (commission help), Support (ticket escalations).
- Include shortcuts back to dashboards or actions (Add Referral, Submit Ticket) so partners can launch workflows even when the bottom bar is hidden.

### Behaviour Summary
- **Hubs (Learning, Notifications, Checklist, Wallet):** bottom bar stays visible.
- **Deep Detail (Messages threads, Profile modal):** bottom bar hides until the user dismisses or backs out.
- **Drawer access:** Left-edge swipe or burger icon toggles the section list regardless of current tab.
- **Context continuity:** Returning from Quick Actions sheet or drawer restores the previous tab state without reloading content.

---

## Screen Templates

### Stage 1: Attract
- Mobile landing uses stacked hero -> social proof -> CTA -> highlights rhythm.
- Desktop hero includes split view (copy left, dashboard preview right).
- Embed CTA banner that persists on scroll (mobile sticky bottom, desktop right rail).

### Stage 2: Activate
- Application steps collapse into single-card wizard on mobile; progress indicator sits top-right.
- Checklist summary pins to bottom drawer on mobile; desktop shows side-by-side with form.
- Discord handoff uses modal with QR code (desktop) and deep link button (mobile).

### Stage 3: Enable
- Training Hub mobile layout: segmented controls top, cards in vertical stack, sticky filter drawer.
- Desktop supports multi-column card grid plus secondary column for My Progress.
- Live sessions tile includes count-down pill; on mobile reposition under card title.

### Stage 4: Pipeline
- Mobile Kanban uses horizontal swipe lanes with quick add button anchored bottom-right.
- Desktop shows full swimlanes with drag-and-drop; detail drawer slides from right when a card is selected.
- Tasks list on mobile collapses under referral detail accordion.

### Stage 5: Revenue
- Earnings cards present top-level stats first; charts hide legends by default on mobile.
- Desktop supports dual charts (MTD vs YTD) plus table; mobile toggles chart/table using segmented control.
- Dispute submission sits under `Commission Line Items` detail on both devices.

### Stage 6: Grow
- Goals page mobile: tier ladder as accordion; progress bars full width.
- Desktop: timeline view highlights current tier, next tier requirements, perks.
- Leaderboard mobile: swipe between metrics; desktop shows table with filters.

### Stage 7: Engage
- Communication Hub mobile uses inbox pattern (list -> detail); unread badges mirror Discord style.
- Community Rooms integrate inline voice channel button (greyed until Discord ready).
- Desktop shows three-pane layout (segments, feed, detail).

### Stage 8: Support
- Mobile assistant bubble persistently visible; tapping opens ticket composer.
- Desktop shows split view (ticket table + detail). SLA timers color shift as thresholds hit.

### Stage 9: Partner Dashboard
- Mobile: hero stack (KPI cards -> Tasks -> Training Nudges). Cards scroll horizontally to reduce vertical sprawl.
- Desktop: grid layout with resizable widgets; user can pin top priorities.
- Quick actions accessible via floating plus button (mobile) or header toolbar (desktop).

### Stage 10: Marketing Resources
- Asset Library on mobile: filter chip row, cards with quick copy buttons.
- Desktop: table view with preview pane; drag-and-drop to download queue.

### Stage 11: Settings / Profile
- Mobile: preferences segmented by collapsible sections; save button floats bottom.
- Sub-nav sheet surfaces `Settings`, `Profile`, `Checklist`, `Wallet` as quick pivots; use consistent icon language with bottom nav.
- Desktop: tabbed interface with summary card on the right (profile completeness, payout status).
- Team management surfaces only once partner attains qualifying tier (see Grow stage).
- Wallet view mirrors Revenue cards but scoped to personal payouts.
- Checklist view syncs with Activate stage tasks to preserve single source of truth.

---

## Reference Snapshots (Pending File Drops)
- `stage11-settings-mobile.png` - Settings hub with bottom sheet sub-nav.
- `stage11-profile-mobile.png` - Profile modal showcasing streaks, XP, roles.
- `stage11-checklist-mobile.png` - Checklist grouped by General vs Automation tasks.
- `stage07-inbox-mobile.png` - Inbox tabs covering All, Chats, Learning, Unread filters.
- `stage03-learning-center-mobile.png` - Learning Center card stacks with tabbed filters.
- `global-left-drawer.png` - Drawer listing Discord-style campuses/sections.
- `global-bottom-nav-hidden.png` - Example of detail screen with hidden nav bar.

Add screenshots to `assets/reference/` using the naming above and annotate the related stage bullets once available.

---

## Responsive Breakpoints (Draft)
- `xs` (0-479px): Mobile portrait. Default layout.
- `sm` (480-767px): Large phone / small tablet. Enables side-by-side card preview in some screens.
- `md` (768-1023px): Tablet landscape, small desktop. Introduce dual-column wherever data density matters.
- `lg` (1024-1439px): Standard desktop. Activate tri-column layout.
- `xl` (1440px+): Wide monitors. Consider expanding analytics charts and leaderboard tables.

---

## Interaction Parity Checklist
| Feature | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Add Referral | Floating action button | Header button | Keep form identical; use stepper on mobile |
| Complete Training Module | Inline video player + checklist | Video + companion doc column | Offline download TBD |
| Submit Tickets | Chat-first composer | Form + AI summary | Ensure drafts sync |
| Review Earnings | Card stack with drill-down | Dashboard grid with table | Animations optional |
| Tier Upgrade Celebration | Full-screen confetti modal | Modal + dashboard banner | Trigger from same event |

---

## Outstanding Assets
1. Real World mobile reference screenshots (Landing, Dashboard, Training, Earnings).
2. Discord role mapping diagram for onboarding locks.
3. Motion specs for revenue charts (optional).

Update this document as soon as new comps or device-specific behaviors are agreed.
