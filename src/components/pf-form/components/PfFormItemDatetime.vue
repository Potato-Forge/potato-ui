<script setup lang="ts">
import PfDatePicker from '@/components/pf-date-picker/PfDatePicker.vue'
import type { PfDatePickerValue } from '@/components/pf-date-picker'

const props = withDefaults(
  defineProps<{
    modelValue: PfDatePickerValue
    type?: 'date' | 'time' | 'datetime'
    format?: 'timestamp' | 'format' | 'iso' | string
    range?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: null,
    type: 'datetime',
    disabled: false,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: PfDatePickerValue): void
  (e: 'blur'): void
}>()
</script>

<template>
  <PfDatePicker
    :model-value="modelValue"
    :type="type"
    :format="format"
    :range="range"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
    @blur="emit('blur')"
  />
</template>
