严格的测试驱动开发，是让 harness 可以不靠希望就把工作称为“完成”的纪律。每项改动都按 red -> green -> refactor 的顺序推进。顺序反过来，就是在写 speculative code。

### 顺序

1. **Red.** 写一个失败测试，用 `Given / When / Then` 说明行为。运行它，确认失败原因正确，不是拼写错误或缺少 import。
2. **Green.** 写最少代码让测试通过。第一个 case 通过前，不要加第二个；第二个 case 是下一轮 red。
3. **Refactor.** 测试变绿后，才大胆重构。如果测试让重构很困难，说明测试本身不好，先修测试再修代码。

### 测试金字塔

每个功能都要带上三层测试：大量快速 unit tests（覆盖 happy、edge、boundary 和 error paths 的纯函数正确性，每个 < 10ms），一些通过 testcontainers 或 httptest 连接真实下游的 integration tests（每个 < 1s），以及少量 E2E scenarios，通过真实表面驱动 binary 并断言可观察结果。没有 E2E 覆盖的功能还没完成，即使所有 unit tests 都通过。

### 必须确定性，否则就是坏的

一个 10 次通过 9 次的测试，就是有 10% 的失败率。除非时间本身就是被测系统，否则测试体里禁止使用 `setTimeout(resolve, N)`、`await sleep(N)` 或“等够久让 X 发生”。替代方案是 subscribe-first、timeout-bound：先注册 listener，再触发事件，并与显式 circuit breaker 竞争；超时时要给出有用错误信息。整个 repo 必须能在单个进程、一次运行里通过 `bun test`，不靠隔离 flag，也不靠 retries。

### Prompt 测试断言行为，不断言文本

测试构造 LLM prompt 的代码时，不要固定当前措辞（例如 `toContain("You are Sisyphus")`、`toMatchSnapshot`、`toBe(EXPECTED_PROMPT)`）。应断言逻辑保证的结构性不变量，例如 conditional branch、negative branch、redaction、skill inclusion/exclusion。测试会破坏行为的东西，不测试只会让 diff 变动的东西。

### 五个证据门禁

执行期间，lifecycle 会在步骤关闭前强制五个门禁：plan reread、automated verification、[manual QA](./manual-qa.md)、adversarial QA 和 cleanup。无法通过门禁的步骤不会前进，不管状态文本声称什么。

### 继续阅读

- [ultrawork mode](./ultrawork.md)：让循环具备约束力的模式。
- [start-work](./start-work.md)：五个门禁在每个 checkbox 上落地的地方。
