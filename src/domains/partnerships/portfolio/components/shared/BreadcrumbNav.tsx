/**
 * Portfolio Domain - Breadcrumb Navigation Component
 */

import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNav({ items, className }: BreadcrumbNavProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center gap-2 text-sm text-siso-text-muted', className)}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={`breadcrumb-${index}-${item.href}`} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-white font-medium">{item.label}</span>
            ) : (
              <>
                <Link
                  to={item.href}
                  className="hover:text-siso-orange transition-colors"
                >
                  {item.label}
                </Link>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
}
