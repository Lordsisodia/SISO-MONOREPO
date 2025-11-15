# Settings Architecture Cleanup Plan

**Date**: 2025-11-11
**Status**: 🔍 Audit Complete - Ready for Review

---

## Summary

The settings system currently has **TWO different structures**:
1. **Old structure**: Mobile screens in `partnerships/settings/ui/mobile/`
2. **New structure**: Clean architecture skeleton in `portal-architecture/settings/`

Additionally, the route registry defines **16 total routes** but the ARCHITECTURE.md only documented **10 routes**.

---

## Official Settings Routes (From Registry)

### Live Routes (9 routes - have components)
1. ✅ **My Account** - `/partners/settings/account` - `account/ui/AccountSettingsView`
2. ✅ **Notifications** - `/partners/settings/account/notifications` - `notifications/ui/AccountNotificationsView`
3. ✅ **Profile** - `/partners/settings/profile` - `profile/ui/ProfileSettingsView`
4. ✅ **Connected Devices** - `/partners/settings/connected-devices` - `devices/ui/ConnectedDevicesView`
5. ✅ **My Tiers** - `/partners/settings/membership` - OLD: `@/domains/partnerships/settings/ui/mobile/screens/tiers/TierListScreen`
6. ✅ **Affiliate Dashboard** - `/partners/settings/affiliate-dashboard` - `affiliate/ui/AffiliateDashboardView`
7. ✅ **Refer a Friend** - `/partners/settings/refer-a-friend` - `referrals/ui/ReferAFriendView`
8. ✅ **Provide Feedback** - `/partners/settings/provide-feedback` - `feedback/ui/ProvideFeedbackView`
9. ✅ **What's New** - `/partners/settings/whats-new` - `whats-new/ui/WhatsNewView`

### Planned Routes (7 routes - no components yet)
10. 🔄 **General Settings** - `/partners/settings/general` - SKELETON EXISTS
11. 🔄 **Appearance** - `/partners/settings/appearance` - SKELETON EXISTS
12. 🔄 **Language & Region** - `/partners/settings/language` - SKELETON EXISTS
13. 🔄 **Integrations** - `/partners/settings/integrations` - SKELETON EXISTS
14. 🔄 **Privacy** - `/partners/settings/privacy` - SKELETON EXISTS
15. 🔄 **Security** - `/partners/settings/security` - SKELETON EXISTS
16. 🔄 **Legal** - `/partners/settings/legal` - SKELETON EXISTS

### Not in Registry (1 route)
17. ❌ **Team Members** - Defined in registry but marked as planned, no skeleton created

---

## Issues Found

### Issue 1: Duplicate View/Screen Files

Many folders have BOTH a `*View.tsx` (old) AND a `*Screen.tsx` (skeleton):

```
devices/ui/
├── ConnectedDevicesView.tsx      ← OLD (live, used by registry)
└── DevicesSettingsScreen.tsx     ← NEW (skeleton, unused)

notifications/ui/
├── AccountNotificationsView.tsx  ← OLD (live, used by registry)
└── NotificationsSettingsScreen.tsx ← NEW (skeleton, unused)

profile/ui/
├── ProfileSettingsView.tsx       ← OLD (live, used by registry)
└── ProfileSettingsScreen.tsx     ← NEW (skeleton, unused)
```

**Impact**: Confusion about which component to use. Registry points to View files, but skeleton created Screen files.

**Fix**: Delete the skeleton Screen files since View files are already live and in use.

---

### Issue 2: Missing Skeletons for Live Routes

Several live routes exist but DON'T have clean architecture structure:

```
✅ Live Routes WITHOUT Domain/Application/UI Structure:
- account/          ← Has ui/AccountSettingsView.tsx but no domain/application
- affiliate/        ← Has ui/AffiliateDashboardView.tsx but no domain/application
- feedback/         ← Has ui/ProvideFeedbackView.tsx but no domain/application
- referrals/        ← Has ui/ReferAFriendView.tsx but no domain/application
- whats-new/        ← Has ui/WhatsNewView.tsx but no domain/application
```

**Impact**: Inconsistent architecture. Some routes have full domain/application/ui, others only have ui.

**Fix**: These routes may not NEED domain/application layers yet (could be simple UI-only features). Check each one individually.

---

### Issue 3: Extra Skeletons Created

The skeleton script created files for "planned" routes that may not need them yet:

```
🔄 Planned Routes WITH Skeletons (but marked planned in registry):
- general/          ← domain/application/ui created, but status="planned"
- appearance/       ← domain/application/ui created, but status="planned"
- language/         ← domain/application/ui created, but status="planned"
- integrations/     ← domain/application/ui created, but status="planned"
- privacy/          ← domain/application/ui created, but status="planned"
- security/         ← domain/application/ui created, but status="planned"
- legal/            ← domain/application/ui created, but status="planned"
```

**Impact**: Creates files before they're needed. May cause confusion.

**Fix**: Keep these skeletons - they're ready for when routes go live.

---

### Issue 4: Membership/Tiers Route

The "My Tiers" route points to OLD location:

```typescript
// settings-route-registry.ts:125
component: lazy(() => import("@/domains/partnerships/settings/ui/mobile/screens/tiers/TierListScreen"), "TierListScreen"),
```

**Impact**: Uses old architecture location instead of clean architecture.

**Fix**:
1. Create `membership/` folder in clean architecture
2. Move `TierListScreen` to `membership/ui/`
3. Update registry import path

---

### Issue 5: Missing Barrel Exports

The main `settings/index.ts` exports View files but registry uses them:

```typescript
// index.ts exports:
export * from "./account/ui/AccountSettingsView";
export * from "./notifications/ui/AccountNotificationsView";
export * from "./profile/ui/ProfileSettingsView";
export * from "./devices/ui/ConnectedDevicesView";
export * from "./affiliate/ui/AffiliateDashboardView";
export * from "./referrals/ui/ReferAFriendView";
export * from "./feedback/ui/ProvideFeedbackView";
export * from "./whats-new/ui/WhatsNewView";
```

But MISSING exports for skeleton Screen files (general, appearance, language, integrations, etc.)

**Impact**: Skeleton screens can't be imported from barrel export.

**Fix**: Keep existing View exports (they're used). Don't export unused Screen files.

---

### Issue 6: Old Mobile Screens Location

Old location still has files that need migration:

```
partnerships/settings/ui/mobile/screens/
├── account-notifications/
├── account/
├── affiliate-dashboard/
├── connected-devices/
├── profile/
├── provide-feedback/
├── refer-a-friend/
├── tiers/              ← Still used by registry!
└── whats-new/
```

**Impact**: Files scattered across two locations. Old `tiers/` still actively used.

**Fix**:
1. Migrate `tiers/` to clean architecture as `membership/`
2. Verify other folders are empty or deprecated
3. Delete old location once migration complete

---

## Recommended Actions

### Phase 1: Immediate Cleanup (Remove Confusion)

**Action 1.1**: Delete duplicate skeleton Screen files where View files exist
```bash
rm devices/ui/DevicesSettingsScreen.tsx
rm notifications/ui/NotificationsSettingsScreen.tsx
rm profile/ui/ProfileSettingsScreen.tsx
```

**Action 1.2**: Update skeleton index.ts files to export View (not Screen)
```typescript
// devices/ui/index.ts
export * from './ConnectedDevicesView';  // Not DevicesSettingsScreen

// notifications/ui/index.ts
export * from './AccountNotificationsView';  // Not NotificationsSettingsScreen

// profile/ui/index.ts
export * from './ProfileSettingsView';  // Not ProfileSettingsScreen
```

---

### Phase 2: Migrate Tiers → Membership

**Action 2.1**: Create membership folder structure
```bash
mkdir -p membership/ui
```

**Action 2.2**: Copy TierListScreen from old location
```bash
cp -r ../../partnerships/settings/ui/mobile/screens/tiers/* membership/ui/
```

**Action 2.3**: Rename to match clean architecture
```bash
mv membership/ui/TierListScreen.tsx membership/ui/MembershipSettingsView.tsx
```

**Action 2.4**: Update registry import
```typescript
// settings-route-registry.ts
component: lazy(() => import("./membership/ui/MembershipSettingsView"), "MembershipSettingsView"),
```

**Action 2.5**: Update barrel export
```typescript
// index.ts
export * from "./membership/ui/MembershipSettingsView";
```

---

### Phase 3: Add Domain/Application to Live Routes (If Needed)

For each live route (account, affiliate, feedback, referrals, whats-new):

**Evaluate**: Does it need domain/application layers?
- **Simple UI-only** (forms, links, static content) → Keep as-is
- **Business logic, state, validation** → Add domain/application

**Example**: Account Settings
- If it just renders forms → Keep ui/ only
- If it has password validation, 2FA logic → Add domain/application

**Decision Matrix**:
```
account/        → CHECK: Probably needs domain/application (password, 2FA)
affiliate/      → CHECK: Probably needs domain/application (analytics, payouts)
feedback/       → KEEP: Simple form submission
referrals/      → CHECK: Might need domain/application (referral tracking)
whats-new/      → KEEP: Static changelog content
```

---

### Phase 4: Clean Up Old Location

**Action 4.1**: Verify old screens are no longer referenced
```bash
grep -r "partnerships/settings/ui/mobile/screens" src/
```

**Action 4.2**: Delete old location (except tiers until migrated)
```bash
# After Phase 2 complete
rm -rf ../../partnerships/settings/ui/mobile/screens/
```

**Action 4.3**: Update any old imports

---

### Phase 5: Update Documentation

**Action 5.1**: Update ARCHITECTURE.md
- Add live routes (account, affiliate, feedback, referrals, whats-new, membership)
- Update implementation status
- Remove "10 pages" references (it's actually 16)

**Action 5.2**: Update main index.ts documentation
- Clarify which routes are live vs planned
- Add comments for View vs Screen naming

---

## File Structure After Cleanup

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
├── account/                         ✅ LIVE (ui only)
│   └── ui/
│       ├── AccountSettingsView.tsx
│       └── index.ts
│
├── notifications/                   ✅ LIVE (ui only)
│   └── ui/
│       ├── AccountNotificationsView.tsx
│       └── index.ts
│
├── profile/                         ✅ LIVE (ui only)
│   └── ui/
│       ├── ProfileSettingsView.tsx
│       └── index.ts
│
├── devices/                         ✅ LIVE (ui only)
│   └── ui/
│       ├── ConnectedDevicesView.tsx
│       └── index.ts
│
├── membership/                      ✅ LIVE (ui only) - MIGRATED FROM TIERS
│   └── ui/
│       ├── MembershipSettingsView.tsx
│       └── index.ts
│
├── affiliate/                       ✅ LIVE (ui only)
│   └── ui/
│       ├── AffiliateDashboardView.tsx
│       └── index.ts
│
├── referrals/                       ✅ LIVE (ui only)
│   └── ui/
│       ├── ReferAFriendView.tsx
│       └── index.ts
│
├── feedback/                        ✅ LIVE (ui only)
│   └── ui/
│       ├── ProvideFeedbackView.tsx
│       └── index.ts
│
├── whats-new/                       ✅ LIVE (ui only)
│   └── ui/
│       ├── WhatsNewView.tsx
│       └── index.ts
│
├── general/                         🔄 PLANNED (skeleton ready)
│   └── ui/
│       ├── GeneralSettingsScreen.tsx
│       └── index.ts
│
├── appearance/                      🔄 PLANNED (full skeleton)
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── useAppearanceSettings.ts
│   └── ui/
│       ├── AppearanceSettingsScreen.tsx
│       └── index.ts
│
├── language/                        🔄 PLANNED (full skeleton)
│   ├── domain/
│   ├── application/
│   └── ui/
│
├── integrations/                    🔄 PLANNED (full skeleton)
│   ├── domain/
│   ├── application/
│   └── ui/
│
├── privacy/                         🔄 PLANNED (full skeleton)
│   ├── domain/
│   ├── application/
│   └── ui/
│
├── security/                        🔄 PLANNED (full skeleton)
│   ├── domain/
│   ├── application/
│   └── ui/
│
└── legal/                           🔄 PLANNED (skeleton ready)
    └── ui/
        ├── LegalSettingsScreen.tsx
        └── index.ts
```

---

## Summary of Changes

### Delete (3 files)
- `devices/ui/DevicesSettingsScreen.tsx`
- `notifications/ui/NotificationsSettingsScreen.tsx`
- `profile/ui/ProfileSettingsScreen.tsx`

### Migrate (1 folder)
- Move `partnerships/settings/ui/mobile/screens/tiers/` → `portal-architecture/settings/membership/ui/`
- Rename `TierListScreen.tsx` → `MembershipSettingsView.tsx`

### Update (4 files)
- `devices/ui/index.ts` - Export ConnectedDevicesView
- `notifications/ui/index.ts` - Export AccountNotificationsView
- `profile/ui/index.ts` - Export ProfileSettingsView
- `settings-route-registry.ts` - Update membership component path
- `settings/index.ts` - Add membership export

### Evaluate (4 folders)
- `account/` - Check if needs domain/application
- `affiliate/` - Check if needs domain/application
- `referrals/` - Check if needs domain/application
- (Others confirmed UI-only)

---

## Next Steps

1. **Review this plan** - Confirm approach is correct
2. **Execute Phase 1** - Remove immediate confusion (delete duplicate Screen files)
3. **Execute Phase 2** - Migrate tiers → membership
4. **Evaluate Phase 3** - Decide which live routes need domain/application
5. **Execute Phase 4** - Clean up old location
6. **Execute Phase 5** - Update documentation

---

## Questions for Review

1. **Naming convention**: Should we stick with `*View.tsx` or migrate everything to `*Screen.tsx`?
   - Registry currently uses `*View` for live routes
   - Skeleton created `*Screen` for planned routes
   - Recommendation: Keep `*View` for consistency with existing code

2. **Domain/Application layers**: Which live routes actually need them?
   - Current: All are ui-only
   - Should some have business logic layers?

3. **Tiers vs Membership**: Confirm `tiers/` should become `membership/`?
   - Registry calls it "My Tiers" but slug is "membership"
   - Folder should match slug

---

**Status**: ✅ Audit Complete - Awaiting approval to execute cleanup
