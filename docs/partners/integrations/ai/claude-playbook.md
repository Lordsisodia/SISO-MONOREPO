# SISO Partnerships - Claude Code Instructions

## 🎭 **BMAD-METHOD™ REVOLUTIONARY DEVELOPMENT**

**Game-Changer for Partnership Features:** SISO Partnerships leverages BMAD-METHOD™ for context-engineered partnership-focused development that accelerates partner portal features and eliminates information loss.

### **When to Use BMAD (Auto-Suggested)**
- **Partner onboarding workflows** (application, approval, commission setup)
- **Partner dashboard enhancements** (commission tracking, referral analytics)
- **Partner communication features** (notifications, marketing resources, training)
- **Integration features** (commission APIs, affiliate tracking systems)
- **Multi-component partner experiences** (>5 files, complex coordination)

### **BMAD Revolutionary Workflow**
```bash
# Partner Portal Feature Development
*agent analyst     # Partner needs research & feature brief
*agent pm         # Partner-focused PRD creation  
*agent architect  # Partner portal architecture design
*agent ux-expert  # Partner experience optimization
*agent sm         # Context-rich development stories
*agent dev        # Story-driven implementation
*agent qa         # Quality gates throughout
```

### **BMAD Core Files**
- **Agents**: `.bmad-core/agents/` (10 specialist AI agents adapted for partner portal)
- **Workflows**: `.bmad-core/workflows/brownfield-fullstack.yaml` (partner portal enhanced)
- **Documentation**: `docs-bmad/user-guide.md`, `docs-bmad/enhanced-ide-development-workflow.md`
- **Stories**: Stories contain complete implementation context with partner focus

### **Partner Portal BMAD Learnings from SISO-INTERNAL**
1. **Context Preservation** - Critical for partner workflows that span multiple sessions
2. **Partner Journey Mapping** - PRDs must include complete partner experience flows
3. **Story-Driven Development** - Especially important for partner-facing features
4. **Quality Integration** - Partner portal requires higher quality standards
5. **Brownfield Enhancement** - Building on existing partner portal foundation

**Simple Partner Features**: Keep using existing rapid iteration workflow  
**Complex Partner Features**: BMAD eliminates context loss and ensures partner experience consistency

---

## 🏗️ **Partner Portal Architecture**

**Tech Stack (Inherited from SISO-INTERNAL):**
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL (production) / SQLite (development)
- **Styling**: Tailwind CSS + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Components**: Radix UI primitives
- **Partner Auth**: Clerk + Supabase integration

**Partner Portal Specific:**
- **Partner Dashboard**: React + TanStack Query
- **Real-time Updates**: WebSockets for commission notifications
- **File Management**: React Dropzone + Supabase Storage
- **Commission Integration**: Stripe Connect for payouts
- **Communication**: Partner messaging and training system

## 🎯 **Partner Portal Development Conventions**

### Partner-Focused Code Standards
- **TypeScript**: Strict mode enabled - NO `any` types (inherited from SISO-INTERNAL)
- **Testing**: Jest + React Testing Library - ALWAYS write tests for partner features
- **Security**: Enhanced input validation for partner data - NEVER trust partner input
- **Error Handling**: User-friendly error messages for partners
- **Accessibility**: WCAG 2.1 AA compliance - critical for partner portal
- **Performance**: Partner portal must load < 2s (stricter than internal tools)

### Partner Portal File Structure
```
src/
├── components/
│   ├── partner/         # Partner-specific components
│   ├── dashboard/       # Partner dashboard components
│   ├── shared/          # Shared with internal app
│   └── ui/              # Base UI components
├── pages/
│   ├── partner/         # Partner-facing pages
│   ├── onboarding/      # Partner onboarding flow
│   └── dashboard/       # Partner dashboard pages
├── hooks/
│   ├── partner/         # Partner-specific hooks
│   └── shared/          # Shared hooks
├── services/
│   ├── partner-api/     # Partner API calls
│   ├── auth/            # Partner authentication
│   └── notifications/   # Partner notifications
├── types/
│   ├── partner.ts       # Partner data types
│   └── api.ts           # API response types
└── utils/
    ├── partner/         # Partner utility functions
    └── shared/          # Shared utilities
```

### Partner Experience Patterns
- **Progressive Enhancement**: Start with basic functionality, enhance with JS
- **Optimistic Updates**: Immediate feedback for partner actions
- **Error Recovery**: Clear paths for partners to resolve issues
- **Loading States**: Skeleton screens and progress indicators
- **Responsive Design**: Mobile-first for partner portal

## 🔒 **Partner Portal Security Requirements**

### Enhanced Security for Partner Data
- **Multi-layer Validation**: Partner input → Zod → Database constraints
- **Partner Data Isolation**: Strict tenant isolation in database
- **Audit Logging**: All partner actions logged for compliance
- **Session Management**: Secure partner session handling
- **File Upload Security**: Virus scanning, type validation, size limits

### Partner Authentication & Authorization
- **Multi-factor Authentication**: Required for sensitive partner actions
- **Role-based Permissions**: Partner admin vs regular partner users
- **API Rate Limiting**: Prevent partner API abuse
- **Data Encryption**: Partner PII encrypted at rest and in transit

## 📊 **Partner Portal Database Conventions**

### Partner Data Patterns (Enhanced from SISO-INTERNAL)
- **Tenant Isolation**: All partner queries include partner_id filter
- **Soft Deletes**: Partner data never permanently deleted
- **Audit Trails**: createdAt, updatedAt, deletedAt, createdBy, updatedBy
- **Data Retention**: Compliance-aware data lifecycle management

### Partner-Specific Tables
```sql
-- Enhanced from SISO-INTERNAL patterns
partners (id, name, status, commission_rate, settings, created_at, updated_at)
partner_users (id, partner_id, email, role, status)
partner_referrals (id, partner_id, client_id, status, commission_amount, metadata)
partner_commissions (id, partner_id, referral_id, amount, status, paid_at)
partner_communications (id, partner_id, type, content, status)
```

## 🧪 **Partner Portal Testing Requirements**

### Partner Experience Testing (Enhanced from SISO-INTERNAL)
- **Partner Journey Testing**: Full onboarding and dashboard flows
- **Cross-device Testing**: Mobile, tablet, desktop partner experience
- **Accessibility Testing**: Screen readers, keyboard navigation
- **Performance Testing**: Partner portal load times and interactions
- **Security Testing**: Partner data isolation and permissions

### Partner Testing Patterns
```tsx
// Partner component tests (enhanced from SISO-INTERNAL patterns)
describe('PartnerDashboard', () => {
  it('should render partner-specific data', () => {
    // Test partner data isolation
  })
  
  it('should handle partner permissions correctly', () => {
    // Test role-based access
  })
  
  it('should provide accessible partner interface', () => {
    // Test accessibility compliance
  })
})
```

## 🚀 **Partner Portal Development Workflow**

### Before Writing Partner Features

**🎭 For Complex Partner Features (BMAD-Worthy):**
1. **BMAD Planning Phase**: Use `*agent analyst` (partner needs focus) → `*agent pm` → `*agent ux-expert` → `*agent architect`
2. **Partner Journey Mapping**: Use `*agent ux-expert` to map complete partner experience
3. **Story Creation**: Use `*agent sm` to create partner-focused development stories
4. **Implementation**: Follow story-driven development with partner experience context

**⚡ For Simple Partner Features (Rapid Iteration):**
1. **Partner Impact Assessment**: Will this affect partner experience?
2. **Security Review**: Does this handle partner data?
3. **Mobile Consideration**: How does this work on mobile?
4. **Documentation**: Reference partner portal patterns

### Partner Feature Implementation
1. **Partner Types First**: Define partner data interfaces
2. **Security First**: Implement partner data validation and isolation
3. **Accessibility First**: Use semantic HTML and ARIA labels for partners
4. **Mobile First**: Responsive design for partner portal
5. **Tests First**: Write partner experience test cases

### Partner Portal Quality Gates
- [ ] TypeScript compilation with no errors
- [ ] All partner tests passing (unit + integration)
- [ ] ESLint and Prettier compliance
- [ ] Partner accessibility validation (WCAG 2.1 AA)
- [ ] Partner security review (data isolation, permissions)
- [ ] Mobile responsiveness testing
- [ ] Partner performance testing (< 2s load time)

## 🎯 **Partner Portal Production Readiness**

### Partner Portal Deployment Checklist
- [ ] Partner environment variables configured
- [ ] Partner database migrations applied
- [ ] Partner SSL certificates installed
- [ ] Partner error monitoring enabled
- [ ] Partner performance monitoring setup
- [ ] Partner data backup strategies implemented
- [ ] Partner audit logging configured
- [ ] Partner rate limiting configured

### Partner Portal Performance Requirements (Stricter than SISO-INTERNAL)
- First Contentful Paint < 1.2s (vs 1.5s internal)
- Largest Contentful Paint < 2.0s (vs 2.5s internal)
- Partner dashboard interactions < 200ms
- File upload progress indicators
- Real-time notification delivery < 1s

## 🚨 **CRITICAL PARTNER PORTAL SAFETY PROTOCOLS**

### 🛡️ **NEVER BREAK PARTNER EXPERIENCE - Mandatory Safeguards**

**BEFORE making ANY changes to partner-facing features:**

1. **🔍 ALWAYS test with partner perspective**
   - Test as different partner roles (admin, user, viewer)
   - Verify partner data isolation works correctly
   - Test mobile and desktop partner experience

2. **📸 Create partner experience checkpoints**
   - Screenshot partner dashboard before changes
   - Test all partner workflows (onboarding, dashboard, commissions)
   - Verify partner file access and permissions

3. **🧪 Use partner-safe incremental approach**
   - Test with mock partner data first
   - Verify partner permissions at each step
   - NEVER modify partner database directly in production

4. **⛔ FORBIDDEN ACTIONS for partner portal**
   - Exposing internal company data to partners
   - Breaking partner authentication or authorization
   - Modifying partner data without audit trails
   - Removing partner accessibility features
   - Breaking mobile partner experience

### 🔄 **Partner Data Rollback Strategy**

**If ANY partner data issues occur:**
1. **Immediate partner communication** if data is affected
2. **Database rollback** to last known good state
3. **Partner notification** about service restoration
4. **Post-incident analysis** and prevention measures

## 💡 **Partner Portal AI Assistant Guidelines**

When working with Claude Code on partner portal features:
- Always prioritize partner experience and security
- Request partner-specific test scenarios
- Ensure mobile-responsive implementations
- Include partner permission and role checks
- Generate partner-friendly error messages
- Follow partner portal accessibility patterns
- Implement partner data isolation by default
- Consider partner notification and communication needs

## 📈 **Partner Portal Success Metrics**

- Zero partner data leaks or permission issues
- Partner portal load time < 2s
- 95%+ partner accessibility compliance
- Zero partner-affecting security vulnerabilities
- Partner satisfaction score > 4.5/5
- Mobile partner experience parity with desktop
- Partner onboarding completion rate > 80%

---

*Enhanced with BMAD-METHOD™ | Partner Portal Optimized | Built on SISO-INTERNAL Learnings*