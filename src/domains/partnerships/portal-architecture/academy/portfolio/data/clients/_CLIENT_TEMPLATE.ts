/**
 * Portfolio Client Data - Template
 *
 * INSTRUCTIONS:
 * 1. Copy this file and rename it to the client slug (e.g., uber-crypt.ts)
 * 2. Replace all [PLACEHOLDERS] with actual data
 * 3. Remove optional fields if not applicable (marketAnalysis, aiAgents, results, testimonial)
 * 4. Update export name to match client slug
 */

import { PortfolioClient } from '../../types';

export const [CLIENT_SLUG]: PortfolioClient = {
  // Basic Info
  id: '[client-slug]', // URL-safe: lowercase-with-hyphens
  name: '[Client Name]',
  industry: '[industry-category]', // See industry.types.ts for options
  tagline: '[One-sentence description]',
  description: '[2-3 sentences about the project]',

  // URLs
  liveUrl: '[https://example.com]', // or undefined
  githubUrl: undefined,
  caseStudyUrl: undefined,

  // Project Details
  projectType: '[Website|PWA|SaaS|Mobile App|Web App|Platform|Internal Tool]',
  status: '[Live|In Development|Maintenance|Archived]',
  launchDate: '[YYYY-MM-DD]',

  // Timeline
  timeline: {
    startDate: '[YYYY-MM-DD]',
    endDate: '[YYYY-MM-DD]',
    durationDays: 0, // Calculate based on start/end
    phases: [
      {
        name: 'Day 1',
        description: '[What happened on Day 1]',
        completedDate: '[YYYY-MM-DD]',
      },
      // Add more phases as needed
    ],
  },

  // Pricing
  pricing: {
    marketValue: 0, // What market would charge
    sisoPrice: 0, // What SISO charged
    currency: 'GBP', // or 'USD', 'EUR'
    priceRange: '£X,XXX - £X,XXX', // Optional
    paymentStructure: '50% Day 1, 50% on completion', // Optional
    savings: 0, // Calculate: ((marketValue - sisoPrice) / marketValue) * 100
  },

  // Features
  features: {
    key: [
      '[Key feature 1]',
      '[Key feature 2]',
      '[Key feature 3]',
      // Add more
    ],
    technical: [
      '[Technical feature 1]',
      '[Technical feature 2]',
      // Add more
    ],
    integrations: [
      '[Third-party integration 1]',
      // Add more
    ],
  },

  // Tech Stack
  techStack: {
    frontend: ['[Tech 1]', '[Tech 2]'],
    backend: ['[Tech 1]', '[Tech 2]'],
    database: ['[Database]'],
    hosting: ['[Hosting service]'],
    tools: ['[Tool 1]', '[Tool 2]'],
  },

  // Market Analysis (OPTIONAL - remove if not applicable)
  marketAnalysis: {
    competitorsSurveyed: ['[Competitor 1]', '[Competitor 2]'],
    uniqueSellingPoints: ['[USP 1]', '[USP 2]'],
    targetAudience: '[Target audience description]',
    marketPosition: '[Market positioning]',
  },

  // AI Agents (OPTIONAL - remove if not applicable)
  aiAgents: {
    agentsUsed: ['Analyst', 'PM', 'Dev'], // Which agents worked on this
    workPerformed: ['[Work 1]', '[Work 2]'],
    automationHighlights: ['[Highlight 1]', '[Highlight 2]'],
  },

  // Results (OPTIONAL - remove if not available)
  results: {
    deliverySpeed: '[X days/weeks from brief to live]',
    performanceMetrics: {
      pageLoadTime: '[X.Xs]',
      lighthouseScore: 0, // 0-100
      uptime: '[XX.X%]',
    },
    businessImpact: '[Business impact description]',
    clientSatisfaction: 0, // 1-5
  },

  // Testimonial (OPTIONAL - remove if not available)
  testimonial: {
    quote: '[Client testimonial quote]',
    author: '[Client Name]',
    title: '[Client Title]',
    photo: '/portfolio/[client-slug]/testimonial-[name].jpg', // Optional
  },

  // Media
  media: {
    logo: '/portfolio/[client-slug]/logo.png',
    screenshots: {
      desktop: [
        '/portfolio/[client-slug]/desktop/hero.png',
        '/portfolio/[client-slug]/desktop/page-1.png',
        // Add more
      ],
      mobile: [
        '/portfolio/[client-slug]/mobile/home.png',
        '/portfolio/[client-slug]/mobile/page-1.png',
        // Add more
      ],
      features: [
        '/portfolio/[client-slug]/features/feature-1.png',
        // Add more
      ],
    },
    videos: [], // Optional
  },

  // Metadata
  metadata: {
    featured: false, // true if should appear in featured section
    showInPortfolio: true,
    seoTitle: '[Client Name] - [Project Type] | SISO Portfolio',
    seoDescription: '[SEO-optimized description including key features and tech]',
    tags: ['[tag1]', '[tag2]', '[tag3]'], // Relevant keywords
  },
};
