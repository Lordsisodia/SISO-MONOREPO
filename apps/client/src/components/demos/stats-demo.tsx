/**
 * Client Stats Demo Component
 * Demonstrates usage of the ClientStats component
 */

import { ClientStats } from "@/components/ui/stats-section";

function StatsDemo() {
  return (
    <div className="w-full bg-siso-bg">
      {/* Basic Usage - Uses default stats */}
      <ClientStats />

      {/* Custom Stats */}
      <ClientStats
        stats={{
          appsCreated: { value: 89, change: '+23.1%' },
          totalRevenue: { value: 5200000, change: '+45.2%', currency: 'GBP' },
          avgAppSize: { value: '312k', change: '+8.7%' },
          dailyActiveUsers: { value: 285000, change: '+31.5%' },
        }}
      />
    </div>
  );
}

export { StatsDemo };
