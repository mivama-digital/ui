import assert from "node:assert/strict"
import test from "node:test"

import { readJson } from "./lib/source.mjs"

const APPROVED_RUNTIME_DEPENDENCIES = new Set([
  "@base-ui/react",
  "@tanstack/react-table",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "embla-carousel-react",
  "input-otp",
  "lucide-react",
  "react-day-picker",
  "react-resizable-panels",
  "recharts",
  "tailwind-merge",
  "tw-animate-css",
])

test("runtime dependencies match only the approved set", async () => {
  const packageJson = await readJson("package.json")
  const currentDependencies = Object.keys(packageJson.dependencies || {})

  for (const dep of currentDependencies) {
    assert.ok(
      APPROVED_RUNTIME_DEPENDENCIES.has(dep),
      `Unapproved runtime dependency detected: ${dep}`
    )
  }

  for (const dep of APPROVED_RUNTIME_DEPENDENCIES) {
    assert.ok(
      dep in packageJson.dependencies,
      `Expected approved runtime dependency missing: ${dep}`
    )
  }
})

test("no radix primitives exist in dependencies or devDependencies", async () => {
  const packageJson = await readJson("package.json")
  const allDeps = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ]

  for (const dep of allDeps) {
    assert.ok(
      !dep.startsWith("@radix-ui/") && dep !== "radix-ui",
      `Forbidden Radix dependency detected: ${dep}`
    )
  }
})

test("no vaul primitives exist in dependencies or devDependencies", async () => {
  const packageJson = await readJson("package.json")
  const allDeps = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
  ]

  for (const dep of allDeps) {
    assert.ok(
      dep !== "vaul" && !dep.startsWith("@vaul"),
      `Forbidden Vaul dependency detected: ${dep}`
    )
  }
})
