# Current Task

## 当前阶段

**Bug/改进批次完成** ✅ — 安装入口、docs 分类、预览增强、DataTable 请求边界均已更新

**AI 记忆层维护完成** ✅ — `.ai/vendor/` 通用协议层已从项目记忆中剥离，`ai-memory-starter/` 已作为独立启动模板雏形落地。

## 后续方向

Phase 2 候选任务（待人类决策）:
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
