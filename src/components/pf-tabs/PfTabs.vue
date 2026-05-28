<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import type { PfTabsProps } from '.'

const props = withDefaults(defineProps<PfTabsProps>(), {
  items: () => [],
  orientation: 'horizontal',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectedValue = computed(() => props.modelValue ?? props.items[0]?.value ?? '')

const select = (value: string, disabled?: boolean) => {
  if (!disabled) emit('update:modelValue', value)
}
</script>

<template>
  <div
    :class="
      cn(
        'min-w-0',
        orientation === 'vertical' ? 'grid grid-cols-[180px_minmax(0,1fr)] gap-4' : 'grid gap-4',
        props.class,
      )
    "
  >
    <div
      role="tablist"
      :aria-orientation="orientation"
      :class="
        cn(
          'rounded-lg bg-muted p-1',
          orientation === 'vertical' ? 'grid content-start gap-1' : 'inline-flex w-fit max-w-full overflow-auto',
        )
      "
    >
      <button
        v-for="item in items"
        :key="item.value"
        type="button"
        role="tab"
        :aria-selected="selectedValue === item.value"
        :disabled="item.disabled"
        :class="
          cn(
            'min-w-0 rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            orientation === 'vertical' ? 'w-full text-left' : 'whitespace-nowrap',
            selectedValue === item.value && 'bg-background text-foreground shadow-sm',
          )
        "
        @click="select(item.value, item.disabled)"
      >
        {{ item.label }}
      </button>
    </div>

    <div class="min-w-0">
      <slot :value="selectedValue" />
    </div>
  </div>
</template>
