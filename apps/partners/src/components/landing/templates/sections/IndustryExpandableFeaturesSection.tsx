import { GradientHeading } from '@/components/ui/gradient-heading';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustryExpandableFeaturesSectionProps {
  config: IndustryConfig;
}

export const IndustryExpandableFeaturesSection = ({ config }: IndustryExpandableFeaturesSectionProps) => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 -left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-r from-${config.colorScheme.primary}/10 to-${config.colorScheme.secondary}/10 rounded-full filter blur-[50px] md:blur-[100px] animate-float-slow`} />
        <div className={`absolute bottom-1/4 -right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-r from-${config.colorScheme.secondary}/10 to-${config.colorScheme.primary}/10 rounded-full filter blur-[50px] md:blur-[100px] animate-float-slower`} />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 relative"
        >
          <GradientHeading variant="secondary" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 relative">
            Everything Your {config.industry} Need
          </GradientHeading>

          <div className="relative h-1 w-16 md:w-20 mx-auto mb-3 md:mb-4">
            <div className={`absolute inset-0 bg-gradient-to-r ${config.colorScheme.gradient} rounded-full animate-pulse`} />
          </div>
          
          <p className="text-sm sm:text-base text-siso-text-muted max-w-xl mx-auto relative">
            Comprehensive {config.industry.toLowerCase()} management platform with AI-powered automation
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Top Features - Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {config.topFeatures.map((feature, index) => (
              <motion.div 
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r from-${config.colorScheme.primary}/5 to-${config.colorScheme.secondary}/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300 blur-md`} />
                
                <div className="relative bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 hover:border-siso-orange/20 transition-all duration-300 h-full">
                  {/* Category Badge */}
                  <div className={`absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r ${config.colorScheme.gradient} text-xs text-white rounded-full`}>
                    {feature.category}
                  </div>

                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 relative w-10 h-10">
                      <div className={`absolute inset-0 bg-gradient-to-br ${config.colorScheme.gradient} opacity-20 rounded-lg blur-sm group-hover:opacity-30 transition-opacity duration-300`} />
                      <div className={`relative h-full rounded-lg bg-gradient-to-br from-${config.colorScheme.primary}/10 to-${config.colorScheme.secondary}/10 p-2 group-hover:from-${config.colorScheme.primary}/20 group-hover:to-${config.colorScheme.secondary}/20 transition-colors duration-300`}>
                        <feature.icon className={`w-full h-full text-${config.colorScheme.secondary}`} />
                      </div>
                    </div>
                    
                    <div className="space-y-1 flex-grow">
                      <h3 className="text-base font-semibold text-siso-text-bold">
                        {feature.title}
                      </h3>
                      
                      {/* Stats badge */}
                      <div className={`inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-${config.colorScheme.primary}/10 to-${config.colorScheme.secondary}/10 text-xs text-${config.colorScheme.secondary}`}>
                        {feature.stats}
                      </div>
                      
                      <p className="text-sm text-siso-text/80 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Highlight tag */}
                      <div className="flex items-center gap-1 mt-2">
                        <div className={`w-1 h-1 rounded-full bg-${config.colorScheme.secondary} animate-pulse`} />
                        <span className="text-xs text-siso-text-bold">{feature.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          {config.additionalFeatures.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mb-6"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={toggleExpanded}
                className={`gap-3 border-2 border-${config.colorScheme.secondary}/30 text-${config.colorScheme.secondary} hover:bg-${config.colorScheme.secondary}/10 hover:border-${config.colorScheme.secondary} transition-all duration-300 group`}
              >
                {isExpanded ? (
                  <>
                    Show Less Features 
                    <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                ) : (
                  <>
                    Show {config.additionalFeatures.length} More Features 
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* Additional Features - Expandable */}
          <AnimatePresence>
            {isExpanded && config.additionalFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto",
                  transition: {
                    height: { duration: 0.6, ease: "easeInOut" },
                    opacity: { duration: 0.4, delay: 0.2 }
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: {
                    opacity: { duration: 0.3 },
                    height: { duration: 0.5, delay: 0.1, ease: "easeInOut" }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                  {config.additionalFeatures.map((feature, index) => (
                    <motion.div 
                      key={feature.title}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className="relative group"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-${config.colorScheme.primary}/5 to-${config.colorScheme.secondary}/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300 blur-md`} />
                      
                      <div className="relative bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 hover:border-siso-orange/20 transition-all duration-300 h-full">
                        {/* Category Badge */}
                        <div className={`absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r ${config.colorScheme.gradient} text-xs text-white rounded-full`}>
                          {feature.category}
                        </div>

                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 relative w-10 h-10">
                            <div className={`absolute inset-0 bg-gradient-to-br ${config.colorScheme.gradient} opacity-20 rounded-lg blur-sm group-hover:opacity-30 transition-opacity duration-300`} />
                            <div className={`relative h-full rounded-lg bg-gradient-to-br from-${config.colorScheme.primary}/10 to-${config.colorScheme.secondary}/10 p-2 group-hover:from-${config.colorScheme.primary}/20 group-hover:to-${config.colorScheme.secondary}/20 transition-colors duration-300`}>
                              <feature.icon className={`w-full h-full text-${config.colorScheme.secondary}`} />
                            </div>
                          </div>
                          
                          <div className="space-y-1 flex-grow">
                            <h3 className="text-base font-semibold text-siso-text-bold">
                              {feature.title}
                            </h3>
                            
                            {/* Stats badge */}
                            <div className={`inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-${config.colorScheme.primary}/10 to-${config.colorScheme.secondary}/10 text-xs text-${config.colorScheme.secondary}`}>
                              {feature.stats}
                            </div>
                            
                            <p className="text-sm text-siso-text/80 leading-relaxed">
                              {feature.description}
                            </p>
                            
                            {/* Highlight tag */}
                            <div className="flex items-center gap-1 mt-2">
                              <div className={`w-1 h-1 rounded-full bg-${config.colorScheme.secondary} animate-pulse`} />
                              <span className="text-xs text-siso-text-bold">{feature.highlight}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Feature Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-8 text-center"
                >
                  <div className={`inline-block px-6 py-3 bg-black/30 backdrop-blur-sm border border-${config.colorScheme.secondary}/30 rounded-full`}>
                    <span className="text-sm text-siso-text">
                      ✨ <span className={`text-${config.colorScheme.secondary} font-semibold`}>{config.topFeatures.length + config.additionalFeatures.length} Total Features</span> - Complete {config.industry.toLowerCase()} management solution
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};