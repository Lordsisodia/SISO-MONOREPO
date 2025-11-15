/**
 * Project Hub Quick Actions Component
 * Enhanced quick action buttons for the main dashboard
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useNavigate } from 'react-router-dom';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  Map, 
  MessageSquare, 
  Eye, 
  Settings, 
  FileText, 
  Rocket 
} from 'lucide-react';

export function ProjectHubQuickActions() {
  const navigate = useNavigate();
  const { clientData } = useClientDetails();

  const currentStep = clientData?.current_step || 0;
  const totalSteps = clientData?.total_steps || 46;

  // Define action interface
  interface QuickAction {
    id: string;
    label: string;
    icon: React.ElementType;
    path: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    badge?: string;
  }

  // Determine which actions to show based on project progress
  const quickActions: QuickAction[] = [
    {
      id: 'continue-setup',
      label: 'Continue Setup',
      icon: Zap,
      path: '/client/dashboard/quick-setup',
      priority: currentStep < 10 ? 'high' : 'low',
      description: 'Complete your project setup',
      badge: currentStep < 10 ? `${10 - currentStep} steps` : undefined
    },
    {
      id: 'view-tasks',
      label: 'View Tasks',
      icon: Clock,
      path: '/client/dashboard/work-in-progress',
      priority: currentStep >= 5 ? 'high' : 'medium',
      description: 'See current development tasks',
      badge: '8 active'
    },
    {
      id: 'project-timeline',
      label: 'Timeline',
      icon: Map,
      path: '/client/dashboard/project-roadmap',
      priority: 'medium',
      description: 'View 46-step development roadmap'
    },
    {
      id: 'ai-assistant',
      label: 'AI Assistant',
      icon: MessageSquare,
      path: '/onboarding-chat',
      priority: 'medium',
      description: 'Chat with your AI project manager'
    },
    {
      id: 'live-preview',
      label: 'Live Preview',
      icon: Eye,
      path: '/client/dashboard/live-build',
      priority: currentStep >= 20 ? 'high' : 'low',
      description: 'Preview your website build'
    },
    {
      id: 'project-settings',
      label: 'Settings',
      icon: Settings,
      path: '/client/dashboard/settings',
      priority: 'low',
      description: 'Manage project preferences'
    }
  ];

  // Sort actions by priority and current project phase
  const sortedActions = quickActions
    .filter(action => {
      // Hide some actions based on project progress
      if (action.id === 'continue-setup' && currentStep >= 15) return false;
      if (action.id === 'live-preview' && currentStep < 15) return false;
      return true;
    })
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    })
    .slice(0, 4); // Show max 4 actions

  const handleActionClick = (path: string) => {
    navigate(path);
  };

  const getButtonVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'default';
      case 'medium': return 'outline';
      case 'low': return 'ghost';
      default: return 'outline';
    }
  };

  const getButtonClasses = (priority: string) => {
    const baseClasses = "h-auto p-4 text-left justify-start transition-all duration-200";
    
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none`;
      case 'medium':
        return `${baseClasses} bg-slate-800 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-white`;
      case 'low':
        return `${baseClasses} bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600 text-gray-300`;
      default:
        return `${baseClasses} bg-slate-800 border-slate-600 hover:bg-slate-700`;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      
      <TooltipProvider>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sortedActions.map((action, index) => {
            const IconComponent = action.icon;
            
            return (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={getButtonVariant(action.priority)}
                      className={getButtonClasses(action.priority)}
                      onClick={() => handleActionClick(action.path)}
                    >
                      <div className="flex items-start space-x-3 w-full">
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-lg 
                          ${action.priority === 'high' 
                            ? 'bg-white/20 text-white' 
                            : action.priority === 'medium'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-slate-700 text-gray-400'
                          }
                        `}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`
                            font-medium text-sm flex items-center space-x-2
                            ${action.priority === 'high' 
                              ? 'text-white' 
                              : action.priority === 'medium'
                              ? 'text-white'
                              : 'text-gray-300'
                            }
                          `}>
                            <span>{action.label}</span>
                            {action.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {action.badge}
                              </Badge>
                            )}
                          </div>
                          <div className={`
                            text-xs mt-1 
                            ${action.priority === 'high' 
                              ? 'text-white/80' 
                              : action.priority === 'medium'
                              ? 'text-gray-400'
                              : 'text-gray-500'
                            }
                          `}>
                            {action.description}
                          </div>
                        </div>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{action.description}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            );
          })}
        </div>
      </TooltipProvider>

      {/* Progress Indicator */}
      <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Project Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Started</span>
          <span>
            {currentStep >= totalSteps ? (
              <span className="text-green-400 flex items-center space-x-1">
                <Rocket className="w-3 h-3" />
                <span>Live!</span>
              </span>
            ) : (
              `${totalSteps - currentStep} steps remaining`
            )}
          </span>
        </div>
      </div>
    </div>
  );
}