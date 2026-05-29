export { default as PfRate } from './PfRate.vue'

export interface PfRateProps {
  modelValue?: number | null
  count?: number
  disabled?: boolean
  readonly?: boolean
  clearable?: boolean
  class?: string
}
