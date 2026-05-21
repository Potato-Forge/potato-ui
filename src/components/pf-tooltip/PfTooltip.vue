<script setup lang="ts">
import { Tippy } from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import './style/themes.css'
import type { PfTooltipProps } from './pfTooltip.types'

const props = withDefaults(defineProps<PfTooltipProps>(), {
  placement: 'top',
  delay: () => [200, 0],
  interactive: false,
  trigger: 'mouseenter focus',
})
</script>

<template>
  <Tippy
    :placement="props.placement"
    :delay="props.delay"
    :interactive="props.interactive"
    animation="shift-away"
    theme="pf-tooltip"
    :trigger="props.trigger"
  >
    <slot />

    <template #content>
      <slot name="content">
        {{ content }}
      </slot>
    </template>
  </Tippy>
</template>
