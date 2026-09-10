# @mivama/ui

> **Migration Notice:** This repository is a Mivama design-token registry. Official UI components are installed from shadcn/ui into consumer applications. The legacy `@mivama/ui` npm package is deprecated and no longer published. This repository does not contain a shadcn fork.

## Overview

`mivama` serves as a lightweight, versioned theme registry (`registry:base`) providing Mivama design tokens, CSS variables, and minimal base styling rules. Official UI components (`Button`, `Card`, `Dialog`, etc.) are installed directly from the official shadcn CLI into each consumer application.

## Consumer quick start

1. Initialize the official shadcn CLI in the consumer repository.
2. Add the Mivama registry URL pinned to an immutable commit SHA in `components.json`.
3. Run `pnpm dlx shadcn@latest add @mivama/mivama-base`.
4. Run `pnpm dlx shadcn@latest add button card ...` for official components needed by that consumer.
5. Commit generated official component source in the consumer repository.

`@mivama/ui` is retired. Do not add it as a dependency or import it.

## Recommended Registry Revision

Use the immutable commit SHA pinned in `components.json`:
- Recommended revision: `ee852161825024e1ee74eec056afa084c0cc185a`

```json
{
  "registries": {
    "@mivama": "https://raw.githubusercontent.com/mivama-digital/ui/ee852161825024e1ee74eec056afa084c0cc185a/public/r/{name}.json"
  }
}
```

## Registry Development

Build the registry artifacts:
```bash
npm run build
```

Run tests and verification:
```bash
npm test
npm run verify
```
