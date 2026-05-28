<script setup lang="ts">
import { computed, ref } from 'vue'
import PfInput from '@/components/pf-input/PfInput.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const name = ref('Potato UI')
const usageCode = computed(() => dedent`
  <PfInput v-model="name" placeholder="Project name" />
  <PfInput v-model="email" type="email" size="lg" />
  <PfInput v-model="keyword" invalid placeholder="Invalid state" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfInput</h1>
      <p>{{ t('input.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-input --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 360px); display: grid; gap: 12px;">
          <PfInput v-model="name" :placeholder="t('input.placeholder')" />
          <PfInput type="email" placeholder="hello@potato.dev" size="lg" />
          <PfInput placeholder="Invalid input" invalid />
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
          <tr><td>modelValue</td><td>string | number</td><td>{{ t('input.api.modelValue') }}</td></tr>
          <tr><td>type</td><td>string</td><td>{{ t('input.api.type') }}</td></tr>
          <tr><td>size</td><td>sm | md | lg</td><td>{{ t('input.api.size') }}</td></tr>
          <tr><td>invalid</td><td>boolean</td><td>{{ t('input.api.invalid') }}</td></tr>
          <tr><td>class</td><td>string</td><td>{{ t('input.api.class') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>class-variance-authority, clsx, tailwind-merge, pf-theme</PfCode>
    </section>
  </article>
</template>
