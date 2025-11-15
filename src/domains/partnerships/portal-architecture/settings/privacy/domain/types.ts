export interface PrivacySettings {
  profileVisibility: "public" | "partners-only" | "private";
  showEmail: boolean;
  showPhone: boolean;
  dataProcessingConsent: boolean;
  marketingConsent: boolean;
}
