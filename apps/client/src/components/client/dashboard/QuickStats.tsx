/**
 * Quick Stats Component
 * Grid of key project statistics with visual indicators
 */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { useProjects } from '@/hooks/useProjects';
import { useProjectProgress } from '@/hooks/client/useProjectProgress';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Clock, 
  CheckCircle, 
  Users,
  Code,
  GitBranch,
  Bug,
  Zap,
  Activity,
  Target,
  Calendar,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Stat {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon: React.ElementType;
  color: string;
  bgColor: string;
  format?: 'number' | 'currency' | 'percentage' | 'duration';
}

export function QuickStats() {
  const { clientData } = useClientDetails();
  const { projects } = useProjects();
  const { progress } = useProjectProgress();

  // Calculate real stats from data
  const currentStep = clientData?.current_step || 0;
  const totalSteps = clientData?.total_steps || 46;
  const completionPercentage = Math.round((currentStep / totalSteps) * 100);
  
  // Mock additional data - in production, these would come from database
  const mockStats = {
    totalCommits: 127,
    openTasks: 8,
    closedTasks: 34,
    hoursLogged: 156,
    teamMembers: 4,
    linesOfCode: 12543,
    bugsFixed: 23,
    deployments: 12
  };

  const stats: Stat[] = [
    {
      id: 'completion',
      label: 'Project Completion',
      value: completionPercentage,
      change: { value: 12, type: 'increase', period: 'this week' },
      icon: Target,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      format: 'percentage'
    },
    {
      id: 'budget-spent',
      label: 'Budget Spent',
      value: 3250,
      change: { value: 8, type: 'increase', period: 'this month' },
      icon: DollarSign,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      format: 'currency'
    },
    {
      id: 'hours-logged',
      label: 'Hours Logged',
      value: mockStats.hoursLogged,
      change: { value: 15, type: 'increase', period: 'this week' },
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      format: 'duration'
    },
    {
      id: 'tasks-completed',
      label: 'Tasks Completed',
      value: mockStats.closedTasks,
      change: { value: 6, type: 'increase', period: 'this week' },
      icon: CheckCircle,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10',
      format: 'number'
    },
    {
      id: 'team-members',
      label: 'Team Members',
      value: mockStats.teamMembers,
      icon: Users,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10',
      format: 'number'
    },
    {
      id: 'lines-of-code',
      label: 'Lines of Code',
      value: mockStats.linesOfCode,
      change: { value: 2340, type: 'increase', period: 'this week' },
      icon: Code,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-400/10',
      format: 'number'
    },
    {
      id: 'commits',
      label: 'Total Commits',
      value: mockStats.totalCommits,
      change: { value: 8, type: 'increase', period: 'this week' },
      icon: GitBranch,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-400/10',
      format: 'number'
    },
    {
      id: 'bugs-fixed',
      label: 'Bugs Fixed',
      value: mockStats.bugsFixed,
      change: { value: 3, type: 'increase', period: 'this week' },
      icon: Bug,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      format: 'number'
    },
    {
      id: 'velocity',
      label: 'Dev Velocity',
      value: '2.5x',
      change: { value: 25, type: 'increase', period: 'vs baseline' },
      icon: Zap,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10'
    },
    {
      id: 'uptime',
      label: 'System Uptime',
      value: '99.9%',
      change: { value: 0.1, type: 'increase', period: 'this month' },
      icon: Activity,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 'deployments',
      label: 'Deployments',
      value: mockStats.deployments,
      change: { value: 2, type: 'increase', period: 'this month' },
      icon: Calendar,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
      format: 'number'
    },
    {
      id: 'documentation',
      label: 'Docs Coverage',
      value: '87%',
      change: { value: 5, type: 'increase', period: 'this week' },
      icon: FileText,
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10'
    }
  ];

  const formatValue = (value: string | number, format?: string) => {
    if (typeof value === 'string') return value;
    
    switch (format) {
      case 'currency':
        return `$${value.toLocaleString()}`;
      case 'percentage':
        return `${value}%`;
      case 'duration':
        return `${value}h`;
      case 'number':
        return value.toLocaleString();
      default:
        return value.toString();
    }
  };

  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase': return TrendingUp;
      case 'decrease': return TrendingDown;
      default: return TrendingUp;
    }
  };

  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase': return 'text-green-400';
      case 'decrease': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        const ChangeIcon = stat.change ? getChangeIcon(stat.change.type) : null;
        
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="w-full"
          >
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-slate-600 transition-all duration-200 h-full">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Icon and Label */}
                  <div className="flex items-center justify-between">
                    <div className={cn("p-2 rounded-lg", stat.bgColor)}>
                      <IconComponent className={cn("h-4 w-4", stat.color)} />
                    </div>
                    {stat.change && ChangeIcon && (
                      <div className={cn("flex items-center space-x-1 text-xs", getChangeColor(stat.change.type))}>
                        <ChangeIcon className="h-3 w-3" />
                        <span>
                          {stat.change.type === 'increase' ? '+' : ''}
                          {stat.change.value}
                          {stat.format === 'percentage' || stat.change.value.toString().includes('%') ? '%' : ''}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Value */}
                  <div>
                    <div className="text-xl font-bold text-white leading-none">
                      {formatValue(stat.value, stat.format)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {stat.label}
                    </div>
                  </div>

                  {/* Change Period */}
                  {stat.change && (
                    <div className="text-xs text-muted-foreground">
                      {stat.change.period}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}