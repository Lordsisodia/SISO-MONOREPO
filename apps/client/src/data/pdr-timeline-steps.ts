// Comprehensive 75-step PDR (Project Development Roadmap) Timeline
export interface PDRTimelineStep {
  id: number;
  phase: string;
  phaseColor: string;
  title: string;
  description: string;
  estimatedHours: number;
  actualHours?: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
  dependencies: number[];
  assignee?: string;
  dueDate?: Date;
  deliverables: string[];
  requiresApproval: boolean;
  milestoneStep?: boolean;
}

export const PDR_PHASES = {
  DISCOVERY: { name: 'Discovery & Research', color: 'blue', steps: [1, 15] },
  PLANNING: { name: 'Planning & Strategy', color: 'purple', steps: [16, 25] },
  DESIGN: { name: 'Design & UX', color: 'pink', steps: [26, 40] },
  DEVELOPMENT: { name: 'Development', color: 'green', steps: [41, 60] },
  TESTING: { name: 'Testing & QA', color: 'orange', steps: [61, 68] },
  LAUNCH: { name: 'Launch & Deployment', color: 'red', steps: [69, 75] }
};

export const PDR_75_STEPS: PDRTimelineStep[] = [
  // DISCOVERY & RESEARCH PHASE (1-15)
  {
    id: 1,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Initial Client Consultation',
    description: 'First meeting to understand business goals, vision, and requirements',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [],
    deliverables: ['Meeting notes', 'Initial requirements document'],
    requiresApproval: false,
    milestoneStep: true
  },
  {
    id: 2,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Business Analysis',
    description: 'Deep dive into business model, revenue streams, and operations',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [1],
    deliverables: ['Business analysis report', 'SWOT analysis'],
    requiresApproval: false
  },
  {
    id: 3,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Market Research',
    description: 'Analyze market trends, opportunities, and positioning',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [1],
    deliverables: ['Market research report', 'Industry trends analysis'],
    requiresApproval: false
  },
  {
    id: 4,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Competitor Analysis',
    description: 'Study direct and indirect competitors, their strengths and weaknesses',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [3],
    deliverables: ['Competitor matrix', 'Competitive advantage report'],
    requiresApproval: false
  },
  {
    id: 5,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Target Audience Research',
    description: 'Define and analyze target user demographics and behaviors',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [2],
    deliverables: ['User personas', 'Audience segmentation report'],
    requiresApproval: true
  },
  {
    id: 6,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'User Journey Mapping',
    description: 'Map out complete user journeys and touchpoints',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [5],
    deliverables: ['User journey maps', 'Touchpoint analysis'],
    requiresApproval: false
  },
  {
    id: 7,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Technical Requirements Gathering',
    description: 'Document all technical needs and constraints',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [2],
    deliverables: ['Technical requirements document', 'System requirements'],
    requiresApproval: false
  },
  {
    id: 8,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Content Audit',
    description: 'Review existing content and identify gaps',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [1],
    deliverables: ['Content inventory', 'Content gap analysis'],
    requiresApproval: false
  },
  {
    id: 9,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Brand Analysis',
    description: 'Understand brand identity, values, and positioning',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [1],
    deliverables: ['Brand guidelines review', 'Brand positioning document'],
    requiresApproval: false
  },
  {
    id: 10,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Stakeholder Interviews',
    description: 'Interview key stakeholders for insights and requirements',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [1],
    deliverables: ['Interview transcripts', 'Stakeholder insights report'],
    requiresApproval: false
  },
  {
    id: 11,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Current System Analysis',
    description: 'Analyze existing systems and integration points',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [7],
    deliverables: ['System analysis report', 'Integration requirements'],
    requiresApproval: false
  },
  {
    id: 12,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Data Requirements Analysis',
    description: 'Define data models, flows, and storage needs',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [7, 11],
    deliverables: ['Data flow diagrams', 'Database requirements'],
    requiresApproval: false
  },
  {
    id: 13,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Security & Compliance Review',
    description: 'Identify security requirements and compliance needs',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [7],
    deliverables: ['Security requirements', 'Compliance checklist'],
    requiresApproval: true
  },
  {
    id: 14,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Discovery Findings Compilation',
    description: 'Compile all research findings into comprehensive report',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13],
    deliverables: ['Discovery phase report', 'Executive summary'],
    requiresApproval: false
  },
  {
    id: 15,
    phase: 'discovery',
    phaseColor: 'blue',
    title: 'Discovery Phase Review',
    description: 'Present findings and get client approval to proceed',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [14],
    deliverables: ['Presentation deck', 'Approved discovery report'],
    requiresApproval: true,
    milestoneStep: true
  },

  // PLANNING & STRATEGY PHASE (16-25)
  {
    id: 16,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Project Scope Definition',
    description: 'Define clear project boundaries and deliverables',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [15],
    deliverables: ['Project scope document', 'Out-of-scope items list'],
    requiresApproval: true
  },
  {
    id: 17,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Feature Prioritization',
    description: 'Prioritize features using MoSCoW method',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [16],
    deliverables: ['Feature priority matrix', 'MVP feature list'],
    requiresApproval: true
  },
  {
    id: 18,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Technical Architecture Planning',
    description: 'Design system architecture and technology stack',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [12, 13],
    deliverables: ['Architecture diagram', 'Technology stack document'],
    requiresApproval: false
  },
  {
    id: 19,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Resource Planning',
    description: 'Plan team allocation and resource requirements',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [16],
    deliverables: ['Resource allocation plan', 'Team structure'],
    requiresApproval: false
  },
  {
    id: 20,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Risk Assessment',
    description: 'Identify and plan for potential risks',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [16],
    deliverables: ['Risk register', 'Mitigation strategies'],
    requiresApproval: false
  },
  {
    id: 21,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Timeline Development',
    description: 'Create detailed project timeline with milestones',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [17, 19],
    deliverables: ['Project timeline', 'Milestone schedule'],
    requiresApproval: true
  },
  {
    id: 22,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Budget Planning',
    description: 'Detailed budget breakdown and cost analysis',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [19, 21],
    deliverables: ['Budget breakdown', 'Cost-benefit analysis'],
    requiresApproval: true
  },
  {
    id: 23,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Communication Plan',
    description: 'Establish communication protocols and schedules',
    estimatedHours: 1,
    status: 'not-started',
    dependencies: [19],
    deliverables: ['Communication plan', 'Meeting schedule'],
    requiresApproval: false
  },
  {
    id: 24,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Success Metrics Definition',
    description: 'Define KPIs and success criteria',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [16],
    deliverables: ['KPI framework', 'Success metrics document'],
    requiresApproval: true
  },
  {
    id: 25,
    phase: 'planning',
    phaseColor: 'purple',
    title: 'Planning Phase Approval',
    description: 'Get final approval on all planning documents',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [16, 17, 18, 19, 20, 21, 22, 23, 24],
    deliverables: ['Signed project plan', 'Approved budget'],
    requiresApproval: true,
    milestoneStep: true
  },

  // DESIGN & UX PHASE (26-40)
  {
    id: 26,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Design Research & Inspiration',
    description: 'Gather design inspiration and create mood boards',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [25],
    deliverables: ['Mood boards', 'Design inspiration deck'],
    requiresApproval: false
  },
  {
    id: 27,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Information Architecture',
    description: 'Create site structure and navigation flow',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [6],
    deliverables: ['Sitemap', 'Navigation structure'],
    requiresApproval: true
  },
  {
    id: 28,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Wireframe Sketches',
    description: 'Initial low-fidelity wireframe sketches',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [27],
    deliverables: ['Wireframe sketches', 'Layout concepts'],
    requiresApproval: false
  },
  {
    id: 29,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Design System Creation',
    description: 'Establish colors, typography, spacing, and components',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [26, 9],
    deliverables: ['Design system', 'Component library'],
    requiresApproval: true
  },
  {
    id: 30,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Digital Wireframes',
    description: 'Create detailed digital wireframes for all pages',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [28, 29],
    deliverables: ['Digital wireframes', 'Annotations'],
    requiresApproval: true
  },
  {
    id: 31,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Interactive Prototyping',
    description: 'Build clickable prototypes for user testing',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [30],
    deliverables: ['Interactive prototype', 'Prototype documentation'],
    requiresApproval: false
  },
  {
    id: 32,
    phase: 'design',
    phaseColor: 'pink',
    title: 'User Testing Sessions',
    description: 'Conduct user testing with prototypes',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [31],
    deliverables: ['Testing recordings', 'User feedback report'],
    requiresApproval: false
  },
  {
    id: 33,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Design Iteration Round 1',
    description: 'Refine designs based on user feedback',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [32],
    deliverables: ['Updated wireframes', 'Change log'],
    requiresApproval: false
  },
  {
    id: 34,
    phase: 'design',
    phaseColor: 'pink',
    title: 'High-Fidelity Mockups',
    description: 'Create pixel-perfect designs for all screens',
    estimatedHours: 8,
    status: 'not-started',
    dependencies: [33, 29],
    deliverables: ['High-fidelity designs', 'Design specifications'],
    requiresApproval: true
  },
  {
    id: 35,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Mobile & Responsive Design',
    description: 'Adapt designs for all device sizes',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [34],
    deliverables: ['Responsive designs', 'Device mockups'],
    requiresApproval: false
  },
  {
    id: 36,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Micro-interactions & Animations',
    description: 'Design subtle animations and interactions',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [34],
    deliverables: ['Animation specs', 'Interaction guidelines'],
    requiresApproval: false
  },
  {
    id: 37,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Design QA & Polish',
    description: 'Final design quality check and refinements',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [35, 36],
    deliverables: ['Final designs', 'QA checklist'],
    requiresApproval: false
  },
  {
    id: 38,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Design Handoff Preparation',
    description: 'Prepare designs for developer handoff',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [37],
    deliverables: ['Design specs', 'Asset exports', 'Style guide'],
    requiresApproval: false
  },
  {
    id: 39,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Client Design Review',
    description: 'Present final designs for client approval',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [38],
    deliverables: ['Presentation', 'Feedback notes'],
    requiresApproval: true
  },
  {
    id: 40,
    phase: 'design',
    phaseColor: 'pink',
    title: 'Design Phase Sign-off',
    description: 'Get final design approval before development',
    estimatedHours: 1,
    status: 'not-started',
    dependencies: [39],
    deliverables: ['Signed design approval', 'Final design package'],
    requiresApproval: true,
    milestoneStep: true
  },

  // DEVELOPMENT PHASE (41-60)
  {
    id: 41,
    phase: 'development',
    phaseColor: 'green',
    title: 'Development Environment Setup',
    description: 'Set up development, staging, and CI/CD pipelines',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [40],
    deliverables: ['Dev environment', 'CI/CD pipeline'],
    requiresApproval: false
  },
  {
    id: 42,
    phase: 'development',
    phaseColor: 'green',
    title: 'Database Design & Setup',
    description: 'Create database schema and relationships',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [18],
    deliverables: ['Database schema', 'Migration scripts'],
    requiresApproval: false
  },
  {
    id: 43,
    phase: 'development',
    phaseColor: 'green',
    title: 'Authentication System',
    description: 'Implement user authentication and authorization',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [42],
    deliverables: ['Auth system', 'User management'],
    requiresApproval: false
  },
  {
    id: 44,
    phase: 'development',
    phaseColor: 'green',
    title: 'Core API Development',
    description: 'Build backend APIs and services',
    estimatedHours: 10,
    status: 'not-started',
    dependencies: [42],
    deliverables: ['API endpoints', 'API documentation'],
    requiresApproval: false
  },
  {
    id: 45,
    phase: 'development',
    phaseColor: 'green',
    title: 'Frontend Framework Setup',
    description: 'Set up React/Next.js with routing and state management',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [41],
    deliverables: ['Frontend architecture', 'Routing setup'],
    requiresApproval: false
  },
  {
    id: 46,
    phase: 'development',
    phaseColor: 'green',
    title: 'Component Library Development',
    description: 'Build reusable UI components based on design system',
    estimatedHours: 8,
    status: 'not-started',
    dependencies: [45, 29],
    deliverables: ['Component library', 'Storybook setup'],
    requiresApproval: false
  },
  {
    id: 47,
    phase: 'development',
    phaseColor: 'green',
    title: 'Homepage Implementation',
    description: 'Develop the main landing page',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [46],
    deliverables: ['Homepage', 'Hero section', 'CTA elements'],
    requiresApproval: true
  },
  {
    id: 48,
    phase: 'development',
    phaseColor: 'green',
    title: 'User Dashboard Development',
    description: 'Build user dashboard and account pages',
    estimatedHours: 8,
    status: 'not-started',
    dependencies: [43, 46],
    deliverables: ['User dashboard', 'Profile pages'],
    requiresApproval: false
  },
  {
    id: 49,
    phase: 'development',
    phaseColor: 'green',
    title: 'Core Feature Implementation',
    description: 'Develop main application features',
    estimatedHours: 12,
    status: 'not-started',
    dependencies: [44, 48],
    deliverables: ['Core features', 'Feature documentation'],
    requiresApproval: false
  },
  {
    id: 50,
    phase: 'development',
    phaseColor: 'green',
    title: 'Payment Integration',
    description: 'Integrate payment processing system',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [44],
    deliverables: ['Payment system', 'Checkout flow'],
    requiresApproval: true
  },
  {
    id: 51,
    phase: 'development',
    phaseColor: 'green',
    title: 'Third-party Integrations',
    description: 'Connect external services and APIs',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [44],
    deliverables: ['Integrations', 'API connections'],
    requiresApproval: false
  },
  {
    id: 52,
    phase: 'development',
    phaseColor: 'green',
    title: 'Admin Panel Development',
    description: 'Build administrative dashboard and tools',
    estimatedHours: 8,
    status: 'not-started',
    dependencies: [43, 46],
    deliverables: ['Admin panel', 'Management tools'],
    requiresApproval: false
  },
  {
    id: 53,
    phase: 'development',
    phaseColor: 'green',
    title: 'Search & Filtering',
    description: 'Implement search functionality and filters',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [44, 49],
    deliverables: ['Search system', 'Filter components'],
    requiresApproval: false
  },
  {
    id: 54,
    phase: 'development',
    phaseColor: 'green',
    title: 'Notification System',
    description: 'Build email and push notification system',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [44],
    deliverables: ['Notification service', 'Email templates'],
    requiresApproval: false
  },
  {
    id: 55,
    phase: 'development',
    phaseColor: 'green',
    title: 'Performance Optimization',
    description: 'Optimize loading times and performance',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [49],
    deliverables: ['Performance report', 'Optimized code'],
    requiresApproval: false
  },
  {
    id: 56,
    phase: 'development',
    phaseColor: 'green',
    title: 'Security Implementation',
    description: 'Implement security measures and best practices',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [43, 44],
    deliverables: ['Security audit', 'Security measures'],
    requiresApproval: false
  },
  {
    id: 57,
    phase: 'development',
    phaseColor: 'green',
    title: 'Analytics Integration',
    description: 'Set up analytics and tracking',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [47],
    deliverables: ['Analytics setup', 'Tracking code'],
    requiresApproval: false
  },
  {
    id: 58,
    phase: 'development',
    phaseColor: 'green',
    title: 'SEO Implementation',
    description: 'Optimize for search engines',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [47],
    deliverables: ['SEO optimization', 'Meta tags', 'Sitemap'],
    requiresApproval: false
  },
  {
    id: 59,
    phase: 'development',
    phaseColor: 'green',
    title: 'Development Integration',
    description: 'Integrate all components and features',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [47, 48, 49, 50, 51, 52, 53, 54],
    deliverables: ['Integrated application', 'Integration tests'],
    requiresApproval: false
  },
  {
    id: 60,
    phase: 'development',
    phaseColor: 'green',
    title: 'Development Review',
    description: 'Internal review of development work',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [59],
    deliverables: ['Code review', 'Development checklist'],
    requiresApproval: true,
    milestoneStep: true
  },

  // TESTING & QA PHASE (61-68)
  {
    id: 61,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'Unit Testing',
    description: 'Write and run unit tests for all components',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [60],
    deliverables: ['Unit tests', 'Test coverage report'],
    requiresApproval: false
  },
  {
    id: 62,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'Integration Testing',
    description: 'Test integration between components',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [61],
    deliverables: ['Integration tests', 'Test results'],
    requiresApproval: false
  },
  {
    id: 63,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'Cross-browser Testing',
    description: 'Test on all major browsers and devices',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [60],
    deliverables: ['Browser test report', 'Compatibility fixes'],
    requiresApproval: false
  },
  {
    id: 64,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'Performance Testing',
    description: 'Load testing and performance optimization',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [55],
    deliverables: ['Performance test results', 'Optimization report'],
    requiresApproval: false
  },
  {
    id: 65,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'Security Testing',
    description: 'Penetration testing and vulnerability assessment',
    estimatedHours: 5,
    status: 'not-started',
    dependencies: [56],
    deliverables: ['Security test report', 'Vulnerability fixes'],
    requiresApproval: true
  },
  {
    id: 66,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'User Acceptance Testing',
    description: 'Client testing and feedback collection',
    estimatedHours: 6,
    status: 'not-started',
    dependencies: [62],
    deliverables: ['UAT results', 'Client feedback'],
    requiresApproval: true
  },
  {
    id: 67,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'Bug Fixes & Polish',
    description: 'Fix all identified bugs and issues',
    estimatedHours: 8,
    status: 'not-started',
    dependencies: [66],
    deliverables: ['Bug fixes', 'Polish improvements'],
    requiresApproval: false
  },
  {
    id: 68,
    phase: 'testing',
    phaseColor: 'orange',
    title: 'Final QA Sign-off',
    description: 'Complete final quality assurance',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [67],
    deliverables: ['QA approval', 'Test completion report'],
    requiresApproval: true,
    milestoneStep: true
  },

  // LAUNCH & DEPLOYMENT PHASE (69-75)
  {
    id: 69,
    phase: 'launch',
    phaseColor: 'red',
    title: 'Production Environment Setup',
    description: 'Configure production servers and infrastructure',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [68],
    deliverables: ['Production environment', 'Server configuration'],
    requiresApproval: false
  },
  {
    id: 70,
    phase: 'launch',
    phaseColor: 'red',
    title: 'Domain & SSL Configuration',
    description: 'Set up domain and SSL certificates',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [69],
    deliverables: ['Domain setup', 'SSL certificates'],
    requiresApproval: false
  },
  {
    id: 71,
    phase: 'launch',
    phaseColor: 'red',
    title: 'Data Migration',
    description: 'Migrate data to production environment',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [69],
    deliverables: ['Migrated data', 'Migration report'],
    requiresApproval: true
  },
  {
    id: 72,
    phase: 'launch',
    phaseColor: 'red',
    title: 'Launch Preparation',
    description: 'Final checks and launch preparation',
    estimatedHours: 3,
    status: 'not-started',
    dependencies: [70, 71],
    deliverables: ['Launch checklist', 'Go-live plan'],
    requiresApproval: true
  },
  {
    id: 73,
    phase: 'launch',
    phaseColor: 'red',
    title: 'Production Deployment',
    description: 'Deploy application to production',
    estimatedHours: 2,
    status: 'not-started',
    dependencies: [72],
    deliverables: ['Live application', 'Deployment logs'],
    requiresApproval: true,
    milestoneStep: true
  },
  {
    id: 74,
    phase: 'launch',
    phaseColor: 'red',
    title: 'Post-Launch Monitoring',
    description: 'Monitor application performance and stability',
    estimatedHours: 8,
    status: 'not-started',
    dependencies: [73],
    deliverables: ['Monitoring reports', 'Performance metrics'],
    requiresApproval: false
  },
  {
    id: 75,
    phase: 'launch',
    phaseColor: 'red',
    title: 'Handover & Training',
    description: 'Client training and project handover',
    estimatedHours: 4,
    status: 'not-started',
    dependencies: [73],
    deliverables: ['Training materials', 'Documentation', 'Support plan'],
    requiresApproval: true,
    milestoneStep: true
  }
];

// Helper function to get steps by phase
export function getStepsByPhase(phase: string): PDRTimelineStep[] {
  return PDR_75_STEPS.filter(step => step.phase === phase);
}

// Helper function to get milestone steps
export function getMilestoneSteps(): PDRTimelineStep[] {
  return PDR_75_STEPS.filter(step => step.milestoneStep);
}

// Helper function to calculate total estimated hours
export function getTotalEstimatedHours(): number {
  return PDR_75_STEPS.reduce((total, step) => total + step.estimatedHours, 0);
}

// Helper function to get completion percentage
export function getCompletionPercentage(steps: PDRTimelineStep[]): number {
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  return Math.round((completedSteps / steps.length) * 100);
}