import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Bot, Palette, Code, UserCheck, User, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TeamActivity {
  id: string;
  client_id: string;
  actor_type: 'ai_agent' | 'designer' | 'developer' | 'pm';
  actor_name: string;
  action: string;
  description: string;
  task_id?: string;
  created_at: string;
}

interface TeamActivityFeedProps {
  clientId: string;
}

export function TeamActivityFeed({ clientId }: TeamActivityFeedProps) {
  const [activities, setActivities] = useState<TeamActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    // Fetch initial activities
    fetchActivities();

    // Set up real-time subscription
    const subscription = supabase
      .channel(`team_activity_${clientId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'team_activities',
        filter: `client_id=eq.${clientId}`
      }, handleActivityUpdate)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [clientId]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('team_activities')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Failed to fetch team activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivityUpdate = (payload: any) => {
    if (payload.eventType === 'INSERT') {
      setActivities(prev => [payload.new, ...prev.slice(0, 9)]);
    } else if (payload.eventType === 'UPDATE') {
      setActivities(prev => prev.map(activity => 
        activity.id === payload.new.id ? payload.new : activity
      ));
    } else if (payload.eventType === 'DELETE') {
      setActivities(prev => prev.filter(activity => activity.id !== payload.old.id));
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-slate-700 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No team activity yet</p>
        <p className="text-sm mt-1">Activities will appear here as your team works</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-48 overflow-y-auto">
      {activities.map(activity => (
        <TeamActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  );
}

interface TeamActivityItemProps {
  activity: TeamActivity;
}

function TeamActivityItem({ activity }: TeamActivityItemProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ai_agent': return <Bot className="h-4 w-4 text-green-400" />;
      case 'designer': return <Palette className="h-4 w-4 text-purple-400" />;
      case 'developer': return <Code className="h-4 w-4 text-blue-400" />;
      case 'pm': return <UserCheck className="h-4 w-4 text-orange-400" />;
      default: return <User className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return 'just now';
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors">
      <div className="flex-shrink-0">
        {getActivityIcon(activity.actor_type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-white">
          <span className="font-medium">{activity.actor_name}</span>
          <span className="text-gray-300 ml-1">{activity.action}</span>
        </p>
        <p className="text-xs text-gray-400 truncate">{activity.description}</p>
      </div>
      <div className="flex-shrink-0 text-xs text-gray-500">
        {formatTimeAgo(activity.created_at)}
      </div>
    </div>
  );
}