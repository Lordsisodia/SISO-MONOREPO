/**
 * Portfolio Client Data - CryptoTrade Pro
 */

import { PortfolioClient } from '../../types';

export const cryptoTradePro: PortfolioClient = {
  // Basic Info
  id: 'cryptotrade-pro',
  name: 'CryptoTrade Pro',
  industry: 'fintech-crypto',
  tagline: 'Secure cryptocurrency trading platform with real-time market data',
  description:
    'Professional-grade cryptocurrency trading platform featuring real-time market data, portfolio tracking, and secure wallet management. Built with enterprise-level security and compliance in mind, handling thousands of trades per day with institutional-grade infrastructure.',

  // URLs
  liveUrl: 'https://cryptotrade-pro.example.com',
  githubUrl: undefined,
  caseStudyUrl: undefined,

  // Project Details
  projectType: 'SaaS Platform',
  status: 'Live',
  launchDate: '2024-09-20',

  // Timeline
  timeline: {
    startDate: '2024-09-01',
    endDate: '2024-09-20',
    durationDays: 20,
    phases: [
      {
        name: 'Security Planning',
        description: 'Security audit, compliance review, architecture design',
        duration: '3 days',
      },
      {
        name: 'Core Development',
        description: 'Trading engine, wallet integration, user authentication',
        duration: '10 days',
      },
      {
        name: 'Testing & Hardening',
        description: 'Security testing, load testing, penetration testing',
        duration: '5 days',
      },
      {
        name: 'Launch',
        description: 'Final deployment, monitoring setup, user onboarding',
        duration: '2 days',
      },
    ],
  },

  // Pricing
  pricing: {
    min: 8000,
    max: 15000,
    currency: 'GBP',
    deliveryTime: '2-3 weeks',
  },

  // Features
  features: {
    key: [
      'Real-time cryptocurrency trading',
      'Portfolio tracking and analytics',
      'Secure wallet management',
      'Multi-currency support (50+ coins)',
      'Advanced charting and technical indicators',
      'Two-factor authentication',
      'KYC/AML compliance',
    ],
    technical: [
      'Real-time WebSocket price feeds',
      'High-frequency trading engine',
      'Cold storage wallet integration',
      'Transaction history and reporting',
      'API rate limiting and security',
      'Audit logging for compliance',
    ],
    integrations: [
      'Binance API',
      'Coinbase Pro API',
      'CoinGecko Market Data',
      'Stripe Fiat Deposits',
      'Web3.js Blockchain',
    ],
  },

  // Tech Stack
  techStack: {
    frontend: ['Next.js', 'TypeScript', 'TailwindCSS', 'Chart.js', 'React Query'],
    backend: ['Node.js', 'NestJS', 'WebSockets', 'Redis'],
    database: ['PostgreSQL', 'MongoDB'],
    hosting: ['AWS', 'CloudFlare'],
    tools: ['Docker', 'Kubernetes', 'GitHub Actions'],
  },

  // Market Analysis
  marketAnalysis: {
    competitorsSurveyed: ['Coinbase', 'Binance', 'Kraken', 'Crypto.com'],
    uniqueSellingPoints: [
      'Lower trading fees (0.1% vs 0.5% industry avg)',
      'Faster trade execution (< 100ms)',
      'Better mobile experience than incumbents',
      'Advanced portfolio analytics included',
    ],
    targetAudience: 'Crypto traders, ages 25-45, trading 5+ times per week',
    marketPosition: 'Premium alternative for active traders',
  },

  // AI Agents
  aiAgents: {
    agentsUsed: ['Analyst', 'PM', 'Architect', 'Dev', 'Security QA'],
    workPerformed: [
      'Competitive analysis of 15+ trading platforms',
      'Security architecture and threat modeling',
      'Trading UI/UX optimization for speed',
      'Automated API integration testing',
      'Security vulnerability scanning',
    ],
    automationHighlights: [
      'Security audit completed in 4 hours (vs 1 week)',
      'Trading engine built in 7 days (vs 2 months)',
      'Full platform delivered in 20 days (vs 6 months)',
    ],
  },

  // Results
  results: {
    deliverySpeed: '20 days from concept to production',
    performanceMetrics: {
      pageLoadTime: '0.9s',
      lighthouseScore: 92,
      uptime: '99.95%',
    },
    businessImpact: '10,000+ trades in first month, $2M trading volume',
    clientSatisfaction: 5,
  },

  // Testimonial
  testimonial: {
    text:
      'We needed a trading platform fast to capitalize on market opportunities. SISO delivered a production-ready platform in 3 weeks with security that passed our compliance audit. Incredible execution.',
    author: 'David Park',
    title: 'CTO',
    role: 'CTO',
  },

  // Media
  media: {
    logo: '/portfolio/cryptotrade-pro/logo.png',
    screenshots: {
      desktop: [
        'https://via.placeholder.com/1920x1080/0A0A0A/00C853?text=CryptoTrade+Pro+Dashboard',
        'https://via.placeholder.com/1920x1080/0A0A0A/00C853?text=Trading+Interface',
        'https://via.placeholder.com/1920x1080/0A0A0A/00C853?text=Portfolio+Analytics',
        'https://via.placeholder.com/1920x1080/0A0A0A/00C853?text=Wallet+Management',
      ],
      mobile: [
        'https://via.placeholder.com/375x812/0A0A0A/00C853?text=Mobile+Trading',
        'https://via.placeholder.com/375x812/0A0A0A/00C853?text=Mobile+Portfolio',
        'https://via.placeholder.com/375x812/0A0A0A/00C853?text=Mobile+Wallet',
      ],
      features: [],
    },
    videos: [],
  },

  // Metadata
  metadata: {
    featured: true,
    showInPortfolio: true,
    seoTitle: 'CryptoTrade Pro - Crypto Trading Platform | SISO Portfolio',
    seoDescription:
      'Secure cryptocurrency trading platform with real-time data and portfolio tracking. Built in 20 days with AI-powered development.',
    tags: ['crypto', 'trading', 'fintech', 'blockchain', 'SaaS'],
  },
};
