<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { reactiveOmit } from '@vueuse/core'
import { SelectIcon, SelectTrigger, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'
import { selectTriggerVariants } from '.'

/**
 * 这里刻意不使用 `VariantProps<typeof selectTriggerVariants>` 作为 defineProps 的类型：
 * class-variance-authority 的 VariantProps 展开后包含条件类型，Vue 的 SFC 编译器
 * 无法解析（构建期报 TSConditionalType）。改为显式字面量，语义等价且可被编译。
 */
const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    size?: 'sm' | 'md' | 'lg'
    invalid?: boolean
  }>(),
  {
    size: 'md',
    invalid: false,
  },
)

const delegatedProps = reactiveOmit(props, 'class', 'size', 'invalid')
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwarded"
    :class="cn(selectTriggerVariants({ size: size ?? 'md', invalid: invalid ?? false }), props.class)"
  >
    <slot />
    <SelectIcon as-child>
      <span class="i-tabler-chevron-down size-4 shrink-0 text-muted-foreground" />
    </SelectIcon>
  </SelectTrigger>
</template>
