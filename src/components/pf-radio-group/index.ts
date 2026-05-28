export { default as PfRadioGroup } from './PfRadioGroup.vue'

export type PfRadioOption = {
  label: string
  value: string | number
  description?: string
  disabled?: boolean
}

export interface PfRadioGroupProps {
  modelValue?: string | number
  options?: PfRadioOption[]
  name?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  class?: string
}
