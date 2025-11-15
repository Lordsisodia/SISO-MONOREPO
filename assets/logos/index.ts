// Integration Logos - Shared across all SISO applications
export { default as CalendarLogo } from './calendar.svg';
export { default as GoogleDriveLogo } from './google-drive.svg';
export { default as MetaMaskLogo } from './metamask.svg';
export { default as NotionLogo } from './notion.svg';
export { default as PhantomLogo } from './phantom.svg';
export { default as SlackLogo } from './slack.svg';
export { default as StripeLogo } from './stripe.svg';
export { default as WhatsAppLogo } from './whatsapp.svg';

// Logo metadata for integrations
export const integrationLogos = {
  calendar: {
    component: CalendarLogo,
    name: 'Calendar',
    description: 'Google Calendar integration',
    category: 'scheduling'
  },
  'google-drive': {
    component: GoogleDriveLogo,
    name: 'Google Drive',
    description: 'Google Drive cloud storage',
    category: 'storage'
  },
  metamask: {
    component: MetaMaskLogo,
    name: 'MetaMask',
    description: 'MetaMask wallet integration',
    category: 'wallet'
  },
  notion: {
    component: NotionLogo,
    name: 'Notion',
    description: 'Notion workspace integration',
    category: 'productivity'
  },
  phantom: {
    component: PhantomLogo,
    name: 'Phantom',
    description: 'Phantom wallet integration',
    category: 'wallet'
  },
  slack: {
    component: SlackLogo,
    name: 'Slack',
    description: 'Slack team communication',
    category: 'communication'
  },
  stripe: {
    component: StripeLogo,
    name: 'Stripe',
    description: 'Stripe payment processing',
    category: 'payments'
  },
  whatsapp: {
    component: WhatsAppLogo,
    name: 'WhatsApp',
    description: 'WhatsApp messaging',
    category: 'communication'
  }
} as const;

export type IntegrationLogoKey = keyof typeof integrationLogos;
export type IntegrationCategory = 'scheduling' | 'storage' | 'wallet' | 'productivity' | 'communication' | 'payments';

// Helper function to get logos by category
export const getLogosByCategory = (category: IntegrationCategory) => {
  return Object.entries(integrationLogos)
    .filter(([_, logo]) => logo.category === category)
    .reduce((acc, [key, logo]) => ({ ...acc, [key]: logo }), {} as Record<string, typeof integrationLogos[string]>);
};