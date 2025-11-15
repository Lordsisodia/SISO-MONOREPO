import { GradientHeading } from '@/components/ui/gradient-heading';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustryProcessSectionProps {
  config: IndustryConfig;
}

export const IndustryProcessSection = ({ config }: IndustryProcessSectionProps) => {
  const processSteps = [
    {
      day: "Day 1",
      title: "Quick Chat",
      description: `Understand your ${config.industry.toLowerCase()} needs and goals`,
      duration: "30 minutes",
      color: "from-blue-500 to-cyan-500"
    },
    {
      day: "Day 1",
      title: "Design Review", 
      description: `Create ${config.industry.toLowerCase()}-specific design and workflow`,
      duration: "2 hours",
      color: "from-purple-500 to-pink-500"
    },
    {
      day: "Day 2",
      title: "AI Development",
      description: `Build your custom ${config.industry.toLowerCase()} app with AI automation`,
      duration: "24 hours",
      color: "from-orange-500 to-red-500"
    },
    {
      day: "Day 2",
      title: "Go Live",
      description: `Launch your ${config.industry.toLowerCase()} solution and start growing`,
      duration: "1 hour",
      color: "from-green-500 to-emerald-500"
    }
  ];

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
            From Idea to Launch in 48 Hours
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            Our streamlined process gets your {config.industry.toLowerCase()} up and running faster than you thought possible
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="relative text-center"
              >
                {/* Day Badge */}
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${step.color} rounded-full text-sm font-bold text-white mb-4`}>
                  {step.day}
                </div>

                {/* Step Content */}
                <div className="bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-xl p-6 hover:border-siso-orange/20 transition-all duration-300 h-full">
                  <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center`}>
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-siso-text-bold mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-siso-text mb-3">
                    {step.description}
                  </p>

                  <div className="text-xs text-siso-text-muted">
                    Duration: {step.duration}
                  </div>
                </div>

                {/* Connector Arrow (desktop only) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-siso-orange" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
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
              ⚡ <span className={`text-${config.colorScheme.secondary} font-semibold`}>48-hour guarantee</span> - Your {config.industry.toLowerCase()} solution will be live and generating results
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};