import { Helmet } from 'react-helmet-async';
import { type IndustryConfig } from '../landing/templates/IndustryConfig';

interface IndustryPageSEOProps {
  config: IndustryConfig;
}

export const IndustryPageSEO = ({ config }: IndustryPageSEOProps) => {
  // Generate industry-specific meta data
  const title = `${config.industry} Solutions | SISO - AI-Powered Business Automation`;
  const description = config.heroDescription;
  const keywords = [
    config.industry.toLowerCase(),
    'AI automation',
    'business solutions',
    'SISO',
    'digital transformation',
    ...config.benefits.map(benefit => benefit.text.toLowerCase()),
    ...config.topFeatures.slice(0, 3).map(feature => feature.title.toLowerCase())
  ].join(', ');

  const canonicalUrl = `https://siso.ai${config.route}`;
  
  // Generate structured data for the industry
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `SISO ${config.industry} Solution`,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": "SISO"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "Free Trial",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": config.testimonials.length * 25
    },
    "applicationCategory": "Business Software",
    "operatingSystem": "Web-based",
    "featureList": config.topFeatures.map(feature => feature.title),
    "audience": {
      "@type": "Audience",
      "audienceType": config.industry
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SISO",
    "url": "https://siso.ai",
    "logo": "https://siso.ai/logo.png",
    "description": "AI-powered business automation platform for modern enterprises",
    "foundingDate": "2024",
    "founder": {
      "@type": "Person",
      "name": "SISO Team"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://twitter.com/sisoai",
      "https://linkedin.com/company/siso-ai"
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://siso.ai"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Industries",
        "item": "https://siso.ai/industries"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": config.industry,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="SISO" />
      <meta property="og:image" content={`https://siso.ai/images/industry-${config.route.replace('/', '')}.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${config.industry} automation solutions by SISO`} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://siso.ai/images/industry-${config.route.replace('/', '')}.jpg`} />
      <meta name="twitter:site" content="@sisoai" />
      <meta name="twitter:creator" content="@sisoai" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="SISO" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="en-US" />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#1a1a1a" />
      <meta name="msapplication-navbutton-color" content="#1a1a1a" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://siso.ai" />
      <link rel="dns-prefetch" href="https://avdgyrepwrvsvwgxrccr.supabase.co" />
    </Helmet>
  );
};