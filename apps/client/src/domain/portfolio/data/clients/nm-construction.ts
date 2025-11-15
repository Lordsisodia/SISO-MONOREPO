import { PortfolioClient } from '../../types';
export const nmConstruction: PortfolioClient = {
  id: 'nm-construction', name: 'NM Construction', industry: 'construction',
  tagline: 'Construction business operations and job tracking system',
  description: 'Business management system for construction company operations.',
  liveUrl: undefined, projectType: 'Platform', status: 'Live', launchDate: '2024-06-01',
  timeline: { startDate: '2024-05-15', endDate: '2024-06-01', durationDays: 17, phases: [] },
  pricing: { marketValue: 12000, sisoPrice: 4000, currency: 'GBP', savings: 67 },
  features: { key: ['Job tracking', 'Resource management', 'Client communication'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/nm-construction/logo.png', screenshots: { desktop: ['/portfolio/nm-construction/desktop/hero.png'], mobile: ['/portfolio/nm-construction/mobile/home.png'], features: [] } },
  metadata: { featured: false, showInPortfolio: true, seoTitle: 'NM Construction | SISO Portfolio', seoDescription: 'Construction operations system', tags: ['construction', 'operations'] }
};
