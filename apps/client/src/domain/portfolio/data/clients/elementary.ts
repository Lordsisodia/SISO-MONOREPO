import { PortfolioClient } from '../../types';
export const elementary: PortfolioClient = {
  id: 'elementary', name: 'Elementary', industry: 'food-beverage',
  tagline: 'Restaurant website and reservation system',
  description: 'Modern restaurant website with menu showcase and online reservations.',
  liveUrl: undefined, projectType: 'Website', status: 'Live', launchDate: '2024-10-01',
  timeline: { startDate: '2024-09-20', endDate: '2024-10-01', durationDays: 11, phases: [] },
  pricing: { marketValue: 6000, sisoPrice: 2500, currency: 'GBP', savings: 58 },
  features: { key: ['Menu showcase', 'Online reservations', 'Contact system'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/elementary/logo.png', screenshots: { desktop: ['/portfolio/elementary/desktop/hero.png'], mobile: ['/portfolio/elementary/mobile/home.png'], features: [] } },
  metadata: { featured: false, showInPortfolio: true, seoTitle: 'Elementary Restaurant | SISO Portfolio', seoDescription: 'Restaurant website and reservations', tags: ['restaurant', 'food'] }
};
