<script setup lang="ts">
import 'vxe-table/lib/style.css'
import { VxeColumn, VxeTable, VxeUI } from 'vxe-table'
import type {
  PfFormConfigItem,
  PfFormFieldRules,
  PfFormRules,
} from '@/components/pf-form/PfForm.types'
import PfButton from '@/components/pf-button/PfButton.vue'
import PfCard from '@/components/pf-card/PfCard.vue'
import PfEmpty from '@/components/pf-empty/PfEmpty.vue'
import PfForm from '@/components/pf-form/PfForm.vue'
import PfLoading from '@/components/pf-loading/PfLoading.vue'
import { pfToast } from '@/components/pf-toast'
import { usePfModal } from '@/components/pf-modal/usePfModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import PfDataTableDetail from './PfDataTableDetail.vue'
import PfDataTableForm from './PfDataTableForm.vue'
import PfDataTablePreviewValue from './PfDataTablePreviewValue.vue'
import type {
  PfDataTableActionColumnConfig,
  PfDataTableContainerMode,
  PfDataTableItem,
  PfDataTableRequest,
  PfDataTableCreateRequest,
  PfDataTableUpdateRequest,
  PfDataTableDeleteRequest,
  PfDataTableDetailRequest,
} from './PfDataTable.types'

const props = withDefaults(
  defineProps<{
    columns: PfDataTableItem[]
    rowKey?: string
    queryKeyBase?: readonly unknown[]
    containerMode?: PfDataTableContainerMode
    defaultQuery?: Record<string, any>
    queryColumnsPerRow?: number
    request?: PfDataTableRequest
    createRequest?: PfDataTableCreateRequest
    updateRequest?: PfDataTableUpdateRequest
    deleteRequest?: PfDataTableDeleteRequest
    detailRequest?: PfDataTableDetailRequest
    listQuery?: PfDataTableRequest
    detail?: PfDataTableDetailRequest
    create?: PfDataTableCreateRequest
    update?: PfDataTableUpdateRequest
    delete?: PfDataTableDeleteRequest
    formRules?: PfFormRules<Record<string, any>>
    tableData?: Record<string, any>[]
    tableLoading?: boolean
    hideCreate?: boolean
    hideDetail?: boolean
    hideEdit?: boolean
    hideDelete?: boolean
    actionColumn?: PfDataTableActionColumnConfig
    /**
     * 是否在组件挂载后用 `defaultQuery` 自动拉取列表。
     * 设为 false 后用户必须显式点击"查询"按钮才会触发首次请求。
     * @default true
     */
    autoFetch?: boolean
  }>(),
  {
    rowKey: 'id',
    queryKeyBase: () => ['pf-data-table'] as const,
    containerMode: 'drawer',
    defaultQuery: () => ({}),
    queryColumnsPerRow: 3,
    request: undefined,
    createRequest: undefined,
    updateRequest: undefined,
    deleteRequest: undefined,
    detailRequest: undefined,
    listQuery: undefined,
    detail: undefined,
    create: undefined,
    update: undefined,
    delete: undefined,
    formRules: undefined,
    tableData: () => [],
    tableLoading: false,
    hideCreate: false,
    hideDetail: false,
    hideEdit: false,
    hideDelete: false,
    actionColumn: () => ({}),
    autoFetch: true,
  },
)

const emits = defineEmits<{
  (e: 'form-query', payload: Record<string, any>): void
  (e: 'created', payload: Record<string, any>): void
  (e: 'updated', payload: Record<string, any>): void
  (e: 'deleted', payload: string | number): void
}>()

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) return error.message
  return '操作失败，请稍后重试'
}

const resolvedRequest = computed(() => props.request ?? props.listQuery)
const resolvedCreateRequest = computed(() => props.createRequest ?? props.create)
const resolvedUpdateRequest = computed(() => props.updateRequest ?? props.update)
const resolvedDeleteRequest = computed(() => props.deleteRequest ?? props.delete)
const resolvedDetailRequest = computed(() => props.detailRequest ?? props.detail)

const getItemConfig = (item: PfDataTableItem) => {
  if ('config' in item) {
    return item.config
  }
  return undefined
}

const normalizeQueryRules = (rules?: PfFormFieldRules) => {
  if (!rules) return undefined
  const { required, ...rest } = rules
  return Object.keys(rest).length ? rest : undefined
}

const queryFormItems = computed<PfFormConfigItem[]>(() => {
  return props.columns
    .map((item) => {
      if (!item.query) return null

      if (item.query === true) {
        return {
          ...item,
          rules: normalizeQueryRules(item.rules),
          readonly: false,
          disabled: false,
        } as PfFormConfigItem
      }

      if (item.query.enable === false) return null

      return {
        ...item,
        name: item.query.name || item.name,
        type: item.query.type || item.type,
        default: item.query.default ?? item.default,
        help: item.query.help ?? item.help,
        rules: normalizeQueryRules(item.query.rules),
        config: item.query.config ?? getItemConfig(item),
        readonly: false,
        disabled: false,
      } as PfFormConfigItem
    })
    .filter((item): item is PfFormConfigItem => Boolean(item))
})

// `submittedQuery` 只在用户显式点击"查询/重置"或父组件 defaultQuery 变更时同步,
// 其他时刻打字不会触发请求。
const submittedQuery = ref<Record<string, any>>({ ...props.defaultQuery })
// 标记用户是否手动修改过查询 —— true 后父组件的 defaultQuery 变化不再覆盖用户输入。
const userInteractedQuery = ref(false)

watch(
  () => props.defaultQuery,
  (next) => {
    if (userInteractedQuery.value) return
    submittedQuery.value = { ...next }
    if (props.autoFetch && resolvedRequest.value) {
      void fetchRows(submittedQuery.value)
    }
  },
  { deep: true },
)

const requestRows = ref<Record<string, any>[]>([])
const isListLoading = ref(false)

const fetchRows = async (query: Record<string, any>) => {
  const request = resolvedRequest.value
  if (!request) return

  isListLoading.value = true

  try {
    requestRows.value = await request(query)
  } catch (error) {
    pfToast.error('查询失败', getErrorMessage(error))
  } finally {
    isListLoading.value = false
  }
}

onMounted(() => {
  if (props.autoFetch && resolvedRequest.value) {
    void fetchRows(submittedQuery.value)
  }
})

const rows = computed(() => {
  if (resolvedRequest.value) {
    return requestRows.value
  }
  return props.tableData
})

const tableRows = computed<Record<string, any>[]>(() => {
  return (rows.value || []).map((row) => ({ ...(row || {}) }))
})

const isTableLoading = computed(() => {
  return isListLoading.value || props.tableLoading
})

const tableColumns = computed(() => props.columns.filter((item) => item.table?.show !== false))

const queryFormRef = useTemplateRef('queryFormRef')
const isQuerySubmitting = ref(false)
const isResettingQuery = ref(false)
const isQueryBusy = computed(
  () => isQuerySubmitting.value || isResettingQuery.value || isListLoading.value,
)

const handleQuerySubmit = async (payload: Record<string, any>) => {
  isQuerySubmitting.value = true
  userInteractedQuery.value = true

  const nextQuery = { ...payload }
  submittedQuery.value = nextQuery
  emits('form-query', nextQuery)

  try {
    await fetchRows(nextQuery)
  } finally {
    isQuerySubmitting.value = false
  }
}

const triggerQuery = () => {
  queryFormRef.value?.submit()
}

const resetQuery = async () => {
  isResettingQuery.value = true

  try {
    queryFormRef.value?.reset()
    const nextQuery = { ...props.defaultQuery }
    submittedQuery.value = nextQuery
    userInteractedQuery.value = true
    emits('form-query', nextQuery)
    await fetchRows(nextQuery)
  } finally {
    isResettingQuery.value = false
  }
}

const opened = ref(false)
const panelMode = ref<'detail' | 'create' | 'edit' | null>(null)
const activeRow = ref<Record<string, any> | null>(null)
const activeRowId = ref<string | number | null>(null)

const resolveRowId = (row: Record<string, any>) => row?.[props.rowKey]

const openCreate = () => {
  panelMode.value = 'create'
  activeRow.value = null
  activeRowId.value = null
  opened.value = true
}

const openEdit = (row: Record<string, any>) => {
  panelMode.value = 'edit'
  activeRow.value = { ...row }
  activeRowId.value = resolveRowId(row)
  opened.value = true
}

const openDetail = (row: Record<string, any>) => {
  panelMode.value = 'detail'
  activeRow.value = { ...row }
  activeRowId.value = resolveRowId(row)
  opened.value = true
  void loadDetail()
}

const closePanel = () => {
  opened.value = false
}

const hasActiveImageViewer = () => {
  if (typeof document === 'undefined') {
    return false
  }

  if (document.body.classList.contains('viewer-open')) {
    return true
  }

  const viewer = document.querySelector('.viewer-container')
  if (!viewer) {
    return false
  }

  return !viewer.classList.contains('viewer-hide') && viewer.getAttribute('aria-hidden') !== 'true'
}

const preventPanelCloseWhenViewerOpen = (event: { preventDefault: () => void }) => {
  if (hasActiveImageViewer()) {
    event.preventDefault()
  }
}

watch(opened, (val) => {
  if (!val) {
    panelMode.value = null
    activeRow.value = null
    activeRowId.value = null
  }
})

const detailData = ref<Record<string, any> | null>(null)
const isDetailLoading = ref(false)
const detailError = ref<unknown>(null)
const isDetailError = computed(() => Boolean(detailError.value))
const isCreating = ref(false)
const isUpdating = ref(false)
const deletingRowId = ref<string | number | null>(null)

const refreshAfterMutation = async () => {
  if (resolvedRequest.value) {
    await fetchRows(submittedQuery.value)
  }
}

const loadDetail = async () => {
  const request = resolvedDetailRequest.value
  const rowId = activeRowId.value
  detailData.value = null
  detailError.value = null

  if (!request || rowId === null || rowId === undefined) {
    return
  }

  isDetailLoading.value = true

  try {
    detailData.value = await request(rowId)
  } catch (error) {
    detailError.value = error
  } finally {
    isDetailLoading.value = false
  }
}

const runCreate = async (payload: Record<string, any>) => {
  const request = resolvedCreateRequest.value
  if (!request) throw new Error('未配置 createRequest')

  isCreating.value = true

  try {
    const saved = await request(payload)
    await refreshAfterMutation()
    pfToast.success('创建成功')
    emits('created', saved)
    closePanel()
  } catch (error) {
    pfToast.error('创建失败', getErrorMessage(error))
  } finally {
    isCreating.value = false
  }
}

const runUpdate = async (payload: Record<string, any>) => {
  const request = resolvedUpdateRequest.value
  if (!request) throw new Error('未配置 updateRequest')

  const rowId = activeRowId.value
  if (rowId === null || rowId === undefined) throw new Error('缺少更新 id')

  isUpdating.value = true

  try {
    const saved = await request(rowId, payload)
    await refreshAfterMutation()
    pfToast.success('更新成功')
    emits('updated', saved)
    closePanel()
  } catch (error) {
    pfToast.error('更新失败', getErrorMessage(error))
  } finally {
    isUpdating.value = false
  }
}

const runDelete = async (row: Record<string, any>) => {
  const request = resolvedDeleteRequest.value
  if (!request) throw new Error('未配置 deleteRequest')

  const rowId = resolveRowId(row)
  if (rowId === null || rowId === undefined) throw new Error('缺少删除 id')

  deletingRowId.value = rowId

  try {
    await request(rowId, row)
    await refreshAfterMutation()
    emits('deleted', rowId)
    pfToast.success('删除成功')
  } catch (error) {
    pfToast.error('删除失败', getErrorMessage(error))
  } finally {
    deletingRowId.value = null
  }
}

const handleFormSubmit = async (payload: Record<string, any>) => {
  if (panelMode.value === 'create') {
    await runCreate(payload)
    return
  }

  if (panelMode.value === 'edit') {
    await runUpdate(payload)
  }
}

const pfModal = usePfModal()

const isRowDeleting = (row: Record<string, any>) => {
  return deletingRowId.value !== null && resolveRowId(row) === deletingRowId.value
}

const openDeleteConfirm = async (row: Record<string, any>) => {
  if (deletingRowId.value !== null) return

  await pfModal.confirm({
    title: '确认删除',
    description: '删除后数据不可恢复,确定要继续吗?',
    positiveText: '确认删除',
    negativeText: '取消',
    // pf-modal 会在 onPositive 执行期间自动显示 positiveLoading 态,
    // 无需手动管理气泡 open/close 状态。
    onPositive: async () => {
      await runDelete(row)
    },
  })
}

const panelTitle = computed(() => {
  if (panelMode.value === 'create') return '新增数据'
  if (panelMode.value === 'edit') return '编辑数据'
  return '详情预览'
})

const detailPayload = computed(() => {
  if (!resolvedDetailRequest.value) return activeRow.value
  return detailData.value || null
})

const isFormSaving = computed(() => isCreating.value || isUpdating.value)

const showQuery = computed(() => queryFormItems.value.length > 0)
const queryButtonText = computed(() => (isQueryBusy.value ? '查询中...' : '查询'))
const resetButtonText = computed(() => (isResettingQuery.value ? '重置中...' : '重置'))

const actionColumnConfig = computed(() => {
  const config = props.actionColumn || {}
  const lineMode = config.lineMode || 'nowrap'
  const widthMode = config.widthMode || 'fixed'
  const hasExplicitWidth = config.width !== undefined
  const hasExplicitMinWidth = config.minWidth !== undefined

  let width: number | string | undefined
  let minWidth: number | string | undefined

  if (widthMode === 'fixed') {
    // 仅显式配置 width 时锁定宽度；未配置时用 minWidth 兜底并允许列继续扩展。
    if (hasExplicitWidth) {
      width = config.width
    }

    if (hasExplicitMinWidth) {
      minWidth = config.minWidth
    } else if (!hasExplicitWidth) {
      minWidth = 280
    }
  } else {
    // auto 模式不锁死宽度，允许内容撑开；wrap 模式给一个默认最小宽度避免挤压。
    minWidth = config.minWidth ?? config.width ?? 280
  }

  return {
    show: config.show !== false,
    fixed: config.fixed === false ? undefined : config.fixed || 'right',
    align: config.align || 'center',
    lineMode,
    width,
    minWidth,
  }
})

const actionButtonsClass = computed(() => {
  const align = actionColumnConfig.value.align
  const justifyClass =
    align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'
  const wrapClass =
    actionColumnConfig.value.lineMode === 'wrap' ? 'flex-wrap' : 'flex-nowrap whitespace-nowrap'
  return ['flex items-center gap-2', justifyClass, wrapClass]
})

import { useSystemStore } from '@/store/systemStore'

// light/dark switch
const systemStore = useSystemStore()
const { isDarkMode: isDark } = storeToRefs(systemStore)
watch(
  isDark,
  (val) => {
    if (val) VxeUI.setTheme('dark')
    else VxeUI.setTheme('light')
  },
  { immediate: true },
)
</script>

<template>
  <div class="h-full flex flex-col gap-4 p-4">
    <PfCard v-if="showQuery" border class="p-4">
      <PfForm
        ref="queryFormRef"
        :form-config="queryFormItems"
        :form-data="defaultQuery"
        :columns-per-row="queryColumnsPerRow"
        :on-submit="handleQuerySubmit"
      />

      <div class="mt-4 flex items-center justify-end gap-2">
        <PfButton
          icon="i-tabler-search"
          variant="secondary"
          type="info"
          :disabled="isQueryBusy"
          @click="triggerQuery"
        >
          {{ queryButtonText }}</PfButton
        >
        <PfButton
          icon="i-tabler-refresh"
          variant="ghost"
          type="warning"
          :disabled="isQueryBusy"
          @click="resetQuery"
          >{{ resetButtonText }}</PfButton
        >
        <PfButton
          icon="i-tabler-plus"
          v-if="!hideCreate"
          :disabled="isTableLoading"
          @click="openCreate"
          >新增</PfButton
        >
      </div>
    </PfCard>

    <div v-else-if="!hideCreate" class="flex items-center justify-end">
      <PfButton icon="i-tabler-plus" :disabled="isTableLoading" @click="openCreate"
        >新增</PfButton
      >
    </div>

    <div class="min-h-0 flex-1 overflow-hidden rounded-md border border-border">
      <PfLoading :loading="isTableLoading" text="加载数据中...">
        <vxe-table
          class="pf-data-table-vxe"
          :data="tableRows"
          :row-config="{ keyField: rowKey }"
          stripe
          border
          auto-resize
          height="auto"
        >
          <vxe-column
            v-for="item in tableColumns"
            :key="String(item.key)"
            :field="String(item.key)"
            :title="item.name"
            :width="item.table?.width"
            :min-width="item.table?.minWidth || 160"
            :max-width="item.table?.maxWidth"
            :align="item.table?.align"
            :sortable="item.table?.sortable"
          >
            <template #default="{ row }">
              <PfDataTablePreviewValue :item="item" :row-data="row" scene="table" />
            </template>
          </vxe-column>

          <vxe-column
            v-if="actionColumnConfig.show"
            title="操作"
            :width="actionColumnConfig.width"
            :min-width="actionColumnConfig.minWidth"
            :fixed="actionColumnConfig.fixed"
            :align="actionColumnConfig.align"
          >
            <template #default="{ row }">
              <div :class="actionButtonsClass">
                <PfButton
                  v-if="!hideDetail"
                  size="tiny"
                  variant="outline"
                  @click="openDetail(row)"
                >
                  详情
                </PfButton>
                <PfButton v-if="!hideEdit" size="tiny" variant="outline" @click="openEdit(row)">
                  编辑
                </PfButton>
                <div v-if="!hideDelete">
                  <PfButton
                    size="tiny"
                    variant="destructive"
                    :disabled="deletingRowId !== null"
                    @click="openDeleteConfirm(row)"
                  >
                    {{ isRowDeleting(row) ? '删除中...' : '删除' }}
                  </PfButton>
                </div>
                <slot name="extra-actions" :row="row" />
              </div>
            </template>
          </vxe-column>
        </vxe-table>
      </PfLoading>

      <PfEmpty
        v-if="!isTableLoading && tableRows.length === 0"
        title="暂无数据"
        description="请调整查询条件后重试"
      />
    </div>
  </div>

  <Sheet v-if="containerMode === 'drawer'" v-model:open="opened">
    <SheetContent side="right" class="w-full flex flex-col sm:max-w-2xl">
      <SheetHeader class="shrink-0">
        <SheetTitle>{{ panelTitle }}</SheetTitle>
      </SheetHeader>

      <div class="min-h-0 flex-1 overflow-auto py-4">
        <PfDataTableDetail
          v-if="panelMode === 'detail'"
          :columns="columns"
          :data="detailPayload"
          :loading="isDetailLoading"
          :error="isDetailError ? getErrorMessage(detailError) : null"
        />

        <PfDataTableForm
          v-else-if="panelMode === 'create' || panelMode === 'edit'"
          :columns="columns"
          :mode="panelMode"
          :form-data="activeRow"
          :form-rules="formRules"
          :loading="isFormSaving"
          @submit="handleFormSubmit"
          @cancel="closePanel"
        />
      </div>
    </SheetContent>
  </Sheet>

  <Dialog v-else v-model:open="opened">
    <DialogContent
      class="max-h-[90vh] max-w-4xl flex flex-col overflow-hidden"
      @escape-key-down="preventPanelCloseWhenViewerOpen"
      @pointer-down-outside="preventPanelCloseWhenViewerOpen"
      @interact-outside="preventPanelCloseWhenViewerOpen"
    >
      <DialogHeader class="shrink-0">
        <DialogTitle>{{ panelTitle }}</DialogTitle>
        <DialogDescription class="sr-only">
          {{ panelMode === 'detail' ? '查看当前记录详情' : '编辑当前记录表单' }}
        </DialogDescription>
      </DialogHeader>

      <div class="min-h-0 flex-1 overflow-auto">
        <PfDataTableDetail
          v-if="panelMode === 'detail'"
          :columns="columns"
          :data="detailPayload"
          :loading="isDetailLoading"
          :error="isDetailError ? getErrorMessage(detailError) : null"
        />

        <PfDataTableForm
          v-else-if="panelMode === 'create' || panelMode === 'edit'"
          :columns="columns"
          :mode="panelMode"
          :form-data="activeRow"
          :form-rules="formRules"
          :loading="isFormSaving"
          @submit="handleFormSubmit"
          @cancel="closePanel"
        />
      </div>
    </DialogContent>
  </Dialog>
</template>

<style>
.pf-data-table-vxe {
  --vxe-ui-layout-background-color: hsl(var(--background));
  --vxe-ui-table-header-background-color: hsl(var(--accent));
  --vxe-ui-table-border-color: hsl(var(--border));
  --vxe-ui-table-row-hover-background-color: hsl(var(--muted));
  --vxe-ui-table-row-striped-background-color: hsl(var(--secondary));
  --vxe-ui-table-row-hover-striped-background-color: hsl(var(--muted));
  --vxe-ui-table-row-current-background-color: hsl(var(--selected));
  --vxe-ui-table-row-hover-current-background-color: hsl(var(--selected));
  --vxe-ui-font-color: hsl(var(--foreground));
  --vxe-ui-font-primary-color: hsl(var(--primary));
}
</style>
