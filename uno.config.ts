import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import { createPfAnimatePreset } from './src/foundations/pf-animate'
import { createPfThemePresets } from './src/foundations/pf-compat'
import { createPfIconsPreset } from './src/foundations/pf-icons'

export default defineConfig({
  // `presetWind4()` 提供工具类本体；主题真源在 potato-design（`@potato-forge/ui`），
  // 由 `createPfThemePresets()` 注入 token、元素默认值与历史别名。
  // `pf-animate` 补上浮层进出场动画（原先依赖的 tailwindcss-animate 类名不会生成 CSS）。
  presets: [
    presetWind4(),
    ...createPfThemePresets(),
    createPfAnimatePreset(),
    createPfIconsPreset(),
  ],
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
