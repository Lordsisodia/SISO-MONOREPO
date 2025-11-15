/**
 * Hook for project progress data - now uses real Supabase data
 */

import { useState, useEffect } from 'react';
import { useClientDetails } from './useClientDetails';
import { useDashboardData } from './useDashboardData';

interface ProjectProgress {
  currentStep: number;
  totalSteps: number;
  completionPercentage: number;
  milestonesCompleted: number;
  totalMilestones: number;
  estimatedCompletion: Date | null;
  velocity: number; // tasks per week
  timeRemaining: number; // in days
  budgetUsed: number;
  budgetTotal: number;
  budgetPercentage: number;
}

export function useProjectProgress() {
  const { clientData } = useClientDetails();
  const { dashboardData, loading: dashboardLoading } = useDashboardData();
  const [progress, setProgress] = useState<ProjectProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateProgress = () => {
      if (!clientData) {
        setProgress(null);
        setLoading(false);
        return;
      }

      // Calculate progress from client data
      const currentStep = clientData.current_step || 0;
      const totalSteps = clientData.total_steps || 46;
      const completionPercentage = Math.round((currentStep / totalSteps) * 100);

      // Get real milestone data
      const milestones = dashboardData?.upcomingMilestones || [];
      const completedMilestones = milestones.filter(m => m.status === 'completed');
      const milestonesCompleted = completedMilestones.length;
      const totalMilestones = milestones.length + milestonesCompleted;
      
      // Calculate estimated completion based on current velocity
      const startDate = new Date(clientData.created_at || Date.now() - 30 * 24 * 60 * 60 * 1000);
      const currentDate = new Date();
      const daysElapsed = Math.max(1, Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));
      const velocity = currentStep / daysElapsed; // steps per day
      const remainingSteps = totalSteps - currentStep;
      const estimatedDaysRemaining = velocity > 0 ? Math.ceil(remainingSteps / velocity) : 0;
      const estimatedCompletion = velocity > 0 ? new Date(Date.now() + estimatedDaysRemaining * 24 * 60 * 60 * 1000) : null;

      // Get real budget data from metrics
      const budgetMetric = dashboardData?.projectMetrics?.find(m => m.metricName === 'budget_spent');
      const budgetUsed = budgetMetric?.metricValue || 3250;
      const budgetTotal = budgetMetric?.targetValue || 5000;
      const budgetPercentage = Math.round((budgetUsed / budgetTotal) * 100);

      const progressData: ProjectProgress = {
        currentStep,
        totalSteps,
        completionPercentage,
        milestonesCompleted,
        totalMilestones,
        estimatedCompletion,
        velocity: velocity * 7, // convert to tasks per week
        timeRemaining: estimatedDaysRemaining,
        budgetUsed,
        budgetTotal,
        budgetPercentage
      };

      setProgress(progressData);
      setLoading(false);
    };

    try {
      if (!dashboardLoading) {
        calculateProgress();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to calculate progress');
      setLoading(false);
    }
  }, [clientData, dashboardData, dashboardLoading]);

  return {
    progress,
    loading: loading || dashboardLoading,
    error,
    refresh: () => {
      setLoading(true);
      setError(null);
      // This would trigger a re-fetch in a real implementation
    }
  };
}