<script setup lang="ts">
import { computed, ref } from 'vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import PfDrawer from '@/components/pf-drawer/PfDrawer.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const open = ref(false)
const usageCode = computed(() => dedent`
  <PfDrawer v-model:open="open" title="Details">
    Drawer content
  </PfDrawer>
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfDrawer</h1>
      <p>{{ t('drawer.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-ui/cli add pf-drawer</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <PfButton @click="open = true">{{ t('drawer.open') }}</PfButton>
        <PfDrawer v-model:open="open" :title="t('drawer.title')" :description="t('drawer.descriptionText')">
          <p class="text-sm leading-6 text-muted-foreground">{{ t('drawer.body') }}</p>
        </PfDrawer>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="vue" dedent />
    </section>
  </article>
</template>
