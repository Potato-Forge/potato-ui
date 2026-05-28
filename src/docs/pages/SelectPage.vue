<script setup lang="ts">
import { computed, ref } from 'vue'
import PfSelect from '@/components/pf-select/PfSelect.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const role = ref('')
const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
]
const usageCode = computed(() => dedent`
  <PfSelect
    v-model="role"
    :options="roleOptions"
    placeholder="Select role"
  />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfSelect</h1>
      <p>{{ t('select.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-select --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 320px);">
          <PfSelect v-model="role" :options="options" :placeholder="t('select.placeholder')" />
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
          <tr><td>modelValue</td><td>string | number</td><td>{{ t('select.api.modelValue') }}</td></tr>
          <tr><td>options</td><td>PfSelectOption[]</td><td>{{ t('select.api.options') }}</td></tr>
          <tr><td>placeholder</td><td>string</td><td>{{ t('select.api.placeholder') }}</td></tr>
          <tr><td>size</td><td>sm | md | lg</td><td>{{ t('select.api.size') }}</td></tr>
          <tr><td>invalid</td><td>boolean</td><td>{{ t('select.api.invalid') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>class-variance-authority, clsx, tailwind-merge, pf-theme, pf-icons</PfCode>
    </section>
  </article>
</template>
