import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Folder, 
  Plus, 
  ArrowRight, 
  Clock, 
  CheckCircle,
  Activity,
  Zap,
  Target,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMainUserProject } from '@/hooks/useUserProjects';
import { cn } from '@/lib/utils';

export function ProjectsHub() {
  const navigate = useNavigate();
  const { project, hasProjects, loading } = useMainUserProject();

  if (loading) {
    return (
      <Card className="bg-siso-bg-alt border-siso-border">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-siso-border rounded w-1/3"></div>
            <div className="h-4 bg-siso-border rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hasProjects) {
    return (
      <Card className="bg-siso-bg-alt border-siso-border">
        <CardHeader>
          <CardTitle className="text-xl text-siso-text-bold flex items-center gap-2">
            <Folder className="w-5 h-5 text-siso-orange" />
            Projects Hub
          </CardTitle>
          <CardDescription className="text-siso-text-muted">
            Your central command center for all projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-siso-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-siso-orange" />
            </div>
            <h3 className="text-lg font-semibold text-siso-text mb-2">
              No Projects Yet
            </h3>
            <p className="text-siso-text-muted mb-6">
              Start your journey by creating your first project
            </p>
            <Button 
              onClick={() => navigate('/projects/new')}
              className="bg-siso-red hover:bg-siso-red/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create First Project
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Mock data for active agents
  const activeAgents = [
    { name: 'Design Agent', task: 'Optimizing color palette', progress: 75 },
    { name: 'Code Agent', task: 'Implementing responsive layout', progress: 45 },
    { name: 'Content Agent', task: 'Generating SEO metadata', progress: 90 },
  ];

  return (
    <Card className="bg-siso-bg-alt border-siso-border">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-siso-text-bold flex items-center gap-2">
              <Folder className="w-5 h-5 text-siso-orange" />
              Projects Hub
            </CardTitle>
            <CardDescription className="text-siso-text-muted">
              Your central command center
            </CardDescription>
          </div>
          <Button 
            size="sm"
            variant="outline"
            onClick={() => navigate('/projects')}
            className="border-siso-border text-siso-text hover:bg-siso-bg"
          >
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Project */}
        {project && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-siso-text">{project.name}</h3>
              <Badge className="bg-siso-orange/20 text-siso-orange border-siso-orange/40">
                <Activity className="w-3 h-3 mr-1" />
                Active
              </Badge>
            </div>
            
            {/* Project Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-siso-text-muted">Overall Progress</span>
                <span className="text-siso-text">65%</span>
              </div>
              <Progress value={65} className="h-2 bg-siso-border" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-siso-orange">12</div>
                <div className="text-xs text-siso-text-muted">Tasks Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-siso-orange">8</div>
                <div className="text-xs text-siso-text-muted">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-siso-red">3</div>
                <div className="text-xs text-siso-text-muted">Days Left</div>
              </div>
            </div>
          </div>
        )}

        {/* AI Agents Activity */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-siso-text flex items-center gap-2">
            <Bot className="w-4 h-4 text-siso-red" />
            AI Agents Working
          </h4>
          <div className="space-y-2">
            {activeAgents.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-siso-bg/50 rounded-lg p-3 border border-siso-border"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-siso-text">{agent.name}</span>
                  <span className="text-xs text-siso-text-muted">{agent.progress}%</span>
                </div>
                <p className="text-xs text-siso-text-muted mb-2">{agent.task}</p>
                <Progress value={agent.progress} className="h-1 bg-siso-border" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button 
            size="sm" 
            className="flex-1 bg-siso-red hover:bg-siso-red/90"
            onClick={() => navigate('/projects/tasks')}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            View Tasks
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            className="flex-1 border-siso-border text-siso-text hover:bg-siso-bg"
            onClick={() => navigate('/projects/timeline')}
          >
            <Clock className="mr-2 h-4 w-4" />
            Timeline
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}