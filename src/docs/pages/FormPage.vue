<script setup lang="ts">
import { t } from '../i18n'
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
      <h2>{{ t('formPage.overview') }}</h2>
      <p>{{ t('formPage.overviewDesc') }}</p>
      <ul class="list-disc pl-5 space-y-1 text-sm">
        <li>{{ t('formPage.feature.tanstack') }}</li>
        <li>{{ t('formPage.feature.zod') }}</li>
        <li>{{ t('formPage.feature.types') }}</li>
        <li>{{ t('formPage.feature.modes') }}</li>
        <li>{{ t('formPage.feature.conditional') }}</li>
      </ul>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">const formConfig = [
  { name: '{{ t('formPage.example.name') }}', key: 'name', type: 'text',
    rules: { required: true } },
  { name: '{{ t('formPage.example.email') }}', key: 'email', type: 'text',
    rules: { required: true,
      pattern: { value: /^[\w.-]+@[\w.-]+\.\w+$/, message: 'Invalid email' } } },
  { name: '{{ t('formPage.example.role') }}', key: 'role', type: 'options',
    config: { options: [{ label: 'Admin', value: 'admin' }] } },
  { name: '{{ t('formPage.example.active') }}', key: 'active', type: 'toggle', default: true },
  { name: '{{ t('formPage.example.birthday') }}', key: 'birthday', type: 'date', edit: false },
]

&lt;PfForm
  :form-config="formConfig"
  :form-data="existingData"
  form-mode="edit"
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
      <h4>PfFormFieldRules</h4>
      <pre class="code mt-2">interface PfFormFieldRules {
  required?: boolean | string
  min?: number | { value: number; message?: string }
  max?: number | { value: number; message?: string }
  pattern?: RegExp | { value: RegExp; message?: string }
  validateOn?: 'change' | 'blur' | 'both'
}</pre>
      <h4>PfFormRules</h4>
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
