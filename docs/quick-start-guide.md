# SISO Monorepo Quick Start Guide

## 🚀 Get Started in 5 Minutes

This guide will get you up and running with the SISO monorepo.

---

## Prerequisites

```bash
# Required
- Node.js 18+
- pnpm 8+
- Git

# Check versions
node --version  # Should be 18.0.0+
pnpm --version  # Should be 8.0.0+
```

---

## Initial Setup

### 1. Clone & Install

```bash
# Clone the repository
cd SISO-MONOREPO

# Install all dependencies
pnpm install

# Build all packages
pnpm build
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Add your credentials
# - Supabase URLs & Keys
# - Vercel tokens
# - Other API keys
```

---

## Project Structure

```
SISO-MONOREPO/
├── apps/
│   ├── clients/          # Client projects
│   ├── internal/         # Internal tools
│   └── templates/        # Reusable templates
├── packages/
│   ├── ui/              # UI components
│   ├── domain-models/   # Business logic
│   ├── services/        # Shared services
│   └── templates/       # Template engine
└── docs/                # Documentation
```

---

## Common Commands

### Development

```bash
# Run all apps in dev mode
pnpm dev

# Run specific app
pnpm dev --filter restaurant-lumelle

# Run specific package
pnpm dev --filter @siso/ui-shared
```

### Building

```bash
# Build everything
pnpm build

# Build specific app
pnpm build --filter restaurant-lumelle

# Build all packages only
pnpm build --filter @siso/*
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests for specific package
pnpm test --filter @siso/ui-shared

# Run tests in watch mode
pnpm test:watch
```

### Linting

```bash
# Lint all code
pnpm lint

# Lint and fix
pnpm lint:fix
```

---

## Working with Apps

### Create New Client App

```bash
# Use the generator script
pnpm generate:app clients my-restaurant

# Or manually
mkdir -p apps/clients/my-restaurant
cd apps/clients/my-restaurant
pnpm init
```

### Run Specific App

```bash
# Development
cd apps/clients/restaurant-lumelle
pnpm dev

# Or from root
pnpm dev --filter restaurant-lumelle
```

### Deploy App

```bash
# Deploy to Vercel
pnpm deploy --filter restaurant-lumelle

# Or using Vercel CLI
cd apps/clients/restaurant-lumelle
vercel --prod
```

---

## Working with Packages

### Create New Package

```bash
# Use the generator
pnpm generate:package ui my-component

# Or manually
mkdir -p packages/ui/my-component/src
cd packages/ui/my-component
pnpm init
```

### Use Package in App

```typescript
// apps/clients/my-app/package.json
{
  "dependencies": {
    "@siso/ui-shared": "workspace:*"
  }
}
```

```typescript
// apps/clients/my-app/src/app/page.tsx
import { Button } from '@siso/ui-shared'

export default function Page() {
  return <Button>Click me</Button>
}
```

### Publish Package (Internal)

```bash
cd packages/ui/shared
pnpm publish --access restricted
```

---

## Domain-Based Development

### Domain Structure

Each app should follow this structure:

```
app/src/domains/
├── customer-facing/     # Public features
│   ├── landing/
│   ├── menu/
│   └── booking/
├── client-facing/       # Admin features
│   ├── dashboard/
│   └── analytics/
└── shared/              # Common code
    ├── components/
    └── hooks/
```

### Creating a Domain

```bash
# In your app
mkdir -p src/domains/customer-facing/my-domain/{pages,sections,shared}

# Create the structure
cd src/domains/customer-facing/my-domain
mkdir -p sections/my-section/{templates/primary,shared,types}
mkdir -p shared/{types,hooks,utils}
mkdir -p pages
```

### Domain Example

```typescript
// src/domains/customer-facing/menu/index.ts
export { MenuPage } from './pages/MenuPage'
export { useMenuItems } from './shared/hooks'
export type { MenuItem } from './shared/types'

// Usage in app
import { MenuPage, useMenuItems } from '@/domains/customer-facing/menu'
```

---

## Template System

### Using Templates

```typescript
import { SectionRenderer } from '@siso/templates/section-renderer'

export default function Page() {
  return (
    <SectionRenderer
      sectionType="menu-header"
      variant="primary"
      content={{
        title: "Our Menu",
        subtitle: "Delicious food"
      }}
    />
  )
}
```

### Creating Template Variant

```typescript
// packages/ui/customer-facing/src/sections/menu-header/templates/template-2/index.tsx
import type { MenuHeaderContent } from '../../types'

export const MenuHeaderTemplate2: React.FC<{ content: MenuHeaderContent }> = ({
  content
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-500">
      <h1>{content.title}</h1>
      <p>{content.subtitle}</p>
    </header>
  )
}

// Register the variant
import { registry } from '@siso/templates/variant-registry'
registry.register('menu-header', 'template-2', MenuHeaderTemplate2)
```

---

## Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
pnpm clean
pnpm install
pnpm build
```

### Dependency Issues

```bash
# Update all dependencies
pnpm update -r

# Check for issues
pnpm audit
```

### Type Errors

```bash
# Regenerate TypeScript types
pnpm generate:types

# Check types
pnpm typecheck
```

---

## Best Practices

### 1. Always Use Shared Packages

❌ **Bad**: Copy components between apps
```typescript
// Copying same Button component everywhere
```

✅ **Good**: Use shared package
```typescript
import { Button } from '@siso/ui-shared'
```

### 2. Follow Domain Structure

❌ **Bad**: Flat component structure
```
src/
  components/
    Header.tsx
    Footer.tsx
    Menu.tsx
    Dashboard.tsx
```

✅ **Good**: Domain-organized
```
src/domains/
  customer-facing/
    menu/
  client-facing/
    dashboard/
```

### 3. Use Template System

❌ **Bad**: Hardcoded components
```typescript
<div className="header-style-1">
  <h1>{title}</h1>
</div>
```

✅ **Good**: Template-based
```typescript
<SectionRenderer
  sectionType="header"
  variant="style-1"
  content={{ title }}
/>
```

---

## Next Steps

1. **Read Architecture Docs**: `docs/architecture/monorepo-architecture-design.md`
2. **View Diagrams**: `docs/architecture/architecture-diagrams.md`
3. **Follow Migration Plan**: `docs/migration/implementation-plan.md`
4. **Explore Examples**: Check `apps/templates/` for examples

---

## Resources

- [Architecture Overview](./architecture/monorepo-architecture-design.md)
- [Implementation Plan](./migration/implementation-plan.md)
- [Package Guidelines](./packages/creation-guide.md)
- [Domain Patterns](./architecture/domain-patterns.md)

---

## Getting Help

### Documentation
- Check `docs/` folder first
- Read package READMEs
- Review code examples

### Team Support
- Ask in team chat
- Schedule pairing session
- Create GitHub issue

---

## Useful Scripts

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "clean": "turbo run clean && rm -rf node_modules",
    "generate:app": "node scripts/generate-app.js",
    "generate:package": "node scripts/generate-package.js",
    "generate:types": "turbo run generate:types",
    "deploy": "turbo run deploy"
  }
}
```

---

**You're ready to start building! 🚀**

For questions or issues, check the docs or reach out to the team.
