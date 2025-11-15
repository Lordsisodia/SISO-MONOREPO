import rawConfig from "../../docs/partners/partnership-navigation-config.json";

export type TierId = "starter" | "active" | "performer" | "elite";

export interface NavDropdownItem {
  id: string;
  label: string;
  description?: string;
  path?: string;
}

export interface NavDropdown {
  id: string;
  label: string;
  items: NavDropdownItem[];
}

export interface NavSubsection {
  id: string;
  label: string;
  path: string;
  tierRequired: TierId;
  hasHashtag: boolean;
  description?: string;
  note?: string;
  dropdown?: NavDropdown;
  group?: string;
}

export interface TopLevelIconSpec {
  id: string;
  label: string;
  icon: string; // icon name from registry
  order: number;
  subsections: NavSubsection[];
  dropdown?: NavDropdown; // some sections have a global dropdown
}

export interface PartnerNavConfig {
  version: string;
  lastUpdated: string;
  description?: string;
  icons: TopLevelIconSpec[];
}

export const partnerNavConfig = rawConfig as unknown as PartnerNavConfig;

export type IconSummary = { id: string; label: string; icon: string; order: number };

export function getTopLevelIconSummaries(): IconSummary[] {
  const { icons } = partnerNavConfig;
  return [...icons]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map(({ id, label, icon, order }) => ({ id, label, icon, order }));
}
