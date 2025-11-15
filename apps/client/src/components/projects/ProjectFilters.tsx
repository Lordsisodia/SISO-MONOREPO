import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Filter, 
  X, 
  Calendar,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  Pause,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectFiltersProps {
  selectedFilters: {
    status: string[];
    dateRange: { from: Date; to: Date } | null;
    budgetRange: { min: number; max: number };
  };
  onFiltersChange: (filters: any) => void;
}

const statusOptions = [
  { value: 'active', label: 'Active', icon: Activity, color: 'bg-green-500/20 text-green-400' },
  { value: 'paused', label: 'Paused', icon: Pause, color: 'bg-amber-500/20 text-amber-400' },
  { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'bg-blue-500/20 text-blue-400' },
  { value: 'cancelled', label: 'Cancelled', icon: AlertCircle, color: 'bg-red-500/20 text-red-400' }
];

export function ProjectFilters({ selectedFilters, onFiltersChange }: ProjectFiltersProps) {
  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatus = checked
      ? [...selectedFilters.status, status]
      : selectedFilters.status.filter(s => s !== status);
    
    onFiltersChange({
      ...selectedFilters,
      status: newStatus
    });
  };

  const handleBudgetChange = ([min, max]: number[]) => {
    onFiltersChange({
      ...selectedFilters,
      budgetRange: { min, max }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      status: [],
      dateRange: null,
      budgetRange: { min: 0, max: 100000 }
    });
  };

  const hasActiveFilters = selectedFilters.status.length > 0 || 
                          selectedFilters.budgetRange.min > 0 || 
                          selectedFilters.budgetRange.max < 100000;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[280px]"
    >
      <Card className="bg-siso-bg-alt border-siso-border sticky top-4">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Filter className="h-5 w-5 text-siso-orange" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-siso-text-muted hover:text-white"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Status Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-siso-orange" />
              Status
            </Label>
            <div className="space-y-2">
              {statusOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedFilters.status.includes(option.value);
                
                return (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.value}
                      checked={isSelected}
                      onCheckedChange={(checked) => 
                        handleStatusChange(option.value, checked as boolean)
                      }
                      className="data-[state=checked]:bg-siso-orange data-[state=checked]:border-siso-orange"
                    />
                    <label
                      htmlFor={option.value}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span className={cn(
                        "transition-colors",
                        isSelected ? "text-white" : "text-siso-text-muted"
                      )}>
                        {option.label}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Budget Range Filter */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-siso-orange" />
              Budget Range
            </Label>
            <div className="space-y-4">
              <Slider
                value={[selectedFilters.budgetRange.min, selectedFilters.budgetRange.max]}
                onValueChange={handleBudgetChange}
                max={100000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-siso-text-muted">
                <span>${selectedFilters.budgetRange.min.toLocaleString()}</span>
                <span>${selectedFilters.budgetRange.max.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Date Filters */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-siso-orange" />
              Created
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-siso-border text-siso-text-muted hover:bg-siso-bg hover:text-white"
              >
                Last 7 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-siso-border text-siso-text-muted hover:bg-siso-bg hover:text-white"
              >
                Last 30 days
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-siso-border text-siso-text-muted hover:bg-siso-bg hover:text-white col-span-2"
              >
                Last 3 months
              </Button>
            </div>
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-white">
                Active Filters
              </Label>
              <div className="flex flex-wrap gap-1">
                {selectedFilters.status.map((status) => (
                  <Badge
                    key={status}
                    variant="secondary"
                    className="text-xs bg-siso-orange/20 text-siso-orange border-siso-orange/40"
                  >
                    {status}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => handleStatusChange(status, false)}
                    />
                  </Badge>
                ))}
                {(selectedFilters.budgetRange.min > 0 || selectedFilters.budgetRange.max < 100000) && (
                  <Badge
                    variant="secondary"
                    className="text-xs bg-siso-orange/20 text-siso-orange border-siso-orange/40"
                  >
                    ${selectedFilters.budgetRange.min.toLocaleString()} - ${selectedFilters.budgetRange.max.toLocaleString()}
                  </Badge>
                )}
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}