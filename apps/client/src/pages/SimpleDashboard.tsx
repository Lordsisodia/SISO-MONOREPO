import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LogIn, 
  UserPlus, 
  CheckCircle, 
  MessageSquare, 
  Zap, 
  Palette, 
  Map, 
  ArrowRight,
  FileText,
  Users,
  CreditCard,
  TestTube,
  Rocket,
  Settings,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  route: string;
  status: 'locked' | 'available' | 'completed';
  color: string;
}

export default function SimpleDashboard() {
  const [progress] = useState({
    onboardingCompleted: 80,
    projectsCreated: 3,
    tasksCompleted: 12
  });

  const features: FeatureCard[] = [
    {
      id: 'projects',
      title: 'Projects',
      description: 'Manage your projects and track progress',
      icon: FileText,
      route: '/projects',
      status: 'available',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'team',
      title: 'Team',
      description: 'Collaborate with your team members',
      icon: Users,
      route: '/team',
      status: 'available',
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View insights and performance metrics',
      icon: BarChart3,
      route: '/analytics',
      status: 'available',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your account and preferences',
      icon: Settings,
      route: '/settings',
      status: 'available',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - SISO Agency</title>
        <meta name="description" content="Your SISO Agency dashboard" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
        {/* Header */}
        <div className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#ea384c] to-[#d42c47] rounded-lg"></div>
                <span className="text-xl font-bold text-white">SISO</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/auth">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-gray-400">
              Manage your projects, track progress, and collaborate with your team.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Onboarding Progress
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">
                  {progress.onboardingCompleted}%
                </div>
                <Progress value={progress.onboardingCompleted} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Active Projects
                </CardTitle>
                <FileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {progress.projectsCreated}
                </div>
                <p className="text-xs text-gray-400">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  Tasks Completed
                </CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {progress.tasksCompleted}
                </div>
                <p className="text-xs text-gray-400">
                  +5 this week
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-all duration-200 group cursor-pointer">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white group-hover:text-gray-200 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm mb-4">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-white/10"
                      asChild
                    >
                      <Link to={feature.route}>
                        Open
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Quick Start Guide */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-[#ea384c]" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">1</Badge>
                  <div>
                    <p className="text-white font-medium">Complete your profile</p>
                    <p className="text-gray-400 text-sm">Add your company details and preferences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">2</Badge>
                  <div>
                    <p className="text-white font-medium">Create your first project</p>
                    <p className="text-gray-400 text-sm">Start building your MVP with our tools</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary" className="mt-1">3</Badge>
                  <div>
                    <p className="text-white font-medium">Invite your team</p>
                    <p className="text-gray-400 text-sm">Collaborate with teammates and clients</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}