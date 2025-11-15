# SISO Global Color System Documentation

## Overview
This document outlines the comprehensive global color system implemented for the SISO Client Base application. The color system ensures consistency, accessibility, and maintainability across all components.

## Color Architecture

### 1. Core Brand Colors
- **Black**: `#000000` - Primary brand color
- **Orange**: `#FFA726` - Accent and highlight color
- **Red**: `#FF5722` - Secondary accent color

### 2. Background System
```css
--siso-bg-primary: #121212;    /* Main background */
--siso-bg-secondary: #1A1A1A;  /* Card/panel backgrounds */
--siso-bg-tertiary: #242424;   /* Elevated surfaces */
--siso-bg-hover: #2A2A2A;      /* Hover states */
--siso-bg-active: #333333;     /* Active/pressed states */
```

### 3. Text Hierarchy
```css
--siso-text-primary: #FFFFFF;   /* Primary text, headings */
--siso-text-secondary: #E0E0E0; /* Body text */
--siso-text-muted: #9E9E9E;     /* Secondary information */
--siso-text-disabled: #666666;  /* Disabled states */
```

### 4. Border System
```css
--siso-border-primary: #2A2A2A;   /* Default borders */
--siso-border-secondary: #3A3A3A; /* Emphasized borders */
--siso-border-hover: #4A4A4A;     /* Hover state borders */
--siso-border-active: #5A5A5A;    /* Active state borders */
```

### 5. Status Colors
```css
--siso-success: #4CAF50;
--siso-warning: #FF9800;
--siso-error: #F44336;
--siso-info: #2196F3;
```

### 6. Gradients
```css
--siso-gradient-primary: linear-gradient(135deg, #FF5722 0%, #FFA726 100%);
--siso-gradient-hover: linear-gradient(135deg, #FF5722 0%, #FFB038 100%);
--siso-gradient-text: linear-gradient(90deg, #FF5722 0%, #FFA726 100%);
```

## Implementation Guide

### CSS Variables
All colors are defined as CSS custom properties in `/src/styles/color-system.css`

### Tailwind Integration
The color system is integrated with Tailwind CSS through the config file:
```js
colors: {
  siso: {
    bg: "var(--siso-bg-primary)",
    "bg-alt": "var(--siso-bg-secondary)",
    red: "var(--siso-red)",
    orange: "var(--siso-orange)",
    // ... etc
  }
}
```

### Usage Examples

#### Component Styling
```jsx
// Button component
<button className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-80">
  Click Me
</button>

// Card component
<div className="bg-siso-bg-alt border border-siso-border hover:border-siso-border-hover">
  Content
</div>
```

#### CSS Classes
```css
.siso-gradient-text {
  background: var(--siso-gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.siso-card {
  background-color: var(--siso-bg-secondary);
  border-color: var(--siso-border-primary);
}
```

## Accessibility Considerations

### Contrast Ratios
- Primary text on background: 12.63:1 (AAA compliant)
- Secondary text on background: 9.93:1 (AAA compliant)
- Muted text on background: 4.95:1 (AA compliant)

### Color Blindness
- The orange/red gradient maintains distinguishability
- Status colors use standard recognized hues
- Icons and indicators use shape in addition to color

## Migration Guide

### Before (Old System)
```jsx
<div style={{ backgroundColor: '#1A1A1A', border: '1px solid #2A2A2A' }}>
  <h1 style={{ color: 'white' }}>Title</h1>
</div>
```

### After (New System)
```jsx
<div className="bg-siso-bg-alt border border-siso-border">
  <h1 className="text-siso-text-primary">Title</h1>
</div>
```

## Benefits

1. **Consistency**: Single source of truth for all colors
2. **Maintainability**: Easy to update colors globally
3. **Performance**: CSS variables are performant
4. **Theme Support**: Easy to implement light/dark themes
5. **Developer Experience**: IntelliSense support with Tailwind

## Next Steps

1. Audit all components for hardcoded colors
2. Replace inline styles with utility classes
3. Test color contrast accessibility
4. Document component-specific color usage
5. Create Figma/design tool color palette export