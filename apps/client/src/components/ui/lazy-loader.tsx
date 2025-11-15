import React, { Suspense, lazy } from 'react';
import { Skeleton } from './skeleton';
import { Card, CardContent } from './card';
import { Loader2 } from 'lucide-react';
import { ErrorBoundary } from './error-boundary';

interface LazyLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  skeleton?: 'card' | 'dashboard' | 'table' | 'custom';
  minHeight?: string;
  error?: React.ReactNode;
}

// Default loading skeletons for different UI patterns
const DefaultSkeletons = {
  card: (
    <Card className="bg-siso-bg-secondary backdrop-blur-sm border border-siso-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4 bg-siso-text-muted/20" />
          <Skeleton className="h-4 w-full bg-siso-text-muted/20" />
          <Skeleton className="h-4 w-2/3 bg-siso-text-muted/20" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 bg-siso-text-muted/20" />
            <Skeleton className="h-8 w-16 bg-siso-text-muted/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  
  dashboard: (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-siso-bg-secondary border border-siso-border">
            <CardContent className="p-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 bg-siso-text-muted/20" />
                <Skeleton className="h-8 w-20 bg-siso-text-muted/20" />
                <Skeleton className="h-3 w-24 bg-siso-text-muted/20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-siso-bg-secondary border border-siso-border">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32 bg-siso-text-muted/20" />
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded bg-siso-text-muted/20" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-4 w-3/4 bg-siso-text-muted/20" />
                    <Skeleton className="h-3 w-1/2 bg-siso-text-muted/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),

  table: (
    <Card className="bg-siso-bg-secondary border border-siso-border">
      <CardContent className="p-0">
        <div className="overflow-hidden">
          {/* Table header */}
          <div className="border-b border-siso-border p-4 bg-siso-bg-tertiary/50">
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1 bg-siso-text-muted/20" />
              ))}
            </div>
          </div>
          {/* Table rows */}
          <div className="divide-y divide-siso-border">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-4">
                <div className="flex gap-4">
                  {[...Array(4)].map((_, j) => (
                    <Skeleton key={j} className="h-4 flex-1 bg-siso-text-muted/20" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// Loading component with spinner
export const LoadingSpinner = ({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`animate-spin text-siso-orange ${sizeClasses[size]}`} />
    </div>
  );
};

// Main lazy loader component
export const LazyLoader: React.FC<LazyLoaderProps> = ({
  children,
  fallback,
  skeleton = 'card',
  minHeight,
  error
}) => {
  const loadingFallback = fallback || DefaultSkeletons[skeleton] || (
    <div className="flex items-center justify-center p-8" style={{ minHeight }}>
      <LoadingSpinner />
    </div>
  );

  return (
    <ErrorBoundary fallback={error}>
      <Suspense fallback={loadingFallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

// Helper function to create lazy-loaded components with consistent loading states
export const createLazyComponent = <T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    skeleton?: LazyLoaderProps['skeleton'];
    fallback?: React.ReactNode;
    minHeight?: string;
  }
) => {
  const LazyComponent = lazy(importFn);
  
  return React.forwardRef<any, React.ComponentProps<T>>((props, ref) => (
    <LazyLoader {...options}>
      <LazyComponent {...props} ref={ref} />
    </LazyLoader>
  ));
};

// HOC for adding loading states to existing components
export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    skeleton?: LazyLoaderProps['skeleton'];
    fallback?: React.ReactNode;
    minHeight?: string;
  }
) => {
  const WrappedComponent = React.forwardRef<any, P>((props, ref) => (
    <LazyLoader {...options}>
      <Component {...props} ref={ref} />
    </LazyLoader>
  ));

  WrappedComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Hook for managing async loading states
export const useAsyncComponent = <T,>(
  asyncFn: () => Promise<T>,
  dependencies: React.DependencyList = []
) => {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    
    setLoading(true);
    setError(null);
    
    asyncFn()
      .then(result => {
        if (!cancelled) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, dependencies);

  const retry = React.useCallback(() => {
    setError(null);
    setLoading(true);
    
    asyncFn()
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [asyncFn]);

  return { data, loading, error, retry };
};

// Performance optimization: Memoized lazy loader
export const MemoizedLazyLoader = React.memo(LazyLoader);

export default LazyLoader;