<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import type { PfDrawerProps } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PfDrawerProps>(), {
  side: 'right',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <Sheet :open="open" @update:open="emit('update:open', $event)">
    <SheetContent :side="side" :class="props.class" v-bind="$attrs">
      <SheetHeader v-if="title || description || $slots.header">
        <slot name="header">
          <SheetTitle v-if="title">{{ title }}</SheetTitle>
          <SheetDescription v-if="description">{{ description }}</SheetDescription>
        </slot>
      </SheetHeader>
      <div class="min-h-0 flex-1 overflow-auto">
        <slot />
      </div>
      <div v-if="$slots.footer" class="mt-4 flex justify-end gap-2">
        <slot name="footer" />
      </div>
    </SheetContent>
  </Sheet>
</template>
