import assert from "node:assert/strict"
import { access, writeFile } from "node:fs/promises"
import path from "node:path"

import {
  getModuleExportSubpaths,
  getModuleImportSpecifiers,
} from "./lib/package-exports.mjs"
import { prepareIsolatedPackageConsumer } from "./lib/isolated-package-consumer.mjs"
import { runCommand } from "./lib/process.mjs"

const root = path.resolve(import.meta.dirname, "..")
const consumer = await prepareIsolatedPackageConsumer({
  root,
  tempPrefix: "mivama-ui-pack-",
  ignorePackScripts: true,
})

try {
  const { installedPackage, packageDir, workspace, commandOptions } = consumer
  const moduleSubpaths = getModuleExportSubpaths(installedPackage)
  const importSpecifiers = getModuleImportSpecifiers(installedPackage)

  const checkFile = path.join(workspace, "check.mjs")
  await writeFile(
    checkFile,
    `const specifiers = ${JSON.stringify(importSpecifiers)};\n` +
      "for (const specifier of specifiers) {\n" +
      "  const namespace = await import(specifier);\n" +
      "  if (Object.keys(namespace).length === 0) throw new Error(`Empty ESM module: ${specifier}`);\n" +
      "}\n" +
      "console.log(`Imported ${specifiers.length} public module entry points via ESM`);\n"
  )
  await runCommand(process.execPath, [checkFile], commandOptions)

  const checkCjsFile = path.join(workspace, "check.cjs")
  await writeFile(
    checkCjsFile,
    `const specifiers = ${JSON.stringify(importSpecifiers)};\n` +
      "for (const specifier of specifiers) {\n" +
      "  const mod = require(specifier);\n" +
      "  if (!mod || Object.keys(mod).length === 0) throw new Error(`Empty CJS module: ${specifier}`);\n" +
      "}\n" +
      "console.log(`Required ${specifiers.length} public module entry points via CJS`);\n"
  )
  await runCommand(process.execPath, [checkCjsFile], commandOptions)

  assert.deepEqual(installedPackage.sideEffects, ["**/*.css"])
  for (const stylesheet of ["styles.css"]) {
    assert.equal(
      installedPackage.exports[`./${stylesheet}`],
      `./dist/${stylesheet}`
    )
    await access(path.join(packageDir, "dist", stylesheet))
  }

  for (const [subpath, target] of Object.entries(installedPackage.exports)) {
    if (typeof target === "string") continue

    const esm = target.import
    const commonJs = target.require
    assert.equal(typeof esm, "object", `${subpath} is missing ESM export`)
    assert.equal(typeof commonJs, "object", `${subpath} is missing CJS export`)
    assert.equal(typeof esm.types, "string", `${subpath} is missing ESM types`)
    assert.equal(
      typeof esm.default,
      "string",
      `${subpath} is missing ESM runtime`
    )
    assert.equal(
      typeof commonJs.types,
      "string",
      `${subpath} is missing CommonJS types`
    )
    assert.equal(
      typeof commonJs.default,
      "string",
      `${subpath} is missing CommonJS runtime`
    )
    assert.equal(target.default, esm.default, `${subpath} default/ESM mismatch`)
    await access(path.join(packageDir, esm.default))
    await access(path.join(packageDir, commonJs.default))
    await access(path.join(packageDir, esm.types))
    await access(path.join(packageDir, commonJs.types))
  }

  console.log(
    `Validated packed ${installedPackage.name}@${installedPackage.version} with ${moduleSubpaths.length} module exports using ${consumer.packageLabel}`
  )
} finally {
  await consumer.cleanup()
}
