# SISO Monorepo Architecture Design
**Version:** 1.0.0
**Date:** 2025-11-01
**Status:** Design Phase

## 🎯 Executive Summary

This document outlines the domain-based monorepo architecture for consolidating the SISO ecosystem, inspired by the proven restaurant template pattern.

### Key Objectives
1. **Unified Codebase**: Single monorepo for client projects and internal apps
2. **Domain-Driven Design**: Clear separation by business domains and audiences
3. **Code Reusability**: Shared packages for cross-project components
4. **Independent Deployment**: Each app deploys independently
5. **Template System**: Variant-based UI components for rapid customization

---

## 📊 Architecture Overview

```
SISO-MONOREPO/
├── apps/                          # Independent applications
│   ├── clients/                   # Client projects (customer-facing apps)
│   │   ├── restaurant-{name}/
│   │   ├── tour-guides-{name}/
│   │   ├── bike-rental-{name}/
│   │   └── lumelle/
│   │
│   ├── internal/                  # SISO internal apps
│   │   ├── partnerships/          # Partner management platform
│   │   ├── ecosystem/             # Internal ecosystem tools
│   │   ├── admin-portal/          # Central admin dashboard
│   │   └── analytics/             # Cross-client analytics
│   │
│   └── templates/                 # Reusable templates
│       ├── restaurant-template/
│       ├── tour-template/
│       └── saas-template/
│
├── packages/                      # Shared packages
│   ├── ui/                        # Shared UI components
│   │   ├── customer-facing/       # Public UI components
│   │   ├── client-facing/         # Business admin UI
│   │   └── shared/                # Common primitives
│   │
│   ├── domain-models/             # Shared domain logic
│   │   ├── restaurant/
│   │   ├── tour/
│   │   ├── booking/
│   │   └── analytics/
│   │
│   ├── services/                  # Shared services
│   │   ├── supabase-client/       # Supabase SDK wrapper
│   │   ├── supabase-partners/     # Partners DB client
│   │   ├── ai-workflows/          # AI agent orchestration
│   │   ├── auth/                  # Authentication utilities
│   │   └── payments/              # Payment integrations
│   │
│   ├── templates/                 # Template engine & registry
│   │   ├── section-renderer/      # Template rendering engine
│   │   ├── variant-registry/      # Variant management
│   │   └── template-builder/      # Template customization tools
│   │
│   └── config/                    # Shared configuration
│       ├── eslint-config/
│       ├── typescript-config/
│       └── tailwind-config/
│
├── docs/                          # Documentation
│   ├── architecture/              # Architecture docs
│   ├── client/                    # Client-specific docs
│   ├── internal/                  # Internal docs
│   ├── shared/                    # Shared guides
│   └── migration/                 # Migration guides
│
├── scripts/                       # Monorepo scripts
│   ├── generate-app/              # Scaffold new apps
│   ├── deploy/                    # Deployment scripts
│   └── migrate/                   # Migration utilities
│
└── .github/                       # GitHub workflows
    └── workflows/
        ├── deploy-client.yml
        ├── deploy-internal.yml
        └── test-packages.yml
```

---

## 🏗️ Domain-Based Architecture Pattern

### Three-Tier Audience Model

Each application follows a consistent domain structure based on target audience:

```
app/src/domains/
├── customer-facing/     # Public-facing features (B2C)
│   ├── landing/
│   ├── catalog/         # menu/tours/inventory
│   ├── booking/
│   ├── reviews/
│   ├── blog/
│   ├── loyalty/
│   └── chat/
│
├── client-facing/       # Business owner features (B2B)
│   ├── dashboard/
│   ├── analytics/
│   ├── inventory/
│   ├── marketing/
│   ├── finance/
│   ├── staff/
│   └── settings/
│
└── shared/              # Cross-audience utilities
    ├── components/
    ├── hooks/
    ├── server/
    ├── types/
    └── utils/
```

### Domain Internal Structure

Each domain follows a standardized pattern:

```
domain-name/
├── sections/                    # Template-based UI sections
│   ├── section-name/
│   │   ├── templates/
│   │   │   ├── primary/        # Default implementation
│   │   │   ├── template-2/     # Alternative design
│   │   │   └── template-3/     # Another variant
│   │   ├── shared/
│   │   │   ├── components/     # Section-specific components
│   │   │   ├── hooks/          # Section-specific hooks
│   │   │   └── utils/          # Section-specific utilities
│   │   ├── types/
│   │   │   ├── schema.ts       # Zod schemas
│   │   │   └── index.ts        # Type exports
│   │   ├── registry.ts         # Template variant registry
│   │   ├── index.tsx           # Renderer + exports
│   │   └── README.md           # Documentation
│   │
├── shared/                      # Domain-level shared code
│   ├── types/                   # Domain types
│   ├── hooks/                   # Domain hooks
│   ├── utils/                   # Domain utilities
│   └── server/                  # Server actions
│
├── pages/                       # Page components
│   ├── DomainPage.tsx          # Customer view
│   └── AdminDomainPage.tsx     # Client admin view
│
└── index.ts                     # Public API
```

---

## 📦 Shared Packages Strategy

### 1. UI Components (`@siso/ui-*`)

```typescript
// packages/ui/customer-facing/
export { Button, Card, Modal } from './primitives'
export { HeroSection, CTASection } from './sections'
export { useSectionRenderer } from './hooks'

// packages/ui/client-facing/
export { DataTable, Dashboard, Analytics } from './admin'
export { FormBuilder, FieldTypes } from './forms'
```

### 2. Domain Models (`@siso/domain-*`)

```typescript
// packages/domain-models/restaurant/
export interface MenuItem {
  id: string
  name: string
  price: number
  category: string
}

export class MenuService {
  async getMenuItems(): Promise<MenuItem[]>
  async createMenuItem(item: MenuItem): Promise<void>
}
```

### 3. Services (`@siso/service-*`)

```typescript
// packages/services/supabase-client/
export const createClient = (project: 'client' | 'partners') => {
  // Returns configured Supabase client
}

// packages/services/ai-workflows/
export const aiOrchestrator = {
  async analyzeContent(content: string): Promise<Analysis>
  async generateRecommendations(): Promise<Recommendation[]>
}
```

### 4. Template Engine (`@siso/templates`)

```typescript
// packages/templates/section-renderer/
export const SectionRenderer: React.FC<{
  sectionType: string
  variant: string
  content: unknown
}> = ({ sectionType, variant, content }) => {
  const Component = registry.get(sectionType, variant)
  return <Component content={content} />
}

// packages/templates/variant-registry/
export const registry = {
  register(section: string, variant: string, component: React.FC)
  get(section: string, variant: string): React.FC
  getVariants(section: string): string[]
}
```

---

## 🔄 Migration Strategy

### Phase 1: Foundation (Week 1-2)
1. ✅ Create monorepo structure
2. ✅ Set up package management (pnpm workspaces)
3. ✅ Configure build system (Turbo/Nx)
4. ✅ Extract shared UI components to `packages/ui`
5. ✅ Create template rendering engine

### Phase 2: Client Apps Migration (Week 3-4)
1. Copy existing client apps to `apps/clients/`
2. Refactor to use shared packages
3. Standardize domain structure
4. Migrate Supabase configurations
5. Update deployment pipelines

### Phase 3: Internal Apps Migration (Week 5-6)
1. Copy partnership app to `apps/internal/partnerships`
2. Extract shared services to packages
3. Migrate ecosystem tools
4. Create admin portal
5. Consolidate analytics

### Phase 4: Optimization (Week 7-8)
1. Performance tuning
2. Code deduplication
3. Template gallery creation
4. Documentation completion
5. Developer tooling improvements

---

## 🎨 Template System Architecture

### Variant-Based Component System

```typescript
// Example: Menu Categories Section
interface MenuCategoriesContent {
  title: string
  categories: Category[]
  layout: 'grid' | 'list' | 'carousel'
}

type MenuCategoriesVariant = 'primary' | 'minimal' | 'featured'

// Registry entry
registry.register(
  'menu-categories',
  'primary',
  MenuCategoriesPrimary
)

// Usage in app
<SectionRenderer
  sectionType="menu-categories"
  variant="primary"
  content={categoriesContent}
/>
```

### Benefits
- **Rapid Customization**: Swap variants without code changes
- **Consistent API**: All variants accept same content shape
- **A/B Testing**: Easy to test different designs
- **Client Branding**: Each client can have custom variants

---

## 🔐 Database Strategy

### Multi-Tenant Architecture

```
Supabase Projects:
├── siso-client (Production)
│   ├── restaurant_lumelle
│   ├── restaurant_client2
│   └── tours_client3
│
└── siso-partners (Production)
    ├── partner_projects
    ├── analytics
    └── billing
```

### Shared Package Approach

```typescript
// packages/services/supabase-client/
export const getClient = (project: 'client' | 'partners') => {
  const config = configs[project]
  return createBrowserClient(config.url, config.anonKey)
}

// In app
import { getClient } from '@siso/supabase-client'
const supabase = getClient('client')
```

---

## 🚀 Deployment Architecture

### Independent App Deployments

```yaml
# .github/workflows/deploy-client-app.yml
name: Deploy Client App
on:
  push:
    paths:
      - 'apps/clients/{app-name}/**'
      - 'packages/**'

jobs:
  deploy:
    - Build affected packages
    - Build client app
    - Deploy to Vercel
    - Notify deployment status
```

### Deployment Targets
- **Client Apps**: Vercel (edge functions + static)
- **Internal Apps**: Vercel (same infrastructure)
- **Shared Packages**: npm registry (private)

---

## 📈 Success Metrics

### Development Efficiency
- ✅ 50% reduction in duplicate code
- ✅ 3x faster new client onboarding
- ✅ 80% code reuse across similar projects

### Maintainability
- ✅ Single source of truth for shared logic
- ✅ Centralized dependency management
- ✅ Unified testing strategy

### Scalability
- ✅ Support 50+ client apps
- ✅ Independent deployment pipelines
- ✅ Modular architecture for growth

---

## 🛠️ Technology Stack

### Build System
- **Package Manager**: pnpm (workspaces)
- **Build Tool**: Turbo (parallel builds, caching)
- **Bundler**: Next.js (per-app)

### Development Tools
- **TypeScript**: Shared configs
- **ESLint**: Monorepo-aware rules
- **Prettier**: Consistent formatting
- **Husky**: Pre-commit hooks

### Testing
- **Unit**: Vitest (packages)
- **Integration**: Playwright (apps)
- **E2E**: Playwright (critical paths)

---

## 📚 Next Steps

1. **Review & Approve**: Team review of architecture
2. **POC**: Build proof-of-concept with one client app
3. **Iterate**: Refine based on learnings
4. **Execute**: Follow migration phases
5. **Document**: Create developer guides

---

## 🔗 References

- [Restaurant Template Analysis](../templates/restaurant-template-analysis.md)
- [Migration Plan](../migration/detailed-plan.md)
- [Package Guidelines](../packages/creation-guide.md)
- [Domain Design Patterns](./domain-patterns.md)

---

*This architecture is designed to scale with SISO's growth while maintaining code quality and developer productivity.*
