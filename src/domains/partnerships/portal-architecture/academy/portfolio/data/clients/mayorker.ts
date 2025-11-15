/**
 * Portfolio Client Data - Mayorker Activities
 */

import { PortfolioClient } from '../../types';

export const mayorker: PortfolioClient = {
  // Basic Info
  id: 'mayorker',
  name: 'Mayorker Activities',
  industry: 'tourism-activities',
  tagline: 'Complete activity booking platform for Majorca tourism',
  description:
    'Multi-activity booking and rental management system for bike rentals, boat trips, and tour guides in Majorca, Spain. Built to handle multiple activity types with real-time availability.',

  // URLs
  liveUrl: 'https://mayorker.example.com', // Replace with actual URL
  githubUrl: undefined,
  caseStudyUrl: undefined,

  // Project Details
  projectType: 'Web App',
  status: 'Live',
  launchDate: '2024-06-15',

  // Timeline
  timeline: {
    startDate: '2024-06-01',
    endDate: '2024-06-15',
    durationDays: 14,
    phases: [
      {
        name: 'Day 1',
        description: 'Client brief, market analysis, mood board creation',
        completedDate: '2024-06-01',
      },
      {
        name: 'Day 2',
        description: 'Design mockups, database schema, core features development',
        completedDate: '2024-06-02',
      },
      {
        name: 'Week 2',
        description: 'Payment integration, admin dashboard, testing, deployment',
        completedDate: '2024-06-15',
      },
    ],
  },

  // Pricing
  pricing: {
    marketValue: 15000,
    sisoPrice: 5000,
    currency: 'GBP',
    priceRange: '£4,000 - £6,000',
    paymentStructure: '50% Day 1, 50% on completion',
    savings: 67, // 67% savings
  },

  // Features
  features: {
    key: [
      'Multi-activity booking system (bikes, boats, tours)',
      'Real-time availability calendar',
      'Secure payment processing (Stripe)',
      'Customer booking management',
      'Admin dashboard for staff',
      'Mobile-responsive design',
    ],
    technical: [
      'Real-time calendar synchronization',
      'Email notifications',
      'PDF receipt generation',
      'Multi-language support (EN, ES, DE)',
    ],
    integrations: ['Stripe', 'SendGrid', 'Google Maps API'],
  },

  // Tech Stack
  techStack: {
    frontend: ['React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'],
    backend: ['Node.js', 'Express', 'Prisma'],
    database: ['PostgreSQL'],
    hosting: ['Vercel', 'Supabase'],
    tools: ['Vite', 'ESLint', 'Prettier'],
  },

  // Market Analysis
  marketAnalysis: {
    competitorsSurveyed: ['GetYourGuide', 'Viator', 'Local Majorca booking sites'],
    uniqueSellingPoints: [
      'Local focus on Majorca activities',
      'Combined bike + boat + tour booking',
      'Faster booking flow (3 steps vs 5-7)',
      'Mobile-first design for tourists',
    ],
    targetAudience: 'Tourists visiting Majorca, ages 25-55, booking activities on mobile',
    marketPosition: 'Premium local alternative to global booking platforms',
  },

  // AI Agents (optional - fill in if applicable)
  aiAgents: {
    agentsUsed: ['Analyst', 'PM', 'UX Expert', 'Dev', 'QA'],
    workPerformed: [
      'Competitive analysis of 10+ booking platforms',
      'User journey mapping for tourist booking flow',
      'UI/UX design optimized for mobile tourists',
      'Automated code generation for booking logic',
      'End-to-end testing automation',
    ],
    automationHighlights: [
      'Market research completed in 2 hours (vs 2 days manual)',
      'Design mockups generated in 4 hours (vs 1 week)',
      'Core booking system built in 24 hours (vs 1 month)',
    ],
  },

  // Results (optional - fill in if available)
  results: {
    deliverySpeed: '14 days from brief to live',
    performanceMetrics: {
      pageLoadTime: '1.3s',
      lighthouseScore: 94,
      uptime: '99.8%',
    },
    businessImpact: '30% increase in online bookings vs phone bookings',
    clientSatisfaction: 5,
  },

  // Testimonial (optional - fill in if available)
  testimonial: {
    quote:
      'SISO delivered our complete booking platform in 2 weeks. Traditional agencies quoted 3 months and 3x the price. The AI-powered development was incredible to watch.',
    author: 'Maria Rodriguez',
    title: 'Owner, We Are Excursions',
    photo: '/portfolio/mayorker/testimonial-maria.jpg',
  },

  // Media
  media: {
    logo: '/portfolio/mayorker/logo.png',
    screenshots: {
      desktop: [
        '/portfolio/mayorker/desktop/hero.png',
        '/portfolio/mayorker/desktop/booking-page.png',
        '/portfolio/mayorker/desktop/admin-dashboard.png',
        '/portfolio/mayorker/desktop/calendar-view.png',
      ],
      mobile: [
        '/portfolio/mayorker/mobile/home.png',
        '/portfolio/mayorker/mobile/booking.png',
        '/portfolio/mayorker/mobile/activities.png',
        '/portfolio/mayorker/mobile/checkout.png',
      ],
      features: [
        '/portfolio/mayorker/features/calendar.png',
        '/portfolio/mayorker/features/payment.png',
        '/portfolio/mayorker/features/confirmation.png',
      ],
    },
    videos: [],
  },

  // Metadata
  metadata: {
    featured: true, // Show in featured section
    showInPortfolio: true,
    seoTitle: 'Mayorker Activities - Tourism Booking Platform | SISO Portfolio',
    seoDescription:
      'Complete activity booking system for bike rentals, boat trips, and tours in Majorca. Built in 14 days with AI-powered development.',
    tags: ['booking', 'tourism', 'activities', 'rental', 'PWA', 'Majorca'],
  },
};
