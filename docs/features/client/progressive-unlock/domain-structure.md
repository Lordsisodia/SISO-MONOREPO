# Refined Domain Structure - Client Base

## 🎯 Final Domain Architecture

Based on requirements clarification, here's the **minimal, focused domain structure** we actually need:

---

## 📁 Required Domains

```
src/domains/client-base/
├── dashboard/                  # ✅ CREATED - Progressive unlock shell + 9 steps
│   ├── 01-onboarding/         # Onboarding Info (voice + core form)
│   ├── 02-moodboard/          # Vision & Assets (moodboard + brand uploads)
│   ├── 03-app-plan/           # App Plan & PDR approval (gateway)
│   ├── 04-timeline/           # Timeline & Live Preview combo
│   ├── 05-agent-teams/        # Agent & Cost Tracking transparency
│   ├── 06-payments/           # PDR Docs Hub (deliverables library)
│   ├── 07-development/        # Live Build stream experience
│   ├── 08-testing/            # Quality & Approvals workspace
│   └── 09-launch/             # Launch & Growth playbook
│
├── profile/                    # ✅ CREATED - User settings (accessible throughout)
│
├── auth/                       # 🆕 NEED - Google OAuth + preview mode
│   ├── components/
│   │   ├── GoogleLoginButton.tsx
│   │   ├── EmailPasswordForm.tsx
│   │   ├── LoginPrompt.tsx (for preview mode interactions)
│   │   └── AuthGuard.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useSupabaseAuth.ts
│   │   └── usePreviewMode.ts
│   ├── server/
│   │   ├── supabaseClient.ts
│   │   └── authActions.ts
│   └── types/
│       └── auth.ts
│
├── communication/              # 🆕 NEED - AI chat + support (persistent throughout)
│   ├── components/
│   │   ├── ChatWidget.tsx (floating widget)
│   │   ├── ChatWindow.tsx (full page)
│   │   ├── MessageList.tsx
│   │   ├── MessageInput.tsx
│   │   ├── ContextualHelp.tsx (step-specific guidance)
│   │   └── CEOEscalation.tsx
│   ├── hooks/
│   │   ├── useChat.ts
│   │   ├── useAIContext.ts (knows current step)
│   │   └── useSupportTickets.ts
│   ├── server/
│   │   ├── aiChatbot.ts
│   │   ├── ticketSystem.ts
│   │   └── realtime.ts (WebSocket)
│   └── types/
│       └── communication.ts
│
├── documents/                  # 🆕 NEED - Generated + uploaded docs (accessible throughout)
│   ├── components/
│   │   ├── DocumentLibrary.tsx
│   │   ├── DocumentUpload.tsx
│   │   ├── DocumentPreview.tsx
│   │   ├── DocumentList.tsx
│   │   └── VersionHistory.tsx
│   ├── hooks/
│   │   ├── useDocuments.ts
│   │   ├── useUpload.ts
│   │   └── useDocumentGeneration.ts
│   ├── server/
│   │   ├── documentStorage.ts (Supabase Storage)
│   │   ├── documentGeneration.ts (PDF generation)
│   │   └── versionControl.ts
│   └── types/
│       └── documents.ts
│
├── tasks/                      # 🆕 NEED - Action items (accessible throughout + timeline integration)
│   ├── components/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskCreator.tsx
│   │   ├── TaskFilters.tsx
│   │   └── TimelineTasksView.tsx (for step 4 integration)
│   ├── hooks/
│   │   ├── useTasks.ts
│   │   ├── useTasksForStep.ts
│   │   └── useTaskNotifications.ts
│   ├── server/
│   │   ├── taskActions.ts
│   │   └── taskGeneration.ts (AI-generated tasks)
│   └── types/
│       └── tasks.ts
│
├── portfolio/                  # ✅ ASSUMED CREATED - Public showcase
│
└── landing/                    # ✅ ASSUMED CREATED - Industry landing pages
```

---

## 🔄 Domain Relationships

### Dashboard (Core Shell)
- **Hosts:** 9 progressive unlock steps
- **Integrates:** All persistent features in side nav
- **Manages:** Step unlock logic, progress tracking

### Persistent Features (Accessible Throughout)
These are **not separate steps** but available from any step:

1. **Communication** (chat widget + full page)
   - Context-aware of current step
   - AI chatbot + CEO escalation
   - Support ticket system

2. **Documents** (side nav + full page)
   - Generated docs from each step
   - Client-uploaded documents
   - Document library view

3. **Tasks** (side nav + full page)
   - Action items across all steps
   - Integrated into Step 4 (Timeline)
   - AI-generated + manual tasks

4. **Profile** (side nav + full page)
   - User settings
   - Edit completed steps
   - Account management

### Auth (Entry Point)
- **Preview mode:** Dashboard visible, interactions blocked
- **Login prompt:** Triggered on any interaction attempt
- **Google OAuth:** Primary authentication method
- **Session management:** Supabase integration

---

## ✅ What We DON'T Need (Clarifications)

### ❌ Projects Domain
**Reason:** Multi-project support handled by **project switcher in dashboard**, not separate domain

### ❌ Status Domain
**Reason:** Status integrated into:
- Step 4 (Timeline & Live Preview) - overall progress
- Step 7 (Live Build) - code status
- Step 8 (Quality & Approvals) - QA status
- Not a separate domain

### ❌ Plan Domain
**Reason:** App plan is **Step 3** in dashboard, not separate domain

### ❌ Admin Domain
**Reason:** Admin tools in separate **SISO Internal** app, not part of client-base

### ❌ Automation Domain
**Reason:** Internal tooling, not client-facing

### ❌ Financial Domain (as separate)
**Reason:** Cost transparency lives inside **Step 5 (Agent & Cost Tracking)** while documents consolidate under **Step 6 (PDR Docs Hub)**

---

## 🎯 Domain Generation Commands

To create the missing domains:

```bash
# Navigate to monorepo root
cd /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-MONOREPO

# Generate auth domain
./scripts/generate-domain.sh client-base auth

# Generate communication domain
./scripts/generate-domain.sh client-base communication

# Generate documents domain
./scripts/generate-domain.sh client-base documents

# Generate tasks domain
./scripts/generate-domain.sh client-base tasks
```

---

## 📊 Integration Points

### Dashboard ↔ Persistent Features

**Communication Integration:**
```typescript
// Dashboard passes current step context to chat
<ChatWidget 
  currentStep={activeStep} 
  projectId={currentProject.id}
  stepData={stepProgress[activeStep].data}
/>

// AI chatbot uses context for relevant help
const contextualHelp = {
  1: "I can help with business information questions",
  2: "Let me suggest design inspirations",
  3: "I can clarify the app plan details",
  // ... etc
}
```

**Documents Integration:**
```typescript
// Each step generates documents
// Step 3 example:
const generateAppPlanPDF = async (planData) => {
  const pdf = await documentGeneration.createPDF({
    template: 'app-plan',
    data: planData,
    projectId: currentProject.id
  })
  
  await documents.save({
    projectId: currentProject.id,
    stepNumber: 3,
    type: 'generated',
    filename: 'app-plan.pdf',
    file: pdf
  })
}
```

**Tasks Integration:**
```typescript
// Tasks appear in Timeline (Step 4) AND separate Tasks page
<TimelineView>
  {milestones.map(milestone => (
    <Milestone>
      <TasksForMilestone milestoneId={milestone.id} />
    </Milestone>
  ))}
</TimelineView>

// Separate tasks page shows all tasks
<TasksPage>
  <TaskList 
    filters={{ projectId, status, priority }}
    groupBy="step" // or "timeline" or "priority"
  />
</TasksPage>
```

---

## 🎨 UI/UX Integration Patterns

### Side Navigation Structure
```
┌─────────────────────────┐
│ Project Switcher        │ ← Multi-project dropdown
├─────────────────────────┤
│ 1. Onboarding       80% │ ← 9 progressive steps
│ 2. Moodboard       100% │   (with completion %)
│ 3. App Plan        100% │
│ 4. Timeline         45% │ ← Current step (highlighted)
│ 5. Agent Teams      20% │
│ 6. Payments         10% │
│ 7. Development   🔒    │ ← Locked steps
│ 8. Testing       🔒    │
│ 9. Launch        🔒    │
├─────────────────────────┤
│ 💬 Communication        │ ← Persistent features
│ 📄 Documents            │   (always accessible)
│ ✓ Tasks (3)             │   (badge shows count)
│ 👤 Profile              │
└─────────────────────────┘
```

### Preview Mode (Unauthenticated)
```
┌────────────────────────────────────┐
│  Dashboard (semi-transparent)      │
│                                    │
│  ╔═══════════════════════════╗    │
│  ║  👋 Welcome!              ║    │
│  ║                           ║    │
│  ║  Login to start building  ║    │
│  ║  your app                 ║    │
│  ║                           ║    │
│  ║  [🔐 Login with Google]   ║    │
│  ║  [ Email/Password ]       ║    │
│  ╚═══════════════════════════╝    │
│                                    │
│  Steps visible but locked...      │
└────────────────────────────────────┘
```

### Floating Chat Widget
```
┌─────────────────────────────────────┐
│ Dashboard Content                   │
│                                     │
│                                     │
│                              ┌────┐ │
│                              │ 💬 │ │ ← Floating widget
│                              └────┘ │   (always visible)
└─────────────────────────────────────┘

Click → Expands to chat window
```

---

## 🚀 Implementation Priority

### Week 1: Foundation
**Days 1-2:** Auth domain
- Google OAuth integration (Supabase)
- Preview mode logic
- Login/register flows
- Session management

**Days 3-4:** Communication domain
- Chat widget UI
- AI chatbot integration
- Context-awareness system
- Support ticket basic structure

**Day 5:** Documents domain scaffold
- Document storage (Supabase)
- Upload/download basic functionality
- Document list view

### Week 2: Core Features
**Days 1-2:** Documents domain complete
- PDF generation for steps
- Version control
- Document library UI
- Integration with dashboard steps

**Days 3-4:** Tasks domain
- Task CRUD operations
- Timeline integration
- Notification system
- Task filtering

**Day 5:** Integration & Testing
- Connect all persistent features to dashboard
- Test preview mode → login flow
- Multi-project switching
- Step unlock logic validation

### Week 3: Dashboard Steps Enhancement
- Enhance existing 9 step domains with:
  - Document generation per step
  - Task creation per step
  - Communication context per step
- Polish UI/UX
- Mobile responsive design

---

## 📋 Success Criteria

### Must Have (Week 1-2)
- [ ] Preview mode works (dashboard visible, interactions blocked)
- [ ] Google OAuth login functional
- [ ] Chat widget accessible from any step
- [ ] Documents can be uploaded/downloaded
- [ ] Tasks can be created and viewed
- [ ] Multi-project switcher works

### Should Have (Week 3)
- [ ] AI chatbot provides contextual help per step
- [ ] Each dashboard step generates relevant documents
- [ ] Tasks integrated into timeline view
- [ ] Mobile responsive design complete

### Nice to Have (Future)
- [ ] CEO escalation workflow
- [ ] Advanced document versioning
- [ ] Task templates and AI-generated tasks
- [ ] Leaderboards and gamification

---

**Document Version:** 1.0  
**Last Updated:** 2025-11-01  
**Status:** Ready for implementation  
**Next Action:** Generate 4 missing domains (auth, communication, documents, tasks)
