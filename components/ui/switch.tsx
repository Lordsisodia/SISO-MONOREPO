"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps extends React.HTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function Switch({ checked = false, onCheckedChange, disabled, className, ...rest }: SwitchProps) {
  const [internal, setInternal] = React.useState(checked);
  React.useEffect(() => setInternal(checked), [checked]);
  const toggle = () => {
    if (disabled) return;
    const next = !internal;
    setInternal(next);
    onCheckedChange?.(next);
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={internal}
      aria-disabled={disabled}
      onClick={toggle}
      className={cn(
        "inline-flex h-5 w-9 items-center rounded-full transition-colors",
        internal ? "bg-siso-orange" : "bg-white/10",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
      {...rest}
    >
      <span
        className={cn(
          "ml-0.5 inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          internal ? "translate-x-4" : "translate-x-0",
        )}
      />
    </button>
  );
}

export default Switch;

