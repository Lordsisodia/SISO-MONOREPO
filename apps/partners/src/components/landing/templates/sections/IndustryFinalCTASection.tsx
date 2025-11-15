import { GradientHeading } from '@/components/ui/gradient-heading';
import { ArrowRight, Shield, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustryFinalCTASectionProps {
  config: IndustryConfig;
}

export const IndustryFinalCTASection = ({ config }: IndustryFinalCTASectionProps) => {
  const navigate = useNavigate();
  
  const handleGetDemo = () => {
    navigate('/client-dashboard');
  };
  return (
    <section className="py-12 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-r ${config.colorScheme.gradient} opacity-20 rounded-full filter blur-[100px] animate-float-slow`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[250px] md:w-[500px] h-[250px] md:h-[500px] bg-gradient-to-r from-${config.colorScheme.secondary}/15 to-${config.colorScheme.primary}/15 rounded-full filter blur-[80px] animate-float-slower`} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <div className="mb-8 md:mb-12">
            <GradientHeading variant="primary" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to Transform Your {config.industry}?
            </GradientHeading>
            <p className="text-lg sm:text-xl text-siso-text-muted max-w-2xl mx-auto">
              Join hundreds of successful {config.industry.toLowerCase()} already growing their business with our AI-powered platform
            </p>
          </div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 md:mb-12"
          >
            <div className="flex items-center justify-center gap-3 p-4 bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-green-400" />
              <div className="text-left">
                <p className="text-sm font-semibold text-green-400">100% Guarantee</p>
                <p className="text-xs text-siso-text-muted">Risk-free trial</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-black/20 backdrop-blur-sm border border-blue-500/20 rounded-lg">
              <Star className="w-6 h-6 text-blue-400" />
              <div className="text-left">
                <p className="text-sm font-semibold text-blue-400">4.9★ Rating</p>
                <p className="text-xs text-siso-text-muted">{config.testimonials.length * 25}+ reviews</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-black/20 backdrop-blur-sm border border-orange-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-orange-400" />
              <div className="text-left">
                <p className="text-sm font-semibold text-orange-400">48hr Launch</p>
                <p className="text-xs text-siso-text-muted">Guaranteed delivery</p>
              </div>
            </div>
          </motion.div>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-6"
          >
            <Button
              size="xl"
              onClick={handleGetDemo}
              className={`bg-gradient-to-r ${config.colorScheme.gradient} hover:shadow-2xl hover:shadow-${config.colorScheme.primary}/25 transition-all duration-300 transform hover:scale-105 group text-lg px-8 py-4`}
            >
              Get Your Free Demo Now
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <p className="text-sm text-siso-text-muted">
              ✅ No setup fees • ✅ No long-term contracts • ✅ 30-day money-back guarantee
            </p>
          </motion.div>

          {/* Urgency Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 md:mt-12 p-6 bg-black/30 backdrop-blur-sm border border-siso-orange/30 rounded-xl"
          >
            <p className="text-lg font-semibold text-siso-text-bold mb-2">
              🚀 Limited Time: Free Setup (Worth $2,000)
            </p>
            <p className="text-sm text-siso-text-muted">
              We're helping the first 100 {config.industry.toLowerCase()} get started with completely free setup and onboarding. 
              <span className="text-siso-orange font-semibold"> Claim your spot before it's gone!</span>
            </p>
          </motion.div>

          {/* Final Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 md:mt-12"
          >
            <div className="inline-block p-6 bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-xl">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-2xl">{config.testimonials[0]?.avatar}</div>
                <div className="text-left">
                  <p className="font-semibold text-siso-text-bold">{config.testimonials[0]?.name}</p>
                  <p className="text-sm text-siso-text-muted">{config.testimonials[0]?.business}</p>
                </div>
                <div className={`px-3 py-1 bg-gradient-to-r ${config.colorScheme.gradient} rounded-full text-sm text-white font-semibold`}>
                  {config.testimonials[0]?.metric}
                </div>
              </div>
              <p className="text-sm text-siso-text italic">
                "{config.testimonials[0]?.quote}"
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};