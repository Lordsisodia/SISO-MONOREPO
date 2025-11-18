/**
 * Pricing Breakdown Component
 * Displays project pricing information
 */

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  Clock,
  TrendingDown,
  Check
} from 'lucide-react';

interface ProjectPricing {
  min: number;
  max: number;
  currency: string;
  deliveryTime: string;
}

interface PricingBreakdownProps {
  pricing?: ProjectPricing | null;
}

const isNum = (v: unknown): v is number => typeof v === 'number' && !isNaN(v);

const formatCurrency = (amount?: number, currency: string = 'USD') => {
  if (!isNum(amount)) return '—';
  const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
  return `${symbol}${amount.toLocaleString()}`;
};

export function PricingBreakdown({ pricing }: PricingBreakdownProps) {
  const currency = pricing?.currency ?? 'USD';
  const min = pricing?.min;
  const max = pricing?.max;
  const avgPrice = isNum(min) && isNum(max) ? (min + max) / 2 : undefined;
  const traditionalAgencyCost = isNum(avgPrice) ? avgPrice * 2.5 : undefined; // Traditional agencies cost 2.5x more
  const savings = isNum(traditionalAgencyCost) && isNum(avgPrice)
    ? traditionalAgencyCost - avgPrice
    : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      {/* Pricing Card */}
      <Card className="border border-siso-orange/30 bg-gradient-to-br from-siso-bg-alt to-siso-bg">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-siso-orange/10 p-2 rounded-lg">
              <DollarSign className="w-5 h-5 text-siso-orange" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Project Investment
            </h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="text-3xl font-bold bg-gradient-to-r from-siso-red to-siso-orange bg-clip-text text-transparent">
              {formatCurrency(min, currency)}
              {isNum(min) && isNum(max) ? ' - ' : ''}
              {isNum(max) ? formatCurrency(max, currency) : ''}
            </div>
            <p className="text-sm text-siso-text-muted mt-1">
              Complete project cost
            </p>
          </div>

          <div className="flex items-center gap-2 text-siso-text">
            <Clock className="w-4 h-4 text-siso-orange" />
            <span className="font-medium">{pricing?.deliveryTime ?? '48–72 hours'}</span>
            <span className="text-siso-text-muted">delivery time</span>
          </div>

          <div className="pt-4 border-t border-siso-border space-y-2">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-siso-orange mt-0.5" />
              <span className="text-sm text-siso-text">Full source code ownership</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-siso-orange mt-0.5" />
              <span className="text-sm text-siso-text">Deployment & hosting setup</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-siso-orange mt-0.5" />
              <span className="text-sm text-siso-text">30-day support included</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Value Comparison Card */}
      <Card className="border border-siso-border bg-siso-bg-alt">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-green-500/10 p-2 rounded-lg">
              <TrendingDown className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Value vs Traditional Agencies
            </h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-white">
                {formatCurrency(savings, currency)}
              </span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                Saved
              </Badge>
            </div>
            <p className="text-sm text-siso-text-muted">
              Compared to traditional agencies
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-siso-border">
            <div className="flex justify-between items-center">
              <span className="text-sm text-siso-text-muted">Traditional Agency:</span>
              <span className="text-sm text-white font-medium line-through">
                {formatCurrency(traditionalAgencyCost, currency)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-siso-text-muted">SISO (AI-Powered):</span>
              <span className="text-sm font-bold text-siso-orange">
                {formatCurrency(avgPrice, currency)}
              </span>
            </div>
          </div>

          <div className="bg-siso-bg p-3 rounded-lg">
            <p className="text-xs text-siso-text-muted leading-relaxed">
              Our AI-powered development process delivers the same quality as traditional agencies
              in a fraction of the time and cost, with faster iterations and better results.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
