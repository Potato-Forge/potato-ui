import type { App } from 'vue'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/shift-away.css'
import './style/themes.css'

export const pfTooltipPlugin = (app: App) => {
  app.use(VueTippy, {
    directive: 'pf-tooltip',
    component: 'pf-tooltip',
    componentSingleton: 'pf-tooltip-singleton',
    defaultProps: {
      placement: 'top',
      theme: 'pf-tooltip',
      animation: 'shift-away',
      touch: ['hold', 500],
    },
  })
}
