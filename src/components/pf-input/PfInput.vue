<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { inputVariants } from '.'
import type { PfInputProps } from '.'

const props = withDefaults(defineProps<PfInputProps>(), {
  type: 'text',
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
  <input
    v-model="value"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :aria-invalid="invalid || undefined"
    :class="cn(inputVariants({ size, invalid }), props.class)"
  />
</template>
