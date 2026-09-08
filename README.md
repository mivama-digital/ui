# @mivama/ui

> **Migration Notice:** This repository is a Mivama design-token registry. Official UI components are installed from shadcn/ui into consumer applications. The legacy `@mivama/ui` npm package is deprecated and no longer published. This repository does not contain a shadcn fork.

## Overview

`mivama-ui` serves as a lightweight, versioned theme registry (`registry:base`) providing Mivama design tokens, CSS variables, and minimal base styling rules. Official UI components (`Button`, `Card`, `Dialog`, etc.) are installed directly from the official shadcn CLI into each consumer application.

## Consumer Quick Start

1. Initialize the official shadcn CLI in the consumer repository.
2. Add the Mivama registry URL pinned to an immutable commit SHA in `components.json`:
   ```json
   {
     "registries": {
       "@mivama": "https://raw.githubusercontent.com/mivama-digital/mivama-ui/<COMMIT_SHA>/public/r/{name}.json"
     }
   }
   ```
3. Install the Mivama base tokens:
   ```bash
   pnpm dlx shadcn@latest add @mivama/mivama-base
   ```
4. Install needed official shadcn components:
   ```bash
   pnpm dlx shadcn@latest add button card
   ```
5. Commit generated official component source directly in the consumer repository.

`@mivama/ui` is retired. Do not add it as a runtime dependency or import from it.

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
