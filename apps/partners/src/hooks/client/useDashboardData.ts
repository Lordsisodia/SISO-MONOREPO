/**
 * Comprehensive hook for all dashboard data
 * Fetches real data from Supabase for all dashboard components
 */

import { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useClientDetails } from './useClientDetails';
import { supabase } from '@/lib/supabase';

interface AgentActivity {
  id: string;
  agentName: string;
  agentType: 'development' | 'design' | 'content' | 'testing' | 'optimization';
  currentTask: string;
  status: 'active' | 'paused' | 'completed' | 'idle';
  progress: number;
  tokensUsed: number;
  estimatedCompletion?: string;
  lastUpdate: string;
  metadata?: any;
}

interface ProjectUpdate {
  id: string;
  type: 'milestone' | 'code' | 'design' | 'communication' | 'document';
  title: string;
  description: string;
  timestamp: Date;
  author: {
    name: string;
    role: string;
  };
  status?: 'completed' | 'in_progress' | 'review';
  metadata?: any;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'at_risk' | 'completed' | 'overdue';
  progress: number;
  category: 'development' | 'design' | 'testing' | 'deployment' | 'review';
  estimatedHours?: number;
  completedHours?: number;
  assignees: string[];
}

interface ProjectMetric {
  metricType: string;
  metricName: string;
  metricValue: number;
  metricUnit?: string;
  targetValue?: number;
  previousValue?: number;
  recordedAt: Date;
}

interface DashboardData {
  agentActivities: AgentActivity[];
  recentUpdates: ProjectUpdate[];
  upcomingMilestones: Milestone[];
  projectMetrics: ProjectMetric[];
}

export function useDashboardData() {
  const { user } = useSupabaseAuth();
  const { clientData } = useClientDetails();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    if (!clientData?.id || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Call the database function to get all dashboard data
      const { data, error: functionError } = await supabase
        .rpc('get_client_dashboard_data', {
          client_uuid: clientData.id
        });

      if (functionError) {
        throw functionError;
      }

      if (data) {
        // Transform the data to match our interfaces
        const transformedData: DashboardData = {
          agentActivities: (data.agent_activities || []).map((activity: any) => ({
            id: activity.id,
            agentName: activity.agent_name,
            agentType: activity.agent_type,
            currentTask: activity.current_task,
            status: activity.status,
            progress: activity.progress,
            tokensUsed: activity.tokens_used,
            estimatedCompletion: activity.estimated_completion,
            lastUpdate: activity.last_update,
            metadata: activity.metadata
          })),
          recentUpdates: (data.recent_updates || []).map((update: any) => ({
            id: update.id,
            type: update.type,
            title: update.title,
            description: update.description,
            timestamp: new Date(update.timestamp),
            author: update.author,
            status: update.status,
            metadata: update.metadata
          })),
          upcomingMilestones: (data.upcoming_milestones || []).map((milestone: any) => ({
            id: milestone.id,
            title: milestone.title,
            description: milestone.description,
            dueDate: new Date(milestone.due_date),
            priority: milestone.priority,
            status: milestone.status,
            progress: milestone.progress,
            category: milestone.category,
            estimatedHours: milestone.estimated_hours,
            completedHours: milestone.completed_hours,
            assignees: milestone.assignees || []
          })),
          projectMetrics: (data.project_metrics || []).map((metric: any) => ({
            metricType: metric.metric_type,
            metricName: metric.metric_name,
            metricValue: metric.metric_value,
            metricUnit: metric.metric_unit,
            targetValue: metric.target_value,
            previousValue: metric.previous_value,
            recordedAt: new Date(metric.recorded_at)
          }))
        };

        setDashboardData(transformedData);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [clientData?.id, user?.id]);

  // Set up real-time subscriptions for live updates
  useEffect(() => {
    if (!clientData?.id) return;

    const subscriptions: any[] = [];

    // Subscribe to agent activities changes
    const agentActivitiesSubscription = supabase
      .channel('agent_activities_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'agent_activities',
        filter: `client_id=eq.${clientData.id}`
      }, () => {
        fetchDashboardData();
      })
      .subscribe();

    // Subscribe to project updates changes
    const projectUpdatesSubscription = supabase
      .channel('project_updates_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'project_updates',
        filter: `client_id=eq.${clientData.id}`
      }, () => {
        fetchDashboardData();
      })
      .subscribe();

    // Subscribe to milestones changes
    const milestonesSubscription = supabase
      .channel('project_milestones_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'project_milestones',
        filter: `client_id=eq.${clientData.id}`
      }, () => {
        fetchDashboardData();
      })
      .subscribe();

    subscriptions.push(
      agentActivitiesSubscription,
      projectUpdatesSubscription,
      milestonesSubscription
    );

    return () => {
      subscriptions.forEach(sub => sub.unsubscribe());
    };
  }, [clientData?.id]);

  return {
    dashboardData,
    loading,
    error,
    refresh: fetchDashboardData
  };
}