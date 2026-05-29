<script setup lang="ts">
import { computed, ref } from 'vue'
import PfTabs from '@/components/pf-tabs/PfTabs.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const tab = ref('overview')
const items = [
  { label: 'Overview', value: 'overview' },
  { label: 'Members', value: 'members' },
  { label: 'Settings', value: 'settings' },
]
const usageCode = computed(() => dedent`
  <PfTabs v-model="tab" :items="items">
    <template #default="{ value }">
      Current tab: {{ value }}
    </template>
  </PfTabs>
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfTabs</h1>
      <p>{{ t('tabs.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-ui/cli add pf-tabs</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: stretch;">
        <div style="width: min(100%, 560px);">
          <PfTabs v-model="tab" :items="items">
            <template #default="{ value }">
              <div class="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
                {{ t('tabs.current') }}: {{ value }}
              </div>
            </template>
          </PfTabs>
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
          <tr><td>modelValue</td><td>string</td><td>{{ t('tabs.api.modelValue') }}</td></tr>
          <tr><td>items</td><td>PfTabItem[]</td><td>{{ t('tabs.api.items') }}</td></tr>
          <tr><td>orientation</td><td>horizontal | vertical</td><td>{{ t('tabs.api.orientation') }}</td></tr>
          <tr><td>default slot</td><td>{ value }</td><td>{{ t('tabs.api.slot') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
