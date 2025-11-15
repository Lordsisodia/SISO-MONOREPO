import React from 'react';
import { QuickSetupFlow } from '@/components/client/quick-setup/QuickSetupFlow';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function QuickSetupPage() {
  const navigate = useNavigate();

  const handleComplete = (data: any) => {
    toast.success('Quick setup completed successfully!');
    // Navigate to the client dashboard with the completed setup
    navigate('/client/dashboard', { state: { setupComplete: true, setupData: data } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background">
      <QuickSetupFlow onComplete={handleComplete} />
    </div>
  );
}