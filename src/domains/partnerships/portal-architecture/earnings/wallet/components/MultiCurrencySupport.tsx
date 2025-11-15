import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  RefreshCw,
  Calculator,
  Globe,
  ArrowRightLeft,
  Clock,
  AlertCircle,
  CheckCircle,
  Settings
} from 'lucide-react';
import { cn } from '@/domains/shared/utils/cn';
import {
  WalletCurrency,
  ExchangeRate,
  ConversionHistory,
  Transaction
} from '../types/enhanced-wallet.types';

interface MultiCurrencySupportProps {
  currencies: WalletCurrency[];
  baseBalance: number;
  onCurrencySelect: (currencyCode: string) => void;
  onConvertCurrency: (fromCurrency: string, toCurrency: string, amount: number) => Promise<void>;
  className?: string;
}

interface CurrencyConversion {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
}

const popularCurrencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
];

export const MultiCurrencySupport: React.FC<MultiCurrencySupportProps> = ({
  currencies,
  baseBalance,
  onCurrencySelect,
  onConvertCurrency,
  className
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies.find(c => c.isDefault)?.code || 'USD');
  const [conversion, setConversion] = useState<CurrencyConversion | null>(null);
  const [showConverter, setShowConverter] = useState(false);
  const [conversionAmount, setConversionAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionHistory, setConversionHistory] = useState<ConversionHistory[]>([]);

  const getExchangeRate = (from: string, to: string): number | null => {
    const fromCurrencyData = currencies.find(c => c.code === from);
    if (!fromCurrencyData || fromCurrencyData.code === to) return 1;
    return fromCurrencyData.rate.rate;
  };

  const handleConversion = async () => {
    if (!conversionAmount || fromCurrency === toCurrency) return;

    setIsConverting(true);
    try {
      const amount = parseFloat(conversionAmount);
      const rate = getExchangeRate(fromCurrency, toCurrency);
      if (!rate) throw new Error('Exchange rate not available');

      const convertedAmount = amount * rate;
      const estimatedFee = convertedAmount * 0.0015; // 0.15% fee

      setConversion({
        fromCurrency,
        toCurrency,
        fromAmount: amount,
        toAmount: convertedAmount - estimatedFee,
        rate,
        fee: estimatedFee
      });

      await onConvertCurrency(fromCurrency, toCurrency, amount);
      setConversionAmount('');
    } catch (error) {
      console.error('Conversion failed:', error);
    } finally {
      setIsConverting(false);
    }
  };

  const getTrendIcon = (rate: ExchangeRate) => {
    // Simulate trend calculation
    const previousRate = rate.rate * (1 + (Math.random() - 0.5) * 0.02);
    const trend = rate.rate > previousRate;

    return trend ? (
      <TrendingUp className="h-3 w-3 text-emerald-500" />
    ) : (
      <TrendingDown className="h-3 w-3 text-rose-500" />
    );
  };

  const getTrendColor = (rate: ExchangeRate) => {
    // Simulate trend calculation
    const previousRate = rate.rate * (1 + (Math.random() - 0.5) * 0.02);
    const trend = rate.rate > previousRate;

    return trend ? 'text-emerald-500' : 'text-rose-500';
  };

  const formatCurrency = (amount: number, currency: string) => {
    const currencyData = currencies.find(c => c.code === currency);
    const symbol = currencyData?.symbol || currency;
    return `${symbol}${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getConvertedBalance = (balance: number, fromCurrency: string, toCurrency: string) => {
    const rate = getExchangeRate(fromCurrency, toCurrency);
    if (!rate) return 0;
    return balance * rate;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Currency Selector */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-siso-orange" />
            <h3 className="font-semibold text-siso-text-primary">Currency Display</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConverter(!showConverter)}
          >
            <Calculator className="h-4 w-4 mr-1" />
            {showConverter ? 'Hide' : 'Convert'}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {currencies.slice(0, 3).map((currency) => (
            <div
              key={currency.code}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-all",
                selectedCurrency === currency.code
                  ? "border-siso-orange bg-siso-orange/10"
                  : "border-siso-border hover:border-siso-orange/50"
              )}
              onClick={() => {
                setSelectedCurrency(currency.code);
                onCurrencySelect(currency.code);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{currency.code}</span>
                {currency.isDefault && (
                  <Badge variant="outline" className="text-xs">Default</Badge>
                )}
              </div>
              <div className="text-lg font-semibold text-siso-text-primary">
                {formatCurrency(
                  getConvertedBalance(baseBalance, currencies.find(c => c.isDefault)?.code || 'USD', currency.code),
                  currency.code
                )}
              </div>
              <div className="text-xs text-siso-text-muted mt-1">
                Original: {formatCurrency(currency.balance, currency.code)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-siso-text-muted text-center">
          Showing balance in {selectedCurrency} • Last updated: {new Date().toLocaleTimeString()}
        </div>
      </Card>

      {/* Currency Converter */}
      {showConverter && (
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <ArrowRightLeft className="h-5 w-5 text-siso-orange" />
            <h3 className="font-semibold text-siso-text-primary">Currency Converter</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Amount</Label>
              <Input
                type="number"
                value={conversionAmount}
                onChange={(e) => setConversionAmount(e.target.value)}
                placeholder="Enter amount to convert"
              />
            </div>

            {conversion && (
              <div className="p-4 rounded-lg bg-siso-bg-secondary border border-siso-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-siso-text-muted">Exchange Rate</span>
                  <span className="text-sm font-medium">
                    1 {fromCurrency} = {conversion.rate.toFixed(4)} {toCurrency}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-siso-text-muted">You Send</span>
                  <span className="text-lg font-semibold">
                    {formatCurrency(conversion.fromAmount, fromCurrency)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-siso-text-muted">Fee</span>
                  <span className="text-sm font-medium text-amber-500">
                    {formatCurrency(conversion.fee, toCurrency)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-siso-border">
                  <span className="text-sm font-medium">You Receive</span>
                  <span className="text-lg font-semibold text-emerald-500">
                    {formatCurrency(conversion.toAmount, toCurrency)}
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={handleConversion}
              disabled={!conversionAmount || isConverting || fromCurrency === toCurrency}
              className="w-full"
            >
              {isConverting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Converting...
                </>
              ) : (
                'Convert Currency'
              )}
            </Button>
          </div>
        </Card>
      )}

      {/* Exchange Rates */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="h-5 w-5 text-siso-orange" />
          <h3 className="font-semibold text-siso-text-primary">Live Exchange Rates</h3>
        </div>

        <div className="space-y-3">
          {currencies.map((currency) => {
            if (currency.code === 'USD') return null; // Skip base currency
            const rate = getExchangeRate('USD', currency.code);
            if (!rate) return null;

            return (
              <div key={currency.code} className="flex items-center justify-between p-3 rounded-lg border border-siso-border">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-siso-bg-secondary flex items-center justify-center">
                    <span className="text-xs font-semibold">{currency.code}</span>
                  </div>
                  <div>
                    <div className="font-medium">{currency.name}</div>
                    <div className="text-xs text-siso-text-muted">
                      Updated {currency.rate.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{rate.toFixed(4)}</span>
                    {getTrendIcon(currency.rate)}
                  </div>
                  <div className={cn("text-xs", getTrendColor(currency.rate))}>
                    {((Math.random() - 0.5) * 2).toFixed(2)}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-siso-bg-secondary border border-siso-border">
          <div className="flex items-center gap-2 text-sm text-siso-text-muted">
            <AlertCircle className="h-4 w-4" />
            <span>Exchange rates update every 60 seconds. Rates include a 0.15% conversion fee.</span>
          </div>
        </div>
      </Card>

      {/* Supported Currencies */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="h-5 w-5 text-siso-orange" />
          <h3 className="font-semibold text-siso-text-primary">Supported Currencies</h3>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {popularCurrencies.map((currency) => {
            const isSupported = currencies.some(c => c.code === currency.code);
            return (
              <div
                key={currency.code}
                className={cn(
                  "p-3 rounded-lg border flex items-center justify-between",
                  isSupported
                    ? "border-emerald-500/20 bg-emerald-500/5"
                    : "border-siso-border/50 bg-siso-bg-secondary/30"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{currency.code}</span>
                  <span className="text-xs text-siso-text-muted">{currency.symbol}</span>
                </div>
                {isSupported ? (
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                ) : (
                  <Clock className="h-3 w-3 text-siso-text-muted" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4">
          <Button variant="outline" size="sm" className="w-full">
            <Settings className="h-4 w-4 mr-1" />
            Manage Currency Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};