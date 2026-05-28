<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { avatarVariants } from '.'
import type { PfAvatarProps } from '.'

const props = withDefaults(defineProps<PfAvatarProps>(), {
  size: 'md',
})

const failed = ref(false)
</script>

<template>
  <span :class="cn(avatarVariants({ size }), props.class)">
    <img
      v-if="src && !failed"
      :src="src"
      :alt="alt || fallback || ''"
      class="h-full w-full object-cover"
      @error="failed = true"
    />
    <span v-else class="font-medium leading-none">
      <slot>{{ fallback }}</slot>
    </span>
  </span>
</template>
