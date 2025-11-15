import { GradientHeading } from '@/components/ui/gradient-heading';
import { Star, TrendingUp, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustrySocialProofSectionProps {
  config: IndustryConfig;
}

export const IndustrySocialProofSection = ({ config }: IndustrySocialProofSectionProps) => {
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
            Trusted by {config.industry} Everywhere
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            Join hundreds of successful {config.industry.toLowerCase()} already growing their business with SISO
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {config.testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-6 hover:border-siso-orange/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="font-semibold text-siso-text-bold">{testimonial.name}</h4>
                  <p className="text-sm text-siso-text-muted">{testimonial.business}</p>
                  <p className="text-xs text-siso-text/60">{testimonial.location}</p>
                </div>
                <div className={`ml-auto px-2 py-1 bg-gradient-to-r ${config.colorScheme.gradient} rounded-full text-xs text-white font-semibold`}>
                  {testimonial.metric}
                </div>
              </div>
              <p className="text-sm text-siso-text italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${config.colorScheme.gradient} rounded-full flex items-center justify-center`}>
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-siso-text-bold mb-1">{config.metrics[0]?.value || '200+'}</h4>
            <p className="text-sm text-siso-text-muted">Success Rate</p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center`}>
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-siso-text-bold mb-1">{config.testimonials.length * 25}+</h4>
            <p className="text-sm text-siso-text-muted">Happy Clients</p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center`}>
              <Star className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-siso-text-bold mb-1">4.9★</h4>
            <p className="text-sm text-siso-text-muted">Average Rating</p>
          </div>
          
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center`}>
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-2xl font-bold text-siso-text-bold mb-1">48hrs</h4>
            <p className="text-sm text-siso-text-muted">Setup Time</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};