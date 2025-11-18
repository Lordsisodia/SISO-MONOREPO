/**
 * Portfolio Client Data - CreativeHub Agency
 */

import { PortfolioClient } from '../../types';

export const creativeHubAgency: PortfolioClient = {
  // Basic Info
  id: 'creative-hub-agency',
  name: 'CreativeHub Agency',
  industry: 'saas',
  tagline: 'Portfolio showcase platform for creative agencies',
  description:
    'Modern portfolio and project showcase platform for creative agencies to display their work, manage client projects, and win new business. Features interactive portfolio galleries, client testimonials, case study templates, and integrated contact forms with CRM capabilities.',

  // URLs
  liveUrl: 'https://creativehub.example.com',
  githubUrl: undefined,
  caseStudyUrl: undefined,

  // Project Details
  projectType: 'Website + CMS',
  status: 'Live',
  launchDate: '2024-07-25',

  // Timeline
  timeline: {
    startDate: '2024-07-10',
    endDate: '2024-07-25',
    durationDays: 15,
    phases: [
      {
        name: 'Discovery',
        description: 'Brand workshop, portfolio audit, competitor research',
        duration: '2 days',
      },
      {
        name: 'Design',
        description: 'Portfolio layout design, case study templates, responsive mockups',
        duration: '3 days',
      },
      {
        name: 'Development',
        description: 'CMS integration, portfolio galleries, client management',
        duration: '8 days',
      },
      {
        name: 'Launch',
        description: 'Content migration, SEO optimization, deployment',
        duration: '2 days',
      },
    ],
  },

  // Pricing
  pricing: {
    min: 5000,
    max: 10000,
    currency: 'GBP',
    deliveryTime: '10-15 days',
  },

  // Features
  features: {
    key: [
      'Interactive portfolio gallery with filtering',
      'Case study template system',
      'Client testimonial management',
      'Team member profiles',
      'Integrated contact and quote forms',
      'Blog and news section',
    ],
    technical: [
      'Headless CMS for easy content updates',
      'Image optimization and lazy loading',
      'SEO-optimized case study pages',
      'Analytics and visitor tracking',
      'Email integration for leads',
    ],
    integrations: ['Sanity CMS', 'SendGrid', 'Google Analytics', 'Cloudinary Images'],
  },

  // Tech Stack
  techStack: {
    frontend: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    backend: ['Next.js API Routes', 'Sanity.io'],
    database: ['Sanity CMS'],
    hosting: ['Vercel', 'Cloudinary CDN'],
    tools: ['ESLint', 'Prettier', 'Figma'],
  },

  // Market Analysis
  marketAnalysis: {
    competitorsSurveyed: ['Squarespace', 'Webflow', 'Custom agency sites'],
    uniqueSellingPoints: [
      'Fully custom design (not template-based)',
      'CMS-powered for easy content updates',
      'Faster performance than Squarespace',
      'Better SEO than template platforms',
    ],
    targetAudience: 'Creative agencies, design studios, marketing teams',
    marketPosition: 'Premium custom solution vs DIY platforms',
  },

  // AI Agents
  aiAgents: {
    agentsUsed: ['Analyst', 'PM', 'UX Expert', 'Dev', 'Content Writer'],
    workPerformed: [
      'Creative industry competitive analysis',
      'Portfolio layout best practices research',
      'Case study template design',
      'CMS integration development',
      'SEO optimization for creative services',
    ],
    automationHighlights: [
      'Portfolio layout designed in 6 hours (vs 3 days)',
      'CMS integration completed in 2 days (vs 2 weeks)',
      'Full site launched in 15 days (vs 2 months)',
    ],
  },

  // Results
  results: {
    deliverySpeed: '15 days from concept to launch',
    performanceMetrics: {
      pageLoadTime: '1.2s',
      lighthouseScore: 95,
      uptime: '99.9%',
    },
    businessImpact: '3x increase in quality leads, 2x improvement in conversion rate',
    clientSatisfaction: 5,
  },

  // Testimonial
  testimonial: {
    text:
      'Our new portfolio site has completely transformed our agency. We\'re getting better quality leads and closing deals faster. SISO\'s AI-powered approach delivered exactly what we needed in record time.',
    author: 'Sarah Mitchell',
    title: 'Creative Director',
    role: 'Creative Director',
  },

  // Media
  media: {
    logo: '/portfolio/creative-hub/logo.png',
    screenshots: {
      desktop: [
        'https://via.placeholder.com/1920x1080/0A0A0A/2196F3?text=CreativeHub+Home',
        'https://via.placeholder.com/1920x1080/0A0A0A/2196F3?text=Portfolio+Gallery',
        'https://via.placeholder.com/1920x1080/0A0A0A/2196F3?text=Case+Study+Page',
        'https://via.placeholder.com/1920x1080/0A0A0A/2196F3?text=Team+Page',
      ],
      mobile: [
        'https://via.placeholder.com/375x812/0A0A0A/2196F3?text=Mobile+Home',
        'https://via.placeholder.com/375x812/0A0A0A/2196F3?text=Mobile+Portfolio',
        'https://via.placeholder.com/375x812/0A0A0A/2196F3?text=Mobile+Contact',
      ],
      features: [],
    },
    videos: [],
  },

  // Metadata
  metadata: {
    featured: true,
    showInPortfolio: true,
    seoTitle: 'CreativeHub Agency - Portfolio Platform Case Study | SISO Portfolio',
    seoDescription:
      'Custom portfolio platform for creative agencies with CMS integration. Built in 15 days with AI-powered development.',
    tags: ['agency', 'portfolio', 'CMS', 'creative', 'showcase'],
  },
};
