import { Deal, PartnerTier } from '../../types/pipeline-types';
import { PARTNERSHIP_CONFIG } from '../../config/partnership-config';

export class CommissionService {
    /**
     * Calculates the commission amount for a given deal and partner tier.
     * Formula: Deal Value * Tier Commission Rate
     */
    static calculateCommission(deal: Deal, partnerTier: PartnerTier): number {
        // Ensure deal value is valid
        if (!deal.value || deal.value <= 0) {
            return 0;
        }

        const rates = PARTNERSHIP_CONFIG.CommissionRates;
        let rate = 0;

        switch (partnerTier) {
            case 'Trailblazer':
                rate = rates.Trailblazer;
                break;
            case 'Builder':
                rate = rates.Builder;
                break;
            case 'Vanguard':
                rate = rates.Vanguard;
                break;
            case 'Apex':
                rate = rates.Apex;
                break;
            case 'Sovereign':
                rate = rates.Sovereign;
                break;
            default:
                rate = rates.Trailblazer; // Fallback
        }

        return deal.value * rate;
    }

    /**
     * Calculates the potential commission for a deal if the partner were at a higher tier.
     * Useful for "You could have earned $X more!" messages.
     */
    static calculatePotentialUpside(deal: Deal, currentTier: PartnerTier): number {
        if (!deal.value || deal.value <= 0) return 0;
        if (currentTier === 'Sovereign') return 0; // Already at max

        const currentCommission = this.calculateCommission(deal, currentTier);

        // Compare with next tier
        let nextTier: PartnerTier = 'Trailblazer';
        if (currentTier === 'Trailblazer') nextTier = 'Builder';
        else if (currentTier === 'Builder') nextTier = 'Vanguard';
        else if (currentTier === 'Vanguard') nextTier = 'Apex';
        else if (currentTier === 'Apex') nextTier = 'Sovereign';

        const nextTierCommission = this.calculateCommission(deal, nextTier);

        return nextTierCommission - currentCommission;
    }
}
