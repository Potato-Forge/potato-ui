# Project Overview

## Identity

| 属性 | 值 |
|------|-----|
| **项目名** | Potato UI / Pf-UI |
| **定位** | 自用优先的 Vue 3 + UnoCSS 源码分发组件注册中心 |
| **对标** | shadcn/ui（源码分发，不入 node_modules） |
| **来源** | 从 `potato-template` 中的 `pf` 组件库抽取 |
| **路径** | `/Users/xiabinyang/Code/Personal/potato-ui` |
| **仓库** | `https://github.com/potato-forge/potato-ui` |

## 一句话描述

> A source-distributed Vue 3 + UnoCSS component registry for Potato-series templates.

## 核心目标

1. 将 `potato-template` 中的 pf 组件库逐步抽离为独立项目
2. 建立 shadcn/ui 风格的组件注册中心（registry）
3. 提供在线文档站点，展示组件用法
4. 组件可通过 CLI 安装到消费项目的源码树中

## 技术栈

| 层 | 技术 |
|----|------|
| **框架** | Vue 3.5 (Composition API + `<script setup>`) |
| **构建** | Vite (rolldown-vite 7.2), TypeScript 5.9 |
| **样式** | UnoCSS 66.5 + preset-wind4 + preset-icons |
| **基元组件** | reka-ui 2.7 (Radix Vue 继任者) |
| **样式工具** | class-variance-authority, clsx, tailwind-merge |
| **包管理** | pnpm 10.33 (workspace 就绪) |
| **图标** | Tabler Icons (via UnoCSS), @iconify/vue (动态), Lucide |
| **状态管理** | Pinia 3.0 |
| **表单** | @tanstack/vue-form, vee-validate, zod |

## 项目结构

```
potato-ui/
├── src/
│   ├── components/
│   │   ├── pf-button/        # Pf 自有组件（24个）
│   │   ├── pf-checkbox/
│   │   ├── pf-tooltip/
│   │   ├── pf-tree/
│   │   ├── ... (共24个pf-*组件)
│   │   └── ui/               # shadcn-vue 风格 UI 基元
│   │       ├── button/
│   │       ├── dialog/
│   │       ├── sidebar/
│   │       └── ... (共16个组件系列)
│   ├── foundations/
│   │   ├── pf-theme/         # UnoCSS 主题预设 + CSS 变量
│   │   └── pf-icons/         # UnoCSS 图标预设
│   ├── lib/
│   │   ├── utils.ts          # cn() 工具函数
│   │   └── theme-settings.ts
│   ├── store/                # Pinia stores
│   ├── docs/                 # 文档站点页面 (24个)
│   ├── App.vue               # 文档站点 SPA
│   └── index.ts              # 统一导出
├── registry/
│   ├── items/                # 注册清单 (28个 .json)
│   └── public/               # 构建产物 (供 CLI 消费)
│       ├── registry.json
│       └── r/<name>.json
├── scripts/
│   └── build-registry.ts     # 注册表构建脚本
├── docs/                     # 设计文档
│   ├── pf-ui-architecture.md
│   ├── component-registry-plan.md
│   └── codex-handoff.md
└── .ai/                      # AI 记忆层
```

## 双组件层设计

### Pf 组件层 (`src/components/pf-*`)
- **自有一等公民**：深度定制，不依赖 shadcn 基元组件
- **示例**：PfButton 有自己的 slots (prefix/suffix)、融合了 `type` 和 `color` 的 API
- **策略**：Pf 组件不安装 shadcn button 作为独立依赖，而是维护 Pf 自有源码

### UI 基元层 (`src/components/ui/*`)
- **shadcn-vue 风格**：薄封装 reka-ui，保持 shadcn API 兼容
- **用途**：为 Pf 组件提供底层交互基元（Dialog、DropdownMenu、Sheet 等）
- **示例**：Dialog、Sidebar、DropdownMenu

## 当前状态概要

- ✅ 所有 22 个 Pf 组件已从 potato-template 迁移，另抽离 PfDatePicker、PfCode 2 个 Pf 组件
- ✅ Registry 构建系统完成
- ✅ 文档站点起步（5 个页面：Button、Tooltip、Tree、Theme、Icons）
- ✅ 16 个 UI 基元组件系列就绪
- ✅ 主题系统完成（30+ 语义颜色，亮/暗双模）
- ✅ 图标系统完成（Tabler + Pf 自定义图标）
- ⚠️ 大部分 Pf 组件缺少文档页面
- ⚠️ 无自动化测试
- ⚠️ 无 CI/CD
