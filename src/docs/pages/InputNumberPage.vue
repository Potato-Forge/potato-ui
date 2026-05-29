<script setup lang="ts">
import { computed, ref } from 'vue'
import PfInputNumber from '@/components/pf-input-number/PfInputNumber.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const amount = ref<number | null>(3)
const usageCode = computed(() => dedent`
  <PfInputNumber v-model="amount" :min="0" :max="10" :step="1" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfInputNumber</h1>
      <p>{{ t('inputNumber.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-forge/cli add pf-input-number</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <div style="width: min(100%, 320px);">
          <PfInputNumber v-model="amount" :min="0" :max="10" />
        </div>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="vue" dedent />
    </section>
  </article>
</template>
