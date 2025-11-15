export interface Device {
  id: string;
  name: string;
  type: "mobile" | "desktop" | "tablet";
  browser: string;
  os: string;
  lastActive: Date;
  current: boolean;
}
