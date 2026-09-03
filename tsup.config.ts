import { defineConfig } from "tsup"
import fs from "node:fs"
import path from "node:path"

// Dynamically resolve component subpath entries from src/components/ui
const uiDir = path.resolve(process.cwd(), "src/components/ui")
const uiEntries: Record<string, string> = {}

if (fs.existsSync(uiDir)) {
  for (const file of fs.readdirSync(uiDir)) {
    if (
      file.endsWith(".tsx") &&
      !file.includes(".test.") &&
      !file.includes(".stories.")
    ) {
      const name = path.basename(file, ".tsx")
      uiEntries[`components/ui/${name}`] = `src/components/ui/${file}`
    }
  }
}

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "components/mivama-provider": "src/components/mivama-provider.tsx",
    forms: "src/forms.ts",
    ...uiEntries,
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: false,
  target: "es2022",
  external: ["react", "react-dom"],
  treeshake: true,
  splitting: false,
  tsconfig: "tsconfig.build.json",
})
