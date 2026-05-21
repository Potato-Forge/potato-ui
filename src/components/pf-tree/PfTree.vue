<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import { Draggable } from '@he-tree/vue'
import { Icon } from '@iconify/vue'
import PfTreeCheckbox from './PfTreeCheckbox.vue'
import type { PfTreeNode } from '.'
import type { PfTreeProps } from './types/PfTreeProps.types'

type TreeStat = {
  data: Record<string, unknown>
  checked?: boolean | 0
  open?: boolean
}

const asTreeStat = (stat: unknown) => stat as TreeStat

const props = withDefaults(defineProps<PfTreeProps>(), {
  labelKey: 'name',
  valueKey: 'id',
  childrenKey: 'children',
  disabledKey: 'disabled',
  chooseable: true,
  checkable: true,
  draggable: false,
  rootDroppable: true,
  dragOpen: true,
  dragOpenDelay: 120,
})

const treeRef = useTemplateRef('tree')

const getTreeData = () => {
  return treeRef.value ? treeRef.value.getData() : []
}

const getCheckedKeys = (): (string | number)[] => {
  if (!treeRef.value) return []
  return treeRef.value
    .getChecked()
    .map((stat: unknown) => asTreeStat(stat).data[props.valueKey])
    .filter((key: unknown): key is string | number => typeof key === 'string' || typeof key === 'number')
}

const setCheckedByKeys = (keys: (string | number)[]) => {
  if (!treeRef.value) return
  const keySet = new Set(keys.map(String))
  for (const stat of treeRef.value.statsFlat as unknown[]) {
    const treeStat = asTreeStat(stat)
    const key = String(treeStat.data[props.valueKey])
    treeStat.checked = keySet.has(key)
  }
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: PfTreeNode[]): void
  (event: 'update:choosen', value: string | number | null): void
}>()

const data = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const checkedNodes = ref<TreeStat[]>([])

const onCheckNode = () => {
  if (treeRef.value) {
    checkedNodes.value = treeRef.value.getChecked().map(asTreeStat)
  }
}

const choosen = computed({
  get() {
    return props.choosen
  },
  set(value) {
    emit('update:choosen', value || null)
  },
})

const getNodeKey = (stat: TreeStat) => stat.data[props.valueKey] as string | number | undefined

const onChooseNode = (stat: TreeStat) => {
  if (!props.chooseable) return
  const key = getNodeKey(stat)
  if (key == null) return
  choosen.value = choosen.value === key ? null : key
}

const isNodeChoosen = (stat: TreeStat) => {
  return choosen.value != null && choosen.value === getNodeKey(stat)
}

const nodeClass = (stat: TreeStat) => {
  return [
    props.chooseable ? 'cursor-pointer' : '',
    isNodeChoosen(stat) ? 'bg-selected text-primary ring-2 ring-inset ring-primary' : '',
  ]
}

defineExpose({
  getTreeData,
  getCheckedKeys,
  setCheckedByKeys,
})
</script>

<template>
  <Draggable
    ref="tree"
    v-model="data"
    :indent="16"
    :tree-line="true"
    class="pf-tree"
    :key-field="props.valueKey"
    :node-key="(stat: TreeStat) => stat.data[props.valueKey]"
    :children-key="props.childrenKey"
    :disable-drag="!props.draggable"
    :each-droppable="props.eachDroppable"
    :root-droppable="props.rootDroppable"
    :drag-open="props.dragOpen"
    :drag-open-delay="props.dragOpenDelay"
    @check:node="onCheckNode"
  >
    <template #placeholder>
      <div class="pf-tree-drop-indicator" aria-hidden="true">
        <div class="pf-tree-drop-indicator-v"></div>
        <div class="pf-tree-drop-indicator-h"></div>
      </div>
    </template>

    <template #default="{ node, stat }">
      <div
        class="relative w-full h-10 flex items-stretch pr-2 hover:(bg-secondary) transition-colors ease-in-out duration-200 rounded overflow-hidden"
        :class="nodeClass(stat)"
        @click="onChooseNode(stat)"
      >
        <div v-if="props.checkable" class="flex items-center mx-2">
          <PfTreeCheckbox v-model="stat.checked" class="mx-1" @click.stop />
        </div>

        <div v-show="node[props.childrenKey]?.length" class="flex items-center">
          <button
            type="button"
            class="grid place-content-center text-primary"
            :class="[
              stat.open ? 'rotate-90' : 'rotate-0',
              'transition-transform duration-200 ease-out cursor-pointer',
            ]"
            @click.stop="stat.open = !stat.open"
          >
            <span class="i-tabler-chevron-right text-4"></span>
          </button>
        </div>

        <div class="flex-grow flex items-center whitespace-nowrap mx-2 min-w-0">
          <slot name="icon" :node="node" :stat="stat">
            <Icon v-if="node.icon" :icon="`tabler:${node.icon}`" class="text-lg mr-1 shrink-0" />
          </slot>
          <slot
            name="text"
            :node="node"
            :stat="stat"
            :class="isNodeChoosen(stat) ? 'text-selected-foreground' : 'text-foreground'"
          >
            <span class="truncate">{{ node[props.labelKey] || node.text }}</span>
          </slot>
        </div>

        <div class="flex items-center">
          <slot name="subText" :node="node" :stat="stat"></slot>
        </div>

        <div class="flex items-center" @click.stop.prevent @mousedown.stop>
          <slot name="actions" :node="node" :stat="stat"></slot>
        </div>

        <div
          :class="isNodeChoosen(stat) ? 'scale-x-100' : 'scale-x-0'"
          class="absolute inset-y-0 right-0 w-2 origin-right rounded-r bg-primary pointer-events-none transition-transform duration-150 ease"
        ></div>
      </div>
    </template>
  </Draggable>
</template>

<style>
.pf-tree .tree-node {
  position: relative;
}

.pf-tree .tree-line,
.pf-tree .tree-vline,
.pf-tree .tree-hline {
  position: absolute;
  background: hsl(var(--border));
}

.pf-tree .tree-vline {
  top: 0;
  bottom: 0;
  inline-size: 1px;
}

.pf-tree .tree-hline {
  top: 50%;
  block-size: 1px;
  inline-size: 10px;
}

.pf-tree .tree-node-inner {
  animation: tree-row-in 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.pf-tree .drag-placeholder-wrapper .he-tree-drag-placeholder {
  height: 0;
  min-height: 0;
  border: 0;
  background: transparent;
}

.pf-tree-drop-indicator {
  position: relative;
  height: 0;
  width: 100%;
}

.pf-tree-drop-indicator-h {
  position: absolute;
  left: 0;
  right: 0;
  top: -1px;
  border-top: 2px solid hsl(var(--primary));
}

.pf-tree-drop-indicator-v {
  position: absolute;
  left: 0;
  top: -9px;
  height: 10px;
  border-left: 2px solid hsl(var(--primary));
}

@keyframes tree-row-in {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
    filter: blur(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}
</style>
