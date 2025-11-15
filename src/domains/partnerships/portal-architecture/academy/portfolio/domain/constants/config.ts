/**
 * Portfolio Domain - Configuration
 */

export const portfolioConfig = {
  // Pagination
  itemsPerPage: 12,
  featuredCount: 3,

  // Performance
  imageLazyLoadThreshold: 300, // pixels
  debounceDelay: 300, // ms

  // SEO
  defaultMetaTitle: 'Portfolio | SISO Agency',
  defaultMetaDescription:
    'Explore our portfolio of 13+ apps built across 9 industries. 10x faster development with AI-powered technology.',

  // Routes
  routes: {
    hub: '/portfolio',
    industry: '/portfolio/:industry',
    client: '/portfolio/:industry/:client',
  },

  // Display
  showPricing: true,
  showTestimonials: true,
  showMarketAnalysis: true,
  showAIAgents: true,

  // Social
  socialShareEnabled: true,
  socialPlatforms: ['twitter', 'linkedin', 'facebook'],
} as const;
