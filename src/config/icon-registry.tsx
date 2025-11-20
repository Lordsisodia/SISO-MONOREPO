"use client";

import {
  Home,
  TrendingUp,
  GraduationCap,
  DollarSign,
  Calendar,
  CheckSquare,
  Users,
  FileText,
  Settings,
  Bell,
  FolderOpen,
  LayoutDashboard,
  Handshake,
  Briefcase,
  Wrench,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "Home"
  | "TrendingUp"
  | "GraduationCap"
  | "DollarSign"
  | "Calendar"
  | "CheckSquare"
  | "Users"
  | "FileText"
  | "Settings"
  | "Bell"
  | "FolderOpen"
  | "LayoutDashboard"
  | "Handshake"
  | "Briefcase"
  | "Wrench"
  | "UserPlus";

const registry: Record<IconName, LucideIcon> = {
  Home,
  TrendingUp,
  GraduationCap,
  DollarSign,
  Calendar,
  CheckSquare,
  Users,
  FileText,
  Settings,
  Bell,
  FolderOpen,
  LayoutDashboard,
  Handshake,
  Briefcase,
  Wrench,
  UserPlus,
};

export function getIconComponent(name: string): LucideIcon | null {
  return (registry as Record<string, LucideIcon>)[name] || null;
}
