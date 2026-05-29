<script setup lang="ts">
import PfButton from '@/components/pf-button/PfButton.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { PfDropdownProps } from '.'

const props = withDefaults(defineProps<PfDropdownProps>(), {
  items: () => [],
  label: 'More',
  align: 'end',
  side: 'bottom',
})

const emit = defineEmits<{
  select: [value: string]
}>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <slot name="trigger">
        <PfButton type="button" variant="outline" :class="props.class">
          {{ label }}
          <span class="i-tabler-chevron-down h-4 w-4"></span>
        </PfButton>
      </slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent :align="align" :side="side" class="min-w-40">
      <slot>
        <DropdownMenuItem
          v-for="item in items"
          :key="item.value"
          :disabled="item.disabled"
          :class="cn(item.danger && 'text-error focus:text-error')"
          @click="emit('select', item.value)"
        >
          <span v-if="item.icon" :class="cn(item.icon, 'h-4 w-4')"></span>
          <span>{{ item.label }}</span>
        </DropdownMenuItem>
      </slot>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
