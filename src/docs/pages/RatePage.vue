<script setup lang="ts">
import { computed, ref } from 'vue'
import PfRate from '@/components/pf-rate/PfRate.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const score = ref<number | null>(3)
const usageCode = computed(() => dedent`
  <PfRate v-model="score" clearable />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfRate</h1>
      <p>{{ t('rate.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-rate --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfRate v-model="score" clearable />
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
          <tr><td>modelValue</td><td>number | null</td><td>{{ t('rate.api.modelValue') }}</td></tr>
          <tr><td>count</td><td>number</td><td>{{ t('rate.api.count') }}</td></tr>
          <tr><td>clearable</td><td>boolean</td><td>{{ t('rate.api.clearable') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
