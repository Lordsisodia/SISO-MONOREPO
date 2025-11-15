export type CertificationStatus = "earned" | "in-progress" | "locked";

export interface CertificationBadge {
  id: string;
  title: string;
  status: CertificationStatus;
}

export const certificationBadges: CertificationBadge[] = [
  { id: "cert-1", title: "Partner Foundations", status: "earned" },
  { id: "cert-2", title: "Sales Practitioner", status: "in-progress" },
  { id: "cert-3", title: "Operations Specialist", status: "locked" },
];
