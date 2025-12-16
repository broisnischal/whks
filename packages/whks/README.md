# whks

Webhook kit for building webhook integrations with various providers and adapters.

## Installation

```bash
pnpm add whks
# or
npm install whks
# or
yarn add whks
```

## Features

- 🎯 **Provider Support**: Easy integration with webhook providers (Discord, etc.)
- 🔌 **Adapter Support**: Framework adapters (Hono, etc.)
- 📦 **TypeScript**: Full TypeScript support with type definitions
- 🚀 **Modern**: Built with modern tooling and ESM support

## Usage

### Basic Example

```typescript
import { createWebhook } from 'whks'

// Your webhook implementation
```

### With Hono Adapter

```typescript
import { createHonoAdapter } from 'whks/adapters/hono'

// Use with Hono framework
```

### Discord Provider

```typescript
import { createDiscordProvider } from 'whks/providers/discord'

// Discord webhook integration
```

## Development

### Build

```bash
pnpm build
```

### Development Mode

```bash
pnpm dev
```

## License

MIT
