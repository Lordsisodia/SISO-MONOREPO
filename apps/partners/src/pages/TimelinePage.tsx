import { Helmet } from 'react-helmet';
import { DashboardLayout } from '@/components/dashboard/layout/DashboardLayout';
import { PDRProjectHeader } from '@/components/client/roadmap/PDRProjectHeader';
import { PDRStepTimeline } from '@/components/client/roadmap/PDRStepTimeline';

export default function TimelinePage() {
  return (
    <DashboardLayout>
      <Helmet>
        <title>Project Roadmap | SISO Resource Hub</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <PDRProjectHeader />
        <PDRStepTimeline />
      </div>
    </DashboardLayout>
  );
}
