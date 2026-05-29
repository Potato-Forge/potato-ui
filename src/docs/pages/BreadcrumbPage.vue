<script setup lang="ts">
import { computed } from 'vue'
import PfBreadcrumb from '@/components/pf-breadcrumb/PfBreadcrumb.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const breadcrumbList = [
  { name: t('breadcrumb.home'), href: '#' },
  { name: t('breadcrumb.components'), href: '#' },
  { name: t('breadcrumb.breadcrumb') },
]

const usageCode = computed(() => dedent`
  const items = [
    { name: '${t('breadcrumb.home')}', href: '/' },
    { name: '${t('breadcrumb.settings')}', href: '/settings' },
    { name: '${t('breadcrumb.profile')}' },
  ]

  <PfBreadcrumb :list="items" />

  <!-- ${t('breadcrumb.customKeys')} -->
  <PfBreadcrumb :list="items" label-key="title" href-key="url" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfBreadcrumb</h1>
      <p>{{ t('breadcrumb.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-ui/cli add pf-breadcrumb</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfBreadcrumb :list="breadcrumbList" />
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
          <tr><td>list</td><td>any[]</td><td>{{ t('breadcrumb.api.list') }}</td></tr>
          <tr><td>labelKey</td><td>string</td><td>{{ t('breadcrumb.api.labelKey') }}</td></tr>
          <tr><td>hrefKey</td><td>string</td><td>{{ t('breadcrumb.api.hrefKey') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>pf-theme, ui-primitives (breadcrumb)</PfCode>
    </section>
  </article>
</template>
