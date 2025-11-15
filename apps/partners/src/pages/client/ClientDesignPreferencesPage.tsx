import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { MoodBoardGenerator } from '@/components/client/mood-board/MoodBoardGenerator';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientDesignPreferencesPage() {
  const navigate = useNavigate();
  
  const handleComplete = (preferences: any) => {
    // Save completion status
    const user = JSON.parse(localStorage.getItem('sb-xkrxhkxqbyrrmjsmcbrx-auth-token') || '{}').user;
    if (user) {
      const progress = JSON.parse(localStorage.getItem(`dashboard_progress_${user.id}`) || '{}');
      progress.hasCompletedDesignDiscovery = true;
      localStorage.setItem(`dashboard_progress_${user.id}`, JSON.stringify(progress));
    }
    navigate('/home');
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
          <Card className="bg-siso-bg-alt border-siso-border">
            <CardHeader>
              <CardTitle className="text-2xl text-siso-text-bold flex items-center gap-2">
                <Palette className="w-6 h-6 text-siso-orange" />
                Design Preferences
              </CardTitle>
              <CardDescription className="text-siso-text-muted">
                Create your mood board and define your design preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MoodBoardGenerator onComplete={handleComplete} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}