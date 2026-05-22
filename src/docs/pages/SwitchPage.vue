<script setup lang="ts">
import { ref } from 'vue'
import PfSwitch from '@/components/pf-switch/PfSwitch.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'

const checked = ref(false)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfSwitch</h1>
      <p>{{ t('switch.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-switch.json</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="align-items: center; gap: 12px;">
        <PfSwitch v-model:checked="checked" />
        <PfText>{{ checked ? t('switch.on') : t('switch.off') }}</PfText>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode>&lt;PfSwitch v-model:checked="enabled" /&gt;
&lt;PfSwitch v-model:checked="enabled" disabled /&gt;
&lt;PfSwitch v-model:checked="enabled" :id="'toggle'" /&gt;</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>checked</td><td>boolean</td><td>{{ t('switch.api.checked') }}</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>{{ t('switch.api.disabled') }}</td></tr>
          <tr><td>id</td><td>string</td><td>{{ t('switch.api.id') }}</td></tr>
          <tr><td>class</td><td>string</td><td>{{ t('switch.api.class') }}</td></tr>
          <tr><td>slot</td><td>thumb</td><td>{{ t('switch.api.slot') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>reka-ui, @vueuse/core, clsx, tailwind-merge, pf-theme</PfCode>
    </section>
  </article>
</template>
