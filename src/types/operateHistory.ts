export interface PageState {
  currentPage: number
  pageSize: number
  totalCount: number
}

export interface OperateFunctionList {
  id: number
  name: string
}

export interface OperationLogItem {
  id: number
  method: number
  message: string
  operator_id: number
  operator: string
  ip: string
  created_at: string
}

export interface SearchParams {
  method?: number
  operator?: string
  start_at?: string
  end_at?: string
}

export interface ResultFilterParams extends SearchParams {
  first_result?: number
  max_results?: number
}

type TodayLogKey = 'today_total_operations' | 'unresolved_errors' | 'current_active_admins'
export interface TodayOperationLogData {
  key: TodayLogKey
  value: number
  unit: string
  icon: string
  color: string
  name: string
}

export interface ActionList {
  id: number
  label: string
}
