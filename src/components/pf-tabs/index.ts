export { default as PfTabs } from './PfTabs.vue'

export type PfTabItem = {
  label: string
  value: string
  disabled?: boolean
}

export interface PfTabsProps {
  modelValue?: string
  items?: PfTabItem[]
  orientation?: 'horizontal' | 'vertical'
  class?: string
}
