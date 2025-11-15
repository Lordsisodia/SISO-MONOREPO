# Client Base Implementation Roadmap

## 📋 Executive Summary

We're building a **try-before-you-commit progressive unlock dashboard** for clients to build their apps step-by-step.

**Current Status:** 
- ✅ Dashboard shell with 9 progressive steps created
- ✅ Profile domain created
- ✅ Comprehensive documentation complete
- 🔴 Need 4 critical domains: auth, communication, documents, tasks

---

## 🎯 What We're Building

### Core Experience
1. **Preview Mode** - Users see full dashboard before logging in
2. **One-Click Login** - Google OAuth, no multi-step onboarding
3. **Progressive Unlock** - 9 steps unlock as clients progress
4. **Multi-Project Support** - Clients can have multiple apps being built
5. **Persistent Features** - Chat, docs, tasks accessible throughout

### The 9 Steps
1. **Onboarding** - Business info (conversational, not forms)
2. **Moodboard** - Design preferences (5+ images)
3. **App Plan** - AI-generated plan + approval (gateway)
4. **Timeline** - 46-step PDR visualization
5. **Agent Teams** - AI agents working on project
6. **Payments** - Invoices + Stripe integration
7. **Development** - Build status + wireframes
8. **Testing** - QA dashboard + bug tracking
9. **Launch** - Go-live + monitoring

### Persistent Features (Not Steps)
- **Communication** - AI chatbot + CEO escalation
- **Documents** - Generated PDFs + client uploads
- **Tasks** - Action items across all steps
- **Profile** - Settings + edit completed steps

---

## 🚧 What We Need to Build

### Domain Generation Commands
```bash
cd /Users/shaansisodia/DEV/SISO-ECOSYSTEM/SISO-MONOREPO

# Generate 4 missing domains
./scripts/generate-domain.sh client-base auth
./scripts/generate-domain.sh client-base communication
./scripts/generate-domain.sh client-base documents
./scripts/generate-domain.sh client-base tasks
```

---

## 📅 Implementation Timeline

### Week 1: Foundation (Auth + Communication)

#### Days 1-2: Auth Domain
**Goal:** Preview mode + Google OAuth login

**Tasks:**
- [ ] Supabase Google OAuth configuration
- [ ] Preview mode logic (dashboard visible, interactions blocked)
- [ ] Login prompt component (appears on any interaction)
- [ ] Google login button component
- [ ] Email/password fallback (optional)
- [ ] Session management (Supabase)
- [ ] AuthGuard component (protect routes)
- [ ] useAuth hook
- [ ] usePreviewMode hook

**Files to Create:**
- `auth/components/GoogleLoginButton.tsx`
- `auth/components/LoginPrompt.tsx`
- `auth/components/AuthGuard.tsx`
- `auth/hooks/useAuth.ts`
- `auth/hooks/useSupabaseAuth.ts`
- `auth/hooks/usePreviewMode.ts`
- `auth/server/supabaseClient.ts`
- `auth/types/auth.ts`

**Integration Points:**
- Dashboard wraps content in preview mode overlay
- Any interaction → `<LoginPrompt />` modal
- After login → restore to current view

---

#### Days 3-4: Communication Domain
**Goal:** Context-aware AI chatbot + support

**Tasks:**
- [ ] Floating chat widget UI
- [ ] Chat window (full page view)
- [ ] Message list component
- [ ] Message input with AI streaming
- [ ] Context awareness (knows current step)
- [ ] Step-specific help system
- [ ] CEO escalation workflow
- [ ] Support ticket system (via chat)
- [ ] WebSocket real-time updates

**Files to Create:**
- `communication/components/ChatWidget.tsx`
- `communication/components/ChatWindow.tsx`
- `communication/components/MessageList.tsx`
- `communication/components/MessageInput.tsx`
- `communication/components/ContextualHelp.tsx`
- `communication/hooks/useChat.ts`
- `communication/hooks/useAIContext.ts`
- `communication/server/aiChatbot.ts`
- `communication/server/realtime.ts`
- `communication/types/communication.ts`

**Context System:**
```typescript
// AI knows which step user is on
const contextualPrompts = {
  1: "You're helping with business information collection",
  2: "You're helping with design preferences and moodboard",
  3: "You're explaining the app plan and answering questions",
  4: "You're providing timeline and milestone information",
  // ... etc
}
```

**Integration Points:**
- Floating widget in dashboard (bottom right)
- Side nav link to full chat page
- Badge shows unread message count
- Notifications for new AI messages

---

#### Day 5: Documents Domain (Scaffold)
**Goal:** Basic upload/download + storage

**Tasks:**
- [ ] Supabase Storage configuration
- [ ] Document upload component
- [ ] Document list view
- [ ] Download functionality
- [ ] File type validation
- [ ] Storage bucket organization (by project + step)

**Files to Create:**
- `documents/components/DocumentUpload.tsx`
- `documents/components/DocumentList.tsx`
- `documents/hooks/useDocuments.ts`
- `documents/hooks/useUpload.ts`
- `documents/server/documentStorage.ts`
- `documents/types/documents.ts`

---

### Week 2: Core Features (Documents + Tasks)

#### Days 1-2: Documents Domain (Complete)
**Goal:** Generated PDFs + document library

**Tasks:**
- [ ] PDF generation library integration
- [ ] Document templates per step
- [ ] Document library UI (all docs in one place)
- [ ] Version history tracking
- [ ] Search and filter
- [ ] Organization by step/category
- [ ] Preview modal for PDFs/images

**Step-Specific Documents:**
```typescript
const stepDocuments = {
  1: ['business-requirements.pdf'],
  2: ['design-brief.pdf', 'brand-assets.zip'],
  3: ['app-plan.pdf', 'cost-estimate.pdf'],
  4: ['project-timeline.pdf'],
  5: ['agent-activity-report.pdf'],
  6: ['invoices/*.pdf'],
  7: ['technical-specs.pdf', 'wireframes.zip'],
  8: ['test-reports.pdf', 'bug-summary.pdf'],
  9: ['launch-checklist.pdf', 'monitoring-setup.pdf']
}
```

**Files to Create:**
- `documents/components/DocumentLibrary.tsx`
- `documents/components/DocumentPreview.tsx`
- `documents/components/VersionHistory.tsx`
- `documents/hooks/useDocumentGeneration.ts`
- `documents/server/documentGeneration.ts`
- `documents/server/versionControl.ts`

**Integration Points:**
- Each dashboard step can generate documents
- Documents side nav shows count badge
- Document library groups by step
- Generated docs auto-saved to project

---

#### Days 3-4: Tasks Domain
**Goal:** Action items + timeline integration

**Tasks:**
- [ ] Task CRUD operations
- [ ] Task list component
- [ ] Task item with status tracking
- [ ] Task creator form
- [ ] Filters (by step, status, priority)
- [ ] Timeline integration view
- [ ] AI-generated tasks system
- [ ] Task notifications
- [ ] Due date reminders

**Task Sources:**
```typescript
interface Task {
  id: string
  projectId: string
  stepNumber: number // which step it belongs to
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate?: Date
  assignedTo: 'client' | 'ai' | 'team'
  source: 'ai-generated' | 'manual' | 'timeline-milestone'
}
```

**Files to Create:**
- `tasks/components/TaskList.tsx`
- `tasks/components/TaskItem.tsx`
- `tasks/components/TaskCreator.tsx`
- `tasks/components/TaskFilters.tsx`
- `tasks/components/TimelineTasksView.tsx`
- `tasks/hooks/useTasks.ts`
- `tasks/hooks/useTasksForStep.ts`
- `tasks/hooks/useTaskNotifications.ts`
- `tasks/server/taskActions.ts`
- `tasks/server/taskGeneration.ts`
- `tasks/types/tasks.ts`

**Integration Points:**
- Tasks side nav shows count badge
- Step 4 (Timeline) embeds tasks within milestones
- Separate tasks page shows all tasks
- AI generates tasks based on step progress

---

#### Day 5: Integration & Testing
**Goal:** Connect everything together

**Tasks:**
- [ ] Dashboard shell integrates all persistent features
- [ ] Side navigation with badges (task count, unread messages)
- [ ] Preview mode → login → dashboard flow
- [ ] Multi-project switcher
- [ ] Step unlock logic testing
- [ ] Mobile responsive design
- [ ] Error boundaries
- [ ] Loading states

---

### Week 3: Dashboard Steps Enhancement

#### Days 1-5: Enhance 9 Steps
**Goal:** Each step generates docs, tasks, and uses chat

**Per Step Integration:**
```typescript
// Example: Step 3 (App Plan)
const AppPlanStep = () => {
  // Generate app plan document when approved
  const handleApproval = async () => {
    // Generate PDF
    await documents.generate({
      template: 'app-plan',
      data: planData
    })
    
    // Create tasks for next steps
    await tasks.generate({
      step: 3,
      tasks: [
        'Review timeline in Step 4',
        'Check payment details in Step 6',
        'Meet AI agent team in Step 5'
      ]
    })
    
    // Unlock steps 4, 5, 6
    await unlockSteps([4, 5, 6])
  }
}
```

**Tasks:**
- [ ] Step 1: Generate business requirements PDF
- [ ] Step 2: Save uploaded design assets
- [ ] Step 3: Generate app plan PDF + cost estimate
- [ ] Step 4: Integrate tasks into timeline view
- [ ] Step 5: Generate agent activity reports
- [ ] Step 6: Generate invoices
- [ ] Step 7: Add wireframe uploads
- [ ] Step 8: Generate test reports
- [ ] Step 9: Generate launch documentation

---

## 🎨 UI/UX Specifications

### Preview Mode Design
```
┌──────────────────────────────────────────┐
│ [SISO Logo]          [Login] [Sign Up]  │
├──────────────────────────────────────────┤
│                                          │
│  ┌────────┐  Dashboard (Preview)        │
│  │  1     │  ← Semi-transparent         │
│  │  2     │  ← Steps visible            │
│  │  3     │  ← But locked               │
│  │  ...   │                             │
│  └────────┘                              │
│                                          │
│  [Try any step to see what you'll get]  │
│                                          │
└──────────────────────────────────────────┘

User clicks step → Login prompt appears
```

### Authenticated Dashboard
```
┌─────────────┬────────────────────────────┐
│ Project: ▼  │  Step 4: Timeline          │
├─────────────┤                            │
│ 1. ✓ 100%   │  ┌─────────────────────┐  │
│ 2. ✓ 100%   │  │ Milestone 1         │  │
│ 3. ✓ 100%   │  │ ├ Task 1 (done)     │  │
│ 4. → 45%    │  │ ├ Task 2 (in prog)  │  │
│ 5. ⚪ 20%    │  │ └ Task 3 (todo)     │  │
│ 6. ⚪ 10%    │  └─────────────────────┘  │
│ 7. 🔒       │                            │
│ 8. 🔒       │  Timeline visualization... │
│ 9. 🔒       │                            │
├─────────────┤                            │
│ 💬 Chat (2) │                            │
│ 📄 Docs     │                            │
│ ✓ Tasks(3)  │                            │
│ 👤 Profile  │                            │
└─────────────┴────────────────────────────┘
                        │
                        └─ Floating chat: 💬
```

---

## 🔐 Security Considerations

### Authentication
- Google OAuth via Supabase (primary)
- Email/password (fallback)
- Session tokens (httpOnly cookies)
- CSRF protection

### Data Access
- Row Level Security (RLS) on Supabase
- Projects scoped to authenticated user
- Documents encrypted at rest
- API rate limiting

### Preview Mode Safety
- No data saved in preview mode
- No API calls without auth token
- Client-side only rendering
- Clear localStorage on logout

---

## 📊 Success Metrics

### Week 1 Goals
- [ ] User can see preview dashboard
- [ ] Login with Google works
- [ ] Chat widget appears and responds
- [ ] Can upload/download a document

### Week 2 Goals
- [ ] Document library shows all docs
- [ ] Tasks can be created and completed
- [ ] Timeline shows tasks per milestone
- [ ] Multi-project switching works

### Week 3 Goals
- [ ] Each step generates relevant documents
- [ ] AI chat provides contextual help
- [ ] Mobile responsive works well
- [ ] All 9 steps functional

---

## 🚀 Launch Checklist

### Phase 1: MVP (End of Week 2)
- [ ] Preview mode working
- [ ] Google OAuth login
- [ ] Basic chat functionality
- [ ] Document upload/download
- [ ] Task creation
- [ ] 9 steps with basic content

### Phase 2: Polish (Week 3)
- [ ] AI context awareness
- [ ] Document generation per step
- [ ] Timeline-tasks integration
- [ ] Mobile responsive
- [ ] Error handling
- [ ] Loading states

### Phase 3: Production (Week 4+)
- [ ] Real AI chatbot integration
- [ ] CEO escalation workflow
- [ ] Payment processing (Stripe)
- [ ] Email notifications
- [ ] Analytics tracking
- [ ] Performance optimization

---

## 📞 Questions to Resolve

### Immediate (Before Week 1)
- ✅ What auth providers? → Google OAuth primary
- ✅ Multi-project support? → Yes, project switcher
- ✅ Where are documents stored? → Supabase Storage
- ✅ How does chat escalate to CEO? → Via chat interface

### Near-term (Week 1-2)
- Which AI model for chatbot? (GPT-4? Claude?)
- Document storage limits per project?
- Task notification preferences?
- Should chat history persist across sessions?

### Future (Week 3+)
- Referral/leaderboard system details?
- White-label support for agencies?
- Multi-user collaboration per project?
- API access for integrations?

---

**Roadmap Version:** 1.0  
**Last Updated:** 2025-11-01  
**Status:** Ready to begin Week 1  
**Next Action:** Generate 4 missing domains and start auth implementation
