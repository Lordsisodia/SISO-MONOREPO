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
