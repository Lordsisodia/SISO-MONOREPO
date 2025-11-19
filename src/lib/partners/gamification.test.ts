import { describe, it, expect } from 'vitest';
import { TierService } from './tier-service';
import { GamificationEngine } from './gamification-engine';
import { CommissionService } from './commission-service';
import { PartnerProfile, Deal } from '../../types/pipeline-types';
import { PartnerEvent } from '../../types/gamification-types';

describe('TierService', () => {
    it('should calculate Trailblazer tier correctly', () => {
        const metrics = { dealsClosed: 0, revenueGenerated: 0 };
        expect(TierService.calculateTier(metrics)).toBe('Trailblazer');
    });

    it('should calculate Vanguard tier correctly', () => {
        const metrics = { dealsClosed: 3, revenueGenerated: 3000 }; // Meets Vanguard (3 deals, $3k)
        expect(TierService.calculateTier(metrics)).toBe('Vanguard');
    });

    it('should require BOTH deals and revenue for next tier', () => {
        const metrics = { dealsClosed: 3, revenueGenerated: 1000 }; // Has deals for Vanguard but not revenue
        expect(TierService.calculateTier(metrics)).toBe('Builder');
    });

    it('should calculate Sovereign tier correctly', () => {
        const metrics = { dealsClosed: 25, revenueGenerated: 25000 }; // Meets Sovereign (25 deals, $25k)
        expect(TierService.calculateTier(metrics)).toBe('Sovereign');
    });

    it('should calculate progress to next tier', () => {
        const metrics = { dealsClosed: 0, revenueGenerated: 500 };
        // Trailblazer -> Builder requirements: 1 deal, $1000
        // Deals progress: 0/1 = 0%
        // Revenue progress: 500/1000 = 50%
        // Overall progress (min): 0%
        const progress = TierService.getProgress(metrics);
        expect(progress.currentTier).toBe('Trailblazer');
        expect(progress.nextTier).toBe('Builder');
        expect(progress.progressPercentage).toBe(0);
    });
});

describe('GamificationEngine', () => {
    const mockProfile: PartnerProfile = {
        id: 'p1',
        name: 'Test Partner',
        email: 'test@example.com',
        tier: 'Trailblazer',
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

    it('should calculate commission for Trailblazer tier', () => {
        // Trailblazer rate is 0.10
        const commission = CommissionService.calculateCommission(mockDeal, 'Trailblazer');
        expect(commission).toBe(1000);
    });

    it('should calculate commission for Sovereign tier', () => {
        // Sovereign rate is 0.25
        const commission = CommissionService.calculateCommission(mockDeal, 'Sovereign');
        expect(commission).toBe(2500);
    });

    it('should calculate potential upside', () => {
        // Trailblazer (10%) -> Builder (12%)
        // Upside on 10k deal: 1200 - 1000 = 200
        const upside = CommissionService.calculatePotentialUpside(mockDeal, 'Trailblazer');
        expect(upside).toBe(200);
    });
});
