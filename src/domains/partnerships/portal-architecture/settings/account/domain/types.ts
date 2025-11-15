import type { LucideIcon } from "lucide-react";

export interface AccountField {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  helper?: string;
}

export interface TwoFactorAction {
  id: string;
  label: string;
  description: string;
  ctaLabel: string;
}
