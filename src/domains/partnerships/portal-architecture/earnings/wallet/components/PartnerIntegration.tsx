import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  CreditCard,
  Building2,
  Link,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Settings,
  DollarSign,
  Calendar,
  TrendingUp,
  Shield,
  Plus,
  Trash2,
  ExternalLink,
  Wallet,
  Zap
} from 'lucide-react';
import { cn } from '@/domains/shared/utils/cn';
import {
  PartnerIntegration,
  BankConnection,
  CardConnection,
  AutoPayoutConfig,
  PaymentHistoryEntry
} from '../types/enhanced-wallet.types';

interface PartnerIntegrationProps {
  integration: PartnerIntegration;
  onIntegrationUpdate: (updates: Partial<PartnerIntegration>) => void;
  onConnectBank: () => Promise<void>;
  onConnectCard: () => Promise<void>;
  onDisconnectBank: (bankId: string) => Promise<void>;
  onDisconnectCard: (cardId: string) => Promise<void>;
  className?: string;
}

const connectionStatusColors = {
  active: 'text-emerald-500 bg-emerald-500/10',
  pending: 'text-amber-500 bg-amber-500/10',
  suspended: 'text-rose-500 bg-rose-500/10',
  error: 'text-rose-500 bg-rose-500/10'
};

const providerLogos = {
  plaid: '🏦',
  stripe: '💳',
  wise: '🌍',
  direct: '🔗',
  visa: '💳',
  mastercard: '💳',
  amex: '💳',
  discover: '💳'
};

export const PartnerIntegration: React.FC<PartnerIntegrationProps> = ({
  integration,
  onIntegrationUpdate,
  onConnectBank,
  onConnectCard,
  onDisconnectBank,
  onDisconnectCard,
  className
}) => {
  const [showAutoPayoutSettings, setShowAutoPayoutSettings] = useState(false);
  const [newPayoutConfig, setNewPayoutConfig] = useState<Partial<AutoPayoutConfig>>({
    enabled: true,
    frequency: 'weekly',
    threshold: 1000,
    method: 'stripe'
  });

  const handleAutoPayoutToggle = (configId: string, enabled: boolean) => {
    onIntegrationUpdate({
      autoPayouts: integration.autoPayouts.map(config =>
        config.id === configId ? { ...config, enabled } : config
      )
    });
  };

  const handleAddAutoPayout = () => {
    const newConfig: AutoPayoutConfig = {
      id: `auto-${Date.now()}`,
      enabled: newPayoutConfig.enabled || true,
      frequency: newPayoutConfig.frequency as any,
      threshold: newPayoutConfig.threshold || 1000,
      method: newPayoutConfig.method || 'stripe',
      maxAmount: newPayoutConfig.maxAmount || 10000,
      nextRun: new Date(),
      history: []
    };

    onIntegrationUpdate({
      autoPayouts: [...integration.autoPayouts, newConfig]
    });
    setShowAutoPayoutSettings(false);
  };

  const getTotalBalance = () => {
    return integration.paymentHistory
      .filter(entry => entry.type === 'credit')
      .reduce((sum, entry) => sum + entry.amount, 0);
  };

  const getMonthlyPayout = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return integration.paymentHistory
      .filter(entry => {
        const entryDate = new Date(entry.date);
        return entry.type === 'debit' &&
               entryDate.getMonth() === currentMonth &&
               entryDate.getFullYear() === currentYear;
      })
      .reduce((sum, entry) => sum + entry.amount, 0);
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Quick Stats */}
      <Card className="p-6 bg-gradient-to-br from-siso-bg-secondary to-siso-bg-tertiary">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-6 w-6 text-siso-orange" />
          <h3 className="text-lg font-semibold text-siso-text-primary">Payment Integration Overview</h3>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-siso-text-primary">
              {formatCurrency(getTotalBalance())}
            </div>
            <div className="text-xs text-siso-text-muted">Total Balance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-emerald-500">
              {formatCurrency(getMonthlyPayout())}
            </div>
            <div className="text-xs text-siso-text-muted">Monthly Payouts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-siso-orange">
              {integration.bankConnections.length + integration.cardConnections.length}
            </div>
            <div className="text-xs text-siso-text-muted">Connected Methods</div>
          </div>
        </div>
      </Card>

      {/* Bank Connections */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Bank Accounts</h4>
            <Badge variant="outline">
              {integration.bankConnections.length} connected
            </Badge>
          </div>
          <Button onClick={onConnectBank}>
            <Plus className="h-4 w-4 mr-1" />
            Connect Bank
          </Button>
        </div>

        <div className="space-y-3">
          {integration.bankConnections.map((bank) => (
            <div key={bank.id} className="flex items-center justify-between p-4 rounded-lg border border-siso-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-siso-bg-secondary flex items-center justify-center">
                  <span className="text-lg">{providerLogos[bank.provider] || '🏦'}</span>
                </div>
                <div>
                  <div className="font-medium">{bank.bankName}</div>
                  <div className="text-sm text-siso-text-muted">
                    {bank.accountType} • •••{bank.last4}
                  </div>
                  {bank.lastSync && (
                    <div className="text-xs text-siso-text-muted">
                      Synced {bank.lastSync.toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={connectionStatusColors[bank.status]}>
                  {bank.status}
                </Badge>
                {bank.status === 'active' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDisconnectBank(bank.id)}
                    className="text-rose-500 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {integration.bankConnections.length === 0 && (
            <div className="text-center py-8">
              <Building2 className="h-12 w-12 text-siso-text-muted mx-auto mb-3" />
              <p className="text-siso-text-muted">No bank accounts connected</p>
              <p className="text-sm text-siso-text-muted/70 mt-1">
                Connect a bank account for easy withdrawals
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Card Connections */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Cards & Wallets</h4>
            <Badge variant="outline">
              {integration.cardConnections.length} connected
            </Badge>
          </div>
          <Button onClick={onConnectCard}>
            <Plus className="h-4 w-4 mr-1" />
            Add Card
          </Button>
        </div>

        <div className="space-y-3">
          {integration.cardConnections.map((card) => (
            <div key={card.id} className="flex items-center justify-between p-4 rounded-lg border border-siso-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-siso-bg-secondary flex items-center justify-center">
                  <span className="text-lg">{providerLogos[card.brand] || '💳'}</span>
                </div>
                <div>
                  <div className="font-medium capitalize">
                    {card.brand} {card.type}
                  </div>
                  <div className="text-sm text-siso-text-muted">
                    ••••{card.last4}
                  </div>
                  {card.lastUsed && (
                    <div className="text-xs text-siso-text-muted">
                      Last used {card.lastUsed.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={connectionStatusColors[card.status]}>
                  {card.status}
                </Badge>
                {card.status === 'active' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDisconnectCard(card.id)}
                    className="text-rose-500 hover:text-rose-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}

          {integration.cardConnections.length === 0 && (
            <div className="text-center py-8">
              <CreditCard className="h-12 w-12 text-siso-text-muted mx-auto mb-3" />
              <p className="text-siso-text-muted">No cards connected</p>
              <p className="text-sm text-siso-text-muted/70 mt-1">
                Add debit/credit cards for instant deposits
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Auto-Payouts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Auto-Payouts</h4>
            <Badge variant="outline">
              {integration.autoPayouts.filter(p => p.enabled).length} active
            </Badge>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowAutoPayoutSettings(!showAutoPayoutSettings)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Schedule
          </Button>
        </div>

        {showAutoPayoutSettings && (
          <div className="mb-4 p-4 rounded-lg border border-siso-border space-y-4">
            <h5 className="font-medium">New Auto-Payout Configuration</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select value={newPayoutConfig.frequency} onValueChange={(value) => setNewPayoutConfig(prev => ({ ...prev, frequency: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="threshold">When threshold reached</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Threshold Amount</Label>
                <Input
                  type="number"
                  value={newPayoutConfig.threshold}
                  onChange={(e) => setNewPayoutConfig(prev => ({ ...prev, threshold: Number(e.target.value) }))}
                  placeholder="1000"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Amount</Label>
                <Input
                  type="number"
                  value={newPayoutConfig.maxAmount}
                  onChange={(e) => setNewPayoutConfig(prev => ({ ...prev, maxAmount: Number(e.target.value) }))}
                  placeholder="10000"
                />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <Select value={newPayoutConfig.method} onValueChange={(value) => setNewPayoutConfig(prev => ({ ...prev, method: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stripe">Stripe Connect</SelectItem>
                    <SelectItem value="wise">Wise Business</SelectItem>
                    <SelectItem value="plaid">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={newPayoutConfig.enabled}
                onCheckedChange={(checked) => setNewPayoutConfig(prev => ({ ...prev, enabled: checked }))}
              />
              <Label>Enable immediately</Label>
            </div>
            <Button onClick={handleAddAutoPayout} className="w-full">
              Create Auto-Payout Schedule
            </Button>
          </div>
        )}

        <div className="space-y-3">
          {integration.autoPayouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between p-4 rounded-lg border border-siso-border">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium capitalize">
                    {payout.frequency === 'threshold' ? `When > ${formatCurrency(payout.threshold)}` : payout.frequency}
                  </span>
                  <Badge variant={payout.enabled ? "default" : "secondary"}>
                    {payout.enabled ? 'Active' : 'Paused'}
                  </Badge>
                </div>
                <div className="text-sm text-siso-text-muted">
                  Via {payout.method} • Max {formatCurrency(payout.maxAmount)}
                </div>
                <div className="text-xs text-siso-text-muted">
                  Next run: {payout.nextRun.toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={payout.enabled}
                  onCheckedChange={(checked) => handleAutoPayoutToggle(payout.id, checked)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onIntegrationUpdate({
                    autoPayouts: integration.autoPayouts.filter(p => p.id !== payout.id)
                  })}
                  className="text-rose-500 hover:text-rose-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {integration.autoPayouts.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-siso-text-muted mx-auto mb-3" />
              <p className="text-siso-text-muted">No auto-payouts configured</p>
              <p className="text-sm text-siso-text-muted/70 mt-1">
                Set up automatic payouts for hands-off management
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Recent Payment History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <DollarSign className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Payment History</h4>
            <Badge variant="outline">
              {integration.paymentHistory.length} transactions
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {integration.paymentHistory.slice(0, 5).map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg border border-siso-border">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  payment.type === 'credit' ? "bg-emerald-500/10 text-emerald-500" :
                  "bg-rose-500/10 text-rose-500"
                )}>
                  {payment.type === 'credit' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingUp className="h-4 w-4 transform rotate-180" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{payment.description}</div>
                  <div className="text-xs text-siso-text-muted">
                    {payment.method} • {payment.date.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={cn(
                  "font-medium",
                  payment.type === 'credit' ? "text-emerald-500" : "text-rose-500"
                )}>
                  {payment.type === 'credit' ? '+' : '-'}{formatCurrency(payment.amount)}
                </div>
                <div className="text-xs text-siso-text-muted">
                  {payment.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Security Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          All payment connections are secured with bank-level encryption. We never store sensitive banking credentials and all connections are compliant with PCI DSS and SOC 2 standards.
        </AlertDescription>
      </Alert>
    </div>
  );
};