"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsDetailLayout } from "../../components/SettingsDetailLayout";
import { HighlightCard } from "@/components/ui/card-5";
import { Plug, ChevronLeft, ExternalLink, Settings, Activity, Clock, Data, XCircle, ChevronDown, Search, Loader2 } from "lucide-react";
import ScrimList from "@/domains/shared/ui/settings/ScrimList";
import { InfoButton } from "@/components/ui/info-button";
import { SettingsGroupCallout } from "../../menu/SettingsGroupCallout";
import { integrationLogos, type IntegrationLogoKey } from "@/assets/integrations";

const availableIntegrations = [
  {
    id: "notion",
    name: "Notion",
    description: "Sync tasks and documents with your Notion workspace",
    icon: "📝",
    category: "Productivity",
    connected: true,
    color: "text-gray-800",
    lastSync: "2 hours ago",
    syncStatus: "active",
    usageStats: { syncedItems: 245, lastWeek: 89 },
    features: ["Task sync", "Document sharing", "Workspace access"]
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Access files and documents from Google Drive",
    icon: "📁",
    category: "Storage",
    connected: false,
    color: "text-blue-600"
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications and send messages to Slack channels",
    icon: "💬",
    category: "Communication",
    connected: true,
    color: "text-purple-600",
    lastSync: "5 minutes ago",
    syncStatus: "active",
    usageStats: { messages: 1247, lastWeek: 423 },
    features: ["Partner notifications", "Deal updates", "Task assignments"]
  },
  {
    id: "calendar",
    name: "Google Calendar",
    description: "Sync meetings and events with your calendar",
    icon: "📅",
    category: "Scheduling",
    connected: false,
    color: "text-green-600"
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    description: "Send templated notifications and receive partner replies",
    icon: "📲",
    category: "Messaging",
    connected: false,
    color: "text-emerald-500"
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Enable cash-outs and payout visibility",
    icon: "💳",
    category: "Payments",
    connected: false,
    color: "text-indigo-500"
  },
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect an EVM wallet for crypto payouts",
    icon: "🦊",
    category: "Crypto Wallets",
    connected: false,
    color: "text-orange-400"
  },
  {
    id: "phantom",
    name: "Phantom Wallet",
    description: "Connect a Solana wallet for crypto payouts",
    icon: "👻",
    category: "Crypto Wallets",
    connected: false,
    color: "text-violet-400"
  },
  {
    id: "github",
    name: "GitHub",
    description: "Link repositories and track development activity",
    icon: "🐙",
    category: "Development",
    connected: false,
    color: "text-gray-900"
  },
  {
    id: "figma",
    name: "Figma",
    description: "Access design files and prototypes",
    icon: "🎨",
    category: "Design",
    connected: false,
    color: "text-purple-500"
  }
];

export function IntegrationsSettingsScreen() {
  const [integrations, setIntegrations] = useState(availableIntegrations);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [modalView, setModalView] = useState<'status' | 'wizard'>("status");
  const [wizardStep, setWizardStep] = useState<1 | 2 | 3>(1);
  const [wizardMethod, setWizardMethod] = useState<'oauth' | 'apikey' | null>(null);
  const [wizardApiKey, setWizardApiKey] = useState("");
  const [wizardBusy, setWizardBusy] = useState(false);
  const [reauthRequired, setReauthRequired] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const openManageModal = (integration: any) => {
    setSelectedIntegration(integration);
    // If not connected, start in wizard. If connected, show status.
    if (!integration.connected) {
      setModalView("wizard");
      setWizardStep(1);
      setWizardMethod(null);
      setWizardApiKey("");
      setModalError(null);
      setReauthRequired(false);
    } else {
      setModalView("status");
      setModalError(null);
      setReauthRequired(false);
    }
    setShowManageModal(true);
  };

  const closeManageModal = () => {
    setShowManageModal(false);
    setSelectedIntegration(null);
    setWizardStep(1);
    setWizardMethod(null);
    setWizardApiKey("");
    setWizardBusy(false);
    setModalError(null);
    setReauthRequired(false);
  };

  const connectedCount = integrations.filter(i => i.connected).length;
  const toggleRow = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const visibleIntegrations = integrations.filter((i) =>
    [i.name, i.description, i.category].some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  // UI-only: Simulate OAuth connect or API key save
  const simulateConnect = async () => {
    if (!selectedIntegration) return;
    setWizardBusy(true);
    setModalError(null);
    await new Promise((r) => setTimeout(r, 700));
    setWizardBusy(false);
    // Mark as connected and update lastSync
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === selectedIntegration.id ? { ...i, connected: true, lastSync: "Just now", syncStatus: "active" } : i
      )
    );
    setModalView("status");
  };

  const saveApiKey = async () => {
    if (wizardApiKey.trim().length < 10) {
      setModalError("Enter a valid API key (10+ characters).");
      return;
    }
    await simulateConnect();
  };

  return (
    <>
      <style jsx global>{``}</style>
      <SettingsDetailLayout
        title=""
        description=""
        wrapContent={false}
        backHref={null}
        compactHeader
        hideHeader
        srTitle="Integrations Settings"
      >
        <div className="integrations-settings-scope space-y-4 pb-32 text-siso-text-primary">
          {/* Integrations Header Card */}
          <div className="relative min-h-[128px]">
            <div className="pointer-events-none absolute inset-y-0 left-3 z-10 flex items-center">
              <Link
                href="/partners/settings"
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center text-white transition hover:text-white/80"
                aria-label="Back to settings"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </div>
            <HighlightCard
              color="orange"
              className="w-full pl-12 pr-16 integrations-card"
              title="Integrations"
              description="Connect your favorite tools and services"
              icon={<Plug className="h-5 w-5" />}
              metricValue={`${connectedCount}`}
              metricLabel="connected"
              buttonText=""
              onButtonClick={() => {}}
              hideDivider
              hideFooter
              titleClassName="uppercase tracking-[0.25em] font-semibold text-[20px] leading-[1.2] whitespace-normal break-words"
              descriptionClassName="text-xs"
            />
          </div>

          {/* Integrations Content */}
          <div className="space-y-8 pb-32 text-siso-text-primary">
            {/* Connections summary (double callout) */}
            <SettingsGroupCallout
              icon={<Plug className="h-4 w-4" />}
              title="Connections"
              subtitle="Manage your connected apps and services"
              showChevron={false}
              endBadge={<span className="text-[11px] text-siso-text-muted">{connectedCount} / {integrations.length}</span>}
            >
              <ScrimList divided={false} ariaLabel="Connection overview">
                <div className="px-2 py-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-siso-text-primary">Connected Services</p>
                        <InfoButton label="What is connected?" content="Apps you’ve already linked to SISO. Keep them in sync from here." side="bottom" variant="ghost" />
                      </div>
                      <p className="text-xs text-siso-text-muted">Currently active integrations</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-emerald-400 tabular-nums">{connectedCount}</p>
                      <button type="button" className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-wide text-siso-text-primary hover:bg-white/5">
                        Sync all
                      </button>
                    </div>
                  </div>
                </div>
              </ScrimList>
            </SettingsGroupCallout>

            {/* Available integrations (double callout) */}
            <SettingsGroupCallout
              icon={<Plug className="h-4 w-4" />}
              title="Available Integrations"
              subtitle="Connect apps to enhance your workflow"
              showChevron={false}
            >
              {/* Search */}
              <div className="px-2 pb-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-siso-text-muted" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search integrations"
                    className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-xs text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none focus:ring-1 focus:ring-siso-orange/60"
                  />
                </div>
              </div>

              <ScrimList ariaLabel="Available integrations list">
                {visibleIntegrations.map((integration) => (
                  <ScrimList.Row key={integration.id} className="items-start flex-wrap md:flex-nowrap gap-y-2">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/5">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={integrationLogos[integration.id as IntegrationLogoKey]}
                        alt=""
                        className="h-5 w-5 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-siso-text-primary">{integration.name}</p>
                        <InfoButton
                          label={`${integration.name} info`}
                          content={`Why connect ${integration.name}? ${integration.description}`}
                          side="bottom"
                          variant="ghost"
                        />
                      </div>
                      <p className="text-xs text-siso-text-muted">{integration.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[11px] uppercase tracking-wide ${integration.connected ? "text-emerald-400/80" : "text-siso-text-muted"}`}>
                          {integration.connected ? "Connected" : "Available"}
                        </span>
                        <span className="text-[11px] uppercase tracking-wide text-siso-text-muted">• {integration.category}</span>
                      </div>
                      {/* details button moved to right action bar for all breakpoints */}
                      {expanded.has(integration.id) && integration.connected && (
                        <div className="mt-2">
                          <div className="flex items-center gap-3 text-[11px] text-siso-text-muted">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{integration.lastSync}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Actions: Connect vs Manage/Disconnect */}
                    {integration.connected ? (
                      <div className="ml-auto w-full md:w-auto flex items-center justify-end gap-2 mt-2 md:mt-0">
                        <button
                          type="button"
                          onClick={() => toggleRow(integration.id)}
                          aria-expanded={expanded.has(integration.id)}
                          className="inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-siso-text-primary hover:bg-white/10 items-center gap-1"
                        >
                          <ChevronDown className={`h-3 w-3 transition-transform ${expanded.has(integration.id) ? 'rotate-180' : ''}`} />
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => openManageModal(integration)}
                          className="inline-flex rounded-xl border border-siso-orange/60 px-3 py-1 text-xs text-siso-orange hover:bg-siso-orange/10 items-center gap-1"
                        >
                          <Settings className="h-3 w-3" />
                          Manage
                        </button>
                      </div>
                    ) : (
                      <div className="ml-auto w-full md:w-auto flex items-center justify-end gap-2 mt-2 md:mt-0">
                        <button
                          type="button"
                          onClick={() => toggleRow(integration.id)}
                          aria-expanded={expanded.has(integration.id)}
                          className="inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-siso-text-primary hover:bg-white/10 items-center gap-1"
                        >
                          <ChevronDown className={`h-3 w-3 transition-transform ${expanded.has(integration.id) ? 'rotate-180' : ''}`} />
                          Details
                        </button>
                        <button
                          type="button"
                          onClick={() => openManageModal(integration)}
                          className="inline-flex rounded-xl bg-emerald-400/90 px-3 py-1 text-xs font-medium text-black hover:bg-emerald-400"
                        >
                          Connect
                        </button>
                      </div>
                    )}
                  </ScrimList.Row>
                ))}
              </ScrimList>
            </SettingsGroupCallout>

            {/* Help & Docs (double callout) */}
            <SettingsGroupCallout
              icon={<ExternalLink className="h-4 w-4" />}
              title="Help & Docs"
              subtitle="Read setup guides and troubleshooting tips"
              showChevron={false}
            >
              <ScrimList divided={false} ariaLabel="Integrations help">
                <ScrimList.Row className="px-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-siso-text-primary">Integration Documentation</p>
                    <p className="text-xs text-siso-text-muted">Detailed guides and best practices</p>
                  </div>
                  <span className="text-xs text-siso-text-muted">Open</span>
                </ScrimList.Row>
              </ScrimList>
            </SettingsGroupCallout>
          </div>
        </div>

        {/* Management / Wizard Modal (UI-only) */}
        {showManageModal && selectedIntegration && (
          <div className="fixed inset-0 z-[99]" role="dialog" aria-modal="true">
            <button
              className="absolute inset-0 bg-black/40"
              onClick={closeManageModal}
              aria-label="Dismiss management modal"
            />
            <div
              className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-[rgba(255,167,38,0.32)] bg-[#0b0b0b] p-4 shadow-2xl max-h-[80vh] overflow-y-auto"
              style={{ boxShadow: "0 -12px 30px rgba(0,0,0,0.6)" }}
            >
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={integrationLogos[selectedIntegration.id as IntegrationLogoKey]}
                      alt=""
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[15px] font-semibold text-siso-text-primary">{selectedIntegration.name}</h3>
                    <p className="text-xs text-siso-text-muted">{selectedIntegration.category}</p>
                  </div>
                  <button
                    onClick={closeManageModal}
                    className="rounded-full border border-white/10 p-2 text-siso-text-muted hover:border-siso-orange/60 hover:text-siso-orange"
                    aria-label="Close modal"
                  >
                    <XCircle className="h-4 w-4" />
                  </button>
                </div>

                {/* MODAL CONTENT: status view */}
                {modalView === "status" && (
                  <>
                    {/* Re-auth banner (simulated) */}
                    {reauthRequired && (
                      <div className="mb-3 rounded-lg border border-yellow-500/40 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-300">
                        Session expired. Please reconnect this integration.
                        <div className="mt-2 flex gap-2">
                          <button
                            className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-siso-text-primary hover:bg-white/10"
                            onClick={() => {
                              setModalView("wizard");
                              setWizardStep(2);
                              setWizardMethod("oauth");
                              setReauthRequired(false);
                            }}
                          >
                            Reconnect
                          </button>
                          <button
                            className="rounded border border-white/10 bg-white/0 px-2 py-1 text-[11px] text-siso-text-muted hover:bg-white/5"
                            onClick={() => setReauthRequired(false)}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Connection Status */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${
                            selectedIntegration.syncStatus === 'active' ? 'bg-emerald-400' : 'bg-yellow-400'
                          }`} />
                          <span className="text-sm font-medium text-siso-text-primary">
                            {selectedIntegration.syncStatus === 'active' ? 'Connected' : 'Connection Issue'}
                          </span>
                        </div>
                        <span className="text-xs text-siso-text-muted">{selectedIntegration.lastSync || '—'}</span>
                      </div>
                    </div>

                    {/* Simple controls */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded-lg border border-siso-orange/60 px-3 py-1 text-xs text-siso-orange hover:bg-siso-orange/10"
                          onClick={() => {
                            // UI-only: update last sync
                            setIntegrations((prev) => prev.map((i) => i.id === selectedIntegration.id ? { ...i, lastSync: 'Just now' } : i));
                          }}
                        >
                          Sync now
                        </button>
                        <button
                          className="rounded-lg border border-white/10 px-3 py-1 text-xs text-siso-text-muted hover:bg-white/5"
                          onClick={() => setReauthRequired(true)}
                        >
                          Simulate token expiry
                        </button>
                      </div>
                    </div>

                    {/* Footer actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={closeManageModal}
                        className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-siso-text-primary hover:bg-white/5"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => {
                          toggleIntegration(selectedIntegration.id);
                          closeManageModal();
                        }}
                        className="rounded-lg border border-red-500/60 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                      >
                        Disconnect
                      </button>
                    </div>
                  </>
                )}

                {/* MODAL CONTENT: wizard view */}
                {modalView === "wizard" && (
                  <>
                    {/* Step indicator */}
                    <div className="mb-3 flex items-center gap-2 text-[11px] text-siso-text-muted">
                      <span className={`rounded px-2 py-0.5 border ${wizardStep === 1 ? 'border-siso-orange/60 text-siso-orange' : 'border-white/10'}`}>1. Method</span>
                      <span className={`rounded px-2 py-0.5 border ${wizardStep === 2 ? 'border-siso-orange/60 text-siso-orange' : 'border-white/10'}`}>2. Authorize / Key</span>
                      <span className={`rounded px-2 py-0.5 border ${wizardStep === 3 ? 'border-siso-orange/60 text-siso-orange' : 'border-white/10'}`}>3. Done</span>
                    </div>

                    {/* Errors */}
                    {modalError && (
                      <div className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                        {modalError}
                      </div>
                    )}

                    {/* Step 1: choose method */}
                    {wizardStep === 1 && (
                      <div className="grid grid-cols-1 gap-3">
                        <button
                          className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left ${wizardMethod === 'oauth' ? 'border-siso-orange/60 bg-siso-orange/5' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                          onClick={() => { setWizardMethod('oauth'); setWizardStep(2); setModalError(null); }}
                        >
                          <div>
                            <p className="text-sm font-semibold text-siso-text-primary">OAuth (recommended)</p>
                            <p className="text-xs text-siso-text-muted">Fast, secure sign-in via provider</p>
                          </div>
                        </button>
                        <button
                          className={`flex items-center justify-between rounded-xl border px-3 py-3 text-left ${wizardMethod === 'apikey' ? 'border-siso-orange/60 bg-siso-orange/5' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                          onClick={() => { setWizardMethod('apikey'); setWizardStep(2); setModalError(null); }}
                        >
                          <div>
                            <p className="text-sm font-semibold text-siso-text-primary">API key</p>
                            <p className="text-xs text-siso-text-muted">Paste a key from your provider</p>
                          </div>
                        </button>
                      </div>
                    )}

                    {/* Step 2: authorize / api key */}
                    {wizardStep === 2 && (
                      <div className="space-y-3">
                        {wizardMethod === 'oauth' && (
                          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <p className="text-xs text-siso-text-muted mb-3">Continue to {selectedIntegration.name} to authorize access. You’ll be returned here afterwards.</p>
                            <button
                              disabled={wizardBusy}
                              onClick={simulateConnect}
                              className="inline-flex items-center gap-2 rounded-lg bg-emerald-400/90 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-60"
                            >
                              {wizardBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                              {wizardBusy ? 'Connecting…' : 'Continue to provider'}
                            </button>
                            <button
                              className="ml-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-siso-text-muted hover:bg-white/5"
                              onClick={() => { setWizardStep(1); setWizardMethod(null); }}
                            >
                              Back
                            </button>
                          </div>
                        )}

                        {wizardMethod === 'apikey' && (
                          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                            <label className="block text-xs text-siso-text-muted mb-1">API key</label>
                            <input
                              value={wizardApiKey}
                              onChange={(e) => setWizardApiKey(e.target.value)}
                              placeholder="Paste your API key"
                              className="w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-siso-text-primary placeholder:text-siso-text-muted focus:outline-none focus:ring-1 focus:ring-siso-orange/60"
                            />
                            <div className="mt-3 flex gap-2">
                              <button
                                disabled={wizardBusy}
                                onClick={saveApiKey}
                                className="inline-flex items-center gap-2 rounded-lg bg-emerald-400/90 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 disabled:opacity-60"
                              >
                                {wizardBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                                Save key
                              </button>
                              <button
                                className="rounded-lg border border-white/10 px-3 py-2 text-sm text-siso-text-muted hover:bg-white/5"
                                onClick={() => { setWizardStep(1); setWizardMethod(null); setModalError(null); }}
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Step 3 (optional success) is represented by switching to status view after simulateConnect */}
                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={closeManageModal}
                        className="flex-1 rounded-lg border border-white/10 px-3 py-2 text-sm text-siso-text-primary hover:bg-white/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </SettingsDetailLayout>
    </>
  );
}
