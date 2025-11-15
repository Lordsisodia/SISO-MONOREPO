import { PortfolioClient } from '../../types';

export const uberCrypt: PortfolioClient = {
  id: 'uber-crypt',
  name: 'Uber Crypt',
  industry: 'fintech-crypto',
  tagline: 'Cryptocurrency trading and wallet application',
  description: 'Secure crypto wallet and trading platform with real-time market data.',
  liveUrl: undefined,
  projectType: 'Web App',
  status: 'Live',
  launchDate: '2024-03-01',
  timeline: {
    startDate: '2024-02-15',
    endDate: '2024-03-01',
    durationDays: 15,
    phases: [],
  },
  pricing: {
    marketValue: 20000,
    sisoPrice: 6000,
    currency: 'GBP',
    savings: 70,
  },
  features: {
    key: ['Crypto wallet management', 'Real-time trading', 'Portfolio tracking'],
    technical: [],
    integrations: [],
  },
  techStack: {
    frontend: ['React', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express'],
    database: ['PostgreSQL'],
    hosting: ['Vercel'],
    tools: ['Vite'],
  },
  pages: [
    { id: 'home', title: 'Home', route: '/' },
    { id: 'onboarding', title: 'Onboarding', route: '/onboarding' },
    { id: 'dashboard', title: 'Dashboard', route: '/dashboard' },
    { id: 'wallet', title: 'Wallet', route: '/wallet' },
    { id: 'trade', title: 'Trade', route: '/trade' },
    { id: 'settings', title: 'Settings', route: '/settings' },
  ],
  pageLinks: [
    { from: 'home', to: 'onboarding', label: 'Get started' },
    { from: 'onboarding', to: 'dashboard', label: 'Complete' },
    { from: 'dashboard', to: 'wallet' },
    { from: 'dashboard', to: 'trade' },
    { from: 'dashboard', to: 'settings' },
  ],
  media: {
    logo: '/portfolio/uber-crypt/logo.png',
    screenshots: {
      desktop: ['/portfolio/uber-crypt/desktop/hero.png'],
      mobile: ['/portfolio/uber-crypt/mobile/home.png'],
      features: [],
    },
  },
  metadata: {
    featured: false,
    showInPortfolio: true,
    seoTitle: 'Uber Crypt - Crypto Trading App | SISO Portfolio',
    seoDescription: 'Cryptocurrency trading and wallet management platform.',
    tags: ['crypto', 'fintech', 'trading', 'blockchain'],
  },
};
