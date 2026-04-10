# StackAds SDK

> Decentralized advertising for Web2 apps and Web3 dApps, powered by the [Stacks](https://www.stacks.co/) blockchain.

StackAds lets developers integrate blockchain-native ads into any app — no middlemen, no opaque auctions, full transparency on-chain.

## Packages

| Package                                             | Version                                                                                                             | Description                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| [`@stackads/core`](./packages/core)                 | [![npm](https://img.shields.io/npm/v/@stackads/core)](https://www.npmjs.com/package/@stackads/core)                 | Core SDK — framework agnostic |
| [`@stackads/react`](./packages/react)               | [![npm](https://img.shields.io/npm/v/@stackads/react)](https://www.npmjs.com/package/@stackads/react)               | React components              |
| [`@stackads/react-native`](./packages/react-native) | [![npm](https://img.shields.io/npm/v/@stackads/react-native)](https://www.npmjs.com/package/@stackads/react-native) | React Native components       |

## Quick Start

```bash
# Pick the package for your stack
npm install @stackads/core
npm install @stackads/react
npm install @stackads/react-native
```

### Core (framework agnostic)

```ts
import { hello } from '@stackads/core';

console.log(hello()); // "Hello from StackAds Core"
```

### React

```tsx
import { AdBanner } from '@stackads/react';

export default function App() {
  return <AdBanner />;
}
```

### React Native

```tsx
import { AdBanner } from '@stackads/react-native';

export default function App() {
  return <AdBanner />;
}
```

## Roadmap

- `initialize(config)` — connect to the Stacks blockchain
- `loadAd()` — fetch decentralized ad content
- `trackImpression()` / `trackClick()` — on-chain event tracking
- `StackAdsProvider` — React/RN context provider
- Full `AdBanner` with real ad rendering logic
- Mock API for local development

## Contributing

```bash
pnpm install       # install all workspace deps
pnpm build         # build all packages
pnpm changeset     # create a changeset for your changes
pnpm release       # version + publish to npm
```

This repo uses [pnpm workspaces](https://pnpm.io/workspaces) and [Changesets](https://github.com/changesets/changesets) for versioning.

## License

MIT
