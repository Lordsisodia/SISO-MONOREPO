export type PartnerTier = 'Trailblazer' | 'Builder' | 'Vanguard' | 'Apex' | 'Sovereign';

export interface PipelineMetrics {
    dealsClosed: number;
    revenueGenerated: number;
    activeDeals: number;
    avgDealSize: number;
}

export interface PartnerProfile {
    id: string;
    name: string;
    email: string;
    tier: PartnerTier;
    joinedAt: Date;
    metrics: PipelineMetrics;
}

export interface Deal {
    id: string;
    clientId: string;
    partnerId: string;
    stage: 'PROSPECT' | 'CONTACTED' | 'DEMO_READY' | 'NEGOTIATING' | 'WON' | 'LOST';
    value?: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ClientSubmission {
    companyName: string;
    contactName: string;
    contactEmail: string;
    industry: string;
    budgetRange?: string;
    notes?: string;
}
