/**
 * Live Agent Activity Component
 * Real-time display of AI agents working on the client's project
 */

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { useDashboardData } from '@/hooks/client/useDashboardData';
import { 
  Bot, 
  Activity, 
  Clock, 
  CheckCircle, 
  Zap, 
  Code, 
  Palette, 
  Database,
  Eye,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentActivity {
  id: string;
  agentName: string;
  agentType: 'development' | 'design' | 'content' | 'testing' | 'optimization';
  currentTask: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  tokensUsed: number;
  estimatedCompletion?: string;
  lastUpdate: string;
}

export function LiveAgentActivity() {
  const { clientData } = useClientDetails();
  const { dashboardData, loading, refresh } = useDashboardData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Use real data from Supabase
  const agentActivities = dashboardData?.agentActivities || [];

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const totalTokensUsed = agentActivities.reduce((sum, agent) => sum + agent.tokensUsed, 0);
  const totalTokenLimit = 5000; // Example limit
  const tokenUsagePercentage = (totalTokensUsed / totalTokenLimit) * 100;

  const activeAgents = agentActivities.filter(agent => agent.status === 'active');
  const completedTasks = agentActivities.filter(agent => agent.status === 'completed').length;

  const getAgentIcon = (type: AgentActivity['agentType']) => {
    switch (type) {
      case 'development': return Code;
      case 'design': return Palette;
      case 'content': return Eye;
      case 'testing': return CheckCircle;
      case 'optimization': return Zap;
      default: return Bot;
    }
  };

  const getStatusColor = (status: AgentActivity['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'completed': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setIsRefreshing(false);
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-green-400" />
            <span>🤖 AI Agents Working Now</span>
            <Badge variant="outline" className="bg-green-400/10 text-green-400 border-green-400/30">
              <Activity className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="text-gray-400 hover:text-white"
          >
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-green-400">{activeAgents.length}</div>
            <div className="text-xs text-muted-foreground">Active Agents</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-400">{completedTasks}</div>
            <div className="text-xs text-muted-foreground">Tasks Complete</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-purple-400">{totalTokensUsed.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Tokens Used</div>
          </div>
        </div>

        {/* Token Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Token Usage</span>
            <span className="text-green-400 font-mono">
              {totalTokensUsed.toLocaleString()} / {totalTokenLimit.toLocaleString()}
            </span>
          </div>
          <Progress value={tokenUsagePercentage} className="h-2" />
          <div className="text-xs text-muted-foreground">
            {Math.round(100 - tokenUsagePercentage)}% remaining
          </div>
        </div>

        {/* Agent Activities */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-white">Current Activities</div>
          {agentActivities.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No agents currently active</p>
            </div>
          ) : (
            agentActivities.map((agent) => {
              const IconComponent = getAgentIcon(agent.agentType);
              
              return (
                <Card key={agent.id} className="border-slate-600 bg-slate-800/50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Agent Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                            <IconComponent className="w-4 h-4 text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white text-sm">{agent.agentName}</div>
                            <div className="text-xs text-muted-foreground capitalize">{agent.agentType}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={cn("text-xs", getStatusColor(agent.status))}>
                          {agent.status}
                        </Badge>
                      </div>

                      {/* Current Task */}
                      <div>
                        <div className="text-sm text-white mb-1">{agent.currentTask}</div>
                        {agent.status === 'active' && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-white">{agent.progress}%</span>
                            </div>
                            <Progress value={agent.progress} className="h-1" />
                          </div>
                        )}
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Database className="w-3 h-3" />
                            <span>{agent.tokensUsed} tokens</span>
                          </div>
                          {agent.estimatedCompletion && agent.status === 'active' && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{agent.estimatedCompletion}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Activity className="w-3 h-3" />
                          <span>{agent.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t border-slate-600 pt-4">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              View All Activity
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Agent Settings
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}