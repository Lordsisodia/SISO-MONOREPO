import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Bell, 
  Calendar, 
  FileText, 
  MessageSquare, 
  DollarSign,
  CheckCircle,
  Clock,
  User,
  CreditCard,
  AlertTriangle,
  Circle,
  FolderOpen,
  UserPlus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useRealTasks } from '@/hooks/useRealTasks';
import { useMainUserProject } from '@/hooks/useUserProjects';
import { useNavigate } from 'react-router-dom';

interface ActivityItem {
  id: string;
  type: 'payment' | 'deadline' | 'message' | 'document' | 'task' | 'system' | 'project';
  title: string;
  description: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
  status?: 'success' | 'warning' | 'info' | 'error';
  isLive?: boolean;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'payment': return CreditCard;
    case 'deadline': return Clock;
    case 'message': return MessageSquare;
    case 'document': return FileText;
    case 'task': return CheckCircle;
    case 'project': return FolderOpen;
    case 'system': return UserPlus;
    default: return Bell;
  }
};

const getActivityTheme = (type: string, priority: string) => {
  const themes = {
    payment: {
      iconBg: 'bg-green-500/20 border border-green-400/30',
      iconColor: 'text-green-400',
      timelineBg: 'bg-green-500'
    },
    deadline: {
      iconBg: 'bg-siso-red/20 border border-siso-red/30', 
      iconColor: 'text-siso-red',
      timelineBg: 'bg-siso-red'
    },
    message: {
      iconBg: 'bg-blue-500/20 border border-blue-400/30',
      iconColor: 'text-blue-400', 
      timelineBg: 'bg-blue-500'
    },
    document: {
      iconBg: 'bg-purple-500/20 border border-purple-400/30',
      iconColor: 'text-purple-400',
      timelineBg: 'bg-purple-500'
    },
    task: {
      iconBg: 'bg-siso-orange/20 border border-siso-orange/30',
      iconColor: 'text-siso-orange',
      timelineBg: 'bg-siso-orange'
    },
    system: {
      iconBg: 'bg-siso-text-muted/20 border border-siso-text-muted/30',
      iconColor: 'text-siso-text-muted',
      timelineBg: 'bg-siso-text-muted'
    },
    project: {
      iconBg: 'bg-emerald-500/20 border border-emerald-400/30',
      iconColor: 'text-emerald-400',
      timelineBg: 'bg-emerald-500'
    }
  };
  
  return themes[type as keyof typeof themes] || themes.system;
};

const ActivityItem = ({ activity, index, isLast }: { activity: ActivityItem; index: number; isLast: boolean }) => {
  const IconComponent = getActivityIcon(activity.type);
  const theme = getActivityTheme(activity.type, activity.priority);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative flex gap-4 group"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-siso-border to-transparent" />
      )}
      
      {/* Icon */}
      <div className="relative z-10 flex-shrink-0">
        <motion.div 
          className={cn(
            "p-2.5 rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-md relative",
            theme.iconBg
          )}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <IconComponent className={cn("h-4 w-4", theme.iconColor)} />
          
          {/* Live indicator */}
          {activity.isLive && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1"
            >
              <Circle className="h-2 w-2 fill-green-400 text-green-400" />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 pb-6">
        <div className="bg-siso-bg-tertiary/30 border border-siso-border rounded-xl p-4 transition-all duration-300 hover:border-siso-border/60 hover:bg-siso-bg-tertiary/40">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-siso-text-primary truncate">
                {activity.title}
              </h4>
              <p className="text-xs text-siso-text-muted mt-1 line-clamp-2">
                {activity.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {activity.isLive && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-green-500/10 text-green-400 border-green-500/30">
                  <Circle className="h-2 w-2 mr-1 fill-current" />
                  Live
                </Badge>
              )}
              {activity.priority === 'high' && (
                <Badge variant="destructive" className="text-xs px-2 py-0.5 bg-siso-red/20 text-siso-red border-siso-red/30">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  High
                </Badge>
              )}
              <span className="text-xs text-siso-text-muted whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          </div>
          
          {/* Type badge */}
          <div className="flex items-center gap-2">
            <Badge 
              variant="secondary" 
              className={cn(
                "text-xs px-2 py-0.5 capitalize border",
                theme.iconBg.replace('bg-', 'bg-').replace('/20', '/10'),
                theme.iconColor,
                theme.iconBg.replace('bg-', 'border-').replace('/20', '/30')
              )}
            >
              {activity.type}
            </Badge>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function EnhancedActivityFeed() {
  const { remainingTasks, completedTasks, loading: tasksLoading } = useRealTasks();
  const { project, hasProjects, loading: projectLoading } = useMainUserProject();
  const navigate = useNavigate();

  // Generate real activity data based on actual system state
  const generateActivities = (): ActivityItem[] => {
    const activities: ActivityItem[] = [];

    // Add project-related activities
    if (hasProjects && project) {
      activities.push({
        id: 'project-active',
        type: 'project',
        title: `Project ${project.name} is active`,
        description: `Development in progress - ${project.completion_percentage || 0}% complete`,
        time: 'Today',
        priority: 'medium',
        isLive: true
      });
    }

    // Add task-related activities
    if (remainingTasks > 0) {
      activities.push({
        id: 'tasks-pending',
        type: 'deadline',
        title: `${remainingTasks} tasks require attention`,
        description: `Outstanding tasks in your project backlog need completion`,
        time: '1 hour ago',
        priority: 'high',
        isLive: true
      });
    }

    if (completedTasks > 0) {
      activities.push({
        id: 'tasks-completed',
        type: 'task',
        title: `${completedTasks} tasks completed`,
        description: 'Great progress on your project milestones',
        time: '2 hours ago',
        priority: 'low'
      });
    }

    // Add system activities
    activities.push({
      id: 'system-welcome',
      type: 'system',
      title: 'Welcome to SISO Dashboard',
      description: 'Your dashboard has been personalized with real-time project data',
      time: '6 hours ago',
      priority: 'low'
    });

    // Add sample business activities
    if (hasProjects) {
      activities.push({
        id: 'payment-milestone',
        type: 'payment',
        title: 'Milestone payment scheduled',
        description: `Next payment milestone for ${project?.name || 'your project'} is approaching`,
        time: '1 day ago',
        priority: 'medium'
      });
    }

    return activities.slice(0, 5); // Limit to 5 most recent
  };

  const activities = generateActivities();
  const loading = tasksLoading || projectLoading;

  if (loading) {
    return (
      <Card className="bg-siso-bg-secondary backdrop-blur-sm border border-siso-border shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-6 w-8 rounded-full" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-9 w-9 rounded-xl flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-siso-bg-secondary backdrop-blur-sm border border-siso-border shadow-lg hover:border-siso-border/60 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-siso-text-primary flex items-center gap-2">
            <Bell className="h-5 w-5 text-siso-orange" />
            Activity Feed
          </CardTitle>
          <div className="flex items-center gap-2">
            {activities.some(a => a.isLive) && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-1"
              >
                <Circle className="h-2 w-2 fill-green-400 text-green-400" />
                <span className="text-xs text-green-400">Live</span>
              </motion.div>
            )}
            <Badge variant="secondary" className="bg-siso-orange/20 text-siso-orange border border-siso-orange/30">
              {activities.length}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-0">
        {activities.length > 0 ? (
          activities.map((activity, index) => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              index={index}
              isLast={index === activities.length - 1}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-siso-text-muted mx-auto mb-3" />
            <p className="text-siso-text-muted">No recent activity</p>
            <p className="text-sm text-siso-text-muted mt-1">Complete tasks or update projects to see activity</p>
          </div>
        )}
        
        {/* View all button */}
        {activities.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: activities.length * 0.1 }}
            className="pt-4 border-t border-siso-border"
          >
            <button 
              onClick={() => navigate('/activity')}
              className="w-full text-sm text-siso-text-muted hover:text-siso-orange transition-colors duration-200 py-2 hover:bg-siso-bg-tertiary/30 rounded-lg"
            >
              View all activity →
            </button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
} 