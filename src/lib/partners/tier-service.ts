import { PartnerProfile, PartnerTier } from '../../types/pipeline-types';
import { TierProgress } from '../../types/gamification-types';
import { PARTNERSHIP_CONFIG } from '../../config/partnership-config';

export class TierService {
    /**
     * Calculates the partner's current tier based on their metrics.
     * Logic: A partner must meet BOTH the deals and revenue requirements for a tier to be in it.
     * We check from highest tier to lowest.
     */
    static calculateTier(metrics: { dealsClosed: number; revenueGenerated: number }): PartnerTier {
        const { dealsClosed, revenueGenerated } = metrics;
        const thresholds = PARTNERSHIP_CONFIG.TierThresholds;

        if (
            dealsClosed >= thresholds.Sovereign.dealsRequired &&
            revenueGenerated >= thresholds.Sovereign.revenueRequired
        ) {
            return 'Sovereign';
        }

        if (
            dealsClosed >= thresholds.Apex.dealsRequired &&
            revenueGenerated >= thresholds.Apex.revenueRequired
        ) {
            return 'Apex';
        }

        if (
            dealsClosed >= thresholds.Vanguard.dealsRequired &&
            revenueGenerated >= thresholds.Vanguard.revenueRequired
        ) {
            return 'Vanguard';
        }

        if (
            dealsClosed >= thresholds.Builder.dealsRequired &&
            revenueGenerated >= thresholds.Builder.revenueRequired
        ) {
            return 'Builder';
        }

        return 'Trailblazer';
    }

    /**
     * Calculates the progress towards the NEXT tier.
     * If already at Sovereign, returns null for nextTier.
     */
    static getProgress(metrics: { dealsClosed: number; revenueGenerated: number }): TierProgress {
        const currentTier = this.calculateTier(metrics);
        const thresholds = PARTNERSHIP_CONFIG.TierThresholds;

        let nextTier: PartnerTier | null = null;
        let requirements = { dealsRequired: 0, revenueRequired: 0 };

        switch (currentTier) {
            case 'Trailblazer':
                nextTier = 'Builder';
                requirements = thresholds.Builder;
                break;
            case 'Builder':
                nextTier = 'Vanguard';
                requirements = thresholds.Vanguard;
                break;
            case 'Vanguard':
                nextTier = 'Apex';
                requirements = thresholds.Apex;
                break;
            case 'Apex':
                nextTier = 'Sovereign';
                requirements = thresholds.Sovereign;
                break;
            case 'Sovereign':
                nextTier = null;
                break;
        }

        if (!nextTier) {
            return {
                currentTier,
                nextTier: null,
                metrics,
                requirements: { dealsRequired: 0, revenueRequired: 0 },
                progressPercentage: 100,
            };
        }

        // Calculate progress percentage
        const dealsProgress = Math.min(metrics.dealsClosed / requirements.dealsRequired, 1);
        const revenueProgress = Math.min(metrics.revenueGenerated / requirements.revenueRequired, 1);

        const progressPercentage = Math.floor(Math.min(dealsProgress, revenueProgress) * 100);

        return {
            currentTier,
            nextTier,
            metrics,
            requirements,
            progressPercentage,
        };
    }

    /**
     * Returns the benefits list for a given tier.
     */
    static getBenefits(tier: PartnerTier): string[] {
        switch (tier) {
            case 'Trailblazer':
                return ['Standard Commission', 'Access to Academy', 'Community Access'];
            case 'Builder':
                return ['Higher Commission', 'Industry Decks', 'Priority Support'];
            case 'Vanguard':
                return ['Team Overrides', 'Dedicated Account Manager', 'Coaching'];
            case 'Apex':
                return ['Top Tier Commission', 'Strategic Council', 'White Labeling'];
            case 'Sovereign':
                return ['Maximum Commission', 'Equity Opportunities', 'Global Summit Invite'];
            default:
                return [];
        }
    }
}
