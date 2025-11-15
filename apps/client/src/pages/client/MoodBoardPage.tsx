import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoodBoardGenerator3Column } from '@/components/client/mood-board/MoodBoardGenerator-3Column';

export default function MoodBoardPage() {
  const navigate = useNavigate();

  const handleComplete = (preferences: any) => {
    // Save preferences and navigate to next step
    console.log('Mood board completed:', preferences);
    navigate('/client/dashboard');
  };

  return (
    <div className="min-h-screen bg-siso-bg">
      {/* Header */}
      <header className="border-b border-siso-border bg-siso-bg-secondary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="text-siso-text hover:bg-siso-bg-tertiary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            
            <div className="w-20" /> {/* Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Main Content - Full Width for 3-Column Layout */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <MoodBoardGenerator3Column onComplete={handleComplete} />
      </main>
    </div>
  );
}