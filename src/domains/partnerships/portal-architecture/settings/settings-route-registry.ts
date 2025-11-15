import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import type { QuickActionId } from "@/domains/partnerships/mobile/types/navigation";
import {
  Bell,
  FileText,
  IdCard,
  Languages,
  Link2,
  Lock,
  Palette,
  Plug,
  Settings as SettingsIcon,
  Shield,
  UserRound,
  Users,
} from "lucide-react";
import { Wallet as WalletIcon } from "lucide-react";

export type SettingsRouteStatus = "live" | "planned" | "deprecated";
export type SettingsRouteGroup = "Basics" | "Account" | "Privacy" | "Integrations" | "Growth" | "Support";

export interface SettingsRouteDefinition {
  id: string;
  slug: string;
  path: string;
  title: string;
  menuLabel?: string;
  description?: string;
  icon: LucideIcon;
  group: SettingsRouteGroup;
  status: SettingsRouteStatus;
  menuHidden?: boolean; // hide from main settings menu, keep route live
  tier?: "starter" | "active" | "performer" | "elite";
  featureFlag?: string;
  quickActionId?: QuickActionId;
  menuMeta?: string;
  component?: () => Promise<{ default: ComponentType }>; // lazily loaded when route is active
}

const lazy = <T extends ComponentType>(factory: () => Promise<{ default: T } | Record<string, T>>, exportName?: string) => {
  return () =>
    factory().then((mod: any) => ({
      default: exportName ? mod[exportName] : mod.default ?? Object.values(mod)[0],
    }));
};

export const settingsRouteRegistry: SettingsRouteDefinition[] = [
  {
    id: "settings-general",
    slug: "general",
    path: "/partners/settings/general",
    title: "General Settings",
    menuLabel: "General",
    description: "Workspace defaults and preferences",
    icon: SettingsIcon,
    group: "Basics",
    status: "live",
    tier: "starter",
    quickActionId: "settings-general",
    component: lazy(() => import("./general/ui/GeneralSettingsScreen"), "GeneralSettingsScreen"),
  },
  {
    id: "settings-account",
    slug: "account",
    path: "/partners/settings/account",
    title: "My Account",
    description: "Manage workspace identity and security",
    icon: IdCard,
    group: "Account",
    status: "live",
    tier: "starter",
    quickActionId: "settings-account",
    menuMeta: "2 new",
    component: lazy(() => import("./account/ui/AccountSettingsView"), "AccountSettingsView"),
  },
  {
    id: "settings-notifications",
    slug: "account/notifications",
    path: "/partners/settings/account/notifications",
    title: "Notifications",
    description: "Control alerts across email, SMS, and push",
    icon: Bell,
    group: "Account",
    status: "live",
    menuHidden: true,
    quickActionId: "settings-notifications",
    menuMeta: "2 new",
    component: lazy(() => import("./general/sections/notifications/ui/AccountNotificationsView"), "AccountNotificationsView"),
  },
  {
    id: "settings-profile",
    slug: "profile",
    path: "/partners/settings/profile",
    title: "Profile",
    description: "Update avatar, handle, and partner bio",
    icon: UserRound,
    group: "Account",
    status: "live",
    quickActionId: "settings-profile",
    menuMeta: "Updated",
    component: lazy(() => import("./profile/ui/ProfileSettingsView"), "ProfileSettingsView"),
  },
  {
    id: "settings-devices",
    slug: "connected-devices",
    path: "/partners/settings/connected-devices",
    title: "Connected Devices",
    menuLabel: "Devices",
    description: "Review sessions and revoke access",
    icon: Link2,
    group: "Account",
    status: "live",
    quickActionId: "settings-devices",
    menuMeta: "5 linked",
    component: lazy(() => import("./devices/ui/ConnectedDevicesView"), "ConnectedDevicesView"),
  },
  {
    id: "settings-appearance",
    slug: "appearance",
    path: "/partners/settings/appearance",
    title: "Appearance",
    description: "Theme, typography, and density",
    icon: Palette,
    group: "Basics",
    status: "live",
    menuHidden: true,
  },
  {
    id: "settings-language",
    slug: "language",
    path: "/partners/settings/language",
    title: "Language & Region",
    menuLabel: "Language",
    description: "Language, timezone, and formats",
    icon: Languages,
    group: "Basics",
    status: "live",
    menuHidden: true,
  },
  {
    id: "settings-integrations",
    slug: "integrations",
    path: "/partners/settings/integrations",
    title: "Integrations",
    description: "Connect tools and services",
    icon: Plug,
    group: "Integrations",
    status: "live",
    component: lazy(() => import("./integrations/ui/IntegrationsSettingsScreen"), "IntegrationsSettingsScreen"),
  },
  {
    id: "settings-privacy",
    slug: "privacy",
    path: "/partners/settings/privacy",
    title: "Privacy",
    description: "Data controls and consent",
    icon: Shield,
    group: "Privacy",
    status: "live",
    component: lazy(() => import("./privacy/ui/PrivacySettingsScreen"), "PrivacySettingsScreen"),
  },
  {
    id: "settings-privacy-policy",
    slug: "privacy-policy",
    path: "/partners/privacy-policy",
    title: "Privacy Policy",
    description: "View our detailed privacy policy and data practices",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true, // Hide from settings menu, accessible directly
    component: lazy(() => import("./privacy/ui/PrivacyPolicyPage"), "PrivacyPolicyPage"),
  },
  {
    id: "settings-security",
    slug: "security",
    path: "/partners/settings/security",
    title: "Security",
    description: "2FA, backup codes, sessions",
    icon: Lock,
    group: "Privacy",
    status: "live",
    component: lazy(() => import("./security/ui/SecuritySettingsScreen"), "SecuritySettingsScreen"),
  },  {
    id: "settings-legal",
    slug: "legal",
    path: "/partners/settings/legal",
    title: "Legal",
    description: "Contracts, terms, and compliance",
    icon: FileText,
    group: "Privacy",
    status: "live",
    component: lazy(() => import("./legal/ui/LegalSettingsScreen"), "LegalSettingsScreen"),
  },
  {
    id: "settings-wallet",
    slug: "wallet",
    path: "/partners/settings/wallet",
    title: "Wallet",
    description: "Cash out, balances, and payout rails",
    icon: WalletIcon,
    group: "Account",
    status: "live",
    quickActionId: "wallet",
    menuHidden: true,
    component: lazy(() => import("../earnings/wallet/ui/WalletPanel"), "WalletPanel"),
  },
  {
    id: "settings-terms-of-service",
    slug: "legal/terms-of-service",
    path: "/partners/settings/legal/terms-of-service",
    title: "Terms of Service",
    description: "View our terms of service and platform usage rules",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true,
    component: lazy(() => import("./legal/ui/TermsOfServicePage"), "TermsOfServicePage"),
  },
  {
    id: "settings-partner-agreement",
    slug: "legal/partner-agreement",
    path: "/partners/settings/legal/partner-agreement",
    title: "Partner Agreement",
    description: "Partnership terms, commission structures, and obligations",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true,
    component: lazy(() => import("./legal/ui/PartnerAgreementPage"), "PartnerAgreementPage"),
  },
  {
    id: "settings-commission-terms",
    slug: "legal/commission-terms",
    path: "/partners/settings/legal/commission-terms",
    title: "Commission & Payment Terms",
    description: "Commission tiers, payment schedules, and tax responsibilities",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true,
    component: lazy(() => import("./legal/ui/CommissionTermsPage"), "CommissionTermsPage"),
  },
  {
    id: "settings-service-level-agreement",
    slug: "legal/service-level-agreement",
    path: "/partners/settings/legal/service-level-agreement",
    title: "Service Level Agreement",
    description: "Uptime guarantees, support levels, and response times",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true,
    component: lazy(() => import("./legal/ui/ServiceLevelAgreementPage"), "ServiceLevelAgreementPage"),
  },
  {
    id: "settings-cookie-tracking-policy",
    slug: "legal/cookie-tracking-policy",
    path: "/partners/settings/legal/cookie-tracking-policy",
    title: "Cookie & Tracking Policy",
    description: "Analytics tracking, marketing cookies, and preferences",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true,
    component: lazy(() => import("./legal/ui/CookieTrackingPolicyPage"), "CookieTrackingPolicyPage"),
  },
  {
    id: "settings-updates-changes-policy",
    slug: "legal/updates-changes-policy",
    path: "/partners/settings/legal/updates-changes-policy",
    title: "Updates & Changes Policy",
    description: "Version tracking, notifications, and re-acknowledgment requirements",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true,
    component: lazy(() => import("./legal/ui/UpdatesChangesPolicyPage"), "UpdatesChangesPolicyPage"),
  },
  {
    id: "settings-compliance-regulatory",
    slug: "legal/compliance-regulatory",
    path: "/partners/settings/legal/compliance-regulatory",
    title: "Compliance & Regulatory",
    description: "International requirements, AML/KYC, and industry rules",
    icon: FileText,
    group: "Privacy",
    status: "live",
    menuHidden: true,
    component: lazy(() => import("./legal/ui/ComplianceRegulatoryPage"), "ComplianceRegulatoryPage"),
  },

];

const slugMap = new Map<string, SettingsRouteDefinition>();
settingsRouteRegistry.forEach((route) => {
  slugMap.set(route.slug, route);
});

const normalizeSlug = (slug: string | string[] | undefined) => {
  if (!slug) return "";
  return Array.isArray(slug) ? slug.filter(Boolean).join("/") : slug;
};

export function getSettingsRouteBySlug(slug: string | string[] | undefined) {
  const key = normalizeSlug(slug);
  return slugMap.get(key);
}

export function getLiveSettingsRoutes() {
  return settingsRouteRegistry.filter((route) => route.status === "live");
}
