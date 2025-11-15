import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, CheckCircle, Download, Send, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthSession } from '@/hooks/useAuthSession';
import { motion } from 'framer-motion';

export default function ClientAppPlanPage() {
  const navigate = useNavigate();
  const { user } = useAuthSession();
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAcceptPlan = () => {
    if (user) {
      const progress = JSON.parse(localStorage.getItem(`dashboard_progress_${user.id}`) || '{}');
      progress.hasAcceptedAppPlan = true;
      localStorage.setItem(`dashboard_progress_${user.id}`, JSON.stringify(progress));
      setHasAccepted(true);
      
      // Navigate to timeline after accepting
      setTimeout(() => {
        navigate('/client/timeline');
      }, 1500);
    }
  };

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
        
        <div className="max-w-6xl mx-auto">
          <Card className="bg-siso-bg-alt border-siso-border mb-6">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-siso-text-bold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-siso-red" />
                    Your App Plan
                  </CardTitle>
                  <CardDescription className="text-siso-text-muted">
                    Review your custom project plan and development roadmap
                  </CardDescription>
                </div>
                {hasAccepted && (
                  <Badge className="bg-siso-orange/20 text-siso-orange border-siso-orange/40">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Accepted
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="bg-siso-bg-alt border border-siso-border">
              <TabsTrigger value="overview" className="data-[state=active]:bg-siso-bg">
                <Eye className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-siso-bg">
                <FileText className="w-4 h-4 mr-2" />
                Features
              </TabsTrigger>
              <TabsTrigger value="timeline" className="data-[state=active]:bg-siso-bg">
                <CheckCircle className="w-4 h-4 mr-2" />
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardHeader>
                  <CardTitle className="text-lg text-siso-text-bold">Project Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-siso-text mb-2">Project Type</h4>
                    <p className="text-siso-text-muted">Full-Stack Web Application with AI Integration</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-siso-text mb-2">Estimated Timeline</h4>
                    <p className="text-siso-text-muted">12-16 weeks from approval</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-siso-text mb-2">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge className="bg-siso-bg border-siso-border">React</Badge>
                      <Badge className="bg-siso-bg border-siso-border">TypeScript</Badge>
                      <Badge className="bg-siso-bg border-siso-border">Supabase</Badge>
                      <Badge className="bg-siso-bg border-siso-border">AI Agents</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardHeader>
                  <CardTitle className="text-lg text-siso-text-bold">Core Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      'User Authentication & Authorization',
                      'Real-time Dashboard Analytics',
                      'AI-Powered Content Generation',
                      'Payment Processing Integration',
                      'Mobile Responsive Design',
                      'Advanced Search & Filtering',
                      'Automated Email Notifications',
                      'API Integration Layer'
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 bg-siso-bg rounded-lg"
                      >
                        <CheckCircle className="w-5 h-5 text-siso-orange" />
                        <span className="text-siso-text">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardHeader>
                  <CardTitle className="text-lg text-siso-text-bold">Development Phases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { phase: 'Phase 1: Foundation', duration: '2 weeks', items: ['Setup', 'Architecture', 'Database'] },
                      { phase: 'Phase 2: Core Features', duration: '4 weeks', items: ['Authentication', 'Dashboard', 'API'] },
                      { phase: 'Phase 3: AI Integration', duration: '3 weeks', items: ['Agent Setup', 'Training', 'Testing'] },
                      { phase: 'Phase 4: Polish & Launch', duration: '3 weeks', items: ['UI Polish', 'Testing', 'Deployment'] }
                    ].map((phase, index) => (
                      <div key={index} className="border-l-2 border-siso-orange/40 pl-4">
                        <h4 className="font-semibold text-siso-text">{phase.phase}</h4>
                        <p className="text-sm text-siso-text-muted mb-2">{phase.duration}</p>
                        <div className="text-sm text-siso-text-muted">
                          {phase.items.join(' • ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {!hasAccepted && (
            <Card className="bg-siso-bg-alt border-siso-border mt-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-siso-text-bold">Ready to proceed?</h3>
                    <p className="text-sm text-siso-text-muted mt-1">
                      Accept the plan to unlock timeline tracking, agent teams, and payment setup
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      className="border-siso-border text-siso-text hover:bg-siso-bg"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button 
                      onClick={handleAcceptPlan}
                      className="bg-siso-red hover:bg-siso-red/90"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Accept Plan
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}