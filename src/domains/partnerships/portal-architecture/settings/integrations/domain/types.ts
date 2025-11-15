export interface Integration {
  id: string;
  name: string;
  type: "notion" | "google-drive" | "google-calendar" | "slack";
  connected: boolean;
  connectedAt?: Date;
  permissions: string[];
}
