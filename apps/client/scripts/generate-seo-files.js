#!/usr/bin/env node

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Industry route mapping (copied from factory for build-time generation)
const industryRouteMap = {
  restaurants: '/restaurant',
  fitness: '/fitness',
  healthcare: '/healthcare',
  barbershops: '/barbershop',
  autorepair: '/auto-repair',
  realestate: '/real-estate',
  lawfirms: '/law-firm',
  beauty: '/beauty',
  digitalmarketing: '/digital-marketing',
  accounting: '/accounting',
  homeservices: '/home-services',
  retail: '/retail',
  photography: '/photography',
  petservices: '/pet-services',
  construction: '/construction',
  cleaning: '/cleaning',
  consulting: '/consulting',
  videoproduction: '/video-production'
};

const generateSitemap = () => {
  const baseUrl = 'https://siso.ai';
  const currentDate = new Date().toISOString().split('T')[0];
  
  const staticPages = [
    { url: baseUrl, lastmod: currentDate, changefreq: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/auth`, lastmod: currentDate, changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/portfolio`, lastmod: currentDate, changefreq: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/partnership`, lastmod: currentDate, changefreq: 'monthly', priority: 0.7 }
  ];

  const industryPages = Object.entries(industryRouteMap).map(([industry, route]) => ({
    url: `${baseUrl}${route}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.9
  }));

  const allPages = [...staticPages, ...industryPages];

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

const generateRobotsTxt = () => {
  const baseUrl = 'https://siso.ai';
  
  return `User-agent: *
Allow: /

# Allow all industry landing pages
${Object.values(industryRouteMap).map(route => `Allow: ${route}`).join('\n')}

# Disallow admin and private areas
Disallow: /admin/
Disallow: /client-dashboard/
Disallow: /partner/
Disallow: /auth/
Disallow: /testing/
Disallow: /debug/

# Allow public pages
Allow: /portfolio
Allow: /partnership

# Crawl-delay for polite crawling
Crawl-delay: 1

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml`;
};

const main = () => {
  const publicDir = join(__dirname, '../public');
  
  try {
    // Ensure public directory exists
    mkdirSync(publicDir, { recursive: true });
    
    // Generate and write sitemap.xml
    const sitemap = generateSitemap();
    writeFileSync(join(publicDir, 'sitemap.xml'), sitemap);
    console.log('✅ Generated sitemap.xml');
    
    // Generate and write robots.txt
    const robotsTxt = generateRobotsTxt();
    writeFileSync(join(publicDir, 'robots.txt'), robotsTxt);
    console.log('✅ Generated robots.txt');
    
    console.log(`📊 Generated SEO files for ${Object.keys(industryRouteMap).length} industry pages`);
    
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
};

main();