<script setup lang="ts">
import PfHelp from '@/components/pf-help/PfHelp.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfHelp</h1>
      <p>{{ t('help.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-help.json</pre>
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
      <pre class="code">&lt;!-- {{ t('help.simpleUsage') }} --&gt;
&lt;PfHelp content="{{ t('help.helpContent') }}" /&gt;

&lt;!-- {{ t('help.slotUsage') }} --&gt;
&lt;PfHelp&gt;
  &lt;template #content&gt;
    &lt;strong&gt;{{ t('help.richTitle') }}&lt;/strong&gt;
  &lt;/template&gt;
&lt;/PfHelp&gt;</pre>
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
      <pre class="code">pf-tooltip, pf-icons, pf-theme</pre>
    </section>
  </article>
</template>
