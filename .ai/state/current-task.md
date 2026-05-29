# Current Task

## 当前阶段

**Bug/改进批次完成** ✅ — 安装入口、docs 分类、预览增强、DataTable 请求边界均已更新

**AI 记忆层维护完成** ✅ — `.ai/vendor/` 通用协议层已从项目记忆中剥离，`ai-memory-starter/` 已作为独立启动模板雏形落地。

- **Docs 侧边栏双行导航完成** ✅ — 每个 Pf 组件项中文名下方增加了组件名 subtitle（PfButton 等），Foundation 项不变。

- **组件覆盖里程碑 1 完成** ✅ — 新增 PfInput、PfTextarea、PfSelect、PfRadioGroup，补齐 docs 与 registry。

- **组件覆盖里程碑 2 完成** ✅ — 新增 PfBadge、PfAlert、PfTabs、PfPagination，补齐 docs 与 registry。

- **组件覆盖里程碑 3 完成** ✅ — 新增 PfProgress、PfSkeleton、PfAvatar，补齐 docs 与 registry。

- **复杂组件基础件回接完成** ✅ — PfForm/PfDataTable 已接入新抽出的 PfInput/PfSelect/PfBadge/PfPagination/PfDrawer 等组件，避免平行版本继续扩散。

- **Input 组合能力与 FormItem 控件里程碑完成** ✅ — PfInput 支持 prefix/suffix/clearable；新增 PfCollapse、PfSlider、PfRate；PfForm 已接入 slider/rate type。

## 后续方向

Phase 2 候选任务（待人类决策）:
- 组件覆盖里程碑 3: 叠层/选择增强件（建议 PfDropdown、PfPopover、PfDrawer、PfProgress）
- 组件覆盖里程碑 4: 叠层/选择增强件后续（建议评估 PfPopover 所需底层基元；当前没有现成 ui/popover）
- 自动化测试 (Vitest + @vue/test-utils)
- CI/CD (GitHub Actions)
- Registry 安装实测 (KI-002)
- pf-theme 独立 npm 包
- 将 `ai-memory-starter/` 移出为独立启动核心仓库

...

## 已完成

- ✅ Sprint 4: 跨组件 import 修复 (commit: 4f04fdf)
- ✅ Sprint 3: DataTable + Form 文档 (commit: 9777cf5)
- ✅ Sprint 2: 10 个中等组件文档 (commit: f9262f3)
- ✅ Sprint 1: 7 个简单组件文档 + KI-009 (commit: 9ba6ee7)
- ✅ `.ai` vendor 分层：入口瘦身、通用协议落地、状态漂移修正
- ✅ `ai-memory-starter/`：通用模板、行为校正、adapter、初始化脚本
- ✅ KI-015: 依赖 Import 修复 — PfFormItem/PfForm/PfDataTableForm 补全子组件 import；Registry 依赖链修正
- ✅ KI-016: PfDataTable 主组件显式 import 修复；PfDatePicker 从 PfForm 内部日期时间输入中抽离为独立 registry item
- ✅ PfCode: 文档代码展示组件抽离，docs 页面代码块统一替换，PfDataTable 示例高度调高
- ✅ 2026-05-28 Bug/改进批次:
  - PfToast docs 宿主修复、PfImg 预览改为 viewerjs 自包含、PfButton disabled cursor 修复
  - docs 左侧菜单按通用/数据录入/反馈/导航/媒体/复杂组件/基础分类
  - PfColorPicker 与 PfImg 增加 props playground，预览区域补 min-height/overflow
  - PfDataTable 去除 @tanstack/vue-query 内建，改为 Promise request props
  - 新增轻量 registry installer: `pnpm pf:add <name> --cwd <target>`
- ✅ 2026-05-29 组件覆盖里程碑 1:
  - 新增 `PfInput`、`PfTextarea`、`PfSelect`、`PfRadioGroup`
  - 新增对应 docs 页面、导航入口、registry manifest/public payload
  - 审查通过：`vue-tsc -b`、registry build、Vite build
- ✅ 2026-05-29 组件覆盖里程碑 2:
  - 新增 `PfBadge`、`PfAlert`、`PfTabs`、`PfPagination`
  - 新增对应 docs 页面、导航入口、registry manifest/public payload
  - 审查通过：`vue-tsc -b`、registry build、Vite build
- ✅ 2026-05-29 组件覆盖里程碑 3:
  - 新增 `PfProgress`、`PfSkeleton`、`PfAvatar`
  - 新增对应 docs 页面、导航入口、registry manifest/public payload
  - 审查通过：`vue-tsc -b`、registry build、Vite build
- ✅ 2026-05-29 复杂组件基础件回接与叠层里程碑:
  - `PfFormItem` 接入 `PfInput`、`PfInputNumber`
  - `PfFormItemOptions` 接入 `PfSelect`、`PfBadge`、`PfCheckbox`
  - `PfDataTable` 接入可选 `PfPagination` 和 `PfDrawer`
  - 新增 `PfInputNumber`、`PfDropdown`、`PfDrawer`
  - 审查通过：`vue-tsc -b`、registry build、Vite build
- ✅ 2026-05-29 Input 组合能力与 FormItem 控件里程碑:
  - `PfInput` 支持 `prefix` / `suffix` 插槽、icon props、clearable
  - `.ai/core/conventions.md` 新增 FormItem 同步规则
  - 新增 `PfCollapse`、`PfSlider`、`PfRate`
  - `PfFormItem` 接入 `slider`、`rate` type，registryDependencies 同步更新
  - 审查通过：`vue-tsc -b`、registry build、Vite build
