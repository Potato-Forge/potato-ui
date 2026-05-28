<script setup lang="ts">
import { computed } from 'vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  import presetWind4 from '@unocss/preset-wind4'
  import { createPfThemePreset } from '@/foundations/pf-theme'

  export default defineConfig({
    presets: [presetWind4(), createPfThemePreset()],
  })
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>{{ t('themePage.title') }}</h1>
      <p>{{ t('themePage.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-theme --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="ts" dedent />
    </section>
  </article>
</template>
