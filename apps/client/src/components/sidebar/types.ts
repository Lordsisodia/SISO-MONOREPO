
import { LucideIcon } from 'lucide-react';

export interface MenuSection {
  type: 'main' | 'section';
  href?: string;
  icon: LucideIcon;
  label?: string;
  title?: string;
  items?: MenuItem[];
}

export interface MenuItem {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: string;
  badgeColor?: 'green' | 'orange' | 'gray' | 'purple' | 'red';
  disabled?: boolean;
}

export interface NavigationProps {
  collapsed: boolean;
  onItemClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  visible: boolean;
}
