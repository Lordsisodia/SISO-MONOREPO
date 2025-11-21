import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/domains/shared/utils/cn";

type EarningsHeroBackLinkProps = {
  href?: string;
  ariaLabel?: string;
  className?: string;
};

export function EarningsHeroBackLink({
  href = "/partners/earnings",
  ariaLabel = "Back to earnings dashboard",
  className,
}: EarningsHeroBackLinkProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80",
        className,
      )}
    >
      <ArrowLeft className="h-5 w-5" />
    </Link>
  );
}
