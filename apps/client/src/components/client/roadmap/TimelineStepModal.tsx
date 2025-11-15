import React from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Package,
  Users,
  Calendar,
  ArrowRight,
  ExternalLink,
  FileText,
  Target
} from 'lucide-react';
import type { PDRTimelineStep } from '@/data/pdr-timeline-steps';
import { PDR_PHASES } from '@/data/pdr-timeline-steps';

interface TimelineStepModalProps {
  step: PDRTimelineStep | null;
  isOpen: boolean;
  onClose: () => void;
  onMarkComplete?: (stepId: number) => void;
  onRequestApproval?: (stepId: number) => void;
}

export function TimelineStepModal({ 
  step, 
  isOpen, 
  onClose, 
  onMarkComplete, 
  onRequestApproval 
}: TimelineStepModalProps) {
  if (!step) return null;

  const phaseInfo = Object.values(PDR_PHASES).find(phase => 
    step.id >= phase.steps[0] && step.id <= phase.steps[1]
  );

  const getStatusIcon = () => {
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-400 animate-pulse" />;
      case 'blocked':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Clock className="h-5 w-5 text-slate-500" />;
    }
  };

  const getStatusColor = () => {
    switch (step.status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'blocked':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPhaseColor = (color: string) => {
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

  const stepProgress = step.actualHours ? 
    Math.min((step.actualHours / step.estimatedHours) * 100, 100) : 
    step.status === 'completed' ? 100 : 
    step.status === 'in-progress' ? 50 : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-xl text-white mb-2">
                Step {step.id}: {step.title}
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                {step.description}
              </DialogDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <Badge className={`${getStatusColor()} border`}>
                {step.status.replace('-', ' ')}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Phase and Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300">Phase</h4>
              {phaseInfo && (
                <Badge className={`${getPhaseColor(phaseInfo.color)} border w-fit`}>
                  {phaseInfo.name}
                </Badge>
              )}
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-300">Estimated Time</h4>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="h-4 w-4" />
                <span>{step.estimatedHours} hours</span>
              </div>
            </div>
          </div>

          {/* Progress Tracking */}
          {(step.status === 'in-progress' || step.status === 'completed') && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Progress</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">
                    {step.actualHours || 0}h / {step.estimatedHours}h
                  </span>
                  <span className="text-slate-400">{Math.round(stepProgress)}%</span>
                </div>
                <Progress value={stepProgress} className="h-2" />
              </div>
            </div>
          )}

          <Separator className="bg-slate-700" />

          {/* Deliverables */}
          {step.deliverables && step.deliverables.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Deliverables
              </h4>
              <ul className="space-y-2">
                {step.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-2 flex-shrink-0" />
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dependencies */}
          {step.dependencies && step.dependencies.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Dependencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {step.dependencies.map((depId) => (
                  <Badge key={depId} variant="outline" className="border-slate-600 text-slate-400">
                    Step {depId}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Milestone Indicator */}
          {step.milestoneStep && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-400">Milestone Step</span>
              </div>
              <p className="text-xs text-amber-300 mt-1">
                This is a key milestone in the project timeline
              </p>
            </div>
          )}

          {/* Approval Required */}
          {step.requiresApproval && (
            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-400">Client Approval Required</span>
              </div>
              <p className="text-xs text-orange-300 mt-1">
                This step requires client review and approval before proceeding
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-slate-700">
            {step.status === 'in-progress' && onMarkComplete && (
              <Button 
                onClick={() => onMarkComplete(step.id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4" />
                Mark Complete
              </Button>
            )}
            
            {step.requiresApproval && step.status === 'completed' && onRequestApproval && (
              <Button 
                onClick={() => onRequestApproval(step.id)}
                variant="outline"
                className="flex items-center gap-2 border-amber-500/30 text-amber-400 hover:bg-amber-500/10"
              >
                <FileText className="h-4 w-4" />
                Request Approval
              </Button>
            )}
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2 border-slate-600 text-slate-400 hover:bg-slate-700"
            >
              <ExternalLink className="h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}