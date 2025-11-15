"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";

interface QuickSettingsCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  badge?: string | null;
  color: "orange" | "blue" | "purple" | "green";
  preview?: React.ReactNode;
}

export function QuickSettingsCard({
  title,
  description,
  icon,
  href,
  badge,
  color,
  preview
}: QuickSettingsCardProps) {
  const colorClasses = {
    orange: {
      bg: "bg-siso-orange/10",
      border: "border-siso-orange/60",
      iconBg: "bg-siso-orange/20",
      iconText: "text-siso-orange",
      hover: "hover:border-siso-orange hover:bg-siso-orange/5"
    },
    blue: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/60",
      iconBg: "bg-blue-500/20",
      iconText: "text-blue-500",
      hover: "hover:border-blue-500 hover:bg-blue-500/5"
    },
    purple: {
      bg: "bg-purple-500/10",
      border: "border-purple-500/60",
      iconBg: "bg-purple-500/20",
      iconText: "text-purple-500",
      hover: "hover:border-purple-500 hover:bg-purple-500/5"
    },
    green: {
      bg: "bg-green-500/10",
      border: "border-green-500/60",
      iconBg: "bg-green-500/20",
      iconText: "text-green-500",
      hover: "hover:border-green-500 hover:bg-green-500/5"
    }
  };

  const classes = colorClasses[color];

  return (
    <Link
      href={href}
      className={cn(
        "block group rounded-2xl border-2 p-6 transition-all",
        classes.bg,
        classes.border,
        classes.hover
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform",
          classes.iconBg,
          classes.iconText
        )}>
          {icon}
        </div>
        {badge && (
          <span className="px-2 py-1 bg-siso-orange text-white text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-siso-text-primary mb-2 group-hover:text-siso-orange transition-colors">
        {title}
      </h3>

      <p className="text-sm text-siso-text-muted leading-relaxed mb-4">
        {description}
      </p>

      {preview && (
        <div className="border-t border-siso-border/30 pt-4">
          {preview}
        </div>
      )}

      <div className="flex items-center text-siso-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Configure</span>
        <ChevronRight className="h-4 w-4 ml-1" />
      </div>
    </Link>
  );
}