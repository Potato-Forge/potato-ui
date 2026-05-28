import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfInput } from './PfInput.vue'

export const inputVariants = cva(
  'flex w-full min-w-0 rounded-md border border-input bg-background text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
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

export type InputVariants = VariantProps<typeof inputVariants>

export interface PfInputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  size?: InputVariants['size']
  class?: string
}
