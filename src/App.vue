<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import ButtonPage from './docs/pages/ButtonPage.vue'
import IconsPage from './docs/pages/IconsPage.vue'
import ThemePage from './docs/pages/ThemePage.vue'
import TooltipPage from './docs/pages/TooltipPage.vue'
import TreePage from './docs/pages/TreePage.vue'
import { locale, localeOptions, setLocale, t } from './docs/i18n'

type ThemeMode = 'system' | 'light' | 'dark'

const routes = {
  '/components/button': ButtonPage,
  '/components/tooltip': TooltipPage,
  '/components/tree': TreePage,
  '/foundation/theme': ThemePage,
  '/foundation/icons': IconsPage,
} as const

const navGroups = [
  {
    title: 'nav.components',
    links: [
      { path: '/components/button', label: 'nav.button' },
      { path: '/components/tooltip', label: 'nav.tooltip' },
      { path: '/components/tree', label: 'nav.tree' },
    ],
  },
  {
    title: 'nav.foundation',
    links: [
      { path: '/foundation/theme', label: 'nav.theme' },
      { path: '/foundation/icons', label: 'nav.icons' },
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
            {{ t(link.label) }}
          </button>
        </section>
      </nav>
    </aside>

    <main class="docs-main">
      <component :is="page" />
    </main>
  </div>
</template>
