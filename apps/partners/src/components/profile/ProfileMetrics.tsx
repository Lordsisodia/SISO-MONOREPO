
import { LoginStreakTracker } from '@/components/points/LoginStreakTracker';
import { PointsDisplay } from '@/components/points/PointsDisplay';

interface ProfileMetricsProps {
  userId: string;
}

export const ProfileMetrics = ({ userId }: ProfileMetricsProps) => {
  return (
    <>
      <div className="md:col-span-3">
        <LoginStreakTracker userId={userId} />
      </div>
      
      <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-siso-text/10 hover:border-siso-orange/50 transition-colors">
          <PointsDisplay userId={userId} />
        </div>
        
        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-siso-text/10 hover:border-siso-orange/50 transition-colors">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Partnership Rewards</h3>
            <p className="text-siso-text/80 text-sm">Commission tracking and partnership benefits coming soon</p>
          </div>
        </div>

        <div className="bg-black/20 rounded-xl p-6 backdrop-blur-sm border border-siso-text/10 hover:border-siso-orange/50 transition-colors">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-siso-text-bold mb-2">Referral Stats</h3>
            <p className="text-siso-text/80 text-sm">Track your referral performance and earnings</p>
          </div>
        </div>
      </div>
    </>
  );
};
