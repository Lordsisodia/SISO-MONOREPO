# SISO Monorepo Implementation Plan
**Version:** 1.0.0
**Date:** 2025-11-01
**Timeline:** 8 weeks

---

## 🎯 Overview

This document outlines the step-by-step implementation plan for migrating to the SISO monorepo architecture.

### Success Criteria
- ✅ All client apps running in monorepo
- ✅ All internal apps consolidated
- ✅ 50%+ code shared via packages
- ✅ Independent deployment pipelines
- ✅ Zero production downtime

---

## 📅 Phase 1: Foundation (Weeks 1-2)

### Week 1: Monorepo Setup

#### Day 1-2: Project Initialization
```bash
# Tasks
- [ ] Create monorepo structure
- [ ] Configure pnpm workspaces
- [ ] Set up Turbo/Nx for builds
- [ ] Initialize TypeScript configs
- [ ] Configure ESLint/Prettier
```

**Commands:**
```bash
cd SISO-MONOREPO

# Initialize pnpm workspace
cat > pnpm-workspace.yaml << EOF
packages:
  - 'apps/*'
  - 'apps/clients/*'
  - 'apps/internal/*'
  - 'apps/templates/*'
  - 'packages/**'
EOF

# Create package.json
cat > package.json << EOF
{
  "name": "siso-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": ["apps/*", "packages/**"],
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "test": "turbo run test",
    "lint": "turbo run lint"
  },
  "devDependencies": {
    "turbo": "latest",
    "@typescript-eslint/parser": "latest",
    "eslint": "latest",
    "prettier": "latest"
  }
}
EOF

# Install dependencies
pnpm install
```

**Deliverables:**
- [ ] Working monorepo structure
- [ ] Build system configured
- [ ] Development commands functional

---

#### Day 3-4: Extract UI Components

```bash
# Tasks
- [ ] Create @siso/ui-shared package
- [ ] Extract Button, Card, Input primitives
- [ ] Create @siso/ui-customer-facing
- [ ] Extract HeroSection, CTASection
- [ ] Create @siso/ui-client-facing
- [ ] Extract Dashboard, DataTable components
```

**Package Structure:**
```
packages/ui/
├── shared/
│   ├── package.json
│   ├── src/
│   │   ├── primitives/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   └── index.ts
│   └── tsconfig.json
│
├── customer-facing/
│   ├── package.json
│   ├── src/
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   └── CTASection.tsx
│   │   └── index.ts
│   └── tsconfig.json
│
└── client-facing/
    ├── package.json
    ├── src/
    │   ├── admin/
    │   │   ├── Dashboard.tsx
    │   │   └── DataTable.tsx
    │   └── index.ts
    └── tsconfig.json
```

**Example Package.json:**
```json
{
  "name": "@siso/ui-shared",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --dts",
    "dev": "tsup src/index.ts --watch --dts"
  },
  "dependencies": {
    "react": "^18.0.0"
  },
  "devDependencies": {
    "tsup": "latest",
    "typescript": "latest"
  }
}
```

**Deliverables:**
- [ ] 3 UI packages created
- [ ] Components extracted and tested
- [ ] Build pipeline working

---

#### Day 5: Template Engine

```bash
# Tasks
- [ ] Create @siso/templates package
- [ ] Build section renderer
- [ ] Build variant registry
- [ ] Add template types
```

**Template Engine Structure:**
```typescript
// packages/templates/section-renderer/src/SectionRenderer.tsx
import React from 'react'
import { registry } from '@siso/templates/variant-registry'

interface SectionRendererProps {
  sectionType: string
  variant: string
  content: unknown
  className?: string
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  sectionType,
  variant,
  content,
  className
}) => {
  const Component = registry.get(sectionType, variant)

  if (!Component) {
    console.warn(`No component found for ${sectionType}:${variant}`)
    return null
  }

  return (
    <div className={className}>
      <Component content={content} />
    </div>
  )
}

// Renderer utilities
export const renderSection = (
  type: string,
  variant: string,
  content: unknown
) => {
  return <SectionRenderer sectionType={type} variant={variant} content={content} />
}
```

```typescript
// packages/templates/variant-registry/src/registry.ts
type ComponentMap = Map<string, Map<string, React.ComponentType<any>>>

class VariantRegistry {
  private registry: ComponentMap = new Map()

  register(
    sectionType: string,
    variant: string,
    component: React.ComponentType<any>
  ): void {
    if (!this.registry.has(sectionType)) {
      this.registry.set(sectionType, new Map())
    }
    this.registry.get(sectionType)!.set(variant, component)
  }

  get(sectionType: string, variant: string): React.ComponentType<any> | null {
    return this.registry.get(sectionType)?.get(variant) || null
  }

  getVariants(sectionType: string): string[] {
    const variants = this.registry.get(sectionType)
    return variants ? Array.from(variants.keys()) : []
  }

  has(sectionType: string, variant: string): boolean {
    return this.registry.get(sectionType)?.has(variant) || false
  }
}

export const registry = new VariantRegistry()
```

**Deliverables:**
- [ ] Template engine package
- [ ] Registry system working
- [ ] Example integration

---

### Week 2: Service Packages

#### Day 1-2: Supabase Clients

```bash
# Tasks
- [ ] Create @siso/supabase-client package
- [ ] Create @siso/supabase-partners package
- [ ] Generate TypeScript types
- [ ] Add query helpers
```

**Package Structure:**
```typescript
// packages/services/supabase-client/src/client.ts
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types/database.types'

export const createClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Server client for server components
export const createServerClient = () => {
  // Server-side client configuration
}

// Query helpers
export const queryHelpers = {
  async getMenuItems(supabase: ReturnType<typeof createClient>) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  }
}
```

**Deliverables:**
- [ ] 2 Supabase client packages
- [ ] Type generation working
- [ ] Query helpers documented

---

#### Day 3-4: Domain Models

```bash
# Tasks
- [ ] Create @siso/domain-restaurant package
- [ ] Create @siso/domain-tour package
- [ ] Create @siso/domain-booking package
- [ ] Add business logic
```

**Package Structure:**
```typescript
// packages/domain-models/restaurant/src/menu/types.ts
export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  is_available: boolean
  dietary_info?: string[]
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
  display_order: number
}

// packages/domain-models/restaurant/src/menu/service.ts
import type { SupabaseClient } from '@supabase/supabase-js'
import type { MenuItem, MenuCategory } from './types'

export class MenuService {
  constructor(private supabase: SupabaseClient) {}

  async getMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await this.supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)

    if (error) throw error
    return data as MenuItem[]
  }

  async getCategories(): Promise<MenuCategory[]> {
    const { data, error } = await this.supabase
      .from('menu_categories')
      .select('*')
      .order('display_order')

    if (error) throw error
    return data as MenuCategory[]
  }

  async groupByCategory(): Promise<Map<string, MenuItem[]>> {
    const items = await this.getMenuItems()
    const grouped = new Map<string, MenuItem[]>()

    items.forEach(item => {
      if (!grouped.has(item.category)) {
        grouped.set(item.category, [])
      }
      grouped.get(item.category)!.push(item)
    })

    return grouped
  }
}
```

**Deliverables:**
- [ ] 3 domain model packages
- [ ] Business logic extracted
- [ ] Tests written

---

#### Day 5: Configuration Packages

```bash
# Tasks
- [ ] Create @siso/eslint-config
- [ ] Create @siso/typescript-config
- [ ] Create @siso/tailwind-config
```

**ESLint Config:**
```javascript
// packages/config/eslint-config/index.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn'
  }
}
```

**TypeScript Config:**
```json
// packages/config/typescript-config/base.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Deliverables:**
- [ ] Config packages created
- [ ] Apps using shared configs
- [ ] Consistent setup across monorepo

---

## 📅 Phase 2: Client Apps Migration (Weeks 3-4)

### Week 3: First Client App (Lumelle)

#### Day 1: Copy & Setup
```bash
# Copy restaurant app
cp -r ../PERSONAL/CLIENT-WORK/client-projects/Restraunt apps/clients/restaurant-lumelle

# Update package.json
cd apps/clients/restaurant-lumelle
pnpm init
```

#### Day 2-3: Refactor to Domain Structure
```bash
# Tasks
- [ ] Create domains/ directory
- [ ] Move components to customer-facing/
- [ ] Move admin to client-facing/
- [ ] Extract shared utilities
- [ ] Update imports
```

#### Day 4-5: Integrate Shared Packages
```bash
# Tasks
- [ ] Replace UI components with @siso/ui-*
- [ ] Use @siso/supabase-client
- [ ] Use @siso/domain-restaurant
- [ ] Use @siso/templates
- [ ] Test thoroughly
```

**Deliverables:**
- [ ] Lumelle app in monorepo
- [ ] Domain structure implemented
- [ ] Shared packages integrated
- [ ] App builds successfully
- [ ] All features working

---

### Week 4: Additional Client Apps

#### Day 1-2: Tour Guides Template
```bash
# Tasks
- [ ] Copy tour-guides app
- [ ] Refactor to domain structure
- [ ] Create @siso/domain-tour package
- [ ] Integrate shared packages
```

#### Day 3-4: Other Client Apps
```bash
# Tasks
- [ ] Migrate bike rental template
- [ ] Migrate additional client projects
- [ ] Test all apps
```

#### Day 5: Deployment Setup
```bash
# Tasks
- [ ] Configure Vercel projects
- [ ] Set up environment variables
- [ ] Create deployment workflows
- [ ] Test deployments
```

**GitHub Actions Workflow:**
```yaml
# .github/workflows/deploy-client-app.yml
name: Deploy Client App

on:
  push:
    branches: [main]
    paths:
      - 'apps/clients/**'
      - 'packages/**'

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      apps: ${{ steps.filter.outputs.changes }}
    steps:
      - uses: actions/checkout@v3
      - uses: dorny/paths-filter@v2
        id: filter
        with:
          filters: |
            lumelle:
              - 'apps/clients/restaurant-lumelle/**'
            tour-guides:
              - 'apps/clients/tour-guides-**/**'

  deploy:
    needs: detect-changes
    if: ${{ needs.detect-changes.outputs.apps != '[]' }}
    runs-on: ubuntu-latest
    strategy:
      matrix:
        app: ${{ fromJSON(needs.detect-changes.outputs.apps) }}
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2

      - name: Install dependencies
        run: pnpm install

      - name: Build packages
        run: pnpm build --filter=@siso/*

      - name: Build app
        run: pnpm build --filter=${{ matrix.app }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets[format('VERCEL_PROJECT_ID_{0}', matrix.app)] }}
          working-directory: apps/clients/${{ matrix.app }}
```

**Deliverables:**
- [ ] All client apps migrated
- [ ] Deployment pipelines working
- [ ] Apps live in production

---

## 📅 Phase 3: Internal Apps Migration (Weeks 5-6)

### Week 5: Partnerships App

#### Day 1-2: Migration
```bash
# Tasks
- [ ] Copy SISO-PARTNERSHIPS to apps/internal/partnerships
- [ ] Refactor to domain structure
- [ ] Extract shared services
```

#### Day 3-4: Service Extraction
```bash
# Tasks
- [ ] Create @siso/service-ai-workflows
- [ ] Create @siso/service-auth
- [ ] Create @siso/service-payments
- [ ] Update partnerships to use packages
```

#### Day 5: Testing
```bash
# Tasks
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing
```

---

### Week 6: Admin Portal & Analytics

#### Day 1-3: Admin Portal
```bash
# Tasks
- [ ] Create apps/internal/admin-portal
- [ ] Build cross-client dashboard
- [ ] Integrate analytics
- [ ] Add user management
```

#### Day 4-5: Analytics Platform
```bash
# Tasks
- [ ] Create apps/internal/analytics
- [ ] Aggregate client data
- [ ] Build visualization dashboards
- [ ] Add export functionality
```

**Deliverables:**
- [ ] Partnerships app migrated
- [ ] Admin portal functional
- [ ] Analytics platform live
- [ ] All internal apps deployed

---

## 📅 Phase 4: Optimization (Weeks 7-8)

### Week 7: Performance & Code Quality

#### Day 1-2: Performance Optimization
```bash
# Tasks
- [ ] Bundle size analysis
- [ ] Code splitting optimization
- [ ] Image optimization
- [ ] Caching strategies
```

#### Day 3-4: Code Deduplication
```bash
# Tasks
- [ ] Identify duplicate code
- [ ] Extract to shared packages
- [ ] Refactor repetitive patterns
- [ ] Update all apps
```

#### Day 5: Testing
```bash
# Tasks
- [ ] Unit test coverage > 80%
- [ ] Integration tests
- [ ] E2E critical paths
- [ ] Performance benchmarks
```

---

### Week 8: Documentation & Handoff

#### Day 1-2: Developer Documentation
```bash
# Tasks
- [ ] Write package README files
- [ ] Create architecture guides
- [ ] Document domain patterns
- [ ] Write contribution guidelines
```

#### Day 3-4: Template Gallery
```bash
# Tasks
- [ ] Build template showcase
- [ ] Document all variants
- [ ] Create customization guide
- [ ] Add code examples
```

#### Day 5: Final Review
```bash
# Tasks
- [ ] Security audit
- [ ] Performance review
- [ ] Code review
- [ ] Production readiness check
```

**Deliverables:**
- [ ] Complete documentation
- [ ] Template gallery
- [ ] Team training completed
- [ ] Production ready

---

## 🔧 Tools & Scripts

### Monorepo Management

**Generate New App:**
```bash
# scripts/generate-app.sh
#!/bin/bash
APP_TYPE=$1  # clients | internal | templates
APP_NAME=$2

mkdir -p apps/$APP_TYPE/$APP_NAME
cd apps/$APP_TYPE/$APP_NAME

# Copy template structure
cp -r ../../templates/base-template/* .

# Update package.json
sed -i "s/template-name/$APP_NAME/g" package.json

echo "Created new app: apps/$APP_TYPE/$APP_NAME"
```

**Add Shared Package:**
```bash
# scripts/add-package.sh
#!/bin/bash
PACKAGE_CATEGORY=$1  # ui | domain-models | services | config
PACKAGE_NAME=$2

mkdir -p packages/$PACKAGE_CATEGORY/$PACKAGE_NAME/src
cd packages/$PACKAGE_CATEGORY/$PACKAGE_NAME

# Initialize package
pnpm init
echo "Created package: @siso/$PACKAGE_NAME"
```

---

## 📊 Success Metrics Tracking

### Week-by-Week Goals

| Week | Goal | Metric | Target |
|------|------|--------|--------|
| 1-2 | Foundation | Packages created | 10+ |
| 3-4 | Client Migration | Apps migrated | 5+ |
| 5-6 | Internal Migration | Apps migrated | 3+ |
| 7-8 | Optimization | Code reuse | 50%+ |

### Quality Gates

- ✅ **Build Success**: All apps build without errors
- ✅ **Test Coverage**: >80% for shared packages
- ✅ **Performance**: No regression in load times
- ✅ **Bundle Size**: <10% increase per app
- ✅ **Deployment**: All apps deploy successfully

---

## 🚨 Risk Mitigation

### Risk: Production Downtime
**Mitigation:**
- Deploy to staging first
- Blue-green deployment strategy
- Rollback plan ready
- Monitor closely

### Risk: Dependency Conflicts
**Mitigation:**
- Use exact versions in packages
- Regular dependency updates
- Automated testing
- Lock file committed

### Risk: Scope Creep
**Mitigation:**
- Stick to 8-week timeline
- MVP mindset
- Defer non-critical features
- Weekly reviews

---

## 📞 Support & Communication

### Daily Standups
- Share progress
- Identify blockers
- Coordinate work

### Weekly Reviews
- Demo completed work
- Adjust timeline if needed
- Update stakeholders

### Documentation
- Update docs daily
- Share learnings
- Record decisions

---

## ✅ Final Checklist

### Pre-Launch
- [ ] All apps building
- [ ] All tests passing
- [ ] Deployments working
- [ ] Documentation complete
- [ ] Team trained

### Launch
- [ ] Deploy to production
- [ ] Monitor metrics
- [ ] Gather feedback
- [ ] Make adjustments

### Post-Launch
- [ ] Archive old repos
- [ ] Update workflows
- [ ] Celebrate success! 🎉

---

*This implementation plan provides a clear roadmap for migrating to the SISO monorepo. Adjust timeline as needed based on team capacity and priorities.*
