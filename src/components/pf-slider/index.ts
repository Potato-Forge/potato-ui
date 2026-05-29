import { cva, type VariantProps } from 'class-variance-authority'

export { default as PfSlider } from './PfSlider.vue'

export const sliderVariants = cva('w-full select-none', {
  variants: {
    size: {
      sm: '[--pf-slider-track:0.375rem] [--pf-slider-thumb:1rem]',
      md: '[--pf-slider-track:0.5rem] [--pf-slider-thumb:1.125rem]',
      lg: '[--pf-slider-track:0.625rem] [--pf-slider-thumb:1.25rem]',
    },
    disabled: {
      true: 'cursor-not-allowed opacity-60',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    disabled: false,
  },
})

export type SliderVariants = VariantProps<typeof sliderVariants>

export interface PfSliderProps {
  modelValue?: number
  min?: number
  max?: number
  step?: number
  size?: SliderVariants['size']
  disabled?: boolean
  readonly?: boolean
  showValue?: boolean
  formatValue?: (value: number) => string
  class?: string
}
