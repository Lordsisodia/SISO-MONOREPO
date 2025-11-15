"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

type SelectContextType = {
  value?: string;
  onChange?: (v: string) => void;
};
const SelectCtx = React.createContext<SelectContextType>({});

export function Select({ value, onValueChange, children }: { value?: string; onValueChange?: (v: string) => void; children: React.ReactNode }) {
  return <SelectCtx.Provider value={{ value, onChange: onValueChange }}>{children}</SelectCtx.Provider>;
}

export function SelectTrigger({ className, children }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn("inline-flex items-center justify-between rounded-md border border-siso-border bg-siso-bg-secondary px-3 py-2 text-sm", className)}>
      {children}
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectCtx);
  return <span className="text-siso-text-muted">{value ?? placeholder ?? "Select"}</span>;
}

export function SelectContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-2 rounded-md border border-siso-border bg-siso-bg-secondary p-2 text-sm", className)}>{children}</div>;
}

export function SelectItem({ value, children, className, onClick }: { value: string; children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(SelectCtx);
  const select = () => ctx.onChange?.(value);
  return (
    <div role="option" aria-selected={ctx.value === value} onClick={(e) => { select(); onClick?.(e as any); }} className={cn("cursor-pointer rounded px-2 py-1 hover:bg-white/5", className)}>
      {children}
    </div>
  );
}

export default Select;

