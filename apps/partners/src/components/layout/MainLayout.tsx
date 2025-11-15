
import React from 'react';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <ErrorBoundary
      showDetails={process.env.NODE_ENV === 'development'}
      onError={(error, errorInfo) => {
        // Log to console for debugging
        console.error('Layout Error:', error, errorInfo);
        
        // In production, send to error tracking service
        if (process.env.NODE_ENV === 'production') {
          // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
        }
      }}
    >
      {children}
      <Toaster 
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--siso-bg-secondary)',
            border: '1px solid var(--siso-border)',
            color: 'var(--siso-text-primary)',
          },
        }}
      />
    </ErrorBoundary>
  );
};
