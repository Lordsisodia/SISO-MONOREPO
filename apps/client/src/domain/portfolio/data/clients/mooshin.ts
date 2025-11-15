import { PortfolioClient } from '../../types';
export const mooshin: PortfolioClient = {
  id: 'mooshin', name: 'Mooshin', industry: 'elearning',
  tagline: 'Martial arts course selling platform',
  description: 'Online course marketplace for martial arts instruction with payment processing.',
  liveUrl: undefined, projectType: 'Platform', status: 'Live', launchDate: '2024-09-01',
  timeline: { startDate: '2024-08-15', endDate: '2024-09-01', durationDays: 17, phases: [] },
  pricing: { marketValue: 15000, sisoPrice: 5000, currency: 'GBP', savings: 67 },
  features: { key: ['Course catalog', 'Payment processing', 'Student portal'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/mooshin/logo.png', screenshots: { desktop: ['/portfolio/mooshin/desktop/hero.png'], mobile: ['/portfolio/mooshin/mobile/home.png'], features: [] } },
  metadata: { featured: false, showInPortfolio: true, seoTitle: 'Mooshin - Martial Arts Courses | SISO Portfolio', seoDescription: 'Martial arts online course platform', tags: ['elearning', 'courses', 'martial-arts'] }
};
