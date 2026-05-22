<script setup lang="ts">
import { computed } from 'vue'
import PfSidebar from '@/components/pf-sidebar/PfSidebar.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const demoItems = [
  {
    title: t('sidebar.dashboard'),
    icon: 'layout-dashboard',
    isActive: true,
    items: [
      { title: t('sidebar.overview'), url: '#', icon: 'chart-line' },
      { title: t('sidebar.analytics'), url: '#', icon: 'chart-bar' },
    ],
  },
  {
    title: t('sidebar.settings'),
    icon: 'settings',
    items: [
      { title: t('sidebar.profile'), url: '#', icon: 'user' },
      { title: t('sidebar.security'), url: '#', icon: 'lock' },
    ],
  },
  {
    title: t('sidebar.help'),
    icon: 'help',
    url: '#',
  },
]

const usageCode = computed(() => dedent`
  import type { SidebarItem } from '@/components/pf-sidebar'

  const items: SidebarItem[] = [
    {
      title: '${t('sidebar.dashboard')}',
      icon: 'layout-dashboard',
      isActive: true,
      items: [
        { title: '${t('sidebar.overview')}', url: '/overview' },
      ],
    },
    {
      title: '${t('sidebar.help')}',
      icon: 'help',
      url: '/help',
    },
  ]

  <PfSidebar :items="items" />
`)

const typesCode = computed(() => dedent`
  interface SidebarItem {
    title: string
    url?: string
    icon?: string
    isActive?: boolean
    items?: SidebarItem[]
  }
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfSidebar</h1>
      <p>{{ t('sidebar.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-sidebar.json</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="border: 1px solid var(--border); border-radius: 8px; overflow: hidden; width: 280px; height: 360px;">
        <PfSidebar :items="demoItems" />
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
          <tr><td>items</td><td>SidebarItem[]</td><td>{{ t('sidebar.api.items') }}</td></tr>
        </tbody>
      </table>
      <p class="mt-4 text-sm text-muted-foreground">{{ t('sidebar.api.typeNote') }}</p>
      <PfCode :code="typesCode" language="ts" dedent />
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>@iconify/vue, pf-theme, pf-icons, ui-primitives (sidebar, collapsible)</PfCode>
    </section>
  </article>
</template>
