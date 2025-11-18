/**
 * Portfolio Domain - Industry Badge Component
 */

import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { IndustryCategory } from '../../types';
import { industryColors, industryTextColors } from '../../constants';
import { getIndustryById } from '../../data';
import { cn } from '@/lib/utils';

interface IndustryBadgeProps {
  industry: IndustryCategory;
  size?: 'sm' | 'md' | 'lg';
  clickable?: boolean;
  className?: string;
}

export function IndustryBadge({
  industry,
  size = 'md',
  clickable = true,
  className,
}: IndustryBadgeProps) {
  const industryData = getIndustryById(industry);

  if (!industryData) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const content = (
    <Badge
      variant="secondary"
      className={cn(
        sizeClasses[size],
        industryTextColors[industry],
        'border border-current',
        clickable && 'hover:bg-opacity-20 cursor-pointer',
        className
      )}
    >
      {industryData.icon && <industryData.icon className="mr-1 h-4 w-4" />}
      {industryData.name}
    </Badge>
  );

  if (clickable) {
    return <Link to={`/portfolio/${industryData.slug}`}>{content}</Link>;
  }

  return content;
}
