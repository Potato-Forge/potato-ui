# .ai — Potato UI AI Memory System

> 共享项目认知层 · Shared Project Cognitive Layer

## 这是什么？

`.ai/` 是多个 AI Agent（OpenClaw、Codex、Copilot、Cursor、Claude Code 等）共享的项目认知层。
它把通用协议、项目事实、当前状态、冷静日志和本地隐私分层存储，让每个 Agent 都能快速理解项目并保持上下文连贯。

## 目录结构

```
.ai/
├── README.md              # ← 你在这
├── vendor/                # 通用协议层（项目无关，可抽离为启动核心）
│   ├── README.md          # vendor 层边界
│   ├── protocol.md        # 通用生命周期
│   ├── entry-contract.md  # Agent 入口契约
│   ├── logging.md         # logs 脱敏与摘要规范
│   ├── privacy.md         # 隐私边界
│   └── manifest.json      # vendor 元数据
├── core/                  # 长期稳定记忆
│   ├── project.md         # 项目目标、技术栈、代码库概况
│   ├── architecture.md    # 架构设计、分层、组件规范
│   ├── conventions.md     # 编码规范、命名约定、代码模式
│   ├── decisions.md       # 重要技术决策记录（ADR 风格）
│   └── glossary.md        # 术语表、组件命名规则
├── state/                 # 当前开发状态
│   ├── current-task.md    # 当前任务、阻塞、下一步
│   ├── progress.md        # 进度跟踪、完成度
│   ├── known-issues.md    # 已知问题、技术债
│   └── handoff.md         # Agent 交接信息（保持精简）
├── logs/                  # 开发过程日志
│   └── YYYY-MM.md         # 按月归档
├── private/               # 本地隐私层（不入 git，可选）
├── .gitignore             # .ai 内部忽略规则
└── archive/               # 压缩归档旧日志
```

## 分层原则

| 层 | 内容 | 更新频率 | 项目相关 |
|----|------|----------|----------|
| `vendor/` | 通用 .ai 协议、入口契约、隐私与日志规范 | 低 | 否 |
| `core/` | 项目身份、架构、约定、ADR、术语 | 低 | 是 |
| `state/` | 当前任务、进度、已知问题、交接 | 中高 | 是 |
| `logs/` | 无情绪、无隐私的项目事件账本 | 高 | 是 |
| `private/` | 用户原话、思考流程、本地环境、敏感信息 | 按需 | 本地 |

Agent 入口文件只是“钥匙”：保留硬约束、索引和收尾协议，不复制 `.ai/core/` 或 `.ai/state/` 中会持续变化的内容。

## Agent 协作协议

### 首次进入项目

无论是哪个 Agent，首次进入项目时：

1. **必读** `core/project.md` — 理解项目目标和整体结构
2. **必读** `core/architecture.md` — 理解架构分层
3. **必读** `state/current-task.md` — 知道当前在做什么
4. **必读** `state/handoff.md` — 上一个 Agent 的交接信息
5. **建议读** `core/conventions.md` — 知道怎么写代码
6. **按需读** `core/decisions.md` 和 `core/glossary.md`
7. **协议问题读** `vendor/` — 了解通用 .ai 使用规范

### 完成任务后

每次完成一个任务（无论大小），必须同步更新：

1. **`logs/YYYY-MM.md`** — 记录做了什么、为什么、结果如何
2. **`state/progress.md`** — 更新进度
3. **`state/handoff.md`** — 更新交接信息
4. **`state/current-task.md`** — 如果任务完成，更新为下一步

### 修改核心设计时

1. 更新对应的 `core/*.md`
2. 在 `core/decisions.md` 记录决策变更
3. 在 `logs/YYYY-MM.md` 记录变更原因

### 禁止事项

- ❌ 不要把大量原始日志写入 core/ 或 state/
- ❌ 不要复制粘贴整个文件内容作为上下文
- ❌ 不要忽略 .ai/ 更新就去写代码
- ❌ 不要在 handoff.md 里写长篇大论
- ❌ 不要把用户原话、思考流程、敏感信息写入可追踪 logs/
- ❌ 不要把项目事实写入 vendor/
- ❌ 不要让 .ai/ 超过合理体积，定期压缩到 archive/

## 压缩规则

- **logs/** 是事件流，不是永久上下文
- 当 logs 内容过长时：提取长期有效知识 → core/，提取当前状态 → state/，旧日志 → archive/
- 禁止将历史日志直接重复写入 state 或 core

---

*最后更新: 2026-05-21*
*维护者: 豆芽 (OpenClaw Agent)*
