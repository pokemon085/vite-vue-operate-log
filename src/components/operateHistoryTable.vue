<template>
  <div class="table-pagination">
    <el-pagination
      :current-page="pageSetting.currentPage"
      :page-size="pageSetting.pageSize"
      :background="true"
      :page-sizes="[20, 30, 50]"
      layout="sizes, prev, pager, next"
      :total="pageSetting.totalCount"
      @size-change="(val: number) => emit('size-change', val)"
      @current-change="(val: number) => emit('current-change', val)"
    />
  </div>
  <el-table v-loading="isLoading" :fit="true" :data="tableData" border>
    <el-table-column type="index" label="序號" width="70" align="center" />
    <el-table-column label="操作者" min-width="150">
      <template #default="scope">
        <div class="content-note">
          {{ scope.row.operator }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="method" label="動作" min-width="90" sortable>
      <template #default="scope">
        <div class="content-note">
          <span>{{ OPERATION_KEY_MAP_NAME[scope.row.method] }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="內容" min-width="112">
      <template #default="scope">
        <div>
          {{ scope.row.message }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="created_at" label="操作時間" min-width="120" sortable>
      <template #default="scope">
        <div class="create-time">
          {{ dayjs(scope.row.created_at).format('YYYY/MM/DD HH:mm:ss') }}
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { OPERATION_KEY_MAP_NAME } from '@/types/constants'
import type { OperationLogItem, PageState } from '@/types/operateHistory'

defineProps<{
  tableData: OperationLogItem[]
  pageSetting: PageState
  noData: boolean
  isLoading: boolean
  lockResetButton: boolean
}>()

const emit = defineEmits<{
  /** 切換頁碼 */
  'current-change': [val: number]
  /** 切換每頁顯示筆數 */
  'size-change': [val: number]
}>()
</script>

<style lang="scss" scoped>
.table-pagination {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style>
