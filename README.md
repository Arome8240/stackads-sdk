# StackAds SDK

A developer toolkit for integrating decentralized ads powered by the [Stacks](https://www.stacks.co/) blockchain into Web2 apps and Web3 dApps.

## Packages

| Package                                             | Version | Description             |
| --------------------------------------------------- | ------- | ----------------------- |
| [`@stackads/core`](./packages/core)                 | 0.0.1   | Core SDK logic          |
| [`@stackads/react`](./packages/react)               | 0.0.1   | React components        |
| [`@stackads/react-native`](./packages/react-native) | 0.0.1   | React Native components |

## Install

```bash
# Core
npm install @stackads/core

# React
npm install @stackads/react

# React Native
npm install @stackads/react-native
```

## Usage

### Core

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

- `initialize(config)` — connect to Stacks blockchain
- `loadAd()` — fetch decentralized ad content
- `trackImpression()` / `trackClick()` — on-chain event tracking
- `StackAdsProvider` — React/RN context provider
- Full `AdBanner` with real ad logic
- Mock API for local development

## Development

```bash
pnpm install
pnpm build        # build all packages
pnpm changeset    # create a changeset
pnpm release      # version + publish
```

## License

MIT
