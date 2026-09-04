import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import path from "node:path"

import { bundleSizeMetrics, measureBundleSize } from "./lib/bundle-size.mjs"

const root = path.resolve(import.meta.dirname, "..")
const budgets = {
  "dist/index.js": { raw: 10_000, gzip: 3_000, brotli: 2_500 },
  "dist/components/ui/button.js": { raw: 5_500, gzip: 1_900, brotli: 1_700 },
  "dist/components/ui/dialog.js": { raw: 15_000, gzip: 4_200, brotli: 3_800 },
  "dist/components/ui/sheet.js": { raw: 15_000, gzip: 4_200, brotli: 3_800 },
  "dist/components/ui/tooltip.js": { raw: 7_500, gzip: 2_200, brotli: 1_900 },
  "dist/components/ui/sidebar.js": { raw: 48_000, gzip: 10_500, brotli: 9_200 },
  "dist/styles.css": { raw: 120_000, gzip: 22_000, brotli: 18_000 },
  "dist/tokens.css": { raw: 6_200, gzip: 1_500, brotli: 1_300 },
  "dist/themes.css": { raw: 8_500, gzip: 1_750, brotli: 1_500 },
}

const results = []
for (const [relativePath, limits] of Object.entries(budgets)) {
  const content = await readFile(path.join(root, relativePath))
  const sizes = measureBundleSize(content)
  results.push({ relativePath, sizes, limits })

  for (const metric of bundleSizeMetrics) {
    assert.ok(
      sizes[metric] <= limits[metric],
      `${relativePath} ${metric} is ${sizes[metric]} bytes and exceeds its ${limits[metric]} byte budget`
    )
  }
}

for (const { relativePath, sizes, limits } of results) {
  const metrics = bundleSizeMetrics.map((metric) => {
    const percentage = Math.round((sizes[metric] / limits[metric]) * 100)
    return `${metric}=${sizes[metric]}/${limits[metric]} (${percentage}%)`
  })
  console.log(`${relativePath}: ${metrics.join(", ")}`)
}
