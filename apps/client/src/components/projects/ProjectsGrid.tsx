import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  Eye, 
  Edit3, 
  Archive,
  ExternalLink,
  Clock,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDate } from '@/lib/formatters';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  app_name: string;
  company_name?: string;
  username: string;
  estimated_cost: number;
  estimated_days: number;
  features: string[];
  status: string;
  created_at: string;
  completion_percentage?: number;
  due_date?: string;
  tasks?: Array<{ title: string; due_date: string }>;
  logo?: string;
  team_members?: Array<{ name: string; avatar?: string; role: string }>;
  budget_spent?: number;
}

interface ProjectsGridProps {
  projects: Project[];
  viewMode: 'grid' | 'list';
}

export function ProjectsGrid({ projects, viewMode }: ProjectsGridProps) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const projectsPerPage = 12;
  
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (page - 1) * projectsPerPage;
  const displayedProjects = projects.slice(startIndex, startIndex + projectsPerPage);

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

  const ProjectGridCard = ({ project }: { project: Project }) => {
    const completion = project.completion_percentage || 0;
    const budgetSpent = project.budget_spent || (project.estimated_cost * completion / 100);
    const teamMembers = project.team_members || [
      { name: 'John Doe', role: 'Developer' },
      { name: 'Jane Smith', role: 'Designer' }
    ];

    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
        className="group"
      >
        <Card className="bg-siso-bg-alt border-siso-border hover:border-siso-orange/50 transition-all duration-300 h-full">
          <div className="p-6 space-y-4">
            {/* Header with Logo and Actions */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-siso-orange to-siso-red flex items-center justify-center">
                  {project.logo ? (
                    <img src={project.logo} alt={project.app_name} className="h-full w-full rounded-lg object-cover" />
                  ) : (
                    <span className="text-lg font-bold text-white">
                      {project.app_name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                    </span>
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
              
              <Badge className={cn("text-xs", getStatusColor(project.status))}>
                {project.status.replace(/_/g, ' ').toUpperCase()}
              </Badge>
            </div>

            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-siso-text-muted">Progress</span>
                <span className="text-sm font-medium text-white">{completion}%</span>
              </div>
              <Progress 
                value={completion} 
                className="h-2 bg-siso-border"
                indicatorClassName={cn(
                  "transition-all",
                  completion < 30 ? "bg-red-500" :
                  completion < 70 ? "bg-amber-500" :
                  "bg-green-500"
                )}
              />
            </div>

            {/* Budget vs Spent */}
            <div className="flex justify-between items-center p-3 bg-siso-bg/50 rounded-lg">
              <div>
                <p className="text-xs text-siso-text-muted">Budget</p>
                <p className="text-sm font-medium text-white">${project.estimated_cost.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-siso-text-muted">Spent</p>
                <p className="text-sm font-medium text-siso-orange">${budgetSpent.toLocaleString()}</p>
              </div>
            </div>

            {/* Team Members */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-siso-text-muted" />
                <span className="text-sm text-siso-text-muted">Team</span>
              </div>
              <div className="flex -space-x-2">
                {teamMembers.slice(0, 3).map((member, index) => (
                  <Avatar key={index} className="h-6 w-6 border-2 border-siso-bg-alt">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs bg-siso-orange text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {teamMembers.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-siso-border border-2 border-siso-bg-alt flex items-center justify-center">
                    <span className="text-xs text-siso-text-muted">+{teamMembers.length - 3}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="flex items-center gap-2 text-siso-text-muted">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                Due: {project.due_date ? formatDate(project.due_date) : 'Not set'}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
  };

  const ProjectListCard = ({ project }: { project: Project }) => {
    const completion = project.completion_percentage || 0;
    const budgetSpent = project.budget_spent || (project.estimated_cost * completion / 100);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <Card className="bg-siso-bg-alt border-siso-border hover:border-siso-orange/50 transition-all duration-300">
          <div className="p-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-siso-orange to-siso-red flex items-center justify-center flex-shrink-0">
                {project.logo ? (
                  <img src={project.logo} alt={project.app_name} className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <span className="text-lg font-bold text-white">
                    {project.app_name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </span>
                )}
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-siso-orange transition-colors">
                      {project.app_name}
                    </h3>
                    {project.company_name && (
                      <p className="text-sm text-siso-text-muted">{project.company_name}</p>
                    )}
                  </div>
                  <Badge className={cn("text-xs", getStatusColor(project.status))}>
                    {project.status.replace(/_/g, ' ').toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-siso-text-muted">Progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={completion} className="h-1 flex-1" />
                      <span className="text-sm font-medium text-white">{completion}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-siso-text-muted">Budget</p>
                    <p className="text-sm font-medium text-white">${project.estimated_cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-siso-text-muted">Spent</p>
                    <p className="text-sm font-medium text-siso-orange">${budgetSpent.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-siso-text-muted">Due Date</p>
                    <p className="text-sm font-medium text-white">
                      {project.due_date ? formatDate(project.due_date) : 'Not set'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
                  onClick={() => navigate(`/projects/${project.id}/edit`)}
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayedProjects.map((project) => (
              <ProjectGridCard key={project.id} project={project} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {displayedProjects.map((project) => (
              <ProjectListCard key={project.id} project={project} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
          >
            Previous
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setPage(pageNum)}
                className={cn(
                  page === pageNum
                    ? "bg-siso-orange text-white"
                    : "border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
                )}
              >
                {pageNum}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="border-siso-border text-siso-text hover:bg-siso-bg hover:text-white"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}