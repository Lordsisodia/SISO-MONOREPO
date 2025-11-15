import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, TrendingUp, TrendingDown, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface MiniChartData {
  value: number;
}

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon: LucideIcon;
  color?: 'orange' | 'green' | 'blue' | 'purple';
  subtitle?: string;
  isLive?: boolean;
  clickPath?: string;
  miniChartData?: MiniChartData[];
}

export function StatCard({ 
  title, 
  value, 
  trend, 
  icon: Icon, 
  color = 'orange',
  subtitle,
  isLive = false,
  clickPath,
  miniChartData
}: StatCardProps) {
  const navigate = useNavigate();
  
  const colorClasses = {
    orange: {
      icon: 'text-siso-orange bg-siso-orange/10',
      chart: '#ff6b00',
      hover: 'hover:border-siso-orange/30'
    },
    green: {
      icon: 'text-green-500 bg-green-500/10',
      chart: '#10b981',
      hover: 'hover:border-green-500/30'
    },
    blue: {
      icon: 'text-blue-500 bg-blue-500/10',
      chart: '#3b82f6',
      hover: 'hover:border-blue-500/30'
    },
    purple: {
      icon: 'text-purple-500 bg-purple-500/10',
      chart: '#8b5cf6',
      hover: 'hover:border-purple-500/30'
    }
  };

  const trendColor = trend && trend > 0 ? 'text-green-400' : trend && trend < 0 ? 'text-siso-red' : 'text-gray-400';
  const TrendIcon = trend && trend > 0 ? TrendingUp : trend && trend < 0 ? TrendingDown : null;

  // Extract numeric value for CountUp
  const numericValue = typeof value === 'string' 
    ? parseFloat(value.replace(/[^0-9.-]+/g, ''))
    : value;
  const prefix = typeof value === 'string' && value.includes('£') ? '£' : '';
  const suffix = typeof value === 'string' && value.includes('%') ? '%' : '';

  const handleClick = () => {
    if (clickPath) {
      navigate(clickPath);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className={cn(
          "bg-siso-bg-secondary backdrop-blur-sm border border-siso-border transition-all duration-300 cursor-pointer group",
          colorClasses[color].hover,
          clickPath && "hover:shadow-lg"
        )}
        onClick={handleClick}
      >
        <CardContent className="p-4 relative overflow-hidden">
          {/* Live indicator */}
          {isLive && (
            <div className="absolute top-3 right-3 flex items-center gap-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Circle className="h-2 w-2 fill-green-400 text-green-400" />
              </motion.div>
              <span className="text-xs text-green-400">Live</span>
            </div>
          )}

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <motion.div 
                  className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center transition-transform",
                    colorClasses[color].icon
                  )}
                  whileHover={{ rotate: 10 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-siso-text-secondary">{title}</p>
                  <p className="text-2xl font-bold text-siso-text-primary">
                    {!isNaN(numericValue) ? (
                      <CountUp
                        start={0}
                        end={numericValue}
                        duration={2}
                        separator=","
                        decimals={suffix === '%' ? 0 : 2}
                        decimal="."
                        prefix={prefix}
                        suffix={suffix}
                      />
                    ) : (
                      value
                    )}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  {subtitle && (
                    <p className="text-xs text-siso-text-muted">{subtitle}</p>
                  )}
                  {trend !== undefined && (
                    <div className={cn("flex items-center gap-1 mt-1", trendColor)}>
                      {TrendIcon && <TrendIcon className="h-3 w-3" />}
                      <span className="text-sm font-medium">
                        {trend > 0 ? '+' : ''}{trend}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mini chart */}
            {miniChartData && miniChartData.length > 0 && (
              <div className="w-20 h-12 opacity-60 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={miniChartData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={colorClasses[color].chart}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}; 

// Memoize the component for performance optimization
export default React.memo(StatCard, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return (
    prevProps.title === nextProps.title &&
    prevProps.value === nextProps.value &&
    prevProps.change === nextProps.change &&
    prevProps.trend === nextProps.trend &&
    prevProps.loading === nextProps.loading &&
    prevProps.clickPath === nextProps.clickPath &&
    prevProps.isLive === nextProps.isLive &&
    JSON.stringify(prevProps.chartData) === JSON.stringify(nextProps.chartData)
  );
});