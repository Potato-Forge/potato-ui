<script setup lang="ts">
import { computed, ref } from 'vue'
import PfPagination from '@/components/pf-pagination/PfPagination.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const page = ref(3)
const usageCode = computed(() => dedent`
  <PfPagination v-model="page" :total="128" :page-size="10" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfPagination</h1>
      <p>{{ t('pagination.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-ui/cli add pf-pagination</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfPagination v-model="page" :total="128" :page-size="10" />
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
          <tr><td>modelValue</td><td>number</td><td>{{ t('pagination.api.modelValue') }}</td></tr>
          <tr><td>total</td><td>number</td><td>{{ t('pagination.api.total') }}</td></tr>
          <tr><td>pageSize</td><td>number</td><td>{{ t('pagination.api.pageSize') }}</td></tr>
          <tr><td>siblingCount</td><td>number</td><td>{{ t('pagination.api.siblingCount') }}</td></tr>
          <tr><td>change</td><td>event</td><td>{{ t('pagination.api.change') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
