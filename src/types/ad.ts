import { MS_PER_BLOCK } from '../constants';

export interface Ad {
  adId: number;
  creator: string;
  /** Budget in micro-STX */
  budget: number;
  endHeight: number;
  createdAt: number;
  isActive: boolean;
  targetAudience: string;
  impressions: number;
  clicks: number;
  /** Optional local label */
  label?: string;
}

export type AdStatus = 'active' | 'ended' | 'paused';

export function getAdStatus(ad: Ad, currentBlock: number): AdStatus {
  if (!ad.isActive) return 'paused';
  if (currentBlock >= ad.endHeight) return 'ended';
  return 'active';
}

export function blocksRemaining(ad: Ad, currentBlock: number): number {
  return Math.max(0, ad.endHeight - currentBlock);
}

/** Convert a block count to milliseconds using the canonical MS_PER_BLOCK constant. */
export function blocksToMs(blocks: number): number {
  return blocks * MS_PER_BLOCK;
}
