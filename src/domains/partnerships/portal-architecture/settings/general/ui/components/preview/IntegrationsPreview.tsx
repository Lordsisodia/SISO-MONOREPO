"use client";

import { Link2, Check, X } from "lucide-react";

interface Integration {
  name: string;
  connected: boolean;
  icon?: string;
}

interface IntegrationsPreviewProps {
  integrations: Integration[];
}

export function IntegrationsPreview({ integrations }: IntegrationsPreviewProps) {
  const connectedCount = integrations.filter(i => i.connected).length;
  const totalCount = integrations.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Link2 className="h-4 w-4 text-siso-text-muted" />
        <span className="text-xs text-siso-text-muted">Connected:</span>
        <span className={`text-xs font-medium ${
          connectedCount > 0 ? 'text-green-500' : 'text-siso-text-muted'
        }`}>
          {connectedCount} tool{connectedCount !== 1 ? 's' : ''}
        </span>
      </div>

      {integrations.length > 0 && (
        <div className="flex items-center gap-1">
          {integrations.slice(0, 3).map((integration, index) => (
            <div
              key={index}
              className={`w-5 h-5 rounded-full flex items-center justify-center ${
                integration.connected
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
              title={integration.name}
            >
              {integration.connected ? (
                <Check className="h-3 w-3" />
              ) : (
                <X className="h-3 w-3" />
              )}
            </div>
          ))}
          {totalCount > 3 && (
            <span className="text-xs text-siso-text-muted ml-1">
              +{totalCount - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}