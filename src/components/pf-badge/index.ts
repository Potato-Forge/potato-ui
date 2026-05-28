import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfBadge } from './PfBadge.vue'

export const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        solid: '',
        soft: '',
        outline: 'bg-transparent',
      },
      type: {
        default: '',
        primary: '',
        success: '',
        info: '',
        warning: '',
        error: '',
      },
      size: {
        sm: 'h-5 px-1.5 text-[11px]',
        md: 'h-6 px-2 text-xs',
        lg: 'h-7 px-2.5 text-sm',
      },
    },
    compoundVariants: [
      { variant: 'solid', type: 'default', class: 'border-muted bg-muted text-foreground' },
      { variant: 'solid', type: 'primary', class: 'border-primary bg-primary text-primary-foreground' },
      { variant: 'solid', type: 'success', class: 'border-success bg-success text-success-foreground' },
      { variant: 'solid', type: 'info', class: 'border-info bg-info text-info-foreground' },
      { variant: 'solid', type: 'warning', class: 'border-warning bg-warning text-warning-foreground' },
      { variant: 'solid', type: 'error', class: 'border-error bg-error text-error-foreground' },
      { variant: 'soft', type: 'default', class: 'border-muted bg-muted/60 text-foreground' },
      { variant: 'soft', type: 'primary', class: 'border-primary/20 bg-primary/10 text-primary' },
      { variant: 'soft', type: 'success', class: 'border-success/20 bg-success/10 text-success' },
      { variant: 'soft', type: 'info', class: 'border-info/20 bg-info/10 text-info' },
      { variant: 'soft', type: 'warning', class: 'border-warning/20 bg-warning/10 text-warning' },
      { variant: 'soft', type: 'error', class: 'border-error/20 bg-error/10 text-error' },
      { variant: 'outline', type: 'default', class: 'border-border text-foreground' },
      { variant: 'outline', type: 'primary', class: 'border-primary/40 text-primary' },
      { variant: 'outline', type: 'success', class: 'border-success/40 text-success' },
      { variant: 'outline', type: 'info', class: 'border-info/40 text-info' },
      { variant: 'outline', type: 'warning', class: 'border-warning/40 text-warning' },
      { variant: 'outline', type: 'error', class: 'border-error/40 text-error' },
    ],
    defaultVariants: {
      variant: 'soft',
      type: 'default',
      size: 'md',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>

export interface PfBadgeProps {
  variant?: BadgeVariants['variant']
  type?: BadgeVariants['type']
  size?: BadgeVariants['size']
  dot?: boolean
  class?: string
}
