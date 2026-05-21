<script setup lang="ts">
import { computed } from 'vue'
import PfCheckbox from '../pf-checkbox/PfCheckbox.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean | 0
  }>(),
  {
    modelValue: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean | 0): void
}>()

const checked = computed({
  get() {
    if (props.modelValue === 0) return 'indeterminate'
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value === 'indeterminate' ? 0 : value)
  },
})
</script>

<template>
  <PfCheckbox v-model="checked" />
</template>
