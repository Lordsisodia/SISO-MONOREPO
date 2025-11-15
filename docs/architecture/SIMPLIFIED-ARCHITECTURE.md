# SISO Monorepo - Simplified Domain Architecture
**Version:** 2.0.0 (Revised)
**Date:** 2025-11-01

## 🎯 Core Principle: Domain-Based Organization

Keep everything needed for a domain **inside its folder** - components, hooks, types, server actions, everything.

---

## 📊 Simplified Monorepo Structure

```
SISO-MONOREPO/
├── apps/
│   ├── client-base/              # Client projects (customer-facing apps)
│   │   ├── src/
│   │   │   └── domains/
│   │   │       ├── customer-facing/
│   │   │       ├── client-facing/
│   │   │       └── shared/
│   │   ├── package.json
│   │   └── next.config.js
│   │
│   └── partnerships/             # Partner management platform
│       ├── src/
│       │   └── domains/
│       │       ├── partner-facing/
│       │       ├── internal-admin/
│       │       └── shared/
│       ├── package.json
│       └── next.config.js
│
├── packages/                     # Shared code between apps
│   ├── shared-database/          # Supabase clients & types
│   ├── shared-ui/                # Common UI components
│   └── shared-config/            # Shared configs (TS, ESLint, etc.)
│
└── docs/
    ├── architecture/
    └── migration/
```

**Key Points:**
- ✅ Two apps: `client-base` and `partnerships`
- ✅ Domain-based organization within each app
- ✅ Minimal shared packages (only truly shared code)
- ✅ Each domain is self-contained
- ❌ No template system
- ❌ No complex variant registry
- ❌ No internal app division

---

## 🏗️ Domain Structure Pattern

### Client-Base App

```
apps/client-base/src/domains/

customer-facing/              # Public-facing features (B2C)
├── landing/
│   ├── components/           # Landing-specific components
│   ├── sections/             # Landing sections (Hero, Features, etc.)
│   ├── hooks/                # Landing-specific hooks
│   ├── server/               # Server actions for landing
│   ├── types/                # Landing types
│   ├── utils/                # Landing utilities
│   ├── pages/                # Page components
│   └── index.ts              # Public API
│
├── menu/
│   ├── components/           # Menu UI components
│   ├── sections/             # Menu sections
│   ├── hooks/                # useMenuItems, useCategories
│   ├── server/               # Menu server actions
│   │   ├── actions.ts
│   │   └── repository.ts
│   ├── types/                # MenuItem, MenuCategory types
│   ├── utils/                # Menu utilities
│   ├── pages/
│   │   └── MenuPage.tsx
│   └── index.ts
│
├── booking/
│   ├── components/
│   ├── hooks/
│   ├── server/
│   ├── types/
│   ├── utils/
│   ├── pages/
│   └── index.ts
│
├── blog/
├── reviews/
└── loyalty/

client-facing/                # Business owner features (B2B)
├── dashboard/
│   ├── components/           # Dashboard widgets, charts
│   ├── sections/             # Dashboard sections
│   ├── hooks/                # Dashboard data hooks
│   ├── server/               # Dashboard server actions
│   ├── types/                # Dashboard types
│   ├── utils/                # Dashboard utilities
│   ├── pages/
│   │   └── DashboardPage.tsx
│   └── index.ts
│
├── analytics/
│   ├── components/
│   ├── hooks/
│   ├── server/
│   ├── types/
│   ├── pages/
│   └── index.ts
│
├── inventory/
├── marketing/
├── finance/
├── staff/
└── settings/

shared/                       # Cross-domain utilities
├── components/               # Truly shared components (Button, Card, etc.)
├── hooks/                    # Shared hooks (useAuth, useToast)
├── server/                   # Shared server utilities
├── types/                    # Shared types
└── utils/                    # Shared utilities
```

### Partnerships App

```
apps/partnerships/src/domains/

partner-facing/               # Features for partners
├── projects/
│   ├── components/
│   ├── hooks/
│   ├── server/
│   ├── types/
│   ├── pages/
│   └── index.ts
│
├── billing/
├── analytics/
└── support/

internal-admin/               # Internal management features
├── partner-management/
│   ├── components/
│   ├── hooks/
│   ├── server/
│   ├── types/
│   ├── pages/
│   └── index.ts
│
├── platform-analytics/
├── system-settings/
└── user-management/

shared/                       # Cross-domain utilities
├── components/
├── hooks/
├── server/
├── types/
└── utils/
```

---

## 💡 Domain Self-Containment Principle

### Everything Lives in the Domain Folder

```
menu/
├── components/               # All menu components
│   ├── MenuItemCard.tsx
│   ├── MenuCategoryFilter.tsx
│   └── MenuSearch.tsx
│
├── sections/                 # Larger composed sections
│   ├── MenuHeader.tsx
│   ├── MenuGrid.tsx
│   └── MenuFilters.tsx
│
├── hooks/                    # All menu-related hooks
│   ├── useMenuItems.ts
│   ├── useMenuCategories.ts
│   └── useMenuFilters.ts
│
├── server/                   # All server-side logic
│   ├── actions.ts            # Server actions
│   ├── repository.ts         # Database queries
│   └── utils.ts              # Server utilities
│
├── types/                    # All menu types
│   ├── menu.types.ts
│   └── index.ts
│
├── utils/                    # Menu utilities
│   ├── formatPrice.ts
│   ├── filterMenu.ts
│   └── searchMenu.ts
│
├── pages/                    # Page components
│   ├── MenuPage.tsx          # Customer view
│   └── AdminMenuPage.tsx     # Admin view
│
└── index.ts                  # Public API - only export what's needed
```

### Example: Menu Domain Index

```typescript
// apps/client-base/src/domains/customer-facing/menu/index.ts

// PAGES
export { default as MenuPage } from './pages/MenuPage'
// Note: AdminMenuPage not exported (server actions)

// COMPONENTS (only if needed by other domains)
export { MenuItemCard } from './components/MenuItemCard'

// HOOKS
export {
  useMenuItems,
  useMenuCategories,
  useMenuFilters
} from './hooks'

// TYPES
export type {
  MenuItem,
  MenuCategory,
  MenuFilters
} from './types'

// UTILS (only if needed by other domains)
export {
  formatPrice,
  filterMenuItems,
  searchMenuItems
} from './utils'
```

---

## 📦 Minimal Shared Packages

### 1. shared-database

```
packages/shared-database/
├── client/
│   ├── supabase-client.ts        # Client DB connection
│   └── supabase-partners.ts      # Partners DB connection
│
├── types/
│   ├── client-database.types.ts  # Generated from Supabase
│   └── partners-database.types.ts
│
└── utils/
    ├── query-helpers.ts
    └── error-handling.ts
```

**Usage:**
```typescript
// In any app
import { createClient } from '@siso/shared-database/client'
import type { MenuItem } from '@siso/shared-database/types'

const supabase = createClient()
```

### 2. shared-ui

```
packages/shared-ui/
├── primitives/                   # Only truly reusable primitives
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   └── Modal.tsx
│
├── hooks/                        # Universal hooks
│   ├── useMediaQuery.ts
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
└── utils/
    ├── cn.ts                     # className utility
    └── format.ts
```

**Usage:**
```typescript
import { Button, Card } from '@siso/shared-ui/primitives'
import { useDebounce } from '@siso/shared-ui/hooks'
```

### 3. shared-config

```
packages/shared-config/
├── eslint/
│   └── index.js
├── typescript/
│   ├── base.json
│   └── nextjs.json
└── tailwind/
    └── preset.js
```

**Usage:**
```json
// apps/client-base/tsconfig.json
{
  "extends": "@siso/shared-config/typescript/nextjs.json"
}
```

---

## 🔄 Data Flow Example (Menu Domain)

### 1. User Visits Menu Page

```typescript
// apps/client-base/src/app/(customer)/menu/page.tsx
import { MenuPage } from '@/domains/customer-facing/menu'

export default function Page() {
  return <MenuPage />
}
```

### 2. MenuPage Component

```typescript
// apps/client-base/src/domains/customer-facing/menu/pages/MenuPage.tsx
import { useMenuItems, useMenuCategories } from '../hooks'
import { MenuHeader } from '../sections/MenuHeader'
import { MenuGrid } from '../sections/MenuGrid'
import { MenuFilters } from '../sections/MenuFilters'

export default function MenuPage() {
  const { items, isLoading } = useMenuItems()
  const { categories } = useMenuCategories()

  return (
    <div>
      <MenuHeader />
      <MenuFilters categories={categories} />
      <MenuGrid items={items} isLoading={isLoading} />
    </div>
  )
}
```

### 3. Menu Hook

```typescript
// apps/client-base/src/domains/customer-facing/menu/hooks/useMenuItems.ts
import { useQuery } from '@tanstack/react-query'
import { getMenuItems } from '../server/repository'

export function useMenuItems() {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: () => getMenuItems()
  })
}
```

### 4. Server Repository

```typescript
// apps/client-base/src/domains/customer-facing/menu/server/repository.ts
import { createClient } from '@siso/shared-database/client'
import type { MenuItem } from '../types'

export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)
    .order('category, name')

  if (error) throw error
  return data as MenuItem[]
}

export async function createMenuItem(item: MenuItem): Promise<void> {
  // Server action logic
}
```

**Flow:**
1. Page component → Domain's page component
2. Page component → Domain's hooks
3. Hooks → Domain's server functions
4. Server functions → Shared database package
5. Server functions → Domain's types

---

## 🚀 Migration Strategy (Simplified)

### Phase 1: Setup Foundation (Week 1)

```bash
# 1. Create monorepo structure
SISO-MONOREPO/
  apps/
    client-base/
    partnerships/
  packages/
    shared-database/
    shared-ui/
    shared-config/

# 2. Set up pnpm workspaces
cat > pnpm-workspace.yaml << EOF
packages:
  - 'apps/*'
  - 'packages/*'
EOF

# 3. Create root package.json
pnpm init

# 4. Install Turbo
pnpm add -Dw turbo
```

### Phase 2: Migrate Client-Base (Week 2)

```bash
# 1. Copy existing code
cp -r ../SISO-CLIENT-BASE apps/client-base

# 2. Reorganize into domains
mkdir -p apps/client-base/src/domains/{customer-facing,client-facing,shared}

# 3. Move features to domains
# - Move landing → customer-facing/landing/
# - Move menu → customer-facing/menu/
# - Move dashboard → client-facing/dashboard/
# etc.

# 4. Update imports
# Change:  import { MenuItemCard } from '@/components/MenuItemCard'
# To:      import { MenuItemCard } from '@/domains/customer-facing/menu'
```

### Phase 3: Migrate Partnerships (Week 3)

```bash
# 1. Copy partnerships app
cp -r ../SISO-PARTNERSHIPS apps/partnerships

# 2. Reorganize into domains
mkdir -p apps/partnerships/src/domains/{partner-facing,internal-admin,shared}

# 3. Extract shared code
# Move truly shared code to packages/shared-*

# 4. Update imports
```

### Phase 4: Extract Shared Packages (Week 4)

```bash
# 1. Identify truly shared code
# - Database clients → shared-database
# - UI primitives → shared-ui
# - Configs → shared-config

# 2. Create packages
mkdir -p packages/{shared-database,shared-ui,shared-config}

# 3. Move code
# 4. Update both apps to use packages
```

---

## ✅ Decision Rules

### When to Create a New Domain?

✅ **YES, create new domain when:**
- Feature has distinct business logic
- Feature needs its own types/hooks/components
- Feature is a major user-facing area

❌ **NO, keep in existing domain when:**
- Just a small component
- Part of existing feature
- Simple utility function

### When to Put Code in Shared Package?

✅ **YES, move to package when:**
- Used by BOTH apps (client-base AND partnerships)
- Generic utility (not business-specific)
- Database connection logic

❌ **NO, keep in domain when:**
- Only used in one app
- Business-specific logic
- Domain-specific component

### When to Export from Domain?

✅ **YES, export when:**
- Another domain needs it
- App routing needs it (pages)
- It's part of public API

❌ **NO, keep internal when:**
- Only used within domain
- Implementation detail
- Internal utility

---

## 📊 Expected Results

After migration:

```
Code Organization:
✅ All menu-related code in menu/ domain
✅ All dashboard code in dashboard/ domain
✅ Minimal shared packages (only truly shared)
✅ Clear boundaries between domains

File Reduction:
✅ ~30% fewer files (consolidation)
✅ Clearer file organization
✅ Easier to find code

Maintenance:
✅ Change menu? Only touch menu/ domain
✅ Add feature? Create new domain
✅ Share code? Minimal shared packages
```

---

## 🎯 Next Steps

1. **Review this architecture** - Make sure it fits your needs
2. **Start with one domain** - Migrate menu domain first as proof-of-concept
3. **Validate approach** - Make sure it works before migrating everything
4. **Iterate** - Adjust based on learnings
5. **Complete migration** - Move all code to new structure

---

*This simplified architecture focuses on domain-based organization without complex templating, tailored specifically for SISO's two-app structure.*
