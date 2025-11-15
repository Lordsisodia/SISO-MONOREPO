import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Activity,
  DollarSign,
  TrendingUp,
  Zap
} from 'lucide-react';
import { cn } from '@/domains/shared/utils/cn';
import { Transaction, TransactionProgress, ProcessingStep } from '../types/enhanced-wallet.types';

interface RealTimePaymentProcessorProps {
  transactions: Transaction[];
  onTransactionUpdate: (transactionId: string, update: Partial<Transaction>) => void;
  onRefresh: () => void;
  className?: string;
}

const statusIcons = {
  pending: <Clock className="h-4 w-4" />,
  processing: <RefreshCw className="h-4 w-4 animate-spin" />,
  completed: <CheckCircle className="h-4 w-4" />,
  failed: <AlertCircle className="h-4 w-4" />,
  cancelled: <AlertCircle className="h-4 w-4" />,
  refunded: <CheckCircle className="h-4 w-4" />,
  scheduled: <Clock className="h-4 w-4" />
};

const statusColors = {
  pending: 'text-amber-500',
  processing: 'text-blue-500',
  completed: 'text-emerald-500',
  failed: 'text-rose-500',
  cancelled: 'text-slate-500',
  refunded: 'text-emerald-500',
  scheduled: 'text-slate-400'
};

const statusBgColors = {
  pending: 'bg-amber-500/10',
  processing: 'bg-blue-500/10',
  completed: 'bg-emerald-500/10',
  failed: 'bg-rose-500/10',
  cancelled: 'bg-slate-500/10',
  refunded: 'bg-emerald-500/10',
  scheduled: 'bg-slate-400/10'
};

export const RealTimePaymentProcessor: React.FC<RealTimePaymentProcessorProps> = ({
  transactions,
  onTransactionUpdate,
  onRefresh,
  className
}) => {
  const [isLive, setIsLive] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeTransactions, setActiveTransactions] = useState<Transaction[]>(
    transactions.filter(tx => tx.status === 'pending' || tx.status === 'processing')
  );

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Update progress for active transactions
      setActiveTransactions(prev => {
        const updated = prev.map(tx => {
          if (tx.realTimeInfo.progress.currentStep < tx.realTimeInfo.progress.totalSteps) {
            const newProgress = Math.min(
              tx.realTimeInfo.progress.currentStep + 1,
              tx.realTimeInfo.progress.totalSteps
            );

            return {
              ...tx,
              realTimeInfo: {
                ...tx.realTimeInfo,
                progress: {
                  ...tx.realTimeInfo.progress,
                  currentStep: newProgress,
                  percentage: (newProgress / tx.realTimeInfo.progress.totalSteps) * 100
                }
              }
            };
          }
          return tx;
        });

        // Notify parent of updates
        updated.forEach(tx => {
          if (tx.realTimeInfo.progress.percentage === 100) {
            onTransactionUpdate(tx.id, { status: 'completed' });
          }
        });

        return updated.filter(tx => tx.status !== 'completed');
      });

      setLastUpdate(new Date());
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isLive, onTransactionUpdate]);

  const handleRefresh = useCallback(() => {
    onRefresh();
    setLastUpdate(new Date());
  }, [onRefresh]);

  const getEstimatedTimeRemaining = (transaction: Transaction): string => {
    if (!transaction.realTimeInfo.estimatedCompletion) return 'Calculating...';

    const now = new Date();
    const remaining = transaction.realTimeInfo.estimatedCompletion.getTime() - now.getTime();

    if (remaining <= 0) return 'Any moment';

    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);

    if (minutes > 0) {
      return `~${minutes}m ${seconds}s`;
    }
    return `~${seconds}s`;
  };

  const getProcessingSteps = (steps: ProcessingStep[]): ProcessingStep[] => {
    const currentStepIndex = steps.findIndex(step => step.status === 'in_progress');

    return steps.map((step, index) => ({
      ...step,
      status: index < currentStepIndex ? 'completed' :
              index === currentStepIndex ? 'in_progress' : 'pending'
    }));
  };

  if (activeTransactions.length === 0) {
    return (
      <Card className={cn("p-6", className)}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-siso-orange" />
            <h3 className="text-lg font-semibold text-siso-text-primary">Real-Time Processing</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn(isLive ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>
              {isLive ? 'Live' : 'Paused'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? 'Pause' : 'Resume'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="text-center py-8">
          <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
          <p className="text-siso-text-muted">No active transactions</p>
          <p className="text-sm text-siso-text-muted/70 mt-1">
            All transactions have been completed
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-siso-orange animate-pulse" />
          <h3 className="text-lg font-semibold text-siso-text-primary">
            Real-Time Processing ({activeTransactions.length} active)
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={cn(isLive ? "bg-emerald-500/10 text-emerald-500" : "bg-slate-500/10 text-slate-500")}>
            {isLive ? 'Live' : 'Paused'}
          </Badge>
          <span className="text-xs text-siso-text-muted">
            Last: {lastUpdate.toLocaleTimeString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? 'Pause' : 'Resume'}
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {activeTransactions.map((transaction) => (
          <div key={transaction.id} className="border border-siso-border rounded-xl p-4 bg-siso-bg-secondary/50">
            {/* Transaction Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-siso-text-primary">
                    {transaction.description}
                  </span>
                  <Badge
                    variant="outline"
                    className={cn(statusBgColors[transaction.status], statusColors[transaction.status])}
                  >
                    <span className="flex items-center gap-1">
                      {statusIcons[transaction.status]}
                      {transaction.status}
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-siso-text-muted">
                    {transaction.reference}
                  </span>
                  <span className="text-sm text-siso-text-muted">
                    <DollarSign className="h-3 w-3 inline mr-1" />
                    {transaction.amount.toLocaleString()} {transaction.currency}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className={cn("text-sm font-medium", statusColors[transaction.status])}>
                  {getEstimatedTimeRemaining(transaction)}
                </div>
                <div className="text-xs text-siso-text-muted mt-1">
                  {transaction.realTimeInfo.progress.percentage.toFixed(0)}% complete
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <Progress
                value={transaction.realTimeInfo.progress.percentage}
                className="h-2"
              />
            </div>

            {/* Processing Steps */}
            <div className="space-y-2">
              <p className="text-xs text-siso-text-muted font-medium">Processing Steps:</p>
              <div className="grid grid-cols-2 gap-2">
                {getProcessingSteps(transaction.realTimeInfo.steps).map((step, index) => (
                  <div key={step.id} className="flex items-center gap-2 text-xs">
                    <div className={cn(
                      "h-4 w-4 rounded-full flex items-center justify-center",
                      step.status === 'completed' ? "bg-emerald-500 text-white" :
                      step.status === 'in_progress' ? "bg-blue-500 text-white animate-pulse" :
                      "bg-siso-border text-siso-text-muted"
                    )}>
                      {step.status === 'completed' ? (
                        <CheckCircle className="h-2 w-2" />
                      ) : step.status === 'in_progress' ? (
                        <RefreshCw className="h-2 w-2 animate-spin" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={cn(
                      step.status === 'completed' ? "text-emerald-500" :
                      step.status === 'in_progress' ? "text-blue-500 font-medium" :
                      "text-siso-text-muted"
                    )}>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Details */}
            {transaction.realTimeInfo.startedAt && (
              <div className="mt-3 pt-3 border-t border-siso-border">
                <div className="flex items-center justify-between text-xs text-siso-text-muted">
                  <span>Started: {transaction.realTimeInfo.startedAt.toLocaleTimeString()}</span>
                  {transaction.realTimeInfo.estimatedCompletion && (
                    <span>ETA: {transaction.realTimeInfo.estimatedCompletion.toLocaleTimeString()}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-siso-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-semibold text-siso-text-primary">
              {activeTransactions.length}
            </div>
            <div className="text-xs text-siso-text-muted">Active</div>
          </div>
          <div>
            <div className="text-xl font-semibold text-emerald-500">
              {activeTransactions
                .filter(tx => tx.realTimeInfo.progress.percentage > 75)
                .length
              }
            </div>
            <div className="text-xs text-siso-text-muted">Near Completion</div>
          </div>
          <div>
            <div className="text-xl font-semibold text-siso-orange">
              {activeTransactions
                .reduce((sum, tx) => sum + tx.amount, 0)
                .toLocaleString()}
            </div>
            <div className="text-xs text-siso-text-muted">Total Processing</div>
          </div>
        </div>
      </div>
    </Card>
  );
};