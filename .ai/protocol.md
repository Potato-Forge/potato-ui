# Protocol — Potato UI Agent 协作协议

> Potato UI 对通用 `.ai/vendor/` 协议的项目接入说明。
> 通用规则见 `.ai/vendor/protocol.md`、`.ai/vendor/entry-contract.md`、`.ai/vendor/logging.md`。

## 生命周期 (B-MACS Cycle)

| 阶段 | 动作 | 负责方 | 产物 |
|------|------|--------|------|
| **B**ootstrap | 初始化 .ai/ 结构 | 人类 / 初始化脚本 | `.ai/core/`, `.ai/state/`, `.ai/logs/` |
| **M**ap | 将薄 Agent 入口写入工具约定文件 | `scripts/sync-adapters.py` | `AGENTS.md`, `CLAUDE.md`, `.cursorrules` |
| **A**ct | Agent 执行任务 | Agent | 代码变更 |
| **C**onfirm | 检查是否遵守协议 | Agent 自检 / 人类审查 | checklist 通过 |
| **S**ync | 反向同步经验 | Agent / 同步脚本 | `.ai/logs/`, `.ai/state/`, `.ai/core/decisions.md` |

## Map 阶段规则

### 输入
```
.ai/core/project.md       → 项目身份、技术栈、结构
.ai/core/architecture.md  → 架构分层、设计决策
.ai/core/conventions.md   → 编码规范、命名约定
.ai/core/decisions.md     → ADR 记录
.ai/state/current-task.md → 当前任务
.ai/state/handoff.md      → 交接信息
```

### 输出 (按 Agent)
```
adapters/codex.md    → AGENTS.md        (Codex CLI)
adapters/claude.md   → CLAUDE.md        (Claude Code)
adapters/cursor.md   → .cursorrules     (Cursor)
adapters/openclaw.md → AGENTS.md        (OpenClaw 变体)
adapters/hermes.md   → 注入 Hermes persona/skill
```

### 映射原则
1. **.ai/ 是唯一真理源** — 适配器不独立维护事实，只做格式转换
2. **硬约束必须内联** — 命名规范、技术栈限制等直接写入适配器，不依赖 Agent 主动读取
3. **软知识只索引** — 架构说明、ADR 背景等只引用路径，不复制进入口
4. **Agent 特性适配** — 同一个约束在不同 Agent 中的表达方式不同（见各适配器注释）
5. **入口是钥匙** — 入口文件不承载持续变化的记忆，任务进度只写 `.ai/state/`

## Act 阶段约束

Agent 执行任务时必须遵循：

### 强制性检查点
- [ ] 组件文件: `Pf<Name>.vue` 在 `src/components/pf-<name>/`
- [ ] UI 基元: `<Name>.vue` 在 `src/components/ui/<name>/`
- [ ] 导入路径: 内部用 `@/`，禁止 `../../../`
- [ ] 样式工具: `cn()` + UnoCSS 语义令牌 (`bg-primary`)
- [ ] 构建检查: 提交前 `pnpm typecheck` 通过
- [ ] 完成记录: `logs/` 使用无隐私、无情绪、总结式表达

### 禁止事项
- ❌ Tailwind CSS 类名或内联 style 对象
- ❌ 生成 `dist/` 或组件 bundle
- ❌ 在 Pf 组件中直接依赖 shadcn 基元组件作为 import
- ❌ 把大量日志写入 core/ 或 state/
- ❌ 把用户原话、思考流程、敏感信息写入可追踪 logs/
- ❌ 把项目事实写入 `.ai/vendor/`

## Sync 阶段协议

任务完成后，Agent 必须更新：

```
1. .ai/logs/YYYY-MM.md       ← 操作摘要 (≥3行: 做了什么/为什么/结果)
2. .ai/state/progress.md     ← 更新进度状态
3. .ai/state/handoff.md      ← 给下一个 Agent 的交接信息 (≤10行)
4. .ai/core/decisions.md     ← 如有新决策 (D<next> 格式)
5. .ai/state/current-task.md ← 如任务完成，更新为下一步
```

### Sync 格式约定
- **handoff.md**: 始终保持 ≤10 行关键信息
- **logs**: 按月归档，使用 What/Why/Result 的冷静项目事件格式，不重复写入 state/
- **decisions**: ADR 格式 `D<序号>: <标题>`，记录决策理由和后果
- **vendor**: 只记录通用 `.ai` 协议经验，不记录 Potato UI 项目事实

## 压缩规则

当 `.ai/` 过重时触发压缩：

| 源 | 动作 | 目标 |
|----|------|------|
| `logs/` 3 个月以上 | 提取长期知识 → core/，旧日志 → archive/ | 保持 logs/ 精炼 |
| `state/` 已完成项 | 移入 logs/ 摘要 → 清理 state/ | 保持 state/ 是当前状态 |
| `decisions.md` > 30 条 | 归档早期决策到 archive/decisions-archive.md | 保持决策文档可读 |

---

*协议版本: 1.0*
*最后更新: 2026-05-22*
