import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfCollapse } from './PfCollapse.vue'

export const collapseVariants = cva('rounded-md border border-border bg-card text-card-foreground', {
  variants: {
    size: {
      sm: '[--pf-collapse-px:0.75rem] [--pf-collapse-py:0.5rem] text-sm',
      md: '[--pf-collapse-px:1rem] [--pf-collapse-py:0.75rem] text-sm',
      lg: '[--pf-collapse-px:1.25rem] [--pf-collapse-py:1rem] text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type CollapseVariants = VariantProps<typeof collapseVariants>

export interface PfCollapseProps {
  modelValue?: boolean
  defaultOpen?: boolean
  title?: string
  description?: string
  disabled?: boolean
  size?: CollapseVariants['size']
  class?: string
}
