import { GradientHeading } from '@/components/ui/gradient-heading';
import { Smartphone, Monitor, TrendingUp, Users, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

export const RestaurantShowcaseSection = () => {
  const isMobile = useIsMobile();
  
  const restaurantTypes = [
    {
      type: "Fine Dining",
      emoji: "🍷",
      features: ["Reservation System", "Wine Pairing", "Premium Experience"],
      bgColor: "from-purple-500/20 to-pink-500/20",
      preview: "🖼️ Elegant dark theme with gold accents"
    },
    {
      type: "Fast Casual",
      emoji: "🍔",
      features: ["Quick Order", "Loyalty Rewards", "Mobile Pickup"],
      bgColor: "from-orange-500/20 to-red-500/20", 
      preview: "🖼️ Bright, energetic design with quick actions"
    },
    {
      type: "Coffee Shop",
      emoji: "☕",
      features: ["Pre-Order", "Subscription", "Social Hub"],
      bgColor: "from-amber-500/20 to-orange-500/20",
      preview: "🖼️ Warm, cozy design with community features"
    }
  ];

  const features = [
    {
      icon: ShoppingCart,
      title: "Smart Menu",
      description: "AI-powered recommendations based on customer preferences",
      visual: "📊 Dynamic pricing & smart upsells"
    },
    {
      icon: Users,
      title: "Table Management",
      description: "Real-time availability with automated waitlist",
      visual: "🗓️ Visual table layout & booking flow"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Live metrics on sales, popular items, and customer behavior",
      visual: "📈 Real-time charts & growth metrics"
    }
  ];

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-full filter blur-[60px] animate-float-slow" />
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
            Built for Every Restaurant Type
          </GradientHeading>
          <p className="text-sm sm:text-base text-siso-text-muted max-w-2xl mx-auto">
            Our AI creates custom apps perfectly tailored to your restaurant's unique style and needs
          </p>
        </motion.div>

        {/* Restaurant Types Showcase */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16"
        >
          {restaurantTypes.map((restaurant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${restaurant.bgColor} rounded-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 blur-sm`} />
              
              <div className="relative bg-black/30 backdrop-blur-sm border border-siso-text/10 rounded-xl p-6 hover:border-siso-orange/30 transition-all duration-300 group-hover:transform group-hover:scale-105">
                {/* Restaurant Type Header */}
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{restaurant.emoji}</div>
                  <h3 className="text-lg font-semibold text-siso-text-bold">{restaurant.type}</h3>
                </div>

                {/* Mock App Preview */}
                <div className="bg-black/50 rounded-lg p-3 mb-4 text-center">
                  <div className="text-xs text-siso-text-muted mb-2">App Preview</div>
                  <div className="text-sm text-siso-orange">{restaurant.preview}</div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  {restaurant.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-siso-orange rounded-full"></div>
                      <span className="text-sm text-siso-text">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features with Visual Previews */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-siso-text-bold mb-2">
              See Your App in Action
            </h3>
            <p className="text-sm text-siso-text-muted">
              Every feature designed with restaurant owners in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-br from-siso-red to-siso-orange opacity-20 rounded-xl blur-md group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="relative h-full rounded-xl bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-4 group-hover:from-siso-red/20 group-hover:to-siso-orange/20 transition-colors duration-300">
                      <feature.icon className="w-full h-full text-siso-orange" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-lg font-semibold text-siso-text-bold mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-siso-text/80 mb-3">
                  {feature.description}
                </p>

                {/* Visual Preview */}
                <div className="bg-black/20 rounded-lg p-3 border border-siso-text/10">
                  <div className="text-xs text-siso-orange">{feature.visual}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile/Desktop Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-12 md:mt-16 text-center"
        >
          <div className="flex justify-center items-center gap-8 mb-6">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-siso-orange" />
              <span className="text-sm text-siso-text">Mobile App</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-siso-orange" />
              <span className="text-sm text-siso-text">Admin Dashboard</span>
            </div>
          </div>

          <div className="inline-block px-4 py-2 bg-black/30 backdrop-blur-sm border border-siso-orange/30 rounded-full">
            <span className="text-sm text-siso-text">
              ✨ <span className="text-siso-orange font-semibold">Live Demo Available</span> - See your industry in action
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};