import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Select } from './Select.vue'
export { default as SelectContent } from './SelectContent.vue'
export { default as SelectItem } from './SelectItem.vue'
export { default as SelectTrigger } from './SelectTrigger.vue'
export { default as SelectValue } from './SelectValue.vue'

/**
 * 触发器外观与 PfInput 保持同一套尺寸/边框语义，避免表单里 Input 与 Select 视觉不一致。
 * `appearance-none` 不需要：reka-ui 的 trigger 是 button，不是原生 select。
 */
export const selectTriggerVariants = cva(
  'flex w-full min-w-0 items-center justify-between gap-2 rounded-md border border-input bg-background text-foreground shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground [&>span]:truncate',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-3.5 text-base',
      },
      invalid: {
        true: 'border-error focus-visible:ring-error',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      invalid: false,
    },
  },
)

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>
