import type { PfTreeNode } from '..'

export type RootDroppable = () => boolean

export type PfTreeProps = {
  modelValue: PfTreeNode[]
  labelKey?: string
  valueKey?: string
  childrenKey?: string
  disabledKey?: string
  chooseable?: boolean
  checkable?: boolean
  draggable?: boolean
  choosen?: string | number | null
  eachDroppable?: (stat: unknown) => boolean | null
  rootDroppable?: boolean | RootDroppable
  dragOpen?: boolean
  dragOpenDelay?: number
}
