import { cn } from "@/domains/shared/utils/cn";
import type { PropsWithChildren } from "react";

type ScrimListProps = PropsWithChildren<{
  className?: string;
  divided?: boolean;
  role?: string;
  ariaLabel?: string;
  ariaLabelledby?: string;
}>;

export function ScrimList({ children, className, divided = true, role = "list", ariaLabel, ariaLabelledby }: ScrimListProps) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-white/10 bg-white/5",
        divided && "divide-y divide-white/5",
        className,
      )}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
    >
      {children}
    </div>
  );
}

type RowProps = PropsWithChildren<{ className?: string }>;
ScrimList.Row = function Row({ children, className }: RowProps) {
  return <div role="listitem" className={cn("flex items-center gap-3 px-4 py-4", className)}>{children}</div>;
};

export default ScrimList;
