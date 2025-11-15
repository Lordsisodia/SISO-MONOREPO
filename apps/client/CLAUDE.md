# SISO Client Base - Claude Code Instructions

## 🎭 **BMAD-METHOD™ REVOLUTIONARY DEVELOPMENT**

**Game-Changer for Client Portal Features:** SISO Client Base leverages BMAD-METHOD™ for context-engineered client-focused development that accelerates client portal features and eliminates information loss.

### **When to Use BMAD (Auto-Suggested)**
- **Client onboarding workflows** (multi-step registration, verification)
- **Client dashboard enhancements** (new widgets, complex data views)
- **Client communication features** (messaging, notifications, reporting)
- **Integration features** (external APIs, payment systems)
- **Multi-component client experiences** (>5 files, complex coordination)

### **BMAD Revolutionary Workflow**
```bash
# Client Portal Feature Development
*agent analyst     # Client needs research & feature brief
*agent pm         # Client-focused PRD creation  
*agent architect  # Client portal architecture design
*agent ux-expert  # Client experience optimization
*agent sm         # Context-rich development stories
*agent dev        # Story-driven implementation
*agent qa         # Quality gates throughout
```

### **BMAD Core Files**
- **Agents**: `.bmad-core/agents/` (10 specialist AI agents adapted for client portal)
- **Workflows**: `.bmad-core/workflows/brownfield-fullstack.yaml` (client portal enhanced)
- **Documentation**: `docs-bmad/user-guide.md`, `docs-bmad/enhanced-ide-development-workflow.md`
- **Stories**: Stories contain complete implementation context with client focus

### **Client Portal BMAD Learnings from SISO-INTERNAL**
1. **Context Preservation** - Critical for client workflows that span multiple sessions
2. **Client Journey Mapping** - PRDs must include complete client experience flows
3. **Story-Driven Development** - Especially important for client-facing features
4. **Quality Integration** - Client portal requires higher quality standards
5. **Brownfield Enhancement** - Building on existing client portal foundation

**Simple Client Features**: Keep using existing rapid iteration workflow  
**Complex Client Features**: BMAD eliminates context loss and ensures client experience consistency

---

## 🏗️ **Client Portal Architecture**

**Tech Stack (Inherited from SISO-INTERNAL):**
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL (production) / SQLite (development)
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Components**: Radix UI primitives
- **Client Auth**: Clerk + Supabase integration

**Client Portal Specific:**
- **Client Dashboard**: React + TanStack Query
- **Real-time Updates**: WebSockets for client notifications
- **File Management**: React Dropzone + Supabase Storage
- **Payment Integration**: Stripe (future)
- **Communication**: In-app messaging system

## 🎯 **Client Portal Development Conventions**

### Client-Focused Code Standards
- **TypeScript**: Strict mode enabled - NO `any` types (inherited from SISO-INTERNAL)
- **Testing**: Jest + React Testing Library - ALWAYS write tests for client features
- **Security**: Enhanced input validation for client data - NEVER trust client input
- **Error Handling**: User-friendly error messages for clients
- **Accessibility**: WCAG 2.1 AA compliance - critical for client portal
- **Performance**: Client portal must load < 2s (stricter than internal tools)

### Client Portal File Structure
```
src/
├── components/
│   ├── client/          # Client-specific components
│   ├── dashboard/       # Client dashboard components
│   ├── shared/          # Shared with internal app
│   └── ui/              # Base UI components
├── pages/
│   ├── client/          # Client-facing pages
│   ├── onboarding/      # Client onboarding flow
│   └── dashboard/       # Client dashboard pages
├── hooks/
│   ├── client/          # Client-specific hooks
│   └── shared/          # Shared hooks
├── services/
│   ├── client-api/      # Client API calls
│   ├── auth/            # Client authentication
│   └── notifications/   # Client notifications
├── types/
│   ├── client.ts        # Client data types
│   └── api.ts           # API response types
└── utils/
    ├── client/          # Client utility functions
    └── shared/          # Shared utilities
```

### Client Experience Patterns
- **Progressive Enhancement**: Start with basic functionality, enhance with JS
- **Optimistic Updates**: Immediate feedback for client actions
- **Error Recovery**: Clear paths for clients to resolve issues
- **Loading States**: Skeleton screens and progress indicators
- **Responsive Design**: Mobile-first for client portal

## 🔒 **Client Portal Security Requirements**

### Enhanced Security for Client Data
- **Multi-layer Validation**: Client input → Zod → Database constraints
- **Client Data Isolation**: Strict tenant isolation in database
- **Audit Logging**: All client actions logged for compliance
- **Session Management**: Secure client session handling
- **File Upload Security**: Virus scanning, type validation, size limits

### Client Authentication & Authorization
- **Multi-factor Authentication**: Required for sensitive client actions
- **Role-based Permissions**: Client admin vs regular client users
- **API Rate Limiting**: Prevent client API abuse
- **Data Encryption**: Client PII encrypted at rest and in transit

## 📊 **Client Portal Database Conventions**

### Client Data Patterns (Enhanced from SISO-INTERNAL)
- **Tenant Isolation**: All client queries include client_id filter
- **Soft Deletes**: Client data never permanently deleted
- **Audit Trails**: createdAt, updatedAt, deletedAt, createdBy, updatedBy
- **Data Retention**: Compliance-aware data lifecycle management

### Client-Specific Tables
```sql
-- Enhanced from SISO-INTERNAL patterns
clients (id, name, status, settings, created_at, updated_at)
client_users (id, client_id, email, role, status)
client_projects (id, client_id, name, status, metadata)
client_files (id, client_id, project_id, filename, url, metadata)
client_communications (id, client_id, type, content, status)
```

## 🧪 **Client Portal Testing Requirements**

### Client Experience Testing (Enhanced from SISO-INTERNAL)
- **Client Journey Testing**: Full onboarding and dashboard flows
- **Cross-device Testing**: Mobile, tablet, desktop client experience
- **Accessibility Testing**: Screen readers, keyboard navigation
- **Performance Testing**: Client portal load times and interactions
- **Security Testing**: Client data isolation and permissions

### Client Testing Patterns
```tsx
// Client component tests (enhanced from SISO-INTERNAL patterns)
describe('ClientDashboard', () => {
  it('should render client-specific data', () => {
    // Test client data isolation
  })
  
  it('should handle client permissions correctly', () => {
    // Test role-based access
  })
  
  it('should provide accessible client interface', () => {
    // Test accessibility compliance
  })
})
```

## 🚀 **Client Portal Development Workflow**

### Before Writing Client Features

**🎭 For Complex Client Features (BMAD-Worthy):**
1. **BMAD Planning Phase**: Use `*agent analyst` (client needs focus) → `*agent pm` → `*agent ux-expert` → `*agent architect`
2. **Client Journey Mapping**: Use `*agent ux-expert` to map complete client experience
3. **Story Creation**: Use `*agent sm` to create client-focused development stories
4. **Implementation**: Follow story-driven development with client experience context

**⚡ For Simple Client Features (Rapid Iteration):**
1. **Client Impact Assessment**: Will this affect client experience?
2. **Security Review**: Does this handle client data?
3. **Mobile Consideration**: How does this work on mobile?
4. **Documentation**: Reference client portal patterns

### Client Feature Implementation
1. **Client Types First**: Define client data interfaces
2. **Security First**: Implement client data validation and isolation
3. **Accessibility First**: Use semantic HTML and ARIA labels for clients
4. **Mobile First**: Responsive design for client portal
5. **Tests First**: Write client experience test cases

### Client Portal Quality Gates
- [ ] TypeScript compilation with no errors
- [ ] All client tests passing (unit + integration)
- [ ] ESLint and Prettier compliance
- [ ] Client accessibility validation (WCAG 2.1 AA)
- [ ] Client security review (data isolation, permissions)
- [ ] Mobile responsiveness testing
- [ ] Client performance testing (< 2s load time)

## 🎯 **Client Portal Production Readiness**

### Client Portal Deployment Checklist
- [ ] Client environment variables configured
- [ ] Client database migrations applied
- [ ] Client SSL certificates installed
- [ ] Client error monitoring enabled
- [ ] Client performance monitoring setup
- [ ] Client data backup strategies implemented
- [ ] Client audit logging configured
- [ ] Client rate limiting configured

### Client Portal Performance Requirements (Stricter than SISO-INTERNAL)
- First Contentful Paint < 1.2s (vs 1.5s internal)
- Largest Contentful Paint < 2.0s (vs 2.5s internal)
- Client dashboard interactions < 200ms
- File upload progress indicators
- Real-time notification delivery < 1s

## 🚨 **CRITICAL CLIENT PORTAL SAFETY PROTOCOLS**

### 🛡️ **NEVER BREAK CLIENT EXPERIENCE - Mandatory Safeguards**

**BEFORE making ANY changes to client-facing features:**

1. **🔍 ALWAYS test with client perspective**
   - Test as different client roles (admin, user, viewer)
   - Verify client data isolation works correctly
   - Test mobile and desktop client experience

2. **📸 Create client experience checkpoints**
   - Screenshot client dashboard before changes
   - Test all client workflows (onboarding, dashboard, communications)
   - Verify client file access and permissions

3. **🧪 Use client-safe incremental approach**
   - Test with mock client data first
   - Verify client permissions at each step
   - NEVER modify client database directly in production

4. **⛔ FORBIDDEN ACTIONS for client portal**
   - Exposing internal company data to clients
   - Breaking client authentication or authorization
   - Modifying client data without audit trails
   - Removing client accessibility features
   - Breaking mobile client experience

### 🔄 **Client Data Rollback Strategy**

**If ANY client data issues occur:**
1. **Immediate client communication** if data is affected
2. **Database rollback** to last known good state
3. **Client notification** about service restoration
4. **Post-incident analysis** and prevention measures

## 💡 **Client Portal AI Assistant Guidelines**

When working with Claude Code on client portal features:
- Always prioritize client experience and security
- Request client-specific test scenarios
- Ensure mobile-responsive implementations
- Include client permission and role checks
- Generate client-friendly error messages
- Follow client portal accessibility patterns
- Implement client data isolation by default
- Consider client notification and communication needs

## 📈 **Client Portal Success Metrics**

- Zero client data leaks or permission issues
- Client portal load time < 2s
- 95%+ client accessibility compliance
- Zero client-affecting security vulnerabilities
- Client satisfaction score > 4.5/5
- Mobile client experience parity with desktop
- Client onboarding completion rate > 80%

---

*Enhanced with BMAD-METHOD™ | Client Portal Optimized | Built on SISO-INTERNAL Learnings*