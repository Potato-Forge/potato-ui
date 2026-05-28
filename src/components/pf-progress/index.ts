import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfProgress } from './PfProgress.vue'

export const progressVariants = cva('overflow-hidden rounded-full bg-muted', {
  variants: {
    size: {
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-3',
    },
    type: {
      primary: '[&_[data-slot=indicator]]:bg-primary',
      success: '[&_[data-slot=indicator]]:bg-success',
      info: '[&_[data-slot=indicator]]:bg-info',
      warning: '[&_[data-slot=indicator]]:bg-warning',
      error: '[&_[data-slot=indicator]]:bg-error',
    },
  },
  defaultVariants: {
    size: 'md',
    type: 'primary',
  },
})

export type ProgressVariants = VariantProps<typeof progressVariants>

export interface PfProgressProps {
  value?: number
  max?: number
  size?: ProgressVariants['size']
  type?: ProgressVariants['type']
  showLabel?: boolean
  class?: string
}
