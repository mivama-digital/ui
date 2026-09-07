import assert from "node:assert/strict"
import test from "node:test"

import { components } from "../config/components.mjs"
import { readJson, readRoot } from "./lib/source.mjs"

test("package metadata and lockfile agree on the current version", async () => {
  const [packageJson, lockfile] = await Promise.all([
    readJson("package.json"),
    readJson("package-lock.json"),
  ])

  assert.equal(lockfile.version, packageJson.version)
  assert.equal(lockfile.packages[""].version, packageJson.version)
})

test("all registry components have package subpath exports", async () => {
  const packageJson = await readJson("package.json")

  for (const { slug } of components) {
    const subpath = `./${slug}`
    assert.ok(packageJson.exports[subpath], `missing ${subpath} export`)
    assert.equal(typeof packageJson.exports[subpath].types, "string")
    assert.equal(typeof packageJson.exports[subpath].import, "string")
    assert.equal(typeof packageJson.exports[subpath].require, "string")
  }
})

test("package enforces sideEffects boundary and CSS export declarations", async () => {
  const packageJson = await readJson("package.json")

  assert.deepEqual(
    packageJson.sideEffects,
    ["**/*.css"],
    "Only CSS files may be marked as side effects"
  )
})

test("base primitives and root barrel do not leak heavy dependencies", async () => {
  const [buttonJs, dialogJs, cardJs] = await Promise.all([
    readRoot("dist/components/ui/button.js"),
    readRoot("dist/components/ui/dialog.js"),
    readRoot("dist/components/ui/card.js"),
  ])

  for (const dep of [
    "recharts",
    "@tanstack/react-table",
    "react-day-picker",
    "embla-carousel-react",
  ]) {
    assert.doesNotMatch(
      buttonJs,
      new RegExp(dep),
      `Button must not bundle or reference ${dep}`
    )
    assert.doesNotMatch(
      dialogJs,
      new RegExp(dep),
      `Dialog must not bundle or reference ${dep}`
    )
    assert.doesNotMatch(
      cardJs,
      new RegExp(dep),
      `Card must not bundle or reference ${dep}`
    )
  }
})

test("package exports cover maintained modules and stylesheets", async () => {
  const packageJson = await readJson("package.json")

  for (const subpath of [
    "button",
    "sheet",
    "card",
    "scroll-scene",
    "bento-grid",
    "forms",
  ]) {
    assert.ok(packageJson.exports[`./${subpath}`])
  }
  for (const stylesheet of ["styles.css", "tokens.css", "themes.css"]) {
    assert.equal(packageJson.exports[`./${stylesheet}`], `./dist/${stylesheet}`)
  }
})

test("manual packed-consumer guidance uses the generated archive name", async () => {
  const readme = await readRoot("README.md")

  assert.match(readme, /npm run verify/)
  assert.match(readme, /npm pack --ignore-scripts --pack-destination/)
  assert.match(readme, /archive=\$\(npm pack/)
  assert.match(readme, /vendor\/\$archive/)
  assert.doesNotMatch(readme, /mivama-ui-\d+\.\d+\.\d+\.tgz/)
})
