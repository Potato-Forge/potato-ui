# Handoff

- Potato UI 是 Vue 3 + UnoCSS 源码分发组件注册中心；项目事实读 `.ai/core/`。
- Phase 1 已完成：24/24 Pf 组件文档、S4 跨组件 import 修复均已交付。
- `.ai/vendor/` 已新增为项目无关协议层，记录通用入口、日志、隐私规范。
- Agent 入口现在应保持薄钥匙：硬约束 + `.ai` 索引 + 完成协议。
- 低优先级技术债：KI-002 Registry 实测、KI-004~008 类型/测试/CI/路由等。
- 下一步候选：Vitest、CI/CD、Registry 安装实测、`pf-theme` 独立包、抽离 `.ai` 启动核心。
