/**
 * Portfolio Domain - Enhanced Industry Category Card
 */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Star } from 'lucide-react';
import { IndustryCategory } from '../../types';
import { getIndustryById } from '../../data';
import { cn } from '@/lib/utils';

interface IndustryCategoryCardProps {
  industry: IndustryCategory;
  className?: string;
}

// Industry metrics data
const industryMetrics: Record<IndustryCategory, {
  projectCount: number;
  avgValue: number;
  rating: number;
  topTech: string[];
  featuredProject?: {
    name: string;
    date: string;
  };
}> = {
  'tourism-activities': {
    projectCount: 1,
    avgValue: 15000,
    rating: 5.0,
    topTech: ['React', 'Next.js', 'Stripe'],
    featuredProject: {
      name: 'Mayorker Activities',
      date: 'Dec 2024'
    }
  },
  'fintech-crypto': {
    projectCount: 1,
    avgValue: 25000,
    rating: 4.9,
    topTech: ['React', 'Web3.js', 'Tailwind'],
    featuredProject: {
      name: 'UbahCryp Platform',
      date: 'Nov 2024'
    }
  },
  'health-wellness': {
    projectCount: 1,
    avgValue: 12000,
    rating: 4.8,
    topTech: ['React', 'Node.js', 'MongoDB'],
    featuredProject: {
      name: 'Shout Health',
      date: 'Oct 2024'
    }
  },
  'construction': {
    projectCount: 2,
    avgValue: 18000,
    rating: 4.9,
    topTech: ['React', 'Tailwind', 'Node.js'],
    featuredProject: {
      name: 'Optimal Construction',
      date: 'Dec 2024'
    }
  },
  'saas': {
    projectCount: 2,
    avgValue: 35000,
    rating: 5.0,
    topTech: ['React', 'TypeScript', 'Supabase'],
    featuredProject: {
      name: 'SISO Internal Platform',
      date: 'Dec 2024'
    }
  },
  'elearning': {
    projectCount: 1,
    avgValue: 20000,
    rating: 4.8,
    topTech: ['React', 'Tailwind', 'Video API'],
    featuredProject: {
      name: 'Mu Shin Courses',
      date: 'Oct 2024'
    }
  },
  'fitness-sports': {
    projectCount: 2,
    avgValue: 16000,
    rating: 4.9,
    topTech: ['React', 'Next.js', 'Tailwind'],
    featuredProject: {
      name: 'Gritness Gym',
      date: 'Dec 2024'
    }
  },
  'transportation': {
    projectCount: 1,
    avgValue: 14000,
    rating: 4.7,
    topTech: ['React', 'Tailwind', 'Booking API'],
    featuredProject: {
      name: '5 Star Car Hire',
      date: 'Nov 2024'
    }
  },
  'food-beverage': {
    projectCount: 1,
    avgValue: 13000,
    rating: 4.8,
    topTech: ['React', 'Tailwind', 'Firebase'],
    featuredProject: {
      name: 'Elementree Restaurant',
      date: 'Oct 2024'
    }
  },
  'internal-tools': {
    projectCount: 2,
    avgValue: 45000,
    rating: 5.0,
    topTech: ['React', 'TypeScript', 'Supabase'],
    featuredProject: {
      name: 'SISO Internal Platform',
      date: 'Dec 2024'
    }
  }
};

export function IndustryCategoryCard({ industry, className }: IndustryCategoryCardProps) {
  const industryData = getIndustryById(industry);
  const metrics = industryMetrics[industry];

  if (!industryData) return null;

  const Icon = industryData.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn('group', className)}
    >
      <Link to={`/portfolio/${industryData.slug}`}>
        <div className="relative h-full overflow-hidden rounded-xl border border-siso-border bg-gradient-to-br from-siso-bg-alt to-siso-bg hover:border-siso-orange/50 transition-all duration-300">

          {/* Header Image */}
          {industryData.headerImage && (
            <div className="relative h-40 overflow-hidden">
              <img
                src={industryData.headerImage}
                alt={industryData.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {/* Gradient Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-siso-bg" />
            </div>
          )}

          {/* Gradient Overlay Pattern */}
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(45deg, ${industryData.color.replace('bg-', 'rgb(var(--')})}, transparent)`,
            }}
          />

          {/* Content */}
          <div className="relative p-6 pt-4 space-y-4">

            {/* Header with Icon and Title */}
            <div className="flex items-start gap-4">
              <div className={cn(
                "p-3 rounded-lg flex items-center justify-center",
                industryData.color.replace('bg-', 'bg-') + '/20'
              )}>
                <Icon className={cn("h-6 w-6", industryData.color.replace('bg-', 'text-'))} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white group-hover:text-siso-orange transition-colors">
                  {industryData.name}
                </h3>
                <p className="text-sm text-siso-text-muted mt-1">
                  {metrics.projectCount} {metrics.projectCount === 1 ? 'project' : 'projects'}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-siso-text-muted line-clamp-2 leading-relaxed">
              {industryData.description}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-siso-bg/50 backdrop-blur-sm rounded-lg p-3 text-center border border-siso-border/50">
                <div className="text-xl font-bold text-white">{metrics.projectCount}</div>
                <div className="text-xs text-siso-text-muted">Projects</div>
              </div>
              <div className="bg-siso-bg/50 backdrop-blur-sm rounded-lg p-3 text-center border border-siso-border/50">
                <div className="text-xl font-bold text-siso-orange">
                  ${(metrics.avgValue / 1000).toFixed(0)}K
                </div>
                <div className="text-xs text-siso-text-muted">Avg Value</div>
              </div>
              <div className="bg-siso-bg/50 backdrop-blur-sm rounded-lg p-3 text-center border border-siso-border/50">
                <div className="flex items-center justify-center gap-1 text-xl font-bold text-yellow-400">
                  {metrics.rating}
                  <Star className="h-3 w-3 fill-current" />
                </div>
                <div className="text-xs text-siso-text-muted">Rating</div>
              </div>
            </div>

            {/* Top Tech Stack */}
            <div>
              <div className="text-xs text-siso-text-muted mb-2">Top Stack:</div>
              <div className="flex flex-wrap gap-2">
                {metrics.topTech.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="bg-siso-bg-alt border border-siso-border text-xs text-white"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured Project */}
            {metrics.featuredProject && (
              <div className="pt-4 border-t border-siso-border/50">
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-siso-orange" />
                  <span className="text-siso-text-muted">Featured:</span>
                  <span className="text-white font-medium">{metrics.featuredProject.name}</span>
                  <span className="text-siso-text-muted">•</span>
                  <span className="text-siso-text-muted text-xs">{metrics.featuredProject.date}</span>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <Button
              variant="ghost"
              className="w-full justify-between group-hover:bg-siso-orange/10 group-hover:text-siso-orange transition-colors"
            >
              View All Projects
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-siso-orange/20 via-transparent to-transparent" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
