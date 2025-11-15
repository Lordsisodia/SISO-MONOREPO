import { GradientHeading } from '@/components/ui/gradient-heading';
import { ArrowRight, X, Check, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const RestaurantTransformationSection = () => {
  const isMobile = useIsMobile();
  
  const beforeAfterScenarios = [
    {
      title: "Order Management",
      before: {
        icon: X,
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        description: "Phone calls, paper orders, missed opportunities",
        problems: ["Lost orders during busy hours", "Staff overwhelmed with calls", "No order history tracking"]
      },
      after: {
        icon: Check,
        color: "text-green-400", 
        bgColor: "bg-green-500/10",
        description: "AI-powered ordering system, automated workflow",
        benefits: ["Orders flow directly to kitchen", "Smart recommendations increase sales", "Complete order analytics"]
      }
    },
    {
      title: "Customer Experience",
      before: {
        icon: AlertTriangle,
        color: "text-orange-400",
        bgColor: "bg-orange-500/10", 
        description: "Long waits, manual reservations, frustrated guests",
        problems: ["Customers wait for table availability", "No loyalty program", "Limited payment options"]
      },
      after: {
        icon: Zap,
        color: "text-blue-400",
        bgColor: "bg-blue-500/10",
        description: "Seamless experience from booking to payment",
        benefits: ["Real-time table management", "Integrated loyalty rewards", "Contactless payment options"]
      }
    }
  ];

  const visualComparison = [
    {
      category: "Daily Operations",
      before: "📞 Manual calls + 📝 Paper orders + ⏰ Long waits",
      after: "📱 Smart app + 🤖 AI automation + ⚡ Instant service",
      impact: "3x faster service"
    },
    {
      category: "Revenue Growth", 
      before: "💰 Lost sales + 📉 No insights + 🔄 Few repeat customers",
      after: "📈 Optimized pricing + 📊 Real-time analytics + 💎 Loyal customers",
      impact: "147% revenue increase"
    },
    {
      category: "Staff Efficiency",
      before: "😓 Overwhelmed staff + 📋 Manual tracking + ❌ Errors",
      after: "😊 Efficient workflow + 📱 Digital tools + ✅ Accuracy",
      impact: "60% time savings"
    }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full filter blur-[40px] animate-float-slow" />
        <div className="absolute top-1/2 right-0 w-[150px] md:w-[300px] h-[150px] md:h-[300px] bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full filter blur-[40px] animate-float-slower" />
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
            Transform Your Restaurant Operations
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            See the dramatic difference our platform makes in real restaurant scenarios
          </p>
        </motion.div>

        {/* Before/After Detailed Scenarios */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-8 md:space-y-12 mb-12 md:mb-16"
        >
          {beforeAfterScenarios.map((scenario, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.2, duration: 0.6 }}
              className="max-w-5xl mx-auto"
            >
              <h3 className="text-xl md:text-2xl font-bold text-siso-text-bold text-center mb-6">
                {scenario.title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                {/* Before */}
                <div className="relative">
                  <div className="bg-black/20 backdrop-blur-sm border border-red-500/20 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full ${scenario.before.bgColor} flex items-center justify-center`}>
                        <scenario.before.icon className={`w-4 h-4 ${scenario.before.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-400">Before SISO</h4>
                        <p className="text-xs text-siso-text-muted">Current state</p>
                      </div>
                    </div>

                    <p className="text-sm text-siso-text mb-4">{scenario.before.description}</p>

                    <div className="space-y-2">
                      {scenario.before.problems.map((problem, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <X className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-siso-text/80">{problem}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
                  <div className="w-12 h-12 bg-gradient-to-r from-siso-red to-siso-orange rounded-full flex items-center justify-center shadow-lg">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Mobile Arrow */}
                <div className="flex justify-center md:hidden">
                  <div className="w-8 h-8 bg-gradient-to-r from-siso-red to-siso-orange rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white rotate-90" />
                  </div>
                </div>

                {/* After */}
                <div className="relative">
                  <div className="bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full ${scenario.after.bgColor} flex items-center justify-center`}>
                        <scenario.after.icon className={`w-4 h-4 ${scenario.after.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-400">With SISO</h4>
                        <p className="text-xs text-siso-text-muted">Transformed state</p>
                      </div>
                    </div>

                    <p className="text-sm text-siso-text mb-4">{scenario.after.description}</p>

                    <div className="space-y-2">
                      {scenario.after.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Check className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-siso-text/80">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Visual Comparison Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-siso-text-bold mb-2">
              The Complete Transformation
            </h3>
            <p className="text-sm text-siso-text-muted">
              Visual summary of changes across all areas
            </p>
          </div>

          <div className="space-y-4">
            {visualComparison.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                className="bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 hover:border-siso-orange/30 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row items-center gap-4">
                  {/* Category */}
                  <div className="text-center md:text-left md:w-1/4">
                    <h4 className="font-semibold text-siso-text-bold text-sm">
                      {item.category}
                    </h4>
                  </div>

                  {/* Before */}
                  <div className="text-center md:w-1/3">
                    <p className="text-xs text-siso-text/80">{item.before}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-siso-orange" />
                  </div>

                  {/* After */}
                  <div className="text-center md:w-1/3">
                    <p className="text-xs text-siso-text/80">{item.after}</p>
                  </div>

                  {/* Impact */}
                  <div className="text-center md:w-1/4">
                    <span className="inline-block px-2 py-1 bg-gradient-to-r from-siso-red/10 to-siso-orange/10 rounded-full text-xs font-semibold text-siso-orange">
                      {item.impact}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};