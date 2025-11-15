import { PortfolioClient } from '../../types';
export const teamApollo: PortfolioClient = {
  id: 'team-apollo', name: 'Team Apollo', industry: 'internal-tools',
  tagline: 'Internal team collaboration tool',
  description: 'Team collaboration and project coordination platform for internal use.',
  liveUrl: undefined, projectType: 'Internal Tool', status: 'Live', launchDate: '2024-05-15',
  timeline: { startDate: '2024-05-01', endDate: '2024-05-15', durationDays: 14, phases: [] },
  pricing: { marketValue: 8000, sisoPrice: 0, currency: 'GBP', savings: 100 },
  features: { key: ['Team collaboration', 'Project coordination', 'Internal tools'], technical: [], integrations: [] },
  techStack: { frontend: ['React', 'TypeScript'], backend: ['Node.js'], database: ['PostgreSQL'], hosting: ['Vercel'], tools: ['Vite'] },
  media: { logo: '/portfolio/team-apollo/logo.png', screenshots: { desktop: ['/portfolio/team-apollo/desktop/hero.png'], mobile: ['/portfolio/team-apollo/mobile/home.png'], features: [] } },
  metadata: { featured: false, showInPortfolio: true, seoTitle: 'Team Apollo | SISO Portfolio', seoDescription: 'Team collaboration tool', tags: ['internal', 'collaboration'] }
};
