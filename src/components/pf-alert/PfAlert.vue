<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { alertVariants } from '.'
import type { PfAlertProps } from '.'

const props = withDefaults(defineProps<PfAlertProps>(), {
  type: 'info',
})

const emit = defineEmits<{
  close: []
}>()

const fallbackIcon = computed(() => {
  if (props.icon) return props.icon
  if (props.type === 'success') return 'i-tabler-circle-check'
  if (props.type === 'warning') return 'i-tabler-alert-triangle'
  if (props.type === 'error') return 'i-tabler-circle-x'
  return 'i-tabler-info-circle'
})
</script>

<template>
  <div :class="cn(alertVariants({ type }), props.class)" role="alert">
    <span :class="cn(fallbackIcon, 'mt-0.5 h-5 w-5 shrink-0')" aria-hidden="true"></span>
    <div class="min-w-0 pr-6">
      <div v-if="title || $slots.title" class="font-semibold leading-5 text-foreground">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.default" class="mt-1 leading-5 text-muted-foreground">
        <slot>{{ description }}</slot>
      </div>
    </div>
    <button
      v-if="closable"
      type="button"
      class="absolute right-3 top-3 inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Close"
      @click="emit('close')"
    >
      <span class="i-tabler-x h-4 w-4"></span>
    </button>
  </div>
</template>
