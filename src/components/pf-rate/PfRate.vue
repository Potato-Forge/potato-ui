<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/lib/utils'
import type { PfRateProps } from '.'

const props = withDefaults(defineProps<PfRateProps>(), {
  modelValue: 0,
  count: 5,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const hoverValue = ref<number | null>(null)
const activeValue = computed(() => hoverValue.value ?? props.modelValue ?? 0)
const isReadonly = computed(() => props.disabled || props.readonly)

const rateItems = computed(() => Array.from({ length: Math.max(0, props.count) }, (_, index) => index + 1))

const updateValue = (next: number) => {
  if (isReadonly.value) return
  if (props.clearable && props.modelValue === next) {
    emit('update:modelValue', null)
    return
  }
  emit('update:modelValue', next)
}
</script>

<template>
  <div
    :class="cn('inline-flex min-w-0 items-center gap-1', props.class)"
    @mouseleave="hoverValue = null"
  >
    <button
      v-for="item in rateItems"
      :key="item"
      type="button"
      class="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      :class="item <= activeValue ? 'text-warning' : 'hover:text-warning'"
      :disabled="disabled"
      :aria-label="`${item} / ${count}`"
      @mouseenter="!isReadonly && (hoverValue = item)"
      @click="updateValue(item)"
    >
      <span
        class="h-5 w-5"
        :class="item <= activeValue ? 'i-tabler-star-filled' : 'i-tabler-star'"
      ></span>
    </button>
  </div>
</template>
