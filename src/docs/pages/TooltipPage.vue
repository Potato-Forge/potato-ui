<script setup lang="ts">
import PfButton from '@/components/pf-button/PfButton.vue'
import PfTooltip from '@/components/pf-tooltip/PfTooltip.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfTooltip</h1>
      <p>{{ t('tooltip.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-tooltip.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfTooltip :content="t('tooltip.copyHint')">
          <PfButton variant="outline">{{ t('tooltip.hoverMe') }}</PfButton>
        </PfTooltip>
        <PfTooltip placement="bottom" interactive>
          <PfButton variant="secondary">{{ t('tooltip.interactive') }}</PfButton>
          <template #content>
            <strong>{{ t('tooltip.interactiveContent') }}</strong>
          </template>
        </PfTooltip>
      </div>
    </section>

    <section class="section two-column">
      <div>
        <h2>{{ t('tooltip.componentUsage') }}</h2>
        <pre class="code">&lt;PfTooltip content="{{ t('tooltip.saveChanges') }}"&gt;
  &lt;PfButton&gt;{{ t('tooltip.save') }}&lt;/PfButton&gt;
&lt;/PfTooltip&gt;</pre>
      </div>
      <div>
        <h2>{{ t('tooltip.pluginUsage') }}</h2>
        <pre class="code">import { pfTooltipPlugin } from '@/components/pf-tooltip'

app.use(pfTooltipPlugin)</pre>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>content</td><td>string</td><td>{{ t('tooltip.api.content') }}</td></tr>
          <tr><td>placement</td><td>top | bottom | left | right</td><td>{{ t('tooltip.api.placement') }}</td></tr>
          <tr><td>delay</td><td>[number, number]</td><td>{{ t('tooltip.api.delay') }}</td></tr>
          <tr><td>interactive</td><td>boolean</td><td>{{ t('tooltip.api.interactive') }}</td></tr>
          <tr><td>trigger</td><td>string</td><td>{{ t('tooltip.api.trigger') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">vue-tippy, tippy.js</pre>
    </section>
  </article>
</template>
