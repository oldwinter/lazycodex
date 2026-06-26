LazyCodex 最顺滑的运行环境是 Ubuntu 或 macOS。harness 依赖 shell、Git、Node.js/npm、Codex 配置文件和 hooks，这些在类 Unix 系统上表现最可预测。

### 操作系统

| OS | Recommendation | Notes |
| --- | --- | --- |
| **Ubuntu** | 最推荐 | 服务器和开发环境都有可预测的路径、shell 和包管理。 |
| **macOS** | 推荐 | 适合本地开发。Homebrew 加 Node.js/npm 就够了。 |
| **Windows** | 不推荐 | 原生 Windows shell 和路径差异会给 hooks、CLI、文件权限和脚本执行带来不必要摩擦。 |

如果必须使用 Windows，建议在 **WSL2 Ubuntu** 内运行 Codex 和 LazyCodex，而不是原生 Windows。把项目放在 WSL2 文件系统中，体验最稳定。

### 安装前

| Item | Expected state |
| --- | --- |
| Codex | 已安装并登录 Codex App 或 Codex CLI。 |
| Node.js/npm | 维护中的 Node.js LTS。`npx` 随 npm 提供。 |
| Project | 在 Codex 中打开一个你要处理的仓库。 |
| Git | 仓库应使用 Git，方便追踪和回滚改动。 |
| Secrets | Provider keys 放在 shell 或 Codex 环境里，绝不粘贴进项目文件。 |

除非你要从源码构建 LazyCodex，否则**不需要**安装 Bun。正常安装和使用都走 `npx` 路径。

先检查版本：

```bash
node -v
npm -v
npx -v
```

如果缺失，安装 Node.js：

```bash
# Ubuntu or WSL2 Ubuntu
sudo apt update
sudo apt install -y nodejs npm

# macOS
brew install node
```

### 作者建议

- **从 Codex App 开始。** 安装、登录、会话管理和 skill 调用都能在 GUI 里看到，对第一次使用的人更不容易困惑。
- **使用 ChatGPT Pro 或更高档位。** 本文档默认你使用的是 ChatGPT Pro 及以上附带的 Codex 使用环境。
- **先试裸 Codex。** 如果你从未用过 coding agent，先单独用一次 Codex，再叠加 LazyCodex。理解基础 agent 如何回应和改文件，会让 harness 层更容易掌握。
- **坚持使用支持的模型。** 不建议混入 GLM、Kimi、Mimo 或其他非默认模型栈。文档和 skill flows 都围绕 Codex 与 OmO 默认设置编写。
