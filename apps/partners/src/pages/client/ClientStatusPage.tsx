
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Timeline } from '@/components/ui/timeline';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { ClientData } from '@/types/client.types';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  Users,
  Target,
  TrendingUp,
  Activity,
  Play,
  Pause,
  Timer
} from 'lucide-react';
import { ClientDashboardLayout } from "@/components/client/ClientDashboardLayout";
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ClientStatusPage() {
  const [client, setClient] = useState<ClientData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Use RPC to fetch client ID safely
        const { data: clientIdData, error: clientIdError } = await supabase.rpc('get_client_by_user_id', { user_uuid: user.id });

        if (clientIdError || !clientIdData || clientIdData.length === 0) return;
        const clientId = clientIdData[0].client_id;

        const { data, error } = await supabase
          .from('client_onboarding')
          .select('*')
          .eq('id', clientId)
          .maybeSingle();

        if (error) throw error;
        if (data) setClient(data as unknown as ClientData);
      } catch (error) {
        console.error('Error fetching client data:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load client data",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClientData();
  }, [toast]);

  const calculateProgress = () => {
    if (!client?.completed_steps || !client?.total_steps) return 0;
    return (client.completed_steps.length / client.total_steps) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in_progress': return 'bg-siso-orange/20 text-siso-orange border-siso-orange/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  // Mock project status data - in production, this would come from the database
  const projectStats = {
    totalTasks: 47,
    completedTasks: 32,
    activeTasks: 12,
    blockedTasks: 3,
    teamMembers: 6,
    daysRemaining: 23,
    budget: {
      allocated: 45000,
      spent: 31200,
      remaining: 13800
    },
    milestones: {
      completed: 4,
      total: 7
    }
  };

  const recentActivity = [
    {
      id: '1',
      type: 'milestone',
      title: 'API Development Completed',
      description: 'All backend API endpoints have been developed and tested',
      timestamp: '2 hours ago',
      status: 'completed',
      agent: 'Alex Rivera'
    },
    {
      id: '2',
      type: 'task',
      title: 'Mobile UI Testing',
      description: 'Running comprehensive tests on mobile interface components',
      timestamp: '4 hours ago',
      status: 'in_progress',
      agent: 'Casey Williams'
    },
    {
      id: '3',
      type: 'update',
      title: 'Database Optimization',
      description: 'Performance improvements implemented, 40% faster query times',
      timestamp: '1 day ago',
      status: 'completed',
      agent: 'Sam Parker'
    },
    {
      id: '4',
      type: 'issue',
      title: 'Third-party Integration Delay',
      description: 'Waiting for API access from payment provider',
      timestamp: '2 days ago',
      status: 'blocked',
      agent: 'Taylor Kim'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'milestone': return CheckCircle;
      case 'task': return Activity;
      case 'update': return TrendingUp;
      case 'issue': return AlertCircle;
      default: return Clock;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'in_progress': return 'text-blue-400';
      case 'blocked': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const timelineData = [
    {
      title: "Project Kickoff",
      content: (
        <Card className="p-4 bg-siso-bg-secondary border-siso-border">
          <h3 className="font-medium mb-2 text-siso-text">Project Initialization</h3>
          <p className="text-sm text-siso-text-muted">Project requirements and goals established</p>
          <div className="flex items-center gap-2 mt-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-xs text-siso-text-muted">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </Card>
      ),
    },
    {
      title: "Development",
      content: (
        <Card className="p-4 bg-siso-bg-secondary border-siso-border">
          <h3 className="font-medium mb-2 text-siso-text">Development In Progress</h3>
          <p className="text-sm text-siso-text-muted">Building core functionalities and features</p>
          <div className="flex items-center gap-2 mt-2">
            <Play className="h-4 w-4 text-siso-orange" />
            <span className="text-xs text-siso-text-muted">In Progress - 68% Complete</span>
          </div>
        </Card>
      ),
    },
    {
      title: "Testing",
      content: (
        <Card className="p-4 bg-siso-bg-secondary border-siso-border">
          <h3 className="font-medium mb-2 text-siso-text">Quality Assurance</h3>
          <p className="text-sm text-siso-text-muted">Testing and bug fixing</p>
          <div className="flex items-center gap-2 mt-2">
            <Timer className="h-4 w-4 text-yellow-400" />
            <span className="text-xs text-siso-text-muted">Starting Next Week</span>
          </div>
        </Card>
      ),
    },
    {
      title: "Launch",
      content: (
        <Card className="p-4 bg-siso-bg-secondary border-siso-border">
          <h3 className="font-medium mb-2 text-siso-text">Project Deployment</h3>
          <p className="text-sm text-siso-text-muted">Final launch and deployment</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-siso-text-muted">Planned for September</span>
          </div>
        </Card>
      ),
    },
  ];

  if (loading) {
    return (
      <ClientDashboardLayout>
        <div>
          <Skeleton className="h-10 w-48 mb-6" />
          <Skeleton className="h-64 w-full mb-6 rounded-lg" />
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
      </ClientDashboardLayout>
    );
  }

  return (
    <ClientDashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-siso-text">Project Status Overview</h1>
        </motion.div>
        
        {/* Project Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="bg-siso-bg-secondary border-siso-border">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl text-siso-text">
                    {client?.project_name || "Your Project"}
                  </CardTitle>
                  <p className="text-siso-text-muted mt-1">{client?.company_name}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Badge variant="outline" className={cn("text-sm font-medium", getStatusColor(client?.status || 'in_progress'))}>
                    <Activity className="h-3 w-3 mr-2" />
                    {client?.status?.toUpperCase() || "IN PROGRESS"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <h3 className="font-medium text-siso-text">Overall Progress</h3>
                  <span className="text-sm text-siso-text-muted">68%</span>
                </div>
                <Progress value={68} className="h-3" />
                <p className="text-xs text-siso-text-muted mt-2">32 of 47 tasks completed</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{projectStats.completedTasks}</div>
                  <div className="text-xs text-siso-text-muted">Completed Tasks</div>
                </div>
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{projectStats.activeTasks}</div>
                  <div className="text-xs text-siso-text-muted">Active Tasks</div>
                </div>
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-2xl font-bold text-siso-orange">{projectStats.teamMembers}</div>
                  <div className="text-xs text-siso-text-muted">Team Members</div>
                </div>
                <div className="text-center p-3 bg-siso-bg rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{projectStats.daysRemaining}</div>
                  <div className="text-xs text-siso-text-muted">Days Remaining</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-siso-text">
                  <Target className="h-5 w-5 text-green-400" />
                  Budget Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-siso-text-muted">Allocated</span>
                    <span className="font-medium text-siso-text">${projectStats.budget.allocated.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-siso-text-muted">Spent</span>
                    <span className="font-medium text-siso-orange">${projectStats.budget.spent.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-siso-text-muted">Remaining</span>
                    <span className="font-medium text-green-400">${projectStats.budget.remaining.toLocaleString()}</span>
                  </div>
                  <Progress value={(projectStats.budget.spent / projectStats.budget.allocated) * 100} className="h-2" />
                  <p className="text-xs text-siso-text-muted">
                    {Math.round((projectStats.budget.spent / projectStats.budget.allocated) * 100)}% of budget utilized
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Milestone Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-siso-text">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Milestone Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-siso-orange">
                      {projectStats.milestones.completed}/{projectStats.milestones.total}
                    </div>
                    <p className="text-sm text-siso-text-muted">Milestones Completed</p>
                  </div>
                  <Progress 
                    value={(projectStats.milestones.completed / projectStats.milestones.total) * 100} 
                    className="h-3" 
                  />
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-green-400">
                        {Math.round((projectStats.milestones.completed / projectStats.milestones.total) * 100)}%
                      </div>
                      <p className="text-xs text-siso-text-muted">Complete</p>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-yellow-400">
                        {projectStats.milestones.total - projectStats.milestones.completed}
                      </div>
                      <p className="text-xs text-siso-text-muted">Remaining</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-siso-bg-secondary border-siso-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-siso-text">
                <Activity className="h-5 w-5 text-siso-orange" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-3 bg-siso-bg rounded-lg"
                    >
                      <div className={cn("p-2 rounded-lg bg-siso-bg-secondary", getActivityColor(activity.status))}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-siso-text">{activity.title}</h4>
                        <p className="text-sm text-siso-text-muted">{activity.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-xs text-siso-text-muted">{activity.timestamp}</span>
                          <span className="text-xs text-siso-text-muted">by {activity.agent}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(activity.status))}>
                        {activity.status.replace('_', ' ')}
                      </Badge>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Project Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="bg-siso-bg-secondary border-siso-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-siso-text">
                <Clock className="h-5 w-5 text-blue-400" />
                Project Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Timeline data={timelineData} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ClientDashboardLayout>
  );
}
