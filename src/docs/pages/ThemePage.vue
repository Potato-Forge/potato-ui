<script setup lang="ts">
import { computed } from 'vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  # 主题真源在 potato-design
  pnpm add @potato-forge/ui@alpha

  # uno.config.ts
  import { defineConfig } from 'unocss'
  import presetWind4 from '@unocss/preset-wind4'
  import { presetPotato } from '@potato-forge/ui/preset'
  import { createPfCompatPreset } from './src/foundations/pf-compat'

  export default defineConfig({
    presets: [presetWind4(), presetPotato(), createPfCompatPreset()],
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
      <PfCode>pnpm dlx @potato-forge/cli add pf-theme</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="ts" dedent />
    </section>
  </article>
</template>
