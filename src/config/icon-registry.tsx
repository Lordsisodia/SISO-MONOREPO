"use client";

import type { ComponentType } from "react";
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
  | "Wrench";

const registry: Record<IconName, ComponentType<{ size?: number; className?: string }>> = {
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
};

export function getIconComponent(name: string): ComponentType<{ size?: number; className?: string }> | null {
  return (registry as Record<string, ComponentType<{ size?: number; className?: string }>>)[name] || null;
}
