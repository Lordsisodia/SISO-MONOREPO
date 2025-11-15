"use client";

interface SettingsOverviewProps {
  settingsCompleteness: number;
  connectedIntegrations: number;
  notificationCategories: number;
  securityScore: number;
  lastSettingsUpdate: Date;
}

export function SettingsOverview({
  settingsCompleteness,
  connectedIntegrations,
  notificationCategories,
  securityScore,
  lastSettingsUpdate
}: SettingsOverviewProps) {
  const formatRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  return (
    <div className="mt-8 rounded-2xl border border-siso-border/60 bg-siso-bg-secondary/80 p-6">
      <h3 className="font-semibold text-siso-text-primary mb-4">Settings Overview</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-siso-text-primary">
            {settingsCompleteness}%
          </div>
          <div className="text-xs text-siso-text-muted">Complete</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-siso-text-primary">
            {connectedIntegrations}
          </div>
          <div className="text-xs text-siso-text-muted">Integrations</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-siso-text-primary">
            {notificationCategories}
          </div>
          <div className="text-xs text-siso-text-muted">Notification Types</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-siso-text-primary">
            {securityScore}
          </div>
          <div className="text-xs text-siso-text-muted">Security Score</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-siso-border/30">
        <p className="text-sm text-siso-text-muted text-center">
          Last updated: {formatRelativeTime(lastSettingsUpdate)}
        </p>
      </div>
    </div>
  );
}