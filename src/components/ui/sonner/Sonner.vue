<script lang="ts" setup>
import type { ToasterProps } from 'vue-sonner'
import { reactiveOmit } from '@vueuse/core'
import {
  BellIcon,
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  XIcon,
} from 'lucide-vue-next'
import { Toaster as Sonner } from 'vue-sonner'

const props = defineProps<ToasterProps>()
const delegatedProps = reactiveOmit(props, 'toastOptions')

/**
 * Sonner 的类名配置。
 *
 * 放在 setup 内而不是模板里，是因为模板表达式里既不能用 `//`（TypeScript
 * 语法错误），也不能用 `/* *\/`（Vue 模板表达式解析失败），无法就近注释。
 */
const toastOptions = {
  classes: {
    toast: 'group toast group-[.toaster]:shadow-lg',
    default:
      'group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border',

    /**
     * 副标题必须继承气泡自身的前景色。
     *
     * sonner 自带一条内联样式表：
     *   `[data-sonner-toast][data-styled="true"] [data-description] { color: rgb(63,63,63) }`
     * 它的选择器优先级高于任何工具类，所以这里的 color 必须带 `!important` 才能覆盖。
     * 未覆盖时，error 气泡（深红底）上的副标题是深灰 #3f3f3f，实测对比度仅 1.74，
     * 暗色下完全读不清——这正是「Toast 副标题不遵守亮暗规范」的成因。
     */
    description: '!text-inherit opacity-85',

    actionButton:
      'group-[.toast]:bg-current group-[.toast]:text-background group-[.toast]:border-transparent',
    cancelButton:
      'group-[.toast]:bg-transparent group-[.toast]:text-current group-[.toast]:border-current/20 hover:group-[.toast]:bg-current/10',
    closeButton:
      'group-[.toast]:bg-transparent group-[.toast]:text-current group-[.toast]:border-transparent hover:group-[.toast]:bg-current/10',
    success:
      'group-[.toaster]:border-success group-[.toaster]:bg-success group-[.toaster]:text-success-foreground',
    info: 'group-[.toaster]:border-info group-[.toaster]:bg-info group-[.toaster]:text-info-foreground',
    warning:
      'group-[.toaster]:border-warning group-[.toaster]:bg-warning group-[.toaster]:text-warning-foreground',
    error:
      'group-[.toaster]:border-destructive group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground',
    icon: 'group-[.toast]:text-current',
  },
}
</script>

<template>
  <Sonner
    class="toaster group"
    :toast-options="toastOptions"
    v-bind="delegatedProps"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4" />
    </template>
    <template #warning-icon>
      <BellIcon class="size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="size-4" />
    </template>
  </Sonner>
</template>
