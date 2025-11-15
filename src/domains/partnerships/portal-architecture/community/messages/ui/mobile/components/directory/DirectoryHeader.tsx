import { MessageCircle, MoreVertical } from "lucide-react";
import { HighlightCard } from "@/components/ui/card-5-static";
import type { DirectoryPanel } from "../DirectoryOverlay";

type DirectoryHeaderProps = {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  onSelectPanel: (panel: DirectoryPanel) => void;
};

const menuOptions: Array<{ label: string; panel: DirectoryPanel }> = [
  { label: "All Friends", panel: "all" },
  { label: "Outgoing", panel: "outgoing" },
  { label: "Blocked Users", panel: "blocked" },
];

export function DirectoryHeader({ isMenuOpen, onToggleMenu, onSelectPanel }: DirectoryHeaderProps) {
  return (
    <div className="relative">
      <HighlightCard
        color="orange"
        className="w-full"
        title="Messages & Friends"
        description=""
        icon={<MessageCircle className="h-5 w-5" />}
        metricValue=""
        metricLabel=""
        buttonText=""
        onButtonClick={() => {}}
        hideDivider
        hideFooter
        titleClassName="uppercase tracking-[0.35em] font-semibold text-[22px]"
        descriptionClassName="hidden"
      />
      <div className="absolute -right-1 -top-2">
        <div className="relative">
          <button
            type="button"
            onClick={onToggleMenu}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white shadow-md transition hover:border-white/80 hover:bg-white/25"
            aria-label="Directory actions"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-2xl border border-white/20 bg-siso-bg-secondary/95 text-siso-text-primary shadow-[0_12px_30px_rgba(0,0,0,0.4)] z-[130]">
              {menuOptions.map((option) => (
                <button
                  key={option.label}
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm transition hover:bg-siso-bg-hover"
                  onClick={() => onSelectPanel(option.panel)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
