import { lazy, Suspense, memo, useEffect } from 'react';
import { LoadingFallback } from '../sections/LoadingFallback';
import Footer from '@/components/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import { useViewportLoading } from '@/hooks/useViewportLoading';
import { getIndustryConfig, type IndustryConfig } from './IndustryConfig';
import { IndustryHeroSection } from './sections/IndustryHeroSection';
import { IndustryPageSEO } from '@/components/seo/IndustryPageSEO';

// Lazy load non-critical sections
const IndustryExpandableFeaturesSection = lazy(() => import('./sections/IndustryExpandableFeaturesSection').then(m => ({
  default: memo(m.IndustryExpandableFeaturesSection)
})));

const IndustrySocialProofSection = lazy(() => import('./sections/IndustrySocialProofSection').then(m => ({
  default: memo(m.IndustrySocialProofSection)
})));

const IndustryProcessSection = lazy(() => import('./sections/IndustryProcessSection').then(m => ({
  default: memo(m.IndustryProcessSection)
})));

const IndustryFinalCTASection = lazy(() => import('./sections/IndustryFinalCTASection').then(m => ({
  default: memo(m.IndustryFinalCTASection)
})));

const IndustryShowcaseSection = lazy(() => import('./sections/IndustryShowcaseSection').then(m => ({
  default: memo(m.IndustryShowcaseSection)
})));

const IndustryResultsSection = lazy(() => import('./sections/IndustryResultsSection').then(m => ({
  default: memo(m.IndustryResultsSection)
})));

const IndustryTransformationSection = lazy(() => import('./sections/IndustryTransformationSection').then(m => ({
  default: memo(m.IndustryTransformationSection)
})));

interface IndustryLandingPageProps {
  industryKey: string;
}

const IndustryLandingPage = ({ industryKey }: IndustryLandingPageProps) => {
  const config = getIndustryConfig(industryKey);
  
  console.log(`[IndustryLandingPage] Rendering ${config.industry} landing page`);

  // Preload critical assets
  useEffect(() => {
    const preconnectLinks = [
      'https://avdgyrepwrvsvwgxrccr.supabase.co'
    ];
    
    preconnectLinks.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = url;
      document.head.appendChild(dnsPrefetch);
    });
    
    return () => {
      document.querySelectorAll('link[rel="preconnect"], link[rel="dns-prefetch"]').forEach(el => {
        el.remove();
      });
    };
  }, []);

  return (
    <>
      {/* SEO Meta Tags and Structured Data */}
      <IndustryPageSEO config={config} />
      
      <div className={`min-h-screen w-full bg-gradient-to-b from-black via-siso-bg to-black overflow-x-hidden`}>
      {/* Optimized background elements with industry theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 -left-1/4 w-[250px] md:w-[600px] h-[250px] md:h-[600px] 
          bg-gradient-to-r from-${config.colorScheme.primary}/15 to-${config.colorScheme.secondary}/15 rounded-full filter blur-[80px] md:blur-[120px] 
          animate-float-slow transform-gpu will-change-transform`}
        />
        <div className={`absolute bottom-1/4 -right-1/4 w-[250px] md:w-[600px] h-[250px] md:h-[600px] 
          bg-gradient-to-r from-${config.colorScheme.secondary}/15 to-${config.colorScheme.primary}/15 rounded-full filter blur-[80px] md:blur-[120px] 
          animate-float-slower transform-gpu will-change-transform`}
        />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[350px] md:w-[1000px] h-[350px] md:h-[1000px] 
          bg-gradient-to-r from-${config.colorScheme.primary}/8 to-${config.colorScheme.secondary}/8 rounded-full filter blur-[100px] md:blur-[150px] transform-gpu will-change-transform`}
        />
      </div>

      {/* Progressive section loading */}
      <div className="relative z-10 px-4 md:px-0 space-y-12 md:space-y-24">
        <ErrorBoundary
          fallback={<div>Error loading hero section</div>}
          onError={(error) => console.error(`[IndustryLandingPage] Error in ${config.industry} HeroSection:`, error)}
        >
          <IndustryHeroSection config={config} />
        </ErrorBoundary>

        <ErrorBoundary
          fallback={<div>Error loading sections</div>}
          onError={(error) => console.error(`[IndustryLandingPage] Error in ${config.industry} sections:`, error)}
        >
          <Suspense fallback={<LoadingFallback />}>
            <IndustryExpandableFeaturesSection config={config} />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <IndustryShowcaseSection config={config} />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <IndustrySocialProofSection config={config} />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <IndustryTransformationSection config={config} />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <IndustryResultsSection config={config} />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <IndustryProcessSection config={config} />
          </Suspense>

          <Suspense fallback={<LoadingFallback />}>
            <IndustryFinalCTASection config={config} />
          </Suspense>
        </ErrorBoundary>

        <Footer />
      </div>
    </div>
    </>
  );
};

export default memo(IndustryLandingPage);