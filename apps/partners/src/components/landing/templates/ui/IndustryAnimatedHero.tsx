import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Users, TrendingUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type IndustryConfig } from '../IndustryConfig';

interface IndustryAnimatedHeroProps {
  config: IndustryConfig;
}

export const IndustryAnimatedHero = ({ config }: IndustryAnimatedHeroProps) => {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  // Rotate through hero titles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % config.heroTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [config.heroTitles.length]);

  return (
    <div className="relative">
      {/* Main Hero Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative bg-black/40 backdrop-blur-sm border border-siso-text/10 rounded-2xl p-6 md:p-8 shadow-2xl"
      >
        {/* Gradient Border Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.colorScheme.gradient} rounded-2xl opacity-20 blur-sm`} />
        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${config.colorScheme.gradient} rounded-xl flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">SI</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-siso-text-bold">SISO Platform</h3>
                <p className="text-sm text-siso-text-muted">{config.industry} Solution</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>
          </div>

          {/* Rotating Title Animation */}
          <div className="mb-6 h-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTitleIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center"
              >
                <h4 className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${config.colorScheme.gradient} bg-clip-text text-transparent`}>
                  {config.heroTitles[currentTitleIndex]}
                </h4>
                <p className="text-sm text-siso-text-muted mt-2">
                  in just 48 hours with AI automation
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Feature Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {config.topFeatures.slice(0, 4).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="bg-black/20 backdrop-blur-sm rounded-lg p-3 border border-siso-text/5 hover:border-siso-orange/20 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <feature.icon className={`w-4 h-4 text-${config.colorScheme.secondary}`} />
                  <span className="text-xs font-medium text-siso-text-bold">{feature.title.split(' ')[0]}</span>
                </div>
                <p className="text-xs text-siso-orange font-semibold">{feature.stats}</p>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex gap-3"
          >
            <Button
              size="sm"
              className={`flex-1 bg-gradient-to-r ${config.colorScheme.gradient} hover:shadow-lg transition-all duration-300`}
            >
              Get Free Demo
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`border-${config.colorScheme.secondary}/30 text-${config.colorScheme.secondary} hover:bg-${config.colorScheme.secondary}/10`}
            >
              <Play className="w-3 h-3 mr-1" />
              Watch
            </Button>
          </motion.div>

          {/* Success Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-6 pt-4 border-t border-siso-text/10"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-3 h-3" />
                <span>+{config.metrics[0]?.value || '147%'} Revenue</span>
              </div>
              <div className="flex items-center gap-1 text-blue-400">
                <Users className="w-3 h-3" />
                <span>{config.testimonials.length * 20}+ Clients</span>
              </div>
              <div className="flex items-center gap-1 text-siso-orange">
                <Zap className="w-3 h-3" />
                <span>48hr Launch</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-400/30"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-6 h-6 text-green-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30"
      >
        <motion.div
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-4 h-4 text-blue-400" />
        </motion.div>
      </motion.div>
    </div>
  );
};