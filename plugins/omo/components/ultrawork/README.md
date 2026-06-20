# codex-ultrawork

这个 Codex plugin 会在用户 prompt 包含 `ultrawork` 或 `ulw`（word-bounded、case-insensitive）时，注入一段紧凑 orchestration directive（**ultrawork** prompt）。

`agents/` 中 bundled Codex agent role TOMLs 会由 omo-codex installer 安装到 `CODEX_HOME/agents/`（`linkCachedPluginAgents`，位于 `src/cli/install-codex/link-cached-plugin-agents.ts`）。安装时在每个平台写入普通文件副本。对于 public `sisyphuslabs` marketplace，这些文件从 Codex 的本地 installed-marketplace snapshot 复制，因此即使 Codex 清理旧 plugin-cache versions 或临时 marketplace state，它们仍能解析。没有 runtime Python hook。

## 注入 directive 强制什么

| 要求 | 行为 |
|---|---|
| Goal + binding success criteria | 调用 `create_goal`（或用 `# Goal` block 开场），列出 deliverable + **3+ realistic QA scenarios**（happy path、edge cases、adjacent-surface regression）。每个 scenario 必须说明使用哪个 **Manual-QA channel**。"Tests pass" 只是 supporting signal，绝不是 completion proof。 |
| Manual-QA channels (TESTS ALONE NEVER PROVE DONE) | 专门的顶层 section 枚举 **四种**可在现实中验证 criterion 的 channel：**(1) HTTP call**（`curl -i` / Playwright APIRequestContext）、**(2) tmux**（`tmux new-session` + `send-keys` + `capture-pane`）、**(3) Browser use**（Playwright / puppeteer / Chromium 驱动真实页面）、**(4) Computer use**（针对运行中 app 的 OS-level GUI automation）。每个 criterion 选择一个 channel，构建真实使用 scenario，运行并捕获 artifact。Aux surfaces（CLI stdout / DB diff / parsed config）只在 criterion 本身确实是 CLI 或 data 形态时才算数。 |
| Surface + paired cleanup | Execution loop step 4（**SURFACE-AS-SCENARIO**）端到端运行所选 channel scenario。Step 5（**CLEANUP, PAIRED**）清理每个 QA-spawned process / tmux session / browser context / container / port / temp dir，并向 notepad 追加一行 receipt。残留状态 => NOT done。 |
| Durable /tmp notepad | `mktemp -t ulw-$(date +%Y%m%d-%H%M%S).XXXXXX.md`，包含 `Plan`、`Success criteria + QA scenarios`、`Now`、`Todo`、`Findings`、`Learnings` sections。**Append**，不要 rewrite。 |
| Obsessive atomic todos | 每个动作，包括一行编辑、`ls`、单次 test run，都成为 todo。格式：`path: <action> for <criterion> — verify by <check>`。一次只允许一个 in_progress，并立即标记 completed。 |
| ChatGPT-compatible high-reasoning verification gate | 在用户要求 rigor、3+ files、20+ turns、30+ minutes，或 refactor/migration/perf/security work 时自动触发。可选角色可用时，使用 `lazycodex-code-reviewer`、`lazycodex-qa-executor` 和 `lazycodex-gate-reviewer`。Reviewer verdict 具有**约束力**：不能说 "false positive"，不能弱化，不能争辩。循环直到 **unconditional** approval。"Looks good but..." = REJECTION。 |

directive 当前为 10,951 chars / 231 lines，并遵循 GPT-5.5 prompting structure（Role / Goal / Manual-QA channels / Bootstrap / Execution loop / Verification gate / Commits / Constraints / Output / Stop rules）。

## 安装（通过此 marketplace）

```bash
npx lazycodex-ai install
```

安装器会把 plugin 复制到 `~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0`，在 `~/.codex/.tmp/marketplaces/sisyphuslabs/` 写入 Codex marketplace snapshot，从 `lazycodex` Git 仓库注册 `sisyphuslabs` marketplace，在 `~/.codex/config.toml` 中启用 `omo@sisyphuslabs`，注册 `UserPromptSubmit` hook，并把 bundled agent TOMLs 作为普通文件安装到 `~/.codex/agents/`。`.installed-agents.json` manifest 会写到 bundled TOMLs source root 旁，用于干净卸载 tracking。

## 工作方式

`hooks/hooks.json` 注册一个 `UserPromptSubmit` hook：

```text
node ${PLUGIN_ROOT}/dist/cli.js hook user-prompt-submit
```

Codex 通过 stdin 传入 prompt payload。当 pattern `\b(?:ultrawork|ulw)\b`（case-insensitive）匹配时，hook 把 directive 写到 stdout，Codex 会把非 JSON stdout 作为下一轮的 `additional_context` 注入。否则 hook 不输出并 exit 0。Malformed input 也 exit 0，避免阻塞回合。

如果 transcript JSONL 中之前的 `UserPromptSubmit` hook output 已包含 `<ultrawork-mode>`，hook 会抑制自己，避免重复注入同一 directive。普通 transcript text 中的 `<ultrawork-mode>` 会被忽略，除非它来自 hook output。

`agents/` 中 bundled agent role TOMLs 在安装时发布到 `CODEX_HOME/agents/`，不是 runtime hook。安装器在 Linux、macOS 和 Windows 上写入普通文件副本。对于 public marketplace，source 是 installed-marketplace snapshot，而不是 versioned plugin cache，因此当 Codex auto-update 替换 `~/.codex/plugins/cache/sisyphuslabs/omo/<version>/` 或移除临时 marketplace state 时，agent role configs 仍然有效。两条 code paths 都会覆盖 stale files，并在 source root 旁写入 `.installed-agents.json` manifest 用于 clean uninstall tracking。

## Smoke test 烟雾测试

```bash
PAYLOAD='{"cwd":"/tmp","hook_event_name":"UserPromptSubmit","model":"gpt-5.5","permission_mode":"default","session_id":"x","transcript_path":"","turn_id":"y","prompt":"please ultrawork"}'
npm run build
echo "$PAYLOAD" | node dist/cli.js hook user-prompt-submit | head -3
```

预期输出 `<ultrawork-mode>` ... directive body。

## Agent role 烟雾测试

运行 `npx lazycodex-ai install`，然后检查 `~/.codex/agents/`。每个平台都应看到普通 `.toml` 文件。每个 TOML 都应声明非空 `name`、`description` 和 `developer_instructions`。

## 许可证

MIT. See `LICENSE`.

## 隐私

此 plugin 只读取本地 hook payloads，并在 keyword match 时输出 bundled directive text。Bundled agent TOML files 会在安装时发布到 `CODEX_HOME/agents/`。该组件不发起网络调用，也没有 telemetry。
