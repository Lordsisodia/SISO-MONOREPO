import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  EnhancedWallet,
  WalletCurrency,
  Transaction,
  TaxManagement,
  WalletAnalytics,
  PartnerIntegration,
  FinancialTools
} from '../types/enhanced-wallet.types';

interface UseEnhancedWalletOptions {
  partnerId: string;
  realTimeUpdates?: boolean;
  currency?: string;
  autoRefresh?: boolean;
}

interface EnhancedWalletData {
  wallet: EnhancedWallet | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isLive: boolean;
}

export const useEnhancedWallet = (options: UseEnhancedWalletOptions): EnhancedWalletData & {
  refreshWallet: () => Promise<void>;
  toggleRealTime: (enabled: boolean) => void;
  updateCurrency: (currency: string) => void;
  getBalance: (currency?: string) => number;
  getTransactions: (limit?: number, status?: Transaction['status']) => Transaction[];
  convertCurrency: (amount: number, from: string, to: string) => Promise<number>;
} => {
  const [wallet, setWallet] = useState<EnhancedWallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLive, setIsLive] = useState(options.realTimeUpdates ?? true);

  // Load wallet data
  const loadWallet = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual wallet service
      const response = await fetch(`/api/wallet/${options.partnerId}`);
      if (!response.ok) {
        throw new Error('Failed to load wallet data');
      }

      const walletData: EnhancedWallet = await response.json();
      setWallet(walletData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [options.partnerId]);

  // Real-time updates simulation
  useEffect(() => {
    if (!isLive || !options.autoRefresh) return;

    const interval = setInterval(() => {
      if (wallet) {
        // Simulate real-time balance updates
        setWallet(prev => prev ? {
          ...prev,
          balance: {
            ...prev.balance,
            lastUpdated: new Date(),
            // Simulate small balance changes
            available: prev.balance.available + (Math.random() - 0.5) * 100
          },
          lastUpdated: new Date()
        } : null);
        setLastUpdated(new Date());
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [isLive, options.autoRefresh, wallet]);

  // Initial load
  useEffect(() => {
    loadWallet();
  }, [loadWallet]);

  // Currency conversion
  const convertCurrency = useCallback(async (amount: number, from: string, to: string): Promise<number> => {
    if (!wallet) return amount;

    try {
      // Find exchange rates
      const fromCurrency = wallet.currencies.find(c => c.code === from);
      const toCurrency = wallet.currencies.find(c => c.code === to);

      if (!fromCurrency || !toCurrency) {
        throw new Error('Currency not found');
      }

      // Convert via USD as base
      const usdAmount = from === 'USD' ? amount : amount / fromCurrency.rate.rate;
      const convertedAmount = to === 'USD' ? usdAmount : usdAmount * toCurrency.rate.rate;

      return convertedAmount;
    } catch (error) {
      console.error('Currency conversion failed:', error);
      return amount;
    }
  }, [wallet]);

  // Get balance in specific currency
  const getBalance = useCallback((currency = options.currency || 'USD'): number => {
    if (!wallet) return 0;

    if (currency === wallet.balance.currency) {
      return wallet.balance.available;
    }

    // Convert to requested currency
    return convertCurrency(wallet.balance.available, wallet.balance.currency, currency);
  }, [wallet, options.currency, convertCurrency]);

  // Get transactions with filters
  const getTransactions = useCallback((limit = 20, status?: Transaction['status']): Transaction[] => {
    if (!wallet) return [];

    let transactions = wallet.transactions;

    if (status) {
      transactions = transactions.filter(tx => tx.status === status);
    }

    return transactions
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }, [wallet]);

  const refreshWallet = useCallback(async () => {
    await loadWallet();
  }, [loadWallet]);

  const toggleRealTime = useCallback((enabled: boolean) => {
    setIsLive(enabled);
  }, []);

  const updateCurrency = useCallback((currency: string) => {
    // This would typically update user preferences
    console.log('Currency updated to:', currency);
  }, []);

  return {
    wallet,
    loading,
    error,
    lastUpdated,
    isLive,
    refreshWallet,
    toggleRealTime,
    updateCurrency,
    getBalance,
    getTransactions,
    convertCurrency
  };
};

// Hook for real-time payment processing
export const useRealTimePayments = (partnerId: string) => {
  const [activeTransactions, setActiveTransactions] = useState<Transaction[]>([]);
  const [processing, setProcessing] = useState(false);

  const startTransaction = useCallback(async (transactionData: Partial<Transaction>) => {
    setProcessing(true);

    try {
      // Create new transaction
      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'transfer',
        category: 'withdrawal',
        amount: transactionData.amount || 0,
        currency: transactionData.currency || 'USD',
        description: transactionData.description || 'Transaction',
        status: 'pending',
        paymentMethod: transactionData.paymentMethod || { type: 'bank', id: 'default' },
        reference: `REF-${Date.now()}`,
        metadata: {},
        fees: [],
        relatedEarnings: [],
        realTimeInfo: {
          startedAt: new Date(),
          estimatedCompletion: new Date(Date.now() + 30000), // 30 seconds
          progress: {
            currentStep: 0,
            totalSteps: 4,
            percentage: 0,
            status: 'waiting'
          },
          steps: [
            { id: '1', name: 'Validation', status: 'pending' },
            { id: '2', name: 'Processing', status: 'pending' },
            { id: '3', name: 'Settlement', status: 'pending' },
            { id: '4', name: 'Completion', status: 'pending' }
          ]
        },
        createdAt: new Date(),
        notes: '',
        tags: []
      };

      setActiveTransactions(prev => [...prev, newTransaction]);

      // Simulate processing progress
      const progressInterval = setInterval(() => {
        setActiveTransactions(prev => {
          const updated = prev.map(tx => {
            if (tx.id === newTransaction.id) {
              const nextStep = Math.min(tx.realTimeInfo.progress.currentStep + 1, tx.realTimeInfo.progress.totalSteps);
              const percentage = (nextStep / tx.realTimeInfo.progress.totalSteps) * 100;

              return {
                ...tx,
                realTimeInfo: {
                  ...tx.realTimeInfo,
                  progress: {
                    ...tx.realTimeInfo.progress,
                    currentStep: nextStep,
                    percentage,
                    status: percentage === 100 ? 'completed' : 'processing'
                  },
                  steps: tx.realTimeInfo.steps.map((step, index) => ({
                    ...step,
                    status: index < nextStep ? 'completed' :
                            index === nextStep - 1 ? 'in_progress' : 'pending',
                    startedAt: index === nextStep - 1 ? new Date() : step.startedAt,
                    completedAt: index < nextStep ? new Date() : step.completedAt
                  }))
                }
              };
            }
            return tx;
          }).filter(tx => tx.realTimeInfo.progress.percentage < 100);

          return updated;
        });
      }, 3000);

      // Clear interval and remove transaction after completion
      setTimeout(() => {
        clearInterval(progressInterval);
        setActiveTransactions(prev => prev.filter(tx => tx.id !== newTransaction.id));
      }, 15000);

      return newTransaction;
    } finally {
      setProcessing(false);
    }
  }, []);

  return {
    activeTransactions,
    processing,
    startTransaction
  };
};

// Hook for biometric authentication
export const useBiometricAuth = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    // Check if biometric authentication is supported
    const checkSupport = async () => {
      if ('credentials' in navigator && 'PublicKeyCredential' in window) {
        setIsSupported(true);
        // Check if user is enrolled
        try {
          const credentials = await navigator.credentials.get({
            publicKey: {
              challenge: new Uint8Array(32),
              allowCredentials: []
            }
          });
          setIsEnrolled(!!credentials);
        } catch {
          setIsEnrolled(false);
        }
      }
    };

    checkSupport();
  }, []);

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    setAuthenticating(true);
    try {
      // Simulate biometric authentication
      await new Promise(resolve => setTimeout(resolve, 2000));
      return Math.random() > 0.1; // 90% success rate
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      return false;
    } finally {
      setAuthenticating(false);
    }
  }, [isSupported]);

  const enroll = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      // Simulate enrollment process
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsEnrolled(true);
      return true;
    } catch (error) {
      console.error('Biometric enrollment failed:', error);
      return false;
    }
  }, [isSupported]);

  return {
    isSupported,
    isEnrolled,
    authenticating,
    authenticate,
    enroll
  };
};

// Hook for tax document generation
export const useTaxDocuments = (partnerId: string) => {
  const [documents, setDocuments] = useState<TaxManagement['documents']>([]);
  const [generating, setGenerating] = useState(false);

  const generateDocument = useCallback(async (documentType: string, year: number) => {
    setGenerating(true);

    try {
      // Simulate document generation
      await new Promise(resolve => setTimeout(resolve, 3000));

      const newDocument = {
        id: `tax-${Date.now()}`,
        type: documentType as any,
        year,
        generatedAt: new Date(),
        status: 'ready' as const,
        url: `/api/tax-documents/${Date.now()}.pdf`,
        metadata: {}
      };

      setDocuments(prev => [...prev, newDocument]);
      return newDocument;
    } catch (error) {
      console.error('Document generation failed:', error);
      throw error;
    } finally {
      setGenerating(false);
    }
  }, []);

  return {
    documents,
    generating,
    generateDocument
  };
};

// Hook for financial analytics
export const useFinancialAnalytics = (partnerId: string) => {
  const [analytics, setAnalytics] = useState<WalletAnalytics | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true);
      try {
        // Simulate loading analytics data
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockAnalytics: WalletAnalytics = {
          spending: {
            total: 4500,
            byCategory: [
              { category: 'software', amount: 1200, percentage: 27, trend: { direction: 'up', change: 15, period: 'month' } },
              { category: 'marketing', amount: 800, percentage: 18, trend: { direction: 'down', change: -5, period: 'month' } },
              { category: 'operations', amount: 600, percentage: 13, trend: { direction: 'stable', change: 2, period: 'month' } }
            ],
            byTimePeriod: [],
            trends: [],
            averageTransaction: 150,
            frequency: { perWeek: 12, perMonth: 45, perYear: 240 }
          },
          income: {
            total: 15000,
            sources: [],
            trends: [],
            projections: [],
            growth: { monthly: 8.5, quarterly: 12.3, yearly: 45.6 }
          },
          projections: {
            weekly: [{ date: new Date(), projected: 2500, confidence: 'high', factors: [] }],
            monthly: [{ date: new Date(), projected: 10000, confidence: 'medium', factors: [] }],
            yearly: [{ date: new Date(), projected: 120000, confidence: 'high', factors: [] }],
            confidence: 'high',
            factors: []
          },
          health: {
            score: 78,
            grade: 'B',
            factors: [
              { name: 'Income Stability', score: 85, weight: 30, description: 'Consistent income streams', trend: 'stable' },
              { name: 'Expense Management', score: 72, weight: 25, description: 'Good expense control', trend: 'improving' },
              { name: 'Savings Rate', score: 68, weight: 20, description: 'Could be improved', trend: 'declining' },
              { name: 'Investment Growth', score: 82, weight: 25, description: 'Strong performance', trend: 'improving' }
            ],
            recommendations: [
              'Increase emergency fund to 6 months expenses',
              'Consider tax-advantaged investment accounts',
              'Review and optimize subscription costs'
            ],
            lastCalculated: new Date()
          },
          insights: [
            {
              id: '1',
              title: 'Software spending increased 15%',
              description: 'Your software expenses are trending upward. Consider reviewing subscriptions.',
              priority: 'medium',
              type: 'spending',
              impact: 'high',
              actions: ['Review subscriptions', 'Identify unused tools'],
              createdAt: new Date()
            },
            {
              id: '2',
              title: 'Strong income growth this quarter',
              description: 'Your income has grown 12.3% this quarter. Keep up the great work!',
              priority: 'high',
              type: 'income',
              impact: 'positive',
              actions: ['Reinvest profits', 'Update financial projections'],
              createdAt: new Date()
            }
          ],
          recommendations: [
            {
              id: '1',
              title: 'Optimize tax strategy',
              description: 'Consider maximizing retirement contributions to reduce taxable income',
              category: 'tax',
              impact: 'high',
              priority: 'high'
            }
          ]
        };

        setAnalytics(mockAnalytics);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [partnerId]);

  return {
    analytics,
    loading,
    refresh: () => loadAnalytics()
  };
};