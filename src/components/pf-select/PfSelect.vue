<script setup lang="ts">
import { computed } from 'vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { PfSelectProps } from '.'

/**
 * PfSelect 使用 reka-ui 的 Select（与 DropdownMenu 同一套浮层原语），
 * 而不是原生 <select>。
 *
 * 原生 select 的下拉面板由操作系统绘制，无法沿用主题的 popover / accent 色，
 * 与项目里其他浮层（dropdown、modal、tooltip）明显割裂，也无法统一圆角与阴影。
 *
 * 对外 API（modelValue / options / placeholder / size / invalid / disabled）保持不变，
 * 因此换实现不会影响任何调用方。
 */
const props = withDefaults(defineProps<PfSelectProps>(), {
  options: () => [],
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

/**
 * reka-ui 内部统一用 string 作为 value，这里负责与外部 string | number 互转。
 * 空字符串代表「未选择」，用于显示 placeholder。
 */
const internalValue = computed({
  get: () => {
    if (props.modelValue === undefined || props.modelValue === null || props.modelValue === '') {
      return undefined
    }
    return String(props.modelValue)
  },
  set: (next: string | undefined) => {
    if (next === undefined) {
      emit('update:modelValue', '')
      return
    }
    const option = props.options.find((item) => String(item.value) === String(next))
    emit('update:modelValue', option?.value ?? String(next))
  },
})
</script>

<template>
  <Select v-model="internalValue" :disabled="disabled">
    <SelectTrigger
      :size="size ?? 'md'"
      :invalid="invalid ?? false"
      :aria-invalid="invalid || undefined"
      :class="props.class"
    >
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem
        v-for="option in options"
        :key="String(option.value)"
        :value="String(option.value)"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
