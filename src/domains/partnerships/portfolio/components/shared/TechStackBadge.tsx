/**
 * Portfolio Domain - Tech Stack Badge Component
 */

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TechStackBadgeProps {
  tech: string;
  category?: 'frontend' | 'backend' | 'database' | 'hosting' | 'tool';
  size?: 'sm' | 'md';
  className?: string;
}

const categoryColors = {
  frontend: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  backend: 'bg-green-500/20 text-green-400 border-green-500/30',
  database: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  hosting: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  tool: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export function TechStackBadge({
  tech,
  category,
  size = 'sm',
  className,
}: TechStackBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        sizeClasses[size],
        category && categoryColors[category],
        'border',
        className
      )}
    >
      {tech}
    </Badge>
  );
}
