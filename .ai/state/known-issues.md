# Known Issues & Technical Debt

## 已解决 (Sprint 1-4 + 依赖 Import 修复)

- ✅ KI-003: PfButton/UIButton variant 重复 — 确认非问题，两者完整且等效
- ✅ KI-009: PfEmpty 缺少 PfText 导入 (Sprint 1)
- ✅ KI-010: PfHelp 类型导入缺失 (Sprint 4)
- ✅ KI-011: PfModal 跨组件 import 缺失 (Sprint 4)
- ✅ KI-012: PfUpload 跨组件 import 缺失 (Sprint 4)
- ✅ KI-013: PfColorPicker 跨组件 import 缺失 (Sprint 4)
- ✅ KI-014: PfIconPicker 跨组件 import 缺失 (Sprint 4)
- ✅ KI-015: PfFormItem/PfForm/PfDataTableForm 缺失子组件 import (Input, FieldError, Label, PfIconPicker, PfText, PfTooltip, PfUpload, PfForm, PfButton, PfFormItemToggle) — 当前项目内 Vue fallback 渲染为原生 HTML 导致 docs 展示异常；registry 安装时彻底不可用
- ✅ KI-016: PfDataTable.vue 主组件仍缺少 PfButton/PfCard/PfLoading/PfEmpty/PfForm 显式 import，导致操作区按钮在 registry/docs 场景中显示异常；已补齐并同步 registry 依赖。PfForm 内部日期时间选择器已抽离为独立 PfDatePicker。

## 待处理

### KI-002: Registry 安装流程未经实际验证
- **状态**: 仅 build-registry.ts 通过 typecheck
- **建议**: 在干净项目中测试安装流程

### KI-004: 部分类型定义不完整
- **建议**: 补充 Props 接口的类型文档

### KI-005: `@apply` 风格不统一
- **建议**: 制定规范文档

### KI-006: 测试缺失
- **建议**: 优先为 PfButton、PfTree、PfTooltip 添加测试

### KI-007: Docs 站点路由手动管理
- **建议**: 考虑 vue-router 或文件系统路由

### KI-008: `.ai/` 不在版本控制
- **状态**: 有意为之（D009）
