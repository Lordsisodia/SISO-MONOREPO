
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  ExternalLink, 
  Eye, 
  Edit3, 
  Archive, 
  Users, 
  DollarSign,
  Clock,
  Activity,
  CheckCircle,
  Pause,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/formatters";
import { useNavigate } from "react-router-dom";

interface ProjectTask {
  title: string;
  due_date: string;
}

interface TeamMember {
  name: string;
  avatar?: string;
  role: string;
}

interface ProjectCardProps {
  project: {
    id: string;
    app_name: string;
    company_name: string | null;
    username: string;
    estimated_cost: number;
    estimated_days: number;
    features: string[];
    status: string;
    created_at: string;
    completion_percentage?: number;
    due_date?: string;
    tasks?: ProjectTask[];
    logo?: string;
    team_members?: TeamMember[];
    budget_spent?: number;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const completion = project.completion_percentage || 0;
  const tasks = project.tasks || [];
  const teamMembers = project.team_members || [
    { name: 'John Doe', role: 'Developer' },
    { name: 'Jane Smith', role: 'Designer' }
  ];
  const budgetSpent = project.budget_spent || (project.estimated_cost * completion / 100);
  
  const initials = project.app_name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/40';
      case 'paused':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return Activity;
      case 'paused':
        return Pause;
      case 'completed':
        return CheckCircle;
      case 'cancelled':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const StatusIcon = getStatusIcon(project.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      className="group h-full"
    >
      <Card className="bg-siso-bg-alt border-siso-border hover:border-siso-orange/50 transition-all duration-300 h-full flex flex-col">
        <div className="p-6 flex flex-col gap-4 flex-1">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-siso-orange to-siso-red flex items-center justify-center">
                {project.logo ? (
                  <img src={project.logo} alt={project.app_name} className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <span className="text-lg font-bold text-white">{initials}</span>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-siso-orange transition-colors">
                  {project.app_name}
                </h3>
                {project.company_name && (
                  <p className="text-sm text-siso-text-muted">{project.company_name}</p>
                )}
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={cn("text-xs py-1 px-2 flex items-center gap-1", getStatusColor(project.status))}
            >
              <StatusIcon className="h-3 w-3" />
              {project.status.replace(/_/g, ' ').toUpperCase()}
            </Badge>
          </div>

          {/* Progress Section with Enhanced Styling */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-siso-text-muted">Progress</span>
              <span className="text-sm font-semibold text-white">{completion}%</span>
            </div>
            <Progress 
              value={completion} 
              className="h-2 bg-siso-border" 
              indicatorClassName={cn(
                "transition-all duration-500",
                completion < 30 ? "bg-red-500" :
                completion < 70 ? "bg-amber-500" :
                "bg-green-500"
              )}
            />
          </div>

          {/* Budget vs Spent */}
          <div className="flex justify-between items-center p-3 bg-siso-bg/50 rounded-lg border border-siso-border/50">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-siso-text-muted" />
              <div>
                <p className="text-xs text-siso-text-muted">Budget</p>
                <p className="text-sm font-medium text-white">${project.estimated_cost.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-siso-text-muted">Spent</p>
              <p className="text-sm font-medium text-siso-orange">${Math.round(budgetSpent).toLocaleString()}</p>
            </div>
          </div>

          {/* Team Members Avatars */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-siso-text-muted" />
              <span className="text-sm text-siso-text-muted">Team</span>
            </div>
            <div className="flex -space-x-2">
              {teamMembers.slice(0, 3).map((member, index) => (
                <Avatar key={index} className="h-7 w-7 border-2 border-siso-bg-alt ring-1 ring-siso-border">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs bg-siso-orange text-white font-medium">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {teamMembers.length > 3 && (
                <div className="h-7 w-7 rounded-full bg-siso-border border-2 border-siso-bg-alt flex items-center justify-center">
                  <span className="text-xs text-siso-text-muted font-medium">+{teamMembers.length - 3}</span>
                </div>
              )}
            </div>
          </div>

          {/* Due Date and Timeline */}
          <div className="flex items-center justify-between text-siso-text-muted">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Due: {project.due_date ? formatDate(project.due_date) : 'Not set'}
              </span>
            </div>
            <span className="text-sm">
              {project.estimated_days} days
            </span>
          </div>

          {/* Mini Tasks Preview */}
          {tasks.length > 0 && (
            <div className="space-y-2 flex-1">
              <h4 className="text-sm font-medium text-white">Recent Tasks</h4>
              <div className="space-y-1">
                {tasks.slice(0, 2).map((task, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded bg-siso-bg/30 border border-siso-border/30"
                  >
                    <p className="text-xs text-white truncate">{task.title}</p>
                    <span className="text-xs text-siso-text-muted">
                      Due: {formatDate(task.due_date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Action Buttons */}
          <div className="flex gap-2 pt-2 mt-auto opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
              onClick={() => navigate(`/projects/${project.id}`)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
              onClick={() => navigate(`/projects/${project.id}/edit`)}
            >
              <Edit3 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
            >
              <Archive className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
