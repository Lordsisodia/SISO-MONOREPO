#!/bin/bash

# SISO Monorepo - Empty Scaffolding Setup Script
# This creates the basic folder structure and config files

set -e  # Exit on error

echo "🚀 Setting up SISO Monorepo scaffolding..."
echo ""

# =============================================================================
# STEP 1: Create Directory Structure
# =============================================================================
echo "📁 Creating directory structure..."

# Main app directories
mkdir -p src/{app,domains,components,lib,config}
mkdir -p src/app/{api,\(client-base\),\(partnerships\)}
mkdir -p src/domains/{client-base,partnerships,shared}

# Optional packages (start empty, can add later)
mkdir -p packages

# Public assets
mkdir -p public/{client-base,partnerships,shared}

# Docs
mkdir -p docs/{architecture,guides}

# Scripts
mkdir -p scripts

# GitHub workflows
mkdir -p .github/workflows

echo "✅ Directory structure created"
echo ""

# =============================================================================
# STEP 2: Create Root Config Files
# =============================================================================
echo "⚙️  Creating configuration files..."

# package.json
cat > package.json << 'EOF'
{
  "name": "siso-monorepo",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,md}\""
  },
  "dependencies": {
    "next": "^15.1.4",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
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
    "prettier": "^3.4.2"
  }
}
EOF

# tsconfig.json
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
EOF

# next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    NEXT_PUBLIC_APP_NAME: 'SISO',
  },
}

module.exports = nextConfig
EOF

# tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
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
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# .eslintrc.js
cat > .eslintrc.js << 'EOF'
module.exports = {
  extends: ['next/core-web-vitals'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
EOF

# .prettierrc
cat > .prettierrc << 'EOF'
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
EOF

# .gitignore
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
EOF

# .env.example
cat > .env.example << 'EOF'
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

echo "✅ Configuration files created"
echo ""

# =============================================================================
# STEP 3: Create App Entry Files
# =============================================================================
echo "📄 Creating app entry files..."

# src/app/layout.tsx
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "SISO",
  description: "SISO Platform",
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

# src/app/page.tsx
cat > src/app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">SISO Monorepo</h1>
        <p className="text-lg text-gray-600">
          Empty scaffolding ready for domains
        </p>
        <div className="mt-8 space-y-2">
          <p className="text-sm text-gray-500">
            ✅ Structure created
          </p>
          <p className="text-sm text-gray-500">
            ✅ Configs ready
          </p>
          <p className="text-sm text-gray-500">
            📝 Ready to add domains
          </p>
        </div>
      </div>
    </main>
  )
}
EOF

# src/app/globals.css
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

# Create route group layouts
cat > src/app/\(client-base\)/layout.tsx << 'EOF'
export default function ClientBaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
EOF

cat > src/app/\(partnerships\)/layout.tsx << 'EOF'
export default function PartnershipsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
EOF

echo "✅ App entry files created"
echo ""

# =============================================================================
# STEP 4: Create README placeholders
# =============================================================================
echo "📝 Creating README files..."

# Root README
cat > README.md << 'EOF'
# SISO Monorepo

Unified platform for client-base and partnerships.

## Structure

```
src/
├── app/              # Next.js App Router
│   ├── (client-base)/
│   └── (partnerships)/
└── domains/          # Domain-based business logic
    ├── client-base/
    ├── partnerships/
    └── shared/
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```

## Documentation

See `docs/` for detailed architecture and guides.
EOF

# Domain README placeholders
cat > src/domains/client-base/README.md << 'EOF'
# Client-Base Domains

All client-base related domains go here.

Each domain should be self-contained with:
- components/
- hooks/
- server/
- types/
- utils/
- pages/
- index.ts
EOF

cat > src/domains/partnerships/README.md << 'EOF'
# Partnership Domains

All partnership related domains go here.

Each domain should be self-contained with:
- components/
- hooks/
- server/
- types/
- utils/
- pages/
- index.ts
EOF

cat > src/domains/shared/README.md << 'EOF'
# Shared Domains

Code shared between client-base and partnerships.

Use sparingly - most code should live in specific domain groups.
EOF

echo "✅ README files created"
echo ""

# =============================================================================
# STEP 5: Create helpful scripts
# =============================================================================
echo "🔧 Creating helper scripts..."

# Domain generator script
cat > scripts/generate-domain.sh << 'EOF'
#!/bin/bash

# Usage: ./scripts/generate-domain.sh client-base my-domain

GROUP=$1
DOMAIN=$2

if [ -z "$GROUP" ] || [ -z "$DOMAIN" ]; then
    echo "Usage: ./scripts/generate-domain.sh <group> <domain-name>"
    echo "Example: ./scripts/generate-domain.sh client-base menu"
    exit 1
fi

DOMAIN_PATH="src/domains/$GROUP/$DOMAIN"

echo "Creating domain: $DOMAIN_PATH"

mkdir -p $DOMAIN_PATH/{components,hooks,server,types,utils,pages}

# Create index.ts
cat > $DOMAIN_PATH/index.ts << 'DOMAINEOF'
// Domain public API
// Export only what other domains/routes need

// Components
export { } from './components'

// Hooks
export { } from './hooks'

// Types
export type { } from './types'

// Utils (if needed by other domains)
export { } from './utils'
DOMAINEOF

echo "✅ Domain created at $DOMAIN_PATH"
EOF

chmod +x scripts/generate-domain.sh

echo "✅ Helper scripts created"
echo ""

# =============================================================================
# DONE!
# =============================================================================
echo ""
echo "🎉 Scaffolding setup complete!"
echo ""
echo "Next steps:"
echo "  1. pnpm install              # Install dependencies"
echo "  2. pnpm dev                  # Start dev server"
echo "  3. ./scripts/generate-domain.sh client-base <domain-name>"
echo ""
echo "Visit: http://localhost:3000"
echo ""
