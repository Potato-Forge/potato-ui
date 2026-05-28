<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import type { PfRadioGroupProps } from '.'

const props = withDefaults(defineProps<PfRadioGroupProps>(), {
  options: () => [],
  orientation: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const value = computed({
  get: () => props.modelValue ?? '',
  set: (next) => emit('update:modelValue', String(next)),
})
</script>

<template>
  <div
    role="radiogroup"
    :class="
      cn(
        'flex gap-3',
        orientation === 'horizontal' ? 'flex-row flex-wrap items-center' : 'flex-col',
        props.class,
      )
    "
  >
    <label
      v-for="option in options"
      :key="String(option.value)"
      :class="
        cn(
          'flex min-w-0 items-start gap-2 text-sm text-foreground',
          disabled || option.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        )
      "
    >
      <input
        v-model="value"
        type="radio"
        :name="name"
        :value="option.value"
        :disabled="disabled || option.disabled"
        class="mt-0.5 h-4 w-4 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      />
      <span class="grid min-w-0 gap-0.5">
        <span class="truncate leading-5">{{ option.label }}</span>
        <span v-if="option.description" class="text-xs leading-4 text-muted-foreground">
          {{ option.description }}
        </span>
      </span>
    </label>
  </div>
</template>
