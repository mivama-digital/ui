import { defineConfig } from "tsup"
import fs from "node:fs"
import path from "node:path"

function collectEntries(dir: string, base = ""): Record<string, string> {
  const entries: Record<string, string> = {}
  if (!fs.existsSync(dir)) return entries

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name)
    const relPath = base ? path.join(base, item.name) : item.name
    if (item.isDirectory()) {
      if (item.name === "fonts") continue
      Object.assign(entries, collectEntries(fullPath, relPath))
    } else if (
      /\.(ts|tsx)$/.test(item.name) &&
      !item.name.includes(".test.") &&
      !item.name.includes(".stories.")
    ) {
      const entryKey = relPath.replace(/\.(ts|tsx)$/, "")
      entries[entryKey] = fullPath
    }
  }
  return entries
}

const allEntries = collectEntries(path.resolve(process.cwd(), "src"))

export default defineConfig({
  entry: allEntries,
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: false,
  target: "es2022",
  external: ["react", "react-dom"],
  treeshake: true,
  splitting: false,
  bundle: false,
  tsconfig: "tsconfig.build.json",
})
