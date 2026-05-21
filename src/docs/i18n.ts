import { computed, ref } from 'vue'

export type Locale = 'en' | 'zh'

type MessageKey =
  | 'nav.components'
  | 'nav.foundation'
  | 'nav.button'
  | 'nav.tooltip'
  | 'nav.tree'
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

const messages: Record<MessageKey, Record<Locale, string>> = {
  'nav.components': { en: 'Components', zh: '组件' },
  'nav.foundation': { en: 'Foundation', zh: '基础' },
  'nav.button': { en: 'Button', zh: '按钮' },
  'nav.tooltip': { en: 'Tooltip', zh: '提示' },
  'nav.tree': { en: 'Tree', zh: '树' },
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
