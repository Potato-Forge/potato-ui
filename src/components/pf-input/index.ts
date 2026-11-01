import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfInput } from './PfInput.vue'

export const inputVariants = cva(
  // focus 外框是 box-shadow 实现的 ring，只写 transition-colors 时它是瞬间出现的，
  // 与按钮 120ms 的短促过渡不一致。这里把 box-shadow 也纳入过渡，两者节奏统一。
  'flex w-full min-w-0 items-center gap-2 rounded-md border border-input bg-background text-foreground shadow-sm transition-[color,background-color,border-color,box-shadow] duration-fast ease-standard focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-9 px-3 text-sm',
        lg: 'h-10 px-3.5 text-base',
      },
      invalid: {
        true: 'border-error focus-within:ring-error',
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
  clearable?: boolean
  prefixIcon?: string
  suffixIcon?: string
  size?: InputVariants['size']
  class?: string
  inputClass?: string
}
