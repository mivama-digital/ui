---
"@mivama/ui": minor
---

Add core primitives and improve type safety and provider diagnostics:

- Add `AlertDialog` primitive family (`AlertDialog`, `AlertDialogTrigger`, `AlertDialogPortal`, `AlertDialogOverlay`, `AlertDialogContent`, `AlertDialogHeader`, `AlertDialogFooter`, `AlertDialogTitle`, `AlertDialogDescription`, `AlertDialogAction`, `AlertDialogCancel`) with provider portal integration and accessible dialog roles.
- Add `Slider` interactive primitive with track, indicator, and thumb.
- Add `ScrollArea` component with customized scrollbars and viewport.
- Improve `toast` type safety with generic `ToastData` and typed action payloads, eliminating unsafe type assertions.
- Add invariant diagnostic to `useMivamaContext()` ensuring descriptive error messages when accessed outside `MivamaProvider`.
- Raise test coverage thresholds across statements, branches, functions, and lines.
