<script setup lang="ts">
import { cn } from '@/lib/utils'
import { badgeVariants } from '.'
import type { PfBadgeProps } from '.'

const props = withDefaults(defineProps<PfBadgeProps>(), {
  variant: 'soft',
  type: 'default',
  size: 'md',
})
</script>

<template>
  <span :class="cn(badgeVariants({ variant, type, size }), props.class)">
    <span
      v-if="dot"
      class="h-1.5 w-1.5 rounded-full bg-current"
      aria-hidden="true"
    ></span>
    <slot />
  </span>
</template>
