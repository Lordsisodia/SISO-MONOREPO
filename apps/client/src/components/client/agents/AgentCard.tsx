import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Bot, 
  Clock, 
  CheckCircle, 
  Activity, 
  Calendar,
  Zap,
  MessageSquare,
  MoreHorizontal,
  Star,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  name: string;
  role: string;
  specialization: string;
  status: 'active' | 'standby' | 'offline';
  efficiency: number;
  tasksCompleted: number;
  currentTask: string;
  avatar?: string;
  skills: string[];
  joinedProject: string;
}

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'standby':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'offline':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Agent['status']) => {
    switch (status) {
      case 'active':
        return <Activity className="w-3 h-3 animate-pulse" />;
      case 'standby':
        return <Clock className="w-3 h-3" />;
      case 'offline':
        return <div className="w-3 h-3 rounded-full bg-gray-400" />;
      default:
        return <div className="w-3 h-3 rounded-full bg-gray-400" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatJoinDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return 'text-green-400';
    if (efficiency >= 90) return 'text-siso-orange';
    if (efficiency >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card 
        className="bg-siso-bg-secondary border-siso-border hover:border-siso-orange/50 transition-all duration-300 cursor-pointer group"
        onClick={onClick}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-siso-border">
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback className="bg-siso-bg text-siso-orange font-semibold">
                    {getInitials(agent.name)}
                  </AvatarFallback>
                </Avatar>
                {/* Status Indicator */}
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-siso-bg flex items-center justify-center",
                  agent.status === 'active' ? 'bg-green-500' : 
                  agent.status === 'standby' ? 'bg-yellow-500' : 'bg-gray-500'
                )}>
                  {agent.status === 'active' && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-siso-text group-hover:text-siso-orange transition-colors">
                  {agent.name}
                </h3>
                <p className="text-sm text-siso-text-muted">{agent.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className={cn("text-xs", getStatusColor(agent.status))}>
                {getStatusIcon(agent.status)}
                <span className="ml-1 capitalize">{agent.status}</span>
              </Badge>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Specialization */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-siso-orange" />
              <span className="text-sm font-medium text-siso-text">Specialization</span>
            </div>
            <p className="text-sm text-siso-text-muted">{agent.specialization}</p>
          </div>

          {/* Current Task */}
          {agent.status === 'active' && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-siso-text">Current Task</span>
              </div>
              <p className="text-sm text-siso-text-muted">{agent.currentTask}</p>
            </div>
          )}

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="h-3 w-3 text-siso-text-muted" />
                <span className="text-xs text-siso-text-muted">Efficiency</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={cn("text-lg font-semibold", getEfficiencyColor(agent.efficiency))}>
                  {agent.efficiency}%
                </span>
              </div>
              <Progress value={agent.efficiency} className="h-1.5 mt-1" />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle className="h-3 w-3 text-siso-text-muted" />
                <span className="text-xs text-siso-text-muted">Completed</span>
              </div>
              <div className="text-lg font-semibold text-siso-orange">
                {agent.tasksCompleted}
              </div>
              <div className="text-xs text-siso-text-muted">tasks</div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-siso-text">Key Skills</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {agent.skills.slice(0, 4).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="text-xs bg-siso-bg text-siso-text-muted border-siso-border"
                >
                  {skill}
                </Badge>
              ))}
              {agent.skills.length > 4 && (
                <Badge 
                  variant="secondary" 
                  className="text-xs bg-siso-bg text-siso-text-muted border-siso-border"
                >
                  +{agent.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>

          {/* Project Info */}
          <div className="flex items-center justify-between pt-2 border-t border-siso-border">
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-siso-text-muted" />
              <span className="text-xs text-siso-text-muted">
                Joined {formatJoinDate(agent.joinedProject)}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs text-siso-orange hover:text-siso-red hover:bg-siso-orange/10"
            >
              <MessageSquare className="h-3 w-3 mr-1" />
              Message
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}