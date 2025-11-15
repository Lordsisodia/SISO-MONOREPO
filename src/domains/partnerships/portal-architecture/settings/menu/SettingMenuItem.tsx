import Link from "next/link";
import { memo } from "react";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SettingMenuItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
  meta?: string;
}

function SettingMenuItemBase({ label, icon: Icon, href, meta }: SettingMenuItemProps) {
  return (
    <Link
      href={href}
      prefetch={false}
      className="group flex w-full items-center justify-between rounded-2xl px-2 py-3 text-left transition hover:bg-siso-bg-tertiary/30"
    >
      <span className="flex min-w-0 items-center gap-3">
        <Icon className="h-[18px] w-[18px] text-siso-orange transition group-hover:text-white" />
        <span className="truncate whitespace-nowrap text-sm text-siso-text-primary">{label}</span>
      </span>
      <span className="flex items-center gap-2">
        {meta && (
          <span className="rounded-full border border-siso-border/50 px-2 py-0.5 text-[11px] text-siso-text-muted transition group-hover:border-siso-border/80 group-hover:text-siso-text-primary">
            {meta}
          </span>
        )}
        <ChevronRight className="h-[18px] w-[18px] text-siso-text-muted transition group-hover:text-siso-text-primary" />
      </span>
    </Link>
  );
}

export const SettingMenuItem = memo(SettingMenuItemBase);
