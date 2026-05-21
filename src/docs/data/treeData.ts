import type { PfTreeNode } from '@/components/pf-tree'

export const demoTreeData: PfTreeNode[] = [
  {
    id: 'docs',
    parent_id: null,
    name: 'Documentation',
    icon: 'book',
    children: [
      { id: 'button', parent_id: 'docs', name: 'Button', icon: 'click' },
      { id: 'tooltip', parent_id: 'docs', name: 'Tooltip', icon: 'message' },
    ],
  },
  {
    id: 'registry',
    parent_id: null,
    name: 'Registry',
    icon: 'package',
    children: [
      { id: 'build', parent_id: 'registry', name: 'Build script', icon: 'terminal' },
      { id: 'payload', parent_id: 'registry', name: 'Payloads', icon: 'file-code' },
    ],
  },
]
