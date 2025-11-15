export interface NotificationSettings {
  push: PushSettings;
  email: EmailSettings;
  inApp: InAppSettings;
}

export interface PushSettings {
  enabled: boolean;
  deals: boolean;
  messages: boolean;
  updates: boolean;
  tasks: boolean;
}

export interface EmailSettings {
  enabled: boolean;
  frequency: "immediate" | "daily" | "weekly";
  deals: boolean;
  messages: boolean;
  updates: boolean;
}

export interface InAppSettings {
  enabled: boolean;
  sound: boolean;
  badge: boolean;
}
