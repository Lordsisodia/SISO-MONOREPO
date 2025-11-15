/**
 * Upcoming Milestones Component
 * Displays upcoming project milestones with countdown timers
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { 
  Calendar, 
  Clock, 
  Flag, 
  Target,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Rocket,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'at_risk' | 'completed';
  progress: number;
  category: 'development' | 'design' | 'testing' | 'deployment' | 'review';
  assignees: string[];
  dependencies?: string[];
  estimatedHours?: number;
  completedHours?: number;
}

export function UpcomingMilestones() {
  const { clientData } = useClientDetails();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute for accurate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock milestones data - in production, this would come from the database
  const milestones: Milestone[] = [
    {
      id: '1',
      title: 'MVP Feature Completion',
      description: 'Complete all core features for the minimum viable product release.',
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      priority: 'high',
      status: 'upcoming',
      progress: 78,
      category: 'development',
      assignees: ['Alex Rivera', 'Sarah Chen'],
      estimatedHours: 120,
      completedHours: 94
    },
    {
      id: '2',
      title: 'User Testing Phase 1',
      description: 'Conduct initial user testing with 10 beta users and collect feedback.',
      dueDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000), // 8 days from now
      priority: 'high',
      status: 'upcoming',
      progress: 25,
      category: 'testing',
      assignees: ['Taylor Kim', 'Jordan Smith'],
      estimatedHours: 40,
      completedHours: 10
    },
    {
      id: '3',
      title: 'Design System Finalization',
      description: 'Complete the design system documentation and component library.',
      dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000), // 12 days from now
      priority: 'medium',
      status: 'upcoming',
      progress: 60,
      category: 'design',
      assignees: ['Jordan Smith'],
      estimatedHours: 60,
      completedHours: 36
    },
    {
      id: '4',
      title: 'Security Audit',
      description: 'Comprehensive security review and penetration testing.',
      dueDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000), // 18 days from now
      priority: 'high',
      status: 'upcoming',
      progress: 0,
      category: 'review',
      assignees: ['External Auditor'],
      estimatedHours: 80,
      completedHours: 0
    },
    {
      id: '5',
      title: 'Production Deployment',
      description: 'Deploy the application to production environment.',
      dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
      priority: 'high',
      status: 'upcoming',
      progress: 15,
      category: 'deployment',
      assignees: ['Alex Rivera', 'DevOps Team'],
      estimatedHours: 32,
      completedHours: 5
    }
  ];

  const getCountdown = (dueDate: Date) => {
    const now = currentTime;
    const diff = dueDate.getTime() - now.getTime();
    
    if (diff <= 0) {
      return { isOverdue: true, text: 'Overdue' };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return { isOverdue: false, text: `${days}d ${hours}h`, days, hours };
    } else {
      return { isOverdue: false, text: `${hours}h`, days: 0, hours };
    }
  };

  const getMilestoneIcon = (category: Milestone['category']) => {
    switch (category) {
      case 'development': return Zap;
      case 'design': return Target;
      case 'testing': return CheckCircle;
      case 'deployment': return Rocket;
      case 'review': return AlertCircle;
      default: return Flag;
    }
  };

  const getCategoryColor = (category: Milestone['category']) => {
    switch (category) {
      case 'development': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'design': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'testing': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'deployment': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'review': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getPriorityColor = (priority: Milestone['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10 border-red-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getUrgencyStatus = (dueDate: Date, progress: number) => {
    const countdown = getCountdown(dueDate);
    if (countdown.isOverdue) return 'overdue';
    if (countdown.days <= 3 && progress < 80) return 'urgent';
    if (countdown.days <= 7 && progress < 50) return 'warning';
    return 'normal';
  };

  // Sort milestones by due date
  const sortedMilestones = [...milestones].sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-400" />
            <span>Upcoming Milestones</span>
            <Badge variant="outline" className="bg-blue-400/10 text-blue-400 border-blue-400/30">
              {milestones.length} milestones
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-400" />
            <span className="text-sm text-green-400">On Track</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedMilestones.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Flag className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming milestones</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMilestones.map((milestone, index) => {
              const IconComponent = getMilestoneIcon(milestone.category);
              const countdown = getCountdown(milestone.dueDate);
              const urgencyStatus = getUrgencyStatus(milestone.dueDate, milestone.progress);
              
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={cn(
                    "bg-slate-800/50 border-slate-700 hover:bg-slate-800 transition-colors",
                    urgencyStatus === 'urgent' && "border-red-500/50 bg-red-500/5",
                    urgencyStatus === 'warning' && "border-yellow-500/50 bg-yellow-500/5"
                  )}>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className={cn("p-2 rounded-lg", getCategoryColor(milestone.category))}>
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h4 className="font-medium text-white text-sm">{milestone.title}</h4>
                                <Badge 
                                  variant="outline" 
                                  className={cn("text-xs", getPriorityColor(milestone.priority))}
                                >
                                  {milestone.priority}
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={cn("text-xs", getCategoryColor(milestone.category))}
                                >
                                  {milestone.category}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {milestone.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={cn(
                              "text-sm font-mono",
                              countdown.isOverdue ? "text-red-400" :
                              urgencyStatus === 'urgent' ? "text-red-400" :
                              urgencyStatus === 'warning' ? "text-yellow-400" :
                              "text-green-400"
                            )}>
                              {countdown.text}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {milestone.dueDate.toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-white font-mono">{milestone.progress}%</span>
                          </div>
                          <Progress value={milestone.progress} className="h-2" />
                          {milestone.estimatedHours && milestone.completedHours !== undefined && (
                            <div className="text-xs text-muted-foreground">
                              {milestone.completedHours}h / {milestone.estimatedHours}h completed
                            </div>
                          )}
                        </div>

                        {/* Assignees and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <div className="flex -space-x-1">
                              {milestone.assignees.slice(0, 3).map((assignee, idx) => (
                                <div
                                  key={idx}
                                  className="w-6 h-6 bg-slate-700 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs text-white"
                                  title={assignee}
                                >
                                  {assignee.split(' ').map(n => n[0]).join('')}
                                </div>
                              ))}
                              {milestone.assignees.length > 3 && (
                                <div className="w-6 h-6 bg-slate-600 rounded-full border-2 border-slate-800 flex items-center justify-center text-xs text-muted-foreground">
                                  +{milestone.assignees.length - 3}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {urgencyStatus === 'urgent' && (
                              <Badge variant="outline" className="text-red-400 bg-red-400/10 border-red-400/30 text-xs">
                                Urgent
                              </Badge>
                            )}
                            <Button variant="ghost" size="sm" className="text-xs">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Summary Stats */}
        <div className="border-t border-slate-700 pt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-xl font-bold text-green-400">
                {milestones.filter(m => getUrgencyStatus(m.dueDate, m.progress) === 'normal').length}
              </div>
              <div className="text-xs text-muted-foreground">On Track</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold text-yellow-400">
                {milestones.filter(m => getUrgencyStatus(m.dueDate, m.progress) === 'warning').length}
              </div>
              <div className="text-xs text-muted-foreground">At Risk</div>
            </div>
            <div className="space-y-1">
              <div className="text-xl font-bold text-red-400">
                {milestones.filter(m => getUrgencyStatus(m.dueDate, m.progress) === 'urgent').length}
              </div>
              <div className="text-xs text-muted-foreground">Urgent</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}