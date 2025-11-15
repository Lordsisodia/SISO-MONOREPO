import { Helmet } from 'react-helmet';
import { useAuthSession } from '@/hooks/useAuthSession';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { StatsRow } from '@/components/dashboard/StatsRow';
import { MainProjectCard } from '@/components/dashboard/MainProjectCard';
import { EnhancedActivityFeed } from '@/components/dashboard/EnhancedActivityFeed';
import { HelpSupportCard } from '@/components/dashboard/HelpSupportCard';
import { ProjectHeader } from '@/components/projects/details/ProjectHeader';
import { ProjectMetricsDashboard } from '@/components/projects/details/ProjectMetricsDashboard';
import { ProjectProgressCards } from '@/components/dashboard/ProjectProgressCards';
import { RealTaskManager } from '@/components/tasks/RealTaskManager';
import { useMainUserProject } from '@/hooks/useUserProjects';
import { AlertCircle } from 'lucide-react';
import { DataViewer } from '@/components/debug/DataViewer';

export default function Home() {
  const { user } = useAuthSession();
  const { isAdmin } = useAdminCheck();
  const { project, hasProjects, loading, error } = useMainUserProject();
  
  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard | SISO Resource Hub</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Show login/signup prompt for non-authenticated users */}
        {!user && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="bg-siso-bg-alt border-siso-border">
              <CardHeader>
                <CardTitle className="text-2xl text-siso-text-bold">Welcome to SISO Resource Hub</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-siso-text">
                  Sign in or create an account to access all features, save your projects, and collaborate with our AI agents.
                </p>
                <div className="flex gap-4">
                  <Button asChild size="lg" className="bg-siso-red hover:bg-siso-red/90">
                    <Link to="/auth">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-siso-border text-siso-text hover:bg-siso-bg">
                    <Link to="/auth">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        {/* Welcome Header */}
        <WelcomeHeader />
        
        {/* Stats Row */}
        <StatsRow />
        
        {/* DEBUG: Data Viewer - TEMPORARY */}
        <div className="mb-4">
          <DataViewer />
        </div>
        
        {/* Task Manager - Moved to top for better priority */}
        <div className="mb-4">
          <RealTaskManager 
            title="Your Tasks Today"
            maxTasks={5}
            showAddTask={true}
          />
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Left Column - Main Project and Help & Support */}
          <div className="lg:col-span-2 space-y-4">
            {/* Dynamic Project Content - Shows user's projects or create project message */}
            <MainProjectCard />
            
            {/* Help & Support Card */}
            <HelpSupportCard />
          </div>
          
          {/* Right Column - Activity Feed */}
          <div className="space-y-4">
            <EnhancedActivityFeed />
          </div>
        </div>
        
        {/* Project Details - Only show if user has projects */}
        {hasProjects && project && (
          <div className="mb-6">
            {loading ? (
              <div className="animate-pulse space-y-8">
                <div className="h-64 bg-black/20 rounded-lg" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg bg-black/30 border border-white/10">
                <AlertCircle className="h-12 w-12 text-[#ea384c] mb-4" />
                <h3 className="text-xl font-semibold text-siso-text-bold mb-2">
                  Failed to Load Project Details
                </h3>
                <p className="text-gray-400 mb-4 max-w-md">
                  {error instanceof Error ? error.message : 'There was an error loading your project details'}
                </p>
              </div>
            ) : (
              <>
                <ProjectHeader
                  name={project.name}
                  description={project.description || 'No description available'}
                  status={project.status}
                  created_at={project.created_at}
                />
                <div className="mt-6">
                  <ProjectMetricsDashboard projectId={project.id} />
                </div>
                
                {/* Project Progress Cards */}
                <ProjectProgressCards />
              </>
            )}
          </div>
        )}
        
        {/* Admin Access Card - Only shown to admin users */}
        {isAdmin && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8"
          >
            <Card className="bg-black/30 border border-siso-text/10 hover:bg-black/40 hover:border-siso-orange/20 transition-all duration-300">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="h-12 w-12 bg-siso-orange/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-siso-orange" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-siso-text-bold">Admin Dashboard</h3>
                  <p className="text-muted-foreground">Manage clients, templates, and organization settings</p>
                </div>
                <Button asChild>
                  <Link to="/admin/dashboard">Access Admin</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
