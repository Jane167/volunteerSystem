import request from '@/utils/request';

/** 查询报名 POST /api/apply/ */
export async function getApplyList(params: {
  // query
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
}) {
  return request<API.ApplyList>('/api/apply/', {
    method: 'GET',
    params: params,
  });
}

/** 新建报名信息 POST /api/apply/ */
export async function addApply(options?: { [key: string]: any }) {
  return request<API.Response>('/api/apply/', {
    method: 'POST',
    data: options,
  });
}

/** 更新报名信息 PUT /api/apply/ */
export async function updateApply(options?: { [key: string]: any }, id?: number) {
  return request<API.Response>('/api/apply/' + id + '/', {
    method: 'PUT',
    data: options,
  });
}

/** 删除报名信息 DELETE /api/apply/ */
export async function removeApply(id?: number) {
  return request<API.Response>('/api/apply/' + id + '/', {
    method: 'DELETE',
  });
}

/** 批量删除报名信息 DELETE /api/apply/ */
export async function batchRemoveApply(deleteId?: number[]) {
  return request<API.Response>('/api/apply/?deleteId=' + deleteId, {
    method: 'DELETE',
  });
}
