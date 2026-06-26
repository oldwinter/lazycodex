`lazycodex.ai` 文档站会自动部署到 Cloudflare Workers。Web 没有手动发布步骤；只要推送到 `main` 且改动触及 web package，就会发布。

### 触发条件

`Web Deploy (Cloudflare Workers)` workflow 会在推送到 `main` 且 `packages/web/**` 或 workflow 文件本身发生变化时运行，也支持手动 `workflow_dispatch`。按 ref 分组的 concurrency 会串行化运行，并且不会取消正在进行的部署。

### 构建

在 `packages/web` 内，prebuild 步骤会从 `content/docs/*.md` 重新生成 `lib/docs-content.generated.ts`。随后站点用面向 Cloudflare 的 OpenNext 构建（`pnpm exec opennextjs-cloudflare build`）。

### 部署

`cloudflare/wrangler-action@v4` 会针对 `web-production` 环境运行 `wrangler deploy`（提供 environment 时运行 `deploy --env <environment>`）。该环境的 URL 是 `https://lazycodex.ai`。

### 部署后冒烟检查

任一检查失败都会让 workflow 失败：

- Apex `https://lazycodex.ai/` 返回 `200`。
- `www.lazycodex.ai`、`lazycodex.dev` 和 `www.lazycodex.dev` 都返回 `301`，并重定向到 `https://lazycodex.ai`。

PageSpeed Insights 会在移动端和桌面端审计线上 URL 的 Lighthouse performance、accessibility、best-practices 和 SEO 100/100/100/100。这里它是非阻塞检查，因为 PSI 共享额度会限制频繁 CI；真正门禁级的 Lighthouse 检查在 `web-ci.yml` 中通过真实 Playwright Chromium 运行。

### 本地预览

```bash
cd packages/web
pnpm preview   # opennextjs-cloudflare build && preview
pnpm deploy    # build && deploy (requires Cloudflare auth)
```

### 继续阅读

- [Skills](./skills.md)：文档站覆盖的能力。
- [配置](./configuration.md)：会影响构建的可调参数。
