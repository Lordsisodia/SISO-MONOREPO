import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  Clock, 
  Circle, 
  ChevronDown, 
  Eye, 
  Activity,
  Bot,
  Package,
  AlertCircle,
  FileCode,
  Zap
} from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { LivePDRActivity } from './LivePDRActivity';
import { TimelineOverview } from './TimelineOverview';

interface PDRStep {
  id?: string;
  client_id: string;
  step_number: number;
  title: string;
  description: string;
  phase: string;
  status: 'pending' | 'active' | 'completed' | 'blocked';
  estimated_duration: string;
  actual_duration?: number;
  deliverables?: string[];
  requires_approval: boolean;
  approval_status?: 'pending' | 'approved' | 'changes_requested';
  started_at?: string;
  completed_at?: string;
  assigned_agents?: string[];
}

interface AgentActivity {
  id: string;
  agent_name: string;
  current_task: string;
  current_step: number;
  started_at: string;
}

import { PDR_75_STEPS } from '@/data/pdr-timeline-steps';

// Convert 75-step timeline to PDRStep format
const defaultPDRSteps: Omit<PDRStep, 'id' | 'client_id'>[] = PDR_75_STEPS.map(step => ({
  step_number: step.id,
  title: step.title,
  description: step.description,
  phase: step.phase,
  status: step.status as 'pending' | 'active' | 'completed' | 'blocked',
  estimated_duration: `${step.estimatedHours}h`,
  requires_approval: step.requiresApproval,
  deliverables: step.deliverables
}));

export function PDRStepTimeline() {
  const { clientData, loading } = useClientDetails();
  const [stepDetails, setStepDetails] = useState<PDRStep[]>([]);
  const [activeAgents, setActiveAgents] = useState<AgentActivity[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const [showOnlyActive, setShowOnlyActive] = useState(false);

  useEffect(() => {
    if (clientData?.id) {
      loadPDRSteps();
      subscribeToAgentUpdates();
    }
  }, [clientData?.id]);

  const loadPDRSteps = async () => {
    try {
      const { data, error } = await supabase
        .from('pdr_step_tracking')
        .select('*')
        .eq('client_id', clientData?.id)
        .order('step_number');

      if (error) throw error;

      // If no steps exist in database, use defaults with current client data
      if (!data || data.length === 0) {
        const currentStep = clientData?.current_step || 1;
        const stepsWithStatus = defaultPDRSteps.map(step => ({
          ...step,
          client_id: clientData?.id || '',
          status: step.step_number < currentStep ? 'completed' as const : 
                  step.step_number === currentStep ? 'active' as const : 
                  'pending' as const
        }));
        setStepDetails(stepsWithStatus);
      } else {
        setStepDetails(data);
      }
    } catch (error) {
      console.error('Failed to load PDR steps:', error);
      // Fallback to default steps
      const currentStep = clientData?.current_step || 1;
      const stepsWithStatus = defaultPDRSteps.map(step => ({
        ...step,
        client_id: clientData?.id || '',
        status: step.step_number < currentStep ? 'completed' as const : 
                step.step_number === currentStep ? 'active' as const : 
                'pending' as const
      }));
      setStepDetails(stepsWithStatus);
    }
  };

  const subscribeToAgentUpdates = () => {
    const subscription = supabase
      .channel(`pdr_updates_${clientData?.id}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'pdr_step_tracking',
        filter: `client_id=eq.${clientData?.id}`
      }, handleStepUpdate)
      .subscribe();

    return () => subscription.unsubscribe();
  };

  const handleStepUpdate = (payload: any) => {
    if (payload.eventType === 'UPDATE') {
      setStepDetails(prev => 
        prev.map(step => 
          step.step_number === payload.new.step_number 
            ? { ...step, ...payload.new }
            : step
        )
      );
    }
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  // Filter steps based on phase and active status
  const filteredSteps = stepDetails.filter(step => {
    if (phaseFilter !== 'all' && step.phase !== phaseFilter) return false;
    if (showOnlyActive && step.status !== 'active') return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-12 bg-slate-700 rounded-lg"></div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-slate-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timeline Overview */}
      <TimelineOverview 
        steps={PDR_75_STEPS} 
        currentStep={clientData?.current_step || 1} 
      />

      {/* Filter and Search */}
      <div className="flex items-center gap-4 mb-6">
        <Select value={phaseFilter} onValueChange={setPhaseFilter}>
          <SelectTrigger className="w-48 bg-slate-800 border-slate-700">
            <SelectValue placeholder="Filter by phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Phases</SelectItem>
            <SelectItem value="discovery">Discovery & Research (1-15)</SelectItem>
            <SelectItem value="planning">Planning & Strategy (16-25)</SelectItem>
            <SelectItem value="design">Design & UX (26-40)</SelectItem>
            <SelectItem value="development">Development (41-60)</SelectItem>
            <SelectItem value="testing">Testing & QA (61-68)</SelectItem>
            <SelectItem value="launch">Launch & Deployment (69-75)</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          onClick={() => setShowOnlyActive(!showOnlyActive)}
          className={showOnlyActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}
        >
          <Eye className="h-4 w-4 mr-2" />
          {showOnlyActive ? 'Show All' : 'Active Only'}
        </Button>
      </div>

      {/* Timeline Visualization */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-600"></div>

        {/* PDR Steps */}
        <div className="space-y-4">
          {filteredSteps.map((step, index) => (
            <PDRStepItem
              key={step.step_number}
              step={step}
              isActive={step.step_number === clientData?.current_step}
              isCompleted={step.status === 'completed'}
              isExpanded={expandedStep === step.step_number}
              onExpand={() => setExpandedStep(
                expandedStep === step.step_number ? null : step.step_number
              )}
              agentActivity={activeAgents.filter(a => a.current_step === step.step_number)}
            />
          ))}
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-400" />
            Live Development Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LivePDRActivity clientId={clientData?.id} />
        </CardContent>
      </Card>
    </div>
  );
}

interface PDRStepItemProps {
  step: PDRStep;
  isActive: boolean;
  isCompleted: boolean;
  isExpanded: boolean;
  onExpand: () => void;
  agentActivity: AgentActivity[];
}

function PDRStepItem({ step, isActive, isCompleted, isExpanded, onExpand, agentActivity }: PDRStepItemProps) {
  const getStepIcon = () => {
    if (isCompleted) return <CheckCircle className="h-5 w-5 text-green-400" />;
    if (isActive) return <Clock className="h-5 w-5 text-blue-400 animate-pulse" />;
    return <Circle className="h-5 w-5 text-slate-500" />;
  };

  const getStepColor = () => {
    if (isCompleted) return 'border-green-400 bg-green-400/5';
    if (isActive) return 'border-blue-400 bg-blue-400/5';
    return 'border-slate-600 bg-slate-800/50';
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <div className="relative pl-16 pb-4">
      {/* Timeline Marker */}
      <div className="absolute left-6 top-3 -translate-x-1/2">
        <div className={`w-4 h-4 rounded-full border-2 bg-slate-900 ${
          isCompleted ? 'border-green-400' : isActive ? 'border-blue-400' : 'border-slate-600'
        }`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {getStepIcon()}
          </div>
        </div>
      </div>

      {/* Step Card */}
      <Card className={`${getStepColor()} transition-all cursor-pointer hover:shadow-lg`} onClick={onExpand}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg text-white">
                Step {step.step_number}: {step.title}
              </CardTitle>
              <CardDescription className="text-slate-400">
                Phase: {step.phase} • {step.estimated_duration}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {agentActivity.length > 0 && (
                <Badge className="bg-green-400/10 text-green-400 border-green-400/30">
                  {agentActivity.length} agent{agentActivity.length > 1 ? 's' : ''} working
                </Badge>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform text-slate-400 ${
                isExpanded ? 'rotate-180' : ''
              }`} />
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            <div className="space-y-4">
              {/* Step Description */}
              <div>
                <h4 className="font-medium mb-2 text-white">Description</h4>
                <p className="text-sm text-slate-300">{step.description}</p>
              </div>

              {/* Deliverables */}
              {step.deliverables && step.deliverables.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-white">Deliverables</h4>
                  <ul className="text-sm text-slate-300 space-y-1">
                    {step.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Package className="h-3 w-3" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Agent Activity */}
              {agentActivity.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-white">Active Work</h4>
                  <div className="space-y-2">
                    {agentActivity.map(agent => (
                      <div key={agent.id} className="flex items-center gap-3 p-2 bg-slate-700 rounded">
                        <Bot className="h-4 w-4 text-green-400" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">{agent.agent_name}</div>
                          <div className="text-xs text-slate-400">{agent.current_task}</div>
                        </div>
                        <div className="text-xs text-slate-500">
                          {formatTimeAgo(agent.started_at)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approval Points */}
              {step.requires_approval && (
                <div className="flex items-center gap-2 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded">
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-yellow-300">Client approval required</span>
                  {step.approval_status === 'pending' && isActive && (
                    <Button size="sm" className="ml-auto">
                      Review & Approve
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}