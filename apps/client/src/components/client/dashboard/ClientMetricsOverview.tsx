/**
 * Client Metrics Overview Component
 * Displays key project metrics with charts and progress indicators
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { useProjects } from '@/hooks/useProjects';
import { useProjectProgress } from '@/hooks/client/useProjectProgress';
import { 
  TrendingUp, 
  DollarSign, 
  Calendar, 
  Users,
  Activity,
  Target,
  Zap,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Metric {
  id: string;
  label: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
  progress?: number;
  sparklineData?: number[];
}

export function ClientMetricsOverview() {
  const { clientData } = useClientDetails();
  const { projects } = useProjects();
  const { progress } = useProjectProgress();

  // Calculate metrics
  const currentStep = clientData?.current_step || 0;
  const totalSteps = clientData?.total_steps || 46;
  const projectProgress = (currentStep / totalSteps) * 100;

  // Mock budget data - in production, this would come from the database
  const budgetUsed = 3250;
  const budgetTotal = 5000;
  const budgetUtilization = (budgetUsed / budgetTotal) * 100;

  // Calculate timeline progress
  const projectStartDate = new Date('2024-01-01'); // Mock start date
  const projectEndDate = new Date('2024-03-01'); // Mock end date
  const currentDate = new Date();
  const totalDuration = projectEndDate.getTime() - projectStartDate.getTime();
  const elapsed = currentDate.getTime() - projectStartDate.getTime();
  const timelineProgress = Math.min(100, (elapsed / totalDuration) * 100);

  // Team members mock data
  const teamMembers = [
    { id: '1', name: 'Sarah Chen', role: 'Project Manager', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
    { id: '2', name: 'Alex Rivera', role: 'Lead Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' },
    { id: '3', name: 'Jordan Smith', role: 'UX Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan' },
    { id: '4', name: 'Taylor Kim', role: 'QA Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor' }
  ];

  const metrics: Metric[] = [
    {
      id: 'active_projects',
      label: 'Active Projects',
      value: '1',
      icon: Target,
      color: 'text-siso-orange',
      sparklineData: [1, 1, 1, 1, 1, 1, 1, 1]
    },
    {
      id: 'project_progress',
      label: 'Project Progress',
      value: `${Math.round(projectProgress)}%`,
      change: 12,
      icon: TrendingUp,
      color: 'text-blue-400',
      progress: projectProgress,
      sparklineData: [30, 35, 42, 48, 55, 62, 68, Math.round(projectProgress)]
    },
    {
      id: 'time_to_launch',
      label: 'Time to Launch',
      value: `${Math.ceil((projectEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))} days`,
      icon: Calendar,
      color: 'text-purple-400',
      sparklineData: [60, 55, 50, 45, 40, 35, 30, Math.ceil((projectEndDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))]
    },
    {
      id: 'features_completed',
      label: 'Features Completed',
      value: '12/25',
      change: 8,
      icon: Zap,
      color: 'text-green-400',
      progress: 48,
      sparklineData: [2, 4, 6, 8, 9, 10, 11, 12]
    }
  ];

  const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    const height = 30;
    const width = 100;
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="opacity-50"
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * width;
          const y = height - ((value - min) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="opacity-70"
            />
          );
        })}
      </svg>
    );
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-400" />
            <span>Project Metrics Overview</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Live</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            
            return (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className={cn("p-2 rounded-lg bg-slate-700", metric.color)}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        {metric.change && (
                          <div className="flex items-center space-x-1 text-green-400 text-sm">
                            <TrendingUp className="h-3 w-3" />
                            <span>+{metric.change}%</span>
                          </div>
                        )}
                      </div>

                      {/* Value */}
                      <div>
                        <div className="text-2xl font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                      </div>

                      {/* Progress or Sparkline */}
                      {metric.progress !== undefined ? (
                        <div className="space-y-1">
                          <Progress value={metric.progress} className="h-1" />
                          <div className="text-xs text-muted-foreground text-right">
                            {metric.id === 'project_progress' && `${currentStep}/${totalSteps} steps`}
                            {metric.id === 'features_completed' && `48% complete`}
                          </div>
                        </div>
                      ) : metric.sparklineData ? (
                        <div className="pt-2">
                          <Sparkline data={metric.sparklineData} color={metric.color.replace('text-', '#')} />
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Team Members */}
        <div className="border-t border-slate-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-white">Project Team</span>
            </div>
            <span className="text-xs text-muted-foreground">{teamMembers.length} members</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  <Avatar className="h-10 w-10 border-2 border-slate-800 hover:z-10 transition-all">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-gray-400">{member.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="h-10 w-10 rounded-full border-2 border-dashed border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300 transition-colors flex items-center justify-center">
              <Users className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}