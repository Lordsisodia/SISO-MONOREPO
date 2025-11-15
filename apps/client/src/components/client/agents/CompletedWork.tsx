import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Trophy, 
  CheckCircle, 
  Clock, 
  Code, 
  Palette, 
  Database,
  Shield,
  Zap,
  FileText,
  Calendar,
  Filter,
  TrendingUp,
  Award,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CompletedTask {
  id: string;
  title: string;
  description: string;
  category: 'development' | 'design' | 'testing' | 'documentation' | 'optimization';
  completedBy: {
    name: string;
    role: string;
    avatar?: string;
  };
  completedAt: string;
  timeSpent: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  deliverables: string[];
  impact: 'low' | 'medium' | 'high' | 'critical';
  clientValue: string;
  phase: string;
}

export function CompletedWork() {
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  // Mock completed work data - in production, this would come from the database
  const completedTasks: CompletedTask[] = [
    {
      id: '1',
      title: 'Database Schema Optimization',
      description: 'Optimized database queries and implemented indexing for 40% performance improvement',
      category: 'development',
      completedBy: {
        name: 'Sam Parker',
        role: 'Backend Architecture Agent',
        avatar: '/avatars/sam.png'
      },
      completedAt: '2024-08-16T14:30:00Z',
      timeSpent: 8,
      difficulty: 'expert',
      deliverables: ['Optimized schema', 'Performance report', 'Migration scripts'],
      impact: 'critical',
      clientValue: 'Significantly improved application performance and reduced server costs',
      phase: 'Development'
    },
    {
      id: '2',
      title: 'Mobile Responsive Design System',
      description: 'Created comprehensive responsive design system for mobile and tablet devices',
      category: 'design',
      completedBy: {
        name: 'Jordan Chen',
        role: 'UI/UX Design Agent',
        avatar: '/avatars/jordan.png'
      },
      completedAt: '2024-08-15T16:45:00Z',
      timeSpent: 12,
      difficulty: 'hard',
      deliverables: ['Design system components', 'Mobile wireframes', 'Responsive guidelines'],
      impact: 'high',
      clientValue: 'Ensures excellent user experience across all devices',
      phase: 'Design'
    },
    {
      id: '3',
      title: 'Authentication Security Implementation',
      description: 'Implemented OAuth 2.0, JWT tokens, and multi-factor authentication',
      category: 'development',
      completedBy: {
        name: 'Alex Rivera',
        role: 'Lead Development Agent',
        avatar: '/avatars/alex.png'
      },
      completedAt: '2024-08-14T11:20:00Z',
      timeSpent: 6,
      difficulty: 'hard',
      deliverables: ['Auth system', 'Security documentation', 'Test coverage'],
      impact: 'critical',
      clientValue: 'Enterprise-grade security protecting user data and business operations',
      phase: 'Development'
    },
    {
      id: '4',
      title: 'Automated Testing Suite',
      description: 'Developed comprehensive test suite with 95% code coverage',
      category: 'testing',
      completedBy: {
        name: 'Casey Williams',
        role: 'QA Testing Agent',
        avatar: '/avatars/casey.png'
      },
      completedAt: '2024-08-13T09:15:00Z',
      timeSpent: 10,
      difficulty: 'medium',
      deliverables: ['Test automation framework', 'Test reports', 'CI/CD integration'],
      impact: 'high',
      clientValue: 'Ensures code quality and reduces bugs in production',
      phase: 'Testing'
    },
    {
      id: '5',
      title: 'API Documentation Portal',
      description: 'Created interactive API documentation with examples and testing tools',
      category: 'documentation',
      completedBy: {
        name: 'Morgan Davis',
        role: 'Content Strategy Agent',
        avatar: '/avatars/morgan.png'
      },
      completedAt: '2024-08-12T13:30:00Z',
      timeSpent: 4,
      difficulty: 'medium',
      deliverables: ['API docs portal', 'Usage examples', 'Integration guides'],
      impact: 'medium',
      clientValue: 'Enables faster third-party integrations and developer onboarding',
      phase: 'Documentation'
    },
    {
      id: '6',
      title: 'Performance Monitoring Dashboard',
      description: 'Built real-time performance monitoring with alerts and analytics',
      category: 'optimization',
      completedBy: {
        name: 'Taylor Kim',
        role: 'DevOps Agent',
        avatar: '/avatars/taylor.png'
      },
      completedAt: '2024-08-11T15:45:00Z',
      timeSpent: 7,
      difficulty: 'hard',
      deliverables: ['Monitoring dashboard', 'Alert system', 'Performance metrics'],
      impact: 'high',
      clientValue: 'Proactive issue detection and system optimization insights',
      phase: 'Infrastructure'
    }
  ];

  const getCategoryIcon = (category: CompletedTask['category']) => {
    switch (category) {
      case 'development': return Code;
      case 'design': return Palette;
      case 'testing': return Shield;
      case 'documentation': return FileText;
      case 'optimization': return Zap;
      default: return CheckCircle;
    }
  };

  const getCategoryColor = (category: CompletedTask['category']) => {
    switch (category) {
      case 'development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'design': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'testing': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'documentation': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'optimization': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getImpactColor = (impact: CompletedTask['impact']) => {
    switch (impact) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-siso-orange';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getDifficultyBadge = (difficulty: CompletedTask['difficulty']) => {
    const configs = {
      easy: { color: 'bg-green-500/20 text-green-400 border-green-500/30', stars: 1 },
      medium: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', stars: 2 },
      hard: { color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', stars: 3 },
      expert: { color: 'bg-red-500/20 text-red-400 border-red-500/30', stars: 4 }
    };
    return configs[difficulty];
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const completed = new Date(date);
    const diffHours = Math.floor((now.getTime() - completed.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  // Filter and sort tasks
  const filteredTasks = completedTasks.filter(task => {
    if (filter === 'all') return true;
    return task.category === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      case 'impact':
        const impactOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return impactOrder[b.impact] - impactOrder[a.impact];
      case 'difficulty':
        const difficultyOrder = { expert: 4, hard: 3, medium: 2, easy: 1 };
        return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <Card className="bg-siso-bg-secondary border-siso-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-siso-text">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Completed Work Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-siso-bg rounded-lg">
              <div className="text-2xl font-bold text-siso-orange">{completedTasks.length}</div>
              <div className="text-sm text-siso-text-muted">Total Completed</div>
            </div>
            <div className="text-center p-4 bg-siso-bg rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {completedTasks.reduce((sum, task) => sum + task.timeSpent, 0)}h
              </div>
              <div className="text-sm text-siso-text-muted">Hours Invested</div>
            </div>
            <div className="text-center p-4 bg-siso-bg rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {completedTasks.filter(task => task.impact === 'critical' || task.impact === 'high').length}
              </div>
              <div className="text-sm text-siso-text-muted">High Impact</div>
            </div>
            <div className="text-center p-4 bg-siso-bg rounded-lg">
              <div className="text-2xl font-bold text-purple-400">94%</div>
              <div className="text-sm text-siso-text-muted">Quality Score</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-48 bg-siso-bg-alt border-siso-border">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="testing">Testing</SelectItem>
            <SelectItem value="documentation">Documentation</SelectItem>
            <SelectItem value="optimization">Optimization</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48 bg-siso-bg-alt border-siso-border">
            <TrendingUp className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="impact">Highest Impact</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Completed Tasks */}
      <div className="space-y-4">
        <AnimatePresence>
          {sortedTasks.map((task, index) => {
            const IconComponent = getCategoryIcon(task.category);
            const difficultyConfig = getDifficultyBadge(task.difficulty);
            
            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-siso-bg-secondary border-siso-border hover:border-siso-orange/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={cn("p-3 rounded-lg", getCategoryColor(task.category))}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-siso-text mb-1">
                              {task.title}
                            </h3>
                            <p className="text-sm text-siso-text-muted line-clamp-2">
                              {task.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={cn("text-xs", difficultyConfig.color)}>
                            <div className="flex items-center gap-1">
                              {[...Array(difficultyConfig.stars)].map((_, i) => (
                                <Star key={i} className="h-2.5 w-2.5 fill-current" />
                              ))}
                              <span className="ml-1 capitalize">{task.difficulty}</span>
                            </div>
                          </Badge>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          {/* Completed By */}
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6 border border-siso-border">
                              <AvatarImage src={task.completedBy.avatar} alt={task.completedBy.name} />
                              <AvatarFallback className="bg-siso-bg text-siso-orange text-xs">
                                {getInitials(task.completedBy.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="text-sm font-medium text-siso-text">{task.completedBy.name}</div>
                              <div className="text-xs text-siso-text-muted">{task.completedBy.role}</div>
                            </div>
                          </div>

                          {/* Time and Date */}
                          <div className="flex items-center gap-4 text-sm text-siso-text-muted">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{task.timeSpent}h</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatTimeAgo(task.completedAt)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Impact */}
                        <Badge variant="outline" className={cn("text-xs capitalize", getImpactColor(task.impact))}>
                          <Award className="h-3 w-3 mr-1" />
                          {task.impact} Impact
                        </Badge>
                      </div>

                      {/* Client Value */}
                      <div className="p-3 bg-siso-orange/10 border border-siso-orange/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          <TrendingUp className="h-4 w-4 text-siso-orange mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-medium text-siso-text mb-1">Business Value</div>
                            <p className="text-sm text-siso-text-muted">{task.clientValue}</p>
                          </div>
                        </div>
                      </div>

                      {/* Deliverables */}
                      <div>
                        <div className="text-sm font-medium text-siso-text mb-2">Deliverables</div>
                        <div className="flex flex-wrap gap-2">
                          {task.deliverables.map((deliverable, idx) => (
                            <Badge 
                              key={idx} 
                              variant="secondary" 
                              className="text-xs bg-siso-bg text-siso-text-muted border-siso-border"
                            >
                              <CheckCircle className="h-3 w-3 mr-1 text-green-400" />
                              {deliverable}
                            </Badge>
                          ))}
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