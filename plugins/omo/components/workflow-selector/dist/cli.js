#!/usr/bin/env node

// components/workflow-selector/src/cli.ts
import { stdin as processStdin, stdout as processStdout } from "node:process";

// components/workflow-selector/src/codex-hook.ts
import { readFileSync } from "node:fs";
import { env } from "node:process";
var AUTO_WORKFLOW_DIRECTIVE_MARKER = "<lazycodex-auto-workflow>";
var AUTO_WORKFLOW_FLAG_NAME = "OMO_CODEX_AUTO_WORKFLOW";
var TRANSCRIPT_SEARCH_BYTES = 512000;
var CONTEXT_PRESSURE_MARKERS = [
  "context compacted",
  "context_length_exceeded",
  "skill descriptions were shortened",
  "context_too_large",
  "codex ran out of room in the model's context window",
  "your input exceeds the context window",
  "long threads and multiple compactions"
];
var EXPLICIT_WORKFLOW_PATTERNS = [
  /\b(?:ultrawork|ulw)\b/i,
  /(?:^|\s)\$(?:init-deep|ulw-plan|start-work|ulw-loop)\b/i,
  /\bomo\s+ulw-loop\b/i
];
var DEBUGGING_PROMPT_PATTERNS = [
  /\b(?:fix|debug|diagnose|investigate)\b[\s\S]{0,80}\b(?:bug|failure|failing|failed|flaky|regression|error|crash|ci|test|tests|build|typecheck)\b/i,
  /\b(?:bug|failure|failing|failed|flaky|regression|error|crash|ci|test|tests|build|typecheck)\b[\s\S]{0,80}\b(?:fix|debug|diagnose|investigate|why)\b/i,
  /\bwhy (?:is|are|did|does|do)\b[\s\S]{0,80}\b(?:broken|failing|failed|error|crash|regress|ci)\b/i
];
var START_WORK_PROMPT_PATTERNS = [
  /\b(?:continue|resume|execute|start|run|work)\b[\s\S]{0,80}\b(?:approved|accepted|existing|current|ready)\b[\s\S]{0,80}\b(?:plan|workplan|prometheus plan)\b/i,
  /\b(?:approved|accepted|existing|current|ready)\b[\s\S]{0,80}\b(?:plan|workplan|prometheus plan)\b[\s\S]{0,80}\b(?:continue|resume|execute|start|run|work)\b/i
];
var PLANNING_PROMPT_PATTERNS = [
  /\b(?:add|build|implement|create|ship)\b[\s\S]{0,100}\b(?:feature|page|screen|flow|integration|dashboard|service|api)\b/i,
  /\b(?:large|broad|complex|multi[- ]?file|cross[- ]?module|architecture|architectural)\b[\s\S]{0,100}\b(?:change|refactor|feature|migration|rewrite|cleanup)\b/i,
  /\b(?:refactor|restructure|redesign|modernize|migrate|rewrite)\b[\s\S]{0,100}\b(?:flow|module|system|package|architecture|codebase|auth|api)\b/i
];
var WEAK_CONTEXT_PROMPT_PATTERNS = [
  /\b(?:new|unfamiliar|large|unknown)\b[\s\S]{0,80}\b(?:repo|repository|codebase|project)\b/i,
  /\b(?:onboard|understand|map|survey)\b[\s\S]{0,80}\b(?:repo|repository|codebase|project|architecture)\b/i
];
var AUTO_WORKFLOW_CONTEXT = [
  AUTO_WORKFLOW_DIRECTIVE_MARKER,
  "LazyCodex automatic workflow selection is enabled for this turn.",
  "",
  "Selection:"
];
var WORKFLOW_MATCHERS = [
  {
    name: "debugging or recovery work",
    patterns: DEBUGGING_PROMPT_PATTERNS,
    guidance: [
      "- Treat this as debugging or recovery work.",
      "- Prefer the `$ulw-loop` / `omo ulw-loop` verification loop before editing.",
      "- Preserve manual QA evidence for every claimed fix."
    ].join(`
`)
  },
  {
    name: "approved-plan continuation",
    patterns: START_WORK_PROMPT_PATTERNS,
    guidance: [
      "- Treat this as approved-plan continuation work.",
      "- Prefer `$start-work` so execution follows the existing plan instead of replanning.",
      "- Preserve the plan's acceptance criteria and evidence requirements."
    ].join(`
`)
  },
  {
    name: "weak-context repository onboarding",
    patterns: WEAK_CONTEXT_PROMPT_PATTERNS,
    guidance: [
      "- Treat this as weak-context repository onboarding.",
      "- Prefer `$init-deep` before broad implementation work.",
      "- If the repo is already mapped, continue with the existing project knowledge instead of remapping."
    ].join(`
`)
  },
  {
    name: "broad delivery work",
    patterns: PLANNING_PROMPT_PATTERNS,
    guidance: [
      "- Treat this as broad delivery work.",
      "- Prefer `$ulw-plan` before implementation, then continue with `$start-work` when the plan is ready.",
      "- If the prompt is actually a tiny edit, keep it in plain Codex instead."
    ].join(`
`)
  }
];
function runUserPromptSubmitHook(input, runtime = {}) {
  if (!isCodexUserPromptSubmitInput(input))
    return "";
  const hookEnv = runtime.hookEnv ?? env;
  if (!isAutoWorkflowEnabled(hookEnv))
    return "";
  const transcriptReader = runtime.transcriptReader ?? readTranscriptTail;
  if (isContextPressureRecoveryPrompt(input.prompt))
    return "";
  if (hasAutoWorkflowContextAlreadyInTranscript(input.transcript_path, transcriptReader))
    return "";
  if (isContextPressureTranscript(input.transcript_path, transcriptReader))
    return "";
  const autoWorkflowContext = buildAutoWorkflowContext(input.prompt, hookEnv);
  return autoWorkflowContext === null ? "" : formatAdditionalContextOutput(autoWorkflowContext);
}
function buildAutoWorkflowContext(prompt, hookEnv = env) {
  if (!isAutoWorkflowEnabled(hookEnv))
    return null;
  if (matchesAny(prompt, EXPLICIT_WORKFLOW_PATTERNS))
    return null;
  const selection = selectAutoWorkflow(prompt);
  if (selection === null)
    return null;
  return [
    ...AUTO_WORKFLOW_CONTEXT,
    selection,
    "</lazycodex-auto-workflow>"
  ].join(`
`);
}
function isAutoWorkflowEnabled(hookEnv) {
  const rawFlag = hookEnv[AUTO_WORKFLOW_FLAG_NAME];
  if (rawFlag === undefined)
    return false;
  return /^(?:1|true|yes|on)$/i.test(rawFlag);
}
function selectAutoWorkflow(prompt) {
  const matches = WORKFLOW_MATCHERS.filter((workflow) => matchesAny(prompt, workflow.patterns));
  if (matches.length === 0)
    return null;
  if (matches.length > 1) {
    return [
      "- Several LazyCodex workflows may fit this prompt.",
      `- Ask one concise confirmation before escalating: ${matches.map((match) => match.name).join(", ")}.`,
      "- Keep the turn plain if the user confirms this is a small direct edit."
    ].join(`
`);
  }
  return matches[0]?.guidance ?? null;
}
function hasAutoWorkflowContextAlreadyInTranscript(transcriptPath, transcriptReader) {
  if (transcriptPath === undefined || transcriptPath === null)
    return false;
  try {
    const rawTranscript = transcriptReader(transcriptPath);
    for (const line of rawTranscript.split(/\r?\n/)) {
      const parsed = parseJsonLine(line);
      if (!isRecord(parsed))
        continue;
      const hookSpecificOutput = parsed["hookSpecificOutput"];
      if (!isRecord(hookSpecificOutput))
        continue;
      if (hookSpecificOutput["hookEventName"] !== "UserPromptSubmit")
        continue;
      if (typeof hookSpecificOutput["additionalContext"] === "string" && hookSpecificOutput["additionalContext"].includes(AUTO_WORKFLOW_DIRECTIVE_MARKER)) {
        return true;
      }
    }
  } catch (error) {
    if (error instanceof Error)
      return false;
    throw error;
  }
  return false;
}
function readTranscriptTail(transcriptPath) {
  const rawTranscript = readFileSync(transcriptPath);
  return rawTranscript.subarray(Math.max(0, rawTranscript.byteLength - TRANSCRIPT_SEARCH_BYTES)).toString("utf8");
}
function isContextPressureRecoveryPrompt(prompt) {
  const normalizedPrompt = prompt.toLowerCase();
  return CONTEXT_PRESSURE_MARKERS.some((marker) => normalizedPrompt.includes(marker));
}
function isContextPressureTranscript(transcriptPath, transcriptReader) {
  if (transcriptPath === undefined || transcriptPath === null)
    return false;
  try {
    return isContextPressureRecoveryPrompt(transcriptReader(transcriptPath));
  } catch (error) {
    if (error instanceof Error)
      return false;
    throw error;
  }
}
function formatAdditionalContextOutput(additionalContext) {
  const normalizedContext = normalizeAdditionalContext(additionalContext);
  if (normalizedContext.length === 0)
    return "";
  const output = {
    hookSpecificOutput: {
      hookEventName: "UserPromptSubmit",
      additionalContext: normalizedContext
    }
  };
  return `${JSON.stringify(output)}
`;
}
function normalizeAdditionalContext(additionalContext) {
  return additionalContext.replace(/\r\n/g, `
`).replace(/\r/g, `
`).trim();
}
function parseJsonLine(line) {
  if (line.trim().length === 0)
    return null;
  try {
    const parsed = JSON.parse(line);
    return parsed;
  } catch (error) {
    if (error instanceof Error)
      return null;
    throw error;
  }
}
function matchesAny(prompt, patterns) {
  return patterns.some((pattern) => pattern.test(prompt));
}
function isCodexUserPromptSubmitInput(value) {
  return isRecord(value) && value["hook_event_name"] === "UserPromptSubmit" && typeof value["prompt"] === "string" && (value["transcript_path"] === undefined || value["transcript_path"] === null || typeof value["transcript_path"] === "string");
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// components/workflow-selector/src/cli.ts
var command = process.argv[2];
var subcommand = process.argv[3];
if (command === "hook" && subcommand === "user-prompt-submit") {
  await runHookCli();
} else {
  process.stderr.write(`Usage: omo-workflow-selector hook user-prompt-submit
`);
  process.exitCode = 1;
}
async function runHookCli() {
  const raw = await readStdin();
  if (raw.trim().length === 0)
    return;
  const parsed = parseHookInput(raw);
  const output = runUserPromptSubmitHook(parsed);
  if (output.length > 0)
    processStdout.write(output);
}
function parseHookInput(raw) {
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (error) {
    if (error instanceof SyntaxError)
      return;
    throw error;
  }
}
function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    processStdin.setEncoding("utf8");
    processStdin.on("data", (chunk) => {
      data += chunk;
    });
    processStdin.once("error", () => resolve(data));
    processStdin.once("end", () => resolve(data));
  });
}
