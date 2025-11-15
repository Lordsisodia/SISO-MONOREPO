import { cloneElement, isValidElement } from "react";
import type { MenuItem, MenuSection } from "../types";
import { ArrowRight as ArrowRightIcon, Info as InfoIcon, Lock as LockIcon } from "lucide-react";
import { ChevronDown as ChevronDownIcon } from "@carbon/icons-react";
import { cn } from "@/domains/shared/utils/cn";

import { softSpringEasing } from "../constants";

interface MenuItemProps {
  item: MenuItem;
  isExpanded?: boolean;
  onToggle?: () => void;
  onItemClick?: (item: MenuItem) => void;
  isCollapsed?: boolean;
  onInfoClick?: (item: MenuItem) => void;
}

function MenuItemRow({ item, isExpanded, onToggle, onItemClick, isCollapsed, onInfoClick }: MenuItemProps) {
  const handleClick = () => {
    if (item.hasDropdown && onToggle) onToggle();
    else onItemClick?.(item);
  };

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${isCollapsed ? "w-full flex justify-center" : "w-full"}`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={`rounded-lg cursor-pointer transition-all duration-500 flex items-start relative ${
          item.isActive ? "bg-neutral-800" : "hover:bg-neutral-800"
        } ${isCollapsed ? "w-10 min-w-10 h-10 justify-center p-4" : "w-full min-h-10 px-4 py-2"}`}
        style={{ transitionTimingFunction: softSpringEasing }}
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
      >
        <div className="flex items-center justify-center shrink-0">{item.icon}</div>

        <div
          className={`flex-1 relative transition-opacity duration-500 ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-3 pr-6"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="flex items-center gap-2">
            <div className="font-['Lexend:Regular',_sans-serif] text-[14px] text-neutral-50 leading-[20px] whitespace-nowrap truncate">
              {item.label}
            </div>
            {item.locked && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full p-1 hover:bg-neutral-800"
                style={{ color: "var(--siso-orange)" }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onInfoClick?.(item);
                }}
                aria-label="View unlock requirements"
              >
                <LockIcon size={12} />
              </button>
            )}
            {item.badge && item.badge !== 0 && (
              <span
                className={`inline-flex items-center justify-center rounded-full text-[10px] leading-none font-semibold ${
                  item.badge === "dot" ? "h-2 w-2" : "h-4 min-w-[16px] px-[4px]"
                }`}
                style={{ backgroundColor: "var(--siso-orange)", color: "white", boxShadow: "var(--siso-glow-orange)" }}
              >
                {item.badge === "dot" ? "" : item.badge}
              </span>
            )}
            <button
              type="button"
              className="shrink-0 p-1 rounded hover:bg-neutral-800"
              onClick={(e) => {
                e.stopPropagation();
                onInfoClick?.(item);
              }}
              aria-label="More info"
            >
              <InfoIcon size={14} className="text-neutral-500" />
            </button>
          </div>
        </div>

        {item.hasDropdown && (
          <div
            className={`flex items-center justify-center shrink-0 transition-opacity duration-500 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-2"
            }`}
            style={{ transitionTimingFunction: softSpringEasing }}
          >
            <ChevronDownIcon
              size={16}
              className="text-neutral-50 transition-transform duration-500"
              style={{
                transitionTimingFunction: softSpringEasing,
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SubMenuItem({ item, onItemClick, onInfoClick }: { item: MenuItem; onItemClick?: (item: MenuItem) => void; onInfoClick?: (item: MenuItem) => void }) {
  return (
    <div className="w-full pl-9 pr-1 py-[1px]">
      <div className="min-h-10 w-full rounded-lg cursor-pointer transition-colors hover:bg-neutral-800 flex items-start px-3 py-2" onClick={() => onItemClick?.(item)}>
        <div className="flex-1 min-w-0 flex items-start gap-2">
          <div className="font-['Lexend:Regular',_sans-serif] text-[14px] text-neutral-300 leading-[18px] whitespace-normal break-words">
            {item.label}
          </div>
          <button
            type="button"
            className="p-1 rounded hover:bg-neutral-800"
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick?.(item);
            }}
            aria-label="More info"
            title="More info"
          >
            <InfoIcon size={14} className="text-neutral-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface MenuSectionListProps {
  section: MenuSection;
  expandedItems: Set<string>;
  onToggleExpanded: (itemKey: string) => void;
  isCollapsed?: boolean;
  onItemClick?: (item: MenuItem) => void;
  onInfoClick?: (item: MenuItem) => void;
}

export function MenuSectionList({
  section,
  expandedItems,
  onToggleExpanded,
  isCollapsed,
  onItemClick,
  onInfoClick,
}: MenuSectionListProps) {
  if (section.isCallout && section.items.length > 0) {
    const primary = section.items[0];
    const icon = isValidElement(primary.icon)
      ? cloneElement(primary.icon, {
          className: cn("h-4 w-4 text-siso-orange", (primary.icon.props as any)?.className),
        })
      : primary.icon;
    return (
      <button type="button" className="w-full text-left" onClick={() => onItemClick?.(primary)}>
        <div className="rounded-[24px] border border-white/15 bg-gradient-to-br from-[#1a1106] via-[#0f0f0f] to-[#050505] px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.65)] transition hover:border-siso-orange/50">
          <div className="flex items-start gap-3">
            <span className="inline-flex rounded-2xl border border-siso-orange/35 bg-siso-orange/10 p-2 text-siso-orange">
              {icon}
            </span>
            <div className="flex-1">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/70">{section.title}</p>
              {section.subtitle ? <p className="text-xs text-white/70">{section.subtitle}</p> : null}
            </div>
            <ArrowRightIcon className="mt-1 h-4 w-4 text-white/70" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full",
        section.isCallout &&
          "rounded-[20px] border border-white/10 bg-black/25 px-2 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.45)] text-white",
      )}
    >
      {!section.hideTitle && (
        <div
          className={`relative shrink-0 w-full transition-all duration-500 overflow-hidden ${
            isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div className="flex items-center h-10 px-4">
            <div className="font-['Lexend:Regular',_sans-serif] text-[14px] text-neutral-400">{section.title}</div>
          </div>
        </div>
      )}

      {section.items.map((item, index) => {
        const itemKey = `${section.title}-${index}`;
        const expanded = expandedItems.has(itemKey);
        return (
          <div key={itemKey} className="w-full flex flex-col">
            <MenuItemRow
              item={item}
              isExpanded={expanded}
              onToggle={() => onToggleExpanded(itemKey)}
              onItemClick={onItemClick}
              isCollapsed={isCollapsed}
              onInfoClick={onInfoClick}
            />
            {expanded && item.children && !isCollapsed && (
              <div className="flex flex-col gap-1 mb-2">
                {item.children.map((child, childIndex) => (
                  <SubMenuItem key={`${itemKey}-${childIndex}`} item={child} onItemClick={onItemClick} onInfoClick={onInfoClick} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
