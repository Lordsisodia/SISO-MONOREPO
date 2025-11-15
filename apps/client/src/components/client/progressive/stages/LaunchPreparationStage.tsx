/**
 * Launch Preparation Stage - Stage 5 of Progressive Unlock System
 * Testing, quality assurance, and launch readiness verification
 */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Globe,
  Zap,
  Monitor,
  Users,
  FileCheck,
  AlertTriangle,
  Settings,
  Database,
  Lock,
  TestTube
} from 'lucide-react';
import { useClientDetails } from '@/hooks/client/useClientDetails';
import { cn } from '@/lib/utils';

interface LaunchPreparationStageProps {
  onComplete?: () => void;
  onNext?: () => void;
}

interface LaunchChecklist {
  id: string;
  category: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  priority: 'high' | 'medium' | 'low';
  icon: React.ElementType;
  estimatedTime: string;
}

interface TestResult {
  id: string;
  test: string;
  status: 'passed' | 'failed' | 'warning';
  description: string;
  details?: string;
}

export function LaunchPreparationStage({ onComplete, onNext }: LaunchPreparationStageProps) {
  const { clientData, loading } = useClientDetails();
  const [completedActions, setCompletedActions] = React.useState<string[]>([]);
  const [viewedSections, setViewedSections] = React.useState<string[]>([]);
  const [acknowledgedReadiness, setAcknowledgedReadiness] = React.useState(false);

  const launchChecklist: LaunchChecklist[] = [
    {
      id: 'functionality_testing',
      category: 'Testing',
      title: 'Functionality Testing',
      description: 'All features tested and working correctly',
      status: 'completed',
      priority: 'high',
      icon: TestTube,
      estimatedTime: '2-3 days'
    },
    {
      id: 'performance_optimization',
      category: 'Performance',
      title: 'Performance Optimization',
      description: 'Site speed and loading optimization completed',
      status: 'completed',
      priority: 'high',
      icon: Zap,
      estimatedTime: '1-2 days'
    },
    {
      id: 'security_audit',
      category: 'Security',
      title: 'Security Audit',
      description: 'Security vulnerabilities checked and resolved',
      status: 'in-progress',
      priority: 'high',
      icon: Shield,
      estimatedTime: '1 day'
    },
    {
      id: 'content_review',
      category: 'Content',
      title: 'Content Review',
      description: 'All content reviewed and approved by client',
      status: 'pending',
      priority: 'medium',
      icon: FileCheck,
      estimatedTime: '0.5 days'
    },
    {
      id: 'domain_setup',
      category: 'Infrastructure',
      title: 'Domain & DNS Setup',
      description: 'Domain configuration and DNS propagation',
      status: 'pending',
      priority: 'high',
      icon: Globe,
      estimatedTime: '0.5 days'
    },
    {
      id: 'ssl_certificate',
      category: 'Security',
      title: 'SSL Certificate',
      description: 'HTTPS security certificate installation',
      status: 'pending',
      priority: 'high',
      icon: Lock,
      estimatedTime: '0.25 days'
    },
    {
      id: 'backup_systems',
      category: 'Infrastructure',
      title: 'Backup Systems',
      description: 'Automated backup and recovery systems',
      status: 'completed',
      priority: 'medium',
      icon: Database,
      estimatedTime: '0.5 days'
    },
    {
      id: 'analytics_setup',
      category: 'Analytics',
      title: 'Analytics & Tracking',
      description: 'Google Analytics and tracking implementation',
      status: 'in-progress',
      priority: 'medium',
      icon: Monitor,
      estimatedTime: '0.5 days'
    }
  ];

  const testResults: TestResult[] = [
    {
      id: 'mobile_responsiveness',
      test: 'Mobile Responsiveness',
      status: 'passed',
      description: 'Site works perfectly on all mobile devices'
    },
    {
      id: 'browser_compatibility',
      test: 'Browser Compatibility',
      status: 'passed',
      description: 'Tested on Chrome, Firefox, Safari, Edge'
    },
    {
      id: 'load_time',
      test: 'Page Load Speed',
      status: 'passed',
      description: 'Average load time: 1.2 seconds',
      details: 'Target: <3 seconds, Achieved: 1.2 seconds'
    },
    {
      id: 'accessibility',
      test: 'Accessibility (WCAG)',
      status: 'warning',
      description: 'Minor accessibility improvements recommended',
      details: 'All critical issues resolved, 2 minor suggestions remain'
    },
    {
      id: 'seo_optimization',
      test: 'SEO Optimization',
      status: 'passed',
      description: 'SEO score: 94/100'
    },
    {
      id: 'form_validation',
      test: 'Form Functionality',
      status: 'passed',
      description: 'All forms tested and validated'
    }
  ];

  const requiredActions = [
    {
      id: 'checklist_reviewed',
      title: 'Review Launch Checklist',
      description: 'Understand all pre-launch requirements',
      icon: FileCheck,
      completed: viewedSections.includes('checklist')
    },
    {
      id: 'tests_reviewed',
      title: 'Review Test Results',
      description: 'Check quality assurance test outcomes',
      icon: TestTube,
      completed: viewedSections.includes('tests')
    },
    {
      id: 'readiness_acknowledged',
      title: 'Acknowledge Launch Readiness',
      description: 'Confirm understanding of launch timeline',
      icon: Rocket,
      completed: acknowledgedReadiness
    }
  ];

  const handleSectionView = (sectionId: string) => {
    if (!viewedSections.includes(sectionId)) {
      setViewedSections([...viewedSections, sectionId]);
    }
  };

  const handleReadinessAcknowledgment = () => {
    setAcknowledgedReadiness(true);
  };

  // Auto-complete actions based on states
  React.useEffect(() => {
    const currentCompleted = requiredActions.filter(action => action.completed).map(action => action.id);
    setCompletedActions(currentCompleted);
    
    // Auto-complete stage if all requirements are met
    if (currentCompleted.length === requiredActions.length && currentCompleted.length > 0) {
      onComplete?.();
    }
  }, [viewedSections, acknowledgedReadiness, onComplete]);

  const progressPercentage = (completedActions.length / requiredActions.length) * 100;
  const checklistProgress = Math.round((launchChecklist.filter(item => item.status === 'completed').length / launchChecklist.length) * 100);
  const testsPassedCount = testResults.filter(test => test.status === 'passed').length;
  const testWarningCount = testResults.filter(test => test.status === 'warning').length;

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
          <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <Rocket className="w-8 h-8 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Ready for Launch
          </h1>
          <p className="text-xl text-gray-400 mt-2">
            Final testing, quality assurance, and launch preparation
          </p>
        </div>
        <Badge variant="outline" className="border-orange-500 text-orange-400">
          Stage 5: Launch Preparation
        </Badge>
      </div>

      {/* Progress Section */}
      <Card className="border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-orange-400" />
            <span>Launch Preparation Progress</span>
          </CardTitle>
          <CardDescription>
            Complete these steps to ensure successful launch
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
                  <span className="font-medium">Launch preparation complete!</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  You're ready for the final stage: Live & Maintenance.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Launch Readiness Overview */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5 text-blue-400" />
              <span>Launch Readiness Overview</span>
            </CardTitle>
            <CardDescription>
              Current status of launch preparation activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-orange-400">{checklistProgress}%</div>
                <div className="text-xs text-gray-400">Checklist Complete</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-green-400">{testsPassedCount}/{testResults.length}</div>
                <div className="text-xs text-gray-400">Tests Passed</div>
              </div>
            </div>
            <Progress value={checklistProgress} className="h-2" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Status:</span>
                <Badge variant="outline" className="border-orange-500 text-orange-400">
                  {checklistProgress >= 90 ? 'Launch Ready' : 'In Preparation'}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Est. Launch:</span>
                <span className="text-white">2-3 business days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Test Results */}
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="w-5 h-5 text-green-400" />
              <span>Quality Assurance Summary</span>
            </CardTitle>
            <CardDescription>
              Latest test results and quality metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-2">
                <div className="text-xl font-bold text-green-400">{testsPassedCount}</div>
                <div className="text-xs text-gray-400">Passed</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-xl font-bold text-yellow-400">{testWarningCount}</div>
                <div className="text-xs text-gray-400">Warnings</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-xl font-bold text-red-400">0</div>
                <div className="text-xs text-gray-400">Failed</div>
              </div>
            </div>
            <Button
              onClick={() => handleSectionView('tests')}
              variant={viewedSections.includes('tests') ? "outline" : "default"}
              className="w-full"
            >
              {viewedSections.includes('tests') ? "Tests Reviewed" : "View Test Details"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Launch Checklist */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileCheck className="w-5 h-5 text-orange-400" />
            <span>Pre-Launch Checklist</span>
          </CardTitle>
          <CardDescription>
            Critical items that must be completed before launch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => handleSectionView('checklist')}
              variant={viewedSections.includes('checklist') ? "outline" : "default"}
              className="w-full"
            >
              {viewedSections.includes('checklist') ? "Checklist Reviewed" : "View Launch Checklist"}
            </Button>
            
            {viewedSections.includes('checklist') && (
              <div className="space-y-3">
                {launchChecklist.map((item) => {
                  const Icon = item.icon;
                  
                  return (
                    <Card key={item.id} className="border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full",
                            item.status === 'completed' && "bg-green-500",
                            item.status === 'in-progress' && "bg-yellow-500",
                            item.status === 'pending' && "bg-slate-600",
                            item.status === 'failed' && "bg-red-500"
                          )}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-white">{item.title}</div>
                              <div className="flex items-center space-x-2">
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "text-xs",
                                    item.priority === 'high' && "border-red-500 text-red-400",
                                    item.priority === 'medium' && "border-yellow-500 text-yellow-400",
                                    item.priority === 'low' && "border-gray-500 text-gray-400"
                                  )}
                                >
                                  {item.priority} priority
                                </Badge>
                                <Badge 
                                  variant="outline" 
                                  className={cn(
                                    "text-xs",
                                    item.status === 'completed' && "border-green-500 text-green-400",
                                    item.status === 'in-progress' && "border-yellow-500 text-yellow-400",
                                    item.status === 'pending' && "border-gray-500 text-gray-400",
                                    item.status === 'failed' && "border-red-500 text-red-400"
                                  )}
                                >
                                  {item.status.replace('-', ' ')}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-sm text-gray-400 mt-1">{item.description}</div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-xs text-gray-500">{item.category}</div>
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{item.estimatedTime}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-orange-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Launch checklist reviewed!</span>
                  </div>
                  <p className="text-sm text-orange-300 mt-1">
                    You understand all pre-launch requirements and their current status.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Test Results */}
      {viewedSections.includes('tests') && (
        <Card className="border-slate-700 bg-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="w-5 h-5 text-green-400" />
              <span>Detailed Test Results</span>
            </CardTitle>
            <CardDescription>
              Comprehensive quality assurance test outcomes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {testResults.map((test) => (
                <Card key={test.id} className="border-slate-600">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full",
                        test.status === 'passed' && "bg-green-500",
                        test.status === 'warning' && "bg-yellow-500",
                        test.status === 'failed' && "bg-red-500"
                      )}>
                        {test.status === 'passed' && <CheckCircle className="w-4 h-4 text-white" />}
                        {test.status === 'warning' && <AlertTriangle className="w-4 h-4 text-white" />}
                        {test.status === 'failed' && <AlertTriangle className="w-4 h-4 text-white" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-white">{test.test}</div>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "text-xs",
                              test.status === 'passed' && "border-green-500 text-green-400",
                              test.status === 'warning' && "border-yellow-500 text-yellow-400",
                              test.status === 'failed' && "border-red-500 text-red-400"
                            )}
                          >
                            {test.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">{test.description}</div>
                        {test.details && (
                          <div className="text-xs text-gray-500 mt-2 p-2 bg-slate-700 rounded">
                            {test.details}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Test results reviewed!</span>
                </div>
                <p className="text-sm text-green-300 mt-1">
                  Quality assurance tests show excellent performance and reliability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Launch Readiness Confirmation */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Rocket className="w-5 h-5 text-purple-400" />
            <span>Launch Readiness Confirmation</span>
          </CardTitle>
          <CardDescription>
            Final confirmation before proceeding to launch
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!acknowledgedReadiness ? (
            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="font-medium text-white">Ready to Launch?</div>
                  <div className="text-sm text-gray-300">
                    Based on our testing and preparation, your project is ready for launch. 
                    The final steps include domain configuration and go-live deployment.
                  </div>
                  <div className="text-sm text-gray-400">
                    • All major functionality tested and verified<br/>
                    • Performance optimization completed<br/>
                    • Security measures implemented<br/>
                    • Backup systems in place
                  </div>
                </div>
              </div>
              <Button
                onClick={handleReadinessAcknowledgment}
                className="w-full flex items-center space-x-2"
              >
                <Rocket className="w-4 h-4" />
                <span>I understand - Ready to proceed with launch</span>
              </Button>
            </div>
          ) : (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-400">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Launch readiness acknowledged!</span>
              </div>
              <p className="text-sm text-green-300 mt-1">
                You've confirmed understanding of the launch process and timeline.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Requirements Checklist */}
      <Card className="border-slate-700 bg-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-yellow-400" />
            <span>Preparation Checklist</span>
          </CardTitle>
          <CardDescription>
            Confirm your understanding of launch preparation
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

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-400">
          Stage 5 of 6 • Launch Preparation
        </div>
        <Button 
          onClick={onNext}
          disabled={progressPercentage < 100}
          className="flex items-center space-x-2"
        >
          <span>Continue to Live & Maintenance</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}