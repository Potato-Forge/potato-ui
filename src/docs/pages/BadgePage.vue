<script setup lang="ts">
import { computed } from 'vue'
import PfBadge from '@/components/pf-badge/PfBadge.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  <PfBadge type="primary">Primary</PfBadge>
  <PfBadge type="success" dot>Online</PfBadge>
  <PfBadge variant="outline" type="warning">Review</PfBadge>
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfBadge</h1>
      <p>{{ t('badge.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-forge/cli add pf-badge</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfBadge type="primary">Primary</PfBadge>
        <PfBadge type="success" dot>Online</PfBadge>
        <PfBadge type="info">Info</PfBadge>
        <PfBadge type="warning" variant="outline">Review</PfBadge>
        <PfBadge type="error" variant="solid">Blocked</PfBadge>
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
          <tr><td>variant</td><td>solid | soft | outline</td><td>{{ t('badge.api.variant') }}</td></tr>
          <tr><td>type</td><td>default | primary | success | info | warning | error</td><td>{{ t('badge.api.type') }}</td></tr>
          <tr><td>size</td><td>sm | md | lg</td><td>{{ t('badge.api.size') }}</td></tr>
          <tr><td>dot</td><td>boolean</td><td>{{ t('badge.api.dot') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
