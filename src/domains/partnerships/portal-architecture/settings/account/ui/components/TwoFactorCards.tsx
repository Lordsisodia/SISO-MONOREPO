"use client";

import { KeyRound, MessageSquare, QrCode, ShieldCheck, Smartphone, FileDown } from "lucide-react";

export function TwoFactorCards({ showBackup = false }: { showBackup?: boolean }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {/* Authenticator app (TOTP) */}
      <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between gap-3 px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
              <QrCode className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-primary">Authenticator app</p>
              <p className="text-xs text-siso-text-muted leading-snug max-w-[60ch]">Use an authenticator app (Google Authenticator, 1Password, Authy) to generate secure codes.</p>
            </div>
          </div>
          <span className="rounded-full px-2 py-0.5 text-[11px] border border-siso-border/60 text-siso-text-muted">Disabled</span>
        </div>

        <div className="px-4 pb-4 space-y-3">
          <div className="rounded-[18px] border border-white/10 bg-white/5 p-3">
            <p className="text-[11px] text-siso-text-muted">When enabled, you’ll scan a QR code and enter a 6‑digit code to finish setup.</p>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full bg-siso-orange/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0d0d10]">Set up</button>
            <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange">Learn more</button>
          </div>
        </div>
      </div>

      {/* Text / WhatsApp codes (OTP) */}
      <div className="rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between gap-3 px-4 py-4">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
              <Smartphone className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-primary">Text/WhatsApp codes</p>
              <p className="text-xs text-siso-text-muted leading-snug max-w-[60ch]">Get a 6‑digit code by text message or WhatsApp.</p>
            </div>
          </div>
          <span className="rounded-full px-2 py-0.5 text-[11px] border border-siso-border/60 text-siso-text-muted">Disabled</span>
        </div>

        <div className="px-4 pb-4 space-y-3">
          {/* Segmented channel selector (visual only) */}
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-[11px]">
            <button type="button" className="rounded-full px-3 py-1 bg-siso-orange/20 text-siso-text-primary">SMS</button>
            <button type="button" className="rounded-full px-3 py-1 text-siso-text-muted hover:text-siso-text-primary">WhatsApp</button>
          </div>
          <div className="flex items-center justify-between rounded-[18px] border border-white/10 bg-white/5 p-3 text-xs">
            <span className="text-siso-text-muted">Phone • • • • • • 1234</span>
            <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange">Change</button>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-full bg-siso-orange/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0d0d10]">Enable</button>
            <button type="button" className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange">Test send</button>
          </div>
        </div>
      </div>

      {showBackup ? (
        <div className="md:col-span-2 rounded-[26px] border border-white/10 bg-siso-bg-secondary shadow-[0_12px_30px_rgba(0,0,0,0.35)]">
          <div className="flex items-start justify-between gap-3 px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 text-siso-orange">
                <KeyRound className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-siso-text-primary">Backup codes</p>
                <p className="text-xs text-siso-text-muted leading-snug max-w-[60ch]">Use a backup code if you lose access to your device. Codes are shown only once—store them securely.</p>
              </div>
            </div>
            <span className="rounded-full px-2 py-0.5 text-[11px] border border-siso-border/60 text-siso-text-muted">0/10</span>
          </div>
          <div className="px-4 pb-4 flex items-center gap-2">
            <button type="button" className="rounded-full bg-siso-orange/90 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0d0d10]">Generate</button>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-siso-text-muted transition hover:border-siso-orange/70 hover:text-siso-orange">
              <FileDown className="h-3.5 w-3.5" /> Download
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TwoFactorCards;
