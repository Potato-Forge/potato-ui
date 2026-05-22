<script setup lang="ts">
import { computed } from 'vue'
import PfImg from '@/components/pf-img/PfImg.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  <PfImg
    src="/path/to/image.jpg"
    alt="Description"
    :preview="true"
    :rounded="true"
    aspect-ratio="16/9"
    object-fit="cover"
    fallback-src="/fallback.jpg"
    loading-text="${t('img.loading')}"
    error-text="${t('img.error')}"
  />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfImg</h1>
      <p>{{ t('img.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-img.json</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="gap: 16px; flex-wrap: wrap;">
        <div style="width: 200px; height: 150px;">
          <PfImg
            src="https://picsum.photos/seed/pf-ui/400/300"
            alt="Demo image"
            :preview="true"
            aspect-ratio="4/3"
            class="h-full w-full"
          />
        </div>
        <div style="width: 150px; height: 150px;">
          <PfImg
            src=""
            alt="Broken image"
            fallback-src="https://picsum.photos/seed/fallback/400/300"
            :rounded="true"
            class="h-full w-full"
            object-fit="cover"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="vue" dedent />
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>src</td><td>string | null</td><td>{{ t('img.api.src') }}</td></tr>
          <tr><td>alt</td><td>string</td><td>{{ t('img.api.alt') }}</td></tr>
          <tr><td>fallbackSrc</td><td>string</td><td>{{ t('img.api.fallbackSrc') }}</td></tr>
          <tr><td>preview</td><td>boolean</td><td>{{ t('img.api.preview') }}</td></tr>
          <tr><td>previewSrcList</td><td>string[]</td><td>{{ t('img.api.previewSrcList') }}</td></tr>
          <tr><td>objectFit</td><td>cover | contain | fill | none | scale-down</td><td>{{ t('img.api.objectFit') }}</td></tr>
          <tr><td>aspectRatio</td><td>number | '4/3' | '16/9'</td><td>{{ t('img.api.aspectRatio') }}</td></tr>
          <tr><td>rounded</td><td>boolean</td><td>{{ t('img.api.rounded') }}</td></tr>
          <tr><td>loadingText</td><td>string</td><td>{{ t('img.api.loading') }}</td></tr>
          <tr><td>errorText</td><td>string</td><td>{{ t('img.api.error') }}</td></tr>
          <tr><td>slots</td><td>loading | error</td><td>{{ t('img.api.slots') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>v-viewer, viewerjs, clsx, tailwind-merge, pf-icons, pf-theme</PfCode>
    </section>
  </article>
</template>
