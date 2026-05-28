import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfSelect } from './PfSelect.vue'

export type PfSelectOption = {
  label: string
  value: string | number
  disabled?: boolean
}

export const selectVariants = cva(
  'flex w-full min-w-0 appearance-none rounded-md border border-input bg-background text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 pr-8 text-sm',
        md: 'h-9 px-3 pr-9 text-sm',
        lg: 'h-10 px-3.5 pr-10 text-base',
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

export type SelectVariants = VariantProps<typeof selectVariants>

export interface PfSelectProps {
  modelValue?: string | number
  options?: PfSelectOption[]
  placeholder?: string
  disabled?: boolean
  invalid?: boolean
  size?: SelectVariants['size']
  class?: string
}
