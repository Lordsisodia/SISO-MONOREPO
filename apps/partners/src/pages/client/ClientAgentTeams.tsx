import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, Bot, Activity, Trophy, Clock, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { motion } from 'framer-motion';
import { TeamOverview } from '@/components/client/agents/TeamOverview';
import { AgentCard } from '@/components/client/agents/AgentCard';
import { CompletedWork } from '@/components/client/agents/CompletedWork';
import { LiveActivity } from '@/components/client/agents/LiveActivity';

export default function ClientAgentTeams() {
  const navigate = useNavigate();
  const { user } = useAuthSession();
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mark agent teams as viewed
    if (user) {
      const progress = JSON.parse(localStorage.getItem(`dashboard_progress_${user.id}`) || '{}');
      if (!progress.hasViewedAgentTeams) {
        progress.hasViewedAgentTeams = true;
        localStorage.setItem(`dashboard_progress_${user.id}`, JSON.stringify(progress));
      }
    }
  }, [user]);

  // Mock agent team data - in production, this would come from the database
  const teamStats = {
    totalAgents: 8,
    activeAgents: 5,
    completedTasks: 127,
    currentSprint: 'Week 3 - Development Phase',
    efficiency: 94,
    hoursThisWeek: 142
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-siso-text-muted hover:text-siso-text">
            <Link to="/client-dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-siso-bg-alt border-siso-border">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl text-siso-text-bold flex items-center gap-3">
                      <div className="p-3 bg-siso-orange/20 rounded-lg">
                        <Users className="w-8 h-8 text-siso-orange" />
                      </div>
                      Your AI Agent Teams
                    </CardTitle>
                    <CardDescription className="text-siso-text-muted mt-2">
                      Meet the specialized AI agents working on your project
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <Activity className="w-3 h-3 mr-1" />
                    {teamStats.activeAgents} Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-siso-bg rounded-lg">
                    <div className="text-2xl font-bold text-siso-orange">{teamStats.totalAgents}</div>
                    <div className="text-sm text-siso-text-muted">Total Agents</div>
                  </div>
                  <div className="text-center p-4 bg-siso-bg rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{teamStats.completedTasks}</div>
                    <div className="text-sm text-siso-text-muted">Tasks Completed</div>
                  </div>
                  <div className="text-center p-4 bg-siso-bg rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{teamStats.efficiency}%</div>
                    <div className="text-sm text-siso-text-muted">Efficiency Rate</div>
                  </div>
                  <div className="text-center p-4 bg-siso-bg rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{teamStats.hoursThisWeek}h</div>
                    <div className="text-sm text-siso-text-muted">This Week</div>
                  </div>
                </div>

                {/* Current Sprint */}
                <div className="mt-6 p-4 bg-siso-orange/10 border border-siso-orange/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-siso-orange" />
                    <span className="font-semibold text-siso-text">Current Sprint</span>
                  </div>
                  <p className="text-siso-text-muted">{teamStats.currentSprint}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-siso-bg-secondary">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Team Overview</span>
              </TabsTrigger>
              <TabsTrigger value="agents" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline">Agent Profiles</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Live Activity</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Completed Work</span>
              </TabsTrigger>
            </TabsList>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <TabsContent value="overview" className="mt-6">
                <TeamOverview />
              </TabsContent>

              <TabsContent value="agents" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AgentCard 
                    agent={{
                      id: '1',
                      name: 'Alex Rivera',
                      role: 'Lead Development Agent',
                      specialization: 'Full-Stack Development',
                      status: 'active',
                      efficiency: 96,
                      tasksCompleted: 23,
                      currentTask: 'Database optimization',
                      avatar: '/avatars/alex.png',
                      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
                      joinedProject: '2024-01-15'
                    }}
                  />
                  <AgentCard 
                    agent={{
                      id: '2',
                      name: 'Jordan Chen',
                      role: 'UI/UX Design Agent',
                      specialization: 'User Experience Design',
                      status: 'active',
                      efficiency: 92,
                      tasksCompleted: 18,
                      currentTask: 'Mobile responsive design',
                      avatar: '/avatars/jordan.png',
                      skills: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
                      joinedProject: '2024-01-20'
                    }}
                  />
                  <AgentCard 
                    agent={{
                      id: '3',
                      name: 'Sam Parker',
                      role: 'Backend Architecture Agent',
                      specialization: 'System Architecture',
                      status: 'active',
                      efficiency: 98,
                      tasksCompleted: 31,
                      currentTask: 'API security implementation',
                      avatar: '/avatars/sam.png',
                      skills: ['Microservices', 'AWS', 'Security', 'Performance'],
                      joinedProject: '2024-01-10'
                    }}
                  />
                  <AgentCard 
                    agent={{
                      id: '4',
                      name: 'Casey Williams',
                      role: 'QA Testing Agent',
                      specialization: 'Quality Assurance',
                      status: 'active',
                      efficiency: 94,
                      tasksCompleted: 19,
                      currentTask: 'Integration testing',
                      avatar: '/avatars/casey.png',
                      skills: ['Automated Testing', 'Selenium', 'Jest', 'Cypress'],
                      joinedProject: '2024-01-25'
                    }}
                  />
                  <AgentCard 
                    agent={{
                      id: '5',
                      name: 'Taylor Kim',
                      role: 'DevOps Agent',
                      specialization: 'Infrastructure & Deployment',
                      status: 'active',
                      efficiency: 91,
                      tasksCompleted: 15,
                      currentTask: 'CI/CD pipeline setup',
                      avatar: '/avatars/taylor.png',
                      skills: ['Docker', 'Kubernetes', 'Jenkins', 'Monitoring'],
                      joinedProject: '2024-02-01'
                    }}
                  />
                  <AgentCard 
                    agent={{
                      id: '6',
                      name: 'Morgan Davis',
                      role: 'Content Strategy Agent',
                      specialization: 'Content & Documentation',
                      status: 'standby',
                      efficiency: 89,
                      tasksCompleted: 12,
                      currentTask: 'Documentation updates',
                      avatar: '/avatars/morgan.png',
                      skills: ['Technical Writing', 'Content Strategy', 'SEO', 'Documentation'],
                      joinedProject: '2024-02-05'
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <LiveActivity />
              </TabsContent>

              <TabsContent value="completed" className="mt-6">
                <CompletedWork />
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}