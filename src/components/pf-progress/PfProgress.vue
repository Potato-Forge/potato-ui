<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { progressVariants } from '.'
import type { PfProgressProps } from '.'

const props = withDefaults(defineProps<PfProgressProps>(), {
  value: 0,
  max: 100,
  size: 'md',
  type: 'primary',
})

const percent = computed(() => {
  if (props.max <= 0) return 0
  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})
</script>

<template>
  <div class="grid w-full min-w-0 gap-2">
    <div
      role="progressbar"
      :aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuenow="value"
      :class="cn(progressVariants({ size, type }), props.class)"
    >
      <div
        data-slot="indicator"
        class="h-full rounded-full transition-all"
        :style="{ width: `${percent}%` }"
      ></div>
    </div>
    <div v-if="showLabel" class="text-xs text-muted-foreground">{{ Math.round(percent) }}%</div>
  </div>
</template>
