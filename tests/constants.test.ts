import { describe, it, expect } from 'vitest';
import {
  DURATION_PRESETS,
  MIN_CAMPAIGN_BLOCKS,
  MAX_CAMPAIGN_BLOCKS,
  MIN_BUDGET_STX,
  MAX_BUDGET_STX,
  MS_PER_BLOCK,
} from '../src/constants';

describe('DURATION_PRESETS', () => {
  it('has 5 presets', () => {
    expect(DURATION_PRESETS).toHaveLength(5);
  });
  it('each preset has a label and blocks field', () => {
    for (const preset of DURATION_PRESETS) {
      expect(typeof preset.label).toBe('string');
      expect(typeof preset.blocks).toBe('number');
    }
  });
  it('presets are sorted in ascending block order', () => {
    for (let i = 1; i < DURATION_PRESETS.length; i++) {
      expect(DURATION_PRESETS[i].blocks).toBeGreaterThan(DURATION_PRESETS[i - 1].blocks);
    }
  });
  it('all presets fall within allowed campaign bounds', () => {
    for (const preset of DURATION_PRESETS) {
      expect(preset.blocks).toBeGreaterThanOrEqual(MIN_CAMPAIGN_BLOCKS);
      expect(preset.blocks).toBeLessThanOrEqual(MAX_CAMPAIGN_BLOCKS);
    }
  });
});

describe('campaign block bounds', () => {
  it('MIN_CAMPAIGN_BLOCKS is 144 (~1 day)', () => {
    expect(MIN_CAMPAIGN_BLOCKS).toBe(144);
  });
  it('MAX_CAMPAIGN_BLOCKS is 262_800 (~5 years)', () => {
    expect(MAX_CAMPAIGN_BLOCKS).toBe(262_800);
  });
  it('MIN_CAMPAIGN_BLOCKS is less than MAX_CAMPAIGN_BLOCKS', () => {
    expect(MIN_CAMPAIGN_BLOCKS).toBeLessThan(MAX_CAMPAIGN_BLOCKS);
  });
});

describe('budget bounds', () => {
  it('MIN_BUDGET_STX is 1', () => {
    expect(MIN_BUDGET_STX).toBe(1);
  });
  it('MAX_BUDGET_STX is 1_000', () => {
    expect(MAX_BUDGET_STX).toBe(1_000);
  });
  it('MIN_BUDGET_STX is less than MAX_BUDGET_STX', () => {
    expect(MIN_BUDGET_STX).toBeLessThan(MAX_BUDGET_STX);
  });
});

describe('MS_PER_BLOCK', () => {
  it('is 600_000 ms (10 minutes)', () => {
    expect(MS_PER_BLOCK).toBe(600_000);
  });
});
