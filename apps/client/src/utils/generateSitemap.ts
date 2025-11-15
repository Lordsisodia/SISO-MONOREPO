import { industryRouteMap } from '../components/landing/templates/IndustryLandingPageFactory';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (): string => {
  const baseUrl = 'https://siso.ai';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/auth`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/portfolio`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/partnership`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];

  // Generate industry landing page entries
  const industryPages: SitemapEntry[] = Object.entries(industryRouteMap).map(([industry, route]) => ({
    url: `${baseUrl}${route}`,
    lastmod: currentDate,
    changefreq: 'weekly' as const,
    priority: 0.9
  }));

  const allPages = [...staticPages, ...industryPages];

  // Generate XML sitemap
  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

  const xmlFooter = `</urlset>`;

  const xmlEntries = allPages.map(page => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `${xmlHeader}${xmlEntries}
${xmlFooter}`;
};

export const getSitemapData = (): SitemapEntry[] => {
  const baseUrl = 'https://siso.ai';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    }
  ];

  const industryPages: SitemapEntry[] = Object.entries(industryRouteMap).map(([industry, route]) => ({
    url: `${baseUrl}${route}`,
    lastmod: currentDate,
    changefreq: 'weekly' as const,
    priority: 0.9
  }));

  return [...staticPages, ...industryPages];
};