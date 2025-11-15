#!/bin/bash

# SISO Monorepo - Final Scaffolding Setup
# Keeps apps/ as reference, builds new unified structure in src/

set -e  # Exit on error

echo "🚀 Setting up SISO Monorepo - Final Structure..."
echo ""
echo "📋 Strategy:"
echo "  ✅ Keep apps/ as reference (don't touch)"
echo "  ✅ Build new structure in src/"
echo "  ✅ Migrate incrementally from apps/ → src/domains/"
echo ""

# =============================================================================
# STEP 1: Create Unified App Structure
# =============================================================================
echo "📁 Creating unified app structure in src/..."

# Next.js App Router
mkdir -p src/app/{api,\(client-base\),\(partnerships\)}

# Domain structure
mkdir -p src/domains/{client-base,partnerships,shared}
mkdir -p src/domains/shared/{components,hooks,utils,types,server}

# Additional folders (your existing pattern)
mkdir -p src/{features,lib,providers,config,types,styles}

# Lib subdirectories
mkdir -p src/lib/{supabase,auth,api,utils}

# Public assets
mkdir -p public/{images,fonts}

# Docs (if not exists)
mkdir -p docs/{architecture,guides,migration}

# Scripts
mkdir -p scripts

# GitHub workflows
mkdir -p .github/workflows

echo "✅ Directory structure created"
echo ""

# =============================================================================
# STEP 2: Create Root Package.json (Unified App)
# =============================================================================
echo "⚙️  Creating root package.json for unified app..."

cat > package.json << 'EOF'
{
  "name": "siso-monorepo",
  "version": "1.0.0",
  "private": true,
  "description": "Unified SISO platform - client-base & partnerships",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,md}\"",
    "test": "vitest",
    "test:ui": "vitest --ui"
  },
  "dependencies": {
    "next": "^15.1.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@tanstack/react-query": "^5.62.11",
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.47.15",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@types/node": "^22.10.5",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "typescript": "^5.7.2",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.18.0",
    "eslint-config-next": "^15.1.4",
    "prettier": "^3.4.2",
    "vitest": "^2.1.8"
  }
}
EOF

echo "✅ Root package.json created"
echo ""

# =============================================================================
# STEP 3: TypeScript Configuration
# =============================================================================
echo "⚙️  Creating TypeScript configuration..."

cat > tsconfig.json << 'EOF'
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
      "@/app/*": ["./src/app/*"],
      "@/domains/*": ["./src/domains/*"],
      "@/features/*": ["./src/features/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/providers/*": ["./src/providers/*"],
      "@/config/*": ["./src/config/*"],
      "@/types/*": ["./src/types/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "apps"]
}
EOF

echo "✅ TypeScript config created"
echo ""

# =============================================================================
# STEP 4: Next.js Configuration
# =============================================================================
echo "⚙️  Creating Next.js configuration..."

cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_APP_NAME: 'SISO',
  },

  // Ignore apps/ folder (reference only)
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/apps/**', '**/node_modules/**'],
    }
    return config
  },
}

module.exports = nextConfig
EOF

echo "✅ Next.js config created"
echo ""

# =============================================================================
# STEP 5: Tailwind Configuration
# =============================================================================
echo "⚙️  Creating Tailwind configuration..."

cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your brand colors here
      },
    },
  },
  plugins: [],
};

export default config;
EOF

cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

echo "✅ Tailwind config created"
echo ""

# =============================================================================
# STEP 6: ESLint & Prettier
# =============================================================================
echo "⚙️  Creating linting configuration..."

cat > .eslintrc.js << 'EOF'
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignorePatterns: ['apps/**'],
}
EOF

cat > .prettierrc << 'EOF'
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
EOF

cat > .prettierignore << 'EOF'
node_modules
.next
apps
build
dist
*.log
EOF

echo "✅ Linting config created"
echo ""

# =============================================================================
# STEP 7: Environment Files
# =============================================================================
echo "⚙️  Creating environment templates..."

cat > .env.example << 'EOF'
# Supabase (Client-Base)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Supabase (Partnerships - if different)
NEXT_PUBLIC_SUPABASE_PARTNERS_URL=
NEXT_PUBLIC_SUPABASE_PARTNERS_ANON_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development

# Feature Flags
NEXT_PUBLIC_ENABLE_CLIENT_BASE=true
NEXT_PUBLIC_ENABLE_PARTNERSHIPS=true
EOF

cat > .gitignore << 'EOF'
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
!.env.example

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

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

# Misc
*.tsbuildinfo
next-env.d.ts

# Reference apps (keep but ignore changes)
apps/*/node_modules/
apps/*/.next/
apps/*/.env*.local
EOF

echo "✅ Environment files created"
echo ""

# =============================================================================
# STEP 8: App Entry Files
# =============================================================================
echo "📄 Creating app entry files..."

# Root layout
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SISO Platform",
  description: "Unified platform for client-base and partnerships",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOF

# Home page
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">SISO Monorepo</h1>
        <p className="text-xl text-gray-600">
          Unified platform ready for migration
        </p>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Client Base</h2>
            <p className="text-sm text-gray-500">
              Customer-facing features
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Partnerships</h2>
            <p className="text-sm text-gray-500">
              Partner management platform
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-2 text-sm text-gray-500">
          <p>✅ Scaffolding created</p>
          <p>✅ Reference apps preserved in apps/</p>
          <p>📝 Ready to migrate domains</p>
        </div>
      </div>
    </main>
  )
}
EOF

# Global CSS
cat > src/app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}
EOF

# Route group layouts
cat > src/app/\(client-base\)/layout.tsx << 'EOF'
export default function ClientBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add client-base specific layout (nav, footer, etc.)
  return <>{children}</>
}
EOF

cat > src/app/\(partnerships\)/layout.tsx << 'EOF'
export default function PartnershipsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add partnerships specific layout (nav, footer, etc.)
  return <>{children}</>
}
EOF

echo "✅ App entry files created"
echo ""

# =============================================================================
# STEP 9: Shared Domain Structure
# =============================================================================
echo "📦 Creating shared domain structure..."

# Shared components README
cat > src/domains/shared/components/README.md << 'EOF'
# Shared Components

Place truly shared components here that are used across multiple domains.

Examples:
- Button
- Card
- Input
- Modal
- Toast

**Note:** If a component is only used in one domain, keep it in that domain's components/ folder.
EOF

# Shared hooks README
cat > src/domains/shared/hooks/README.md << 'EOF'
# Shared Hooks

Place shared React hooks here.

Examples:
- useDebounce
- useMediaQuery
- useLocalStorage
- useAsync
EOF

# Shared utils README
cat > src/domains/shared/utils/README.md << 'EOF'
# Shared Utilities

Place shared utility functions here.

Examples:
- formatters (dates, currency, etc.)
- validators
- helpers
EOF

echo "✅ Shared domain structure created"
echo ""

# =============================================================================
# STEP 10: Helper Scripts
# =============================================================================
echo "🔧 Creating helper scripts..."

# Domain generator
cat > scripts/generate-domain.sh << 'SCRIPTEOF'
#!/bin/bash

# Usage: ./scripts/generate-domain.sh client-base menu

GROUP=$1
DOMAIN=$2

if [ -z "$GROUP" ] || [ -z "$DOMAIN" ]; then
    echo "Usage: ./scripts/generate-domain.sh <group> <domain-name>"
    echo ""
    echo "Groups: client-base | partnerships"
    echo "Example: ./scripts/generate-domain.sh client-base menu"
    exit 1
fi

DOMAIN_PATH="src/domains/$GROUP/$DOMAIN"

if [ -d "$DOMAIN_PATH" ]; then
    echo "❌ Domain already exists: $DOMAIN_PATH"
    exit 1
fi

echo "Creating domain: $DOMAIN_PATH"

# Create folder structure
mkdir -p $DOMAIN_PATH/{components,sections,hooks,server,types,utils,pages}

# Create index.ts
cat > $DOMAIN_PATH/index.ts << 'DOMAINEOF'
/**
 * Domain Public API
 * Export only what other domains/routes need
 */

// Pages
// export { default as Page } from './pages/Page'

// Components (if needed by other domains)
// export { Component } from './components'

// Hooks
// export { useHook } from './hooks'

// Types
// export type { Type } from './types'

// Utils (if needed by other domains)
// export { util } from './utils'
DOMAINEOF

# Create types/index.ts
cat > $DOMAIN_PATH/types/index.ts << 'TYPEEOF'
/**
 * Domain Types
 */

export interface Example {
  id: string
  name: string
}
TYPEEOF

# Create README
cat > $DOMAIN_PATH/README.md << READMEEOF
# $DOMAIN Domain

## Structure

\`\`\`
$DOMAIN/
├── components/    # Domain-specific components
├── sections/      # Larger composed sections
├── hooks/         # Domain hooks
├── server/        # Server actions & DB queries
├── types/         # Domain types
├── utils/         # Domain utilities
├── pages/         # Page components
└── index.ts       # Public API
\`\`\`

## Usage

\`\`\`typescript
import { Page } from '@/domains/$GROUP/$DOMAIN'
\`\`\`
READMEEOF

echo "✅ Domain created: $DOMAIN_PATH"
echo ""
echo "Next steps:"
echo "  1. Add your components in $DOMAIN_PATH/components/"
echo "  2. Create page component in $DOMAIN_PATH/pages/"
echo "  3. Export from $DOMAIN_PATH/index.ts"
echo "  4. Import in your route: import { Page } from '@/domains/$GROUP/$DOMAIN'"
SCRIPTEOF

chmod +x scripts/generate-domain.sh

echo "✅ Helper scripts created"
echo ""

# =============================================================================
# STEP 11: Documentation
# =============================================================================
echo "📚 Creating documentation..."

cat > README.md << 'EOF'
# SISO Monorepo

Unified platform for client-base and partnerships.

## Structure

```
SISO-MONOREPO/
├── apps/                   # Reference apps (read-only)
│   ├── client/            # Original client-base app
│   └── partners/          # Original partnerships app
│
└── src/                   # New unified app
    ├── app/               # Next.js routing
    ├── domains/           # Domain-based business logic
    │   ├── client-base/
    │   ├── partnerships/
    │   └── shared/
    ├── features/
    ├── lib/
    ├── providers/
    └── config/
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## Creating a New Domain

```bash
# Generate domain scaffolding
./scripts/generate-domain.sh client-base menu
./scripts/generate-domain.sh partnerships projects
```

## Migration Progress

- [x] Scaffolding created
- [x] Reference apps preserved
- [ ] Migrate client-base domains
- [ ] Migrate partnerships domains
- [ ] Test unified build
- [ ] Deploy unified app

## Documentation

- [Architecture](./docs/architecture/FINAL-STRUCTURE.md)
- [Migration Guide](./docs/migration/MIGRATION-GUIDE.md)
EOF

echo "✅ Documentation created"
echo ""

# =============================================================================
# DONE!
# =============================================================================
echo ""
echo "🎉 Final scaffolding setup complete!"
echo ""
echo "📁 Structure created:"
echo "  ✅ apps/          - Reference apps (preserved)"
echo "  ✅ src/           - New unified app"
echo "  ✅ src/domains/   - Domain structure ready"
echo "  ✅ Config files   - TypeScript, Next.js, Tailwind, etc."
echo ""
echo "🚀 Next steps:"
echo "  1. pnpm install"
echo "  2. pnpm dev                                    # Verify it works"
echo "  3. ./scripts/generate-domain.sh client-base <domain>"
echo "  4. Start migrating from apps/ → src/domains/"
echo ""
echo "📚 Reference:"
echo "  - Original client app: apps/client/"
echo "  - Original partners app: apps/partners/"
echo "  - Migration docs: docs/migration/"
echo ""
