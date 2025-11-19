import { PartnerTier } from './pipeline-types';

export type BadgeType = 'MILESTONE' | 'PERFORMANCE' | 'SPECIAL';
export type ChallengeType = 'WEEKLY' | 'MONTHLY' | 'LIFETIME';
export type EventType = 'DEAL_CLOSED' | 'REVENUE_EARNED' | 'REFERRAL_SUCCESS' | 'TRAINING_COMPLETED';

export interface Badge {
    id: string;
    name: string;
    description: string;
    icon: string; // Lucide icon name or URL
    type: BadgeType;
    tierRequirement?: PartnerTier;
    criteria: {
        metric: 'DEALS_CLOSED' | 'REVENUE_GENERATED' | 'REFERRALS';
        threshold: number;
    };
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    type: ChallengeType;
    startDate?: Date;
    endDate?: Date;
    target: {
        metric: 'DEALS_CLOSED' | 'REVENUE_GENERATED';
        value: number;
    };
    reward: {
        badgeId?: string;
        bonusCommissionRate?: number;
        points?: number;
    };
}

export interface TierProgress {
    currentTier: PartnerTier;
    nextTier: PartnerTier | null;
    metrics: {
        dealsClosed: number;
        revenueGenerated: number;
    };
    requirements: {
        dealsRequired: number;
        revenueRequired: number;
    };
    progressPercentage: number; // 0 to 100
}

export interface PartnerEvent {
    type: EventType;
    timestamp: Date;
    payload: {
        dealId?: string;
        amount?: number;
        partnerId?: string;
        courseId?: string;
    };
}

export interface GamificationState {
    badges: string[]; // Array of Badge IDs
    activeChallenges: string[]; // Array of Challenge IDs
    completedChallenges: string[];
    points: number;
}
