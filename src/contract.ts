import { callReadOnlyFunction, cvToJSON, uintCV } from '@stacks/transactions';
import type { ResolvedStackAdsConfig } from './config';
import type { Ad } from './types/ad';

/** Fetch a single ad by ID. Returns null if not found. */
export async function fetchAd(
  config: ResolvedStackAdsConfig,
  adId: number,
): Promise<Ad | null> {
  try {
    const result = await callReadOnlyFunction({
      network: config.network,
      contractAddress: config.contractAddress,
      contractName: config.contractName,
      functionName: 'get-ad',
      functionArgs: [uintCV(adId)],
      senderAddress: config.contractAddress,
    });

    const json = cvToJSON(result);
    if (!json.value) return null;
    const a = json.value;

    return {
      adId,
      creator: a.creator?.value ?? '',
      budget: Number(a.budget?.value ?? 0),
      endHeight: Number(a['end-height']?.value ?? 0),
      createdAt: Number(a['created-at']?.value ?? 0),
      isActive: a['is-active']?.value === true,
      targetAudience: a['target-audience']?.value ?? '',
      impressions: Number(a.impressions?.value ?? 0),
      clicks: Number(a.clicks?.value ?? 0),
    };
  } catch {
    return null;
  }
}

/** Get the total number of ads created on the contract. */
export async function fetchAdCount(config: ResolvedStackAdsConfig): Promise<number> {
  try {
    const result = await callReadOnlyFunction({
      network: config.network,
      contractAddress: config.contractAddress,
      contractName: config.contractName,
      functionName: 'get-ad-count',
      functionArgs: [],
      senderAddress: config.contractAddress,
    });
    const json = cvToJSON(result);
    return Number(json.value ?? 0);
  } catch {
    return 0;
  }
}

/** Fetch the current Stacks block height from the API. */
export async function fetchBlockHeight(config: ResolvedStackAdsConfig): Promise<number> {
  try {
    const res = await fetch(`${config.stacksApiUrl}/v2/info`);
    const data = await res.json();
    return Number(data.burn_block_height ?? data.stacks_tip_height ?? 0);
  } catch {
    return 0;
  }
}

/**
 * Run an array of async tasks with a maximum concurrency limit.
 * Preserves result order relative to the input tasks array.
 */
async function withConcurrency<T>(tasks: (() => Promise<T>)[], limit: number): Promise<T[]> {
  const results: T[] = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const i = next++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, tasks.length) }, worker));
  return results;
}

/**
 * Fetch a page of ads by offset and limit.
 * Useful for paginated UIs or incremental scanning without loading all ads at once.
 *
 * @param offset - First ad ID to fetch (inclusive)
 * @param limit  - Maximum number of ads to fetch
 */
export async function fetchAdPage(
  config: ResolvedStackAdsConfig,
  offset: number,
  limit: number,
): Promise<Ad[]> {
  const ids = Array.from({ length: limit }, (_, i) => offset + i);
  const results = await Promise.all(ids.map((id) => fetchAd(config, id)));
  return results.filter((a): a is Ad => a !== null);
}

/**
 * Fetch all ads belonging to a given Stacks address.
 * Scans all ad IDs up to the current count with a bounded concurrency to
 * avoid overwhelming the Stacks API with hundreds of simultaneous requests.
 *
 * @param concurrency - Maximum number of in-flight requests at once (default: 10)
 */
export async function fetchAdsForUser(
  config: ResolvedStackAdsConfig,
  address: string,
  concurrency = 10,
): Promise<Ad[]> {
  const count = await fetchAdCount(config);
  const tasks = Array.from({ length: count }, (_, i) => () => fetchAd(config, i));
  const results = await withConcurrency(tasks, concurrency);
  return results.filter((a): a is Ad => a !== null && a.creator === address);
}
