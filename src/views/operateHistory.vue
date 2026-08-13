<template>
  <div class="wrapper">
    <!-- 今日操作概況卡片 -->
    <div class="today-operation-data-wrap">
      <small-card v-for="item in todayOperationLogData" :key="item.key" :data="item" />
    </div>

    <!-- 搜尋條件區塊 -->
    <div class="search-wrap">
      <div class="search-category">
        <span class="item">操作者</span>
        <el-input
          v-model.trim="searchParams.operator"
          placeholder="搜尋操作者"
          clearable
          style="min-width: 200px"
          @keyup.enter="onSearch"
        />
      </div>

      <div class="search-category">
        <span class="item">操作類型</span>
        <el-select v-model="searchParams.method" style="min-width: 200px">
          <el-option
            v-for="item in actionList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-select>
      </div>

      <div class="search-category">
        <span class="item">操作時間</span>
        <el-date-picker
          v-model="curValue"
          type="daterange"
          :teleported="false"
          range-separator="至"
          start-placeholder="開始日期"
          end-placeholder="結束日期"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          popper-class="toggle-select-date-picker-time"
          :editable="false"
        />
      </div>

      <div class="search-button-block">
        <el-button class="inquire-btn" type="primary" :loading="isLoading" @click="onSearch">
          查詢
        </el-button>
        <el-button class="reset-btn" :disabled="isLoading || !hasSearchParams" @click="onReset">
          重置
        </el-button>
      </div>
    </div>

    <!-- 列表元件 -->
    <operate-history-table
      :table-data="tableData"
      :page-setting="pageSetting"
      :no-data="noData"
      :is-loading="isLoading"
      :lock-reset-button="!hasSearchParams"
      @current-change="handleCurrentChange"
      @size-change="updatePageSize"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import dayjs from 'dayjs'
import { ElNotification } from 'element-plus'
import { getOperationLogList } from '@/api/operationLogList'
import { getTodayOperationLog } from '@/api/todayOperationLog'
import operateHistoryTable from '@/components/operateHistoryTable.vue'
import smallCard from '@/components/smallCard.vue'
import type {
  PageState,
  OperationLogItem,
  SearchParams,
  ResultFilterParams,
  TodayOperationLogData,
} from '@/types/operateHistory'
import { OPERATION_KEY, OPERATION_KEY_MAP_NAME } from '@/types/constants'

// 預設日期（今天）
const getTodayRange = (): [string, string] => {
  const today = dayjs().format('YYYY-MM-DD')
  return [today, today]
}

// 狀態宣告
const curValue = ref<[string, string] | []>(getTodayRange())
const tableData = ref<OperationLogItem[]>([])
const isLoading = ref(false)
const noData = ref(false)
const resultFilterParams = ref<ResultFilterParams>({})

// 卡片預設資料
const defaultCardData: TodayOperationLogData[] = [
  {
    key: 'today_total_operations',
    value: 0,
    unit: '',
    icon: 'Document',
    color: 'primary',
    name: '今日操作總數',
  },
  {
    key: 'unresolved_errors',
    value: 0,
    unit: '',
    icon: 'Warning',
    color: 'danger',
    name: '異常阻擋紀錄',
  },
  {
    key: 'current_active_admins',
    value: 0,
    unit: '人',
    icon: 'User',
    color: 'success',
    name: '當前活躍管理員',
  },
]
const todayOperationLogData = ref<TodayOperationLogData[]>([...defaultCardData])

// 搜尋條件
const searchParams = ref<SearchParams>({
  method: OPERATION_KEY.ALL,
  operator: '',
})

// 分頁設定
const pageSetting = reactive<PageState>({
  currentPage: 1,
  pageSize: 20,
  totalCount: 0,
})

// 動作選單
const actionList = [
  { id: OPERATION_KEY.ALL, label: OPERATION_KEY_MAP_NAME[OPERATION_KEY.ALL] },
  { id: OPERATION_KEY.ADD, label: OPERATION_KEY_MAP_NAME[OPERATION_KEY.ADD] },
  {
    id: OPERATION_KEY.UPDATE,
    label: OPERATION_KEY_MAP_NAME[OPERATION_KEY.UPDATE],
  },
  {
    id: OPERATION_KEY.DELETE,
    label: OPERATION_KEY_MAP_NAME[OPERATION_KEY.DELETE],
  },
] as const

// 起始頁碼
const getFirstPage = computed(() => (pageSetting.currentPage - 1) * pageSetting.pageSize)

// 檢查是否有自訂搜尋條件
const hasSearchParams = computed(() => {
  const [start, end] = curValue.value || []
  const today = dayjs().format('YYYY-MM-DD')

  const isDefaultDate = start === today && end === today
  const hasMethod =
    searchParams.value.method !== undefined && searchParams.value.method !== OPERATION_KEY.ALL
  const hasOperator = Boolean(searchParams.value.operator?.trim())
  const hasSearchPage = pageSetting.currentPage > 1

  return !isDefaultDate || hasMethod || hasOperator || hasSearchPage
})

/**
 * API 搜尋條件
 */
const getFilterParams = (): ResultFilterParams => {
  const params: ResultFilterParams = {}

  if (curValue.value && curValue.value.length === 2) {
    params.start_at = dayjs(curValue.value[0]).startOf('day').format('YYYY-MM-DDT00:00:00')
    params.end_at = dayjs(curValue.value[1]).endOf('day').format('YYYY-MM-DDT23:59:59')
  }

  if (searchParams.value.method && searchParams.value.method !== OPERATION_KEY.ALL) {
    params.method = searchParams.value.method
  }

  if (searchParams.value.operator?.trim()) {
    params.operator = searchParams.value.operator.trim()
  }

  return params
}

/**
 * 執行列表 API 查詢
 */
const searchHandler = async () => {
  if (!curValue.value || curValue.value.length !== 2) {
    ElNotification({
      title: '錯誤',
      message: '請選擇查詢日期區間',
      type: 'error',
    })
    return
  }

  isLoading.value = true
  tableData.value = []

  const apiParams = {
    first_result: getFirstPage.value,
    max_results: pageSetting.pageSize,
    ...resultFilterParams.value,
  }

  try {
    const result = await getOperationLogList(apiParams)
    if (result.result === 'ok') {
      const { operation_log_list, pagination } = result.ret
      tableData.value = operation_log_list || []
      noData.value = tableData.value.length === 0
      pageSetting.totalCount = pagination?.total || 0
    } else {
      resetTableData()
    }
  } catch {
    resetTableData()
  } finally {
    isLoading.value = false
  }
}

/**
 * 清空表格
 */
const resetTableData = () => {
  tableData.value = []
  noData.value = true
  pageSetting.totalCount = 0
}

/**
 * 按下搜尋按鈕
 */
const onSearch = () => {
  pageSetting.currentPage = 1
  resultFilterParams.value = getFilterParams()
  searchHandler()
}

/**
 * 重置搜尋條件
 */
const onReset = () => {
  curValue.value = getTodayRange()
  searchParams.value = {
    method: OPERATION_KEY.ALL,
    operator: '',
  }
  onSearch()
}

/**
 * 頁碼切換
 */
const handleCurrentChange = (page: number) => {
  pageSetting.currentPage = page
  searchHandler()
}

/**
 * 每頁筆數切換
 */
const updatePageSize = (size: number) => {
  pageSetting.pageSize = size
  pageSetting.currentPage = 1
  searchHandler()
}

/**
 * 取得今日操作紀錄狀況數據
 */
const fetchTodayOperationLogData = async () => {
  try {
    const result = await getTodayOperationLog()
    if (result.result === 'ok' && result.ret) {
      todayOperationLogData.value = todayOperationLogData.value.map((item) => ({
        ...item,
        value: result.ret[item.key] ?? 0,
      }))
    } else {
      resetCardData()
    }
  } catch {
    resetCardData()
  }
}

/**
 * 重置卡片數值為 0
 */
const resetCardData = () => {
  todayOperationLogData.value = todayOperationLogData.value.map((item) => ({
    ...item,
    value: 0,
  }))
}

// 初始化
onMounted(async () => {
  resultFilterParams.value = getFilterParams()
  await Promise.all([fetchTodayOperationLogData(), searchHandler()])
})
</script>

<style lang="scss" scoped>
.today-operation-data-wrap {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
}

.search-wrap {
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid var(--border1-color);
  background-color: var(--background1-color);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.search-category {
  display: flex;
  flex-direction: column;

  .item {
    font-size: 16px;
    color: var(--text1-color);
    margin: 0 0 5px 3px;
  }
}

.search-button-block {
  display: flex;
  align-items: flex-end;
}

@media (min-width: 768px) {
  .today-operation-data-wrap {
    flex-direction: row;
  }

  .search-wrap {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }
}
</style>
