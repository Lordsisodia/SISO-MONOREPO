import { PortfolioClient } from '../../types';
export const fiveStarHire: PortfolioClient = {
  id: 'five-star-hire', name: 'Five Star Car Hire', industry: 'transportation',
  tagline: 'Car rental booking platform',
  description: 'Vehicle rental booking system with catalog, pricing calculator, and reservations.',
  liveUrl: undefined, projectType: 'Web App', status: 'Live', launchDate: '2024-09-15',
  timeline: { startDate: '2024-09-01', endDate: '2024-09-15', durationDays: 14, phases: [] },
  pricing: { marketValue: 10000, sisoPrice: 3500, currency: 'GBP', savings: 65 },
  features: { key: ['Vehicle catalog', 'Booking system', 'Pricing calculator'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/five-star-hire/logo.png', screenshots: { desktop: ['/portfolio/five-star-hire/desktop/hero.png'], mobile: ['/portfolio/five-star-hire/mobile/home.png'], features: [] } },
  metadata: { featured: false, showInPortfolio: true, seoTitle: 'Five Star Car Hire | SISO Portfolio', seoDescription: 'Car rental platform', tags: ['rental', 'transportation'] }
};
