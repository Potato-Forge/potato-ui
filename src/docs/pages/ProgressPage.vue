<script setup lang="ts">
import { computed, ref } from 'vue'
import PfProgress from '@/components/pf-progress/PfProgress.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const value = ref(64)
const usageCode = computed(() => dedent`
  <PfProgress :value="64" show-label />
  <PfProgress :value="82" type="success" size="lg" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfProgress</h1>
      <p>{{ t('progress.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-progress --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 520px); display: grid; gap: 14px;">
          <PfProgress :value="value" show-label />
          <PfProgress :value="82" type="success" size="lg" />
          <PfProgress :value="38" type="warning" />
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
          <tr><td>value</td><td>number</td><td>{{ t('progress.api.value') }}</td></tr>
          <tr><td>max</td><td>number</td><td>{{ t('progress.api.max') }}</td></tr>
          <tr><td>size</td><td>sm | md | lg</td><td>{{ t('progress.api.size') }}</td></tr>
          <tr><td>type</td><td>primary | success | info | warning | error</td><td>{{ t('progress.api.type') }}</td></tr>
          <tr><td>showLabel</td><td>boolean</td><td>{{ t('progress.api.showLabel') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
