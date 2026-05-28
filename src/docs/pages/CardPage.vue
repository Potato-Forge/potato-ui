<script setup lang="ts">
import { computed } from 'vue'
import PfCard from '@/components/pf-card/PfCard.vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  <PfCard>
    <template #header>${t('card.title')}</template>
    <template #header-action>
      <PfButton variant="ghost" size="icon-sm" icon="i-tabler-dots" />
    </template>
    <div class="p-4">${t('card.content')}</div>
    <template #footer>
      <PfButton variant="ghost" class="w-full">${t('card.viewMore')}</PfButton>
    </template>
  </PfCard>
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfCard</h1>
      <p>{{ t('card.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-card --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="flex-direction: column; gap: 16px;">
        <PfCard style="width: 360px;">
          <template #header>
            <PfText as="h4">{{ t('card.withHeader') }}</PfText>
          </template>
          <template #header-action>
            <PfButton variant="ghost" size="icon-sm" icon="i-tabler-dots"></PfButton>
          </template>
          <div class="p-4">
            <PfText>{{ t('card.contentGoesHere') }}</PfText>
          </div>
        </PfCard>

        <PfCard :shadow="true" :border="true" style="width: 360px;">
          <div class="p-4">
            <PfText as="h4">{{ t('card.shadowVariant') }}</PfText>
            <PfText variant="caption" dimmed>{{ t('card.shadowHint') }}</PfText>
          </div>
        </PfCard>
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
          <tr><td>shadow</td><td>boolean</td><td>{{ t('card.api.shadow') }}</td></tr>
          <tr><td>border</td><td>boolean</td><td>{{ t('card.api.border') }}</td></tr>
          <tr><td>class</td><td>string</td><td>{{ t('card.api.class') }}</td></tr>
          <tr><td>slots</td><td>header | header-action | default | footer</td><td>{{ t('card.api.slots') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>clsx, tailwind-merge, pf-theme</PfCode>
    </section>
  </article>
</template>
