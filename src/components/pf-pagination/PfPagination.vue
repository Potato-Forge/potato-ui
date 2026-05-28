<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import type { PfPaginationProps } from '.'

const props = withDefaults(defineProps<PfPaginationProps>(), {
  modelValue: 1,
  total: 0,
  pageSize: 10,
  siblingCount: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const currentPage = computed(() => Math.min(Math.max(1, props.modelValue), pageCount.value))

const pages = computed(() => {
  const result: (number | 'ellipsis')[] = []
  const start = Math.max(1, currentPage.value - props.siblingCount)
  const end = Math.min(pageCount.value, currentPage.value + props.siblingCount)

  result.push(1)
  if (start > 2) result.push('ellipsis')
  for (let page = Math.max(2, start); page <= Math.min(pageCount.value - 1, end); page += 1) {
    result.push(page)
  }
  if (end < pageCount.value - 1) result.push('ellipsis')
  if (pageCount.value > 1) result.push(pageCount.value)

  return result
})

const setPage = (page: number) => {
  const next = Math.min(Math.max(1, page), pageCount.value)
  if (props.disabled || next === currentPage.value) return
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <nav :class="cn('flex flex-wrap items-center gap-1', props.class)" aria-label="Pagination">
    <button
      type="button"
      class="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-border bg-background px-2 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="disabled || currentPage <= 1"
      @click="setPage(currentPage - 1)"
    >
      <span class="i-tabler-chevron-left h-4 w-4"></span>
    </button>
    <template v-for="(page, index) in pages" :key="`${page}-${index}`">
      <span
        v-if="page === 'ellipsis'"
        class="inline-flex h-8 min-w-8 items-center justify-center text-sm text-muted-foreground"
      >
        ...
      </span>
      <button
        v-else
        type="button"
        :aria-current="currentPage === page ? 'page' : undefined"
        :disabled="disabled"
        :class="
          cn(
            'inline-flex h-8 min-w-8 items-center justify-center rounded-md border px-2 text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50',
            currentPage === page
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-foreground hover:bg-muted',
          )
        "
        @click="setPage(page)"
      >
        {{ page }}
      </button>
    </template>
    <button
      type="button"
      class="inline-flex h-8 min-w-8 items-center justify-center rounded-md border border-border bg-background px-2 text-sm text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
      :disabled="disabled || currentPage >= pageCount"
      @click="setPage(currentPage + 1)"
    >
      <span class="i-tabler-chevron-right h-4 w-4"></span>
    </button>
  </nav>
</template>
