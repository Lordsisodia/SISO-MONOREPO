import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { type IndustryConfig } from '../IndustryConfig';
import { IndustryAnimatedHero } from '../ui/IndustryAnimatedHero';

interface IndustryHeroSectionProps {
  config: IndustryConfig;
}

export const IndustryHeroSection = ({ config }: IndustryHeroSectionProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleGetDemo = () => {
    navigate('/client-dashboard');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Header Image (if provided) */}
      {config.headerImage && (
        <>
          <div className="absolute inset-0">
            <img
              src={config.headerImage}
              alt={`${config.industry} header`}
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
          </div>
        </>
      )}

      {/* Background Elements */}
      {!config.headerImage && (
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/3 -left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px]
            bg-gradient-to-r from-${config.colorScheme.primary}/20 to-${config.colorScheme.secondary}/20 rounded-full filter blur-[100px] animate-float-slow`}
          />
          <div className={`absolute bottom-1/3 -right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px]
            bg-gradient-to-r from-${config.colorScheme.secondary}/20 to-${config.colorScheme.primary}/20 rounded-full filter blur-[100px] animate-float-slower`}
          />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6"
          >
            {/* Callout Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-siso-orange/30 text-sm"
            >
              <Sparkles className="w-4 h-4 text-siso-orange" />
              <span className="text-siso-text">🚀 FREE Demo → Live in 48hrs → Double Your Revenue</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <GradientHeading 
                variant="primary" 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
              >
                Modern {config.industry}
              </GradientHeading>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-siso-text-bold font-semibold">
                Need Modern Solutions
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base sm:text-lg text-siso-text-muted max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              {config.heroDescription}
            </motion.p>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              {config.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-3 py-2 bg-black/20 backdrop-blur-sm rounded-full border border-siso-text/10">
                  <benefit.icon className={`w-4 h-4 text-${config.colorScheme.secondary}`} />
                  <span className="text-sm text-siso-text">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={handleGetDemo}
                className={`bg-gradient-to-r ${config.colorScheme.gradient} hover:shadow-lg hover:shadow-${config.colorScheme.primary}/25 transition-all duration-300 transform hover:scale-105 group`}
              >
                Get Free Demo
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className={`border-2 border-${config.colorScheme.secondary}/30 text-${config.colorScheme.secondary} hover:bg-${config.colorScheme.secondary}/10 hover:border-${config.colorScheme.secondary} transition-all duration-300 group`}
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                See How It Works
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-4 text-sm text-siso-text-muted"
            >
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2">5.0 Rating</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-siso-text-muted" />
              <span>200+ {config.industry} Trust Us</span>
              <div className="w-1 h-1 rounded-full bg-siso-text-muted" />
              <span>48hr Setup</span>
            </motion.div>
          </motion.div>

          {/* Right Content - Animated Hero */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <IndustryAnimatedHero config={config} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};