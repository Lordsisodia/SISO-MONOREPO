import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
  Brain,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Eye,
  Download
} from 'lucide-react';
import { cn } from '@/domains/shared/utils/cn';
import {
  WalletAnalytics,
  FinancialHealthScore,
  FinancialInsight,
  FinancialRecommendation,
  SpendingAnalytics,
  IncomeAnalytics
} from '../types/enhanced-wallet.types';

interface FinancialAnalyticsProps {
  analytics: WalletAnalytics;
  className?: string;
}

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const healthScoreGrades = {
  A: { color: 'text-emerald-500', bg: 'bg-emerald-500/10', label: 'Excellent' },
  B: { color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Good' },
  C: { color: 'text-amber-500', bg: 'bg-amber-500/10', label: 'Fair' },
  D: { color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Poor' },
  F: { color: 'text-rose-500', bg: 'bg-rose-500/10', label: 'Critical' }
};

export const FinancialAnalytics: React.FC<FinancialAnalyticsProps> = ({
  analytics,
  className
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [selectedChart, setSelectedChart] = useState<'income' | 'spending' | 'balance'>('income');

  // Sample data for charts (replace with actual data)
  const incomeData = [
    { name: 'Jan', amount: 4500, growth: 12 },
    { name: 'Feb', amount: 5200, growth: 15 },
    { name: 'Mar', amount: 4800, growth: 8 },
    { name: 'Apr', amount: 6100, growth: 27 },
    { name: 'May', amount: 5800, growth: 22 },
    { name: 'Jun', amount: 6400, growth: 30 }
  ];

  const spendingData = [
    { name: 'Software', amount: 1200, percentage: 25 },
    { name: 'Marketing', amount: 800, percentage: 17 },
    { name: 'Operations', amount: 600, percentage: 12 },
    { name: 'Professional', amount: 400, percentage: 8 },
    { name: 'Other', amount: 1800, percentage: 38 }
  ];

  const balanceData = [
    { name: 'Jan', balance: 15000, projected: 16000 },
    { name: 'Feb', balance: 17500, projected: 18000 },
    { name: 'Mar', balance: 19200, projected: 20000 },
    { name: 'Apr', balance: 21000, projected: 22000 },
    { name: 'May', balance: 23800, projected: 25000 },
    { name: 'Jun', balance: 28400, projected: 30000 }
  ];

  const categoryData = analytics.spending.byCategory.map((category, index) => ({
    name: category.category,
    value: category.amount,
    color: COLORS[index % COLORS.length]
  }));

  const getHealthGradeInfo = () => {
    return healthScoreGrades[analytics.health.grade] || healthScoreGrades.C;
  };

  const getTrendIcon = (value: number) => {
    return value >= 0 ? (
      <TrendingUp className="h-4 w-4 text-emerald-500" />
    ) : (
      <TrendingDown className="h-4 w-4 text-rose-500" />
    );
  };

  const getTrendColor = (value: number) => {
    return value >= 0 ? 'text-emerald-500' : 'text-rose-500';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const healthInfo = getHealthGradeInfo();

  return (
    <div className={cn("space-y-6", className)}>
      {/* Financial Health Score */}
      <Card className="p-6 bg-gradient-to-br from-siso-bg-secondary to-siso-bg-tertiary">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Award className="h-6 w-6 text-siso-orange" />
            <h3 className="text-lg font-semibold text-siso-text-primary">Financial Health</h3>
          </div>
          <Badge className={cn(healthInfo.bg, healthInfo.color, "text-lg px-3 py-1 font-bold")}>
            Grade {analytics.health.grade} - {analytics.health.score}/100
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-siso-text-muted">Overall Score</span>
              <span className={cn("text-sm font-medium", healthInfo.color)}>
                {analytics.health.score}/100
              </span>
            </div>
            <Progress value={analytics.health.score} className="h-3" />
            <div className="text-xs text-siso-text-muted">
              Last calculated: {analytics.health.lastCalculated.toLocaleDateString()}
            </div>
          </div>

          <div className="space-y-2">
            {analytics.health.factors.slice(0, 3).map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-xs text-siso-text-muted">{factor.name}</span>
                <div className="flex items-center gap-1">
                  <span className={cn("text-xs font-medium", getTrendColor(factor.score))}>
                    {factor.score}
                  </span>
                  {factor.trend === 'improving' && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                  {factor.trend === 'declining' && <TrendingDown className="h-3 w-3 text-rose-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Chart Selection and Period */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Financial Analytics</h4>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={selectedChart === 'income' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedChart('income')}
            >
              Income
            </Button>
            <Button
              variant={selectedChart === 'spending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedChart('spending')}
            >
              Spending
            </Button>
            <Button
              variant={selectedChart === 'balance' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedChart('balance')}
            >
              Balance
            </Button>
          </div>
        </div>

        {/* Period Selection */}
        <div className="flex items-center gap-2 mb-6">
          {(['week', 'month', 'year'] as const).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="capitalize"
            >
              {period}
            </Button>
          ))}
        </div>

        {/* Chart Display */}
        <div className="h-64">
          {selectedChart === 'income' && (
            <div className="grid h-full grid-cols-6 items-end gap-2">
              {incomeData.map((d) => (
                <div key={d.name} className="flex flex-col items-center gap-1">
                  <div
                    className="w-6 rounded-t bg-siso-orange/70"
                    style={{ height: `${(d.amount / Math.max(...incomeData.map(x => x.amount))) * 100}%` }}
                  />
                  <span className="text-[10px] text-siso-text-muted">{d.name}</span>
                </div>
              ))}
            </div>
          )}

          {selectedChart === 'spending' && (
            <div className="grid h-full grid-cols-5 items-end gap-2">
              {spendingData.map((d) => (
                <div key={d.name} className="flex flex-col items-center gap-1">
                  <div
                    className="w-8 rounded-t bg-blue-500/70"
                    style={{ height: `${(d.amount / Math.max(...spendingData.map(x => x.amount))) * 100}%` }}
                  />
                  <span className="text-[10px] text-siso-text-muted">{d.name}</span>
                </div>
              ))}
            </div>
          )}

          {selectedChart === 'balance' && (
            <div className="flex h-full items-end gap-2">
              {balanceData.map((d) => (
                <div key={d.name} className="flex flex-col items-center gap-1">
                  <div className="flex w-10 items-end justify-center gap-1">
                    <div className="h-20 w-2 rounded bg-emerald-500/70" />
                    <div className="h-12 w-2 rounded bg-amber-500/70" />
                  </div>
                  <span className="text-[10px] text-siso-text-muted">{d.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Spending Breakdown */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <PieChartIcon className="h-5 w-5 text-siso-orange" />
            <h4 className="font-semibold text-siso-text-primary">Spending Breakdown</h4>
          </div>
          <Badge variant="outline">
            {analytics.spending.byCategory.length} categories
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="h-48">
            <div className="grid h-full grid-cols-3 place-items-center">
              <div className="relative h-40 w-40">
                {/* Simple ring segments */}
                {categoryData.slice(0, 5).map((c, i) => (
                  <div
                    key={c.name}
                    className="absolute inset-0 rounded-full border-[10px]"
                    style={{
                      borderColor: c.color,
                      clipPath: `polygon(50% 50%, 0 0, 100% 0)`,
                      transform: `rotate(${i * 60}deg)`
                    }}
                    aria-hidden
                  />
                ))}
                <div className="absolute inset-4 rounded-full bg-siso-bg-secondary" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-sm font-medium">
                  {formatCurrency(category.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Key Metrics */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Activity className="h-5 w-5 text-siso-orange" />
          <h4 className="font-semibold text-siso-text-primary">Key Performance Metrics</h4>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-siso-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-siso-text-muted">Average Transaction</span>
              {getTrendIcon(analytics.spending.averageTransaction - 500)}
            </div>
            <div className="text-xl font-semibold text-siso-text-primary">
              {formatCurrency(analytics.spending.averageTransaction)}
            </div>
            <div className={cn("text-xs mt-1", getTrendColor(analytics.spending.averageTransaction - 500))}>
              +8.3% vs last month
            </div>
          </div>

          <div className="p-4 rounded-lg border border-siso-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-siso-text-muted">Transaction Frequency</span>
              {getTrendIcon(12)}
            </div>
            <div className="text-xl font-semibold text-siso-text-primary">
              {analytics.spending.frequency.perWeek}/week
            </div>
            <div className={cn("text-xs mt-1", getTrendColor(12))}>
              +2 transactions weekly
            </div>
          </div>

          <div className="p-4 rounded-lg border border-siso-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-siso-text-muted">Income Growth</span>
              {getTrendIcon(analytics.income.growth.monthly)}
            </div>
            <div className="text-xl font-semibold text-siso-text-primary">
              +{analytics.income.growth.monthly.toFixed(1)}%
            </div>
            <div className={cn("text-xs mt-1", getTrendColor(analytics.income.growth.monthly))}>
              Monthly growth rate
            </div>
          </div>

          <div className="p-4 rounded-lg border border-siso-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-siso-text-muted">Projected Monthly</span>
              {getTrendIcon(1000)}
            </div>
            <div className="text-xl font-semibold text-siso-text-primary">
              {formatCurrency(analytics.projections.monthly[0]?.projected || 0)}
            </div>
            <div className={cn("text-xs mt-1", getTrendColor(1000))}>
              High confidence
            </div>
          </div>
        </div>
      </Card>

      {/* AI-Powered Insights */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-5 w-5 text-siso-orange" />
          <h4 className="font-semibold text-siso-text-primary">AI-Powered Insights</h4>
          <Badge variant="outline"> {analytics.insights.length} active</Badge>
        </div>

        <div className="space-y-3">
          {analytics.insights.slice(0, 3).map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-siso-border">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                insight.priority === 'high' ? "bg-rose-500/10 text-rose-500" :
                insight.priority === 'medium' ? "bg-amber-500/10 text-amber-500" :
                "bg-emerald-500/10 text-emerald-500"
              )}>
                {insight.priority === 'high' ? (
                  <AlertTriangle className="h-4 w-4" />
                ) : insight.priority === 'medium' ? (
                  <Target className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{insight.title}</span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {insight.priority}
                  </Badge>
                </div>
                <p className="text-xs text-siso-text-muted">{insight.description}</p>
                {insight.actions && insight.actions.length > 0 && (
                  <div className="mt-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Target className="h-5 w-5 text-siso-orange" />
          <h4 className="font-semibold text-siso-text-primary">Recommendations</h4>
          <Badge variant="outline">{analytics.recommendations.length} available</Badge>
        </div>

        <div className="space-y-3">
          {analytics.recommendations.slice(0, 3).map((recommendation, index) => (
            <div key={index} className="p-4 rounded-lg border border-siso-border bg-siso-bg-secondary/30">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="text-sm font-medium text-siso-text-primary mb-1">
                    {recommendation.title}
                  </h5>
                  <p className="text-xs text-siso-text-muted mb-2">
                    {recommendation.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs capitalize">
                      {recommendation.category}
                    </Badge>
                    <span className="text-xs text-siso-text-muted">
                      Impact: {recommendation.impact}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <Button variant="outline" className="w-full">
            <Download className="h-4 w-4 mr-2" />
            Export Analytics Report
          </Button>
        </div>
      </Card>
    </div>
  );
};
