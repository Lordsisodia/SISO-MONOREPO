import { GradientHeading } from '@/components/ui/gradient-heading';
import { Star, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const RestaurantSocialProofSection = () => {
  const isMobile = useIsMobile();
  
  const testimonials = [
    {
      name: "Maria Rodriguez",
      restaurant: "Taco Libre",
      location: "Austin, TX",
      quote: "Orders increased 40% in the first month. The app paid for itself immediately.",
      metric: "+40% Orders",
      avatar: "🌮"
    },
    {
      name: "David Chen",
      restaurant: "Golden Dragon",
      location: "San Francisco, CA", 
      quote: "Table turnover doubled. Customers love the seamless reservation system.",
      metric: "2x Turnover",
      avatar: "🥡"
    },
    {
      name: "Sarah Johnson",
      restaurant: "Farm & Table",
      location: "Denver, CO",
      quote: "Best investment we made. Customer loyalty program brings them back weekly.",
      metric: "60% Return Rate",
      avatar: "🥗"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Restaurants", value: "200+" },
    { icon: TrendingUp, label: "Average Revenue Increase", value: "40%" },
    { icon: Star, label: "Customer Rating", value: "4.9/5" }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-1/4 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-full filter blur-[40px] md:blur-[80px] animate-float-slow" />
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
            Trusted by Growing Restaurants
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-lg mx-auto">
            Real results from restaurants like yours
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-8 md:mb-12 max-w-2xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-2">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-siso-orange" />
              </div>
              <div className="text-lg md:text-2xl font-bold text-siso-text-bold">{stat.value}</div>
              <div className="text-xs md:text-sm text-siso-text-muted">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="relative group"
            >
              <div className="bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 hover:border-siso-orange/20 transition-all duration-300">
                {/* Quote */}
                <div className="mb-4">
                  <div className="text-2xl text-siso-orange/50 mb-2">"</div>
                  <p className="text-sm md:text-base text-siso-text leading-relaxed">
                    {testimonial.quote}
                  </p>
                </div>

                {/* Metric Badge */}
                <div className="inline-block px-2 py-1 rounded-full bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-xs text-siso-orange mb-3">
                  {testimonial.metric}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-semibold text-siso-text-bold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-siso-text-muted">
                      {testimonial.restaurant} • {testimonial.location}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-siso-orange text-siso-orange" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};