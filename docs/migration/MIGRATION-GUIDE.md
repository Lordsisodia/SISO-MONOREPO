# Migration Guide: apps/ → src/domains/

This guide shows how to migrate code from the reference apps into the new unified structure.

---

## 🎯 Migration Strategy

### Phase 1: Understand Reference Apps
1. Explore `apps/client/` structure
2. Explore `apps/partners/` structure
3. Identify domains/features
4. Map to new structure

### Phase 2: Migrate Domain by Domain
1. Start with one domain (e.g., landing page)
2. Create domain in `src/domains/`
3. Copy & adapt code
4. Test in new structure
5. Repeat for each domain

### Phase 3: Consolidate & Clean
1. Extract shared code to `src/domains/shared/`
2. Move utilities to `src/lib/`
3. Set up providers in `src/providers/`
4. Configure in `src/config/`

---

## 📋 Mapping Reference Apps to New Structure

### From apps/client/ (Client-Base)

```
apps/client/src/
├── components/
│   ├── landing/          → src/domains/client-base/landing/components/
│   ├── home/             → src/domains/client-base/home/components/
│   ├── crypto/           → src/domains/client-base/crypto/components/
│   └── ui/               → src/domains/shared/components/
│
├── models/               → src/domains/client-base/{domain}/types/
├── utils/                → src/lib/utils/ or src/domains/{domain}/utils/
├── integrations/
│   └── supabase/         → src/lib/supabase/
│
├── config/               → src/config/
└── styles/               → src/styles/
```

### From apps/partners/ (Partnerships)

```
apps/partners/src/
├── components/           → Analyze and split by domain
├── lib/                  → src/lib/
├── hooks/                → src/domains/partnerships/{domain}/hooks/
├── types/                → src/types/ or src/domains/partnerships/{domain}/types/
└── utils/                → src/lib/utils/
```

---

## 🔄 Step-by-Step Migration Example

### Example: Migrating Landing Page from apps/client/

#### Step 1: Identify the Domain

```bash
# In apps/client/src/components/landing/
# We have:
# - landing page components
# - hero sections
# - CTA components
```

#### Step 2: Create Domain in New Structure

```bash
./scripts/generate-domain.sh client-base landing
```

This creates:
```
src/domains/client-base/landing/
├── components/
├── sections/
├── hooks/
├── server/
├── types/
├── utils/
├── pages/
└── index.ts
```

#### Step 3: Copy Components

```bash
# Copy landing components
cp -r apps/client/src/components/landing/* \
      src/domains/client-base/landing/components/
```

#### Step 4: Adapt Imports

**Before (in apps/client/):**
```typescript
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/landing/hero'
```

**After (in src/domains/):**
```typescript
import { Button } from '@/domains/shared/components/Button'
import { Hero } from './components/Hero'
```

#### Step 5: Create Page Component

```typescript
// src/domains/client-base/landing/pages/LandingPage.tsx
import { Hero } from '../components/Hero'
import { Features } from '../sections/Features'

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <Features />
    </div>
  )
}
```

#### Step 6: Export from Domain

```typescript
// src/domains/client-base/landing/index.ts
export { default as LandingPage } from './pages/LandingPage'
export { Hero } from './components/Hero'
```

#### Step 7: Create Route

```typescript
// src/app/(client-base)/page.tsx
import { LandingPage } from '@/domains/client-base/landing'

export default function Page() {
  return <LandingPage />
}
```

#### Step 8: Test

```bash
pnpm dev
# Visit http://localhost:3000
```

---

## 🧩 Domain Identification Guide

### Client-Base Domains (from apps/client/)

Look for these patterns in `apps/client/src/components/`:

| Folder/Component | New Domain | Location |
|-----------------|------------|----------|
| landing/ | landing | src/domains/client-base/landing/ |
| home/ | home | src/domains/client-base/home/ |
| crypto/ | crypto | src/domains/client-base/crypto/ |
| blocks/ | Shared? | Analyze - maybe shared components |
| sidebar/ | Shared layout | src/domains/shared/components/ |
| ui/ | Shared primitives | src/domains/shared/components/ |

### Partnership Domains (from apps/partners/)

Analyze `apps/partners/src/` to identify:

| Feature Area | Domain | Location |
|--------------|--------|----------|
| Project management | projects | src/domains/partnerships/projects/ |
| Billing | billing | src/domains/partnerships/billing/ |
| Analytics | analytics | src/domains/partnerships/analytics/ |
| Partner dashboard | dashboard | src/domains/partnerships/dashboard/ |

---

## 📦 Migrating Shared Code

### 1. UI Components (Truly Shared)

**From apps/client/src/components/ui/**

```bash
# Copy shared UI components
cp apps/client/src/components/ui/button.tsx \
   src/domains/shared/components/Button.tsx

cp apps/client/src/components/ui/card.tsx \
   src/domains/shared/components/Card.tsx
```

**Update exports:**
```typescript
// src/domains/shared/components/index.ts
export { Button } from './Button'
export { Card } from './Card'
export { Input } from './Input'
```

### 2. Supabase Integration

**From apps/client/src/integrations/supabase/**

```bash
# Copy Supabase client
cp apps/client/src/integrations/supabase/client.ts \
   src/lib/supabase/client.ts

# Copy types
cp apps/client/src/integrations/supabase/types.ts \
   src/types/database.types.ts
```

### 3. Utilities

**From apps/client/src/utils/**

```bash
# Copy utilities
cp apps/client/src/utils/financial/* \
   src/lib/utils/financial/
```

### 4. Configuration

**From apps/client/src/config/**

```bash
# Copy config
cp apps/client/src/config/* \
   src/config/
```

---

## 🎯 Migration Checklist

### For Each Domain:

- [ ] Create domain: `./scripts/generate-domain.sh <group> <domain>`
- [ ] Copy components from apps/ to domain/components/
- [ ] Copy sections/layouts to domain/sections/
- [ ] Copy/create hooks in domain/hooks/
- [ ] Copy types to domain/types/
- [ ] Create page component in domain/pages/
- [ ] Export public API from domain/index.ts
- [ ] Create route in src/app/
- [ ] Update all imports
- [ ] Test the domain works

### Global Migration:

- [ ] Migrate shared UI to src/domains/shared/components/
- [ ] Migrate Supabase to src/lib/supabase/
- [ ] Migrate auth utils to src/lib/auth/
- [ ] Migrate general utils to src/lib/utils/
- [ ] Set up providers in src/providers/
- [ ] Copy config to src/config/
- [ ] Copy types to src/types/

---

## 🔍 Finding Code in Reference Apps

### Search for Components

```bash
# Find all components in client app
find apps/client/src/components -name "*.tsx" -o -name "*.ts"

# Find by pattern
grep -r "export.*function" apps/client/src/components/
```

### Identify Dependencies

```bash
# See what a component imports
grep "^import" apps/client/src/components/landing/hero.tsx

# Find all uses of a component
grep -r "import.*Hero" apps/client/src/
```

---

## 🚨 Common Migration Issues

### Issue 1: Import Paths Changed

**Problem:**
```typescript
// Old path doesn't work
import { Button } from '@/components/ui/button'
```

**Solution:**
```typescript
// Update to new structure
import { Button } from '@/domains/shared/components'
```

### Issue 2: Shared Dependencies

**Problem:** Multiple domains need the same utility

**Solution:** Move to shared or lib

```bash
# Move to shared if domain-specific
src/domains/shared/utils/formatters.ts

# Move to lib if truly generic
src/lib/utils/formatters.ts
```

### Issue 3: Server Actions

**Problem:** Server actions from apps/client/

**Solution:** Create in domain/server/

```typescript
// src/domains/client-base/menu/server/actions.ts
'use server'

export async function getMenuItems() {
  // ... server action
}
```

---

## 📊 Migration Progress Tracking

Create a tracking file:

```markdown
# Migration Progress

## Client-Base Domains
- [x] Landing - ✅ Complete
- [ ] Menu - 🚧 In Progress
- [ ] Booking - 📝 Not Started

## Partnerships Domains
- [ ] Projects - 📝 Not Started
- [ ] Billing - 📝 Not Started

## Shared Code
- [x] UI Components - ✅ Complete
- [x] Supabase Client - ✅ Complete
- [ ] Auth Utils - 🚧 In Progress
```

---

## 🎉 Migration Complete Checklist

- [ ] All domains migrated
- [ ] All shared code extracted
- [ ] All imports updated
- [ ] All routes working
- [ ] Build succeeds: `pnpm build`
- [ ] Types check: `pnpm typecheck`
- [ ] Lint passes: `pnpm lint`
- [ ] All pages accessible
- [ ] No errors in console
- [ ] Performance is good

### Final Step: Archive Reference Apps

Once confident everything works:

```bash
# Rename apps/ to archive
mv apps apps-archive

# Or move outside monorepo
mv apps ../SISO-APPS-ARCHIVE
```

---

**Ready to start migrating!** Begin with one small domain and iterate.
