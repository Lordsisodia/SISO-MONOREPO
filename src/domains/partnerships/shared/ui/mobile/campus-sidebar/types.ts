import type { ReactNode } from "react";

export interface HubCardAction {
  label: string;
  href: string;
}

export interface HubCardSpec {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  metricLabel?: string;
  metricValue?: string;
  trend?: string;
  icon: ReactNode;
  primaryAction: HubCardAction;
  secondaryAction?: HubCardAction;
  secondaryLink?: HubCardAction;
  sparkline?: number[];
  progress?: { value: number; label: string };
  metaRows?: { label: string; value: string }[];
  variant?: "hero" | "standard";
  background?: string;
  gridSpan?: string;
}

export interface MenuItem {
  icon?: ReactNode;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  href?: string;
  children?: MenuItem[];
  id?: string;
  tierRequired?: string;
  description?: string;
  badge?: number | "dot";
  locked?: boolean;
  group?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
  hideTitle?: boolean;
  isCallout?: boolean;
  subtitle?: string;
}

export interface SidebarContent {
  title: string;
  sections: MenuSection[];
}
