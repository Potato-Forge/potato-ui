<script setup lang="ts">
import { computed } from 'vue'
import { Primitive } from 'reka-ui'
import { cn } from '@/lib/utils'
import { buttonVariants } from '.'
import type { ButtonVariants, PfButtonProps } from '.'

const props = withDefaults(defineProps<PfButtonProps>(), {
  as: 'button',
})

type SemanticButtonType = NonNullable<ButtonVariants['type']>

const semanticTypeSet = new Set(['primary', 'success', 'info', 'warning', 'error'])

const normalizeSemanticType = (value?: string): SemanticButtonType | undefined => {
  if (!value) return undefined
  if (value === 'waring') return 'warning'
  return semanticTypeSet.has(value) ? (value as SemanticButtonType) : undefined
}

const buttonVisualType = computed<SemanticButtonType | undefined>(
  () =>
    normalizeSemanticType(props.type ?? undefined) ?? normalizeSemanticType(props.color ?? undefined),
)

const nativeButtonType = computed<'button' | 'submit' | 'reset' | undefined>(() => {
  const rawType = props.type
  return rawType === 'button' || rawType === 'submit' || rawType === 'reset' ? rawType : undefined
})
</script>

<template>
  <Primitive
    data-slot="pf-button"
    :as="as"
    :as-child="asChild"
    :type="nativeButtonType"
    :disabled="disabled"
    :class="cn(buttonVariants({ variant, type: buttonVisualType, size }), props.class)"
  >
    <span class="inline-flex items-center gap-2">
      <slot name="prefix">
        <span v-if="props.icon" aria-hidden="true" :class="props.icon"></span>
      </slot>
      <slot />
      <slot name="suffix"></slot>
    </span>
  </Primitive>
</template>
