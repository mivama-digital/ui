import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { readFile } from "node:fs/promises"
import path from "node:path"
import test from "node:test"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const packageName = "@orevori/ui"
const legacyPackageName = "@orevori/mivama-ui"
const legacyNpmScope = "@mivama-digital"

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(root, relativePath), "utf8"))
}

test("all tracked consumer and release references use the Orevori package scope", async () => {
  const [packageJson, packageLock] = await Promise.all([
    readJson("package.json"),
    readJson("package-lock.json"),
  ])
  const trackedFiles = execFileSync("git", ["ls-files", "-z"], {
    cwd: root,
    encoding: "utf8",
  })
    .split("\0")
    .filter(Boolean)
    .filter((file) => file !== "tests/npm-package-scope.test.mjs")

  assert.equal(packageJson.name, packageName)
  assert.equal(packageLock.name, packageName)
  assert.equal(packageLock.packages?.[""]?.name, packageName)

  const legacyReferences = []
  for (const file of trackedFiles) {
    const content = await readFile(path.join(root, file), "utf8")
    if (
      content.includes(legacyPackageName) ||
      content.includes(legacyNpmScope)
    ) {
      legacyReferences.push(file)
    }
  }

  assert.deepEqual(
    legacyReferences,
    [],
    `legacy npm scope remains in: ${legacyReferences.join(", ")}`
  )
})
