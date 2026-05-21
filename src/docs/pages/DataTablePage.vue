<script setup lang="ts">
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfDataTable</h1>
      <p>{{ t('dataTable.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-data-table.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('dataTable.overview') }}</h2>
      <p>{{ t('dataTable.overviewDesc') }}</p>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>{{ t('dataTable.feature.crud') }}</li>
        <li>{{ t('dataTable.feature.tanstack') }}</li>
        <li>{{ t('dataTable.feature.query') }}</li>
        <li>{{ t('dataTable.feature.container') }}</li>
        <li>{{ t('dataTable.feature.action') }}</li>
      </ul>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">import { PfDataTable } from '@/components/pf-data-table'

const columns = [
  { name: '{{ t('dataTable.example.name') }}', key: 'name', type: 'text',
    table: { width: 200, sortable: true } },
  { name: '{{ t('dataTable.example.status') }}', key: 'status', type: 'options',
    config: { options: [{ label: 'Active', value: 'active' }] } },
  { name: '{{ t('dataTable.example.email') }}', key: 'email', type: 'text',
    query: true, table: { textDisplay: 'ellipsis', tooltip: true } },
]

const listQuery = async (query) => {
  const res = await fetch('/api/users?' + new URLSearchParams(query))
  return res.json()
}

&lt;PfDataTable
  :columns="columns"
  :list-query="listQuery"
  :create="createUser"
  :update="updateUser"
  :delete="deleteUser"
  :detail="getUserDetail"
  row-key="id"
/&gt;</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <h3>Props</h3>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>columns</td><td>PfDataTableItem[]</td><td>{{ t('dataTable.api.columns') }}</td></tr>
          <tr><td>rowKey</td><td>string</td><td>{{ t('dataTable.api.rowKey') }}</td></tr>
          <tr><td>containerMode</td><td>'drawer' | 'modal'</td><td>{{ t('dataTable.api.containerMode') }}</td></tr>
          <tr><td>listQuery</td><td>(query) => Promise</td><td>{{ t('dataTable.api.listQuery') }}</td></tr>
          <tr><td>create</td><td>(payload) => Promise</td><td>{{ t('dataTable.api.create') }}</td></tr>
          <tr><td>update</td><td>(id, payload) => Promise</td><td>{{ t('dataTable.api.update') }}</td></tr>
          <tr><td>delete</td><td>(id, rowData) => Promise</td><td>{{ t('dataTable.api.delete') }}</td></tr>
          <tr><td>detail</td><td>(id) => Promise</td><td>{{ t('dataTable.api.detail') }}</td></tr>
          <tr><td>formRules</td><td>PfFormRules</td><td>{{ t('dataTable.api.formRules') }}</td></tr>
          <tr><td>hideCreate / hideEdit / hideDelete / hideDetail</td><td>boolean</td><td>{{ t('dataTable.api.hideActions') }}</td></tr>
          <tr><td>actionColumn</td><td>PfDataTableActionColumnConfig</td><td>{{ t('dataTable.api.actionColumn') }}</td></tr>
          <tr><td>autoFetch</td><td>boolean</td><td>{{ t('dataTable.api.autoFetch') }}</td></tr>
        </tbody>
      </table>
      <h3>Emits</h3>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>form-query</td><td>Record</td><td>{{ t('dataTable.api.emitQuery') }}</td></tr>
          <tr><td>created</td><td>Record</td><td>{{ t('dataTable.api.emitCreated') }}</td></tr>
          <tr><td>updated</td><td>Record</td><td>{{ t('dataTable.api.emitUpdated') }}</td></tr>
          <tr><td>deleted</td><td>string | number</td><td>{{ t('dataTable.api.emitDeleted') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">vxe-table, @tanstack/vue-query, @iconify/vue, date-fns,
pf-form, pf-modal, pf-toast, pf-theme, pf-icons, pf-runtime-support, ui-primitives</pre>
    </section>
  </article>
</template>
