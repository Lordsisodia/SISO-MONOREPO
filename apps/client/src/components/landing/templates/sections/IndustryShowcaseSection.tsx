import { GradientHeading } from '@/components/ui/gradient-heading';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustryShowcaseSectionProps {
  config: IndustryConfig;
}

export const IndustryShowcaseSection = ({ config }: IndustryShowcaseSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/2 left-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-r from-${config.colorScheme.primary}/10 to-${config.colorScheme.secondary}/10 rounded-full filter blur-[60px] animate-float-slow`} />
        <div className={`absolute bottom-0 right-1/4 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-gradient-to-r from-${config.colorScheme.secondary}/15 to-${config.colorScheme.primary}/15 rounded-full filter blur-[40px] animate-float-slower`} />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <GradientHeading variant="secondary" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Built for Every {config.industry.replace(/s$/, '')} Type
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            Our platform adapts to your specific {config.industry.toLowerCase()} needs with customized features and workflows
          </p>
        </motion.div>

        {/* Showcase Types Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto"
        >
          {config.showcaseTypes.map((showcase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${showcase.bgColor} rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 blur-sm`} />
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-siso-text/10 rounded-2xl p-6 hover:border-siso-orange/30 transition-all duration-300 h-full">
                {/* Type Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{showcase.emoji}</div>
                  <div>
                    <h3 className="text-lg font-bold text-siso-text-bold">
                      {showcase.type}
                    </h3>
                    <p className="text-xs text-siso-text-muted">
                      Specialized Solution
                    </p>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-4">
                  {showcase.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full bg-${config.colorScheme.secondary} animate-pulse`} />
                      <span className="text-sm text-siso-text">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Preview Note */}
                <div className={`mt-4 pt-4 border-t border-${config.colorScheme.secondary}/20`}>
                  <p className="text-xs text-siso-text-muted">
                    {showcase.preview}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.colorScheme.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-8 md:mt-12"
        >
          <div className={`inline-block px-6 py-3 bg-black/30 backdrop-blur-sm border border-${config.colorScheme.secondary}/30 rounded-full`}>
            <span className="text-sm text-siso-text">
              💡 <span className={`text-${config.colorScheme.secondary} font-semibold`}>Custom workflows</span> for your specific {config.industry.toLowerCase()} type
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};