/**
 * ARCHIVED MOCK DATA - DO NOT USE IN PRODUCTION
 *
 * This file contains mock pass data that was previously used for development.
 * It is kept for reference and potential future testing purposes.
 */

export interface Pass {
  id: string;
  name: string;
  price?: { usdCents?: number; inrPaise?: number } | null;
  isGroundPass?: boolean;
}

/**
 * Dummy passes matching the design
 */
export const DUMMY_PASSES: Pass[] = [
  { id: 'silver', name: 'Silver Pass', isGroundPass: true },
  { id: 'gold', name: 'Gold Pass', price: { usdCents: 499 } },
  { id: 'platinum', name: 'Platinum Pass', price: { usdCents: 699 } },
  { id: 'diamond', name: 'Diamond Pass', price: { usdCents: 899 } },
];
