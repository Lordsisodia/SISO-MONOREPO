/**
 * Progressive Unlock Hub - Main component for 6-page client journey
 * Task 13: Progressive Unlock System Implementation
 */

import React from 'react';
import { useProgressiveUnlock } from '@/services/progressiveUnlock/ProgressiveUnlockEngine';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Circle, 
  Lock, 
  ArrowRight, 
  Sparkles,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProgressiveUnlockHubProps {
  className?: string;
}

export function ProgressiveUnlockHub({ className }: ProgressiveUnlockHubProps) {
  const { clientData, loading } = useClientDetails();
  const {
    currentStage,
    allStages,
    progressPercentage,
    progressSummary,
    navigation,
    canAccess
  } = useProgressiveUnlock(clientData);

  if (loading) {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-slate-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-slate-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome to Your Project Journey
          </h1>
          <p className="text-gray-400 text-lg">
            {clientData?.company_name || 'Your Project'} • {progressSummary.currentStageName}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{progressPercentage}%</div>
            <div className="text-sm text-gray-400">Complete</div>
          </div>
          <div className="w-24 h-24 relative">
            <svg className="transform -rotate-90 w-24 h-24" viewBox="0 0 36 36">
              <path
                className="text-gray-700"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-500"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={`${progressPercentage}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-400" />
                <span>Project Progress</span>
              </CardTitle>
              <CardDescription>
                {progressSummary.stagesCompleted} of {progressSummary.totalStages} stages completed
              </CardDescription>
            </div>
            {progressSummary.nextStageName && (
              <Badge variant="outline" className="border-blue-500 text-blue-400">
                Next: {progressSummary.nextStageName}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-sm text-gray-400">
              <span>Current: {progressSummary.currentStageName}</span>
              {progressSummary.estimatedTimeToNext && (
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{progressSummary.estimatedTimeToNext}</span>
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stage Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allStages.map((stage, index) => {
          const isAccessible = canAccess(stage.id);
          const isCompleted = stage.isCompleted;
          const isCurrent = stage.isCurrent;
          
          return (
            <Card
              key={stage.id}
              className={cn(
                "relative transition-all duration-200 hover:scale-[1.02]",
                isCompleted && "border-green-500/50 bg-green-500/5",
                isCurrent && "border-blue-500/50 bg-blue-500/5 ring-1 ring-blue-500/20",
                !isAccessible && "border-gray-700 bg-gray-800/50 opacity-60",
                isAccessible && !isCurrent && !isCompleted && "border-slate-600 bg-slate-800 hover:border-slate-500"
              )}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full",
                      isCompleted && "bg-green-500",
                      isCurrent && "bg-blue-500",
                      !isAccessible && "bg-gray-600",
                      isAccessible && !isCurrent && !isCompleted && "bg-slate-600"
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : !isAccessible ? (
                        <Lock className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Circle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          isCompleted && "border-green-500 text-green-400",
                          isCurrent && "border-blue-500 text-blue-400",
                          !isAccessible && "border-gray-600 text-gray-400"
                        )}
                      >
                        Stage {stage.order}
                      </Badge>
                    </div>
                  </div>
                  {isCurrent && (
                    <div className="flex items-center space-x-1 text-blue-400">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium">Current</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <CardTitle className={cn(
                    "text-lg mb-2",
                    !isAccessible && "text-gray-400"
                  )}>
                    {stage.title}
                  </CardTitle>
                  <CardDescription className={cn(
                    "text-sm",
                    !isAccessible && "text-gray-500"
                  )}>
                    {stage.description}
                  </CardDescription>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-gray-400 font-medium">Benefits:</div>
                  <ul className="space-y-1">
                    {stage.benefits.slice(0, 2).map((benefit, i) => (
                      <li key={i} className={cn(
                        "text-xs flex items-center space-x-2",
                        !isAccessible && "text-gray-500"
                      )}>
                        <div className="w-1 h-1 bg-current rounded-full"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    variant={isCurrent ? "default" : "outline"}
                    size="sm"
                    className={cn(
                      "w-full",
                      isCompleted && "bg-green-600 hover:bg-green-700 border-green-600",
                      !isAccessible && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!isAccessible}
                  >
                    {isCompleted ? (
                      <span className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </span>
                    ) : isCurrent ? (
                      <span className="flex items-center space-x-2">
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    ) : isAccessible ? (
                      <span className="flex items-center space-x-2">
                        <span>Start</span>
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>Locked</span>
                      </span>
                    )}
                  </Button>
                </div>

                {stage.estimatedDuration && (
                  <div className="flex items-center space-x-2 text-xs text-gray-400 pt-1">
                    <Clock className="w-3 h-3" />
                    <span>{stage.estimatedDuration}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Jump to key project activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">View Timeline</div>
                <div className="text-sm text-gray-400">See 46-step roadmap</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Live Development</div>
                <div className="text-sm text-gray-400">Watch AI agents work</div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Project Documents</div>
                <div className="text-sm text-gray-400">Access all files</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}