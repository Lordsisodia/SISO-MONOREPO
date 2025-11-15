import { PortfolioClient } from '../../types';
export const optimal: PortfolioClient = {
  id: 'optimal', name: 'Optimal Building Maintenance', industry: 'construction',
  tagline: 'Construction company management and operations system',
  description: 'Complete project management and client portal for construction operations.',
  liveUrl: undefined, projectType: 'Platform', status: 'Live', launchDate: '2024-05-01',
  timeline: { startDate: '2024-04-15', endDate: '2024-05-01', durationDays: 16, phases: [] },
  pricing: { marketValue: 12000, sisoPrice: 4000, currency: 'GBP', savings: 67 },
  features: { key: ['Project management', 'Client portal', 'Scheduling'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/optimal/logo.png', screenshots: { desktop: ['/portfolio/optimal/desktop/hero.png'], mobile: ['/portfolio/optimal/mobile/home.png'], features: [] } },
  metadata: { featured: false, showInPortfolio: true, seoTitle: 'Optimal Building Maintenance | SISO Portfolio', seoDescription: 'Construction management system', tags: ['construction', 'management'] }
};
