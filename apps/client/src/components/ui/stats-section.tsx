/**
 * Client Stats Section Component
 * Displays key metrics for client portfolio performance
 */

import { MoveDownLeft, MoveUpRight, Users, DollarSign, Package, TrendingUp } from "lucide-react";
import CountUp from 'react-countup';

interface StatCardProps {
  icon: 'up' | 'down' | 'users' | 'revenue' | 'package' | 'trending';
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative';
  label: string;
}

function StatCard({ icon, value, change, changeType, label }: StatCardProps) {
  const iconComponents = {
    up: MoveUpRight,
    down: MoveDownLeft,
    users: Users,
    revenue: DollarSign,
    package: Package,
    trending: TrendingUp,
  };

  const Icon = iconComponents[icon];

  const iconColorClass = changeType === 'positive'
    ? 'text-green-500'
    : 'text-red-500';

  // Determine if value is a number or currency for CountUp animation
  const renderValue = () => {
    if (typeof value === 'number') {
      return <CountUp end={value} duration={2.5} separator="," />;
    }

    // Check if it's a currency value (starts with $, £, or €)
    const currencyMatch = String(value).match(/^([$£€])([\d,]+)$/);
    if (currencyMatch) {
      const symbol = currencyMatch[1];
      const numericValue = parseInt(currencyMatch[2].replace(/,/g, ''), 10);
      return (
        <>
          {symbol}
          <CountUp end={numericValue} duration={2.5} separator="," />
        </>
      );
    }

    // For other string values (like "14d"), just display as-is
    return value;
  };

  return (
    <div className="flex gap-0 flex-col justify-between p-3 md:p-4 border border-siso-border rounded-md bg-siso-card hover:border-siso-orange/40 transition-all duration-300">
      <Icon className={`w-4 h-4 mb-4 md:mb-6 ${iconColorClass}`} />
      <h2 className="text-2xl md:text-3xl tracking-tighter max-w-xl text-left font-regular flex flex-row gap-2 md:gap-3 items-end text-white">
        {renderValue()}
        <span className={`text-xs tracking-normal ${changeType === 'positive' ? 'text-green-400' : 'text-red-400'}`}>
          {change}
        </span>
      </h2>
      <p className="text-xs md:text-sm leading-relaxed tracking-tight text-siso-text-muted max-w-xl text-left">
        {label}
      </p>
    </div>
  );
}

interface ClientStatsProps {
  stats?: {
    appsCreated?: { value: number; change: string };
    totalRevenue?: { value: number; change: string; currency?: string };
    avgAppSize?: { value: string; change: string };
    dailyActiveUsers?: { value: number; change: string };
  };
}

function ClientStats({ stats }: ClientStatsProps) {
  // Default stats if none provided
  const defaultStats = {
    appsCreated: { value: 47, change: '+12.5%' },
    totalRevenue: { value: 2847500, change: '+28.3%', currency: 'USD' },
    avgAppSize: { value: '256k', change: '+5.2%' },
    dailyActiveUsers: { value: 125840, change: '+18.7%' },
  };

  const finalStats = { ...defaultStats, ...stats };

  const formatCurrency = (value: number, currency: string = 'USD') => {
    const symbol = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
    return `${symbol}${value.toLocaleString()}`;
  };

  return (
    <div className="w-full py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4">
        <div className="grid text-left grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl mx-auto gap-4 lg:gap-6">
          <StatCard
            icon="package"
            value={finalStats.appsCreated.value}
            change={finalStats.appsCreated.change}
            changeType="positive"
            label="Apps delivered to clients"
          />

          <StatCard
            icon="revenue"
            value={formatCurrency(finalStats.totalRevenue.value, finalStats.totalRevenue.currency)}
            change={finalStats.totalRevenue.change}
            changeType="positive"
            label="Total value delivered"
          />

          <StatCard
            icon="trending"
            value={finalStats.avgAppSize.value}
            change={finalStats.avgAppSize.change}
            changeType="positive"
            label="Average delivery time"
          />

          <StatCard
            icon="users"
            value={finalStats.dailyActiveUsers.value.toLocaleString()}
            change={finalStats.dailyActiveUsers.change}
            changeType="positive"
            label="Combined user reach"
          />
        </div>
      </div>
    </div>
  );
}

export { ClientStats, StatCard };
