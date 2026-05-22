<script setup lang="ts">
import PfText from '@/components/pf-text/PfText.vue'
import { t } from '../i18n'
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfText</h1>
      <p>{{ t('text.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx shadcn-vue@latest add &lt;registry-url&gt;/r/pf-text.json</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview" style="flex-direction: column; gap: 12px; align-items: flex-start;">
        <PfText as="h1">{{ t('text.h1Sample') }}</PfText>
        <PfText as="h2">{{ t('text.h2Sample') }}</PfText>
        <PfText as="h3">{{ t('text.h3Sample') }}</PfText>
        <PfText as="h4">{{ t('text.h4Sample') }}</PfText>
        <PfText>{{ t('text.bodySample') }}</PfText>
        <PfText variant="caption" dimmed>{{ t('text.captionSample') }}</PfText>
        <PfText as="a" href="#">{{ t('text.linkSample') }}</PfText>
        <PfText as="code">{{ t('text.codeSample') }}</PfText>
        <PfText as="kbd">⌘K</PfText>
        <PfText as="blockquote">{{ t('text.blockquoteSample') }}</PfText>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode>&lt;PfText as="h1"&gt;{{ t('text.heading') }}&lt;/PfText&gt;
&lt;PfText variant="body" weight="semibold"&gt;{{ t('text.boldBody') }}&lt;/PfText&gt;
&lt;PfText truncate&gt;{{ t('text.longText') }}&lt;/PfText&gt;
&lt;PfText :truncate="2"&gt;{{ t('text.clampedText') }}&lt;/PfText&gt;
&lt;PfText prefixLine dimmed&gt;{{ t('text.withPrefix') }}&lt;/PfText&gt;</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>as</td><td>h1 | h2 | h3 | h4 | p | span | a | div | blockquote | kbd | code</td><td>{{ t('text.api.as') }}</td></tr>
          <tr><td>variant</td><td>h1 | h2 | h3 | h4 | body | caption | link | code | kbd</td><td>{{ t('text.api.variant') }}</td></tr>
          <tr><td>href</td><td>string</td><td>{{ t('text.api.href') }}</td></tr>
          <tr><td>truncate</td><td>boolean | number</td><td>{{ t('text.api.truncate') }}</td></tr>
          <tr><td>weight</td><td>normal | medium | semibold | bold | extrabold</td><td>{{ t('text.api.weight') }}</td></tr>
          <tr><td>dimmed</td><td>boolean</td><td>{{ t('text.api.dimmed') }}</td></tr>
          <tr><td>prefixLine</td><td>boolean</td><td>{{ t('text.api.prefixLine') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>clsx, tailwind-merge, pf-theme</PfCode>
    </section>
  </article>
</template>
