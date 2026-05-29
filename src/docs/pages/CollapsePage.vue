<script setup lang="ts">
import { computed, ref } from 'vue'
import PfCollapse from '@/components/pf-collapse/PfCollapse.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const open = ref(true)
const usageCode = computed(() => dedent`
  <PfCollapse v-model="open" title="Advanced filters" description="Optional query fields">
    Put secondary content here.
  </PfCollapse>
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfCollapse</h1>
      <p>{{ t('collapse.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-forge/cli add pf-collapse</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 520px);">
          <PfCollapse
            v-model="open"
            :title="t('collapse.previewTitle')"
            :description="t('collapse.previewDescription')"
          >
            {{ t('collapse.previewBody') }}
          </PfCollapse>
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
          <tr><td>modelValue</td><td>boolean</td><td>{{ t('collapse.api.modelValue') }}</td></tr>
          <tr><td>title / description</td><td>string</td><td>{{ t('collapse.api.text') }}</td></tr>
          <tr><td>size</td><td>sm | md | lg</td><td>{{ t('collapse.api.size') }}</td></tr>
          <tr><td>slots</td><td>title / description / default</td><td>{{ t('collapse.api.slots') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
