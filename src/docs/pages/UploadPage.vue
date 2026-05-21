<script setup lang="ts">
import PfUpload from '@/components/pf-upload/PfUpload.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfUpload</h1>
      <p>{{ t('upload.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <pre class="code">pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-upload.json</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="flex-direction: column; width: 480px;">
        <PfUpload trigger="drag" :max-files="3" :max-size="10 * 1024 * 1024" />
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <pre class="code">&lt;!-- {{ t('upload.dragMode') }} --&gt;
&lt;PfUpload trigger="drag" :max-files="5" :max-size="20 * 1024 * 1024" /&gt;

&lt;!-- {{ t('upload.buttonMode') }} --&gt;
&lt;PfUpload trigger="button" /&gt;

&lt;!-- {{ t('upload.galleryMode') }} --&gt;
&lt;PfUpload trigger="gallery" list-type="gallery" accept="image/*" /&gt;

&lt;!-- {{ t('upload.withHandler') }} --&gt;
&lt;PfUpload
  :upload-handler="async ({ file, onProgress }) => {
    onProgress(50)
    await myApi.upload(file)
    onProgress(100)
    return { remoteUrl: 'https://...' }
  }"
/&gt;</pre>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>modelValue</td><td>PfUploadFileItem[]</td><td>{{ t('upload.api.modelValue') }}</td></tr>
          <tr><td>trigger</td><td>button | drag | gallery</td><td>{{ t('upload.api.trigger') }}</td></tr>
          <tr><td>listType</td><td>list | gallery</td><td>{{ t('upload.api.listType') }}</td></tr>
          <tr><td>multiple</td><td>boolean</td><td>{{ t('upload.api.multiple') }}</td></tr>
          <tr><td>accept</td><td>string</td><td>{{ t('upload.api.accept') }}</td></tr>
          <tr><td>maxFiles</td><td>number</td><td>{{ t('upload.api.maxFiles') }}</td></tr>
          <tr><td>maxSize</td><td>number (bytes)</td><td>{{ t('upload.api.maxSize') }}</td></tr>
          <tr><td>uploadHandler</td><td>function</td><td>{{ t('upload.api.uploadHandler') }}</td></tr>
          <tr><td>emits</td><td>change | remove | error</td><td>{{ t('upload.api.emits') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <pre class="code">pf-img, pf-button, pf-toast, clsx, tailwind-merge, pf-icons, pf-theme</pre>
    </section>
  </article>
</template>
