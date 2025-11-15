import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Rocket, CheckCircle, XCircle, AlertCircle, Shield, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ClientLaunchPreparationPage() {
  // Mock checklist data
  const launchChecklist = [
    { category: 'Performance', items: [
      { name: 'Page load speed < 3s', status: 'complete' },
      { name: 'Images optimized', status: 'complete' },
      { name: 'Code minified', status: 'pending' },
      { name: 'CDN configured', status: 'pending' },
    ]},
    { category: 'Security', items: [
      { name: 'SSL certificate', status: 'complete' },
      { name: 'Security headers', status: 'complete' },
      { name: 'API authentication', status: 'complete' },
      { name: 'Data encryption', status: 'warning' },
    ]},
    { category: 'SEO & Analytics', items: [
      { name: 'Meta tags', status: 'complete' },
      { name: 'Sitemap generated', status: 'complete' },
      { name: 'Analytics installed', status: 'pending' },
      { name: 'Search console setup', status: 'pending' },
    ]},
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-siso-orange" />;
      case 'pending':
        return <XCircle className="w-4 h-4 text-siso-text-muted" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-siso-red" />;
      default:
        return null;
    }
  };

  const totalItems = launchChecklist.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = launchChecklist.reduce(
    (acc, cat) => acc + cat.items.filter(item => item.status === 'complete').length, 
    0
  );
  const readinessPercentage = (completedItems / totalItems) * 100;

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
              <CardTitle className="text-2xl text-siso-text-bold flex items-center gap-2">
                <Rocket className="w-6 h-6 text-siso-orange" />
                Launch Preparation
              </CardTitle>
              <CardDescription className="text-siso-text-muted">
                Final checks before your project goes live
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-siso-text-muted">Launch Readiness</span>
                  <span className="text-siso-text">{Math.round(readinessPercentage)}%</span>
                </div>
                <Progress value={readinessPercentage} className="h-3 bg-siso-border" />
                <p className="text-sm text-siso-text-muted">
                  {completedItems} of {totalItems} items complete
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            {launchChecklist.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-siso-bg-alt border-siso-border">
                  <CardHeader>
                    <CardTitle className="text-lg text-siso-text-bold flex items-center gap-2">
                      {category.category === 'Performance' && <Zap className="w-5 h-5 text-siso-orange" />}
                      {category.category === 'Security' && <Shield className="w-5 h-5 text-siso-red" />}
                      {category.category === 'SEO & Analytics' && <Globe className="w-5 h-5 text-siso-text" />}
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between p-3 bg-siso-bg rounded-lg">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(item.status)}
                            <span className="text-sm text-siso-text">{item.name}</span>
                          </div>
                          {item.status === 'pending' && (
                            <Button size="sm" variant="outline" className="border-siso-border text-siso-text hover:bg-siso-bg">
                              Fix Now
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="bg-siso-bg-alt border-siso-border mt-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-siso-text-bold">Ready to Launch?</h3>
                  <p className="text-sm text-siso-text-muted mt-1">
                    Complete all checklist items before going live
                  </p>
                </div>
                <Button 
                  size="lg"
                  className={`
                    ${readinessPercentage === 100 
                      ? 'bg-siso-red hover:bg-siso-red/90' 
                      : 'bg-siso-border text-siso-text-muted cursor-not-allowed'
                    }
                  `}
                  disabled={readinessPercentage < 100}
                >
                  <Rocket className="mr-2 h-5 w-5" />
                  Launch Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}