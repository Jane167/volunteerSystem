import request from '@/utils/request';

// 获取活动列表
export async function getActivityList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}) {
  return request<API.ActivityList>('/api/activity/', {
    method: 'GET',
    params: params,
  });
}
