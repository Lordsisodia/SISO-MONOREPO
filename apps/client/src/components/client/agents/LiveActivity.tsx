import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Clock, 
  Zap, 
  Code, 
  Palette, 
  Database,
  Shield,
  RefreshCw,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LiveTask {
  id: string;
  agentId: string;
  agentName: string;
  agentRole: string;
  agentAvatar?: string;
  taskTitle: string;
  taskDescription: string;
  category: 'development' | 'design' | 'testing' | 'optimization' | 'documentation';
  status: 'active' | 'paused' | 'blocked' | 'review';
  progress: number;
  startedAt: string;
  estimatedCompletion: string;
  currentPhase: string;
  tokensUsed: number;
  linesChanged: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export function LiveActivity() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock live activity data - in production, this would come from WebSocket or real-time API
  const [liveActivities, setLiveActivities] = useState<LiveTask[]>([
    {
      id: '1',
      agentId: 'alex',
      agentName: 'Alex Rivera',
      agentRole: 'Lead Development Agent',
      agentAvatar: '/avatars/alex.png',
      taskTitle: 'API Security Enhancement',
      taskDescription: 'Implementing OAuth 2.0 authentication and rate limiting for production API',
      category: 'development',
      status: 'active',
      progress: 67,
      startedAt: '2024-08-17T09:30:00Z',
      estimatedCompletion: '2024-08-17T15:30:00Z',
      currentPhase: 'Testing authentication flows',
      tokensUsed: 1247,
      linesChanged: 156,
      priority: 'high'
    },
    {
      id: '2',
      agentId: 'jordan',
      agentName: 'Jordan Chen',
      agentRole: 'UI/UX Design Agent',
      agentAvatar: '/avatars/jordan.png',
      taskTitle: 'Dashboard UI Refinements',
      taskDescription: 'Updating dashboard components for better mobile responsiveness',
      category: 'design',
      status: 'active',
      progress: 43,
      startedAt: '2024-08-17T10:15:00Z',
      estimatedCompletion: '2024-08-17T16:00:00Z',
      currentPhase: 'Mobile layout optimization',
      tokensUsed: 892,
      linesChanged: 89,
      priority: 'medium'
    },
    {
      id: '3',
      agentId: 'casey',
      agentName: 'Casey Williams',
      agentRole: 'QA Testing Agent',
      agentAvatar: '/avatars/casey.png',
      taskTitle: 'Integration Test Suite',
      taskDescription: 'Running comprehensive integration tests for the latest API changes',
      category: 'testing',
      status: 'review',
      progress: 89,
      startedAt: '2024-08-17T08:45:00Z',
      estimatedCompletion: '2024-08-17T14:30:00Z',
      currentPhase: 'Test results analysis',
      tokensUsed: 634,
      linesChanged: 23,
      priority: 'high'
    },
    {
      id: '4',
      agentId: 'sam',
      agentName: 'Sam Parker',
      agentRole: 'Backend Architecture Agent',
      agentAvatar: '/avatars/sam.png',
      taskTitle: 'Database Performance Tuning',
      taskDescription: 'Optimizing query performance and implementing advanced caching strategies',
      category: 'optimization',
      status: 'paused',
      progress: 78,
      startedAt: '2024-08-17T07:20:00Z',
      estimatedCompletion: '2024-08-17T17:00:00Z',
      currentPhase: 'Cache implementation',
      tokensUsed: 1456,
      linesChanged: 234,
      priority: 'medium'
    },
    {
      id: '5',
      agentId: 'taylor',
      agentName: 'Taylor Kim',
      agentRole: 'DevOps Agent',
      agentAvatar: '/avatars/taylor.png',
      taskTitle: 'CI/CD Pipeline Enhancement',
      taskDescription: 'Adding automated security scanning and deployment verification steps',
      category: 'development',
      status: 'blocked',
      progress: 34,
      startedAt: '2024-08-17T11:00:00Z',
      estimatedCompletion: '2024-08-17T18:00:00Z',
      currentPhase: 'Waiting for security credentials',
      tokensUsed: 567,
      linesChanged: 45,
      priority: 'urgent'
    }
  ]);

  // Auto-refresh simulation
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setLiveActivities(prev => prev.map(task => ({
        ...task,
        progress: task.status === 'active' ? Math.min(task.progress + Math.random() * 2, 100) : task.progress,
        tokensUsed: task.status === 'active' ? task.tokensUsed + Math.floor(Math.random() * 10) : task.tokensUsed
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getCategoryIcon = (category: LiveTask['category']) => {
    switch (category) {
      case 'development': return Code;
      case 'design': return Palette;
      case 'testing': return Shield;
      case 'optimization': return Zap;
      case 'documentation': return Monitor;
      default: return Activity;
    }
  };

  const getCategoryColor = (category: LiveTask['category']) => {
    switch (category) {
      case 'development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'design': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'testing': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'optimization': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'documentation': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: LiveTask['status']) => {
    switch (status) {
      case 'active': return <Play className="h-3 w-3 text-green-400" />;
      case 'paused': return <Pause className="h-3 w-3 text-yellow-400" />;
      case 'blocked': return <AlertCircle className="h-3 w-3 text-red-400" />;
      case 'review': return <CheckCircle className="h-3 w-3 text-blue-400" />;
      default: return <Activity className="h-3 w-3" />;
    }
  };

  const getStatusColor = (status: LiveTask['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'blocked': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'review': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: LiveTask['priority']) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-siso-orange';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const started = new Date(date);
    const diffMinutes = Math.floor((now.getTime() - started.getTime()) / (1000 * 60));
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours}h ${diffMinutes % 60}m ago`;
  };

  const activeCount = liveActivities.filter(task => task.status === 'active').length;
  const totalTokens = liveActivities.reduce((sum, task) => sum + task.tokensUsed, 0);

  return (
    <div className="space-y-6">
      {/* Live Stats Header */}
      <Card className="bg-siso-bg-secondary border-siso-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-siso-text">
              <Activity className="h-5 w-5 text-green-400" />
              Live Agent Activity
              <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                LIVE
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={cn(
                  "text-xs",
                  autoRefresh ? "text-green-400 hover:text-green-300" : "text-gray-400 hover:text-gray-300"
                )}
              >
                <Activity className="h-3 w-3 mr-1" />
                Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-siso-bg rounded-lg">
              <div className="text-xl font-bold text-green-400">{activeCount}</div>
              <div className="text-xs text-siso-text-muted">Active Tasks</div>
            </div>
            <div className="text-center p-3 bg-siso-bg rounded-lg">
              <div className="text-xl font-bold text-blue-400">{liveActivities.length}</div>
              <div className="text-xs text-siso-text-muted">Total Tasks</div>
            </div>
            <div className="text-center p-3 bg-siso-bg rounded-lg">
              <div className="text-xl font-bold text-purple-400">{totalTokens.toLocaleString()}</div>
              <div className="text-xs text-siso-text-muted">Tokens Used</div>
            </div>
            <div className="text-center p-3 bg-siso-bg rounded-lg">
              <div className="text-xl font-bold text-siso-orange">92%</div>
              <div className="text-xs text-siso-text-muted">Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live Tasks */}
      <div className="space-y-4">
        <AnimatePresence>
          {liveActivities.map((task, index) => {
            const IconComponent = getCategoryIcon(task.category);
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={cn(
                  "bg-siso-bg-secondary border-siso-border transition-all duration-300",
                  task.status === 'active' && "ring-1 ring-green-400/30",
                  task.status === 'blocked' && "ring-1 ring-red-400/30"
                )}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={cn("p-3 rounded-lg", getCategoryColor(task.category))}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-siso-text">
                                {task.taskTitle}
                              </h3>
                              <Badge variant="outline" className={cn("text-xs", getStatusColor(task.status))}>
                                {getStatusIcon(task.status)}
                                <span className="ml-1 capitalize">{task.status}</span>
                              </Badge>
                            </div>
                            <p className="text-sm text-siso-text-muted">
                              {task.taskDescription}
                            </p>
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("text-xs capitalize", getPriorityColor(task.priority))}>
                          {task.priority} Priority
                        </Badge>
                      </div>

                      {/* Agent Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-siso-border">
                            <AvatarImage src={task.agentAvatar} alt={task.agentName} />
                            <AvatarFallback className="bg-siso-bg text-siso-orange text-xs">
                              {getInitials(task.agentName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium text-siso-text">{task.agentName}</div>
                            <div className="text-xs text-siso-text-muted">{task.agentRole}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-siso-text-muted">Started {formatTimeAgo(task.startedAt)}</div>
                          <div className="text-xs text-siso-text-muted">Est. completion: 6h remaining</div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-siso-text">
                            {task.currentPhase}
                          </span>
                          <span className="text-sm text-siso-text-muted">{Math.round(task.progress)}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 pt-2 border-t border-siso-border">
                        <div className="text-center">
                          <div className="text-sm font-semibold text-blue-400">{task.tokensUsed}</div>
                          <div className="text-xs text-siso-text-muted">Tokens</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-semibold text-green-400">{task.linesChanged}</div>
                          <div className="text-xs text-siso-text-muted">Lines Changed</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <TrendingUp className="h-3 w-3 text-siso-orange" />
                            <div className="text-sm font-semibold text-siso-orange">+2.3%</div>
                          </div>
                          <div className="text-xs text-siso-text-muted">Efficiency</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}