
import { ReactNode, useState } from "react";
import { ClientDashboardSidebar } from "./ClientDashboardSidebar";
import { ActivityFeedSidebar } from "./dashboard/ActivityFeedSidebar";

/**
 * Custom layout for client dashboard, matches admin dashboard glassmorphism and padding.
 */
interface ClientDashboardLayoutProps {
  children: ReactNode;
}

export function ClientDashboardLayout({ children }: ClientDashboardLayoutProps) {
  const [isActivityFeedOpen, setIsActivityFeedOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-siso-bg to-black/95">
      <ClientDashboardSidebar />
      <main className="flex-1 main-scroll-container py-4 px-2 sm:p-8 bg-transparent">
        <div className="container mx-auto max-w-6xl">
          {children}
        </div>
      </main>
      {/* Activity Feed Sidebar */}
      <ActivityFeedSidebar 
        isOpen={isActivityFeedOpen} 
        onToggle={() => setIsActivityFeedOpen(!isActivityFeedOpen)} 
      />
    </div>
  );
}
