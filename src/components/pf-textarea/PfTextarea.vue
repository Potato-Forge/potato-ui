<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { textareaVariants } from '.'
import type { PfTextareaProps } from '.'

const props = withDefaults(defineProps<PfTextareaProps>(), {
  rows: 4,
  resize: 'vertical',
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
  <textarea
    v-model="value"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :aria-invalid="invalid || undefined"
    :class="cn(textareaVariants({ resize, invalid }), props.class)"
  />
</template>
