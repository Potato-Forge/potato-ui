# Conventions

## 命名规范

### 组件命名

| 类型 | 模式 | 示例 |
|------|------|------|
| Pf 组件文件 | `Pf<Name>.vue` | `PfButton.vue`, `PfDataTable.vue` |
| Pf 组件目录 | `pf-<name>` | `pf-button/`, `pf-data-table/` |
| 注册项名 | `pf-<name>` | `pf-button`, `pf-data-table` |
| UI 基元文件 | `<Name>.vue` | `Button.vue`, `DialogContent.vue` |
| UI 基元目录 | `<name>` | `button/`, `dropdown-menu/` |

### Props 命名

- 使用语义化命名：`variant`、`type`（语义类型）、`size`
- backward-compatible 别名保留：`color` → 映射到 `type`
- icon prop 使用 UnoCSS 类名：`icon="i-tabler-sparkles"`

### 目录组织

```
src/components/<component>/
├── <Component>.vue           # 主组件
├── index.ts                  # 导出 + variants 定义
├── <Component>.types.ts      # 类型定义（可选）
├── <SubComponent>.vue        # 子组件（可选）
└── types/                    # 复杂类型（可选）
```

## 代码模式

### 组件入口 (`index.ts`)

```typescript
// 导出版本变体 + 组件
export { default as PfButton } from './PfButton.vue'
export const buttonVariants = cva(...)  // variants 导出供组合使用
export type ButtonVariants = VariantProps<typeof buttonVariants>
```

### 样式约定

- 使用 `cn()` 合并类名（底层是 `tailwind-merge` + `clsx`）
- 语义颜色用 UnoCSS 令牌：`bg-primary`、`text-muted-foreground`
- 变体组用 `class-variance-authority` 的 `cva`
- 组件内样式用 UnoCSS group 语法或 `<style>` 块

### Import 路径

```typescript
// 内部引用
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'  // 从组件 index.ts 导入

// 外部库
import { Primitive } from 'reka-ui'
import { cva } from 'class-variance-authority'
```

### 类型定义

```typescript
// Props 接口在 index.ts 中定义
export interface PfButtonProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: string
  // ...
}

// 复杂类型用独立文件
// src/components/pf-tree/types/PfTreeProps.types.ts
```

## Registry 清单规范

每个 registry item JSON：

```json
{
  "name": "pf-button",           // 唯一名称
  "type": "registry:component",  // component|style|lib
  "title": "PfButton",           // 展示名
  "description": "...",          // 简短描述
  "dependencies": [],            // npm 依赖
  "registryDependencies": [],    // 其他 registry 项
  "meta": {                      // 元数据
    "sourceEntry": "src/...",
    "docsRoute": "/components/..."
  },
  "files": []                    // 包含的文件（路径 + 类型 + 可选 target）
}
```

## 文档页面模式

每个文档页面结构：
1. Installation → CLI 安装命令
2. Preview → 实时预览
3. Usage → 代码示例
4. API → Props/Emits/Slots 表格
5. Dependencies → 依赖列表

## Git 约定

- `.ai/core/` 是项目核心知识，建议纳入版本控制
- `.ai/state/` 是当前项目状态，建议纳入版本控制
- `.ai/logs/` 只写无隐私、无情绪、总结式项目事件；是否纳入版本控制由项目决定
- `.ai/vendor/` 是通用协议层，不写项目事实；后续可抽离为独立启动核心
- `.ai/private/`、`.ai/tmp/`、原始归档不纳入版本控制
- `registry/public/` 是构建产物，提交到 Git
- `dist/` 不提交
