<script setup lang="ts">
import { ref } from 'vue'
import PfModal from '@/components/pf-modal/PfModal.vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'

const isOpen = ref(false)
const isConfirmOpen = ref(false)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfModal</h1>
      <p>{{ t('modal.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-modal.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="gap: 12px;">
        <PfModal
          v-model:open="isOpen"
          :title="t('modal.basicTitle')"
          :description="t('modal.basicDescription')"
          @positive-click="isOpen = false"
          @negative-click="isOpen = false"
        >
          <template #trigger>
            <PfButton variant="outline">{{ t('modal.openBasic') }}</PfButton>
          </template>
          <PfText>{{ t('modal.bodyContent') }}</PfText>
        </PfModal>

        <PfModal
          v-model:open="isConfirmOpen"
          :title="t('modal.confirmTitle')"
          :positive-text="t('modal.confirm')"
          :negative-text="t('modal.cancel')"
          @positive-click="isConfirmOpen = false"
          @negative-click="isConfirmOpen = false"
        >
          <template #trigger>
            <PfButton variant="default" type="warning">{{ t('modal.openConfirm') }}</PfButton>
          </template>
          <PfText>{{ t('modal.confirmBody') }}</PfText>
        </PfModal>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">&lt;PfModal
  v-model:open="isOpen"
  title="{{ t('modal.deleteTitle') }}"
  positive-text="{{ t('modal.confirm') }}"
  negative-text="{{ t('modal.cancel') }}"
  @positive-click="handleDelete"
  @negative-click="isOpen = false"
&gt;
  &lt;template #trigger&gt;
    &lt;PfButton type="error"&gt;{{ t('modal.deleteBtn') }}&lt;/PfButton&gt;
  &lt;/template&gt;
  &lt;p&gt;{{ t('modal.deleteBody') }}&lt;/p&gt;
&lt;/PfModal&gt;

&lt;!-- {{ t('modal.pluginUsage') }} --&gt;
import { usePfModal } from '@/components/pf-modal'

const modal = usePfModal()
const confirmed = await modal.confirm({
  title: '{{ t('modal.confirmAction') }}',
  description: '{{ t('modal.areYouSure') }}',
})</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>open</td><td>boolean</td><td>{{ t('modal.api.open') }}</td></tr>
          <tr><td>title</td><td>string</td><td>{{ t('modal.api.title') }}</td></tr>
          <tr><td>description</td><td>string</td><td>{{ t('modal.api.description') }}</td></tr>
          <tr><td>positiveText</td><td>string</td><td>{{ t('modal.api.positiveText') }}</td></tr>
          <tr><td>negativeText</td><td>string</td><td>{{ t('modal.api.negativeText') }}</td></tr>
          <tr><td>positiveLoading</td><td>boolean</td><td>{{ t('modal.api.positiveLoading') }}</td></tr>
          <tr><td>slots</td><td>trigger | title | description | default | footer</td><td>{{ t('modal.api.slots') }}</td></tr>
          <tr><td>emits</td><td>positive-click | negative-click | update:open</td><td>{{ t('modal.api.emits') }}</td></tr>
          <tr><td>composable</td><td>usePfModal().open / confirm / closeAll</td><td>{{ t('modal.api.composable') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">pf-theme, ui-primitives (dialog)</pre>
    </section>
  </article>
</template>
