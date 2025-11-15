# SISO Monorepo Architecture - Executive Summary

## 🎯 Vision

Transform SISO ecosystem into a **domain-organized monorepo** where:
- Everything needed for a feature lives in its domain folder
- Code is self-contained and easy to find
- Minimal sharing between apps (only truly generic code)
- Clear separation between customer-facing and client-facing features

---

## 📊 Structure at a Glance

```
SISO-MONOREPO/
├── apps/
│   ├── client-base/              # Client projects (restaurants, tours, etc.)
│   └── partnerships/             # Partner management platform
│
├── packages/                     # Only truly shared code
│   ├── shared-database/          # Supabase clients
│   ├── shared-ui/                # UI primitives
│   └── shared-config/            # Shared configs
│
└── docs/
    ├── architecture/
    │   ├── SIMPLIFIED-ARCHITECTURE.md      # Full architecture guide
    │   └── SIMPLIFIED-DIAGRAMS.md          # Visual diagrams
    └── migration/
        └── implementation-plan.md          # Migration roadmap
```

---

## 🏗️ Domain-Based Organization

### Inside Each App (e.g., client-base):

```
src/domains/
├── customer-facing/        # Public features (B2C)
│   ├── landing/           # Everything for landing page
│   ├── menu/              # Everything for menu
│   ├── booking/           # Everything for booking
│   └── ...
│
├── client-facing/          # Business owner features (B2B)
│   ├── dashboard/         # Everything for dashboard
│   ├── analytics/         # Everything for analytics
│   ├── inventory/         # Everything for inventory
│   └── ...
│
└── shared/                 # Cross-domain utilities
    ├── components/         # Truly shared components
    ├── hooks/              # Shared hooks
    └── utils/              # Shared utilities
```

### Inside Each Domain (e.g., menu/):

```
menu/
├── components/            # Menu-specific components
├── sections/              # Larger composed sections
├── hooks/                 # Menu data hooks
├── server/                # Server actions & queries
├── types/                 # Menu types
├── utils/                 # Menu utilities
├── pages/                 # Page components
└── index.ts               # Public API
```

**Key Principle:** Everything for a feature in one place!

---

## 💡 Core Benefits

### 1. Easy to Find Code
- Need menu code? → Look in `menu/` domain
- Need dashboard? → Look in `dashboard/` domain
- No more searching across scattered folders

### 2. Self-Contained Domains
- Each domain has: components, hooks, types, server logic
- Change a feature? Only touch that domain folder
- Minimal dependencies between domains

### 3. Clear Organization
- **customer-facing/** = Public features (B2C)
- **client-facing/** = Business admin (B2B)
- **shared/** = Cross-cutting utilities

### 4. Minimal Sharing
- Only truly generic code in `packages/`
- Most code stays in domains
- Clear boundaries

---

## 📦 Shared Packages (Minimal)

### What Goes in Shared Packages?

✅ **YES - Put in package when:**
- Used by BOTH apps (client-base AND partnerships)
- Generic utility (not business-specific)
- Database connection logic
- UI primitives (Button, Input, Card)

❌ **NO - Keep in domain when:**
- Only used in one app
- Business-specific logic
- Domain-specific component

### Three Shared Packages:

1. **shared-database** - Supabase clients, types, query helpers
2. **shared-ui** - UI primitives (Button, Card, Input)
3. **shared-config** - TypeScript, ESLint, Tailwind configs

---

## 🔄 Migration Strategy

### Phase 1: Foundation (Week 1)
- Set up monorepo structure
- Configure pnpm workspaces
- Set up Turbo for builds

### Phase 2: Reorganize Client-Base (Week 2)
- Copy existing code
- Create domain folders
- Move features into domains
- Update imports

### Phase 3: Reorganize Partnerships (Week 3)
- Copy partnerships code
- Create domain folders
- Move features into domains

### Phase 4: Extract Shared (Week 4)
- Identify truly shared code
- Create shared packages
- Update both apps to use packages

---

## 🎯 Example: Menu Domain

**Before (Scattered):**
```
src/
  components/
    MenuItemCard.tsx
    MenuGrid.tsx
  hooks/
    useMenuItems.ts
  lib/
    menuUtils.ts
  types/
    menu.ts
  app/
    menu/
      page.tsx
```

**After (Domain-Organized):**
```
src/domains/customer-facing/menu/
  components/
    MenuItemCard.tsx
    MenuGrid.tsx
  hooks/
    useMenuItems.ts
  server/
    repository.ts
  types/
    menu.types.ts
  utils/
    menuUtils.ts
  pages/
    MenuPage.tsx
  index.ts
```

**Benefits:**
- ✅ Everything in one place
- ✅ Easy to find
- ✅ Self-contained
- ✅ Clear imports

---

## 📈 Expected Outcomes

After migration:

### Code Organization
✅ All related code grouped together
✅ Clear domain boundaries
✅ Minimal cross-domain dependencies

### Developer Experience
✅ Easy to find code
✅ Clear where new code goes
✅ Faster onboarding

### Maintenance
✅ Change menu? Only touch menu domain
✅ Add feature? Create new domain
✅ Minimal side effects

---

## 🚀 Quick Start

### For Developers:

```bash
# 1. Install dependencies
pnpm install

# 2. Run client-base in dev mode
pnpm dev --filter client-base

# 3. Run partnerships in dev mode
pnpm dev --filter partnerships

# 4. Build everything
pnpm build
```

### Adding a New Feature:

```bash
# 1. Create domain folder
mkdir -p apps/client-base/src/domains/customer-facing/my-feature

# 2. Create domain structure
cd apps/client-base/src/domains/customer-facing/my-feature
mkdir -p {components,hooks,server,types,utils,pages}

# 3. Start building!
# Everything for this feature goes in this folder
```

---

## 📚 Documentation

### Read These Next:

1. **[SIMPLIFIED-ARCHITECTURE.md](./docs/architecture/SIMPLIFIED-ARCHITECTURE.md)**
   - Full architecture details
   - Decision rules
   - Code examples

2. **[SIMPLIFIED-DIAGRAMS.md](./docs/architecture/SIMPLIFIED-DIAGRAMS.md)**
   - Visual diagrams
   - Data flow examples
   - Migration visualization

3. **[implementation-plan.md](./docs/migration/implementation-plan.md)**
   - Week-by-week migration plan
   - Detailed tasks
   - Code examples

---

## 🎨 Architecture Principles

### 1. Domain-First Thinking
Think "where does this feature belong" not "is this a component or hook"

### 2. Self-Containment
Each domain should have everything it needs

### 3. Minimal Coupling
Domains should be loosely coupled

### 4. Clear Boundaries
Customer-facing vs Client-facing vs Shared

### 5. Progressive Enhancement
Start simple, add complexity only when needed

---

## 🔧 Key Technologies

- **Package Manager**: pnpm (workspaces)
- **Build Tool**: Turbo (caching, parallel builds)
- **Framework**: Next.js (per app)
- **Database**: Supabase (client + partners)
- **Deployment**: Vercel (independent deploys)

---

## ✅ Success Criteria

Migration is successful when:

- [x] All code organized by domain
- [x] Both apps building and deploying
- [x] Minimal shared packages (only truly shared)
- [x] Clear domain boundaries
- [x] Easy for team to navigate code
- [x] Documentation complete

---

## 📞 Questions?

Refer to detailed docs:
- Architecture details → `docs/architecture/SIMPLIFIED-ARCHITECTURE.md`
- Visual diagrams → `docs/architecture/SIMPLIFIED-DIAGRAMS.md`
- Migration plan → `docs/migration/implementation-plan.md`

---

**Status:** ✅ Architecture Design Complete
**Next Step:** Review and start Phase 1 (Foundation)

---

*This architecture is designed to make SISO code more organized, maintainable, and scalable while keeping complexity minimal.*
