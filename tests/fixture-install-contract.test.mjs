import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const fixtureRoot = new URL("fixtures/next-app/", import.meta.url);
const componentsJsonPath = new URL("fixtures/next-app/components.json", import.meta.url);
const packageJsonPath = new URL("fixtures/next-app/package.json", import.meta.url);
const buttonPath = new URL("fixtures/next-app/components/ui/button.tsx", import.meta.url);
const cardPath = new URL("fixtures/next-app/components/ui/card.tsx", import.meta.url);

function getAllFiles(dir, files = []) {
  if (!existsSync(dir)) return files;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

test("fixture components.json defines pinned @mivama registry", () => {
  assert.equal(existsSync(componentsJsonPath), true, "components.json must exist");
  const config = JSON.parse(readFileSync(componentsJsonPath, "utf8"));
  assert.ok(config.registries?.["@mivama"], "@mivama registry must be defined");
  assert.match(
    config.registries["@mivama"],
    /^https:\/\/raw\.githubusercontent\.com\/mivama-digital\/ui\/[0-9a-f]{40}\/public\/r\/\{name\}\.json$/,
    "@mivama registry URL must use a 40-character commit SHA pin"
  );
});

test("fixture CSS contains Mivama light and dark design tokens", () => {
  const cssFiles = getAllFiles(new URL(".", fixtureRoot).pathname).filter((f) => f.endsWith(".css"));
  assert.ok(cssFiles.length > 0, "fixture must have at least one css file");
  const aggregatedCss = cssFiles.map((f) => readFileSync(f, "utf8")).join("\n");
  assert.match(aggregatedCss, /oklch\(0\.985\s+0\.004\s+257\)/, "must contain Mivama light background");
  assert.match(aggregatedCss, /#0c62ed/, "must contain Mivama primary");
  assert.match(aggregatedCss, /oklch\(0\.145\s+0\s+0\)/, "must contain Mivama dark background / foreground");
});

test("fixture contains official CLI generated button and card components", () => {
  assert.equal(existsSync(buttonPath), true, "components/ui/button.tsx must exist");
  assert.equal(existsSync(cardPath), true, "components/ui/card.tsx must exist");
  const buttonContent = readFileSync(buttonPath, "utf8");
  const cardContent = readFileSync(cardPath, "utf8");
  assert.doesNotMatch(buttonContent, /@mivama\/ui/, "button must not import @mivama/ui");
  assert.doesNotMatch(cardContent, /@mivama\/ui/, "card must not import @mivama/ui");
});

test("fixture package.json and sources have no @mivama/ui dependency or import", () => {
  assert.equal(existsSync(packageJsonPath), true, "package.json must exist");
  const pkg = JSON.parse(readFileSync(packageJsonPath, "utf8"));
  assert.equal(pkg.dependencies?.["@mivama/ui"], undefined, "no @mivama/ui dependency");
  assert.equal(pkg.devDependencies?.["@mivama/ui"], undefined, "no @mivama/ui devDependency");

  const files = getAllFiles(new URL(".", fixtureRoot).pathname).filter((f) =>
    /\.(?:[cm]?[jt]sx?|json|css)$/i.test(f)
  );
  for (const file of files) {
    if (file.endsWith("package.json") || file.endsWith("package-lock.json")) continue;
    const content = readFileSync(file, "utf8");
    assert.doesNotMatch(content, /@mivama\/ui/, `file ${file} must not contain @mivama/ui`);
  }
});
