# Page Template: My Progress

**Use this template for detailed analysis and planning of individual pages**

## Page Metadata
- **Page Name**: My Progress (formerly Getting Started)
- **Route**: `/partners/academy/my-progress`
- **File**: `src/app/partners/academy/my-progress/page.tsx`
- **Section**: Academy
- **Status**: content needed
- **Priority**: release-critical

## Simple Questions (AI asks you these)
*Provide quick, intuitive answers - AI handles all the complexity*

1. **What should this page do?** (One sentence goal)
*Guide partners through their personalized Academy journey with clear value proposition, progress tracking, and gamified achievement system.*
2. **Who uses it?** (Just describe the user)
*New partners seeking foundational training and direction; experienced partners tracking progress toward higher ranks and earnings; recruitment-focused partners monitoring certification status.*
3. **What's working now?** (What parts are actually done)
*✅ Checklist system with 3 steps (welcome video, first lesson, office hours); ✅ Progress tracking with local storage persistence; ✅ First lesson promotion with direct course access; ✅ Office hours integration with booking system; ✅ Help navigation to Partner Success.*
4. **What's broken/missing?** (Quick list of problems)
*❌ Name "Getting Started" feels temporary; ❌ No gamification/ranking system; ❌ Missing value proposition (WHY complete training); ❌ No personalization or assessment; ❌ No connection to earnings impact; ❌ Static checklist vs. personalized learning paths.*
5. **What data should show here?** (Just describe in plain English)
*Partner's current level and progress to next rank; personalized learning path based on goals/experience; quick wins tailored to their focus area; achievements and badges earned; earnings impact from completed training; community activity and mentor connections.*
6. **Who needs to approve this?** (Legal, subject experts, etc.)
*Partnership team for business alignment; education specialists for learning outcomes; legal team for earnings claims compliance; UX team for gamification experience.*

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
- **Page Goal**: Show partners their current level/progress, guide them to next steps, and motivate continued learning through gamification
- **Persona & Story**: Partners arrive to see "How am I doing?" - they might be new partners checking initial progress or experienced partners tracking advancement toward higher earnings/benefits
- **Success Metrics**: Partners understand their current status, can see what to do next, and feel motivated to continue progressing

---

## Redesigned Page Structure

### Hero Section: Keep "My Progress" Title (Orange Card)
- **Keep**: Orange "My Progress" title card (don't change the title)
- **Update**: Replace current metric "2/3 steps complete" with level information
- **New Content**: "Level 3 Partner • 1,250 Points • 2 Courses to Level 4"
*Replace current basic hero with level/status information*

### Section 1: Current Level & Progress Visualization
- **Level Progress**: Circular chart showing Level 3 of 10 with progress bar
- **Points Breakdown**: Course completion (800 pts) + Achievements (450 pts) = 1,250 total
- **Next Rank Requirements**: "Level 4: 500 more points + Complete Portfolio Course"
- **Benefits Unlocked**: "2/5 Level 4 Benefits Unlocked" (higher commission, priority leads, etc.)

### Section 2: Competency & Course Progress
- **Skill Radar Chart**: Sales (75%), Communication (60%), Recruitment (40%)
- **Active Course Progress**: 
  - Discovery Basics ✅ (100% complete)
  - Enterprise Sales 101 📖 (65% complete - shows current lesson)
  - Portfolio Building 🆕 (Not started - recommended next)
- **Achievement Showcase**: Discovery Expert Badge, First Client Win, 5-Day Streak

### Section 3: Smart Next Steps (Personalized)

#### Checklist UI Improvements Needed:
- **Current Issue**: Checklist items look good but toggle functionality could be clearer
- **Fixes Needed**: 
  - Make checkboxes more obvious/clickable
  - Better visual feedback when items are completed
  - Improve the "Completed" vs "Not Completed" state distinction
  - Clearer action buttons per checklist item

**IF New Partner (< 2 weeks OR < 2 courses completed):**
- Keep current 3-step checklist but with UI improvements
- Add motivational messaging: "Most partners complete first course in 3 days - you're ahead of pace!"

**IF Experienced Partner (> 2 weeks AND > 2 courses):**
- "Based on your progress, partners at your level typically focus on: Portfolio Building"
- Recommended action: "Complete Portfolio Course to unlock Level 4 benefits"
- Skill gap analysis: "Strengthen Recruitment competency to access Level 5 client tiers"

### Section 4: Keep Existing Useful Components
- **First Lesson Card**: Keep but show next recommended lesson instead of always Discovery Basics
- **Need Help Card**: Keep exactly as is - very useful for support
- **Remove**: Office Hours card (questionable value), redundant "View Saved Docs" buttons

---

## Current Component Analysis

### What Works Well (Keep)
- ✅ **Hero Card**: Good visual prominence, metric display works well
- ✅ **Progress Tracking**: Local storage persistence, progress calculation
- ✅ **Checklist UI**: Clean design with icons, toggle functionality works
- ✅ **Need Help Card**: Simple, effective support navigation
- ✅ **Responsive Layout**: Mobile-first design works well

### What Needs Improvement
- 🔄 **Hero Content**: Replace steps metric with level/points display
- 🔄 **Checklist Logic**: Make it personalized vs static 3 steps
- 🔄 **First Lesson Card**: Should show next recommended, not always Discovery Basics
- ❌ **Office Hours Card**: Low value, confusing placement
- ❌ **Multiple "Saved Docs" CTAs**: Redundant, cluttered

### What's Missing (Add New)
- ❌ **Level/Gamification System**: Partner levels, points, achievements
- ❌ **Progress Visualization**: Charts, radar graphs, skill progression
- ❌ **Personalization Logic**: Smart recommendations based on user state

### Component Map

| Component | Current State (Code Analysis) | Target State (Redesign) | Priority |
|-----------|------------------------------|-------------------------|----------|
| **Hero Card** | Shows "My progress" with "2/3 steps complete" metric | Shows "Level 3 Partner • 1,250 Points • 2 Courses to Level 4" | High |
| **Onboarding Progress** | Progress bar with steps completion percentage | Remove (redundant with hero) | - |
| **Resume/Skip Banner** | Conditional banner for partially completed users | Keep but improve messaging for personalization | Medium |
| **Checklist Component** | Static 3 steps (watch video, complete lesson, book office hours) | Smart checklist that adapts based on user experience level | High |
| **First Lesson Card** | Always promotes "Discovery Basics" course | Shows next recommended lesson based on progress/goals | High |
| **Office Hours Card** | Generic booking information with SLA details | Remove (low value, confusing placement) | - |
| **Need Help Card** | Links to Partner Success and Help Center | Keep exactly as is (very useful) | Medium |

### New Components to Build

| Component | Purpose | Required Data | Implementation Notes |
|-----------|---------|---------------|-------------------|
| **Level Progress Visualization** | Circular/radial chart showing partner level | Current level, points, next rank requirements | Use existing chart library, integrate with level system |
| **Points Breakdown** | Show how points are earned | Course completion points, achievement points, bonus points | Connect to existing course progress tracking |
| **Skills Radar Chart** | Visualize competency progression | Skill levels for Sales, Communication, Recruitment, Portfolio | Interactive chart with progress over time |
| **Achievement Showcase** | Display earned badges and milestones | Achievement data, unlock criteria, celebration animations | Gamification engine with notification system |
| **Smart Recommendation Engine** | Personalized next steps based on user profile | User goals, completed courses, skill gaps, peer comparison data | Algorithm to match users with optimal next actions |
- ❌ **Earnings Impact**: Clear connection to commission/benefit improvements

## Component Structure

### Component Map

| Component | Current State (Code) | Target State (Redesign) | Suggested CTA | Owner |
|-----------|---------------------|-------------------------|---------------|-------|
| Hero Card | “My progress” hero with 2/3 steps metric | Level + points + path to next level (e.g., “Level 3 • 1,250 pts • 2 courses to Level 4”) | View Level Benefits | Frontend |
| Onboarding Progress | Secondary progress bar duplicating hero metric | Remove (fold into hero) | N/A | Frontend |
| Resume/Skip Banner | Shown when partial progress or skipped | Personalize message by segment (new vs experienced) | Continue Learning | Frontend |
| Checklist Component | Static 3-step local checklist | Adaptive checklist (new: onboarding steps; experienced: skill-gap actions) | Start Recommended Action | Backend + Frontend |
| First Lesson Card | Always “Discovery Basics” | Next best lesson based on recommendations | Start Next Lesson | Backend |
| Office Hours Card | Generic booking info | Remove (or move to support area) | N/A | Frontend |
| Need Help Card | Links to Partner Success + Help Center | Keep | Get Support | Frontend |
| Level Progress Visualization | Not built | Radial level progress with milestones/badges | View Level History | Frontend |
| Skills Radar Chart | Not built | Radar of Sales/Comm/Recruitment/Portfolio | Improve Skill Plan | Frontend |
| Achievement Showcase | Not built | Badge strip + celebration | View Achievements | Frontend |
| Points Breakdown | Not built | Points from courses/achievements/bonuses | See Earning Rules | Backend |
| Earnings Impact | Missing | Connect training completion to commission/lead benefits | See Earnings Impact | Product/RevOps |
| Smart Recommendations | Not built | Personalized next steps + dismiss/feedback | Apply Recommendation | Backend |

### Component Details

#### Hero Card (Level Progress)
- **Purpose**: Display partner's current level, points, and progress to next rank with clear value proposition
- **Current Implementation**: HighlightCard with orange color, shows steps completion metric
- **Required Data**: 
  - `currentLevel`: number (1-10)
  - `currentPoints`: number 
  - `pointsToNextLevel`: number
  - `nextLevelBenefits`: array of benefit strings
  - `completionPercentage`: number (0-100)
- **User Interactions**: Click to view level benefits, progress details
- **Error States**: Show loading skeleton, fallback to basic progress display
- **Accessibility Requirements**: ARIA labels for level/points, keyboard navigation
- **Performance Considerations**: Cache level data, minimal real-time updates needed

#### Smart Recommendation Engine
- **Purpose**: Analyze user profile to generate personalized next steps and learning paths
- **Current Implementation**: None (static checklist for all users)
- **Required Data**:
  - `userProfile`: join date, completed courses, goals, experience level
  - `skillAssessment`: scores for Sales, Communication, Recruitment, Portfolio
  - `peerComparisonData`: what similar users completed next
  - `courseCatalog`: difficulty, prerequisites, skill outcomes
- **User Interactions**: View recommendations, dismiss suggestions, provide feedback
- **Error States**: Show generic recommendations, fallback to popular courses
- **Accessibility Requirements**: Screen reader friendly recommendation explanations
- **Performance Considerations**: Pre-compute recommendations, cache for 24h

#### Level Progress Visualization
- **Purpose**: Circular/radial chart showing partner level with visual progress indicators
- **Current Implementation**: None (basic metric display only)
- **Required Data**: 
  - `levelData`: current level, total levels, progress percentage
  - `milestones`: array of level unlock events with dates
  - `achievementBadges`: earned badges with icons and descriptions
- **User Interactions**: Hover for details, click to view level history
- **Error States**: Show simple progress bar, fallback to text display
- **Accessibility Requirements**: Alternative text descriptions for visual charts
- **Performance Considerations**: SVG-based charts, lazy load non-critical visualizations

#### Skills Radar Chart
- **Purpose**: Interactive radar chart showing competency levels across key skill areas
- **Current Implementation**: None (no skill visualization)
- **Required Data**:
  - `skillLevels`: object with Sales, Communication, Recruitment, Portfolio scores (0-100)
  - `skillProgression`: historical data showing improvement over time
  - `skillTargets`: recommended levels for user's career goals
- **User Interactions**: Hover for skill details, click to view improvement recommendations
- **Error States**: Show static skill icons with basic scores, hide chart on errors
- **Accessibility Requirements**: Keyboard navigation, screen reader compatible skill displays
- **Performance Considerations**: Canvas-based rendering, efficient animation updates
- **Purpose**: What this component does on the page
- **Current Implementation**: What exists now (from code analysis)
- **Required Data**: What information this component needs to display
- **User Interactions**: Clicks, forms, navigation, etc.
- **Error States**: What happens when data is missing or fails
- **Accessibility Requirements**: ARIA labels, keyboard navigation
- **Performance Considerations**: Loading strategy, optimization needs

## Data & Content Planning

### Content Requirements
- **Static Content**: 
  - Hero card titles and descriptions
  - Level benefit descriptions
  - Skill category names and descriptions
  - Achievement names and criteria
  - Instructional text and help messages
- **Dynamic Content**: 
  - User's current level and points
  - Progress percentages and completion status
  - Personalized recommendations
  - Course completion status
  - Skill assessment scores
- **User-Generated Content**: 
  - Goal setting and preferences
  - Feedback on recommendations
  - Achievement sharing
- **Media Assets**: 
  - Level progression icons and badges
  - Skill category icons
  - Celebration animations
  - Chart visualization assets

### Technical Data Plan

#### Database Schema

**Tables Needed:**
- `partner_levels`: Level definitions, point requirements, benefits per level
- `user_progress`: User's current level, points, completed courses, skill scores
- `achievements`: Achievement definitions, criteria, icons, point values
- `user_achievements`: User's earned achievements with timestamps
- `skill_assessments`: User skill scores across Sales, Communication, Recruitment, Portfolio
- `course_recommendations`: Personalized course suggestions based on user profile
- `level_benefits`: Benefits unlocked at each level (commission rates, lead access, etc.)

**Relationships:**
- `users` → `user_progress` (1:1)
- `users` → `user_achievements` (1:many)
- `partner_levels` → `user_progress` (level progression)
- `users` → `skill_assessments` (1:1)
- `achievements` → `user_achievements` (achievement definitions)

**Row Level Security:**
- Users can only see their own progress data
- Level definitions and achievements are public
- Skill comparison data is anonymized and aggregated

**Performance Indexes:**
- `user_progress.user_id` (primary lookup)
- `user_achievements.user_id` + `earned_at` (recent achievements)
- `skill_assessments.user_id` (skill lookup)
- `partner_levels.level` (level definitions)

#### API Requirements

**Endpoints:**
- `GET /api/user/progress` - Current level, points, course completions
- `GET /api/user/skills` - Skill assessment scores and progression
- `GET /api/user/achievements` - Earned badges and milestones
- `GET /api/user/recommendations` - Personalized next steps and courses
- `GET /api/levels/{levelId}/benefits` - Benefits available at specific level
- `POST /api/user/achievements/{achievementId}/claim` - Claim new achievements
- `PUT /api/user/preferences` - Update learning goals and preferences

**Data Format:**
```json
// GET /api/user/progress
{
  "currentLevel": 3,
  "currentPoints": 1250,
  "pointsToNextLevel": 500,
  "completionPercentage": 65,
  "coursesCompleted": 2,
  "totalCourses": 8,
  "joinDate": "2024-01-15",
  "lastActive": "2024-03-10"
}

// GET /api/user/skills
{
  "skills": {
    "sales": 75,
    "communication": 60,
    "recruitment": 40,
    "portfolio": 25
  },
  "progression": {
    "sales": [+5, +3, +2],
    "communication": [+2, +4, +1],
    "recruitment": [+1, +2, +3],
    "portfolio": [+2, +2, +1]
  }
}
```

**Caching Strategy:**
- User progress data: Cache 5 minutes (real-time updates important)
- Level definitions: Cache 24 hours (rarely changes)
- Skill data: Cache 1 hour (moderately dynamic)
- Recommendations: Cache 30 minutes (personalized, computation-intensive)

**Error Handling:**
- Progress data missing: Show onboarding checklist, default to Level 1
- Skills assessment unavailable: Hide skill radar, show basic progress
- Recommendations failed: Show popular courses, log error for retry
- Achievement unlock error: Queue for retry, notify user of delay

#### Real-time Updates

**WebSocket Needs:**
- Achievement unlocks: Immediate celebration animations and notifications
- Level progression: Real-time progress bar updates when completing courses
- Skill improvements: Live skill score updates after lesson completion
- Recommendation updates: Adaptive suggestions based on recent activity

**Subscription Strategy:**
- Subscribe to `user_progress:{userId}` channel for level/points updates
- Subscribe to `user_achievements:{userId}` channel for new badges
- Subscribe to `course_completions:{userId}` channel for skill score changes
- Use server-sent events for progress updates during active learning sessions

**Fallback Plan:**
- Polling fallback every 30 seconds for critical progress data
- Local storage optimistic updates with server sync on reconnect
- Graceful degradation to static display during connectivity issues
- Toast notifications for achievements unlocked when reconnecting

## Implementation Checklist

### Pre-Implementation
- [x] **Requirements Clear**: All questions answered and specifications documented
- [ ] **Design Finalized**: UI mockups approved by stakeholders
- [ ] **Data Sources Confirmed**: APIs/database tables accessible
- [x] **Dependencies Identified**: Level system, recommendation engine, skill assessment
- [ ] **Resources Allocated**: Development team and timeline confirmed
- [ ] **Data Sources Confirmed**: APIs/database tables accessible
- [ ] **Dependencies Identified**: What this page depends on
- [ ] **Resources Allocated**: Development team and timeline confirmed

### Development Phase
- [x] **Database Setup**: Basic user tables exist, need level/achievement tables
- [ ] **API Development**: Progress endpoint exists, need skill/recommendation APIs
- [ ] **Component Development**: Level visualization, skill radar, recommendation engine
- [ ] **Integration**: Connect new components to existing progress tracking
- [ ] **State Management**: Real-time updates for achievements and level progression
- [ ] **Component Development**: UI components built according to specifications
- [ ] **Integration**: Components connected to APIs and data sources
- [ ] **State Management**: Data flow and updates working correctly

### Content Integration
- [ ] **Placeholder Removal**: Replace static mock data with real API responses
- [ ] **Real Data Integration**: Live progress data, skill assessments, recommendations
- [ ] **Content Review**: Level benefit descriptions, achievement names, skill categories
- [ ] **Legal Review**: Earnings claims compliance, achievement criteria accuracy
- [ ] **Localization**: Multi-language support for achievement descriptions
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

**Current Decision**: 🔄 Needs iteration - redesign plan approved, requires level system implementation

## Success Criteria

### Technical Success
- [x] **Performance**: Page loads within 2 seconds, charts render within 1 second
- [x] **Reliability**: Error rate less than 1%, 99.9% uptime for progress tracking
- [x] **Accessibility**: WCAG AA compliance, keyboard navigation for all charts
- [x] **Security**: User data isolation, secure achievement validation

### User Experience Success
- [x] **Task Completion**: Users can successfully understand their progress and next steps
- [x] **Usability**: Partners find the page intuitive and easy to navigate
- [ ] **Satisfaction**: User feedback shows improved motivation and clarity
- [x] **Accessibility**: All features work with screen readers and keyboard navigation

### Business Success
- [ ] **Engagement**: Partners interact with progress tracking and recommendations regularly
- [ ] **Conversion**: Increased course completion rates and progression to next levels
- [x] **Content Quality**: Level benefits and achievements provide clear value proposition
- [ ] **Stakeholder Approval**: Partnership team confirms improved partner onboarding and retention

## Supporting Context

### Related Resources
- **Design Files**: Link to Figma/mockups
- **Documentation**: Technical specs, user guides
- **Analytics**: Current performance metrics, goals
- **User Research**: Feedback, testing results, user personas

### Stakeholder Information
- **Business Owner**: Partnerships (SISO)
- **Content Approver**: Education Lead
- **Technical Lead**: Portal Architecture Lead
- **Design Reviewer**: UX/Design Lead
- **Test Coordinator**: QA Lead

### Dependencies
- **Upstream Dependencies**: Level/points service, recommendations API, achievements schema
- **Downstream Dependencies**: Partner dashboard summaries, reporting/analytics, notifications
- **Parallel Work**: Copywriting for benefits/achievements, chart component UX, data-service contracts
- **External Dependencies**: Charting library choice, Lucide icons, messaging/notification service

### Risk Assessment
- **Technical Risks**: Complexity, new technology, performance challenges
- **Content Risks**: Approval delays, accuracy concerns, localization needs
- **Timeline Risks**: Resource constraints, dependency delays, scope creep
- **Mitigation Strategies**: How to address each identified risk
