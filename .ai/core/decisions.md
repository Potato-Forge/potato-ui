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

*格式: D<序号> | 最后更新: 2026-11-01*

## D011: 主题真源收敛到 potato-design

**决策**: potato-ui 不再自持主题 preset。颜色/排版/圆角/阴影/动效全部来自 `@potato-forge/ui`，本地只保留 `src/foundations/pf-compat/` 这一层「历史 token 名 → design 语义 token」的别名映射。

**理由**:
- 两套主题各自维护会漂移；改主题需要同步多个项目。
- 兼容层让 41 个 Pf 组件与 20 个 ui 原语**零改动**，同时主题只有一个真源。
- 别名是纯映射、不含发明：每一行都能说出对应的 design token 语义。

**后果**:
- design 的颜色是完整 OKLCH 值，**禁止** `hsl(var(--pd-color-x))` 包装（无效 CSS，整条声明被丢弃）；需要透明度用 `color-mix(in srgb, var(--pd-color-x) N%, transparent)`。
- `@potato-forge/ui` 的 npm `latest` tag 停在旧版，安装必须写 `@alpha`，registry 依赖声明也据此写成 `@potato-forge/ui@alpha`。
- 圆角阶梯随 design 变化（`rounded-md` 6→8px），属于已接受的视觉调整。
- design 无 sidebar 语义组，`sidebar-*` 由兼容层就近映射；若未来 design 引入 sidebar token，兼容层应改为直连。
- 品牌色定制（6 预设 + 自定义 hex）保留在 potato-ui 侧，作为 design 之上的运行时覆盖。

---

*格式: D<序号> | 最后更新: 2026-11-01*

## D012: 开发期以 link 协议联调 potato-design

**决策**: potato-ui 的 `@potato-forge/ui` 依赖当前使用 `link:../potato-design/packages/ui`，
直接消费 design 仓库的本地构建产物，而非 npm 上的 `0.1.0-alpha.2`。

**理由**:
- design 的主题修正（warning 拆分、accent 亮暗同色相、暗色 primary 亮青、input 柔化）
  尚未发布到 npm，`alpha.2` 里仍是旧值，用旧包无法验收视觉改动。
- `file:` 协议是**复制快照**，design 重新构建后不会同步；只有 `link:` 是软链，
  改完 design 构建一次即可在 potato-ui 看到效果。

**后果**:
- 成员或 CI 拉取仓库后需先 `pnpm --filter @potato-forge/ui build`（在 potato-design 下），
  否则 `dist` 缺失导致安装/启动失败。
- 发布版或对外分发时必须把依赖改回真实版本号（如 `0.1.0-alpha.3`），
  **不可**把 `link:` 提交进发布产物。
- link 联调时两侧 `@unocss/core` 版本可能不一致，`Preset` 泛型会被 TS 视为不同标识；
  `createPfThemePresets()` 已对此加类型断言，只影响类型检查，运行时对象结构相同。
- 恢复正式依赖的前提：design 发布新 alpha 后，把依赖改回版本号并重新 install。

---

*格式: D<序号> | 最后更新: 2026-11-01*

## D013: 自建浮层动画 preset，不引入 tailwindcss-animate

**决策**: 在 `src/foundations/pf-animate/` 自建 UnoCSS preset，实现浮层进出场所需的
14 个类（`animate-in/out`、`fade-*`、`zoom-*`、`slide-*`）。

**背景**: drawer / modal / dropdown / select 一直写着 `animate-in`、
`slide-in-from-right` 这类 **tailwindcss-animate** 的类名，但本项目用 UnoCSS，
既没装该插件也无等价实现——这些类一个都不生成 CSS，导致所有浮层瞬间出现、
瞬间消失，长期没有任何过渡。

**为什么不直接装 tw-animate-css**: 它是给 Tailwind v4 的 `@theme` 与 `--tw-*`
变量体系用的，在 UnoCSS 下拿不到那套变量，行为不可预期。

**机制**: 与 tailwindcss-animate 一致——`animate-in/out` 挂 keyframes，
`fade-*`/`zoom-*`/`slide-*` 只设 CSS 变量（`--pf-enter-*`），由 keyframes 读取，
因此可任意组合（淡入 + 右滑 + 缩放）。时长与缓动复用 design 的动效 Token，
并优先读 `--un-duration`/`--un-ease`，使组件上已有的 `duration-*` 工具类能直接
控制动画时长（此前 `data-[state=open]:duration-500` 写的是 transition-duration，
对 animation 无效，属于死代码，接上 `--un-duration` 后才真正生效）。

**后果**: 新增浮层时继续用这套类名即可，`slide-in-from-*` 支持任意值写法
（如 `slide-in-from-top-[48%]`）。已内置 `prefers-reduced-motion` 降级。

---

*格式: D<序号> | 最后更新: 2026-11-02*
