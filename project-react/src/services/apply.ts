import request from '@/utils/request';

// 获取报名列表
export async function getApplyList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}) {
  return request<API.ApplyList>('/api/apply/',{
    method: 'GET',
    params: params
  });
}