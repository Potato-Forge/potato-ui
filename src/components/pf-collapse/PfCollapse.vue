<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { collapseVariants } from '.'
import type { PfCollapseProps } from '.'

const props = withDefaults(defineProps<PfCollapseProps>(), {
  defaultOpen: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const open = computed({
  get: () => props.modelValue ?? props.defaultOpen,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <Collapsible v-model:open="open" :disabled="disabled" :class="cn(collapseVariants({ size }), props.class)">
    <CollapsibleTrigger
      class="flex w-full items-center justify-between gap-3 px-[var(--pf-collapse-px)] py-[var(--pf-collapse-py)] text-left transition-colors hover:bg-muted/60 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span class="min-w-0">
        <span v-if="$slots.title || title" class="block truncate font-medium">
          <slot name="title">{{ title }}</slot>
        </span>
        <span
          v-if="$slots.description || description"
          class="mt-1 block truncate text-xs text-muted-foreground"
        >
          <slot name="description">{{ description }}</slot>
        </span>
      </span>
      <span
        class="i-tabler-chevron-down h-4 w-4 shrink-0 text-muted-foreground transition-transform data-[open=true]:rotate-180"
        :data-open="open"
        aria-hidden="true"
      ></span>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div class="border-t border-border px-[var(--pf-collapse-px)] py-[var(--pf-collapse-py)] text-sm text-muted-foreground">
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
