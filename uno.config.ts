import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { createPfThemePresets } from './src/foundations/pf-compat'
import { createPfIconsPreset } from './src/foundations/pf-icons'

export default defineConfig({
  // `presetWind4()` 提供工具类本体；主题真源在 potato-design（`@potato-forge/ui`），
  // 由 `createPfThemePresets()` 注入 token、元素默认值与历史别名。
  presets: [presetWind4(), ...createPfThemePresets(), createPfIconsPreset()],
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
