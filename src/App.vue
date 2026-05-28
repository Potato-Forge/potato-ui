<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BreadcrumbPage from './docs/pages/BreadcrumbPage.vue'
import ButtonPage from './docs/pages/ButtonPage.vue'
import CardPage from './docs/pages/CardPage.vue'
import CheckboxPage from './docs/pages/CheckboxPage.vue'
import ColorPickerPage from './docs/pages/ColorPickerPage.vue'
import ConfigProviderPage from './docs/pages/ConfigProviderPage.vue'
import DataTablePage from './docs/pages/DataTablePage.vue'
import DividePage from './docs/pages/DividePage.vue'
import EmptyPage from './docs/pages/EmptyPage.vue'
import FormPage from './docs/pages/FormPage.vue'
import HelpPage from './docs/pages/HelpPage.vue'
import IconPickerPage from './docs/pages/IconPickerPage.vue'
import IconsPage from './docs/pages/IconsPage.vue'
import ImgPage from './docs/pages/ImgPage.vue'
import InputPage from './docs/pages/InputPage.vue'
import LoadingPage from './docs/pages/LoadingPage.vue'
import ModalPage from './docs/pages/ModalPage.vue'
import RadioGroupPage from './docs/pages/RadioGroupPage.vue'
import SelectPage from './docs/pages/SelectPage.vue'
import SidebarPage from './docs/pages/SidebarPage.vue'
import SwitchPage from './docs/pages/SwitchPage.vue'
import TextareaPage from './docs/pages/TextareaPage.vue'
import TextPage from './docs/pages/TextPage.vue'
import ThemePage from './docs/pages/ThemePage.vue'
import ToastPage from './docs/pages/ToastPage.vue'
import TooltipPage from './docs/pages/TooltipPage.vue'
import TreePage from './docs/pages/TreePage.vue'
import UploadPage from './docs/pages/UploadPage.vue'
import { PfToastProvider } from './components/pf-toast'
import { locale, localeOptions, setLocale, t } from './docs/i18n'

type ThemeMode = 'system' | 'light' | 'dark'

const routes = {
  '/components/breadcrumb': BreadcrumbPage,
  '/components/button': ButtonPage,
  '/components/card': CardPage,
  '/components/checkbox': CheckboxPage,
  '/components/color-picker': ColorPickerPage,
  '/components/config-provider': ConfigProviderPage,
  '/components/data-table': DataTablePage,
  '/components/divide': DividePage,
  '/components/empty': EmptyPage,
  '/components/form': FormPage,
  '/components/help': HelpPage,
  '/components/icon-picker': IconPickerPage,
  '/components/img': ImgPage,
  '/components/input': InputPage,
  '/components/loading': LoadingPage,
  '/components/modal': ModalPage,
  '/components/radio-group': RadioGroupPage,
  '/components/select': SelectPage,
  '/components/sidebar': SidebarPage,
  '/components/switch': SwitchPage,
  '/components/textarea': TextareaPage,
  '/components/text': TextPage,
  '/components/toast': ToastPage,
  '/components/tooltip': TooltipPage,
  '/components/tree': TreePage,
  '/components/upload': UploadPage,
  '/foundation/theme': ThemePage,
  '/foundation/icons': IconsPage,
} as const

const navGroups = [
  {
    title: 'nav.general',
    links: [
      { path: '/components/button', label: 'nav.button', subtitle: 'PfButton' },
      { path: '/components/card', label: 'nav.card', subtitle: 'PfCard' },
      { path: '/components/divide', label: 'nav.divide', subtitle: 'PfDivide' },
      { path: '/components/empty', label: 'nav.empty', subtitle: 'PfEmpty' },
      { path: '/components/loading', label: 'nav.loading', subtitle: 'PfLoading' },
      { path: '/components/text', label: 'nav.text', subtitle: 'PfText' },
    ],
  },
  {
    title: 'nav.dataEntry',
    links: [
      { path: '/components/checkbox', label: 'nav.checkbox', subtitle: 'PfCheckbox' },
      { path: '/components/color-picker', label: 'nav.colorPicker', subtitle: 'PfColorPicker' },
      { path: '/components/icon-picker', label: 'nav.iconPicker', subtitle: 'PfIconPicker' },
      { path: '/components/input', label: 'nav.input', subtitle: 'PfInput' },
      { path: '/components/radio-group', label: 'nav.radioGroup', subtitle: 'PfRadioGroup' },
      { path: '/components/select', label: 'nav.select', subtitle: 'PfSelect' },
      { path: '/components/switch', label: 'nav.switch', subtitle: 'PfSwitch' },
      { path: '/components/textarea', label: 'nav.textarea', subtitle: 'PfTextarea' },
      { path: '/components/upload', label: 'nav.upload', subtitle: 'PfUpload' },
    ],
  },
  {
    title: 'nav.feedback',
    links: [
      { path: '/components/help', label: 'nav.help', subtitle: 'PfHelp' },
      { path: '/components/modal', label: 'nav.modal', subtitle: 'PfModal' },
      { path: '/components/toast', label: 'nav.toast', subtitle: 'PfToast' },
      { path: '/components/tooltip', label: 'nav.tooltip', subtitle: 'PfTooltip' },
    ],
  },
  {
    title: 'nav.navigation',
    links: [
      { path: '/components/breadcrumb', label: 'nav.breadcrumb', subtitle: 'PfBreadcrumb' },
      { path: '/components/sidebar', label: 'nav.sidebar', subtitle: 'PfSidebar' },
      { path: '/components/tree', label: 'nav.tree', subtitle: 'PfTree' },
    ],
  },
  {
    title: 'nav.media',
    links: [
      { path: '/components/img', label: 'nav.img', subtitle: 'PfImg' },
    ],
  },
  {
    title: 'nav.pro',
    links: [
      { path: '/components/form', label: 'nav.form', subtitle: 'PfForm' },
      { path: '/components/data-table', label: 'nav.dataTable', subtitle: 'PfDataTable' },
    ],
  },
  {
    title: 'nav.foundation',
    links: [
      { path: '/foundation/theme', label: 'nav.theme', subtitle: '' },
      { path: '/foundation/icons', label: 'nav.icons', subtitle: '' },
    ],
  },
] as const

const currentPath = ref(window.location.pathname)
const themeMode = ref<ThemeMode>('system')
const systemPrefersDark = ref(false)
const themeOptions: { value: ThemeMode; label: Parameters<typeof t>[0]; icon: string }[] = [
  { value: 'system', label: 'theme.system', icon: 'i-tabler-device-desktop' },
  { value: 'light', label: 'theme.light', icon: 'i-tabler-sun' },
  { value: 'dark', label: 'theme.dark', icon: 'i-tabler-moon' },
]

let colorSchemeQuery: MediaQueryList | undefined

const getStoredThemeMode = () => {
  try {
    return window.localStorage.getItem('pf-ui-theme')
  } catch {
    return null
  }
}

const storeThemeMode = (mode: ThemeMode) => {
  try {
    window.localStorage.setItem('pf-ui-theme', mode)
  } catch {
    // Storage can be unavailable in restricted browser contexts; the UI still works for this session.
  }
}

const resolvedTheme = computed(() =>
  themeMode.value === 'system' ? (systemPrefersDark.value ? 'dark' : 'light') : themeMode.value,
)

const setThemeMode = (mode: ThemeMode) => {
  themeMode.value = mode
}

const applyTheme = (theme: 'light' | 'dark') => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

const syncPath = () => {
  currentPath.value = window.location.pathname
}

const syncSystemTheme = (event?: MediaQueryList | MediaQueryListEvent) => {
  systemPrefersDark.value = Boolean(event?.matches)
}

onMounted(() => {
  window.addEventListener('popstate', syncPath)

  const savedThemeMode = getStoredThemeMode()
  if (savedThemeMode === 'system' || savedThemeMode === 'light' || savedThemeMode === 'dark') {
    themeMode.value = savedThemeMode
  }

  colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  syncSystemTheme(colorSchemeQuery)
  colorSchemeQuery.addEventListener('change', syncSystemTheme)
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', syncPath)
  colorSchemeQuery?.removeEventListener('change', syncSystemTheme)
})

watch(
  resolvedTheme,
  (theme) => {
    applyTheme(theme)
  },
  { immediate: true },
)

watch(themeMode, (mode) => {
  storeThemeMode(mode)
})

const navigate = (path: string) => {
  window.history.pushState({}, '', path)
  currentPath.value = path
}

const page = computed(() => routes[currentPath.value as keyof typeof routes] ?? ButtonPage)
</script>

<template>
  <div class="docs-shell">
    <aside class="docs-sidebar">
      <a class="brand" href="/components/button" @click.prevent="navigate('/components/button')">
        <span class="i-pf-logo brand-mark"></span>
        <span>Pf-UI</span>
      </a>

      <div class="control-group" :aria-label="t('theme.mode')">
        <button
          v-for="option in themeOptions"
          :key="option.value"
          type="button"
          :class="{ active: themeMode === option.value }"
          :aria-pressed="themeMode === option.value"
          :aria-label="t(option.label)"
          :title="t(option.label)"
          @click="setThemeMode(option.value)"
        >
          <span :class="option.icon"></span>
          <span class="sr-only">{{ t(option.label) }}</span>
        </button>
      </div>

      <div class="control-group language-switcher" :aria-label="t('locale.label')">
        <button
          v-for="option in localeOptions"
          :key="option.value"
          type="button"
          :class="{ active: locale === option.value }"
          :aria-pressed="locale === option.value"
          :title="option.title"
          @click="setLocale(option.value)"
        >
          {{ option.label }}
        </button>
      </div>

      <nav class="nav-stack">
        <section v-for="group in navGroups" :key="group.title">
          <h2>{{ t(group.title) }}</h2>
          <button
            v-for="link in group.links"
            :key="link.path"
            type="button"
            :class="{ active: currentPath === link.path }"
            @click="navigate(link.path)"
          >
            <span class="nav-label">{{ t(link.label) }}</span>
            <span v-if="link.subtitle" class="nav-subtitle">{{ link.subtitle }}</span>
          </button>
        </section>
      </nav>
    </aside>

    <main class="docs-main">
      <PfToastProvider>
        <component :is="page" />
      </PfToastProvider>
    </main>
  </div>
</template>
