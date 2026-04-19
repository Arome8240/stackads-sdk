import { describe, it, expect } from 'vitest';
import { getAdStatus, blocksRemaining, blocksToMs } from '../src/types/ad';
import type { Ad } from '../src/types/ad';

const baseAd: Ad = {
  adId: 1,
  creator: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ',
  budget: 1_000_000,
  endHeight: 1000,
  createdAt: 500,
  isActive: true,
  targetAudience: 'developers',
  impressions: 0,
  clicks: 0,
};

describe('getAdStatus', () => {
  it('returns "active" when current block is below end height', () => {
    expect(getAdStatus(baseAd, 999)).toBe('active');
  });
  it('returns "ended" when current block equals end height', () => {
    expect(getAdStatus(baseAd, 1000)).toBe('ended');
  });
  it('returns "ended" when current block exceeds end height', () => {
    expect(getAdStatus(baseAd, 1001)).toBe('ended');
  });
  it('returns "paused" regardless of block height when ad is not active', () => {
    expect(getAdStatus({ ...baseAd, isActive: false }, 500)).toBe('paused');
    expect(getAdStatus({ ...baseAd, isActive: false }, 1500)).toBe('paused');
  });
});

describe('blocksRemaining', () => {
  it('returns blocks remaining until end', () => {
    expect(blocksRemaining(baseAd, 900)).toBe(100);
  });
  it('returns 0 when already at end height', () => {
    expect(blocksRemaining(baseAd, 1000)).toBe(0);
  });
  it('returns 0 when past end height', () => {
    expect(blocksRemaining(baseAd, 1100)).toBe(0);
  });
  it('returns the full duration at block 0', () => {
    expect(blocksRemaining(baseAd, 0)).toBe(1000);
  });
});

describe('blocksToMs', () => {
  it('converts 1 block to 600_000 ms (10 minutes)', () => {
    expect(blocksToMs(1)).toBe(600_000);
  });
  it('converts 6 blocks to 1 hour in ms', () => {
    expect(blocksToMs(6)).toBe(3_600_000);
  });
  it('converts 0 blocks to 0 ms', () => {
    expect(blocksToMs(0)).toBe(0);
  });
});
