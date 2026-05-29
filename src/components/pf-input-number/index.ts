export { default as PfInputNumber } from './PfInputNumber.vue'

export interface PfInputNumberProps {
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  class?: string
}
