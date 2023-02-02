import request from '@/utils/request';

/** 查询活动 GET /api/activity */
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

/** 新建活动 POST /api/activity/ */
export async function addActivity(options?: { [key: string]: any }) {
  return request<API.ActivityListItem>('/api/activity/', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 更新活动 PUT /api/activity/ */
export async function updateActivity(options?: { [key: string]: any }) {
  return request<API.ActivityListItem>('/api/activity/', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 删除活动 DELETE /api/activity/ */
export async function removeActivity(options?: { [id: string]: any }) {
  return request<Record<string, any>>('/api/activity', {
    method: 'DELETE',
    ...(options || {}),
  });
}
