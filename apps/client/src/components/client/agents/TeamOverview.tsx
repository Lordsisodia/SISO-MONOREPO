import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Target, 
  Clock, 
  TrendingUp,
  Zap,
  CheckCircle,
  GitBranch,
  Calendar,
  Award,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

export function TeamOverview() {
  // Mock team data - in production, this would come from the database
  const teamStructure = [
    {
      id: '1',
      name: 'Core Development Team',
      description: 'Frontend and backend development',
      members: [
        { name: 'Alex Rivera', role: 'Lead Dev', avatar: '/avatars/alex.png', status: 'active' },
        { name: 'Sam Parker', role: 'Backend', avatar: '/avatars/sam.png', status: 'active' },
        { name: 'Taylor Kim', role: 'DevOps', avatar: '/avatars/taylor.png', status: 'active' }
      ],
      currentPhase: 'Development Sprint 3',
      progress: 68,
      tasksActive: 8,
      tasksCompleted: 45
    },
    {
      id: '2',
      name: 'Design & UX Team',
      description: 'User experience and visual design',
      members: [
        { name: 'Jordan Chen', role: 'UI/UX', avatar: '/avatars/jordan.png', status: 'active' },
        { name: 'Morgan Davis', role: 'Content', avatar: '/avatars/morgan.png', status: 'standby' }
      ],
      currentPhase: 'Design System Refinement',
      progress: 85,
      tasksActive: 3,
      tasksCompleted: 28
    },
    {
      id: '3',
      name: 'Quality Assurance Team',
      description: 'Testing and quality control',
      members: [
        { name: 'Casey Williams', role: 'QA Lead', avatar: '/avatars/casey.png', status: 'active' }
      ],
      currentPhase: 'Integration Testing',
      progress: 72,
      tasksActive: 5,
      tasksCompleted: 22
    }
  ];

  const projectMetrics = {
    overallProgress: 71,
    sprintVelocity: 23,
    codeQuality: 94,
    teamEfficiency: 92,
    estimatedCompletion: 'March 15, 2024',
    daysRemaining: 28
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'ring-green-400';
      case 'standby':
        return 'ring-yellow-400';
      default:
        return 'ring-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <Card className="bg-siso-bg-secondary border-siso-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-siso-text">
            <Target className="h-5 w-5 text-siso-orange" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Overall Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-siso-text">Overall Progress</span>
                <span className="text-sm text-siso-text-muted">{projectMetrics.overallProgress}%</span>
              </div>
              <Progress value={projectMetrics.overallProgress} className="h-3" />
              <div className="flex items-center gap-2 text-xs text-siso-text-muted">
                <Calendar className="h-3 w-3" />
                <span>Est. completion: {projectMetrics.estimatedCompletion}</span>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-siso-bg rounded-lg">
                <div className="text-lg font-bold text-blue-400">{projectMetrics.sprintVelocity}</div>
                <div className="text-xs text-siso-text-muted">Sprint Velocity</div>
              </div>
              <div className="text-center p-3 bg-siso-bg rounded-lg">
                <div className="text-lg font-bold text-green-400">{projectMetrics.codeQuality}%</div>
                <div className="text-xs text-siso-text-muted">Code Quality</div>
              </div>
            </div>

            {/* Days Remaining */}
            <div className="flex items-center justify-center p-6 bg-siso-orange/10 border border-siso-orange/30 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-siso-orange">{projectMetrics.daysRemaining}</div>
                <div className="text-sm text-siso-text-muted">Days Remaining</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {teamStructure.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-siso-bg-secondary border-siso-border h-full">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-siso-text">{team.name}</CardTitle>
                    <p className="text-sm text-siso-text-muted mt-1">{team.description}</p>
                  </div>
                  <Badge variant="outline" className="bg-siso-orange/20 text-siso-orange border-siso-orange/30">
                    {team.members.length} members
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Members */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="h-4 w-4 text-siso-text-muted" />
                    <span className="text-sm font-medium text-siso-text">Team Members</span>
                  </div>
                  <div className="flex -space-x-2">
                    {team.members.map((member, idx) => (
                      <div key={idx} className="relative group">
                        <Avatar className={`h-8 w-8 border-2 border-siso-bg ring-2 ${getStatusColor(member.status)}`}>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-siso-bg-tertiary text-siso-text text-xs">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-siso-bg-tertiary border border-siso-border rounded text-xs text-siso-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {member.name} - {member.role}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Phase */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="h-4 w-4 text-siso-text-muted" />
                    <span className="text-sm font-medium text-siso-text">Current Phase</span>
                  </div>
                  <p className="text-sm text-siso-text-muted">{team.currentPhase}</p>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-siso-text">Team Progress</span>
                    <span className="text-sm text-siso-text-muted">{team.progress}%</span>
                  </div>
                  <Progress value={team.progress} className="h-2" />
                </div>

                {/* Task Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-siso-bg rounded">
                    <div className="text-sm font-semibold text-siso-orange">{team.tasksActive}</div>
                    <div className="text-xs text-siso-text-muted">Active Tasks</div>
                  </div>
                  <div className="text-center p-2 bg-siso-bg rounded">
                    <div className="text-sm font-semibold text-green-400">{team.tasksCompleted}</div>
                    <div className="text-xs text-siso-text-muted">Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Team Performance */}
      <Card className="bg-siso-bg-secondary border-siso-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-siso-text">
            <Award className="h-5 w-5 text-yellow-400" />
            Team Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400">{projectMetrics.teamEfficiency}%</div>
              <div className="text-sm text-siso-text-muted">Team Efficiency</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">127</div>
              <div className="text-sm text-siso-text-muted">Total Tasks</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Clock className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-400">342h</div>
              <div className="text-sm text-siso-text-muted">Hours Worked</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-siso-orange/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-siso-orange" />
              </div>
              <div className="text-2xl font-bold text-siso-orange">95</div>
              <div className="text-sm text-siso-text-muted">Completed Tasks</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}