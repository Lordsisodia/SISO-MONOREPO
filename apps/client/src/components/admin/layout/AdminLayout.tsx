
import { ReactNode } from 'react';
import { Sidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-screen w-full bg-gradient-to-b from-siso-bg to-siso-bg/95">
      <Sidebar />
      <main className="flex-1 main-scroll-container">
        {children}
      </main>
    </div>
  );
}
