# SISO Monorepo - Final Structure

## 🎯 Goal: Clean Single App Structure

Everything lives in `src/` - no need for the `apps/` folder since we're doing a single unified app.

---

## 📁 Final Directory Structure

```
SISO-MONOREPO/
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (client-base)/        # Client routes
│   │   ├── (partnerships)/       # Partnership routes
│   │   ├── api/                  # API routes
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   ├── domains/                  # Domain-based business logic
│   │   ├── client-base/          # Client-base domains
│   │   │   ├── landing/
│   │   │   ├── menu/
│   │   │   ├── booking/
│   │   │   └── ...
│   │   │
│   │   ├── partnerships/         # Partnership domains
│   │   │   ├── projects/
│   │   │   ├── billing/
│   │   │   └── ...
│   │   │
│   │   └── shared/               # Shared components/logic
│   │       ├── components/       # All shared components go here
│   │       ├── hooks/
│   │       ├── utils/
│   │       └── types/
│   │
│   ├── features/                 # Feature flags, experiments, etc.
│   │   ├── feature-flags/
│   │   └── experiments/
│   │
│   ├── lib/                      # Core utilities & services
│   │   ├── supabase/             # Supabase clients & helpers
│   │   ├── auth/                 # Auth utilities
│   │   ├── api/                  # API clients
│   │   └── utils/                # General utilities
│   │
│   ├── providers/                # React context providers
│   │   ├── ThemeProvider.tsx
│   │   ├── AuthProvider.tsx
│   │   └── QueryProvider.tsx
│   │
│   ├── config/                   # App configuration
│   │   ├── constants.ts
│   │   ├── routes.ts
│   │   └── env.ts
│   │
│   ├── types/                    # Global TypeScript types
│   │   ├── database.types.ts     # Supabase generated
│   │   └── global.d.ts
│   │
│   └── styles/                   # Global styles (if needed)
│       └── globals.css
│
├── public/                       # Static assets
│   ├── images/
│   ├── fonts/
│   └── favicon.ico
│
├── docs/                         # Documentation
├── scripts/                      # Build/dev scripts
│
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└── .env.example
```

---

## 🗂️ Folder Purpose

### `src/app/` - Next.js Routing
- Next.js App Router
- Route groups for client-base and partnerships
- Layouts and pages

### `src/domains/` - Business Logic (Main!)
- **Self-contained domains** with everything they need
- Each domain has: components, hooks, server, types, utils, pages
- `shared/` for truly shared components (replaces top-level `components/`)

### `src/features/` - Feature-Specific Code
- Feature flags
- A/B tests
- Experimental features
- Gradual rollouts

### `src/lib/` - Core Infrastructure
- Supabase clients
- Auth utilities
- API wrappers
- General utilities

### `src/providers/` - React Context
- Theme provider
- Auth provider
- Query client provider
- Any context providers

### `src/config/` - Configuration
- Constants
- Route definitions
- Environment config
- App settings

### `src/types/` - Global Types
- Database types (Supabase generated)
- Global type definitions
- Shared interfaces

---

## 🏗️ Domain Structure (Detailed)

Each domain is **self-contained**:

```
src/domains/client-base/menu/
├── components/               # Menu-specific components
│   ├── MenuItemCard.tsx
│   ├── MenuGrid.tsx
│   └── MenuFilters.tsx
│
├── sections/                 # Larger composed sections
│   ├── MenuHeader.tsx
│   └── MenuCategories.tsx
│
├── hooks/                    # Menu hooks
│   ├── useMenuItems.ts
│   └── useMenuCategories.ts
│
├── server/                   # Server actions & DB queries
│   ├── actions.ts
│   └── repository.ts
│
├── types/                    # Menu types
│   ├── menu.types.ts
│   └── index.ts
│
├── utils/                    # Menu utilities
│   ├── formatPrice.ts
│   └── filterMenu.ts
│
├── pages/                    # Page components
│   ├── MenuPage.tsx
│   └── AdminMenuPage.tsx
│
└── index.ts                  # Public API
```

---

## 🔄 No `components/` at Root Level

**Old way (separate components folder):**
```
src/
├── components/          # ❌ Don't do this
│   ├── Button.tsx
│   ├── Card.tsx
│   └── MenuItemCard.tsx
└── domains/
    └── menu/
```

**New way (components in domains):**
```
src/
└── domains/
    ├── menu/
    │   └── components/      # Menu-specific components
    │       └── MenuItemCard.tsx
    │
    └── shared/
        └── components/      # ✅ Truly shared components
            ├── Button.tsx
            └── Card.tsx
```

---

## 📦 What Goes Where?

### Domain-Specific Code → `domains/{group}/{domain}/`
```typescript
// Menu components
src/domains/client-base/menu/components/MenuItemCard.tsx

// Dashboard widgets
src/domains/client-base/dashboard/components/StatsWidget.tsx
```

### Shared Components → `domains/shared/components/`
```typescript
// Used across multiple domains
src/domains/shared/components/Button.tsx
src/domains/shared/components/Card.tsx
```

### Core Infrastructure → `lib/`
```typescript
// Supabase client
src/lib/supabase/client.ts

// Auth utilities
src/lib/auth/session.ts
```

### Global Config → `config/`
```typescript
// App constants
src/config/constants.ts

// Route definitions
src/config/routes.ts
```

### React Context → `providers/`
```typescript
// Theme provider
src/providers/ThemeProvider.tsx

// Auth provider
src/providers/AuthProvider.tsx
```

---

## 🚀 Clean Up Actions

### 1. Remove `apps/` folder
```bash
# It's just reference - can delete
rm -rf SISO-MONOREPO/apps/
```

### 2. Remove `packages/` folder (for now)
```bash
# Start simple, add only if needed
rm -rf SISO-MONOREPO/packages/
```

### 3. Finalize `src/` structure
```bash
cd SISO-MONOREPO/src

# Create missing folders
mkdir -p {features,lib,providers,config,types,styles}

# Within domains
mkdir -p domains/shared/{components,hooks,utils,types}
```

---

## 📋 Folder Checklist

```
✅ src/app/              # Next.js routing
✅ src/domains/          # Domain logic (main!)
   ✅ client-base/
   ✅ partnerships/
   ✅ shared/
      ✅ components/     # Shared components go here
✅ src/features/         # Feature flags, experiments
✅ src/lib/              # Core utilities
✅ src/providers/        # React context
✅ src/config/           # Configuration
✅ src/types/            # Global types
```

---

## 🎯 Example Imports

### From a Route
```typescript
// app/(client-base)/menu/page.tsx
import { MenuPage } from '@/domains/client-base/menu'
import { Button } from '@/domains/shared/components'
import { createClient } from '@/lib/supabase/client'
```

### From a Domain
```typescript
// domains/client-base/menu/components/MenuGrid.tsx
import { Card } from '@/domains/shared/components'
import { useMenuItems } from '../hooks/useMenuItems'
import { formatPrice } from '../utils/formatPrice'
```

### From Provider
```typescript
// providers/AuthProvider.tsx
import { createClient } from '@/lib/supabase/client'
import { AUTH_ROUTES } from '@/config/routes'
```

---

## 🔧 Updated Setup Script

We need to update the scaffolding script to match this structure:

```bash
src/
├── app/
├── domains/
│   ├── client-base/
│   ├── partnerships/
│   └── shared/
│       └── components/    # ← Shared components here
├── features/              # ← Add this
├── lib/                   # ← Add this
├── providers/             # ← Add this
├── config/                # ← Add this
├── types/                 # ← Add this
└── styles/                # ← Add this
```

---

## ✅ Benefits of This Structure

1. **Familiar** - Matches your existing app pattern
2. **Clear** - No confusion about where code goes
3. **Clean** - No separate `apps/` or `packages/` to maintain
4. **Simple** - Everything in `src/`, easy to find
5. **Scalable** - Add domains as needed

---

## 🚀 Next Steps

1. **Clean up** - Remove `apps/` and `packages/` folders
2. **Create structure** - Add missing folders (features, lib, providers, config, types)
3. **Verify** - Make sure `domains/shared/components/` exists for shared components
4. **Start building** - Add actual domains!

---

**Status:** Structure finalized based on your existing pattern
**Ready:** To create the clean scaffolding

---

*This matches your existing app structure - clean, simple, everything in `src/`*
