import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuthSession } from '@/hooks/useAuthSession';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LogIn, 
  UserPlus, 
  CheckCircle, 
  Lock, 
  MessageSquare, 
  Zap, 
  Palette, 
  Map, 
  Unlock,
  ArrowRight,
  FileText,
  Users,
  CreditCard,
  TestTube,
  Rocket
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { useMainUserProject } from '@/hooks/useUserProjects';
import { RealTaskManager } from '@/components/tasks/RealTaskManager';
import { StatsRow } from '@/components/dashboard/StatsRow';
import { ProjectsHub } from '@/components/projects/ProjectsHub';
import { EnhancedActivityFeed } from '@/components/dashboard/EnhancedActivityFeed';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  status: 'locked' | 'available' | 'completed';
  requiredStep?: string;
  color: string;
}

export default function EnhancedDashboard() {
  const { user } = useAuthSession();
  const navigate = useNavigate();
  const { hasProjects } = useMainUserProject();
  const [progress, setProgress] = useState({
    hasCompletedOnboarding: false,
    hasCompletedMoodBoard: false,
    hasAcceptedAppPlan: false,
    hasViewedTimeline: false,
    hasSetupPayment: false,
    hasStartedDevelopment: false,
    hasCompletedTesting: false,
    hasLaunched: false,
  });

  // Load progress from localStorage
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`dashboard_progress_${user.id}`);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setProgress({
          hasCompletedOnboarding: parsed.hasCompletedOnboarding || false,
          hasCompletedMoodBoard: parsed.hasCompletedMoodBoard || false,
          hasAcceptedAppPlan: parsed.hasAcceptedAppPlan || false,
          hasViewedTimeline: parsed.hasViewedTimeline || false,
          hasSetupPayment: parsed.hasSetupPayment || false,
          hasStartedDevelopment: parsed.hasStartedDevelopment || false,
          hasCompletedTesting: parsed.hasCompletedTesting || false,
          hasLaunched: parsed.hasLaunched || false,
        });
      }
    }
  }, [user, hasProjects]);

  const features: FeatureCard[] = [
    {
      id: 'onboarding',
      title: 'Onboarding',
      description: 'Tell us about your business and goals',
      icon: MessageSquare,
      route: '/client/onboarding',
      status: progress.hasCompletedOnboarding ? 'completed' : 'available',
      color: 'text-siso-orange'
    },
    {
      id: 'mood-board',
      title: 'Mood Board',
      description: 'Define your style and design preferences',
      icon: Palette,
      route: '/client/mood-board',
      status: progress.hasCompletedMoodBoard ? 'completed' : 
              progress.hasCompletedOnboarding ? 'available' : 'locked',
      requiredStep: 'onboarding',
      color: 'text-siso-orange'
    },
    {
      id: 'app-plan',
      title: 'App Plan',
      description: 'Review and approve your project plan',
      icon: FileText,
      route: '/client/app-plan',
      status: progress.hasAcceptedAppPlan ? 'completed' : 
              progress.hasCompletedMoodBoard ? 'available' : 'locked',
      requiredStep: 'mood-board',
      color: 'text-siso-red'
    },
    {
      id: 'timeline',
      title: 'Timeline/PDR Tracking',
      description: 'Track all 46 PDR steps and milestones',
      icon: Map,
      route: '/client/timeline',
      status: progress.hasViewedTimeline ? 'completed' : 
              progress.hasAcceptedAppPlan ? 'available' : 'locked',
      requiredStep: 'app-plan',
      color: 'text-siso-red'
    },
    {
      id: 'agent-teams',
      title: 'Agent Teams',
      description: 'See your AI agents working in real-time',
      icon: Users,
      route: '/client/agent-teams',
      status: progress.hasAcceptedAppPlan ? 'available' : 'locked',
      requiredStep: 'app-plan',
      color: 'text-siso-orange'
    },
    {
      id: 'payments',
      title: 'Payments',
      description: 'Manage billing and payment schedules',
      icon: CreditCard,
      route: '/client/payments',
      status: progress.hasSetupPayment ? 'completed' :
              progress.hasAcceptedAppPlan ? 'available' : 'locked',
      requiredStep: 'app-plan',
      color: 'text-siso-text'
    },
    {
      id: 'development',
      title: 'Project Development',
      description: 'Live preview and development progress',
      icon: Zap,
      route: '/client/development',
      status: progress.hasStartedDevelopment ? 'available' : 'locked',
      requiredStep: 'timeline',
      color: 'text-siso-red'
    },
    {
      id: 'testing',
      title: 'Testing',
      description: 'Quality assurance and bug tracking',
      icon: TestTube,
      route: '/client/testing',
      status: progress.hasCompletedTesting ? 'completed' :
              progress.hasStartedDevelopment ? 'available' : 'locked',
      requiredStep: 'development',
      color: 'text-siso-orange'
    },
    {
      id: 'launch',
      title: 'Launch',
      description: 'Deploy your project to production',
      icon: Rocket,
      route: '/client/launch',
      status: progress.hasLaunched ? 'completed' :
              progress.hasCompletedTesting ? 'available' : 'locked',
      requiredStep: 'testing',
      color: 'text-siso-red'
    },
  ];

  const completedCount = features.filter(f => f.status === 'completed').length;
  const progressPercentage = (completedCount / features.length) * 100;

  const handleFeatureClick = (feature: FeatureCard) => {
    if (feature.status === 'locked') {
      return;
    }
    navigate(feature.route);
  };

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
                  <Button asChild className="bg-siso-red hover:bg-siso-red/90">
                    <Link to="/auth">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-siso-border text-siso-text hover:bg-siso-bg-alt">
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

        {user && (
          <>
            {/* Welcome Header */}
            <WelcomeHeader />
            
            {/* Stats Row */}
            <StatsRow />
            
            {/* Progress Overview */}
            <Card className="bg-siso-bg-alt border-siso-border mb-6">
              <CardHeader>
                <CardTitle className="text-lg text-siso-text-bold">Setup Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-siso-text-muted">Overall Progress</span>
                    <span className="text-siso-text">{completedCount} of {features.length} completed</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 bg-siso-border" />
                </div>
              </CardContent>
            </Card>
            
            {/* Feature Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card 
                      className={`
                        bg-siso-bg-alt border-siso-border relative overflow-hidden
                        ${feature.status === 'locked' ? 'opacity-60' : 'hover:border-siso-border-hover cursor-pointer'}
                        transition-all duration-300
                      `}
                      onClick={() => handleFeatureClick(feature)}
                    >
                      {feature.status === 'locked' && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                          <Lock className="w-8 h-8 text-siso-text-muted" />
                        </div>
                      )}
                      
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <Icon className={`w-8 h-8 ${feature.color}`} />
                          {feature.status === 'completed' && (
                            <Badge className="bg-siso-orange/20 text-siso-orange border-siso-orange/40">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Complete
                            </Badge>
                          )}
                          {feature.status === 'available' && (
                            <Badge className="bg-siso-red/20 text-siso-red border-siso-red/40">
                              Available
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg text-siso-text-bold mt-3">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-siso-text-muted">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        {feature.status === 'locked' && feature.requiredStep && (
                          <p className="text-sm text-siso-text-muted">
                            Complete "{features.find(f => f.id === feature.requiredStep)?.title}" first
                          </p>
                        )}
                        {feature.status !== 'locked' && (
                          <Button 
                            variant={feature.status === 'completed' ? 'outline' : 'default'}
                            size="sm"
                            className={`
                              w-full
                              ${feature.status === 'completed' 
                                ? 'border-siso-border text-siso-text hover:bg-siso-bg' 
                                : 'bg-siso-red hover:bg-siso-red/90'
                              }
                            `}
                          >
                            {feature.status === 'completed' ? 'Review' : 'Start'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Projects & Activity Section */}
            <div className="grid lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <ProjectsHub />
              </div>
              <div>
                <EnhancedActivityFeed />
              </div>
            </div>
            
            {/* Task Manager */}
            <RealTaskManager 
              title="Your Tasks Today"
              maxTasks={5}
              showAddTask={true}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}