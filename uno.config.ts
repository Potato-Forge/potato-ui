import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { createPfIconsPreset } from './src/foundations/pf-icons'
import { createPfThemePreset } from './src/foundations/pf-theme'

export default defineConfig({
  presets: [presetWind4(), createPfThemePreset(), createPfIconsPreset()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        'src/**/*.{js,ts}',
      ],
    },
  },
})
