import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuthSession } from '@/hooks/useAuthSession';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LogIn, UserPlus, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import all our new components
import { ProgressiveUnlockHub } from '@/components/client/progressive/ProgressiveUnlockHub';
import { QuickSetupFlow } from '@/components/client/quick-setup/QuickSetupFlow';
import { OnboardingFlow } from '@/components/client/onboarding/OnboardingFlow';
import { MoodBoardGenerator } from '@/components/client/mood-board/MoodBoardGenerator';
import { ProjectRoadmapStage } from '@/components/client/progressive/stages/ProjectRoadmapStage';
import { WelcomeHeader } from '@/components/dashboard/WelcomeHeader';
import { useMainUserProject } from '@/hooks/useUserProjects';
import { RealTaskManager } from '@/components/tasks/RealTaskManager';

type DashboardStage = 'welcome' | 'onboarding' | 'quick-setup' | 'design-discovery' | 'project-roadmap' | 'main-dashboard';

export default function IntegratedDashboard() {
  const { user } = useAuthSession();
  const { project, hasProjects, loading } = useMainUserProject();
  const [currentStage, setCurrentStage] = useState<DashboardStage>('welcome');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [hasCompletedQuickSetup, setHasCompletedQuickSetup] = useState(false);
  const [hasCompletedDesignDiscovery, setHasCompletedDesignDiscovery] = useState(false);

  // Load saved progress from localStorage
  useEffect(() => {
    if (user) {
      const savedProgress = localStorage.getItem(`dashboard_progress_${user.id}`);
      if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        setHasCompletedOnboarding(progress.hasCompletedOnboarding || false);
        setHasCompletedQuickSetup(progress.hasCompletedQuickSetup || false);
        setHasCompletedDesignDiscovery(progress.hasCompletedDesignDiscovery || false);
      }
    }
  }, [user]);

  // Save progress to localStorage
  useEffect(() => {
    if (user) {
      const progress = {
        hasCompletedOnboarding,
        hasCompletedQuickSetup,
        hasCompletedDesignDiscovery
      };
      localStorage.setItem(`dashboard_progress_${user.id}`, JSON.stringify(progress));
    }
  }, [user, hasCompletedOnboarding, hasCompletedQuickSetup, hasCompletedDesignDiscovery]);

  useEffect(() => {
    // Check user's progress and set appropriate stage
    if (!user) {
      setCurrentStage('welcome');
    } else if (!hasCompletedOnboarding) {
      setCurrentStage('onboarding');
    } else if (!hasCompletedQuickSetup) {
      setCurrentStage('quick-setup');
    } else if (!hasCompletedDesignDiscovery) {
      setCurrentStage('design-discovery');
    } else if (!hasProjects) {
      setCurrentStage('project-roadmap');
    } else {
      setCurrentStage('main-dashboard');
    }
  }, [user, hasCompletedOnboarding, hasCompletedQuickSetup, hasCompletedDesignDiscovery, hasProjects]);

  const handleStageComplete = (stage: DashboardStage) => {
    switch (stage) {
      case 'onboarding':
        setHasCompletedOnboarding(true);
        setCurrentStage('quick-setup');
        break;
      case 'quick-setup':
        setHasCompletedQuickSetup(true);
        setCurrentStage('design-discovery');
        break;
      case 'design-discovery':
        setHasCompletedDesignDiscovery(true);
        setCurrentStage('project-roadmap');
        break;
      case 'project-roadmap':
        setCurrentStage('main-dashboard');
        break;
    }
  };

  const renderStageContent = () => {
    switch (currentStage) {
      case 'welcome':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-siso-bg-alt border-siso-border">
              <CardHeader>
                <CardTitle className="text-3xl text-siso-text-bold text-center">
                  Welcome to SISO Resource Hub
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-siso-text text-center text-lg">
                  Your intelligent project companion powered by AI. Sign in to start building amazing projects with our suite of tools and automated workflows.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                  <Card className="bg-siso-bg border-siso-border">
                    <CardContent className="p-4 text-center">
                      <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <h3 className="text-siso-text-bold font-semibold">AI-Powered</h3>
                      <p className="text-siso-text-muted text-sm mt-1">Smart assistance at every step</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-siso-bg border-siso-border">
                    <CardContent className="p-4 text-center">
                      <ArrowRight className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <h3 className="text-siso-text-bold font-semibold">Progressive Flow</h3>
                      <p className="text-siso-text-muted text-sm mt-1">Unlock features as you progress</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-siso-bg border-siso-border">
                    <CardContent className="p-4 text-center">
                      <UserPlus className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <h3 className="text-siso-text-bold font-semibold">Quick Setup</h3>
                      <p className="text-siso-text-muted text-sm mt-1">Get started in minutes</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex gap-4 justify-center mt-8">
                  <Button asChild variant="secondary" size="lg">
                    <Link to="/auth">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-siso-bg text-siso-text border-siso-border hover:bg-siso-bg-alt">
                    <Link to="/auth">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'onboarding':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Client Onboarding</h2>
              <Button 
                variant="ghost" 
                onClick={() => handleStageComplete('onboarding')}
                className="text-gray-400 hover:text-white"
              >
                Skip for now →
              </Button>
            </div>
            <OnboardingFlow 
              onComplete={() => handleStageComplete('onboarding')}
              onSkip={() => handleStageComplete('onboarding')}
            />
          </div>
        );

      case 'quick-setup':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Quick Setup</h2>
              <Button 
                variant="ghost" 
                onClick={() => handleStageComplete('quick-setup')}
                className="text-gray-400 hover:text-white"
              >
                Skip for now →
              </Button>
            </div>
            <QuickSetupFlow 
              onComplete={() => handleStageComplete('quick-setup')}
              onSkip={() => handleStageComplete('quick-setup')}
            />
          </div>
        );

      case 'design-discovery':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Design Discovery</h2>
              <Button 
                variant="ghost" 
                onClick={() => handleStageComplete('design-discovery')}
                className="text-gray-400 hover:text-white"
              >
                Skip for now →
              </Button>
            </div>
            <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                  Design Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-6">
                  Let's discover your design preferences and create a mood board for your project.
                </p>
                <MoodBoardGenerator 
                  onComplete={() => handleStageComplete('design-discovery')}
                />
              </CardContent>
            </Card>
          </div>
        );

      case 'project-roadmap':
        return (
          <ProjectRoadmapStage 
            onComplete={() => handleStageComplete('project-roadmap')}
            currentStage={4}
            totalStages={5}
          />
        );

      case 'main-dashboard':
        return (
          <div className="space-y-6">
            <WelcomeHeader />
            
            {/* Progressive Unlock Hub - Main Feature */}
            <ProgressiveUnlockHub />
            
            {/* Task Manager */}
            <RealTaskManager 
              title="Your Tasks Today"
              maxTasks={5}
              showAddTask={true}
            />
            
            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-slate-700 hover:border-purple-500/50 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-2">Continue Setup</h3>
                  <p className="text-sm text-gray-400">Complete your project configuration</p>
                  <Button className="mt-4 w-full" size="sm">
                    Resume Setup
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-2">View Roadmap</h3>
                  <p className="text-sm text-gray-400">Check your project timeline</p>
                  <Button className="mt-4 w-full" size="sm" variant="outline">
                    Open Roadmap
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800 border-slate-700 hover:border-green-500/50 transition-all cursor-pointer">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-2">Design Preferences</h3>
                  <p className="text-sm text-gray-400">Update your mood board</p>
                  <Button className="mt-4 w-full" size="sm" variant="outline">
                    Edit Preferences
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Dashboard | SISO Resource Hub</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator - Only show when user is logged in and not on main dashboard */}
        {user && currentStage !== 'main-dashboard' && currentStage !== 'welcome' && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-300">Setup Progress</h3>
                <span className="text-sm text-gray-400">
                  {currentStage === 'onboarding' && 'Step 1 of 4'}
                  {currentStage === 'quick-setup' && 'Step 2 of 4'}
                  {currentStage === 'design-discovery' && 'Step 3 of 4'}
                  {currentStage === 'project-roadmap' && 'Step 4 of 4'}
                </span>
              </div>
              
              <div className="relative">
                <Progress 
                  value={
                    currentStage === 'onboarding' ? 25 :
                    currentStage === 'quick-setup' ? 50 :
                    currentStage === 'design-discovery' ? 75 :
                    currentStage === 'project-roadmap' ? 90 : 100
                  } 
                  className="h-2 bg-gray-800"
                />
                
                {/* Stage Indicators */}
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasCompletedOnboarding ? 'bg-green-500' : 'bg-gray-600'}`}>
                    {hasCompletedOnboarding && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasCompletedQuickSetup ? 'bg-green-500' : 'bg-gray-600'}`}>
                    {hasCompletedQuickSetup && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasCompletedDesignDiscovery ? 'bg-green-500' : 'bg-gray-600'}`}>
                    {hasCompletedDesignDiscovery && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${hasProjects ? 'bg-green-500' : 'bg-gray-600'}`}>
                    {hasProjects && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Onboarding</span>
                <span>Quick Setup</span>
                <span>Design Discovery</span>
                <span>Project Creation</span>
              </div>
            </div>
          </motion.div>
        )}
        
        <AnimatePresence mode="wait">
          {renderStageContent()}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}