<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>{{ t('themePage.title') }}</h1>
      <p>{{ t('themePage.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-theme.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">import presetWind4 from '@unocss/preset-wind4'
import { createPfThemePreset } from '@/foundations/pf-theme'

export default defineConfig({
  presets: [presetWind4(), createPfThemePreset()],
})</pre>
    </section>
  </article>
</template>
