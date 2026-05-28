<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { selectVariants } from '.'
import type { PfSelectProps } from '.'

const props = withDefaults(defineProps<PfSelectProps>(), {
  options: () => [],
  size: 'md',
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
  <label class="relative block w-full min-w-0">
    <select
      v-model="value"
      :disabled="disabled"
      :aria-invalid="invalid || undefined"
      :class="cn(selectVariants({ size, invalid }), props.class)"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="String(option.value)"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <span class="i-tabler-chevron-down pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"></span>
  </label>
</template>
