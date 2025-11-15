import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Zap, Eye, Code, RefreshCw, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientWorkInProgressPage() {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

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
                    <Zap className="w-6 h-6 text-siso-orange" />
                    Work in Progress
                  </CardTitle>
                  <CardDescription className="text-siso-text-muted">
                    Live preview your project as it's being built
                  </CardDescription>
                </div>
                <Badge className="bg-siso-orange/20 text-siso-orange border-siso-orange/40">
                  <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                  Live Updates
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="preview" className="space-y-4">
            <TabsList className="bg-siso-bg-alt border border-siso-border">
              <TabsTrigger value="preview" className="data-[state=active]:bg-siso-bg">
                <Eye className="w-4 h-4 mr-2" />
                Live Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="data-[state=active]:bg-siso-bg">
                <Code className="w-4 h-4 mr-2" />
                Code Changes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="space-y-4">
              {/* Device Controls */}
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={deviceView === 'desktop' ? 'default' : 'outline'}
                        onClick={() => setDeviceView('desktop')}
                        className={deviceView === 'desktop' ? 'bg-siso-red' : 'border-siso-border'}
                      >
                        <Monitor className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={deviceView === 'tablet' ? 'default' : 'outline'}
                        onClick={() => setDeviceView('tablet')}
                        className={deviceView === 'tablet' ? 'bg-siso-red' : 'border-siso-border'}
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={deviceView === 'mobile' ? 'default' : 'outline'}
                        onClick={() => setDeviceView('mobile')}
                        className={deviceView === 'mobile' ? 'bg-siso-red' : 'border-siso-border'}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-siso-text-muted">Auto-refresh</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                          className={`border-siso-border ${isAutoRefresh ? 'bg-siso-orange/20' : ''}`}
                        >
                          {isAutoRefresh ? 'On' : 'Off'}
                        </Button>
                      </div>
                      <Button size="sm" variant="outline" className="border-siso-border">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Live Preview */}
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardContent className="p-0">
                  <div 
                    className={`
                      bg-siso-bg-alt rounded-lg mx-auto transition-all duration-300
                      ${deviceView === 'desktop' ? 'w-full' : ''}
                      ${deviceView === 'tablet' ? 'max-w-3xl' : ''}
                      ${deviceView === 'mobile' ? 'max-w-sm' : ''}
                    `}
                    style={{ height: '600px' }}
                  >
                    <iframe
                      src="https://example.com"
                      className="w-full h-full rounded-lg"
                      title="Live Preview"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="code" className="space-y-4">
              <Card className="bg-siso-bg-alt border-siso-border">
                <CardHeader>
                  <CardTitle className="text-lg text-siso-text-bold">Recent Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock code changes */}
                    {[
                      { file: 'components/Header.tsx', changes: '+42 -12', time: '2 minutes ago' },
                      { file: 'styles/globals.css', changes: '+18 -5', time: '5 minutes ago' },
                      { file: 'pages/index.tsx', changes: '+67 -23', time: '10 minutes ago' },
                    ].map((change, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-siso-bg rounded-lg">
                        <div>
                          <p className="text-sm font-mono text-siso-text">{change.file}</p>
                          <p className="text-xs text-siso-text-muted">{change.time}</p>
                        </div>
                        <Badge className="bg-siso-orange/20 text-siso-orange border-siso-orange/40">
                          {change.changes}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}