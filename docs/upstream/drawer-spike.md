# Drawer Primitive Spike & Architecture Decision

## Executive Summary

Task 5.4 evaluates the implementation strategy for `Drawer` in Mivama UI:

1. Determine whether `vaul` is needed as an external dependency or if Base UI provides native drawer support.
2. Evaluate Base UI 1.7.0's native `@base-ui/react/drawer` primitive against upstream shadcn v4's `bases/base/ui/drawer.tsx`.
3. Compare Sheet-backed behavior vs native drawer swipe/gesture behavior.
4. Establish the component contract, accessibility guarantees, and portal/shell attribute integrations.

**Decision: Adopt `@base-ui/react/drawer` natively (0 new external dependencies). Do NOT install `vaul`.**

---

## 1. Upstream Catalog Analysis

In shadcn v4, two official registry variants exist for `Drawer`:

- **New York / Radix Variant (`registry/new-york-v4/ui/drawer.tsx`)**: Built on `vaul` because Radix lacks a native swipeable drawer primitive.
- **Base / Base UI Variant (`registry/bases/base/ui/drawer.tsx`)**: Built directly on `@base-ui/react/drawer`.

Because Mivama UI standardizes on `@base-ui/react` (version 1.7.0), Base UI already provides the full suite of drawer primitives:

- `Drawer.Root`
- `Drawer.Trigger`
- `Drawer.Portal`
- `Drawer.Backdrop`
- `Drawer.Viewport`
- `Drawer.Popup`
- `Drawer.Content`
- `Drawer.Title`
- `Drawer.Description`
- `Drawer.Close`
- `Drawer.Handle`

This means adopting `@base-ui/react/drawer` allows Mivama UI to match shadcn's canonical `bases/base` implementation with zero third-party dependencies, preserving zero-Radix architecture.

---

## 2. Capability & Feature Comparison Matrix

| Feature               | Sheet (`@base-ui/react/dialog`) | Vaul (`vaul`)               | Base UI Drawer (`@base-ui/react/drawer`)         | Mivama UI Implementation                                    |
| :-------------------- | :------------------------------ | :-------------------------- | :----------------------------------------------- | :---------------------------------------------------------- |
| **Drawer Primitives** | Dialog emulation                | Proprietary Vaul DOM        | First-class Drawer primitives                    | `@base-ui/react/drawer`                                     |
| **Swipe Directions**  | Fixed sides via CSS             | Bottom / Left / Right / Top | `down`, `up`, `left`, `right` (`swipeDirection`) | Full 4-direction swipe gestures                             |
| **Snap Points**       | None                            | Yes                         | Native `snapPoints` array                        | Supported via `DrawerPrimitive.Root`                        |
| **Swipe Handle**      | Static decoration               | Static handle               | `DrawerSwipeHandle` / `DrawerPrimitive.Handle`   | `DrawerSwipeHandle`                                         |
| **Focus Trapping**    | Native Dialog                   | Focus trap                  | Native Base UI focus manager                     | Native Base UI focus manager                                |
| **Escape to Close**   | Native Dialog                   | Keydown listener            | Native Base UI keydown handler                   | Supported                                                   |
| **Backdrop Dismiss**  | Backdrop click                  | Backdrop click              | Backdrop click / drag                            | Supported                                                   |
| **Portal Isolation**  | `useMivamaPortalContainer`      | Requires container prop     | `useMivamaPortalContainer`                       | Strict portal container support                             |
| **Shell Attributes**  | `useShellAttributes`            | Manual                      | `useShellAttributes`                             | `[data-slot=drawer-content]` & `[data-slot=drawer-overlay]` |
| **Safe Areas**        | Inset classes                   | Inset classes               | `env(safe-area-inset-*)` support                 | Safe-area insets preserved                                  |
| **External Dep**      | None                            | `vaul` (~30kB)              | Included in `@base-ui/react`                     | **Zero new dependencies**                                   |

---

## 3. Architecture & API Specification

The component is exported as `src/components/ui/drawer.tsx`:

```tsx
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
```

### Key Integrations:

1. **Mivama Portal Provider**: `DrawerPortal` reads `useMivamaPortalContainer()` so portaled drawers render into consumer-specified containers.
2. **Shell Attributes**: `useShellAttributes("[data-slot=drawer-content]")` and `useShellAttributes("[data-slot=drawer-overlay]")` guarantee dark mode and theme scoping in micro-frontends and embedded shells.
3. **Data Slots**: Every element exposes shadcn-compatible `data-slot` attributes (`drawer`, `drawer-trigger`, `drawer-portal`, `drawer-overlay`, `drawer-viewport`, `drawer-popup`, `drawer-content`, `drawer-header`, `drawer-footer`, `drawer-title`, `drawer-description`, `drawer-close`, `drawer-swipe-handle`).
4. **Motion & Accessibility**: Uses Base UI transitions with `motion-reduce:transition-none` safeguards and standard dialog accessibility roles (`aria-labelledby`, `aria-describedby`).
