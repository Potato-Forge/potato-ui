<script setup lang="ts">
import { ref } from 'vue'
import PfDataTable from '@/components/pf-data-table/PfDataTable.vue'
import type { PfDataTableItem } from '@/components/pf-data-table'
import { t } from '../i18n'

// ── mock data ──────────────────────────────────────────────────
const seedUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', active: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'editor', active: false },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'viewer', active: true },
  { id: 4, name: 'Diana', email: 'diana@example.com', role: 'editor', active: true },
]

const users = ref(structuredClone(seedUsers))
let nextId = 5

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// ── CRUD stubs ─────────────────────────────────────────────────
const listQuery = async (query: Record<string, any>) => {
  await delay(200)
  let rows = [...users.value]
  if (query.name) rows = rows.filter((u) => u.name.toLowerCase().includes(String(query.name).toLowerCase()))
  if (query.role) rows = rows.filter((u) => u.role === query.role)
  return rows
}

const create = async (payload: Record<string, any>) => {
  await delay()
  users.value.push({
    id: nextId++,
    name: String(payload.name ?? ''),
    email: String(payload.email ?? ''),
    role: String(payload.role ?? 'viewer'),
    active: Boolean(payload.active),
  })
  return users.value[users.value.length - 1]!
}

const update = async (id: string | number, payload: Record<string, any>) => {
  await delay()
  const idx = users.value.findIndex((u) => u.id === Number(id))
  if (idx !== -1) Object.assign(users.value[idx]!, payload)
  return users.value[idx]!
}

const remove = async (id: string | number) => {
  await delay()
  users.value = users.value.filter((u) => u.id !== Number(id))
}

const detail = async (id: string | number) => {
  await delay(100)
  return users.value.find((u) => u.id === Number(id))!
}

// ── columns ────────────────────────────────────────────────────
const columns: PfDataTableItem[] = [
  {
    name: 'Name',
    key: 'name',
    type: 'text',
    query: true,
    table: { width: 140, sortable: true },
  },
  {
    name: 'Email',
    key: 'email',
    type: 'text',
    table: { textDisplay: 'ellipsis' as const, tooltip: true, minWidth: 160 },
  },
  {
    name: 'Role',
    key: 'role',
    type: 'options',
    config: {
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
    table: { width: 120 },
  },
  {
    name: 'Active',
    key: 'active',
    type: 'toggle',
    table: { width: 90, align: 'center' as const },
  },
]
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
      <h2>{{ t('section.preview') }}</h2>
      <p class="text-sm text-muted-foreground mb-3">{{ t('dataTable.demoHint') }}</p>
      <div class="preview" style="flex-direction: column; align-items: stretch;">
        <PfDataTable
          :columns="columns"
          :list-query="listQuery"
          :create="create"
          :update="update"
          :delete="remove"
          :detail="detail"
          row-key="id"
          container-mode="drawer"
        />
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">import { PfDataTable } from '@/components/pf-data-table'

const columns: PfDataTableItem[] = [
  { name: 'Name', key: 'name', type: 'text',
    query: true, table: { width: 140, sortable: true } },
  { name: 'Email', key: 'email', type: 'text',
    table: { textDisplay: 'ellipsis', tooltip: true } },
  { name: 'Role', key: 'role', type: 'options',
    config: { options: [{ label: 'Admin', value: 'admin' }] } },
  { name: 'Active', key: 'active', type: 'toggle' },
]

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
