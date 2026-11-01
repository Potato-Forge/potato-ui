import type { Preset } from 'unocss'
import { presetPotato } from '@potato-forge/ui/preset'

/**
 * potato-design 兼容层。
 *
 * 本 preset 的存在理由只有一个：让 potato-ui 的组件继续写历史的 token 名
 * （`destructive`、`sidebar-*`、`selected`、`risk`…），而颜色的真值全部来自
 * `@potato-forge/ui`。组件因此零改动，主题却只有一个真源。
 *
 * 三层结构：
 * 1. `presetPotato()` —— design 自己的 token、typography、radius、shadow、motion；
 * 2. `pf-compat`（本文）—— 历史 token 名 → `--pd-*` 的别名，只做映射不做发明；
 * 3. 品牌色覆盖 —— 运行时由 `theme-settings.ts` 写 `--pd-color-primary` 等变量。
 *
 * 关键约束：design 的 token 值已经是完整 OKLCH（`oklch(0.47 0.08 190)`），
 * 不是 HSL 三段式。因此别名 MUST 用 `var(--pd-color-x)` 直接给出，
 * 任何 `hsl(var(--pd-color-x))` 包装都会产出无效 CSS 并被浏览器丢弃。
 */

/**
 * design 已改名或 potato-ui 独有、但语义可从 design 现有 token 精确表达的映射。
 *
 * 每一行都必须能说出「为什么是这一个 design token」，说不出来的就不该在这里。
 */
const LEGACY_COLOR_MAP = {
  /** design 把 `destructive` 统一改名为 `error`。 */
  destructive: 'error',
  /** design 用 `accent` 表达「hover、selection、active」，即原 `selected` 的用途。 */
  selected: 'accent',
  /**
   * `risk` 是 pfToast.risk() 的专用配色，语义为「危险但未失败」。
   * design 中最接近的是 `warning`（需要注意、仍可继续），故映射过去。
   */
  risk: 'warning',

  /**
   * 裸 `sidebar` 是 shadcn-vue 的约定（`bg-sidebar`）。旧 pf-theme 只定义了
   * `sidebar-background` 等派生变量、从未定义裸名，导致 `Sidebar.vue` 里的
   * `bg-sidebar` 一直静默不生成 CSS。这里补上映射，顺带修掉这处历史遗留。
   */
  'sidebar': 'surface',
  'sidebar-background': 'surface',
  'sidebar-foreground': 'surface-foreground',
  'sidebar-primary': 'primary',
  'sidebar-primary-foreground': 'primary-foreground',
  'sidebar-accent': 'accent',
  'sidebar-accent-foreground': 'accent-foreground',
  'sidebar-border': 'border',
  'sidebar-ring': 'ring',

  /**
   * potato-ui 的 app-shell 家族（旧 token，已无组件引用，但 docs 的
   * pf-theme.css 与少量手写 CSS 仍在用）。按语义就近落位，不发明新层。
   */
  'app-shell': 'background',
  'content-surface': 'card',
  'content-muted': 'surface-subtle',
} as const

/** 与 design token 同名、无需重命名，但仍需别名以便旧的裸变量名继续工作。 */
const IDENTICAL_COLOR_NAMES = [
  'background', 'foreground',
  'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
  'accent', 'accent-foreground', 'muted', 'muted-foreground',
  'border', 'input', 'ring',
  'success', 'success-foreground',
  'info', 'info-foreground',
  'warning', 'warning-foreground',
  'error', 'error-foreground',
  'tip', 'tip-foreground',
] as const

/**
 * 旧 `--radius` 变量。
 *
 * 旧值 0.5rem 对应 design 的 `md`（8px），旧 `lg`/`sm` 由它 calc 派生。
 * 组件里现存 `calc(var(--radius) - 2px)` 这类写法，映射到 md 后仍可正常工作。
 */
const LEGACY_RADIUS_ALIAS = 'var(--pd-radius-md)'

const colorAliases = Object.fromEntries([
  ...Object.entries(LEGACY_COLOR_MAP).flatMap(([legacyName, designName]) => [
    [legacyName, `var(--pd-color-${designName})`],
    [`${legacyName}-foreground`, `var(--pd-color-${designName}-foreground)`],
  ]),
  ...IDENTICAL_COLOR_NAMES.map(name => [name, `var(--pd-color-${name})`]),
])

const variableAliases = {
  ...Object.fromEntries(Object.entries(colorAliases).map(([name, value]) => [`--${name}`, value])),
  '--radius': LEGACY_RADIUS_ALIAS,
}

const aliasDeclarations = () =>
  Object.entries(variableAliases)
    .map(([name, value]) => `${name}: ${value};`)
    .join(' ')

export function createPfCompatPreset(): Preset {
  return {
    name: 'pf-compat',
    theme: {
      colors: colorAliases,
    },
    preflights: [
      {
        // 与 design 同层，确保别名在主题变量之后声明。
        layer: 'theme',
        getCSS: () => `:root { ${aliasDeclarations()} }`,
      },
    ],
    // 旧 preset 提供的唯一定制 shortcut，保留以免组件侧出现未知类。
    shortcuts: {
      'flex-center': 'flex justify-center items-center',
    },
  }
}

/**
 * potato-ui 使用的完整 preset 链。
 *
 * 顺序有意义：`presetPotato()` 先落 design token 与元素默认值，
 * `createPfCompatPreset()` 再补历史别名。
 *
 * `presetPotato()` 需要一次类型断言：`@potato-forge/ui` 把 `@unocss/core` 作为
 * peerDependency，其 `Preset` 泛型在跨包实例化时会被 TypeScript 视为不同标识
 * （典型场景是本地 `link:` 联调时两边 core 版本不完全一致）。运行时对象结构完全
 * 相同，这里只影响类型检查，不影响生成结果。
 */
export function createPfThemePresets(): Preset[] {
  return [presetPotato() as Preset, createPfCompatPreset()]
}
