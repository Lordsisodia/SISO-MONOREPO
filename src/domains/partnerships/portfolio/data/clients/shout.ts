/**
 * Portfolio Client Data - Shout
 * TODO: Fill in actual client data
 */

import { PortfolioClient } from '../../types';

export const shout: PortfolioClient = {
  id: 'shout',
  name: 'Shout',
  industry: 'health-wellness',
  tagline: 'Cold shower habit tracking app',
  description: 'TODO: Add description',
  liveUrl: undefined,
  projectType: 'Web App',
  status: 'Live',
  launchDate: '2024-01-01',
  timeline: {
    startDate: '2024-01-01',
    endDate: '2024-01-10',
    durationDays: 10,
    phases: [],
  },
  pricing: {
    marketValue: 5000,
    sisoPrice: 2000,
    currency: 'GBP',
    savings: 60,
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
    logo: '/portfolio/shout/logo.png',
    screenshots: {
      desktop: ['/portfolio/shout/desktop/hero.png'],
      mobile: ['/portfolio/shout/mobile/home.png'],
      features: [],
    },
  },
  metadata: {
    featured: false,
    showInPortfolio: true,
    seoTitle: 'Shout - Cold Shower Tracker | SISO Portfolio',
    seoDescription: 'Habit tracking app for cold shower enthusiasts',
    tags: ['health', 'wellness', 'habits'],
  },
};
