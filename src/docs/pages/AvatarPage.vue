<script setup lang="ts">
import { computed } from 'vue'
import PfAvatar from '@/components/pf-avatar/PfAvatar.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  <PfAvatar fallback="PF" />
  <PfAvatar src="/avatar.png" fallback="AB" size="lg" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfAvatar</h1>
      <p>{{ t('avatar.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-avatar --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfAvatar fallback="PF" size="sm" />
        <PfAvatar fallback="UI" />
        <PfAvatar fallback="XL" size="lg" />
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
          <tr><td>src</td><td>string</td><td>{{ t('avatar.api.src') }}</td></tr>
          <tr><td>fallback</td><td>string</td><td>{{ t('avatar.api.fallback') }}</td></tr>
          <tr><td>size</td><td>sm | md | lg</td><td>{{ t('avatar.api.size') }}</td></tr>
          <tr><td>default slot</td><td>slot</td><td>{{ t('avatar.api.slot') }}</td></tr>
        </tbody>
      </table>
    </section>
  </article>
</template>
