import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfAlert } from './PfAlert.vue'

export const alertVariants = cva(
  'relative grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-lg border p-4 text-sm',
  {
    variants: {
      type: {
        info: 'border-info/30 bg-info/10 text-info',
        success: 'border-success/30 bg-success/10 text-success',
        warning: 'border-warning/30 bg-warning/10 text-warning',
        error: 'border-error/30 bg-error/10 text-error',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  },
)

export type AlertVariants = VariantProps<typeof alertVariants>

export interface PfAlertProps {
  type?: AlertVariants['type']
  title?: string
  description?: string
  icon?: string
  closable?: boolean
  class?: string
}
