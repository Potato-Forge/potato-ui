# Glossary

## 项目名

| 术语 | 含义 |
|------|------|
| **Potato UI / Pf-UI** | 本项目正式名称 |
| **Potato Forge** | 项目所属的组织/生态 |
| **potato-template** | 原始模板项目，Pf 组件的来源 |

## 组件层级

| 术语 | 含义 | 目录 |
|------|------|------|
| **Pf 组件** | Pf 自有深度定制组件 | `src/components/pf-*` |
| **UI 基元** | shadcn-vue 风格薄封装组件 | `src/components/ui/*` |
| **Foundation** | 样式/图标基础设施 | `src/foundations/` |
| **Registry Item** | 可安装的组件清单 | `registry/items/*.json` |
| **Registry Payload** | 构建产物，包含文件内容的 JSON | `registry/public/r/*.json` |

## 样式系统

| 术语 | 含义 |
|------|------|
| **语义令牌** | `primary`, `success`, `info`, `warning`, `error` 等颜色令牌 |
| **Surface 令牌** | `app-shell`, `sidebar-surface`, `content-surface` 等区域专用颜色 |
| **cn()** | `tailwind-merge` + `clsx` 的组合函数 |
| **cva** | `class-variance-authority` 的变体定义 API |
| **UnoCSS preset** | UnoCSS 配置的模块化打包方式 |

## 技术

| 术语 | 含义 |
|------|------|
| **reka-ui** | Radix Vue v2，无样式 Vue 行为基元库 |
| **rolldown-vite** | 基于 Rolldown 的 Vite 替代 (v7.2) |
| **preset-wind4** | UnoCSS 的 Tailwind v4 兼容预设 |
| **shadcn-vue** | shadcn/ui 的 Vue 移植版，本项目的设计参考 |
| **源码分发** | 组件源码复制到消费项目，而非 npm 安装 |

## 文件约定

| 文件 | 含义 |
|------|------|
| `index.ts` | 组件导出入口 + variant 定义 |
| `*.types.ts` | 独立类型定义文件 |
| `*.store.ts` | Pinia store（如 modal.store.ts） |
| `use*.ts` | Vue composable（如 usePfToast.ts） |
