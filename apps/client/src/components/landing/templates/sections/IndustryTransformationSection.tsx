import { GradientHeading } from '@/components/ui/gradient-heading';
import { ArrowRight, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustryTransformationSectionProps {
  config: IndustryConfig;
}

export const IndustryTransformationSection = ({ config }: IndustryTransformationSectionProps) => {
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
            Transform Your {config.industry} Operations
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            See the dramatic difference our platform makes in real {config.industry.toLowerCase()} scenarios
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Before */}
            <div className="bg-black/20 backdrop-blur-sm border border-red-500/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-red-400">Before SISO</h4>
                  <p className="text-xs text-siso-text-muted">Current challenges</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-siso-text/80">Manual processes and inefficiencies</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-siso-text/80">Lost revenue opportunities</span>
                </div>
                <div className="flex items-start gap-2">
                  <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-siso-text/80">Poor customer experience</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${config.colorScheme.gradient} rounded-full flex items-center justify-center`}>
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* After */}
            <div className="bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-400">With SISO</h4>
                  <p className="text-xs text-siso-text-muted">Transformed operations</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-siso-text/80">Automated workflows and efficiency</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-siso-text/80">Maximized revenue potential</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-siso-text/80">Outstanding customer satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Improvement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {config.beforeAfter.map((metric, index) => (
            <div key={index} className="text-center bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-6">
              <h4 className="text-sm font-semibold text-siso-text-bold mb-4">{metric.metric}</h4>
              
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs text-red-400">Before</p>
                  <p className="text-lg font-bold text-red-400">{metric.before}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-siso-orange" />
                <div>
                  <p className="text-xs text-green-400">After</p>
                  <p className="text-lg font-bold text-green-400">{metric.after}</p>
                </div>
              </div>
              
              <div className={`inline-block px-3 py-1 bg-gradient-to-r ${config.colorScheme.gradient} rounded-full text-xs text-white font-semibold`}>
                {metric.improvement}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};