import { computed, ref } from 'vue'

export type Locale = 'en' | 'zh'

type MessageKey =
  | 'nav.components'
  | 'nav.alert'
  | 'nav.badge'
  | 'nav.foundation'
  | 'nav.general'
  | 'nav.dataEntry'
  | 'nav.feedback'
  | 'nav.navigation'
  | 'nav.media'
  | 'nav.pro'
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
  | 'nav.checkbox'
  | 'nav.colorPicker'
  | 'nav.configProvider'
  | 'nav.help'
  | 'nav.iconPicker'
  | 'nav.img'
  | 'nav.input'
  | 'nav.modal'
  | 'nav.pagination'
  | 'nav.radioGroup'
  | 'nav.select'
  | 'nav.sidebar'
  | 'nav.toast'
  | 'nav.tabs'
  | 'nav.textarea'
  | 'nav.upload'
  | 'nav.dataTable'
  | 'nav.form'
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
  | 'checkbox.indeterminateState'
  | 'checkbox.api.modelValue'
  | 'checkbox.api.class'
  | 'colorPicker.default'
  | 'colorPicker.withSwatches'
  | 'colorPicker.hideContrast'
  | 'colorPicker.playground'
  | 'colorPicker.prop.format'
  | 'colorPicker.prop.options'
  | 'colorPicker.prop.swatches'
  | 'colorPicker.prop.contrast'
  | 'colorPicker.prop.defaultSwatches'
  | 'colorPicker.prop.disabled'
  | 'colorPicker.api.modelValue'
  | 'colorPicker.api.format'
  | 'colorPicker.api.swatches'
  | 'colorPicker.api.hideContrast'
  | 'colorPicker.api.hideDefaults'
  | 'colorPicker.api.disabled'
  | 'colorPicker.api.slot'
  | 'colorPicker.api.emits'
  | 'configProvider.wrapped'
  | 'configProvider.api.slot'
  | 'help.whatIsThis'
  | 'help.richContent'
  | 'help.richTitle'
  | 'help.richBody'
  | 'help.simpleUsage'
  | 'help.slotUsage'
  | 'help.api.position'
  | 'help.api.slot'
  | 'iconPicker.customTrigger'
  | 'iconPicker.api.slot'
  | 'img.loading'
  | 'img.error'
  | 'img.fallback'
  | 'img.prop.objectFit'
  | 'img.prop.aspectRatio'
  | 'img.prop.options'
  | 'img.prop.preview'
  | 'img.prop.rounded'
  | 'img.api.fallbackSrc'
  | 'img.api.preview'
  | 'img.api.previewSrcList'
  | 'img.api.objectFit'
  | 'img.api.aspectRatio'
  | 'img.api.rounded'
  | 'img.api.loading'
  | 'img.api.error'
  | 'img.api.slots'
  | 'modal.basicTitle'
  | 'modal.basicDescription'
  | 'modal.openBasic'
  | 'modal.bodyContent'
  | 'modal.confirmTitle'
  | 'modal.confirm'
  | 'modal.cancel'
  | 'modal.openConfirm'
  | 'modal.confirmBody'
  | 'modal.deleteTitle'
  | 'modal.deleteBtn'
  | 'modal.deleteBody'
  | 'modal.pluginUsage'
  | 'modal.confirmAction'
  | 'modal.areYouSure'
  | 'modal.api.description'
  | 'modal.api.positiveText'
  | 'modal.api.negativeText'
  | 'modal.api.positiveLoading'
  | 'modal.api.emits'
  | 'modal.api.composable'
  | 'sidebar.dashboard'
  | 'sidebar.overview'
  | 'sidebar.analytics'
  | 'sidebar.settings'
  | 'sidebar.profile'
  | 'sidebar.security'
  | 'sidebar.help'
  | 'sidebar.api.typeNote'
  | 'toast.successMsg'
  | 'toast.errorTitle'
  | 'toast.errorDesc'
  | 'toast.infoMsg'
  | 'toast.warningMsg'
  | 'toast.tip'
  | 'toast.tipMsg'
  | 'toast.risk'
  | 'toast.riskMsg'
  | 'toast.operationSuccess'
  | 'toast.operationFailed'
  | 'toast.pleaseRetry'
  | 'toast.newUpdate'
  | 'toast.unsavedChanges'
  | 'toast.proTip'
  | 'toast.securityAlert'
  | 'toast.withOptions'
  | 'toast.saved'
  | 'toast.api.success'
  | 'toast.api.error'
  | 'toast.api.info'
  | 'toast.api.warning'
  | 'toast.api.tip'
  | 'toast.api.risk'
  | 'toast.api.provider'
  | 'upload.dragMode'
  | 'upload.buttonMode'
  | 'upload.galleryMode'
  | 'upload.withHandler'
  | 'upload.api.modelValue'
  | 'upload.api.trigger'
  | 'upload.api.listType'
  | 'upload.api.maxFiles'
  | 'upload.api.uploadHandler'
  | 'upload.api.emits'
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
  | 'input.description'
  | 'input.placeholder'
  | 'input.api.modelValue'
  | 'input.api.type'
  | 'input.api.size'
  | 'input.api.invalid'
  | 'input.api.class'
  | 'textarea.description'
  | 'textarea.placeholder'
  | 'textarea.api.modelValue'
  | 'textarea.api.rows'
  | 'textarea.api.resize'
  | 'textarea.api.invalid'
  | 'textarea.api.class'
  | 'select.description'
  | 'select.placeholder'
  | 'select.api.modelValue'
  | 'select.api.options'
  | 'select.api.placeholder'
  | 'select.api.size'
  | 'select.api.invalid'
  | 'radioGroup.description'
  | 'radioGroup.api.modelValue'
  | 'radioGroup.api.options'
  | 'radioGroup.api.name'
  | 'radioGroup.api.orientation'
  | 'radioGroup.api.disabled'
  | 'badge.description'
  | 'badge.api.variant'
  | 'badge.api.type'
  | 'badge.api.size'
  | 'badge.api.dot'
  | 'alert.description'
  | 'alert.infoTitle'
  | 'alert.infoDesc'
  | 'alert.successTitle'
  | 'alert.warningTitle'
  | 'alert.api.type'
  | 'alert.api.title'
  | 'alert.api.description'
  | 'alert.api.closable'
  | 'alert.api.close'
  | 'tabs.description'
  | 'tabs.current'
  | 'tabs.api.modelValue'
  | 'tabs.api.items'
  | 'tabs.api.orientation'
  | 'tabs.api.slot'
  | 'pagination.description'
  | 'pagination.api.modelValue'
  | 'pagination.api.total'
  | 'pagination.api.pageSize'
  | 'pagination.api.siblingCount'
  | 'pagination.api.change'
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
  | 'checkbox.description'
  | 'checkbox.basicUsage'
  | 'checkbox.checked'
  | 'checkbox.unchecked'
  | 'checkbox.disabled'
  | 'checkbox.withLabel'
  | 'checkbox.api.checked'
  | 'checkbox.api.disabled'
  | 'checkbox.api.value'
  | 'checkbox.api.id'
  | 'checkbox.api.slots'
  | 'colorPicker.description'
  | 'colorPicker.basicUsage'
  | 'colorPicker.selectColor'
  | 'colorPicker.currentColor'
  | 'colorPicker.api.color'
  | 'colorPicker.api.colors'
  | 'colorPicker.api.showAlpha'
  | 'configProvider.description'
  | 'configProvider.basicUsage'
  | 'configProvider.api.theme'
  | 'configProvider.api.locale'
  | 'help.description'
  | 'help.basicUsage'
  | 'help.clickForHelp'
  | 'help.helpContent'
  | 'help.api.content'
  | 'help.api.placement'
  | 'help.api.icon'
  | 'iconPicker.description'
  | 'iconPicker.basicUsage'
  | 'iconPicker.searchIcons'
  | 'iconPicker.selectedIcon'
  | 'iconPicker.api.modelValue'
  | 'iconPicker.api.searchable'
  | 'iconPicker.api.columns'
  | 'img.description'
  | 'img.basicUsage'
  | 'img.lazyLoad'
  | 'img.api.src'
  | 'img.api.alt'
  | 'img.api.lazy'
  | 'img.api.fit'
  | 'modal.description'
  | 'modal.basicUsage'
  | 'modal.openModal'
  | 'modal.closeModal'
  | 'modal.modalTitle'
  | 'modal.modalContent'
  | 'modal.api.open'
  | 'modal.api.title'
  | 'modal.api.size'
  | 'modal.api.slots'
  | 'sidebar.description'
  | 'sidebar.basicUsage'
  | 'sidebar.menuItem'
  | 'sidebar.collapse'
  | 'sidebar.api.items'
  | 'sidebar.api.collapsible'
  | 'sidebar.api.slots'
  | 'toast.description'
  | 'toast.basicUsage'
  | 'toast.success'
  | 'toast.error'
  | 'toast.warning'
  | 'toast.info'
  | 'toast.showToast'
  | 'toast.api.message'
  | 'toast.api.type'
  | 'toast.api.duration'
  | 'upload.description'
  | 'upload.basicUsage'
  | 'upload.dragDrop'
  | 'upload.selectFile'
  | 'upload.api.accept'
  | 'upload.api.multiple'
  | 'upload.api.maxSize'
  | 'upload.api.slots'
  | 'dataTable.description'
  | 'dataTable.overview'
  | 'dataTable.overviewDesc'
  | 'dataTable.feature.crud'
  | 'dataTable.feature.promise'
  | 'dataTable.feature.query'
  | 'dataTable.feature.container'
  | 'dataTable.feature.action'
  | 'dataTable.example.name'
  | 'dataTable.example.status'
  | 'dataTable.example.email'
  | 'dataTable.api.columns'
  | 'dataTable.api.rowKey'
  | 'dataTable.api.containerMode'
  | 'dataTable.api.request'
  | 'dataTable.api.createRequest'
  | 'dataTable.api.updateRequest'
  | 'dataTable.api.deleteRequest'
  | 'dataTable.api.detailRequest'
  | 'dataTable.api.formRules'
  | 'dataTable.api.hideActions'
  | 'dataTable.api.actionColumn'
  | 'dataTable.api.autoFetch'
  | 'dataTable.api.emitQuery'
  | 'dataTable.api.emitCreated'
  | 'dataTable.api.emitUpdated'
  | 'dataTable.api.emitDeleted'
  | 'dataTable.demoHint'
  | 'formPage.description'
  | 'formPage.overview'
  | 'formPage.overviewDesc'
  | 'formPage.feature.tanstack'
  | 'formPage.feature.zod'
  | 'formPage.feature.types'
  | 'formPage.feature.modes'
  | 'formPage.feature.conditional'
  | 'formPage.fieldTypes'
  | 'formPage.type.component'
  | 'formPage.type.config'
  | 'formPage.type.textDesc'
  | 'formPage.type.textConfig'
  | 'formPage.type.optionsDesc'
  | 'formPage.type.iconConfig'
  | 'formPage.example.name'
  | 'formPage.example.email'
  | 'formPage.example.role'
  | 'formPage.example.active'
  | 'formPage.example.birthday'
  | 'formPage.api.formConfig'
  | 'formPage.api.formData'
  | 'formPage.api.formMode'
  | 'formPage.api.columnsPerRow'
  | 'formPage.api.formRules'
  | 'formPage.api.onSubmit'
  | 'formPage.api.onChange'

const messages: Record<MessageKey, Record<Locale, string>> = {
  'nav.components': { en: 'Components', zh: '组件' },
  'nav.alert': { en: 'Alert', zh: '警告提示' },
  'nav.badge': { en: 'Badge', zh: '徽标' },
  'nav.foundation': { en: 'Foundation', zh: '基础' },
  'nav.general': { en: 'General', zh: '通用' },
  'nav.dataEntry': { en: 'Data Entry', zh: '数据录入' },
  'nav.feedback': { en: 'Feedback', zh: '反馈' },
  'nav.navigation': { en: 'Navigation', zh: '导航' },
  'nav.media': { en: 'Media', zh: '媒体' },
  'nav.pro': { en: 'Pro Components', zh: '复杂组件' },
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
  'nav.checkbox': { en: 'Checkbox', zh: '多选框' },
  'nav.colorPicker': { en: 'Color Picker', zh: '颜色选择器' },
  'nav.configProvider': { en: 'Config Provider', zh: '全局配置' },
  'nav.help': { en: 'Help', zh: '帮助' },
  'nav.iconPicker': { en: 'Icon Picker', zh: '图标选择器' },
  'nav.img': { en: 'Img', zh: '图片' },
  'nav.input': { en: 'Input', zh: '输入框' },
  'nav.modal': { en: 'Modal', zh: '模态框' },
  'nav.pagination': { en: 'Pagination', zh: '分页' },
  'nav.radioGroup': { en: 'Radio Group', zh: '单选组' },
  'nav.select': { en: 'Select', zh: '选择器' },
  'nav.sidebar': { en: 'Sidebar', zh: '侧边栏' },
  'nav.toast': { en: 'Toast', zh: '消息提示' },
  'nav.tabs': { en: 'Tabs', zh: '标签页' },
  'nav.textarea': { en: 'Textarea', zh: '文本域' },
  'nav.upload': { en: 'Upload', zh: '上传' },
  'nav.dataTable': { en: 'Data Table', zh: '数据表格' },
  'nav.form': { en: 'Form', zh: '表单' },
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
  'input.description': {
    en: 'Native input wrapper with semantic tokens, sizes, invalid state, and v-model support.',
    zh: '原生输入框封装，支持语义 token、尺寸、校验态和 v-model。',
  },
  'input.placeholder': { en: 'Project name', zh: '项目名称' },
  'input.api.modelValue': { en: 'Two-way bound input value.', zh: '双向绑定的输入值。' },
  'input.api.type': { en: 'Native input type.', zh: '原生 input 类型。' },
  'input.api.size': { en: 'Input height and text size.', zh: '输入框高度和字号。' },
  'input.api.invalid': { en: 'Render validation error styling.', zh: '渲染校验错误样式。' },
  'input.api.class': { en: 'Additional CSS classes.', zh: '额外 CSS 类。' },
  'textarea.description': {
    en: 'Textarea wrapper for longer input with resize control and validation state.',
    zh: '用于长文本输入的文本域封装，支持 resize 控制和校验态。',
  },
  'textarea.placeholder': { en: 'Write release notes...', zh: '填写发布说明...' },
  'textarea.api.modelValue': { en: 'Two-way bound textarea value.', zh: '双向绑定的文本域内容。' },
  'textarea.api.rows': { en: 'Native visible row count.', zh: '原生可见行数。' },
  'textarea.api.resize': { en: 'CSS resize behavior.', zh: 'CSS resize 行为。' },
  'textarea.api.invalid': { en: 'Render validation error styling.', zh: '渲染校验错误样式。' },
  'textarea.api.class': { en: 'Additional CSS classes.', zh: '额外 CSS 类。' },
  'select.description': {
    en: 'Lightweight native select for common option lists without adding popup dependencies.',
    zh: '轻量原生选择器，用于常见选项列表，不增加弹层运行时依赖。',
  },
  'select.placeholder': { en: 'Select role', zh: '选择角色' },
  'select.api.modelValue': { en: 'Two-way bound selected value.', zh: '双向绑定的选中值。' },
  'select.api.options': { en: 'List of label/value options.', zh: 'label/value 选项列表。' },
  'select.api.placeholder': { en: 'Disabled placeholder option.', zh: '禁用的占位选项。' },
  'select.api.size': { en: 'Select height and text size.', zh: '选择器高度和字号。' },
  'select.api.invalid': { en: 'Render validation error styling.', zh: '渲染校验错误样式。' },
  'radioGroup.description': {
    en: 'Radio option group for exclusive choices with optional descriptions and orientation control.',
    zh: '用于互斥选择的单选组，支持选项描述和方向控制。',
  },
  'radioGroup.api.modelValue': { en: 'Two-way bound selected value.', zh: '双向绑定的选中值。' },
  'radioGroup.api.options': { en: 'List of radio options.', zh: '单选项列表。' },
  'radioGroup.api.name': { en: 'Native radio group name.', zh: '原生 radio 组 name。' },
  'radioGroup.api.orientation': { en: 'Horizontal or vertical layout.', zh: '水平或垂直布局。' },
  'radioGroup.api.disabled': { en: 'Disable every option.', zh: '禁用全部选项。' },
  'badge.description': {
    en: 'Compact status label for states, tags, and small metadata.',
    zh: '紧凑状态标记，用于状态、标签和小型元信息。',
  },
  'badge.api.variant': { en: 'Visual treatment.', zh: '视觉样式。' },
  'badge.api.type': { en: 'Semantic color.', zh: '语义颜色。' },
  'badge.api.size': { en: 'Badge dimensions.', zh: '徽标尺寸。' },
  'badge.api.dot': { en: 'Show a leading status dot.', zh: '显示前置状态点。' },
  'alert.description': {
    en: 'Inline feedback block for contextual info, success, warning, and error messages.',
    zh: '上下文反馈块，用于信息、成功、警告和错误消息。',
  },
  'alert.infoTitle': { en: 'Registry component', zh: 'Registry 组件' },
  'alert.infoDesc': { en: 'Source files are copied into the consumer app.', zh: '源码文件会复制到消费项目中。' },
  'alert.successTitle': { en: 'Changes saved', zh: '更改已保存' },
  'alert.warningTitle': { en: 'Review required before publish', zh: '发布前需要审查' },
  'alert.api.type': { en: 'Semantic feedback type.', zh: '语义反馈类型。' },
  'alert.api.title': { en: 'Primary alert title.', zh: '提示主标题。' },
  'alert.api.description': { en: 'Supporting alert description.', zh: '提示辅助说明。' },
  'alert.api.closable': { en: 'Show close button.', zh: '显示关闭按钮。' },
  'alert.api.close': { en: 'Emitted when close button is clicked.', zh: '点击关闭按钮时触发。' },
  'tabs.description': {
    en: 'Controlled tab switcher for compact page sections and settings surfaces.',
    zh: '受控标签页切换器，用于紧凑页面区块和设置界面。',
  },
  'tabs.current': { en: 'Current tab', zh: '当前标签' },
  'tabs.api.modelValue': { en: 'Selected tab value.', zh: '选中的标签值。' },
  'tabs.api.items': { en: 'Tab label/value definitions.', zh: '标签的 label/value 定义。' },
  'tabs.api.orientation': { en: 'Horizontal or vertical layout.', zh: '水平或垂直布局。' },
  'tabs.api.slot': { en: 'Receives the selected value.', zh: '接收当前选中值。' },
  'pagination.description': {
    en: 'Pagination control for list and table pages with sibling page buttons.',
    zh: '用于列表和表格页的分页控件，支持相邻页按钮。',
  },
  'pagination.api.modelValue': { en: 'Current page number.', zh: '当前页码。' },
  'pagination.api.total': { en: 'Total item count.', zh: '总条目数。' },
  'pagination.api.pageSize': { en: 'Items per page.', zh: '每页条目数。' },
  'pagination.api.siblingCount': { en: 'Visible page buttons around current page.', zh: '当前页两侧可见页码数量。' },
  'pagination.api.change': { en: 'Emitted after page changes.', zh: '页码变化后触发。' },
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
  'checkbox.description': {
    en: 'Checkbox component with label support, disabled state, and two-way binding.',
    zh: '多选框组件，支持标签文本、禁用状态和双向绑定。',
  },
  'checkbox.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'checkbox.checked': { en: 'Checked', zh: '已选中' },
  'checkbox.unchecked': { en: 'Unchecked', zh: '未选中' },
  'checkbox.disabled': { en: 'Disabled', zh: '禁用' },
  'checkbox.withLabel': { en: 'With Label', zh: '带标签' },
  'checkbox.api.checked': { en: 'Two-way bound checked state.', zh: '双向绑定的选中状态。' },
  'checkbox.api.disabled': { en: 'Disable the checkbox.', zh: '禁用多选框。' },
  'checkbox.api.value': { en: 'Value emitted when checked.', zh: '选中时发出的值。' },
  'checkbox.api.id': { en: 'HTML id attribute.', zh: 'HTML id 属性。' },
  'checkbox.api.slots': { en: 'Custom label content.', zh: '自定义标签内容。' },
  'colorPicker.description': {
    en: 'Color picker component supporting preset palettes, alpha channel, and two-way binding.',
    zh: '颜色选择器组件，支持预设色板、透明度通道和双向绑定。',
  },
  'colorPicker.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'colorPicker.selectColor': { en: 'Select a color', zh: '选择颜色' },
  'colorPicker.currentColor': { en: 'Current: {color}', zh: '当前：{color}' },
  'colorPicker.api.color': { en: 'Two-way bound color value.', zh: '双向绑定的颜色值。' },
  'colorPicker.api.colors': { en: 'Array of preset colors to display.', zh: '预设颜色数组。' },
  'colorPicker.api.showAlpha': { en: 'Show alpha channel slider.', zh: '显示透明度滑块。' },
  'configProvider.description': {
    en: 'Global configuration provider for theme, locale, and shared settings across the app.',
    zh: '全局配置提供者，用于在应用内共享主题、语言等设置。',
  },
  'configProvider.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'configProvider.api.theme': { en: 'Theme configuration object.', zh: '主题配置对象。' },
  'configProvider.api.locale': { en: 'Locale override for child components.', zh: '子组件的语言覆盖。' },
  'help.description': {
    en: 'Help tooltip component providing contextual guidance with icon trigger.',
    zh: '帮助提示组件，通过图标触发提供上下文指导。',
  },
  'help.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'help.clickForHelp': { en: 'Click for help', zh: '点击获取帮助' },
  'help.helpContent': { en: 'This is a helpful tip to guide users.', zh: '这是一条引导用户的有用提示。' },
  'help.api.content': { en: 'Help text or HTML content.', zh: '帮助文本或 HTML 内容。' },
  'help.api.placement': { en: 'Tooltip placement relative to the trigger.', zh: '提示相对于触发器的位置。' },
  'help.api.icon': { en: 'Custom icon class for the help trigger.', zh: '帮助触发器的自定义图标类。' },
  'iconPicker.description': {
    en: 'Icon picker component with search, grid layout, and two-way binding for selecting icons.',
    zh: '图标选择器组件，支持搜索、网格布局和双向绑定选择图标。',
  },
  'iconPicker.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'iconPicker.searchIcons': { en: 'Search icons...', zh: '搜索图标...' },
  'iconPicker.selectedIcon': { en: 'Selected: {icon}', zh: '已选：{icon}' },
  'iconPicker.api.modelValue': { en: 'Two-way bound selected icon name.', zh: '双向绑定的已选图标名称。' },
  'iconPicker.api.searchable': { en: 'Enable icon search input.', zh: '启用图标搜索输入。' },
  'iconPicker.api.columns': { en: 'Number of columns in the icon grid.', zh: '图标网格的列数。' },
  'img.description': {
    en: 'Image component with lazy loading, object-fit control, and fallback placeholder.',
    zh: '图片组件，支持懒加载、对象适配控制和占位回退。',
  },
  'img.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'img.lazyLoad': { en: 'Lazy Load', zh: '懒加载' },
  'img.api.src': { en: 'Image source URL.', zh: '图片源 URL。' },
  'img.api.alt': { en: 'Alt text for accessibility.', zh: '无障碍替代文本。' },
  'img.api.lazy': { en: 'Enable native lazy loading.', zh: '启用原生懒加载。' },
  'img.api.fit': { en: 'CSS object-fit value.', zh: 'CSS object-fit 值。' },
  'modal.description': {
    en: 'Modal dialog component with overlay, title, content slots, and keyboard accessibility.',
    zh: '模态对话框组件，支持遮罩、标题、内容插槽和键盘无障碍访问。',
  },
  'modal.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'modal.openModal': { en: 'Open Modal', zh: '打开模态框' },
  'modal.closeModal': { en: 'Close', zh: '关闭' },
  'modal.modalTitle': { en: 'Modal Title', zh: '模态框标题' },
  'modal.modalContent': {
    en: 'This is the modal content. Click the backdrop or close button to dismiss.',
    zh: '这是模态框内容。点击背景遮罩或关闭按钮可关闭。',
  },
  'modal.api.open': { en: 'Two-way bound visibility state.', zh: '双向绑定的可见状态。' },
  'modal.api.title': { en: 'Header title text.', zh: '头部标题文本。' },
  'modal.api.size': { en: 'Modal width preset.', zh: '模态框宽度预设。' },
  'modal.api.slots': { en: 'Header, body, and footer content areas.', zh: '头部、主体和底部内容区域。' },
  'sidebar.description': {
    en: 'Sidebar navigation component with collapsible sections, menu items, and slot customization.',
    zh: '侧边栏导航组件，支持可折叠区域、菜单项和插槽自定义。',
  },
  'sidebar.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'sidebar.menuItem': { en: 'Menu Item', zh: '菜单项' },
  'sidebar.collapse': { en: 'Collapse', zh: '收起' },
  'sidebar.api.items': { en: 'Array of sidebar menu items.', zh: '侧边栏菜单项数组。' },
  'sidebar.api.collapsible': { en: 'Allow sidebar to be collapsed.', zh: '允许侧边栏收起。' },
  'sidebar.api.slots': { en: 'Custom header, footer, and item rendering.', zh: '自定义头部、底部和项目渲染。' },
  'toast.description': {
    en: 'Toast notification component supporting success, error, warning, and info types with auto-dismiss.',
    zh: '消息提示组件，支持成功、错误、警告和信息类型，可自动关闭。',
  },
  'toast.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'toast.success': { en: 'Operation successful!', zh: '操作成功！' },
  'toast.error': { en: 'Something went wrong.', zh: '出了点问题。' },
  'toast.warning': { en: 'Please check your input.', zh: '请检查你的输入。' },
  'toast.info': { en: 'Here is some information.', zh: '这是一条信息。' },
  'toast.showToast': { en: 'Show Toast', zh: '显示提示' },
  'toast.api.message': { en: 'Toast message content.', zh: '提示消息内容。' },
  'toast.api.type': { en: 'Toast variant type.', zh: '提示变体类型。' },
  'toast.api.duration': { en: 'Auto-dismiss duration in milliseconds.', zh: '自动关闭持续时间（毫秒）。' },
  'upload.description': {
    en: 'File upload component with drag-and-drop, file type filtering, and multi-file support.',
    zh: '文件上传组件，支持拖拽上传、文件类型过滤和多文件上传。',
  },
  'upload.basicUsage': { en: 'Basic Usage', zh: '基础用法' },
  'upload.dragDrop': { en: 'Drag & Drop files here', zh: '拖拽文件到此处' },
  'upload.selectFile': { en: 'Select File', zh: '选择文件' },
  'upload.api.accept': { en: 'Accepted file MIME types or extensions.', zh: '接受的文件 MIME 类型或扩展名。' },
  'upload.api.multiple': { en: 'Allow selecting multiple files.', zh: '允许多文件选择。' },
  'upload.api.maxSize': { en: 'Maximum file size in bytes.', zh: '最大文件大小（字节）。' },
  'upload.api.slots': { en: 'Custom upload trigger and file list rendering.', zh: '自定义上传触发器和文件列表渲染。' },

  'dataTable.description': { en: 'Full-featured CRUD data table built on vxe-table with Promise-driven requests, supporting search, create, edit, delete, and detail views.', zh: '基于 vxe-table 和 Promise 请求函数的全功能 CRUD 数据表格，支持搜索、新增、编辑、删除和详情查看。' },
  'dataTable.overview': { en: 'Overview', zh: '概览' },
  'dataTable.overviewDesc': { en: 'PfDataTable is the most complex component in the library. It integrates form-based query, vxe-table rendering, Promise request hooks, and drawer/modal-based CRUD forms into a single declarative API.', zh: 'PfDataTable 是组件库中最复杂的组件。它将表单查询、vxe-table 渲染、Promise 请求入口和抽屉/模态框 CRUD 表单集成到一个声明式 API 中。' },
  'dataTable.feature.crud': { en: 'Built-in create, read, update, delete operations', zh: '内置增删改查操作' },
  'dataTable.feature.promise': { en: 'Promise-based request props without a bundled async-state library', zh: '基于 Promise 的请求 props，不绑定异步状态库' },
  'dataTable.feature.query': { en: 'Form-based query area with per-column searchable fields', zh: '基于表单的查询区域，支持每列的搜索字段' },
  'dataTable.feature.container': { en: 'Drawer (Sheet) or Modal container for create/edit forms', zh: '抽屉（Sheet）或模态框作为新增/编辑表单容器' },
  'dataTable.feature.action': { en: 'Configurable action column with custom width, alignment, and layout', zh: '可配置的操作列，支持自定义宽度、对齐和布局' },
  'dataTable.example.name': { en: 'Name', zh: '名称' },
  'dataTable.example.status': { en: 'Status', zh: '状态' },
  'dataTable.example.email': { en: 'Email', zh: '邮箱' },
  'dataTable.api.columns': { en: 'Column definitions using PfDataTableItem type.', zh: '使用 PfDataTableItem 类型的列定义。' },
  'dataTable.api.rowKey': { en: 'Unique row identifier. Default: "id".', zh: '行的唯一标识符。默认："id"。' },
  'dataTable.api.containerMode': { en: 'Form container: drawer (Sheet) or modal (Dialog).', zh: '表单容器：drawer（Sheet）或 modal（Dialog）。' },
  'dataTable.api.request': { en: 'Promise function to fetch table rows from query params.', zh: 'Promise 函数，接收查询参数并返回表格行数据。' },
  'dataTable.api.createRequest': { en: 'Promise function to create a new record.', zh: 'Promise 函数，用于创建新记录。' },
  'dataTable.api.updateRequest': { en: 'Promise function to update an existing record.', zh: 'Promise 函数，用于更新已有记录。' },
  'dataTable.api.deleteRequest': { en: 'Promise function to delete a record.', zh: 'Promise 函数，用于删除记录。' },
  'dataTable.api.detailRequest': { en: 'Promise function to fetch record detail.', zh: 'Promise 函数，用于获取记录详情。' },
  'dataTable.api.formRules': { en: 'Form validation rules for create/edit forms.', zh: '新增/编辑表单的校验规则。' },
  'dataTable.api.hideActions': { en: 'Hide individual CRUD action buttons.', zh: '单独隐藏增删改查操作按钮。' },
  'dataTable.api.actionColumn': { en: 'Configure the action column appearance.', zh: '配置操作列的外观。' },
  'dataTable.api.autoFetch': { en: 'Auto-fetch on mount. Default: true.', zh: '挂载时自动拉取数据。默认：true。' },
  'dataTable.api.emitQuery': { en: 'Emitted when the query form is submitted.', zh: '查询表单提交时触发。' },
  'dataTable.api.emitCreated': { en: 'Emitted after a record is created.', zh: '记录创建后触发。' },
  'dataTable.api.emitUpdated': { en: 'Emitted after a record is updated.', zh: '记录更新后触发。' },
  'dataTable.api.emitDeleted': { en: 'Emitted after a record is deleted.', zh: '记录删除后触发。' },
  'dataTable.demoHint': { en: 'This demo uses in-memory mock data. Try searching, creating, editing, and deleting rows — everything works without a server.', zh: '此演示使用内存模拟数据。你可以尝试搜索、新增、编辑和删除行——无需后端即可体验完整 CRUD。' },
  'formPage.description': { en: 'Dynamic form generator powered by @tanstack/vue-form with zod validation, supporting 7 field types with config-driven rendering.', zh: '基于 @tanstack/vue-form 的动态表单生成器，支持 zod 校验和 7 种字段类型的配置驱动渲染。' },
  'formPage.overview': { en: 'Overview', zh: '概览' },
  'formPage.overviewDesc': { en: 'PfForm generates complete forms from a configuration array. Each form field is defined by its type, key, and optional rules. The form supports create/edit modes with field-level filtering and conditional visibility.', zh: 'PfForm 从配置数组生成完整表单。每个表单字段由其类型、键和可选规则定义。表单支持新增/编辑模式，具有字段级过滤和条件可见性。' },
  'formPage.feature.tanstack': { en: '@tanstack/vue-form for performant form state management', zh: '@tanstack/vue-form 高性能表单状态管理' },
  'formPage.feature.zod': { en: 'Optional zod schema validation on submit', zh: '可选的 zod schema 提交时校验' },
  'formPage.feature.types': { en: '7 field types: text, datetime, date, time, options, toggle, icon, upload', zh: '7 种字段类型：text、datetime、date、time、options、toggle、icon、upload' },
  'formPage.feature.modes': { en: 'create/edit modes with per-field visibility control', zh: '新增/编辑模式，支持逐字段可见性控制' },
  'formPage.feature.conditional': { en: 'Conditional field visibility via visibleIf', zh: '通过 visibleIf 实现条件字段可见性' },
  'formPage.fieldTypes': { en: 'Field Types', zh: '字段类型' },
  'formPage.type.component': { en: 'Component', zh: '组件' },
  'formPage.type.config': { en: 'Config', zh: '配置' },
  'formPage.type.textDesc': { en: 'Text input', zh: '文本输入' },
  'formPage.type.textConfig': { en: 'No extra config needed', zh: '无需额外配置' },
  'formPage.type.optionsDesc': { en: 'Select / Combobox / Checkbox group', zh: '下拉选择 / 组合框 / 复选框组' },
  'formPage.type.iconConfig': { en: 'No extra config needed', zh: '无需额外配置' },
  'formPage.example.name': { en: 'Name', zh: '姓名' },
  'formPage.example.email': { en: 'Email', zh: '邮箱' },
  'formPage.example.role': { en: 'Role', zh: '角色' },
  'formPage.example.active': { en: 'Active', zh: '激活' },
  'formPage.example.birthday': { en: 'Birthday', zh: '生日' },
  'formPage.api.formConfig': { en: 'Array of PfFormConfigItem defining each field.', zh: 'PfFormConfigItem 数组，定义每个字段。' },
  'formPage.api.formData': { en: 'Initial form values for edit mode.', zh: '编辑模式下的初始表单值。' },
  'formPage.api.formMode': { en: 'Form mode: create shows all fields, edit filters by edit flag.', zh: '表单模式：create 显示所有字段，edit 根据 edit 标记过滤。' },
  'formPage.api.columnsPerRow': { en: 'Number of form columns per row. Default: 1.', zh: '每行表单列数。默认：1。' },
  'formPage.api.formRules': { en: 'Form-level validation rules (zod schema + custom handlers).', zh: '表单级校验规则（zod schema + 自定义处理器）。' },
  'formPage.api.onSubmit': { en: 'Submit handler receiving validated form data.', zh: '提交处理函数，接收校验后的表单数据。' },
  'formPage.api.onChange': { en: 'Called on every form value change.', zh: '每次表单值变化时调用。' },


  'checkbox.indeterminateState': { en: 'Indeterminate', zh: '半选状态' },
  'checkbox.api.modelValue': { en: 'Two-way bound checked state.', zh: '双向绑定的选中状态。' },
  'checkbox.api.class': { en: 'Additional CSS classes.', zh: '额外的 CSS 类。' },
  'colorPicker.default': { en: 'Default', zh: '默认' },
  'colorPicker.withSwatches': { en: 'With custom swatches', zh: '带自定义色板' },
  'colorPicker.hideContrast': { en: 'Hide contrast ratio', zh: '隐藏对比度' },
  'colorPicker.playground': { en: 'Props playground', zh: 'Props 预览' },
  'colorPicker.prop.format': { en: 'Format', zh: '格式' },
  'colorPicker.prop.options': { en: 'Options', zh: '选项' },
  'colorPicker.prop.swatches': { en: 'Custom swatches', zh: '自定义色板' },
  'colorPicker.prop.contrast': { en: 'Contrast ratio', zh: '对比度' },
  'colorPicker.prop.defaultSwatches': { en: 'Default swatches', zh: '默认色板' },
  'colorPicker.prop.disabled': { en: 'Disabled', zh: '禁用' },
  'colorPicker.api.modelValue': { en: 'HEX color string.', zh: 'HEX 颜色字符串。' },
  'colorPicker.api.format': { en: 'Display format: hex, hsl, or rgb.', zh: '显示格式：hex、hsl 或 rgb。' },
  'colorPicker.api.swatches': { en: 'Extra swatch colors.', zh: '额外的色板颜色。' },
  'colorPicker.api.hideContrast': { en: 'Hide the contrast ratio panel.', zh: '隐藏对比度面板。' },
  'colorPicker.api.hideDefaults': { en: 'Hide the default swatches.', zh: '隐藏默认色板。' },
  'colorPicker.api.disabled': { en: 'Disable the picker.', zh: '禁用颜色选择器。' },
  'colorPicker.api.slot': { en: 'Custom trigger slot.', zh: '自定义触发器插槽。' },
  'colorPicker.api.emits': { en: 'Emits update:modelValue and valueChange.', zh: '触发 update:modelValue 和 valueChange 事件。' },
  'configProvider.wrapped': { en: 'Wrapped content', zh: '被包裹的内容' },
  'configProvider.api.slot': { en: 'The wrapped content.', zh: '被包裹的内容。' },
  'help.whatIsThis': { en: 'What is this?', zh: '这是什么？' },
  'help.richContent': { en: 'Rich content', zh: '富文本内容' },
  'help.richTitle': { en: 'More Details', zh: '更多详情' },
  'help.richBody': { en: 'You can put custom HTML content here.', zh: '你可以在这里放入自定义 HTML 内容。' },
  'help.simpleUsage': { en: 'Simple string content', zh: '简单字符串内容' },
  'help.slotUsage': { en: 'Rich content via slot', zh: '通过插槽使用富文本内容' },
  'help.api.position': { en: 'Tooltip position relative to trigger.', zh: '提示相对于触发器的位置。' },
  'help.api.slot': { en: 'Custom content slot.', zh: '自定义内容插槽。' },
  'iconPicker.customTrigger': { en: 'Custom trigger button', zh: '自定义触发按钮' },
  'iconPicker.api.slot': { en: 'Custom trigger slot.', zh: '自定义触发器插槽。' },
  'img.loading': { en: 'Loading...', zh: '加载中...' },
  'img.error': { en: 'Failed to load', zh: '加载失败' },
  'img.fallback': { en: 'Fallback', zh: '回退图' },
  'img.prop.objectFit': { en: 'Object fit', zh: '对象适配' },
  'img.prop.aspectRatio': { en: 'Aspect ratio', zh: '宽高比' },
  'img.prop.options': { en: 'Options', zh: '选项' },
  'img.prop.preview': { en: 'Preview', zh: '预览' },
  'img.prop.rounded': { en: 'Rounded', zh: '圆角' },
  'img.api.fallbackSrc': { en: 'Fallback image URL when src fails.', zh: '加载失败时使用的回退图片地址。' },
  'img.api.preview': { en: 'Enable click-to-preview with viewerjs.', zh: '启用点击预览（使用 viewerjs）。' },
  'img.api.previewSrcList': { en: 'Additional preview images for gallery.', zh: '预览图库中的额外图片。' },
  'img.api.objectFit': { en: 'CSS object-fit value.', zh: 'CSS object-fit 属性值。' },
  'img.api.aspectRatio': { en: 'Fixed aspect ratio.', zh: '固定宽高比。' },
  'img.api.rounded': { en: 'Apply rounded corners.', zh: '应用圆角样式。' },
  'img.api.loading': { en: 'Loading placeholder text.', zh: '加载占位文本。' },
  'img.api.error': { en: 'Error placeholder text.', zh: '错误占位文本。' },
  'img.api.slots': { en: 'Custom loading and error slots.', zh: '自定义加载和错误状态插槽。' },
  'modal.basicTitle': { en: 'Basic Modal', zh: '基础模态框' },
  'modal.basicDescription': { en: 'This is a basic modal with title and description.', zh: '这是一个带标题和描述的基础模态框。' },
  'modal.openBasic': { en: 'Open Basic Modal', zh: '打开基础模态框' },
  'modal.bodyContent': { en: 'Modal body content goes here.', zh: '模态框正文内容放在这里。' },
  'modal.confirmTitle': { en: 'Confirm Action', zh: '确认操作' },
  'modal.confirm': { en: 'Confirm', zh: '确认' },
  'modal.cancel': { en: 'Cancel', zh: '取消' },
  'modal.openConfirm': { en: 'Open Confirm Modal', zh: '打开确认模态框' },
  'modal.confirmBody': { en: 'Are you sure you want to proceed?', zh: '你确定要继续吗？' },
  'modal.deleteTitle': { en: 'Delete Item', zh: '删除项目' },
  'modal.deleteBtn': { en: 'Delete', zh: '删除' },
  'modal.deleteBody': { en: 'This action cannot be undone.', zh: '此操作不可撤销。' },
  'modal.pluginUsage': { en: 'Plugin / Composable Usage', zh: '插件 / Composable 用法' },
  'modal.confirmAction': { en: 'Confirm action', zh: '确认操作' },
  'modal.areYouSure': { en: 'Are you sure?', zh: '确定吗？' },
  'modal.api.description': { en: 'Supporting text below the title.', zh: '标题下方的辅助说明文字。' },
  'modal.api.positiveText': { en: 'Label for the confirm button.', zh: '确认按钮的文字。' },
  'modal.api.negativeText': { en: 'Label for the cancel button.', zh: '取消按钮的文字。' },
  'modal.api.positiveLoading': { en: 'Show loading state on positive button.', zh: '确认按钮显示加载状态。' },
  'modal.api.emits': { en: 'positive-click, negative-click, update:open.', zh: 'positive-click、negative-click、update:open。' },
  'modal.api.composable': { en: 'usePfModal().open / confirm / closeAll for imperative usage.', zh: 'usePfModal().open / confirm / closeAll 用于命令式调用。' },
  'sidebar.dashboard': { en: 'Dashboard', zh: '仪表盘' },
  'sidebar.overview': { en: 'Overview', zh: '概览' },
  'sidebar.analytics': { en: 'Analytics', zh: '分析' },
  'sidebar.settings': { en: 'Settings', zh: '设置' },
  'sidebar.profile': { en: 'Profile', zh: '个人资料' },
  'sidebar.security': { en: 'Security', zh: '安全' },
  'sidebar.help': { en: 'Help', zh: '帮助' },
  'sidebar.api.typeNote': { en: 'Each item can nest children recursively for multi-level menus.', zh: '每个条目可以递归嵌套子项，实现多级菜单。' },
  'toast.successMsg': { en: 'Operation completed!', zh: '操作完成！' },
  'toast.errorTitle': { en: 'Operation failed', zh: '操作失败' },
  'toast.errorDesc': { en: 'Please try again later.', zh: '请稍后重试。' },
  'toast.infoMsg': { en: 'Here is some information.', zh: '这是一条信息。' },
  'toast.warningMsg': { en: 'Please check your input.', zh: '请检查你的输入。' },
  'toast.tip': { en: 'Tip', zh: '提示' },
  'toast.tipMsg': { en: 'This is a helpful tip.', zh: '这是一条引导用户的有用提示。' },
  'toast.risk': { en: 'Risk', zh: '风险' },
  'toast.riskMsg': { en: 'Security alert!', zh: '安全警告！' },
  'toast.operationSuccess': { en: 'Operation successful!', zh: '操作成功！' },
  'toast.operationFailed': { en: 'Operation failed', zh: '操作失败' },
  'toast.pleaseRetry': { en: 'Please try again.', zh: '请重试。' },
  'toast.newUpdate': { en: 'New update available', zh: '有新版本可用' },
  'toast.unsavedChanges': { en: 'You have unsaved changes.', zh: '你有未保存的更改。' },
  'toast.proTip': { en: 'Pro tip: use keyboard shortcuts.', zh: '小技巧：使用键盘快捷键。' },
  'toast.securityAlert': { en: 'Security alert!', zh: '安全警告！' },
  'toast.withOptions': { en: 'With options', zh: '带选项' },
  'toast.saved': { en: 'Saved!', zh: '已保存！' },
  'toast.api.success': { en: 'Green success notification.', zh: '绿色成功通知。' },
  'toast.api.error': { en: 'Red error notification.', zh: '红色错误通知。' },
  'toast.api.info': { en: 'Blue info notification.', zh: '蓝色信息通知。' },
  'toast.api.warning': { en: 'Yellow warning notification.', zh: '黄色警告通知。' },
  'toast.api.tip': { en: 'Tip-styled notification with lightbulb icon.', zh: '灯泡图标的提示样式通知。' },
  'toast.api.risk': { en: 'Risk-styled notification with shield icon.', zh: '盾牌图标的风险样式通知。' },
  'toast.api.provider': { en: 'PfToastProvider mounts the Toaster instance.', zh: 'PfToastProvider 挂载 Toaster 实例。' },
  'upload.dragMode': { en: 'Drag-and-drop mode', zh: '拖拽上传模式' },
  'upload.buttonMode': { en: 'Button trigger mode', zh: '按钮触发模式' },
  'upload.galleryMode': { en: 'Gallery mode', zh: '图库模式' },
  'upload.withHandler': { en: 'With custom upload handler', zh: '带自定义上传处理器' },
  'upload.api.modelValue': { en: 'Two-way bound file list.', zh: '双向绑定的文件列表。' },
  'upload.api.trigger': { en: 'Upload trigger style.', zh: '上传触发方式。' },
  'upload.api.listType': { en: 'File list display style.', zh: '文件列表显示样式。' },
  'upload.api.maxFiles': { en: 'Maximum number of files.', zh: '最大文件数量。' },
  'upload.api.uploadHandler': { en: 'Custom upload function with progress and abort support.', zh: '自定义上传函数，支持进度和取消。' },
  'upload.api.emits': { en: 'change, remove, error events.', zh: 'change、remove、error 事件。' },

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
