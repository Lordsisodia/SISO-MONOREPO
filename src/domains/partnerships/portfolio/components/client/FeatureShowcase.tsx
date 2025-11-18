/**
 * Feature Showcase Component
 * Displays project features organized by category
 */

import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Code,
  Plug,
  Check
} from 'lucide-react';

interface FeatureShowcaseProps {
  features: {
    key: string[];
    technical: string[];
    integrations: string[];
  };
}

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export function FeatureShowcase({ features }: FeatureShowcaseProps) {
  const categories = [
    {
      title: 'Key Features',
      icon: Sparkles,
      features: features.key,
      color: 'text-siso-orange'
    },
    {
      title: 'Technical Features',
      icon: Code,
      features: features.technical,
      color: 'text-blue-400'
    },
    {
      title: 'Integrations',
      icon: Plug,
      features: features.integrations,
      color: 'text-green-400'
    }
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <motion.div key={category.title} variants={itemVariants}>
            <Card className="h-full border border-siso-border bg-siso-bg-alt">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-siso-bg`}>
                    <Icon className={`w-5 h-5 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {category.title}
                  </h3>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {category.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-siso-orange mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-siso-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
