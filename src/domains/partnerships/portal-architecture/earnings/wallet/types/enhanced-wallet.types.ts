// Enhanced Wallet Types with High-Priority Features

export interface EnhancedWallet {
  id: string;
  partnerId: string;
  balance: EnhancedWalletBalance;
  currencies: WalletCurrency[];
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  payouts: Payout[];
  security: WalletSecurity;
  settings: WalletSettings;
  status: WalletStatus;
  analytics: WalletAnalytics;
  tax: TaxManagement;
  createdAt: Date;
  lastUpdated: Date;
}

// Enhanced Balance with Real-Time Features
export interface EnhancedWalletBalance {
  total: number;
  available: number;
  pending: number;
  reserved: number;
  currency: string;
  lastUpdated: Date;
  breakdown: BalanceBreakdown[];
  history: BalanceHistory[];
  projections: BalanceProjection[];
  realTimeUpdates: {
    enabled: boolean;
    lastSync: Date;
    updateFrequency: number; // seconds
  };
}

export interface BalanceBreakdown {
  category: 'earnings' | 'bonuses' | 'referrals' | 'adjustments' | 'fees';
  amount: number;
  currency: string;
  percentage: number;
  trend: {
    direction: 'up' | 'down' | 'stable';
    change: number;
    period: 'day' | 'week' | 'month';
  };
}

export interface BalanceHistory {
  date: Date;
  balance: number;
  available: number;
  pending: number;
  change: number;
  changePercent: number;
}

export interface BalanceProjection {
  date: Date;
  projected: number;
  confidence: 'low' | 'medium' | 'high';
  factors: string[];
}

// Multi-Currency Support
export interface WalletCurrency {
  code: string;
  name: string;
  symbol: string;
  balance: number;
  rate: ExchangeRate;
  lastUpdated: Date;
  isDefault: boolean;
  supported: boolean;
  conversionHistory: ConversionHistory[];
}

export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: Date;
  provider: string;
  fee: number;
}

export interface ConversionHistory {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  timestamp: Date;
  reference: string;
}

// Real-Time Transaction Processing
export interface Transaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number;
  currency: string;
  description: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethodInfo;
  reference: string;
  metadata: TransactionMetadata;
  fees: TransactionFee[];
  relatedEarnings: RelatedEarning[];
  realTimeInfo: {
    startedAt?: Date;
    processingAt?: Date;
    estimatedCompletion?: Date;
    progress: TransactionProgress;
    steps: ProcessingStep[];
  };
  createdAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  refundedAt?: Date;
  notes?: string;
  tags: string[];
}

export interface TransactionProgress {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  status: 'waiting' | 'processing' | 'completed' | 'failed';
}

export interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
}

// Enhanced Security Features
export interface WalletSecurity {
  biometricAuth: BiometricAuthentication;
  transactionLimits: TransactionLimits;
  securityAlerts: SecurityAlert[];
  trustedDevices: TrustedDevice[];
  loginSessions: LoginSession[];
  securityScore: number;
  lastSecurityCheck: Date;
}

export interface BiometricAuthentication {
  enabled: boolean;
  methods: BiometricMethod[];
  fallbackRequired: boolean;
  lastUsed?: Date;
  setupComplete: boolean;
}

export interface BiometricMethod {
  type: 'face_id' | 'fingerprint' | 'voice' | 'iris';
  enabled: boolean;
  name: string;
  deviceFingerprint: string;
  enrollmentDate: Date;
  lastUsed?: Date;
}

export interface TransactionLimits {
  daily: LimitConfiguration;
  weekly: LimitConfiguration;
  monthly: LimitConfiguration;
  perTransaction: LimitConfiguration;
  requiresAuthentication: {
    above: number;
    method: 'biometric' | 'pin' | 'multi_factor';
  };
}

export interface LimitConfiguration {
  amount: number;
  currency: string;
  used: number;
  remaining: number;
  resetDate: Date;
}

export interface SecurityAlert {
  id: string;
  type: SecurityAlertType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  acknowledged: boolean;
  actionRequired: boolean;
  actions: SecurityAction[];
}

export interface TrustedDevice {
  id: string;
  name: string;
  type: 'mobile' | 'desktop' | 'tablet';
  deviceFingerprint: string;
  lastUsed: Date;
  trustedUntil: Date;
  restrictions: DeviceRestrictions[];
}

export interface LoginSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  startedAt: Date;
  expiresAt: Date;
  lastActivity: Date;
  isActive: boolean;
}

// Tax Document Automation
export interface TaxManagement {
  documents: TaxDocument[];
  settings: TaxSettings;
  withholding: WithholdingInfo[];
  summaries: TaxSummary[];
  reporting: TaxReporting;
}

export interface TaxDocument {
  id: string;
  type: TaxDocumentType;
  year: number;
  generatedAt: Date;
  status: 'draft' | 'ready' | 'filed' | 'archived';
  url?: string;
  metadata: TaxDocumentMetadata;
}

export interface TaxSettings {
  taxId: string;
  taxForm: 'W9' | 'W8BEN' | 'other';
  withholdingRate: number;
  exemptions: string[];
  autoFile: boolean;
  notifications: TaxNotifications;
}

export interface TaxSummary {
  id: string;
  year: number;
  totalEarnings: number;
  totalTaxWithheld: number;
  totalDeductions: number;
  taxableIncome: number;
  effectiveRate: number;
  generatedAt: Date;
  pdfUrl?: string;
}

export interface TaxReporting {
  quarterly: boolean;
  annual: boolean;
  forms1099: TaxDocument[];
  formsW8BEN: TaxDocument[];
  generatedReports: TaxDocument[];
}

// Financial Analytics & Insights
export interface WalletAnalytics {
  spending: SpendingAnalytics;
  income: IncomeAnalytics;
  projections: FinancialProjections;
  health: FinancialHealthScore;
  insights: FinancialInsight[];
  recommendations: FinancialRecommendation[];
}

export interface SpendingAnalytics {
  total: number;
  byCategory: CategorySpending[];
  byTimePeriod: TimeSpending[];
  trends: SpendingTrend[];
  averageTransaction: number;
  frequency: TransactionFrequency;
}

export interface IncomeAnalytics {
  total: number;
  sources: IncomeSource[];
  trends: IncomeTrend[];
  projections: IncomeProjection[];
  growth: GrowthMetrics;
}

export interface FinancialProjections {
  weekly: ProjectionData[];
  monthly: ProjectionData[];
  yearly: ProjectionData[];
  confidence: ConfidenceLevel;
  factors: ProjectionFactor[];
}

export interface FinancialHealthScore {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  factors: HealthFactor[];
  recommendations: string[];
  lastCalculated: Date;
}

// Mobile Experience Features
export interface MobileWalletFeatures {
  quickActions: QuickAction[];
  gestureControls: GestureControl[];
  pushNotifications: PushNotificationSettings;
  offlineMode: OfflineModeConfig;
  swipeActions: SwipeAction[];
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  action: string;
  requiresAuth: boolean;
  priority: number;
}

export interface SwipeAction {
  direction: 'left' | 'right' | 'up' | 'down';
  action: string;
  icon: string;
  color: string;
}

export interface OfflineModeConfig {
  enabled: boolean;
  syncOnReconnect: boolean;
  cachedData: CachedDataType[];
  lastSync: Date;
}

// Partner Integration Features
export interface PartnerIntegration {
  bankConnections: BankConnection[];
  cardConnections: CardConnection[];
  autoPayouts: AutoPayoutConfig[];
  paymentHistory: PaymentHistoryEntry[];
}

export interface BankConnection {
  id: string;
  bankName: string;
  accountType: 'checking' | 'savings' | 'business';
  last4: string;
  status: 'active' | 'pending' | 'suspended' | 'error';
  provider: 'plaid' | 'stripe' | 'wise' | 'direct';
  fees: BankFee[];
  limits: BankLimits;
  lastSync: Date;
}

export interface CardConnection {
  id: string;
  type: 'credit' | 'debit';
  last4: string;
  brand: 'visa' | 'mastercard' | 'amex' | 'discover';
  status: 'active' | 'pending' | 'expired';
  fees: CardFee[];
  limits: CardLimits;
  lastUsed?: Date;
}

export interface AutoPayoutConfig {
  id: string;
  enabled: boolean;
  frequency: 'daily' | 'weekly' | 'monthly' | 'threshold';
  threshold: number;
  method: string;
  maxAmount: number;
  nextRun: Date;
  history: AutoPayoutHistory[];
}

// Financial Tools
export interface FinancialTools {
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  expenseTracking: ExpenseTracking;
  financialCalendar: FinancialCalendar;
}

export interface Budget {
  id: string;
  name: string;
  category: string;
  amount: number;
  spent: number;
  remaining: number;
  period: 'weekly' | 'monthly' | 'yearly';
  startDate: Date;
  endDate: Date;
  alerts: BudgetAlert[];
}

export interface SavingsGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: Date;
  category: string;
  autoContribution: AutoContributionConfig;
  milestones: SavingsMilestone[];
}

export interface ExpenseTracking {
  categories: ExpenseCategory[];
  rules: CategorizationRule[];
  recurringExpenses: RecurringExpense[];
  insights: ExpenseInsight[];
}

export interface FinancialCalendar {
  events: CalendarEvent[];
  reminders: CalendarReminder[];
  templates: CalendarTemplate[];
}

// Enums and Type Definitions
export type TransactionType =
  | 'credit'
  | 'debit'
  | 'transfer'
  | 'refund'
  | 'fee'
  | 'withdrawal'
  | 'deposit'
  | 'conversion'
  | 'adjustment';

export type TransactionStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'scheduled';

export type TransactionCategory =
  | 'earnings'
  | 'referral'
  | 'bonus'
  | 'fee'
  | 'withdrawal'
  | 'deposit'
  | 'transfer'
  | 'conversion'
  | 'adjustment'
  | 'other';

export type PaymentType =
  | 'bank_transfer'
  | 'paypal'
  | 'stripe'
  | 'crypto'
  | 'check'
  | 'wire'
  | 'card'
  | 'mobile_payment';

export type PaymentMethodStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'suspended'
  | 'expired'
  | 'verification_required';

export type SecurityAlertType =
  | 'unusual_login'
  | 'large_transaction'
  | 'failed_attempts'
  | 'new_device'
  | 'suspicious_activity'
  | 'security_update'
  | 'fraud_alert';

export type TaxDocumentType =
  | '1099-NEC'
  | '1099-K'
  | 'W8BEN'
  | 'W9'
  | 'annual_summary'
  | 'quarterly_report'
  | 'deduction_schedule'
  | 'tax_statement';

export type ConfidenceLevel = 'low' | 'medium' | 'high';

export type HealthFactor = {
  name: string;
  score: number;
  weight: number;
  description: string;
  trend: 'improving' | 'stable' | 'declining';
};