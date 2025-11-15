export interface TierProgress {
  tier: string;
  progress: number;
  perks: string[];
}

export const mockTierProgress: TierProgress = {
  tier: "Bronze",
  progress: 0.45,
  perks: ["Access to Campus", "Commission 20%"],
};
