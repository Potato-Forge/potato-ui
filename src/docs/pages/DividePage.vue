<script setup lang="ts">
import { computed } from 'vue'
import PfDivide from '@/components/pf-divide/PfDivide.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'
import { dedent } from '@/lib/utils'

const usageCode = computed(() => dedent`
  <!-- ${t('divide.horizontal')} -->
  <PfDivide />

  <!-- ${t('divide.vertical')} -->
  <PfDivide vertical />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfDivide</h1>
      <p>{{ t('divide.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-forge/cli add pf-divide</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="flex-direction: column; gap: 16px; width: 360px;">
        <PfText>{{ t('divide.above') }}</PfText>
        <PfDivide />
        <PfText>{{ t('divide.below') }}</PfText>
      </div>
      <div class="preview mt-4" style="display: flex; align-items: stretch; gap: 16px; height: 80px;">
        <PfText>{{ t('divide.left') }}</PfText>
        <PfDivide vertical />
        <PfText>{{ t('divide.right') }}</PfText>
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
          <tr><td>vertical</td><td>boolean</td><td>{{ t('divide.api.vertical') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>pf-theme</PfCode>
    </section>
  </article>
</template>
