<script setup lang="ts">
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { zhCN } from 'date-fns/locale'
import { format as DateFormat, isValid as isValidDate, parse as DateParse } from 'date-fns'
import { useSystemStore } from '@/store/systemStore'
import type {
  PfDatePickerPrimitive,
  PfDatePickerType,
  PfDatePickerValue,
} from './PfDatePicker.types'

const props = withDefaults(
  defineProps<{
    modelValue?: PfDatePickerValue
    type?: PfDatePickerType
    format?: 'timestamp' | 'format' | 'iso' | string
    range?: boolean
    disabled?: boolean
  }>(),
  {
    modelValue: null,
    type: 'datetime',
    disabled: false,
  },
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: PfDatePickerValue): void
  (event: 'blur'): void
}>()

const systemStore = useSystemStore()
const { isDarkMode: isDark } = storeToRefs(systemStore)

const displayFormat = computed(() => {
  if (props.type === 'date') return 'yyyy-MM-dd'
  if (props.type === 'time') return 'HH:mm:ss'
  return 'yyyy-MM-dd HH:mm:ss'
})

const resolvedOutputFormat = computed(() => {
  if (!props.format || props.format === 'format') return displayFormat.value
  return props.format
})

const pickerSlotUi = computed(() => ({
  inputIcon: props.type === 'time' ? 'i-tabler-clock' : 'i-tabler-calendar',
  actionRowTranslate: {
    selectBtnLabel: '确定',
    cancelBtnLabel: '取消',
    nowBtnLabel: '现在',
  },
}))

const textInputConfig = computed(() => ({
  format: displayFormat.value,
  openMenu: 'open',
  enterSubmit: true,
  tabSubmit: true,
  applyOnBlur: true,
  selectOnFocus: true,
}))

const timeConfig = computed(() => {
  const now = new Date()
  return {
    timePickerInline: true,
    hoursIncrement: 1,
    minutesIncrement: 1,
    secondsIncrement: 1,
    hoursGridIncrement: 1,
    minutesGridIncrement: 1,
    secondsGridIncrement: 1,
    startTime: {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    },
  }
})

const pickerUi = computed(() => ({
  input:
    'h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm leading-5 text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  menu: 'border border-border bg-card text-foreground shadow-lg rounded-md',
  calendar: 'text-foreground',
  calendarCell: 'text-foreground',
  navBtnPrev:
    'h-7 w-7 rounded border border-border text-muted-foreground hover:text-foreground hover:border-ring',
  navBtnNext:
    'h-7 w-7 rounded border border-border text-muted-foreground hover:text-foreground hover:border-ring',
}))

const toValidDate = (value: PfDatePickerPrimitive): Date | null => {
  if (value == null || value === '') return null
  if (value instanceof Date) return isValidDate(value) ? value : null

  if (typeof value === 'number') {
    const parsed = new Date(value)
    return isValidDate(parsed) ? parsed : null
  }

  const normalized = value.trim()
  if (!normalized) return null

  if (props.format === 'timestamp') {
    const timestamp = Number(normalized)
    if (!Number.isNaN(timestamp)) {
      const parsed = new Date(timestamp)
      if (isValidDate(parsed)) return parsed
    }
  }

  if (props.format && props.format !== 'iso' && props.format !== 'format') {
    const parsed = DateParse(normalized, props.format, new Date())
    if (isValidDate(parsed)) return parsed
  }

  const parsedByDisplay = DateParse(normalized, displayFormat.value, new Date())
  if (isValidDate(parsedByDisplay)) return parsedByDisplay

  const parsedByNative = new Date(normalized)
  return isValidDate(parsedByNative) ? parsedByNative : null
}

const serializeDate = (value: Date | null) => {
  if (!value || !isValidDate(value)) return null
  if (resolvedOutputFormat.value === 'timestamp') return value.getTime()
  if (resolvedOutputFormat.value === 'iso') return value.toISOString()
  return DateFormat(value, resolvedOutputFormat.value)
}

const pickerModelValue = computed<Date | Date[] | null>(() => {
  if (Array.isArray(props.modelValue)) {
    const parsedRange = props.modelValue.map((item) => toValidDate(item))
    return parsedRange.every(Boolean) ? (parsedRange as Date[]) : null
  }

  return toValidDate(props.modelValue)
})

const handleUpdateValue = (value: Date | Date[] | null) => {
  if (!value) {
    emit('update:modelValue', null)
    return
  }

  if (Array.isArray(value)) {
    const [start, end] = value
    emit('update:modelValue', start && end ? [serializeDate(start), serializeDate(end)] : null)
    return
  }

  emit('update:modelValue', serializeDate(value))
}

const formatActionPreviewValue = (value: Date | Date[] | null | undefined) => {
  if (!value) return ''

  const formatSingle = (item: Date) => DateFormat(item, displayFormat.value)
  if (Array.isArray(value)) {
    return value
      .filter((item): item is Date => isValidDate(item))
      .map(formatSingle)
      .join(' ~ ')
  }

  return isValidDate(value) ? formatSingle(value) : ''
}
</script>

<template>
  <div class="pf-date-picker">
    <VueDatePicker
      :model-value="pickerModelValue"
      :locale="zhCN"
      :dark="isDark"
      :formats="{ input: displayFormat }"
      :ui="pickerUi"
      :range="range"
      :disabled="disabled"
      :text-input="textInputConfig"
      :time-config="timeConfig"
      :action-row="pickerSlotUi.actionRowTranslate"
      @update:model-value="handleUpdateValue"
      @closed="emit('blur')"
    >
      <template #input-icon>
        <div class="mx-2 flex items-center text-muted-foreground">
          <div :class="pickerSlotUi.inputIcon"></div>
        </div>
      </template>

      <template #clear-icon>
        <div class="mx-2 flex items-center text-muted-foreground">
          <div class="i-tabler-x"></div>
        </div>
      </template>

      <template #clock-icon>
        <div class="mx-2 flex items-center gap-2 text-primary">
          <div class="i-tabler-clock"></div>
          <span class="font-semibold">点击选择时间</span>
        </div>
      </template>

      <template #calendar-icon>
        <div class="mx-2 flex items-center gap-2 text-primary">
          <div class="i-tabler-calendar"></div>
          <span class="font-semibold">点击选择日期</span>
        </div>
      </template>

      <template #action-preview="{ value }">
        <span class="text-primary">{{
          formatActionPreviewValue(value as Date | Date[] | null)
        }}</span>
      </template>
    </VueDatePicker>
  </div>
</template>

<style scoped>
.pf-date-picker {
  inline-size: 100%;
}

:deep(.dp__input) {
  block-size: 2.25rem;
  inline-size: 100%;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--input));
  background: transparent;
  padding: 0.25rem 1.875rem 0.25rem 0.75rem;
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: hsl(var(--foreground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
}

:deep(.dp__input.dp__input_icon_pad) {
  padding-inline-start: var(--dp-input-icon-padding, 2.25rem);
}

:deep(.dp__input::placeholder) {
  color: hsl(var(--muted-foreground));
}

:deep(.dp__input_focus),
:deep(.dp__input:focus) {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 1px hsl(var(--ring));
}

:deep(.dp__input:disabled) {
  cursor: not-allowed;
  opacity: 0.5;
}

:deep(.dp__input_wrap) {
  inline-size: 100%;
}

:deep(.dp__theme_light),
:deep(.dp__theme_dark) {
  --dp-background-color: hsl(var(--card));
  --dp-text-color: hsl(var(--foreground));
  --dp-hover-color: hsl(var(--accent));
  --dp-hover-text-color: hsl(var(--accent-foreground));
  --dp-primary-color: hsl(var(--primary));
  --dp-primary-disabled-color: hsl(var(--selected));
  --dp-primary-text-color: hsl(var(--primary-foreground));
  --dp-secondary-color: hsl(var(--border));
  --dp-border-color: hsl(var(--border));
  --dp-menu-border-color: hsl(var(--border));
  --dp-border-color-hover: hsl(var(--ring));
  --dp-border-color-focus: hsl(var(--ring));
  --dp-disabled-color: hsl(var(--muted));
  --dp-disabled-color-text: hsl(var(--muted-foreground));
  --dp-scroll-bar-background: hsl(var(--muted));
  --dp-scroll-bar-color: hsl(var(--muted-foreground));
  --dp-success-color: hsl(var(--success));
  --dp-success-color-disabled: hsl(var(--success) / 0.6);
  --dp-icon-color: hsl(var(--muted-foreground));
  --dp-danger-color: hsl(var(--destructive));
  --dp-marker-color: hsl(var(--destructive));
  --dp-tooltip-color: hsl(var(--popover));
  --dp-highlight-color: hsl(var(--selected) / 0.5);
  --dp-range-between-dates-background-color: hsl(var(--selected));
  --dp-range-between-dates-text-color: hsl(var(--selected-foreground));
  --dp-range-between-border-color: hsl(var(--selected));
  --dp-border-radius: calc(var(--radius) - 2px);
  --dp-cell-border-radius: calc(var(--radius) - 4px);
  --dp-font-size: 0.875rem;
}

:deep(.dp__menu) {
  border-color: hsl(var(--border));
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 10%),
    0 4px 6px -4px rgb(0 0 0 / 10%);
}

:deep(.dp__action_select) {
  border-radius: calc(var(--radius) - 4px);
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

:deep(.dp__action_cancel) {
  border-color: hsl(var(--border));
  border-radius: calc(var(--radius) - 4px);
  color: hsl(var(--muted-foreground));
}
</style>
