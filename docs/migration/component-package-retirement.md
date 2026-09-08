# Component Package Retirement

## Verbindliche Regeln

- Das Paket `@mivama/ui` wird nicht mehr veröffentlicht.
- `src/components/ui/**`, `src/index.ts`, `src/styles/**`, `scripts/sync-upstream.mjs`, API-Extractor-Konfiguration, Tarball-Tests, Consumer-Release-Tests und npm/OIDC-Release-Workflow werden nicht weitergeführt.
- Die alte `feat/full-shadcn-distribution`-Arbeit ist eine gesicherte WIP-Referenz, kein Migrationsfundament.
- Der einzige zu übernehmende Inhalt sind verifizierte Design-Token und generische Styles aus der bisherigen CSS-Quelle; kein React-Code.
- Consumer installieren offizielle shadcn/ui-Komponenten direkt in ihren eigenen Repositories über die offizielle shadcn-CLI.
