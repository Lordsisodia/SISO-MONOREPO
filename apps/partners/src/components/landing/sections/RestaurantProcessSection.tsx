import { GradientHeading } from '@/components/ui/gradient-heading';
import { MessageCircle, Palette, Code, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const RestaurantProcessSection = () => {
  const isMobile = useIsMobile();
  
  const steps = [
    {
      icon: MessageCircle,
      title: "Quick Chat",
      description: "Tell us about your restaurant in a 5-minute call",
      time: "5 mins",
      day: "Day 1"
    },
    {
      icon: Palette,
      title: "Design Review",
      description: "We create your app design based on your brand",
      time: "24 hrs",
      day: "Day 1"
    },
    {
      icon: Code,
      title: "AI Development",
      description: "Our AI agents build your custom restaurant app",
      time: "24 hrs", 
      day: "Day 2"
    },
    {
      icon: Rocket,
      title: "Go Live",
      description: "Your app is live and taking orders immediately",
      time: "Ready",
      day: "Day 2"
    }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/3 -right-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gradient-to-r from-siso-orange/5 to-siso-red/5 rounded-full filter blur-[40px] md:blur-[80px] animate-float-slower" />
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
            From Idea to Live App in 48 Hours
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-lg mx-auto">
            Our proven process gets your restaurant app live fast
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                className="relative"
              >
                {/* Connector Line (hidden on mobile) */}
                {index < steps.length - 1 && !isMobile && (
                  <div className="absolute top-6 -right-2 w-4 h-px bg-gradient-to-r from-siso-orange/50 to-transparent z-0" />
                )}

                <div className="relative bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 text-center hover:border-siso-orange/20 transition-all duration-300 group">
                  {/* Day Badge */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-siso-red to-siso-orange text-xs text-white rounded-full">
                    {step.day}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-3 mt-2">
                    <div className="relative w-10 h-10 md:w-12 md:h-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-siso-red to-siso-orange opacity-20 rounded-lg blur-sm group-hover:opacity-30 transition-opacity duration-300" />
                      <div className="relative h-full rounded-lg bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-2 group-hover:from-siso-red/20 group-hover:to-siso-orange/20 transition-colors duration-300">
                        <step.icon className="w-full h-full text-siso-orange" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-sm md:text-base font-semibold text-siso-text-bold mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs md:text-sm text-siso-text/80 leading-relaxed mb-3">
                    {step.description}
                  </p>

                  {/* Time Badge */}
                  <div className="inline-block px-2 py-1 rounded-full bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-xs text-siso-orange">
                    {step.time}
                  </div>

                  {/* Step Number */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-r from-siso-red to-siso-orange rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8 md:mt-12"
        >
          <div className="inline-block px-4 py-2 bg-black/30 backdrop-blur-sm border border-siso-orange/30 rounded-full">
            <span className="text-sm text-siso-text">
              ⚡ Start your 48-hour journey today - 
              <span className="text-siso-orange font-semibold"> Free demo first</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};