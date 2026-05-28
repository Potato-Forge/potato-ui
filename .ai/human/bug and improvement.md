# Bug 和改进

以下几个问题和改进需要进行完善：

1. 目前的安装方式里：`pnpm dlx shadcn-vue@latest add <registry-url>/r/pf-button.json`有个 registry-url 的占位符，这个能否使用 github的 releast 来发布和分发，甚至可以用 github 的 github.io那个域名？
2. 组件需要分类，参考 naive-ui，element-ui 或者 shadcn 的分类方式，将目前的组件进行分类展示，主要是左侧的菜单栏；
3. 检查目前组件样例展示的区域，是否存在宽度或者高度不足的问题；
4. 关于上面的分类，特别一点，即 PfForm 和 PfDataTable 可以单独做个分类，因为配置较为复杂，且 PfForm 需要展示所有的form item 类型，这里可以顺便把其他的交互组件类型放进来；

以下是几个小 Bug，我测出来的，可能会有遗漏的 bug，你需要查漏补缺，完善类似的问题：
1. 按钮的禁用状态需要加上 cursor 的提示；
2. 颜色选择器的样例展示里，可以增加切换 props 的功能，展示不同 props 对 UI 样式的影响，其他类似组件应该也有；
3. PfImg 的第一张图的预览没按出来，看是禁用了还是有 bug，同样可以加上 props 切换的功能；
4. PfToast 的 toast 没有出现，是个 bug

以下是后续的计划和需要做出的决定：
1. 现在像存在依赖关系的组件，例如 form 组件可以需要依靠大量的其他组件来做 formitem，像这类组件是否在安装时会把所有需要的组件安装到平级目录，像 shadcn 一样？
2. 一些组件依赖了非常庞大的三方库，比如好像 dataTable 内用用了 tanstack query 和 zod 等，我能理解 zod 是为了做验证，但是 query 好像是跟组件无关的吧，这里需要做下判断，并在组件 doc 里说明；

以上问题，先与我探讨形成结论，然后按照影响范围和优先级做成 plan，然后按照 plan 来执行；

## 回复

关于安装地址：
