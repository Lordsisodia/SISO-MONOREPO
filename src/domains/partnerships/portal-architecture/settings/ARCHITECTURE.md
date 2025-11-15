# Settings Architecture

**Status**: ✅ Skeleton Complete - Ready for Implementation
**Date**: 2025-11-11

---

## Overview

Complete settings system for the Partnership Portal with 10 setting pages following clean architecture principles.

---

## Structure

```
settings/
├── domain/                    ← Shared settings types
│   ├── types.ts              ← All settings interfaces
│   └── index.ts
├── application/               ← Shared settings hooks (future)
├── ui/                        ← Shared settings components (future)
│   ├── components/
│   └── layouts/
│
├── general/                   ← Quick settings dashboard
│   └── ui/
│       ├── GeneralSettingsScreen.tsx
│       └── index.ts
│
├── appearance/                ← Theme & accessibility
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── useAppearanceSettings.ts
│   └── ui/
│       ├── AppearanceSettingsScreen.tsx
│       └── index.ts
│
├── language/                  ← Language & region
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── useLanguageSettings.ts
│   └── ui/
│       ├── LanguageSettingsScreen.tsx
│       └── index.ts
│
├── integrations/              ← App connections
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── useIntegrations.ts
│   └── ui/
│       ├── IntegrationsSettingsScreen.tsx
│       └── index.ts
│
├── devices/                   ← Connected devices
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── useDevices.ts
│   └── ui/
│       ├── DevicesSettingsScreen.tsx
│       └── index.ts
│
├── profile/                   ← Profile settings
│   └── ui/
│       ├── ProfileSettingsScreen.tsx
│       └── index.ts
│       └── (Links to portal-architecture/profile/)
│
├── notifications/             ← Notification preferences
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── useNotificationSettings.ts
│   └── ui/
│       ├── NotificationsSettingsScreen.tsx
│       └── index.ts
│
├── security/                  ← Password & 2FA
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── useSecuritySettings.ts
│   └── ui/
│       ├── SecuritySettingsScreen.tsx
│       └── index.ts
│
├── privacy/                   ← Privacy controls
│   ├── domain/
│   │   └── types.ts
│   ├── application/
│   │   └── usePrivacySettings.ts
│   └── ui/
│       ├── PrivacySettingsScreen.tsx
│       └── index.ts
│
└── legal/                     ← Terms & policies
    └── ui/
        ├── LegalSettingsScreen.tsx
        └── index.ts

└── index.ts                   ← Main barrel export
```

---

## Settings Pages

### 1. General Settings
**Path**: `/partner/settings/general`
**Purpose**: Quick access dashboard to common settings

**Features**:
- Quick theme toggle
- Quick notification toggle
- Quick language selector
- Links to detailed settings

**Complexity**: Simple (UI only)

---

### 2. Appearance & Accessibility
**Path**: `/partner/settings/appearance`
**Purpose**: Theme, font size, accessibility options

**Features**:
- Theme selection (light/dark/system)
- Primary color picker
- Font size (small/medium/large)
- Reduced motion toggle
- High contrast toggle
- Haptic feedback toggle

**Complexity**: Medium (domain + application + ui)

**Types**:
```typescript
interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  primaryColor: string;
  fontSize: "small" | "medium" | "large";
  reducedMotion: boolean;
  highContrast: boolean;
  hapticFeedback: boolean;
}
```

---

### 3. Language & Region
**Path**: `/partner/settings/language`
**Purpose**: Language, timezone, format preferences

**Features**:
- Language selector
- Timezone selector
- Date format
- Time format (12h/24h)
- Number format
- Currency format

**Complexity**: Medium (domain + application + ui)

**Types**:
```typescript
interface LanguageSettings {
  locale: string;
  timezone: string;
  dateFormat: string;
  timeFormat: "12h" | "24h";
  numberFormat: string;
  currencyFormat: string;
}
```

---

### 4. App Integrations
**Path**: `/partner/settings/integrations`
**Purpose**: Connect third-party apps

**Features**:
- Notion connection
- Google Drive connection
- Google Calendar connection
- Slack connection (future)
- OAuth flows
- Permission management

**Complexity**: Complex (domain + application + infrastructure + ui)

**Types**:
```typescript
interface Integration {
  id: string;
  name: string;
  type: "notion" | "google-drive" | "google-calendar" | "slack";
  connected: boolean;
  connectedAt?: Date;
  permissions: string[];
}
```

**Next Steps**:
- Add `infrastructure/oauth/` for OAuth flows
- Add integration-specific API clients

---

### 5. Connected Devices
**Path**: `/partner/settings/devices`
**Purpose**: Manage active sessions and devices

**Features**:
- List all devices/sessions
- Show current device
- Device details (browser, OS, location)
- Sign out from device
- Sign out all devices

**Complexity**: Medium (domain + application + ui)

**Types**:
```typescript
interface Device {
  id: string;
  name: string;
  type: "mobile" | "desktop" | "tablet";
  browser: string;
  os: string;
  lastActive: Date;
  current: boolean;
}
```

---

### 6. Profile
**Path**: `/partner/settings/profile`
**Purpose**: Edit profile information

**Features**:
- Name, bio, photo
- Contact info
- Links to full profile domain

**Complexity**: Simple (UI wrapper)

**Note**: This page links to `portal-architecture/profile/` domain for actual profile editing logic.

---

### 7. Notifications
**Path**: `/partner/settings/notifications`
**Purpose**: Manage notification preferences

**Features**:
- Push notification settings (by category)
- Email notification settings (frequency)
- In-app notification settings (sound, badge)
- Per-category toggles (deals, messages, updates, tasks)

**Complexity**: Medium (domain + application + ui)

**Types**:
```typescript
interface NotificationSettings {
  push: PushSettings;
  email: EmailSettings;
  inApp: InAppSettings;
}
```

---

### 8. Security
**Path**: `/partner/settings/security`
**Purpose**: Password, 2FA, security settings

**Features**:
- Change password
- Enable/disable 2FA
- View active sessions
- Login alerts
- Security log

**Complexity**: Complex (domain + application + infrastructure + ui)

**Types**:
```typescript
interface SecuritySettings {
  twoFactorEnabled: boolean;
  activeSessions: Session[];
  loginAlerts: boolean;
}
```

**Next Steps**:
- Add `infrastructure/auth/` for password/2FA APIs

---

### 9. Privacy
**Path**: `/partner/settings/privacy`
**Purpose**: Privacy controls and data management

**Features**:
- Profile visibility settings
- Contact info visibility
- Data processing consent
- Marketing consent
- Export data
- Delete account

**Complexity**: Medium-Complex (domain + application + ui)

**Types**:
```typescript
interface PrivacySettings {
  profileVisibility: "public" | "partners-only" | "private";
  showEmail: boolean;
  showPhone: boolean;
  dataProcessingConsent: boolean;
  marketingConsent: boolean;
}
```

---

### 10. Legal
**Path**: `/partner/settings/legal`
**Purpose**: Terms, privacy policy, agreements

**Features**:
- View Terms of Service
- View Privacy Policy
- View Partner Agreement
- App version info

**Complexity**: Simple (UI only - mostly links)

---

## Shared Domain Types

All settings share common types defined in `domain/types.ts`:

```typescript
interface UserSettings {
  userId: string;
  theme: ThemeSettings;
  language: LanguageSettings;
  notifications: NotificationSettings;
  security: SecuritySettings;
  privacy: PrivacySettings;
}
```

---

## Routes (Next.js App Router)

```
app/partners/settings/
├── page.tsx                        → Redirect to /general
├── general/
│   └── page.tsx                    → <GeneralSettingsScreen />
├── appearance/
│   └── page.tsx                    → <AppearanceSettingsScreen />
├── language/
│   └── page.tsx                    → <LanguageSettingsScreen />
├── integrations/
│   └── page.tsx                    → <IntegrationsSettingsScreen />
├── devices/
│   └── page.tsx                    → <DevicesSettingsScreen />
├── profile/
│   └── page.tsx                    → <ProfileSettingsScreen />
├── notifications/
│   └── page.tsx                    → <NotificationsSettingsScreen />
├── security/
│   └── page.tsx                    → <SecuritySettingsScreen />
├── privacy/
│   └── page.tsx                    → <PrivacySettingsScreen />
└── legal/
    └── page.tsx                    → <LegalSettingsScreen />
```

---

## Usage

### Import from barrel export
```typescript
import {
  // Screens
  GeneralSettingsScreen,
  AppearanceSettingsScreen,
  LanguageSettingsScreen,
  IntegrationsSettingsScreen,
  DevicesSettingsScreen,
  ProfileSettingsScreen,
  NotificationsSettingsScreen,
  SecuritySettingsScreen,
  PrivacySettingsScreen,
  LegalSettingsScreen,

  // Hooks
  useAppearanceSettings,
  useLanguageSettings,
  useNotificationSettings,
  useSecuritySettings,
  usePrivacySettings,
  useIntegrations,
  useDevices,

  // Types
  type AppearanceSettings,
  type LanguageSettings,
  type NotificationSettings,
  type SecuritySettings,
  type PrivacySettings,
  type Integration,
  type Device,
} from '@/domains/partnerships/portal-architecture/settings';
```

### Use in Next.js page
```typescript
// app/partners/settings/appearance/page.tsx
import { AppearanceSettingsScreen } from '@/domains/partnerships/portal-architecture/settings';

export default function AppearancePage() {
  return <AppearanceSettingsScreen />;
}
```

### Use hooks in a component
```typescript
import { useAppearanceSettings } from '@/domains/partnerships/portal-architecture/settings';

export function ThemeToggle() {
  const { settings, updateTheme } = useAppearanceSettings();

  return (
    <button onClick={() => updateTheme("dark")}>
      Current: {settings.theme}
    </button>
  );
}
```

---

## Implementation Priority

### Phase 1: Core Settings (Week 1)
1. ✅ **General** - Dashboard/hub (quick access)
2. 🔄 **Appearance** - Theme, accessibility (skeleton complete)
3. 🔄 **Notifications** - Push, email, in-app (skeleton complete)
4. 🔄 **Profile** - Basic profile editing (skeleton complete)

### Phase 2: Account Management (Week 2)
5. 🔄 **Security** - Password, 2FA (skeleton complete)
6. 🔄 **Privacy** - Data controls (skeleton complete)
7. 🔄 **Devices** - Session management (skeleton complete)

### Phase 3: Integrations (Week 3)
8. 🔄 **Integrations** - OAuth flows (skeleton complete)
9. 🔄 **Language** - i18n, localization (skeleton complete)

### Phase 4: Supporting (Week 4)
10. 🔄 **Legal** - Static content (skeleton complete)

---

## Next Steps for Each Page

### For Pages with Infrastructure Needs:
1. Create `infrastructure/` folder
2. Add API client files
3. Add OAuth flows (for integrations)
4. Wire up hooks to real APIs

### For All Pages:
1. Build out UI components
2. Add form validation
3. Add loading states
4. Add error handling
5. Add success toasts
6. Write tests

---

## Shared Components Needed

Create in `ui/components/`:
- `SettingSection` - Section wrapper with title
- `SettingRow` - Individual setting row
- `ToggleSwitch` - On/off toggle
- `RadioGroup` - Radio button group
- `Select` - Dropdown selector
- `ColorPicker` - Color selection
- `SessionCard` - Device/session card
- `IntegrationCard` - Integration status card

Create in `ui/layouts/`:
- `SettingsLayout` - Common layout for all settings pages
  - Sidebar navigation
  - Breadcrumbs
  - Save/cancel buttons

---

## Benefits

✅ **Complete skeleton** - All 10 pages structured
✅ **Clean architecture** - Follows team standards
✅ **Type-safe** - All TypeScript types defined
✅ **Scalable** - Easy to add more settings
✅ **Testable** - Clear layer separation
✅ **Maintainable** - Know exactly where code goes

---

## Migration Notes

Existing settings files found in:
- `src/domains/partnerships/settings/` (old location)
- `src/domains/partnerships/portal-architecture/settings/` (new location - this doc)

**Action Required**: Migrate existing settings screens from old location to match this architecture.

---

**Status**: 🎯 Ready for implementation! All skeletons in place, follow this structure for consistency.
