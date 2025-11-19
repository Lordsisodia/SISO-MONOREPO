import { describe, it, expect } from 'vitest';
import { TierService } from './tier-service';
import { GamificationEngine } from './gamification-engine';
import { CommissionService } from './commission-service';
import { PartnerProfile, Deal } from '../../types/pipeline-types';
import { PartnerEvent } from '../../types/gamification-types';

describe('TierService', () => {
    it('should calculate Starter tier correctly', () => {
        const metrics = { dealsClosed: 0, revenueGenerated: 0 };
        expect(TierService.calculateTier(metrics)).toBe('Starter');
    });

    it('should calculate Active tier correctly', () => {
        const metrics = { dealsClosed: 3, revenueGenerated: 15000 }; // Meets Active (3 deals, $10k)
        expect(TierService.calculateTier(metrics)).toBe('Active');
    });

    it('should require BOTH deals and revenue for next tier', () => {
        const metrics = { dealsClosed: 3, revenueGenerated: 5000 }; // Has deals but not revenue for Active
        expect(TierService.calculateTier(metrics)).toBe('Starter');
    });

    it('should calculate Elite tier correctly', () => {
        const metrics = { dealsClosed: 25, revenueGenerated: 200000 }; // Meets Elite (20 deals, $100k)
        expect(TierService.calculateTier(metrics)).toBe('Elite');
    });

    it('should calculate progress to next tier', () => {
        const metrics = { dealsClosed: 1, revenueGenerated: 5000 };
        // Starter -> Active requirements: 3 deals, $10k
        // Deals progress: 1/3 = 33%
        // Revenue progress: 5k/10k = 50%
        // Overall progress (min): 33%
        const progress = TierService.getProgress(metrics);
        expect(progress.currentTier).toBe('Starter');
        expect(progress.nextTier).toBe('Active');
        expect(progress.progressPercentage).toBe(33);
    });
});

describe('GamificationEngine', () => {
    const mockProfile: PartnerProfile = {
        id: 'p1',
        name: 'Test Partner',
        email: 'test@example.com',
        tier: 'Starter',
        joinedAt: new Date(),
        metrics: {
            dealsClosed: 1,
            revenueGenerated: 10000,
            activeDeals: 0,
            avgDealSize: 10000,
        },
    };

    it('should award First Sale badge', () => {
        const event: PartnerEvent = {
            type: 'DEAL_CLOSED',
            timestamp: new Date(),
            payload: { dealId: 'd1' },
        };

        const newBadges = GamificationEngine.checkAchievements(mockProfile, [], event);
        expect(newBadges).toHaveLength(1);
        expect(newBadges[0].id).toBe('first_sale');
    });

    it('should not award badge if already owned', () => {
        const event: PartnerEvent = {
            type: 'DEAL_CLOSED',
            timestamp: new Date(),
            payload: { dealId: 'd1' },
        };

        const newBadges = GamificationEngine.checkAchievements(mockProfile, ['first_sale'], event);
        expect(newBadges).toHaveLength(0);
    });

    it('should award High Roller badge for revenue', () => {
        const richProfile = { ...mockProfile, metrics: { ...mockProfile.metrics, revenueGenerated: 60000 } };
        const event: PartnerEvent = {
            type: 'REVENUE_EARNED',
            timestamp: new Date(),
            payload: { amount: 10000 },
        };

        const newBadges = GamificationEngine.checkAchievements(richProfile, ['first_sale'], event);
        expect(newBadges).toHaveLength(1); // Should get High Roller (threshold 50k)
        expect(newBadges[0].id).toBe('high_roller');
    });
});

describe('CommissionService', () => {
    const mockDeal: Deal = {
        id: 'd1',
        clientId: 'c1',
        partnerId: 'p1',
        stage: 'WON',
        value: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    it('should calculate commission for Starter tier', () => {
        // Starter rate is 0.10
        const commission = CommissionService.calculateCommission(mockDeal, 'Starter');
        expect(commission).toBe(1000);
    });

    it('should calculate commission for Elite tier', () => {
        // Elite rate is 0.20
        const commission = CommissionService.calculateCommission(mockDeal, 'Elite');
        expect(commission).toBe(2000);
    });

    it('should calculate potential upside', () => {
        // Starter (10%) -> Active (12%)
        // Upside on 10k deal: 1200 - 1000 = 200
        const upside = CommissionService.calculatePotentialUpside(mockDeal, 'Starter');
        expect(upside).toBe(200);
    });
});
