import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Calendar, Zap } from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { supabase } from '@/integrations/supabase/client';
import { format, addDays } from 'date-fns';

interface ProjectStats {
  completedSteps: number;
  activeSteps: number;
  phases: {
    discovery: number;
    design: number;
    development: number;
    launch: number;
  };
}

interface Velocity {
  stepsPerDay: number;
  estimatedCompletion: string;
}

export function PDRProjectHeader() {
  const { clientData, loading } = useClientDetails();
  const [projectStats, setProjectStats] = useState<ProjectStats | null>(null);
  const [velocity, setVelocity] = useState<Velocity | null>(null);

  useEffect(() => {
    if (clientData?.id) {
      fetchProjectStats();
      calculateVelocity();
    }
  }, [clientData]);

  const fetchProjectStats = async () => {
    try {
      const { data: steps, error } = await supabase
        .from('pdr_step_tracking')
        .select('*')
        .eq('client_id', clientData?.id);

      if (error) throw error;

      // If no steps exist yet, use default calculations
      if (!steps || steps.length === 0) {
        const currentStep = clientData?.current_step || 1;
        const completedCount = Math.max(0, currentStep - 1);
        
        setProjectStats({
          completedSteps: completedCount,
          activeSteps: 1,
          phases: {
            discovery: currentStep > 8 ? 100 : (currentStep / 8) * 100,
            design: currentStep > 18 ? 100 : currentStep > 8 ? ((currentStep - 8) / 10) * 100 : 0,
            development: currentStep > 38 ? 100 : currentStep > 18 ? ((currentStep - 18) / 20) * 100 : 0,
            launch: currentStep > 38 ? ((currentStep - 38) / 8) * 100 : 0
          }
        });
      } else {
        // Calculate from actual step data
        const completed = steps.filter(s => s.status === 'completed').length;
        const active = steps.filter(s => s.status === 'active').length;

        const phaseProgress = {
          discovery: calculatePhaseProgress(steps, 1, 8),
          design: calculatePhaseProgress(steps, 9, 18),
          development: calculatePhaseProgress(steps, 19, 38),
          launch: calculatePhaseProgress(steps, 39, 46)
        };

        setProjectStats({
          completedSteps: completed,
          activeSteps: active,
          phases: phaseProgress
        });
      }
    } catch (error) {
      console.error('Failed to fetch project stats:', error);
      // Fallback to current_step based calculation
      const currentStep = clientData?.current_step || 1;
      setProjectStats({
        completedSteps: Math.max(0, currentStep - 1),
        activeSteps: 1,
        phases: {
          discovery: currentStep > 8 ? 100 : (currentStep / 8) * 100,
          design: currentStep > 18 ? 100 : currentStep > 8 ? ((currentStep - 8) / 10) * 100 : 0,
          development: currentStep > 38 ? 100 : currentStep > 18 ? ((currentStep - 18) / 20) * 100 : 0,
          launch: currentStep > 38 ? ((currentStep - 38) / 8) * 100 : 0
        }
      });
    }
  };

  const calculatePhaseProgress = (steps: any[], startStep: number, endStep: number) => {
    const phaseSteps = steps.filter(s => s.step_number >= startStep && s.step_number <= endStep);
    const completedPhaseSteps = phaseSteps.filter(s => s.status === 'completed').length;
    const totalPhaseSteps = endStep - startStep + 1;
    return (completedPhaseSteps / totalPhaseSteps) * 100;
  };

  const calculateVelocity = async () => {
    try {
      // Calculate based on created_at date
      const createdDate = new Date(clientData?.created_at || Date.now());
      const daysSinceStart = Math.max(1, Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)));
      const currentStep = clientData?.current_step || 1;
      const stepsCompleted = Math.max(0, currentStep - 1);
      
      const dailyVelocity = stepsCompleted / daysSinceStart;
      const remainingSteps = 46 - currentStep;
      const estimatedDaysRemaining = dailyVelocity > 0 ? Math.ceil(remainingSteps / dailyVelocity) : 90;
      const estimatedCompletion = addDays(new Date(), estimatedDaysRemaining);

      setVelocity({
        stepsPerDay: parseFloat(dailyVelocity.toFixed(2)),
        estimatedCompletion: format(estimatedCompletion, 'MMM d, yyyy')
      });
    } catch (error) {
      console.error('Failed to calculate velocity:', error);
      setVelocity({
        stepsPerDay: 0.5,
        estimatedCompletion: format(addDays(new Date(), 90), 'MMM d, yyyy')
      });
    }
  };

  const getPhaseStatus = (phase: string, currentStep: number) => {
    switch (phase) {
      case 'discovery':
        if (currentStep > 8) return 'completed';
        if (currentStep >= 1 && currentStep <= 8) return 'active';
        return 'upcoming';
      case 'design':
        if (currentStep > 18) return 'completed';
        if (currentStep >= 9 && currentStep <= 18) return 'active';
        return 'upcoming';
      case 'development':
        if (currentStep > 38) return 'completed';
        if (currentStep >= 19 && currentStep <= 38) return 'active';
        return 'upcoming';
      case 'launch':
        if (currentStep > 46) return 'completed';
        if (currentStep >= 39 && currentStep <= 46) return 'active';
        return 'upcoming';
      default:
        return 'upcoming';
    }
  };

  if (loading || !clientData) {
    return (
      <div className="space-y-6 mb-8 animate-pulse">
        <div className="h-32 bg-slate-700 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-slate-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  const currentStep = clientData.current_step || 1;

  return (
    <div className="space-y-6 mb-8">
      {/* Project Overview */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {clientData.company || 'Your Project'} Roadmap
            </h1>
            <p className="text-slate-300">{clientData.industry || 'Digital Transformation'}</p>
          </div>
          <Badge className="bg-green-400/10 text-green-400 border-green-400/30">
            Step {currentStep}/46
          </Badge>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <div className="text-sm text-slate-300">Completed</div>
                  <div className="text-lg font-bold text-white">{projectStats?.completedSteps || currentStep - 1}/46</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="text-sm text-slate-300">In Progress</div>
                  <div className="text-lg font-bold text-white">{projectStats?.activeSteps || 1}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-400" />
                <div>
                  <div className="text-sm text-slate-300">Est. Completion</div>
                  <div className="text-lg font-bold text-white">{velocity?.estimatedCompletion || 'Calculating...'}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-700/50 border-slate-600">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                <div>
                  <div className="text-sm text-slate-300">Velocity</div>
                  <div className="text-lg font-bold text-white">{velocity?.stepsPerDay || 0.5}/day</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Phase Progress Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <PhaseProgressCard 
          phase="Discovery" 
          steps="1-8" 
          progress={projectStats?.phases?.discovery || 0}
          status={getPhaseStatus('discovery', currentStep)}
        />
        <PhaseProgressCard 
          phase="Design" 
          steps="9-18" 
          progress={projectStats?.phases?.design || 0}
          status={getPhaseStatus('design', currentStep)}
        />
        <PhaseProgressCard 
          phase="Development" 
          steps="19-38" 
          progress={projectStats?.phases?.development || 0}
          status={getPhaseStatus('development', currentStep)}
        />
        <PhaseProgressCard 
          phase="Launch" 
          steps="39-46" 
          progress={projectStats?.phases?.launch || 0}
          status={getPhaseStatus('launch', currentStep)}
        />
      </div>
    </div>
  );
}

interface PhaseProgressCardProps {
  phase: string;
  steps: string;
  progress: number;
  status: 'completed' | 'active' | 'upcoming';
}

function PhaseProgressCard({ phase, steps, progress, status }: PhaseProgressCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400';
      case 'active': return 'text-blue-400 border-blue-400';
      case 'upcoming': return 'text-slate-400 border-slate-600';
      default: return 'text-slate-400 border-slate-600';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase.toLowerCase()) {
      case 'discovery': return '🔍';
      case 'design': return '🎨';
      case 'development': return '⚡';
      case 'launch': return '🚀';
      default: return '📌';
    }
  };

  return (
    <Card className={`border-2 bg-slate-800/50 ${getStatusColor(status)}`}>
      <CardContent className="p-4 text-center">
        <div className="text-2xl mb-2">{getPhaseIcon(phase)}</div>
        <h3 className="font-semibold text-white mb-1">{phase}</h3>
        <p className="text-sm text-slate-400 mb-2">Steps {steps}</p>
        <Progress value={progress} className="h-2 mb-2" />
        <div className="text-xs text-slate-400">{Math.round(progress)}% Complete</div>
      </CardContent>
    </Card>
  );
}