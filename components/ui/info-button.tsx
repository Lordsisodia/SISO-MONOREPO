"use client";
import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";

type InfoButtonProps = {
  label: string;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  variant?: "badge" | "ghost"; // badge = circled button, ghost = inline icon only
};

export function InfoButton({ label, content, className, variant = "ghost" }: InfoButtonProps) {
  const open = () => {
    const event = new CustomEvent("siso:info", { detail: { title: label, content } });
    window.dispatchEvent(event);
  };

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-label={label}
      className={(variant === "badge"
        ? "inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/15 bg-white/5 text-siso-text-muted"
        : "inline-flex h-5 w-5 items-center justify-center text-siso-text-muted") +
        " hover:text-siso-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-siso-orange/50 " + (className ?? "")}
      onClick={open}
    >
      <Info className="h-3.5 w-3.5" />
    </button>
  );
}

export default InfoButton;
