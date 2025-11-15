# General Settings

- **Route**: `/partner/settings/general`
- **Section**: Settings
- **Complexity**: Simple (ui only, acts as navigation hub)
- **Primary Objective**: Quick controls for theme, notifications, language, and summaries

## Content Modules & Components

### 1. Page Header & Introduction
**Location**: Top of page
**Component**: Standard settings page header with description

**Header Structure**:
```tsx
<div className="space-y-2 pb-6">
  <div className="flex items-center gap-3">
    <Settings className="h-6 w-6 text-siso-orange" />
    <h1 className="text-2xl font-bold text-siso-text-primary">General Settings</h1>
  </div>
  <p className="text-siso-text-muted">
    Quick access to appearance, notifications, language, and integration preferences. 
    Manage your most-used settings from one central location.
  </p>
</div>
```

### 2. Quick Settings Cards Grid
**Location**: Main content area
**Component**: 2x2 responsive grid of navigation cards

**Grid Layout**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Appearance & Accessibility Card */}
  <QuickSettingsCard
    title="Appearance & Accessibility"
    description="Theme, contrast, font size, reduced motion, haptics"
    icon={<Palette className="h-8 w-8" />}
    href="/partner/settings/appearance"
    badge={appearanceSettingsChanged ? "Modified" : null}
    color="orange"
  />

  {/* Language & Region Card */}
  <QuickSettingsCard
    title="Language & Region"
    description="Language, timezone, number/currency formats"
    icon={<Globe className="h-8 w-8" />}
    href="/partner/settings/language"
    badge={languageSettingsChanged ? "Modified" : null}
    color="blue"
  />

  {/* Notifications Card */}
  <QuickSettingsCard
    title="Notifications"
    description="Email, push, and in-app notification preferences"
    icon={<Bell className="h-8 w-8" />}
    href="/partner/settings/notifications"
    badge={unreadNotifications > 0 ? `${unreadNotifications}` : null}
    color="purple"
  />

  {/* App Integrations Card */}
  <QuickSettingsCard
    title="App Integrations"
    description="Connect Notion, Google Drive, Calendar, and other tools"
    icon={<Link2 className="h-8 w-8" />}
    href="/partner/settings/integrations"
    badge={connectedIntegrations > 0 ? `${connectedIntegrations} connected` : null}
    color="green"
  />
</div>
```

### 3. Quick Settings Card Component
**Location**: Reusable component for each setting category
**Purpose**: Navigate to detailed settings pages with preview information

**QuickSettingsCard Component**:
```tsx
interface QuickSettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string | null;
  color: "orange" | "blue" | "purple" | "green";
  preview?: React.ReactNode;
}

function QuickSettingsCard({
  title,
  description,
  icon,
  href,
  badge,
  color,
  preview
}: QuickSettingsCardProps) {
  const colorClasses = {
    orange: {
      bg: "bg-siso-orange/10",
      border: "border-siso-orange/60",
      iconBg: "bg-siso-orange/20",
      iconText: "text-siso-orange",
      hover: "hover:border-siso-orange hover:bg-siso-orange/5"
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/60", 
      iconBg: "bg-blue-500/20",
      iconText: "text-blue-500",
      hover: "hover:border-blue-500 hover:bg-blue-500/5"
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/60",
      iconBg: "bg-purple-500/20", 
      iconText: "text-purple-500",
      hover: "hover:border-purple-500 hover:bg-purple-500/5"
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/60",
      iconBg: "bg-green-500/20",
      iconText: "text-green-500", 
      hover: "hover:border-green-500 hover:bg-green-500/5"
    }
  };

  const classes = colorClasses[color];

  return (
    <Link
      href={href}
      className={`block group rounded-2xl border-2 p-6 transition-all ${classes.bg} ${classes.border} ${classes.hover}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`h-12 w-12 rounded-xl ${classes.iconBg} flex items-center justify-center ${classes.iconText} group-hover:scale-105 transition-transform`}>
          {icon}
        </div>
        {badge && (
          <span className="px-2 py-1 bg-siso-orange text-white text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
      </div>
      
      <h3 className="font-semibold text-siso-text-primary mb-2 group-hover:text-siso-orange transition-colors">
        {title}
      </h3>
      
      <p className="text-sm text-siso-text-muted leading-relaxed mb-4">
        {description}
      </p>

      {preview && (
        <div className="border-t border-siso-border/30 pt-4">
          {preview}
        </div>
      )}

      <div className="flex items-center text-siso-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Configure</span>
        <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </Link>
  );
}
```

### 4. Preview Components (Optional Enhancement)

#### Appearance Preview
```tsx
const AppearancePreview = () => {
  const { settings } = useAppearanceSettings();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-siso-text-muted">Theme:</span>
      <div className="flex gap-1">
        <div className={`w-4 h-4 rounded-full ${
          settings.theme === 'light' ? 'bg-white border-2 border-gray-300' :
          settings.theme === 'dark' ? 'bg-gray-900' :
          'bg-gradient-to-r from-white to-gray-900'
        }`}></div>
      </div>
      <span className="text-xs text-siso-text-muted capitalize">{settings.theme}</span>
    </div>
  );
};
```

#### Notifications Preview
```tsx
const NotificationsPreview = () => {
  const { unreadCount } = useNotifications();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-siso-text-muted">Unread:</span>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        unreadCount > 0 
          ? 'bg-siso-orange text-white' 
          : 'bg-siso-bg-tertiary text-siso-text-muted'
      }`}>
        {unreadCount || '0'}
      </span>
    </div>
  );
};
```

#### Language Preview
```tsx
const LanguagePreview = () => {
  const { settings } = useLanguageSettings();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-siso-text-muted">Language:</span>
      <span className="text-xs text-siso-text-primary capitalize">
        {settings.language === 'en' ? 'English' : settings.language}
      </span>
    </div>
  );
};
```

#### Integrations Preview
```tsx
const IntegrationsPreview = () => {
  const { integrations } = useIntegrations();
  const connectedCount = integrations.filter(i => i.connected).length;
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-siso-text-muted">Connected:</span>
      <span className={`text-xs font-medium ${
        connectedCount > 0 ? 'text-green-500' : 'text-siso-text-muted'
      }`}>
        {connectedCount} tool{connectedCount !== 1 ? 's' : ''}
      </span>
    </div>
  );
};
```

### 5. Settings Summary Section (Optional Enhancement)
**Location**: Below quick settings grid
**Component**: Overview of current settings status

**Summary Section**:
```tsx
<div className="mt-8 rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/80 p-6">
  <h3 className="font-semibold text-siso-text-primary mb-4">Settings Overview</h3>
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="text-center">
      <div className="text-2xl font-bold text-siso-text-primary">
        {settingsCompleteness}%
      </div>
      <div className="text-xs text-siso-text-muted">Complete</div>
    </div>
    
    <div className="text-center">
      <div className="text-2xl font-bold text-siso-text-primary">
        {connectedIntegrations}
      </div>
      <div className="text-xs text-siso-text-muted">Integrations</div>
    </div>
    
    <div className="text-center">
      <div className="text-2xl font-bold text-siso-text-primary">
        {notificationCategories}
      </div>
      <div className="text-xs text-siso-text-muted">Notification Types</div>
    </div>
    
    <div className="text-center">
      <div className="text-2xl font-bold text-siso-text-primary">
        {securityScore}
      </div>
      <div className="text-xs text-siso-text-muted">Security Score</div>
    </div>
  </div>
  
  <div className="mt-4 pt-4 border-t border-siso-border/30">
    <p className="text-sm text-siso-text-muted text-center">
      Last updated: {formatRelativeTime(lastSettingsUpdate)}
    </p>
  </div>
</div>
```

## Visual Design System

### Color Coding
- **Orange** (`#f6b75e`): Appearance settings
- **Blue** (`#3b82f6`): Language & region settings
- **Purple** (`#8b5cf6`): Notification settings
- **Green** (`#10b981`): Integration settings

### Card Styling
- **Base Style**: `rounded-2xl border-2 p-6` with category-specific colors
- **Hover Effects**: Border color intensification and background color change
- **Icon Containers**: `h-12 w-12 rounded-xl` with colored background
- **Badge System**: Small circular badges for status indicators

### Typography Scale
- **Card Titles**: 16px semibold, orange hover transition
- **Descriptions**: 14px regular, muted color
- **Preview Text**: 12px with muted/primary color variation
- **CTA Text**: 14px medium, orange color

### Spacing System
- **Card Padding**: `p-6` (24px) for comfortable content spacing
- **Grid Gaps**: `gap-4` (16px) between cards
- **Icon-Text Spacing**: `gap-2` (8px) in preview components
- **Section Spacing**: `mt-8` (32px) between major sections

## Interaction Patterns

### Card Navigation
- **Hover State**: Border color intensifies, background subtly changes
- **Icon Animation**: Scale increase on hover for visual feedback
- **CTA Reveal**: "Configure" text and arrow appear on hover
- **Color Transition**: Title text color changes to orange on hover

### Badge System
- **Status Indicators**: Show modified settings, unread counts, connected tools
- **Priority Colors**: Orange for important notifications
- **Count Display**: Numeric badges for unread items and integrations
- **Placement**: Top-right corner of cards for visibility

### Responsive Behavior
- **Mobile Layout**: Single column grid for smaller screens
- **Touch Targets**: Minimum 44px tap targets on mobile devices
- **Text Scaling**: Adjust font sizes for mobile readability
- **Icon Sizes**: Maintain visibility across screen sizes

## Integration Points

### Settings Pages Navigation
- **Deep Linking**: Direct links to specific settings categories
- **State Preservation**: Return to general settings with back navigation
- **Breadcrumb Navigation**: Show settings hierarchy
- **Search Integration**: Quick access to specific settings

### Real-time Updates
- **Badge Counts**: Live updates for unread notifications
- **Settings Changes**: Reflect modifications in badge states
- **Integration Status**: Real-time connection status for external tools
- **Cross-tab Sync**: Settings changes synchronized across browser tabs

### User Preferences
- **Quick Access**: Most-used settings prominently displayed
- **Recently Modified**: Highlight recently changed settings
- **Usage Analytics**: Track which settings are accessed most frequently
- **Personalization**: Customize displayed settings based on usage patterns

## Data Requirements

### Settings State
```typescript
interface GeneralSettingsState {
  // Appearance settings
  currentTheme: "light" | "dark" | "system";
  hasUnsavedAppearanceChanges: boolean;
  
  // Language settings
  currentLanguage: string;
  currentTimezone: string;
  
  // Notification settings
  unreadNotifications: number;
  notificationPreferences: NotificationCategory[];
  
  // Integration settings
  connectedIntegrations: number;
  availableIntegrations: Integration[];
  
  // Summary data
  settingsCompleteness: number;
  lastSettingsUpdate: Date;
  securityScore: number;
}
```

### Preview Data
```typescript
interface PreviewData {
  appearance: {
    theme: string;
    fontSize: string;
    reducedMotion: boolean;
  };
  notifications: {
    unreadCount: number;
    enabledCategories: number;
  };
  language: {
    language: string;
    timezone: string;
  };
  integrations: {
    connected: number;
    total: number;
    recent: Integration[];
  };
}
```

## Performance Considerations

### Lazy Loading
- **Preview Components**: Load preview data on-demand
- **Icon Optimization**: Use SVG icons with proper caching
- **Image Preloading**: Preload preview images for smooth transitions
- **Bundle Splitting**: Separate settings category bundles

### Caching Strategy
- **Settings Cache**: Cache user preferences in browser storage
- **API Optimization**: Batch API calls for settings data
- **Background Sync**: Sync settings changes in background
- **Offline Support**: Basic functionality when network unavailable

### Memory Management
- **Component Unmounting**: Clean up event listeners and timers
- **State Optimization**: Minimize unnecessary re-renders
- **Image Optimization**: Compress preview images and icons
- **Event Delegation**: Optimize event handling for card interactions

## Accessibility Requirements

### Keyboard Navigation
- **Tab Order**: Logical navigation through cards and links
- **Focus Indicators**: Clear focus states for all interactive elements
- **Skip Links**: Jump directly to main content area
- **Keyboard Shortcuts**: Support for common settings shortcuts

### Screen Reader Support
- **Semantic HTML**: Use proper heading hierarchy and landmarks
- **Link Text**: Descriptive link text for card navigation
- **Status Announcements**: Screen reader announcements for settings changes
- **Alternative Text**: Proper alt text for icons and preview images

### Visual Accessibility
- **Color Contrast**: Meet WCAG AA standards for all text and UI elements
- **Text Scaling**: Support 200% zoom without loss of functionality
- **Focus Management**: Proper focus management within card interactions
- **Motion Reduction**: Respect prefers-reduced-motion media query

## Error Handling

### Navigation Errors
- **Invalid Routes**: Handle broken or redirected settings links
- **Permission Errors**: Graceful handling of restricted settings access
- **Loading Errors**: Show fallback states for failed data loading
- **Timeout Handling**: Handle API timeouts with appropriate messaging

### Data Validation
- **Settings Validation**: Validate settings data before display
- **Type Safety**: Ensure proper TypeScript typing for all settings data
- **Fallback Values**: Provide sensible defaults for missing or corrupted data
- **Error Boundaries**: Prevent individual card errors from breaking entire page

## Testing Strategy

### Unit Tests
- **Component Testing**: Individual card rendering and interaction
- **Navigation Testing**: Link routing and navigation behavior
- **Data Testing**: Settings data processing and formatting
- **Accessibility Testing**: Screen reader and keyboard navigation

### Integration Tests
- **Settings Integration**: Test connections to detailed settings pages
- **State Management**: Verify settings state synchronization
- **API Integration**: Mock API responses for settings data
- **Cross-browser Testing**: Ensure consistent behavior across browsers

### E2E Tests
- **Complete User Flows**: Navigate from general to detailed settings
- **Settings Changes**: Verify settings changes reflect in badges/previews
- **Mobile Experience**: Touch interactions and responsive behavior
- **Accessibility Testing**: Screen reader and keyboard navigation workflows