<script setup lang="ts">
import { computed } from 'vue'
import PfSkeleton from '@/components/pf-skeleton/PfSkeleton.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  <PfSkeleton :rows="3" />
  <PfSkeleton circle class="h-12 w-12" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfSkeleton</h1>
      <p>{{ t('skeleton.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-skeleton --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 520px); display: flex; gap: 14px; align-items: center;">
          <PfSkeleton circle class="h-12 w-12" />
          <PfSkeleton :rows="3" />
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
          <tr><td>rows</td><td>number</td><td>{{ t('skeleton.api.rows') }}</td></tr>
          <tr><td>animated</td><td>boolean</td><td>{{ t('skeleton.api.animated') }}</td></tr>
          <tr><td>circle</td><td>boolean</td><td>{{ t('skeleton.api.circle') }}</td></tr>
          <tr><td>class</td><td>string</td><td>{{ t('skeleton.api.class') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
