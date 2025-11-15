"use client";

import type { PropsWithChildren } from "react";
import { cn } from "@/domains/shared/utils/cn";
import { Toggle, GooeyFilter } from "@/components/ui/liquid-toggle";

type ToggleRowProps = PropsWithChildren<{
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (id: string) => void;
  className?: string;
}>;

export default function ToggleRow({ id, label, description, checked, onChange, className }: ToggleRowProps) {
  const labelId = `${id}-label`;
  const descId = description ? `${id}-desc` : undefined;
  return (
    <div className={cn("flex items-start justify-between gap-4 px-4 py-4", className)}>
      <div className="min-w-0 flex-1">
        <p id={labelId} className="text-sm font-semibold text-siso-text-primary">{label}</p>
        {description ? <p id={descId} className="text-xs text-siso-text-muted">{description}</p> : null}
      </div>
      <div className="relative">
        {/* Ensure the goo filter is available on pages that render toggles */}
        <GooeyFilter />
        <Toggle
          checked={checked}
          onCheckedChange={() => onChange(id)}
          className="mt-0.5"
          variant="default"
        />
      </div>
    </div>
  );
}
