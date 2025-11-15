/**
 * Welcome Hub Stage - Stage 1 of Progressive Unlock System
 * Project overview and orientation for new clients
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  Calendar, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Target,
  Sparkles,
  MessageCircle,
  FileText,
  Eye
} from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { cn } from '@/lib/utils';

interface WelcomeHubStageProps {
  onComplete?: () => void;
  onNext?: () => void;
}

export function WelcomeHubStage({ onComplete, onNext }: WelcomeHubStageProps) {
  const { clientData, loading } = useClientDetails();
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);

  const requiredActions = [
    {
      id: 'project_overview_viewed',
      title: 'Review Project Overview',
      description: 'Understand your project scope and objectives',
      icon: Eye,
      completed: false
    },
    {
      id: 'timeline_introduction',
      title: 'Timeline Introduction',
      description: 'Learn about our 46-step development process',
      icon: Calendar,
      completed: false
    },
    {
      id: 'team_introduction',
      title: 'Meet Your Team',
      description: 'Get to know your dedicated project team',
      icon: Users,
      completed: false
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

  const progressPercentage = (completedActions.length / requiredActions.length) * 100;
  const currentStep = clientData?.current_step || 0;
  const totalSteps = clientData?.total_steps || 46;
  const projectProgress = Math.round((currentStep / totalSteps) * 100);

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
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Your Project Journey!
          </h1>
          <p className="text-xl text-gray-400 mt-2">
            Let's get you oriented with {clientData?.company_name || 'your project'}
          </p>
        </div>
        <Badge variant="outline" className="border-blue-500 text-blue-400">
          Stage 1: Welcome Hub
        </Badge>
      </div>

      {/* Progress Section */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span>Getting Started Progress</span>
          </CardTitle>
          <CardDescription>
            Complete these actions to unlock the next stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Completion Progress</span>
                <span>{completedActions.length} of {requiredActions.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            {progressPercentage === 100 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Welcome stage completed!</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  You're ready to move to Design Discovery.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Overview */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-purple-400" />
              <span>Your Project Overview</span>
            </CardTitle>
            <CardDescription>
              Key details about your {clientData?.project_type || 'website'} project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Company</div>
                <div className="font-medium">{clientData?.company_name || 'Not specified'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Project Type</div>
                <div className="font-medium">{clientData?.project_type || 'Website'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Timeline</div>
                <div className="font-medium">{clientData?.timeline || '4-6 weeks'}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-gray-400">Current Step</div>
                <div className="font-medium">{currentStep} of {totalSteps}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Project Progress</div>
              <Progress value={projectProgress} className="h-2" />
              <div className="text-xs text-gray-500">{projectProgress}% complete</div>
            </div>

            <Button 
              onClick={() => handleActionComplete('project_overview_viewed')}
              disabled={completedActions.includes('project_overview_viewed')}
              className="w-full"
              variant={completedActions.includes('project_overview_viewed') ? "outline" : "default"}
            >
              {completedActions.includes('project_overview_viewed') ? (
                <span className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Overview Reviewed</span>
                </span>
              ) : (
                <span className="flex items-center space-x-2">
                  <Eye className="w-4 h-4" />
                  <span>Mark as Reviewed</span>
                </span>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Required Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Getting Started Checklist</h3>
          <div className="space-y-3">
            {requiredActions.map((action) => {
              const isCompleted = completedActions.includes(action.id);
              const Icon = action.icon;
              
              return (
                <Card 
                  key={action.id} 
                  className={cn(
                    "border-slate-700 bg-slate-800 transition-all duration-200",
                    isCompleted && "border-green-500/50 bg-green-500/5"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
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
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="font-medium text-white">{action.title}</div>
                          <div className="text-sm text-gray-400">{action.description}</div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleActionComplete(action.id)}
                          disabled={isCompleted}
                          variant={isCompleted ? "outline" : "default"}
                        >
                          {isCompleted ? "Completed" : "Complete"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* What's Next */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>What's Next?</span>
          </CardTitle>
          <CardDescription>
            Here's what happens after you complete this stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="font-medium">Design Discovery</div>
                <div className="text-sm text-gray-400">Choose your style preferences</div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <div className="font-medium">Project Roadmap</div>
                <div className="text-sm text-gray-400">See your development timeline</div>
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                <Rocket className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <div className="font-medium">Live Development</div>
                <div className="text-sm text-gray-400">Watch your project being built</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Stage 1 of 6 • Welcome Hub
        </div>
        <Button 
          onClick={onNext}
          disabled={progressPercentage < 100}
          className="flex items-center space-x-2"
        >
          <span>Continue to Design Discovery</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}