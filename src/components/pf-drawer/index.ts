export { default as PfDrawer } from './PfDrawer.vue'

export interface PfDrawerProps {
  open?: boolean
  title?: string
  description?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: string
}
