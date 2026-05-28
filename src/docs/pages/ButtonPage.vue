<script setup lang="ts">
import PfButton from '@/components/pf-button/PfButton.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfButton</h1>
      <p>{{ t('button.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-button --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfButton icon="i-tabler-sparkles">{{ t('button.primary') }}</PfButton>
        <PfButton variant="outline" type="success">{{ t('button.success') }}</PfButton>
        <PfButton variant="secondary" type="info">{{ t('button.info') }}</PfButton>
        <PfButton variant="ghost" type="warning">{{ t('button.warning') }}</PfButton>
        <PfButton variant="default" type="error" disabled>{{ t('button.disabled') }}</PfButton>
      </div>
    </section>

    <section class="section two-column">
      <div>
        <h2>{{ t('button.iconSlots') }}</h2>
        <div class="preview">
          <PfButton>
            <template #prefix><span class="i-tabler-upload"></span></template>
            {{ t('button.upload') }}
            <template #suffix><span class="i-tabler-arrow-right"></span></template>
          </PfButton>
        </div>
      </div>
      <div>
        <h2>{{ t('section.usage') }}</h2>
        <PfCode>&lt;PfButton icon="i-tabler-sparkles"&gt;{{ t('button.create') }}&lt;/PfButton&gt;</PfCode>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>variant</td><td>default | destructive | outline | secondary | ghost | link</td><td>{{ t('button.api.variant') }}</td></tr>
          <tr><td>type</td><td>primary | success | info | warning | error | button | submit | reset</td><td>{{ t('button.api.type') }}</td></tr>
          <tr><td>size</td><td>default | tiny | sm | lg | icon | icon-tiny | icon-sm | icon-lg</td><td>{{ t('button.api.size') }}</td></tr>
          <tr><td>icon</td><td>string</td><td>{{ t('button.api.icon') }}</td></tr>
          <tr><td>slots</td><td>default | prefix | suffix</td><td>{{ t('button.api.slots') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>reka-ui, class-variance-authority, clsx, tailwind-merge</PfCode>
    </section>
  </article>
</template>
