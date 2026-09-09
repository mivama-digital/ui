import assert from "node:assert/strict"
import test from "node:test"

import {
  baseRegistryEntries,
  buildReport,
  parseArgs,
  parsePinnedSha,
  renderProposal,
} from "../scripts/sync-upstream.mjs"

const basePath = "apps/v4/registry/bases/base/ui/"
const baselineSha = "1".repeat(40)
const targetSha = "2".repeat(40)

function entry(name, sha) {
  return {
    type: "blob",
    path: `${basePath}${name}.tsx`,
    sha,
  }
}

test("sync CLI accepts only explicit, non-empty options", () => {
  assert.deepEqual(parseArgs([]), {
    target: "main",
    writeProposal: false,
    help: false,
  })
  assert.deepEqual(parseArgs(["--target=next", "--write-proposal"]), {
    target: "next",
    writeProposal: true,
    help: false,
  })
  assert.throws(() => parseArgs(["--target"]), /requires a Git ref/)
  assert.throws(() => parseArgs(["--apply"]), /Unknown argument/)
})

test("baseline parser rejects an absent or short SHA", () => {
  assert.equal(
    parsePinnedSha(`- **Pinned Git SHA:** \`${baselineSha}\``),
    baselineSha
  )
  assert.throws(
    () => parsePinnedSha("- **Pinned Git SHA:** `deadbeef`"),
    /40-character/
  )
  assert.throws(() => parsePinnedSha("no pin"), /40-character/)
})

test("base-registry scanner excludes non-components and returns stable names", () => {
  const entries = baseRegistryEntries([
    entry("zebra", "z".repeat(40)),
    entry("alert", "a".repeat(40)),
    {
      type: "blob",
      path: `${basePath}examples/alert.tsx`,
      sha: "e".repeat(40),
    },
    {
      type: "blob",
      path: "apps/v4/registry/bases/base/hooks/use-mobile.ts",
      sha: "h".repeat(40),
    },
    {
      type: "tree",
      path: `${basePath}not-a-file.tsx`,
      sha: "t".repeat(40),
    },
  ])

  assert.deepEqual(
    entries.map((item) => item.name),
    ["alert", "zebra"]
  )
})

test("sync report distinguishes catalog changes from upstream-only changes", () => {
  const report = buildReport({
    baselineSha,
    targetSha,
    baselineTree: [
      entry("accordion", "a".repeat(40)),
      entry("removed", "r".repeat(40)),
      entry("unchanged", "u".repeat(40)),
    ],
    targetTree: [
      entry("accordion", "b".repeat(40)),
      entry("added", "c".repeat(40)),
      entry("unchanged", "u".repeat(40)),
    ],
    trackedSlugs: new Set(["accordion", "added"]),
  })

  assert.equal(report.changes.length, 3)
  assert.deepEqual(
    report.changes.map(({ name, status, tracked }) => ({
      name,
      status,
      tracked,
    })),
    [
      { name: "accordion", status: "changed", tracked: true },
      { name: "added", status: "added", tracked: true },
      { name: "removed", status: "removed", tracked: false },
    ]
  )
  assert.equal(report.trackedChanges.length, 2)
  assert.match(renderProposal(report), /draft-only detection proposal/)
  assert.match(renderProposal(report), /\| accordion \| changed \| yes \|/)
  assert.match(renderProposal(report), /\| removed \| removed \| no \|/)
  assert.match(
    renderProposal(report),
    new RegExp(`Candidate SHA: \`${targetSha}\``)
  )
})
