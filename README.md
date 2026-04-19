# stackads-sdk

TypeScript SDK for interacting with StackAds contracts on the [Stacks](https://stacks.co) blockchain.

StackAds enables on-chain advertising campaigns — this SDK exposes the contract's read functions, utility helpers, and types as a framework-agnostic package.

## Installation

```bash
npm install stackads-sdk
```

## Quick start

```ts
import { createStackAdsConfig, fetchAd, fetchAdsForUser, microToStx } from 'stackads-sdk';

const config = createStackAdsConfig({
  network: 'mainnet',
  contractAddress: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ',
});

// Fetch a single ad
const ad = await fetchAd(config, 0);
if (ad) {
  console.log(`Ad budget: ${microToStx(ad.budget)} STX`);
}

// Fetch all ads for a user
const ads = await fetchAdsForUser(config, 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ');
console.log(`Found ${ads.length} ad(s)`);
```

## API

### `createStackAdsConfig(options)`

Creates a resolved config object required by all SDK functions.

```ts
const config = createStackAdsConfig({
  network: 'mainnet',          // 'mainnet' | 'testnet'
  contractAddress: 'SP...',    // deployed contract principal
  contractName: 'stackads',    // optional, default: 'stackads'
  nftContractName: 'stackads-nft', // optional, default: 'stackads-nft'
  stacksApiUrl: 'https://...',  // optional, defaults to Hiro API
});
```

### Contract functions

| Function | Description |
|---|---|
| `fetchAd(config, adId)` | Fetch a single ad by numeric ID |
| `fetchAdCount(config)` | Get the total number of ads on-chain |
| `fetchBlockHeight(config)` | Get the current Stacks block height |
| `fetchAdsForUser(config, address)` | Fetch all ads belonging to an address |

### Ad helpers

```ts
import { getAdStatus, blocksRemaining, blocksToMs } from 'stackads-sdk';

getAdStatus(ad, currentBlock);   // 'active' | 'ended' | 'paused'
blocksRemaining(ad, currentBlock);  // blocks left until end
blocksToMs(blocks);                    // estimated milliseconds
```

### Utilities

```ts
import { microToStx, stxToMicro, truncateAddress, formatStx } from 'stackads-sdk';

microToStx(1_000_000);                // 1
stxToMicro(1);                        // 1000000n
truncateAddress('SP2J6Z...V9EJ', 6);  // 'SP2J6Z…RV9EJ'
formatStx(1_500_000);                 // '1.5 STX'
```

### Constants

```ts
import { DURATION_PRESETS, MIN_CAMPAIGN_BLOCKS, MAX_CAMPAIGN_BLOCKS, MS_PER_BLOCK } from 'stackads-sdk';
```

| Constant | Value | Description |
|---|---|---|
| `MIN_CAMPAIGN_BLOCKS` | `144` | ~1 day |
| `MAX_CAMPAIGN_BLOCKS` | `262_800` | ~5 years |
| `MIN_BUDGET_STX` | `1` | Minimum budget |
| `MAX_BUDGET_STX` | `1_000` | Contract limit per transaction |
| `MS_PER_BLOCK` | `600_000` | Milliseconds per Stacks block |

## Publishing

1. Add your `NPM_TOKEN` to GitHub repository secrets.
2. Create a GitHub release — the `publish` workflow will build and push to npm automatically.

## License

MIT
