import request from '@/utils/request';

/** 查询活动 GET /api/activity */
export async function getActivityList(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    /** 是否开启分页状态 */
    // pagingStatus?: boolean;
  },
  options?: { [key: string]: any },
) {
  return request<API.ActivityList>('/api/activity/', {
    method: 'GET',
    params: {
      ...params,
    },
    data: options,
    // ...(options || {}),
  });
}

/** 新建活动 POST /api/activity/ */
export async function addActivity(options?: { [key: string]: any }) {
  return request<API.ActivityListItem>('/api/activity/', {
    method: 'POST',
    // ...(options || {}),
    data: options,
  });
}

/** 更新活动 PUT /api/activity/ */
export async function updateActivity(options?: { [key: string]: any }, id?: number) {
  return request<API.Response>('/api/activity/' + id + '/', {
    method: 'PUT',
    // ...(options || {}),
    data: options,
  });
}

/** 删除活动 DELETE /api/activity/ */
export async function removeActivity(id?: number) {
  return request<API.Response>('/api/activity/' + id + '/', {
    method: 'DELETE',
  });
}

/**导出活动信息 GET /api/activity/export_excel */
export async function exportActivity() {
  return request('/api/activity/export_excel/', {
    method: 'GET',
  });
}

/** 批量删除活动 DELETE /api/activity/ */
export async function batchRemoveActivity(deleteId?: number[]) {
  return request<API.Response>('/api/activity/?deleteId=' + deleteId, {
    method: 'DELETE',
  });
}

/**批量导出活动信息 POST /api/activity/export_excel */
export async function batchExportActivity(options?: { [key: string]: any }) {
  return request('/api/activity/export_excel/', {
    method: 'POST',
    data: options,
  });
}
