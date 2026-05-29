<script setup lang="ts">
import { computed } from 'vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import { pfToast } from '@/components/pf-toast/usePfToast'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const usageCode = computed(() => dedent`
  import { pfToast } from '@/components/pf-toast'

  pfToast.success('${t('toast.operationSuccess')}')
  pfToast.error('${t('toast.operationFailed')}', '${t('toast.pleaseRetry')}')
  pfToast.info('${t('toast.newUpdate')}')
  pfToast.warning('${t('toast.unsavedChanges')}')
  pfToast.tip('${t('toast.proTip')}')
  pfToast.risk('${t('toast.securityAlert')}')

  // ${t('toast.withOptions')}
  pfToast.success('${t('toast.saved')}', {
    duration: 3000,
    position: 'bottom-right',
  })
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfToast</h1>
      <p>{{ t('toast.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-forge/cli add pf-toast</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="gap: 12px; flex-wrap: wrap;">
        <PfButton variant="default" type="success" @click="pfToast.success(t('toast.successMsg'))">
          {{ t('toast.success') }}
        </PfButton>
        <PfButton variant="default" type="error" @click="pfToast.error(t('toast.errorTitle'), t('toast.errorDesc'))">
          {{ t('toast.error') }}
        </PfButton>
        <PfButton variant="outline" type="info" @click="pfToast.info(t('toast.infoMsg'))">
          {{ t('toast.info') }}
        </PfButton>
        <PfButton variant="ghost" type="warning" @click="pfToast.warning(t('toast.warningMsg'))">
          {{ t('toast.warning') }}
        </PfButton>
        <PfButton variant="secondary" @click="pfToast.tip(t('toast.tipMsg'))">
          {{ t('toast.tip') }}
        </PfButton>
        <PfButton variant="secondary" @click="pfToast.risk(t('toast.riskMsg'))">
          {{ t('toast.risk') }}
        </PfButton>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="ts" dedent />
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>pfToast.success</td><td>(msg, desc?, opts?)</td><td>{{ t('toast.api.success') }}</td></tr>
          <tr><td>pfToast.error</td><td>(msg, desc?, opts?)</td><td>{{ t('toast.api.error') }}</td></tr>
          <tr><td>pfToast.info</td><td>(msg, desc?, opts?)</td><td>{{ t('toast.api.info') }}</td></tr>
          <tr><td>pfToast.warning</td><td>(msg, desc?, opts?)</td><td>{{ t('toast.api.warning') }}</td></tr>
          <tr><td>pfToast.tip</td><td>(msg, desc?, opts?)</td><td>{{ t('toast.api.tip') }}</td></tr>
          <tr><td>pfToast.risk</td><td>(msg, desc?, opts?)</td><td>{{ t('toast.api.risk') }}</td></tr>
          <tr><td>PfToastProvider</td><td>Component</td><td>{{ t('toast.api.provider') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>vue-sonner, lucide-vue-next, pf-theme, ui-primitives (sonner)</PfCode>
    </section>
  </article>
</template>
