`lazycodex-ai` CLI 是安装和诊断 harness 的入口。它应该通过 `npx` 运行，绝不要全局安装。

### 转发到 OmO

bin 会读取参数并转发给 `oh-my-openagent`。`install` 子命令会被特殊处理，以锁定 Codex platform target；其他参数原样透传。

**install** 会展开为：

```bash
npx lazycodex-ai install
# → npx --yes --package oh-my-openagent omo install --platform=codex
```

`install` 后面的参数会逐字追加：

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
# → npx --yes --package oh-my-openagent omo install --platform=codex --no-tui --codex-autonomous
```

**其他子命令**不会锁定 platform，直接转发：

```bash
npx lazycodex-ai <args...>
# → npx --yes --package oh-my-openagent omo <args...>
```

### install

```bash
npx lazycodex-ai install
```

一次性把 OmO agent harness 安装进 Codex：commands、skills、hooks、model routing 和 verification defaults。

如果要跳过 TUI，让 installer 自主运行：

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
```

### `--dry-run`

把 `--dry-run` 放在**第一个**参数位置，可以打印解析后的 `npx` 命令而不执行：

```bash
npx lazycodex-ai --dry-run install --no-tui --codex-autonomous
```

输出：

```text
npx --yes --package oh-my-openagent omo install --platform=codex --no-tui --codex-autonomous
```

转发前会移除 `--dry-run`，因此剩余参数会像真实运行一样解释。执行前可用它确认准确的 `omo` 调用。

### doctor

```bash
npx lazycodex-ai doctor
```

打印健康报告：已配置什么、缺少什么以及原因。它会检查 plugin cache、hooks、MCP servers、agent roles 和 Codex config state。当 hook pending、skill 未加载或 routing 看起来异常时，先运行它。

### 前置条件

- [Node.js](https://nodejs.org)：任一维护中的 LTS；`npx` 随 Node/npm 提供。installer **不需要** Bun。
- 已登录的 [OpenAI Codex CLI](https://github.com/openai/codex) 或 Codex app。

> 不要使用 `npm install -g` 或 `bun add -g`。始终通过 `npx` 调用。

### Marketplace 替代路径

作为一个附加的实验性路径，你也可以在 Codex 内安装：输入 `/plugins`，打开 **Add Marketplace** tab，输入 `https://github.com/code-yeongyu/lazycodex`，然后从 `sisyphuslabs` marketplace 安装 `omo`。或者用 CLI：

```bash
codex plugin marketplace add https://github.com/code-yeongyu/lazycodex
codex plugin add omo@sisyphuslabs
```

使用 `codex plugin marketplace upgrade sisyphuslabs` 升级。升级后 hooks 会显示为 **Modified**，这是预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配。重新批准后，下一个 session 会运行新版本 bootstrap。

上面的 npx installer 仍是主路径。完整流程见[安装](./installation.md)。

### 退出行为

bin 会用继承的 stdio 执行解析后的命令，并以该命令的 status code 退出。如果 `npx` 本身启动失败，它会打印错误并以非零状态退出。

### Session 内命令

安装后，LazyCodex 会在 Codex 内注册 OmO commands。它们是在 Codex 输入框中调用的 `$command`，不是 shell commands。语法和使用流程集中在 [Commands](./ulw-plan.md) section。
