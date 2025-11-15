"use client";
import { FileDown } from "lucide-react";

type DownloadPdfButtonProps = {
  filename?: string; // Browsers may ignore this; used as an aria hint
  className?: string;
  label?: string;
};

export default function DownloadPdfButton({ filename, className, label = "Download as PDF" }: DownloadPdfButtonProps) {
  const onClick = () => {
    // Client-side print; users can save as PDF. Filenames are browser-controlled.
    try {
      window.print();
    } catch {
      // noop
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={filename ? `${label}: ${filename}` : label}
      className={`no-print inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-siso-text-primary hover:border-siso-orange/60 hover:text-siso-orange ${className ?? ""}`}
    >
      <FileDown className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
