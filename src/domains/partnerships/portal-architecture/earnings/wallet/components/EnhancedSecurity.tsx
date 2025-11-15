import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  Smartphone,
  Fingerprint,
  Eye,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Lock,
  Unlock,
  UserPlus,
  CreditCard,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/domains/shared/utils/cn';
import {
  WalletSecurity,
  BiometricAuthentication,
  TransactionLimits,
  SecurityAlert,
  TrustedDevice
} from '../types/enhanced-wallet.types';

interface EnhancedSecurityProps {
  security: WalletSecurity;
  onSecurityUpdate: (updates: Partial<WalletSecurity>) => void;
  className?: string;
}

const alertSeverityColors = {
  low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  critical: 'bg-rose-500/10 text-rose-500 border-rose-500/20'
};

const biometricMethodIcons = {
  face_id: <Eye className="h-4 w-4" />,
  fingerprint: <Fingerprint className="h-4 w-4" />,
  voice: <Smartphone className="h-4 w-4" />,
  iris: <Eye className="h-4 w-4" />
};

export const EnhancedSecurity: React.FC<EnhancedSecurityProps> = ({
  security,
  onSecurityUpdate,
  className
}) => {
  const [showLimitSettings, setShowLimitSettings] = useState(false);
  const [editingLimits, setEditingLimits] = useState(security.transactionLimits);
  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert | null>(null);

  const handleBiometricToggle = () => {
    onSecurityUpdate({
      biometricAuth: {
        ...security.biometricAuth,
        enabled: !security.biometricAuth.enabled
      }
    });
  };

  const handleLimitsUpdate = () => {
    onSecurityUpdate({
      transactionLimits: editingLimits
    });
    setShowLimitSettings(false);
  };

  const acknowledgeAlert = (alertId: string) => {
    onSecurityUpdate({
      securityAlerts: security.securityAlerts.map(alert =>
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    });
  };

  const removeDevice = (deviceId: string) => {
    onSecurityUpdate({
      trustedDevices: security.trustedDevices.filter(device => device.id !== deviceId)
    });
  };

  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getSecurityGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Security Score Overview */}
      <Card className="p-6 bg-gradient-to-br from-siso-bg-secondary to-siso-bg-tertiary">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-siso-orange" />
            <h3 className="text-lg font-semibold text-siso-text-primary">Security Status</h3>
          </div>
          <Badge variant="outline" className={cn(
            "text-lg px-3 py-1 font-bold",
            getSecurityScoreColor(security.securityScore)
          )}>
            {getSecurityGrade(security.securityScore)} - {security.securityScore}/100
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-siso-text-muted">Security Score</span>
              <span className={cn("text-sm font-medium", getSecurityScoreColor(security.securityScore))}>
                {security.securityScore}/100
              </span>
            </div>
            <Progress value={security.securityScore} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-siso-text-muted">Last Check</span>
              <span className="text-sm text-siso-text-muted">
                {security.lastSecurityCheck.toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {security.securityScore >= 80 ? (
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              ) : security.securityScore >= 60 ? (
                <AlertTriangle className="h-4 w-4 text-amber-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-rose-500" />
              )}
              <span className="text-xs text-siso-text-muted">
                {security.securityScore >= 80 ? 'Excellent' :
                 security.securityScore >= 60 ? 'Good' : 'Needs Attention'}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Biometric Authentication */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Fingerprint className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Biometric Authentication</h4>
          </div>
          <Switch
            checked={security.biometricAuth.enabled}
            onCheckedChange={handleBiometricToggle}
          />
        </div>

        {security.biometricAuth.enabled && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-siso-text-muted">Fallback Required</span>
              <Badge variant={security.biometricAuth.fallbackRequired ? "default" : "secondary"}>
                {security.biometricAuth.fallbackRequired ? 'Yes' : 'No'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {security.biometricAuth.methods.map((method) => (
                <div key={method.type} className="flex items-center justify-between p-3 rounded-lg border border-siso-border">
                  <div className="flex items-center gap-2">
                    {biometricMethodIcons[method.type]}
                    <span className="text-sm font-medium">{method.name}</span>
                  </div>
                  <Badge variant={method.enabled ? "default" : "secondary"}>
                    {method.enabled ? 'Active' : 'Disabled'}
                  </Badge>
                </div>
              ))}
            </div>

            {security.biometricAuth.lastUsed && (
              <div className="text-xs text-siso-text-muted">
                Last used: {security.biometricAuth.lastUsed.toLocaleString()}
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Transaction Limits */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Transaction Limits</h4>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLimitSettings(!showLimitSettings)}
          >
            <Settings className="h-4 w-4 mr-1" />
            {showLimitSettings ? 'Done' : 'Configure'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(security.transactionLimits).map(([key, limit]) => (
            <div key={key} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-xs text-siso-text-muted">
                  {limit.used.toLocaleString()} / {limit.amount.toLocaleString()} {limit.currency}
                </span>
              </div>
              <Progress value={(limit.used / limit.amount) * 100} className="h-2" />
            </div>
          ))}
        </div>

        {security.transactionLimits.requiresAuthentication && (
          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4 text-amber-500" />
              <span className="text-amber-500">
                Authentication required for transactions above {
                  security.transactionLimits.requiresAuthentication.above.toLocaleString()
                } {security.transactionLimits.perTransaction.currency}
              </span>
            </div>
          </div>
        )}

        {showLimitSettings && (
          <div className="mt-4 p-4 rounded-lg border border-siso-border space-y-3">
            <h5 className="text-sm font-semibold">Adjust Limits</h5>
            {Object.entries(editingLimits).map(([key, limit]) => (
              <div key={key} className="grid grid-cols-2 gap-2">
                <Label className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                <Input
                  type="number"
                  value={limit.amount}
                  onChange={(e) => setEditingLimits(prev => ({
                    ...prev,
                    [key]: { ...prev[key as keyof typeof prev], amount: Number(e.target.value) }
                  }))}
                  className="text-xs"
                />
              </div>
            ))}
            <Button size="sm" onClick={handleLimitsUpdate}>
              Save Limits
            </Button>
          </div>
        )}
      </Card>

      {/* Security Alerts */}
      {security.securityAlerts.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Security Alerts</h4>
            <Badge variant="outline">
              {security.securityAlerts.filter(alert => !alert.acknowledged).length} unread
            </Badge>
          </div>

          <div className="space-y-3">
            {security.securityAlerts
              .filter(alert => !alert.acknowledged)
              .slice(0, 3)
              .map((alert) => (
                <Alert
                  key={alert.id}
                  className={cn(alertSeverityColors[alert.severity])}
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{alert.message}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {alert.timestamp.toLocaleString()}
                        </p>
                      </div>
                      {alert.actionRequired && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="ml-2"
                        >
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
          </div>
        </Card>
      )}

      {/* Trusted Devices */}
      {security.trustedDevices.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Smartphone className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Trusted Devices</h4>
          </div>

          <div className="space-y-3">
            {security.trustedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 rounded-lg border border-siso-border">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    device.lastUsed && new Date().getTime() - device.lastUsed.getTime() < 24 * 60 * 60 * 1000
                      ? "bg-emerald-500/10"
                      : "bg-siso-border/50"
                  )}>
                    <Smartphone className={cn(
                      "h-4 w-4",
                      device.lastUsed && new Date().getTime() - device.lastUsed.getTime() < 24 * 60 * 60 * 1000
                        ? "text-emerald-500"
                        : "text-siso-text-muted"
                    )} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{device.name}</div>
                    <div className="text-xs text-siso-text-muted">
                      {device.type} • Last used: {device.lastUsed?.toLocaleDateString() || 'Never'}
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeDevice(device.id)}
                  className="text-rose-500 hover:text-rose-600"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};