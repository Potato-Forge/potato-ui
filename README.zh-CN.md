# Pf-UI

[English](./README.md)

Pf-UI 是面向 Potato Forge / Potato Template 生态的 Vue 3 组件注册表项目，采用源码分发模式。

它与 shadcn 的总体思路相近：组件会被安装进使用方项目的源码目录，而不是作为传统运行时 UI 包从 `node_modules` 引用。这样做的目标是让组件更容易查看、定制、分叉，并在 Potato 系列模板中持续演进。

## 设计前提

Pf-UI Web 是一个明确带有取舍、优先服务自用场景的项目。它围绕 Potato Template 当前稳定使用的技术栈设计：

- Vue 3
- Vite 或等价的 Vue SFC 构建环境
- UnoCSS
- `@unocss/preset-wind4`
- `@unocss/preset-icons`
- Pf 主题令牌
- Pf 图标配置

Pf-UI 并不以覆盖所有前端技术栈为目标。对仅 Tailwind 项目、Element Plus、Naive UI、纯原生 CSS 项目或小程序运行时的兼容，不属于第一阶段目标。

## 快速开始

```bash
pnpm install
pnpm dev
```

文档站点基于 Vite，当前为首批 PoC 组件提供实时预览：

- `/components/button`
- `/components/tooltip`
- `/components/tree`
- `/foundation/theme`
- `/foundation/icons`

构建并验证项目：

```bash
pnpm typecheck
pnpm build
pnpm registry:build
```

## 分发模式

Pf-UI 组件通过 registry item 分发：

```bash
pnpm dlx shadcn-vue@latest add <pf-ui-registry-url>/r/pf-button.json
```

该命令应将组件源码复制到使用方项目中，并仅安装该组件所需的 npm 依赖。

生成后的 registry 产物输出到：

```txt
registry/public/registry.json
registry/public/r/<item-name>.json
```

## 组件注册表

当前 registry 已包含从 `potato-template` 迁移而来的完整 Pf 组件集合：

- `pf-breadcrumb`
- `pf-button`
- `pf-card`
- `pf-checkbox`
- `pf-color-picker`
- `pf-config-provider`
- `pf-data-table`
- `pf-divide`
- `pf-empty`
- `pf-form`
- `pf-help`
- `pf-icon-picker`
- `pf-img`
- `pf-loading`
- `pf-modal`
- `pf-sidebar`
- `pf-switch`
- `pf-text`
- `pf-toast`
- `pf-tooltip`
- `pf-tree`
- `pf-upload`

共享基础能力被拆分为以下 foundation/support registry item：`pf-theme`、`pf-icons`、`pf-runtime-support` 和 `ui-primitives`。

## 仓库结构

```txt
src/
  components/
    pf-button/
    pf-checkbox/
    pf-tooltip/
    pf-tree/
  foundations/
    pf-theme/
    pf-icons/
  docs/
registry/
  items/
  public/
scripts/
  build-registry.ts
```

## 文档目标

项目应提供一个 Web 文档站点，按组件页面覆盖以下内容：

- 安装命令
- 基础用法
- 代码示例
- Props、emits、slots 与暴露方法
- 依赖项
- 源码入口
- 对简单组件，必要时提供可直接复制的示例

当前设计决策与下一轮接手上下文见 `docs/pf-ui-architecture.md`、`docs/component-registry-plan.md` 和 `docs/codex-handoff.md`。