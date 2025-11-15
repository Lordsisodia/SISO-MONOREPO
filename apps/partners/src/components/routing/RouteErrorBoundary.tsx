import { type ReactNode } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

type RouteErrorBoundaryProps = {
  children: ReactNode;
  FallbackComponent?: React.ComponentType<FallbackProps>;
};

function DefaultRouteFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center text-white">
        <h2 className="text-2xl font-semibold">This page hit a snag</h2>
        <p className="text-sm text-gray-300">
          Try reloading this section or navigate elsewhere while we sort this out.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => resetErrorBoundary()}
            className="px-4 py-2 rounded bg-[#ea384c] text-white hover:bg-[#d42c47]"
          >
            Try again
          </button>
          <a
            href="/"
            className="px-4 py-2 rounded border border-[#ea384c] text-[#ea384c] hover:bg-[#ea384c]/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export function RouteErrorBoundary({
  children,
  FallbackComponent,
}: RouteErrorBoundaryProps) {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent ?? DefaultRouteFallback}
      resetKeys={[location.pathname, location.search, location.hash]}
    >
      {children}
    </ErrorBoundary>
  );
}
