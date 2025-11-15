# Partnerships Mobile Shell Build Plan

**Objective:** Produce a mobile-first UI slice of the partnerships portal that mirrors the Real World navigation patterns, without wiring live data. Focus on architectural scaffolding so real data and Supabase integrations can slot in later.

**Target Stack:** Next.js 15 (App Router) + React 18 + TailwindCSS 3 + Zustand (UI state) + Radix UI primitives (optional) for accessible overlays.

---

## Stage 0: Prep Work (Day 0-1)
- **Audit Existing Monorepo:** Confirm there is no conflicting `/partners` app route and catalogue shared components in `packages/`.
- **Design Tokens:** Extend `tailwind.config.ts` with partnership-specific colors, spacing scales, typography, and dark mode defaults inspired by Real World palette.
- **Utility Scaffolding:** Add a `src/ui` folder with helpers (`cn.ts`, `useLockBodyScroll.ts`, responsive hooks).
- **Testing Harness:** Enable Vitest + React Testing Library for component snapshots; set up `msw` mocks later if needed.

Deliverables: Tailwind theme extension, shared utility exports, technical spike notes.

**Progress 2025-11-05:** Tailwind config updated with SISO palette, global color-system CSS imported, and base UI utilities (`cn`, `useLockBodyScroll`) scaffolded in `src/ui/`.

---

## Stage 1: Navigation Shell (Days 2-4)
- **Route Setup:** Create `src/app/partners/(mobile)/layout.tsx` with viewport meta tags, dark theme, and a `MobileShell` wrapper.
- **State Store:** Implement `src/app/partners/mobile/state/navigation-store.ts` using Zustand to track `activeTab`, `isQuickSheetOpen`, `isDrawerOpen`, and `activeModal`.
- **Bottom Bar Component:** `BottomNav.tsx` renders five buttons (`Campus`, `Learning`, `Notifications`, `Messages`, `Quick Actions`). Buttons drive Zustand state and highlight active tab.
- **Quick Action Sheet:** `QuickActionsSheet.tsx` uses Radix `Dialog` or Headless UI to slide up options (`Settings`, `Profile`, `Checklist`, `Wallet`). Keep stub click handlers for now.
- **Drawer:** `CampusDrawer.tsx` replicates Discord-style channel list grouped by stage. Accept static JSON for initial pass.
- **Layout Container:** `MobileShell` composes `CampusDrawer`, `BottomNav`, and a `ScreenViewport` area for tab content. Handles hiding/showing nav by listening to tab metadata (e.g., `messages` hides bar when `isDetail` flag true).

Deliverables: Working navigation frame with placeholder screens, barrel exports under `src/app/partners/mobile/components/index.ts`.

**Progress 2025-11-05:** Created `src/domains/partnerships/mobile` domain package (navigation store, tab registry, fixtures, UI shell) and wired new Next.js route at `src/app/partners/mobile` rendering the shell with static screens.

**Progress 2025-11-06:** Split stage-specific mobile components into their respective domains (`workspace`, `enablement`, `communications`, `activation`, `revenue`, `growth-hub`) with parallel `ui/mobile` and `ui/desktop` directories. The mobile shell now orchestrates those presenters instead of owning feature logic.

---

## Stage 2: Screen Stubs (Days 5-7)
Create minimal but styled placeholders for each primary tab and quick-action page. Use static mocks so UX can be reviewed.

| Screen | File | Notes |
| --- | --- | --- |
| Campus Hub | `tabs/campus/page.tsx` | Hosts marketing announcements and quick links; loads drawer automatically in story demo. |
| Learning | `tabs/learning/page.tsx` | Shows course cards, segmented filters, empty state messaging. |
| Notifications | `tabs/notifications/page.tsx` | List of cards with pill filters across top; use local JSON array. |
| Messages | `tabs/messages/page.tsx` | Inbox list + detail panel; include toggle to simulate entering a thread (hiding nav). |
| Quick Actions Pages | `quick-settings/page.tsx`, `quick-profile/page.tsx`, `quick-checklist/page.tsx`, `quick-wallet/page.tsx` | Each should be routable, styled, and wired to store to maintain nav visibility.

Deliverables: Styled tab pages, navigation transitions, mock data files in `fixtures/`.

---

## Stage 3: Interaction Polish (Days 8-10)
- Implement gestures/animations: use `framer-motion` or CSS transitions for drawer and sheet.
- Add haptic/tactile feedback hooks for mobile PWA (optional in this phase).
- Ensure scroll locking and focus trapping in sheets and modals.
- Wire keyboard navigation for accessibility (tab order, escape to close overlays).
- Add responsive breakpoints (`sm`, `md`) so layout gracefully expands on tablets/desktop preview.

Deliverables: Smooth transitions, accessibility checklist, updated component docs.

---

## Stage 4: Integration Hooks (Days 11-12)
Even without real data, add abstraction points so backend wiring is straightforward later.
- Define TypeScript interfaces for each surface (`NotificationCard`, `ChecklistTask`, `WalletEntry`).
- Introduce `useMockData()` hooks returning promises to emulate async fetch; later swap to Supabase queries.
- Document API expectations in `docs/partners/program-flow/mobile-data-contracts.md` (future step).

Deliverables: Type-safe props, stub data adapters, updated README instructions.

---

## Stage 5: Review & Hand-off (Day 13)
- Record loom/walkthrough demonstrating tab behaviour, sheet, drawer, modal, nav hide/show.
- Collect feedback from design + product; log deltas in `mobile-build-plan.md` changelog section.
- Prepare backlog tickets for upcoming data integration (Supabase wiring, analytics events, role-based gating).

Deliverables: Demo video, feedback log, JIRA/story breakdown.

---

## File/Folder Blueprint
```
src/app/partners/
  (mobile)/
    layout.tsx
    page.tsx                 # optional redirect to default tab
    MobileShell.tsx
    state/
      navigation-store.ts
    components/
      BottomNav.tsx
      BottomNavButton.tsx
      CampusDrawer.tsx
      QuickActionsSheet.tsx
      ProfileModal.tsx
      ScreenViewport.tsx
    tabs/
      campus/
        page.tsx
      learning/
        page.tsx
      notifications/
        page.tsx
      messages/
        page.tsx
    quick-actions/
      checklist.tsx
      settings.tsx
      profile.tsx
      wallet.tsx
    fixtures/
      notifications.ts
      checklist.ts
      courses.ts
      messages.ts
```

Shared UI elements (cards, pill filters, progress bars) should live under `src/ui/partners/` so they can be reused when desktop variants arrive.

---

## Open Questions
1. Should Campus drawer be globally accessible via gesture even when a modal is open? (Real World disables it.)
2. Do we need offline caching in this phase, or wait until data integration?
3. Which analytics events should fire for tab switches and quick-action selections?

Answer these before entering Stage 3 so implementation stays aligned.

---

## Next Actions Checklist
- [ ] Extend Tailwind theme with partnership tokens.
- [ ] Scaffold `MobileShell` layout and navigation store.
- [ ] Build bottom bar, drawer, quick-actions sheet with mocked data.
- [ ] Style tab pages with static fixtures.
- [ ] Polish interactions and accessibility.
- [ ] Document final component API expectations.
