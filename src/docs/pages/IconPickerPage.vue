<script setup lang="ts">
import PfIconPicker from '@/components/pf-icon-picker/PfIconPicker.vue'
import { t } from '../i18n'

const selectedIcon = ref<string | null>(null)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfIconPicker</h1>
      <p>{{ t('iconPicker.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-icon-picker.json</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfIconPicker v-model="selectedIcon" />
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode>&lt;PfIconPicker v-model="selectedIcon"&gt;
  &lt;template #trigger&gt;
    &lt;!-- {{ t('iconPicker.customTrigger') }} --&gt;
  &lt;/template&gt;
&lt;/PfIconPicker&gt;</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>modelValue</td><td>string | null</td><td>{{ t('iconPicker.api.modelValue') }}</td></tr>
          <tr><td>slot</td><td>trigger</td><td>{{ t('iconPicker.api.slot') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>@iconify/vue, pf-theme, pf-icons, ui-primitives (dropdown-menu, input)</PfCode>
    </section>
  </article>
</template>
