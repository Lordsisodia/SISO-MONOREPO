/**
 * Portfolio Domain - Client Detail Page
 * Route: /portfolio/:industry/:client
 *
 * Comprehensive project case study with:
 * - Project header with metadata
 * - Tabbed content (Overview, Features, Screenshots, Pricing, Timeline, Testimonial)
 * - Related projects
 * - CTA section
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { NavBar } from '@/components/ui/tubelight-navbar';
import { GradientText } from '@/components/ui/gradient-text';
import {
  ExternalLink,
  Calendar,
  DollarSign,
  FolderOpen,
  Star,
  ArrowRight,
  Code,
  LayoutGrid,
  PlayCircle,
  Landmark,
  Timer,
  MessageSquareQuote
} from 'lucide-react';
import { usePortfolioData } from '../hooks';
import { getIndustryBySlug } from '../data/industries';
import { BreadcrumbNav } from '../components/shared/BreadcrumbNav';
import { TechStackBadge } from '../components/shared/TechStackBadge';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { FeatureShowcase } from '../components/client/FeatureShowcase';
import { GuidedWalkthrough } from '../components/client/GuidedWalkthrough';
import { TimelineVisualization } from '../components/client/TimelineVisualization';
import { PricingBreakdown } from '../components/client/PricingBreakdown';
import { TestimonialSection } from '../components/client/TestimonialSection';
import { Helmet } from 'react-helmet-async';
import { FeaturesSnapshot } from '../components/client/FeaturesSnapshot';
import { OverviewTechStack } from '../components/client/OverviewTechStack';
import { PortfolioSitemapGraph } from '../components/client/PortfolioSitemapGraph';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'live':
    case 'completed':
      return 'bg-green-500/20 text-green-400 border-green-500/40';
    case 'in_progress':
    case 'in development':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    case 'planning':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
  }
};

export function ClientDetail() {
  const navigate = useNavigate();
  const { industry: industrySlug, client: clientId } = useParams<{ industry: string; client: string }>();
  const { clients } = usePortfolioData();

  // Get industry and client data
  const industry = getIndustryBySlug(industrySlug || '');
  const project = clients.find(c => c.id === clientId);

  // Handle 404
  if (!industry || !project) {
    return (
      <main className="main-scroll-container min-h-screen bg-siso-bg flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">❌</div>
          <h1 className="text-3xl font-bold text-white">Project Not Found</h1>
          <p className="text-lg text-siso-text-muted">
            The project you're looking for doesn't exist.
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

  // Get related projects (same industry, exclude current)
  const relatedProjects = clients
    .filter(c => c.industry === project.industry && c.id !== project.id)
    .slice(0, 3);

  const [tab, setTab] = useState<'overview'|'walkthrough'|'pricing'|'timeline'|'testimonial'>('overview');
  const navItems = [
    { name: 'Overview', url: 'overview', icon: LayoutGrid },
    { name: 'Guided', url: 'walkthrough', icon: PlayCircle },
    { name: 'Pricing', url: 'pricing', icon: Landmark },
    { name: 'Timeline', url: 'timeline', icon: Timer },
    ...(project.testimonial ? [{ name: 'Results', url: 'testimonial', icon: MessageSquareQuote }] : []),
  ];

  return (
    <>
      {/* SEO Metadata */}
      <Helmet>
        <title>{project.name} - {industry.name} Case Study | SISO</title>
        <meta name="description" content={project.description.substring(0, 160)} />
        <meta property="og:title" content={`${project.name} - ${industry.name} Case Study`} />
        <meta property="og:description" content={project.tagline} />
        {project.media?.screenshots?.desktop?.[0] && (
          <meta property="og:image" content={project.media.screenshots.desktop[0]} />
        )}
        <link rel="canonical" href={`https://siso.com/portfolio/${industrySlug}/${clientId}`} />
      </Helmet>

      <main className="main-scroll-container min-h-screen bg-siso-bg">
        {/* Breadcrumb Navigation */}
        <div className="bg-siso-bg-alt border-b border-siso-border">
          <div className="container mx-auto px-4 py-4">
            <BreadcrumbNav
              items={[
                { label: 'Portfolio', href: '/portfolio' },
                { label: industry.name, href: `/portfolio/${industry.slug}` },
                { label: project.name, current: true }
              ]}
            />
          </div>
        </div>

        {/* Project Header */}
        <header className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {/* Client Logo */}
              {project.media?.logo && (
                <img
                  src={project.media.logo}
                  alt={`${project.name} logo`}
                  className="w-16 h-16 rounded-lg object-contain bg-white/5 p-2"
                />
              )}

              <div>
                <GradientText
                  colors={["#FF5722", "#FFA726", "#FF5722"]}
                  animationSpeed={5}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold"
                >
                  {project.name}
                </GradientText>
                <p className="text-lg sm:text-xl text-siso-text mt-2">
                  {project.tagline}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge className={getStatusColor(project.status)}>
                {project.status}
              </Badge>

              {('liveUrl' in project && (project as any).liveUrl) && (
                <Button
                  onClick={() => window.open((project as any).liveUrl, '_blank')}
                  className="bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Site
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Quick Stats Metadata */}
        <section className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto rounded-xl border border-siso-border bg-siso-bg-alt p-4 md:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-siso-orange/10 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-siso-orange" />
                </div>
                <div>
                  <p className="text-xs text-siso-text-muted">Delivery Time</p>
                  <p className="font-semibold text-white">{project.pricing?.deliveryTime ?? 'TBD'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-siso-orange/10 p-2 rounded-lg">
                  <DollarSign className="w-5 h-5 text-siso-orange" />
                </div>
                <div>
                  <p className="text-xs text-siso-text-muted">Investment</p>
                  <p className="font-semibold text-white">
                    {project.pricing?.currency === 'GBP' && '£'}
                    {project.pricing?.currency === 'USD' && '$'}
                    {project.pricing?.currency === 'EUR' && '€'}
                    {project.pricing?.min?.toLocaleString() ?? 'Contact for pricing'}
                    {project.pricing?.min ? '+' : ''}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-siso-orange/10 p-2 rounded-lg">
                  <FolderOpen className="w-5 h-5 text-siso-orange" />
                </div>
                <div>
                  <p className="text-xs text-siso-text-muted">Industry</p>
                  <p className="font-semibold text-white">{industry.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-siso-orange/10 p-2 rounded-lg">
                  <Code className="w-5 h-5 text-siso-orange" />
                </div>
                <div>
                  <p className="text-xs text-siso-text-muted">Technologies</p>
                  <p className="font-semibold text-white">{project.techStack.frontend.length + project.techStack.backend.length}+ tools</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Content Section */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto mb-6">
            <NavBar items={navItems as any} value={tab} onChange={(v) => setTab(v as any)} />
          </div>
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
            <TabsList className="hidden">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="walkthrough">Guided Walkthrough</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Breakdown</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              {project.testimonial && (
                <TabsTrigger value="testimonial">Results & Testimonial</TabsTrigger>
              )}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-8">
              <div className="max-w-5xl mx-auto rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                <GradientText
                  colors={["#FF5722", "#FFA726", "#FF5722"]}
                  animationSpeed={5}
                  className="text-2xl font-bold mb-6"
                >
                  Project Overview
                </GradientText>
                <div className="rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg text-siso-text leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Technology Overview (icons + badges) */}
                <div className="mt-6">
                  <OverviewTechStack stack={project.techStack as any} />
                </div>

                {/* Features Snapshot */}
                <div className="mt-10 rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                  <GradientText
                    colors={["#FF5722", "#FFA726", "#FF5722"]}
                    animationSpeed={5}
                    className="text-xl font-bold mb-4"
                  >
                    Features Snapshot
                  </GradientText>
                  <FeaturesSnapshot features={project.features as any} />
                </div>

                {/* Pages Summary & Mini Sitemap */}
                <div className="mt-10 rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                  <GradientText
                    colors={["#FF5722", "#FFA726", "#FF5722"]}
                    animationSpeed={5}
                    className="text-xl font-bold mb-4"
                  >
                    Pages & Structure
                  </GradientText>
                  <p className="text-sm text-siso-text-muted mb-3">
                    Pages: {project.pages?.length ?? '—'}
                  </p>
                  <PortfolioSitemapGraph pages={project.pages as any} pageLinks={project.pageLinks as any} />
                </div>

                {/* Pricing Summary */}
                <div className="mt-10 rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                  <GradientText
                    colors={["#FF5722", "#FFA726", "#FF5722"]}
                    animationSpeed={5}
                    className="text-xl font-bold mb-2"
                  >
                    Pricing Summary
                  </GradientText>
                  <p className="text-siso-text">
                    {(() => {
                      const p:any = project.pricing || {}
                      const symbol = p.currency === 'GBP' ? '£' : p.currency === 'EUR' ? '€' : '$'
                      if (p.sisoPrice && p.marketValue) {
                        const saved = p.marketValue - p.sisoPrice
                        return `Saved ${symbol}${saved.toLocaleString()} vs traditional agencies.`
                      }
                      if (p.min && p.max) {
                        return `Typical range: ${symbol}${p.min.toLocaleString()} - ${symbol}${p.max.toLocaleString()}`
                      }
                      return 'Contact for pricing.'
                    })()}
                    <span className="ml-2 text-siso-orange">View Pricing Breakdown →</span>
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Guided Walkthrough Tab */}
            <TabsContent value="walkthrough" className="mt-8">
              <div className="max-w-5xl mx-auto rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                <GradientText
                  colors={["#FF5722", "#FFA726", "#FF5722"]}
                  animationSpeed={5}
                  className="text-2xl font-bold mb-6"
                >
                  Guided Walkthrough
                </GradientText>
                <GuidedWalkthrough
                  desktop={project.media?.screenshots?.desktop || []}
                  mobile={project.media?.screenshots?.mobile || []}
                  pages={project.pages?.map(p => ({ id: p.id, title: p.title }))}
                />
              </div>
            </TabsContent>

            {/* Pricing Breakdown Tab */}
            <TabsContent value="pricing" className="mt-8">
              <div className="max-w-5xl mx-auto rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                <GradientText
                  colors={["#FF5722", "#FFA726", "#FF5722"]}
                  animationSpeed={5}
                  className="text-2xl font-bold mb-6"
                >
                  Pricing Breakdown
                </GradientText>
                <PricingBreakdown pricing={project.pricing} />
              </div>
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="mt-8">
              <div className="max-w-5xl mx-auto rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                <GradientText
                  colors={["#FF5722", "#FFA726", "#FF5722"]}
                  animationSpeed={5}
                  className="text-2xl font-bold mb-6"
                >
                  Development Timeline
                </GradientText>
                {(() => {
                  const phases = (project as any).timeline?.phases || []
                  const hasPhases = Array.isArray(phases) && phases.length > 0
                  const fallback = [
                    { name: 'Market Research', description: 'Understand the market landscape and audiences.', duration: 'Day 1' },
                    { name: 'Competitor Analysis', description: 'Identify gaps and opportunities.', duration: 'Day 1' },
                    { name: 'Build Plan', description: 'Define scope, pages, and features.', duration: 'Day 1' },
                    { name: 'Client Review', description: 'Confirm plan and make adjustments.', duration: 'Day 1' },
                    { name: 'Prototype', description: 'Produce a working demo rapidly.', duration: 'Day 2' },
                    { name: 'Feedback & Iteration', description: 'Incorporate client feedback and refine.', duration: 'Day 2' },
                    { name: 'Finalize & QA', description: 'Harden, test, and prepare for launch.', duration: 'Day 3' },
                    { name: 'Launch', description: 'Deploy to production (Vercel/Supabase).', duration: 'Day 3' },
                    { name: 'Maintenance', description: 'Ongoing support and updates.', duration: 'Ongoing' }
                  ]
                  const normalized = hasPhases
                    ? phases.map((p:any) => ({ name: p.name, description: p.description, duration: p.duration || '—' }))
                    : fallback
                  return <TimelineVisualization timeline={{ phases: normalized }} />
                })()}
              </div>
            </TabsContent>

            {/* Results & Testimonial Tab */}
            {project.testimonial && (
              <TabsContent value="testimonial" className="mt-8">
                <div className="max-w-5xl mx-auto rounded-xl border border-siso-border bg-siso-bg-alt p-6 md:p-8">
                  <GradientText
                    colors={["#FF5722", "#FFA726", "#FF5722"]}
                    animationSpeed={5}
                    className="text-2xl font-bold mb-6"
                  >
                    Results & Testimonial
                  </GradientText>
                  {project.results && (
                    <div className="mb-6 p-4 rounded-lg border border-siso-border bg-siso-bg-alt">
                      <div className="text-sm text-siso-text-muted">Delivery</div>
                      <div className="text-white font-medium">{project.results.deliverySpeed}</div>
                      {project.results.performanceMetrics && (
                        <div className="mt-3 text-sm text-siso-text">
                          <div>Lighthouse: {project.results.performanceMetrics.lighthouseScore ?? '—'}</div>
                          <div>Uptime: {project.results.performanceMetrics.uptime ?? '—'}</div>
                        </div>
                      )}
                      {project.results.businessImpact && (
                        <div className="mt-3 text-sm text-siso-text">{project.results.businessImpact}</div>
                      )}
                    </div>
                  )}
                  <TestimonialSection testimonial={project.testimonial} />
                </div>
              </TabsContent>
            )}
          </Tabs>
        </section>

        {/* Related Projects Section */}
        {relatedProjects.length > 0 && (
          <section className="container mx-auto px-4 py-16 border-t border-siso-border">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <GradientText
                colors={["#FF5722", "#FFA726", "#FF5722"]}
                animationSpeed={5}
                className="text-2xl sm:text-3xl font-bold mb-2"
              >
                More in {industry.name}
              </GradientText>
              <p className="text-siso-text-muted">
                Explore other {industry.name.toLowerCase()} projects we've delivered
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((related, index) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PortfolioCard
                    project={{
                      id: related.id,
                      app_name: related.name,
                      client_name: related.name,
                      description: related.tagline,
                      technologies: related.techStack.frontend.concat(related.techStack.backend).slice(0, 6),
                      images: related.media?.screenshots?.desktop || [],
                      live_url: 'liveUrl' in related ? (related as any).liveUrl : undefined,
                      development_status: related.status,
                      estimated_value: related.pricing.min,
                      completion_date: 'completionDate' in related ? (related as any).completionDate : undefined,
                      duration_months: 2,
                      key_features: related.features.key.slice(0, 5),
                      testimonial: related.testimonial,
                    }}
                    onProjectClick={() => navigate(`/portfolio/${industry.slug}/${related.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Final CTA Section */}
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
                      <div className="bg-siso-orange/10 p-4 rounded-full">
                        <Star className="w-10 h-10 text-siso-orange" />
                      </div>
                    </div>

                    {/* Heading */}
                    <div className="space-y-3">
                      <GradientText
                        colors={["#FF5722", "#FFA726", "#FF5722"]}
                        animationSpeed={5}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold"
                      >
                        Ready for your own website or app?
                      </GradientText>
                      <p className="text-lg text-siso-text max-w-2xl mx-auto">
                        Get the same quality and speed for your business.
                        Delivered in 48-72 hours with AI-powered development.
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
