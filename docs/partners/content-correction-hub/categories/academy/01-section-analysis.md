# Section Template: Academy

**Use this template for strategic planning of entire sections (Academy, Community, Settings, etc.)**

## Section Overview
- **Section Name**: Academy
- **Business Owner**: SISO
- **Technical Lead**: SISO
- **Content Lead**: SISO
- **Timeline Target**: 3 days
- **Section Name**: Academy
- **Business Owner**: 
- **Technical Lead**: 
- **Content Lead**: 
- **Timeline Target**: 

## Strategic Questions (Answer These First)

1. **Business Priority**: Transform new partners into revenue-generating SISO affiliates through structured education, practical tools, and clear progression pathways that accelerate their path to the $50K earnings target. Academy should be "educational" with courses on sales improvement, client acquisition and contacting, sales communication skills, helping sales people with information they need.

2. **User Journey**: How partners typically flow through these pages - what's their starting point and end goal?
   - **Academy Dashboard**: Overview of progress and recommendations
   - **Getting Started**: Introduction/overview of Academy effectiveness  
   - **Courses**: Browse and discover course catalog with search/filtering
   - **Training**: Recommended next course based on progress
   - **Portfolio**: Showcasing apps built (social proof for clients)
   - **Pitch Kit**: Materials for pitching to clients

3. **Content Authority**: Who provides the final content for this section (subject matter experts, marketing, legal)?
   - **External Expert Content**: Learn from external experts, bring knowledge together, curate themselves
   - **Team-Managed Portfolio**: Curated by team, not user-generated
   - **Standard Pitch Kits**: Start with standard templates, allow customization later
   - **Validation Process**: Expert validation + AI assistance + continuous updates
   - **Video Integration**: YouTube/Loom videos embedded directly in courses

4. **Data Dependencies**: What real-time data vs static content does this section need?
   - **Real-time**: Course progress tracking, live completion percentages
   - **Static**: Course content, portfolio items, pitch templates  
   - **Updates**: Weekly portfolio updates with new client apps
   - **Video Content**: YouTube videos linked/embedded in courses

5. **Cross-Section Links**: How should this section connect to other parts of the partnership portal?
   - **Academy → Earnings**: Better skills → Higher commissions, Portfolio → More client wins, Pitch kit → Faster deals
   - **Academy → Community**: Course completions → WINS celebration, Skills sharing, Expert discussions
   - **Academy → Recruitment**: Course completion → Recruitment credibility, Academy tools → Support visibility
   - **Video Integration**: Course completions trigger community celebrations
1. **Business Priority**: What's the #1 outcome we want partners to achieve in this section?
2. **User Journey**: How do partners typically flow through these pages - what's their starting point and end goal?
3. **Content Authority**: Who provides the final content for this section (subject matter experts, marketing, legal)?
4. **Data Dependencies**: What real-time data vs static content does this section need?
5. **Cross-Section Links**: How should this section connect to other parts of the partnership portal?

## Current vs Planned Structure

### Current State Analysis
*AI fills this by analyzing the existing codebase structure*

| Route | File Location | Component Status | Content Status | Issues | Priority |
|-------|---------------|------------------|----------------|--------|----------|
| `/partners/academy` | `src/app/partners/academy/page.tsx` | 🔧 Built | 🔄 Placeholder | Missing real data | High |
| `/partners/academy/getting-started` | `src/app/partners/academy/getting-started/page.tsx` | 🔧 Built | 🔄 Placeholder | Missing real data | High |
| `/partners/academy/portfolio` | `src/app/partners/academy/portfolio/page.tsx` | 🏗️ Partial | 📝 Draft text | Needs component polish | High |
| `/partners/academy/courses` | `src/app/partners/academy/courses/page.tsx` | 🔧 Built | 🔄 Placeholder | Course cards work, data is mock | High |
| `/partners/academy/pitch-kit` | `src/app/partners/academy/pitch-kit/page.tsx` | ❌ Missing | ❌ Missing | Page doesn't exist | Critical |
| `/partners/academy/training-spotlight` | `src/app/partners/academy/training-spotlight/page.tsx` | ❌ Missing | ❌ Missing | Page doesn't exist | Critical |

### Planned State
*AI fills this based on your requirements and goals*

| Route | Target Components | Required Data | Success Metrics | Dependencies | Timeline |
|-------|-------------------|---------------|-----------------|--------------|----------|
| `/partners/academy` | HeroStats, ProgressCard, QuickLinks, FeaturedCourse | User progress, course counts, completion rates | Dashboard engagement > 70% | User progress table, course metadata | Week 1 |
| `/partners/academy/getting-started` | Checklist, VideoPlayer, ResourceLinks | Onboarding steps, tutorial videos, resource URLs | Checklist completion > 85% | Content library, progress tracking | Week 2 |
| `/partners/academy/portfolio` | PortfolioGrid, Filters, DownloadOptions | Portfolio items with metadata, client examples | Portfolio usage > 60% | Portfolio database, file storage | Week 2 |
| `/partners/academy/courses` | CourseGrid, Filters, SearchBar | Course catalog with categories, progress data | Course discovery rate > 60% | Course database, search API | Week 2 |
| `/partners/academy/pitch-kit` | TemplateGallery, Customization, Download | Pitch templates, customization options | Pitch kit usage > 40% | Template library, document storage | Week 3 |
| `/partners/academy/training-spotlight` | TrainingList, Registration, Archive | Training sessions, expert profiles | Training attendance > 30% | Training calendar, expert database | Week 3 |

### Gap Analysis
*AI automatically calculates what needs to be built, updated, or removed*

#### What Needs to Be Built
- [ ] New pages: Pitch Kit, Training Spotlight
- [ ] New components: PortfolioGrid, ProgressCard, TemplateGallery
- [ ] New database tables: courses, lessons, user_progress, portfolio_items, pitch_kits
- [ ] New APIs: /api/courses, /api/progress, /api/portfolio, /api/pitch-kits

#### What Needs to Be Updated
- [ ] Existing pages: All 4 existing pages need real data integration
- [ ] Existing components: Hero components need metrics, course cards need real data
- [ ] Existing APIs: Need to enhance user profile API for progress tracking

#### What Can Be Reused
- [ ] Existing components: Card layouts, navigation components, form components
- [ ] Existing data structures: User profile table can be extended
- [ ] Existing integrations: Authentication, user session management

## Implementation Plan

### Phase 1: Foundation (Week 1-2)
- [ ] **Database Setup**: Schema creation and initial data
- [ ] **API Development**: Core endpoints implemented
- [ ] **Component Library**: Base UI components built
- [ ] **Main Landing Page**: Primary section page completed

### Phase 2: Content Integration (Week 3-4)
- [ ] **Real Data Integration**: APIs connected to UI components
- [ ] **Content Population**: Placeholder content replaced with real data
- [ ] **Cross-Page Linking**: Navigation and internal links established
- [ ] **Content Review**: Stakeholder approval process completed

### Phase 3: Polish & Testing (Week 5-6)
- [ ] **Performance Optimization**: Loading times and responsiveness improved
- [ ] **Accessibility Audit**: WCAG compliance verification
- [ ] **User Testing**: Feedback collection and iteration
- [ ] **Documentation**: Technical and user documentation completed

## Progress Tracking

| Page | Status | Owner | Due Date | Notes |
|------|--------|--------|----------|-------|
| Main section page | 🔄 In Progress | | Week 1 | Components built, needs content |
| Getting Started | 🔄 In Progress | | Week 1 | Components built, needs content |
| Portfolio | 🔄 In Progress | | Week 1 | Components built, needs content |
| Courses | 🔄 In Progress | | Week 1 | Components built, needs content |
| Pitch Kit | ⏳ Not Started | | Week 2 | Waiting for API |
| Training Spotlight | ⏳ Not Started | | Week 3 | Depends on Pitch Kit |

## Dependencies & Blockers

### External Dependencies
- [x] **APIs**: Minimal external services needed
- [ ] **Content**: Content creation from external experts, team-curated portfolio items
- [ ] **Legal**: No specific legal compliance requirements needed
- [ ] **Design**: Video content and course materials design
- [ ] **Budget**: AI costs only, reasonable budget allocation
- [ ] **APIs**: What external services we depend on
- [ ] **Content**: What content/approvals we're waiting for
- [ ] **Legal**: What legal reviews are required
- [ ] **Design**: What design assets/approvals we need

### Technical Risks
- [ ] **Complexity**: Features that might take longer than expected
- [ ] **Performance**: Pages that might have performance issues
- [ ] **Integration**: Third-party services that might be unreliable
- [ ] **Security**: Features that need additional security consideration

## Validation & Decision Gates

### Content Validation
- **Does this solve the right problem?**: Does this section actually help partners achieve their primary goals?
- **Content Accuracy**: Are all facts, instructions, and examples correct and helpful?
- **User Journey Flow**: Does the flow through pages make logical sense and feel intuitive?
- **Cross-Device Reality**: How does the UI/content actually work on different screen sizes?

### Go/No-Go Decision Gates
For each page in this section, ask:
- **Is the core problem solved?**: Can users successfully complete their main task?
- **Is the content ready?**: All copy reviewed, accurate, and appropriate?
- **Is the UI working?**: All components display correctly and transitions work?
- **Should we pivot or continue?**: Is the approach working or do we need to change direction?

### Performance Measurements (UI/UX Focus)
- **Visual Polish**: Do all components look complete and professional?
- **Content Readability**: Is text clear, scannable, and easy to understand?
- **Interactive Elements**: Do buttons, links, and forms work smoothly?
- **Loading States**: Do skeleton/placeholder states look good?
- **Responsive Behavior**: Does layout work well on mobile, tablet, desktop?

## Success Metrics

### Section-Level Metrics
- **User Engagement**: How actively partners use this section
- **Task Completion**: How successfully partners complete their goals
- **Content Quality**: Accuracy and helpfulness of information
- **Technical Performance**: Load times, error rates, accessibility

### Business Impact
- **Partnership Value**: How this section drives partnership success
- **Efficiency Gains**: Time saved for partners and internal teams
- **Revenue Impact**: Direct or indirect revenue contribution
- **User Satisfaction**: Partner feedback and retention