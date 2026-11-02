import type { Preset } from 'unocss'

/**
 * 浮层进出场动画。
 *
 * 背景：项目里 drawer / modal / dropdown / select 都写了 `animate-in`、
 * `slide-in-from-right`、`fade-in-0` 这一套类名，但它们是 **tailwindcss-animate**
 * 插件的产物。本项目用的是 UnoCSS，既没装该插件也没有等价实现，这些类名
 * 一个都不会生成 CSS —— 结果是所有浮层瞬间出现、瞬间消失，没有任何过渡。
 *
 * 为什么不直接引入 `tw-animate-css`：它是给 Tailwind v4 的 `@theme` 与
 * `--tw-*` 变量体系用的，在 UnoCSS 下拿不到那套变量，行为不可预期。
 * 这里只需要 14 个类，自建一套最小实现更可控，也便于复用 design 的动效 Token。
 *
 * 机制与 tailwindcss-animate 一致：
 * - `animate-in` / `animate-out` 只负责挂上 keyframes；
 * - `fade-*` / `zoom-*` / `slide-*` 不写死样式，而是设置 CSS 变量，
 *   由 keyframes 读取。这样它们可以任意组合（淡入 + 右滑 + 缩放）。
 */

/** 动画时长与缓动取自 design 的动效 Token，保证全站节奏一致。
 *
 * 时长优先读 `--un-duration`：这样组件上已有的 `duration-*` 工具类
 * （它写的是 `--un-duration`）也能直接控制动画时长，无需另造一套变量。
 * 注意 `duration-*` 同时会写 `transition-duration`，但那只影响 transition，
 * 对 animation 无效——所以此前 `data-[state=open]:duration-500` 一直是死代码，
 * 接上 `--un-duration` 之后它才真正生效。
 */
const DURATION = 'var(--un-duration, var(--pd-duration-normal, 200ms))'
const EASE = 'var(--un-ease, var(--pd-ease-standard, cubic-bezier(0.2, 0, 0, 1)))'

const keyframes = `
@keyframes pf-enter {
  from {
    opacity: var(--pf-enter-opacity, 1);
    transform:
      translate3d(var(--pf-enter-translate-x, 0), var(--pf-enter-translate-y, 0), 0)
      scale3d(var(--pf-enter-scale, 1), var(--pf-enter-scale, 1), var(--pf-enter-scale, 1));
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  }
}

@keyframes pf-exit {
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  }
  to {
    opacity: var(--pf-exit-opacity, 1);
    transform:
      translate3d(var(--pf-exit-translate-x, 0), var(--pf-exit-translate-y, 0), 0)
      scale3d(var(--pf-exit-scale, 1), var(--pf-exit-scale, 1), var(--pf-exit-scale, 1));
  }
}
`

/**
 * 需要减少动效的用户：系统开了「减弱动态效果」时不做位移与缩放，
 * 只保留极短的淡入淡出，避免前庭不适。
 */
const reducedMotion = `
@media (prefers-reduced-motion: reduce) {
  [data-state='open'],
  [data-state='closed'] {
    animation-duration: 0.01ms !important;
  }
}
`

export function createPfAnimatePreset(): Preset {
  return {
    name: 'pf-animate',
    preflights: [
      {
        layer: 'theme',
        getCSS: () => `${keyframes}\n${reducedMotion}`,
      },
    ],
    rules: [
      [
        'animate-in',
        {
          animation: `pf-enter ${DURATION} ${EASE} both`,
        },
      ],
      [
        'animate-out',
        {
          animation: `pf-exit ${DURATION} ${EASE} both`,
        },
      ],

      // 透明度：数字后缀是百分比，fade-in-0 即从全透明开始。
      [/^fade-in-(\d+)$/, ([, v]) => ({ '--pf-enter-opacity': String(Number(v) / 100) })],
      [/^fade-out-(\d+)$/, ([, v]) => ({ '--pf-exit-opacity': String(Number(v) / 100) })],

      // 缩放：95 表示从 95% 开始，不是 95 倍。
      [/^zoom-in-(\d+)$/, ([, v]) => ({ '--pf-enter-scale': String(Number(v) / 100) })],
      [/^zoom-out-(\d+)$/, ([, v]) => ({ '--pf-exit-scale': String(Number(v) / 100) })],

      // 位移：默认整格滑动（相对自身尺寸 100%）；也支持任意值，
      // 例如 DialogContent 用的 `slide-in-from-top-[48%]`。
      [/^slide-in-from-(top|bottom|left|right)(?:-\[(.+)\])?$/, ([, dir, v]) => {
        const axis = dir === 'top' || dir === 'bottom' ? 'y' : 'x'
        const raw = v ?? '100%'
        // top / left 是从负向进来
        const negative = dir === 'top' || dir === 'left'
        const value = negative
          ? (raw.startsWith('-') ? raw.slice(1) : `-${raw}`)
          : raw
        return { [`--pf-enter-translate-${axis}`]: value }
      }],
      [/^slide-out-to-(top|bottom|left|right)(?:-\[(.+)\])?$/, ([, dir, v]) => {
        const axis = dir === 'top' || dir === 'bottom' ? 'y' : 'x'
        const raw = v ?? '100%'
        const negative = dir === 'top' || dir === 'left'
        const value = negative
          ? (raw.startsWith('-') ? raw.slice(1) : `-${raw}`)
          : raw
        return { [`--pf-exit-translate-${axis}`]: value }
      }],
    ],
  }
}
