interface SectionHeaderProps {
  label: string;
  description?: string;
  actionLabel?: string;
}

export function SectionHeader({ label, description, actionLabel = "View all" }: SectionHeaderProps) {
  return (
    <header className="flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold text-siso-text-primary">{label}</h2>
        {description && <p className="text-sm text-siso-text-muted">{description}</p>}
      </div>
      <button type="button" className="text-sm text-siso-text-muted underline underline-offset-4">
        {actionLabel}
      </button>
    </header>
  );
}
