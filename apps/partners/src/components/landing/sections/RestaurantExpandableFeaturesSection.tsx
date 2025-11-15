import { GradientHeading } from '@/components/ui/gradient-heading';
import { ChevronDown, ChevronUp, ShoppingCart, Clock, Users, TrendingUp, CreditCard, Bell, Shield, Palette, MessageCircle, Calendar, Star, BarChart3, Smartphone, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const RestaurantExpandableFeaturesSection = () => {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Top 5 most important features
  const topFeatures = [
    {
      icon: ShoppingCart,
      title: "Smart Online Ordering",
      description: "AI-powered ordering system with menu management, upselling, and real-time kitchen integration",
      stats: "40% Order Increase",
      highlight: "Most Popular",
      category: "Revenue"
    },
    {
      icon: Clock,
      title: "Table Management Pro",
      description: "Advanced reservation system with waitlist automation, table optimization, and guest notifications",
      stats: "2x Table Turnover",
      highlight: "Efficiency Boost",
      category: "Operations"
    },
    {
      icon: Users,
      title: "Customer Loyalty Engine",
      description: "Built-in rewards program with push notifications, personalized offers, and retention analytics",
      stats: "60% Return Rate",
      highlight: "Customer Retention",
      category: "Growth"
    },
    {
      icon: TrendingUp,
      title: "Real-Time Analytics",
      description: "Live insights on sales, popular items, peak hours, staff performance, and customer behavior",
      stats: "Data-Driven Growth",
      highlight: "Smart Insights",
      category: "Analytics"
    },
    {
      icon: CreditCard,
      title: "Unified Payment Hub",
      description: "Accept all payment methods with split bills, tips management, and automatic reconciliation",
      stats: "Seamless Payments",
      highlight: "Zero Friction",
      category: "Payments"
    }
  ];

  // Additional features shown when expanded
  const additionalFeatures = [
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Automated customer updates, staff alerts, and marketing campaigns",
      stats: "Real-Time Updates",
      highlight: "Stay Connected",
      category: "Communication"
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description: "PCI DSS compliance, data encryption, and health regulation management",
      stats: "100% Secure",
      highlight: "Peace of Mind",
      category: "Security"
    },
    {
      icon: Palette,
      title: "Custom Branding",
      description: "Your restaurant's colors, logo, and style throughout the entire app experience",
      stats: "Brand Consistency",
      highlight: "Your Identity",
      category: "Branding"
    },
    {
      icon: MessageCircle,
      title: "Customer Support Chat",
      description: "Built-in chat system for customer questions, feedback, and support",
      stats: "Instant Support",
      highlight: "Happy Customers",
      category: "Support"
    },
    {
      icon: Calendar,
      title: "Event Management",
      description: "Handle private parties, special events, and catering bookings seamlessly",
      stats: "Event Bookings",
      highlight: "Extra Revenue",
      category: "Events"
    },
    {
      icon: Star,
      title: "Review Management",
      description: "Monitor and respond to reviews across all platforms from one dashboard",
      stats: "Reputation Control",
      highlight: "5-Star Service",
      category: "Reputation"
    },
    {
      icon: BarChart3,
      title: "Inventory Tracking",
      description: "Track ingredients, predict needs, and automate supplier orders",
      stats: "Cost Control",
      highlight: "Waste Reduction",
      category: "Inventory"
    },
    {
      icon: Smartphone,
      title: "Staff Mobile App",
      description: "Dedicated app for staff with order management, communication, and scheduling",
      stats: "Team Efficiency",
      highlight: "Happy Staff",
      category: "Staff"
    },
    {
      icon: Zap,
      title: "Kitchen Display System",
      description: "Digital kitchen orders with timing, priorities, and completion tracking",
      stats: "Faster Service",
      highlight: "Kitchen Efficiency",
      category: "Kitchen"
    }
  ];

  const allFeatures = [...topFeatures, ...additionalFeatures];

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-r from-siso-red/10 to-siso-orange/10 rounded-full filter blur-[50px] md:blur-[100px] animate-float-slow" />
        <div className="absolute bottom-1/4 -right-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-gradient-to-r from-siso-orange/10 to-siso-red/10 rounded-full filter blur-[50px] md:blur-[100px] animate-float-slower" />
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12 relative"
        >
          <GradientHeading variant="secondary" className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 relative">
            Everything Your Restaurant Needs
          </GradientHeading>

          <div className="relative h-1 w-16 md:w-20 mx-auto mb-3 md:mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-siso-red to-siso-orange rounded-full animate-pulse" />
          </div>
          
          <p className="text-sm sm:text-base text-siso-text-muted max-w-xl mx-auto relative">
            Comprehensive restaurant management platform with AI-powered automation
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          {/* Top 5 Features - Always Visible */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
            {topFeatures.map((feature, index) => (
              <motion.div 
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300 blur-md" />
                
                <div className="relative bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 hover:border-siso-orange/20 transition-all duration-300 h-full">
                  {/* Category Badge */}
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-siso-red to-siso-orange text-xs text-white rounded-full">
                    {feature.category}
                  </div>

                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="flex-shrink-0 relative w-10 h-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-siso-red to-siso-orange opacity-20 rounded-lg blur-sm group-hover:opacity-30 transition-opacity duration-300" />
                      <div className="relative h-full rounded-lg bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-2 group-hover:from-siso-red/20 group-hover:to-siso-orange/20 transition-colors duration-300">
                        <feature.icon className="w-full h-full text-siso-orange" />
                      </div>
                    </div>
                    
                    <div className="space-y-1 flex-grow">
                      <h3 className="text-base font-semibold text-siso-text-bold">
                        {feature.title}
                      </h3>
                      
                      {/* Stats badge */}
                      <div className="inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-xs text-siso-orange">
                        {feature.stats}
                      </div>
                      
                      <p className="text-sm text-siso-text/80 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Highlight tag */}
                      <div className="flex items-center gap-1 mt-2">
                        <div className="w-1 h-1 rounded-full bg-siso-orange animate-pulse" />
                        <span className="text-xs text-siso-text-bold">{feature.highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Expand/Collapse Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center mb-6"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={toggleExpanded}
              className="gap-3 border-2 border-siso-orange/30 text-siso-orange hover:bg-siso-orange/10 hover:border-siso-orange transition-all duration-300 group"
            >
              {isExpanded ? (
                <>
                  Show Less Features 
                  <ChevronUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                </>
              ) : (
                <>
                  Show {additionalFeatures.length} More Features 
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                </>
              )}
            </Button>
          </motion.div>

          {/* Additional Features - Expandable */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto",
                  transition: {
                    height: { duration: 0.6, ease: "easeInOut" },
                    opacity: { duration: 0.4, delay: 0.2 }
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  height: 0,
                  transition: {
                    opacity: { duration: 0.3 },
                    height: { duration: 0.5, delay: 0.1, ease: "easeInOut" }
                  }
                }}
                className="overflow-hidden"
              >
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                  {additionalFeatures.map((feature, index) => (
                    <motion.div 
                      key={feature.title}
                      variants={itemVariants}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-siso-red/5 to-siso-orange/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300 blur-md" />
                      
                      <div className="relative bg-black/20 backdrop-blur-sm border border-siso-text/10 rounded-lg p-4 hover:border-siso-orange/20 transition-all duration-300 h-full">
                        {/* Category Badge */}
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-siso-red to-siso-orange text-xs text-white rounded-full">
                          {feature.category}
                        </div>

                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="flex-shrink-0 relative w-10 h-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-siso-red to-siso-orange opacity-20 rounded-lg blur-sm group-hover:opacity-30 transition-opacity duration-300" />
                            <div className="relative h-full rounded-lg bg-gradient-to-br from-siso-red/10 to-siso-orange/10 p-2 group-hover:from-siso-red/20 group-hover:to-siso-orange/20 transition-colors duration-300">
                              <feature.icon className="w-full h-full text-siso-orange" />
                            </div>
                          </div>
                          
                          <div className="space-y-1 flex-grow">
                            <h3 className="text-base font-semibold text-siso-text-bold">
                              {feature.title}
                            </h3>
                            
                            {/* Stats badge */}
                            <div className="inline-block px-2 py-0.5 rounded-full bg-gradient-to-r from-siso-red/10 to-siso-orange/10 text-xs text-siso-orange">
                              {feature.stats}
                            </div>
                            
                            <p className="text-sm text-siso-text/80 leading-relaxed">
                              {feature.description}
                            </p>
                            
                            {/* Highlight tag */}
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-1 h-1 rounded-full bg-siso-orange animate-pulse" />
                              <span className="text-xs text-siso-text-bold">{feature.highlight}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Feature Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-8 text-center"
                >
                  <div className="inline-block px-6 py-3 bg-black/30 backdrop-blur-sm border border-siso-orange/30 rounded-full">
                    <span className="text-sm text-siso-text">
                      ✨ <span className="text-siso-orange font-semibold">{allFeatures.length} Total Features</span> - Complete restaurant management solution
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};