/**
 * Portfolio Client Data - lets go
 * TODO: Fill in actual client data
 */

import { PortfolioClient } from '../../types';

export const letsGo: PortfolioClient = {
  id: 'lets-go',
  name: "Let's Go",
  industry: 'saas',
  tagline: 'Student housing matchmaking platform',
  description: 'University student housemate finder with profile matching and messaging.',
  liveUrl: undefined,
  projectType: 'Web App',
  status: 'Live',
  launchDate: '2024-01-01',
  timeline: {
    startDate: '2024-01-01',
    endDate: '2024-01-14',
    durationDays: 14,
    phases: [],
  },
  pricing: {
    marketValue: 10000,
    sisoPrice: 3000,
    currency: 'GBP',
    savings: 70,
  },
  features: {
    key: ['TODO: Add features'],
    technical: [],
    integrations: [],
  },
  techStack: {
    frontend: ['React', 'TypeScript'],
    backend: ['Node.js'],
    database: ['PostgreSQL'],
    hosting: ['Vercel'],
    tools: ['Vite'],
  },
  media: {
    logo: '/portfolio/lets-go/logo.png',
    screenshots: {
      desktop: ['/portfolio/lets-go/desktop/hero.png'],
      mobile: ['/portfolio/lets-go/mobile/home.png'],
      features: [],
    },
  },
  metadata: {
    featured: false,
    showInPortfolio: true,
    seoTitle: 'lets go | SISO Portfolio',
    seoDescription: 'TODO: Add SEO description',
    tags: ['TODO'],
  },
};
