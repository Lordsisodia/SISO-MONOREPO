# Settings Route Relocation Analysis

**Date**: 2025-11-11
**Status**: 🔍 Analysis Complete - Routes Need Relocation

---

## Problem

Several routes currently in `/settings/` should actually belong to other top-level sections based on the main navigation config.

---

## Main Navigation Structure

Based on `docs/partners/partnership-navigation-config.json`, the top-level sections are:

1. **Home** (Partnership Hub) - Dashboard, Updates, Quick Actions
2. **Academy** - Training, Portfolio, Resources
3. **Pipeline** - Prospects, Deals, Tasks
4. **Earnings** - Overview, Wallet, Tier Progress, Achievements, Leaderboard, Challenges
5. **Recruitment** - Team building, partner invites
6. **Settings** - Account, preferences, integrations

---

## Routes That Need Relocation

### 1. Membership/Tiers → Earnings (Tier Progress) ✅

**Current Location**:
- `settings/membership/` (skeleton folder, empty)
- OLD: `partnerships/settings/ui/mobile/screens/tiers/TierListScreen.tsx`

**Should Be**:
- `portal-architecture/earnings/tier-progress/ui/TierListScreen.tsx` ← **ALREADY EXISTS!**

**Navigation Config**:
```json
{
  "id": "tier-progress",
  "label": "Tier Progress",
  "path": "/partner/tier-progress",
  "description": "Visual progression tracker and tier benefits",
  "group": "Earnings"
}
```

**Settings Registry Reference**:
```typescript
{
  id: "settings-membership",
  slug: "membership",
  path: "/partners/settings/membership",  // ← WRONG PATH!
  title: "My Tiers",
  quickActionId: "settings-membership",
  component: lazy(() => import("@/domains/partnerships/settings/ui/mobile/screens/tiers/TierListScreen")),
}
```

**Action Required**:
1. ✅ Tier screen ALREADY exists at correct location: `earnings/tier-progress/ui/TierListScreen.tsx`
2. ❌ Remove `membership/` folder from settings (it's empty anyway)
3. ❌ Remove `settings-membership` from settings route registry
4. ✅ Navigation already points to `/partner/tier-progress` (correct)
5. ❌ Delete OLD location: `partnerships/settings/ui/mobile/screens/tiers/`

---

### 2. Affiliate Dashboard → Earnings (or Recruitment?) 🤔

**Current Location**:
- `settings/affiliate/ui/AffiliateDashboardView.tsx`

**Should Be**:
- Possibly `earnings/affiliate-dashboard/` OR
- Possibly `recruitment/affiliate-dashboard/`

**Navigation Config**:
- ❌ NOT found in main navigation config
- This might be a settings-only feature (commission tracking dashboard)

**Settings Registry Reference**:
```typescript
{
  id: "settings-affiliate",
  slug: "affiliate-dashboard",
  path: "/partners/settings/affiliate-dashboard",
  title: "Affiliate Dashboard",
  description: "Campaign performance and payouts",
  group: "Growth",
  quickActionId: "settings-affiliate",
}
```

**Analysis**:
- Shows commission stats (Revenue, Sales, Clicks, Commissions)
- Shows referral links
- Related to earnings/payouts BUT accessed via settings
- **Recommendation**: KEEP in settings for now (it's a dashboard view of settings/preferences for affiliate features)

---

### 3. Refer a Friend → Recruitment 🔄

**Current Location**:
- `settings/referrals/ui/ReferAFriendView.tsx`

**Should Be**:
- `portal-architecture/recruitment/invite-partners/ui/`

**Navigation Config**:
```json
{
  "id": "recruitment",
  "label": "Recruitment",
  "path": "/partner/recruitment",
  "subsections": [
    {
      "id": "recruitment-tools",
      "dropdown": {
        "items": [
          {
            "id": "invite",
            "label": "Invite Partners",
            "description": "Send referral links and track invites",
            "path": "/partner/recruitment"
          }
        ]
      }
    }
  ]
}
```

**Settings Registry Reference**:
```typescript
{
  id: "settings-refer",
  slug: "refer-a-friend",
  path: "/partners/settings/refer-a-friend",
  title: "Refer a Friend",
  description: "Invite partners and earn bonuses",
  group: "Growth",
  quickActionId: "settings-refer",
}
```

**Action Required**:
1. Check if `recruitment/` folder exists in portal-architecture
2. If not, create `recruitment/invite-partners/ui/`
3. Move `ReferAFriendView.tsx` → `recruitment/invite-partners/ui/InvitePartnersScreen.tsx`
4. Remove `settings/referrals/` folder
5. Remove `settings-refer` from settings route registry
6. Update path to `/partner/recruitment` (match navigation config)

---

### 4. Feedback → Support/Help? 🤔

**Current Location**:
- `settings/feedback/ui/ProvideFeedbackView.tsx`

**Should Be**:
- Possibly under a Support section OR
- Could stay in settings

**Navigation Config**:
```json
{
  "id": "help-coaching",
  "path": "/partners/community/help",
  "subsections": [
    // No explicit "Provide Feedback" item found
    // But "Contact Support" exists at /partner/support
  ]
}
```

**Settings Registry Reference**:
```typescript
{
  id: "settings-feedback",
  slug: "provide-feedback",
  path: "/partners/settings/provide-feedback",
  title: "Provide Feedback",
  description: "Share product feedback and ideas",
  group: "Support",
  quickActionId: "settings-feedback",
}
```

**Analysis**:
- Not explicitly in main navigation
- Feedback forms are commonly in Settings
- **Recommendation**: KEEP in settings (makes sense as a support/settings feature)

---

### 5. What's New → Home/Updates? 🤔

**Current Location**:
- `settings/whats-new/ui/WhatsNewView.tsx`

**Should Be**:
- Possibly under Home → Updates OR
- Could stay in settings

**Navigation Config**:
```json
{
  "id": "updates",
  "label": "Updates",
  "path": "/partner/announcements",
  "dropdown": {
    "items": [
      {
        "id": "announcements-link",
        "label": "Announcements",
        "path": "/partner/announcements"
      },
      {
        "id": "recent-activity-link",
        "label": "Recent Activity",
        "path": "/partner/activity"
      },
      {
        "id": "wins-feed-link",
        "label": "Wins Feed",
        "path": "/partner/wins-feed"
      }
    ]
  }
}
```

**Settings Registry Reference**:
```typescript
{
  id: "settings-whats-new",
  slug: "whats-new",
  path: "/partners/settings/whats-new",
  title: "What's New",
  description: "Latest releases and fixes",
  group: "Support",
  quickActionId: "settings-whats-new",
}
```

**Analysis**:
- "What's New" (release notes, version updates) vs "Announcements" (team broadcasts)
- Different purposes, but related
- **Recommendation**: KEEP in settings (version/changelog is typically in settings)

---

## Summary of Actions

### Routes to REMOVE from Settings

#### 1. Membership/Tiers → Already in Earnings ✅
- Delete `settings/membership/` (empty folder)
- Delete OLD: `partnerships/settings/ui/mobile/screens/tiers/`
- Remove from `settings-route-registry.ts`
- Update any quick-action links to point to `/partner/tier-progress`

#### 2. Referrals → Move to Recruitment 🔄
- Create `recruitment/invite-partners/ui/` if needed
- Move `ReferAFriendView.tsx` → `InvitePartnersScreen.tsx`
- Delete `settings/referrals/`
- Remove from `settings-route-registry.ts`
- Update path to `/partner/recruitment`

### Routes to KEEP in Settings

#### 1. Affiliate Dashboard ✅
- **Why**: Settings-level dashboard for affiliate features
- Related to earnings but accessed as a settings preference
- Shows personal commission stats

#### 2. Feedback ✅
- **Why**: Feedback forms are commonly in Settings
- Not a primary navigation feature
- Support/settings hybrid feature

#### 3. What's New ✅
- **Why**: Version/changelog typically in Settings
- Different from "Announcements" (which is in Home)
- App-level information vs team broadcasts

---

## Updated Settings Structure (After Cleanup)

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
├── affiliate/                       ✅ KEEP - Affiliate dashboard (settings-level feature)
│   └── ui/
│       ├── AffiliateDashboardView.tsx
│       └── index.ts
│
├── feedback/                        ✅ KEEP - Feedback form (settings/support feature)
│   └── ui/
│       ├── ProvideFeedbackView.tsx
│       └── index.ts
│
├── whats-new/                       ✅ KEEP - Release notes (app info)
│   └── ui/
│       ├── WhatsNewView.tsx
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

**Removed**:
- ❌ `membership/` - Moved to earnings/tier-progress (already exists there)
- ❌ `referrals/` - Moving to recruitment/invite-partners

---

## Updated Settings Route Registry

After cleanup, the registry should have **14 routes** (down from 16):

### Live Routes (7)
1. ✅ My Account
2. ✅ Notifications
3. ✅ Profile
4. ✅ Connected Devices
5. ✅ Affiliate Dashboard
6. ✅ Provide Feedback
7. ✅ What's New

### Planned Routes (7)
8. 🔄 General Settings
9. 🔄 Appearance
10. 🔄 Language & Region
11. 🔄 Integrations
12. 🔄 Privacy
13. 🔄 Security
14. 🔄 Legal

### Removed Routes (2)
- ❌ My Tiers (membership) → Moved to `/partner/tier-progress` in earnings/
- ❌ Refer a Friend (referrals) → Moving to `/partner/recruitment` in recruitment/

---

## Implementation Checklist

### Phase 1: Remove Membership Routes
- [ ] Delete `settings/membership/` folder (empty)
- [ ] Delete `partnerships/settings/ui/mobile/screens/tiers/` (old location)
- [ ] Remove `settings-membership` entry from `settings-route-registry.ts`
- [ ] Update any quick-action links to use `/partner/tier-progress`
- [ ] Verify `earnings/tier-progress/ui/TierListScreen.tsx` exists and works

### Phase 2: Move Referrals to Recruitment
- [ ] Check if `portal-architecture/recruitment/` exists
- [ ] Create `recruitment/invite-partners/ui/` folder structure
- [ ] Move `settings/referrals/ui/ReferAFriendView.tsx` → `recruitment/invite-partners/ui/InvitePartnersScreen.tsx`
- [ ] Update component to work in new location
- [ ] Delete `settings/referrals/` folder
- [ ] Remove `settings-refer` entry from `settings-route-registry.ts`
- [ ] Update quick-action routes to use `/partner/recruitment`

### Phase 3: Update Documentation
- [ ] Update `ARCHITECTURE.md` to reflect 14 routes (not 16)
- [ ] Update `CLEANUP_PLAN.md` with relocation decisions
- [ ] Add notes about which routes were moved and why

### Phase 4: Verify
- [ ] Check all imports are updated
- [ ] Verify barrel exports are correct
- [ ] Test quick-action navigation
- [ ] Verify settings menu doesn't show relocated items

---

## Questions for User

1. **Affiliate Dashboard**: Confirm it should STAY in settings (not move to earnings)?
   - It's showing earnings data but feels like a settings dashboard
   - Current path: `/partners/settings/affiliate-dashboard`

2. **Recruitment folder**: Does `portal-architecture/recruitment/` exist yet?
   - If not, should we create it now for the referrals move?

3. **Path conventions**: Should settings paths use `/partners/settings/` or `/partner/settings/`?
   - Navigation config uses `/partner/` (singular)
   - Settings registry uses `/partners/` (plural)

---

**Status**: ✅ Analysis Complete - Ready for user confirmation before executing moves
