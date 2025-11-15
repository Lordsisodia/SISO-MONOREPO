# Partnership Portal - Architectural Standards

**Status**: 🔒 **LOCKED** - All developers must follow these standards  
**Version**: 1.0  
**Last Updated**: 2025-11-11

---

## Quick Reference

### Complexity Decision Tree
```
New Feature?
│
├─ Just display data? → Simple (ui/ only)
├─ Forms + validation? → Medium (domain/ + application/ + ui/)
├─ External APIs? → Medium + infrastructure/
└─ Multiple sub-features? → Complex (full layers + subdomains)
```

### Standard Structures

**Simple:**
```
feature/ui/[Screen + components]
```

**Medium:**
```
feature/{domain, application, ui}
```

**Complex:**
```
feature/{domain, application, infrastructure, subdomains, ui}
```

---

## Layer Responsibilities

| Layer | Purpose | Can Import | Cannot Do |
|-------|---------|-----------|-----------|
| **domain/** | Business types, validation rules | Nothing (pure TS) | ❌ React, API calls, UI |
| **application/** | State, hooks, orchestration | domain/ | ❌ UI components, direct API |
| **infrastructure/** | API calls, external services | domain/, application/ | ❌ Business logic, UI |
| **ui/** | Components, screens | application/, domain/ | ❌ Business logic, API calls |

---

## Mandatory Rules

### ✅ Always Do

1. **Follow the decision tree** - Don't skip layers or over-engineer
2. **Keep business logic in domain/** - Types, validation, rules
3. **Keep API calls in infrastructure/** - Never in UI or domain
4. **Keep UI pure** - Display data, handle events, no logic
5. **Use barrel exports** - `index.ts` in every folder
6. **Name consistently** - PascalCase components, camelCase utils
7. **Follow existing patterns** - Look at Notifications, Profile, Pipeline Ops

### ❌ Never Do

1. **Business logic in UI** - No validation, calculations, or rules in components
2. **API calls in UI** - Always use application/ hooks
3. **Skip layers for "small features"** - Small features grow
4. **Create "god hooks"** - Keep hooks focused and single-purpose
5. **Nest folders >3-4 levels** - If you need more, restructure
6. **Deviate without documenting** - Update this doc if you must deviate

---

## File Naming

- **Components**: `PascalCase.tsx` (e.g., `SubmitClientScreen.tsx`, `DealCard.tsx`)
- **Hooks**: `use` prefix (e.g., `useSubmitClient.ts`, `useProspects.ts`)
- **Types**: `types.ts`, `camelCase.ts` (e.g., `validation.ts`, `constants.ts`)
- **API**: `camelCase.ts` (e.g., `clientApi.ts`, `dealApi.ts`)

---

## Examples

### Simple Feature
```typescript
// feature/ui/FeatureScreen.tsx
export function FeatureScreen() {
  return <div>Simple display</div>;
}
```

### Medium Feature
```typescript
// domain/types.ts
export interface Client { id: string; name: string; }

// application/useClients.ts
export function useClients() {
  return useQuery({ queryKey: ["clients"], queryFn: fetchClients });
}

// infrastructure/api.ts
export async function fetchClients() {
  return apiClient.get("/clients");
}

// ui/ClientsScreen.tsx
export function ClientsScreen() {
  const { data } = useClients();
  return <div>{data?.map(c => <ClientCard key={c.id} client={c} />)}</div>;
}
```

---

## When in Doubt

1. **Look at existing features** - Notifications, Profile, Pipeline Ops
2. **Use the decision tree** - Above
3. **Ask the team** - Before deviating
4. **Document deviations** - Update this file

---

## Full Documentation

See [README.md](./README.md) for complete architectural guide with examples, patterns, and anti-patterns.

See [ARCHITECTURE_PLAN.md](./ARCHITECTURE_PLAN.md) for feature-by-feature implementation roadmap.

---

**Remember**: Consistency > Cleverness. Follow these standards, and the codebase stays maintainable as it scales.
