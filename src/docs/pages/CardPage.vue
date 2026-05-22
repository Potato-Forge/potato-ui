<script setup lang="ts">
import PfCard from '@/components/pf-card/PfCard.vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfCard</h1>
      <p>{{ t('card.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-card.json</PfCode>
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
      <PfCode>&lt;PfCard&gt;
  &lt;template #header&gt;{{ t('card.title') }}&lt;/template&gt;
  &lt;template #header-action&gt;
    &lt;PfButton variant="ghost" size="icon-sm" icon="i-tabler-dots" /&gt;
  &lt;/template&gt;
  &lt;div class="p-4"&gt;{{ t('card.content') }}&lt;/div&gt;
  &lt;template #footer&gt;
    &lt;PfButton variant="ghost" class="w-full"&gt;{{ t('card.viewMore') }}&lt;/PfButton&gt;
  &lt;/template&gt;
&lt;/PfCard&gt;</PfCode>
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
