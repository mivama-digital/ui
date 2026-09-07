---
"@mivama/ui": major
---

Full shadcn/ui distribution with neutral semantic theme baseline and complete 72-component catalog:

### Breaking Changes & Visual Baseline

- Visual Theme Baseline: Default `product` and `portal` themes now use the neutral grayscale shadcn/ui token palette by default (`--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`).
- The previous Mivama brand palette is preserved and remains available as an opt-in theme (`theme="editorial"` or `data-mivama-theme="editorial"`).
- Base UI Foundation: Primitives are powered by `@base-ui-components/react` (Base UI 1.7.0) with zero Radix and zero Vaul runtime dependencies.

### New Components (64 Official + 8 Mivama Extensions = 72 Modules)

- AspectRatio (`@mivama/ui/aspect-ratio`)
- ButtonGroup (`@mivama/ui/button-group`)
- Calendar (`@mivama/ui/calendar`)
- Carousel (`@mivama/ui/carousel`)
- Chart (`@mivama/ui/chart`)
- Checkbox (`@mivama/ui/checkbox`)
- Combobox (`@mivama/ui/combobox`)
- Command (`@mivama/ui/command`)
- DataTable (`@mivama/ui/data-table`)
- DatePicker (`@mivama/ui/date-picker`)
- DirectionProvider (`@mivama/ui/direction`)
- Drawer (`@mivama/ui/drawer`)
- InputGroup (`@mivama/ui/input-group`)
- InputOTP (`@mivama/ui/input-otp`)
- Kbd (`@mivama/ui/kbd`)
- Menubar (`@mivama/ui/menubar`)
- MessageScroller (`@mivama/ui/message-scroller`)
- NativeSelect (`@mivama/ui/native-select`)
- NavigationMenu (`@mivama/ui/navigation-menu`)
- Pagination (`@mivama/ui/pagination`)
- Questionnaire (`@mivama/ui/questionnaire`)
- RadioGroup (`@mivama/ui/radio-group`)
- Resizable (`@mivama/ui/resizable`)
- Slider (`@mivama/ui/slider`)
- Toggle (`@mivama/ui/toggle`)
- ToggleGroup (`@mivama/ui/toggle-group`)

### Packaging & Exports

- Explicit subpath exports for all 72 modules in both ESM (`import`) and CJS (`require`) with pure TypeScript declarations (`types`).
- Strict `sideEffects: ["**/*.css"]` boundary; JavaScript modules are zero side-effects and tree-shakeable.
- Tree-shaking guarantees ensure base primitives (e.g. Button, Dialog, Card) do not bundle heavy dependencies (recharts, @tanstack/react-table, embla-carousel-react, react-day-picker).

### Migration

- Detailed migration guide available in `docs/migration/shadcn-compatible-release.md`.
