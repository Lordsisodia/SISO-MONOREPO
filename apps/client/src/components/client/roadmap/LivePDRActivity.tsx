import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Activity, Bot, FileCode, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface PDRActivity {
  id: string;
  client_id: string;
  pdr_step: number;
  agent_name: string;
  activity_description: string;
  activity_type: 'coding' | 'design' | 'analysis' | 'testing';
  code_changes?: number;
  tokens_used?: number;
  files_modified?: string[];
  created_at: string;
}

interface LivePDRActivityProps {
  clientId?: string;
}

export function LivePDRActivity({ clientId }: LivePDRActivityProps) {
  const [activities, setActivities] = useState<PDRActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    
    fetchRecentActivity();
    
    // Real-time updates
    const subscription = supabase
      .channel(`live_pdr_${clientId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'pdr_agent_activities',
        filter: `client_id=eq.${clientId}`
      }, handleActivityUpdate)
      .subscribe();

    return () => subscription.unsubscribe();
  }, [clientId]);

  const fetchRecentActivity = async () => {
    if (!clientId) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pdr_agent_activities')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Failed to fetch PDR activity:', error);
      // Use mock data for demo
      setActivities(generateMockActivities(clientId));
    } finally {
      setLoading(false);
    }
  };

  const handleActivityUpdate = (payload: any) => {
    if (payload.eventType === 'INSERT') {
      setActivities(prev => [payload.new, ...prev].slice(0, 10));
    }
  };

  const formatTimeAgo = (date: string) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'coding': return <FileCode className="h-4 w-4 text-blue-400" />;
      case 'design': return <Bot className="h-4 w-4 text-purple-400" />;
      case 'analysis': return <Activity className="h-4 w-4 text-green-400" />;
      case 'testing': return <Zap className="h-4 w-4 text-yellow-400" />;
      default: return <Bot className="h-4 w-4 text-green-400" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'coding': return 'bg-blue-400/10 text-blue-400 border-blue-400/30';
      case 'design': return 'bg-purple-400/10 text-purple-400 border-purple-400/30';
      case 'analysis': return 'bg-green-400/10 text-green-400 border-green-400/30';
      case 'testing': return 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30';
      default: return 'bg-slate-400/10 text-slate-400 border-slate-400/30';
    }
  };

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 bg-slate-700 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {activities.length === 0 ? (
        <div className="text-center py-6 text-slate-400">
          <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No recent development activity</p>
        </div>
      ) : (
        activities.map(activity => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
            <div className="flex-shrink-0 mt-1">
              {getActivityIcon(activity.activity_type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-white">{activity.agent_name}</span>
                <Badge variant="outline" className={getActivityColor(activity.activity_type)}>
                  Step {activity.pdr_step}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {activity.activity_type}
                </Badge>
              </div>
              <p className="text-sm text-slate-300">{activity.activity_description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                <span>{formatTimeAgo(activity.created_at)}</span>
                {activity.code_changes && (
                  <span className="flex items-center gap-1">
                    <FileCode className="h-3 w-3" />
                    {activity.code_changes} files changed
                  </span>
                )}
                {activity.tokens_used && (
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {activity.tokens_used.toLocaleString()} tokens
                  </span>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Generate mock activities for demo purposes
function generateMockActivities(clientId: string): PDRActivity[] {
  const mockActivities = [
    {
      agent_name: "Design Agent Alpha",
      activity_description: "Completed wireframe designs for the homepage and navigation structure",
      activity_type: "design" as const,
      pdr_step: 11,
      code_changes: 5,
      tokens_used: 3420
    },
    {
      agent_name: "Frontend Agent Beta",
      activity_description: "Implemented responsive navigation component with mobile menu",
      activity_type: "coding" as const,
      pdr_step: 24,
      code_changes: 8,
      tokens_used: 5230
    },
    {
      agent_name: "Analysis Agent Gamma",
      activity_description: "Analyzed competitor websites and compiled feature comparison report",
      activity_type: "analysis" as const,
      pdr_step: 2,
      tokens_used: 2150
    },
    {
      agent_name: "Testing Agent Delta",
      activity_description: "Completed cross-browser testing for authentication flow",
      activity_type: "testing" as const,
      pdr_step: 34,
      code_changes: 2,
      tokens_used: 1840
    },
    {
      agent_name: "Backend Agent Epsilon",
      activity_description: "Set up database schema and implemented user authentication endpoints",
      activity_type: "coding" as const,
      pdr_step: 20,
      code_changes: 12,
      tokens_used: 6750
    }
  ];

  return mockActivities.slice(0, 5).map((activity, index) => ({
    id: `mock-${index}`,
    client_id: clientId,
    ...activity,
    files_modified: activity.code_changes ? Array(activity.code_changes).fill('').map((_, i) => `file${i + 1}.tsx`) : undefined,
    created_at: new Date(Date.now() - (index * 3600000)).toISOString()
  }));
}