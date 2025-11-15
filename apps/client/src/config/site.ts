// Site configuration - centralized settings for SISO Agency
export const siteConfig = {
  // Basic site info
  name: 'SISO Agency',
  tagline: 'Your Partner in Digital Transformation',
  description: 'Partner with SISO Agency to grow your business through cutting-edge digital solutions and AI-powered automation.',
  url: import.meta.env.VITE_SITE_URL || 'https://sisoagency.com',
  
  // Contact info
  contact: {
    email: 'partner@sisoagency.com',
    phone: '+1 (555) 123-4567',
    whatsapp: '+1555123456',
    address: 'Silicon Valley, CA',
  },
  
  // Social media
  social: {
    twitter: 'https://twitter.com/sisoagency',
    linkedin: 'https://linkedin.com/company/sisoagency',
    instagram: 'https://instagram.com/sisoagency',
    facebook: 'https://facebook.com/sisoagency',
  },
  
  // Features toggle
  features: {
    partnership: import.meta.env.VITE_ENABLE_PARTNERSHIP === 'true',
    clientPortal: import.meta.env.VITE_ENABLE_CLIENT_PORTAL === 'true',
    whatsapp: import.meta.env.VITE_ENABLE_WHATSAPP === 'true',
    crypto: import.meta.env.VITE_ENABLE_CRYPTO === 'true',
    aiChat: true,
    portfolio: true,
    testimonials: true,
  },
  
  // Partnership program
  partnership: {
    minCommission: 15,
    maxCommission: 30,
    tiers: [
      { name: 'Bronze', requirement: 1, commission: 15 },
      { name: 'Silver', requirement: 5, commission: 20 },
      { name: 'Gold', requirement: 10, commission: 25 },
      { name: 'Platinum', requirement: 20, commission: 30 },
    ],
    benefits: [
      'Recurring commission on all client payments',
      'Dedicated partner success manager',
      'Co-branded marketing materials',
      'Priority support and training',
      'Access to exclusive tools and resources',
    ],
  },
  
  // Quick action buttons
  quickActions: {
    becomePartner: {
      text: 'Become a Partner',
      href: '/partnership',
      primary: true,
    },
    viewPortfolio: {
      text: 'View Portfolio',
      href: '/portfolio',
      primary: false,
    },
    bookDemo: {
      text: 'Book a Demo',
      href: '/demo',
      primary: false,
    },
  },
  
  // Navigation structure
  navigation: {
    main: [
      { name: 'Home', href: '/' },
      { name: 'Partnership', href: '/partnership' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
    partnership: [
      { name: 'Overview', href: '/partnership' },
      { name: 'Benefits', href: '/partnership#benefits' },
      { name: 'Process', href: '/partnership#process' },
      { name: 'Apply Now', href: '/auth/login' },
    ],
    footer: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Partner Login', href: '/auth/login' },
      { name: 'Client Login', href: '/client/login' },
    ],
  },
  
  // SEO defaults
  seo: {
    defaultTitle: 'SISO Agency - Digital Transformation Partner',
    titleTemplate: '%s | SISO Agency',
    defaultDescription: 'Partner with SISO Agency to grow your business through cutting-edge digital solutions and AI-powered automation.',
    keywords: ['digital agency', 'partnership program', 'web development', 'AI automation', 'business growth'],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      site_name: 'SISO Agency',
    },
  },
};

// Export for easy access
export default siteConfig;