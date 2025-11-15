# Portal Architecture Scaffolding Plan

## Planning Principles

### Complexity Classification
- **Simple**: Single screen, basic display, minimal state (1-2 files)
- **Medium**: Multiple screens, forms, local state, some business logic (3-8 files)
- **Complex**: Multiple subdomains, extensive business logic, external APIs (9+ files)

### Folder Structure by Complexity

**Simple Feature:**
```
feature/
└── ui/
    ├── FeatureScreen.tsx
    ├── components/
    └── types.ts
```

**Medium Feature:**
```
feature/
├── domain/         # Types, entities, validation rules
├── application/    # Hooks, state management
└── ui/            # Screens and components
```

**Complex Feature:**
```
feature/
├── domain/         # Core business types
├── application/    # Orchestration, use cases
├── infrastructure/ # API clients, services
├── subdomain-1/   # Can have own layers
├── subdomain-2/
└── ui/            # Shared UI components
```

---

## Feature-by-Feature Plan

### ✅ DONE: Academy (Complex)
**Status**: Folder structure exists
**Architecture**: Complex (multiple learning subdomains)
```
academy/
├── courses/           # Course catalog, player
├── getting-started/   # Onboarding content
├── industry/         # Industry-specific resources
├── pitch-kit/        # Sales assets
├── portfolio/        # SISO builds showcase
├── saved/            # Bookmarks
├── training-spotlight/ # Recommended content
└── ui/               # Shared Learning UI
```
**Next Steps**: Implement actual screens inside each subfolder

---

### ✅ DONE: Pipeline Ops (Complex)
**Status**: Folder structure exists
**Architecture**: Complex (CRM + recruitment system)
```
pipeline-ops/
├── domain/           # Prospect, Deal, Stage types
├── application/      # Deal state management
├── infrastructure/   # CRM API client
├── submit-client/    # Form to log prospects
├── prospects/        # Kanban board view
├── active-deals/     # In-progress deals
├── recruitment/      # Team building
├── tools/            # App plan generator
└── ui/               # Shared Pipeline UI
```
**Next Steps**: Build out individual subdomain screens

---

### ✅ DONE: Community (Complex)
**Status**: Folder structure exists
**Architecture**: Complex (chat system with multiple channel types)
```
community/
├── domain/           # Channel, Message types
├── channels/         # Channel management
├── campus/           # Community hub screen
├── messages/         # DMs and group chats
├── announcements/    # Read-only broadcasts
├── general/          # General chat
├── wins/             # Wins celebration
├── help/             # Help center
└── partner-directory/ # Browse partners
```
**Next Steps**: Implement chat UI and real-time messaging

---

### ✅ DONE: Earnings (Complex)
**Status**: Folder structure exists
**Architecture**: Complex (financial tracking + gamification)
```
earnings/
├── earnings-overview/ # Commission dashboard
├── wallet/           # Stripe Connect integration
├── tier-progress/    # Visual progression tracker
├── achievements/     # Badge system
├── leaderboard/      # Rankings
└── challenges/       # Competitions
```
**Recommended Layers**:
```
earnings/
├── domain/           # Commission, Tier, Badge types
├── application/      # Earnings calculations, tier logic
├── infrastructure/   # Stripe API, payment processing
└── [subdomains as above]
```
**Next Steps**: Add domain/application/infrastructure layers

---

### 📋 TODO: Partnership Hub (Complex)
**Status**: Folder structure exists, needs planning
**Type**: Dashboard aggregating data from all domains
**Architecture**: Complex (orchestration layer)
```
partnership-hub/
├── dashboard/         # Hero stats, quick metrics
├── announcements/     # Latest updates
├── activity/          # Timeline of events
├── wins-feed/         # Partner victories
├── quick-actions/     # Primary CTAs
├── prospects/         # Today's deals shortcut
├── active-deals/      # Deals in motion shortcut
├── tasks-today/       # Today's tasks shortcut
├── tier-progress/     # Progress shortcut
├── leaderboard/       # Rankings shortcut
├── portfolio/         # Portfolio shortcut
├── submit-client/     # Submit client shortcut
├── support/           # Contact support
└── calendar-office-hours/ # Office hours booking
```
**Recommended Layers**:
```
partnership-hub/
├── domain/           # Dashboard widget types, aggregation rules
├── application/      # Data aggregation hooks
└── ui/               # Shared dashboard components
```
**Note**: Many subfolders are shortcuts/links to other domains. Actual logic lives elsewhere.

---

### 📋 TODO: Workspace (Medium-Complex)
**Status**: Folder structure exists, needs planning
**Type**: Productivity tools
**Architecture**: Medium-Complex (multiple independent tools)
```
workspace/
├── calendar/         # Full calendar view + booking
├── tasks/            # Task management (has checklist files)
├── notes/            # Private notes
└── files/            # File storage
```
**Recommended Layers** (at workspace root):
```
workspace/
├── domain/           # Task, Note, File types
├── application/      # Workspace state orchestration
└── [subdomains as above]
```
Each subdomain can have own ui/ folder.

**Calendar Structure**:
```
workspace/calendar/
├── domain/           # Event types, recurrence rules
├── application/      # Calendar state, booking logic
├── infrastructure/   # Cal.com or Google Calendar API
└── ui/               # Calendar views, booking forms
```

**Tasks Structure**:
```
workspace/tasks/
├── domain/           # Task types, priority, status
├── application/      # Task state, filtering
└── ui/               # Task list, kanban, forms
    ├── TaskListScreen.tsx
    ├── components/
    └── checklist/    # Onboarding checklist (existing files)
```

**Notes Structure** (Simple):
```
workspace/notes/
└── ui/
    ├── NotesScreen.tsx
    ├── components/
    └── editor/       # Rich text editor components
```

**Files Structure** (Medium):
```
workspace/files/
├── domain/           # File types, permissions
├── application/      # Upload/download logic
├── infrastructure/   # S3 or storage API
└── ui/               # File browser, upload UI
```

---

### ✅ DONE: Notifications (Medium)
**Status**: Complete architecture
**Architecture**: Medium (notification center with tabs)
```
notifications/
├── domain/           # Notification types
├── application/      # Notification state
├── infrastructure/   # WebSocket or polling
├── center/           # Notification center UI
├── tabs/             # Tab filtering logic
├── preferences/      # Notification settings
└── ui/               # Shared notification UI
```
**Status**: Architecture looks solid

---

### ✅ DONE: Profile (Medium)
**Status**: Complete architecture
**Architecture**: Medium (profile management)
```
profile/
├── domain/           # Profile types, validation
├── application/      # Profile state management
├── infrastructure/   # Profile API client
├── public-profile/   # Public-facing profile page
├── settings-profile/ # Settings section profile edit
└── ui/               # Shared profile components
```
**Status**: Architecture looks solid

---

### ✅ DONE: Settings (Complex)
**Status**: Being worked on separately (per previous conversation)
**Architecture**: Complex (multiple settings domains)
```
settings/
├── general/          # Quick controls hub
├── appearance/       # Theme, accessibility
├── language/         # i18n, timezone
├── profile/          # Profile editing (links to profile domain)
├── notifications/    # Notification preferences
├── security/         # Password, 2FA
├── privacy/          # Data export, deletion
├── legal/            # Terms, agreements
├── integrations/     # App connections
├── devices/          # Session management
├── membership/       # Tier info
├── referrals/        # Referral program
├── feedback/         # Submit feedback
├── whats-new/        # Release notes
├── menu/             # Settings navigation
└── components/       # Shared settings UI
```
**Status**: Don't touch, being worked on

---

### 📋 TODO: Tools (Simple)
**Status**: Basic structure exists
**Type**: Partner utilities
**Architecture**: Simple to start (can grow)
```
tools/
└── app-plan-generator/
    ├── domain/       # App plan types
    ├── application/  # Generation logic
    └── ui/           # Generator form and preview
```
**Next Steps**: Build the app plan generator UI

---

## Implementation Priority

### Phase 1: Core Workflows (Weeks 1-2)
1. **Pipeline Ops** - The money-maker (submit client, prospects board)
2. **Partnership Hub Dashboard** - First thing users see
3. **Workspace/Tasks** - Onboarding checklist critical

### Phase 2: Learning & Earnings (Weeks 3-4)
4. **Academy** - Training and enablement
5. **Earnings** - Commission tracking and tier progress

### Phase 3: Community & Collaboration (Weeks 5-6)
6. **Community/Messages** - Chat and DMs
7. **Workspace/Calendar** - Booking and scheduling

### Phase 4: Supporting Features (Weeks 7-8)
8. **Workspace/Notes** - Note-taking
9. **Workspace/Files** - File storage
10. **Tools** - App plan generator

---

## Scaffolding Checklist

For each feature, follow this process:

### 1. Planning Phase
- [ ] Review navigation config for the feature
- [ ] Determine complexity (Simple/Medium/Complex)
- [ ] Map out subdomains (if any)
- [ ] Identify external dependencies (APIs, services)
- [ ] Choose layer structure (ui only vs full domain/application/infrastructure)

### 2. Scaffolding Phase
- [ ] Create necessary folders (domain, application, infrastructure, ui)
- [ ] Create `types.ts` files in domain/
- [ ] Create placeholder screens in ui/
- [ ] Create `index.ts` barrel exports

### 3. Implementation Phase
- [ ] Implement domain types and entities
- [ ] Implement application hooks and state
- [ ] Implement infrastructure API clients
- [ ] Build UI components and screens
- [ ] Wire everything together

---

## Questions to Ask Before Starting Each Feature

1. **Does this feature have complex business logic?** → Add domain layer
2. **Does this feature need state management?** → Add application layer
3. **Does this feature call external APIs?** → Add infrastructure layer
4. **Does this feature have multiple sub-features?** → Create subdomains
5. **Is this feature simple display logic?** → Just ui/ folder is fine

---

## Naming Conventions

### Folders
- `kebab-case` for all folders
- Feature names match navigation config IDs

### Files
- `PascalCase.tsx` for components
- `camelCase.ts` for utilities and types
- `index.ts` for barrel exports

### Layers
- `domain/` - Business types, entities, rules
- `application/` - Hooks, state, orchestration
- `infrastructure/` - APIs, external services
- `ui/` - Components, screens, styles

---

## Example: Building "Submit Client" Feature

### 1. Analyze Requirements
- Form with client details
- Validation logic
- API submission
- Success/error handling

**Complexity**: Medium

### 2. Create Structure
```
pipeline-ops/submit-client/
├── domain/
│   ├── types.ts          # Client, SubmissionStatus types
│   └── validation.ts     # Form validation rules
├── application/
│   ├── useSubmitClient.ts  # Submit hook
│   └── submitClientStore.ts # Optional: form state
└── ui/
    ├── SubmitClientScreen.tsx
    ├── components/
    │   ├── ClientForm.tsx
    │   ├── SuccessMessage.tsx
    │   └── ErrorMessage.tsx
    └── index.ts
```

### 3. Implementation Order
1. `domain/types.ts` - Define Client type
2. `domain/validation.ts` - Form validation rules
3. `application/useSubmitClient.ts` - API call hook
4. `ui/components/ClientForm.tsx` - Form UI
5. `ui/SubmitClientScreen.tsx` - Main screen
6. Wire up and test

---

## Anti-Patterns to Avoid

❌ **Don't**:
- Create layers you don't need (overengineering)
- Put business logic in UI components
- Skip domain layer for complex features
- Create infrastructure layer without external APIs
- Nest folders more than 3-4 levels deep

✅ **Do**:
- Start simple, add layers as needed
- Keep business logic in domain/application
- Use infrastructure only for external services
- Create subdomains for distinct sub-features
- Follow existing patterns in the codebase

---

## Next Steps

1. **Review this plan** with the team
2. **Choose first feature** to implement (recommend: Pipeline Ops → Submit Client)
3. **Create scaffolding** following the structure above
4. **Build one complete feature end-to-end** as reference
5. **Document patterns** as you go
6. **Repeat** for remaining features
