import { GradientHeading } from '@/components/ui/gradient-heading';
import { TrendingUp, DollarSign, Users, Clock, ArrowUp, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const RestaurantResultsSection = () => {
  const isMobile = useIsMobile();
  
  const metrics = [
    {
      title: "Average Revenue Increase",
      value: "147%",
      change: "+47% vs industry",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-500/20"
    },
    {
      title: "Order Volume Growth", 
      value: "280%",
      change: "within 90 days",
      icon: BarChart3,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "Customer Retention",
      value: "68%",
      change: "+23% improvement",
      icon: Users,
      color: "text-purple-400", 
      bgColor: "from-purple-500/20 to-pink-500/20"
    },
    {
      title: "Setup Time Saved",
      value: "6mo",
      change: "vs traditional apps",
      icon: Clock,
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-red-500/20"
    }
  ];

  const beforeAfter = [
    {
      metric: "Daily Orders",
      before: "45",
      after: "127", 
      improvement: "+182%"
    },
    {
      metric: "Table Turnover",
      before: "3.2x",
      after: "5.8x",
      improvement: "+81%"
    },
    {
      metric: "Customer Rating",
      before: "4.1★",
      after: "4.8★",
      improvement: "+17%"
    }
  ];

  const industryProof = [
    {
      category: "Food Service Experience",
      details: "200+ restaurants across 15+ cuisine types",
      icon: "🍽️"
    },
    {
      category: "Industry Integrations", 
      details: "POS systems, payment processors, delivery platforms",
      icon: "🔗"
    },
    {
      category: "Compliance Knowledge",
      details: "Food safety, PCI DSS, health regulations",
      icon: "✅"
    },
    {
      category: "Restaurant Operations",
      details: "Peak hours, seasonal trends, staff workflows",
      icon: "⚡"
    }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-r from-siso-orange/5 to-siso-red/5 rounded-full filter blur-[60px] animate-float-slower" />
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
            Proven Results That Matter
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            Real data from restaurants using our platform - your results may vary, but our track record speaks for itself
          </p>
        </motion.div>

        {/* Key Metrics Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 md:mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgColor} rounded-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-sm`} />
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 text-center hover:border-siso-orange/30 transition-all duration-300">
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>

                {/* Value */}
                <div className={`text-2xl md:text-3xl font-bold ${metric.color} mb-1`}>
                  {metric.value}
                </div>

                {/* Title */}
                <div className="text-xs md:text-sm text-siso-text-bold mb-1">
                  {metric.title}
                </div>

                {/* Change */}
                <div className="text-xs text-siso-text-muted flex items-center justify-center gap-1">
                  <ArrowUp className="w-3 h-3 text-green-400" />
                  {metric.change}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-siso-text-bold mb-2">
              Real Restaurant Transformation
            </h3>
            <p className="text-sm text-siso-text-muted">
              Average results from restaurants after 90 days with SISO
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beforeAfter.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-6 text-center"
                >
                  <h4 className="text-lg font-semibold text-siso-text-bold mb-4">
                    {item.metric}
                  </h4>

                  <div className="flex items-center justify-between mb-4">
                    {/* Before */}
                    <div className="text-center">
                      <div className="text-xs text-siso-text-muted mb-1">Before</div>
                      <div className="text-lg font-bold text-red-400">{item.before}</div>
                    </div>

                    {/* Arrow */}
                    <div className="flex-1 px-4">
                      <div className="h-px bg-gradient-to-r from-red-400 via-siso-orange to-green-400"></div>
                      <div className="text-center">
                        <ArrowUp className="w-4 h-4 text-siso-orange mx-auto mt-1 rotate-90" />
                      </div>
                    </div>

                    {/* After */}
                    <div className="text-center">
                      <div className="text-xs text-siso-text-muted mb-1">After</div>
                      <div className="text-lg font-bold text-green-400">{item.after}</div>
                    </div>
                  </div>

                  {/* Improvement */}
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-siso-red/10 to-siso-orange/10 rounded-full">
                    <span className="text-sm font-semibold text-siso-orange">{item.improvement}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Industry Expertise Proof */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-siso-text-bold mb-2">
              We Know Your Industry Inside Out
            </h3>
            <p className="text-sm text-siso-text-muted">
              Deep restaurant expertise beyond just technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industryProof.map((proof, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 hover:border-siso-orange/30 transition-all duration-300"
              >
                <div className="text-2xl">{proof.icon}</div>
                <div>
                  <h4 className="font-semibold text-siso-text-bold mb-1">
                    {proof.category}
                  </h4>
                  <p className="text-sm text-siso-text/80">
                    {proof.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};