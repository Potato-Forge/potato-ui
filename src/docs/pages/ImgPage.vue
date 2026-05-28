<script setup lang="ts">
import { computed, ref } from 'vue'
import PfImg from '@/components/pf-img/PfImg.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const previewEnabled = ref(true)
const rounded = ref(true)
const objectFit = ref<'cover' | 'contain' | 'fill' | 'none' | 'scale-down'>('cover')
const aspectRatio = ref<'4/3' | '16/9' | '1/1'>('4/3')
const demoImages = [
  'https://picsum.photos/seed/pf-ui/400/300',
  'https://picsum.photos/seed/pf-ui-gallery-1/400/300',
  'https://picsum.photos/seed/pf-ui-gallery-2/400/300',
]

const usageCode = computed(() => dedent`
  <PfImg
    src="/path/to/image.jpg"
    alt="Description"
    :preview="true"
    :rounded="true"
    aspect-ratio="16/9"
    object-fit="cover"
    fallback-src="/fallback.jpg"
    loading-text="${t('img.loading')}"
    error-text="${t('img.error')}"
  />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfImg</h1>
      <p>{{ t('img.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm pf:add pf-img --cwd ../your-app</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <div class="preview-panel">
          <div class="preview-surface">
            <div class="w-full max-w-[360px]">
              <PfImg
                :src="demoImages[0]"
                alt="Demo image"
                :preview="previewEnabled"
                :preview-src-list="demoImages"
                :aspect-ratio="aspectRatio"
                :object-fit="objectFit"
                :rounded="rounded"
                class="w-full"
              />
            </div>
          </div>

          <div class="props-panel">
            <div class="prop-control">
              <label for="img-object-fit">{{ t('img.prop.objectFit') }}</label>
              <select id="img-object-fit" v-model="objectFit">
                <option value="cover">cover</option>
                <option value="contain">contain</option>
                <option value="fill">fill</option>
                <option value="none">none</option>
                <option value="scale-down">scale-down</option>
              </select>
            </div>

            <div class="prop-control">
              <label for="img-aspect-ratio">{{ t('img.prop.aspectRatio') }}</label>
              <select id="img-aspect-ratio" v-model="aspectRatio">
                <option value="4/3">4/3</option>
                <option value="16/9">16/9</option>
                <option value="1/1">1/1</option>
              </select>
            </div>

            <div class="prop-control">
              <span>{{ t('img.prop.options') }}</span>
              <div class="toggle-row">
                <button
                  type="button"
                  :class="{ active: previewEnabled }"
                  @click="previewEnabled = !previewEnabled"
                >
                  {{ t('img.prop.preview') }}
                </button>
                <button
                  type="button"
                  :class="{ active: rounded }"
                  @click="rounded = !rounded"
                >
                  {{ t('img.prop.rounded') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('img.fallback') }}</h2>
      <div class="preview">
        <div class="h-[150px] w-[150px]">
          <PfImg
            src=""
            alt="Broken image"
            fallback-src="https://picsum.photos/seed/fallback/400/300"
            :rounded="true"
            class="h-full w-full"
            object-fit="cover"
          />
        </div>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.usage') }}</h2>
      <PfCode :code="usageCode" language="vue" dedent />
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>src</td><td>string | null</td><td>{{ t('img.api.src') }}</td></tr>
          <tr><td>alt</td><td>string</td><td>{{ t('img.api.alt') }}</td></tr>
          <tr><td>fallbackSrc</td><td>string</td><td>{{ t('img.api.fallbackSrc') }}</td></tr>
          <tr><td>preview</td><td>boolean</td><td>{{ t('img.api.preview') }}</td></tr>
          <tr><td>previewSrcList</td><td>string[]</td><td>{{ t('img.api.previewSrcList') }}</td></tr>
          <tr><td>objectFit</td><td>cover | contain | fill | none | scale-down</td><td>{{ t('img.api.objectFit') }}</td></tr>
          <tr><td>aspectRatio</td><td>number | '4/3' | '16/9'</td><td>{{ t('img.api.aspectRatio') }}</td></tr>
          <tr><td>rounded</td><td>boolean</td><td>{{ t('img.api.rounded') }}</td></tr>
          <tr><td>loadingText</td><td>string</td><td>{{ t('img.api.loading') }}</td></tr>
          <tr><td>errorText</td><td>string</td><td>{{ t('img.api.error') }}</td></tr>
          <tr><td>slots</td><td>loading | error</td><td>{{ t('img.api.slots') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>viewerjs, clsx, tailwind-merge, pf-icons, pf-theme</PfCode>
    </section>
  </article>
</template>
