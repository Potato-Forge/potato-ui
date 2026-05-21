<script setup lang="ts">
import { ref } from 'vue'
import PfColorPicker from '@/components/pf-color-picker/PfColorPicker.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'

const hexColor = ref('#2F7F6F')
const hslColor = ref('#3B82F6')
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfColorPicker</h1>
      <p>{{ t('colorPicker.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-color-picker.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="gap: 16px; flex-wrap: wrap;">
        <div>
          <PfText variant="caption" dimmed>HEX ({{ t('colorPicker.default') }})</PfText>
          <PfColorPicker v-model="hexColor" format="hex" class="mt-1" />
        </div>
        <div>
          <PfText variant="caption" dimmed>HSL</PfText>
          <PfColorPicker v-model="hslColor" format="hsl" :hide-contrast-ratio="true" class="mt-1" />
        </div>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">&lt;PfColorPicker v-model="color" format="hex" /&gt;

&lt;!-- {{ t('colorPicker.withSwatches') }} --&gt;
&lt;PfColorPicker
  v-model="color"
  :swatches="['#FF0000', '#00FF00', '#0000FF']"
/&gt;

&lt;!-- {{ t('colorPicker.hideContrast') }} --&gt;
&lt;PfColorPicker v-model="color" :hide-contrast-ratio="true" /&gt;</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>modelValue</td><td>string</td><td>{{ t('colorPicker.api.modelValue') }}</td></tr>
          <tr><td>format</td><td>hex | hsl | rgb</td><td>{{ t('colorPicker.api.format') }}</td></tr>
          <tr><td>swatches</td><td>string[]</td><td>{{ t('colorPicker.api.swatches') }}</td></tr>
          <tr><td>hideContrastRatio</td><td>boolean</td><td>{{ t('colorPicker.api.hideContrast') }}</td></tr>
          <tr><td>hideDefaultSwatches</td><td>boolean</td><td>{{ t('colorPicker.api.hideDefaults') }}</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>{{ t('colorPicker.api.disabled') }}</td></tr>
          <tr><td>slot</td><td>default</td><td>{{ t('colorPicker.api.slot') }}</td></tr>
          <tr><td>emits</td><td>update:modelValue | valueChange</td><td>{{ t('colorPicker.api.emits') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">pf-button, pf-help, pf-theme, pf-icons, ui-primitives (dropdown-menu, input)</pre>
    </section>
  </article>
</template>
