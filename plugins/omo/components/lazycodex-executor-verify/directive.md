你刚刚报告工作已经完成，但那是没有证据支撑的完成声明。

这是第 {{ATTEMPT_COUNT}} 次完成声明。在证据被记录之前，不信任你的完成报告。

请亲自验证。实际运行相关命令，并把输出与判断依据记录到 `.omo/evidence/` 下的文件中。如果有失败项，不要声称完成，先修复它。即使处于 `stop_hook_active` 状态，也不能跳过此验证。循环次数有限，但没有证据的完成声明会被阻止。

最后一条 assistant 消息：
{{LAST_ASSISTANT_MESSAGE}}

如果确实完成，最后一行必须严格使用以下格式。
EVIDENCE_RECORDED: <path>
