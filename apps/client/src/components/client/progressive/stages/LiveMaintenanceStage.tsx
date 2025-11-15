/**
 * Live & Maintenance Stage - Stage 6 of Progressive Unlock System
 * Post-launch support, monitoring, and ongoing maintenance
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Globe, 
  Activity, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Shield,
  HeadphonesIcon,
  Monitor,
  Users,
  BarChart3,
  Settings,
  Zap,
  RefreshCw,
  AlertCircle,
  Calendar,
  Star
} from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { cn } from '@/lib/utils';

interface LiveMaintenanceStageProps {
  onComplete?: () => void;
  onNext?: () => void;
}

interface MetricCard {
  id: string;
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  description: string;
}

interface SupportService {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: 'active' | 'available' | 'scheduled';
  nextAction?: string;
}

export function LiveMaintenanceStage({ onComplete, onNext }: LiveMaintenanceStageProps) {
  const { clientData, loading } = useClientDetails();
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);
  const [viewedSections, setViewedSections] = React.useState<string[]>([]);
  const [satisfactionRating, setSatisfactionRating] = React.useState<number>(0);

  const siteMetrics: MetricCard[] = [
    {
      id: 'uptime',
      title: 'Site Uptime',
      value: '99.9%',
      change: '+0.1%',
      trend: 'up',
      icon: Activity,
      description: 'Site availability over the last 30 days'
    },
    {
      id: 'page_speed',
      title: 'Page Speed',
      value: '1.2s',
      change: '-0.3s',
      trend: 'up',
      icon: Zap,
      description: 'Average page load time'
    },
    {
      id: 'security_score',
      title: 'Security Score',
      value: '98/100',
      change: '+2',
      trend: 'up',
      icon: Shield,
      description: 'Overall security rating'
    },
    {
      id: 'traffic',
      title: 'Monthly Visitors',
      value: '2,456',
      change: '+24%',
      trend: 'up',
      icon: Users,
      description: 'Unique visitors this month'
    }
  ];

  const supportServices: SupportService[] = [
    {
      id: 'monitoring',
      title: '24/7 Site Monitoring',
      description: 'Continuous monitoring for uptime and performance issues',
      icon: Monitor,
      status: 'active',
      nextAction: 'Automated alerts configured'
    },
    {
      id: 'security_updates',
      title: 'Security Updates',
      description: 'Regular security patches and vulnerability monitoring',
      icon: Shield,
      status: 'active',
      nextAction: 'Next update: End of month'
    },
    {
      id: 'content_updates',
      title: 'Content Management',
      description: 'Support for content updates and modifications',
      icon: Settings,
      status: 'available',
      nextAction: 'Contact support for requests'
    },
    {
      id: 'performance_optimization',
      title: 'Performance Optimization',
      description: 'Ongoing optimization for speed and user experience',
      icon: TrendingUp,
      status: 'scheduled',
      nextAction: 'Quarterly review scheduled'
    },
    {
      id: 'backup_management',
      title: 'Backup Management',
      description: 'Automated daily backups with easy restore options',
      icon: RefreshCw,
      status: 'active',
      nextAction: 'Daily backups at 2 AM'
    },
    {
      id: 'support_team',
      title: 'Technical Support',
      description: 'Direct access to our technical support team',
      icon: HeadphonesIcon,
      status: 'available',
      nextAction: 'Response within 24 hours'
    }
  ];

  const requiredActions = [
    {
      id: 'metrics_reviewed',
      title: 'Review Site Metrics',
      description: 'Check your website performance and analytics',
      icon: BarChart3,
      completed: viewedSections.includes('metrics')
    },
    {
      id: 'support_understood',
      title: 'Understand Support Services',
      description: 'Learn about ongoing maintenance and support',
      icon: HeadphonesIcon,
      completed: viewedSections.includes('support')
    },
    {
      id: 'satisfaction_provided',
      title: 'Provide Satisfaction Rating',
      description: 'Rate your experience with the development process',
      icon: Star,
      completed: satisfactionRating > 0
    }
  ];

  const handleSectionView = (sectionId: string) => {
    if (!viewedSections.includes(sectionId)) {
      setViewedSections([...viewedSections, sectionId]);
    }
  };

  const handleSatisfactionRating = (rating: number) => {
    setSatisfactionRating(rating);
  };

  // Auto-complete actions based on states
  React.useEffect(() => {
    const currentCompleted = requiredActions.filter(action => action.completed).map(action => action.id);
    setCompletedActions(currentCompleted);
    
    // Auto-complete stage if all requirements are met
    if (currentCompleted.length === requiredActions.length && currentCompleted.length > 0) {
      onComplete?.();
    }
  }, [viewedSections, satisfactionRating, onComplete]);

  const progressPercentage = (completedActions.length / requiredActions.length) * 100;

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-64 bg-slate-700 rounded-lg"></div>
          <div className="h-64 bg-slate-700 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Live & Thriving
          </h1>
          <p className="text-xl text-gray-400 mt-2">
            Your website is live with ongoing support and monitoring
          </p>
        </div>
        <div className="flex justify-center space-x-2">
          <Badge variant="outline" className="border-green-500 text-green-400">
            Stage 6: Live & Maintenance
          </Badge>
          <Badge variant="outline" className="border-blue-500 text-blue-400">
            ✨ Journey Complete
          </Badge>
        </div>
      </div>

      {/* Congratulations Section */}
      <Card className="border-green-500/50 bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <span className="text-xl">Congratulations! Your Project is Live!</span>
          </CardTitle>
          <CardDescription className="text-base">
            You've successfully completed the entire 6-stage development journey. 
            Your website is now live and serving your customers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-sm text-gray-400">Journey Complete</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-blue-400">46/46</div>
              <div className="text-sm text-gray-400">Steps Completed</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-purple-400">Live</div>
              <div className="text-sm text-gray-400">Website Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Section */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Final Stage Progress</span>
          </CardTitle>
          <CardDescription>
            Complete these final steps to fully understand your ongoing support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Stage Progress</span>
                <span>{completedActions.length} of {requiredActions.length} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
            {progressPercentage === 100 && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Progressive unlock journey completed!</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  🎉 You've mastered the entire development process and understand your ongoing support options.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Site Performance Metrics */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <span>Live Site Performance</span>
          </CardTitle>
          <CardDescription>
            Real-time metrics and performance indicators for your website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => handleSectionView('metrics')}
              variant={viewedSections.includes('metrics') ? "outline" : "default"}
              className="w-full"
            >
              {viewedSections.includes('metrics') ? "Metrics Reviewed" : "View Performance Metrics"}
            </Button>
            
            {viewedSections.includes('metrics') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {siteMetrics.map((metric) => {
                    const Icon = metric.icon;
                    
                    return (
                      <Card key={metric.id} className="border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Icon className="w-4 h-4 text-blue-400" />
                            <div className="text-sm font-medium text-white">{metric.title}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                            <div className={cn(
                              "text-sm flex items-center space-x-1",
                              metric.trend === 'up' && "text-green-400",
                              metric.trend === 'down' && "text-red-400",
                              metric.trend === 'stable' && "text-gray-400"
                            )}>
                              <TrendingUp className={cn(
                                "w-3 h-3",
                                metric.trend === 'down' && "rotate-180"
                              )} />
                              <span>{metric.change}</span>
                            </div>
                            <div className="text-xs text-gray-400">{metric.description}</div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Performance metrics reviewed!</span>
                  </div>
                  <p className="text-sm text-blue-300 mt-1">
                    Your website is performing excellently across all key metrics.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ongoing Support Services */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HeadphonesIcon className="w-5 h-5 text-green-400" />
            <span>Ongoing Support & Maintenance</span>
          </CardTitle>
          <CardDescription>
            Comprehensive support services to keep your website running smoothly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => handleSectionView('support')}
              variant={viewedSections.includes('support') ? "outline" : "default"}
              className="w-full"
            >
              {viewedSections.includes('support') ? "Support Services Reviewed" : "View Support Services"}
            </Button>
            
            {viewedSections.includes('support') && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supportServices.map((service) => {
                    const Icon = service.icon;
                    
                    return (
                      <Card key={service.id} className="border-slate-600">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className={cn(
                              "flex items-center justify-center w-8 h-8 rounded-full",
                              service.status === 'active' && "bg-green-500",
                              service.status === 'available' && "bg-blue-500",
                              service.status === 'scheduled' && "bg-yellow-500"
                            )}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div>
                                <div className="font-medium text-white">{service.title}</div>
                                <div className="text-sm text-gray-400">{service.description}</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "text-xs",
                                    service.status === 'active' && "border-green-500 text-green-400",
                                    service.status === 'available' && "border-blue-500 text-blue-400",
                                    service.status === 'scheduled' && "border-yellow-500 text-yellow-400"
                                  )}
                                >
                                  {service.status}
                                </Badge>
                              </div>
                              {service.nextAction && (
                                <div className="text-xs text-gray-500 p-2 bg-slate-700 rounded">
                                  {service.nextAction}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
                
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Support services reviewed!</span>
                  </div>
                  <p className="text-sm text-green-300 mt-1">
                    You understand all available maintenance and support options.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Satisfaction Rating */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-400" />
            <span>Rate Your Experience</span>
          </CardTitle>
          <CardDescription>
            How satisfied are you with the development process and final result?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {satisfactionRating === 0 ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-4">Click a star to rate your experience</div>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSatisfactionRating(rating)}
                      className="p-2 hover:bg-yellow-500/20"
                    >
                      <Star className="w-8 h-8 text-gray-400 hover:text-yellow-400" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                <Star className="w-5 h-5" />
                <span className="font-medium">Thank you for your feedback!</span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-gray-300">Your rating:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={cn(
                        "w-4 h-4",
                        star <= satisfactionRating ? "text-yellow-400 fill-current" : "text-gray-600"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-white">({satisfactionRating}/5 stars)</span>
              </div>
              <p className="text-sm text-yellow-300">
                {satisfactionRating >= 4 ? 
                  "We're thrilled you had a great experience! Thank you for choosing SISO." :
                  "Thank you for your feedback. We'll use this to improve our process."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requirements Checklist */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-purple-400" />
            <span>Final Journey Checklist</span>
          </CardTitle>
          <CardDescription>
            Complete understanding of your live website and ongoing support
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {requiredActions.map((action) => {
              const Icon = action.icon;
              const isCompleted = action.completed;
              
              return (
                <div 
                  key={action.id}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200",
                    isCompleted ? "bg-green-500/10 border border-green-500/30" : "bg-slate-700"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full",
                    isCompleted ? "bg-green-500" : "bg-slate-600"
                  )}>
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Icon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className={cn(
                      "font-medium",
                      isCompleted ? "text-green-400" : "text-white"
                    )}>
                      {action.title}
                    </div>
                    <div className="text-sm text-gray-400">{action.description}</div>
                  </div>
                  {isCompleted && (
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Complete
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      {progressPercentage === 100 && (
        <Card className="border-green-500/50 bg-gradient-to-r from-green-500/10 to-blue-500/10">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">🎉 Journey Complete!</h2>
                <p className="text-gray-300">
                  Congratulations! You've successfully completed the entire Progressive Unlock journey. 
                  Your website is live, performing excellently, and you have full understanding of 
                  ongoing support and maintenance options.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center space-y-2 p-4 bg-slate-800 rounded-lg">
                  <div className="text-lg font-bold text-green-400">✅ Live Website</div>
                  <div className="text-sm text-gray-400">Your site is online and serving customers</div>
                </div>
                <div className="text-center space-y-2 p-4 bg-slate-800 rounded-lg">
                  <div className="text-lg font-bold text-blue-400">🔧 24/7 Support</div>
                  <div className="text-sm text-gray-400">Ongoing maintenance and monitoring</div>
                </div>
                <div className="text-center space-y-2 p-4 bg-slate-800 rounded-lg">
                  <div className="text-lg font-bold text-purple-400">📈 Performance</div>
                  <div className="text-sm text-gray-400">Optimized for speed and reliability</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Stage 6 of 6 • Live & Maintenance • ✨ Journey Complete
        </div>
        {progressPercentage === 100 && (
          <Button className="flex items-center space-x-2" variant="outline">
            <CheckCircle className="w-4 h-4" />
            <span>Journey Complete</span>
          </Button>
        )}
      </div>
    </div>
  );
}