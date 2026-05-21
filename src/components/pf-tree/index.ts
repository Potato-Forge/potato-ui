export { default as PfTree } from './PfTree.vue'

export type PfTreeNode = {
  [key: string]: unknown
  id: string | number
  parent_id?: string | number | null
  name?: string
  text?: string
  icon?: string
  children?: PfTreeNode[]
}
