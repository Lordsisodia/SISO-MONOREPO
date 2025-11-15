import React from 'react';
import { StatCard } from './StatCard';
import { 
  FolderOpen, 
  PoundSterling, 
  CheckSquare, 
  Users 
} from 'lucide-react';
import { useMainUserProject } from '@/hooks/useUserProjects';
import { useRealTasks } from '@/hooks/useRealTasks';
import { useClientsList } from '@/hooks/client';
import { Skeleton } from '@/components/ui/skeleton';
import { useSelectedProject } from '@/hooks/useSelectedProject';

export function StatsRow() {
  const { projectCount, loading: projectLoading } = useMainUserProject();
  const { remainingTasks, completedTasks, loading: tasksLoading } = useRealTasks();
  const { clients, loading: clientsLoading } = useClientsList({ limit: 100 });
  const { project: selectedProject } = useSelectedProject();

  // Calculate real metrics
  const activeClients = clients?.filter(client => client.status === 'active').length || 0;
  const totalClients = clients?.length || 0;
  
  // Calculate completion rate
  const totalTasks = (remainingTasks || 0) + (completedTasks || 0);
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Budget/Revenue calculation (mock for now, would come from financial API)
  const monthlyBudget = selectedProject?.budget || 45000;
  const lastMonthBudget = 35000;
  const budgetTrend = Math.round(((monthlyBudget - lastMonthBudget) / lastMonthBudget) * 100);

  // Loading state
  if (projectLoading || tasksLoading || clientsLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 rounded-lg bg-siso-bg-secondary border border-siso-border">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-8 rounded" />
              </div>
              <Skeleton className="h-8 w-16" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Active Projects"
        value={projectCount || 0}
        trend={projectCount > 0 ? 15 : undefined}
        icon={FolderOpen}
        color="blue"
        subtitle={projectCount === 1 ? "project" : "projects"}
        isLive={true}
        clickPath="/projects"
        miniChartData={[
          { value: 3 }, { value: 4 }, { value: 3 }, 
          { value: 5 }, { value: projectCount || 0 }
        ]}
      />
      
      <StatCard
        title="Monthly Budget"
        value={`£${monthlyBudget.toLocaleString()}`}
        trend={budgetTrend}
        icon={PoundSterling}
        color="green"
        subtitle="vs last month"
        clickPath="/financials"
        miniChartData={[
          { value: 30000 }, { value: 32000 }, { value: 35000 }, 
          { value: 38000 }, { value: monthlyBudget }
        ]}
      />
      
      <StatCard
        title="Task Completion"
        value={`${completionRate}%`}
        trend={completionRate > 70 ? completionRate - 70 : undefined}
        icon={CheckSquare}
        color="orange"
        subtitle={`${completedTasks || 0} of ${totalTasks} completed`}
        isLive={true}
        clickPath="/tasks"
        miniChartData={[
          { value: 60 }, { value: 65 }, { value: 70 }, 
          { value: 75 }, { value: completionRate }
        ]}
      />
      
      <StatCard
        title="Team Members"
        value={activeClients}
        trend={totalClients > 0 ? Math.round((activeClients / totalClients) * 100) : undefined}
        icon={Users}
        color="purple"
        subtitle={`${totalClients} total members`}
        clickPath="/team"
        miniChartData={[
          { value: totalClients - 4 }, { value: totalClients - 3 }, 
          { value: totalClients - 2 }, { value: totalClients - 1 }, 
          { value: activeClients }
        ]}
      />
    </div>
  );
} 