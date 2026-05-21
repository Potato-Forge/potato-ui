<script setup lang="ts">
import { ref } from 'vue'
import PfCheckbox from '@/components/pf-checkbox/PfCheckbox.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'

const checked = ref(false)
const indeterminate = ref<'indeterminate' | boolean>('indeterminate')
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfCheckbox</h1>
      <p>{{ t('checkbox.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-checkbox.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="flex-direction: column; gap: 12px; align-items: flex-start;">
        <label class="flex items-center gap-2 cursor-pointer">
          <PfCheckbox v-model:model-value="checked" />
          <PfText>{{ checked ? t('checkbox.checked') : t('checkbox.unchecked') }}</PfText>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <PfCheckbox v-model:model-value="indeterminate" />
          <PfText>{{ t('checkbox.indeterminateState') }}</PfText>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <PfCheckbox disabled />
          <PfText dimmed>{{ t('checkbox.disabled') }}</PfText>
        </label>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">&lt;PfCheckbox v-model:model-value="checked" /&gt;
&lt;PfCheckbox v-model:model-value="indeterminate" /&gt;
&lt;PfCheckbox disabled /&gt;</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>modelValue</td><td>boolean | 'indeterminate'</td><td>{{ t('checkbox.api.modelValue') }}</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>{{ t('checkbox.api.disabled') }}</td></tr>
          <tr><td>class</td><td>string</td><td>{{ t('checkbox.api.class') }}</td></tr>
          <tr><td>slot</td><td>default</td><td>{{ t('checkbox.api.slots') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">reka-ui, @vueuse/core, clsx, tailwind-merge, pf-theme, pf-icons</pre>
    </section>
  </article>
</template>
