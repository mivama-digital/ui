import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const registryPath = new URL("../registry.json", import.meta.url);
const generatedItemPath = new URL("../public/r/mivama-base.json", import.meta.url);
const forbiddenFileTypes = new Set([
  "registry:ui",
  "registry:component",
  "registry:hook",
  "registry:lib",
  "registry:block",
]);

test("registry contains exactly one token-only Mivama base", () => {
  assert.equal(existsSync(registryPath), true, "registry.json must exist");
  const registry = JSON.parse(readFileSync(registryPath, "utf8"));

  assert.equal(registry.name, "mivama");
  assert.deepEqual(registry.items.map((item) => item.name), ["mivama-base"]);

  const base = registry.items[0];
  assert.equal(base.type, "registry:base");
  assert.ok(base.cssVars?.light, "base must define light CSS variables");
  assert.ok(base.cssVars?.dark, "base must define dark CSS variables");
  assert.ok(base.cssVars?.theme, "base must define theme CSS variables");
  assert.equal(base.registryDependencies?.length ?? 0, 0);

  for (const file of base.files ?? []) {
    assert.equal(forbiddenFileTypes.has(file.type), false, `forbidden registry file type: ${file.type}`);
    assert.equal(/\.(?:[cm]?[jt]sx?)$/i.test(file.path), false, `React/JS source is forbidden: ${file.path}`);
  }
});

test("checked-in generated registry artifact is valid and matches the source item", () => {
  assert.equal(existsSync(generatedItemPath), true, "run the registry build before committing");
  const generated = JSON.parse(readFileSync(generatedItemPath, "utf8"));
  assert.equal(generated.name, "mivama-base");
  assert.equal(generated.type, "registry:base");
});
