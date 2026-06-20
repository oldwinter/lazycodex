Multi-model routing 会把一次运行的不同部分发送到更适合的模型，而不是所有工作都塞给同一个模型。LazyCodex 会把 OmO 的 routing defaults 安装进 Codex，让严肃仓库不被单个 context window 或 price point 卡住。

### 什么会被路由

- **规划与探索** 交给强推理模型，它能容纳更大上下文并权衡取舍。
- **实现回合** 交给快速、能干的 coding model，承担大部分 edit loop。
- **验证** 交给作为 oracle 使用的模型，优先看 judgment 而不是 throughput。
- **专门 skills** 在某个 skill 需要特定 profile 时，可以定位到自己的模型。

### 它如何适配 harness

Routing 是 `npx lazycodex-ai install` 写入 Codex 的 harness setup 的一部分。它会检测可用订阅和 provider auth，然后把 roles 映射到 models，避免你手动配置每个角色。

### Provider 认证

认证目标是 Codex 本身，不是 LazyCodex。Codex 登录后，安装器的 subscription detection 和 provider routing 会接管。如果你让 LLM agent 运行安装，它会走同样的检测和选择流程。

### 自定义

Routing 和 provider settings 存放在配置里。控制哪个模型处理哪个角色、如何按项目覆盖默认值，见 [配置](./configuration.md)。
