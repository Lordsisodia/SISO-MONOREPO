/**
 * Portfolio Client Data - The Golden Spoon Restaurant
 */

import { PortfolioClient } from '../../types';

export const goldenSpoonRestaurant: PortfolioClient = {
  // Basic Info
  id: 'golden-spoon-restaurant',
  name: 'The Golden Spoon',
  industry: 'food-beverage',
  tagline: 'Modern restaurant website with online ordering and reservations',
  description:
    'Complete restaurant website featuring online menu, table reservations, and integrated online ordering system. Built with mobile-first design for customers browsing on their phones, with a powerful admin dashboard for staff to manage bookings and orders in real-time.',

  // URLs
  liveUrl: 'https://goldenspo on.example.com',
  githubUrl: undefined,
  caseStudyUrl: undefined,

  // Project Details
  projectType: 'Website',
  status: 'Live',
  launchDate: '2024-08-10',

  // Timeline
  timeline: {
    startDate: '2024-08-01',
    endDate: '2024-08-10',
    durationDays: 10,
    phases: [
      {
        name: 'Discovery',
        description: 'Menu photography, brand analysis, competitor research',
        duration: '1 day',
      },
      {
        name: 'Design',
        description: 'Restaurant theme design, menu layout, booking flow mockups',
        duration: '2 days',
      },
      {
        name: 'Development',
        description: 'Online ordering system, reservation calendar, admin dashboard',
        duration: '5 days',
      },
      {
        name: 'Launch',
        description: 'Final testing, staff training, go-live deployment',
        duration: '2 days',
      },
    ],
  },

  // Pricing
  pricing: {
    min: 3000,
    max: 6000,
    currency: 'GBP',
    deliveryTime: '7-10 days',
  },

  // Features
  features: {
    key: [
      'Interactive digital menu with photos',
      'Online table reservation system',
      'Click-and-collect ordering',
      'Customer reviews and ratings',
      'Real-time availability updates',
      'Mobile-optimized for dine-in customers',
    ],
    technical: [
      'Email and SMS booking confirmations',
      'Payment processing integration',
      'Admin dashboard for staff',
      'Kitchen display system integration',
      'Analytics for popular dishes',
    ],
    integrations: ['Stripe', 'Twilio SMS', 'Google Maps', 'SendGrid Email'],
  },

  // Tech Stack
  techStack: {
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    backend: ['Node.js', 'Express', 'Prisma'],
    database: ['PostgreSQL'],
    hosting: ['Vercel', 'Supabase'],
    tools: ['Vite', 'Framer Motion'],
  },

  // Market Analysis
  marketAnalysis: {
    competitorsSurveyed: ['OpenTable', 'Resy', 'Local restaurant websites'],
    uniqueSellingPoints: [
      'Beautiful photography-first menu design',
      'Faster reservation flow (2 clicks vs 5)',
      'Integrated online ordering (no third-party fees)',
      'Custom branding matching restaurant aesthetic',
    ],
    targetAudience: 'Diners searching for upscale restaurants, ages 25-65, booking on mobile',
    marketPosition: 'Premium restaurant with modern online presence',
  },

  // AI Agents
  aiAgents: {
    agentsUsed: ['Analyst', 'PM', 'UX Expert', 'Dev'],
    workPerformed: [
      'Competitive analysis of restaurant booking platforms',
      'Menu design optimization for mobile viewing',
      'Reservation flow UX testing and refinement',
      'Automated booking system development',
    ],
    automationHighlights: [
      'Menu design completed in 3 hours (vs 2 days)',
      'Reservation system built in 1 day (vs 2 weeks)',
      'Full website launched in 10 days (vs 2 months)',
    ],
  },

  // Results
  results: {
    deliverySpeed: '10 days from brief to live',
    performanceMetrics: {
      pageLoadTime: '1.1s',
      lighthouseScore: 96,
      uptime: '99.9%',
    },
    businessImpact: '50% increase in online reservations, 40% reduction in no-shows',
    clientSatisfaction: 5,
  },

  // Testimonial
  testimonial: {
    text:
      'SISO transformed our online presence in just 10 days. The online ordering system alone has increased our takeaway sales by 40%. Worth every penny!',
    author: 'James Chen',
    title: 'Owner & Head Chef',
    role: 'Owner & Head Chef',
  },

  // Media
  media: {
    logo: '/portfolio/golden-spoon/logo.png',
    screenshots: {
      desktop: [
        'https://via.placeholder.com/1920x1080/0A0A0A/FF5722?text=Golden+Spoon+Desktop+Home',
        'https://via.placeholder.com/1920x1080/0A0A0A/FF5722?text=Menu+Page',
        'https://via.placeholder.com/1920x1080/0A0A0A/FF5722?text=Reservation+System',
        'https://via.placeholder.com/1920x1080/0A0A0A/FF5722?text=Admin+Dashboard',
      ],
      mobile: [
        'https://via.placeholder.com/375x812/0A0A0A/FF5722?text=Mobile+Home',
        'https://via.placeholder.com/375x812/0A0A0A/FF5722?text=Mobile+Menu',
        'https://via.placeholder.com/375x812/0A0A0A/FF5722?text=Mobile+Booking',
      ],
      features: [],
    },
    videos: [],
  },

  // Metadata
  metadata: {
    featured: true,
    showInPortfolio: true,
    seoTitle: 'The Golden Spoon - Restaurant Website Case Study | SISO Portfolio',
    seoDescription:
      'Modern restaurant website with online ordering and reservations. Built in 10 days with AI-powered development.',
    tags: ['restaurant', 'online ordering', 'reservations', 'food', 'dining'],
  },
};
