export type IntegrationLogoKey =
  | 'notion'
  | 'google-drive'
  | 'slack'
  | 'calendar'
  | 'whatsapp'
  | 'stripe'
  | 'metamask'
  | 'phantom';

type LogoMap = Record<IntegrationLogoKey, string>;

// Public URLs are served from /public; we keep paths stable here
export const integrationLogos: LogoMap = {
  notion: '/logos/integrations/notion.svg',
  'google-drive': '/logos/integrations/google-drive.svg',
  slack: '/logos/integrations/slack.svg',
  calendar: '/logos/integrations/calendar-svgrepo-com.svg',
  whatsapp: '/logos/integrations/whatsapp.svg',
  stripe: '/logos/integrations/stripe.svg',
  metamask: '/logos/integrations/MetaMask_Fox.svg',
  phantom: '/logos/integrations/Phantom_idLwowjNJZ_0.svg',
};

