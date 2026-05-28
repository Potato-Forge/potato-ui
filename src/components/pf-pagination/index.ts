export { default as PfPagination } from './PfPagination.vue'

export interface PfPaginationProps {
  modelValue?: number
  total?: number
  pageSize?: number
  siblingCount?: number
  disabled?: boolean
  class?: string
}
