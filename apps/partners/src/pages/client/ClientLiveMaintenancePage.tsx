import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  Users, 
  AlertCircle,
  CheckCircle,
  BarChart,
  Shield,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ClientLiveMaintenancePage() {
  // Mock analytics data
  const metrics = [
    { label: 'Active Users', value: '2,847', change: '+12%', trend: 'up' },
    { label: 'Page Views', value: '45.2K', change: '+23%', trend: 'up' },
    { label: 'Avg Load Time', value: '1.8s', change: '-15%', trend: 'down' },
    { label: 'Uptime', value: '99.9%', change: '0%', trend: 'stable' },
  ];

  const alerts = [
    { type: 'success', message: 'All systems operational', time: 'Now' },
    { type: 'warning', message: 'High traffic detected on /products', time: '10 mins ago' },
    { type: 'info', message: 'Backup completed successfully', time: '1 hour ago' },
  ];

  const upcomingTasks = [
    { task: 'Security patch update', due: 'Tomorrow', priority: 'high' },
    { task: 'Performance optimization', due: 'Next week', priority: 'medium' },
    { task: 'Content refresh', due: 'In 2 weeks', priority: 'low' },
  ];

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
                    <Activity className="w-6 h-6 text-siso-orange" />
                    Live Maintenance & Growth
                  </CardTitle>
                  <CardDescription className="text-siso-text-muted">
                    Monitor performance and scale your live project
                  </CardDescription>
                </div>
                <Badge className="bg-siso-orange/20 text-siso-orange border-siso-orange/40">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-siso-bg-alt border-siso-border">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-siso-text-muted">{metric.label}</p>
                        <p className="text-2xl font-bold text-siso-text-bold mt-1">{metric.value}</p>
                      </div>
                      <Badge className={`
                        ${metric.trend === 'up' ? 'bg-siso-orange/20 text-siso-orange' : ''}
                        ${metric.trend === 'down' ? 'bg-siso-red/20 text-siso-red' : ''}
                        ${metric.trend === 'stable' ? 'bg-siso-border text-siso-text-muted' : ''}
                      `}>
                        {metric.change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* System Status */}
            <Card className="bg-siso-bg-alt border-siso-border">
              <CardHeader>
                <CardTitle className="text-lg text-siso-text-bold flex items-center gap-2">
                  <Shield className="w-5 h-5 text-siso-orange" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-siso-bg rounded-lg">
                      {alert.type === 'success' && <CheckCircle className="w-5 h-5 text-siso-orange mt-0.5" />}
                      {alert.type === 'warning' && <AlertCircle className="w-5 h-5 text-siso-red mt-0.5" />}
                      {alert.type === 'info' && <Activity className="w-5 h-5 text-siso-text mt-0.5" />}
                      <div className="flex-1">
                        <p className="text-sm text-siso-text">{alert.message}</p>
                        <p className="text-xs text-siso-text-muted mt-1">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Maintenance */}
            <Card className="bg-siso-bg-alt border-siso-border">
              <CardHeader>
                <CardTitle className="text-lg text-siso-text-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-siso-orange" />
                  Upcoming Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-siso-bg rounded-lg">
                      <div>
                        <p className="text-sm text-siso-text">{task.task}</p>
                        <p className="text-xs text-siso-text-muted mt-1">Due: {task.due}</p>
                      </div>
                      <Badge className={`
                        ${task.priority === 'high' ? 'bg-siso-red/20 text-siso-red' : ''}
                        ${task.priority === 'medium' ? 'bg-siso-orange/20 text-siso-orange' : ''}
                        ${task.priority === 'low' ? 'bg-siso-border text-siso-text-muted' : ''}
                      `}>
                        {task.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="bg-siso-bg-alt border-siso-border mt-6">
            <CardHeader>
              <CardTitle className="text-lg text-siso-text-bold flex items-center gap-2">
                <BarChart className="w-5 h-5 text-siso-text" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-siso-bg rounded-lg flex items-center justify-center">
                <p className="text-siso-text-muted">Performance chart visualization</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}