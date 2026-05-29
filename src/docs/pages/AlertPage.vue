<script setup lang="ts">
import { computed, ref } from 'vue'
import PfAlert from '@/components/pf-alert/PfAlert.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const visible = ref(true)
const usageCode = computed(() => dedent`
  <PfAlert type="info" title="Heads up" description="Registry items copy source into your app." />
  <PfAlert type="success" title="Saved" closable @close="visible = false" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfAlert</h1>
      <p>{{ t('alert.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-ui/cli add pf-alert</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 680px); display: grid; gap: 12px;">
          <PfAlert type="info" :title="t('alert.infoTitle')" :description="t('alert.infoDesc')" />
          <PfAlert v-if="visible" type="success" :title="t('alert.successTitle')" closable @close="visible = false" />
          <PfAlert type="warning" :title="t('alert.warningTitle')" />
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
          <tr><td>type</td><td>info | success | warning | error</td><td>{{ t('alert.api.type') }}</td></tr>
          <tr><td>title</td><td>string</td><td>{{ t('alert.api.title') }}</td></tr>
          <tr><td>description</td><td>string</td><td>{{ t('alert.api.description') }}</td></tr>
          <tr><td>closable</td><td>boolean</td><td>{{ t('alert.api.closable') }}</td></tr>
          <tr><td>close</td><td>event</td><td>{{ t('alert.api.close') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
