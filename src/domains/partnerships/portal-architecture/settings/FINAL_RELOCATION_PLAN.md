# Final Settings Route Relocation Plan

**Date**: 2025-11-11
**Status**: ✅ User Confirmed - Ready to Execute

---

## User Decisions

### Routes to REMOVE from Settings (4 routes):

1. ✅ **Membership/Tiers** → Move to `earnings/tier-progress/` (already exists there)
2. ✅ **Affiliate Dashboard** → Move to `recruitment/invite-partners/` (combine with referrals)
3. ✅ **Refer a Friend** → Move to `recruitment/invite-partners/`
4. ✅ **What's New** → Move to `community/announcements/` (it's announcements)

### Routes to RELOCATE within Settings (1 route):

5. 🔄 **Provide Feedback** → Move to `partnership-hub/support/` (support/help section)

---

## Detailed Actions

### 1. Tiers → Earnings/Tier Progress

**Current Locations**:
- `settings/membership/` (empty skeleton folder)
- OLD: `partnerships/settings/ui/mobile/screens/tiers/TierListScreen.tsx`

**Target Location**:
- ✅ `portal-architecture/earnings/tier-progress/ui/TierListScreen.tsx` (ALREADY EXISTS!)

**Actions**:
```bash
# Delete empty skeleton folder
rm -rf settings/membership/

# Delete old location
rm -rf ../../partnerships/settings/ui/mobile/screens/tiers/

# Remove from settings-route-registry.ts
# Delete the "settings-membership" entry

# Update quick-action routes to use:
# Path: /partner/tier-progress
```

**Settings Registry Update**:
```typescript
// REMOVE this entry:
{
  id: "settings-membership",
  slug: "membership",
  path: "/partners/settings/membership",
  title: "My Tiers",
  quickActionId: "settings-membership",
  component: lazy(() => import("@/domains/partnerships/settings/ui/mobile/screens/tiers/TierListScreen")),
}
```

---

### 2. Affiliate Dashboard → Recruitment/Invite Partners

**Current Location**:
- `settings/affiliate/ui/AffiliateDashboardView.tsx`

**Target Location**:
- `portal-architecture/recruitment/invite-partners/ui/AffiliateDashboardView.tsx`

**Actions**:
```bash
# Check if recruitment folder exists
ls portal-architecture/recruitment/ || mkdir -p portal-architecture/recruitment/invite-partners/ui

# Move affiliate dashboard
mv settings/affiliate/ui/AffiliateDashboardView.tsx \
   ../recruitment/invite-partners/ui/AffiliateDashboardView.tsx

# Delete affiliate folder from settings
rm -rf settings/affiliate/
```

**Settings Registry Update**:
```typescript
// REMOVE this entry:
{
  id: "settings-affiliate",
  slug: "affiliate-dashboard",
  path: "/partners/settings/affiliate-dashboard",
  title: "Affiliate Dashboard",
  quickActionId: "settings-affiliate",
  component: lazy(() => import("./affiliate/ui/AffiliateDashboardView")),
}
```

**New Location**: Create recruitment route registry or add to main nav

---

### 3. Refer a Friend → Recruitment/Invite Partners

**Current Location**:
- `settings/referrals/ui/ReferAFriendView.tsx`

**Target Location**:
- `portal-architecture/recruitment/invite-partners/ui/InvitePartnersScreen.tsx`

**Actions**:
```bash
# Move referrals
mv settings/referrals/ui/ReferAFriendView.tsx \
   ../recruitment/invite-partners/ui/InvitePartnersScreen.tsx

# Delete referrals folder from settings
rm -rf settings/referrals/
```

**Settings Registry Update**:
```typescript
// REMOVE this entry:
{
  id: "settings-refer",
  slug: "refer-a-friend",
  path: "/partners/settings/refer-a-friend",
  title: "Refer a Friend",
  quickActionId: "settings-refer",
  component: lazy(() => import("./referrals/ui/ReferAFriendView")),
}
```

**New Route**: `/partner/recruitment`

---

### 4. What's New → Community/Announcements

**Current Location**:
- `settings/whats-new/ui/WhatsNewView.tsx`

**Target Location**:
- `portal-architecture/community/announcements/ui/WhatsNewView.tsx` OR
- Create separate `community/whats-new/ui/` if announcements is for team broadcasts only

**Navigation Shows**:
```json
{
  "id": "announcements",
  "label": "# announcements",
  "path": "/partner/community/announcements",
  "description": "Read-only product and program updates"
}
```

**Actions**:
```bash
# Check announcements structure
ls portal-architecture/community/announcements/ui/

# Option A: Merge into announcements
mv settings/whats-new/ui/WhatsNewView.tsx \
   ../community/announcements/ui/WhatsNewView.tsx

# Option B: Keep separate as community/whats-new
mkdir -p ../community/whats-new/ui
mv settings/whats-new/ui/WhatsNewView.tsx \
   ../community/whats-new/ui/WhatsNewView.tsx

# Delete from settings
rm -rf settings/whats-new/
```

**Settings Registry Update**:
```typescript
// REMOVE this entry:
{
  id: "settings-whats-new",
  slug: "whats-new",
  path: "/partners/settings/whats-new",
  title: "What's New",
  quickActionId: "settings-whats-new",
  component: lazy(() => import("./whats-new/ui/WhatsNewView")),
}
```

**New Route**: `/partner/community/announcements` (or `/partner/community/whats-new`)

---

### 5. Provide Feedback → Partnership Hub/Support

**Current Location**:
- `settings/feedback/ui/ProvideFeedbackView.tsx`

**Target Location**:
- `portal-architecture/partnership-hub/support/ui/ProvideFeedbackView.tsx`

**Navigation Shows**:
```json
{
  "id": "contact-support-link",
  "label": "Contact Support",
  "path": "/partner/support",
  "description": "Chat with the SISO team"
}
```

**Actions**:
```bash
# Check support structure
ls portal-architecture/partnership-hub/support/

# Create UI folder if needed
mkdir -p ../partnership-hub/support/ui

# Move feedback
mv settings/feedback/ui/ProvideFeedbackView.tsx \
   ../partnership-hub/support/ui/ProvideFeedbackView.tsx

# Delete from settings
rm -rf settings/feedback/
```

**Settings Registry Update**:
```typescript
// REMOVE this entry:
{
  id: "settings-feedback",
  slug: "provide-feedback",
  path: "/partners/settings/provide-feedback",
  title: "Provide Feedback",
  quickActionId: "settings-feedback",
  component: lazy(() => import("./feedback/ui/ProvideFeedbackView")),
}
```

**New Route**: `/partner/support` (integrate into support page)

---

## Updated Settings Structure (After All Moves)

```
settings/
├── domain/                          ← Shared types
│   ├── types.ts
│   └── index.ts
│
├── menu/                            ← Shared navigation
│   ├── SettingsPanel.tsx
│   ├── settings-menu.config.ts
│   └── index.ts
│
├── components/                      ← Shared components
│   ├── SettingsDetailLayout.tsx
│   └── index.ts
│
├── settings-route-registry.ts       ← Single source of truth
├── index.ts                         ← Barrel export
│
├── account/                         ✅ KEEP - Account management
│   └── ui/
│       ├── AccountSettingsView.tsx
│       └── index.ts
│
├── notifications/                   ✅ KEEP - Notification preferences
│   └── ui/
│       ├── AccountNotificationsView.tsx
│       └── index.ts
│
├── profile/                         ✅ KEEP - Profile editing
│   └── ui/
│       ├── ProfileSettingsView.tsx
│       └── index.ts
│
├── devices/                         ✅ KEEP - Connected sessions
│   └── ui/
│       ├── ConnectedDevicesView.tsx
│       └── index.ts
│
├── general/                         🔄 PLANNED - General settings dashboard
│   └── ui/
│       ├── GeneralSettingsScreen.tsx
│       └── index.ts
│
├── appearance/                      🔄 PLANNED - Theme & accessibility
│   ├── domain/
│   ├── application/
│   └── ui/
│
├── language/                        🔄 PLANNED - i18n & localization
│   ├── domain/
│   ├── application/
│   └── ui/
│
├── integrations/                    🔄 PLANNED - OAuth connections
│   ├── domain/
│   ├── application/
│   └── ui/
│
├── privacy/                         🔄 PLANNED - Data controls
│   ├── domain/
│   ├── application/
│   └── ui/
│
├── security/                        🔄 PLANNED - Password & 2FA
│   ├── domain/
│   ├── application/
│   └── ui/
│
└── legal/                           🔄 PLANNED - Terms & policies
    └── ui/
        ├── LegalSettingsScreen.tsx
        └── index.ts
```

---

## New Locations Created

### Recruitment (New Section)

```
recruitment/
├── invite-partners/
│   └── ui/
│       ├── InvitePartnersScreen.tsx      ← From settings/referrals
│       ├── AffiliateDashboardView.tsx     ← From settings/affiliate
│       └── index.ts
└── README.md
```

**Routes**:
- `/partner/recruitment` - Main recruitment/invite page

---

### Partnership Hub/Support (Enhanced)

```
partnership-hub/
└── support/
    ├── ui/
    │   ├── ProvideFeedbackView.tsx        ← From settings/feedback
    │   ├── SupportScreen.tsx              ← Main support page
    │   └── index.ts
    └── README.md
```

**Routes**:
- `/partner/support` - Contact support & feedback

---

### Community/Announcements or What's New

**Option A**: Merge into announcements
```
community/
└── announcements/
    └── ui/
        ├── AnnouncementsScreen.tsx
        ├── WhatsNewView.tsx               ← From settings/whats-new
        └── index.ts
```

**Option B**: Keep separate
```
community/
├── announcements/
│   └── ui/
└── whats-new/
    └── ui/
        ├── WhatsNewView.tsx               ← From settings/whats-new
        └── index.ts
```

**Routes**:
- `/partner/community/announcements` - Product updates
- `/partner/community/whats-new` - Release notes (if separate)

---

## Settings Route Registry (After Cleanup)

**Total Routes**: 11 (down from 16)

### Live Routes (4):
1. ✅ My Account - `/partners/settings/account`
2. ✅ Notifications - `/partners/settings/account/notifications`
3. ✅ Profile - `/partners/settings/profile`
4. ✅ Connected Devices - `/partners/settings/connected-devices`

### Planned Routes (7):
5. 🔄 General Settings - `/partners/settings/general`
6. 🔄 Appearance - `/partners/settings/appearance`
7. 🔄 Language & Region - `/partners/settings/language`
8. 🔄 Integrations - `/partners/settings/integrations`
9. 🔄 Privacy - `/partners/settings/privacy`
10. 🔄 Security - `/partners/settings/security`
11. 🔄 Legal - `/partners/settings/legal`

### Removed Routes (5):
- ❌ My Tiers → `/partner/tier-progress` (earnings)
- ❌ Affiliate Dashboard → `/partner/recruitment` (recruitment)
- ❌ Refer a Friend → `/partner/recruitment` (recruitment)
- ❌ Provide Feedback → `/partner/support` (partnership-hub)
- ❌ What's New → `/partner/community/announcements` (community)

---

## Execution Order

### Phase 1: Create Target Folders
```bash
# Create recruitment structure
mkdir -p ../recruitment/invite-partners/ui

# Create support UI folder
mkdir -p ../partnership-hub/support/ui

# Decide on announcements structure (Option A or B)
# Option A: use existing announcements/ui/
# Option B: create whats-new/ui/
```

### Phase 2: Move Files
```bash
# Move tiers (just cleanup, already exists in earnings)
rm -rf settings/membership/
rm -rf ../../partnerships/settings/ui/mobile/screens/tiers/

# Move affiliate
mv settings/affiliate/ui/AffiliateDashboardView.tsx \
   ../recruitment/invite-partners/ui/AffiliateDashboardView.tsx

# Move referrals
mv settings/referrals/ui/ReferAFriendView.tsx \
   ../recruitment/invite-partners/ui/InvitePartnersScreen.tsx

# Move feedback
mv settings/feedback/ui/ProvideFeedbackView.tsx \
   ../partnership-hub/support/ui/ProvideFeedbackView.tsx

# Move whats-new (choose option)
mv settings/whats-new/ui/WhatsNewView.tsx \
   ../community/announcements/ui/WhatsNewView.tsx
   # OR
   ../community/whats-new/ui/WhatsNewView.tsx
```

### Phase 3: Clean Up Settings
```bash
# Delete relocated folders
rm -rf settings/affiliate/
rm -rf settings/referrals/
rm -rf settings/feedback/
rm -rf settings/whats-new/
```

### Phase 4: Update Settings Registry
```typescript
// settings-route-registry.ts
// Remove these 5 entries:
// - settings-membership
// - settings-affiliate
// - settings-refer
// - settings-feedback
// - settings-whats-new
```

### Phase 5: Update Barrel Exports
```typescript
// settings/index.ts
// Remove these exports:
// export * from "./membership/ui/MembershipSettingsView";
// export * from "./affiliate/ui/AffiliateDashboardView";
// export * from "./referrals/ui/ReferAFriendView";
// export * from "./feedback/ui/ProvideFeedbackView";
// export * from "./whats-new/ui/WhatsNewView";
```

### Phase 6: Create New Barrel Exports

**recruitment/invite-partners/ui/index.ts**:
```typescript
export * from './InvitePartnersScreen';
export * from './AffiliateDashboardView';
```

**partnership-hub/support/ui/index.ts**:
```typescript
export * from './ProvideFeedbackView';
export * from './SupportScreen';  // If exists
```

**community/announcements/ui/index.ts** OR **community/whats-new/ui/index.ts**:
```typescript
export * from './WhatsNewView';
```

### Phase 7: Update Route Registries

Create or update route registries for:
- Recruitment routes
- Partnership Hub routes (if needed)
- Community routes (if needed)

### Phase 8: Update Quick Actions

Update quick-action routes to point to new locations:
- `settings-membership` → `tier-progress`
- `settings-affiliate` → `recruitment`
- `settings-refer` → `recruitment`
- `settings-feedback` → `support`
- `settings-whats-new` → `announcements` or `whats-new`

---

## Summary

**Before**: 16 routes in settings
**After**: 11 routes in settings (5 moved to their proper domains)

**Settings is now FOCUSED** on:
- Account management (account, profile, devices)
- Notifications
- Appearance & preferences (planned)
- Privacy & security (planned)
- Integrations (planned)
- Legal (planned)

**No longer in Settings**:
- Tiers/membership → Earnings
- Affiliate/referrals → Recruitment
- Feedback → Support
- What's New → Community/Announcements

---

**Status**: ✅ Ready to execute - User confirmed all moves

