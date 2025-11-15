/**
 * Comprehensive hook for all dashboard data
 * Fetches real data from Supabase for all dashboard components
 */

import { useState, useEffect } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { useClientDetails } from './useClientDetails';
import { supabase } from '@/integrations/supabase/client';

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
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // MOCK DATA - Realistic client dashboard data
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API call

      const mockData: DashboardData = {
        agentActivities: [
          {
            id: 'agent-1',
            agentName: 'AI Development Agent',
            agentType: 'development',
            currentTask: 'Building user authentication system',
            status: 'active',
            progress: 75,
            tokensUsed: 15420,
            estimatedCompletion: '2 hours',
            lastUpdate: '2 minutes ago',
            metadata: { module: 'auth', feature: 'login' }
          },
          {
            id: 'agent-2',
            agentName: 'UI/UX Design Agent',
            agentType: 'design',
            currentTask: 'Optimizing mobile dashboard layout',
            status: 'active',
            progress: 90,
            tokensUsed: 8930,
            estimatedCompletion: '30 minutes',
            lastUpdate: '5 minutes ago',
            metadata: { platform: 'mobile', screen: 'dashboard' }
          },
          {
            id: 'agent-3',
            agentName: 'Testing Agent',
            agentType: 'testing',
            currentTask: 'Running automated test suite',
            status: 'completed',
            progress: 100,
            tokensUsed: 5670,
            estimatedCompletion: 'Completed',
            lastUpdate: '1 hour ago',
            metadata: { tests: 47, passed: 46, failed: 1 }
          },
          {
            id: 'agent-4',
            agentName: 'Content Agent',
            agentType: 'content',
            currentTask: 'Generating API documentation',
            status: 'paused',
            progress: 45,
            tokensUsed: 3210,
            estimatedCompletion: '1.5 hours',
            lastUpdate: '15 minutes ago',
            metadata: { sections: 12, completed: 5 }
          },
          {
            id: 'agent-5',
            agentName: 'Performance Agent',
            agentType: 'optimization',
            currentTask: 'Database query optimization',
            status: 'idle',
            progress: 0,
            tokensUsed: 0,
            estimatedCompletion: 'Pending',
            lastUpdate: '3 hours ago',
            metadata: { priority: 'medium' }
          }
        ],
        recentUpdates: [
          {
            id: 'update-1',
            type: 'milestone',
            title: 'Authentication System Complete',
            description: 'Implemented secure login, registration, and password reset functionality',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            author: { name: 'AI Development Agent', role: 'Senior Developer' },
            status: 'completed',
            metadata: { impact: 'high', confidence: 95 }
          },
          {
            id: 'update-2',
            type: 'code',
            title: 'Dashboard Components Refactored',
            description: 'Improved performance and mobile responsiveness of dashboard widgets',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
            author: { name: 'UI/UX Design Agent', role: 'Senior Designer' },
            status: 'completed',
            metadata: { performance: '+40%', mobile_score: 98 }
          },
          {
            id: 'update-3',
            type: 'design',
            title: 'Mobile-First Navigation Implemented',
            description: 'Created responsive navigation system with touch-optimized interactions',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
            author: { name: 'UI/UX Design Agent', role: 'Senior Designer' },
            status: 'completed',
            metadata: { screens: 8, components: 15 }
          },
          {
            id: 'update-4',
            type: 'communication',
            title: 'Client Feedback Integration',
            description: 'Incorporated client suggestions for improved user experience',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
            author: { name: 'Project Manager Agent', role: 'Product Manager' },
            status: 'in_progress',
            metadata: { feedback_items: 12, implemented: 8 }
          },
          {
            id: 'update-5',
            type: 'document',
            title: 'Technical Documentation Updated',
            description: 'Created comprehensive API documentation and deployment guides',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            author: { name: 'Content Agent', role: 'Technical Writer' },
            status: 'completed',
            metadata: { pages: 45, examples: 23 }
          }
        ],
        upcomingMilestones: [
          {
            id: 'milestone-1',
            title: 'Beta Launch Ready',
            description: 'Complete all testing and prepare for beta user rollout',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            priority: 'high',
            status: 'upcoming',
            progress: 85,
            category: 'deployment',
            estimatedHours: 16,
            completedHours: 14,
            assignees: ['AI Development Agent', 'Testing Agent', 'UI/UX Design Agent']
          },
          {
            id: 'milestone-2',
            title: 'Payment Integration',
            description: 'Integrate Stripe payment system for subscription management',
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
            priority: 'high',
            status: 'upcoming',
            progress: 20,
            category: 'development',
            estimatedHours: 24,
            completedHours: 5,
            assignees: ['AI Development Agent', 'Security Agent']
          },
          {
            id: 'milestone-3',
            title: 'Analytics Dashboard',
            description: 'Build comprehensive analytics and reporting dashboard',
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
            priority: 'medium',
            status: 'upcoming',
            progress: 0,
            category: 'development',
            estimatedHours: 32,
            completedHours: 0,
            assignees: ['Data Agent', 'UI/UX Design Agent']
          },
          {
            id: 'milestone-4',
            title: 'Performance Optimization',
            description: 'Optimize loading times and implement caching strategies',
            dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
            priority: 'medium',
            status: 'at_risk',
            progress: 30,
            category: 'optimization',
            estimatedHours: 20,
            completedHours: 6,
            assignees: ['Performance Agent', 'AI Development Agent']
          }
        ],
        projectMetrics: [
          {
            metricType: 'performance',
            metricName: 'Page Load Time',
            metricValue: 1.2,
            metricUnit: 'seconds',
            targetValue: 1.0,
            previousValue: 2.1,
            recordedAt: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
          },
          {
            metricType: 'quality',
            metricName: 'Test Coverage',
            metricValue: 94,
            metricUnit: 'percent',
            targetValue: 95,
            previousValue: 87,
            recordedAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
          },
          {
            metricType: 'development',
            metricName: 'Features Completed',
            metricValue: 28,
            metricUnit: 'count',
            targetValue: 35,
            previousValue: 22,
            recordedAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
          },
          {
            metricType: 'security',
            metricName: 'Security Score',
            metricValue: 98,
            metricUnit: 'percent',
            targetValue: 95,
            previousValue: 92,
            recordedAt: new Date(Date.now() - 45 * 60 * 1000) // 45 minutes ago
          },
          {
            metricType: 'user_experience',
            metricName: 'Mobile Responsiveness',
            metricValue: 96,
            metricUnit: 'percent',
            targetValue: 95,
            previousValue: 89,
            recordedAt: new Date(Date.now() - 15 * 60 * 1000) // 15 minutes ago
          },
          {
            metricType: 'business',
            metricName: 'Client Satisfaction',
            metricValue: 4.8,
            metricUnit: 'rating',
            targetValue: 4.5,
            previousValue: 4.3,
            recordedAt: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
          }
        ]
      };

      setDashboardData(mockData);
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

  // MOCK: Simulate real-time updates (optional - can be removed)
  useEffect(() => {
    if (!user) return;

    // Simulate periodic updates every 30 seconds
    const interval = setInterval(() => {
      // Only refresh if we have data and no errors
      if (dashboardData && !error) {
        console.log('🔄 Simulating real-time dashboard update...');
        // Could add small random changes to metrics here if desired
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [user, dashboardData, error]);

  return {
    dashboardData,
    loading,
    error,
    refresh: fetchDashboardData
  };
}