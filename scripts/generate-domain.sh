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
