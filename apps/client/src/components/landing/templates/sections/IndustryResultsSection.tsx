import { GradientHeading } from '@/components/ui/gradient-heading';
import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustryResultsSectionProps {
  config: IndustryConfig;
}

export const IndustryResultsSection = ({ config }: IndustryResultsSectionProps) => {
  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
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
            Real Results from Real {config.industry}
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            These aren't projections. These are actual results from {config.industry.toLowerCase()} using our platform.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {config.metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative group"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgColor} rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 blur-sm`} />
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-siso-text/10 rounded-2xl p-6 text-center hover:border-siso-orange/30 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 bg-black/20 rounded-full flex items-center justify-center">
                  <TrendingUp className={`w-8 h-8 ${metric.color}`} />
                </div>
                
                <h3 className={`text-3xl md:text-4xl font-bold ${metric.color} mb-2`}>
                  {metric.value}
                </h3>
                
                <h4 className="text-lg font-semibold text-siso-text-bold mb-2">
                  {metric.title}
                </h4>
                
                <p className="text-sm text-siso-text-muted">
                  {metric.change}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center"
        >
          <div className={`inline-block px-6 py-3 bg-black/30 backdrop-blur-sm border border-${config.colorScheme.secondary}/30 rounded-full`}>
            <span className="text-sm text-siso-text">
              📈 <span className={`text-${config.colorScheme.secondary} font-semibold`}>Proven results</span> from {config.testimonials.length * 25}+ {config.industry.toLowerCase()} using SISO
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};