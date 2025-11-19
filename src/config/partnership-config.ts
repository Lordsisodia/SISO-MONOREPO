import { PartnerTier } from '../types/pipeline-types';

export const PARTNERSHIP_CONFIG = {
    TierThresholds: {
        Trailblazer: { dealsRequired: 0, revenueRequired: 0 },
        Builder: { dealsRequired: 1, revenueRequired: 1000 },
        Vanguard: { dealsRequired: 3, revenueRequired: 3000 },
        Apex: { dealsRequired: 10, revenueRequired: 10000 },
        Sovereign: { dealsRequired: 25, revenueRequired: 25000 },
    },
    CommissionRates: {
        Trailblazer: 0.10,
        Builder: 0.12,
        Vanguard: 0.15,
        Apex: 0.20,
        Sovereign: 0.25,
    },
    SLAConfig: {
        Trailblazer: { responseTimeHours: 48 },
        Builder: { responseTimeHours: 36 },
        Vanguard: { responseTimeHours: 24 },
        Apex: { responseTimeHours: 12 },
        Sovereign: { responseTimeHours: 4 },
    },
    ScoringWeights: {
        revenue: 0.5,
        industryMatch: 0.3,
        completeness: 0.2,
    },
};
