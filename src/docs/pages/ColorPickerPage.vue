<script setup lang="ts">
import { computed, ref } from 'vue'
import PfColorPicker from '@/components/pf-color-picker/PfColorPicker.vue'
import PfText from '@/components/pf-text/PfText.vue'
import { dedent } from '@/lib/utils'
import { t } from '../i18n'

const hexColor = ref('#2F7F6F')
const hslColor = ref('#3B82F6')
const playgroundColor = ref('#7C3AED')
const playgroundFormat = ref<'hex' | 'hsl' | 'rgb'>('hex')
const playgroundSwatches = ref(true)
const playgroundContrast = ref(true)
const playgroundDefaultSwatches = ref(true)
const playgroundDisabled = ref(false)

const customSwatches = ['#7C3AED', '#0EA5E9', '#10B981', '#F59E0B']

const usageCode = computed(() => dedent`
  <PfColorPicker v-model="color" format="hex" />

  <!-- ${t('colorPicker.withSwatches')} -->
  <PfColorPicker
    v-model="color"
    :swatches="['#FF0000', '#00FF00', '#0000FF']"
  />

  <!-- ${t('colorPicker.hideContrast')} -->
  <PfColorPicker v-model="color" :hide-contrast-ratio="true" />
`)
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfColorPicker</h1>
      <p>{{ t('colorPicker.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-forge/cli add pf-color-picker</PfCode>
    </section>

    <section class="section">
      <h2>{{ t('section.preview') }}</h2>
      <div class="preview">
        <div class="preview-panel">
          <div class="preview-surface">
            <div>
              <PfText variant="caption" dimmed>{{ t('colorPicker.playground') }}</PfText>
              <PfColorPicker
                v-model="playgroundColor"
                :format="playgroundFormat"
                :swatches="playgroundSwatches ? customSwatches : []"
                :hide-contrast-ratio="!playgroundContrast"
                :hide-default-swatches="!playgroundDefaultSwatches"
                :disabled="playgroundDisabled"
                class="mt-2"
              />
            </div>
          </div>

          <div class="props-panel">
            <div class="prop-control">
              <label for="color-picker-format">{{ t('colorPicker.prop.format') }}</label>
              <select id="color-picker-format" v-model="playgroundFormat">
                <option value="hex">HEX</option>
                <option value="hsl">HSL</option>
                <option value="rgb">RGB</option>
              </select>
            </div>

            <div class="prop-control">
              <span>{{ t('colorPicker.prop.options') }}</span>
              <div class="toggle-row">
                <button
                  type="button"
                  :class="{ active: playgroundSwatches }"
                  @click="playgroundSwatches = !playgroundSwatches"
                >
                  {{ t('colorPicker.prop.swatches') }}
                </button>
                <button
                  type="button"
                  :class="{ active: playgroundContrast }"
                  @click="playgroundContrast = !playgroundContrast"
                >
                  {{ t('colorPicker.prop.contrast') }}
                </button>
                <button
                  type="button"
                  :class="{ active: playgroundDefaultSwatches }"
                  @click="playgroundDefaultSwatches = !playgroundDefaultSwatches"
                >
                  {{ t('colorPicker.prop.defaultSwatches') }}
                </button>
                <button
                  type="button"
                  :class="{ active: playgroundDisabled }"
                  @click="playgroundDisabled = !playgroundDisabled"
                >
                  {{ t('colorPicker.prop.disabled') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section two-column">
      <div>
        <h2>{{ t('colorPicker.default') }}</h2>
        <div class="preview">
          <PfColorPicker v-model="hexColor" format="hex" />
        </div>
      </div>
      <div>
        <h2>{{ t('colorPicker.hideContrast') }}</h2>
        <div class="preview">
          <PfColorPicker v-model="hslColor" format="hsl" :hide-contrast-ratio="true" />
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
          <tr><td>modelValue</td><td>string</td><td>{{ t('colorPicker.api.modelValue') }}</td></tr>
          <tr><td>format</td><td>hex | hsl | rgb</td><td>{{ t('colorPicker.api.format') }}</td></tr>
          <tr><td>swatches</td><td>string[]</td><td>{{ t('colorPicker.api.swatches') }}</td></tr>
          <tr><td>hideContrastRatio</td><td>boolean</td><td>{{ t('colorPicker.api.hideContrast') }}</td></tr>
          <tr><td>hideDefaultSwatches</td><td>boolean</td><td>{{ t('colorPicker.api.hideDefaults') }}</td></tr>
          <tr><td>disabled</td><td>boolean</td><td>{{ t('colorPicker.api.disabled') }}</td></tr>
          <tr><td>slot</td><td>default</td><td>{{ t('colorPicker.api.slot') }}</td></tr>
          <tr><td>emits</td><td>update:modelValue | valueChange</td><td>{{ t('colorPicker.api.emits') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>pf-button, pf-help, pf-theme, pf-icons, ui-primitives (dropdown-menu, input)</PfCode>
    </section>
  </article>
</template>
