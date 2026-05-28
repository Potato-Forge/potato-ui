# Architecture

## 分发模型

```
potato-ui (源码仓库)
  │
  ├─ registry/items/*.json     ← 组件清单
  ├─ scripts/build-registry.ts ← 构建
  │
  ▼
  registry/public/r/*.json     ← 可安装的 Registry 载荷
  │
  ▼ (通过 shadcn CLI 或类似工具)
  消费项目 src/components/pf/<component>/
```

Pf-UI **不是**传统的 `npm install` 运行时包。组件源码被**复制**到消费项目的源码树中。

## 组件分层

```
┌─────────────────────────────────────┐
│          Pf 组件层                   │
│  pf-button, pf-tree, pf-data-table  │  ← 深度定制，自有一等公民
│  pf-modal, pf-form, pf-upload ...   │
├─────────────────────────────────────┤
│          UI 基元层                   │
│  Dialog, Sidebar, DropdownMenu ...  │  ← shadcn-vue 薄封装
├─────────────────────────────────────┤
│          reka-ui (Radix Vue v2)     │  ← 无样式行为基元
├─────────────────────────────────────┤
│          Foundation 层              │
│  pf-theme / pf-icons               │  ← 样式 & 图标基础设施
└─────────────────────────────────────┘
```

## 依赖声明策略

关键原则：**每个组件自己声明依赖，消费项目只安装用到的组件需要的包。**

### 组件 Registry 依赖分类

| 依赖类型 | 例子 | 意义 |
|----------|------|------|
| `dependencies` | `@he-tree/vue`, `class-variance-authority` | npm 包，消费项目需安装 |
| `registryDependencies` | `pf-theme`, `pf-icons`, `ui-primitives` | 其他 Pf Registry 项，需先安装 |
| `devDependencies` | TypeScript types | 仅开发时需要 |

### 典型依赖链示例

```
pf-data-table
  ├─ npm: @iconify/vue, date-fns, vxe-table
  └─ registry:
      ├─ pf-form
      │   ├─ npm: @tanstack/vue-form, @tanstack/zod-form-adapter, zod
      │   └─ registry: pf-switch, pf-checkbox, pf-upload, pf-runtime-support
      ├─ pf-modal → registry: ui-primitives
      ├─ pf-toast → npm: vue-sonner
      └─ pf-runtime-support → npm: clsx, pinia
```

## 主题系统

### 架构
- `pf-theme` 是一个 UnoCSS Preset
- 通过 CSS 自定义属性注入 30+ 语义颜色令牌
- 支持亮色/暗色双模式
- 暗色模式通过 `.dark` class 切换

### 核心颜色令牌
```
primary, success, info, warning, error (=destructive)
background, foreground
muted, muted-foreground
card, card-foreground
popover, popover-foreground
border, input, ring
sidebar-* (从主令牌派生)
```

### 特殊的 surface 令牌
```
app-shell, app-rail-surface, app-frame-surface
sidebar-surface, header-surface, content-surface
admin-surface, selected
```

### 半径令牌
```css
--radius: 0.5rem;
border-radius: lg → var(--radius), md → calc(var(--radius) - 2px), sm → calc(var(--radius) - 4px)
```

## 图标系统

- **静态图标**：通过 UnoCSS 类 `i-tabler-*` 使用 Tabler Icons
- **动态图标**：组件内使用 `@iconify/vue` 的 `<Icon>` 组件（如 PfTree、PfIconPicker）
- **自定义图标**：`i-pf-logo` → Potato Forge 标志

## 文档站点

- 单页 SPA，客户端路由 (`popstate`)
- 5 个页面：Button、Tooltip、Tree、Theme、Icons
- i18n：中/英双语 (`src/docs/i18n.ts`)
- 主题切换：亮色/暗色/跟随系统
- 实时组件预览

## 关键技术约束

1. **仅支持 Vue 3 + UnoCSS Web 目标**，不考虑 Tailwind、H5、小程序
2. **不构建组件 bundle**，不需要 `dist/index.js`
3. **UnoCSS 语法是预期行为**：`bg-primary`、`border-border`、`i-tabler-*`、`@apply`
4. **Pf 组件不依赖 shadcn 基元组件**，但可以通过 registryDependencies 声明对其他 Pf 组件的依赖
