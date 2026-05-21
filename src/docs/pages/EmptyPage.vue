<script setup lang="ts">
import PfEmpty from '@/components/pf-empty/PfEmpty.vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfEmpty</h1>
      <p>{{ t('empty.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-empty.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="min-height: 240px;">
        <PfEmpty :title="t('empty.noData')" :description="t('empty.noDataHint')">
          <template #icon>
            <span class="i-tabler-database-off text-primary text-4xl"></span>
          </template>
          <template #action>
            <PfButton variant="outline" type="primary" icon="i-tabler-refresh">{{ t('empty.retry') }}</PfButton>
          </template>
        </PfEmpty>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">&lt;PfEmpty
  title="{{ t('empty.noResults') }}"
  description="{{ t('empty.tryAdjusting') }}"
&gt;
  &lt;template #icon&gt;
    &lt;span class="i-tabler-search-off text-primary text-4xl"&gt;&lt;/span&gt;
  &lt;/template&gt;
  &lt;template #action&gt;
    &lt;PfButton variant="outline"&gt;{{ t('empty.clearFilters') }}&lt;/PfButton&gt;
  &lt;/template&gt;
&lt;/PfEmpty&gt;</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>title</td><td>string</td><td>{{ t('empty.api.title') }}</td></tr>
          <tr><td>description</td><td>string</td><td>{{ t('empty.api.description') }}</td></tr>
          <tr><td>slots</td><td>icon | default | action</td><td>{{ t('empty.api.slots') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">pf-theme, pf-icons, pf-text</pre>
    </section>
  </article>
</template>
