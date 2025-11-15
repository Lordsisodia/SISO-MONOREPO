# Academy

**Scope**: Training, assets, and industry playbooks for partners  
**Routes**: `/partner/academy/*` (see nested folders for specific routes)  
**Section**: Academy  
**Spec**: docs/partners/PARTNERSHIP-PAGES-PLAN.md (Academy)

## Overview

The Academy is SISO's comprehensive training and resource hub designed to onboard, educate, and empower partners throughout their journey. It provides structured learning paths, industry-specific resources, proof assets, and tools to help partners succeed in the partnership program.

## Core Architecture

The Academy follows a modular architecture with distinct sections for different learning needs:

- **Getting Started**: Onboarding and initial setup
- **Courses**: Structured curriculum with progress tracking  
- **Training Spotlight**: Targeted learning recommendations
- **Portfolio**: Case studies and proof assets gallery
- **Pitch Kit**: Ready-to-use sales materials and templates
- **Saved**: Personal library of bookmarked resources
- **Industry Resources**: Specialized content by vertical

## Learning Journey

### 1. Onboarding Phase
- **Getting Started**: Introduction modules and program fundamentals
- **Required Steps**: Checklist-based progression to unlock features
- **Orientation**: Guided setup and initial training

### 2. Skill Development Phase
- **Core Curriculum**: Essential partnership skills and knowledge
- **Industry Specialization**: Vertical-specific training and resources
- **Advanced Topics**: Expert-level content and strategies

### 3. Application Phase
- **Portfolio Building**: Creating and showcasing proof assets
- **Pitch Kit Mastery**: Developing sales materials and presentations
- **Practical Application**: Real-world scenario training

## Key Features

### Progress Tracking
- **Module Completion**: Track progress through individual learning modules
- **Skill Assessment**: Evaluate competency in key areas
- **Achievement System**: Badges and recognition for milestones
- **Personalized Recommendations**: AI-powered learning suggestions

### Industry Specialization
- **Vertical Expertise**: Industry-specific pain points and solutions
- **Case Studies**: Real examples from successful partners
- **Templates**: Ready-to-use scripts and materials by industry
- **Market Insights**: Trend analysis and opportunity identification

### Resource Management
- **Saved Library**: Personal collection of useful resources
- **Search & Discovery**: Easy finding of relevant content
- **Collaborative Learning**: Community-driven knowledge sharing
- **Regular Updates**: Continuous addition of new content

## Component Architecture

### AcademyLayout
```tsx
export function AcademyLayout() {
  return (
    <div className="academy-layout">
      <AcademyNavigation />
      <AcademyContent />
      <AcademyProgressTracker />
      <AcademyHelpCenter />
    </div>
  );
}
```

### LearningModule
```tsx
interface LearningModule {
  id: string;
  title: string;
  description: string;
  type: ModuleType;
  difficulty: DifficultyLevel;
  estimatedTime: number;
  prerequisites: string[];
  content: ModuleContent[];
  assessments: Assessment[];
  completion: ModuleCompletion;
}

export enum ModuleType {
  VIDEO = 'video',
  ARTICLE = 'article',
  INTERACTIVE = 'interactive',
  WORKSHOP = 'workshop',
  CERTIFICATION = 'certification'
}
```

### ProgressTracker
```tsx
interface ProgressTracker {
  overallProgress: number;
  moduleProgress: Record<string, ModuleProgress>;
  achievements: Achievement[];
  learningPath: LearningPath;
  nextRecommendations: RecommendedContent[];
}
```

## Domain Types

### Learning Content Types
```typescript
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
  duration: number; // in minutes
  difficulty: DifficultyLevel;
  category: CourseCategory;
  tags: string[];
  modules: CourseModule[];
  prerequisites: string[];
  learningObjectives: string[];
  materials: CourseMaterial[];
  assessment: CourseAssessment;
  certification?: Certification;
}

export interface CourseModule {
  id: string;
  title: string;
  type: ContentType;
  content: ModuleContent;
  duration: number;
  order: number;
  required: boolean;
  resources: Resource[];
}

export interface VideoContent {
  id: string;
  url: string;
  thumbnail: string;
  duration: number;
  resolution: VideoResolution;
  captions: Caption[];
  chapters: VideoChapter[];
}

export interface InteractiveContent {
  type: InteractionType;
  steps: InteractionStep[];
  scoring: ScoringRules;
  feedback: FeedbackSystem;
}

export enum InteractionType {
  QUIZ = 'quiz',
  SIMULATION = 'simulation',
  ROLE_PLAY = 'role_play',
  CASE_STUDY = 'case_study'
}
```

### Portfolio & Case Studies
```typescript
export interface CaseStudy {
  id: string;
  title: string;
  client: ClientInfo;
  industry: Industry;
  challenge: string;
  solution: Solution;
  results: Results;
  timeline: Timeline;
  assets: CaseStudyAsset[];
  testimonial: Testimonial;
  lessons: string[];
  tags: string[];
  featured: boolean;
}

export interface PortfolioAsset {
  id: string;
  type: AssetType;
  title: string;
  description: string;
  file: AssetFile;
  thumbnail: string;
  industry: Industry;
  useCase: UseCase;
  downloadCount: number;
  shareCount: number;
  rating: number;
  reviews: Review[];
}

export enum AssetType {
  WEBSITE = 'website',
  LANDING_PAGE = 'landing_page',
  SALES_DECK = 'sales_deck',
  PROPOSAL = 'proposal',
  CASE_STUDY = 'case_study',
  VIDEO = 'video',
  INFRACTRUCTURE = 'infrastructure'
}
```

### Industry Resources
```typescript
export interface IndustryResource {
  id: string;
  industry: Industry;
  type: ResourceType;
  title: string;
  description: string;
  content: ResourceContent;
  targetAudience: PartnerTier[];
  painPoints: PainPoint[];
  solutions: Solution[];
  scripts: SalesScript[];
  templates: Template[];
  metrics: IndustryMetric[];
}

export interface SalesScript {
  id: string;
  title: string;
  context: ScriptContext;
  flow: ScriptFlow;
  variants: ScriptVariant[];
  objections: ObjectionHandling[];
  successMetrics: ScriptMetrics[];
}

export interface IndustryMetric {
  category: MetricCategory;
  name: string;
  value: number;
  unit: string;
  benchmark: number;
  source: string;
  date: Date;
}
```

## Application Hooks

### useAcademyProgress Hook
```typescript
export function useAcademyProgress() {
  const [progress, setProgress] = useState<AcademyProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const trackModuleCompletion = async (moduleId: string) => {
    try {
      await academyApi.trackProgress({
        moduleId,
        completed: true,
        timestamp: new Date()
      });
      
      await refreshProgress();
    } catch (err) {
      console.error('Failed to track progress:', err);
    }
  };

  const getRecommendations = async () => {
    try {
      const response = await academyApi.getRecommendations();
      return response.data;
    } catch (err) {
      console.error('Failed to get recommendations:', err);
      return [];
    }
  };

  return {
    progress,
    loading,
    trackModuleCompletion,
    getRecommendations,
    refreshProgress: () => fetchProgress()
  };
}
```

### useCourseManagement Hook
```typescript
export function useCourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  const enrollInCourse = async (courseId: string) => {
    try {
      const response = await academyApi.enrollCourse(courseId);
      setEnrollments(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Failed to enroll in course:', err);
      throw err;
    }
  };

  const trackCourseProgress = async (courseId: string, moduleId: string) => {
    try {
      await academyApi.updateProgress(courseId, {
        moduleId,
        completed: true,
        timestamp: new Date()
      });
      
      // Update local state
      setCourses(prev => 
        prev.map(course => 
          course.id === courseId 
            ? updateCourseProgress(course, moduleId)
            : course
        )
      );
    } catch (err) {
      console.error('Failed to track course progress:', err);
    }
  };

  return {
    courses,
    enrollments,
    enrollInCourse,
    trackCourseProgress,
    fetchCourses: () => academyApi.getCourses().then(setCourses)
  };
}
```

### usePortfolioAssets Hook
```typescript
export function usePortfolioAssets() {
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);
  const [filters, setFilters] = useState<AssetFilter>({});

  const searchAssets = async (query: string) => {
    try {
      const response = await academyApi.searchAssets({
        query,
        filters,
        sortBy: 'relevance'
      });
      setAssets(response.data);
    } catch (err) {
      console.error('Failed to search assets:', err);
    }
  };

  const downloadAsset = async (assetId: string) => {
    try {
      const response = await academyApi.downloadAsset(assetId);
      
      // Track download
      await academyApi.trackAssetInteraction({
        assetId,
        type: 'download',
        timestamp: new Date()
      });
      
      return response.data;
    } catch (err) {
      console.error('Failed to download asset:', err);
      throw err;
    }
  };

  return {
    assets,
    filters,
    searchAssets,
    downloadAsset,
    setFilters,
    fetchAssets: () => academyApi.getAssets(filters).then(setAssets)
  };
}
```

## Visual Design System

### Learning Interface Design
```css
.academy-layout {
  @apply bg-white min-h-screen;
}

.learning-module {
  @apply bg-white border border-gray-200 rounded-lg overflow-hidden;
}

.learning-header {
  @apply bg-gradient-to-r from-siso-orange to-siso-orange/90 text-white p-6;
}

.learning-progress {
  @apply relative h-2 bg-gray-200 rounded-full overflow-hidden;
}

.learning-progress-bar {
  @apply absolute h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500;
}
```

### Content Card Styling
```css
.content-card {
  @apply bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200;
}

.content-card.featured {
  @apply border-siso-orange/50 bg-siso-orange/5;
}

.video-player {
  @apply aspect-video bg-black rounded-lg overflow-hidden;
}

.interactive-element {
  @apply bg-siso-orange/10 border-2 border-siso-orange/30 rounded-lg p-4;
}
```

## Key Features

### Intelligent Learning Paths
- **Personalized Recommendations**: AI-powered content suggestions based on partner profile and performance
- **Adaptive Difficulty**: Content difficulty adjusts based on demonstrated skill level
- **Prerequisite Management**: Automatic tracking of required knowledge and skills
- **Learning Analytics**: Detailed insights into learning patterns and effectiveness

### Interactive Content
- **Video Learning**: High-quality video content with transcripts and captions
- **Simulations**: Hands-on practice environments for real-world scenarios
- **Assessments**: Knowledge checks and practical skill evaluations
- **Collaborative Learning**: Community features for peer learning and support

### Resource Management
- **Smart Search**: Advanced search across all academy content with filters
- **Tagging System**: Comprehensive tagging for easy content discovery
- **Collections**: Curated content collections for specific topics or goals
- **Offline Access**: Download capabilities for learning on the go

### Progress & Gamification
- **Achievement System**: Badges, certificates, and recognition for milestones
- **Leaderboards**: Community rankings for motivation and competition
- **Streak Tracking**: Consistency rewards for regular learning
- **Skill Assessments**: Quantified skill development tracking

## Integration Points

### Backend APIs
```typescript
// Academy Content API
GET    /api/academy/courses              // List all courses
GET    /api/academy/courses/:id          // Get course details
POST   /api/academy/enroll              // Enroll in course
PUT    /api/academy/progress/:id         // Update progress

// Portfolio Assets API
GET    /api/academy/portfolio            // List portfolio assets
GET    /api/academy/portfolio/:id        // Get asset details
POST   /api/academy/portfolio/download    // Download asset
POST   /api/academy/portfolio/upload      // Upload new asset

// Industry Resources API
GET    /api/academy/industry/:vertical    // Get industry resources
GET    /api/academy/scripts/:industry     // Get sales scripts
POST   /api/academy/favorites             // Save to favorites

// Progress & Analytics API
GET    /api/academy/progress              // Get learning progress
GET    /api/academy/recommendations       // Get personalized recommendations
POST   /api/academy/assessment           // Complete assessment
```

### External Integrations
- **Video Hosting**: Vimeo or Wistia for video content delivery
- **Learning Management System**: LRS for learning record storage
- **Assessment Platform**: Third-party assessment and certification tools
- **Analytics**: Learning analytics and behavior tracking services

### Content Management
- **CMS Integration**: Contentful or similar for course management
- **Media Storage**: Cloud storage for video and asset files
- **CDN Distribution**: Global content delivery network
- **Version Control**: Content versioning and rollback capabilities

## Performance Considerations

### Content Delivery Optimization
- **Lazy Loading**: Load content modules on demand
- **Preloading**: Preload likely next content based on learning patterns
- **Adaptive Streaming**: Video quality adjustment based on network conditions
- **Caching Strategy**: Multi-level caching for fast content access

### Learning Analytics Performance
- **Batch Processing**: Process analytics data in batches
- **Real-time Updates**: Critical progress updates in real-time
- **Data Aggregation**: Efficient aggregation of large datasets
- **Background Processing**: Heavy computations moved to background jobs

### Mobile Optimization
- **Responsive Design**: Optimal experience across all device sizes
- **Offline Support**: Download capabilities for offline learning
- **Progressive Web App**: PWA features for native-like experience
- **Touch Interactions**: Optimized touch interactions for mobile devices

## Testing Strategy

### Content Testing
- **Content Validation**: Ensure all content is accurate and up-to-date
- **Accessibility Testing**: WCAG compliance for all learning content
- **Multi-device Testing**: Consistent experience across platforms
- **Performance Testing**: Load times and responsiveness under stress

### Learning Flow Testing
- **Progress Tracking**: Verify accurate progress recording
- **Assessment Functionality**: Test all assessment types and scoring
- **Recommendation Engine**: Validate content suggestion algorithms
- **Completion Logic**: Ensure proper completion criteria and certificates

### Integration Testing
- **API Endpoints**: Test all academy-related API endpoints
- **Third-party Services**: Validate external service integrations
- **Data Synchronization**: Ensure data consistency across systems
- **Error Handling**: Test error scenarios and recovery mechanisms

## Security Requirements

### Content Protection
- **Access Control**: Role-based access to course content
- **DRM Protection**: Digital rights management for premium content
- **Secure Delivery**: Encrypted content transmission
- **Watermarking**: User-specific watermarks for sensitive materials

### User Privacy
- **Learning Analytics**: Anonymized analytics data collection
- **Progress Privacy**: Opt-in options for detailed progress tracking
- **Data Minimization**: Collect only necessary learning data
- **Compliance**: GDPR and other privacy regulation compliance

### Assessment Security
- **Cheating Prevention**: Secure assessment delivery and monitoring
- **Identity Verification**: Verify user identity for certifications
- **Time Limits**: Enforce appropriate time limits for assessments
- **Result Integrity**: Secure storage and transmission of assessment results

## Analytics & Telemetry

### Learning Metrics
- **Engagement Rates**: Track content consumption and interaction
- **Completion Rates**: Monitor course and module completion
- **Time Spent**: Measure learning time and session duration
- **Knowledge Retention**: Assess long-term learning effectiveness

### Content Performance
- **Popular Content**: Identify most consumed and valuable content
- **Drop-off Points**: Analyze where learners abandon content
- **Search Patterns**: Understand how users discover content
- **Sharing Metrics**: Track content sharing and virality

### Business Impact
- **Partner Performance**: Correlate learning with business outcomes
- **ROI Measurement**: Track return on investment for training programs
- **Skill Development**: Measure skill improvement over time
- **Community Building**: Monitor engagement with collaborative features

## Implementation Checklist

### Core Functionality
- [ ] Course management and delivery system
- [ ] Progress tracking and analytics
- [ ] Interactive content and assessments
- [ ] Portfolio asset management
- [ ] Industry resource curation

### Integration & API
- [ ] Academy content management API
- [ ] Progress tracking API
- [ ] Asset management API
- [ ] Assessment and certification API
- [ ] Analytics and reporting API

### UI/UX Components
- [ ] Course catalog and discovery
- [ ] Learning module interface
- [ ] Progress tracking dashboard
- [ ] Interactive content players
- [ ] Assessment and quiz interfaces

### Content & Media
- [ ] Video content management
- [ ] Interactive content authoring
- [ ] Assessment creation tools
- [ ] Asset upload and management
- [ ] Content versioning system

### Performance & Optimization
- [ ] Content delivery optimization
- [ ] Mobile responsive design
- [ ] Offline access capabilities
- [ ] Real-time progress updates
- [ ] Analytics data processing

This Academy system provides a comprehensive learning ecosystem that supports partners at every stage of their journey, from initial onboarding to advanced skill development and practical application of learned concepts.