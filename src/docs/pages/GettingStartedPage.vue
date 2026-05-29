<script setup lang="ts">
import { computed } from 'vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const installCode = computed(() => dedent`
  pnpm dlx @potato-ui/cli add pf-button
  pnpm dlx @potato-ui/cli add pf-form
`)

const localDevCode = computed(() => dedent`
  pnpm registry:build
  pnpm pf:add pf-button --cwd ../your-app
`)

const unoCode = computed(() => dedent`
  import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
  import presetWind4 from '@unocss/preset-wind4'
  import { createPfIconsPreset } from './src/foundations/pf-icons'
  import { createPfThemePreset } from './src/foundations/pf-theme'

  export default defineConfig({
    presets: [presetWind4(), createPfThemePreset(), createPfIconsPreset()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    content: {
      pipeline: {
        include: [
          /\\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\\?)/,
          'src/**/*.{js,ts}',
        ],
      },
    },
  })
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>{{ t('gettingStarted.title') }}</h1>
      <p>{{ t('gettingStarted.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('gettingStarted.prerequisites') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>Vue 3</td><td>{{ t('gettingStarted.prereq.vue') }}</td></tr>
          <tr><td>UnoCSS</td><td>{{ t('gettingStarted.prereq.unocss') }}</td></tr>
          <tr><td>@ alias</td><td>{{ t('gettingStarted.prereq.alias') }}</td></tr>
          <tr><td>Node.js</td><td>{{ t('gettingStarted.prereq.node') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('gettingStarted.install') }}</h2>
      <p class="text-muted-foreground">{{ t('gettingStarted.installText') }}</p>
      <PfCode :code="installCode" language="bash" dedent />
    </section>

    <section class="section">
      <h2>{{ t('gettingStarted.dependencies') }}</h2>
      <p class="text-muted-foreground">{{ t('gettingStarted.dependenciesText') }}</p>
    </section>

    <section class="section">
      <h2>{{ t('gettingStarted.unocss') }}</h2>
      <p class="text-muted-foreground">{{ t('gettingStarted.unocssText') }}</p>
      <PfCode :code="unoCode" language="ts" dedent />
    </section>

    <section class="section">
      <h2>{{ t('gettingStarted.localDev') }}</h2>
      <p class="text-muted-foreground">{{ t('gettingStarted.localDevText') }}</p>
      <PfCode :code="localDevCode" language="bash" dedent />
    </section>
  </article>
</template>
