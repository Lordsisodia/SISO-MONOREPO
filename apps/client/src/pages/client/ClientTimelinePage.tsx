import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Map, CheckCircle, Clock, AlertCircle, Filter } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { motion } from 'framer-motion';
import { EnhancedTimelineStep } from '@/components/client/timeline/EnhancedTimelineStep';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 46 PDR Steps as per specification
const pdrSteps = [
  { id: 1, category: 'Discovery', name: 'Initial Consultation', status: 'completed' },
  { id: 2, category: 'Discovery', name: 'Business Analysis', status: 'completed' },
  { id: 3, category: 'Discovery', name: 'Market Research', status: 'completed' },
  { id: 4, category: 'Discovery', name: 'Competitor Analysis', status: 'completed' },
  { id: 5, category: 'Discovery', name: 'User Research', status: 'in-progress' },
  { id: 6, category: 'Discovery', name: 'Requirements Gathering', status: 'in-progress' },
  { id: 7, category: 'Planning', name: 'Project Scope Definition', status: 'pending' },
  { id: 8, category: 'Planning', name: 'Technical Architecture', status: 'pending' },
  { id: 9, category: 'Planning', name: 'Database Design', status: 'pending' },
  { id: 10, category: 'Planning', name: 'API Specification', status: 'pending' },
  { id: 11, category: 'Planning', name: 'Security Planning', status: 'pending' },
  { id: 12, category: 'Planning', name: 'Timeline Creation', status: 'pending' },
  { id: 13, category: 'Design', name: 'Brand Guidelines', status: 'pending' },
  { id: 14, category: 'Design', name: 'Wireframing', status: 'pending' },
  { id: 15, category: 'Design', name: 'UI Design', status: 'pending' },
  { id: 16, category: 'Design', name: 'UX Flow', status: 'pending' },
  { id: 17, category: 'Design', name: 'Responsive Design', status: 'pending' },
  { id: 18, category: 'Design', name: 'Design Review', status: 'pending' },
  { id: 19, category: 'Development', name: 'Environment Setup', status: 'pending' },
  { id: 20, category: 'Development', name: 'Frontend Foundation', status: 'pending' },
  { id: 21, category: 'Development', name: 'Backend Architecture', status: 'pending' },
  { id: 22, category: 'Development', name: 'Database Implementation', status: 'pending' },
  { id: 23, category: 'Development', name: 'Authentication System', status: 'pending' },
  { id: 24, category: 'Development', name: 'Core Features', status: 'pending' },
  { id: 25, category: 'Development', name: 'API Development', status: 'pending' },
  { id: 26, category: 'Development', name: 'Third-party Integrations', status: 'pending' },
  { id: 27, category: 'AI Integration', name: 'AI Agent Setup', status: 'pending' },
  { id: 28, category: 'AI Integration', name: 'Model Training', status: 'pending' },
  { id: 29, category: 'AI Integration', name: 'AI Testing', status: 'pending' },
  { id: 30, category: 'AI Integration', name: 'Performance Optimization', status: 'pending' },
  { id: 31, category: 'Testing', name: 'Unit Testing', status: 'pending' },
  { id: 32, category: 'Testing', name: 'Integration Testing', status: 'pending' },
  { id: 33, category: 'Testing', name: 'User Acceptance Testing', status: 'pending' },
  { id: 34, category: 'Testing', name: 'Performance Testing', status: 'pending' },
  { id: 35, category: 'Testing', name: 'Security Testing', status: 'pending' },
  { id: 36, category: 'Testing', name: 'Bug Fixing', status: 'pending' },
  { id: 37, category: 'Deployment', name: 'Server Setup', status: 'pending' },
  { id: 38, category: 'Deployment', name: 'Domain Configuration', status: 'pending' },
  { id: 39, category: 'Deployment', name: 'SSL Certificate', status: 'pending' },
  { id: 40, category: 'Deployment', name: 'Production Deployment', status: 'pending' },
  { id: 41, category: 'Launch', name: 'Final Review', status: 'pending' },
  { id: 42, category: 'Launch', name: 'Launch Preparation', status: 'pending' },
  { id: 43, category: 'Launch', name: 'Go Live', status: 'pending' },
  { id: 44, category: 'Post-Launch', name: 'Monitoring Setup', status: 'pending' },
  { id: 45, category: 'Post-Launch', name: 'Documentation', status: 'pending' },
  { id: 46, category: 'Post-Launch', name: 'Training & Handover', status: 'pending' },
];

export default function ClientTimelinePage() {
  const navigate = useNavigate();
  const { user } = useAuthSession();
  const [completedSteps, setCompletedSteps] = useState(4);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [phaseFilter, setPhaseFilter] = useState<string>('all');
  const progressPercentage = (completedSteps / 46) * 100;

  useEffect(() => {
    // Mark timeline as viewed
    if (user) {
      const progress = JSON.parse(localStorage.getItem(`dashboard_progress_${user.id}`) || '{}');
      if (!progress.hasViewedTimeline) {
        progress.hasViewedTimeline = true;
        localStorage.setItem(`dashboard_progress_${user.id}`, JSON.stringify(progress));
      }
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-siso-orange" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-siso-red animate-pulse" />;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-siso-border" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-siso-orange';
      case 'in-progress':
        return 'text-siso-red';
      default:
        return 'text-siso-text-muted';
    }
  };

  // Group steps by category
  const categories = [...new Set(pdrSteps.map(step => step.category))];
  
  // Filter steps based on phase
  const filteredSteps = phaseFilter === 'all' 
    ? pdrSteps 
    : pdrSteps.filter(step => step.category.toLowerCase() === phaseFilter);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button asChild variant="ghost" className="text-siso-text-muted hover:text-siso-text">
            <Link to="/home">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <Card className="bg-siso-bg-alt border-siso-border mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-siso-text-bold flex items-center gap-2">
                    <Map className="w-6 h-6 text-siso-red" />
                    Timeline & PDR Tracking
                  </CardTitle>
                  <CardDescription className="text-siso-text-muted">
                    Track all 46 steps of your project development
                  </CardDescription>
                </div>
                <Badge className="bg-siso-orange/20 text-siso-orange border-siso-orange/40">
                  {completedSteps}/46 Steps
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-siso-text-muted">Overall Progress</span>
                  <span className="text-siso-text">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-3 bg-siso-border" />
              </div>
            </CardContent>
          </Card>

          {/* Filter Controls */}
          <div className="mb-4 flex items-center gap-4">
            <Select value={phaseFilter} onValueChange={setPhaseFilter}>
              <SelectTrigger className="w-48 bg-siso-bg-alt border-siso-border">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                <SelectItem value="discovery">Discovery</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="ai integration">AI Integration</SelectItem>
                <SelectItem value="testing">Testing</SelectItem>
                <SelectItem value="deployment">Deployment</SelectItem>
                <SelectItem value="launch">Launch</SelectItem>
                <SelectItem value="post-launch">Post-Launch</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Timeline Overview */}
            <div className="lg:col-span-2">
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-siso-text-bold">PDR Steps Timeline</CardTitle>
                    <span className="text-sm text-siso-text-muted">
                      Showing {filteredSteps.length} of {pdrSteps.length} steps
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[700px] overflow-y-auto pr-4 space-y-4 timeline-scroll">
                    {filteredSteps.map((step, index) => (
                      <EnhancedTimelineStep
                        key={step.id}
                        step={{
                          id: step.id,
                          title: step.name,
                          phase: step.category.toLowerCase(),
                          status: step.status as 'not-started' | 'in-progress' | 'completed' | 'blocked',
                          description: `${step.category} phase - ${step.name}`,
                          estimatedHours: 4,
                          deliverables: [`${step.name} completion report`, 'Documentation'],
                          requiresApproval: step.id % 5 === 0
                        }}
                        isActive={step.status === 'in-progress'}
                        isExpanded={expandedStep === step.id}
                        onExpand={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Current Status */}
            <div className="space-y-6">
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardHeader>
                  <CardTitle className="text-lg text-siso-text-bold">Current Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-siso-text mb-1">Discovery Phase</h4>
                      <p className="text-sm text-siso-text-muted">
                        Analyzing your business requirements and market position
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-siso-red" />
                      <span className="text-siso-text-muted">Est. 2 weeks remaining</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-siso-bg-alt border-siso-border">
                <CardHeader>
                  <CardTitle className="text-lg text-siso-text-bold">Recent Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-siso-orange mt-0.5" />
                      <div>
                        <p className="text-sm text-siso-text">Competitor Analysis completed</p>
                        <p className="text-xs text-siso-text-muted">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-4 h-4 text-siso-red mt-0.5" />
                      <div>
                        <p className="text-sm text-siso-text">User Research in progress</p>
                        <p className="text-xs text-siso-text-muted">Started today</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-siso-bg-alt border-siso-border">
                <CardContent className="p-6">
                  <Button 
                    onClick={() => navigate('/client/agent-teams')}
                    className="w-full bg-siso-red hover:bg-siso-red/90"
                  >
                    View Agent Activity
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}