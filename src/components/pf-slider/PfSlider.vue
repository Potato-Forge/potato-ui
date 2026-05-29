<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { sliderVariants } from '.'
import type { PfSliderProps } from '.'

const props = withDefaults(defineProps<PfSliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const normalizedMax = computed(() => Math.max(props.max, props.min))

const value = computed(() => {
  const raw = props.modelValue ?? props.min
  return Math.min(Math.max(Number(raw), props.min), normalizedMax.value)
})

const percent = computed(() => {
  const span = normalizedMax.value - props.min
  if (span <= 0) return 0
  return ((value.value - props.min) / span) * 100
})

const displayValue = computed(() => {
  if (props.formatValue) return props.formatValue(value.value)
  return String(value.value)
})

const interactive = computed(() => !props.disabled && !props.readonly)

const updateValue = (event: Event) => {
  if (!interactive.value) return
  emit('update:modelValue', Number((event.target as HTMLInputElement).value))
}

const commitValue = (event: Event) => {
  if (!interactive.value) return
  emit('change', Number((event.target as HTMLInputElement).value))
}
</script>

<template>
  <div :class="cn(sliderVariants({ size, disabled: disabled || readonly }), props.class)">
    <div v-if="showValue" class="mb-2 flex items-center justify-between gap-3 text-sm">
      <slot name="label"></slot>
      <span class="shrink-0 tabular-nums text-muted-foreground">{{ displayValue }}</span>
    </div>

    <div class="relative h-[var(--pf-slider-thumb)]">
      <div
        class="absolute left-0 right-0 top-1/2 h-[var(--pf-slider-track)] -translate-y-1/2 overflow-hidden rounded-full bg-muted"
      >
        <div
          class="h-full rounded-full bg-primary transition-[width]"
          :style="{ width: `${percent}%` }"
        ></div>
      </div>
      <div
        class="pointer-events-none absolute top-1/2 h-[var(--pf-slider-thumb)] w-[var(--pf-slider-thumb)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary bg-background shadow-sm ring-offset-background transition-[left,box-shadow]"
        :style="{ left: `${percent}%` }"
      ></div>
      <input
        class="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        type="range"
        :value="value"
        :min="min"
        :max="normalizedMax"
        :step="step"
        :disabled="disabled || readonly"
        :aria-valuenow="value"
        :aria-valuemin="min"
        :aria-valuemax="normalizedMax"
        @input="updateValue"
        @change="commitValue"
      />
    </div>
  </div>
</template>
