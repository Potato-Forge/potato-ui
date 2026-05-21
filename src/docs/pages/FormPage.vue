<script setup lang="ts">
import { ref } from 'vue'
import PfForm from '@/components/pf-form/PfForm.vue'
import { t } from '../i18n'

const submitted = ref<Record<string, any> | null>(null)
const lastChanged = ref<Record<string, any> | null>(null)

const demoConfig = [
  { name: 'Name', key: 'name', type: 'text' as const, rules: { required: '必填' } },
  { name: 'Email', key: 'email', type: 'text' as const,
    rules: { pattern: { value: /^[\w.-]+@[\w.-]+\.\w+$/, message: '邮箱格式不正确' } } },
  {
    name: 'Role', key: 'role', type: 'options' as const,
    config: {
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
    },
  },
  { name: 'Active', key: 'active', type: 'toggle' as const, default: true },
  { name: 'Birthday', key: 'birthday', type: 'date' as const },
]

const handleSubmit = async (data: Record<string, any>) => {
  submitted.value = { ...data }
  await new Promise((r) => setTimeout(r, 400))
}

const handleChange = (data: Record<string, any>) => {
  lastChanged.value = { ...data }
}
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfForm</h1>
      <p>{{ t('formPage.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-form.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="flex-direction: column; align-items: stretch; max-width: 560px;">
        <PfForm
          :form-config="demoConfig"
          form-mode="create"
          :columns-per-row="2"
          :on-submit="handleSubmit"
          :on-change="handleChange"
        />
      </div>
      <div v-if="submitted" style="margin-top: 16px; padding: 12px; background: hsl(var(--muted)); border-radius: 8px;" class="text-sm">
        <strong>Submitted:</strong>
        <pre style="margin: 4px 0 0; font-size: 11px;">{{ JSON.stringify(submitted, null, 2) }}</pre>
      </div>
      <div v-if="lastChanged && !submitted" style="margin-top: 8px;" class="text-xs text-muted-foreground">
        {{ lastChanged.name || '...' }} | {{ lastChanged.role || '...' }}
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">const formConfig = [
  { name: 'Name', key: 'name', type: 'text', rules: { required: '必填' } },
  { name: 'Email', key: 'email', type: 'text',
    rules: { pattern: { value: /^[\w.-]+@[\w.-]+\.\w+$/, message: '邮箱格式不正确' } } },
  { name: 'Role', key: 'role', type: 'options',
    config: { options: [{ label: 'Admin', value: 'admin' }] } },
  { name: 'Active', key: 'active', type: 'toggle', default: true },
  { name: 'Birthday', key: 'birthday', type: 'date' },
]

&lt;PfForm
  :form-config="formConfig"
  form-mode="create"
  :columns-per-row="2"
  :on-submit="handleSubmit"
/&gt;</pre>
    </section>

    <section class="section">
      <h2>{{ t('formPage.fieldTypes') }}</h2>
      <table class="api-table">
        <thead><tr><th>type</th><th>{{ t('formPage.type.component') }}</th><th>{{ t('formPage.type.config') }}</th></tr></thead>
        <tbody>
          <tr><td>text</td><td>{{ t('formPage.type.textDesc') }}</td><td>{{ t('formPage.type.textConfig') }}</td></tr>
          <tr><td>datetime / date / time</td><td>@vuepic/vue-datepicker</td><td>format, range, rangeTransform</td></tr>
          <tr><td>options</td><td>{{ t('formPage.type.optionsDesc') }}</td><td>multiple, variant (combobox/checkbox), options, optionsFn, searchable</td></tr>
          <tr><td>toggle</td><td>PfSwitch / PfCheckbox</td><td>variant (switch/checkbox), trueValue, falseValue</td></tr>
          <tr><td>icon</td><td>PfIconPicker</td><td>{{ t('formPage.type.iconConfig') }}</td></tr>
          <tr><td>upload</td><td>PfUpload</td><td>trigger, listType, multiple, accept, maxFiles, maxSize, uploadHandler</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <h3>Props</h3>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>formConfig</td><td>PfFormConfigItem[]</td><td>{{ t('formPage.api.formConfig') }}</td></tr>
          <tr><td>formData</td><td>Record | null</td><td>{{ t('formPage.api.formData') }}</td></tr>
          <tr><td>formMode</td><td>'create' | 'edit'</td><td>{{ t('formPage.api.formMode') }}</td></tr>
          <tr><td>columnsPerRow</td><td>number</td><td>{{ t('formPage.api.columnsPerRow') }}</td></tr>
          <tr><td>formRules</td><td>PfFormRules</td><td>{{ t('formPage.api.formRules') }}</td></tr>
          <tr><td>onSubmit</td><td>(data) => Promise | void</td><td>{{ t('formPage.api.onSubmit') }}</td></tr>
          <tr><td>onChange</td><td>(data) => void</td><td>{{ t('formPage.api.onChange') }}</td></tr>
        </tbody>
      </table>
      <h3>PfFormFieldRules</h3>
      <pre class="code mt-2">interface PfFormFieldRules {
  required?: boolean | string
  min?: number | { value: number; message?: string }
  max?: number | { value: number; message?: string }
  pattern?: RegExp | { value: RegExp; message?: string }
  validateOn?: 'change' | 'blur' | 'both'
}</pre>
      <h3>PfFormRules</h3>
      <pre class="code mt-2">interface PfFormRules {
  schema?: ZodType
  onBlur?: (payload) => PfFormValidationResult | Promise
  onSubmit?: (payload) => PfFormValidationResult | Promise
}</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">@tanstack/vue-form, @tanstack/zod-form-adapter, zod,
@vuepic/vue-datepicker, date-fns, @iconify/vue,
pf-checkbox, pf-switch, pf-help, pf-upload,
pf-icons, pf-runtime-support, pf-theme</pre>
    </section>
  </article>
</template>
