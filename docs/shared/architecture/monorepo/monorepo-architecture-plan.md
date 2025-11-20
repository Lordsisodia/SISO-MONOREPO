# SISO Monorepo – Draft Architecture Blueprint

_This draft captures how we can consolidate `SISO-CLIENT-BASE` and `SISO-PARTNERSHIPS` without losing the domain-oriented structure you already prefer. Review and adjust before copying code into the sandbox._

## 1. Guiding Principles

1. **Domain-First Organisation** – Keep business domains as the primary seam (e.g., `accounts`, `app-plans`, `client-success`, `partnerships`). Apps consume domains; domains do not depend on specific apps.
2. **Thin App Shells** – Each app (`client`, `partners`) should mostly contain route wiring, view composition, and app-specific policies. Shared domain logic, services, and integration clients live in reusable packages.
3. **Database Packages per Project** – Client currently uses the `avdgyrepwrvsvwgxrccr` Supabase project. Partners uses `tcidaytqzruxqhsbfofy`. Schema migrations and generated types belong to dedicated packages to keep boundaries explicit.
4. **Progressive Adoption** – Start by mirroring today’s behaviour. Introduce refactors (domain extraction, new pipelines) in small, verifiable steps.

## 2. Workspace Layout

```
SISO-MONOREPO/
  apps/
    client/               # existing SISO-CLIENT-BASE
    partners/             # existing SISO-PARTNERSHIPS
  domains/
    app-plans/
    client-ops/
    wellness-tracker/
    partnership-ops/
    shared-ui/
  platforms/
    supabase-client/      # migrations + types for avdgyrepwrvsvwgxrccr
    supabase-partners/    # migrations + types for tcidaytqzruxqhsbfofy
  tooling/
    eslint-config/
    ts-config/
    testing/
  docs/
  package.json
  pnpm-workspace.yaml
```

### How apps consume domains
- `apps/client/src/` only accesses domains relevant to client experiences (e.g., `client-ops`, shared UI).
- `apps/partners/src/` focuses on `partnership-ops` but can reuse shared primitives from other domains when authorised.

## 3. Domain Package Anatomy

Each domain package keeps the same structure you already like (feature-based folders):

```
domains/app-plans/
  src/
    application/       # orchestrators, use-cases
    domain/            # entities, value objects, services
    infrastructure/    # supabase repos, edge function clients
    ui/                # optional shared components
  tests/
  package.json
```

- **application** layer exposes hooks/services the apps call.
- **infrastructure** depends on the relevant `platforms/supabase-*` package for typed queries.
- Apps add adapters (e.g., React views) in their own code if they need custom presentation.

## 4. Platforms: Supabase + External Integrations

- `platforms/supabase-client/`
  - `migrations/` (moved from the existing Supabase project powering client features)
  - `types.ts` generated via Supabase CLI
  - `client.ts` exporting factory functions (`getBrowserClient`, `getServiceClient`)
- `platforms/supabase-partners/`
  - contains partner-specific migrations and generated types. Update after regenerating to include `partners`, `partner_referrals`, etc.

Other platforms (Clerk, Cloudinary, etc.) can follow the same pattern if we want one source of truth per integration.

## 5. Shared Tooling Packages

- `tooling/eslint-config` – exports lint configs consumed by all packages.
- `tooling/ts-config` – base `tsconfig.json` with path aliases for domains and apps.
- `tooling/testing` – shared Vitest/Playwright helpers, test data builders.

## 6. Migration Plan (High Level)

1. **Design Freeze** – finalise this blueprint with domain names and boundaries you’re comfortable with.
2. **Workspace Bootstrap** – create root `package.json`, `pnpm-workspace.yaml`, and tooling packages with no code moves yet.
3. **Copy Apps** – bring current apps into `apps/` verbatim. Ensure `pnpm --filter @siso/client build` and `pnpm --filter @siso/partners build` still pass.
4. **Extract Platforms** – move Supabase migrations + type generation into `platforms/` packages. Update app imports to consume factory functions via package aliases.
5. **Extract Domains** – tackle one domain at a time, lifting services + entities into the domain package while keeping app behaviour unchanged.
6. **Shared UI** – relocate reusable UI components into `domains/shared-ui` and update consumers.
7. **Retire Originals** – once everything runs from the monorepo, archive the legacy folders.

## 7. Open Questions for Finalising

- Exact list of domains you want to represent (e.g., do `wellness`, `ai-workflows`, `learning` merit separate packages?).
- How strictly should domains avoid direct Supabase access versus allowing thin repo adapters inside each domain?
- Do we keep the client experience on the existing shared Supabase project long-term, or should we provision a dedicated instance? That decision tweaks how `platforms/supabase-client` is shaped.
- Preferred naming conventions for package scopes (`@siso/domains-*`, `@siso/platforms-*`, etc.).

---

_Once you review this, we can adjust the layout to match your domain model precisely before copying any code._
