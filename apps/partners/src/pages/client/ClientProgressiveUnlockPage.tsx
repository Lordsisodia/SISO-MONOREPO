import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProgressiveUnlockHub } from '@/components/client/progressive/ProgressiveUnlockHub';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientProgressiveUnlockPage() {
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
              <CardTitle className="text-2xl text-siso-text-bold flex items-center gap-2">
                <Zap className="w-6 h-6 text-siso-orange" />
                Progressive Unlock System
              </CardTitle>
              <CardDescription className="text-siso-text-muted">
                Complete stages to unlock new features and capabilities
              </CardDescription>
            </CardHeader>
          </Card>
          
          <ProgressiveUnlockHub />
        </div>
      </div>
    </DashboardLayout>
  );
}