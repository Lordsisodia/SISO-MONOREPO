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
            case 'Starter':
                rate = rates.Starter;
                break;
            case 'Active':
                rate = rates.Active;
                break;
            case 'Performer':
                rate = rates.Performer;
                break;
            case 'Elite':
                rate = rates.Elite;
                break;
            default:
                rate = rates.Starter; // Fallback
        }

        return deal.value * rate;
    }

    /**
     * Calculates the potential commission for a deal if the partner were at a higher tier.
     * Useful for "You could have earned $X more!" messages.
     */
    static calculatePotentialUpside(deal: Deal, currentTier: PartnerTier): number {
        if (!deal.value || deal.value <= 0) return 0;
        if (currentTier === 'Elite') return 0; // Already at max

        const currentCommission = this.calculateCommission(deal, currentTier);

        // Compare with next tier
        let nextTier: PartnerTier = 'Starter';
        if (currentTier === 'Starter') nextTier = 'Active';
        else if (currentTier === 'Active') nextTier = 'Performer';
        else if (currentTier === 'Performer') nextTier = 'Elite';

        const nextTierCommission = this.calculateCommission(deal, nextTier);

        return nextTierCommission - currentCommission;
    }
}
