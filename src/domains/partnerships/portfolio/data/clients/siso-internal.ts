import { PortfolioClient } from '../../types';
export const sisoInternal: PortfolioClient = {
  id: 'siso-internal', name: 'SISO Internal', industry: 'internal-tools',
  tagline: 'Internal task tracker and daily life manager for SISO agency',
  description: 'Complete task management and team coordination platform for internal agency use.',
  liveUrl: undefined, projectType: 'Internal Tool', status: 'Live', launchDate: '2024-08-01',
  timeline: { startDate: '2024-07-15', endDate: '2024-08-01', durationDays: 17, phases: [] },
  pricing: { marketValue: 10000, sisoPrice: 0, currency: 'GBP', savings: 100 },
  features: { key: ['Task management', 'Team coordination', 'Daily planning'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript', 'Tailwind CSS'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/siso-internal/logo.png', screenshots: { desktop: ['/portfolio/siso-internal/desktop/hero.png'], mobile: ['/portfolio/siso-internal/mobile/home.png'], features: [] } },
  metadata: { featured: true, showInPortfolio: true, seoTitle: 'SISO Internal - Task Manager | SISO Portfolio', seoDescription: 'Internal task and project management system', tags: ['internal', 'productivity', 'task-manager'] }
};
