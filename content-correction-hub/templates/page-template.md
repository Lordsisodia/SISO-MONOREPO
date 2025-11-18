# Page Template: [PAGE NAME]

**Use this template for detailed analysis and planning of individual pages**

## Page Metadata
- **Page Name**: 
- **Route**: `/partners/...`
- **File**: `src/...` (link to TSX file)
- **Section**: Academy/Community/Settings/etc.
- **Status**: planning / content needed / blocked / ready
- **Priority**: release-critical / next milestone / nice-to-have

## Simple Questions (AI asks you these)
*Provide quick, intuitive answers - AI handles all the complexity*

1. **What should this page do?** (One sentence goal)
2. **Who uses it?** (Just describe the user)
3. **What's working now?** (What parts are actually done)
4. **What's broken/missing?** (Quick list of problems)
5. **What data should show here?** (Just describe in plain English)
6. **Who needs to approve this?** (Legal, subject experts, etc.)

## AI Analysis (AI fills this automatically)

### Current State Assessment
- **Component Analysis**: AI scans existing components and their current state
- **Content Audit**: AI identifies all placeholder/mock content
- **Performance Review**: AI assesses loading times and potential issues
- **Accessibility Check**: AI evaluates current accessibility compliance

### Technical Requirements
- **Data Needs**: AI translates your data requirements into technical specifications
- **Component Specifications**: AI defines what each UI component needs to display
- **Integration Points**: AI identifies required APIs and external services
- **State Management**: AI plans how components share and update data

## Page Overview
- **Page Goal**: What primary outcome or behavior should this page drive?
- **Persona & Story**: Who is the audience, and what context do they already have when they arrive?
- **Success Metrics**: How will we know this page is successful?

## Component Structure

### Component Map
*AI fills current state from code analysis, you provide target state*

| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|-------------------|-------------------|------------|
| *AI analyzes codebase* | *Your target description* | *AI suggests based on goals* | *AI identifies responsible team* |
|  |  |  |  |  |

### Component Details
*For each component above, AI will generate these specifications:*

#### [Component Name]
- **Purpose**: What this component does on the page
- **Current Implementation**: What exists now (from code analysis)
- **Required Data**: What information this component needs to display
- **User Interactions**: Clicks, forms, navigation, etc.
- **Error States**: What happens when data is missing or fails
- **Accessibility Requirements**: ARIA labels, keyboard navigation
- **Performance Considerations**: Loading strategy, optimization needs

## Data & Content Planning

### Content Requirements
- **Static Content**: Headings, descriptions, instructions (needs copywriting)
- **Dynamic Content**: Data that changes based on user/actions
- **User-Generated Content**: Forms, comments, uploads
- **Media Assets**: Images, videos, icons needed

### Technical Data Plan
*AI generates this based on your requirements*

#### Database Schema
- **Tables Needed**: What database tables this page requires
- **Relationships**: How tables connect to each other
- **Row Level Security**: What data users can/cannot see
- **Performance Indexes**: What needs to be optimized for speed

#### API Requirements
- **Endpoints**: What APIs this page needs to call
- **Data Format**: Request/response structure for each endpoint
- **Caching Strategy**: What data can be cached and for how long
- **Error Handling**: How API failures are handled

#### Real-time Updates
- **WebSocket Needs**: What data needs to update live
- **Subscription Strategy**: What changes users should see immediately
- **Fallback Plan**: What happens when real-time fails

## Implementation Checklist

### Pre-Implementation
- [ ] **Requirements Clear**: All questions answered and specifications documented
- [ ] **Design Finalized**: UI mockups approved by stakeholders
- [ ] **Data Sources Confirmed**: APIs/database tables accessible
- [ ] **Dependencies Identified**: What this page depends on
- [ ] **Resources Allocated**: Development team and timeline confirmed

### Development Phase
- [ ] **Database Setup**: Tables created and initial data populated
- [ ] **API Development**: All required endpoints built and tested
- [ ] **Component Development**: UI components built according to specifications
- [ ] **Integration**: Components connected to APIs and data sources
- [ ] **State Management**: Data flow and updates working correctly

### Content Integration
- [ ] **Placeholder Removal**: All mock/placeholder content replaced
- [ ] **Real Data Integration**: Live data flowing to all components
- [ ] **Content Review**: Stakeholders approve all text and media
- [ ] **Legal Review**: Compliance checks completed if needed
- [ ] **Localization**: Multi-language support if required

### Testing & Quality Assurance
- [ ] **Functionality Testing**: All features work as expected
- [ ] **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge compatibility
- [ ] **Mobile Testing**: Responsive design works on all devices
- [ ] **Accessibility Testing**: WCAG compliance verified
- [ ] **Performance Testing**: Load times meet requirements
- [ ] **User Acceptance Testing**: Actual users validate the experience

### Launch Preparation
- [ ] **Final QA**: No critical bugs or issues
- [ ] **Documentation**: Technical and user documentation complete
- [ ] **Monitoring Setup**: Error tracking and performance monitoring active
- [ ] **Rollback Plan**: What to do if launch has issues
- [ ] **Team Briefing**: Everyone knows their role during launch

## Validation & Decision Gates

### Key Validation Questions
- **Does this solve the right problem?**: Does this page actually help users achieve their primary goal?
- **Is the core problem solved?**: Can users successfully complete their main task?
- **Is the content ready?**: All copy reviewed, accurate, and appropriate?
- **Is the UI working?**: All components display correctly and transitions work?
- **Should we pivot or continue?**: Is the approach working or do we need to change direction?

### UI/UX Performance Check
- **Visual Polish**: Do all components look complete and professional?
- **Content Readability**: Is text clear, scannable, and easy to understand?
- **Interactive Elements**: Do buttons, links, and forms work smoothly?
- **Loading States**: Do skeleton/placeholder states look good?
- **Responsive Behavior**: Does layout work well on mobile, tablet, desktop?

### Go/No-Go Decision
- **✅ Ready for backend**: UI/content complete, proceed to functionality development
- **🔄 Needs iteration**: Content or UI needs refinement before backend work
- **⚠️ Direction change**: Current approach not working, pivot to different solution

## Success Criteria

### Technical Success
- [ ] **Performance**: Page loads within [X] seconds
- [ ] **Reliability**: Error rate less than [X]%
- [ ] **Accessibility**: WCAG [AA/AAA] compliance achieved
- [ ] **Security**: No vulnerabilities, data properly protected

### User Experience Success
- [ ] **Task Completion**: Users can successfully complete primary goals
- [ ] **Usability**: Users find the page intuitive and easy to use
- [ ] **Satisfaction**: User feedback meets or exceeds expectations
- [ ] **Accessibility**: Users with disabilities can use all features

### Business Success
- [ ] **Engagement**: Metrics meet or exceed targets (time on page, interaction rate)
- [ ] **Conversion**: Desired actions taken (form submission, navigation to next step)
- [ ] **Content Quality**: All information accurate and helpful
- [ ] **Stakeholder Approval**: Business owners satisfied with results

## Supporting Context

### Related Resources
- **Design Files**: Link to Figma/mockups
- **Documentation**: Technical specs, user guides
- **Analytics**: Current performance metrics, goals
- **User Research**: Feedback, testing results, user personas

### Stakeholder Information
- **Business Owner**: 
- **Content Approver**: 
- **Technical Lead**: 
- **Design Reviewer**: 
- **Test Coordinator**: 

### Dependencies
- **Upstream Dependencies**: What needs to be completed before this page
- **Downstream Dependencies**: What depends on this page being completed
- **Parallel Work**: What can be worked on simultaneously
- **External Dependencies**: Third-party services, APIs, content

### Risk Assessment
- **Technical Risks**: Complexity, new technology, performance challenges
- **Content Risks**: Approval delays, accuracy concerns, localization needs
- **Timeline Risks**: Resource constraints, dependency delays, scope creep
- **Mitigation Strategies**: How to address each identified risk

---

## Your Validation Workflow

Since you're the validator and focusing on UI/content before backend:

### Step 1: Content & UI Validation
- [ ] **Problem-Solution Fit**: Does this page solve the intended problem well?
- [ ] **Content Accuracy**: Is all information correct and helpful?
- [ ] **UI Polish**: Do all components look and feel complete?
- [ ] **User Flow**: Does navigation and interaction make sense?

### Step 2: Make Decision
- **✅ Ready for backend**: Mark as ready, proceed to functionality development
- **🔄 Needs iteration**: Identify what needs to change, iterate on UI/content
- **⚠️ Direction change**: Fundamentally rethink the approach

### Step 3: Document Backend Requirements
- [ ] **Data Needs**: Exactly what data this page will need from backend
- [ ] **Edge Cases**: What should happen with empty/missing data
- [ ] **Performance Notes**: Any UI considerations for backend implementation

---

## Example: Academy Dashboard

### Page Metadata
- **Page Name**: Academy Dashboard
- **Route**: `/partners/academy`
- **File**: `src/app/partners/academy/page.tsx`
- **Section**: Academy
- **Status**: content needed
- **Priority**: release-critical

### Simple Questions
1. **What should this page do?** Show partners their learning progress and recommend next steps
2. **Who uses it?** Active partners looking to improve their partnership performance
3. **What's working now?** Layout is good, components are built, navigation works
4. **What's broken/missing?** All metrics are hardcoded, no real progress data, course recommendations are generic
5. **What data should show here?** Real progress percentages, completed courses, recommended next courses, upcoming training
6. **Who needs to approve this?** Learning & Development team, technical lead, business owner

### AI Analysis Results

#### Current State Assessment
- **Component Analysis**: HeroCard, QuickLinks, CourseProgress, Recommendations all exist but use static data
- **Content Audit**: All numbers are placeholders ($12,500 earnings, 3 courses completed, etc.)
- **Performance Review**: Loads in 1.2s, components optimized
- **Accessibility Check**: Mostly compliant, missing ARIA labels on progress bars

#### Technical Requirements
- **Data Needs**: User progress table, course completion data, recommendation algorithm
- **Component Specifications**: HeroCard needs live metrics, CourseProgress needs percentage calculations
- **Integration Points**: User profile API, course database, analytics tracking
- **State Management**: Progress data should update in real-time, cache for 5 minutes

### Component Structure

| Component | Current State (AI) | Target State (You) | Suggested CTA (AI) | Owner (AI) |
|-----------|-------------------|-------------------|-------------------|------------|
| HeroCard | Static "$12,500 earnings" | Live progress metrics with chart | "View detailed progress" | L&D Team |
| QuickLinks | Hard-coded navigation items | Dynamic based on user progress | Navigate to relevant content | Product Team |
| CourseProgress | "3 courses completed" placeholder | Real completion percentages | "Continue learning" | Frontend Team |
| Recommendations | Generic course list | Personalized recommendations | "Start recommended course" | Algorithm Team |

### Validation Status

### Key Validation Questions
- **Does this solve the right problem?**: ✅ Yes, shows progress and next steps clearly
- **Is the core problem solved?**: 🔄 No, progress data is fake, recommendations are generic
- **Is the content ready?**: 🔄 No, all metrics are placeholders, course descriptions need L&D review
- **Is the UI working?**: ✅ Yes, all components display correctly, transitions work
- **Should we pivot or continue?**: ✅ Continue, just need real data and content polish

### Go/No-Go Decision
**🔄 Needs iteration**: UI is solid, but content/data needs work before backend development

### Backend Requirements (once ready)
- **Data Needs**: User progress percentages, completed courses, recommendation algorithm results
- **Edge Cases**: New users with no progress, failed course completions, empty recommendations
- **Performance Notes**: Progress data should cache for 5min, recommendations can be slower

### Implementation Checklist

#### Pre-Implementation
- [x] **Requirements Clear**: All specifications documented
- [x] **Design Finalized**: Mockups approved
- [ ] **Data Sources Confirmed**: User progress API in development
- [ ] **Dependencies Identified**: Depends on user profile enhancement
- [ ] **Resources Allocated**: Frontend team assigned 2 weeks

#### Development Phase
- [ ] **Database Setup**: user_progress table needs completion_rate column
- [ ] **API Development**: GET /api/user/progress endpoint
- [ ] **Component Development**: Update HeroCard with live data integration
- [ ] **Integration**: Connect all components to progress API
- [ ] **State Management**: Implement caching and real-time updates

#### Content Integration
- [ ] **Placeholder Removal**: Replace all hardcoded numbers
- [ ] **Real Data Integration**: Connect to user progress API
- [ ] **Content Review**: L&D team to review all progress descriptions
- [ ] **Legal Review**: Not required for this page
- [ ] **Localization**: Progress descriptions need translation

#### Testing & Quality Assurance
- [ ] **Functionality Testing**: All progress calculations correct
- [ ] **Cross-Browser Testing**: Chrome, Firefox, Safari, Edge
- [ ] **Mobile Testing**: Responsive on all screen sizes
- [ ] **Accessibility Testing**: Add ARIA labels to progress bars
- [ ] **Performance Testing**: Load time under 2 seconds
- [ ] **User Acceptance Testing**: Partners find progress clear

#### Launch Preparation
- [ ] **Final QA**: No critical bugs
- [ ] **Documentation**: API documentation updated
- [ ] **Monitoring Setup**: Error tracking for API failures
- [ ] **Rollback Plan**: Fallback to static data if API fails
- [ ] **Team Briefing**: Support team trained on new features

### Success Criteria

#### Technical Success
- [ ] **Performance**: Page loads in under 2 seconds
- [ ] **Reliability**: Error rate less than 1%
- [ ] **Accessibility**: WCAG AA compliance
- [ ] **Security**: User data properly protected

#### User Experience Success
- [ ] **Task Completion**: 90% of users can understand their progress
- [ ] **Usability**: Users find next steps clearly
- [ ] **Satisfaction**: User feedback rating 4/5 or higher
- [ ] **Accessibility**: Screen reader users can track progress

#### Business Success
- [ ] **Engagement**: Time on page increases 30%
- [ ] **Conversion**: 60% click-through on recommended courses
- [ ] **Content Quality**: All progress data accurate
- [ ] **Stakeholder Approval**: L&D team satisfied with implementation

---

**How to Use This Template:**
1. Copy this template for each page you're analyzing
2. Answer the 6 simple questions at the top
3. Let AI analyze the current state and generate technical specifications
4. **Do your validation** using the decision gates above
5. Make your go/no-go decision for backend development
6. Document backend requirements for pages marked as ready
7. Update success criteria as you learn more about requirements