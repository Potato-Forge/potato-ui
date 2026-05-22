<script setup lang="ts">
import { computed } from 'vue'
import { t } from '../i18n'
import { dedent } from '@/lib/utils'

const usageCode = computed(() => dedent`
  import { createPfIconsPreset } from '@/foundations/pf-icons'

  export default defineConfig({
    presets: [createPfIconsPreset()],
  })
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>{{ t('iconsPage.title') }}</h1>
      <p>{{ t('iconsPage.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <span class="i-tabler-search text-8 text-primary"></span>
        <span class="i-tabler-chevron-right text-8 text-success"></span>
        <span class="i-pf-logo text-8 text-primary"></span>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="ts" dedent />
    </section>
  </article>
</template>
