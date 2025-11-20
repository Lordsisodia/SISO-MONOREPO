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

export interface PaymentMethod {
  id: string;
  type: PaymentType;
  name: string;
  description?: string;
  details: PaymentMethodDetails;
  verification: PaymentVerification;
  security: PaymentSecurity;
  status: PaymentMethodStatus;
  isDefault: boolean;
  currency: string;
  limits: PaymentLimit[];
  fees: PaymentFee[];
  createdAt: Date;
  lastUsed?: Date;
}

export interface PaymentMethodDetails {
  provider: string;
  accountType?: 'checking' | 'savings' | 'business' | 'wallet';
  last4?: string;
  bankName?: string;
  country?: string;
  routingNumberMasked?: string;
  accountHolder?: string;
  payoutSchedule?: string;
  supportedCurrencies?: string[];
  metadata?: Record<string, string>;
}

export type PaymentVerificationStatus = 'required' | 'pending' | 'verified' | 'failed';

export interface PaymentVerification {
  status: PaymentVerificationStatus;
  requestedAt?: Date;
  completedAt?: Date;
  methods?: Array<'micro_deposit' | 'instant' | 'document_upload'>;
  requiredDocuments?: string[];
  notes?: string;
}

export interface PaymentSecurity {
  riskScore: number;
  twoFactorRequired: boolean;
  lastAudit: Date;
  recentAlerts: SecurityAlert[];
}

export interface PaymentLimit {
  id: string;
  type: 'daily' | 'weekly' | 'monthly' | 'per_transaction';
  amount: number;
  currency: string;
  used: number;
  remaining: number;
  resetDate?: Date;
  requiresReview?: boolean;
}

export interface PaymentFee {
  id: string;
  label: string;
  type: 'percentage' | 'flat';
  amount: number;
  currency: string;
  description?: string;
}

export interface PaymentMethodInfo {
  id: string;
  type: PaymentType;
  label?: string;
  last4?: string;
  provider?: string;
  status?: PaymentMethodStatus;
}

export interface Payout {
  id: string;
  amount: number;
  currency: string;
  status: 'scheduled' | 'processing' | 'completed' | 'failed' | 'cancelled';
  scheduledDate: Date;
  processedAt?: Date;
  destination: PaymentMethodInfo;
  reference: string;
  description?: string;
  fees?: PaymentFee[];
}

export interface WalletSettings {
  preferredCurrency: string;
  notificationPreferences: WalletNotificationPreferences;
  payoutPreferences: PayoutPreferences;
  securityPreferences: WalletSecurityPreferences;
  featureFlags: WalletFeatureFlags;
}

export interface WalletNotificationPreferences {
  payouts: boolean;
  compliance: boolean;
  insights: boolean;
  productUpdates: boolean;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface PayoutPreferences {
  defaultMethodId: string;
  schedule: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'threshold';
  thresholdAmount?: number;
  autoInvest?: boolean;
}

export interface WalletSecurityPreferences {
  twoFactorAuth: boolean;
  deviceNotifications: boolean;
  sessionTimeoutMinutes: number;
  trustedDeviceLimit: number;
}

export interface WalletFeatureFlags {
  instantPayouts: boolean;
  smartBudgeting: boolean;
  advancedAnalytics: boolean;
  experimentalFeatures: boolean;
}

export type WalletStatus = 'active' | 'suspended' | 'pending_verification' | 'closed';

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

export interface TransactionMetadata {
  partnerId?: string;
  campaignId?: string;
  cohort?: string;
  notes?: string;
  tags?: string[];
  attachments?: Array<{ id: string; name: string; url: string }>;
  customFields?: Record<string, unknown>;
}

export interface TransactionFee {
  id: string;
  type: 'processing' | 'platform' | 'network' | 'conversion' | 'other';
  amount: number;
  currency: string;
  description?: string;
}

export interface RelatedEarning {
  id: string;
  type: 'deal' | 'bonus' | 'referral' | 'adjustment';
  amount: number;
  currency: string;
  occurredAt: Date;
  description?: string;
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

export interface SecurityAction {
  id: string;
  label: string;
  description?: string;
  href?: string;
  type?: 'link' | 'cta' | 'acknowledge';
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

export interface DeviceRestrictions {
  id: string;
  description: string;
  enforcedAt: Date;
  expiresAt?: Date;
  severity: 'low' | 'medium' | 'high';
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

export interface WithholdingInfo {
  id: string;
  jurisdiction: string;
  rate: number;
  amountWithheld: number;
  currency: string;
  effectiveDate: Date;
  updatedAt: Date;
  notes?: string;
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

export interface TaxDocumentMetadata {
  preparedBy?: string;
  submissionMethod?: 'manual' | 'automatic';
  dueDate?: Date;
  notes?: string;
  attachments?: Array<{ id: string; name: string; url: string }>;
}

export interface TaxSettings {
  taxId: string;
  taxForm: 'W9' | 'W8BEN' | 'other';
  withholdingRate: number;
  exemptions: string[];
  autoFile: boolean;
  notifications: TaxNotifications;
}

export interface TaxNotifications {
  email: boolean;
  sms: boolean;
  push?: boolean;
  upcomingDeadlines?: boolean;
  missingDocuments?: boolean;
  payoutHolds?: boolean;
  auditAlerts?: boolean;
  lastSent?: Date;
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

export interface TrendMetric {
  direction: 'up' | 'down' | 'stable';
  change: number;
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  trend: TrendMetric;
}

export interface TimeSpending {
  period: string;
  amount: number;
  percentage?: number;
  trend?: TrendMetric;
}

export interface SpendingTrend {
  label: string;
  change: number;
  direction: TrendMetric['direction'];
  confidence: ConfidenceLevel;
}

export interface TransactionFrequency {
  perWeek: number;
  perMonth: number;
  perYear: number;
}

export interface IncomeSource {
  name: string;
  amount: number;
  percentage: number;
  trend: TrendMetric;
}

export interface IncomeTrend {
  label: string;
  amount: number;
  direction: TrendMetric['direction'];
  change?: number;
}

export interface IncomeProjection {
  date: Date;
  projected: number;
  confidence: ConfidenceLevel;
}

export interface GrowthMetrics {
  monthly: number;
  quarterly: number;
  yearly: number;
}

export interface ProjectionData {
  date: Date;
  projected: number;
  confidence: ConfidenceLevel;
  factors: ProjectionFactor[];
}

export interface ProjectionFactor {
  label: string;
  impact: 'positive' | 'negative' | 'neutral';
  description?: string;
}

export interface FinancialHealthScore {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  factors: HealthFactor[];
  recommendations: string[];
  lastCalculated: Date;
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'earnings' | 'spending' | 'risk' | 'opportunity';
  status: 'new' | 'in_progress' | 'resolved';
  impactScore?: number;
  actions?: { label: string; href?: string }[];
  metrics?: { label: string; value: string }[];
  lastUpdated: Date;
}

export interface FinancialRecommendation {
  id: string;
  title: string;
  description: string;
  category: 'revenue' | 'expense' | 'compliance' | 'savings' | 'risk';
  impact: 'high' | 'medium' | 'low';
  steps?: string[];
  dueDate?: Date;
  completed?: boolean;
}

// Mobile Experience Features
export interface MobileWalletFeatures {
  quickActions: QuickAction[];
  gestureControls: GestureControl[];
  pushNotifications: PushNotificationSettings;
  offlineMode: OfflineModeConfig;
  swipeActions: SwipeAction[];
}

export interface GestureControl {
  id: string;
  gesture: 'swipe_left' | 'swipe_right' | 'pinch' | 'double_tap' | 'long_press';
  action: string;
  description?: string;
  enabled: boolean;
}

export interface PushNotificationSettings {
  enabled: boolean;
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  categories: Array<{ id: string; label: string; enabled: boolean }>;
}

export interface OfflineModeConfig {
  enabled: boolean;
  lastSync: Date;
  availableFeatures: string[];
  storageUsageMB: number;
  syncStatus: 'idle' | 'syncing' | 'error';
  syncOnReconnect: boolean;
  cachedData: CachedDataType[];
}

export interface CachedDataType {
  id: string;
  type: 'transaction' | 'document' | 'insight' | 'notification' | 'settings';
  sizeKB: number;
  updatedAt: Date;
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

export interface BankFee {
  id: string;
  label: string;
  type: 'transfer' | 'instant' | 'international' | 'service';
  amount: number;
  currency: string;
  description?: string;
}

export interface BankLimits {
  currency: string;
  perTransaction: number;
  daily: number;
  monthly: number;
  remaining: {
    perTransaction: number;
    daily: number;
    monthly: number;
  };
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

export interface CardFee {
  id: string;
  label: string;
  type: 'processing' | 'currency' | 'network';
  amount: number;
  currency: string;
}

export interface CardLimits {
  daily: number;
  monthly: number;
  perTransaction: number;
  currency: string;
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

export interface AutoPayoutHistory {
  id: string;
  runAt: Date;
  amount: number;
  currency: string;
  status: 'scheduled' | 'processing' | 'completed' | 'failed';
  reference?: string;
}

export interface PaymentHistoryEntry {
  id: string;
  type: 'credit' | 'debit';
  description: string;
  method: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  date: Date;
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

export interface BudgetAlert {
  id: string;
  type: 'threshold' | 'overspend' | 'upcoming';
  message: string;
  triggeredAt: Date;
  resolved: boolean;
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

export interface AutoContributionConfig {
  enabled: boolean;
  amount: number;
  currency?: string;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  nextContribution?: Date;
}

export interface SavingsMilestone {
  id: string;
  label?: string;
  percentage?: number;
  amount: number;
  targetAmount?: number;
  achieved?: boolean;
  reached: boolean;
  achievedAt?: Date;
}

export interface ExpenseTracking {
  categories: ExpenseCategory[];
  rules: CategorizationRule[];
  recurringExpenses: RecurringExpense[];
  insights: ExpenseInsight[];
}

export interface ExpenseCategory {
  id: string;
  name: string;
  budget?: number;
  spent?: number;
  totalSpent: number;
  transactionCount: number;
  averageTransaction: number;
  status: 'active' | 'archived';
}

export interface CategorizationRule {
  id: string;
  pattern: string;
  categoryId: string;
  confidence: number;
  enabled: boolean;
}

export interface RecurringExpense {
  id: string;
  name: string;
  amount: number;
  currency: string;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  nextOccurrence: Date;
  categoryId: string;
  status: 'active' | 'paused' | 'cancelled';
}

export interface ExpenseInsight {
  id: string;
  title: string;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
  recommendation?: string;
  detectedAt: Date;
}

export interface FinancialCalendar {
  events: CalendarEvent[];
  reminders: CalendarReminder[];
  templates: CalendarTemplate[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'payout' | 'tax' | 'goal' | 'expense' | 'milestone' | 'payment' | 'deadline' | 'reminder';
  date: Date;
  startDate?: Date;
  endDate?: Date;
  amount?: number;
  currency?: string;
  status: 'upcoming' | 'completed' | 'missed' | 'cancelled';
  notes?: string;
  relatedGoalId?: string;
  time?: string;
}

export interface CalendarReminder {
  id: string;
  eventId: string;
  minutesBefore: number;
  channel: 'email' | 'push' | 'sms';
  sentAt?: Date;
  acknowledged?: boolean;
}

export interface CalendarTemplate {
  id: string;
  name: string;
  description?: string;
  defaultReminders: Array<{ minutesBefore: number; channel: 'email' | 'push' | 'sms' }>;
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
