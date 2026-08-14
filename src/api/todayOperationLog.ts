/**
 * 取得今日操作紀錄狀況
 *
 * @async
 * @function getTodayOperationLog
 * @returns {Promise<{
 *   result: string,
 *   ret: {
 *     today_total_operations: number, // 今日總操作次數
 *     unresolved_errors: number,       // 未解決的錯誤數
 *     current_active_admins: number   // 當前線上管理員數
 *   }
 * }>}
 */
export const getTodayOperationLog = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const data = {
    today_total_operations: 5,
    unresolved_errors: 3,
    current_active_admins: 1,
  }

  return { result: 'ok', ret: data }
}
