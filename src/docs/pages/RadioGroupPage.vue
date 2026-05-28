<script setup lang="ts">
import { computed, ref } from 'vue'
import PfRadioGroup from '@/components/pf-radio-group/PfRadioGroup.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const density = ref('comfortable')
const options = [
  { label: 'Compact', value: 'compact', description: 'Dense tables and toolbars' },
  { label: 'Comfortable', value: 'comfortable', description: 'Default admin workspace' },
  { label: 'Spacious', value: 'spacious', description: 'Presentation-heavy screens' },
]
const usageCode = computed(() => dedent`
  <PfRadioGroup
    v-model="density"
    name="density"
    :options="densityOptions"
  />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfRadioGroup</h1>
      <p>{{ t('radioGroup.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-radio-group --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfRadioGroup v-model="density" name="density-demo" :options="options" />
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
          <tr><td>modelValue</td><td>string | number</td><td>{{ t('radioGroup.api.modelValue') }}</td></tr>
          <tr><td>options</td><td>PfRadioOption[]</td><td>{{ t('radioGroup.api.options') }}</td></tr>
          <tr><td>name</td><td>string</td><td>{{ t('radioGroup.api.name') }}</td></tr>
          <tr><td>orientation</td><td>horizontal | vertical</td><td>{{ t('radioGroup.api.orientation') }}</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>{{ t('radioGroup.api.disabled') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>clsx, tailwind-merge, pf-theme</PfCode>
    </section>
  </article>
</template>
