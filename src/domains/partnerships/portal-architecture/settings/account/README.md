# Account Settings

- **Route**: `/partner/settings/account`
- **Section**: Settings
- **Spec**: Core account management and identity settings
- **Complexity**: Medium (has domain + application + ui layers)

## Primary Objective
Manage partner identity, contact information, security credentials, and account access controls.

## Content Modules & Components

### 1. Hero Identity Card
**Location**: Top of page
**Component**: Custom hero card inside `AccountSettingsView.tsx`

**Content Structure**:
```tsx
<div className="rounded-3xl border border-siso-border/60 bg-gradient-to-br from-siso-bg-secondary/80 via-siso-bg-tertiary/70 to-siso-bg-secondary px-4 py-5">
  {/* Avatar + Username + Account ID + Edit Button */}
</div>
```

**Elements**:
- **Avatar Circle**: 56x56px with initials (2 chars, background `bg-siso-bg-tertiary`)
- **Status Badge**: Small orange circle with `IdCard` icon (24x24px)
- **Username**: Display name with edit pencil button
- **Account ID**: Technical identifier (format: `01JV0EY9FHYKJ08PNC5BMHTJBT`)
- **Edit Action**: Pencil icon button for profile handle editing

**Data Source**: `useAccountSettings().hero`

### 2. Contact Information Section
**Location**: Below hero card
**Component**: Rounded container with contact fields list

**Fields Structure** (from `accountContactFields`):
```typescript
[
  {
    id: "username",
    label: "Username", 
    value: "SISOagency",
    icon: AtSign,
    helper: "@SISOagency"
  },
  {
    id: "email",
    label: "Email address",
    value: "sam.geracitano19@gmail.com", 
    icon: Mail,
    helper: "Unverified" // Conditional styling
  },
  {
    id: "phone",
    label: "Phone number",
    value: "Not set",
    icon: Phone
    // No helper text
  },
  {
    id: "password", 
    label: "Password",
    value: "••••••••", // Masked display
    icon: KeyRound
  }
]
```

**Field Row Component**:
```tsx
<div className="flex items-center gap-3 px-4 py-4">
  {/* Icon (40x40px) */}  
  {/* Content: Label + Value + Helper */}
  {/* Edit Button (28x28px) */}
</div>
```

**Visual Patterns**:
- **Icons**: 40x40px rounded container with `bg-siso-bg-tertiary/80`, orange icons
- **Labels**: 11px uppercase, tracking-[0.2em], `text-siso-text-muted`
- **Values**: 14px medium, `text-siso-text-primary`, truncate
- **Helper Text**: 11px uppercase, tracking-wide, `text-siso-orange/80`
- **Edit Buttons**: 28x28px rounded, border `white/10`, hover orange

### 3. Two-Factor Authentication Section
**Location**: Below contact info
**Components**: Status card + Actions list

**Status Card Content**:
```tsx
<div className="rounded-3xl border border-[#f6b75e]/60 bg-siso-bg-secondary/80 px-4 py-5">
  <p className="text-lg font-semibold text-siso-text-primary">Enable two-factor auth</p>
  <p className="text-sm text-siso-text-muted">Activate backup codes and time-based tokens so only you can access this workspace.</p>
</div>
```

**2FA Actions Structure** (from `twoFactorActions`):
```typescript
[
  {
    id: "backup-codes",
    label: "Generate backup codes", 
    description: "Get ready to use 2FA by setting a backup method.",
    ctaLabel: "Setup"
  },
  {
    id: "totp",
    label: "Add authenticator",
    description: "Set up time-based one-time password (TOTP).", 
    ctaLabel: "Connect"
  }
]
```

**Action Row Component**:
```tsx
<div className="flex items-center gap-3 px-4 py-4">
  {/* Icon (40x40px) */}
  <div className="flex-1 space-y-1">
    {/* Label + Description */}
  </div>
  {/* CTA Button */}
</div>
```

**CTA Button Style**:
- Text: 12px uppercase, tracking-wide
- Padding: `px-3 py-1`
- Border: `white/10` → hover `orange/70`
- Text: `text-siso-text-muted` → hover `text-siso-orange`

### 4. Profile Promotion Card
**Location**: Bottom section
**Component**: `HighlightCard` (from `@/components/ui/card-5`)

**Card Configuration**:
```tsx
<HighlightCard
  color="orange"
  className="w-full"
  title="Ready for a profile glow-up?"
  description="Update your avatar, status, and hero copy so partners always see the latest version of you."
  metricValue="Profile"
  metricLabel="/partners/settings/profile" 
  buttonText="Go to profile"
  icon={<IdCard className="h-5 w-5" />}
  onButtonClick={() => window.location.href = "/partners/settings/profile"}
/>
```

## Domain Types & Data Structure

### AccountField Interface
```typescript
interface AccountField {
  id: string;           // Unique identifier
  label: string;        // Display label (uppercase)
  value: string;        // Current value
  icon: LucideIcon;     // Lucide React icon
  helper?: string;      // Optional helper/status text
}
```

### TwoFactorAction Interface  
```typescript
interface TwoFactorAction {
  id: string;              // Unique identifier
  label: string;           // Action label
  description: string;     // Action description
  ctaLabel: string;        // Button text
}
```

### Hero Data Structure
```typescript
hero: {
  username: string;        // "@SISOagency"
  accountId: string;       // "01JV0EY9FHYKJ08PNC5BMHTJBT"
}
```

## Application Hook: `useAccountSettings`

**Purpose**: Provides formatted data for the account settings view

**Return Structure**:
```typescript
{
  contactFields: AccountField[],    // From accountContactFields
  twoFactorActions: TwoFactorAction[], // From twoFactorActions  
  hero: {
    username: string,
    accountId: string
  }
}
```

**Data Sources**:
- `accountContactFields` from `domain/constants.ts`
- `twoFactorActions` from `domain/constants.ts`
- Hero data from user context/API (to be implemented)

## Visual Design System

### Color Palette
- **Primary Orange**: `#f6b75e` (siso-orange)
- **Border Orange**: `border-siso-orange/60` 
- **Text Primary**: `text-siso-text-primary`
- **Text Muted**: `text-siso-text-muted`
- **Background Gradient**: `from-siso-bg-secondary/80 via-siso-bg-tertiary/70 to-siso-bg-secondary`

### Typography Scale
- **Hero Title**: 18px semibold
- **Card Titles**: 16px semibold  
- **Field Labels**: 11px uppercase, tracking-[0.2em]
- **Field Values**: 14px medium
- **Helper Text**: 11px uppercase, tracking-wide
- **CTA Text**: 12px uppercase, tracking-wide
- **Descriptions**: 14px regular

### Spacing System
- **Section Padding**: `py-5` (32px)
- **Field Padding**: `px-4 py-4` (16px horizontal, 16px vertical)
- **Gap Scale**: `gap-3` (12px), `gap-4` (16px), `gap-5` (20px)

### Border Radius
- **Cards/Containers**: `rounded-3xl` (24px)
- **Icon Containers**: `rounded-xl` (12px) 
- **Buttons**: `rounded-full` (50%)
- **Avatar**: `rounded-2xl` (16px)

## Interaction Patterns

### Edit Actions
- **Hover State**: Border `white/10` → `orange/60`, text `text-siso-text-muted` → `text-siso-orange`
- **Icons**: `Edit3` at 14x14px
- **Aria Labels**: `Edit ${label.toLowerCase()}`

### CTA Buttons  
- **Primary Action**: Solid background (for main CTAs)
- **Secondary Action**: Border-only with hover effects
- **Transition**: Smooth color transitions

## States & Variations

### Email Verification State
- **Unverified**: Helper text "Unverified" in orange
- **Verified**: No helper text or "Verified" in green
- **Pending**: "Pending verification" in yellow

### Phone Number State
- **Set**: Display formatted phone number
- **Not Set**: Display "Not set" in muted text

### 2FA State  
- **Disabled**: Show setup card + actions
- **Enabled**: Show status + manage/disable options
- **Setup In Progress**: Loading states for specific 2FA methods

## Integration Points

### Authentication System
- **Password Reset**: Link to password reset flow
- **Email Verification**: Trigger verification emails
- **Phone Verification**: SMS verification flow
- **2FA Setup**: Integrate with authentication provider

### Profile System
- **Cross-link**: Navigate to `/partners/settings/profile`
- **Avatar**: Display user avatar if set
- **Handle**: Editable username/handle

### Security System
- **Session Management**: Link to device management
- **2FA Provider**: Integrate with TOTP/backup code system
- **Audit Logs**: Track account changes

## Data Requirements

### API Endpoints Needed
```typescript
// Get account information
GET /api/account/profile

// Update contact fields  
PUT /api/account/contact
{
  email?: string;
  phone?: string;
  username?: string;
}

// Change password
PUT /api/account/password
{
  currentPassword: string;
  newPassword: string;
}

// 2FA Management
POST /api/account/2fa/enable
POST /api/account/2fa/disable  
GET /api/account/2fa/backup-codes
POST /api/account/2fa/totp/setup
```

### Real-time Updates
- **Email Verification Status**: WebSocket updates for verification
- **2FA Status**: Real-time security status changes
- **Profile Updates**: Reflect changes from profile editing

## Accessibility Requirements

### Keyboard Navigation
- **Tab Order**: Logical sequence through fields and actions
- **Focus States**: Clear focus indicators
- **Skip Links**: Jump to main content

### Screen Reader Support
- **Field Labels**: Properly associated with inputs
- **Status Announcements**: Form validation results
- **Role Definitions**: Correct ARIA roles for interactive elements

### Visual Accessibility
- **Contrast Ratios**: Meet WCAG AA standards
- **Text Scaling**: Support 200% zoom
- **Motion**: Respect prefers-reduced-motion

## Performance Considerations

### Loading States
- **Skeleton Cards**: For account information loading
- **Button States**: Loading indicators for save operations
- **Progressive Loading**: Load non-critical sections after critical content

### Optimizations
- **Icon Sprites**: Efficient icon loading
- **Image Optimization**: Avatar compression
- **Bundle Splitting**: Lazy load non-critical components

## Error Handling

### Validation Errors
- **Email Format**: Show specific email validation
- **Phone Format**: International phone format validation
- **Username**: Availability checking and format rules

### API Errors
- **Network Issues**: Retry mechanisms with user feedback
- **Permission Errors**: Clear messaging about access issues
- **Server Errors**: Graceful degradation with retry options

## Future Enhancements

### Planned Features
- **Account Deletion**: Self-service account deletion flow
- **Data Export**: Personal data download functionality
- **Session Management**: View and manage active sessions
- **Security Audit Log**: Track account access and changes

### Expansion Points
- **Additional Contact Methods**: Social media links, professional profiles
- **Security Options**: Hardware security keys, biometric options
- **Account Types**: Different account tiers with varying capabilities

## Testing Strategy

### Unit Tests
- **Hook Testing**: `useAccountSettings` data formatting
- **Component Testing**: Individual field rendering
- **Utility Functions**: Data transformation and validation

### Integration Tests
- **API Integration**: Mock API responses and error handling
- **Navigation Testing**: Cross-link functionality
- **State Management**: Real-time update handling

### E2E Tests
- **Complete User Flows**: Edit contact information, setup 2FA
- **Error Scenarios**: Network failures, validation errors
- **Accessibility**: Screen reader and keyboard navigation