<script setup lang="ts">
import { cn } from '@/lib/utils'
import type { PfSkeletonProps } from '.'

const props = withDefaults(defineProps<PfSkeletonProps>(), {
  rows: 1,
  animated: true,
})
</script>

<template>
  <div :class="cn('grid w-full min-w-0 gap-2', props.class)" aria-hidden="true">
    <span
      v-for="row in rows"
      :key="row"
      :class="
        cn(
          'block bg-muted',
          circle ? 'aspect-square rounded-full' : 'h-4 rounded-md',
          animated && 'animate-pulse',
          !circle && row === rows && rows > 1 && 'w-2/3',
        )
      "
    ></span>
  </div>
</template>
