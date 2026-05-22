<script setup lang="ts">
import { createHighlighter } from 'shiki'
import type { HTMLAttributes, VNodeChild } from 'vue'
import { cn, dedentStr } from '@/lib/utils'

type SupportedLanguage =
  | 'ts'
  | 'tsx'
  | 'js'
  | 'jsx'
  | 'json'
  | 'vue'
  | 'html'
  | 'css'
  | 'scss'
  | 'sql'
  | 'bash'
  | 'md'

type ResolvedThemeMode = 'light' | 'dark'

const loadedLanguages: SupportedLanguage[] = [
  'ts',
  'tsx',
  'js',
  'jsx',
  'json',
  'vue',
  'html',
  'css',
  'scss',
  'sql',
  'bash',
  'md',
]

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

const getHighlighter = () => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['catppuccin-latte', 'catppuccin-macchiato'],
      langs: loadedLanguages,
    })
  }

  return highlighterPromise
}

const normalizeLanguage = (language: string | undefined): SupportedLanguage => {
  if (!language) return 'vue'

  const normalized = language.trim().toLowerCase()
  if (loadedLanguages.includes(normalized as SupportedLanguage)) {
    return normalized as SupportedLanguage
  }

  return 'vue'
}

const resolveTheme = (mode: ResolvedThemeMode) => {
  return mode === 'dark' ? 'catppuccin-macchiato' : 'catppuccin-latte'
}

const props = withDefaults(
  defineProps<{
    code?: string
    language?: string
    title?: string
    copyable?: boolean
    dedent?: boolean
    class?: HTMLAttributes['class']
  }>(),
  {
    code: '',
    language: '',
    title: '',
    copyable: true,
    dedent: false,
    class: '',
  },
)

const slots = useSlots()
const rootRef = ref<HTMLElement | null>(null)
const copied = ref(false)
const highlightedHtml = ref('')
const renderFailed = ref(false)
const isRendering = ref(false)
const themeMode = ref<ResolvedThemeMode>('light')
let copiedTimer: number | undefined
let themeObserver: MutationObserver | undefined

const slotToText = (children: VNodeChild): string => {
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map((child) => slotToText(child)).join('')
  if (children && typeof children === 'object' && 'children' in children) {
    return slotToText(children.children as VNodeChild)
  }
  return ''
}

const resolvedCode = computed(() => {
  if (props.code) {
    const raw = props.code.trim()
    return props.dedent ? dedentStr(raw) : raw
  }
  return slotToText(slots.default?.() ?? []).trim()
})

const renderHighlight = async () => {
  if (!resolvedCode.value) {
    highlightedHtml.value = ''
    renderFailed.value = false
    return
  }

  isRendering.value = true
  renderFailed.value = false

  try {
    const highlighter = await getHighlighter()
    highlightedHtml.value = highlighter.codeToHtml(resolvedCode.value, {
      lang: normalizeLanguage(props.language),
      theme: resolveTheme(themeMode.value),
    })
  } catch {
    highlightedHtml.value = ''
    renderFailed.value = true
  } finally {
    isRendering.value = false
  }
}

const copyCode = async () => {
  if (!props.copyable || !navigator?.clipboard) return

  const text = resolvedCode.value || rootRef.value?.innerText || ''
  await navigator.clipboard.writeText(text)
  copied.value = true

  if (copiedTimer) {
    window.clearTimeout(copiedTimer)
  }

  copiedTimer = window.setTimeout(() => {
    copied.value = false
  }, 1200)
}

onMounted(() => {
  if (typeof document === 'undefined') return

  const syncTheme = () => {
    themeMode.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  syncTheme()
  themeObserver = new MutationObserver(syncTheme)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme'],
  })
})

onBeforeUnmount(() => {
  if (copiedTimer) {
    window.clearTimeout(copiedTimer)
  }

  themeObserver?.disconnect()
})

watch([resolvedCode, () => props.language, themeMode], () => void renderHighlight(), {
  immediate: true,
})
</script>

<template>
  <figure :class="cn('overflow-hidden rounded-lg border border-border bg-card text-card-foreground', props.class)">
    <figcaption
      v-if="title || language || copyable"
      class="flex items-center justify-between gap-3 border-b border-border px-3 py-2"
    >
      <div class="min-w-0 flex items-center gap-2 text-xs text-muted-foreground">
        <span v-if="title" class="truncate font-medium text-foreground">{{ title }}</span>
        <span v-if="language" class="uppercase">{{ language }}</span>
      </div>

      <button
        v-if="copyable"
        type="button"
        class="h-7 inline-flex items-center gap-1 rounded-md px-2 text-xs text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        @click="copyCode"
      >
        <span :class="copied ? 'i-tabler-check' : 'i-tabler-copy'" aria-hidden="true"></span>
        <span>{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </figcaption>

    <div v-if="renderFailed" class="bg-muted/80">
      <pre
        ref="rootRef"
        class="m-0 overflow-auto p-4 text-sm leading-6 text-foreground"
      ><code class="font-mono"><slot>{{ resolvedCode }}</slot></code></pre>
    </div>

    <div v-else-if="isRendering" class="bg-muted/80 p-4 text-sm text-muted-foreground">
      正在渲染代码高亮...
    </div>

    <div
      v-else
      ref="rootRef"
      class="pf-code-highlight"
      v-html="highlightedHtml"
    ></div>
  </figure>
</template>

<style scoped>
.pf-code-highlight :deep(pre) {
  margin: 0;
  overflow: auto;
  padding: 1rem;
  font-size: 0.875rem;
  line-height: 1.6;
}

.pf-code-highlight :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
}
</style>
