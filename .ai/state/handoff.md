# Handoff

- Potato UI 是 Vue 3 + UnoCSS 源码分发组件注册中心；项目事实读 `.ai/core/`。
- Phase 1 已完成：24/24 Pf 组件文档、S4 跨组件 import 修复均已交付。
- **依赖 Import 修复 (KI-015/KI-016)**：PfFormItem.vue、PfForm.vue、PfDataTableForm.vue、PfDataTable.vue 补全了缺失的子组件 import。此前这些组件在 monorepo 内通过 Vue fallback 侥幸渲染，registry 单独安装时不可用或按钮显示异常。Registry 依赖链同步修正（pf-form 新增 pf-date-picker/pf-icon-picker/pf-text/pf-tooltip/ui-primitives；pf-data-table 新增 pf-button/pf-card/pf-empty/pf-loading/pf-text）。
- **PfDatePicker 抽离**：`src/components/pf-date-picker/` 是从 PfForm 内部 datetime/date/time 输入抽出的独立组件；PfFormItemDatetime 仅保留兼容包装。
- **PfCode 抽离**：`src/components/pf-code/` 是 Shiki 驱动的文档代码展示组件；docs 页面中的安装、用法和依赖代码块已统一使用 `<PfCode>`，组件内部封装 Catppuccin light/dark 高亮与复制能力。
- **2026-05-28 Bug/改进批次**：
  - 已提交 4 个 checkpoint: `bed4ac3`、`d9d6229`、`05623fb`、`d02949c`。
  - PfToast docs 通过 `PfToastProvider` 提供宿主；PfImg 改为直接使用 `viewerjs`，不再需要全局 `v-viewer`；PfButton disabled 增加 `cursor-not-allowed`。
  - docs 左侧菜单已按用途分类，`PfForm`/`PfDataTable` 放入复杂组件分类；ColorPicker/Img 有 props playground。
  - PfDataTable 不再内建 `@tanstack/vue-query`，推荐 props 为 `request/createRequest/updateRequest/deleteRequest/detailRequest`，旧 `listQuery/create/update/delete/detail` 保留兼容别名。
  - 新增轻量安装脚本 `scripts/install-registry-item.ts`，本仓库命令为 `pnpm pf:add <name> --cwd <target>`；会递归 registryDependencies、写源码文件并提示 npm dependencies，不修改 Tailwind/shadcn 配置。
- `.ai/vendor/` 已新增为项目无关协议层，记录通用入口、日志、隐私规范。
- Agent 入口现在应保持薄钥匙：硬约束 + `.ai` 索引 + 完成协议。
- 低优先级技术债：KI-002 Registry 实测、KI-004~008 类型/测试/CI/路由等。
- `ai-memory-starter/` 已作为独立启动模板雏形，含通用模板、adapter、行为校正和初始化脚本；下一步可移出为独立仓库。
