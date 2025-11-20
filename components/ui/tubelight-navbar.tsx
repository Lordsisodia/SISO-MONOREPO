"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type NavBarItem = {
  name: string;
  url: string;
  icon?: LucideIcon;
};

interface NavBarProps {
  items: NavBarItem[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function NavBar({ items, value, onChange, className }: NavBarProps) {
  if (!items?.length) return null;

  return (
    <div className={cn("flex flex-wrap gap-2 rounded-full bg-white/5 p-1 text-sm", className)}>
      {items.map((item) => {
        const active = value ? value === item.url : false;
        const Icon = item.icon;
        return (
          <button
            key={item.url}
            type="button"
            onClick={() => onChange?.(item.url)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 transition",
              active
                ? "bg-white text-siso-bg font-semibold shadow-sm"
                : "text-white/70 hover:text-white hover:bg-white/10",
            )}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
