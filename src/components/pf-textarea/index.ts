import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfTextarea } from './PfTextarea.vue'

export const textareaVariants = cva(
  'flex w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
      invalid: {
        true: 'border-error focus-visible:ring-error',
        false: '',
      },
    },
    defaultVariants: {
      resize: 'vertical',
      invalid: false,
    },
  },
)

export type TextareaVariants = VariantProps<typeof textareaVariants>

export interface PfTextareaProps {
  modelValue?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  resize?: TextareaVariants['resize']
  class?: string
}
