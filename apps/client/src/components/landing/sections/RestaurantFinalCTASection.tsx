import { GradientHeading } from '@/components/ui/gradient-heading';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const RestaurantFinalCTASection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const guarantees = [
    "100% Free Demo - No Payment Required",
    "48-Hour Delivery Guarantee", 
    "Full Money-Back Promise",
    "Unlimited Revisions Until Perfect"
  ];

  const handleGetStarted = () => {
    navigate('/client/dashboard');
  };

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Strong background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-siso-red/10 via-siso-orange/10 to-siso-red/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-siso-orange/20 rounded-full filter blur-[60px] animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[150px] md:w-[250px] h-[150px] md:h-[250px] bg-siso-red/20 rounded-full filter blur-[60px] animate-float-slower" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Main headline */}
          <GradientHeading variant="primary" className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            Ready to Transform Your Restaurant?
          </GradientHeading>
          
          <p className="text-lg md:text-xl text-siso-text mb-8 md:mb-10 leading-relaxed">
            Join 200+ restaurants already growing with SISO. Start your 48-hour journey today.
          </p>

          {/* Guarantees grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 md:mb-10 max-w-2xl mx-auto"
          >
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-3 text-left"
              >
                <CheckCircle className="w-5 h-5 text-siso-orange flex-shrink-0" />
                <span className="text-sm md:text-base text-siso-text">{guarantee}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
          >
            <Button 
              size="lg"
              className="gap-3 bg-gradient-to-r from-siso-red to-siso-orange hover:opacity-90 hover:scale-105 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-siso-orange/25"
              onClick={handleGetStarted}
            >
              Start Free Demo <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>

          {/* Urgency message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/30 backdrop-blur-sm border border-siso-orange/30 rounded-full"
          >
            <Clock className="w-4 h-4 text-siso-orange" />
            <span className="text-sm text-siso-text">
              Limited time: <span className="text-siso-orange font-semibold">Free setup worth $2,000</span>
            </span>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-8 pt-6 border-t border-siso-text/10"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-siso-text-muted">
              <span>✅ No Setup Fees</span>
              <span>✅ Cancel Anytime</span>
              <span>✅ 24/7 Support</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};