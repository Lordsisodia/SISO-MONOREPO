# Appearance & Accessibility Settings

- **Route**: `/partner/settings/appearance`
- **Section**: Settings
- **Complexity**: Medium (has domain + application + ui layers)
- **Primary Objective**: Personalize visual/accessibility preferences

## Content Modules & Components

### 1. Theme Selection Section
**Location**: Top section below page header
**Component**: Theme selector with visual previews

**Theme Options Structure**:
```typescript
const themeOptions = [
  {
    value: "light",
    label: "Light",
    description: "Clean and bright interface for daytime use",
    preview: {
      background: "bg-white",
      card: "bg-gray-50",
      text: "text-gray-900",
      border: "border-gray-200"
    }
  },
  {
    value: "dark", 
    label: "Dark",
    description: "Easy on the eyes for low-light environments",
    preview: {
      background: "bg-gray-900",
      card: "bg-gray-800", 
      text: "text-gray-100",
      border: "border-gray-700"
    }
  },
  {
    value: "system",
    label: "System",
    description: "Automatically match your device settings",
    preview: {
      background: "bg-gradient-to-br from-white to-gray-900",
      card: "bg-gradient-to-br from-gray-50 to-gray-800",
      text: "text-gray-900 dark:text-gray-100",
      border: "border-gray-200 dark:border-gray-700"
    }
  }
]
```

**Theme Selector Component**:
```tsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  {themeOptions.map((theme) => (
    <button
      key={theme.value}
      onClick={() => updateTheme(theme.value as AppearanceSettings["theme"])}
      className={`relative rounded-2xl border-2 p-4 transition-all ${
        settings.theme === theme.value 
          ? 'border-siso-orange bg-siso-orange/10' 
          : 'border-siso-border/60 hover:border-siso-orange/40'
      }`}
    >
      {/* Preview mini card */}
      <div className={`h-20 rounded-lg border ${theme.preview.background} ${theme.preview.card} ${theme.preview.border} mb-3 p-2`}>
        <div className={`h-2 w-3/4 rounded ${theme.preview.text} opacity-60 mb-2`}></div>
        <div className={`h-1 w-1/2 rounded ${theme.preview.text} opacity-40`}></div>
      </div>
      <h3 className="font-semibold text-siso-text-primary">{theme.label}</h3>
      <p className="text-xs text-siso-text-muted mt-1">{theme.description}</p>
      {settings.theme === theme.value && (
        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-siso-orange flex items-center justify-center">
          <Check className="h-3 w-3 text-white" />
        </div>
      )}
    </button>
  ))}
</div>
```

### 2. Font Size Section
**Location**: Below theme selection
**Component**: Font size selector with live preview

**Font Size Options**:
```typescript
const fontSizeOptions = [
  {
    value: "small",
    label: "Small", 
    description: "More content on screen",
    preview: { base: "14px", heading: "18px" },
    scale: 0.875
  },
  {
    value: "medium",
    label: "Medium",
    description: "Default size for most users", 
    preview: { base: "16px", heading: "20px" },
    scale: 1
  },
  {
    value: "large",
    label: "Large",
    description: "Easier to read text",
    preview: { base: "18px", heading: "22px" },
    scale: 1.125
  }
]
```

**Font Size Selector Component**:
```tsx
<div className="space-y-4">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {fontSizeOptions.map((size) => (
      <button
        key={size.value}
        onClick={() => updateFontSize(size.value as AppearanceSettings["fontSize"])}
        className={`rounded-xl border-2 p-4 transition-all ${
          settings.fontSize === size.value
            ? 'border-siso-orange bg-siso-orange/10'
            : 'border-siso-border/60 hover:border-siso-orange/40'
        }`}
      >
        <div className="space-y-2">
          <div 
            className="font-semibold text-siso-text-primary"
            style={{ fontSize: `${size.preview.heading * 0.875}px` }}
          >
            {size.label}
          </div>
          <div 
            className="text-siso-text-muted"
            style={{ fontSize: `${size.preview.base * 0.75}px` }}
          >
            Sample text preview
          </div>
        </div>
      </button>
    ))}
  </div>
</div>
```

### 3. Accessibility Options Section
**Location**: Below font size
**Component**: Toggle switches with descriptions

**Accessibility Settings Structure**:
```typescript
const accessibilityOptions = [
  {
    id: "reducedMotion",
    label: "Reduced Motion",
    description: "Minimize animations and transitions throughout the interface",
    icon: Activity,
    currentValue: settings.reducedMotion,
    onToggle: toggleReducedMotion,
    impact: "affects all page transitions, loading states, and hover effects"
  },
  {
    id: "highContrast", 
    label: "High Contrast",
    description: "Increase color contrast for better visibility",
    icon: Contrast,
    currentValue: settings.highContrast,
    onToggle: toggleHighContrast,
    impact: "enhances text readability and button visibility"
  },
  {
    id: "hapticFeedback",
    label: "Haptic Feedback", 
    description: "Enable vibration for interactions on supported devices",
    icon: Smartphone,
    currentValue: settings.hapticFeedback,
    onToggle: toggleHapticFeedback,
    impact: "provides touch feedback for buttons and form submissions"
  }
]
```

**Toggle Switch Component**:
```tsx
<div className="space-y-4">
  {accessibilityOptions.map((option) => (
    <div 
      key={option.id}
      className="rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/80 p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="h-10 w-10 rounded-xl bg-siso-bg-tertiary/80 flex items-center justify-center">
            <option.icon className="h-5 w-5 text-siso-orange" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-siso-text-primary">{option.label}</h3>
            <p className="text-sm text-siso-text-muted">{option.description}</p>
            <p className="text-xs text-siso-text-muted/60 mt-1">
              Affects: {option.impact}
            </p>
          </div>
        </div>
        
        <ToggleSwitch
          checked={option.currentValue}
          onCheckedChange={option.onToggle}
          className="shrink-0"
        />
      </div>
    </div>
  ))}
</div>
```

## Domain Types & Data Structure

### AppearanceSettings Interface
```typescript
interface AppearanceSettings {
  theme: "light" | "dark" | "system";     // Current theme selection
  primaryColor: string;                   // Hex color for primary actions
  fontSize: "small" | "medium" | "large";  // Text size preference
  reducedMotion: boolean;                 // Animation reduction flag
  highContrast: boolean;                  // High contrast mode flag
  hapticFeedback: boolean;                // Haptic feedback preference
}
```

### Constants
```typescript
export const THEME_OPTIONS = ["light", "dark", "system"] as const;
export const FONT_SIZE_OPTIONS = ["small", "medium", "large"] as const;
```

## Application Hook: `useAppearanceSettings`

**Purpose**: Manages appearance settings state and provides update functions

**Return Structure**:
```typescript
{
  settings: AppearanceSettings;                    // Current settings
  updateTheme: (theme: ThemeOption) => void;       // Update theme
  updateFontSize: (size: FontSizeOption) => void;  // Update font size
  toggleReducedMotion: () => void;                 // Toggle motion
  toggleHighContrast: () => void;                  // Toggle contrast
  toggleHapticFeedback: () => void;                // Toggle haptics
}
```

## CSS Variables & Implementation

### Theme Variables
```css
:root {
  --color-primary: #3b82f6;
  --font-size-base: 16px;
  --font-size-heading: 20px;
  --transition-duration: 200ms;
}

[data-theme="dark"] {
  --color-primary: #60a5fa;
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
}

[data-font-size="small"] {
  --font-size-base: 14px;
  --font-size-heading: 18px;
}

[data-font-size="large"] {
  --font-size-base: 18px; 
  --font-size-heading: 22px;
}

[data-reduced-motion="true"] * {
  animation-duration: 0.01ms !important;
  animation-iteration-count: 1 !important;
  transition-duration: 0.01ms !important;
}

[data-high-contrast="true"] {
  --color-text: #000000;
  --color-text-secondary: #333333;
  --color-border: #000000;
}
```

## Visual Design System

### Component Styling
- **Theme Selector Cards**: `rounded-2xl border-2` with selected state styling
- **Font Size Buttons**: `rounded-xl border-2` with dynamic text sizing
- **Accessibility Toggles**: `rounded-2xl border` with icon + description layout
- **Preview Elements**: Live rendering of theme/font changes

### Color Palette
- **Primary Orange**: `#f6b75e` (siso-orange)
- **Border Active**: `border-siso-orange`
- **Background**: `bg-siso-bg-secondary/80`
- **Text**: `text-siso-text-primary`, `text-siso-text-muted`

### Spacing & Layout
- **Section Spacing**: `space-y-4` (16px) between sections
- **Card Padding**: `p-4` (16px) for consistent interior spacing
- **Grid Layout**: Responsive `grid-cols-1 sm:grid-cols-3` for selectors
- **Icon Containers**: `h-10 w-10` (40px) with `rounded-xl` (12px)

## Interaction Patterns

### Theme Selection
- **Visual Feedback**: Orange border and checkmark for selected theme
- **Hover State**: Border color change to `orange/40`
- **Preview Cards**: Mini interface mockups showing theme effect

### Font Size Selection  
- **Live Preview**: Sample text scales with selection
- **Proportional Scaling**: Headings and body text maintain ratios
- **Smooth Transitions**: Font size changes animate smoothly

### Toggle Switches
- **Visual State**: Clearly marked on/off positions
- **Icon Association**: Each option has meaningful icon
- **Impact Description**: Clear explanation of what each setting affects

## Integration Points

### Theme System
- **CSS Variables**: Dynamic variable updates for immediate visual changes
- **System Detection**: Respect OS-level theme preferences
- **Persistence**: Save theme choice to user preferences

### Font Scaling
- **Responsive Design**: Maintain layout integrity at all sizes
- **Component Scaling**: Scale UI components proportionally
- **Text Wrapping**: Handle text overflow gracefully

### Accessibility
- **Motion Reduction**: Disable all non-essential animations
- **High Contrast**: Override color system for WCAG compliance
- **Screen Reader**: Proper ARIA labels for all controls

## Data Requirements

### API Endpoints
```typescript
// Get current appearance settings
GET /api/user/settings/appearance

// Update appearance settings
PUT /api/user/settings/appearance
{
  theme: "light" | "dark" | "system",
  primaryColor: string,
  fontSize: "small" | "medium" | "large",
  reducedMotion: boolean,
  highContrast: boolean,
  hapticFeedback: boolean
}

// Reset to defaults
POST /api/user/settings/appearance/reset
```

### Browser Storage
- **Local Storage**: Cache theme preference for immediate page load
- **Session Storage**: Temporary UI state during selection
- **Media Queries**: Detect system theme preferences

## Performance Considerations

### Theme Switching
- **CSS Transitions**: Smooth theme changes without flickering
- **Image Optimization**: Theme-aware image loading
- **Font Loading**: Preload font variants for size changes

### Motion Reduction
- **Animation Disabling**: CSS `prefers-reduced-motion` support
- **Performance Gains**: Reduced CPU usage on lower-end devices
- **Battery Life**: Longer battery life with disabled animations

## Accessibility Requirements

### WCAG 2.1 Compliance
- **Color Contrast**: 4.5:1 ratio for normal text, 3:1 for large text
- **Motion Control**: Respect `prefers-reduced-motion` media query
- **Keyboard Navigation**: Full keyboard access to all controls

### Screen Reader Support
- **Labels**: Descriptive labels for all controls
- **State Announcements**: Screen reader announcements for setting changes
- **Context**: Clear indication of current setting values

### Visual Accessibility
- **Focus Indicators**: Clear focus states for all interactive elements
- **Text Scaling**: Support 200% zoom without horizontal scrolling
- **Color Independence**: Information not conveyed by color alone

## Error Handling

### Validation Errors
- **Theme Selection**: Validate theme values before applying
- **Font Size**: Ensure font size remains within acceptable range
- **Color Values**: Validate hex color format for primary color

### Fallback Behavior
- **Theme Loading**: Default to system theme if settings fail
- **Font Scaling**: Default to medium size if custom size fails
- **CSS Variables**: Provide fallback values for unsupported features

## Testing Strategy

### Unit Tests
- **Hook Testing**: `useAppearanceSettings` state management
- **Toggle Logic**: Setting update functions
- **Validation**: Input validation and error handling

### Visual Testing
- **Theme Rendering**: Screenshot tests for all themes
- **Font Scaling**: Visual regression tests for size changes
- **Accessibility**: Automated contrast and motion tests

### Integration Tests
- **API Integration**: Save/load settings functionality
- **Browser Storage**: Local storage persistence
- **System Detection**: Theme preference detection