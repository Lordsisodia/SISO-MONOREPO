# SISO Monorepo - Empty Scaffolding Plan

## 🎯 Goal: Single App with Domain Groups

Create a single Next.js app where client-base and partnerships are just different domain groups, not separate apps.

---

## 📁 Empty Scaffolding Structure

```
SISO-MONOREPO/
│
├── src/                          # Main application source
│   │
│   ├── app/                      # Next.js App Router
│   │   ├── (client-base)/        # Route group for client features
│   │   ├── (partnerships)/       # Route group for partnership features
│   │   ├── api/                  # API routes
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   │
│   ├── domains/                  # Domain-based business logic
│   │   ├── client-base/          # All client-base domains
│   │   ├── partnerships/         # All partnership domains
│   │   └── shared/               # Shared across both
│   │
│   ├── components/               # Shared UI components (if needed)
│   ├── lib/                      # Shared utilities
│   ├── config/                   # App configuration
│   └── middleware.ts             # Next.js middleware
│
├── packages/                     # Internal packages (optional)
│   ├── database/                 # Supabase clients & types
│   ├── ui/                       # Shared UI primitives
│   └── config/                   # Shared configs
│
├── public/                       # Static assets
│   ├── client-base/              # Client-base specific assets
│   ├── partnerships/             # Partnership specific assets
│   └── shared/                   # Shared assets
│
├── .github/                      # GitHub workflows
│   └── workflows/
│       └── deploy.yml
│
├── docs/                         # Documentation
│   ├── architecture/
│   └── guides/
│
├── scripts/                      # Build/dev scripts
│   ├── generate-domain.sh
│   └── setup.sh
│
├── package.json                  # Single package.json
├── pnpm-workspace.yaml           # Workspace config (if using packages/)
├── turbo.json                    # Turbo config
├── next.config.js                # Next.js config
├── tsconfig.json                 # TypeScript config
├── tailwind.config.ts            # Tailwind config
├── .eslintrc.js                  # ESLint config
├── .env.example                  # Environment variables template
└── README.md                     # Project readme
```

---

## 🗂️ Key Structural Decisions

### 1. **App Router Organization**

```
src/app/
├── (client-base)/           # Route group (doesn't affect URL)
│   ├── layout.tsx          # Client-base specific layout
│   └── [routes...]         # Client-base routes
│
├── (partnerships)/          # Route group
│   ├── layout.tsx          # Partnerships specific layout
│   └── [routes...]         # Partnership routes
│
└── api/                     # Shared API routes
```

**Why Route Groups?**
- Different layouts for client-base vs partnerships
- Organize routes by context
- Share the same URL structure

### 2. **Domain Organization**

```
src/domains/
├── client-base/             # Client-base domain group
│   ├── [domain-name]/
│   └── shared/
│
├── partnerships/            # Partnerships domain group
│   ├── [domain-name]/
│   └── shared/
│
└── shared/                  # Shared between both groups
    ├── components/
    ├── hooks/
    └── utils/
```

### 3. **Packages (Optional)**

```
packages/
├── database/                # If you want to extract DB logic
│   ├── package.json
│   └── src/
│
├── ui/                      # If you want shared UI package
│   ├── package.json
│   └── src/
│
└── config/                  # Shared configs
    ├── eslint-config/
    ├── typescript-config/
    └── tailwind-config/
```

**Decision:** Start without packages, add only if needed

---

## 📦 Configuration Files

### Root package.json

```json
{
  "name": "siso-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "latest",
    "react": "^18",
    "react-dom": "^18"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "typescript": "latest",
    "tailwindcss": "latest",
    "eslint": "latest",
    "prettier": "latest"
  }
}
```

### pnpm-workspace.yaml (if using packages/)

```yaml
packages:
  - 'packages/*'
```

### turbo.json (optional, for caching)

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'SISO',
  },

  // Redirects, rewrites as needed
}

module.exports = nextConfig
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "ESNext",
    "moduleResolution": "bundler",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,

    "allowJs": true,
    "incremental": true,
    "resolveJsonModule": true,
    "isolatedModules": true,

    "paths": {
      "@/*": ["./src/*"],
      "@/domains/*": ["./src/domains/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"]
    },

    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

---

## 🚀 Setup Steps (Empty Scaffolding)

### Step 1: Create Directory Structure

```bash
cd SISO-MONOREPO

# Main app directories
mkdir -p src/{app,domains,components,lib,config}
mkdir -p src/app/{api,\(client-base\),\(partnerships\)}
mkdir -p src/domains/{client-base,partnerships,shared}

# Optional packages
mkdir -p packages/{database,ui,config}

# Public assets
mkdir -p public/{client-base,partnerships,shared}

# Docs
mkdir -p docs/{architecture,guides}

# Scripts
mkdir -p scripts

# GitHub workflows
mkdir -p .github/workflows
```

### Step 2: Initialize Package

```bash
# Initialize if not already
pnpm init

# Or create package.json manually
```

### Step 3: Install Core Dependencies

```bash
# Next.js and React
pnpm add next react react-dom

# TypeScript
pnpm add -D typescript @types/node @types/react @types/react-dom

# Tailwind
pnpm add -D tailwindcss postcss autoprefixer
pnpm dlx tailwindcss init -p

# ESLint & Prettier
pnpm add -D eslint eslint-config-next prettier

# Optional: Turbo for caching
pnpm add -D turbo
```

### Step 4: Create Config Files

```bash
# TypeScript
touch tsconfig.json

# Next.js
touch next.config.js

# Tailwind
touch tailwind.config.ts

# ESLint
touch .eslintrc.js

# Environment
touch .env.example .env.local

# Git
touch .gitignore
```

### Step 5: Create Root Files

```bash
# App entry points
touch src/app/layout.tsx
touch src/app/page.tsx

# Middleware (if needed)
touch src/middleware.ts

# README
touch README.md
```

---

## 📋 Minimal File Contents

### src/app/layout.tsx (Root Layout)

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SISO",
  description: "SISO Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### src/app/page.tsx (Home Page)

```tsx
export default function Home() {
  return (
    <main>
      <h1>SISO Monorepo</h1>
      <p>Welcome to the unified platform</p>
    </main>
  );
}
```

### src/app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### .gitignore

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js
.next/
out/
build/

# Environment
.env*.local
.env

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
*.pem

# IDE
.vscode/
.idea/

# Testing
coverage/

# Turbo
.turbo/
```

---

## 🎯 What This Gives You

### Immediate Benefits:
- ✅ Empty, organized structure ready for domains
- ✅ Single Next.js app
- ✅ TypeScript configured
- ✅ Tailwind ready
- ✅ ESLint set up
- ✅ Clear separation points (client-base vs partnerships)

### Ready for:
- Adding domains under `src/domains/client-base/`
- Adding domains under `src/domains/partnerships/`
- Creating routes in `src/app/(client-base)/`
- Creating routes in `src/app/(partnerships)/`

---

## 🔄 Next Steps After Scaffolding

1. ✅ Create the empty structure
2. ✅ Install dependencies
3. ✅ Verify it builds: `pnpm dev`
4. 📝 **Then** start adding actual domains
5. 📝 **Then** create routes

---

## 💡 Key Decisions Made

| Decision | Choice | Reasoning |
|----------|--------|-----------|
| App Structure | Single Next.js app | You want single deployment |
| Route Organization | Route groups `(client-base)` | Separate layouts, same URLs |
| Domain Location | `src/domains/` | Clear business logic separation |
| Packages | Optional, start without | Add only if truly needed |
| Build Tool | Next.js + optional Turbo | Simple, can add caching later |

---

## 🚀 Quick Start Commands

```bash
# After creating scaffolding:
pnpm install
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm lint         # Run linting
pnpm typecheck    # Type checking
```

---

**Status:** Ready to create empty scaffolding
**Next:** Execute setup steps to create folder structure

---

*This scaffolding gives you a clean foundation without committing to specific domains yet.*
