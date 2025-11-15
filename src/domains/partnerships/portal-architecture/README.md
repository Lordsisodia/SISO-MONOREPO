# Portal Architecture

> **Clean Architecture + Domain-Driven Design for the SISO Partnership Portal**

---

## 📚 Documentation Index

- **[STANDARDS.md](./STANDARDS.md)** ← **START HERE** - Quick reference for day-to-day development
- **[ARCHITECTURE_PLAN.md](./ARCHITECTURE_PLAN.md)** - Feature-by-feature implementation roadmap
- **This README** - Complete architectural guide with examples and patterns

---

## Overview

The SISO Partnership Portal follows **Clean Architecture** principles with a **domain-driven design** approach. Every feature is organized into clear layers that separate business logic, application orchestration, external dependencies, and UI.

### Why This Matters

✅ **Scalability** - Add features without architectural drift
✅ **Maintainability** - Know exactly where code lives
✅ **Testability** - Test layers independently
✅ **Developer Experience** - No decision fatigue on structure
✅ **Collaboration** - Team speaks same language

---

## Core Principles

### 1. Separation of Concerns
- **Business logic** → `domain/`
- **Orchestration** → `application/`
- **External I/O** → `infrastructure/`
- **UI components** → `ui/`

### 2. Dependency Rule
```
UI → Application → Domain
     ↓
Infrastructure
```
- **Domain** has zero dependencies (pure TypeScript)
- **Application** depends only on Domain
- **Infrastructure** implements interfaces from Domain/Application
- **UI** depends on Application and Domain (but has no business logic)

### 3. Progressive Complexity
Start simple, add layers only when needed:
- **Simple** → Just `ui/`
- **Medium** → `domain/` + `application/` + `ui/`
- **Complex** → Full layers + subdomains

---

## Standard Structures

### Simple Feature (1-3 screens, basic display)
```
feature-name/
└── ui/
    ├── FeatureScreen.tsx        # Main screen
    ├── components/              # Feature-specific components
    │   ├── ComponentA.tsx
    │   └── ComponentB.tsx
    ├── types.ts                 # Local UI types only
    └── index.ts                 # Barrel export
```

**When to use**: Announcements, Help Center, simple content pages

---

### Medium Feature (Forms, state, business logic)
```
feature-name/
├── domain/
│   ├── types.ts                 # Business types and entities
│   ├── validation.ts            # Validation rules
│   └── index.ts
├── application/
│   ├── useFeature.ts            # Main hook
│   ├── featureStore.ts          # State (optional)
│   └── index.ts
└── ui/
    ├── FeatureScreen.tsx
    ├── components/
    │   ├── FeatureForm.tsx
    │   ├── FeatureList.tsx
    │   └── FeatureCard.tsx
    └── index.ts
```

**When to use**: Submit Client, Profile editing, Task management

---

### Complex Feature (Multiple subdomains, APIs, extensive logic)
```
feature-name/
├── domain/
│   ├── types.ts                 # Shared types
│   ├── entities/                # Business entities
│   ├── rules/                   # Business rules
│   └── index.ts
├── application/
│   ├── useCases/                # Use case implementations
│   ├── hooks/                   # React hooks
│   ├── stores/                  # State management
│   └── index.ts
├── infrastructure/
│   ├── api/                     # API clients
│   ├── services/                # External services
│   └── index.ts
├── subdomain-1/                 # Can have own layers
│   ├── domain/
│   ├── application/
│   └── ui/
├── subdomain-2/
│   └── ui/
└── ui/                          # Shared UI
    ├── FeatureScreen.tsx
    ├── components/
    ├── layouts/
    └── index.ts
```

**When to use**: Pipeline Ops (CRM), Academy (Learning), Community (Chat)

---

## Layer Deep Dive

### `domain/` - Business Logic

**Purpose**: Core business types, entities, and rules

**Contains**:
- `types.ts` - TypeScript interfaces and types
- `entities/` - Business entities
- `rules/` - Validation and business constraints
- `constants.ts` - Business constants

**Rules**:
- ✅ Pure TypeScript (no React, no libs except utils)
- ✅ Define data shape and business rules
- ❌ No API calls, React hooks, or UI logic
- ❌ No dependencies on other layers

**Example**:
```typescript
// pipeline-ops/domain/types.ts
export type DealStage =
  | "prospecting"
  | "contacted"
  | "demo-ready"
  | "negotiating"
  | "won"
  | "lost";

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
  stage: DealStage;
  estimatedValue: number;
  submittedAt: Date;
  partnerId: string;
}

export interface SubmitClientInput {
  name: string;
  email: string;
  company: string;
  phoneNumber?: string;
  notes?: string;
}
```

---

### `application/` - Orchestration

**Purpose**: Orchestrate business logic, manage state, implement use cases

**Contains**:
- `hooks/` - React hooks
- `stores/` - State management (Zustand, Jotai)
- `useCases/` - Complex operations
- `utils/` - Application utilities

**Rules**:
- ✅ React hooks allowed
- ✅ Orchestrate domain logic
- ✅ Manage application state
- ✅ Depends on `domain/` and `infrastructure/`
- ❌ No UI components (return data, not JSX)
- ❌ No direct API calls (delegate to `infrastructure/`)

**Example**:
```typescript
// pipeline-ops/submit-client/application/useSubmitClient.ts
import { useMutation } from "@tanstack/react-query";
import { submitClient } from "../infrastructure/api";
import type { SubmitClientInput } from "../domain/types";

export function useSubmitClient() {
  return useMutation({
    mutationFn: (data: SubmitClientInput) => submitClient(data),
    onSuccess: (newClient) => {
      // Update cache, navigate, show toast
    },
  });
}
```

---

### `infrastructure/` - External Dependencies

**Purpose**: Handle external I/O (APIs, services, storage)

**Contains**:
- `api/` - API client functions
- `services/` - External integrations (Stripe, Twilio)
- `adapters/` - Transform external data to domain types
- `repositories/` - Data access patterns

**Rules**:
- ✅ All external I/O happens here
- ✅ Implements interfaces from `domain/`/`application/`
- ✅ Transform external data to domain types
- ❌ No business logic
- ❌ No React components

**Example**:
```typescript
// pipeline-ops/submit-client/infrastructure/api.ts
import { apiClient } from "@/lib/api";
import type { SubmitClientInput, Client } from "../domain/types";

export async function submitClient(data: SubmitClientInput): Promise<Client> {
  const response = await apiClient.post("/api/clients", data);
  return response.data;
}
```

---

### `ui/` - User Interface

**Purpose**: React components and screens

**Contains**:
- `*Screen.tsx` - Full-page screens
- `components/` - Feature-specific components
- `layouts/` - Layout components
- `hooks/` - UI-only hooks (e.g., `useDisclosure`)

**Rules**:
- ✅ React components only
- ✅ Use hooks from `application/`
- ✅ Display data, handle events
- ✅ Import types from `domain/`
- ❌ No business logic
- ❌ No API calls

**Example**:
```typescript
// pipeline-ops/submit-client/ui/SubmitClientScreen.tsx
import { useSubmitClient } from "../application/useSubmitClient";
import { ClientForm } from "./components/ClientForm";

export function SubmitClientScreen() {
  const { mutate, isPending } = useSubmitClient();

  return (
    <div>
      <h1>Submit a Client</h1>
      <ClientForm onSubmit={mutate} isLoading={isPending} />
    </div>
  );
}
```

---

## Decision Tree

```
START: New feature needed
│
├─ Q1: Has business logic beyond display?
│  ├─ NO → Simple (just ui/)
│  └─ YES ↓
│
├─ Q2: Manages state or has forms?
│  ├─ NO → Simple (just ui/)
│  └─ YES ↓
│
├─ Q3: Calls external APIs?
│  ├─ NO → Medium (domain + application + ui)
│  └─ YES ↓
│
├─ Q4: Multiple distinct sub-features?
│  ├─ NO → Medium + infrastructure
│  └─ YES → Complex (full layers + subdomains)
```

---

## Common Patterns

### Pattern 1: Form Submission
```
feature/
├── domain/types.ts              # Input/Output types
├── domain/validation.ts         # Zod schema
├── application/useSubmit.ts     # Mutation hook
├── infrastructure/api.ts        # API call
└── ui/
    ├── Screen.tsx
    └── components/Form.tsx
```

### Pattern 2: List + Detail
```
feature/
├── domain/types.ts
├── application/
│   ├── useList.ts               # Fetch list
│   └── useDetail.ts             # Fetch single
├── infrastructure/api.ts
└── ui/
    ├── ListScreen.tsx
    ├── DetailScreen.tsx
    └── components/
        └── Card.tsx
```

### Pattern 3: Multi-Step Form
```
feature/
├── domain/
│   ├── types.ts                 # Step types
│   └── validation.ts            # Per-step validation
├── application/
│   ├── useMultiStep.ts          # Step navigation
│   └── useSubmit.ts             # Final submit
└── ui/
    ├── MultiStepScreen.tsx
    └── components/
        ├── Step1.tsx
        ├── Step2.tsx
        └── StepNav.tsx
```

---

## Anti-Patterns

### ❌ Business Logic in UI
```typescript
// BAD
function ClientForm() {
  const handleSubmit = (data) => {
    if (!data.email.includes("@")) {  // ❌ Validation in UI
      setError("Invalid email");
      return;
    }
    fetch("/api/clients", { method: "POST", body: data }); // ❌ API in UI
  };
}
```

### ✅ Proper Separation
```typescript
// GOOD - UI
function ClientForm({ onSubmit, isLoading }) {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(clientSchema), // From domain
  });
  return <form onSubmit={handleSubmit(onSubmit)}>...</form>;
}

// GOOD - Screen
function SubmitClientScreen() {
  const { mutate, isPending } = useSubmitClient(); // From application
  return <ClientForm onSubmit={mutate} isLoading={isPending} />;
}
```

---

### ❌ God Hooks
```typescript
// BAD - Does too much
function useEverything() {
  const clients = useClients();
  const deals = useDeals();
  const earnings = useEarnings();
  // ... 10 more
  return { /* everything */ };
}
```

### ✅ Focused Hooks
```typescript
// GOOD - Single purpose
function useClients() { /* ... */ }
function useDeals() { /* ... */ }

// Compose where needed
function Dashboard() {
  const { data: clients } = useClients();
  const { data: deals } = useDeals();
}
```

---

## File Naming

- **Components**: `PascalCase.tsx` - `SubmitClientScreen.tsx`, `DealCard.tsx`
- **Hooks**: `use` prefix - `useSubmitClient.ts`, `useProspects.ts`
- **Types**: `camelCase.ts` - `types.ts`, `validation.ts`, `constants.ts`
- **API**: `camelCase.ts` - `clientApi.ts`, `dealApi.ts`
- **Barrel exports**: `index.ts` in every folder

---

## Testing Strategy

### Domain
- **Unit tests** for validation and rules
- No mocks (pure functions)

### Application
- **Integration tests** for hooks
- Mock `infrastructure/`

### Infrastructure
- **Integration tests** with mock API
- Test error handling

### UI
- **Component tests** (React Testing Library)
- Mock application hooks
- Test interactions

---

## Real-World Examples

### Notifications (Medium)
```
notifications/
├── domain/types.ts
├── application/
│   ├── useNotifications.ts
│   └── notificationStore.ts
├── infrastructure/api/
└── ui/
    ├── NotificationsScreen.tsx
    └── components/
```

### Pipeline Ops (Complex)
```
pipeline-ops/
├── domain/types.ts
├── application/hooks/
├── infrastructure/api/
├── submit-client/
│   ├── application/
│   └── ui/
├── prospects/
│   ├── application/
│   └── ui/
└── ui/                  # Shared
```

---

## Migration Path

For existing code not following this structure:

1. **Identify feature** to migrate
2. **Create target structure**
3. **Move types** to `domain/types.ts`
4. **Extract business logic** to `domain/`/`application/`
5. **Move API calls** to `infrastructure/`
6. **Clean up UI** (remove logic, use hooks)
7. **Update imports**
8. **Test thoroughly**

---

## When to Deviate

**You can deviate when**:
- Strong architectural reason (document it)
- Team agrees
- You update this README

**Don't deviate because**:
- "It's faster" (it's not long-term)
- "It's small" (small features grow)
- "I'll refactor later" (you won't)

---

## Quick Start

1. **Read** [STANDARDS.md](./STANDARDS.md) - Daily reference
2. **Check** decision tree for your feature complexity
3. **Look at** similar existing features
4. **Follow** the standard structure
5. **When stuck** - Ask team, don't guess

---

## Additional Resources

- [ARCHITECTURE_PLAN.md](./ARCHITECTURE_PLAN.md) - Implementation roadmap
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

**Version**: 1.0
**Last Updated**: 2025-11-11
**Status**: 🔒 Locked - All features must follow this architecture
