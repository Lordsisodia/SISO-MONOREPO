
import React from "react";
import {
  Dashboard,
  Task,
  Folder,
  Calendar as CalendarIcon,
  UserMultiple,
  Analytics,
  DocumentAdd,
  ChevronDown as ChevronDownIcon,
  AddLarge,
  Filter,
  Time,
  InProgress,
  CheckmarkOutline,
  Flag,
  Archive,
  View,
  Report,
  StarFilled,
  Group,
  ChartBar,
  FolderOpen,
  Share,
  CloudUpload,
  Security,
  Notification,
  Integration,
} from "@carbon/icons-react";
import {
  LayoutDashboard as LdIcon,
  Megaphone as MegaphoneIcon,
  Activity as ActivityIcon,
  Trophy as TrophyIcon,
  Images as ImagesIcon,
  GraduationCap as GradIcon,
  BarChart2 as BarChartIcon,
  CircleDollarSign as DollarIcon,
  Wallet as WalletIcon,
  Gauge as GaugeIcon,
  Award as AwardIcon,
  Target as TargetIcon,
  Briefcase as BriefcaseIcon,
  FolderOpen as LucideFolderOpen,
  FilePlus2 as FilePlusIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  KanbanSquare as KanbanIcon,
  BookOpen as BookOpenIcon,
  Bookmark as BookmarkIcon,
  MessageSquare as MessageIcon,
  HelpCircle as HelpIcon,
  Calendar as CalendarIcon2,
  CalendarClock as CalendarClockIcon,
  Video as VideoIcon,
  ClipboardList as ClipboardListIcon,
  ListChecks as ListChecksIcon,
  CheckSquare as CheckSquareIcon,
  Share2 as ShareIcon2,
  NotebookText as NotebookIcon,
  FileText as FileTextIcon,
  Palette as PaletteIcon,
  Languages as LanguagesIcon,
  Shield as ShieldIcon,
  Code as CodeIcon,
  User as UserIcon,
} from "lucide-react";
import { partnerNavConfig, type TopLevelIconSpec } from "@/config/partner-nav-config";
import type { MenuItem, MenuSection, SidebarContent } from "../types";
import { settingsRouteRegistry, type SettingsRouteGroup } from "@/domains/partnerships/portal-architecture/settings/settings-route-registry";

const settingsGroupOrder: SettingsRouteGroup[] = ["Basics", "Account", "Integrations", "Privacy", "Growth", "Support"];
const settingsGroupLabels: Record<SettingsRouteGroup, string> = {
  Basics: "Basics",
  Account: "Account",
  Integrations: "Integrations",
  Privacy: "Privacy & Legal",
  Growth: "Growth",
  Support: "Support",
};

function buildSettingsSidebarSections(): MenuSection[] {
  const grouped = new Map<SettingsRouteGroup, MenuSection>();

  settingsRouteRegistry.forEach((route) => {
    const key = route.group;
    if (!grouped.has(key)) {
      grouped.set(key, {
        title: settingsGroupLabels[key] ?? key,
        items: [],
      });
    }

    const section = grouped.get(key)!;
    const IconCmp = route.icon;
    section.items.push({
      label: route.title,
      href: route.path,
      description: route.description,
      icon: <IconCmp size={16} className="text-neutral-50" />,
      locked: route.status !== "live",
      tierRequired: route.tier,
    });
  });

  return Array.from(grouped.entries())
    .sort((a, b) => {
      const orderA = settingsGroupOrder.indexOf(a[0]);
      const orderB = settingsGroupOrder.indexOf(b[0]);
      const safeA = orderA === -1 ? Number.MAX_SAFE_INTEGER : orderA;
      const safeB = orderB === -1 ? Number.MAX_SAFE_INTEGER : orderB;
      return safeA - safeB;
    })
    .map(([, section]) => ({
      ...section,
      items: section.items.sort((a, b) => a.label.localeCompare(b.label)),
    }));
}


function buildSidebarFromConfig(topId: string): SidebarContent | null {
  const top: TopLevelIconSpec | undefined = partnerNavConfig.icons.find((i) => i.id === topId);
  if (!top) return null;
  const titleOverride: Record<string, string> = { pipeline: "Pipeline Ops", growth: "Earnings" };
  const dashboardCallouts: Record<string, { targetId: string; title: string; subtitle: string }> = {
    academy: { targetId: "training-hub", title: "Dashboard", subtitle: "Your quick launch into the Academy." },
    pipeline: { targetId: "dashboard", title: "Dashboard", subtitle: "Track deals, submissions, and reviews." },
    growth: { targetId: "dashboard", title: "Dashboard", subtitle: "See payouts, tiers, and recognition." },
    community: { targetId: "dashboard", title: "Dashboard", subtitle: "Jump into broadcasts and threads." },
    workspace: { targetId: "dashboard", title: "Dashboard", subtitle: "Calendar, tasks, and files at a glance." },
    tools: { targetId: "app-plan-generator", title: "Dashboard", subtitle: "Launch the toolkit in seconds." },
  };
  const displayTitle = titleOverride[top.id] ?? top.label;

  // Simple tier + badge demo hooks (replace with real stores later)
  const getCurrentTier = (): string => {
    if (typeof window !== 'undefined') {
      const val = window.localStorage.getItem('siso_user_tier');
      if (val) return val;
    }
    return 'starter';
  };
  const currentTier = getCurrentTier();
  const tierRank: Record<string, number> = { starter: 0, active: 1, performer: 2, elite: 3 };

  const getBadge = (sectionId: string, subId: string): number | 'dot' | undefined => {
    const key = `${sectionId}:${subId}`;
    const demo: Record<string, number | 'dot'> = {
      'pipeline:my-prospects': 3,
      'pipeline:active-deals': 1,
      'pipeline:recruitment': 'dot',
      'growth:earnings': 1,
      'growth:wallet': 'dot',
      'tasks:my-tasks': 2,
      'community:general-chat': 'dot',
    };
    return demo[key];
  };

  const seen = new Set<string>();
  const subIcon = (sectionId: string, subId?: string, label?: string): React.ReactNode => {
    const id = (subId || label || '').toLowerCase();
    switch (sectionId) {
      case 'home':
        if (id.includes('overview')) return <LdIcon size={16} className="text-neutral-50" />;
        if (id.includes('announce')) return <MegaphoneIcon size={16} className="text-neutral-50" />;
        if (id.includes('recent')) return <ActivityIcon size={16} className="text-neutral-50" />;
        if (id.includes('wins')) return <TrophyIcon size={16} className="text-neutral-50" />;
        if (id.includes('portfolio')) return <ImagesIcon size={16} className="text-neutral-50" />;
        if (id.includes('training')) return <GradIcon size={16} className="text-neutral-50" />;
        if (id.includes('leaderboard')) return <TrophyIcon size={16} className="text-neutral-50" />;
        return <FileTextIcon size={16} className="text-neutral-50" />;
      case 'pipeline':
        if (id.includes('prospect')) return <KanbanIcon size={16} className="text-neutral-50" />;
        if (id.includes('active-deals') || id.includes('active')) return <BriefcaseIcon size={16} className="text-neutral-50" />;
        if (id.includes('submit')) return <FilePlusIcon size={16} className="text-neutral-50" />;
        if (id.includes('recruit')) return <UserPlusIcon size={16} className="text-neutral-50" />;
        if (id.includes('team')) return <UsersIcon size={16} className="text-neutral-50" />;
        return <BriefcaseIcon size={16} className="text-neutral-50" />;
      case 'academy':
        if (id.includes('getting')) return <GradIcon size={16} className="text-neutral-50" />;
        if (id.includes('courses')) return <BookOpenIcon size={16} className="text-neutral-50" />;
        if (id.includes('portfolio')) return <LucideFolderOpen size={16} className="text-neutral-50" />;
        if (id.includes('pitch')) return <MegaphoneIcon size={16} className="text-neutral-50" />;
        if (id.includes('saved')) return <BookmarkIcon size={16} className="text-neutral-50" />;
        return <BookOpenIcon size={16} className="text-neutral-50" />;
      case 'growth':
        if (id === 'earnings' || id.includes('earn')) return <DollarIcon size={16} className="text-neutral-50" />;
        if (id === 'wallet' || id.includes('wallet')) return <WalletIcon size={16} className="text-neutral-50" />;
        if (id.includes('tier')) return <GaugeIcon size={16} className="text-neutral-50" />;
        if (id.includes('leader')) return <TrophyIcon size={16} className="text-neutral-50" />;
        if (id.includes('achieve')) return <AwardIcon size={16} className="text-neutral-50" />;
        if (id.includes('challenge')) return <TargetIcon size={16} className="text-neutral-50" />;
        return <BarChartIcon size={16} className="text-neutral-50" />;
      case 'calendar':
        if (id.includes('office')) return <CalendarClockIcon size={16} className="text-neutral-50" />;
        if (id.includes('webinars') || id.includes('webinar')) return <VideoIcon size={16} className="text-neutral-50" />;
        if (id.includes('events')) return <CalendarIcon2 size={16} className="text-neutral-50" />;
        return <CalendarIcon2 size={16} className="text-neutral-50" />;
      case 'tasks':
        if (id.includes('onboarding')) return <ListChecksIcon size={16} className="text-neutral-50" />;
        if (id.includes('my-tasks')) return <CheckSquareIcon size={16} className="text-neutral-50" />;
        if (id.includes('assigned')) return <ClipboardListIcon size={16} className="text-neutral-50" />;
        return <ListChecksIcon size={16} className="text-neutral-50" />;
      case 'community':
        if (id.includes('general')) return <MessageIcon size={16} className="text-neutral-50" />;
        if (id.includes('wins')) return <TrophyIcon size={16} className="text-neutral-50" />;
        if (id.includes('questions')) return <HelpIcon size={16} className="text-neutral-50" />;
        if (id.includes('feedback')) return <MegaphoneIcon size={16} className="text-neutral-50" />;
        if (id.includes('directory')) return <UsersIcon size={16} className="text-neutral-50" />;
        return <MessageIcon size={16} className="text-neutral-50" />;
      case 'notes':
        if (id.includes('my-notes')) return <FileTextIcon size={16} className="text-neutral-50" />;
        if (id.includes('shared')) return <ShareIcon2 size={16} className="text-neutral-50" />;
        if (id.includes('client')) return <NotebookIcon size={16} className="text-neutral-50" />;
        return <FileTextIcon size={16} className="text-neutral-50" />;
      default:
        return <FileTextIcon size={16} className="text-neutral-50" />;
    }
  };

  const filteredSubs = top.subsections.filter((sub) => {
    const key = sub.id || sub.label;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const mappedItems = filteredSubs.map((sub) => {
      const hasDropdown = Boolean(sub.dropdown && sub.dropdown.items?.length);
      const childSeen = new Set<string>();
      const children: MenuItem[] | undefined = hasDropdown
        ? sub.dropdown!.items
            .filter((dd) => {
              const k = dd.id || dd.label;
              if (childSeen.has(k)) return false;
              childSeen.add(k);
              return true;
            })
          .map((dd) => ({ label: dd.label, id: dd.id, href: dd.path, description: dd.description }) as MenuItem)
        : undefined;

      const requiredTier = sub.tierRequired as string | undefined;
      const locked = requiredTier ? (tierRank[currentTier] ?? 0) < (tierRank[requiredTier] ?? 0) : false;
      const badge = getBadge(top.id, sub.id);

      return {
        icon: subIcon(top.id, sub.id, sub.label),
        label: sub.label,
        hasDropdown,
        href: sub.path,
        children,
        id: sub.id,
        tierRequired: sub.tierRequired,
        description: sub.description,
        badge,
        locked,
        group: sub.group,
      } as MenuItem;
    });

  const calloutPreset = dashboardCallouts[top.id];
  let calloutItem: MenuItem | undefined;
  let items: MenuItem[] = mappedItems;
  if (calloutPreset && mappedItems.length > 0) {
    const normalizedTarget = calloutPreset.targetId.toLowerCase();
    let targetIndex = mappedItems.findIndex((item) => ((item.id || item.label || "").toLowerCase()) === normalizedTarget);
    if (targetIndex === -1 && calloutPreset.targetId === "__first__" && mappedItems.length > 0) {
      targetIndex = 0;
    }
    if (targetIndex >= 0) {
      calloutItem = mappedItems[targetIndex];
      items = mappedItems.filter((_, index) => index !== targetIndex);
    }
  }

  const composeSections = (sections: MenuSection[]): SidebarContent => {
    const filtered = sections.filter((section) => section.items.length > 0 || section.isCallout);
    if (calloutItem && calloutPreset) {
      return {
        title: displayTitle,
        sections: [
          {
            title: calloutPreset.title,
            subtitle: calloutPreset.subtitle,
            items: [calloutItem],
            hideTitle: false,
            isCallout: true,
          },
          ...filtered,
        ],
      };
    }
    return { title: displayTitle, sections: filtered };
  };

  const groupedSections: MenuSection[] | null = (() => {
    const groupMap = new Map<string, MenuItem[]>();
    const ungrouped: MenuItem[] = [];

    items.forEach((item) => {
      const key = item.group?.trim();
      if (key) {
        if (!groupMap.has(key)) groupMap.set(key, []);
        groupMap.get(key)!.push(item);
      } else {
        ungrouped.push(item);
      }
    });

    if (groupMap.size === 0) return null;

    const sections: MenuSection[] = [];
    for (const [title, groupedItems] of groupMap.entries()) {
      sections.push({ title, items: groupedItems });
    }

    if (ungrouped.length) {
      sections.unshift({ title: displayTitle, items: ungrouped });
    }

    return sections;
  })();

  // Custom grouping for Community to mirror Academy-style layout
  if (top.id === 'community') {
    const conversations: MenuItem[] = [];
    const channels: MenuItem[] = [];
    const people: MenuItem[] = [];

    items.forEach((it) => {
      const id = (it.id || it.label).toLowerCase();
      if (id.includes('messages')) {
        conversations.push(it);
      } else if (id.includes('general') || id.includes('wins') || id.includes('questions') || id.includes('announcements') || id.startsWith('#')) {
        channels.push(it);
      } else if (id.includes('directory') || id.includes('partners') || id.includes('help')) {
        people.push(it);
      } else {
        channels.push(it);
      }
    });

    const sections: MenuSection[] = [];
    // Order: Channels first (most unique to Community), then Conversations, then People & Help
    if (channels.length) sections.push({ title: 'Channels', items: channels });
    if (conversations.length) sections.push({ title: 'Conversations', items: conversations });
    if (people.length) sections.push({ title: 'People & Help', items: people });
    return composeSections(sections) as any;
  }

  // Custom grouping for Earnings: Money In → Tier → Recognition
  if (top.id === 'growth') {
    const moneyIn: MenuItem[] = [];
    const tier: MenuItem[] = [];
    const recognition: MenuItem[] = [];

    items.forEach((it) => {
      const id = (it.id || it.label).toLowerCase();
      if (id.includes('earnings') || id.includes('wallet')) {
        moneyIn.push(it);
      } else if (id.includes('tier')) {
        tier.push(it);
      } else if (id.includes('leaderboard') || id.includes('achievement') || id.includes('challenge')) {
        recognition.push(it);
      } else {
        moneyIn.push(it);
      }
    });

    const sections: MenuSection[] = [];
    if (moneyIn.length) sections.push({ title: 'Money In', items: moneyIn });
    if (tier.length) sections.push({ title: 'Tier Progress', items: tier });
    if (recognition.length) sections.push({ title: 'Recognition', items: recognition });
    return composeSections(sections) as any;
  }

  if (top.id === "settings") {
    return composeSections(buildSettingsSidebarSections());
  }

  if (top.id === "academy") {
    const learningSections = groupedSections ?? [{ title: "Learning Flow", items }];
    return composeSections(learningSections);
  }

  if (groupedSections) {
    if (top.id === "home") {
      const sectionOrder = ["Pulse", "Act Now", "Support & Growth"];
      groupedSections.sort((a, b) => {
        const ai = sectionOrder.indexOf(a.title);
        const bi = sectionOrder.indexOf(b.title);
        const safeA = ai === -1 ? Number.MAX_SAFE_INTEGER : ai;
        const safeB = bi === -1 ? Number.MAX_SAFE_INTEGER : bi;
        return safeA - safeB;
      });
    }
    return composeSections(groupedSections);
  }

  const sections: MenuSection[] = items.length
    ? [
        {
          title: displayTitle,
          items,
        },
      ]
    : [];

  return composeSections(sections);
}

export function getSidebarContent(activeSection: string): SidebarContent {
  const contentMap: Record<string, SidebarContent> = {
    dashboard: {
      title: "Dashboard",
      sections: [
        {
          title: "Dashboard Types",
          items: [
            { icon: <View size={16} className="text-neutral-50" />, label: "Overview", isActive: true },
            {
              icon: <Dashboard size={16} className="text-neutral-50" />,
              label: "Executive Summary",
              hasDropdown: true,
              children: [
                { label: "Revenue Overview" },
                { label: "Key Performance Indicators" },
                { label: "Strategic Goals Progress" },
                { label: "Department Highlights" },
              ],
            },
            {
              icon: <ChartBar size={16} className="text-neutral-50" />,
              label: "Operations Dashboard",
              hasDropdown: true,
              children: [
                { label: "Project Timeline" },
                { label: "Resource Allocation" },
                { label: "Team Performance" },
                { label: "Capacity Planning" },
              ],
            },
            {
              icon: <Analytics size={16} className="text-neutral-50" />,
              label: "Financial Dashboard",
              hasDropdown: true,
              children: [
                { label: "Budget vs Actual" },
                { label: "Cash Flow Analysis" },
                { label: "Expense Breakdown" },
                { label: "Profit & Loss Summary" },
              ],
            },
          ],
        },
        {
          title: "Report Summaries",
          items: [
            {
              icon: <Report size={16} className="text-neutral-50" />,
              label: "Weekly Reports",
              hasDropdown: true,
              children: [
                { label: "Team Productivity: 87% ↑" },
                { label: "Project Completion: 12/15" },
                { label: "Budget Utilization: 73%" },
                { label: "Client Satisfaction: 4.6/5" },
              ],
            },
            {
              icon: <StarFilled size={16} className="text-neutral-50" />,
              label: "Monthly Insights",
              hasDropdown: true,
              children: [
                { label: "Revenue Growth: +15.3%" },
                { label: "New Clients: 24" },
                { label: "Team Expansion: 8 hires" },
                { label: "Cost Reduction: 7.2%" },
              ],
            },
            {
              icon: <View size={16} className="text-neutral-50" />,
              label: "Quarterly Analysis",
              hasDropdown: true,
              children: [
                { label: "Market Position: Improved" },
                { label: "ROI: 23.4%" },
                { label: "Customer Retention: 92%" },
                { label: "Innovation Index: 8.7/10" },
              ],
            },
          ],
        },
        {
          title: "Business Intelligence",
          items: [
            {
              icon: <ChartBar size={16} className="text-neutral-50" />,
              label: "Performance Metrics",
              hasDropdown: true,
              children: [
                { label: "Sales Conversion: 34.2%" },
                { label: "Lead Response Time: 2.3h" },
                { label: "Customer Lifetime Value: $4,280" },
                { label: "Churn Rate: 3.1%" },
              ],
            },
            {
              icon: <Analytics size={16} className="text-neutral-50" />,
              label: "Predictive Analytics",
              hasDropdown: true,
              children: [
                { label: "Q4 Revenue Forecast: $2.4M" },
                { label: "Resource Demand: High" },
                { label: "Market Trends: Positive" },
                { label: "Risk Assessment: Low" },
              ],
            },
          ],
        },
      ],
    },

    tasks: {
      title: "Tasks",
      sections: [
        {
          title: "Quick Actions",
          items: [
            { icon: <AddLarge size={16} className="text-neutral-50" />, label: "New task" },
            { icon: <Filter size={16} className="text-neutral-50" />, label: "Filter tasks" },
          ],
        },
        {
          title: "My Tasks",
          items: [
            {
              icon: <Time size={16} className="text-neutral-50" />,
              label: "Due today",
              hasDropdown: true,
              children: [
                { icon: <Flag size={14} className="text-neutral-300" />, label: "Review design mockups" },
                { icon: <CheckmarkOutline size={14} className="text-neutral-300" />, label: "Update documentation" },
                { icon: <InProgress size={14} className="text-neutral-300" />, label: "Test new feature" },
              ],
            },
            {
              icon: <InProgress size={16} className="text-neutral-50" />,
              label: "In progress",
              hasDropdown: true,
              children: [
                { icon: <Task size={14} className="text-neutral-300" />, label: "Implement user auth" },
                { icon: <Task size={14} className="text-neutral-300" />, label: "Database migration" },
              ],
            },
            {
              icon: <CheckmarkOutline size={16} className="text-neutral-50" />,
              label: "Completed",
              hasDropdown: true,
              children: [
                { icon: <CheckmarkOutline size={14} className="text-neutral-300" />, label: "Fixed login bug" },
                { icon: <CheckmarkOutline size={14} className="text-neutral-300" />, label: "Updated dependencies" },
                { icon: <CheckmarkOutline size={14} className="text-neutral-300" />, label: "Code review completed" },
              ],
            },
          ],
        },
        {
          title: "Other",
          items: [
            {
              icon: <Flag size={16} className="text-neutral-50" />,
              label: "Priority tasks",
              hasDropdown: true,
              children: [
                { icon: <Flag size={14} className="text-red-400" />, label: "Security update" },
                { icon: <Flag size={14} className="text-orange-400" />, label: "Client presentation" },
              ],
            },
            { icon: <Archive size={16} className="text-neutral-50" />, label: "Archived" },
          ],
        },
      ],
    },

    projects: {
      title: "Projects",
      sections: [
        {
          title: "Quick Actions",
          items: [
            { icon: <AddLarge size={16} className="text-neutral-50" />, label: "New project" },
            { icon: <Filter size={16} className="text-neutral-50" />, label: "Filter projects" },
          ],
        },
        {
          title: "Active Projects",
          items: [
            {
              icon: <FolderOpen size={16} className="text-neutral-50" />,
              label: "Web Application",
              hasDropdown: true,
              children: [
                { icon: <Task size={14} className="text-neutral-300" />, label: "Frontend development" },
                { icon: <Task size={14} className="text-neutral-300" />, label: "API integration" },
                { icon: <Task size={14} className="text-neutral-300" />, label: "Testing & QA" },
              ],
            },
            {
              icon: <FolderOpen size={16} className="text-neutral-50" />,
              label: "Mobile App",
              hasDropdown: true,
              children: [
                { icon: <Task size={14} className="text-neutral-300" />, label: "UI/UX design" },
                { icon: <Task size={14} className="text-neutral-300" />, label: "Native development" },
              ],
            },
          ],
        },
        {
          title: "Other",
          items: [
            { icon: <CheckmarkOutline size={16} className="text-neutral-50" />, label: "Completed" },
            { icon: <Archive size={16} className="text-neutral-50" />, label: "Archived" },
          ],
        },
      ],
    },

    calendar: {
      title: "Calendar",
      sections: [
        {
          title: "Views",
          items: [
            { icon: <View size={16} className="text-neutral-50" />, label: "Month view" },
            { icon: <CalendarIcon size={16} className="text-neutral-50" />, label: "Week view" },
            { icon: <Time size={16} className="text-neutral-50" />, label: "Day view" },
          ],
        },
        {
          title: "Events",
          items: [
            {
              icon: <Time size={16} className="text-neutral-50" />,
              label: "Today's events",
              hasDropdown: true,
              children: [
                { icon: <UserMultiple size={14} className="text-neutral-300" />, label: "Team standup (9:00 AM)" },
                { icon: <UserIcon size={14} className="text-neutral-300" />, label: "Client call (2:00 PM)" },
                { icon: <UserMultiple size={14} className="text-neutral-300" />, label: "Project review (4:00 PM)" },
              ],
            },
            { icon: <CalendarIcon size={16} className="text-neutral-50" />, label: "Upcoming events" },
          ],
        },
        {
          title: "Quick Actions",
          items: [
            { icon: <AddLarge size={16} className="text-neutral-50" />, label: "New event" },
            { icon: <Share size={16} className="text-neutral-50" />, label: "Share calendar" },
          ],
        },
      ],
    },

    teams: {
      title: "Teams",
      sections: [
        {
          title: "My Teams",
          items: [
            {
              icon: <Group size={16} className="text-neutral-50" />,
              label: "Development Team",
              hasDropdown: true,
              children: [
                { icon: <UserIcon size={14} className="text-neutral-300" />, label: "John Doe (Lead)" },
                { icon: <UserIcon size={14} className="text-neutral-300" />, label: "Jane Smith" },
                { icon: <UserIcon size={14} className="text-neutral-300" />, label: "Mike Johnson" },
              ],
            },
            {
              icon: <Group size={16} className="text-neutral-50" />,
              label: "Design Team",
              hasDropdown: true,
              children: [
                { icon: <UserIcon size={14} className="text-neutral-300" />, label: "Sarah Wilson" },
                { icon: <UserIcon size={14} className="text-neutral-300" />, label: "Tom Brown" },
              ],
            },
          ],
        },
        {
          title: "Quick Actions",
          items: [
            { icon: <AddLarge size={16} className="text-neutral-50" />, label: "Invite member" },
            { icon: <UserMultiple size={16} className="text-neutral-50" />, label: "Manage teams" },
          ],
        },
      ],
    },

    analytics: {
      title: "Analytics",
      sections: [
        {
          title: "Reports",
          items: [
            { icon: <Report size={16} className="text-neutral-50" />, label: "Performance report" },
            { icon: <ChartBar size={16} className="text-neutral-50" />, label: "Task completion" },
            { icon: <Analytics size={16} className="text-neutral-50" />, label: "Team productivity" },
          ],
        },
        {
          title: "Insights",
          items: [
            {
              icon: <StarFilled size={16} className="text-neutral-50" />,
              label: "Key metrics",
              hasDropdown: true,
              children: [
                { icon: <CheckmarkOutline size={14} className="text-neutral-300" />, label: "Tasks completed: 24" },
                { icon: <Time size={14} className="text-neutral-300" />, label: "Avg. completion time: 2.5d" },
                { icon: <UserMultiple size={14} className="text-neutral-300" />, label: "Team efficiency: 87%" },
              ],
            },
          ],
        },
      ],
    },

    files: {
      title: "Files",
      sections: [
        {
          title: "Quick Actions",
          items: [
            { icon: <CloudUpload size={16} className="text-neutral-50" />, label: "Upload file" },
            { icon: <AddLarge size={16} className="text-neutral-50" />, label: "New folder" },
          ],
        },
        {
          title: "Recent Files",
          items: [
            {
              icon: <DocumentAdd size={16} className="text-neutral-50" />,
              label: "Recent documents",
              hasDropdown: true,
              children: [
                { icon: <DocumentAdd size={14} className="text-neutral-300" />, label: "Project proposal.pdf" },
                { icon: <DocumentAdd size={14} className="text-neutral-300" />, label: "Meeting notes.docx" },
                { icon: <DocumentAdd size={14} className="text-neutral-300" />, label: "Design specs.figma" },
              ],
            },
            { icon: <Share size={16} className="text-neutral-50" />, label: "Shared with me" },
          ],
        },
        {
          title: "Organization",
          items: [
            { icon: <Folder size={16} className="text-neutral-50" />, label: "All folders" },
            { icon: <Archive size={16} className="text-neutral-50" />, label: "Archived files" },
          ],
        },
      ],
    },
  };
  // Config-driven override: if activeSection matches a config top-level id, build from config
  if (partnerNavConfig.icons.some((i) => i.id === activeSection)) {
    const configDriven = buildSidebarFromConfig(activeSection);
    if (configDriven) {
      return configDriven;
    }
  }
  return contentMap[activeSection] ?? contentMap.home;
}
