import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Briefcase, 
  CheckCircle, 
  DollarSign, 
  Code, 
  Users, 
  Trophy,
  TrendingUp,
  Globe,
  Clock,
  Star
} from 'lucide-react';
import CountUp from 'react-countup';
import { cn } from '@/lib/utils';

interface PortfolioStatsProps {
  portfolioData: Array<{
    id: string;
    app_name: string;
    estimated_value: number;
    development_status: string;
    technologies: string[];
    client_name?: string;
    completion_date?: string;
    rating?: number;
  }>;
}

export function PortfolioStats({ portfolioData }: PortfolioStatsProps) {
  // Calculate statistics
  const totalProjects = portfolioData.length;
  const completedProjects = portfolioData.filter(item => item.development_status === 'completed').length;
  const totalValue = portfolioData.reduce((sum, item) => sum + (item.estimated_value || 0), 0);
  const totalTechnologies = [...new Set(portfolioData.flatMap(item => item.technologies || []))].length;
  const uniqueClients = [...new Set(portfolioData.map(item => item.client_name).filter(Boolean))].length;
  const averageRating = portfolioData.reduce((sum, item) => sum + (item.rating || 5), 0) / portfolioData.length;

  const stats = [
    {
      title: 'Total Projects',
      value: totalProjects,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      delay: 0.1
    },
    {
      title: 'Completed',
      value: completedProjects,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      delay: 0.2
    },
    {
      title: 'Portfolio Value',
      value: totalValue,
      icon: DollarSign,
      color: 'from-siso-orange to-siso-red',
      bgColor: 'bg-siso-orange/10',
      textColor: 'text-siso-orange',
      prefix: '$',
      format: true,
      delay: 0.3
    },
    {
      title: 'Technologies',
      value: totalTechnologies,
      icon: Code,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      delay: 0.4
    },
    {
      title: 'Happy Clients',
      value: uniqueClients,
      icon: Users,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-500/10',
      textColor: 'text-pink-400',
      delay: 0.5
    },
    {
      title: 'Avg Rating',
      value: averageRating,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400',
      decimal: 1,
      delay: 0.6
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-siso-bg-alt border-siso-border hover:border-siso-orange/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={cn(
                          "h-10 w-10 rounded-lg flex items-center justify-center",
                          stat.bgColor
                        )}>
                          <Icon className={cn("h-5 w-5", stat.textColor)} />
                        </div>
                        <div>
                          <p className="text-sm text-siso-text-muted font-medium">
                            {stat.title}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className={cn(
                          "text-3xl font-bold transition-colors duration-300",
                          stat.textColor,
                          "group-hover:text-white"
                        )}>
                          {stat.prefix && stat.prefix}
                          <CountUp 
                            end={stat.value} 
                            delay={stat.delay + 0.5} 
                            duration={2}
                            separator={stat.format ? "," : ""}
                            decimals={stat.decimal || 0}
                          />
                        </p>
                      </div>
                    </div>
                    
                    {/* Decorative gradient background */}
                    <div className={cn(
                      "absolute top-0 right-0 h-full w-1 bg-gradient-to-b opacity-50 group-hover:opacity-100 transition-opacity",
                      stat.color
                    )} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Success Rate and Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {/* Success Rate */}
        <Card className="bg-siso-bg-alt border-siso-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-siso-text-muted font-medium">Success Rate</p>
                  <p className="text-2xl font-bold text-green-400">
                    <CountUp 
                      end={totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0} 
                      delay={1.2} 
                      duration={2}
                      decimals={0}
                    />%
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs text-siso-text-muted">
              {completedProjects} of {totalProjects} projects completed successfully
            </div>
          </CardContent>
        </Card>

        {/* Growth Trend */}
        <Card className="bg-siso-bg-alt border-siso-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-siso-orange/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-siso-orange" />
                </div>
                <div>
                  <p className="text-sm text-siso-text-muted font-medium">Growth Rate</p>
                  <p className="text-2xl font-bold text-siso-orange">
                    <CountUp 
                      end={127} 
                      delay={1.4} 
                      duration={2}
                    />%
                  </p>
                </div>
              </div>
            </div>
            <div className="text-xs text-siso-text-muted">
              Year-over-year portfolio growth
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-siso-bg-alt border-siso-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-siso-orange/10 flex items-center justify-center">
                <Globe className="h-4 w-4 text-siso-orange" />
              </div>
              <h3 className="text-lg font-semibold text-white">Portfolio Insights</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-siso-text-muted" />
                <span className="text-siso-text-muted">Avg. Project Duration:</span>
                <span className="text-white font-medium">3.2 months</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-siso-text-muted" />
                <span className="text-siso-text-muted">Most Used Tech:</span>
                <span className="text-white font-medium">React, Node.js</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-siso-text-muted" />
                <span className="text-siso-text-muted">Client Retention:</span>
                <span className="text-white font-medium">94%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}