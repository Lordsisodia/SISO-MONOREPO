# AI Task Assignment Template

## 🤖 How to Use This Template

This template helps AI agents understand exactly what needs to be done for each task. Copy this template and fill it out for each task assignment.

---

## Task Assignment: [TASK-XXX]

### 📋 Task Overview
**Task ID:** TASK-XXX  
**Task Name:** [Full task name]  
**Priority:** 🔴 Critical / 🟡 High / 🟢 Medium  
**Estimated Time:** X hours/days  
**Assigned To:** [AI Agent Name/Type]  

### 🎯 Objective
[Clear, one-paragraph description of what needs to be accomplished]

### 📍 Current State
```
What exists now:
- [Current file/component]
- [Existing functionality]
- [Known issues]
```

### 🎨 Desired End State
```
What should exist after completion:
- [New/updated files]
- [New functionality]
- [Fixed issues]
- [Performance improvements]
```

### 🔧 Step-by-Step Instructions

#### Step 1: [Action Name]
```bash
# Commands to run
grep -r "pattern" src/
find src/ -name "*.tsx"
```

**Expected Output:**
```
[What the AI should see]
```

**Next Action:**
- If output shows X, do Y
- If output shows Z, do A

#### Step 2: [Create/Update Component]
```typescript
// File: src/components/NewComponent.tsx
// AI should create this exact structure:

import React from 'react';

interface ComponentProps {
  // Define props
}

export const NewComponent: React.FC<ComponentProps> = () => {
  // Implementation
};
```

#### Step 3: [Test Implementation]
```bash
# Run tests
npm test NewComponent.test.tsx
```

**Success Criteria:**
- [ ] All tests pass
- [ ] No console errors
- [ ] Performance < 100ms

### 🧪 Validation Checklist
- [ ] Code follows existing patterns
- [ ] All imports are correct
- [ ] No hardcoded values
- [ ] Responsive design implemented
- [ ] Accessibility standards met
- [ ] Tests written and passing

### 🚨 Common Pitfalls to Avoid
1. **Don't hardcode colors** - Use CSS variables
2. **Don't skip tests** - Every component needs tests
3. **Don't ignore TypeScript errors** - Fix all type issues
4. **Don't create new patterns** - Follow existing code style

### 📝 Code Patterns to Follow

#### Component Pattern
```typescript
// Always use this structure for components
const Component = () => {
  // 1. Hooks first
  const [state, setState] = useState();
  
  // 2. Effects second
  useEffect(() => {}, []);
  
  // 3. Handlers third
  const handleClick = () => {};
  
  // 4. Render last
  return <div>Content</div>;
};
```

#### Style Pattern
```scss
// Always use CSS variables
.component {
  background: var(--background-primary);
  color: var(--text-primary);
  
  &:hover {
    background: var(--background-hover);
  }
}
```

### 🔗 Dependencies
**Must complete first:**
- TASK-XXX: [Dependency name]

**Will block:**
- TASK-YYY: [Dependent task]

### 📊 Performance Requirements
- Load time: < 2 seconds
- Response time: < 100ms
- Memory usage: < 50MB
- Bundle size impact: < 10KB

### 🎯 Definition of Done
A task is ONLY complete when:
1. ✅ All code is written and committed
2. ✅ All tests are passing
3. ✅ Code review comments addressed
4. ✅ Documentation updated
5. ✅ Performance benchmarks met
6. ✅ Accessibility audit passed
7. ✅ Works on all screen sizes
8. ✅ No console errors or warnings

### 💬 Communication
If blocked or confused:
1. First check existing code for patterns
2. Review similar components
3. Ask specific questions like:
   - "Where should I place this file?"
   - "What naming convention for X?"
   - "How to handle error state?"

### 🔍 Resources
- Design mockup: [Link/Location]
- API documentation: [Link]
- Similar examples: [File paths]
- Style guide: [Link]

---

## Example Filled Template

### Task Assignment: TASK-001

### 📋 Task Overview
**Task ID:** TASK-001  
**Task Name:** Logo Implementation  
**Priority:** 🔴 Critical  
**Estimated Time:** 2 hours  
**Assigned To:** Frontend Implementation Agent  

### 🎯 Objective
Replace the broken logo across all pages with the new SVG logo files, ensuring responsive sizing and proper hover effects.

### 📍 Current State
```
What exists now:
- Broken/missing logo image
- Logo component may or may not exist
- SVG files created: siso-logo.svg, siso-logo-simplified.svg
```

### 🎨 Desired End State
```
What should exist after completion:
- Logo.tsx component in src/components/
- Logo visible on all pages
- Responsive from mobile to desktop
- Hover effect implemented
- Accessibility attributes added
```

### 🔧 Step-by-Step Instructions

#### Step 1: Find Current Logo Usage
```bash
grep -r "logo" --include="*.tsx" --include="*.jsx" src/
grep -r "Logo" --include="*.tsx" --include="*.jsx" src/
```

**Expected Output:**
```
src/components/Header.tsx: <img src="/logo.png" alt="Logo" />
src/pages/index.tsx: import logo from '../assets/logo.png'
```

**Next Action:**
- Note all files that reference logo
- Plan to update each reference

#### Step 2: Create Logo Component
[Continue with specific implementation...]

---

*Use this template to ensure AI agents have all the information needed to successfully complete tasks.*