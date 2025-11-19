import { PartnerProfile } from '../../types/pipeline-types';
import { Badge, PartnerEvent, Challenge, ChallengeType } from '../../types/gamification-types';

// Hardcoded badges for now - in a real app, these would come from a DB or config
const BADGES: Badge[] = [
    {
        id: 'first_sale',
        name: 'First Sale',
        description: 'Closed your first deal!',
        icon: 'trophy',
        type: 'MILESTONE',
        criteria: { metric: 'DEALS_CLOSED', threshold: 1 },
    },
    {
        id: 'high_roller',
        name: 'High Roller',
        description: 'Generated over $50k in revenue',
        icon: 'dollar-sign',
        type: 'PERFORMANCE',
        criteria: { metric: 'REVENUE_GENERATED', threshold: 50000 },
    },
    {
        id: 'referral_master',
        name: 'Referral Master',
        description: 'Referred 5 partners',
        icon: 'users',
        type: 'SPECIAL',
        criteria: { metric: 'REFERRALS', threshold: 5 },
    },
];

export class GamificationEngine {
    /**
     * Checks if any new badges are unlocked based on the partner's profile and the recent event.
     * Returns a list of NEWLY unlocked badges.
     */
    static checkAchievements(
        profile: PartnerProfile,
        currentBadges: string[], // IDs of badges already owned
        event: PartnerEvent
    ): Badge[] {
        const newBadges: Badge[] = [];

        // We only care about events that change metrics
        if (!['DEAL_CLOSED', 'REVENUE_EARNED', 'REFERRAL_SUCCESS'].includes(event.type)) {
            return [];
        }

        for (const badge of BADGES) {
            // Skip if already owned
            if (currentBadges.includes(badge.id)) continue;

            let isUnlocked = false;

            switch (badge.criteria.metric) {
                case 'DEALS_CLOSED':
                    // Assuming profile metrics are already updated with the event data
                    if (profile.metrics.dealsClosed >= badge.criteria.threshold) {
                        isUnlocked = true;
                    }
                    break;
                case 'REVENUE_GENERATED':
                    if (profile.metrics.revenueGenerated >= badge.criteria.threshold) {
                        isUnlocked = true;
                    }
                    break;
                case 'REFERRALS':
                    // Assuming we add referrals to PartnerProfile metrics later, for now ignore
                    break;
            }

            if (isUnlocked) {
                newBadges.push(badge);
            }
        }

        return newBadges;
    }

    /**
     * Updates challenge progress based on an event.
     * Returns the updated progress and whether it was completed.
     */
    static checkChallengeProgress(
        challenge: Challenge,
        currentProgress: number,
        event: PartnerEvent
    ): { newProgress: number; completed: boolean } {
        let increment = 0;

        // Only process relevant events
        if (challenge.target.metric === 'DEALS_CLOSED' && event.type === 'DEAL_CLOSED') {
            increment = 1;
        } else if (
            challenge.target.metric === 'REVENUE_GENERATED' &&
            event.type === 'REVENUE_EARNED'
        ) {
            increment = event.payload.amount || 0;
        }

        if (increment === 0) {
            return { newProgress: currentProgress, completed: false };
        }

        const newProgress = currentProgress + increment;
        const completed = newProgress >= challenge.target.value;

        return { newProgress, completed };
    }
}
