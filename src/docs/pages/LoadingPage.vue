<script setup lang="ts">
import { computed, ref } from 'vue'
import PfLoading from '@/components/pf-loading/PfLoading.vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'
import { dedent } from '@/lib/utils'

const isLoading = ref(true)

const usageCode = computed(() => dedent`
  <PfLoading :loading="isLoading" text="${t('loading.loadingText')}">
    <div class="p-4">${t('loading.yourContent')}</div>
  </PfLoading>
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfLoading</h1>
      <p>{{ t('loading.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-loading.json</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="flex-direction: column; gap: 16px; align-items: flex-start;">
        <PfButton variant="outline" @click="isLoading = !isLoading">
          {{ isLoading ? t('loading.hide') : t('loading.show') }}
        </PfButton>
        <div style="position: relative; width: 360px; height: 200px; border: 1px solid var(--border); border-radius: 8px;">
          <PfLoading :loading="isLoading" :text="t('loading.loadingText')">
            <div class="p-4">
              <PfText as="h4">{{ t('loading.contentTitle') }}</PfText>
              <PfText variant="caption" dimmed>{{ t('loading.contentBody') }}</PfText>
            </div>
          </PfLoading>
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
          <tr><td>loading</td><td>boolean</td><td>{{ t('loading.api.loading') }}</td></tr>
          <tr><td>text</td><td>string</td><td>{{ t('loading.api.text') }}</td></tr>
          <tr><td>blockInteraction</td><td>boolean</td><td>{{ t('loading.api.blockInteraction') }}</td></tr>
          <tr><td>slot</td><td>default</td><td>{{ t('loading.api.slot') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>pf-theme, pf-text</PfCode>
    </section>
  </article>
</template>
