export interface SecuritySettings {
  twoFactorEnabled: boolean;
  activeSessions: Session[];
  loginAlerts: boolean;
}

export interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: Date;
  current: boolean;
}
