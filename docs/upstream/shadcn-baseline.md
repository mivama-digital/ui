# shadcn Baseline Specification

This document records the exact upstream baseline, style preset, dependencies, and architectural decisions pinned for `@mivama/ui`.

## Pinned Reference

- **Upstream Repository:** `https://github.com/shadcn-ui/ui`
- **Pinned Git SHA:** `5c7072da672b0048bc6771e3204063a2537df91a`
- **Reference Date:** 2026-09-06
- **License:** MIT (see `THIRD_PARTY_NOTICES.md`)
- **Visual Baseline Style:** `base-nova`
- **Color Baseline:** `neutral`
- **Tailwind Version:** Tailwind CSS 4.x
- **React Version:** React 19

## Architecture & Dependency Decisions

`@mivama/ui` distributes a single, production-ready package implementing all official shadcn/ui base catalog components using `@base-ui/react` primitives and pinned third-party packages where necessary.

### 1. Primitives Layer (`@base-ui/react` 1.7.0)

`@base-ui/react` 1.7.0 provides the accessible headless foundation for:

- Accordion
- Alert Dialog
- Avatar
- Checkbox & CheckboxGroup
- Collapsible
- Combobox
- Context Menu
- Dialog
- Direction (`DirectionProvider`, `useDirection`)
- Drawer (`Drawer` primitive with snap points, gestures, and swipe support)
- Field & Fieldset
- Hover Card (`PreviewCard` primitive)
- Menubar
- Navigation Menu
- Popover
- Progress
- Radio Group (`Radio`, `RadioGroup`)
- Scroll Area
- Select
- Separator
- Slider
- Switch
- Tabs
- Toast
- Toggle & ToggleGroup
- Tooltip

### 2. Pinned External Dependencies

Only the following external dependencies are approved for complex interactions not provided by Base UI:

- `cmdk` (v1.x): Command palette keyboard filtering and navigation (`Command`, composed with `Popover` for `Combobox`)
- `embla-carousel-react` (v8.x): Carousel touch/swipe physics and keyboard navigation
- `input-otp` (v1.x): Segmented one-time password input management
- `react-day-picker` (v9.x): Accessible date calendar grid navigation
- `react-resizable-panels` (v2.x): Accessible resizable panel layouts and handles
- `recharts` (v2.x): Responsive chart visualizations wrapped in theme-aware `ChartContainer`
- `@tanstack/react-table` (v8.x): Headless table state manager wrapped in generic `DataTable`

### 3. Evaluated & Rejected Dependencies

- `vaul`: Evaluated and decided **NOT** needed. `@base-ui/react` 1.7.0 includes a comprehensive `Drawer` primitive with snap points and swipe gestures, which upstream shadcn's base registry (`apps/v4/registry/bases/base/ui/drawer.tsx`) uses directly.
- `@radix-ui/*`: **Forbidden**. All primitive primitives are provided by `@base-ui/react`.
