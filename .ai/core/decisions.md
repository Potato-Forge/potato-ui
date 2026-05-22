# Decisions (ADR)

## D001: 源码分发而非 npm 包

**决策**: Pf-UI 采用 shadcn/ui 的源码分发模型，组件源码安装到消费项目而非通过 `node_modules` 引入。

**理由**:
- 组件可审查、可定制、可 fork
- 避免版本锁定和依赖地狱
- 与 Potato Template 生态的"模板化"理念一致
- 消费项目只需安装实际使用的依赖

**后果**: 不能 `import { PfButton } from '@potato-ui/vue'`；Registry 构建系统成为必需。

---

## D002: 仅支持 Vue 3 + UnoCSS Web

**决策**: 第一阶段仅支持 Vue 3 + UnoCSS Web 目标。

**理由**:
- Potato Template 本身是 Vue 3 + UnoCSS 栈
- 保持组件源码简洁，不引入抽象层
- 未来 H5/小程序可以 fork 新仓库

**后果**: 组件可直接使用 UnoCSS 语法；不考虑 Tailwind 兼容性。

---

## D003: 双组件层设计

**决策**: 维持 Pf 组件层 + UI 基元层两层架构。

**理由**:
- Pf 组件需要深度定制（如 PfButton 的 slots/variants 融合）
- UI 基元层提供可复用的 shadcn 兼容交互组件
- 避免 Pf 组件直接依赖 shadcn 基元组件（可通过 registry 声明）

**后果**: 需要维护两套组件索引和导出；需明确区分 Pf-owned 和 shadcn-primitive。

---

## D004: reka-ui 作为行为基元

**决策**: 使用 reka-ui (Radix Vue v2) 而非直接使用 Radix Vue 或从头实现。

**理由**:
- shadcn-vue 生态的标准基元层
- 无样式，完全可控
- 活跃维护

---

## D005: UnoCSS Preset 注入主题

**决策**: 主题通过 UnoCSS Preset + preflights 注入 CSS 自定义属性。

**理由**:
- 与 UnoCSS 深度集成，无需额外 CSS 文件
- 运行时切换亮/暗模式通过 `.dark` class
- 类型安全的颜色令牌

---

## D006: 每个组件声明自己的依赖

**决策**: Registry 项独立声明 npm 依赖和 registry 依赖。

**理由**:
- 消费项目只安装所需依赖
- 避免 pf-data-table 的用户被迫安装 vue-datepicker
- 清晰的依赖可追溯性

---

## D007: 禁止构建组件 Bundle

**决策**: 不生成 `dist/index.js` 等组件打包产物。

**理由**:
- 分发模型是源码复制，不需要 bundle
- 减少构建复杂度
- 构建脚本只负责 registry payload 生成

---

## D008: `@apply` 可用于组件 `<style>`

**决策**: 组件内 `<style>` 块可使用 `@apply`。

**理由**:
- `@apply` 在 transformerDirectives 下可用
- 比 inline utility classes 更清晰（尤其是复杂选择器如 `.pf-tree .tree-vline`）

**后果**: 需要 `@unocss/transformer-directives`。

---

## D009: `.ai/` 不纳入版本控制

**决策**: `.ai/` 目录在 `.gitignore` 中。

**理由**:
- AI 记忆是 Agent 视角的工作产物，不是项目源代码
- 不同 Agent 可能有不同的交互风格
- 避免 PR 中混入 AI 内部日志

---

## D010: Docs 站点作为 Vite App 内嵌

**决策**: 文档站点是同一 Vite 项目的 SPA，而非独立 app。

**理由**:
- 可以用 `@/` 别名直接 import 组件源码
- 实时预览组件无需额外配置
- 开发 `pnpm dev` 即可同时开发和预览

---

*格式: D<序号> | 最后更新: 2026-05-21*
