# Upstream update policy

Mivama does not mirror, fork, or automatically apply shadcn/ui component source.

For a component update, a consumer maintainer must:

1. open a consumer feature branch;
2. run `pnpm dlx shadcn@latest view <component>` and inspect the change;
3. run `pnpm dlx shadcn@latest add <component>` only after agreeing the diff;
4. run the consumer's full tests, lint, typecheck, build, and visual smoke check;
5. commit the reviewed component source in that consumer.

Registry-token changes are separate, reviewed changes in the mivama-digital/ui registry. Consumers pin a registry commit SHA and upgrade it deliberately.
