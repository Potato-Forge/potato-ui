<script setup lang="ts">
import PfConfigProvider from '@/components/pf-config-provider/PfConfigProvider.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfConfigProvider</h1>
      <p>{{ t('configProvider.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-config-provider.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfConfigProvider>
          <PfText>{{ t('configProvider.wrapped') }}</PfText>
        </PfConfigProvider>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">&lt;PfConfigProvider&gt;
  &lt;YourApp /&gt;
&lt;/PfConfigProvider&gt;</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>slot</td><td>default</td><td>{{ t('configProvider.api.slot') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">pf-theme</pre>
    </section>
  </article>
</template>
