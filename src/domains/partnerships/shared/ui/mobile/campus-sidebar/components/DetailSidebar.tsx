import { useState } from "react";
import { Info as InfoIcon, Lock as LockIcon } from "lucide-react";

import { GlowDivider } from "@/domains/shared/components/GlowDivider";

import { softSpringEasing } from "../constants";
import { PartnershipHubWidgets } from "./HubWidgets";
import { MenuSectionList } from "./MenuSections";
import { SearchContainer } from "./SearchContainer";
import { getSidebarContent } from "../config/sidebarContent";
import type { MenuItem } from "../types";

interface DetailSidebarProps {
  activeSection: string;
  heightClass?: string;
  onNavigate?: (href: string) => void;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="w-full transition-all duration-500" style={{ transitionTimingFunction: softSpringEasing }}>
      <div className="flex flex-col gap-2">
        <div className="px-2 py-1">
          <div className="font-['Lexend:SemiBold',_sans-serif] text-[18px] text-neutral-50 leading-[24px] whitespace-normal break-words">
            {title}
          </div>
        </div>
        <GlowDivider variant="orange" height={3} animated="pulse" />
      </div>
    </div>
  );
}

export function DetailSidebar({ activeSection, heightClass = "h-[800px]", onNavigate }: DetailSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [infoItem, setInfoItem] = useState<MenuItem | null>(null);
  const content = getSidebarContent(activeSection);

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemKey)) next.delete(itemKey);
      else next.add(itemKey);
      return next;
    });
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.href && onNavigate) {
      onNavigate(item.href);
    }
  };

  return (
    <aside
      className={`bg-black flex flex-col gap-4 items-start overflow-y-auto overscroll-contain p-4 rounded-r-2xl transition-all duration-500 h-screen flex-1 min-w-0 ${heightClass}`}
      style={{ transitionTimingFunction: softSpringEasing, WebkitOverflowScrolling: "touch" }}
    >
      <SectionTitle title={content.title} />
      <SearchContainer activeSection={activeSection} />
      {activeSection === "home" && <PartnershipHubWidgets onNavigate={onNavigate} />}

      <div
        className="flex flex-col w-full flex-1 min-h-0 overflow-y-auto transition-all duration-500 gap-4 items-start"
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        {content.sections.map((section, index) => (
          <MenuSectionList
            key={`${activeSection}-${index}`}
            section={section}
            expandedItems={expandedItems}
            onToggleExpanded={toggleExpanded}
            isCollapsed={false}
            onItemClick={handleItemClick}
            onInfoClick={(item) => setInfoItem(item)}
          />
        ))}
      </div>

      {infoItem && (
        <div className="fixed inset-0 z-[99]" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/40" onClick={() => setInfoItem(null)} aria-label="Dismiss info overlay" />
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-2xl border border-[rgba(255,167,38,0.32)] bg-[#0b0b0b] p-4 shadow-2xl"
            style={{ boxShadow: "0 -12px 30px rgba(0,0,0,0.6)" }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full" style={{ color: "var(--siso-orange)" }}>
                {infoItem.locked ? <LockIcon size={16} /> : <InfoIcon size={16} />}
              </span>
              <h3 className="text-[15px] font-semibold text-siso-text-primary">{infoItem.label}</h3>
            </div>
            {infoItem.locked && infoItem.tierRequired && (
              <div className="mb-3 rounded-lg border border-[rgba(255,167,38,0.32)] bg-[rgba(255,167,38,0.08)] p-3">
                <p className="text-[13px] text-neutral-200 leading-snug">
                  <span className="font-semibold" style={{ color: "var(--siso-orange)" }}>
                    Unlock at {infoItem.tierRequired.charAt(0).toUpperCase() + infoItem.tierRequired.slice(1)} tier
                  </span>
                  <br />
                  {infoItem.tierRequired === "active" && "Close 3 deals to unlock this feature."}
                  {infoItem.tierRequired === "performer" && "Close 10 deals to unlock this feature."}
                  {infoItem.tierRequired === "elite" && "Close 25 deals to unlock this feature."}
                </p>
              </div>
            )}
            {infoItem.description && (
              <p className="mb-3 text-[13px] text-neutral-300 leading-snug">{infoItem.description}</p>
            )}
            <div className="flex flex-col gap-1">
              {infoItem.locked ? (
                <button
                  className="flex-1 rounded-lg px-3 py-2 text-sm font-semibold text-white"
                  style={{ background: "var(--siso-gradient-primary)" }}
                  onClick={() => {
                    setInfoItem(null);
                    onNavigate?.("/partner/tier-progress");
                  }}
                >
                  View tier progress
                </button>
              ) : (
                <button
                  className="flex-1 rounded-lg px-3 py-2 text-sm font-semibold text-white"
                  style={{ background: "var(--siso-gradient-primary)" }}
                  onClick={() => {
                    const href = infoItem.href;
                    setInfoItem(null);
                    if (href) onNavigate?.(href);
                  }}
                >
                  Open
                </button>
              )}
              <button className="rounded-lg px-3 py-2 text-sm text-neutral-300 border border-neutral-700" onClick={() => setInfoItem(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
