import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  Circle, 
  ChevronDown, 
  ChevronUp,
  Target,
  Users,
  AlertTriangle,
  FileCheck,
  Activity,
  Briefcase,
  Timer,
  CheckSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getEnhancedDescription, getClientInvolvementBadge } from '@/data/enhanced-pdr-descriptions';

interface TimelineStepProps {
  step: {
    id: number;
    title: string;
    phase: string;
    status: 'not-started' | 'in-progress' | 'completed' | 'blocked';
    description: string;
    estimatedHours: number;
    actualHours?: number;
    deliverables: string[];
    requiresApproval: boolean;
  };
  isActive: boolean;
  onExpand?: () => void;
  isExpanded?: boolean;
}

export function EnhancedTimelineStep({ step, isActive, onExpand, isExpanded = false }: TimelineStepProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const enhancedData = getEnhancedDescription(step.id);
  
  const getStepIcon = () => {
    if (step.status === 'completed') return <CheckCircle className="h-5 w-5 text-green-400" />;
    if (step.status === 'in-progress' || isActive) return <Clock className="h-5 w-5 text-siso-orange animate-pulse" />;
    if (step.status === 'blocked') return <AlertTriangle className="h-5 w-5 text-red-400" />;
    return <Circle className="h-5 w-5 text-siso-border" />;
  };

  const getStepColor = () => {
    if (step.status === 'completed') return 'border-green-400/30 bg-green-400/5';
    if (step.status === 'in-progress' || isActive) return 'border-siso-orange/30 bg-siso-orange/5';
    if (step.status === 'blocked') return 'border-red-400/30 bg-red-400/5';
    return 'border-siso-border bg-siso-bg-secondary';
  };

  const getPhaseColor = (phase: string) => {
    const phaseColors: Record<string, string> = {
      discovery: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      planning: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      design: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      development: 'bg-green-500/20 text-green-400 border-green-500/30',
      testing: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      launch: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return phaseColors[phase.toLowerCase()] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const progress = step.actualHours && step.estimatedHours 
    ? Math.min((step.actualHours / step.estimatedHours) * 100, 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Timeline Connector */}
      <div className="absolute left-6 top-0 -bottom-8 w-px bg-siso-border" />
      
      {/* Timeline Node */}
      <div className="absolute left-6 top-8 -translate-x-1/2 z-10">
        <div className={cn(
          "w-12 h-12 rounded-full border-2 bg-siso-bg flex items-center justify-center",
          step.status === 'completed' ? 'border-green-400' : 
          isActive ? 'border-siso-orange' : 
          step.status === 'blocked' ? 'border-red-400' :
          'border-siso-border'
        )}>
          {getStepIcon()}
        </div>
      </div>

      {/* Step Card */}
      <Card className={cn(
        "ml-20 transition-all duration-300 cursor-pointer hover:shadow-lg",
        getStepColor()
      )} onClick={onExpand}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <CardTitle className="text-lg text-siso-text">
                  Step {step.id}: {step.title}
                </CardTitle>
                <Badge variant="outline" className={cn("text-xs", getPhaseColor(step.phase))}>
                  {step.phase}
                </Badge>
                {step.requiresApproval && (
                  <Badge variant="outline" className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    Requires Approval
                  </Badge>
                )}
              </div>
              <p className="text-sm text-siso-text-muted line-clamp-2">
                {enhancedData?.detailedDescription || step.description}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="ml-4">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>

          {/* Progress Bar for Active Steps */}
          {(step.status === 'in-progress' || isActive) && step.actualHours && (
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-xs text-siso-text-muted">
                <span>Progress</span>
                <span>{step.actualHours}h / {step.estimatedHours}h</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
        </CardHeader>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="pt-0">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-siso-bg-tertiary">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-4 space-y-4">
                    {enhancedData && (
                      <>
                        {/* Client Involvement */}
                        <div>
                          <h4 className="text-sm font-medium text-siso-text mb-2 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Client Involvement
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn("text-xs", getClientInvolvementBadge(enhancedData.clientInvolvement).color)}>
                              {getClientInvolvementBadge(enhancedData.clientInvolvement).text}
                            </Badge>
                            <span className="text-sm text-siso-text-muted">{enhancedData.clientInvolvement}</span>
                          </div>
                        </div>

                        {/* Duration Estimates */}
                        <div>
                          <h4 className="text-sm font-medium text-siso-text mb-2 flex items-center gap-2">
                            <Timer className="h-4 w-4" />
                            Time Estimates
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center p-2 bg-siso-bg rounded-lg">
                              <div className="text-xs text-siso-text-muted">Optimistic</div>
                              <div className="text-sm font-medium text-green-400">{enhancedData.estimatedDuration.optimistic}h</div>
                            </div>
                            <div className="text-center p-2 bg-siso-bg rounded-lg border border-siso-orange/30">
                              <div className="text-xs text-siso-text-muted">Realistic</div>
                              <div className="text-sm font-medium text-siso-orange">{enhancedData.estimatedDuration.realistic}h</div>
                            </div>
                            <div className="text-center p-2 bg-siso-bg rounded-lg">
                              <div className="text-xs text-siso-text-muted">Pessimistic</div>
                              <div className="text-sm font-medium text-red-400">{enhancedData.estimatedDuration.pessimistic}h</div>
                            </div>
                          </div>
                        </div>

                        {/* Risk Factors */}
                        {enhancedData.riskFactors && enhancedData.riskFactors.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-siso-text mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Risk Factors
                            </h4>
                            <ul className="space-y-1">
                              {enhancedData.riskFactors.map((risk, index) => (
                                <li key={index} className="text-sm text-siso-text-muted flex items-start gap-2">
                                  <span className="text-red-400 mt-1">•</span>
                                  <span>{risk}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>

                  <TabsContent value="activities" className="mt-4">
                    {enhancedData && enhancedData.keyActivities && (
                      <div>
                        <h4 className="text-sm font-medium text-siso-text mb-3 flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Key Activities
                        </h4>
                        <ul className="space-y-2">
                          {enhancedData.keyActivities.map((activity, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <CheckSquare className="h-4 w-4 text-siso-orange mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-siso-text">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="deliverables" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-siso-text mb-3 flex items-center gap-2">
                          <Briefcase className="h-4 w-4" />
                          Deliverables
                        </h4>
                        <ul className="space-y-2">
                          {step.deliverables.map((deliverable, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <FileCheck className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-siso-text">{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {enhancedData && enhancedData.expectedOutcomes && (
                        <div>
                          <h4 className="text-sm font-medium text-siso-text mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Expected Outcomes
                          </h4>
                          <ul className="space-y-2">
                            {enhancedData.expectedOutcomes.map((outcome, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-siso-orange mt-1.5 flex-shrink-0" />
                                <span className="text-sm text-siso-text">{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="requirements" className="mt-4">
                    {enhancedData && (
                      <div className="space-y-4">
                        {enhancedData.prerequisites && enhancedData.prerequisites.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-siso-text mb-3">Prerequisites</h4>
                            <ul className="space-y-2">
                              {enhancedData.prerequisites.map((prereq, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-siso-text">{prereq}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {enhancedData.successCriteria && (
                          <div>
                            <h4 className="text-sm font-medium text-siso-text mb-3">Success Criteria</h4>
                            <ul className="space-y-2">
                              {enhancedData.successCriteria.map((criteria, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm text-siso-text">{criteria}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}