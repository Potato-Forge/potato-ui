<script setup lang="ts">
import { computed } from 'vue'
import PfHelp from '@/components/pf-help/PfHelp.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  <!-- ${t('help.simpleUsage')} -->
  <PfHelp content="${t('help.helpContent')}" />

  <!-- ${t('help.slotUsage')} -->
  <PfHelp>
    <template #content>
      <strong>${t('help.richTitle')}</strong>
    </template>
  </PfHelp>
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfHelp</h1>
      <p>{{ t('help.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-help.json</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: center; gap: 16px;">
        <div class="flex items-center gap-2">
          <PfText>{{ t('help.whatIsThis') }}</PfText>
          <PfHelp :content="t('help.helpContent')" />
        </div>
        <div class="flex items-center gap-2">
          <PfText>{{ t('help.richContent') }}</PfText>
          <PfHelp position="bottom">
            <template #content>
              <div class="max-w-48 space-y-1 text-xs">
                <strong>{{ t('help.richTitle') }}</strong>
                <p class="mb-0">{{ t('help.richBody') }}</p>
              </div>
            </template>
          </PfHelp>
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
          <tr><td>content</td><td>string | Component | VNode</td><td>{{ t('help.api.content') }}</td></tr>
          <tr><td>position</td><td>top | bottom | left | right</td><td>{{ t('help.api.position') }}</td></tr>
          <tr><td>slot</td><td>content</td><td>{{ t('help.api.slot') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>pf-tooltip, pf-icons, pf-theme</PfCode>
    </section>
  </article>
</template>
