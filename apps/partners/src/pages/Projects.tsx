import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Grid, 
  List, 
  Filter,
  ArrowUpDown,
  Calendar,
  DollarSign,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { ProjectFilters } from '@/components/projects/ProjectFilters';
import { ProjectsEmptyState } from '@/components/projects/ProjectsEmptyState';
import { useProjects } from '@/hooks/useProjects';
import { useAuthSession } from '@/hooks/useAuthSession';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from '@/components/ui/skeleton';

type ViewMode = 'grid' | 'list';
type SortOption = 'newest' | 'oldest' | 'budget-high' | 'budget-low' | 'progress';

export default function Projects() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuthSession();
  const { data: projects, isLoading, error, refetch } = useProjects();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedFilters, setSelectedFilters] = useState({
    status: [] as string[],
    dateRange: null as { from: Date; to: Date } | null,
    budgetRange: { min: 0, max: 100000 }
  });
  const [showFilters, setShowFilters] = useState(true);
  
  // Mock projects data for demonstration
  const mockProjects = [
    {
      id: '1',
      app_name: 'E-Commerce Platform',
      company_name: 'TechStart Inc.',
      username: 'techstart',
      estimated_cost: 25000,
      estimated_days: 90,
      features: ['Payment Gateway', 'Inventory Management', 'Analytics'],
      status: 'active',
      created_at: new Date().toISOString(),
      completion_percentage: 65,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      tasks: [
        { title: 'Setup Payment Integration', due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() },
        { title: 'Design Product Pages', due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString() }
      ]
    },
    {
      id: '2',
      app_name: 'Health Tracking App',
      company_name: 'WellnessCo',
      username: 'wellness',
      estimated_cost: 18000,
      estimated_days: 60,
      features: ['Activity Tracking', 'Diet Planning', 'Health Reports'],
      status: 'paused',
      created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      completion_percentage: 35,
      due_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
      tasks: []
    }
  ];
  
  const displayProjects = projects || mockProjects;
  
  // Filter and sort projects
  const filteredProjects = displayProjects.filter(project => {
    // Search filter
    if (searchQuery && !project.app_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !project.company_name?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (selectedFilters.status.length > 0 && !selectedFilters.status.includes(project.status)) {
      return false;
    }
    
    // Budget filter
    if (project.estimated_cost < selectedFilters.budgetRange.min ||
        project.estimated_cost > selectedFilters.budgetRange.max) {
      return false;
    }
    
    return true;
  });
  
  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortOption) {
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'budget-high':
        return b.estimated_cost - a.estimated_cost;
      case 'budget-low':
        return a.estimated_cost - b.estimated_cost;
      case 'progress':
        return (b.completion_percentage || 0) - (a.completion_percentage || 0);
      default:
        return 0;
    }
  });
  
  const LoadingState = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-[300px] bg-siso-bg-alt" />
        ))}
      </div>
    </div>
  );
  
  return (
    <AppLayout>
      <div className="min-h-screen bg-siso-bg">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">My Projects</h1>
                <p className="text-siso-text-muted">
                  Manage and track all your active projects
                </p>
              </div>
              <Button
                onClick={() => navigate('/projects/new')}
                className="bg-siso-red hover:bg-siso-red/90 text-white"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Project
              </Button>
            </div>
          </div>
          
          {/* Search and Controls */}
          <div className="mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-siso-text-muted h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-siso-bg-alt border-siso-border text-white placeholder:text-siso-text-muted"
                />
              </div>
              
              <div className="flex gap-2">
                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "border-siso-border text-siso-text hover:bg-siso-bg-alt",
                    showFilters && "bg-siso-bg-alt"
                  )}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
                
                {/* Sort Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="border-siso-border text-siso-text hover:bg-siso-bg-alt">
                      <ArrowUpDown className="mr-2 h-4 w-4" />
                      Sort
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-siso-bg-alt border-siso-border">
                    <DropdownMenuItem onClick={() => setSortOption('newest')} className="text-siso-text hover:bg-siso-bg">
                      <Calendar className="mr-2 h-4 w-4" />
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('oldest')} className="text-siso-text hover:bg-siso-bg">
                      <Calendar className="mr-2 h-4 w-4" />
                      Oldest First
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('budget-high')} className="text-siso-text hover:bg-siso-bg">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Highest Budget
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('budget-low')} className="text-siso-text hover:bg-siso-bg">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Lowest Budget
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOption('progress')} className="text-siso-text hover:bg-siso-bg">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Most Progress
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* View Mode Toggle */}
                <div className="flex border border-siso-border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      "rounded-r-none",
                      viewMode === 'grid' 
                        ? "bg-siso-bg-alt text-white" 
                        : "text-siso-text-muted hover:text-white"
                    )}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={cn(
                      "rounded-l-none",
                      viewMode === 'list' 
                        ? "bg-siso-bg-alt text-white" 
                        : "text-siso-text-muted hover:text-white"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:block"
                >
                  <ProjectFilters
                    selectedFilters={selectedFilters}
                    onFiltersChange={setSelectedFilters}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Projects Grid/List */}
            <div className="flex-1">
              {isLoading ? (
                <LoadingState />
              ) : sortedProjects.length === 0 ? (
                <ProjectsEmptyState />
              ) : (
                <ProjectsGrid
                  projects={sortedProjects}
                  viewMode={viewMode}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}