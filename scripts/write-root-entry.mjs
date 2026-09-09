import fs from "node:fs"
import path from "node:path"

const dist = path.resolve(process.cwd(), "dist")

if (!fs.existsSync(dist)) {
  throw new Error(
    "dist/ does not exist — run the package build before generating the root entry"
  )
}

const componentDir = path.join(dist, "components", "ui")
const esmModules = fs
  .readdirSync(componentDir)
  .filter((name) => name.endsWith(".js") && !name.endsWith(".js.map"))
  .map((name) => `./components/ui/${name}`)
  .sort()

if (esmModules.length === 0) {
  throw new Error("No built public modules found in dist/")
}

const esm = [
  '"use client";',
  ...esmModules.map((modulePath) => `export * from "${modulePath}";`),
  "",
].join("\n")
const cjs = [
  '"use client";',
  ...esmModules.map(
    (modulePath) =>
      `Object.assign(exports, require("${modulePath.replace(/\.js$/, ".cjs")}"));`
  ),
  "",
].join("\n")

fs.writeFileSync(path.join(dist, "index.js"), esm)
fs.writeFileSync(path.join(dist, "index.cjs"), cjs)
console.log(`Wrote lazy root entries for ${esmModules.length} public modules`)
