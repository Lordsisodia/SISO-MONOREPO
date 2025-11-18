/**
 * Portfolio Domain - Media Types
 */

export interface Screenshots {
  desktop: string[]; // Paths to desktop screenshots
  mobile: string[]; // Paths to mobile screenshots
  features: string[]; // Paths to feature screenshots
}

export interface ProjectMedia {
  logo?: string; // Path to client logo
  screenshots: Screenshots;
  videos?: string[]; // Paths to videos
}
