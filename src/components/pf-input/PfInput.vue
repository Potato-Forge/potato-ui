<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { inputVariants } from '.'
import type { PfInputProps } from '.'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<PfInputProps>(), {
  type: 'text',
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
}>()

const value = computed({
  get: () => props.modelValue ?? '',
  set: (next) => emit('update:modelValue', String(next)),
})

const hasValue = computed(() => value.value !== '' && value.value !== null && value.value !== undefined)
const showClear = computed(() => props.clearable && hasValue.value && !props.disabled && !props.readonly)

const clear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<template>
  <label
    :class="cn(inputVariants({ size, invalid }), props.class)"
    :data-disabled="disabled || undefined"
  >
    <slot name="prefix">
      <span
        v-if="prefixIcon"
        :class="cn(prefixIcon, 'h-4 w-4 shrink-0 text-muted-foreground')"
        aria-hidden="true"
      ></span>
    </slot>

    <input
      v-bind="$attrs"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="invalid || undefined"
      :class="
        cn(
          'min-w-0 flex-1 border-0 bg-transparent p-0 text-inherit outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed',
          props.inputClass,
        )
      "
    />

    <button
      v-if="showClear"
      type="button"
      class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Clear input"
      @click="clear"
    >
      <span class="i-tabler-x h-3.5 w-3.5"></span>
    </button>

    <slot name="suffix">
      <span
        v-if="suffixIcon"
        :class="cn(suffixIcon, 'h-4 w-4 shrink-0 text-muted-foreground')"
        aria-hidden="true"
      ></span>
    </slot>
  </label>
</template>
