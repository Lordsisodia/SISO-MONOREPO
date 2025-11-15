/**
 * Portfolio Domain - Industry Landing Page
 * Route: /portfolio/:industry
 *
 * Industry-specific portfolio page with:
 * - Industry hero with stats
 * - Breadcrumb navigation
 * - Value proposition grid
 * - Filtered project grid
 * - Industry CTA
 */

import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';
import {
  FolderOpen,
  Clock,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';
import { usePortfolioData } from '../hooks';
import { getIndustryBySlug } from '../data/industries';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { BreadcrumbNav } from '../components/shared/BreadcrumbNav';
import { Helmet } from 'react-helmet-async';

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export function IndustryLanding() {
  const navigate = useNavigate();
  const { industry: industrySlug } = useParams<{ industry: string }>();
  const { clients } = usePortfolioData();

  // Get industry data
  const industry = getIndustryBySlug(industrySlug || '');

  // Handle invalid industry
  if (!industry) {
    return (
      <main className="main-scroll-container min-h-screen bg-siso-bg flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">❌</div>
          <h1 className="text-3xl font-bold text-white">Industry Not Found</h1>
          <p className="text-lg text-siso-text-muted">
            The industry you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => navigate('/portfolio')}
            className="bg-gradient-to-r from-siso-red to-siso-orange"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </main>
    );
  }

  // Filter projects for this industry
  const industryProjects = clients.filter(c => c.industry === industry.id);
  const Icon = industry.icon;

  // Value propositions for this industry
  const valueProps = [
    {
      icon: Sparkles,
      title: 'Lightning Fast Delivery',
      description: `Get your ${industry.name.toLowerCase()} project live in 48-72 hours, not weeks or months.`
    },
    {
      icon: Zap,
      title: 'AI-Powered Development',
      description: 'Cutting-edge AI agents build your project faster and smarter than traditional teams.'
    },
    {
      icon: Shield,
      title: 'Industry Best Practices',
      description: `We know ${industry.name.toLowerCase()} inside out. Your project follows all industry standards and requirements.`
    }
  ];

  return (
    <>
      {/* SEO Metadata */}
      <Helmet>
        <title>{industry.seoMetadata.title}</title>
        <meta name="description" content={industry.seoMetadata.description} />
        <meta name="keywords" content={industry.seoMetadata.keywords.join(', ')} />
        <meta property="og:title" content={industry.seoMetadata.title} />
        <meta property="og:description" content={industry.seoMetadata.description} />
        <link rel="canonical" href={`https://siso.com/portfolio/${industry.slug}`} />
      </Helmet>

      <main className="main-scroll-container min-h-screen bg-siso-bg">
        {/* Breadcrumb Navigation */}
        <div className="bg-siso-bg-alt border-b border-siso-border">
          <div className="container mx-auto px-4 py-4">
            <BreadcrumbNav
              items={[
                { label: 'Portfolio', href: '/portfolio' },
                { label: industry.name, current: true }
              ]}
            />
          </div>
        </div>

        {/* Industry Hero Section with Header Image */}
        <section className="relative overflow-hidden">
          {/* Header Image */}
          {industry.headerImage && (
            <div className="relative h-[400px] md:h-[500px]">
              <img
                src={industry.headerImage}
                alt={`${industry.name} header`}
                className="w-full h-full object-cover"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-6 px-4 max-w-4xl"
                >
                  {/* Industry Icon */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="text-6xl md:text-7xl filter drop-shadow-2xl">
                      {Icon ? <Icon className="w-16 h-16 md:w-20 md:h-20 text-siso-orange" /> : null}
                    </div>
                  </div>

                  <GradientText
                    colors={["#FF5722", "#FFA726", "#FF5722"]}
                    animationSpeed={5}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl"
                  >
                    {industry.name} Websites & Apps
                  </GradientText>

                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                    {industry.description}
                  </p>

                  {/* Stats Bar */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8"
                  >
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <FolderOpen className="w-5 h-5 text-siso-orange" />
                      <span className="font-bold text-white">{industryProjects.length}</span>
                      <span className="text-gray-300">Projects</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <Clock className="w-5 h-5 text-siso-orange" />
                      <span className="font-bold text-white">48-72h</span>
                      <span className="text-gray-300">Avg Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                      <Star className="w-5 h-5 text-siso-orange" />
                      <span className="font-bold text-white">4.9/5</span>
                      <span className="text-gray-300">Client Rating</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}
        </section>

        {/* Value Proposition Section */}
        <section className="py-12 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              animationSpeed={5}
              className="text-2xl sm:text-3xl font-bold mb-4"
            >
              Why SISO for {industry.name}?
            </GradientText>
            <p className="text-lg text-siso-text-muted max-w-2xl mx-auto">
              We specialize in delivering exceptional results for {industry.name.toLowerCase()} businesses
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {valueProps.map((prop) => {
              const Icon = prop.icon;

              return (
                <motion.div key={prop.title} variants={itemVariants}>
                  <Card className="h-full border border-siso-border bg-siso-bg-alt">
                    <CardHeader>
                      <div className="bg-siso-orange/10 p-3 rounded-lg w-fit mb-3">
                        <Icon className="w-6 h-6 text-siso-orange" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {prop.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-siso-text leading-relaxed">
                        {prop.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Projects Grid Section */}
        <section className="py-16 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <GradientText
              colors={["#FF5722", "#FFA726", "#FF5722"]}
              animationSpeed={5}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            >
              Our {industry.name} Projects
            </GradientText>
            <p className="text-lg text-siso-text-muted max-w-2xl mx-auto">
              {industryProjects.length === 0
                ? `We're currently building amazing ${industry.name.toLowerCase()} projects. Check back soon!`
                : `Explore ${industryProjects.length} successful ${industry.name.toLowerCase()} projects`}
            </p>
          </motion.div>

          {industryProjects.length > 0 ? (
            industryProjects.length === 1 ? (
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  {industryProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <PortfolioCard
                        project={{
                          id: project.id,
                          app_name: project.name,
                          client_name: project.name,
                          description: project.tagline,
                          technologies: project.techStack.frontend.concat(project.techStack.backend).slice(0, 6),
                          images: project.media?.screenshots?.desktop || [],
                          live_url: 'liveUrl' in project ? (project as any).liveUrl : undefined,
                          development_status: project.status,
                          estimated_value: project.pricing.min,
                          completion_date: 'completionDate' in project ? (project as any).completionDate : undefined,
                          duration_months: 2,
                          key_features: project.features.key.slice(0, 5),
                          testimonial: project.testimonial,
                        }}
                        onProjectClick={() => navigate(`/portfolio/${industry.slug}/${project.id}`)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto hide-scrollbar -mx-2 px-2">
                <div className="flex gap-4 snap-x snap-mandatory">
                  {industryProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="snap-start shrink-0 min-w-[85%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[33%]"
                    >
                      <PortfolioCard
                        project={{
                          id: project.id,
                          app_name: project.name,
                          client_name: project.name,
                          description: project.tagline,
                          technologies: project.techStack.frontend.concat(project.techStack.backend).slice(0, 6),
                          images: project.media?.screenshots?.desktop || [],
                          live_url: 'liveUrl' in project ? (project as any).liveUrl : undefined,
                          development_status: project.status,
                          estimated_value: project.pricing.min,
                          completion_date: 'completionDate' in project ? (project as any).completionDate : undefined,
                          duration_months: 2,
                          key_features: project.features.key.slice(0, 5),
                          testimonial: project.testimonial,
                        }}
                        onProjectClick={() => navigate(`/portfolio/${industry.slug}/${project.id}`)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">{Icon ? <Icon className="w-14 h-14 text-siso-orange" /> : null}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No Projects Yet
              </h3>
              <p className="text-siso-text-muted mb-6">
                We're currently building amazing {industry.name.toLowerCase()} projects.
                <br />
                Check back soon or get started with your own!
              </p>
              <Button
                onClick={() => navigate('/client/dashboard')}
                className="bg-gradient-to-r from-siso-red to-siso-orange"
              >
                Start Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          )}
        </section>

        {/* Industry CTA Section */}
        <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="max-w-3xl mx-auto border border-siso-orange/30 bg-gradient-to-br from-siso-bg-alt to-siso-bg overflow-hidden relative">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-siso-orange via-transparent to-transparent" />
                </div>

                <CardContent className="p-8 sm:p-12 relative z-10">
                  <div className="text-center space-y-6">
                    {/* Icon */}
                    <div className="flex justify-center">
                      <div className="text-6xl">{Icon ? <Icon className="w-14 h-14 text-siso-orange" /> : null}</div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-3">
                      <GradientText
                        colors={["#FF5722", "#FFA726", "#FF5722"]}
                        animationSpeed={5}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold"
                      >
                        Ready to transform your {industry.name.toLowerCase()} business?
                      </GradientText>
                      <p className="text-lg text-siso-text max-w-2xl mx-auto">
                        Get your {industry.name.toLowerCase()} website or app delivered in 48-72 hours.
                        Join the businesses already growing with SISO.
                      </p>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-8">
                      <Button
                        size="lg"
                        onClick={() => navigate('/client/dashboard')}
                        className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 transition-opacity text-lg px-8 py-6 h-auto group"
                      >
                        Get Started
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <p className="text-sm text-siso-text-muted mt-4">
                        Free consultation • No commitment required
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
