# codex-start-work-continuation

面向 omo-codex `start-work` skill 的 Codex Stop-hook continuation injector。

它会读取 hook payload `cwd` 中的 `.omo/boulder.json`，解析 active work，检查 active plan 中未完成的 top-level checkboxes，并在计划仍有工作时输出 Codex Stop-hook JSON：

```json
{"decision":"block","reason":"<directive>"}
```

`reason` 每次调用都从 `directive.md` 加载，并填入当前 plan state。当 `stop_hook_active` 为 `true`、没有 active Boulder work、work 已完成、active work 没有绑定到 `codex:<session_id>`，或所有 top-level plan checkboxes 都已完成时，hook 不输出内容。

它与 `plugin/skills/start-work/SKILL.md` 中的 `start-work` skill 配套使用。该 skill 会把带 `codex:` 前缀的 Codex session ids 写入 `.omo/boulder.json`，这样 hook 只能继续自己的 active Codex session。

## 计数的 plan checkboxes

只统计这些 sections 下 column-0 的 checkboxes：

- `## TODOs`
- `## Final Verification Wave`

`### Acceptance Criteria`、`### Evidence` 和 `### Definition of Done` 下的嵌套 checkboxes 会被忽略。

## Smoke test 烟雾测试

```bash
TMP=$(mktemp -d)
mkdir -p "$TMP/.omo/plans"
cat > "$TMP/.omo/plans/test.md" <<EOF
## TODOs
- [ ] Task one
- [ ] Task two
EOF
cat > "$TMP/.omo/boulder.json" <<EOF
{"schema_version":2,"active_work_id":"w1","works":{"w1":{"work_id":"w1","active_plan":".omo/plans/test.md","plan_name":"test","session_ids":["codex:smoke-session"],"status":"active"}}}
EOF
PAYLOAD='{"session_id":"smoke-session","turn_id":"t1","transcript_path":"","cwd":"'"$TMP"'","hook_event_name":"Stop","model":"gpt-5.5","permission_mode":"default","stop_hook_active":false}'
npm run build
echo "$PAYLOAD" | node dist/cli.js hook stop

PAYLOAD_LOOP='{"session_id":"smoke-session","turn_id":"t1","transcript_path":"","cwd":"'"$TMP"'","hook_event_name":"Stop","model":"gpt-5.5","permission_mode":"default","stop_hook_active":true}'
echo "$PAYLOAD_LOOP" | node dist/cli.js hook stop

rm -rf "$TMP"
```

第一条命令应打印包含 `"decision":"block"` 的 JSON；anti-loop 命令应不输出任何内容。

## 许可证

MIT. See `LICENSE`.

## 隐私

此 plugin 只读取本地 hook payloads、`.omo/boulder.json`、active plan 和 bundled directive。它不发起网络请求，也不存储 telemetry。
