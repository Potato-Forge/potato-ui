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

在 Vue 3 + UnoCSS 项目中使用 CLI 安装组件：

```bash
pnpm dlx @potato-forge/cli add pf-button
pnpm dlx @potato-forge/cli add pf-form
```

CLI 会把组件源码复制到你的应用中，递归包含 registry 依赖，并打印需要额外执行的 `pnpm add` 运行时依赖命令。使用方项目需要具备 Vue 3 SFC、UnoCSS、`@unocss/preset-wind4`、`@unocss/preset-icons` 和 `@/` alias。

本仓库文档与 registry 开发：

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
pnpm registry:build
pnpm build
```

## 分发方式

Pf-UI 组件作为注册表项（registry items）进行分发。组件及其依赖被逻辑分组，以便轻松安装到使用方项目的源码目录中。

消费项目安装命令：

```bash
pnpm dlx @potato-forge/cli add <item-name>
```

在本仓库内，开发快捷命令会用同一个 CLI 读取本地 registry 产物：

```bash
pnpm registry:build
pnpm pf:add pf-button --cwd ../consumer-app
```

生成后的注册表（registry）产物存放在：

```txt
registry/public/registry.json
registry/public/r/<item-name>.json
```

发布流程见 [docs/release.md](./docs/release.md)。

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

## 组件文档

项目内置了一个 Web 文档站点，为各个组件提供以下说明：

- 安装步骤
- 基础用法与代码示例
- Props、Emits、Slots 与暴露方法
- 关联依赖项
- 源码入口
- 常见场景下可直接复制的简单用例
