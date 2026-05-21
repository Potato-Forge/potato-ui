import { computed, ref } from 'vue'

export type Locale = 'en' | 'zh'

type MessageKey =
  | 'nav.components'
  | 'nav.foundation'
  | 'nav.button'
  | 'nav.tooltip'
  | 'nav.tree'
  | 'nav.card'
  | 'nav.divide'
  | 'nav.empty'
  | 'nav.loading'
  | 'nav.text'
  | 'nav.switch'
  | 'nav.breadcrumb'
  | 'nav.theme'
  | 'nav.icons'
  | 'theme.mode'
  | 'theme.system'
  | 'theme.light'
  | 'theme.dark'
  | 'locale.label'
  | 'locale.en'
  | 'locale.zh'
  | 'section.installation'
  | 'section.preview'
  | 'section.usage'
  | 'section.api'
  | 'section.dependencies'
  | 'table.name'
  | 'table.type'
  | 'table.notes'
  | 'button.description'
  | 'button.primary'
  | 'button.success'
  | 'button.info'
  | 'button.warning'
  | 'button.disabled'
  | 'button.iconSlots'
  | 'button.upload'
  | 'button.create'
  | 'button.api.variant'
  | 'button.api.type'
  | 'button.api.size'
  | 'button.api.icon'
  | 'button.api.slots'
  | 'tooltip.description'
  | 'tooltip.copyHint'
  | 'tooltip.hoverMe'
  | 'tooltip.interactive'
  | 'tooltip.interactiveContent'
  | 'tooltip.componentUsage'
  | 'tooltip.pluginUsage'
  | 'tooltip.saveChanges'
  | 'tooltip.save'
  | 'tooltip.api.content'
  | 'tooltip.api.placement'
  | 'tooltip.api.delay'
  | 'tooltip.api.interactive'
  | 'tooltip.api.trigger'
  | 'tree.description'
  | 'tree.basicChooseable'
  | 'tree.checkable'
  | 'tree.draggableSlots'
  | 'tree.api.modelValue'
  | 'tree.api.choosen'
  | 'tree.api.modes'
  | 'tree.api.slots'
  | 'tree.api.expose'
  | 'themePage.title'
  | 'themePage.description'
  | 'iconsPage.title'
  | 'iconsPage.description'
  | 'card.description'
  | 'card.withHeader'
  | 'card.contentGoesHere'
  | 'card.shadowVariant'
  | 'card.shadowHint'
  | 'card.title'
  | 'card.content'
  | 'card.viewMore'
  | 'card.api.shadow'
  | 'card.api.border'
  | 'card.api.class'
  | 'card.api.slots'
  | 'divide.description'
  | 'divide.above'
  | 'divide.below'
  | 'divide.left'
  | 'divide.right'
  | 'divide.horizontal'
  | 'divide.vertical'
  | 'divide.api.vertical'
  | 'empty.description'
  | 'empty.noData'
  | 'empty.noDataHint'
  | 'empty.retry'
  | 'empty.noResults'
  | 'empty.tryAdjusting'
  | 'empty.clearFilters'
  | 'empty.api.title'
  | 'empty.api.description'
  | 'empty.api.slots'
  | 'loading.description'
  | 'loading.hide'
  | 'loading.show'
  | 'loading.loadingText'
  | 'loading.contentTitle'
  | 'loading.contentBody'
  | 'loading.yourContent'
  | 'loading.api.loading'
  | 'loading.api.text'
  | 'loading.api.blockInteraction'
  | 'loading.api.slot'
  | 'text.description'
  | 'text.h1Sample'
  | 'text.h2Sample'
  | 'text.h3Sample'
  | 'text.h4Sample'
  | 'text.bodySample'
  | 'text.captionSample'
  | 'text.linkSample'
  | 'text.codeSample'
  | 'text.blockquoteSample'
  | 'text.heading'
  | 'text.boldBody'
  | 'text.longText'
  | 'text.clampedText'
  | 'text.withPrefix'
  | 'text.api.as'
  | 'text.api.variant'
  | 'text.api.href'
  | 'text.api.truncate'
  | 'text.api.weight'
  | 'text.api.dimmed'
  | 'text.api.prefixLine'
  | 'switch.description'
  | 'switch.on'
  | 'switch.off'
  | 'switch.api.checked'
  | 'switch.api.disabled'
  | 'switch.api.id'
  | 'switch.api.class'
  | 'switch.api.slot'
  | 'breadcrumb.description'
  | 'breadcrumb.home'
  | 'breadcrumb.components'
  | 'breadcrumb.breadcrumb'
  | 'breadcrumb.settings'
  | 'breadcrumb.profile'
  | 'breadcrumb.customKeys'
  | 'breadcrumb.api.list'
  | 'breadcrumb.api.labelKey'
  | 'breadcrumb.api.hrefKey'

const messages: Record<MessageKey, Record<Locale, string>> = {
  'nav.components': { en: 'Components', zh: '组件' },
  'nav.foundation': { en: 'Foundation', zh: '基础' },
  'nav.button': { en: 'Button', zh: '按钮' },
  'nav.tooltip': { en: 'Tooltip', zh: '提示' },
  'nav.tree': { en: 'Tree', zh: '树' },
  'nav.card': { en: 'Card', zh: '卡片' },
  'nav.divide': { en: 'Divide', zh: '分割' },
  'nav.empty': { en: 'Empty', zh: '空状态' },
  'nav.loading': { en: 'Loading', zh: '加载' },
  'nav.text': { en: 'Text', zh: '文本' },
  'nav.switch': { en: 'Switch', zh: '开关' },
  'nav.breadcrumb': { en: 'Breadcrumb', zh: '面包屑' },
  'nav.theme': { en: 'Theme', zh: '主题' },
  'nav.icons': { en: 'Icons', zh: '图标' },
  'theme.mode': { en: 'Theme mode', zh: '主题模式' },
  'theme.system': { en: 'System', zh: '系统' },
  'theme.light': { en: 'Light', zh: '浅色' },
  'theme.dark': { en: 'Dark', zh: '深色' },
  'locale.label': { en: 'Language', zh: '语言' },
  'locale.en': { en: 'EN', zh: '英' },
  'locale.zh': { en: '中文', zh: '中' },
  'section.installation': { en: 'Installation', zh: '安装' },
  'section.preview': { en: 'Preview', zh: '预览' },
  'section.usage': { en: 'Usage', zh: '用法' },
  'section.api': { en: 'API', zh: '接口' },
  'section.dependencies': { en: 'Dependencies', zh: '依赖' },
  'table.name': { en: 'Name', zh: '名称' },
  'table.type': { en: 'Type', zh: '类型' },
  'table.notes': { en: 'Notes', zh: '说明' },
  'button.description': {
    en: 'Pf-owned button source with semantic variants, sizes, icon support, and prefix/suffix slots.',
    zh: 'Pf 自有按钮源码，支持语义变体、尺寸、图标以及前后缀插槽。',
  },
  'button.primary': { en: 'Primary', zh: '主要' },
  'button.success': { en: 'Success', zh: '成功' },
  'button.info': { en: 'Info', zh: '信息' },
  'button.warning': { en: 'Warning', zh: '警告' },
  'button.disabled': { en: 'Disabled', zh: '禁用' },
  'button.iconSlots': { en: 'Icon Slots', zh: '图标插槽' },
  'button.upload': { en: 'Upload', zh: '上传' },
  'button.create': { en: 'Create', zh: '创建' },
  'button.api.variant': { en: 'Visual style.', zh: '按钮视觉样式。' },
  'button.api.type': { en: 'Semantic color or native type.', zh: '语义颜色或原生按钮类型。' },
  'button.api.size': { en: 'Button dimensions.', zh: '按钮尺寸。' },
  'button.api.icon': { en: 'UnoCSS icon class rendered before default slot.', zh: '默认插槽前渲染的 UnoCSS 图标类。' },
  'button.api.slots': { en: 'Flexible content placement.', zh: '灵活放置按钮内容。' },
  'tooltip.description': {
    en: 'Tooltip component and plugin exports backed by vue-tippy and tippy.js.',
    zh: '基于 vue-tippy 和 tippy.js 的提示组件与插件导出。',
  },
  'tooltip.copyHint': { en: 'Registry items copy source into your app.', zh: 'Registry 条目会把源码复制到你的应用中。' },
  'tooltip.hoverMe': { en: 'Hover me', zh: '悬停查看' },
  'tooltip.interactive': { en: 'Interactive', zh: '可交互' },
  'tooltip.interactiveContent': { en: 'Interactive tooltip', zh: '可交互提示' },
  'tooltip.componentUsage': { en: 'Component Usage', zh: '组件用法' },
  'tooltip.pluginUsage': { en: 'Plugin Usage', zh: '插件用法' },
  'tooltip.saveChanges': { en: 'Save changes', zh: '保存更改' },
  'tooltip.save': { en: 'Save', zh: '保存' },
  'tooltip.api.content': { en: 'Fallback content when no content slot is provided.', zh: '未提供 content 插槽时的备用内容。' },
  'tooltip.api.placement': { en: 'Tooltip placement.', zh: '提示浮层位置。' },
  'tooltip.api.delay': { en: 'Show and hide delay.', zh: '显示和隐藏延迟。' },
  'tooltip.api.interactive': { en: 'Allows pointer interaction inside content.', zh: '允许在提示内容内部进行指针交互。' },
  'tooltip.api.trigger': { en: 'Tippy trigger string.', zh: 'Tippy 触发方式字符串。' },
  'tree.description': {
    en: 'Complex multi-file tree component with selectable, checkable, draggable, slot, and exposed method surfaces.',
    zh: '复杂多文件树组件，提供选择、勾选、拖拽、插槽和暴露方法能力。',
  },
  'tree.basicChooseable': { en: 'Basic + Chooseable', zh: '基础 + 可选择' },
  'tree.checkable': { en: 'Checkable', zh: '可勾选' },
  'tree.draggableSlots': { en: 'Draggable + Slots', zh: '可拖拽 + 插槽' },
  'tree.api.modelValue': { en: 'Tree data with two-way binding.', zh: '支持双向绑定的树数据。' },
  'tree.api.choosen': { en: 'Currently highlighted node key.', zh: '当前高亮节点的键值。' },
  'tree.api.modes': { en: 'Enable selection, checkbox, and drag behavior.', zh: '启用选择、勾选和拖拽行为。' },
  'tree.api.slots': { en: 'Customize node presentation.', zh: '自定义节点展示。' },
  'tree.api.expose': { en: 'Imperative tree helpers.', zh: '命令式树操作辅助方法。' },
  'themePage.title': { en: 'Pf Theme', zh: 'Pf 主题' },
  'themePage.description': {
    en: 'Foundation item for semantic colors, dark mode variables, radius tokens, and shared UnoCSS shortcuts.',
    zh: '提供语义颜色、暗色模式变量、圆角 token 和共享 UnoCSS shortcuts 的基础条目。',
  },
  'iconsPage.title': { en: 'Pf Icons', zh: 'Pf 图标' },
  'iconsPage.description': {
    en: 'Foundation item for Tabler static classes, shared icon rendering defaults, and the Potato Forge logo collection.',
    zh: '提供 Tabler 静态类、共享图标渲染默认值和 Potato Forge logo 图标集合的基础条目。',
  },
  'card.description': {
    en: 'Card container with header, body, and footer slots.',
    zh: '卡片容器，支持头部、内容和底部插槽。',
  },
  'card.withHeader': { en: 'Card With Header', zh: '带头部的卡片' },
  'card.contentGoesHere': { en: 'Content goes here.', zh: '内容放在这里。' },
  'card.shadowVariant': { en: 'Shadow Variant', zh: '带阴影变体' },
  'card.shadowHint': { en: 'This card has shadow enabled.', zh: '这张卡片启用了阴影。' },
  'card.title': { en: 'Title', zh: '标题' },
  'card.content': { en: 'Content', zh: '内容' },
  'card.viewMore': { en: 'View More', zh: '查看更多' },
  'card.api.shadow': { en: 'Enable box shadow.', zh: '启用盒阴影。' },
  'card.api.border': { en: 'Show border. Default true.', zh: '显示边框。默认开启。' },
  'card.api.class': { en: 'Additional CSS classes.', zh: '额外的 CSS 类。' },
  'card.api.slots': { en: 'Layout sections of the card.', zh: '卡片的各个布局区域。' },
  'divide.description': {
    en: 'A simple divider line that supports horizontal and vertical orientation.',
    zh: '简单的分割线，支持水平和垂直方向。',
  },
  'divide.above': { en: 'Above the divide', zh: '分割线上方' },
  'divide.below': { en: 'Below the divide', zh: '分割线下方' },
  'divide.left': { en: 'Left', zh: '左侧' },
  'divide.right': { en: 'Right', zh: '右侧' },
  'divide.horizontal': { en: 'Horizontal divider', zh: '水平分割线' },
  'divide.vertical': { en: 'Vertical divider', zh: '垂直分割线' },
  'divide.api.vertical': { en: 'Render as a vertical line instead of horizontal.', zh: '渲染为垂直线而非水平线。' },
  'empty.description': {
    en: 'Empty state placeholder with customizable icon, title, description, and action.',
    zh: '空状态占位组件，支持自定义图标、标题、描述和操作按钮。',
  },
  'empty.noData': { en: 'No data', zh: '暂无数据' },
  'empty.noDataHint': { en: 'There is nothing to show here yet.', zh: '这里还没有任何内容。' },
  'empty.retry': { en: 'Retry', zh: '重试' },
  'empty.noResults': { en: 'No results found', zh: '未找到结果' },
  'empty.tryAdjusting': { en: 'Try adjusting your search or filter criteria.', zh: '请尝试调整搜索或筛选条件。' },
  'empty.clearFilters': { en: 'Clear Filters', zh: '清除筛选' },
  'empty.api.title': { en: 'Main heading text.', zh: '主标题文本。' },
  'empty.api.description': { en: 'Supporting description text.', zh: '辅助描述文本。' },
  'empty.api.slots': { en: 'Custom icon, default content, and action button area.', zh: '自定义图标、默认内容和操作按钮区域。' },
  'loading.description': {
    en: 'Loading overlay that wraps content and shows a spinner when active.',
    zh: '加载遮罩组件，包裹内容并在激活时显示旋转动画。',
  },
  'loading.hide': { en: 'Hide Loading', zh: '隐藏加载' },
  'loading.show': { en: 'Show Loading', zh: '显示加载' },
  'loading.loadingText': { en: 'Loading...', zh: '加载中...' },
  'loading.contentTitle': { en: 'Content Title', zh: '内容标题' },
  'loading.contentBody': { en: 'This content is wrapped inside the loading container.', zh: '这些内容被包裹在加载容器中。' },
  'loading.yourContent': { en: 'Your content here', zh: '你的内容' },
  'loading.api.loading': { en: 'Toggle the loading overlay.', zh: '切换加载遮罩的显示。' },
  'loading.api.text': { en: 'Text shown below the spinner. Default: "加载中...".', zh: '旋转动画下方显示的文字。默认："加载中..."。' },
  'loading.api.blockInteraction': { en: 'Whether the overlay blocks pointer events. Default true.', zh: '遮罩是否阻止指针事件。默认开启。' },
  'loading.api.slot': { en: 'Content wrapped by the loading overlay.', zh: '被加载遮罩包裹的内容。' },
  'text.description': {
    en: 'Versatile typography component supporting headings, body, link, code, kbd, and blockquote with weight, truncation, and prefix controls.',
    zh: '多功能排版组件，支持标题、正文、链接、代码、键盘按键和引用，提供字重、截断和前缀控制。',
  },
  'text.h1Sample': { en: 'Heading 1 — ExtraBold', zh: '一级标题 — 超粗' },
  'text.h2Sample': { en: 'Heading 2 — Bold', zh: '二级标题 — 加粗' },
  'text.h3Sample': { en: 'Heading 3 — Bold', zh: '三级标题 — 加粗' },
  'text.h4Sample': { en: 'Heading 4 — Bold', zh: '四级标题 — 加粗' },
  'text.bodySample': { en: 'Body text with relaxed line height for comfortable reading.', zh: '正文文本，行高舒适适合阅读。' },
  'text.captionSample': { en: 'Caption text for meta information.', zh: '说明文字，用于元信息。' },
  'text.linkSample': { en: 'Link text', zh: '链接文本' },
  'text.codeSample': { en: 'const x = 42;', zh: 'const x = 42;' },
  'text.blockquoteSample': { en: 'Quote text with a left border accent.', zh: '引用文本，带有左侧边框强调。' },
  'text.heading': { en: 'Heading', zh: '标题' },
  'text.boldBody': { en: 'Bold body', zh: '加粗正文' },
  'text.longText': { en: 'A very long piece of text that will be truncated with an ellipsis when it overflows the container.', zh: '一段很长的文本，超出容器宽度时会被省略号截断。' },
  'text.clampedText': { en: 'Multi-line text clamped at 2 lines instead of the default single-line truncation.', zh: '多行文本限制在 2 行内，超出的内容被省略。' },
  'text.withPrefix': { en: 'Text with a colored prefix line for emphasis.', zh: '带有彩色前缀线的文本，用于强调。' },
  'text.api.as': { en: 'HTML element to render.', zh: '要渲染的 HTML 元素。' },
  'text.api.variant': { en: 'Visual style preset. Auto-detected from `as` when omitted.', zh: '视觉样式预设。省略时从 `as` 自动推断。' },
  'text.api.href': { en: 'URL when used as a link.', zh: '作为链接时的 URL。' },
  'text.api.truncate': { en: 'Single-line (true) or multi-line (number) text clamping.', zh: '单行截断 (true) 或多行截断 (数字行数)。' },
  'text.api.weight': { en: 'Font weight override.', zh: '字重覆盖。' },
  'text.api.dimmed': { en: 'Apply muted-foreground color.', zh: '应用 muted-foreground 颜色。' },
  'text.api.prefixLine': { en: 'Show a colored accent bar before the text.', zh: '在文本前显示一条彩色强调线。' },
  'switch.description': {
    en: 'Toggle switch built on reka-ui SwitchRoot with two-way binding.',
    zh: '基于 reka-ui SwitchRoot 的开关组件，支持双向绑定。',
  },
  'switch.on': { en: 'ON', zh: '开' },
  'switch.off': { en: 'OFF', zh: '关' },
  'switch.api.checked': { en: 'Two-way bound checked state.', zh: '双向绑定的选中状态。' },
  'switch.api.disabled': { en: 'Disable the switch.', zh: '禁用开关。' },
  'switch.api.id': { en: 'HTML id attribute.', zh: 'HTML id 属性。' },
  'switch.api.class': { en: 'Additional CSS classes for the root element.', zh: '根元素额外的 CSS 类。' },
  'switch.api.slot': { en: 'Custom thumb content.', zh: '自定义滑块内容。' },
  'breadcrumb.description': {
    en: 'Breadcrumb navigation that wraps the ui/breadcrumb primitives for quick list-driven usage.',
    zh: '面包屑导航，封装 ui/breadcrumb 基元以便快速使用数组驱动。',
  },
  'breadcrumb.home': { en: 'Home', zh: '首页' },
  'breadcrumb.components': { en: 'Components', zh: '组件' },
  'breadcrumb.breadcrumb': { en: 'Breadcrumb', zh: '面包屑' },
  'breadcrumb.settings': { en: 'Settings', zh: '设置' },
  'breadcrumb.profile': { en: 'Profile', zh: '个人资料' },
  'breadcrumb.customKeys': { en: 'Custom label/href keys', zh: '自定义 label/href 键名' },
  'breadcrumb.api.list': { en: 'Array of route items with label and href keys.', zh: '路由条目数组，包含 label 和 href 键。' },
  'breadcrumb.api.labelKey': { en: 'Object key for the display text. Default: "name".', zh: '显示文本的对象键名。默认："name"。' },
  'breadcrumb.api.hrefKey': { en: 'Object key for the link URL. Default: "href".', zh: '链接 URL 的对象键名。默认："href"。' },
}

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') return 'en'
  try {
    const savedLocale = window.localStorage.getItem('pf-ui-locale')
    if (savedLocale === 'en' || savedLocale === 'zh') return savedLocale
  } catch {
    // Ignore unavailable storage and fall back to the browser language.
  }
  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export const locale = ref<Locale>(getInitialLocale())

export const localeOptions = computed(() => [
  { value: 'en' as const, label: messages['locale.en'][locale.value], title: 'English' },
  { value: 'zh' as const, label: messages['locale.zh'][locale.value], title: '中文' },
])

export const setLocale = (value: Locale) => {
  locale.value = value
  try {
    window.localStorage.setItem('pf-ui-locale', value)
  } catch {
    // Storage can be unavailable in restricted browser contexts; the UI still works for this session.
  }
}

export const t = (key: MessageKey) => messages[key][locale.value]
