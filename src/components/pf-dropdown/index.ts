export { default as PfDropdown } from './PfDropdown.vue'

export type PfDropdownItem = {
  label: string
  value: string
  icon?: string
  disabled?: boolean
  danger?: boolean
}

export interface PfDropdownProps {
  items?: PfDropdownItem[]
  label?: string
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  class?: string
}
