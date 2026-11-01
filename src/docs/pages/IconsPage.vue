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
        <!-- 图标尺寸用 size-* 而不是 text-*：Wind4 的 text-* 只接受字号档位，
             `text-8` 不是合法档位、不生成任何 CSS，图标会退回各自固有尺寸
             （自定义 SVG 因此按 viewBox 撑开）。 -->
        <span class="i-tabler-search size-8 text-primary"></span>
        <span class="i-tabler-chevron-right size-8 text-success"></span>
        <span class="i-pf-logo size-8 text-primary"></span>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="ts" dedent />
    </section>
  </article>
</template>
