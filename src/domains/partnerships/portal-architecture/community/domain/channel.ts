import { ReactNode, ComponentType } from "react";

export type ChannelKind = "chat" | "panel" | "hybrid";

export interface ChannelBadge {
  text: string;
  tone?: "positive" | "warning" | "neutral";
}

export interface ChannelDefinition {
  id: string;
  slug: string;
  label: string;
  description?: string;
  category: string;
  kind: ChannelKind;
  icon?: ReactNode;
  badge?: ChannelBadge;
  component: ComponentType;
  mobileSlot?: "default" | "primary" | "secondary";
  permissions?: {
    minimumTier?: string;
    roles?: string[];
  };
}

export interface ChannelCategory {
  id: string;
  label: string;
  channels: ChannelDefinition[];
}
