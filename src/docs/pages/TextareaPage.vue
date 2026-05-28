<script setup lang="ts">
import { computed, ref } from 'vue'
import PfTextarea from '@/components/pf-textarea/PfTextarea.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const content = ref('Build source-distributed Vue components with predictable tokens.')
const usageCode = computed(() => dedent`
  <PfTextarea v-model="content" placeholder="Write something" />
  <PfTextarea v-model="content" :rows="6" resize="none" />
  <PfTextarea v-model="content" invalid />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfTextarea</h1>
      <p>{{ t('textarea.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-textarea --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 420px);">
          <PfTextarea v-model="content" :placeholder="t('textarea.placeholder')" />
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
          <tr><td>modelValue</td><td>string</td><td>{{ t('textarea.api.modelValue') }}</td></tr>
          <tr><td>rows</td><td>number</td><td>{{ t('textarea.api.rows') }}</td></tr>
          <tr><td>resize</td><td>none | vertical | horizontal | both</td><td>{{ t('textarea.api.resize') }}</td></tr>
          <tr><td>invalid</td><td>boolean</td><td>{{ t('textarea.api.invalid') }}</td></tr>
          <tr><td>class</td><td>string</td><td>{{ t('textarea.api.class') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>class-variance-authority, clsx, tailwind-merge, pf-theme</PfCode>
    </section>
  </article>
</template>
