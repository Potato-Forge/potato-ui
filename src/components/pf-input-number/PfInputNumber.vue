<script setup lang="ts">
import { computed } from 'vue'
import PfButton from '@/components/pf-button/PfButton.vue'
import PfInput from '@/components/pf-input/PfInput.vue'
import type { PfInputNumberProps } from '.'

const props = withDefaults(defineProps<PfInputNumberProps>(), {
  step: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | null]
}>()

const value = computed({
  get: () => (props.modelValue === null || props.modelValue === undefined ? '' : props.modelValue),
  set: (next) => {
    if (next === '') {
      emit('update:modelValue', null)
      return
    }
    const parsed = Number(next)
    if (!Number.isNaN(parsed)) emit('update:modelValue', clamp(parsed))
  },
})

const clamp = (next: number) => {
  let value = next
  if (props.min !== undefined) value = Math.max(props.min, value)
  if (props.max !== undefined) value = Math.min(props.max, value)
  return value
}

const stepBy = (direction: 1 | -1) => {
  const current = typeof props.modelValue === 'number' ? props.modelValue : 0
  emit('update:modelValue', clamp(current + props.step * direction))
}
</script>

<template>
  <div class="flex w-full min-w-0 items-center gap-1">
    <PfButton
      type="button"
      variant="outline"
      size="icon"
      :disabled="disabled || readonly"
      @click="stepBy(-1)"
    >
      <span class="i-tabler-minus h-4 w-4"></span>
    </PfButton>
    <PfInput
      v-model="value"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :class="props.class"
    />
    <PfButton
      type="button"
      variant="outline"
      size="icon"
      :disabled="disabled || readonly"
      @click="stepBy(1)"
    >
      <span class="i-tabler-plus h-4 w-4"></span>
    </PfButton>
  </div>
</template>
