<script setup lang="ts">
import { computed, ref } from 'vue'
import PfSlider from '@/components/pf-slider/PfSlider.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const value = ref(48)
const usageCode = computed(() => dedent`
  <PfSlider v-model="value" :min="0" :max="100" show-value />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfSlider</h1>
      <p>{{ t('slider.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-ui/cli add pf-slider</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <div style="width: min(100%, 420px);">
          <PfSlider v-model="value" show-value />
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
          <tr><td>modelValue</td><td>number</td><td>{{ t('slider.api.modelValue') }}</td></tr>
          <tr><td>min / max</td><td>number</td><td>{{ t('slider.api.range') }}</td></tr>
          <tr><td>step</td><td>number</td><td>{{ t('slider.api.step') }}</td></tr>
          <tr><td>showValue</td><td>boolean</td><td>{{ t('slider.api.showValue') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
