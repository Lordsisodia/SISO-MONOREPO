/**
 * Portfolio Domain - Pricing Types
 */

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface ProjectPricing {
  marketValue: number; // Estimated market price
  sisoPrice: number; // Actual SISO price
  currency: Currency;
  priceRange?: string; // e.g., "£1,000 - £3,000"
  paymentStructure?: string; // e.g., "50% Day 1, 50% Day 2"
  savings: number; // Percentage saved
}
