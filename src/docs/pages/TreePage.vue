<script setup lang="ts">
import { ref } from 'vue'
import PfTree from '@/components/pf-tree/PfTree.vue'
import { demoTreeData } from '../data/treeData'
import { t } from '../i18n'

const basicTree = ref(structuredClone(demoTreeData))
const checkedTree = ref(structuredClone(demoTreeData))
const draggableTree = ref(structuredClone(demoTreeData))
const choosen = ref<string | number | null>('button')
</script>

<template>
  <article class="page">
    <header class="page-header">
      <h1>PfTree</h1>
      <p>{{ t('tree.description') }}</p>
    </header>

    <section class="section">
      <h2>{{ t('section.installation') }}</h2>
      <PfCode>pnpm dlx @potato-ui/cli add pf-tree</PfCode>
    </section>

    <section class="section two-column">
      <div>
        <h2>{{ t('tree.basicChooseable') }}</h2>
        <div class="preview">
          <PfTree v-model="basicTree" v-model:choosen="choosen" :checkable="false" />
        </div>
      </div>
      <div>
        <h2>{{ t('tree.checkable') }}</h2>
        <div class="preview">
          <PfTree v-model="checkedTree" :chooseable="false" />
        </div>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('tree.draggableSlots') }}</h2>
      <div class="preview">
        <PfTree v-model="draggableTree" draggable>
          <template #subText="{ node }">
            <span class="text-xs text-muted-foreground">{{ node.id }}</span>
          </template>
          <template #actions>
            <button type="button" class="i-tabler-dots text-muted-foreground"></button>
          </template>
        </PfTree>
      </div>
    </section>

    <section class="section">
      <h2>{{ t('section.api') }}</h2>
      <table class="api-table">
        <thead><tr><th>{{ t('table.name') }}</th><th>{{ t('table.type') }}</th><th>{{ t('table.notes') }}</th></tr></thead>
        <tbody>
          <tr><td>modelValue</td><td>PfTreeNode[]</td><td>{{ t('tree.api.modelValue') }}</td></tr>
          <tr><td>choosen</td><td>string | number | null</td><td>{{ t('tree.api.choosen') }}</td></tr>
          <tr><td>chooseable/checkable/draggable</td><td>boolean</td><td>{{ t('tree.api.modes') }}</td></tr>
          <tr><td>slots</td><td>icon | text | subText | actions</td><td>{{ t('tree.api.slots') }}</td></tr>
          <tr><td>expose</td><td>getTreeData | getCheckedKeys | setCheckedByKeys</td><td>{{ t('tree.api.expose') }}</td></tr>
        </tbody>
      </table>
    </section>

    <section class="section">
      <h2>{{ t('section.dependencies') }}</h2>
      <PfCode>@he-tree/vue, @iconify/vue, pf-checkbox</PfCode>
    </section>
  </article>
</template>
