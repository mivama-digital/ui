---
"@mivama/ui": minor
---

Modernize library architecture and implement Phase 2 core components:

- Introduce dual ESM/CJS bundling with `tsup` targeting ES2022.
- Decouple `tailwindcss` peer dependency and provide precompiled CSS.
- Extract global element resets into `@mivama/ui/reset.css`.
- Add `React.forwardRef` and explicit `displayName` across core primitives.
- Introduce `FieldContext` for automated accessible form field wiring.
- Eliminate global DOM `MutationObserver` on `document.documentElement`.
- Remove stacking context trapping (`isolate`) from `MivamaProvider`.
- Add Phase 2 primitives: `DropdownMenu`, `Popover`, `Accordion`, `Collapsible`, `Avatar`, `Table`, and `Toast` (with `Toaster` and `toast` helper).
