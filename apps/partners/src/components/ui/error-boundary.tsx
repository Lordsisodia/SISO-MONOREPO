import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean;
  maxRetries?: number;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeouts: NodeJS.Timeout[] = [];

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  componentWillUnmount() {
    // Clear any pending retry timeouts
    this.retryTimeouts.forEach(timeout => clearTimeout(timeout));
  }

  handleRetry = () => {
    const { maxRetries = 3 } = this.props;
    const { retryCount } = this.state;

    if (retryCount < maxRetries) {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: retryCount + 1,
      });
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportBug = () => {
    const { error, errorInfo } = this.state;
    const bugReport = {
      error: error?.toString(),
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // Copy to clipboard for easy reporting
    navigator.clipboard.writeText(JSON.stringify(bugReport, null, 2));
    alert('Bug report copied to clipboard! Please paste this when reporting the issue.');
  };

  render() {
    const { hasError, error, errorInfo, retryCount } = this.state;
    const { children, fallback, showDetails = false, maxRetries = 3 } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-siso-bg-secondary border-siso-border">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-red-500/20 border border-red-500/30">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-xl text-siso-text-primary">
                Something went wrong
              </CardTitle>
              <p className="text-siso-text-muted text-sm mt-2">
                An unexpected error occurred while rendering this component.
              </p>
              {retryCount > 0 && (
                <Badge variant="outline" className="mt-2 bg-amber-500/20 text-amber-400 border-amber-500/30">
                  Retry attempt {retryCount}/{maxRetries}
                </Badge>
              )}
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <p className="text-sm text-red-400 font-mono">
                    {error.message}
                  </p>
                </div>
              )}

              {/* Detailed error info for development */}
              {showDetails && errorInfo && process.env.NODE_ENV === 'development' && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-siso-text-muted hover:text-siso-text-secondary">
                    View technical details
                  </summary>
                  <div className="mt-2 p-2 bg-siso-bg-primary rounded border border-siso-border">
                    <pre className="whitespace-pre-wrap text-siso-text-muted overflow-x-auto">
                      {error?.stack}
                    </pre>
                    <hr className="my-2 border-siso-border" />
                    <pre className="whitespace-pre-wrap text-siso-text-muted overflow-x-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                {retryCount < maxRetries && (
                  <Button
                    onClick={this.handleRetry}
                    className="flex-1 bg-siso-orange hover:bg-siso-orange/90"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                  </Button>
                )}
                
                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="flex-1 border-siso-border hover:bg-siso-bg-hover"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>

                {process.env.NODE_ENV === 'development' && (
                  <Button
                    onClick={this.handleReportBug}
                    variant="outline"
                    size="sm"
                    className="border-siso-border hover:bg-siso-bg-hover"
                  >
                    <Bug className="h-4 w-4 mr-2" />
                    Copy Debug Info
                  </Button>
                )}
              </div>

              {retryCount >= maxRetries && (
                <div className="text-center">
                  <p className="text-sm text-siso-text-muted mb-3">
                    Maximum retry attempts reached. Please refresh the page or contact support.
                  </p>
                  <Button
                    onClick={this.handleReset}
                    variant="outline"
                    size="sm"
                    className="border-siso-border hover:bg-siso-bg-hover"
                  >
                    Reset Error State
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );
    }

    return children;
  }
}

// Hook for functional components to use error boundaries
export const useErrorBoundary = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryConfig?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryConfig}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};