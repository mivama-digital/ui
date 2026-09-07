# Migrating to the Full shadcn-Compatible Mivama UI Distribution

This guide explains how to migrate existing applications to the complete shadcn-compatible `@mivama/ui` release.

## Overview of Changes

This release upgrades `@mivama/ui` into an exhaustive, pre-packaged distribution containing all 64 official shadcn/ui components plus 8 Mivama proprietary extensions (72 modules total).

Key architectural decisions:
1. **Base UI Foundation**: All interactive primitives are powered by `@base-ui-components/react` (Base UI 1.7.0). Zero `@radix-ui/*` or `vaul` dependencies are present in the package.
2. **Neutral Semantic Theme Baseline**: The default visual baseline for `product` and `portal` themes aligns with standard shadcn neutral tokens (`var(--background)`, `var(--foreground)`, `var(--card)`, `var(--popover)`, `var(--primary)`, `var(--secondary)`, `var(--muted)`, `var(--accent)`, `var(--destructive)`, `var(--border)`, `var(--input)`, `var(--ring)`).
3. **Opt-In Editorial Theme**: The Mivama editorial palette (`theme="editorial"`) remains available as an opt-in theme for marketing surfaces.
4. **Single Package Installation**: Consumers install `@mivama/ui` directly from npm. No copying or pasting code via the shadcn CLI is required.

---

## 1. Installation & Dependency Changes

Install `@mivama/ui` and its peer dependencies in your application:

```bash
npm install @mivama/ui
```

### Approved Runtime Dependencies

The package bundles and integrates the following external libraries for specialized primitives:
- `cmdk` — Command palette and Combobox
- `embla-carousel-react` — Accessible Carousel
- `input-otp` — One-Time Password input
- `react-day-picker` — Calendar and Date Picker
- `react-resizable-panels` — Resizable split panes
- `recharts` — Theme-aware responsive Charts
- `@tanstack/react-table` (v9) — Data Table

All other interactive widgets (Dialog, Sheet, Drawer, Tooltip, Popover, DropdownMenu, ContextMenu, Menubar, NavigationMenu, Tabs, Accordion, Collapsible, Checkbox, RadioGroup, Switch, Slider, Toggle, ToggleGroup, Avatar, ScrollArea) are powered exclusively by Base UI.

---

## 2. Application Shell Setup

Wrap your application in `MivamaProvider` and mount the `Toaster` for global toast notifications:

```tsx
import { MivamaProvider, Button, Toaster } from "@mivama/ui"
import "@mivama/ui/styles.css"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MivamaProvider theme="product" density="comfortable">
      {children}
      <Toaster />
    </MivamaProvider>
  )
}
```

### Portals & Overlay Contracts

Overlays (Dialog, Sheet, Drawer, Tooltip, Popover, DropdownMenu, ContextMenu) automatically port to the container registered by `MivamaProvider`. If rendered outside `MivamaProvider`, they fallback safely to `document.body`.

---

## 3. Visual Baseline & Theme Migration

### Default Neutral Theme

The default theme (`theme="product"`) now renders a clean neutral grayscale palette matching official shadcn/ui.

If your application relied on the legacy brand colors by default, explicitly opt into the editorial theme:

```tsx
<MivamaProvider theme="editorial">
  {children}
</MivamaProvider>
```

Or via shell data attributes:
```html
<html data-mivama-theme="editorial">
```

### Dark Mode

Dark mode is toggled by adding the `.dark` class to the shell element or passing `className="dark"` to `MivamaProvider`:

```tsx
<MivamaProvider theme="product" className="dark">
  {children}
</MivamaProvider>
```

---

## 4. Import Paths

Both root barrel imports and clean subpath imports are supported:

```tsx
// Root barrel imports:
import { Button, Card, Dialog, DataTable, ChartContainer } from "@mivama/ui"

// Subpath imports (optimal tree-shaking for large dependencies):
import { Button } from "@mivama/ui/button"
import { Calendar } from "@mivama/ui/calendar"
import { DataTable } from "@mivama/ui/data-table"
import { ChartContainer } from "@mivama/ui/chart"
```

---

## 5. Summary of New Components

The following components are newly available in this release:
- **Aspect Ratio**: `@mivama/ui/aspect-ratio`
- **Button Group**: `@mivama/ui/button-group`
- **Calendar**: `@mivama/ui/calendar`
- **Carousel**: `@mivama/ui/carousel`
- **Chart**: `@mivama/ui/chart`
- **Checkbox**: `@mivama/ui/checkbox`
- **Combobox**: `@mivama/ui/combobox`
- **Command**: `@mivama/ui/command`
- **Data Table**: `@mivama/ui/data-table`
- **Date Picker**: `@mivama/ui/date-picker`
- **Direction Provider**: `@mivama/ui/direction`
- **Drawer**: `@mivama/ui/drawer`
- **Input Group**: `@mivama/ui/input-group`
- **Input OTP**: `@mivama/ui/input-otp`
- **Kbd**: `@mivama/ui/kbd`
- **Menubar**: `@mivama/ui/menubar`
- **Message Scroller**: `@mivama/ui/message-scroller`
- **Native Select**: `@mivama/ui/native-select`
- **Navigation Menu**: `@mivama/ui/navigation-menu`
- **Pagination**: `@mivama/ui/pagination`
- **Questionnaire**: `@mivama/ui/questionnaire`
- **Radio Group**: `@mivama/ui/radio-group`
- **Resizable Panels**: `@mivama/ui/resizable`
- **Slider**: `@mivama/ui/slider`
- **Toggle**: `@mivama/ui/toggle`
- **Toggle Group**: `@mivama/ui/toggle-group`
