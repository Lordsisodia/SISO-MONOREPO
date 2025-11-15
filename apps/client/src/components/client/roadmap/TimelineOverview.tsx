import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  CheckCircle, 
  Calendar, 
  BarChart3,
  TrendingUp,
  Target,
  Users
} from 'lucide-react';
import { PDR_PHASES, getTotalEstimatedHours, getCompletionPercentage, getStepsByPhase } from '@/data/pdr-timeline-steps';
import type { PDRTimelineStep } from '@/data/pdr-timeline-steps';

interface TimelineOverviewProps {
  steps: PDRTimelineStep[];
  currentStep: number;
}

export function TimelineOverview({ steps, currentStep }: TimelineOverviewProps) {
  const totalHours = getTotalEstimatedHours();
  const completionPercentage = getCompletionPercentage(steps);
  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const activeSteps = steps.filter(step => step.status === 'in-progress').length;

  // Calculate phase statistics
  const phaseStats = Object.entries(PDR_PHASES).map(([key, phase]) => {
    const phaseSteps = getStepsByPhase(key);
    const completedInPhase = phaseSteps.filter(step => step.status === 'completed').length;
    const progressInPhase = phaseSteps.length > 0 ? (completedInPhase / phaseSteps.length) * 100 : 0;
    const phaseHours = phaseSteps.reduce((total, step) => total + step.estimatedHours, 0);
    
    return {
      name: phase.name,
      color: phase.color,
      steps: phaseSteps.length,
      completed: completedInPhase,
      progress: progressInPhase,
      hours: phaseHours,
      stepRange: `${phase.steps[0]}-${phase.steps[1]}`
    };
  });

  const getPhaseColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      pink: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      green: 'bg-green-500/20 text-green-400 border-green-500/30',
      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      red: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colorMap[color] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getProgressBarColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-500',
      purple: 'bg-purple-500',
      pink: 'bg-pink-500',
      green: 'bg-green-500',
      orange: 'bg-orange-500',
      red: 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  return (
    <div className="grid gap-6">
      {/* Overall Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Progress</p>
                <p className="text-2xl font-bold text-white">{completionPercentage}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
            <Progress value={completionPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Steps Completed</p>
                <p className="text-2xl font-bold text-white">{completedSteps}/{steps.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">Currently on step {currentStep}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Tasks</p>
                <p className="text-2xl font-bold text-white">{activeSteps}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">In progress now</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Est. Total Time</p>
                <p className="text-2xl font-bold text-white">{totalHours}h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-400" />
            </div>
            <p className="text-xs text-slate-500 mt-1">≈ {Math.ceil(totalHours / 40)} weeks</p>
          </CardContent>
        </Card>
      </div>

      {/* Phase Breakdown */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Target className="h-5 w-5" />
            Phase Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {phaseStats.map((phase, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className={`${getPhaseColorClasses(phase.color)} border`}>
                      {phase.stepRange}
                    </Badge>
                    <div>
                      <h4 className="font-medium text-white">{phase.name}</h4>
                      <p className="text-sm text-slate-400">
                        {phase.completed}/{phase.steps} steps • {phase.hours}h estimated
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{Math.round(phase.progress)}%</p>
                    <p className="text-xs text-slate-500">complete</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={phase.progress} className="h-2" />
                  <div className={`h-1 rounded-full ${getProgressBarColor(phase.color)} opacity-20`} 
                       style={{ width: `${phase.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Milestones */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5" />
            Key Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {phaseStats.map((phase, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-slate-700/50">
                <div className={`w-3 h-3 rounded-full ${
                  phase.progress === 100 ? 'bg-green-400' : 
                  phase.progress > 0 ? getProgressBarColor(phase.color) : 'bg-slate-600'
                }`} />
                <div className="flex-1">
                  <h4 className="font-medium text-white">{phase.name}</h4>
                  <p className="text-sm text-slate-400">
                    Steps {phase.stepRange} • {phase.hours} hours
                  </p>
                </div>
                <div className="text-right">
                  {phase.progress === 100 ? (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      Complete
                    </Badge>
                  ) : phase.progress > 0 ? (
                    <Badge className={`${getPhaseColorClasses(phase.color)} border`}>
                      In Progress
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-slate-600 text-slate-400">
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}