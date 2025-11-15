import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Users, Bot, Zap, Brain, Code, Palette, Shield, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'working';
  currentTask: string;
  progress: number;
  icon: any;
  color: string;
  tasksCompleted: number;
  efficiency: number;
}

const agents: Agent[] = [
  {
    id: 'design-agent',
    name: 'Design Agent',
    role: 'UI/UX Specialist',
    status: 'working',
    currentTask: 'Creating responsive layouts for mobile devices',
    progress: 65,
    icon: Palette,
    color: 'text-siso-orange',
    tasksCompleted: 23,
    efficiency: 94
  },
  {
    id: 'code-agent',
    name: 'Code Agent',
    role: 'Full-Stack Developer',
    status: 'active',
    currentTask: 'Implementing authentication system',
    progress: 42,
    icon: Code,
    color: 'text-siso-red',
    tasksCompleted: 18,
    efficiency: 89
  },
  {
    id: 'ai-agent',
    name: 'AI Agent',
    role: 'Machine Learning Engineer',
    status: 'working',
    currentTask: 'Training recommendation model',
    progress: 78,
    icon: Brain,
    color: 'text-siso-orange',
    tasksCompleted: 12,
    efficiency: 91
  },
  {
    id: 'security-agent',
    name: 'Security Agent',
    role: 'Security Analyst',
    status: 'idle',
    currentTask: 'Awaiting security audit phase',
    progress: 0,
    icon: Shield,
    color: 'text-siso-text',
    tasksCompleted: 8,
    efficiency: 97
  }
];

export default function ClientAgentTeamsPage() {
  const [activities, setActivities] = useState<string[]>([]);
  
  // Simulate real-time activity updates
  useEffect(() => {
    const activityMessages = [
      'Design Agent completed color palette optimization',
      'Code Agent pushed new authentication module',
      'AI Agent achieved 92% accuracy on test data',
      'Security Agent identified 0 vulnerabilities',
      'Design Agent started working on dashboard wireframes',
      'Code Agent is refactoring database queries'
    ];

    const interval = setInterval(() => {
      const randomMessage = activityMessages[Math.floor(Math.random() * activityMessages.length)];
      setActivities(prev => [randomMessage, ...prev.slice(0, 4)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working':
        return 'bg-siso-orange/20 text-siso-orange border-siso-orange/40';
      case 'active':
        return 'bg-siso-red/20 text-siso-red border-siso-red/40';
      default:
        return 'bg-siso-border text-siso-text-muted border-siso-border';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'working':
        return 'Working';
      case 'active':
        return 'Active';
      default:
        return 'Idle';
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-siso-text-muted hover:text-siso-text">
            <Link to="/home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <Card className="bg-siso-bg-alt border-siso-border mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-siso-text-bold flex items-center gap-2">
                    <Users className="w-6 h-6 text-siso-orange" />
                    Agent Teams
                  </CardTitle>
                  <CardDescription className="text-siso-text-muted">
                    Your AI agents working in real-time
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-siso-orange rounded-full animate-pulse" />
                  <span className="text-sm text-siso-text-muted">Live</span>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-siso-bg-alt border-siso-border hover:border-siso-border-hover transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-lg bg-siso-bg ${agent.color}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-siso-text-bold">{agent.name}</h3>
                            <p className="text-sm text-siso-text-muted">{agent.role}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(agent.status)}>
                          <Activity className="w-3 h-3 mr-1" />
                          {getStatusText(agent.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm text-siso-text mb-2">{agent.currentTask}</p>
                        {agent.progress > 0 && (
                          <Progress value={agent.progress} className="h-2 bg-siso-border" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-siso-text-bold">{agent.tasksCompleted}</p>
                          <p className="text-xs text-siso-text-muted">Tasks Completed</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-siso-text-bold">{agent.efficiency}%</p>
                          <p className="text-xs text-siso-text-muted">Efficiency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <Card className="bg-siso-bg-alt border-siso-border">
            <CardHeader>
              <CardTitle className="text-lg text-siso-text-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-siso-red" />
                Live Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AnimatePresence>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={`${activity}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-start gap-3 p-3 bg-siso-bg rounded-lg"
                    >
                      <Bot className="w-4 h-4 text-siso-orange mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-siso-text">{activity}</p>
                        <p className="text-xs text-siso-text-muted mt-1">Just now</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activities.length === 0 && (
                  <div className="text-center py-8 text-siso-text-muted">
                    <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Waiting for agent activity...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}