import { PortfolioClient } from '../../types';
export const trojanMma: PortfolioClient = {
  id: 'trojan-mma', name: 'Trojan MMA', industry: 'fitness-sports',
  tagline: 'MMA gym website and booking system',
  description: 'Professional MMA gym website with class schedules and membership signup.',
  liveUrl: undefined, projectType: 'Website', status: 'Live', launchDate: '2024-08-15',
  timeline: { startDate: '2024-08-01', endDate: '2024-08-15', durationDays: 14, phases: [] },
  pricing: { marketValue: 8000, sisoPrice: 3000, currency: 'GBP', savings: 63 },
  features: { key: ['Class schedules', 'Instructor profiles', 'Membership signup'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/trojan-mma/logo.png', screenshots: { desktop: ['/portfolio/trojan-mma/desktop/hero.png'], mobile: ['/portfolio/trojan-mma/mobile/home.png'], features: [] } },
  metadata: { featured: false, showInPortfolio: true, seoTitle: 'Trojan MMA | SISO Portfolio', seoDescription: 'MMA gym website', tags: ['mma', 'fitness', 'sports'] }
};
