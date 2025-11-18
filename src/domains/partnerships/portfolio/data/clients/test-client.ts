/**
 * Portfolio Client Data - Test Client (Demo/Preview)
 * Complete example with all optional fields filled in
 */

import { PortfolioClient } from '../../types';

export const testClient: PortfolioClient = {
  // Basic Info
  id: 'test-client',
  name: 'Acme Fitness Studio',
  industry: 'fitness-sports',
  tagline: 'AI-powered fitness booking and membership management platform',
  description:
    'Complete fitness studio management system featuring class booking, membership management, personal training scheduling, and member engagement tools. Built to handle 500+ active members with real-time availability and automated billing.',

  // URLs
  liveUrl: 'https://demo.example.com',
  githubUrl: 'https://github.com/siso-agency/test-client',
  caseStudyUrl: undefined,

  // Project Details
  projectType: 'SaaS',
  status: 'Live',
  launchDate: '2024-10-15',

  // Timeline
  timeline: {
    startDate: '2024-10-01',
    endDate: '2024-10-15',
    durationDays: 14,
    phases: [
      {
        name: 'Day 1',
        description:
          'Client discovery call, competitive analysis of 8 fitness booking platforms, mood board creation, and initial database schema design.',
        completedDate: '2024-10-01',
      },
      {
        name: 'Day 2',
        description:
          'High-fidelity design mockups, complete feature specification, tech stack finalization, and development environment setup.',
        completedDate: '2024-10-02',
      },
      {
        name: 'Week 1',
        description:
          'Core booking system, membership management, admin dashboard, payment integration (Stripe), and email notification system.',
        completedDate: '2024-10-08',
      },
      {
        name: 'Week 2',
        description:
          'Mobile optimization, testing automation, performance optimization, client training, and production deployment.',
        completedDate: '2024-10-15',
      },
    ],
  },

  // Pricing
  pricing: {
    marketValue: 25000, // Traditional agency pricing
    sisoPrice: 8000, // SISO pricing
    currency: 'GBP',
    priceRange: '£7,000 - £9,000',
    paymentStructure: '40% Day 1, 30% Week 1, 30% on completion',
    savings: 68, // 68% savings
  },

  // Features
  features: {
    key: [
      'Real-time class booking with instant confirmation',
      'Automated membership billing and renewals',
      'Personal training session scheduling',
      'Member check-in system with QR codes',
      'Waitlist management with auto-notifications',
      'Mobile-first responsive design',
      'Admin dashboard with analytics',
      'Automated email and SMS reminders',
      'Multiple membership tier support',
      'Integration with payment processing',
    ],
    technical: [
      'Real-time availability synchronization across devices',
      'Automated recurring payment processing',
      'Email and SMS notification system',
      'PDF invoice and receipt generation',
      'Advanced analytics and reporting',
      'Role-based access control (admin, trainer, member)',
      'API for third-party integrations',
      'Automated backup and data recovery',
    ],
    integrations: [
      'Stripe (Payment Processing)',
      'SendGrid (Email Notifications)',
      'Twilio (SMS Notifications)',
      'Google Calendar (Schedule Sync)',
      'Mailchimp (Marketing)',
    ],
  },

  // Tech Stack
  techStack: {
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion'],
    backend: ['Node.js', 'Express', 'Prisma ORM'],
    database: ['PostgreSQL', 'Redis (caching)'],
    hosting: ['Vercel', 'Supabase', 'AWS S3'],
    tools: ['Vite', 'ESLint', 'Prettier', 'GitHub Actions', 'Sentry'],
  },

  // Market Analysis
  marketAnalysis: {
    competitorsSurveyed: [
      'Mindbody',
      'Glofox',
      'Zen Planner',
      'WellnessLiving',
      'Pike13',
      'ClubReady',
    ],
    uniqueSellingPoints: [
      'AI-powered class recommendations based on member preferences',
      '3-step booking flow (vs 7-step competitors)',
      'Mobile-first design optimized for on-the-go booking',
      'Automated waitlist management saves 10+ hours/week',
      'Real-time capacity management prevents overbooking',
      'Integrated billing reduces payment friction by 40%',
    ],
    targetAudience:
      'Fitness studio owners with 100-500 members, looking to automate booking and reduce admin overhead. Primary users: gym members ages 25-45 booking classes via mobile.',
    marketPosition:
      'Premium alternative to enterprise solutions (Mindbody) at 1/3 the cost, with modern UX and AI-powered features competitors lack.',
  },

  // AI Agents
  aiAgents: {
    agentsUsed: ['Analyst', 'PM', 'UX Expert', 'Architect', 'Dev', 'QA'],
    workPerformed: [
      'Analyst: Competitive analysis of 6 major fitness booking platforms',
      'PM: Created comprehensive PRD with 45 user stories',
      'UX Expert: Designed mobile-first booking flow with 60% fewer steps',
      'Architect: Designed scalable multi-tenant database architecture',
      'Dev: Generated 80% of booking system code automatically',
      'QA: Created automated test suite covering 95% of user journeys',
    ],
    automationHighlights: [
      'Market research completed in 3 hours (vs 2 weeks manually)',
      'Design mockups generated in 6 hours (vs 1 week with designers)',
      'Core booking system built in 3 days (vs 6 weeks traditional development)',
      'Automated testing saved 2 weeks of manual QA time',
      'Total delivery: 14 days vs 3-4 months traditional timeline',
    ],
  },

  // Results
  results: {
    deliverySpeed: '14 days from discovery to production launch',
    performanceMetrics: {
      pageLoadTime: '1.2s',
      lighthouseScore: 96,
      uptime: '99.9%',
    },
    businessImpact:
      '45% increase in class bookings, 60% reduction in admin time, 30% increase in membership retention. Client saved £17,000 vs traditional agency pricing.',
    clientSatisfaction: 5,
  },

  // Testimonial
  testimonial: {
    quote:
      'SISO completely transformed our booking process. What we thought would take 4 months and £25,000 was delivered in 2 weeks for £8,000. The AI agents worked around the clock and we could watch the progress in real-time. Our members love the new system and bookings are up 45%. Best investment we\'ve made in our business.',
    author: 'Sarah Mitchell',
    title: 'Owner & Head Trainer, Acme Fitness Studio',
    photo: 'https://i.pravatar.cc/150?img=5', // Placeholder avatar
  },

  // Media
  media: {
    logo: 'https://via.placeholder.com/200x200/FF6B35/FFFFFF?text=ACME',
    screenshots: {
      desktop: [
        'https://via.placeholder.com/1920x1080/1a1a1a/FF6B35?text=Hero+Section',
        'https://via.placeholder.com/1920x1080/1a1a1a/4CAF50?text=Class+Booking',
        'https://via.placeholder.com/1920x1080/1a1a1a/2196F3?text=Member+Dashboard',
        'https://via.placeholder.com/1920x1080/1a1a1a/9C27B0?text=Admin+Panel',
        'https://via.placeholder.com/1920x1080/1a1a1a/FF9800?text=Analytics',
      ],
      mobile: [
        'https://via.placeholder.com/375x667/1a1a1a/FF6B35?text=Mobile+Home',
        'https://via.placeholder.com/375x667/1a1a1a/4CAF50?text=Book+Class',
        'https://via.placeholder.com/375x667/1a1a1a/2196F3?text=My+Schedule',
        'https://via.placeholder.com/375x667/1a1a1a/9C27B0?text=Profile',
      ],
      features: [
        'https://via.placeholder.com/800x600/1a1a1a/FF6B35?text=QR+Check-in',
        'https://via.placeholder.com/800x600/1a1a1a/4CAF50?text=Waitlist+System',
        'https://via.placeholder.com/800x600/1a1a1a/2196F3?text=Billing+Dashboard',
      ],
    },
    videos: [],
  },

  // Metadata
  metadata: {
    featured: true, // Show in featured section
    showInPortfolio: true,
    seoTitle: 'Acme Fitness Studio - Complete Gym Management Platform | SISO Portfolio',
    seoDescription:
      'AI-powered fitness booking and membership management system. Built in 14 days, saving 68% vs traditional agencies. Real-time booking, automated billing, member engagement.',
    tags: [
      'fitness',
      'gym',
      'booking',
      'membership',
      'saas',
      'wellness',
      'class-management',
    ],
  },
};
