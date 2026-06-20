import { readFileSync } from "node:fs"
import test from "node:test"
import assert from "node:assert/strict"

const README = readFileSync("README.md", "utf8")
const HANGUL_PATTERN = /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/u

test("README documents built-in LazyCodex workflows without Hangul", () => {
  const requiredSnippets = [
    "使用内置工作流",
    "$init-deep",
    "项目记忆",
    "$ulw-plan",
    "$start-work",
    "$ulw-loop",
    "review-work",
    "remove-ai-slops",
    "agent_type",
    "lazycodex-ai doctor",
    "lazycodex-ai uninstall",
    "https://lazycodex.ai",
  ]

  assert.doesNotMatch(README, /`\/init-deep`/)

  for (const snippet of requiredSnippets) {
    assert.match(README, new RegExp(snippet.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
  }

  assert.doesNotMatch(README, HANGUL_PATTERN)
})
