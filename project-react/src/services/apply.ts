import request from '@/utils/request';

/** 查询报名 POST /api/apply/ */
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

/** 新建报名 POST /api/apply/ */
export async function addApply(options?: { [key: string]: any }) {
  return request<API.ApplyListItem>('/api/apply/', {
    method: 'POST',
    // ...(options || {}),
    data: options
  });
}