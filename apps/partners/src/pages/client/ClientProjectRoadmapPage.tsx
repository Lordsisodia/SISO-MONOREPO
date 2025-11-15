import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { ProjectRoadmapStage } from '@/components/client/progressive/stages/ProjectRoadmapStage';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientProjectRoadmapPage() {
  const navigate = useNavigate();
  
  const handleComplete = () => {
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
                <Map className="w-6 h-6 text-siso-red" />
                Project Roadmap
              </CardTitle>
              <CardDescription className="text-siso-text-muted">
                Plan your project timeline and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectRoadmapStage 
                onComplete={handleComplete}
                currentStage={5}
                totalStages={5}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}