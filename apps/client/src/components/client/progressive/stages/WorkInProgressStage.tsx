/**
 * Work in Progress Stage - Stage 4 of Progressive Unlock System
 * Live development tracking and real-time progress monitoring
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Code, 
  CheckCircle, 
  ArrowRight,
  Clock,
  GitBranch,
  Zap,
  Monitor,
  Play,
  Pause,
  Users,
  MessageSquare,
  FileText,
  Eye,
  Download
} from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { cn } from '@/lib/utils';

interface WorkInProgressStageProps {
  onComplete?: () => void;
  onNext?: () => void;
}

interface DevelopmentActivity {
  id: string;
  type: 'commit' | 'feature' | 'test' | 'deploy';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'in-progress' | 'pending';
  assignee?: string;
}

interface LiveUpdate {
  id: string;
  title: string;
  description: string;
  previewUrl?: string;
  screenshots: string[];
  status: 'ready' | 'pending';
}

export function WorkInProgressStage({ onComplete, onNext }: WorkInProgressStageProps) {
  const { clientData, loading } = useClientDetails();
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);
  const [viewedUpdates, setViewedUpdates] = React.useState<string[]>([]);
  const [isLiveTracking, setIsLiveTracking] = React.useState(true);

  const currentStep = clientData?.current_step || 0;
  const totalSteps = clientData?.total_steps || 46;

  // Mock development activities - in production, these would come from your development tracking system
  const recentActivities: DevelopmentActivity[] = [
    {
      id: '1',
      type: 'feature',
      title: 'Progressive Unlock System Implementation',
      description: 'Built 6-stage client journey with interactive components',
      timestamp: '2 hours ago',
      status: 'completed',
      assignee: 'Dev Team'
    },
    {
      id: '2',
      type: 'commit',
      title: 'Client Dashboard Enhancement',
      description: 'Integrated new progressive unlock hub into existing dashboard',
      timestamp: '3 hours ago',
      status: 'completed',
      assignee: 'Frontend'
    },
    {
      id: '3',
      type: 'feature',
      title: 'Design Discovery Components',
      description: 'Interactive style and color selection interface',
      timestamp: '4 hours ago',
      status: 'completed',
      assignee: 'UI/UX'
    },
    {
      id: '4',
      type: 'test',
      title: 'Component Testing Suite',
      description: 'Unit tests for progressive unlock components',
      timestamp: '1 hour ago',
      status: 'in-progress',
      assignee: 'QA Team'
    }
  ];

  const liveUpdates: LiveUpdate[] = [
    {
      id: 'update-1',
      title: 'Enhanced Client Dashboard',
      description: 'New progressive unlock system with 6-stage journey tracking',
      previewUrl: 'https://preview.sisotech.com/client/dashboard',
      screenshots: ['dashboard-preview.png', 'journey-tracking.png'],
      status: 'ready'
    },
    {
      id: 'update-2',
      title: 'Design Discovery Interface',
      description: 'Interactive style selection and brand direction capture',
      previewUrl: 'https://preview.sisotech.com/design-discovery',
      screenshots: ['style-selection.png', 'color-picker.png'],
      status: 'ready'
    }
  ];

  const requiredActions = [
    {
      id: 'live_tracking_enabled',
      title: 'Enable Live Tracking',
      description: 'Turn on real-time development monitoring',
      icon: Activity,
      completed: isLiveTracking
    },
    {
      id: 'progress_reviewed',
      title: 'Review Current Progress',
      description: 'Check recent development activities and milestones',
      icon: Eye,
      completed: viewedUpdates.includes('activities')
    },
    {
      id: 'preview_accessed',
      title: 'Access Live Previews',
      description: 'View and test development builds',
      icon: Monitor,
      completed: viewedUpdates.includes('previews')
    }
  ];

  const handleActionComplete = (actionId: string) => {
    if (!completedActions.includes(actionId)) {
      const newCompleted = [...completedActions, actionId];
      setCompletedActions(newCompleted);
      
      // Check if all actions are completed
      if (newCompleted.length === requiredActions.length) {
        onComplete?.();
      }
    }
  };

  const handleViewUpdate = (updateType: string) => {
    if (!viewedUpdates.includes(updateType)) {
      const newViewed = [...viewedUpdates, updateType];
      setViewedUpdates(newViewed);
      
      // Auto-complete relevant actions
      if (updateType === 'activities') {
        handleActionComplete('progress_reviewed');
      } else if (updateType === 'previews') {
        handleActionComplete('preview_accessed');
      }
    }
  };

  const toggleLiveTracking = () => {
    setIsLiveTracking(!isLiveTracking);
    if (!isLiveTracking) {
      handleActionComplete('live_tracking_enabled');
    }
  };

  // Auto-complete actions based on states
  React.useEffect(() => {
    const currentCompleted = requiredActions.filter(action => action.completed).map(action => action.id);
    setCompletedActions(currentCompleted);
    
    // Auto-complete stage if all requirements are met
    if (currentCompleted.length === requiredActions.length && currentCompleted.length > 0) {
      onComplete?.();
    }
  }, [isLiveTracking, viewedUpdates, onComplete]);

  const progressPercentage = (completedActions.length / requiredActions.length) * 100;
  const projectProgressPercentage = Math.round((currentStep / totalSteps) * 100);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-700 rounded-lg"></div>
          <div className="h-64 bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <Activity className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Development in Action
          </h1>
          <p className="text-xl text-gray-400 mt-2">
            Real-time tracking of your project's development progress
          </p>
        </div>
        <Badge variant="outline" className="border-green-500 text-green-400">
          Stage 4: Work in Progress
        </Badge>
      </div>

      {/* Live Tracking Controls */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-400" />
              <span>Live Development Tracking</span>
            </div>
            <Button
              onClick={toggleLiveTracking}
              variant={isLiveTracking ? "default" : "outline"}
              size="sm"
              className="flex items-center space-x-2"
            >
              {isLiveTracking ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Tracking Active</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Enable Tracking</span>
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>
            Monitor real-time development activities and progress updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Stage Progress</span>
                <span>{completedActions.length} of {requiredActions.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            {progressPercentage === 100 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Progress tracking mastered!</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  You're actively monitoring development. Ready for Launch Preparation.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Project Status */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GitBranch className="w-5 h-5 text-blue-400" />
              <span>Project Status</span>
            </CardTitle>
            <CardDescription>
              Current development metrics and progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-white">{currentStep}</div>
                <div className="text-xs text-gray-400">Current Step</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-400">{projectProgressPercentage}%</div>
                <div className="text-xs text-gray-400">Complete</div>
              </div>
            </div>
            <Progress value={projectProgressPercentage} className="h-2" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Phase:</span>
                <span className="text-white">
                  {currentStep <= 16 ? 'Design & Planning' : 
                   currentStep <= 30 ? 'Core Development' : 
                   currentStep <= 38 ? 'Integration & Testing' : 
                   currentStep <= 43 ? 'Optimization' : 'Launch Prep'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Active Development
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Updates */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="w-5 h-5 text-purple-400" />
              <span>Live Previews</span>
            </CardTitle>
            <CardDescription>
              Test and preview development builds
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleViewUpdate('previews')}
              variant={viewedUpdates.includes('previews') ? "outline" : "default"}
              className="w-full justify-start"
            >
              <Eye className="w-4 h-4 mr-2" />
              {viewedUpdates.includes('previews') ? "Previews Accessed" : "Access Live Previews"}
            </Button>
            
            {viewedUpdates.includes('previews') && (
              <div className="space-y-3">
                {liveUpdates.map((update) => (
                  <Card key={update.id} className="border-slate-600">
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <div className="font-medium text-white text-sm">{update.title}</div>
                        <div className="text-xs text-gray-400">{update.description}</div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                            {update.status === 'ready' ? 'Ready for Preview' : 'In Development'}
                          </Badge>
                          {update.previewUrl && (
                            <Button size="sm" variant="outline" className="text-xs h-6">
                              <Download className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-purple-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium text-sm">Live previews accessed!</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Development Activity Feed */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-5 h-5 text-green-400" />
            <span>Recent Development Activity</span>
          </CardTitle>
          <CardDescription>
            Live feed of development progress and code commits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => handleViewUpdate('activities')}
              variant={viewedUpdates.includes('activities') ? "outline" : "default"}
              className="w-full justify-start"
            >
              <Activity className="w-4 h-4 mr-2" />
              {viewedUpdates.includes('activities') ? "Activities Reviewed" : "View Recent Activities"}
            </Button>
            
            {viewedUpdates.includes('activities') && (
              <div className="space-y-3">
                {recentActivities.map((activity, index) => {
                  const typeConfig = {
                    commit: { icon: GitBranch, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    feature: { icon: Zap, color: 'text-green-400', bg: 'bg-green-500/10' },
                    test: { icon: CheckCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                    deploy: { icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10' }
                  };
                  
                  const config = typeConfig[activity.type];
                  const Icon = config.icon;
                  
                  return (
                    <div key={activity.id} className={cn("border rounded-lg p-4", config.bg, "border-slate-600")}>
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-700">
                          <Icon className={cn("w-4 h-4", config.color)} />
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium text-white text-sm">{activity.title}</div>
                            <div className="text-xs text-gray-400">{activity.timestamp}</div>
                          </div>
                          <div className="text-sm text-gray-400">{activity.description}</div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs",
                                activity.status === 'completed' && "border-green-500 text-green-400",
                                activity.status === 'in-progress' && "border-yellow-500 text-yellow-400",
                                activity.status === 'pending' && "border-gray-500 text-gray-400"
                              )}
                            >
                              {activity.status.replace('-', ' ')}
                            </Badge>
                            {activity.assignee && (
                              <div className="flex items-center space-x-1 text-xs text-gray-400">
                                <Users className="w-3 h-3" />
                                <span>{activity.assignee}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Activity feed reviewed!</span>
                  </div>
                  <p className="text-sm text-green-300 mt-1">
                    You're now tracking live development progress and team activities.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Communication Hub */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span>Development Communication</span>
          </CardTitle>
          <CardDescription>
            Stay connected with your development team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left">
              <div className="flex items-center space-x-3 w-full">
                <MessageSquare className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium text-white">Team Chat</div>
                  <div className="text-sm text-gray-400">Direct communication with developers</div>
                </div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 text-left">
              <div className="flex items-center space-x-3 w-full">
                <FileText className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="font-medium text-white">Progress Reports</div>
                  <div className="text-sm text-gray-400">Detailed development summaries</div>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requirements Checklist */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-yellow-400" />
            <span>Progress Monitoring Checklist</span>
          </CardTitle>
          <CardDescription>
            Complete these actions to master progress tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredActions.map((action) => {
              const Icon = action.icon;
              const isCompleted = action.completed;
              
              return (
                <div 
                  key={action.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                    isCompleted ? "bg-green-500/10 border border-green-500/30" : "bg-slate-700"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    isCompleted ? "bg-green-500" : "bg-slate-600"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Icon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={cn(
                      "font-medium",
                      isCompleted ? "text-green-400" : "text-white"
                    )}>
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-400">{action.description}</div>
                  </div>
                  {isCompleted && (
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Complete
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Stage 4 of 6 • Work in Progress
        </div>
        <Button 
          onClick={onNext}
          disabled={progressPercentage < 100}
          className="flex items-center space-x-2"
        >
          <span>Continue to Launch Preparation</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}