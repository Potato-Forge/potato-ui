<script setup lang="ts">
import { computed, ref } from 'vue'
import PfDropdown from '@/components/pf-dropdown/PfDropdown.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const selected = ref('none')
const items = [
  { label: 'Edit', value: 'edit', icon: 'i-tabler-pencil' },
  { label: 'Duplicate', value: 'duplicate', icon: 'i-tabler-copy' },
  { label: 'Delete', value: 'delete', icon: 'i-tabler-trash', danger: true },
]
const usageCode = computed(() => dedent`
  <PfDropdown :items="items" label="Actions" @select="handleSelect" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfDropdown</h1>
      <p>{{ t('dropdown.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-dropdown --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfDropdown :items="items" label="Actions" @select="selected = $event" />
        <span class="text-sm text-muted-foreground">{{ selected }}</span>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="vue" dedent />
    </section>
  </article>
</template>
