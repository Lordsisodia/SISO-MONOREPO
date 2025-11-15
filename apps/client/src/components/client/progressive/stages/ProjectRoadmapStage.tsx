/**
 * Project Roadmap Stage - Stage 3 of Progressive Unlock System
 * 46-step development timeline and milestone tracking
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Target,
  Zap,
  TrendingUp,
  Flag,
  Users,
  Code,
  Eye,
  Rocket
} from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { cn } from '@/lib/utils';

interface ProjectRoadmapStageProps {
  onComplete?: () => void;
  onNext?: () => void;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  steps: number[];
  icon: React.ElementType;
  estimatedDuration: string;
  status: 'pending' | 'current' | 'completed';
}

export function ProjectRoadmapStage({ onComplete, onNext }: ProjectRoadmapStageProps) {
  const { clientData, loading } = useClientDetails();
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);
  const [viewedSections, setViewedSections] = React.useState<string[]>([]);

  const currentStep = clientData?.current_step || 0;
  const totalSteps = clientData?.total_steps || 46;

  const milestones: Milestone[] = [
    {
      id: 'discovery',
      title: 'Project Discovery',
      description: 'Research, planning, and technical specifications',
      steps: [1, 2, 3, 4, 5, 6, 7, 8],
      icon: Eye,
      estimatedDuration: '3-5 days',
      status: currentStep > 8 ? 'completed' : currentStep > 0 ? 'current' : 'pending'
    },
    {
      id: 'design',
      title: 'Design & Wireframing',
      description: 'UI/UX design, wireframes, and visual identity',
      steps: [9, 10, 11, 12, 13, 14, 15, 16],
      icon: Target,
      estimatedDuration: '5-7 days',
      status: currentStep > 16 ? 'completed' : currentStep > 8 ? 'current' : 'pending'
    },
    {
      id: 'development',
      title: 'Core Development',
      description: 'Frontend, backend, and feature implementation',
      steps: [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      icon: Code,
      estimatedDuration: '10-14 days',
      status: currentStep > 30 ? 'completed' : currentStep > 16 ? 'current' : 'pending'
    },
    {
      id: 'integration',
      title: 'Integration & Testing',
      description: 'API integration, testing, and quality assurance',
      steps: [31, 32, 33, 34, 35, 36, 37, 38],
      icon: Zap,
      estimatedDuration: '4-6 days',
      status: currentStep > 38 ? 'completed' : currentStep > 30 ? 'current' : 'pending'
    },
    {
      id: 'optimization',
      title: 'Optimization & Polish',
      description: 'Performance optimization and final touches',
      steps: [39, 40, 41, 42, 43],
      icon: TrendingUp,
      estimatedDuration: '2-3 days',
      status: currentStep > 43 ? 'completed' : currentStep > 38 ? 'current' : 'pending'
    },
    {
      id: 'launch',
      title: 'Launch & Delivery',
      description: 'Deployment, training, and go-live support',
      steps: [44, 45, 46],
      icon: Rocket,
      estimatedDuration: '1-2 days',
      status: currentStep >= 46 ? 'completed' : currentStep > 43 ? 'current' : 'pending'
    }
  ];

  const requiredActions = [
    {
      id: 'timeline_reviewed',
      title: 'Review Timeline',
      description: 'Understand the 46-step development process',
      icon: Calendar,
      completed: viewedSections.includes('timeline')
    },
    {
      id: 'milestones_understood',
      title: 'Understand Milestones',
      description: 'Learn about project phases and deliverables',
      icon: Flag,
      completed: viewedSections.includes('milestones')
    }
  ];

  const handleSectionView = (sectionId: string) => {
    if (!viewedSections.includes(sectionId)) {
      const newViewed = [...viewedSections, sectionId];
      setViewedSections(newViewed);
      
      // Auto-complete actions based on viewed sections
      const actionCompleted = requiredActions.find(action => action.id.includes(sectionId));
      if (actionCompleted && !completedActions.includes(actionCompleted.id)) {
        const newCompleted = [...completedActions, actionCompleted.id];
        setCompletedActions(newCompleted);
        
        // Check if all actions are completed
        if (newCompleted.length === requiredActions.length) {
          onComplete?.();
        }
      }
    }
  };

  const progressPercentage = (completedActions.length / requiredActions.length) * 100;
  const projectProgressPercentage = Math.round((currentStep / totalSteps) * 100);

  // Auto-complete actions based on viewed sections
  React.useEffect(() => {
    const currentCompleted = requiredActions.filter(action => action.completed).map(action => action.id);
    setCompletedActions(currentCompleted);
    
    // Auto-complete stage if all requirements are met
    if (currentCompleted.length === requiredActions.length && currentCompleted.length > 0) {
      onComplete?.();
    }
  }, [viewedSections, onComplete]);

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
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Your Development Journey
          </h1>
          <p className="text-xl text-gray-400 mt-2">
            Track progress through our proven 46-step development process
          </p>
        </div>
        <Badge variant="outline" className="border-blue-500 text-blue-400">
          Stage 3: Project Roadmap
        </Badge>
      </div>

      {/* Progress Section */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-400" />
            <span>Roadmap Understanding Progress</span>
          </CardTitle>
          <CardDescription>
            Complete these steps to understand your project timeline
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
                  <span className="font-medium">Roadmap reviewed!</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  You understand the development process. Ready for Work in Progress tracking.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Current Project Status */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span>Your Project Status</span>
          </CardTitle>
          <CardDescription>
            Current progress on {clientData?.company_name || 'your project'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-white">{currentStep}</div>
              <div className="text-sm text-gray-400">Current Step</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">{projectProgressPercentage}%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-400">{totalSteps - currentStep}</div>
              <div className="text-sm text-gray-400">Steps Remaining</div>
            </div>
          </div>
          <Progress value={projectProgressPercentage} className="h-3" />
          <div className="text-sm text-gray-400 text-center">
            Step {currentStep} of {totalSteps} • {clientData?.project_type || 'Website'} Development
          </div>
        </CardContent>
      </Card>

      {/* Timeline Overview */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span>46-Step Development Timeline</span>
          </CardTitle>
          <CardDescription>
            Our proven process broken down into manageable phases
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isViewed = viewedSections.includes('timeline');
              
              return (
                <Card 
                  key={milestone.id}
                  className={cn(
                    "transition-all duration-200 hover:scale-[1.02] cursor-pointer",
                    milestone.status === 'completed' && "border-green-500/50 bg-green-500/5",
                    milestone.status === 'current' && "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20",
                    milestone.status === 'pending' && "border-slate-600 opacity-75"
                  )}
                  onClick={() => handleSectionView('timeline')}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full",
                        milestone.status === 'completed' && "bg-green-500",
                        milestone.status === 'current' && "bg-blue-500",
                        milestone.status === 'pending' && "bg-slate-600"
                      )}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <div className="font-medium text-white">{milestone.title}</div>
                          <div className="text-sm text-gray-400">{milestone.description}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              milestone.status === 'completed' && "border-green-500 text-green-400",
                              milestone.status === 'current' && "border-blue-500 text-blue-400",
                              milestone.status === 'pending' && "border-slate-600 text-gray-400"
                            )}
                          >
                            Steps {milestone.steps[0]}-{milestone.steps[milestone.steps.length - 1]}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{milestone.estimatedDuration}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {isViewed && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-4">
              <div className="flex items-center space-x-2 text-blue-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Timeline reviewed!</span>
              </div>
              <p className="text-sm text-blue-300 mt-1">
                You've reviewed the development timeline and understand the process phases.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Milestone Deep Dive */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Flag className="w-5 h-5 text-purple-400" />
            <span>Milestone Details & Deliverables</span>
          </CardTitle>
          <CardDescription>
            Understand what happens at each major milestone
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => handleSectionView('milestones')}
              variant={viewedSections.includes('milestones') ? "outline" : "default"}
              className="w-full h-auto p-4 text-left"
            >
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="font-medium">View Detailed Milestone Breakdown</div>
                  <div className="text-sm text-gray-400">Learn about deliverables, checkpoints, and approval processes</div>
                </div>
                {viewedSections.includes('milestones') ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <ArrowRight className="w-5 h-5" />
                )}
              </div>
            </Button>
            
            {viewedSections.includes('milestones') && (
              <div className="space-y-4 mt-4">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-purple-400 mb-3">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Milestone understanding complete!</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium text-white">Key Benefits:</div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Clear expectations at each phase</li>
                        <li>• Regular check-ins and approvals</li>
                        <li>• Transparent progress tracking</li>
                        <li>• Quality gates at every milestone</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-white">What to Expect:</div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        <li>• Regular updates on progress</li>
                        <li>• Preview builds for feedback</li>
                        <li>• Collaboration opportunities</li>
                        <li>• Real-time development visibility</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Requirements Checklist */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-yellow-400" />
            <span>Understanding Checklist</span>
          </CardTitle>
          <CardDescription>
            Confirm your understanding of the development process
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
          Stage 3 of 6 • Project Roadmap
        </div>
        <Button 
          onClick={onNext}
          disabled={progressPercentage < 100}
          className="flex items-center space-x-2"
        >
          <span>Continue to Work in Progress</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}